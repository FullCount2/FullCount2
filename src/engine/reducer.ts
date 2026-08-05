import type {
  BackgroundId,
  Choice,
  FactionId,
  GameState,
  Goto,
  RequirementCheck,
  Scene,
  SceneId,
} from './types'
import { END_SCENE } from './types'
import { applyEffect } from './effects'
import { evaluate } from './requirements'
import { resolveEnding } from './endings'
import { ZERO_SKILLS } from '../content/skills'
import { ZERO_TOPICS } from '../content/topics'
import { INITIAL_METRICS } from '../content/metrics'
import { BACKGROUND_BY_ID } from '../content/backgrounds'
import { SCENES, START_SCENE } from '../content/story'

/** The debt the world is already carrying when you arrive. */
export const INITIAL_SAFETY_DEBT = 8

export function getScene(id: SceneId): Scene {
  const scene = SCENES[id]
  if (!scene) throw new Error(`Unknown scene: ${id}`)
  return scene
}

/** A `goto` may fork by seat; this is where the shared spine splits. */
export function resolveGoto(goto: Goto, faction: FactionId): SceneId {
  if (typeof goto === 'string') return goto
  const target = goto[faction]
  if (!target) {
    throw new Error(`goto has no destination for faction "${faction}": ${JSON.stringify(goto)}`)
  }
  return target
}

export function createGame(faction: FactionId, background: BackgroundId): GameState {
  const bg = BACKGROUND_BY_ID[background]
  if (!bg) throw new Error(`Unknown background: ${background}`)
  if (bg.faction !== faction) {
    throw new Error(`Background ${background} does not belong to faction ${faction}`)
  }

  const start = START_SCENE[faction]

  const base: GameState = {
    faction,
    background,
    sceneId: start,
    chapter: 1,
    skills: ZERO_SKILLS(),
    topics: ZERO_TOPICS(),
    metrics: INITIAL_METRICS(),
    // A racing world starts already in debt. Beginning at zero would silently
    // discard every early act of caution, since debt cannot go below zero.
    safetyDebt: INITIAL_SAFETY_DEBT,
    coercion: 0,
    relationships: {},
    flags: {},
    decisions: {},
    metActors: [],
    history: [],
    lockedSeen: [],
    ending: null,
  }

  const withBackground = applyEffect(base, {
    skills: bg.skills,
    topics: bg.topics,
    flags: bg.flags,
  })

  return enterScene(withBackground, start)
}

export interface EvaluatedChoice {
  choice: Choice
  check: RequirementCheck
}

/**
 * Choices for the current scene.
 *
 * Structurally impossible options (wrong seat, contradicted by an earlier
 * decision) are dropped. Everything else is returned even when unavailable, so
 * the UI can render it greyed out with its requirement — the player is meant to
 * see the doors their build cannot open.
 */
export function evaluatedChoices(state: GameState): EvaluatedChoice[] {
  const scene = getScene(state.sceneId)
  return scene.choices
    .map((choice) => ({ choice, check: evaluate(choice.requires, state) }))
    .filter(({ check }) => check.met || !check.structural)
}

/** Apply scene entry effects, advance the chapter counter, log locked options. */
function enterScene(state: GameState, sceneId: SceneId): GameState {
  const scene = getScene(sceneId)

  let next: GameState = {
    ...state,
    sceneId,
    chapter: scene.chapter,
    history: [...state.history, sceneId],
  }

  next = applyEffect(next, scene.onEnter)

  // Record every locked-but-attainable option the player is looking at, for the
  // end-of-run retrospective. Deduplicated by scene + choice.
  const sightings = scene.choices
    .map((choice) => ({ choice, check: evaluate(choice.requires, next) }))
    .filter(({ check }) => !check.met && !check.structural)
    .filter(
      ({ choice }) =>
        !next.lockedSeen.some((l) => l.sceneId === sceneId && l.choiceId === choice.id),
    )
    .map(({ choice, check }) => ({
      sceneId,
      chapter: scene.chapter,
      choiceId: choice.id,
      text: choice.text,
      missing: check.missing,
      ...(choice.wouldHaveOpened ? { wouldHaveOpened: choice.wouldHaveOpened } : {}),
    }))

  if (sightings.length) {
    next = { ...next, lockedSeen: [...next.lockedSeen, ...sightings] }
  }

  return next
}

/**
 * Take a choice. Throws if the choice is not available in the current scene,
 * which keeps a UI bug from silently producing an impossible run.
 */
export function choose(state: GameState, choiceId: string): GameState {
  if (state.ending) return state

  const scene = getScene(state.sceneId)
  const choice = scene.choices.find((c) => c.id === choiceId)
  if (!choice) throw new Error(`Scene ${scene.id} has no choice "${choiceId}"`)

  const check = evaluate(choice.requires, state)
  if (!check.met) {
    throw new Error(`Choice "${choiceId}" is locked: ${check.missing.join(', ')}`)
  }

  let next = applyEffect(state, choice.effects)

  if (choice.majorDecision) {
    next = {
      ...next,
      decisions: { ...next.decisions, [choice.majorDecision]: choice.id },
    }
  }

  const target = resolveGoto(choice.goto, next.faction)

  if (target === END_SCENE) {
    return { ...next, ending: resolveEnding(next) }
  }

  return enterScene(next, target)
}

/** Prose for the current scene, with any seat-specific additions appended. */
export function sceneBody(scene: Scene, faction: FactionId) {
  return [...scene.body, ...(scene.factionBody?.[faction] ?? [])]
}
