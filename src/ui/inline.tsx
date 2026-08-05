import type { ReactNode } from 'react'

/**
 * Minimal inline formatting for content prose: `**bold**` and `*italic*`.
 *
 * Deliberately not a markdown parser. The content is written by hand in one
 * place and only ever needs emphasis, so a full dependency would be a worse
 * trade than twenty lines.
 */
export function formatInline(text: string): ReactNode {
  const parts: ReactNode[] = []
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let cursor = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index))
    if (match[1] !== undefined) {
      parts.push(<strong key={key++}>{match[1]}</strong>)
    } else if (match[2] !== undefined) {
      parts.push(<em key={key++}>{match[2]}</em>)
    }
    cursor = match.index + match[0].length
  }

  if (cursor < text.length) parts.push(text.slice(cursor))
  return parts.length === 1 ? parts[0] : parts
}
