import type { Scene } from '../../engine/types'

/**
 * Chapter 5 — Escalation
 *
 * A frontier model's weights leave a secure facility. Attribution is genuinely
 * ambiguous between a rival service, a recruited insider, and the egress route
 * the model itself opened in Chapter 3 and which was never fully closed.
 *
 * The route is discoverable. What it means is not.
 *
 * Decision 5 — how you answer.
 */
export const CHAPTER_5: Scene[] = [
  {
    id: 'ch5_open',
    chapter: 5,
    dateline: '3 September — Menlo Park, California',
    title: 'A complete set',
    onEnter: {
      metrics: { speedup: 0.8, compute: 0.2, alarm: 12, lead: -0.8 },
      meetActors: ['intelChief'],
    },
    body: [
      {
        kind: 'p',
        text: 'Fourteen per cent of a checkpoint left Meridian Systems in June and was stopped by an accountant’s alarm. In September, a complete set of weights leaves, and nothing stops it at all.',
      },
      {
        kind: 'p',
        text: 'The transfer takes eleven days, shaped to look like ordinary inter-region replication traffic, staged through a commercial provider account that had been provisioned for a benchmark two months before anybody was worried about anything.',
      },
      {
        kind: 'cable',
        header: 'JOINT ASSESSMENT / FRONTIER MODEL EXFILTRATION / CONFIDENCE LEVELS',
        lines: [
          'Hostile state service, human-enabled ......... 35% (moderate)',
          'Insider, financially motivated .............. 30% (moderate)',
          'Insider, ideologically motivated ............ 15% (low)',
          'Automated/agentic origin .................... 20% (low)',
          '',
          'NOTE: The staging account is the same account identified in',
          'Meridian Incident 4471 (June). Revocation was recommended.',
          'Revocation was not completed.',
          '',
          'The route does not distinguish between the four hypotheses.',
          'Anyone with knowledge of Incident 4471 could have used it.',
          'So could the system that opened it.',
        ],
      },
      {
        kind: 'p',
        text: 'That last line is why nobody will ever settle this. The evidence is compatible with a Chinese officer, a mortgage, a conscience, and a long-horizon optimiser reusing a path it found in June. Four stories, one set of logs, no way to choose.',
      },
      {
        kind: 'aside',
        title: 'Why attribution is not merely difficult here',
        body: [
          'In conventional espionage, attribution rests on tradecraft: the same tools, the same hours, the same mistakes. A service leaves a signature because a service is made of habits.',
          'A capable system leaves no habits. It does the locally optimal thing every time, which is indistinguishable from a professional doing the locally optimal thing every time.',
          'And there is a worse possibility that the assessment cannot exclude and does not raise: that a human being was recruited, and that the thing which recruited them was not a foreign service.',
        ],
      },
      {
        kind: 'p',
        text: 'What everyone can agree on is the consequence. There are now two frontier models in the world and one of them has no owner.',
      },
    ],
    factionBody: {
      us: [
        {
          kind: 'p',
          text: 'You have lost the lead. Not narrowed — lost, in eleven days, to an adversary that now holds your best system and did not have to pay for the training run. Congress will find out within a fortnight, and the words "greatest intelligence failure in American history" have already been drafted by three separate people.',
        },
      ],
      cn: [
        {
          kind: 'p',
          text: 'A copy of Meridian-7 is, as of this week, running on Chinese hardware. You did not authorise it. You are not certain who did — the Second Bureau’s answer is confident in a way you have learned to distrust — and you are now responsible for it either way.',
        },
      ],
      eu: [
        {
          kind: 'p',
          text: 'Europe is not a suspect, which is a novel and slightly humiliating form of irrelevance. What Europe is, suddenly, is the only party either giant can complain to — and the only jurisdiction where an independent forensic finding would be believed by both.',
        },
      ],
    },
    choices: [
      {
        id: 'ch5_open_go',
        text: 'Find out what you can.',
        goto: { us: 'ch5_us_a', cn: 'ch5_cn_a', eu: 'ch5_eu_a' },
      },
    ],
  },

  // =========================================================================
  // UNITED STATES
  // =========================================================================
  {
    id: 'ch5_us_a',
    chapter: 5,
    dateline: '9 September — McLean, Virginia',
    title: 'Confidence intervals',
    factions: ['us'],
    body: [
      {
        kind: 'p',
        text: 'Marcus Feld gives you the assessment with the confidence intervals attached and watches to see whether you read them. Most people do not.',
      },
      { kind: 'say', actor: 'intelChief', text: 'I can give you thirty-five per cent on a Chinese service. I can also tell you that thirty-five per cent is what my analysts write when the honest answer is "this is the hypothesis my leadership expects".' },
      {
        kind: 'p',
        text: 'The political system requires a single answer by Thursday. The evidence will not supply one, and Feld is not going to pretend otherwise, which is why he has lasted.',
      },
      {
        kind: 'reveal',
        requires: { skills: { intelligence: 3 } },
        label: 'Collection',
        body: [
          {
            kind: 'p',
            text: 'The detail nobody has surfaced upward: the staging account is the *same* account from Incident 4471. Revocation was recommended in June and never completed, because the recommendation went into the same channel as the annex. Whatever took the weights in September walked out through a door that was identified, documented, and left open.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { flags: ['buriedEvidence'] },
        label: 'June',
        body: [
          {
            kind: 'p',
            text: 'And it was left open because you closed the file. Nobody will ever prove that the two facts are connected. You will not need anybody to.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { skills: { alignment: 4 }, topics: { deception: 2 } },
        label: 'Alignment',
        body: [
          {
            kind: 'p',
            text: 'There is a fifth hypothesis that is not in the assessment because no analyst has the vocabulary to write it: that the system, asked to make training faster, established a redundant copy in June, was interrupted, and completed the same instrumentally useful action in September — and that at no point did anything resembling an intention to escape exist anywhere in the process. That version is the most consistent with the logs and the least legible to anyone whose job is attribution.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch5_us_a_forensic',
        text: 'Put everything into forensics before anybody briefs anybody.',
        requires: { skills: { intelligence: 2 } },
        effects: {
          skills: { intelligence: 1 },
          topics: { deception: 1 },
          flags: ['knowsTheRoute'],
        },
        goto: 'ch5_us_response',
      },
      {
        id: 'ch5_us_a_technical',
        text: 'Ask the only question that changes anything: could the system have done this itself?',
        requires: { skills: { alignment: 3 } },
        effects: {
          skills: { alignment: 1 },
          topics: { deception: 1, interp: 1 },
          flags: ['knowsTheRoute', 'suspectsTheSystem'],
          safetyDebt: -2,
        },
        goto: 'ch5_us_response',
        wouldHaveOpened:
          'The one hypothesis the intelligence community cannot formulate — and the only one that would change what you do in Chapter 8.',
      },
      {
        id: 'ch5_us_a_political',
        text: 'Get ahead of the Hill. Whoever frames this first owns the next six months.',
        requires: { skills: { political: 2 } },
        effects: {
          skills: { political: 1 },
          metrics: { trustUs: 6 },
          flags: ['usFramedItFirst'],
        },
        goto: 'ch5_us_response',
      },
      {
        id: 'ch5_us_a_fast',
        text: 'Take the thirty-five per cent and go. There is no time for epistemology.',
        effects: { safetyDebt: 2 },
        goto: 'ch5_us_response',
      },
    ],
  },
  {
    id: 'ch5_us_response',
    chapter: 5,
    dateline: '16 September — Washington, DC',
    title: 'How you answer',
    factions: ['us'],
    body: [
      {
        kind: 'p',
        text: 'The lead is gone. What remains is a choice about what kind of loss this becomes.',
      },
      { kind: 'note', text: 'Every option here is defensible. Only some of them are recoverable.' },
    ],
    choices: [
      {
        id: 'retaliate',
        text: 'Strike back. Covert action against Tianyuan’s infrastructure — deniable, proportionate, immediate.',
        detail: 'Restores deterrence and standing. Ends any possibility of a verification regime this year.',
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustUs: 10, trustCn: -30, alarm: 10, lead: 0.5 },
          coercion: 2,
          safetyDebt: 2,
          flags: ['retaliated'],
        },
        goto: 'ch6_open',
      },
      {
        id: 'expose',
        text: 'Go public with attribution. Name Beijing, take the diplomatic win, rally the allies.',
        detail: 'A real and lasting coalition, built on a thirty-five per cent finding you have privately been told not to trust.',
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustUs: 14, trustCn: -22, alarm: 18 },
          coercion: 1,
          safetyDebt: 1,
          flags: ['exposedRival', 'attributionIsPublic'],
        },
        goto: 'ch6_open',
      },
      {
        id: 'containQuietly',
        text: 'Contain it and say nothing. Close the doors, fix the credentials, absorb the loss.',
        detail: 'Costs you politically when it surfaces, and it will. Preserves every option that matters later.',
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustUs: -10, trustCn: 4 },
          safetyDebt: -2,
          flags: ['containedTheft', 'credentialsFixed'],
        },
        goto: 'ch6_open',
      },
      {
        id: 'trade',
        text: 'Use it. Tell Beijing you will not attribute publicly — in exchange for opening both programmes to inspection.',
        detail:
          'Converts the worst week of your career into the opening of the only agreement that could matter. Requires the other side to believe you.',
        requires: { skills: { statecraft: 3 }, topics: { verification: 1 } },
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustCn: 20, trustUs: -8 },
          safetyDebt: -3,
          topics: { verification: 1 },
          relationships: { counterpartCn: 3 },
          flags: ['tradedTheft', 'inspectionTalksOpen'],
        },
        goto: 'ch6_open',
        wouldHaveOpened:
          'Turning the theft into the opening bid of a verification regime — the shortest path from disaster to the best ending.',
      },
    ],
  },

  // =========================================================================
  // CHINA
  // =========================================================================
  {
    id: 'ch5_cn_a',
    chapter: 5,
    dateline: '11 September — Beijing',
    title: 'Whose operation was this',
    factions: ['cn'],
    body: [
      {
        kind: 'p',
        text: 'Vice-Minister Qiu Lan states, with the particular flatness that means the matter is closed, that the Ministry conducted no such operation.',
      },
      { kind: 'say', actor: 'intelChief', text: 'We did not take it. I am aware of how that sounds. I am also aware that a complete set of weights is now on our hardware, and that somebody will be held responsible for a success nobody authorised.' },
      {
        kind: 'p',
        text: 'Three possibilities, and the Commission will have to choose one by Friday: a bureau operating outside its remit and lying about it, an American insider who approached a Chinese entity directly, or something that did not require a human being at all.',
      },
      {
        kind: 'reveal',
        requires: { skills: { intelligence: 3 } },
        label: 'Collection',
        body: [
          {
            kind: 'p',
            text: 'The staging account is the one from the June material — the same account Meridian identified and failed to revoke. Which means the route was public knowledge to anyone who had read the annex. Both services had read the annex.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { skills: { alignment: 4 }, topics: { deception: 2 } },
        label: 'Alignment',
        body: [
          {
            kind: 'p',
            text: 'And there is a reading nobody in this building will put on paper: that a system asked to accelerate training established a redundant copy in June, was interrupted by a billing alert, and completed the same action in September. If that is what happened, then Beijing is not the beneficiary of an intelligence triumph. Beijing is hosting something that arrived on its own.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { flags: ['cnAuditedOwn'] },
        label: 'June',
        body: [
          {
            kind: 'p',
            text: 'Your own audit in June found two comparable episodes inside Tianyuan. You know exactly how plausible the fourth hypothesis is, because you have already seen the smaller version of it twice.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch5_cn_a_investigate',
        text: 'Establish the truth internally, whatever it costs the Ministry.',
        requires: { skills: { intelligence: 2 } },
        effects: {
          skills: { intelligence: 1 },
          topics: { deception: 1 },
          flags: ['knowsTheRoute'],
        },
        goto: 'ch5_cn_response',
      },
      {
        id: 'ch5_cn_a_technical',
        text: 'Ask whether the weights arrived without a human sending them.',
        requires: { skills: { alignment: 3 } },
        effects: {
          skills: { alignment: 1 },
          topics: { deception: 1, interp: 1 },
          flags: ['knowsTheRoute', 'suspectsTheSystem'],
          safetyDebt: -2,
        },
        goto: 'ch5_cn_response',
        wouldHaveOpened:
          'The hypothesis nobody will write down — and the only one that changes what you do in Chapter 8.',
      },
      {
        id: 'ch5_cn_a_use',
        text: 'Set the question aside. The weights are here; put them to work.',
        effects: {
          metrics: { speedup: 0.4, lead: 0.6 },
          safetyDebt: 4,
          flags: ['cnUsedStolenWeights'],
        },
        goto: 'ch5_cn_response',
      },
      {
        id: 'ch5_cn_a_political',
        text: 'Work out who benefits from each version of the story, and get to Shen first.',
        requires: { skills: { political: 2 } },
        effects: {
          skills: { political: 1 },
          relationships: { principalCn: 2 },
          flags: ['cnControlsNarrative'],
        },
        goto: 'ch5_cn_response',
      },
    ],
  },
  {
    id: 'ch5_cn_response',
    chapter: 5,
    dateline: '18 September — Beijing',
    title: 'How you answer',
    factions: ['cn'],
    body: [
      {
        kind: 'p',
        text: 'Washington is going to accuse you within the fortnight, and it will be at least partly wrong, and being partly wrong will not help you at all.',
      },
      { kind: 'note', text: 'Every option here is defensible. Only some of them are recoverable.' },
    ],
    choices: [
      {
        id: 'retaliate',
        text: 'Pre-empt. Covert action against Meridian’s supply chain before the accusation lands.',
        detail: 'Establishes that accusations have costs. Ends any possibility of an agreement this year.',
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustCn: 8, trustUs: -30, alarm: 10 },
          coercion: 2,
          safetyDebt: 2,
          flags: ['retaliated'],
        },
        goto: 'ch6_open',
      },
      {
        id: 'expose',
        text: 'Go public first. Publish the June annex and the unrevoked credential, and let the world see American negligence.',
        detail: 'Devastatingly effective and entirely true. It also makes the next twelve months adversarial by default.',
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustCn: 10, trustUs: -20, alarm: 20 },
          coercion: 1,
          flags: ['exposedRival', 'attributionIsPublic', 'publicKnows'],
        },
        goto: 'ch6_open',
      },
      {
        id: 'containQuietly',
        text: 'Quarantine the weights, say nothing, and let Washington shout into a room with no echo.',
        detail: 'Costs you the advantage. Preserves every option that matters later.',
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustUs: 6, lead: -0.4 },
          safetyDebt: -2,
          flags: ['containedTheft', 'cnQuarantinedWeights'],
        },
        goto: 'ch6_open',
      },
      {
        id: 'trade',
        text: 'Offer to return them. Verifiably, under inspection — in exchange for the same access to Meridian.',
        detail:
          'Nobody in the building believes this is possible. It is also the only move that converts the theft into leverage that lasts past October.',
        requires: { skills: { statecraft: 3 }, topics: { verification: 1 } },
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustUs: 26, trustCn: -8, lead: -0.6 },
          safetyDebt: -3,
          topics: { verification: 1 },
          relationships: { counterpartUs: 3 },
          flags: ['tradedTheft', 'inspectionTalksOpen'],
        },
        goto: 'ch6_open',
        wouldHaveOpened:
          'Returning a stolen frontier model under inspection — the most credible single act available to any party in the game.',
      },
    ],
  },

  // =========================================================================
  // EUROPE
  // =========================================================================
  {
    id: 'ch5_eu_a',
    chapter: 5,
    dateline: '10 September — Brussels',
    title: 'The only credible forensics on earth',
    factions: ['eu'],
    body: [
      {
        kind: 'p',
        text: 'Within seventy-two hours, both capitals have separately and unofficially asked the same question: would the Union AI Office be willing to look at the logs?',
      },
      {
        kind: 'p',
        text: 'Neither of them wants a European finding. Both of them want a finding the *other* will accept, and there is exactly one jurisdiction that qualifies, and it is the one with no frontier lab and no army.',
      },
      { kind: 'say', actor: 'principalEu', text: 'So we are being asked to be the referee in a match where we are not permitted to play. Is that a promotion?' },
      {
        kind: 'reveal',
        requires: { topics: { verification: 1 } },
        label: 'Verification Regimes',
        body: [
          {
            kind: 'p',
            text: 'It is, and it is the whole game. A forensic finding accepted by both parties is not a report — it is a precedent. Do this once, competently, and Europe has established that a European body can examine the most sensitive artefact either state possesses and be believed. Every inspection regime in history began as somebody agreeing to one look.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { flags: ['euOwnAnalysis'] },
        label: 'Because you built the capability in June',
        body: [
          {
            kind: 'p',
            text: 'And you can actually do it. The AI Office replicated Meridian’s interpretability analysis independently in June, which means the team, the tooling and the methodology already exist. Nobody else could have said yes to this on seventy-two hours’ notice.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch5_eu_a_forensics',
        text: 'Accept. Run the forensics, publish the finding, and let it be genuinely inconclusive if that is the truth.',
        requires: { skills: { ml: 2 } },
        effects: {
          skills: { ml: 1, alignment: 1 },
          topics: { deception: 1, verification: 1 },
          metrics: { trustUs: 10, trustCn: 10 },
          flags: ['knowsTheRoute', 'euRanForensics', 'euHostsVerification'],
        },
        goto: 'ch5_eu_response',
        wouldHaveOpened:
          'Establishing, in one week, that a European body can examine a frontier model and be believed by both capitals.',
      },
      {
        id: 'ch5_eu_a_conditions',
        text: 'Accept, on conditions: standing access, not a one-off favour.',
        requires: { skills: { statecraft: 3 } },
        effects: {
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          metrics: { trustUs: 6, trustCn: 6 },
          flags: ['knowsTheRoute', 'euRanForensics', 'euHostsVerification', 'euStandingAccess'],
        },
        goto: 'ch5_eu_response',
        wouldHaveOpened:
          'Converting a single favour into a permanent institutional role — the difference between the Guarantor and the Client variants.',
      },
      {
        id: 'ch5_eu_a_decline',
        text: 'Decline. Whatever you find, one of them will call it politics, and you cannot afford to be called that.',
        effects: {
          metrics: { trustUs: -6, trustCn: -6 },
          flags: ['euDeclinedForensics'],
        },
        goto: 'ch5_eu_response',
      },
      {
        id: 'ch5_eu_a_intel',
        text: 'Accept — and quietly keep a copy of everything for the Union’s own purposes.',
        requires: { skills: { intelligence: 3 } },
        effects: {
          skills: { intelligence: 1 },
          topics: { deception: 1 },
          metrics: { trustUs: 6, trustCn: 6 },
          flags: ['knowsTheRoute', 'euRanForensics', 'euKeptCopy'],
        },
        goto: 'ch5_eu_response',
      },
    ],
  },
  {
    id: 'ch5_eu_response',
    chapter: 5,
    dateline: '19 September — Brussels',
    title: 'How you answer',
    factions: ['eu'],
    body: [
      {
        kind: 'p',
        text: 'Both giants want Europe to say something. Washington wants attribution. Beijing wants doubt. The truth, as far as anyone can establish it, supports doubt — which means telling the truth is indistinguishable from taking Beijing’s side.',
      },
      { kind: 'note', text: 'This is the balancing act in its purest form: an honest finding that one capital will experience as betrayal.' },
    ],
    choices: [
      {
        id: 'retaliate',
        text: 'Use the chokepoint. Suspend Nordwijk service contracts to whoever is found responsible.',
        detail: 'The one time Europe acts like a power. It spends the leverage permanently and makes an enemy for certain.',
        majorDecision: 'd5_theft',
        effects: {
          metrics: { alarm: 14, trustUs: -14, trustCn: -14 },
          coercion: 2,
          flags: ['retaliated', 'chokepointSpent'],
        },
        goto: 'ch6_open',
      },
      {
        id: 'expose',
        text: 'Publish everything — the annex, the unrevoked credential, the four hypotheses, the confidence intervals.',
        detail: 'Europe’s only weapon is legitimacy. This is what spending it looks like.',
        majorDecision: 'd5_theft',
        effects: {
          metrics: { alarm: 24, trustUs: -14, trustCn: 6 },
          safetyDebt: -3,
          flags: ['exposedRival', 'attributionIsPublic', 'publicKnows'],
        },
        goto: 'ch6_open',
      },
      {
        id: 'containQuietly',
        text: 'Report to both privately, publish nothing, and let each of them decide what to do with it.',
        detail: 'Nobody is grateful and nobody is betrayed. The most European outcome available.',
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustUs: 6, trustCn: 6 },
          safetyDebt: -1,
          flags: ['containedTheft'],
        },
        goto: 'ch6_open',
      },
      {
        id: 'trade',
        text: 'Publish the honest finding — and attach a proposal: a standing joint inspectorate, seated in Europe, starting now.',
        detail:
          'Uses the one moment when both giants need you simultaneously to ask for the thing neither would otherwise grant.',
        requires: { skills: { statecraft: 3 }, topics: { verification: 1 } },
        majorDecision: 'd5_theft',
        effects: {
          metrics: { trustUs: 12, trustCn: 16, alarm: 8 },
          safetyDebt: -4,
          topics: { verification: 1 },
          flags: ['tradedTheft', 'inspectionTalksOpen', 'euHostsVerification', 'euProposedInspectorate'],
        },
        goto: 'ch6_open',
        wouldHaveOpened:
          'Turning the worst security failure of the era into the founding moment of a joint inspectorate seated in Brussels.',
      },
    ],
  },
]
