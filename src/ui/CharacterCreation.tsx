import { useState } from 'react'
import type { BackgroundId, FactionId } from '../engine/types'
import { FACTIONS } from '../content/factions'
import { backgroundsFor } from '../content/backgrounds'
import { skillName } from '../content/skills'
import { topicName } from '../content/topics'
import type { SkillId, TopicId } from '../engine/types'

/**
 * Two steps: the seat, then the person.
 *
 * The starting points are shown explicitly, because the whole game is about
 * which doors your specialisation opens — the player should be choosing that
 * knowingly rather than discovering it in Chapter 4.
 */
export function CharacterCreation({
  onStart,
  onBack,
}: {
  onStart: (faction: FactionId, background: BackgroundId) => void
  onBack: () => void
}) {
  const [faction, setFaction] = useState<FactionId | null>(null)
  const [background, setBackground] = useState<BackgroundId | null>(null)

  if (!faction) {
    return (
      <div className="centered">
        <div className="hero-kicker">Step one of two</div>
        <h1 className="hero-title">Take a seat</h1>
        <p className="hero-sub">
          The same nine months, three chairs. The world timeline is shared; what differs is what you
          can reach from where you sit.
        </p>

        <div className="card-grid">
          {FACTIONS.map((f) => (
            <button key={f.id} className="card" onClick={() => setFaction(f.id)}>
              <span className="card-seat">{f.seat}</span>
              <span className="card-name">{f.name}</span>
              <span className="card-blurb">{f.blurb}</span>
              <ul className="card-list">
                {f.instruments.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="btn-row">
          <button className="btn ghost" onClick={onBack}>
            Back
          </button>
        </div>
      </div>
    )
  }

  const options = backgroundsFor(faction)

  return (
    <div className="centered">
      <div className="hero-kicker">Step two of two</div>
      <h1 className="hero-title">Who you are</h1>
      <p className="hero-sub">
        Your background sets where you begin. Nobody can cover all six skills in nine months, so
        this is also a choice about which conversations you will never get to have.
      </p>

      <div className="card-grid">
        {options.map((b) => (
          <button
            key={b.id}
            className={`card${background === b.id ? ' selected' : ''}`}
            onClick={() => setBackground(b.id)}
          >
            <span className="card-seat">{b.title}</span>
            <span className="card-name">{b.name}</span>
            <span className="card-blurb">{b.blurb}</span>
            <div className="card-stats">
              {(Object.entries(b.skills) as [SkillId, number][]).map(([id, n]) => (
                <span key={id} className="tag">
                  {skillName(id)} {n}
                </span>
              ))}
              {(Object.entries(b.topics) as [TopicId, number][]).map(([id, n]) => (
                <span key={id} className="tag topic">
                  {topicName(id)} {n}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="btn-row">
        <button
          className="btn"
          disabled={!background}
          onClick={() => background && onStart(faction, background)}
        >
          Begin
        </button>
        <button className="btn ghost" onClick={() => setFaction(null)}>
          Choose a different seat
        </button>
      </div>
    </div>
  )
}
