import { describe, expect, it } from 'vitest'
import type { GameState, Requirement } from '../engine/types'
import { createGame, INITIAL_SAFETY_DEBT } from '../engine/reducer'
import { describeRequirement, evaluate, lockLabel } from '../engine/requirements'
import { applyEffect } from '../engine/effects'
import { bestEndingGates, controllability, openness, resolveEnding } from '../engine/endings'
import { crisisLocus, rivalSafetyDebt } from '../engine/derived'
import { METRIC_BY_ID, metricValue } from '../content/metrics'

const base = (): GameState => createGame('us', 'us_darpa')

describe('requirements', () => {
  it('phrases a skill gate the way the UI shows it', () => {
    const req: Requirement = { skills: { statecraft: 4 } }
    expect(describeRequirement(req)).toBe('Statecraft 4')
    expect(lockLabel(evaluate(req, base()))).toBe('Requires Statecraft 4')
  })

  it('lists only the clauses that actually fail', () => {
    // us_darpa starts with Alignment 2, so only the topic clause should show.
    const req: Requirement = { skills: { alignment: 2 }, topics: { deception: 2 } }
    const check = evaluate(req, base())
    expect(check.met).toBe(false)
    expect(check.missing).toEqual(['Model Deception 2'])
  })

  it('treats a disjunction as satisfied when either branch holds', () => {
    const req: Requirement = { anyOf: [{ skills: { ml: 2 } }, { topics: { takeoff: 9 } }] }
    expect(evaluate(req, base()).met).toBe(true)
    expect(describeRequirement(req)).toBe('Machine Learning 2 or Takeoff Dynamics 9')
  })

  it('marks a wrong-seat requirement structural so the option is hidden, not greyed', () => {
    const check = evaluate({ faction: ['cn'] }, base())
    expect(check.met).toBe(false)
    expect(check.structural).toBe(true)
  })

  it('marks a skill gate non-structural so the option is greyed, not hidden', () => {
    const check = evaluate({ skills: { statecraft: 9 } }, base())
    expect(check.structural).toBe(false)
  })

  it('reads derived flags alongside real ones', () => {
    const s = base()
    // A fresh run carries the world's baseline debt and no decisions, so the
    // rival is not yet disordered enough for anyone to seize a programme.
    expect(evaluate({ flags: ['crisisContained'] }, s).met).toBe(true)
    expect(evaluate({ flags: ['crisisYours'] }, s).met).toBe(false)
  })

  it('an empty requirement is always met', () => {
    expect(evaluate(undefined, base()).met).toBe(true)
    expect(describeRequirement(undefined)).toBe('')
  })
})

describe('effects', () => {
  it('applies deltas rather than assignments', () => {
    const s = base()
    const next = applyEffect(s, { skills: { alignment: 2 } })
    expect(next.skills.alignment).toBe(s.skills.alignment + 2)
  })

  it('does not mutate the state it is given', () => {
    const s = base()
    const before = s.skills.alignment
    applyEffect(s, { skills: { alignment: 3 } })
    expect(s.skills.alignment).toBe(before)
  })

  it('clamps trust to the readable range', () => {
    const s = applyEffect(base(), { metrics: { trustCn: 500 } })
    expect(s.metrics.trustCn).toBe(100)
    const t = applyEffect(base(), { metrics: { trustCn: -500 } })
    expect(t.metrics.trustCn).toBe(0)
  })

  it('never lets Safety Debt go negative', () => {
    const s = applyEffect(base(), { safetyDebt: -999 })
    expect(s.safetyDebt).toBe(0)
  })

  it('refuses to write the derived oversight metric directly', () => {
    const s = applyEffect(base(), { metrics: { oversight: 50 } })
    expect(metricValue(s, 'oversight')).toBe(metricValue(base(), 'oversight'))
  })

  it('records actors met without duplicating them', () => {
    let s = applyEffect(base(), { meetActors: ['chiefScientist'] })
    s = applyEffect(s, { meetActors: ['chiefScientist'] })
    expect(s.metActors.filter((a) => a === 'chiefScientist')).toHaveLength(1)
  })
})

describe('the hidden counter', () => {
  it('starts the world already in debt, so early caution is not discarded', () => {
    expect(base().safetyDebt).toBe(INITIAL_SAFETY_DEBT)
    expect(INITIAL_SAFETY_DEBT).toBeGreaterThan(0)
  })

  it('is only readable by someone qualified to read it', () => {
    const s = base()
    const req = METRIC_BY_ID.oversight.requires
    expect(evaluate(req, s).met).toBe(false)

    const expert = applyEffect(s, { skills: { alignment: 4 }, topics: { deception: 2 } })
    expect(evaluate(req, expert).met).toBe(true)
  })

  it('shows oversight falling as debt rises', () => {
    const clean = applyEffect(base(), { safetyDebt: -8 })
    const dirty = applyEffect(base(), { safetyDebt: 12 })
    expect(metricValue(clean, 'oversight')).toBeGreaterThan(metricValue(dirty, 'oversight'))
  })
})

