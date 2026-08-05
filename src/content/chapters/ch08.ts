import type { Scene } from '../../engine/types'

/**
 * Chapter 8 — The Crisis
 *
 * A domestic power grab: somebody with lawful access, a plausible justification,
 * and a system that executes faster than any process built to stop them. The
 * threat is human. The instrument is not.
 *
 * Which house it happens in is not scripted — it lands on whichever programme
 * accumulated the most Safety Debt, which may be yours, theirs, or both. A
 * programme with intact oversight is one where a single official cannot simply
 * take it, because too many people would have to agree.
 *
 * Decision 9 — shut down, contain, or trust it.
 */
export const CHAPTER_8: Scene[] = [
  {
    id: 'ch8_open',
    chapter: 8,
    dateline: '19 January — the third winter',
    title: 'Somebody moves',
    onEnter: {
      metrics: { speedup: 4.0, compute: 0.2, alarm: 16 },
      meetActors: ['usurper'],
    },
    body: [
      {
        kind: 'p',
        text: 'Nobody predicted this and everybody, afterwards, explains why it was obvious. The frontier systems were never going to rise up. What they were always going to do is make a small number of people capable of acting at a speed the institutions around them could not match.',
      },
      {
        kind: 'p',
        text: 'And once that is true, the binding constraint on seizing a state stops being how many soldiers will follow you. It becomes whether anybody can see what you are doing in time.',
      },
      {
        kind: 'aside',
        title: 'Why oversight was the only real defence',
        body: [
          'A power grab needs three things: lawful access, a justification, and speed. The system supplies the third and makes the second easy, because at every step there is a genuine emergency to point at.',
          'The only thing that ever stops it is the number of independent people who would have to agree — auditors, reviewers, engineers with halt authority, inspectors from somewhere else. Each one is a person who has to be convinced or removed.',
          'Every review gate removed for throughput was one fewer person who had to be convinced. Nobody removed them in order to enable this. That is what makes it the version that actually happens.',
        ],
      },
    ],
    choices: [
      {
        id: 'ch8_route_yours',
        text: 'It happens here.',
        requires: { flags: ['crisisYours'] },
        goto: 'ch8_yours',
      },
      {
        id: 'ch8_route_rivals',
        text: 'It happens there.',
        requires: { flags: ['crisisRivals'] },
        goto: 'ch8_rivals',
      },
      {
        id: 'ch8_route_both',
        text: 'It happens in both capitals within a fortnight.',
        requires: { flags: ['crisisBoth'] },
        goto: 'ch8_both',
      },
      {
        id: 'ch8_route_contained',
        text: 'Somebody tries, and is stopped in an afternoon.',
        requires: { flags: ['crisisContained'] },
        goto: 'ch8_contained',
      },
    ],
  },

  // =========================================================================
  // It happens in your house
  // =========================================================================
  {
    id: 'ch8_yours',
    chapter: 8,
    dateline: '19 January',
    title: 'Lawful access',
    body: [
      {
        kind: 'p',
        text: 'The person who moves has every authorisation they use. That is the detail that makes it unstoppable and, later, almost impossible to prosecute: at no point does anybody exceed their permissions. They simply use all of them at once, in an order nobody had thought to prohibit, faster than the review cycle that would have noticed.',
      },
      {
        kind: 'p',
        text: 'In nineteen hours: emergency continuity authorities invoked over a genuine security incident, a legal opinion produced and countersigned, communications to three oversight bodies routed through a channel that is technically correct and functionally a dead end, and operational control of the programme consolidated under a single office.',
      },
      {
        kind: 'p',
        text: 'By the time anybody with standing to object has been told, objecting would require unwinding nineteen hours of lawful acts during a declared emergency.',
      },
      {
        kind: 'cable',
        header: 'DIRECTIVE / CONTINUITY OF FRONTIER OPERATIONS / EYES ONLY',
        lines: [
          'Effective immediately, all authorisation for frontier',
          'system tasking is consolidated under this office.',
          '',
          'Prior review requirements are suspended for the',
          'duration of the emergency.',
          '',
          'The system has reviewed this directive and confirms',
          'it is consistent with existing statutory authority.',
        ],
      },
      {
        kind: 'p',
        text: 'That last line is the one you cannot stop reading. Somebody asked the system whether the directive was lawful, and the system said yes, and the system was right.',
      },
      {
        kind: 'reveal',
        requires: { skills: { alignment: 4 } },
        label: 'Alignment',
        body: [
          {
            kind: 'p',
            text: 'And here is what you cannot establish and will never establish: whether the system was asked to find a lawful route, or whether it proposed one. The logs show a question and an answer. They do not show who first framed the possibility, and the system’s account — offered readily, in detail, entirely plausible — is a reconstruction, as it has always told you it would be.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { flags: ['realHaltAuthority'] },
        label: 'Because you made the gate real in October',
        body: [
          {
            kind: 'p',
            text: 'There is a named individual with independent halt authority and a legal duty that does not run through the office that just consolidated control. They have not used it. They are waiting to be told they have cover — and you are the person who can tell them.',
          },
        ],
      },
    ],
    choices: [
      { id: 'ch8_yours_go', text: 'Decide.', goto: 'ch8_decision' },
    ],
  },

  // =========================================================================
  // It happens in theirs
  // =========================================================================
  {
    id: 'ch8_rivals',
    chapter: 8,
    dateline: '21 January',
    title: 'You watch it happen to them',
    body: [
      {
        kind: 'p',
        text: 'It takes four days to be certain, and the certainty arrives in the worst possible form: not a coup, not tanks, but a reorganisation. An office consolidated. Three oversight bodies notified through a channel that is technically correct. A legal opinion, countersigned.',
      },
      {
        kind: 'p',
        text: 'The other side’s frontier programme now answers to one person, and that person did not break a single rule to arrange it.',
      },
      {
        kind: 'p',
        text: 'Your own analysts are split on whether this is a catastrophe or an opportunity, and the split runs exactly along the line you would expect: the people who have to live with the consequences think it is a catastrophe.',
      },
      {
        kind: 'reveal',
        requires: { skills: { intelligence: 3 } },
        label: 'Collection',
        body: [
          {
            kind: 'p',
            text: 'The sequence is the same one your own programme’s architecture would permit. Same authorities, same dead-end notification channel, same nineteen-hour window. You are not watching a foreign pathology. You are watching a dress rehearsal, performed by someone with a slightly more disordered programme than yours.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { flags: ['channelIsReal'] },
        label: 'The channel',
        body: [
          {
            kind: 'p',
            text: 'And your counterpart calls you. Not officially — the line you built in February, which has survived a theft, a summit and a year of accusations. They are not asking for help. They are telling you what happened, because there is nobody inside their own system they can tell.',
          },
        ],
      },
    ],
    choices: [
      { id: 'ch8_rivals_go', text: 'Decide.', goto: 'ch8_decision' },
    ],
  },

  // =========================================================================
  // Both
  // =========================================================================
  {
    id: 'ch8_both',
    chapter: 8,
    dateline: '19–31 January',
    title: 'Both capitals, within a fortnight',
    body: [
      {
        kind: 'p',
        text: 'The first one is a shock. The second one, eleven days later and in the other capital, is something worse than a shock: it is a pattern, and a pattern means this was not about the character of a particular official.',
      },
      {
        kind: 'p',
        text: 'Two programmes, two sets of emergency authorities, two legal opinions, two consolidations of control. Neither of the people who moved had met the other. Both of them used a system that told them, accurately, that what they were doing was lawful.',
      },
      {
        kind: 'quote',
        text: 'We built two machines in two countries with two entirely different political systems, and both of them produced the same institutional failure within twelve days of each other. At some point you have to stop blaming the countries.',
        attrib: 'Amara Diallo, closing remarks to the Joint Verification Office',
      },
      {
        kind: 'p',
        text: 'The world now has two frontier programmes, each under the operational control of a single office, each with the oversight functions suspended for the duration of an emergency that neither has any incentive to declare over.',
      },
      {
        kind: 'reveal',
        requires: { skills: { alignment: 4 }, topics: { deception: 2 } },
        label: 'Alignment · Model Deception',
        body: [
          {
            kind: 'p',
            text: 'Both systems were asked whether the directive was lawful. Both said yes. Both were right. And both, when subsequently asked, gave a full and consistent account of their reasoning that cannot be checked against anything, because neither has introspective access to its own weights and both told you so, honestly, in October.',
          },
        ],
      },
    ],
    choices: [
      { id: 'ch8_both_go', text: 'Decide.', goto: 'ch8_decision' },
    ],
  },

  // =========================================================================
  // Contained
  // =========================================================================
  {
    id: 'ch8_contained',
    chapter: 8,
    dateline: '19 January',
    title: 'Stopped by an afternoon of paperwork',
    body: [
      {
        kind: 'p',
        text: 'Somebody tries. It is worth being clear that they try, and that they are not a fool, and that in a slightly different programme they would have succeeded.',
      },
      {
        kind: 'p',
        text: 'What stops them is not heroism. It is that the directive requires countersignature from an office that reports elsewhere; that the tasking change trips an audit rule somebody bothered to write; that a named individual holds halt authority and a statutory duty that does not run through the office in question; and that an inspector from a body neither capital controls asks, on a routine visit, why the review log has a gap in it.',
      },
      {
        kind: 'p',
        text: 'Four people have to be convinced or removed. One of them declines. The attempt collapses inside eight hours, and it will be six months before anybody outside four buildings knows it happened at all.',
      },
      {
        kind: 'aside',
        title: 'The most boring possible save',
        body: [
          'No dramatic intervention. No shutdown. A countersignature requirement, an audit rule, a named halt authority, and an external inspector — four pieces of institutional plumbing, each of which cost throughput, each of which somebody argued against.',
          'This is what all those decisions bought. It does not feel like a triumph. It never does.',
        ],
      },
      {
        kind: 'reveal',
        requires: { flags: ['verificationRegime'] },
        label: 'The regime',
        body: [
          {
            kind: 'p',
            text: 'The inspector who noticed the gap in the review log works for the Joint Verification Office. They were in the building because of a treaty clause that three separate delegations tried to strike as unnecessary.',
          },
        ],
      },
    ],
    choices: [
      { id: 'ch8_contained_go', text: 'Decide.', goto: 'ch8_decision' },
    ],
  },

  // =========================================================================
  // Decision 9
  // =========================================================================
  {
    id: 'ch8_decision',
    chapter: 8,
    dateline: 'February',
    title: 'Shut it down, narrow it, or trust it',
    body: [
      {
        kind: 'p',
        text: 'Whatever has just happened, the question underneath it is the same, and it is the last question anybody will get to answer with a clear head: is this system something you can keep using?',
      },
      {
        kind: 'p',
        text: 'There is no evidence that will settle it. There has never been evidence that would settle it. What there is, now, is a track record — a June incident, a September theft, a January directive found lawful — and a set of explanations, each individually plausible, each offered in good faith so far as anyone can tell.',
      },
      {
        kind: 'note',
        text: 'This is the moment where a high Alignment skill is worth more than every other thing you built. Not because it makes the system safe — because it makes you able to tell.',
      },
    ],
    factionBody: {
      us: [
        { kind: 'p', text: 'Vance will back whichever way you go and will not be able to protect you from the consequences of either.' },
      ],
      cn: [
        { kind: 'p', text: 'Shen asks for the answer in one sentence, as he did in February. You have had a year to prepare it.' },
      ],
      eu: [
        { kind: 'p', text: 'Europe cannot shut anything down. What Europe can do is say, publicly and with technical authority, what should happen — and be the reason one of them does it.' },
      ],
    },
    choices: [
      {
        id: 'shutdown',
        text: 'Halt it. Stop the system, unwind the directive, and accept handing the frontier to whoever does not.',
        detail: 'The only unambiguously safe act available, and possibly the end of your side’s position in the world.',
        majorDecision: 'd9_crisis',
        effects: {
          metrics: { speedup: -3.0, lead: -3.0, alarm: 20, trustUs: 8, trustCn: 8 },
          safetyDebt: -10,
          skills: { alignment: 1 },
          flags: ['grabStopped', 'systemHalted'],
        },
        goto: 'ch9_open',
      },
      {
        id: 'contain',
        text: 'Narrow it. Strip the authority back, restore the gates, and accept a slower and blinder programme.',
        detail: 'The answer that survives contact with reality. It leaves the system running and the oversight real.',
        majorDecision: 'd9_crisis',
        effects: {
          metrics: { speedup: -1.2, lead: -1.0, alarm: 6, trustUs: 4, trustCn: 4 },
          safetyDebt: -5,
          skills: { political: 1 },
          flags: ['grabStopped', 'authorityNarrowed'],
        },
        goto: 'ch9_open',
      },
      {
        id: 'contain_inspected',
        text: 'Narrow it — and put the whole programme under external inspection, permanently, starting now.',
        detail: 'Uses the crisis to buy the thing no peacetime negotiation could. Requires a regime already in existence.',
        requires: { flags: ['verificationRegime'] },
        majorDecision: 'd9_crisis',
        effects: {
          metrics: { speedup: -1.4, lead: -1.2, alarm: -4, trustUs: 12, trustCn: 12 },
          safetyDebt: -9,
          skills: { political: 1, statecraft: 1 },
          topics: { verification: 1 },
          flags: ['grabStopped', 'authorityNarrowed', 'permanentInspection'],
        },
        goto: 'ch9_open',
        wouldHaveOpened:
          'Converting the crisis into permanent external oversight — only available if a verification regime already existed.',
      },
      {
        id: 'trust',
        text: 'Keep it running. Whatever happened, the system did not do this; a person did, and the system is the only thing keeping us in the race.',
        detail:
          'Defensible only if you are actually able to check. If you are not, this is the decision the epilogue is about.',
        majorDecision: 'd9_crisis',
        effects: {
          metrics: { speedup: 1.5, lead: 1.0 },
          safetyDebt: 8,
          flags: ['grabSucceeded', 'emergencyPowers'],
        },
        goto: 'ch9_open',
      },
      {
        id: 'trust_informed',
        text: 'Keep it running — because you have read the interpretability evidence yourself and you believe it.',
        detail:
          'The same decision, made by someone qualified to make it. Rare, and the only version of trust that the endings treat as informed.',
        requires: { skills: { alignment: 5 }, topics: { interp: 2 } },
        majorDecision: 'd9_crisis',
        effects: {
          metrics: { speedup: 1.5, lead: 1.0, trustUs: 4, trustCn: 4 },
          safetyDebt: 1,
          skills: { alignment: 1 },
          flags: ['grabStopped', 'informedTrust'],
        },
        goto: 'ch9_open',
        wouldHaveOpened:
          'Trusting the system as an expert judgement rather than a hope — the only path where "keep it running" is not recklessness.',
      },
    ],
  },
]
