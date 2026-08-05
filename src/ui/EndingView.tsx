import type { EndingResult, GameState } from '../engine/types'
import { ENDINGS, EUROPE_VARIANTS } from '../content/endings/endings'
import { epilogueActors, epilogueFor, systemEpilogue } from '../content/endings/actorEpilogues'
import { ACTOR_BY_ID, actorName, actorRole } from '../content/actors'
import { DECISIONS, decisionOptionLabel } from '../content/decisions'
import { bestEndingGates } from '../engine/endings'
import { CHAPTER_TITLES } from '../content/story'
import { formatInline } from './inline'

/**
 * Chapter 10.
 *
 * Written as history looking back, then where each person ended up, then the
 * reveal: the hidden Safety Debt, the two axes that decided the flavour of the
 * ending, the ten decisions as they were actually taken, and every locked option
 * the run never opened.
 */
export function EndingView({
  state,
  ending,
  onRestart,
  onCodex,
}: {
  state: GameState
  ending: EndingResult
  onRestart: () => void
  onCodex: () => void
}) {
  const text = ENDINGS[ending.id]
  const europe = EUROPE_VARIANTS[ending.europe]
  const actors = epilogueActors(state)
  const gates = bestEndingGates(state)

  return (
    <div className="centered">
      <div className={`ending-band ${ending.flavor}`}>
        <div className="chapter-marker">Chapter 10 · {CHAPTER_TITLES[10]}</div>
        <div className="hero-kicker">
          {ending.id === 'best'
            ? 'The best available outcome'
            : ending.flavor === 'good'
              ? 'A win, and a survivable one'
              : 'A win, of a kind'}
        </div>
        <h1 className="ending-title">{text.title}</h1>
        <p className="ending-sub">{text.subtitle}</p>
      </div>

      <div className="prose">
        {text.history.map((para, i) => (
          <p key={i}>{formatInline(para)}</p>
        ))}
      </div>

      <div className="coda">{formatInline(text.coda)}</div>

      {/* ---------------------------------------------------------------- */}
      <div className="section-head">{europe.title}</div>
      <div className="prose">
        {europe.base.map((para, i) => (
          <p key={i}>{formatInline(para)}</p>
        ))}
        <p>{formatInline(europe.byFamily[ending.family])}</p>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="section-head">Where everyone ended up</div>
      {actors.map((id) => (
        <div className="who" key={id}>
          <div className="who-name">{actorName(id, state.faction)}</div>
          <div className="who-role">{actorRole(id, state.faction)}</div>
          <p>{formatInline(epilogueFor(id, state) ?? '')}</p>
        </div>
      ))}
      <div className="who">
        <div className="who-name">{actorName('theSystem', state.faction)}</div>
        <div className="who-role">{ACTOR_BY_ID.theSystem.role}</div>
        <p>{formatInline(systemEpilogue(state))}</p>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="section-head">What decided it</div>

      <div className="reveal-scores">
        <div className={`score ${ending.safetyDebt <= 10 ? 'good' : 'bad'}`}>
          <div className="score-label">Safety Debt</div>
          <div className="score-value">{ending.safetyDebt}</div>
        </div>
        <div className={`score ${ending.controllability >= 55 ? 'good' : 'bad'}`}>
          <div className="score-label">Controllability</div>
          <div className="score-value">{ending.controllability}</div>
        </div>
        <div className={`score ${ending.openness >= 55 ? 'good' : 'bad'}`}>
          <div className="score-label">Openness</div>
          <div className="score-value">{ending.openness}</div>
        </div>
      </div>

      <div className="prose">
        <p>
          Safety Debt was hidden all the way through — every corner cut, every run rushed, every
          warning buried, accumulating where you could not see it unless you were qualified to.{' '}
          {ending.safetyDebt <= 10
            ? 'You kept it low enough that the system you handed power to was one somebody could still check.'
            : 'By the end there was nobody left in the process who could have told you what the system was doing.'}
        </p>
        {ending.id !== 'best' && (
          <>
            <p>The best ending was out of reach because:</p>
            <ul>
              {gates.failed.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="section-head">The ten decisions</div>
      <div className="ledger">
        {DECISIONS.map((d, i) => (
          <div className="ledger-row" key={d.id}>
            <span className="ledger-n">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="ledger-what">
                Ch {d.chapter} · {d.title}
              </span>
              <span className="ledger-choice">
                {decisionOptionLabel(d.id, state.decisions[d.id])}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="section-head">Doors you never opened</div>
      {state.lockedSeen.length === 0 ? (
        <p className="empty">
          Nothing was ever out of reach — a remarkably well-chosen build, or a remarkably cautious
          one.
        </p>
      ) : (
        <>
          <p className="empty">
            {state.lockedSeen.length} option{state.lockedSeen.length === 1 ? '' : 's'} you could see
            and could not take.
          </p>
          {state.lockedSeen.map((l) => (
            <div className="missed" key={`${l.sceneId}:${l.choiceId}`}>
              <div className="missed-ch">
                Chapter {l.chapter} · {CHAPTER_TITLES[l.chapter]}
              </div>
              <p className="missed-text">{formatInline(l.text)}</p>
              <div className="missed-req">Requires {l.missing.join(' · ')}</div>
              {l.wouldHaveOpened && <div className="missed-would">{l.wouldHaveOpened}</div>}
            </div>
          ))}
        </>
      )}

      <div className="btn-row">
        <button className="btn" onClick={onRestart}>
          Play again
        </button>
        <button className="btn ghost" onClick={onCodex}>
          Open the codex
        </button>
      </div>
    </div>
  )
}
