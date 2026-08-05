import type { Effect, GameState, MetricId, SkillId, TopicId, ActorId } from './types'

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

/** Per-metric bounds, so no single choice can send the world off the scale. */
const CLAMPS: Partial<Record<Exclude<MetricId, 'oversight'>, [number, number]>> = {
  alarm: [0, 100],
  trustUs: [0, 100],
  trustCn: [0, 100],
  speedup: [1, 400],
  compute: [24, 32],
  lead: [-12, 12],
}

/**
 * Apply an effect, returning a new state. Effects are additive deltas rather
 * than assignments, which keeps content authoring local: a scene says "this
 * costs you two points of Beijing's trust" without needing to know the running
 * total.
 */
export function applyEffect(state: GameState, effect: Effect | undefined): GameState {
  if (!effect) return state

  const next: GameState = {
    ...state,
    skills: { ...state.skills },
    topics: { ...state.topics },
    metrics: { ...state.metrics },
    relationships: { ...state.relationships },
    flags: { ...state.flags },
    metActors: [...state.metActors],
  }

  for (const [id, delta] of Object.entries(effect.skills ?? {}) as [SkillId, number][]) {
    next.skills[id] = clamp(next.skills[id] + delta, 0, 10)
  }

  for (const [id, delta] of Object.entries(effect.topics ?? {}) as [TopicId, number][]) {
    next.topics[id] = clamp(next.topics[id] + delta, 0, 10)
  }

  for (const [rawId, delta] of Object.entries(effect.metrics ?? {}) as [MetricId, number][]) {
    if (rawId === 'oversight') continue // derived from Safety Debt, never written directly
    const id = rawId
    const bounds = CLAMPS[id]
    const raw = (next.metrics[id] ?? 0) + delta
    next.metrics[id] = bounds ? clamp(raw, bounds[0], bounds[1]) : raw
  }

  if (effect.safetyDebt) {
    next.safetyDebt = Math.max(0, next.safetyDebt + effect.safetyDebt)
  }

  if (effect.coercion) {
    next.coercion = Math.max(0, next.coercion + effect.coercion)
  }

  for (const [id, delta] of Object.entries(effect.relationships ?? {}) as [ActorId, number][]) {
    next.relationships[id] = clamp((next.relationships[id] ?? 0) + delta, -10, 10)
  }

  for (const f of effect.flags ?? []) next.flags[f] = true
  for (const f of effect.clearFlags ?? []) delete next.flags[f]

  for (const a of effect.meetActors ?? []) {
    if (!next.metActors.includes(a)) next.metActors.push(a)
  }

  return next
}

/** Apply several effects in order. */
export function applyEffects(state: GameState, effects: (Effect | undefined)[]): GameState {
  return effects.reduce<GameState>((s, e) => applyEffect(s, e), state)
}
