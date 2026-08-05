import type { Background, BackgroundId, FactionId } from '../engine/types'

/**
 * Three backgrounds per seat. Each grants roughly six points, spread differently
 * — enough to open some doors in Chapter 1 and guarantee that others stay shut
 * for the whole run. The specialisation is the character.
 */
export const BACKGROUNDS: Background[] = [
  // --- United States ------------------------------------------------------
  {
    id: 'us_founder',
    faction: 'us',
    name: 'Lab Founder',
    title: 'Chair, Meridian Systems',
    address: 'Chair',
    blurb:
      'You built the leading American lab and still hold the chair. You understand the technology better than anyone in government and are trusted by them roughly as much as that implies.',
    skills: { ml: 3, industry: 2, political: 1 },
    topics: { takeoff: 1 },
    flags: ['isLabInsider'],
  },
  {
    id: 'us_nsc',
    faction: 'us',
    name: 'NSC Staffer',
    title: 'Senior Director for Emerging Technology',
    address: 'Director',
    blurb:
      'You run the interagency process on a subject nobody in the building fully understands. Your power is procedural, which means it is real right up until someone notices.',
    skills: { statecraft: 2, political: 3, intelligence: 1 },
    topics: { lawfare: 1 },
    flags: ['isGovernment'],
  },
  {
    id: 'us_darpa',
    faction: 'us',
    name: 'DARPA Engineer',
    title: 'Programme Manager, Assured Autonomy',
    address: 'Doctor',
    blurb:
      'You have spent a decade trying to make automated systems behave predictably and have the scar tissue to prove it is harder than anyone admits.',
    skills: { ml: 2, alignment: 2, industry: 1 },
    topics: { interp: 1 },
    flags: ['isGovernment', 'isTechnical'],
  },

  // --- China -------------------------------------------------------------
  {
    id: 'cn_cadre',
    faction: 'cn',
    name: 'Party Cadre',
    title: 'Deputy Director, Central Commission for Science and Technology',
    address: 'Deputy Director',
    blurb:
      'You have managed industrial policy at continental scale and know exactly how much of the reported progress is real. Your standing is your instrument and your leash.',
    skills: { political: 3, statecraft: 2, industry: 1 },
    topics: { plaDoctrine: 1 },
    flags: ['isGovernment'],
  },
  {
    id: 'cn_scientist',
    faction: 'cn',
    name: 'Lab Chief Scientist',
    title: 'Chief Scientist, Tianyuan Laboratory',
    address: 'Professor',
    blurb:
      'You run the national programme’s frontier training effort. You answer to people who cannot read your results and who will not accept being told to wait.',
    skills: { ml: 3, alignment: 2, industry: 1 },
    topics: { takeoff: 1 },
    flags: ['isLabInsider', 'isTechnical'],
  },
  {
    id: 'cn_mss',
    faction: 'cn',
    name: 'MSS Officer',
    title: 'Bureau Chief, Technical Reconnaissance',
    address: 'Bureau Chief',
    blurb:
      'You know what the Americans have, sometimes before their own oversight committees do. Knowing it and being believed are separate problems.',
    skills: { intelligence: 3, statecraft: 1, political: 1 },
    topics: { plaDoctrine: 1 },
    flags: ['isGovernment', 'isIntel'],
  },

  // --- Europe ------------------------------------------------------------
  {
    id: 'eu_commissioner',
    faction: 'eu',
    name: 'Commissioner',
    title: 'Commissioner for Technological Sovereignty',
    address: 'Commissioner',
    blurb:
      'You hold a portfolio invented eighteen months ago for a problem nobody expected this decade. You have no army, no frontier lab, and twenty-seven governments to consult.',
    skills: { statecraft: 3, political: 2, industry: 1 },
    topics: { lawfare: 1 },
    flags: ['isGovernment'],
  },
  {
    id: 'eu_regulator',
    faction: 'eu',
    name: 'Regulator-Technologist',
    title: 'Head of the Union AI Office',
    address: 'Director',
    blurb:
      'You are the rare regulator who can actually read the model cards, which makes you indispensable to Brussels and inconvenient to everyone else.',
    skills: { ml: 2, alignment: 2, statecraft: 1, political: 1 },
    topics: { verification: 1 },
    flags: ['isTechnical'],
  },
  {
    id: 'eu_liaison',
    faction: 'eu',
    name: 'Intelligence Liaison',
    title: 'Coordinator, Union Intelligence Cell',
    address: 'Coordinator',
    blurb:
      'You sit between services that do not entirely trust each other, in a Union whose members brief Washington before they brief you.',
    skills: { intelligence: 3, statecraft: 2 },
    topics: { chips: 1 },
    flags: ['isGovernment', 'isIntel'],
  },
]

export const BACKGROUND_BY_ID: Record<BackgroundId, Background> = Object.fromEntries(
  BACKGROUNDS.map((b) => [b.id, b]),
) as Record<BackgroundId, Background>

export const backgroundsFor = (faction: FactionId): Background[] =>
  BACKGROUNDS.filter((b) => b.faction === faction)
