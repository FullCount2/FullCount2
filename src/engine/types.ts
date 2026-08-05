/**
 * Core types for the story engine.
 *
 * The story is data, not code: chapters export `Scene` objects, and the reducer
 * walks them. Anything that gates content — a dialogue option, a paragraph of
 * insight, a sidebar metric — expresses its condition as a `Requirement`, so
 * there is exactly one place that decides whether something is available and
 * exactly one place that phrases the requirement for the player.
 */

export type FactionId = 'us' | 'cn' | 'eu'

export type SkillId =
  | 'ml'
  | 'alignment'
  | 'statecraft'
  | 'intelligence'
  | 'political'
  | 'industry'

export type TopicId =
  | 'takeoff'
  | 'chips'
  | 'plaDoctrine'
  | 'deception'
  | 'verification'
  | 'labor'
  | 'interp'
  | 'lawfare'

export type MetricId =
  | 'compute'
  | 'speedup'
  | 'lead'
  | 'alarm'
  | 'trustUs'
  | 'trustCn'
  | 'oversight'

export type ActorId =
  // Chapter 1
  | 'principalUs'
  | 'principalCn'
  | 'principalEu'
  | 'counterpartUs'
  | 'counterpartCn'
  | 'counterpartEu'
  // Chapter 2
  | 'labChief'
  | 'programDirector'
  // Chapter 3
  | 'chiefScientist'
  | 'safetyResearcher'
  // Chapter 4
  | 'memberStateLeader'
  | 'industrialist'
  // Chapter 5
  | 'intelChief'
  // Chapter 6
  | 'theSystem'
  | 'rivalSystem'
  // Chapter 7
  | 'verifier'
  // Chapter 8
  | 'usurper'

export type DecisionId =
  | 'd1_commitment'
  | 'd2_posture'
  | 'd3_evidence'
  | 'd4_europe'
  | 'd5_theft'
  | 'd6_leash'
  | 'd7_target'
  | 'd8_summit'
  | 'd9_crisis'
  | 'd10_keys'

export type SceneId = string

/** The sentinel `goto` that ends the run and resolves an ending. */
export const END_SCENE = 'END' as const

// ---------------------------------------------------------------------------
// Requirements
// ---------------------------------------------------------------------------

/**
 * A condition on game state. All present fields must hold (logical AND).
 *
 * `anyOf` is the one escape hatch for disjunction: if present, at least one of
 * its sub-requirements must hold in addition to the rest of this requirement.
 */
export interface Requirement {
  skills?: Partial<Record<SkillId, number>>
  topics?: Partial<Record<TopicId, number>>
  metrics?: Partial<Record<MetricId, number>>
  /** Maximum values — used for "only if you have NOT run up too much debt" gates. */
  maxSafetyDebt?: number
  minSafetyDebt?: number
  flags?: string[]
  notFlags?: string[]
  faction?: FactionId[]
  /** A specific earlier decision must have gone a specific way. */
  decisions?: Partial<Record<DecisionId, string | string[]>>
  anyOf?: Requirement[]
}

export interface RequirementCheck {
  met: boolean
  /** Human-readable clauses that are currently unsatisfied. */
  missing: string[]
  /**
   * True when the requirement can never be satisfied by growing skills — it
   * depends on a past decision or faction. Such options are not shown as
   * "locked, keep training"; they are simply absent.
   */
  structural: boolean
}

// ---------------------------------------------------------------------------
// Effects
// ---------------------------------------------------------------------------

/** A mutation applied to game state when a choice is taken or a scene entered. */
export interface Effect {
  skills?: Partial<Record<SkillId, number>>
  topics?: Partial<Record<TopicId, number>>
  metrics?: Partial<Record<MetricId, number>>
  /** Positive numbers make the eventual superintelligence less controllable. */
  safetyDebt?: number
  /** How coercive you have been. Feeds the "openness" axis of the endings. */
  coercion?: number
  relationships?: Partial<Record<ActorId, number>>
  flags?: string[]
  clearFlags?: string[]
  meetActors?: ActorId[]
}

// ---------------------------------------------------------------------------
// Prose
// ---------------------------------------------------------------------------

