import type { FactionId, Prose, Requirement, Scene, SceneId } from './types'
import { END_SCENE } from './types'
import { ALL_SCENES, SCENES, START_SCENE } from '../content/story'
import { DECISION_BY_ID, DECISIONS } from '../content/decisions'
import { ACTOR_BY_ID } from '../content/actors'
import { BACKGROUNDS } from '../content/backgrounds'
import { isDerivedFlag } from './derived'

/**
 * Story-graph validation, run as a test.
 *
 * Content this size is easy to break silently: a renamed scene, a duplicated
 * choice id that shadows the interesting option, a decision that one seat can
 * never reach. All of those are cheap to detect and expensive to notice by
 * playing.
 */

const FACTIONS: FactionId[] = ['us', 'cn', 'eu']

export interface ValidationIssue {
  kind: string
  detail: string
}

interface GotoEdge {
  faction: FactionId | 'all'
  target: SceneId
}

const gotoTargets = (scene: Scene): GotoEdge[] =>
  scene.choices.flatMap<GotoEdge>((c) => {
    if (typeof c.goto === 'string') return [{ faction: 'all', target: c.goto }]
    return (Object.entries(c.goto) as [FactionId, SceneId][]).map(([faction, target]) => ({
      faction,
      target,
    }))
  })

/** Walk every prose node, including inside skill-gated reveals. */
function walkProse(nodes: Prose[], visit: (n: Prose) => void): void {
  for (const n of nodes) {
    visit(n)
    if (n.kind === 'reveal') walkProse(n.body, visit)
  }
}

function collectRequirements(scene: Scene): Requirement[] {
  const reqs: Requirement[] = []
  for (const c of scene.choices) if (c.requires) reqs.push(c.requires)
  const gather = (nodes: Prose[]) =>
    walkProse(nodes, (n) => {
      if (n.kind === 'reveal') reqs.push(n.requires)
    })
  gather(scene.body)
  for (const body of Object.values(scene.factionBody ?? {})) gather(body)
  return reqs
}

/** Scenes reachable from a given seat's start, following faction-appropriate gotos. */
export function reachableFrom(faction: FactionId): Set<SceneId> {
  const seen = new Set<SceneId>()
  const queue: SceneId[] = [START_SCENE[faction]]

  while (queue.length) {
    const id = queue.pop()!
    if (id === END_SCENE || seen.has(id)) continue
    const scene = SCENES[id]
    if (!scene) continue
    seen.add(id)

    for (const { faction: f, target } of gotoTargets(scene)) {
      if (f !== 'all' && f !== faction) continue
      queue.push(target)
    }
  }
  return seen
}

