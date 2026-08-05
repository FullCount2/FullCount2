import type {
  EndingFamily,
  EndingId,
  EndingResult,
  EuropeVariant,
  GameState,
} from './types'

/**
 * Ending resolution.
 *
 * Decision 10 picks the *family* — who ends up holding the keys. Everything the
 * player did before that picks the *flavour*: whether the thing they handed
 * power to is actually controllable, and whether they had to hollow out their
 * own society to get there. Those are deliberately independent axes, so "we won"
 * and "we are fine" are not the same claim.
 */

/** Above this much Safety Debt, the best ending is off the table. */
export const BEST_ENDING_MAX_DEBT = 10

const GOOD_CONTROL_THRESHOLD = 55
const GOOD_OPENNESS_THRESHOLD = 55

const clamp100 = (v: number) => Math.max(0, Math.min(100, v))

/** Which power the "hand it to the lab that built it" option actually favours. */
const leadingPower = (s: GameState): 'us' | 'cn' => (s.metrics.lead >= 0 ? 'us' : 'cn')

/**
 * Is the system anyone ends up holding actually under control?
 *
 * Safety Debt dominates, but the Chapter 6 leash and targeting decisions and the
 * Chapter 8 response can each move this substantially — a player who ran a dirty
 * programme and then genuinely shut it down when caught is in better shape than
 * one who never had to choose.
 */
export function controllability(s: GameState): number {
  let v = 100 - s.safetyDebt * 4

  switch (s.decisions.d6_leash) {
    case 'refuse':
      v += 15
      break
    case 'human_loop':
      v += 12
      break
    case 'gated_deploy':
      v += 6
      break
    case 'gated_deploy_real':
      v += 18
      break
    case 'full_auto':
      v -= 14
      break
  }

  switch (s.decisions.d7_target) {
    case 'alignment':
      v += 16
      break
    case 'alignment_published':
      v += 22
      break
    case 'economy':
      v += 2
      break
    case 'capabilities':
      v -= 6
      break
    case 'weapons':
      v -= 14
      break
  }

  switch (s.decisions.d9_crisis) {
    case 'shutdown':
      v += 12
      break
    case 'contain':
      v += 6
      break
    case 'contain_inspected':
      v += 16
      break
    case 'trust_informed':
      // Trust as an expert judgement, made by someone qualified to make it.
      v += 4
      break
    case 'trust':
      // Trusting it without being able to check is the decision the epilogue is about.
      v -= 14
      break
  }

  // Understanding what you built is worth something on its own.
  v += s.skills.alignment * 2
  if (s.topics.interp >= 2) v += 4
  if (s.topics.deception >= 2) v += 4

  return clamp100(v)
}

/**
 * Did the winner remain a society worth being? Coercion, a successful domestic
 * power grab, and crushing the loser all cost here; honest dealing and keeping
 * oversight alive pay.
 */
export function openness(s: GameState): number {
  let v = 60

  v -= s.coercion * 5

  switch (s.decisions.d8_summit) {
    case 'honest':
      v += 12
      break
    case 'honest_verified':
      v += 16
      break
    case 'honest_joint':
      v += 20
      break
    case 'refuse':
      v -= 6
      break
    case 'defect':
      v -= 12
      break
  }

  switch (s.decisions.d3_evidence) {
    case 'leak':
      v += 8
      break
    case 'give_rival':
      v += 6
      break
    case 'contain':
      v += 4
      break
    case 'bury':
      v -= 10
      break
  }

  if (s.flags.grabSucceeded) v -= 30
  if (s.flags.grabStopped) v += 10
  if (s.flags.rivalCrushed) v -= 20
  if (s.flags.verificationRegime) v += 8
  if (s.flags.emergencyPowers) v -= 12

  v += (s.metrics.trustUs + s.metrics.trustCn) / 20

  return clamp100(v)
}

