import type { GameState } from './types'

/**
 * Derived, read-only facts about the world that content can gate on.
 *
 * Requirements may name these alongside real flags. They exist because some
 * routing depends on a comparison the story data cannot express — most
 * importantly, Chapter 8's crisis, which lands on whichever programme cut the
 * most corners rather than on a predetermined one.
 */

/** How reckless the other side has been, inferred from the state of the world. */
export function rivalSafetyDebt(s: GameState): number {
  let v = 10

  // Your posture sets the tempo they answer.
  switch (s.decisions.d2_posture) {
    case 'posture_race':
      v += 7
      break
    case 'posture_restrain':
      v -= 4
      break
    case 'posture_restrain_hard':
      v -= 7
      break
  }

  switch (s.decisions.d6_leash) {
    case 'full_auto':
      v += 6
      break
    case 'human_loop':
    case 'refuse':
      v -= 3
      break
  }

  switch (s.decisions.d8_summit) {
    case 'defect':
      v += 5
      break
    case 'refuse':
      v += 3
      break
    case 'honest':
      v -= 3
      break
    case 'honest_verified':
    case 'honest_joint':
      v -= 6
      break
  }

  if (s.flags.verificationRegime) v -= 8
  if (s.flags.publishedAlignmentWork) v -= 7
  if (s.flags.retaliated) v += 4
  if (s.decisions.d7_target === 'weapons') v += 4
  if (s.flags.gaveEvidenceToRival) v -= 3

  return Math.max(0, v)
}

/** Above this, a programme is disordered enough for one person to seize it. */
const GRAB_THRESHOLD = 12

export type CrisisLocus = 'yours' | 'rivals' | 'both' | 'contained'

/**
 * Whose house the power grab happens in.
 *
 * A programme with intact oversight is one where a single official cannot
 * simply take it — there are too many people who would have to agree. Debt is
 * what removes them.
 */
export function crisisLocus(s: GameState): CrisisLocus {
  const mine = s.safetyDebt >= GRAB_THRESHOLD
  const theirs = rivalSafetyDebt(s) >= GRAB_THRESHOLD

  if (mine && theirs) return 'both'
  if (mine) return 'yours'
  if (theirs) return 'rivals'
  return 'contained'
}

/**
 * Pseudo-flags computed from state. `evaluate()` consults these after the real
 * flag map, so content can write `flags: ['crisisYours']` exactly as it would
 * write any other flag.
 */
export const DERIVED_FLAGS: Record<string, (s: GameState) => boolean> = {
  crisisYours: (s) => crisisLocus(s) === 'yours',
  crisisRivals: (s) => crisisLocus(s) === 'rivals',
  crisisBoth: (s) => crisisLocus(s) === 'both',
  crisisContained: (s) => crisisLocus(s) === 'contained',
  leadingUs: (s) => s.metrics.lead >= 0,
  leadingCn: (s) => s.metrics.lead < 0,
  agreementHeld: (s) => Boolean(s.flags.agreementExists) && !s.flags.defected,
}

export const isDerivedFlag = (f: string): boolean => f in DERIVED_FLAGS

export const derivedFlag = (f: string, s: GameState): boolean =>
  DERIVED_FLAGS[f]?.(s) ?? false
