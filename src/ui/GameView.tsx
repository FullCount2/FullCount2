import { useEffect, useRef } from 'react'
import type { GameState } from '../engine/types'
import { getScene, sceneBody } from '../engine/reducer'
import { CHAPTER_TITLES } from '../content/story'
import { ProseView } from './ProseView'
import { ChoiceList } from './ChoiceList'
import { Sidebar } from './Sidebar'
import { Timeline } from './Timeline'

export function GameView({
  state,
  onChoose,
}: {
  state: GameState
  onChoose: (choiceId: string) => void
}) {
  const scene = getScene(state.sceneId)
  const top = useRef<HTMLDivElement>(null)

  // Each scene is a page: start the reader at the top of it, not wherever the
  // previous scene's choices happened to be.
  useEffect(() => {
    top.current?.scrollIntoView({ block: 'start' })
  }, [state.sceneId])

  return (
    <div className="shell">
      <Timeline chapter={state.chapter} />

      <main className="column">
        <div ref={top} />
        <div className="chapter-marker">
          Chapter {state.chapter} · {CHAPTER_TITLES[state.chapter]}
        </div>
        <div className="dateline">{scene.dateline}</div>
        {scene.title && <h1 className="scene-title">{scene.title}</h1>}

        <ProseView nodes={sceneBody(scene, state.faction)} state={state} />

        <ChoiceList state={state} onChoose={onChoose} />
      </main>

      <Sidebar state={state} />
    </div>
  )
}