export type Prose =
  /** A paragraph. */
  | { kind: 'p'; text: string }
  /** A subheading inside a scene. */
  | { kind: 'h'; text: string }
  /** Block quotation, optionally attributed. */
  | { kind: 'quote'; text: string; attrib?: string }
  /** A collapsible technical aside, in the style of the source material. */
  | { kind: 'aside'; title: string; body: string[] }
  /** A margin sidenote. */
  | { kind: 'note'; text: string }
  /** A wire cable / intercept, rendered monospace with a header block. */
  | { kind: 'cable'; header: string; lines: string[] }
  /** Prose visible only to a player who knows enough to see it. */
  | { kind: 'reveal'; requires: Requirement; label?: string; body: Prose[] }
  /** Dialogue line from a named actor. */
  | { kind: 'say'; actor: ActorId; text: string }

// ---------------------------------------------------------------------------
// Scenes and choices
// ---------------------------------------------------------------------------

/**
 * Where a choice leads. A plain id goes there for everyone; a faction map
 * routes each seat to its own scene, which is how the shared spine splits.
 */
export type Goto = SceneId | Partial<Record<FactionId, SceneId>>

export interface Choice {
  id: string
  text: string
  /** Shown under the option text once taken or when locked, for flavour. */
  detail?: string
  /**
   * Unmet requirements do not hide the option — it is rendered greyed out with
   * the requirement spelled out, unless the requirement is structural.
   */
  requires?: Requirement
  effects?: Effect
  goto: Goto
  /** Marks this choice as the resolution of one of the ten major decisions. */
  majorDecision?: DecisionId
  /** What the player would have gained — shown in the locked-option retrospective. */
  wouldHaveOpened?: string
}

export interface Scene {
  id: SceneId
  chapter: number
  /** e.g. "March 2027 — Washington, DC" */
  dateline: string
  title?: string
  /** Restricts the scene to particular seats. Used by the validator. */
  factions?: FactionId[]
  body: Prose[]
  /** Extra prose appended for a particular seat. */
  factionBody?: Partial<Record<FactionId, Prose[]>>
  onEnter?: Effect
  choices: Choice[]
}

// ---------------------------------------------------------------------------
// Character creation
// ---------------------------------------------------------------------------

export type BackgroundId =
  | 'us_founder'
  | 'us_nsc'
  | 'us_darpa'
  | 'cn_cadre'
  | 'cn_scientist'
  | 'cn_mss'
  | 'eu_commissioner'
  | 'eu_regulator'
  | 'eu_liaison'

export interface Background {
  id: BackgroundId
  faction: FactionId
  name: string
  title: string
  /** How other characters address you in dialogue. */
  address: string
  blurb: string
  skills: Partial<Record<SkillId, number>>
  topics: Partial<Record<TopicId, number>>
  flags?: string[]
}

// ---------------------------------------------------------------------------
// Endings
// ---------------------------------------------------------------------------

export type EndingFamily = 'shared-safe' | 'us-wins' | 'cn-wins'
export type EndingFlavor = 'good' | 'bad'
export type EuropeVariant = 'guarantor' | 'client' | 'irrelevant' | 'third-pole'
export type EndingId = 'best' | 'us-good' | 'us-bad' | 'cn-good' | 'cn-bad'

export interface EndingResult {
  id: EndingId
  family: EndingFamily
  flavor: EndingFlavor
  europe: EuropeVariant
  /** Score on the "is the system controllable" axis. */
  controllability: number
  /** Score on the "did the winner stay an open society" axis. */
  openness: number
  safetyDebt: number
}

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------

/** A locked option the player saw but could not take. Drives the retrospective. */
export interface LockedSighting {
  sceneId: SceneId
  chapter: number
  choiceId: string
  text: string
  missing: string[]
  wouldHaveOpened?: string
}

export interface GameState {
  faction: FactionId
  background: BackgroundId
  sceneId: SceneId
  chapter: number
  skills: Record<SkillId, number>
  topics: Record<TopicId, number>
  metrics: Record<Exclude<MetricId, 'oversight'>, number>
  safetyDebt: number
  coercion: number
  relationships: Partial<Record<ActorId, number>>
  flags: Record<string, boolean>
  decisions: Partial<Record<DecisionId, string>>
  metActors: ActorId[]
  /** Scene ids visited, in order. */
  history: SceneId[]
  lockedSeen: LockedSighting[]
  ending: EndingResult | null
}

/** Persisted across runs: what the player has unlocked in the codex. */
export interface Progress {
  endingsSeen: EndingId[]
  europeVariantsSeen: EuropeVariant[]
  actorsMet: ActorId[]
  topicsLearned: TopicId[]
  backgroundsPlayed: BackgroundId[]
  runsCompleted: number
}
