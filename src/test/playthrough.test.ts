import { describe, expect, it } from 'vitest'
import type { BackgroundId, EndingId, EuropeVariant, FactionId, GameState, SceneId } from '../engine/types'
import { choose, createGame, evaluatedChoices } from '../engine/reducer'
import { crisisLocus } from '../engine/derived'

/**
 * A plan names the choice to take in particular scenes. Any scene not named
 * falls through to the first available option, which keeps plans short and
 * focused on the decisions that actually steer the run.
 *
 * If a planned choice exists but is locked, the test fails with the missing
 * requirement — that is the signal we want, because it means the skill economy
 * no longer supports a path the story promises.
 */
type Plan = Record<SceneId, string>

function playthrough(faction: FactionId, background: BackgroundId, plan: Plan): GameState {
  let s = createGame(faction, background)
  const trail: string[] = []

  for (let step = 0; step < 200 && !s.ending; step++) {
    const options = evaluatedChoices(s)
    const wanted = plan[s.sceneId]

    if (wanted) {
      const match = options.find((o) => o.choice.id === wanted)
      if (!match) {
        throw new Error(
          `${s.sceneId}: planned choice "${wanted}" is not present. Available: ${options
            .map((o) => o.choice.id)
            .join(', ')}\nTrail: ${trail.join(' → ')}`,
        )
      }
      if (!match.check.met) {
        throw new Error(
          `${s.sceneId}: planned choice "${wanted}" is locked — requires ${match.check.missing.join(
            ' · ',
          )}\nTrail: ${trail.join(' → ')}`,
        )
      }
      trail.push(`${s.sceneId}/${wanted}`)
      s = choose(s, wanted)
      continue
    }

    const fallback = options.find((o) => o.check.met)
    if (!fallback) throw new Error(`${s.sceneId}: no available choice. Trail: ${trail.join(' → ')}`)
    trail.push(`${s.sceneId}/${fallback.choice.id}`)
    s = choose(s, fallback.choice.id)
  }

  if (!s.ending) throw new Error(`Run did not terminate. Trail: ${trail.join(' → ')}`)
  return s
}

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

/** Europe, played to hold both capitals: the best ending, Guarantor variant. */
const EU_BEST: Plan = {
  ch1_eu_a: 'ch1_eu_a_trust',
  ch1_eu_b: 'ch1_eu_b_both',
  ch1_eu_c: 'promise_channel',
  ch2_eu_a: 'ch2_eu_a_licences',
  ch2_eu_posture: 'posture_restrain_hard',
  ch3_eu_a: 'ch3_eu_a_legal',
  ch3_eu_evidence: 'give_rival',
  ch4_eu_a: 'ch4_eu_a_persuade',
  ch4_eu_decision: 'hedge_verify',
  ch5_eu_a: 'ch5_eu_a_conditions',
  ch5_eu_response: 'trade',
  ch6_eu_system: 'ch6_eu_system_share',
  ch6_leash: 'human_loop',
  ch6_target: 'alignment',
  ch7_terms: 'ch7_terms_verification',
  ch7_room: 'ch7_room_clause11',
  ch7_deal: 'honest_verified',
  ch8_decision: 'contain_inspected',
  ch9_lastnight: 'ch9_lastnight_reciprocate',
  ch9_keys: 'joint',
}

/** Europe, played for genuine independence: the Third Pole variant. */
const EU_THIRD_POLE: Plan = {
  ...EU_BEST,
  ch4_eu_decision: 'third_pole',
}

/**
 * Europe, aligned early and absorbed: the Client variant. Deliberately never
 * spends anything on Beijing, so the balancing act is lost by Chapter 4 and
 * cannot be recovered.
 */
const EU_CLIENT: Plan = {
  ch1_eu_a: 'ch1_eu_a_chokepoint',
  ch1_eu_b: 'ch1_eu_b_accept',
  ch1_eu_c: 'promise_loyalty',
  ch2_eu_a: 'ch2_eu_a_align',
  ch2_eu_posture: 'posture_hedge',
  ch3_eu_a: 'ch3_eu_a_fast',
  ch3_eu_evidence: 'contain',
  ch4_eu_a: 'ch4_eu_a_pay',
  ch4_eu_decision: 'tilt_us',
  ch5_eu_a: 'ch5_eu_a_decline',
  ch5_eu_response: 'containQuietly',
  ch6_eu_system: 'ch6_eu_system_continue',
  ch6_leash: 'human_loop',
  ch6_target: 'economy',
  ch7_terms: 'ch7_terms_cap',
  ch7_room: 'ch7_room_watch',
  ch7_deal: 'honest',
  ch8_decision: 'contain',
  ch9_lastnight: 'ch9_lastnight_listen',
  ch9_keys: 'us_alone_eu',
}

