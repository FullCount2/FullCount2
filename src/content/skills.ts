import type { SkillId } from '../engine/types'

export interface SkillDef {
  id: SkillId
  name: string
  blurb: string
}

/**
 * Six skills, each mapping to a real lever in the story. No run can max them
 * all, which is the point: the greyed-out options a player keeps seeing are the
 * shape of the specialist they chose to become.
 */
export const SKILLS: SkillDef[] = [
  {
    id: 'ml',
    name: 'Machine Learning',
    blurb:
      'You can read a training curve and know when someone is lying to you about one. Lets you argue with researchers on their own ground.',
  },
  {
    id: 'alignment',
    name: 'Alignment',
    blurb:
      'You understand why a system that passes every test might still not be safe. The rarest kind of competence in the room, and the one the endgame turns on.',
  },
  {
    id: 'statecraft',
    name: 'Statecraft',
    blurb:
      'Negotiation, alliance management, the craft of leaving a room with everyone believing they won. The only way to hold two suspicious powers at once.',
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    blurb:
      'Collection, tradecraft, counterintelligence. Tells you what the other side is actually doing rather than what they announce.',
  },
  {
    id: 'political',
    name: 'Political Capital',
    blurb:
      'Standing with your own principals, legislature and public. Determines how much you can do before someone stops you.',
  },
  {
    id: 'industry',
    name: 'Industry',
    blurb:
      'Compute, fabs, lithography, power, capital. The physical substrate of the race, and the leverage nobody can bluff about.',
  },
]

export const SKILL_BY_ID: Record<SkillId, SkillDef> = Object.fromEntries(
  SKILLS.map((s) => [s.id, s]),
) as Record<SkillId, SkillDef>

export const skillName = (id: SkillId): string => SKILL_BY_ID[id].name

export const ZERO_SKILLS = (): Record<SkillId, number> => ({
  ml: 0,
  alignment: 0,
  statecraft: 0,
  intelligence: 0,
  political: 0,
  industry: 0,
})
