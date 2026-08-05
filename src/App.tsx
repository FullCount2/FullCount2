import { useCallback, useEffect, useState } from 'react'
import type { BackgroundId, FactionId, GameState, Progress } from './engine/types'
import { choose, createGame } from './engine/reducer'
import { clearRun, loadProgress, loadRun, recordRun, saveRun } from './engine/save'
import { CharacterCreation } from './ui/CharacterCreation'
import { GameView } from './ui/GameView'
import { EndingView } from './ui/EndingView'
import { Codex } from './ui/Codex'
import { TOTAL_CHAPTERS } from './content/story'
import { DECISIONS } from './content/decisions'
import './ui/theme.css'

type Screen = 'title' | 'creation' | 'playing' | 'ending' | 'codex'

export default function App() {
  const [screen, setScreen] = useState<Screen>('title')
  const [state, setState] = useState<GameState | null>(null)
  const [progress, setProgress] = useState<Progress>(() => loadProgress())
  /** Where to return from the codex. */
  const [codexReturn, setCodexReturn] = useState<Screen>('title')

  // Resume an interrupted run on load.
  const [saved] = useState(() => loadRun())

  const start = useCallback((faction: FactionId, background: BackgroundId) => {
    const fresh = createGame(faction, background)
    setState(fresh)
    saveRun(fresh)
    setScreen('playing')
  }, [])

  // Side effects stay outside the state updater: StrictMode invokes updater
  // functions twice in development, which would double-count a finished run.
  const onChoose = useCallback(
    (choiceId: string) => {
      if (!state) return
      const next = choose(state, choiceId)
      setState(next)

      if (next.ending) {
        setProgress(recordRun(next, next.ending))
        clearRun()
        setScreen('ending')
      } else {
        saveRun(next)
      }
    },
    [state],
  )

  const restart = useCallback(() => {
    setState(null)
    clearRun()
    setScreen('creation')
  }, [])

  const openCodex = useCallback(() => {
    setCodexReturn(screen)
    setScreen('codex')
  }, [screen])

  useEffect(() => {
    document.title =
      screen === 'playing' && state
        ? `Chapter ${state.chapter} · The Intelligence Explosion`
        : 'The Intelligence Explosion'
  }, [screen, state])

  return (
    <>
      <div className="topbar">
        <span className="topbar-brand">The Intelligence Explosion</span>
        {screen !== 'codex' && (
          <button className="linkish" onClick={openCodex}>
            Codex ({progress.endingsSeen.length}/5 endings)
          </button>
        )}
      </div>

      {screen === 'title' && (
        <TitleScreen
          resumable={saved}
          onNew={() => setScreen('creation')}
          onResume={() => {
            if (!saved) return
            setState(saved)
            setScreen('playing')
          }}
        />
      )}

      {screen === 'creation' && (
        <CharacterCreation onStart={start} onBack={() => setScreen('title')} />
      )}

      {screen === 'playing' && state && <GameView state={state} onChoose={onChoose} />}

      {screen === 'ending' && state?.ending && (
        <EndingView
          state={state}
          ending={state.ending}
          onRestart={restart}
          onCodex={openCodex}
        />
      )}

      {screen === 'codex' && <Codex progress={progress} onBack={() => setScreen(codexReturn)} />}
    </>
  )
}

function TitleScreen({
  resumable,
  onNew,
  onResume,
}: {
  resumable: GameState | null
  onNew: () => void
  onResume: () => void
}) {
  return (
    <div className="centered">
      <div className="hero-kicker">An interactive scenario</div>
      <h1 className="hero-title">The Intelligence Explosion</h1>
      <p className="hero-sub">
        Nine months, from the quarter a frontier model quietly clears its own research benchmark to
        the week somebody has to decide who holds the keys. You will sit in Washington, Beijing or
        Brussels, and you will not be able to see everything.
      </p>

      <hr className="rule" />

      <div className="prose">
        <p>
          Ten decisions shape the story. Six skills and a growing store of specialist knowledge
          determine which conversations you are able to have — and options you cannot take are shown
          to you anyway, greyed out, with exactly what you would have needed. Nobody covers
          everything in nine months.
        </p>
        <p>
          There are five endings and four fates for Europe woven through them. One counter is never
          shown to you unless you become qualified to read it, and it decides more than anything
          else you can see.
        </p>
      </div>

      <div className="btn-row">
        <button className="btn" onClick={onNew}>
          Begin
        </button>
        {resumable && (
          <button className="btn ghost" onClick={onResume}>
            Resume — chapter {resumable.chapter} of {TOTAL_CHAPTERS}
          </button>
        )}
      </div>

      <p className="empty" style={{ marginTop: '2.5rem', fontSize: '0.85rem' }}>
        {DECISIONS.length} major decisions · {TOTAL_CHAPTERS} chapters · 3 seats · 9 backgrounds.
        Institutions are real; every company and person is invented.
      </p>
    </div>
  )
}
