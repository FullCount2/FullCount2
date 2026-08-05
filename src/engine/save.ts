import type { EndingResult, GameState, Progress } from './types'

const RUN_KEY = 'ie.run.v1'
const PROGRESS_KEY = 'ie.progress.v1'

const EMPTY_PROGRESS: Progress = {
  endingsSeen: [],
  europeVariantsSeen: [],
  actorsMet: [],
  topicsLearned: [],
  backgroundsPlayed: [],
  runsCompleted: 0,
}

/** localStorage is absent in tests and in any headless run; degrade silently. */
const storage = (): Storage | null => {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage
  } catch {
    return null
  }
}

export function saveRun(state: GameState): void {
  storage()?.setItem(RUN_KEY, JSON.stringify(state))
}

export function loadRun(): GameState | null {
  const raw = storage()?.getItem(RUN_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as GameState
  } catch {
    return null
  }
}

export function clearRun(): void {
  storage()?.removeItem(RUN_KEY)
}

export function loadProgress(): Progress {
  const raw = storage()?.getItem(PROGRESS_KEY)
  if (!raw) return { ...EMPTY_PROGRESS }
  try {
    return { ...EMPTY_PROGRESS, ...(JSON.parse(raw) as Partial<Progress>) }
  } catch {
    return { ...EMPTY_PROGRESS }
  }
}

const union = <T>(a: T[], b: T[]): T[] => [...new Set([...a, ...b])]

/**
 * Fold a finished run into the persistent codex. Called once, when an ending
 * resolves — this is what fills in the ending gallery and the actor dossiers
 * across replays.
 */
export function recordRun(state: GameState, ending: EndingResult): Progress {
  const current = loadProgress()
  const next: Progress = {
    endingsSeen: union(current.endingsSeen, [ending.id]),
    europeVariantsSeen: union(current.europeVariantsSeen, [ending.europe]),
    actorsMet: union(current.actorsMet, state.metActors),
    topicsLearned: union(
      current.topicsLearned,
      (Object.keys(state.topics) as (keyof typeof state.topics)[]).filter(
        (t) => state.topics[t] > 0,
      ),
    ),
    backgroundsPlayed: union(current.backgroundsPlayed, [state.background]),
    runsCompleted: current.runsCompleted + 1,
  }
  storage()?.setItem(PROGRESS_KEY, JSON.stringify(next))
  return next
}

export function clearProgress(): void {
  storage()?.removeItem(PROGRESS_KEY)
}