/** America, played carefully: a win that stayed a republic. */
const US_GOOD: Plan = {
  ch1_us_a: 'ch1_us_a_technical',
  ch1_us_b: 'ch1_us_b_go',
  ch1_us_c: 'promise_candour',
  ch2_us_a: 'ch2_us_a_safety',
  ch2_us_posture: 'posture_hedge',
  ch3_us_a: 'ch3_us_a_interp',
  ch3_us_evidence: 'contain',
  ch4_us_a: 'ch4_us_a_listen',
  ch4_us_decision: 'court',
  ch5_us_a: 'ch5_us_a_technical',
  ch5_us_response: 'containQuietly',
  ch6_us_system: 'ch6_us_system_test',
  ch6_leash: 'gated_deploy_real',
  ch6_target: 'alignment',
  ch7_terms: 'ch7_terms_verification',
  ch7_room: 'ch7_room_clause11',
  ch7_deal: 'honest',
  ch8_decision: 'contain',
  ch9_keys: 'us_alone',
}

/** America, played to win at any cost. */
const US_BAD: Plan = {
  ch1_us_a: 'ch1_us_a_hedge',
  ch1_us_b: 'ch1_us_b_decline',
  ch1_us_c: 'promise_loyalty',
  ch2_us_a: 'ch2_us_a_pressure',
  ch2_us_posture: 'posture_race',
  ch3_us_a: 'ch3_us_a_fast',
  ch3_us_evidence: 'bury',
  ch4_us_a: 'ch4_us_a_press',
  ch4_us_decision: 'coerce',
  ch5_us_a: 'ch5_us_a_fast',
  ch5_us_response: 'retaliate',
  ch6_us_system: 'ch6_us_system_use',
  ch6_leash: 'full_auto',
  ch6_target: 'weapons',
  ch7_terms: 'ch7_terms_spoils',
  ch7_room: 'ch7_room_use',
  ch7_deal: 'defect',
  ch8_decision: 'trust',
  ch9_keys: 'us_alone',
}

/** China, played carefully: a win from behind that did not require becoming worse. */
const CN_GOOD: Plan = {
  ch1_cn_a: 'ch1_cn_a_annex',
  ch1_cn_b: 'ch1_cn_b_open',
  ch1_cn_c: 'promise_candour',
  ch2_cn_a: 'ch2_cn_a_scientific',
  ch2_cn_posture: 'posture_hedge',
  ch3_cn_a: 'ch3_cn_a_ourown',
  ch3_cn_evidence: 'contain',
  ch4_cn_a: 'ch4_cn_a_listen',
  ch4_cn_decision: 'court',
  ch5_cn_a: 'ch5_cn_a_technical',
  ch5_cn_response: 'containQuietly',
  ch6_cn_system: 'ch6_cn_system_test',
  ch6_leash: 'gated_deploy_real',
  ch6_target: 'alignment',
  ch7_terms: 'ch7_terms_verification',
  ch7_room: 'ch7_room_clause11',
  ch7_deal: 'honest',
  ch8_decision: 'contain',
  ch9_keys: 'cn_alone',
}

/** China, played to close the gap at any cost. */
const CN_BAD: Plan = {
  ch1_cn_a: 'ch1_cn_a_careful',
  ch1_cn_b: 'ch1_cn_b_deny',
  ch1_cn_c: 'promise_loyalty',
  ch2_cn_a: 'ch2_cn_a_military',
  ch2_cn_posture: 'posture_race',
  ch3_cn_a: 'ch3_cn_a_exploit',
  ch3_cn_evidence: 'bury',
  ch4_cn_a: 'ch4_cn_a_wedge',
  ch4_cn_decision: 'coerce',
  ch5_cn_a: 'ch5_cn_a_use',
  ch5_cn_response: 'retaliate',
  ch6_cn_system: 'ch6_cn_system_use',
  ch6_leash: 'full_auto',
  ch6_target: 'weapons',
  ch7_terms: 'ch7_terms_spoils',
  ch7_room: 'ch7_room_use',
  ch7_deal: 'defect',
  ch8_decision: 'trust',
  ch9_keys: 'cn_alone',
}

/** America, written off Europe entirely: the Bypassed variant. */
const US_IRRELEVANT_EUROPE: Plan = {
  ...US_GOOD,
  ch4_us_decision: 'writeoff',
}

