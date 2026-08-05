import { describe, expect, it } from 'vitest'
import { validateStory } from '../engine/validate'
import { ALL_SCENES } from '../content/story'
import { DECISIONS } from '../content/decisions'
import { TOTAL_CHAPTERS } from '../content/story'

describe('story graph', () => {
  it('has no structural problems', () => {
    const issues = validateStory()
    // Print the whole list on failure — a bare count is useless when content breaks.
    expect(issues.map((i) => `${i.kind}: ${i.detail}`)).toEqual([])
  })

  it('covers nine playable chapters plus the epilogue', () => {
    const chapters = new Set(ALL_SCENES.map((s) => s.chapter))
    for (let c = 1; c <= TOTAL_CHAPTERS - 1; c++) {
      expect(chapters, `chapter ${c} has scenes`).toContain(c)
    }
  })

  it('has ten major decisions', () => {
    expect(DECISIONS).toHaveLength(10)
  })

  it('gives every scene a dateline', () => {
    for (const s of ALL_SCENES) {
      expect(s.dateline, `${s.id} dateline`).toBeTruthy()
    }
  })
})
