import type { GameState, MetricId } from '../engine/types'
import { METRICS, metricValue, type MetricDef } from '../content/metrics'
import { SKILLS } from '../content/skills'
import { TOPICS } from '../content/topics'
import { BACKGROUND_BY_ID } from '../content/backgrounds'
import { FACTION_BY_ID } from '../content/factions'
import { describeRequirement, evaluate } from '../engine/requirements'

/**
 * The instrument panel. Numbers tick upward as the story advances — but only the
 * ones you are qualified to read.
 *
 * A metric you cannot see is drawn as a redaction bar with its requirement
 * beside it, using the same phrasing helper as a locked dialogue option. That is
 * the point of the design: a player without Intelligence genuinely does not know
 * who is ahead, and the margin says so rather than quietly omitting the row.
 */
export function Sidebar({ state }: { state: GameState }) {
  const bg = BACKGROUND_BY_ID[state.background]
  const faction = FACTION_BY_ID[state.faction]

  return (
    <aside className="panel">
      <div className="panel-block">
        <div className="panel-title">The world</div>
        {METRICS.map((m) => (
          <Metric key={m.id} def={m} state={state} />
        ))}
      </div>

      <div className="panel-block">
        <div className="panel-title">Skills</div>
        {SKILLS.map((s) => (
          <Stat key={s.id} label={s.name} value={state.skills[s.id]} title={s.blurb} />
        ))}
      </div>

      <div className="panel-block">
        <div className="panel-title">What you know</div>
        {TOPICS.filter((t) => state.topics[t.id] > 0).map((t) => (
          <Stat key={t.id} label={t.name} value={state.topics[t.id]} title={t.blurb} />
        ))}
        {TOPICS.every((t) => state.topics[t.id] === 0) && (
          <div className="stat-row zero">
            <span>Nothing yet</span>
          </div>
        )}
      </div>

      <div className="identity">
        <strong>{bg.title}</strong>
        {faction.name} · {faction.seat}
      </div>
    </aside>
  )
}

function Metric({ def, state }: { def: MetricDef; state: GameState }) {
  const check = evaluate(def.requires, state)

  if (!check.met) {
    return (
      <div className="metric redacted" title={def.lockedHint}>
        <div className="metric-head">
          <span className="metric-label">{def.label}</span>
        </div>
        <div className="redaction" aria-hidden="true" />
        <span className="metric-req">Requires {describeRequirement(def.requires)}</span>
      </div>
    )
  }

  const value = metricValue(state, def.id)

  return (
    <div className="metric" title={def.lockedHint}>
      <div className="metric-head">
        <span className="metric-label">{def.label}</span>
        <span className="metric-value">{def.format(value)}</span>
      </div>
      {def.display === 'bar' && <Bar def={def} id={def.id} value={value} />}
    </div>
  )
}

function Bar({ def, id, value }: { def: MetricDef; id: MetricId; value: number }) {
  const max = def.max ?? 100

  if (def.bipolar) {
    // Centred bar: fills left of centre for negative, right for positive.
    const magnitude = Math.min(Math.abs(value) / max, 1) * 50
    const left = value >= 0 ? 50 : 50 - magnitude
    return (
      <div className="metric-bar">
        <div className="metric-fill accent" style={{ left: `${left}%`, width: `${magnitude}%` }} />
        <div className="metric-mid" />
      </div>
    )
  }

  const pct = Math.max(0, Math.min(1, value / max)) * 100
  const tone = toneFor(id, value, max)

  return (
    <div className="metric-bar">
      <div className={`metric-fill ${tone}`} style={{ left: 0, width: `${pct}%` }} />
    </div>
  )
}

/** Green where high is reassuring, red where high is alarming. */
function toneFor(id: MetricId, value: number, max: number): string {
  const ratio = value / max
  if (id === 'oversight') return ratio >= 0.55 ? 'good' : 'bad'
  if (id === 'alarm') return ratio >= 0.6 ? 'bad' : ''
  if (id === 'trustUs' || id === 'trustCn') return ratio >= 0.55 ? 'good' : ratio <= 0.35 ? 'bad' : ''
  return ''
}

function Stat({ label, value, title }: { label: string; value: number; title: string }) {
  return (
    <div className={`stat-row${value === 0 ? ' zero' : ''}`} title={title}>
      <span>{label}</span>
      <span className="pips" aria-label={`${value}`}>
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className={`pip${i < value ? ' on' : ''}`} />
        ))}
      </span>
    </div>
  )
}
