import type { Scene } from '../../engine/types'

/**
 * Chapter 2 — The Race Declared
 *
 * Nobody chooses to go public. The secret simply fails: each capital discovers
 * that the other already knows, and the race is declared out of fear rather than
 * ambition.
 *
 * Establishes the asymmetry of the three seats — American labs that bargain, a
 * Chinese programme fused to the state, and a Europe with no frontier lab at all.
 *
 * Decision 2 — posture.
 */
export const CHAPTER_2: Scene[] = [
  {
    id: 'ch2_open',
    chapter: 2,
    dateline: '11 April — everywhere at once',
    title: 'The secret fails',
    onEnter: { metrics: { alarm: 14, compute: 0.15, speedup: 0.3 } },
    body: [
      {
        kind: 'p',
        text: 'It does not leak. That is the part everyone gets wrong afterwards, in the memoirs and the hearings: there is no whistleblower, no document, no journalist with a source. What happens is duller and much harder to stop.',
      },
      {
        kind: 'p',
        text: 'A Chinese procurement notice for liquid cooling at a scale that only makes sense for one thing. An American export licence denial that names a subsystem nobody outside three buildings should know exists. A hiring freeze at one lab and a hiring spree at another, in the same week, for the same eleven job titles.',
      },
      {
        kind: 'p',
        text: 'Two governments read each other’s tells and arrive at the same conclusion within four days: *they know, and they know we know.* And once both sides believe that, the argument for restraint collapses on its own, without anybody having to win it.',
      },
      {
        kind: 'quote',
        text: 'We did not decide to race. We each independently concluded that the other had already decided, which turns out to be the same thing but with nobody responsible for it.',
        attrib: 'Testimony, Joint Committee of Inquiry, four years later',
      },
      {
        kind: 'aside',
        title: 'Why fear declares a race faster than ambition',
        body: [
          'An ambitious programme needs to be argued for: a budget, a champion, a coalition, a justification that survives the next election.',
          'A fearful one needs only the belief that the other side has already started. It requires no advocate, and it is nearly impossible to argue against, because arguing against it means asserting something about the adversary’s intentions that you cannot prove.',
          'This is the oldest failure mode in strategic competition, and knowing its name has never once prevented it.',
        ],
      },
      {
        kind: 'p',
        text: 'By the end of the month there are two national programmes, four emergency appropriations, and a phrase — *the race* — which everybody now uses as though it had always been there.',
      },
    ],
    factionBody: {
      us: [
        {
          kind: 'p',
          text: 'Washington’s problem is immediately and permanently structural: the capability is inside companies. You can subsidise Meridian, indemnify it, clear its security backlogs, threaten it with subpoenas and, in extremity, invoke authorities whose constitutionality nobody wants tested. What you cannot do is give it an order.',
        },
      ],
      cn: [
        {
          kind: 'p',
          text: 'Beijing’s problem is the mirror image. One decision moves the entire programme — the labs, the fabs, the grid connections, the graduates — which is precisely why the fight over that decision never ends. Everything is coordinated and nothing is settled.',
        },
      ],
      eu: [
        {
          kind: 'p',
          text: 'Brussels has no programme to mobilise. What Brussels has, suddenly and uncomfortably, is relevance: two frightened giants who both need something Europe controls, and who have both worked out that the other one needs it too.',
        },
      ],
    },
    choices: [
      {
        id: 'ch2_open_go',
        text: 'Go to work.',
        goto: { us: 'ch2_us_a', cn: 'ch2_cn_a', eu: 'ch2_eu_a' },
      },
    ],
  },

  // =========================================================================
  // UNITED STATES — labs that bargain
  // =========================================================================
  {
    id: 'ch2_us_a',
    chapter: 2,
    dateline: '24 April — Menlo Park, California',
    title: 'A company you cannot command',
    factions: ['us'],
    onEnter: { meetActors: ['labChief'] },
    body: [
      {
        kind: 'p',
        text: 'Iris Sandoval receives you in a conference room with no windows and a whiteboard that has been very recently cleaned. She has been before three committees and has never once said something she did not intend to say.',
      },
      { kind: 'say', actor: 'labChief', text: 'I want to be helpful. I want you to understand what "helpful" can mean, given that I have a board, forty thousand employees, and competitors who will read whatever we agree to in the Federal Register.' },
      {
        kind: 'p',
        text: 'The government wants three things: visibility into the training runs, a veto on deployment above a capability threshold, and the ability to say publicly that the leading lab is under supervision. Sandoval will trade for two of them, and the third is the one that matters.',
      },
      {
        kind: 'reveal',
        requires: { skills: { industry: 2 } },
        label: 'Industry',
        body: [
          {
            kind: 'p',
            text: 'She has more leverage than she is using, and she knows it. Meridian’s next cluster depends on grid interconnects that only the federal government can accelerate, and on a foundry allocation that only the federal government can jump. She has not mentioned either. She is waiting to see whether you know.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch2_us_a_deal',
        text: 'Trade: expedited interconnects and foundry priority, in exchange for real-time visibility into the runs.',
        requires: { skills: { industry: 2 } },
        effects: {
          skills: { industry: 1 },
          topics: { chips: 1 },
          relationships: { labChief: 2 },
          flags: ['usHasVisibility'],
          metrics: { compute: 0.1 },
        },
        goto: 'ch2_us_posture',
        wouldHaveOpened:
          'Genuine instrumentation inside the leading lab — which is the difference between knowing about Chapter 3 and being told about it.',
      },
      {
        id: 'ch2_us_a_pressure',
        text: 'Threaten: emergency authorities exist, and a test case would be inconvenient for her before it was inconvenient for you.',
        effects: {
          coercion: 1,
          relationships: { labChief: -3 },
          flags: ['usThreatenedLab'],
          metrics: { trustUs: 4 },
        },
        goto: 'ch2_us_posture',
      },
      {
        id: 'ch2_us_a_partner',
        text: 'Offer partnership: her people keep control, your people get a permanent desk and a hard deployment gate.',
        requires: { skills: { statecraft: 2 } },
        effects: {
          skills: { statecraft: 1 },
          relationships: { labChief: 3 },
          flags: ['usHasVisibility', 'usLabPartnership'],
          safetyDebt: -1,
        },
        goto: 'ch2_us_posture',
      },
      {
        id: 'ch2_us_a_safety',
        text: 'Ask a different question: what would her own safety team need in order to say "stop" and be listened to?',
        detail: 'Nobody in the building has asked her this. Her answer will matter enormously in six weeks.',
        requires: { skills: { alignment: 2 } },
        effects: {
          skills: { alignment: 1 },
          topics: { interp: 1 },
          relationships: { labChief: 1 },
          flags: ['usAskedAboutSafety'],
          safetyDebt: -2,
        },
        goto: 'ch2_us_posture',
        wouldHaveOpened:
          'A standing relationship with the lab’s safety function — the reason Tomas Neary comes to you first in Chapter 3.',
      },
    ],
  },
  {
    id: 'ch2_us_posture',
    chapter: 2,
    dateline: '6 May — Washington, DC',
    title: 'Posture',
    factions: ['us'],
    body: [
      {
        kind: 'p',
        text: 'The National Security Council meets to settle a question that will not be revisited: what is American policy, now that there is a race and everyone has agreed to call it that?',
      },
      {
        kind: 'p',
        text: 'Vance lets the room talk itself out — Treasury, Defense, Commerce, the Vice President’s staff — and then turns to you, which is not an accident and is not a courtesy.',
      },
      {
        kind: 'note',
        text: 'This is the axis every later chapter reads from. It is not a mood; it determines which options exist in Chapters 6, 7 and 9.',
      },
    ],
    choices: [
      {
        id: 'posture_race',
        text: 'Acceleration. Everything to the frontier, as fast as industry can absorb it. Safety is a speed limit we cannot afford.',
        detail: 'Maximum lead. Maximum Safety Debt. The strongest hand in Chapter 9 and the least control over what you are holding.',
        majorDecision: 'd2_posture',
        effects: {
          metrics: { lead: 2.5, compute: 0.25, speedup: 0.6, alarm: 6 },
          safetyDebt: 4,
          skills: { industry: 1, political: 1 },
          flags: ['postureRace'],
        },
        goto: 'ch3_open',
      },
      {
        id: 'posture_hedge',
        text: 'Two tracks. Build at full speed and build the capacity to stop — instrumentation, evaluations, a genuine off-switch.',
        detail: 'Costs you some lead. Keeps the widest range of endings reachable.',
        majorDecision: 'd2_posture',
        effects: {
          metrics: { lead: 1.0, compute: 0.15, speedup: 0.3, alarm: 3 },
          safetyDebt: 1,
          skills: { alignment: 1, statecraft: 1 },
          flags: ['postureHedge'],
        },
        goto: 'ch3_open',
      },
      {
        id: 'posture_restrain',
        text: 'Restraint. Spend American leverage on verification and a ceiling, while we still have leverage to spend.',
        detail: 'You will be called naive for six chapters. It is the shortest road to the best ending and the longest to any other.',
        majorDecision: 'd2_posture',
        effects: {
          metrics: { lead: -0.5, alarm: 8, trustCn: 10 },
          safetyDebt: -2,
          skills: { statecraft: 1, alignment: 1 },
          topics: { verification: 1 },
          flags: ['postureRestrain'],
        },
        goto: 'ch3_open',
      },
      {
        id: 'posture_restrain_hard',
        text: 'Restraint, and say so publicly — commit the United States to a ceiling before Beijing asks for one.',
        detail:
          'An extraordinary use of political capital: unilateral, verifiable, and impossible to walk back without visible humiliation.',
        requires: { skills: { political: 4 }, topics: { verification: 1 } },
        effects: {
          metrics: { lead: -1.5, alarm: 12, trustCn: 22, trustUs: -6 },
          safetyDebt: -4,
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          flags: ['postureRestrain', 'declaredCeiling'],
        },
        majorDecision: 'd2_posture',
        goto: 'ch3_open',
        wouldHaveOpened:
          'A unilateral public ceiling — the single strongest opening move towards a verification regime available anywhere in the game.',
      },
    ],
  },

  // =========================================================================
  // CHINA — a programme fused to the state
  // =========================================================================
  {
    id: 'ch2_cn_a',
    chapter: 2,
    dateline: '26 April — Beijing',
    title: 'One decision, four factions',
    factions: ['cn'],
    onEnter: { meetActors: ['programDirector'] },
    body: [
      {
        kind: 'p',
        text: 'Cheng Bao runs the largest coordinated compute effort outside California on roughly a third of the hardware, and has opinions about people who mistake that for a disadvantage.',
      },
      { kind: 'say', actor: 'programDirector', text: 'We are not behind because we are worse. We are behind because we are rationed. Give me their power budget and I will give you their results in five months.' },
      {
        kind: 'p',
        text: 'He is probably exaggerating. The problem is that the Commission cannot tell by how much, and there are four separate positions in the room about what to do with him.',
      },
      {
        kind: 'aside',
        title: 'The four positions',
        body: [
          'The **industrial** view: pour everything into domestic fabrication and accept a two-year gap in exchange for never being throttled again.',
          'The **military** view: the gap is the emergency. Requisition civilian compute now, and treat the frontier model as a strategic asset from this moment.',
          'The **economic** view: the programme is already distorting the grid and the capital markets, and the Party owns the consequences of both.',
          'The **scientific** view — Cheng’s — that all of this is noise, and that the only variable that has ever mattered is how much compute is pointed at the right experiment.',
        ],
      },
      {
        kind: 'reveal',
        requires: { skills: { political: 3 } },
        label: 'Political Capital',
        body: [
          {
            kind: 'p',
            text: 'Whichever position you back becomes the position Shen defends upstairs, and whichever one you do not becomes a faction with a grievance and a long memory. There is no neutral answer available; declining to choose simply lets the military view win by default, because it is the only one with a deadline.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch2_cn_a_industrial',
        text: 'Back the industrial view. Sovereign fabrication, whatever it costs and however long it takes.',
        requires: { skills: { industry: 2 } },
        effects: {
          skills: { industry: 1 },
          topics: { chips: 1 },
          metrics: { compute: 0.1 },
          flags: ['cnIndustrialFirst'],
        },
        goto: 'ch2_cn_posture',
      },
      {
        id: 'ch2_cn_a_military',
        text: 'Back the military view. Requisition civilian compute and classify the programme.',
        effects: {
          metrics: { compute: 0.2, lead: 0.6, alarm: 4 },
          safetyDebt: 3,
          coercion: 1,
          topics: { plaDoctrine: 1 },
          flags: ['cnMilitarised'],
        },
        goto: 'ch2_cn_posture',
      },
      {
        id: 'ch2_cn_a_scientific',
        text: 'Back Cheng. Protect the research programme from everyone, including the Commission.',
        requires: { skills: { ml: 2 } },
        effects: {
          skills: { ml: 1 },
          topics: { takeoff: 1 },
          relationships: { programDirector: 3 },
          metrics: { speedup: 0.2 },
          flags: ['cnScienceProtected'],
        },
        goto: 'ch2_cn_posture',
      },
      {
        id: 'ch2_cn_a_broker',
        text: 'Broker all four into a single package nobody loves and everybody signs.',
        detail:
          'The hardest manoeuvre in this building: it requires giving each faction a win they can name and a loss they can survive.',
        requires: { skills: { political: 3, statecraft: 2 } },
        effects: {
          skills: { political: 1, statecraft: 1 },
          relationships: { principalCn: 3, programDirector: 1 },
          metrics: { compute: 0.15 },
          safetyDebt: -1,
          flags: ['cnUnifiedProgramme'],
        },
        goto: 'ch2_cn_posture',
        wouldHaveOpened:
          'A programme with no internal enemies — which is what stops a single official from being able to seize it in Chapter 8.',
      },
    ],
  },
  {
    id: 'ch2_cn_posture',
    chapter: 2,
    dateline: '8 May — Beijing',
    title: 'Posture',
    factions: ['cn'],
    body: [
      {
        kind: 'p',
        text: 'The Commission convenes to settle the line. Shen Weiguo says almost nothing for an hour, which everyone present understands to mean that the decision has not yet been made and that it will be made in this room.',
      },
      {
        kind: 'p',
        text: 'Then he asks you directly, in front of everyone, which is both an honour and a way of making the answer yours.',
      },
      {
        kind: 'note',
        text: 'This is the axis every later chapter reads from. It determines which options exist in Chapters 6, 7 and 9.',
      },
    ],
    choices: [
      {
        id: 'posture_race',
        text: 'Close the gap by any means. Compute, requisition, collection, whatever the timeline demands.',
        detail: 'Maximum speed from behind. Maximum Safety Debt.',
        majorDecision: 'd2_posture',
        effects: {
          metrics: { lead: -1.2, compute: 0.3, speedup: 0.6, alarm: 6 },
          safetyDebt: 4,
          skills: { industry: 1, intelligence: 1 },
          flags: ['postureRace'],
        },
        goto: 'ch3_open',
      },
      {
        id: 'posture_hedge',
        text: 'Two tracks. Build hard, and build the ability to verify and to stop.',
        detail: 'Costs you ground you can ill afford. Keeps every ending reachable.',
        majorDecision: 'd2_posture',
        effects: {
          metrics: { lead: -1.8, compute: 0.15, speedup: 0.3, alarm: 3 },
          safetyDebt: 1,
          skills: { alignment: 1, statecraft: 1 },
          flags: ['postureHedge'],
        },
        goto: 'ch3_open',
      },
      {
        id: 'posture_restrain',
        text: 'Restraint. Trade the gap for a ceiling — from behind, a ceiling is the best deal available.',
        detail: 'Strategically coherent and politically brutal to argue for here.',
        majorDecision: 'd2_posture',
        effects: {
          metrics: { lead: -2.5, alarm: 8, trustUs: 12 },
          safetyDebt: -2,
          skills: { statecraft: 1, alignment: 1 },
          topics: { verification: 1 },
          flags: ['postureRestrain'],
        },
        goto: 'ch3_open',
      },
      {
        id: 'posture_restrain_hard',
        text: 'Restraint, and put a concrete verification offer on the table before Washington does.',
        detail:
          'A first mover’s offer: inspection rights, escrowed weights, hardware attestation — from the party currently behind, which is what makes it credible.',
        requires: { skills: { political: 4 }, topics: { verification: 1 } },
        effects: {
          metrics: { lead: -2.8, alarm: 10, trustUs: 24, trustCn: -4 },
          safetyDebt: -4,
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          flags: ['postureRestrain', 'declaredCeiling'],
        },
        majorDecision: 'd2_posture',
        goto: 'ch3_open',
        wouldHaveOpened:
          'A concrete verification offer from behind — the most credible restraint move in the game, and the fastest route to the best ending.',
      },
    ],
  },

  // =========================================================================
  // EUROPE — no lab, one machine
  // =========================================================================
  {
    id: 'ch2_eu_a',
    chapter: 2,
    dateline: '29 April — Veldhoven, the Netherlands',
    title: 'The man who sells the machine',
    factions: ['eu'],
    onEnter: { meetActors: ['industrialist'] },
    body: [
      {
        kind: 'p',
        text: 'Nordwijk Photonics ships fewer than forty systems a year. Each one weighs as much as a fighter aircraft, costs more, and takes eighteen months to install. Nobody else on earth makes one, and — this is the part that matters — nobody else on earth is within a decade of making one.',
      },
      {
        kind: 'p',
        text: 'Willem de Bruyn has spent three years explaining to politicians that he is a supplier and not an instrument of statecraft. He has recently stopped bothering.',
      },
      { kind: 'say', actor: 'industrialist', text: 'Both of them have now asked me the same question this month, in almost the same words: what happens to my order book if the other one is not in it. I have no good answer. I would like Europe to have one.' },
      {
        kind: 'aside',
        title: 'The chokepoint, honestly assessed',
        body: [
          'It is real. It is genuinely irreplaceable on the timescale that matters, which is the next eighteen months rather than the next fifteen years.',
          'It is also single-use. The moment Europe visibly withholds a machine for political reasons, both giants begin a crash programme to route around Nordwijk — and both of them can afford to.',
          'So the leverage is enormous and it is spendable exactly once. Everything depends on what you buy with it, and on how long you can credibly avoid spending it.',
        ],
      },
      {
        kind: 'reveal',
        requires: { topics: { chips: 1 } },
        label: 'Chip Supply Chain',
        body: [
          {
            kind: 'p',
            text: 'There is a subtlety nobody in the Commission has grasped: the leverage is not the machine, it is the service contract. A system without Nordwijk’s calibration engineers degrades to unusable within about nine months. That is a lever you can apply gradually and reversibly — which makes it worth vastly more than the one you can only pull once.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch2_eu_a_licences',
        text: 'Bring export licensing fully under Union competence, and tell de Bruyn he now has an answer.',
        requires: { skills: { political: 2 } },
        effects: {
          skills: { political: 1 },
          topics: { lawfare: 1 },
          relationships: { industrialist: 2 },
          flags: ['euKeptLicences'],
        },
        goto: 'ch2_eu_posture',
      },
      {
        id: 'ch2_eu_a_service',
        text: 'Quietly identify the service contracts as the real lever, and say nothing about it to anyone.',
        detail: 'A graduated, reversible instrument — worth more than the chokepoint everybody is watching.',
        requires: { topics: { chips: 1 }, skills: { industry: 2 } },
        effects: {
          skills: { industry: 1, intelligence: 1 },
          topics: { chips: 1 },
          flags: ['euServiceLever'],
        },
        goto: 'ch2_eu_posture',
        wouldHaveOpened:
          'A lever Europe can apply by degrees instead of once — the difference between a threat and a negotiating position in Chapters 4 and 7.',
      },
      {
        id: 'ch2_eu_a_neutral',
        text: 'Guarantee de Bruyn that Europe will keep supplying both, and make that guarantee public.',
        effects: {
          metrics: { trustUs: 6, trustCn: 10 },
          relationships: { industrialist: 1 },
          flags: ['euNeutralSupply'],
        },
        goto: 'ch2_eu_posture',
      },
      {
        id: 'ch2_eu_a_align',
        text: 'Tell him the licences will follow allied policy. Washington will be pleased.',
        effects: {
          metrics: { trustUs: 12, trustCn: -16 },
          relationships: { industrialist: -2 },
          coercion: 1,
          flags: ['euAlignedLicences'],
        },
        goto: 'ch2_eu_posture',
      },
    ],
  },
  {
    id: 'ch2_eu_posture',
    chapter: 2,
    dateline: '9 May — Brussels',
    title: 'Posture',
    factions: ['eu'],
    body: [
      {
        kind: 'p',
        text: 'The European Council meets in a format that does not produce conclusions, which is how Europe makes decisions it does not want to be held to. Twenty-seven positions, four of which matter, none of which agree.',
      },
      {
        kind: 'p',
        text: 'Sørensen needs a line she can carry into the room and defend for the rest of the year.',
      },
      {
        kind: 'note',
        text: 'Europe cannot race. What it can choose is what it is *for* — and that choice is read by both capitals immediately.',
      },
    ],
    choices: [
      {
        id: 'posture_race',
        text: 'A European programme. Sovereign compute, sovereign models, whatever the cost and however late.',
        detail: 'Popular, expensive, and probably too late. It buys you a seat by being a participant rather than a broker.',
        majorDecision: 'd2_posture',
        effects: {
          metrics: { compute: 0.05, alarm: 5, trustUs: -4, trustCn: -4 },
          safetyDebt: 2,
          skills: { industry: 1, political: 1 },
          flags: ['postureRace', 'euOwnProgramme'],
        },
        goto: 'ch3_open',
      },
      {
        id: 'posture_hedge',
        text: 'Two tracks. Build what capacity we can, and build the institutions to hold whoever wins to account.',
        detail: 'The unglamorous European answer. It keeps everything open.',
        majorDecision: 'd2_posture',
        effects: {
          metrics: { alarm: 3, trustUs: 3, trustCn: 3 },
          safetyDebt: 0,
          skills: { statecraft: 1, alignment: 1 },
          flags: ['postureHedge'],
        },
        goto: 'ch3_open',
      },
      {
        id: 'posture_restrain',
        text: 'Restraint, loudly. Use the market, the law and the chokepoint to slow all of this down.',
        detail: 'Makes Europe the obstacle. Obstacles get routed around — but they also get negotiated with.',
        majorDecision: 'd2_posture',
        effects: {
          metrics: { alarm: 10, trustUs: -8, trustCn: 4 },
          safetyDebt: -2,
          skills: { political: 1 },
          topics: { lawfare: 1, verification: 1 },
          flags: ['postureRestrain'],
        },
        goto: 'ch3_open',
      },
      {
        id: 'posture_restrain_hard',
        text: 'Offer Europe as the verification host — publicly, concretely, with inspection powers and a standing office.',
        detail:
          'Asks both giants to accept European jurisdiction over the most sensitive thing either possesses. Absurd today. Decisive in Chapter 7.',
        requires: { skills: { statecraft: 4 }, topics: { verification: 1 } },
        effects: {
          metrics: { alarm: 6, trustUs: 8, trustCn: 12 },
          safetyDebt: -3,
          skills: { statecraft: 1, political: 1 },
          topics: { verification: 1 },
          flags: ['postureRestrain', 'euOfferedVerification'],
        },
        majorDecision: 'd2_posture',
        goto: 'ch3_open',
        wouldHaveOpened:
          'Standing up a European verification office two chapters before anyone needs one — the foundation of both the Guarantor variant and the best ending.',
      },
    ],
  },
]