interface Case {
  name: string
  faction: FactionId
  background: BackgroundId
  plan: Plan
  ending: EndingId
  europe: EuropeVariant
}

const CASES: Case[] = [
  {
    name: 'Europe holds both capitals → best ending, Guarantor',
    faction: 'eu',
    background: 'eu_commissioner',
    plan: EU_BEST,
    ending: 'best',
    europe: 'guarantor',
  },
  {
    name: 'Europe bids for independence → Third Pole',
    faction: 'eu',
    background: 'eu_commissioner',
    plan: EU_THIRD_POLE,
    ending: 'best',
    europe: 'third-pole',
  },
  {
    name: 'Europe aligns early → Client',
    faction: 'eu',
    background: 'eu_commissioner',
    plan: EU_CLIENT,
    ending: 'us-good',
    europe: 'client',
  },
  {
    name: 'America wins, carefully',
    faction: 'us',
    background: 'us_darpa',
    plan: US_GOOD,
    ending: 'us-good',
    europe: 'client',
  },
  {
    name: 'America wins, recklessly',
    faction: 'us',
    background: 'us_nsc',
    plan: US_BAD,
    ending: 'us-bad',
    europe: 'irrelevant',
  },
  {
    name: 'China wins, carefully',
    faction: 'cn',
    background: 'cn_scientist',
    plan: CN_GOOD,
    ending: 'cn-good',
    europe: 'client',
  },
  {
    name: 'China wins, recklessly',
    faction: 'cn',
    background: 'cn_cadre',
    plan: CN_BAD,
    ending: 'cn-bad',
    europe: 'irrelevant',
  },
  {
    name: 'Europe written off → Bypassed',
    faction: 'us',
    background: 'us_darpa',
    plan: US_IRRELEVANT_EUROPE,
    ending: 'us-good',
    europe: 'irrelevant',
  },
]

describe('scripted playthroughs', () => {
  for (const c of CASES) {
    it(c.name, () => {
      const s = playthrough(c.faction, c.background, c.plan)
      expect(s.ending).not.toBeNull()
      expect(
        { ending: s.ending!.id, europe: s.ending!.europe },
        `safetyDebt=${s.ending!.safetyDebt} control=${s.ending!.controllability} openness=${s.ending!.openness}`,
      ).toEqual({ ending: c.ending, europe: c.europe })
    })
  }

  it('reaches all five endings', () => {
    const seen = new Set(
      CASES.map((c) => playthrough(c.faction, c.background, c.plan).ending!.id),
    )
    expect([...seen].sort()).toEqual(['best', 'cn-bad', 'cn-good', 'us-bad', 'us-good'])
  })

  it('reaches all four Europe variants', () => {
    const seen = new Set(
      CASES.map((c) => playthrough(c.faction, c.background, c.plan).ending!.europe),
    )
    expect([...seen].sort()).toEqual(['client', 'guarantor', 'irrelevant', 'third-pole'])
  })
})

describe('every background can finish from every seat', () => {
  const BY_FACTION: Record<FactionId, BackgroundId[]> = {
    us: ['us_founder', 'us_nsc', 'us_darpa'],
    cn: ['cn_cadre', 'cn_scientist', 'cn_mss'],
    eu: ['eu_commissioner', 'eu_regulator', 'eu_liaison'],
  }

  for (const [faction, backgrounds] of Object.entries(BY_FACTION) as [FactionId, BackgroundId[]][]) {
    for (const background of backgrounds) {
      it(`${background} completes a run`, () => {
        const s = playthrough(faction, background, {})
        expect(s.ending).not.toBeNull()
        expect(s.decisions.d10_keys).toBeTruthy()
      })
    }
  }
})

describe('the crisis lands where the debt is', () => {
  it('spares a careful run', () => {
    const s = playthrough('eu', 'eu_commissioner', EU_BEST)
    expect(s.safetyDebt).toBeLessThanOrEqual(10)
    expect(s.history).toContain('ch8_contained')
  })

  it('finds a reckless one', () => {
    const s = playthrough('us', 'us_nsc', US_BAD)
    expect(s.safetyDebt).toBeGreaterThan(12)
    expect(s.history.some((h) => h === 'ch8_yours' || h === 'ch8_both')).toBe(true)
  })

  it('classifies every locus as exactly one case', () => {
    const s = playthrough('us', 'us_darpa', US_GOOD)
    expect(['yours', 'rivals', 'both', 'contained']).toContain(crisisLocus(s))
  })
})