describe('where the crisis lands', () => {
  const withDecisions = (s: GameState, decisions: GameState['decisions']): GameState => ({
    ...s,
    decisions,
  })

  it('finds the reckless programme', () => {
    const s = { ...base(), safetyDebt: 30 }
    expect(crisisLocus(s)).toBe('yours')
  })

  it('finds the rival when you were the careful one', () => {
    const s = withDecisions({ ...base(), safetyDebt: 2 }, {
      d2_posture: 'posture_race',
      d6_leash: 'full_auto',
      d8_summit: 'defect',
    })
    expect(rivalSafetyDebt(s)).toBeGreaterThanOrEqual(12)
    expect(crisisLocus(s)).toBe('rivals')
  })

  it('spares a world where both sides kept oversight', () => {
    const s = withDecisions(
      { ...base(), safetyDebt: 2, flags: { verificationRegime: true } },
      { d2_posture: 'posture_restrain_hard', d6_leash: 'human_loop', d8_summit: 'honest_verified' },
    )
    expect(crisisLocus(s)).toBe('contained')
  })

  it('catches both when everyone was reckless', () => {
    const s = withDecisions({ ...base(), safetyDebt: 30 }, {
      d2_posture: 'posture_race',
      d6_leash: 'full_auto',
      d8_summit: 'defect',
    })
    expect(crisisLocus(s)).toBe('both')
  })
})

describe('ending resolution', () => {
  const goodRun = (): GameState => ({
    ...base(),
    safetyDebt: 2,
    coercion: 0,
    metrics: { ...base().metrics, trustUs: 80, trustCn: 80, lead: 1 },
    flags: { verificationRegime: true, agreementExists: true, grabStopped: true },
    decisions: {
      d3_evidence: 'give_rival',
      d6_leash: 'gated_deploy_real',
      d7_target: 'alignment_published',
      d8_summit: 'honest_verified',
      d9_crisis: 'contain_inspected',
      d10_keys: 'joint',
    },
  })

  it('reaches the best ending when every gate is cleared', () => {
    const s = goodRun()
    expect(bestEndingGates(s).met).toBe(true)
    const ending = resolveEnding(s)
    expect(ending.id).toBe('best')
    expect(ending.family).toBe('shared-safe')
  })

  it('falls back to the leading power when a shared arrangement fails its gates', () => {
    // Same shared-authority choice, but the corners were cut.
    const s: GameState = { ...goodRun(), safetyDebt: 40 }
    expect(bestEndingGates(s).met).toBe(false)
    expect(resolveEnding(s).family).toBe('us-wins')
  })

  it('refuses the best ending to someone who trusted a system they could not check', () => {
    const s: GameState = { ...goodRun(), decisions: { ...goodRun().decisions, d9_crisis: 'trust' } }
    const gates = bestEndingGates(s)
    expect(gates.met).toBe(false)
    expect(gates.failed.join(' ')).toContain('unable to check')
  })

  it('separates a controllable system from an open society', () => {
    const s = goodRun()
    // Crush the rival and seize power at home: still checkable, no longer open.
    const brutal: GameState = {
      ...s,
      flags: { ...s.flags, rivalCrushed: true, grabSucceeded: true, grabStopped: false },
      coercion: 4,
      decisions: { ...s.decisions, d10_keys: 'us_alone' },
    }
    expect(controllability(brutal)).toBeGreaterThanOrEqual(55)
    expect(openness(brutal)).toBeLessThan(55)
    expect(resolveEnding(brutal).id).toBe('us-bad')
  })

  it('routes "the lab" to whichever power is actually ahead', () => {
    const s = goodRun()
    const ahead: GameState = {
      ...s,
      metrics: { ...s.metrics, lead: 3 },
      decisions: { ...s.decisions, d10_keys: 'lab' },
    }
    const behind: GameState = {
      ...ahead,
      metrics: { ...s.metrics, lead: -3 },
    }
    expect(resolveEnding(ahead).family).toBe('us-wins')
    expect(resolveEnding(behind).family).toBe('cn-wins')
  })
})

describe('Europe’s standing', () => {
  const eu = (trustUs: number, trustCn: number, flags: Record<string, boolean> = {}): GameState => ({
    ...createGame('eu', 'eu_commissioner'),
    safetyDebt: 2,
    metrics: { ...createGame('eu', 'eu_commissioner').metrics, trustUs, trustCn },
    flags: { agreementExists: true, verificationRegime: true, ...flags },
    decisions: { d10_keys: 'joint', d9_crisis: 'contain_inspected' },
  })

  it('is Guarantor when both capitals trust you and you hold the regime', () => {
    expect(resolveEnding(eu(70, 65, { euHostsVerification: true })).europe).toBe('guarantor')
  })

  it('is Client when you kept only one of them', () => {
    expect(resolveEnding(eu(90, 20)).europe).toBe('client')
  })

  it('is Bypassed when neither of them takes you seriously', () => {
    expect(resolveEnding(eu(20, 20)).europe).toBe('irrelevant')
  })

  it('is Third Pole only when the bid succeeded and standing held', () => {
    expect(resolveEnding(eu(60, 60, { euThirdPole: true })).europe).toBe('third-pole')
    // The bid without the standing to sustain it is not a third pole.
    expect(resolveEnding(eu(70, 20, { euThirdPole: true })).europe).toBe('client')
  })
})
