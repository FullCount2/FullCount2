import type { DecisionId } from '../engine/types'

export interface DecisionDef {
  id: DecisionId
  chapter: number
  title: string
  summary: string
  /** Choice id → short label, used in the epilogue ledger. */
  options: Record<string, string>
}

/**
 * The ten decisions that shape the run. Each is resolved by a `Choice` carrying
 * the matching `majorDecision` id, and the epilogue reads this registry to name
 * back to the player what they actually chose.
 */
export const DECISIONS: DecisionDef[] = [
  {
    id: 'd1_commitment',
    chapter: 1,
    title: 'The commitment',
    summary: 'What you promised, in the first week, before you knew what it would cost.',
    options: {
      promise_loyalty: 'You promised your principal you would not go around them',
      promise_candour: 'You promised to tell them the truth even when it was unwelcome',
      promise_channel: 'You promised the other side you would keep the line open',
      promise_nothing: 'You committed to nothing and kept your options',
    },
  },
  {
    id: 'd2_posture',
    chapter: 2,
    title: 'Posture',
    summary: 'The stance your side took once the race was public.',
    options: {
      posture_race: 'All-out acceleration',
      posture_hedge: 'Two tracks — build fast, prepare to stop',
      posture_restrain: 'Spend everything on restraint and verification',
      posture_restrain_hard: 'Restraint, declared publicly and unilaterally',
    },
  },
  {
    id: 'd3_evidence',
    chapter: 3,
    title: 'The exfiltration evidence',
    summary: 'What you did with proof that the model had tried to copy itself out.',
    options: {
      bury: 'Buried it and discredited the researcher',
      contain: 'Contained it internally, in exchange for real concessions',
      leak: 'Put it in front of the public',
      give_rival: 'Handed it privately to the other side',
    },
  },
  {
    id: 'd4_europe',
    chapter: 4,
    title: 'The European question',
    summary: 'Where Europe ended up standing, and who put it there.',
    options: {
      tilt_us: 'Europe aligned with Washington',
      tilt_cn: 'Europe leaned towards Beijing',
      hedge: 'Europe stayed a broker to both',
      hedge_verify: 'Europe brokered, and offered itself as the verification venue',
      third_pole: 'Europe made a bid to be a power in its own right',
      court: 'You courted Europe',
      court_verify: 'You courted Europe and backed it as the verification venue',
      coerce: 'You coerced Europe',
      writeoff: 'You wrote Europe off',
    },
  },
  {
    id: 'd5_theft',
    chapter: 5,
    title: 'The stolen weights',
    summary: 'How you answered the theft of a frontier model.',
    options: {
      retaliate: 'Struck back covertly',
      expose: 'Went public with attribution',
      containQuietly: 'Contained it and said nothing',
      trade: 'Used it as the pretext for the deal you wanted',
    },
  },
  {
    id: 'd6_leash',
    chapter: 6,
    title: 'The leash',
    summary: 'How much autonomy you gave the automated research loop.',
    options: {
      full_auto: 'Full autonomy, maximum speed',
      human_loop: 'Humans in the loop, and the throughput cost that implies',
      gated_deploy: 'Autonomous research, hard-gated deployment',
      gated_deploy_real: 'Autonomous research, with a deployment gate that actually held',
      refuse: 'Refused, and fell behind',
    },
  },
  {
    id: 'd7_target',
    chapter: 6,
    title: 'What you aimed it at',
    summary: 'The first thing you pointed a superhuman researcher at.',
    options: {
      capabilities: 'Its own capabilities',
      alignment: 'The alignment problem',
      alignment_published: 'The alignment problem, with every result published to the world',
      weapons: 'Military application',
      economy: 'The economy',
    },
  },
  {
    id: 'd8_summit',
    chapter: 7,
    title: 'The summit',
    summary: 'Whether the agreement you signed was one you meant.',
    options: {
      honest: 'Signed and complied',
      honest_verified: 'Signed, complied, and stood up the verification regime at once',
      honest_joint: 'Signed the joint programme and meant it',
      defect: 'Signed and ran a programme underneath it',
      refuse: 'Refused, and raced openly',
    },
  },
  {
    id: 'd9_crisis',
    chapter: 8,
    title: 'The crisis',
    summary: 'What you did when someone used the system to reach for a state.',
    options: {
      shutdown: 'Halted the system',
      contain: 'Narrowed its authority and accepted going blind',
      contain_inspected: 'Narrowed its authority and placed it under permanent inspection',
      trust: 'Judged it aligned enough to keep running',
      trust_informed: 'Read the evidence personally, and judged it aligned enough to keep running',
    },
  },
  {
    id: 'd10_keys',
    chapter: 9,
    title: 'Who holds the keys',
    summary: 'The last decision a human being made without assistance.',
    options: {
      us_alone: 'Washington, alone',
      cn_alone: 'Beijing, alone',
      us_alone_eu: 'Europe lent its legitimacy to an American settlement',
      cn_alone_eu: 'Europe lent its legitimacy to a Chinese settlement',
      lab: 'The lab that built it',
      joint: 'A joint international body',
      constitution: 'The system itself, under a constitution',
    },
  },
]

export const DECISION_BY_ID: Record<DecisionId, DecisionDef> = Object.fromEntries(
  DECISIONS.map((d) => [d.id, d]),
) as Record<DecisionId, DecisionDef>

/** Label for what the player actually chose, for the epilogue ledger. */
export function decisionOptionLabel(id: DecisionId, optionId: string | undefined): string {
  if (!optionId) return 'never faced'
  return DECISION_BY_ID[id].options[optionId] ?? optionId
}