export function validateStory(): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const push = (kind: string, detail: string) => issues.push({ kind, detail })

  // --- Unique scene ids ---------------------------------------------------
  const sceneIdCounts = new Map<SceneId, number>()
  for (const s of ALL_SCENES) sceneIdCounts.set(s.id, (sceneIdCounts.get(s.id) ?? 0) + 1)
  for (const [id, n] of sceneIdCounts) {
    if (n > 1) push('duplicate-scene-id', `${id} defined ${n} times`)
  }

  for (const scene of ALL_SCENES) {
    // --- Choice ids unique within a scene. A duplicate silently shadows the
    // second option, which is how a gated variant becomes unreachable.
    const choiceIds = new Map<string, number>()
    for (const c of scene.choices) choiceIds.set(c.id, (choiceIds.get(c.id) ?? 0) + 1)
    for (const [id, n] of choiceIds) {
      if (n > 1) push('duplicate-choice-id', `${scene.id} has ${n} choices with id "${id}"`)
    }

    if (scene.choices.length === 0) {
      push('dead-end', `${scene.id} has no choices`)
    }

    // --- No dangling gotos -------------------------------------------------
    for (const { faction, target } of gotoTargets(scene)) {
      if (target === END_SCENE) continue
      if (!SCENES[target]) {
        push('dangling-goto', `${scene.id} → "${target}" (${faction}) does not exist`)
      }
    }

    // --- Faction-forked gotos must cover every seat that can see the scene --
    const seats = scene.factions ?? FACTIONS
    for (const c of scene.choices) {
      if (typeof c.goto === 'string') continue
      for (const seat of seats) {
        if (!c.goto[seat]) {
          push(
            'incomplete-goto',
            `${scene.id}/${c.id} has no destination for "${seat}", which can reach this scene`,
          )
        }
      }
    }

    // --- Every actor referenced in dialogue exists -------------------------
    const checkActors = (nodes: Prose[]) =>
      walkProse(nodes, (n) => {
        if (n.kind === 'say' && !ACTOR_BY_ID[n.actor]) {
          push('unknown-actor', `${scene.id} references actor "${n.actor}"`)
        }
      })
    checkActors(scene.body)
    for (const body of Object.values(scene.factionBody ?? {})) checkActors(body)

    // --- Requirements must be satisfiable in principle ---------------------
    for (const req of collectRequirements(scene)) {
      for (const [id, n] of Object.entries(req.skills ?? {})) {
        if (n > 10) push('unsatisfiable', `${scene.id} requires ${id} ${n}, above the cap of 10`)
      }
      for (const [id, n] of Object.entries(req.topics ?? {})) {
        if (n > 10) push('unsatisfiable', `${scene.id} requires topic ${id} ${n}, above the cap`)
      }
    }

    // --- majorDecision ids must be registered ------------------------------
    for (const c of scene.choices) {
      if (!c.majorDecision) continue
      const def = DECISION_BY_ID[c.majorDecision]
      if (!def) {
        push('unknown-decision', `${scene.id}/${c.id} sets unregistered decision ${c.majorDecision}`)
        continue
      }
      if (!def.options[c.id]) {
        push(
          'unlabelled-option',
          `decision ${c.majorDecision} has no label for option "${c.id}" (${scene.id})`,
        )
      }
    }
  }

  // --- Flags named in requirements must be settable somewhere --------------
  // A requirement on a flag nothing ever sets hides that option permanently,
  // which is indistinguishable from the option not existing.
  const flagsSet = new Set<string>()
  for (const scene of ALL_SCENES) {
    for (const f of scene.onEnter?.flags ?? []) flagsSet.add(f)
    for (const c of scene.choices) for (const f of c.effects?.flags ?? []) flagsSet.add(f)
  }
  for (const b of BACKGROUNDS) for (const f of b.flags ?? []) flagsSet.add(f)

  const flagsRequired = new Map<string, string>()
  for (const scene of ALL_SCENES) {
    const record = (req: Requirement) => {
      for (const f of [...(req.flags ?? []), ...(req.notFlags ?? [])]) {
        if (!flagsRequired.has(f)) flagsRequired.set(f, scene.id)
      }
      for (const sub of req.anyOf ?? []) record(sub)
    }
    for (const req of collectRequirements(scene)) record(req)
  }

  for (const [flag, where] of flagsRequired) {
    if (!flagsSet.has(flag) && !isDerivedFlag(flag)) {
      push('unsettable-flag', `${where} gates on flag "${flag}", which nothing ever sets`)
    }
  }

  // --- Every scene reachable from at least one seat ------------------------
  const reachable = new Set<SceneId>()
  for (const f of FACTIONS) for (const id of reachableFrom(f)) reachable.add(id)
  for (const scene of ALL_SCENES) {
    if (!reachable.has(scene.id)) push('unreachable-scene', scene.id)
  }

  // --- A scene restricted to one seat must not be reachable from another ---
  for (const f of FACTIONS) {
    for (const id of reachableFrom(f)) {
      const scene = SCENES[id]
      if (scene?.factions && !scene.factions.includes(f)) {
        push('seat-leak', `${id} is restricted to [${scene.factions.join(', ')}] but reachable from "${f}"`)
      }
    }
  }

  // --- Every major decision reachable from every seat ---------------------
  for (const decision of DECISIONS) {
    for (const f of FACTIONS) {
      const found = [...reachableFrom(f)].some((id) =>
        SCENES[id]?.choices.some((c) => c.majorDecision === decision.id),
      )
      if (!found) {
        push('unreachable-decision', `${decision.id} cannot be reached from seat "${f}"`)
      }
    }
  }

  return issues
}
