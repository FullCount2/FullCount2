import type { GameState, Prose } from '../engine/types'
import { evaluate } from '../engine/requirements'
import { actorName, actorRole } from '../content/actors'
import { formatInline } from './inline'

/**
 * Renders the prose of a scene.
 *
 * `reveal` nodes are the prose counterpart of a gated choice: a paragraph of
 * insight that a player without the relevant skill simply never sees. Unlike a
 * locked choice, these are hidden rather than greyed — the point is that an
 * unqualified reader does not know there was anything there to notice.
 */
export function ProseView({ nodes, state }: { nodes: Prose[]; state: GameState }) {
  return (
    <div className="prose">
      {nodes.map((node, i) => (
        <ProseNode key={i} node={node} state={state} />
      ))}
    </div>
  )
}

function ProseNode({ node, state }: { node: Prose; state: GameState }) {
  switch (node.kind) {
    case 'p':
      return <p>{formatInline(node.text)}</p>

    case 'h':
      return <h3>{formatInline(node.text)}</h3>

    case 'quote':
      return (
        <blockquote>
          {formatInline(node.text)}
          {node.attrib && <span className="attrib">— {node.attrib}</span>}
        </blockquote>
      )

    case 'note':
      return <aside className="sidenote">{formatInline(node.text)}</aside>

    case 'aside':
      return (
        <details className="aside">
          <summary>{node.title}</summary>
          <div className="aside-body">
            {node.body.map((para, i) => (
              <p key={i}>{formatInline(para)}</p>
            ))}
          </div>
        </details>
      )

    case 'cable':
      return (
        <div className="cable">
          <div className="cable-head">{node.header}</div>
          <pre>{node.lines.join('\n')}</pre>
        </div>
      )

    case 'say':
      return (
        <div className="say">
          <span className="say-who">
            {actorName(node.actor, state.faction)} · {actorRole(node.actor, state.faction)}
          </span>
          <p className="say-what">“{formatInline(node.text)}”</p>
        </div>
      )

    case 'reveal': {
      if (!evaluate(node.requires, state).met) return null
      return (
        <div className="reveal">
          {node.label && <span className="reveal-label">{node.label}</span>}
          {node.body.map((child, i) => (
            <ProseNode key={i} node={child} state={state} />
          ))}
        </div>
      )
    }
  }
}
