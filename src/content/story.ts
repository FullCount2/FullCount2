import type { FactionId, Scene, SceneId } from '../engine/types'
import { CHAPTER_1 } from './chapters/ch01'
import { CHAPTER_2 } from './chapters/ch02'
import { CHAPTER_3 } from './chapters/ch03'
import { CHAPTER_4 } from './chapters/ch04'
import { CHAPTER_5 } from './chapters/ch05'
import { CHAPTER_6 } from './chapters/ch06'
import { CHAPTER_7 } from './chapters/ch07'
import { CHAPTER_8 } from './chapters/ch08'
import { CHAPTER_9 } from './chapters/ch09'

export const ALL_SCENES: Scene[] = [
  ...CHAPTER_1,
  ...CHAPTER_2,
  ...CHAPTER_3,
  ...CHAPTER_4,
  ...CHAPTER_5,
  ...CHAPTER_6,
  ...CHAPTER_7,
  ...CHAPTER_8,
  ...CHAPTER_9,
]

export const SCENES: Record<SceneId, Scene> = Object.fromEntries(
  ALL_SCENES.map((s) => [s.id, s]),
)

export const START_SCENE: Record<FactionId, SceneId> = {
  us: 'ch1_us_a',
  cn: 'ch1_cn_a',
  eu: 'ch1_eu_a',
}

export const CHAPTER_TITLES: Record<number, string> = {
  1: 'The Threshold',
  2: 'The Race Declared',
  3: 'The Whistle',
  4: 'Brussels',
  5: 'Escalation',
  6: 'The Automated Researcher',
  7: 'Summit',
  8: 'The Crisis',
  9: 'The Last Human Decision',
  10: 'Epilogue',
}

export const TOTAL_CHAPTERS = 10
