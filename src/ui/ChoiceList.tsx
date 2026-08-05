import type { GameState } from '../engine/types'
import { evaluatedChoices } from '../engine/reducer'
import { lockLabel } from '../engine/requirements'
import { DECISION_BY_ID } from '../content/decisions'
import { formatInline } from './inline'

/**
 * Every option the player can see, available or not.
 *
 * A locked option is rendered greyed out with its requirement spelled out, never
 * hidden — the whole point of the skill system is that you can see the doors your
 * build does not open. Only structurally impossible options (wrong seat, or
 * contradicted by an earlier decision) are filtered, and that filtering happens
 * upstream in `evaluatedChoices`.
 */
export function ChoiceList({
  state,
  onChoose,
}: {
  state: GameState
  onChoose: (choiceId: string) => void
}) {
  const options = evaluatedChoices(state)

  return (
    <div className="choices">
      <div className="choices-title">
        {options.length === 1 && options[0]?.check.met ? 'Continue' : 'Your move'}
      </div>

      {options.map(({ choice, check }) => {
        const decision = choice.majorDecision ? DECISION_BY_ID[choice.majorDecision] : null

        if (!check.met) {
          return (
            <div
              key={choice.id}
              className="choice locked"
              aria-disabled="true"
              title={lockLabel(check)}
            >
              {decision && <span className="choice-major">Major decision · {decision.title}</span>}
              <span className="choice-text">{formatInline(choice.text)}</span>
              {choice.detail && <span className="choice-detail">{formatInline(choice.detail)}</span>}
              <span className="lock-req">{lockLabel(check)}</span>
            </div>
          )
        }

        return (
          <button key={choice.id} className="choice" onClick={() => onChoose(choice.id)}>
            {decision && <span className="choice-major">Major decision · {decision.title}</span>}
            <span className="choice-text">{formatInline(choice.text)}</span>
            {choice.detail && <span className="choice-detail">{formatInline(choice.detail)}</span>}
          </button>
        )
      })}
    </div>
  )
}
