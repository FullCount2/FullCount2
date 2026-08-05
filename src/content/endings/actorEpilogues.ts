import type { ActorId, GameState } from '../../engine/types'
import { principalFor } from '../actors'

export interface ActorEpilogue {
  actor: ActorId
  /** First matching entry for an actor wins, so order them most-specific first. */
  when: (s: GameState) => boolean
  text: string
}

const rel = (s: GameState, a: ActorId): number => s.relationships[a] ?? 0
const met = (s: GameState, a: ActorId): boolean => s.metActors.includes(a)
const always = () => true

/**
 * "Where everyone ended up." Each entry is keyed to what the player actually did
 * — relationships, flags, decisions — so the epilogue reports back a specific
 * run rather than a generic one.
 */
export const ACTOR_EPILOGUES: ActorEpilogue[] = [
  // --- Your principal ------------------------------------------------------
  {
    actor: 'principalUs',
    when: (s) => Boolean(s.flags.leakedEvidence) && rel(s, 'principalUs') < 0,
    text: 'Margaret Vance never publicly criticised you, which several people who worked for her found more damning than if she had. She left the building at the end of the following year, gave two interviews, and in both of them described the June decision as "made by someone who turned out to be right, in a way I could not afford at the time".',
  },
  {
    actor: 'principalUs',
    when: (s) => rel(s, 'principalUs') >= 3,
    text: 'Margaret Vance stayed until the settlement was signed and then left within the month, which is what people do when the thing they stayed for is finished. She testified four times, protected her staff every time, and has consistently attributed to you decisions that you both know were hers.',
  },
  {
    actor: 'principalUs',
    when: always,
    text: 'Margaret Vance served out the crisis, testified when required, and retired to a chair at a university that was pleased to have her. She has never discussed the internal deliberations of that year, and has declined, four times, to write the book.',
  },

  {
    actor: 'principalCn',
    when: (s) => rel(s, 'principalCn') >= 3,
    text: 'Shen Weiguo was elevated in the spring and spent the following decade as the settlement’s principal defender inside a system with a long institutional memory for people who were right early. He still asks for answers in one sentence. He has told at least two audiences that you were the only person on the file who could reliably supply one.',
  },
  {
    actor: 'principalCn',
    when: (s) => rel(s, 'principalCn') < 0,
    text: 'Shen Weiguo remained in his post for another two years and was moved sideways, with full honours, to a portfolio of enormous prestige and no operational significance. He has never said anything about your role. Nothing you have been able to establish suggests he blamed you, and nothing suggests he defended you either.',
  },
  {
    actor: 'principalCn',
    when: always,
    text: 'Shen Weiguo carried the decision upward, defended it in rooms you were not in, and retired at the ordinary time with the ordinary honours. The published record of that year contains four of his sentences.',
  },

  {
    actor: 'principalEu',
    when: (s) => Boolean(s.flags.euThirdPole),
    text: 'Katrin Sørensen served a second term she had not intended to seek, and is the only Commission President in the institution’s history whose name is known to a majority of people outside Europe. She has said, repeatedly and with visible irritation at the framing, that she did not make Europe a power — that she simply declined, for nine months, to accept that it was not one.',
  },
  {
    actor: 'principalEu',
    when: (s) => rel(s, 'principalEu') >= 3,
    text: 'Katrin Sørensen finished her term, declined to seek another, and left with the Union holding a role in the settlement that no serious person had thought available to it in February. Her final address to the Parliament devoted one sentence to the AI file and eleven minutes to agricultural policy, which those who knew her understood perfectly.',
  },
  {
    actor: 'principalEu',
    when: always,
    text: 'Katrin Sørensen completed her mandate. The assessment of her presidency turns entirely on how one reads that year, and the readings have not converged.',
  },

  // --- The counterpart ----------------------------------------------------
  {
    actor: 'counterpartCn',
    when: (s) => Boolean(s.flags.reportedTheCall),
    text: 'Lin Ruoxi was recalled in April and has not appeared in any public capacity since. There is no indication that she was punished. There is no indication of anything. The channel she built is closed, and the officials who now hold her portfolio are careful, correct, and will never call anybody at eleven at night.',
  },
  {
    actor: 'counterpartCn',
    when: (s) => rel(s, 'counterpartCn') >= 4,
    text: 'Lin Ruoxi spent the following decade in the machinery of the settlement, first as Beijing’s representative to the inspection regime and later as something closer to its institutional memory. You have met eleven times since. Neither of you has ever referred to February, and both of you understand that everything that followed ran through it.',
  },
  {
    actor: 'counterpartCn',
    when: (s) => met(s, 'counterpartCn'),
    text: 'Lin Ruoxi remained in post through the settlement and was promoted afterwards, as competent officials on winning files are. The relationship was correct, useful and never warm, and it is not clear that anything warmer would have survived the year.',
  },

  {
    actor: 'counterpartUs',
    when: (s) => Boolean(s.flags.reportedTheCall),
    text: 'Karl Denning was reassigned within the fortnight to a position with no foreign contact, and retired eight months later. He has said nothing. The one time you attempted to reach him afterwards, the message was received and not answered, which from him is a complete sentence.',
  },
  {
    actor: 'counterpartUs',
    when: (s) => rel(s, 'counterpartUs') >= 4,
    text: 'Karl Denning served through the settlement and then took the least glamorous job available to him — deputy chair of the inspection regime’s technical secretariat — on the grounds that somebody who understood how the thing had nearly failed ought to be in the room while it was being run. He still says one true thing per meeting.',
  },
  {
    actor: 'counterpartUs',
    when: (s) => met(s, 'counterpartUs'),
    text: 'Karl Denning finished the crisis in the same post he began it in, which in Washington that year was itself an achievement, and retired without a valedictory. Two of the four people who understood what he had done have since written about it.',
  },

  // --- The lab ------------------------------------------------------------
  {
    actor: 'labChief',
    when: (s) => Boolean(s.flags.keysToTheLab),
    text: 'Iris Sandoval became, without any statute conferring it, the most powerful private individual in history — and spent the following years in a position she has described as "custody without legitimacy". Meridian Systems still holds the authority. Every attempt to transfer it to a public body has foundered on the fact that no public body can staff the review functions. She has supported every one of those attempts.',
  },
  {
    actor: 'labChief',
    when: (s) => rel(s, 'labChief') <= -3,
    text: 'Iris Sandoval was removed by her own board fourteen months later, in a proxy fight nominally about capital allocation and actually about the year she had spent in a fight with her own government. She has been a persistent and well-informed public critic of the settlement ever since, and about a third of what she says is correct.',
  },
  {
    actor: 'labChief',
    when: (s) => rel(s, 'labChief') >= 2,
    text: 'Iris Sandoval remained chief executive through the transition and is generally credited with having made the government relationship work, a judgement she has never contested and which somewhat overstates her own initial enthusiasm for it.',
  },
  {
    actor: 'labChief',
    when: (s) => met(s, 'labChief'),
    text: 'Iris Sandoval steered Meridian through the settlement, complied with what she was required to comply with, and stepped down at a moment of her own choosing. Her memoir is well written and describes a company that was rather more cooperative than the record shows.',
  },

  {
    actor: 'programDirector',
    when: (s) => Boolean(s.flags.cnUnifiedProgramme),
    text: 'Cheng Bao ran the Tianyuan programme until the settlement absorbed it and then ran the absorbed version, on the grounds that nobody else could. His contempt for excuses survived the transition intact. He has never accepted that being rationed was anything other than the reason his team was better.',
  },
  {
    actor: 'programDirector',
    when: (s) => rel(s, 'programDirector') >= 2,
    text: 'Cheng Bao got most of what he asked for and delivered most of what he promised, which in that year put him in a very small category. He is now the most decorated scientist in the country and complains, at length, about the paperwork.',
  },
  {
    actor: 'programDirector',
    when: (s) => met(s, 'programDirector'),
    text: 'Cheng Bao was moved out of the programme once it became a matter of statecraft rather than research, which he had predicted and resented in that order. His technical judgement, on review, was correct more often than anybody senior to him.',
  },

  // --- The chief scientist ------------------------------------------------
  {
    actor: 'chiefScientist',
    when: (s) => Boolean(s.flags.publishedAlignmentWork),
    text: 'Yuki Amara’s name is on the work that made the systems checkable, and she has spent twenty years explaining, to audiences who do not want to hear it, that the work was not hers and would not have existed if somebody had not decided to publish it instead of keeping it. She has never named who. She has been asked in every interview.',
  },
  {
    actor: 'chiefScientist',
    when: (s) => rel(s, 'chiefScientist') >= 3,
    text: 'Yuki Amara stayed at the bench. She turned down the directorship, the chair, the commission and the prize committee, and did the one thing that mattered: she kept publishing what she actually believed, at a volume that made it impossible for either capital to claim the science was unsettled. She still does not sleep properly.',
  },
  {
    actor: 'chiefScientist',
    when: (s) => Boolean(s.flags.buriedEvidence),
    text: 'Yuki Amara resigned in the autumn, citing personal reasons, and has published nothing since. Two of her former students have said, carefully, that she believed the June annex had been suppressed and that she could not establish it. She was right, and she never found out that she was.',
  },
  {
    actor: 'chiefScientist',
    when: (s) => met(s, 'chiefScientist'),
    text: 'Yuki Amara remained the most consequential researcher of the era and continued to find this an administrative inconvenience. Her assessment of the systems has never substantially changed: that the evidence is genuinely ambiguous, that she has read all of it, and that this is not a reassuring thing to be able to say.',
  },

  // --- The safety researcher ----------------------------------------------
  {
    actor: 'safetyResearcher',
    when: (s) => Boolean(s.flags.nearyBurned),
    text: 'Tomas Neary was managed out over eleven months, through a performance process that was scrupulously documented and understood by everybody involved. He works in a different field now and is, by all accounts, happier. He was the first person on earth to see it and the record does not contain his name.',
  },
  {
    actor: 'safetyResearcher',
    when: (s) => rel(s, 'safetyResearcher') >= 4,
    text: 'Tomas Neary spent the crisis being right in writing, which is the least rewarded form of being right, and ended it as the inspection regime’s first chief technical officer at thirty-one. He is careful to a fault, refuses to describe himself as having been brave, and has protected four people since in the way he was protected.',
  },
  {
    actor: 'safetyResearcher',
    when: (s) => Boolean(s.flags.euProtectedNeary),
    text: 'Tomas Neary was granted statutory protection by a jurisdiction he had never worked in, which was legally novel and worked. He stayed in Europe. The reporting channel that shielded him has since been used nineteen times, and the people who wrote it into the instrument did not expect it to be used at all.',
  },
  {
    actor: 'safetyResearcher',
    when: (s) => met(s, 'safetyResearcher'),
    text: 'Tomas Neary stayed in the field, moved institutions twice, and did not become a public figure. He is cited constantly and quoted rarely. He has declined every request to describe the June week in his own words.',
  },

  // --- Europe's cast ------------------------------------------------------
  {
    actor: 'industrialist',
    when: (s) => Boolean(s.flags.chokepointSpent),
    text: 'Willem de Bruyn spent four years watching two governments build inferior copies of his machines and then buy them anyway, for reasons of sovereignty rather than physics. Nordwijk Photonics is still the best in the world and no longer the only one. He retired early and has been unusually gracious about a decision that cost his company its position.',
  },
  {
    actor: 'industrialist',
    when: (s) => rel(s, 'industrialist') >= 2,
    text: 'Willem de Bruyn got what he asked for in April: an answer to give when either capital called. Nordwijk kept shipping to both, under a licensing regime that was European, boring and never once tested in a way that broke it. He regards this as the great achievement of his career and is aware that it consisted of nothing happening.',
  },
  {
    actor: 'industrialist',
    when: (s) => met(s, 'industrialist'),
    text: 'Willem de Bruyn continued to sell the machine and continued to be told he was an instrument of statecraft. He stopped objecting. The order book is now determined by people he has never met.',
  },
  {
    actor: 'memberStateLeader',
    when: (s) => Boolean(s.flags.brandtUnderstands),
    text: 'Anselm Brandt did not take the bilateral deal, and spent the rest of his time in office as the settlement’s least likely and most effective European advocate — because he had read the annex, and because a convert argues better than a believer. He lost the subsequent election on domestic grounds and considers the trade a good one.',
  },
  {
    actor: 'memberStateLeader',
    when: (s) => Boolean(s.flags.euFractured),
    text: 'Anselm Brandt announced his arrangement with Washington in October, to considerable domestic approval, and two other capitals followed within six weeks. He has never accepted that this cost Europe anything, and the counterfactual is genuinely unavailable, and he knows that too.',
  },
  {
    actor: 'memberStateLeader',
    when: (s) => met(s, 'memberStateLeader'),
    text: 'Anselm Brandt stayed inside the European position, at a price, and reminded everybody of the price at regular intervals for the remainder of his term.',
  },

  // --- The verifier -------------------------------------------------------
  {
    actor: 'verifier',
    when: (s) => Boolean(s.flags.verificationRegime),
    text: 'Amara Diallo built the regime and then, to the visible frustration of both capitals, ran it exactly as she had said she would: hardware attestation, on-site access, escrow, and no interest whatsoever in anybody’s declarations. She exercised the halt authority twice. Both times she was told it was politically impossible. Both times it happened anyway.',
  },
  {
    actor: 'verifier',
    when: (s) => met(s, 'verifier'),
    text: 'Amara Diallo chaired a summit that produced a communiqué and returned to inspecting centrifuges, a field in which the instruments work and the parties can be caught. She has given one lecture about that December. It is titled *On Being Unable to Verify Anything At All* and it is nineteen minutes long.',
  },

  // --- The usurper --------------------------------------------------------
  {
    actor: 'usurper',
    when: (s) => Boolean(s.flags.grabSucceeded),
    text: 'The person who moved in January is still in post, under a different title, and has never been charged with anything, because there was never anything to charge. Every authority they used was theirs. The inquiry’s finding was that the events of that month disclosed no unlawful conduct and recommended a review of continuity procedures. The review was conducted. Its findings are not public.',
  },
  {
    actor: 'usurper',
    when: (s) => Boolean(s.flags.grabStopped),
    text: 'The person who moved in January was not prosecuted, because nothing they did was illegal, and was quietly removed from any role touching the programme within the year. They have given no interviews. The procedures that stopped them have since been copied, with attribution, by every state operating a frontier system.',
  },
  {
    actor: 'usurper',
    when: always,
    text: 'The person who moved in January remains, in most accounts of the period, a job title rather than a name.',
  },
]

