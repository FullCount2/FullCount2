import type { EndingId, EuropeVariant, Progress } from '../engine/types'
import { ENDINGS, EUROPE_VARIANTS } from '../content/endings/endings'
import { ACTORS } from '../content/actors'
import { TOPICS } from '../content/topics'
import { BACKGROUNDS } from '../content/backgrounds'
import { FACTION_BY_ID } from '../content/factions'

/**
 * What the player has unlocked across runs: the ending gallery, the four Europe
 * variants, and the dossier of people, topics and backgrounds encountered.
 *
 * Unseen entries are shown as dashed placeholders with a hint at the conditions,
 * so the five-ending structure reads as something to go after rather than trivia.
 */

const ENDING_ORDER: EndingId[] = ['best', 'us-good', 'us-bad', 'cn-good', 'cn-bad']

const ENDING_HINTS: Record<EndingId, string> = {
  best: 'Low Safety Debt, a verification regime that actually exists, a crisis handled by somebody able to check, and authority placed in shared or constitutional hands.',
  'us-good': 'Washington holds it — and the system stayed checkable and the republic stayed open.',
  'us-bad': 'Washington holds something nobody can audit, or had to close every door to keep it.',
  'cn-good': 'Beijing holds it, with oversight intact and the loser left standing.',
  'cn-bad': 'Beijing holds it, and the emergency never ended.',
}

const EUROPE_ORDER: EuropeVariant[] = ['guarantor', 'third-pole', 'client', 'irrelevant']

/** The usurper is deliberately anonymous and has no dossier entry. */
const NAMED_ACTORS = ACTORS.filter((a) => a.id !== 'usurper')

const EUROPE_HINTS: Record<EuropeVariant, string> = {
  guarantor: 'Hold both capitals’ trust at once, and host the verification regime.',
  'third-pole': 'Hold the Union together, then bid for genuine independence in Chapter 4.',
  client: 'Take one capital’s side early, and be safe inside somebody else’s settlement.',
  irrelevant: 'Be trusted by nobody, or be written off by whoever wins.',
}

export function Codex({
  progress,
  onBack,
}: {
  progress: Progress
  onBack: () => void
}) {
  return (
    <div className="centered">
      <div className="hero-kicker">
        {progress.runsCompleted} run{progress.runsCompleted === 1 ? '' : 's'} completed
      </div>
      <h1 className="hero-title">The codex</h1>
      <p className="hero-sub">
        What you have found so far. It fills in across runs, and nothing here is ever lost.
      </p>

      <div className="section-head">Endings · {progress.endingsSeen.length} of 5</div>
      {ENDING_ORDER.map((id) => {
        const seen = progress.endingsSeen.includes(id)
        return (
          <div key={id} className={`gallery-item${seen ? '' : ' unseen'}`}>
            <div className="gallery-name">{seen ? ENDINGS[id].title : '— not yet reached —'}</div>
            <div className="gallery-hint">{seen ? ENDINGS[id].subtitle : ENDING_HINTS[id]}</div>
          </div>
        )
      })}

      <div className="section-head">
        Europe · {progress.europeVariantsSeen.length} of 4 variants
      </div>
      {EUROPE_ORDER.map((id) => {
        const seen = progress.europeVariantsSeen.includes(id)
        return (
          <div key={id} className={`gallery-item${seen ? '' : ' unseen'}`}>
            <div className="gallery-name">{EUROPE_VARIANTS[id].title}</div>
            <div className="gallery-hint">
              {seen ? EUROPE_VARIANTS[id].base[0] : EUROPE_HINTS[id]}
            </div>
          </div>
        )
      })}

      <div className="section-head">
        Seats played · {progress.backgroundsPlayed.length} of {BACKGROUNDS.length}
      </div>
      {BACKGROUNDS.map((b) => {
        const seen = progress.backgroundsPlayed.includes(b.id)
        return (
          <div key={b.id} className={`gallery-item${seen ? '' : ' unseen'}`}>
            <div className="gallery-name">
              {b.name} · {FACTION_BY_ID[b.faction].name}
            </div>
            <div className="gallery-hint">{seen ? b.blurb : 'Not yet played.'}</div>
          </div>
        )
      })}

      <div className="section-head">
        People · {progress.actorsMet.filter((id) => id !== 'usurper').length} of {NAMED_ACTORS.length}
      </div>
      {NAMED_ACTORS.map((a) => {
        const seen = progress.actorsMet.includes(a.id)
        return (
          <div key={a.id} className={`gallery-item${seen ? '' : ' unseen'}`}>
            <div className="gallery-name">{seen ? a.name : '— not yet met —'}</div>
            <div className="gallery-hint">
              {seen ? `${a.role}. ${a.blurb}` : `Introduced in Chapter ${a.introChapter}.`}
            </div>
          </div>
        )
      })}

      <div className="section-head">
        What you have learned · {progress.topicsLearned.length} of {TOPICS.length}
      </div>
      {TOPICS.map((t) => {
        const seen = progress.topicsLearned.includes(t.id)
        return (
          <div key={t.id} className={`gallery-item${seen ? '' : ' unseen'}`}>
            <div className="gallery-name">{t.name}</div>
            <div className="gallery-hint">{seen ? t.blurb : 'Not yet studied.'}</div>
          </div>
        )
      })}

      <div className="btn-row">
        <button className="btn" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  )
}
