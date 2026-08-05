import { CHAPTER_TITLES, TOTAL_CHAPTERS } from '../content/story'

/** The chapter rail: where you are in the nine months, and how much is left. */
export function Timeline({ chapter }: { chapter: number }) {
  return (
    <nav className="rail" aria-label="Chapters">
      <div className="rail-title">The transition</div>
      <ol className="rail-list">
        {Array.from({ length: TOTAL_CHAPTERS }, (_, i) => i + 1).map((n) => {
          const cls = n === chapter ? 'current' : n < chapter ? 'done' : ''
          return (
            <li key={n} className={`rail-item ${cls}`}>
              <span className="rail-num">{String(n).padStart(2, '0')}</span>
              {CHAPTER_TITLES[n]}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