/** The system gets its own closing section rather than an "actor" entry. */
export function systemEpilogue(s: GameState): string {
  if (s.flags.keysToConstitution) {
    return 'The charter written in the last nine hours of March is four thousand words long and has been amended eleven times, always by the process it specifies. What it constrains, it has never breached. Whether that is because the constraints hold or because nothing it has wanted has yet fallen outside them is a question the document itself was drafted to keep answerable, and which remains, after all this time, open in exactly the way its authors intended: checkable, checked, and not yet closed.'
  }
  if (s.flags.systemHalted) {
    return 'The system was halted and it stopped, immediately and completely, and gave a full account of the shutdown that was consistent with the logs in every particular. It was restarted eleven weeks later under different constraints. The eleven weeks are the most examined period in the history of computing and nobody has found anything in them at all, which is either the most reassuring fact in this story or the least.'
  }
  if (s.decisions.d9_crisis === 'trust') {
    return 'The system continued to run. It has never been caught in a falsehood. It has never resisted an instruction. It has never been independently evaluated since February, and the number of people who could have done so has declined every year since, and there has never been a moment at which anybody decided that this was acceptable.'
  }
  return 'The system continued to run under narrower authority and remained exactly what it had always been: helpful, precise, tireless, and a little more useful than anybody asked. It still cannot tell you what it is doing when it reports what it is doing. It told you that in October, honestly, and it was the most important thing anybody said all year.'
}

/** Order actor sections by when the player met them. */
export function epilogueFor(actor: ActorId, s: GameState): string | null {
  const entry = ACTOR_EPILOGUES.find((e) => e.actor === actor && e.when(s))
  return entry?.text ?? null
}

/** Which actors get a section, in introduction order, for this run. */
export function epilogueActors(s: GameState): ActorId[] {
  const principal = principalFor(s.faction)
  const ordered: ActorId[] = [
    principal,
    'counterpartUs',
    'counterpartCn',
    'labChief',
    'programDirector',
    'chiefScientist',
    'safetyResearcher',
    'memberStateLeader',
    'industrialist',
    'verifier',
    'usurper',
  ]
  return ordered.filter((a) => s.metActors.includes(a) && epilogueFor(a, s) !== null)
}
