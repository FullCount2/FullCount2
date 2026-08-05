# The Intelligence Explosion

An interactive text game about the AI intelligence explosion. Nine months, from the
quarter a frontier model quietly clears its own research benchmark to the week
somebody has to decide who holds the keys.

You take a seat — **Washington**, **Beijing** or **Brussels** — pick a background,
and make ten decisions that shape the world. Six skills and a growing store of
specialist knowledge determine which conversations you are able to have. Options
you cannot take are shown to you anyway, greyed out, with exactly what you would
have needed.

There are **five endings** and **four fates for Europe** woven through them.

```bash
npm install
npm run dev      # play it
npm test         # story-graph validation + scripted playthroughs
npm run build    # production bundle
```

## Design

**Shared spine, own seats.** One world timeline and one set of ten decisions. Each
chapter has seat-specific scenes: you experience the same crisis from the Situation
Room, from Zhongnanhai, or from the Berlaymont. The other powers act as NPCs driven
by shared world state, and all five endings are reachable from any seat.

**Asymmetric instruments.** The United States has powerful private labs that bargain
rather than obey. China has a state-fused national champion with four internal
factions and a third of the compute. Europe has no frontier lab at all — only a
lithography chokepoint, market access, and a claim to be the one jurisdiction either
giant could imagine trusting to inspect the other.

**Two gating idioms, one mechanic.** A locked dialogue option is rendered greyed out
with `Requires Statecraft 4` beside it. A metric you are not qualified to read is
rendered as a redaction bar with the same phrasing. Both come from a single
`describeRequirement()` helper, so the interface can never promise a threshold the
engine does not enforce.

**Hidden Safety Debt.** A concealed counter accumulates every corner cut, run
rushed and warning buried. It is never shown — unless you reach Alignment 4 and
Model Deception 2, at which point it appears in the margin as *Oversight integrity*.
It decides more than anything else you can see, and it is revealed in the epilogue.

**The crisis lands where the debt is.** Chapter 8's power grab is not scripted to
happen to you. It happens in whichever programme — yours, your rival's, or both —
accumulated the most Safety Debt, because a programme with intact oversight is one
where a single official cannot simply take it. Play carefully enough and somebody
tries and is stopped by an afternoon of paperwork.

**Europe's dual trust.** Washington's trust and Beijing's trust are tracked
separately, and most choices buy one at the other's expense. Holding both is a
Statecraft problem, and it is what separates the Guarantor ending from the Client
one.

## Endings

| Ending | How you get there |
|---|---|
| **The Arrangement** | Low Safety Debt, a verification regime that actually exists, a Chapter 8 crisis handled by somebody able to check, and authority placed in shared or constitutional hands |
| **The American Century, Extended** | Washington holds it — and the system stayed checkable and the republic stayed open |
| **Pax Americana, Unverified** | Washington holds something nobody can audit, or had to close every door to keep it |
| **The Long Game, Won** | Beijing holds it, with oversight intact and the loser left standing |
| **The Mandate, Automated** | Beijing holds it, and the emergency never ended |

Europe's fate — **Guarantor**, **Third Pole**, **Client** or **Bypassed** — is woven
into each of the five as its own section of the epilogue.

The good/bad split runs on two independent axes: *controllability* (is the system
something anyone can check?) and *openness* (did the winner have to hollow itself
out to get there?). Both must clear their threshold for a win to be a good one.

## Architecture

```
src/
  engine/
    types.ts          Scene, Choice, Requirement, Effect, GameState, Ending
    requirements.ts   evaluate() + describeRequirement() — one source of gating truth
    effects.ts        additive deltas applied to state
    derived.ts        computed facts content can gate on (e.g. where the crisis lands)
    reducer.ts        the state machine: choose → apply → advance
    endings.ts        family from decision 10, flavour from everything before it
    save.ts           localStorage run + cross-run codex progress
    validate.ts       story-graph validation, run as a test
  content/
    skills.ts topics.ts backgrounds.ts actors.ts factions.ts metrics.ts decisions.ts
    chapters/ch01.ts … ch09.ts
    endings/          the epilogue: history, Europe variants, per-actor fates
  ui/                 editorial layout, chapter rail, instrument panel
```

The story is **data, not code**: chapters export `Scene` objects and the reducer
walks them. Anything that gates content — a dialogue option, a paragraph of
insight, a sidebar metric — expresses its condition as a `Requirement`.

## Tests

`npm test` runs two suites:

- **Story-graph validation** — no dangling `goto`, no duplicate choice ids (which
  would silently shadow a gated variant), no unreachable scenes, no seat leaks, and
  every one of the ten major decisions reachable from all three seats.
- **Scripted playthroughs** — eight named runs that assert all five endings and all
  four Europe variants are reachable, plus a completion check for every one of the
  nine backgrounds. If a planned choice is locked, the test fails with the missing
  requirement, which is how a broken skill economy gets caught.

## A note on naming

Institutions are real: the United States, China, the European Commission, the
lithography and foundry chokepoints. Every company and every individual is invented
— **Meridian Systems**, **Tianyuan Laboratory**, **Nordwijk Photonics**, and the
fifteen people who work for them.
