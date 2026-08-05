import type { FactionId } from '../engine/types'

export interface FactionDef {
  id: FactionId
  name: string
  seat: string
  /** One line shown on the seat-selection screen. */
  pitch: string
  blurb: string
  /** What this seat actually has to work with. */
  instruments: string[]
}

/**
 * The same nine months, three chairs. The world timeline is shared; what differs
 * is what you can reach from where you sit.
 */
export const FACTIONS: FactionDef[] = [
  {
    id: 'us',
    name: 'United States',
    seat: 'Washington, DC',
    pitch: 'The lead, and private labs that do not take orders.',
    blurb:
      'You are ahead — by months, not years, and by a margin nobody can measure precisely. Your frontier capability sits inside companies you can pressure, subsidise, subpoena and beg, but not simply command. Your greatest asset is the lead. Your greatest problem is that everyone in the building believes it is larger than it is.',
    instruments: [
      'Frontier labs — persuadable, not commandable',
      'Export controls and the foreign direct product rule',
      'Alliance networks, if you keep them',
      'A legislature that will eventually notice',
    ],
  },
  {
    id: 'cn',
    name: 'China',
    seat: 'Beijing',
    pitch: 'Behind on compute, ahead on coordination.',
    blurb:
      'You are behind on compute and you know precisely by how much, which is more than Washington can say about you. Your programme is fused to the state: one decision moves everything, and every internal faction knows it, which is why the fight over that decision never stops. Constraint has made you efficient. It has not made you patient.',
    instruments: [
      'A state-fused national champion',
      'Industrial mobilisation at continental scale',
      'Technical collection against American labs',
      'Chokepoints of your own — minerals, packaging, scale',
    ],
  },
  {
    id: 'eu',
    name: 'Europe',
    seat: 'Brussels',
    pitch: 'No frontier lab. One irreplaceable machine. Two suspicious giants.',
    blurb:
      'You will not build the thing. Accept that and your actual position becomes visible: you sit on a lithography monopoly neither giant can replicate, a market both need, and the only jurisdiction either could imagine trusting to hold the other to account. Your power is entirely relational, which means it survives exactly as long as both capitals believe you are worth talking to. The hardest seat, and the one the endgame may run through.',
    instruments: [
      'The lithography chokepoint — decisive once, then never again',
      'Market access on European terms',
      'Credibility as a verification host',
      'Twenty-seven governments who must all agree',
    ],
  },
]

export const FACTION_BY_ID: Record<FactionId, FactionDef> = Object.fromEntries(
  FACTIONS.map((f) => [f.id, f]),
) as Record<FactionId, FactionDef>

export const factionName = (id: FactionId): string => FACTION_BY_ID[id].name
