import type { GameState, Requirement, RequirementCheck, SkillId, TopicId, MetricId } from './types'
import { skillName } from '../content/skills'
import { topicName } from '../content/topics'
import { metricLabel, metricValue } from '../content/metrics'
import { derivedFlag, isDerivedFlag } from './derived'

/** Real flags first, then the computed ones. */
const holdsFlag = (f: string, state: GameState): boolean =>
  Boolean(state.flags[f]) || (isDerivedFlag(f) && derivedFlag(f, state))

/**
 * There is exactly one implementation of "can the player do this", and it also
 * produces the sentence shown beside a locked option. That matters: the greyed
 * out text in the UI is generated from the same object the engine tests, so the
 * game can never promise a threshold it does not actually enforce.
 */

const entries = <K extends string>(o: Partial<Record<K, number>> | undefined): [K, number][] =>
  Object.entries(o ?? {}) as [K, number][]

/** "Statecraft 4", "Model Deception 2", "Beijing trusts you 60". */
const clause = (label: string, value: number): string => `${label} ${value}`

const skillClauses = (req: Requirement): string[] =>
  entries<SkillId>(req.skills).map(([id, n]) => clause(skillName(id), n))

const topicClauses = (req: Requirement): string[] =>
  entries<TopicId>(req.topics).map(([id, n]) => clause(topicName(id), n))

const metricClauses = (req: Requirement): string[] =>
  entries<MetricId>(req.metrics).map(([id, n]) => clause(metricLabel(id), n))

/**
 * A full description of a requirement, independent of state. Used for locked
 * sidebar metrics and for the retrospective, where there is no "current" state
 * to diff against.
 */
export function describeRequirement(req: Requirement | undefined): string {
  if (!req) return ''
  const parts: string[] = [...skillClauses(req), ...topicClauses(req), ...metricClauses(req)]

  if (req.maxSafetyDebt !== undefined) parts.push(`oversight largely intact`)
  if (req.minSafetyDebt !== undefined) parts.push(`corners already cut`)

  if (req.anyOf?.length) {
    const branches = req.anyOf.map((r) => describeRequirement(r)).filter(Boolean)
    if (branches.length) parts.push(branches.join(' or '))
  }

  return parts.join(' · ')
}

/**
 * Evaluate a requirement against state.
 *
 * `missing` lists only the clauses that currently fail, so the UI can say
 * "Requires Statecraft 4" rather than restating conditions already satisfied.
 *
 * `structural` marks requirements that no amount of training can satisfy — the
 * wrong faction, or a decision already made differently. Those options are
 * hidden entirely rather than dangled in front of the player.
 */
export function evaluate(req: Requirement | undefined, state: GameState): RequirementCheck {
  if (!req) return { met: true, missing: [], structural: false }

  const missing: string[] = []
  let structural = false

  // --- Structural gates: wrong seat, or history that already went another way.
  if (req.faction && !req.faction.includes(state.faction)) {
    structural = true
    missing.push('a different seat')
  }

  for (const [id, want] of Object.entries(req.decisions ?? {})) {
    const taken = state.decisions[id as keyof typeof state.decisions]
    const allowed = Array.isArray(want) ? want : [want]
    if (!taken || !allowed.includes(taken)) {
      structural = true
      missing.push('a different earlier decision')
    }
  }

  for (const f of req.flags ?? []) {
    if (!holdsFlag(f, state)) {
      structural = true
      missing.push('something that did not happen')
    }
  }

  for (const f of req.notFlags ?? []) {
    if (holdsFlag(f, state)) {
      structural = true
      missing.push('something that already happened')
    }
  }

  // --- Growable gates: skills, topics, standing.
  for (const [id, n] of entries<SkillId>(req.skills)) {
    if (state.skills[id] < n) missing.push(clause(skillName(id), n))
  }

  for (const [id, n] of entries<TopicId>(req.topics)) {
    if (state.topics[id] < n) missing.push(clause(topicName(id), n))
  }

  for (const [id, n] of entries<MetricId>(req.metrics)) {
    if (metricValue(state, id) < n) missing.push(clause(metricLabel(id), n))
  }

  if (req.maxSafetyDebt !== undefined && state.safetyDebt > req.maxSafetyDebt) {
    missing.push('oversight largely intact')
  }

  if (req.minSafetyDebt !== undefined && state.safetyDebt < req.minSafetyDebt) {
    structural = true
    missing.push('a worse record than yours')
  }

  // --- Disjunction: at least one branch must hold.
  if (req.anyOf?.length) {
    const checks = req.anyOf.map((r) => evaluate(r, state))
    if (!checks.some((c) => c.met)) {
      const branches = req.anyOf.map((r) => describeRequirement(r)).filter(Boolean)
      if (branches.length) missing.push(branches.join(' or '))
      if (checks.every((c) => c.structural)) structural = true
    }
  }

  // Deduplicate: two failing clauses can produce the same phrase.
  const unique = [...new Set(missing)]
  return { met: unique.length === 0, missing: unique, structural }
}

/** The sentence rendered beside a greyed-out option. */
export function lockLabel(check: RequirementCheck): string {
  return `Requires ${check.missing.join(' · ')}`
}
