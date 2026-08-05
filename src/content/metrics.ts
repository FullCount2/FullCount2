import type { GameState, MetricId, Requirement } from '../engine/types'

export interface MetricDef {
  id: MetricId
  label: string
  /** Teasing description shown beside the redaction bar when it is locked. */
  lockedHint: string
  /** What you must know to see this number at all. */
  requires: Requirement
  format: (v: number) => string
  display: 'bar' | 'value'
  max?: number
  /** Bipolar bars are centred; the value may be negative. */
  bipolar?: boolean
  /** Computed from state rather than stored. */
  derive?: (s: GameState) => number
  /** Which direction is reassuring, for colour. */
  goodDirection?: 'up' | 'down'
}

const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
}

const superscript = (n: number): string =>
  String(n)
    .split('')
    .map((c) => SUPERSCRIPT[c] ?? c)
    .join('')

/** `compute` is stored as log10 of the largest training run in FLOP. */
const formatFlop = (log10: number): string => {
  const exponent = Math.floor(log10)
  const mantissa = Math.pow(10, log10 - exponent)
  return `${mantissa.toFixed(1)} × 10${superscript(exponent)} FLOP`
}

/** `lead` is signed: positive means Washington is ahead, negative means Beijing. */
const formatLead = (v: number): string => {
  if (Math.abs(v) < 0.4) return 'level, within noise'
  const months = Math.abs(v).toFixed(1)
  return v > 0 ? `US ahead by ${months} mo` : `PRC ahead by ${months} mo`
}

/**
 * Every metric is hidden behind a knowledge requirement. A player who never
 * invests in Intelligence genuinely does not know who is ahead — they are
 * reading the same newspapers as everyone else, and the redaction bar in the
 * margin says so.
 */
export const METRICS: MetricDef[] = [
  {
    id: 'compute',
    label: 'Largest training run',
    lockedHint: 'Nobody publishes this. Someone who reads datacentre filings would know.',
    requires: { skills: { industry: 2 } },
    format: formatFlop,
    display: 'value',
    goodDirection: 'down',
  },
  {
    id: 'speedup',
    label: 'AI R&D speedup',
    lockedHint: 'The multiplier on research progress. Only meaningful if you know what it multiplies.',
    requires: { anyOf: [{ skills: { ml: 3 } }, { topics: { takeoff: 1 } }] },
    format: (v) => `×${v.toFixed(1)}`,
    display: 'value',
    goodDirection: 'down',
  },
  {
    id: 'lead',
    label: 'Frontier lead',
    lockedHint: 'Requires collection you do not currently have. Public estimates are worthless.',
    requires: { skills: { intelligence: 3 } },
    format: formatLead,
    display: 'bar',
    max: 8,
    bipolar: true,
  },
  {
    id: 'alarm',
    label: 'Public alarm',
    lockedHint: 'Polling exists. Reading it correctly is a skill.',
    requires: { skills: { political: 2 } },
    format: (v) => `${Math.round(v)} / 100`,
    display: 'bar',
    max: 100,
  },
  {
    id: 'trustUs',
    label: 'Washington trusts you',
    lockedHint: 'You can feel the temperature of a room. Quantifying it is another matter.',
    requires: { skills: { statecraft: 2 } },
    format: (v) => `${Math.round(v)} / 100`,
    display: 'bar',
    max: 100,
    goodDirection: 'up',
  },
  {
    id: 'trustCn',
    label: 'Beijing trusts you',
    lockedHint: 'You can feel the temperature of a room. Quantifying it is another matter.',
    requires: { skills: { statecraft: 2 } },
    format: (v) => `${Math.round(v)} / 100`,
    display: 'bar',
    max: 100,
    goodDirection: 'up',
  },
  {
    id: 'oversight',
    label: 'Oversight integrity',
    lockedHint:
      'Whether anyone is still genuinely checking the system. Almost nobody in either capital can evaluate this.',
    requires: { skills: { alignment: 4 }, topics: { deception: 2 } },
    format: (v) => `${Math.round(v)} / 100`,
    display: 'bar',
    max: 100,
    goodDirection: 'up',
    // The hidden Safety Debt counter, shown only to a player qualified to read it.
    derive: (s) => Math.max(0, Math.min(100, 100 - s.safetyDebt * 4)),
  },
]

export const METRIC_BY_ID: Record<MetricId, MetricDef> = Object.fromEntries(
  METRICS.map((m) => [m.id, m]),
) as Record<MetricId, MetricDef>

export const metricLabel = (id: MetricId): string => METRIC_BY_ID[id].label

/** Opening world state, before the first scene. */
export const INITIAL_METRICS = (): Record<Exclude<MetricId, 'oversight'>, number> => ({
  compute: 26.4,
  speedup: 1.1,
  lead: 1.0,
  alarm: 18,
  trustUs: 50,
  trustCn: 50,
})

export const metricValue = (state: GameState, id: MetricId): number => {
  const def = METRIC_BY_ID[id]
  if (def.derive) return def.derive(state)
  return state.metrics[id as Exclude<MetricId, 'oversight'>] ?? 0
}
