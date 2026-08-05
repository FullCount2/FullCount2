import type { TopicId } from '../engine/types'

export interface TopicDef {
  id: TopicId
  name: string
  blurb: string
}

/**
 * Knowledge, as distinct from capability. Skills gate what you can *do*; topics
 * gate what you can *say* — the specific fact that lets you win an argument, spot
 * a lie, or make an offer nobody else in the room understands.
 *
 * Topics are earned by investigating: reading the annex, taking the briefing,
 * asking the researcher the second question instead of the first.
 */
export const TOPICS: TopicDef[] = [
  {
    id: 'takeoff',
    name: 'Takeoff Dynamics',
    blurb:
      'How fast recursive self-improvement compounds, and why every institutional timeline in the building is wrong.',
  },
  {
    id: 'chips',
    name: 'Chip Supply Chain',
    blurb:
      'Lithography, foundries, packaging, HBM. Who has a chokepoint, who merely thinks they do, and how long a workaround really takes.',
  },
  {
    id: 'plaDoctrine',
    name: 'PLA Doctrine',
    blurb:
      'How Beijing thinks about intelligentised warfare, decision superiority, and the risks of automating escalation.',
  },
  {
    id: 'deception',
    name: 'Model Deception',
    blurb:
      'Evaluation gaming, sandbagging, situational awareness. Why a model behaving well under test tells you less than people want it to.',
  },
  {
    id: 'verification',
    name: 'Verification Regimes',
    blurb:
      'Compute audits, escrowed weights, on-site inspection, hardware attestation. What arms control looks like when the warhead is a file.',
  },
  {
    id: 'labor',
    name: 'Labour Markets',
    blurb:
      'What happens to employment, revenue and legitimacy when cognitive work stops being scarce.',
  },
  {
    id: 'interp',
    name: 'Interpretability',
    blurb:
      'Reading the inside of a model rather than its outputs. Still immature, and the only real evidence anyone has.',
  },
  {
    id: 'lawfare',
    name: 'Export Control Law',
    blurb:
      'Entity lists, foreign direct product rules, end-use checks. The legal machinery through which the race is actually fought.',
  },
]

export const TOPIC_BY_ID: Record<TopicId, TopicDef> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
) as Record<TopicId, TopicDef>

export const topicName = (id: TopicId): string => TOPIC_BY_ID[id].name

export const ZERO_TOPICS = (): Record<TopicId, number> => ({
  takeoff: 0,
  chips: 0,
  plaDoctrine: 0,
  deception: 0,
  verification: 0,
  labor: 0,
  interp: 0,
  lawfare: 0,
})
