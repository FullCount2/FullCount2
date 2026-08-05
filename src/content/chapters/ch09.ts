import type { Scene } from '../../engine/types'
import { END_SCENE } from '../../engine/types'

/**
 * Chapter 9 — The Last Human Decision
 *
 * One system is about to become decisively superior and somebody has to hold its
 * authority. Which options are on the table was determined in Chapters 4 and 7:
 * you cannot hand power to an institution you never built.
 *
 * Decision 10 — who holds the keys.
 */
export const CHAPTER_9: Scene[] = [
  {
    id: 'ch9_open',
    chapter: 9,
    dateline: '3 March — the last ordinary week',
    title: 'Decisive',
    onEnter: { metrics: { speedup: 5.0, compute: 0.25, alarm: 12 } },
    body: [
      {
        kind: 'p',
        text: 'The word everybody starts using in the first week of March is *decisive*, and it is used carefully, because it means something specific: that within a small number of weeks one system will be sufficiently more capable than everything else that its holder can no longer be meaningfully opposed.',
      },
      {
        kind: 'p',
        text: 'Not conquered. Opposed. The distinction stops mattering rather quickly.',
      },
      {
        kind: 'aside',
        title: 'What "decisive" is doing in the assessments',
        body: [
          'It does not mean the system can do anything. It means that in every domain where a contest could be held — cyber, economic, logistical, diplomatic, informational — the side without it is playing against an opponent who sees further and moves first, permanently.',
          'Historically, decisive advantages have been temporary because they could be copied. This one improves faster than it can be copied, which is the entire novelty and the entire problem.',
          'Every assessment on the table agrees the window for arranging what happens next is somewhere between two and nine weeks. None of them agree on which.',
        ],
      },
      {
        kind: 'p',
        text: 'And so the question that has been deferred through nine months of incident, theft, summit and crisis arrives, in the form it was always going to take: not *what should we build*, but *who holds it*.',
      },
    ],
    factionBody: {
      us: [
        {
          kind: 'p',
          text: 'You are ahead, or you are not, and the assessments differ. What is certain is that the decision will be made in Washington within the fortnight, that you will be in the room, and that whatever the room decides will be irreversible in a way nothing in your career has prepared you for.',
        },
      ],
      cn: [
        {
          kind: 'p',
          text: 'Beijing is ahead, or is not, and the assessments differ. Shen has asked you to prepare the recommendation personally rather than through the Commission, which is the greatest professional honour of your life and a way of ensuring the decision has one author.',
        },
      ],
      eu: [
        {
          kind: 'p',
          text: 'Europe will not hold it. Europe will be asked — by both, separately, in the same week — to say that the arrangement is legitimate. That is not nothing. In the specific circumstances of March, legitimacy is the one commodity in short supply, and you are the only party still selling it to both.',
        },
      ],
    },
    choices: [
      { id: 'ch9_open_go', text: 'The last week.', goto: 'ch9_lastnight' },
    ],
  },

  {
    id: 'ch9_lastnight',
    chapter: 9,
    dateline: '14 March — 23:40',
    title: 'The call',
    body: [
      {
        kind: 'p',
        text: 'It comes late, on the line that has survived a theft, a summit, an accusation and a year of being described in two capitals as a liability.',
      },
      {
        kind: 'p',
        text: 'Your counterpart is not authorised to make this call. They are making it anyway, which is the only reason it is worth anything.',
      },
      {
        kind: 'quote',
        text: 'I have eleven days of authority left and I am spending it on this. Whatever your government decides, I want one human being on your side to have heard a human being on mine say: we do not want to hold this alone either.',
      },
      {
        kind: 'p',
        text: 'There is no offer attached. There is no proposal, no term sheet, no channel to take it through. It is a person telling you something true at the last moment when telling it could matter, and it will not appear in any record.',
      },
      {
        kind: 'reveal',
        requires: { flags: ['channelIsReal'] },
        label: 'The channel, built in February',
        body: [
          {
            kind: 'p',
            text: 'They are calling you because in February you gave them something before you had to, and because the line you built was never contingent on either of you being right. Thirteen months of institutional machinery produced nothing as useful as this call.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { flags: ['gaveEvidenceToRival'] },
        label: 'June',
        body: [
          {
            kind: 'p',
            text: 'And in June you handed them the annex and asked for nothing. They have never mentioned it since. They are mentioning it now, obliquely, by making this call at all.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch9_lastnight_reciprocate',
        text: 'Tell them the truth about what your own side is considering.',
        requires: { skills: { statecraft: 3 } },
        effects: {
          metrics: { trustUs: 10, trustCn: 10 },
          relationships: { counterpartUs: 3, counterpartCn: 3 },
          flags: ['lastNightHonest'],
        },
        goto: 'ch9_keys',
        wouldHaveOpened:
          'The final act of the back channel: both sides going into the last decision knowing what the other is actually thinking.',
      },
      {
        id: 'ch9_lastnight_listen',
        text: 'Listen. Say only that you heard them. Give nothing away.',
        effects: { metrics: { trustUs: 2, trustCn: 2 } },
        goto: 'ch9_keys',
      },
      {
        id: 'ch9_lastnight_use',
        text: 'Report the call. It is intelligence, and withholding it is a career-ending act.',
        effects: {
          metrics: { trustUs: 6, trustCn: -12 },
          relationships: { counterpartUs: -6, counterpartCn: -6 },
          coercion: 1,
          flags: ['reportedTheCall'],
        },
        goto: 'ch9_keys',
      },
    ],
  },

  // =========================================================================
  // Decision 10 — who holds the keys
  // =========================================================================
  {
    id: 'ch9_keys',
    chapter: 9,
    dateline: '19 March',
    title: 'Who holds the keys',
    body: [
      {
        kind: 'p',
        text: 'The room is smaller than it should be for a decision of this size, which is how these rooms always are. There is no vote. There is a recommendation, and the recommendation is yours, and everybody present understands that the person who writes it is the person who decided.',
      },
      {
        kind: 'p',
        text: 'The options are not equal, and they are not all available. You cannot place authority in an institution that does not exist, and the institutions that exist in March are exactly the ones somebody built in July and December while being told they were wasting everybody’s time.',
      },
      {
        kind: 'note',
        text: 'This decision determines which of the five endings you reach. Everything you did before it determines which version of that ending you get.',
      },
    ],
    choices: [
      {
        id: 'us_alone',
        text: 'The United States, alone. One state, accountable to its own people, holding it in trust for everybody.',
        detail: 'The answer your own system was built to give. It is also, verifiably, what the other side feared.',
        requires: { faction: ['us'] },
        majorDecision: 'd10_keys',
        effects: { flags: ['keysToWashington'] },
        goto: END_SCENE,
      },
      {
        id: 'cn_alone',
        text: 'The People’s Republic, alone. One state, one chain of authority, no ambiguity about who is responsible.',
        detail: 'Coherent, executable, and the thing the other side spent a year organising against.',
        requires: { faction: ['cn'] },
        majorDecision: 'd10_keys',
        effects: { flags: ['keysToBeijing'] },
        goto: END_SCENE,
      },
      {
        id: 'us_alone_eu',
        text: 'Back Washington’s claim. Europe lends its legitimacy to an American settlement.',
        detail: 'The safe European answer. It ends the ambiguity that made Europe useful, in exchange for being on the winning side.',
        requires: { faction: ['eu'] },
        majorDecision: 'd10_keys',
        effects: { metrics: { trustUs: 10, trustCn: -20 }, flags: ['keysToWashington', 'euBackedUs'] },
        goto: END_SCENE,
      },
      {
        id: 'cn_alone_eu',
        text: 'Back Beijing’s claim. Europe lends its legitimacy to a Chinese settlement.',
        detail: 'Almost unthinkable in Brussels, and the one move that would genuinely surprise everybody.',
        requires: { faction: ['eu'] },
        majorDecision: 'd10_keys',
        effects: { metrics: { trustUs: -24, trustCn: 12 }, flags: ['keysToBeijing', 'euBackedCn'] },
        goto: END_SCENE,
      },
      {
        id: 'lab',
        text: 'The lab that built it. The only institution with people who actually understand what it is.',
        detail:
          'Technically the most competent custodian available and democratically the least defensible. It is not a state and it answers to nobody.',
        majorDecision: 'd10_keys',
        effects: { flags: ['keysToTheLab'] },
        goto: END_SCENE,
      },
      {
        id: 'joint',
        text: 'A joint international body. Shared authority, mutual inspection, neither side alone.',
        detail:
          'Only possible because an agreement exists to build it on. Fragile, slow, and the only arrangement neither side has to lose.',
        requires: { flags: ['agreementExists'] },
        majorDecision: 'd10_keys',
        effects: { flags: ['keysToJointBody'] },
        goto: END_SCENE,
        wouldHaveOpened:
          'Placing authority in shared hands — impossible without an agreement, which is what Chapter 7 was for.',
      },
      {
        id: 'constitution',
        text: 'The system itself, under a constitution you write in the remaining hours.',
        detail:
          'Not abdication — a charter: what it may do, what it must refuse, who may amend it, and how it can be stopped. It requires knowing enough to write one that means anything.',
        requires: { skills: { alignment: 4 }, topics: { verification: 2 } },
        majorDecision: 'd10_keys',
        effects: { flags: ['keysToConstitution'] },
        goto: END_SCENE,
        wouldHaveOpened:
          'Writing the charter under which a superintelligence holds its own authority — the most demanding option in the game, and reachable only by a player who understood the technology.',
      },
    ],
  },
]
