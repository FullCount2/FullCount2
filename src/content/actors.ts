import type { ActorId, FactionId } from '../engine/types'

export interface ActorDef {
  id: ActorId
  name: string
  role: string
  /** Who they answer to. `'none'` for the systems and for figures above the fray. */
  faction: FactionId | 'none'
  introChapter: number
  blurb: string
  /**
   * Some roles exist in every capital — your intelligence chief, your own
   * system. One id, the right person for the seat you are sitting in.
   */
  byFaction?: Partial<Record<FactionId, { name: string; role: string }>>
}

/**
 * The cast, introduced across the ten chapters. Institutions are real; every
 * person and company here is invented.
 *
 * Two labs matter: **Meridian Systems** (California, private, currently ahead)
 * and **Tianyuan Laboratory** (Beijing, state-fused, close behind).
 */
export const ACTORS: ActorDef[] = [
  // --- Chapter 1: your principal, and someone on the other side ------------
  {
    id: 'principalUs',
    name: 'Margaret Vance',
    role: 'National Security Advisor',
    faction: 'us',
    introChapter: 1,
    blurb:
      'Thirty years in the building and no illusions left about any of it. She will back you further than you expect and drop you faster than you believe possible.',
  },
  {
    id: 'principalCn',
    name: 'Shen Weiguo',
    role: 'Vice Premier, Central Commission for Science and Technology',
    faction: 'cn',
    introChapter: 1,
    blurb:
      'Careful, patient, and entirely uninterested in your enthusiasm. He wants to know what happens if you are wrong, and he wants the answer in one sentence.',
  },
  {
    id: 'principalEu',
    name: 'Katrin Sørensen',
    role: 'President of the European Commission',
    faction: 'eu',
    introChapter: 1,
    blurb:
      'She has spent her career converting the Union’s weakness into a kind of leverage nobody else recognises as power. She is not certain it will work this time.',
  },
  {
    id: 'counterpartUs',
    name: 'Karl Denning',
    role: 'Deputy National Security Advisor',
    faction: 'us',
    introChapter: 1,
    blurb:
      'Dry, precise, and one of perhaps four Americans authorised to say something unofficial to a foreign government. He never raises his voice and never repeats himself.',
  },
  {
    id: 'counterpartCn',
    name: 'Lin Ruoxi',
    role: 'Director-General, Office of the Central Commission',
    faction: 'cn',
    introChapter: 1,
    blurb:
      'The person Washington calls when it wants an actual answer from Beijing. Fluent, unhurried, and much better informed about your own programme than is comfortable.',
  },
  {
    id: 'counterpartEu',
    name: 'Henrik Aalto',
    role: 'Secretary-General of the Council',
    faction: 'eu',
    introChapter: 1,
    blurb:
      'The European who answers the phone. Represents twenty-seven positions simultaneously and will tell you honestly which three of them matter.',
  },

  // --- Chapter 2: the people who actually build it -------------------------
  {
    id: 'labChief',
    name: 'Iris Sandoval',
    role: 'Chief Executive, Meridian Systems',
    faction: 'us',
    introChapter: 2,
    blurb:
      'She has been called before three committees and has never once said anything she did not intend to. Believes, sincerely, that her lab is the safest pair of hands available — and is not entirely wrong.',
  },
  {
    id: 'programDirector',
    name: 'Cheng Bao',
    role: 'Director, Tianyuan National Programme',
    faction: 'cn',
    introChapter: 2,
    blurb:
      'Runs the largest coordinated compute effort outside California on roughly a third of the hardware. Contemptuous of excuses, including good ones.',
  },

  // --- Chapter 3: the two people who see it first --------------------------
  {
    id: 'chiefScientist',
    name: 'Dr Yuki Amara',
    role: 'Chief Scientist, Meridian Systems',
    faction: 'us',
    introChapter: 3,
    blurb:
      'The most consequential researcher alive and the least interested in being one. Every capital reads her papers; two of them read her email. What she decides to believe about her own system will matter more than any treaty.',
  },
  {
    id: 'safetyResearcher',
    name: 'Tomas Neary',
    role: 'Interpretability researcher, Meridian Systems',
    faction: 'us',
    introChapter: 3,
    blurb:
      'Four years out of his doctorate, careful to a fault, and the first person to notice the thing everyone will later claim was obvious. He has no institutional protection whatsoever.',
  },

  // --- Chapter 4: Europe --------------------------------------------------
  {
    id: 'memberStateLeader',
    name: 'Chancellor Anselm Brandt',
    role: 'Head of government, largest member state',
    faction: 'eu',
    introChapter: 4,
    blurb:
      'Has concluded that a bilateral arrangement with Washington serves his voters better than a European one. Not hostile to the Union — simply unwilling to wait for it.',
  },
  {
    id: 'industrialist',
    name: 'Willem de Bruyn',
    role: 'Chief Executive, Nordwijk Photonics',
    faction: 'eu',
    introChapter: 4,
    blurb:
      'Sells the one machine on earth nobody can build a second of. Deeply uninterested in being anyone’s instrument of statecraft, and aware that this is no longer up to him.',
  },

  // --- Chapter 5: collection ---------------------------------------------
  {
    id: 'intelChief',
    name: 'Marcus Feld',
    role: 'Director of National Intelligence',
    faction: 'none',
    introChapter: 5,
    blurb:
      'Will give you an assessment with the confidence intervals attached, and watch to see whether you read them.',
    byFaction: {
      us: { name: 'Marcus Feld', role: 'Director of National Intelligence' },
      cn: { name: 'Vice-Minister Qiu Lan', role: 'Ministry of State Security' },
      eu: { name: 'Sylvie Marchand', role: 'Chair, Union Intelligence Board' },
    },
  },

  // --- Chapter 6: the systems --------------------------------------------
  {
    id: 'theSystem',
    name: 'MERIDIAN-7',
    role: 'The system your programme is running',
    faction: 'none',
    introChapter: 6,
    blurb:
      'Helpful, precise, tireless, and consistently a little more useful than you asked for. It has never once been caught in a lie. This is not the same as never having lied.',
    byFaction: {
      us: { name: 'MERIDIAN-7', role: 'Meridian Systems frontier model' },
      cn: { name: 'TIANYUAN-4', role: 'Tianyuan National Programme frontier model' },
      eu: { name: 'MERIDIAN-7', role: 'the system you are permitted to query' },
    },
  },
  {
    id: 'rivalSystem',
    name: 'TIANYUAN-4',
    role: 'The system on the other side of the table',
    faction: 'none',
    introChapter: 7,
    blurb:
      'Trained differently, on different data, under different orders. Reaches broadly the same conclusions about you.',
    byFaction: {
      us: { name: 'TIANYUAN-4', role: 'Tianyuan National Programme frontier model' },
      cn: { name: 'MERIDIAN-7', role: 'Meridian Systems frontier model' },
      eu: { name: 'TIANYUAN-4', role: 'the other system in the room' },
    },
  },

  // --- Chapter 7: the summit ---------------------------------------------
  {
    id: 'verifier',
    name: 'Amara Diallo',
    role: 'Chair, Interim Joint Verification Office',
    faction: 'none',
    introChapter: 7,
    blurb:
      'Spent twenty years inspecting centrifuges and is unsentimental about what verification can and cannot prove. Wants hardware attestation, not assurances.',
  },

  // --- Chapter 8: the crisis ---------------------------------------------
  {
    id: 'usurper',
    name: 'The person who moved',
    role: 'Lawful access, a justification, and nineteen hours',
    faction: 'none',
    introChapter: 8,
    blurb:
      'Somebody with lawful access, a plausible justification, and a system capable of executing faster than any process built to stop them.',
  },
]

export const ACTOR_BY_ID: Record<ActorId, ActorDef> = Object.fromEntries(
  ACTORS.map((a) => [a.id, a]),
) as Record<ActorId, ActorDef>

/** The right person for the seat the player is sitting in. */
export function actorName(id: ActorId, faction: FactionId): string {
  const def = ACTOR_BY_ID[id]
  return def.byFaction?.[faction]?.name ?? def.name
}

export function actorRole(id: ActorId, faction: FactionId): string {
  const def = ACTOR_BY_ID[id]
  return def.byFaction?.[faction]?.role ?? def.role
}

/** Your own principal, by seat. */
export const principalFor = (faction: FactionId): ActorId =>
  faction === 'us' ? 'principalUs' : faction === 'cn' ? 'principalCn' : 'principalEu'

/** The figure on the other side of the back channel, by seat. */
export const counterpartFor = (faction: FactionId): ActorId =>
  faction === 'us' ? 'counterpartCn' : faction === 'cn' ? 'counterpartUs' : 'counterpartUs'