/** Every condition the best ending demands, all of which must hold. */
export function bestEndingGates(s: GameState): { met: boolean; failed: string[] } {
  const failed: string[] = []

  if (s.safetyDebt > BEST_ENDING_MAX_DEBT) failed.push('too many corners cut along the way')
  if (!s.flags.verificationRegime) failed.push('no verification regime was ever established')

  const keys = s.decisions.d10_keys
  if (keys !== 'joint' && keys !== 'constitution') {
    failed.push('authority was not placed in shared or constitutional hands')
  }

  // "Keep it running" only clears this gate in its informed form — the variant
  // that required reading the interpretability evidence personally.
  if (s.decisions.d9_crisis === 'trust') {
    failed.push('the system was trusted by someone unable to check it')
  }

  return { met: failed.length === 0, failed }
}

function resolveFamily(s: GameState): EndingFamily {
  const keys = s.decisions.d10_keys

  if (keys === 'joint' || keys === 'constitution') {
    if (bestEndingGates(s).met) return 'shared-safe'
    // The arrangement was attempted and did not hold. Whoever was ahead
    // simply keeps what they have.
    return leadingPower(s) === 'us' ? 'us-wins' : 'cn-wins'
  }

  if (keys === 'us_alone' || keys === 'us_alone_eu') return 'us-wins'
  if (keys === 'cn_alone' || keys === 'cn_alone_eu') return 'cn-wins'
  if (keys === 'lab') return leadingPower(s) === 'us' ? 'us-wins' : 'cn-wins'

  // No decision recorded (should be unreachable); fall back to the standings.
  return leadingPower(s) === 'us' ? 'us-wins' : 'cn-wins'
}

/**
 * Europe's fate, woven into whichever main ending occurred.
 *
 * When the player holds the European seat this reads their own standing with
 * both capitals — the balancing act they have been running for nine chapters.
 * From Washington or Beijing it reads how the player chose to treat Europe.
 */
export function resolveEurope(s: GameState): EuropeVariant {
  if (s.faction === 'eu') {
    const both = Math.min(s.metrics.trustUs, s.metrics.trustCn)
    const best = Math.max(s.metrics.trustUs, s.metrics.trustCn)

    if (s.flags.euThirdPole && both >= 50) return 'third-pole'
    if (both >= 55 && s.flags.euHostsVerification) return 'guarantor'
    if (both >= 60) return 'guarantor'
    if (best >= 55) return 'client'
    return 'irrelevant'
  }

  // Seen from Washington or Beijing.
  if (s.flags.euThirdPole) return 'third-pole'
  if (s.flags.euHostsVerification && s.flags.verificationRegime) return 'guarantor'

  const d4 = s.decisions.d4_europe
  if (d4 === 'court' || d4 === 'court_verify') return 'client'
  if (d4 === 'coerce' || d4 === 'writeoff') return 'irrelevant'
  return 'client'
}

function endingId(family: EndingFamily, flavor: 'good' | 'bad'): EndingId {
  if (family === 'shared-safe') return 'best'
  if (family === 'us-wins') return flavor === 'good' ? 'us-good' : 'us-bad'
  return flavor === 'good' ? 'cn-good' : 'cn-bad'
}

export function resolveEnding(s: GameState): EndingResult {
  const family = resolveFamily(s)
  const control = controllability(s)
  const open = openness(s)

  // The best ending is gated, so reaching it is already the good outcome.
  const flavor: 'good' | 'bad' =
    family === 'shared-safe'
      ? 'good'
      : control >= GOOD_CONTROL_THRESHOLD && open >= GOOD_OPENNESS_THRESHOLD
        ? 'good'
        : 'bad'

  return {
    id: endingId(family, flavor),
    family,
    flavor,
    europe: resolveEurope(s),
    // Rounded here rather than at the point of display, so the numbers the
    // epilogue shows are the numbers the thresholds were tested against.
    controllability: Math.round(control),
    openness: Math.round(open),
    safetyDebt: s.safetyDebt,
  }
}
