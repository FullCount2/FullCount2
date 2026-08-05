import type { Scene } from '../../engine/types'

/**
 * Chapter 4 — Brussels
 *
 * Europe's leverage play. Three assets: the lithography chokepoint, market
 * access, and the only plausible claim to being a venue both giants could
 * tolerate inspecting them.
 *
 * The same decision from opposite sides of the table — from Brussels it is
 * "tilt, hedge, or bid for a third pole"; from Washington or Beijing it is
 * "coerce, court, or write them off".
 *
 * Decision 4 — the European question.
 */
export const CHAPTER_4: Scene[] = [
  {
    id: 'ch4_open',
    chapter: 4,
    dateline: '8 July — Brussels',
    title: 'The month Europe stopped being scenery',
    onEnter: { metrics: { speedup: 0.5, compute: 0.15, alarm: 4 } },
    body: [
      {
        kind: 'p',
        text: 'Both giants arrive in the same fortnight, and neither of them says the word "chokepoint" once.',
      },
      {
        kind: 'p',
        text: 'The American delegation talks about allied resilience, coordinated technology protection, and a joint industrial framework. The Chinese delegation talks about open scientific exchange, the dangers of bloc formation, and a very large number of civil aviation orders that could be placed this year or next year depending on the atmosphere.',
      },
      {
        kind: 'p',
        text: 'Both of them want the same three things: that Nordwijk Photonics ships to them, that Nordwijk Photonics does not ship to the other, and that Europe does not develop the habit of thinking of itself as a party to this.',
      },
      {
        kind: 'aside',
        title: 'The arithmetic of the chokepoint',
        body: [
          'Nordwijk ships fewer than forty systems a year. Neither giant can build an equivalent inside a decade, and both can build a *worse* one inside four years if sufficiently motivated.',
          'So the leverage is real and it decays the moment it is used. Withhold a machine for political reasons and you convert an irreplaceable asset into a four-year problem that two of the largest industrial states in history have decided to solve.',
          'Which means the chokepoint is worth the most while it remains theoretical — and that Europe’s real question is not when to pull it, but what it can buy by credibly never pulling it.',
        ],
      },
      {
        kind: 'quote',
        text: 'We were not being courted. We were being priced.',
        attrib: 'Henrik Aalto, Secretary-General of the Council',
      },
    ],
    factionBody: {
      us: [
        {
          kind: 'p',
          text: 'Your brief is straightforward and slightly shameful: secure European alignment on export controls, secure priority on Nordwijk’s order book, and prevent Brussels from establishing any institutional role that could later be used to constrain American deployment. The last of those is the one Washington cares about most and will never say aloud.',
        },
      ],
      cn: [
        {
          kind: 'p',
          text: 'Your brief is to keep Europe from closing. Not to win it — nobody in Beijing believes Europe can be won — but to ensure that the Union remains a place where a Chinese position can be argued, a Chinese order can be placed, and an American demand can be delayed by eighteen months of consultation.',
        },
      ],
      eu: [
        {
          kind: 'p',
          text: 'Your brief is whatever you can get twenty-seven governments to agree it is. Chancellor Brandt has already concluded that a bilateral arrangement with Washington serves his voters better than a European one, and has requested a meeting to tell you so politely.',
        },
      ],
    },
    choices: [
      {
        id: 'ch4_open_go',
        text: 'Continue.',
        goto: { us: 'ch4_us_a', cn: 'ch4_cn_a', eu: 'ch4_eu_a' },
      },
    ],
  },

  // =========================================================================
  // EUROPE — the seat where this chapter is the whole game
  // =========================================================================
  {
    id: 'ch4_eu_a',
    chapter: 4,
    dateline: '15 July — Berlin',
    title: 'The defection',
    factions: ['eu'],
    onEnter: { meetActors: ['memberStateLeader'] },
    body: [
      {
        kind: 'p',
        text: 'Anselm Brandt is not hostile to the Union. He is something more dangerous: entirely reasonable about it.',
      },
      { kind: 'say', actor: 'memberStateLeader', text: 'You will need eighteen months to agree a common position. I have been offered compute access and a security guarantee that I can announce in October. Explain to me, as a friend, what I tell my industry if I wait for you.' },
      {
        kind: 'p',
        text: 'If he goes, two others follow within a month, and the European position becomes a negotiating fiction that Washington can safely ignore. If he stays, he expects to be paid for staying.',
      },
      {
        kind: 'reveal',
        requires: { skills: { political: 3 } },
        label: 'Political Capital',
        body: [
          {
            kind: 'p',
            text: 'He does not actually want the bilateral deal. He wants to be seen to have extracted something, and he wants European industrial policy to have a German shape. Both of those are affordable. What is not affordable is letting him discover that you know it.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch4_eu_a_pay',
        text: 'Pay him: a European compute facility on German soil, announced in October, with his name on it.',
        requires: { skills: { political: 2 } },
        effects: {
          skills: { political: 1 },
          relationships: { memberStateLeader: 3 },
          flags: ['euUnityHeld'],
          metrics: { compute: 0.05 },
        },
        goto: 'ch4_eu_decision',
      },
      {
        id: 'ch4_eu_a_bind',
        text: 'Bind him legally: make export licensing an exclusive Union competence before he can act.',
        requires: { skills: { political: 3 }, topics: { lawfare: 1 } },
        effects: {
          skills: { political: 1 },
          topics: { lawfare: 1 },
          relationships: { memberStateLeader: -3 },
          coercion: 1,
          flags: ['euUnityHeld', 'euKeptLicences'],
        },
        goto: 'ch4_eu_decision',
        wouldHaveOpened:
          'Locking the chokepoint into Union hands permanently, at the cost of the largest member state’s goodwill.',
      },
      {
        id: 'ch4_eu_a_persuade',
        text: 'Show him the annex from June, and let him work out what a bilateral deal would make him responsible for.',
        requires: { skills: { statecraft: 3 } },
        effects: {
          skills: { statecraft: 1 },
          relationships: { memberStateLeader: 2 },
          flags: ['euUnityHeld', 'brandtUnderstands'],
          safetyDebt: -1,
        },
        goto: 'ch4_eu_decision',
        wouldHaveOpened:
          'Converting the largest member state from a defection risk into an ally who understands the actual stakes.',
      },
      {
        id: 'ch4_eu_a_lose',
        text: 'Let him go. A smaller Europe that can decide beats a larger one that cannot.',
        effects: {
          metrics: { trustUs: 6, trustCn: -6 },
          relationships: { memberStateLeader: -1 },
          flags: ['euFractured'],
        },
        goto: 'ch4_eu_decision',
      },
    ],
  },
  {
    id: 'ch4_eu_decision',
    chapter: 4,
    dateline: '24 July — Brussels',
    title: 'The European question',
    factions: ['eu'],
    body: [
      {
        kind: 'p',
        text: 'The Council has to decide what Europe is in this. Everything after today reads from this answer, and both capitals will have read it by Monday.',
      },
      {
        kind: 'note',
        text: 'Washington’s trust and Beijing’s trust are tracked separately. Almost every option below buys one at the expense of the other. Holding both is a Statecraft problem.',
      },
    ],
    choices: [
      {
        id: 'tilt_us',
        text: 'Align with Washington. Openly, fully, and in exchange for everything that can be extracted for it.',
        detail: 'Safety, compute access, and a seat inside the American tent. You will not be trusted in Beijing again.',
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustUs: 30, trustCn: -30, compute: 0.1 },
          skills: { political: 1 },
          flags: ['euAligned'],
        },
        goto: 'ch5_open',
      },
      {
        id: 'tilt_cn',
        text: 'Lean towards Beijing. Nordwijk keeps shipping, the aviation orders land, and Washington learns Europe is not automatic.',
        detail: 'Enormous short-term leverage over Washington. Enormous long-term exposure.',
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustUs: -32, trustCn: 26 },
          skills: { statecraft: 1 },
          flags: ['euLeanedEast'],
        },
        goto: 'ch5_open',
      },
      {
        id: 'hedge',
        text: 'Broker. Supply both, promise neither, and make being useful to both the whole strategy.',
        detail: 'The default European answer. Sustainable, unheroic, and it keeps the Guarantor variant alive.',
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustUs: 6, trustCn: 8 },
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          flags: ['euHedged'],
        },
        goto: 'ch5_open',
      },
      {
        id: 'hedge_verify',
        text: 'Broker — and formally offer Europe as the verification venue for both programmes, with real inspection powers.',
        detail:
          'Converts hedging from a posture into an institution. Requires both giants to take a European offer seriously while Europe has nothing to threaten them with.',
        requires: { skills: { statecraft: 4 }, topics: { verification: 1 } },
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustUs: 14, trustCn: 16 },
          skills: { statecraft: 1, political: 1 },
          topics: { verification: 1 },
          safetyDebt: -2,
          flags: ['euHedged', 'euHostsVerification'],
        },
        goto: 'ch5_open',
        wouldHaveOpened:
          'A standing European verification office both capitals have already agreed to — the direct road to the Guarantor variant and a load-bearing piece of the best ending.',
      },
      {
        id: 'third_pole',
        text: 'Bid for a third pole. European compute, European models, European terms — and the chokepoint held as sovereign leverage.',
        detail:
          'The most ambitious option in the game from this seat. It requires unity you may not have and credibility you have to have earned.',
        requires: {
          skills: { statecraft: 4, political: 4 },
          flags: ['euUnityHeld'],
        },
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustUs: -6, trustCn: -4, compute: 0.15, alarm: 6 },
          skills: { political: 1, industry: 1 },
          flags: ['euThirdPole'],
        },
        goto: 'ch5_open',
        wouldHaveOpened:
          'Europe as an actual power rather than a broker — the rarest ending variant in the game.',
      },
    ],
  },

  // =========================================================================
  // UNITED STATES — the other side of the table
  // =========================================================================
  {
    id: 'ch4_us_a',
    chapter: 4,
    dateline: '17 July — Brussels',
    title: 'Allied resilience',
    factions: ['us'],
    onEnter: { meetActors: ['counterpartEu', 'industrialist'] },
    body: [
      {
        kind: 'p',
        text: 'Henrik Aalto represents twenty-seven positions simultaneously and will tell you honestly which three of them matter. This makes him the most useful person in the building and the hardest to lie to.',
      },
      { kind: 'say', actor: 'counterpartEu', text: 'You would like our licensing policy to follow yours. We would like to know what we are for, in your plan, after you no longer need our licensing policy.' },
      {
        kind: 'p',
        text: 'It is the right question and you have not been given an answer to it. Washington’s actual plan for Europe, stripped of language, is: comply now, and be reassured later.',
      },
      {
        kind: 'reveal',
        requires: { topics: { chips: 1 } },
        label: 'Chip Supply Chain',
        body: [
          {
            kind: 'p',
            text: 'Also worth knowing before you press: the leverage runs both ways further than the talking points admit. Two of the subsystems in Nordwijk’s machines are single-sourced from American suppliers — and three others are single-sourced from firms in a jurisdiction that has just been told it is a junior partner. Squeeze here and you are squeezing a chain you are standing in.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch4_us_a_answer',
        text: 'Answer him honestly: Europe is the place both sides can inspect each other, and Washington will need that.',
        requires: { skills: { statecraft: 3 } },
        effects: {
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          relationships: { counterpartEu: 4 },
          metrics: { trustUs: 4 },
          flags: ['usSeesEuropeAsVenue'],
        },
        goto: 'ch4_us_decision',
        wouldHaveOpened:
          'Recognising, four chapters early, that Europe is the venue the endgame runs through.',
      },
      {
        id: 'ch4_us_a_industrial',
        text: 'Offer industrial substance: co-investment, foundry access, a genuine seat in the supply chain.',
        requires: { skills: { industry: 2 } },
        effects: {
          skills: { industry: 1 },
          relationships: { counterpartEu: 2, industrialist: 2 },
          metrics: { compute: 0.05 },
        },
        goto: 'ch4_us_decision',
      },
      {
        id: 'ch4_us_a_press',
        text: 'Press: allied technology protection is not optional, and the alternative is being treated as a supply risk.',
        effects: {
          coercion: 1,
          relationships: { counterpartEu: -3, industrialist: -2 },
          metrics: { trustUs: 4 },
        },
        goto: 'ch4_us_decision',
      },
      {
        id: 'ch4_us_a_listen',
        text: 'Say nothing committal and take his read of the Council back to Washington.',
        effects: { skills: { intelligence: 1 } },
        goto: 'ch4_us_decision',
      },
    ],
  },
  {
    id: 'ch4_us_decision',
    chapter: 4,
    dateline: '26 July — Washington, DC',
    title: 'What Europe is for',
    factions: ['us'],
    body: [
      {
        kind: 'p',
        text: 'Vance needs a policy, not a posture. Europe holds a machine you cannot replicate quickly and a market you cannot ignore, and it is currently deciding whether it is your ally, your broker, or your problem.',
      },
      { kind: 'note', text: 'Europe’s fate is woven into whichever ending you reach. This decision is where you set it.' },
    ],
    choices: [
      {
        id: 'court',
        text: 'Court them. Real industrial substance, real consultation, and a genuine European role.',
        detail: 'Expensive and slow. It is also the only version where Europe is standing beside you at the end.',
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustUs: 8, trustCn: -4 },
          skills: { statecraft: 1 },
          flags: ['usCourtedEurope'],
        },
        goto: 'ch5_open',
      },
      {
        id: 'court_verify',
        text: 'Court them — and back a European verification office, with inspection rights over American systems too.',
        detail:
          'Hands a foreign jurisdiction standing to inspect your own programme. Nobody in the building will thank you until Chapter 7.',
        requires: { skills: { statecraft: 3 }, topics: { verification: 1 } },
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustUs: 4, trustCn: 10 },
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          safetyDebt: -2,
          flags: ['usCourtedEurope', 'euHostsVerification'],
        },
        goto: 'ch5_open',
        wouldHaveOpened:
          'Standing up the verification venue the best ending requires, at a moment when it costs almost nothing.',
      },
      {
        id: 'coerce',
        text: 'Coerce them. Licensing compliance, or supply-chain consequences and a public accounting of European free-riding.',
        detail: 'Fast, effective, and it converts a potential guarantor into a resentful client.',
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustUs: 6, trustCn: -8 },
          coercion: 2,
          relationships: { counterpartEu: -5, industrialist: -3 },
          flags: ['usCoercedEurope'],
        },
        goto: 'ch5_open',
      },
      {
        id: 'writeoff',
        text: 'Write them off. Europe will not decide anything in time to matter; spend the effort elsewhere.',
        detail: 'Frees enormous bandwidth. Removes the one venue that both sides could have accepted.',
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustUs: 2 },
          relationships: { counterpartEu: -4 },
          flags: ['usWroteOffEurope', 'euBypassed'],
        },
        goto: 'ch5_open',
      },
    ],
  },

  // =========================================================================
  // CHINA — the other side of the table
  // =========================================================================
  {
    id: 'ch4_cn_a',
    chapter: 4,
    dateline: '19 July — Brussels',
    title: 'Keeping the door open',
    factions: ['cn'],
    onEnter: { meetActors: ['counterpartEu', 'industrialist'] },
    body: [
      {
        kind: 'p',
        text: 'Nobody in Beijing believes Europe can be won. The instruction is narrower and more achievable: prevent it from closing.',
      },
      {
        kind: 'p',
        text: 'Henrik Aalto receives you with the exact degree of courtesy that conveys he has had the American meeting already and found it unsatisfying.',
      },
      { kind: 'say', actor: 'counterpartEu', text: 'You will tell me about scientific openness and the dangers of blocs. I would rather you told me what Beijing thinks Europe is for. The Americans could not answer that either.' },
      {
        kind: 'reveal',
        requires: { skills: { statecraft: 3 } },
        label: 'Statecraft',
        body: [
          {
            kind: 'p',
            text: 'He is offering you something without saying so. Washington has just failed to give Europe a role. If Beijing can name one — any role, provided it is genuine and does not require Europe to choose — then Europe stops being an American asset and becomes a genuine third party. That is worth more to you than any order book.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch4_cn_a_answer',
        text: 'Answer him: Europe is where both programmes could be inspected, and Beijing would accept that.',
        requires: { skills: { statecraft: 3 } },
        effects: {
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          relationships: { counterpartEu: 4 },
          metrics: { trustCn: 4 },
          flags: ['cnSeesEuropeAsVenue'],
        },
        goto: 'ch4_cn_decision',
        wouldHaveOpened:
          'Naming a role for Europe that Washington could not — and buying a venue Beijing badly needs by Chapter 7.',
      },
      {
        id: 'ch4_cn_a_commercial',
        text: 'Offer commercial substance: aviation, rail, market access, all of it on the table this year.',
        requires: { skills: { industry: 2 } },
        effects: {
          skills: { industry: 1 },
          relationships: { counterpartEu: 2, industrialist: 1 },
          metrics: { trustCn: 4 },
        },
        goto: 'ch4_cn_decision',
      },
      {
        id: 'ch4_cn_a_wedge',
        text: 'Work the member states directly. Twenty-seven positions is twenty-seven opportunities.',
        requires: { skills: { intelligence: 2 } },
        effects: {
          skills: { intelligence: 1 },
          coercion: 1,
          relationships: { counterpartEu: -3 },
          flags: ['cnSplitEurope'],
        },
        goto: 'ch4_cn_decision',
      },
      {
        id: 'ch4_cn_a_listen',
        text: 'Deliver the talking points and report back accurately.',
        effects: { skills: { political: 1 } },
        goto: 'ch4_cn_decision',
      },
    ],
  },
  {
    id: 'ch4_cn_decision',
    chapter: 4,
    dateline: '28 July — Beijing',
    title: 'What Europe is for',
    factions: ['cn'],
    body: [
      {
        kind: 'p',
        text: 'Shen wants a recommendation. Europe cannot help you build, but it can decline to help Washington strangle you, and there is a considerable difference between those two things.',
      },
      { kind: 'note', text: 'Europe’s fate is woven into whichever ending you reach. This decision is where you set it.' },
    ],
    choices: [
      {
        id: 'court',
        text: 'Court them. Substance, patience, and a genuine role that does not require Europe to choose.',
        detail: 'Slow. It is also the only version where Europe is a party rather than an American instrument.',
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustCn: 8, trustUs: -4 },
          skills: { statecraft: 1 },
          flags: ['cnCourtedEurope'],
        },
        goto: 'ch5_open',
      },
      {
        id: 'court_verify',
        text: 'Court them — and formally accept European inspection of Tianyuan, before Washington accepts anything.',
        detail:
          'Offers a foreign jurisdiction access to your most sensitive programme. From behind, it is the single most credible move available to you.',
        requires: { skills: { statecraft: 3 }, topics: { verification: 1 } },
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustCn: 4, trustUs: 14 },
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          safetyDebt: -2,
          flags: ['cnCourtedEurope', 'euHostsVerification'],
        },
        goto: 'ch5_open',
        wouldHaveOpened:
          'Standing up the verification venue the best ending requires — and doing it first, which is worth more than doing it well.',
      },
      {
        id: 'coerce',
        text: 'Coerce them. Make the cost of aligning with Washington visible, member state by member state.',
        detail: 'Effective in the short term. Guarantees Europe ends up somebody’s client, and not yours.',
        majorDecision: 'd4_europe',
        effects: {
          metrics: { trustCn: 4, trustUs: -8 },
          coercion: 2,
          relationships: { counterpartEu: -5 },
          flags: ['cnCoercedEurope'],
        },
        goto: 'ch5_open',
      },
      {
        id: 'writeoff',
        text: 'Write them off. Europe will align with Washington in the end; spend the effort on fabrication instead.',
        detail: 'Rational, and it removes the one venue that both sides could have accepted.',
        majorDecision: 'd4_europe',
        effects: {
          metrics: { compute: 0.1 },
          relationships: { counterpartEu: -4 },
          flags: ['cnWroteOffEurope', 'euBypassed'],
        },
        goto: 'ch5_open',
      },
    ],
  },
]
