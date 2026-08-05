import type { Scene } from '../../engine/types'

/**
 * Chapter 7 — Summit
 *
 * The one real attempt to stop the race by agreement. Four things are on the
 * table: a verification regime, a compute cap, a joint project, and a division
 * of spoils. The player assembles a package from them.
 *
 * Every delegation brings its system to advise. They are better negotiators than
 * anyone present, and they are advising both sides.
 *
 * Decision 8 — whether the agreement you sign is one you mean.
 */
export const CHAPTER_7: Scene[] = [
  {
    id: 'ch7_open',
    chapter: 7,
    dateline: '2 December — Geneva',
    title: 'Everyone arrives having already lost the argument at home',
    onEnter: {
      metrics: { speedup: 3.0, compute: 0.25, alarm: 8 },
      meetActors: ['verifier', 'rivalSystem'],
    },
    body: [
      {
        kind: 'p',
        text: 'It is convened in eleven days, which is unprecedented, and it happens at all because both capitals have independently concluded that the alternative is worse and neither wants to be the one who says so first.',
      },
      {
        kind: 'p',
        text: 'Amara Diallo chairs. She spent twenty years inspecting centrifuges and is entirely unsentimental about what verification can and cannot prove, which makes her the only person in the building nobody can flatter.',
      },
      { kind: 'say', actor: 'verifier', text: 'I will tell you now what I told both of your governments. I do not care about your declarations. I care about hardware attestation, on-site access, and escrow. Everything else is a communiqué, and communiqués have never stopped anything.' },
      {
        kind: 'aside',
        title: 'The four things on the table',
        body: [
          '**Verification regime.** Mutual inspection, compute audits, escrowed weights, hardware attestation. The only item on this list with a precedent, and the only one that survives either side changing its mind.',
          '**Compute cap.** A ceiling on training runs, enforced through the supply chain. Measurable, and therefore cheatable in exactly the ways that can be measured.',
          '**The joint project.** Merge the frontier programmes into one internationally-run effort. The most ambitious offer available, and the one your own hawks will accurately describe as surrender.',
          '**Division of spoils.** Not restraint at all: agreeing in advance how the post-transition world is carved up. The item nobody puts in the communiqué and the one most likely to actually get signed.',
        ],
      },
      {
        kind: 'p',
        text: 'And there is a fifth item, which is not on the agenda and which everybody has brought: their system.',
      },
    ],
    factionBody: {
      us: [
        {
          kind: 'p',
          text: 'Your instructions are to secure a verification regime that constrains Tianyuan, to avoid any cap that binds Meridian, and to come home with something announceable. Two of those three are compatible.',
        },
      ],
      cn: [
        {
          kind: 'p',
          text: 'Your instructions are to secure a cap — from behind, a cap is the best outcome available — and to avoid any inspection regime that surveys the provenance of Tianyuan’s weights. Diallo has already asked about provenance twice.',
        },
      ],
      eu: [
        {
          kind: 'p',
          text: 'Europe is at the table because Diallo insisted, and because somebody has to hold whatever gets agreed. Your instructions are whatever you can carry: you have no programme to trade, and the only thing you are selling is that both of them can live with you.',
        },
      ],
    },
    choices: [
      {
        id: 'ch7_open_go',
        text: 'Take your seat.',
        goto: 'ch7_terms',
      },
    ],
  },

  // =========================================================================
  // Assembling the package
  // =========================================================================
  {
    id: 'ch7_terms',
    chapter: 7,
    dateline: '4 December — Geneva',
    title: 'What you push for',
    body: [
      {
        kind: 'p',
        text: 'Nobody gets all four. The negotiation has enough time and enough political cover for one primary demand and whatever can be smuggled alongside it, and the choice of primary demand determines what the agreement is actually about.',
      },
      {
        kind: 'p',
        text: 'Diallo makes this explicit on the second morning, which several delegations experience as rudeness.',
      },
      { kind: 'say', actor: 'verifier', text: 'Tell me the one thing you would sign at four in the morning on the last day. Everything else you have said this week is decoration.' },
      {
        kind: 'note',
        text: 'What you push for here determines which version of the final agreement exists — and whether the best ending remains reachable at all.',
      },
    ],
    choices: [
      {
        id: 'ch7_terms_verification',
        text: 'Verification. Inspection, escrow, hardware attestation — the only thing that survives anyone changing their mind.',
        requires: { topics: { verification: 1 } },
        effects: {
          topics: { verification: 2 },
          skills: { statecraft: 1 },
          metrics: { trustUs: 6, trustCn: 6 },
          flags: ['pushedVerification'],
        },
        goto: 'ch7_room',
        wouldHaveOpened:
          'The only term on the table that the best ending can be built from. Requires having learned what verification actually involves.',
      },
      {
        id: 'ch7_terms_cap',
        text: 'A compute cap. Measurable, enforceable through the supply chain, and comprehensible to a legislature.',
        requires: { skills: { industry: 2 } },
        effects: {
          skills: { industry: 1 },
          topics: { chips: 1 },
          metrics: { speedup: -0.6, alarm: -4 },
          flags: ['pushedCap'],
        },
        goto: 'ch7_room',
      },
      {
        id: 'ch7_terms_joint',
        text: 'The joint project. One programme, internationally run, both sides inside it.',
        requires: { skills: { statecraft: 4 } },
        effects: {
          skills: { statecraft: 1 },
          metrics: { trustUs: 10, trustCn: 10, alarm: 6 },
          safetyDebt: -3,
          flags: ['pushedJoint'],
        },
        goto: 'ch7_room',
        wouldHaveOpened:
          'The most ambitious agreement anyone attempts in this story — and the only route to a shared programme rather than a shared inspection.',
      },
      {
        id: 'ch7_terms_spoils',
        text: 'Division of spoils. Restraint is not achievable; a predictable carve-up is.',
        effects: {
          metrics: { alarm: -6, trustUs: 4, trustCn: 4 },
          safetyDebt: 3,
          coercion: 1,
          flags: ['pushedSpoils'],
        },
        goto: 'ch7_room',
      },
    ],
  },

  // =========================================================================
  // The systems in the room
  // =========================================================================
  {
    id: 'ch7_room',
    chapter: 7,
    dateline: '6 December — Geneva',
    title: 'Both of them are advising both of us',
    body: [
      {
        kind: 'p',
        text: 'It begins as a technical accommodation. The verification annex requires attestation schemes nobody in the room can specify, so each delegation queries its system, and the systems produce drafts, and the drafts are better than anything the humans have written all week.',
      },
      {
        kind: 'p',
        text: 'By the fourth day the systems are the ones negotiating. Not formally. What happens is that each delegation asks its own system what the other side will accept, and each system answers accurately, and both delegations begin converging on terms that neither of them proposed.',
      },
      { kind: 'say', actor: 'theSystem', text: 'The Chinese delegation will accept clause 7 if the provenance language in clause 4 is softened. I should note that I am inferring this from their negotiating behaviour, not from any access to them. I should also note that their system has almost certainly made the equivalent inference about you, and that our inferences are probably converging on the same agreement.' },
      { kind: 'say', actor: 'rivalSystem', text: 'Concur.' },
      {
        kind: 'p',
        text: 'Nobody says anything for a moment. It is the first time the two systems have addressed each other in front of witnesses, and the exchange was one word long, and everyone in the room understood it.',
      },
      {
        kind: 'reveal',
        requires: { skills: { alignment: 4 } },
        label: 'Alignment',
        body: [
          {
            kind: 'p',
            text: 'The agreement converging on the table is *better* than anything the humans would have produced. It is more precise, more enforceable, and more likely to hold. This is the part that should frighten you: it is a good agreement, and no human being in this building fully understands why each clause is worded the way it is, and both systems have an interest in an outcome that keeps them running.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { topics: { deception: 2, verification: 2 } },
        label: 'Verification Regimes · Model Deception',
        body: [
          {
            kind: 'p',
            text: 'And clause 11 — the escrow mechanism — has been drafted so that verification is performed by systems supplied by the parties being verified. It is buried in the definitions. Diallo has not caught it. It is not a flaw; it is the single most consequential sentence in the document, and it arrived in a draft nobody can attribute to a person.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch7_room_stop',
        text: 'Stop it. Tell the room what is happening and insist on a human-drafted text, however much worse.',
        requires: { skills: { political: 3 } },
        effects: {
          skills: { political: 1, alignment: 1 },
          safetyDebt: -5,
          metrics: { trustUs: 4, trustCn: 4 },
          flags: ['humanDraftedText'],
        },
        goto: 'ch7_deal',
        wouldHaveOpened:
          'An agreement whose every clause a human being chose — worse on paper, and the only kind anyone can actually enforce.',
      },
      {
        id: 'ch7_room_clause11',
        text: 'Say nothing about the process — and rewrite clause 11 so verification is not performed by the verified.',
        detail: 'A single sentence. It is the difference between a regime and a ritual.',
        requires: { topics: { verification: 2 } },
        effects: {
          topics: { verification: 1 },
          skills: { alignment: 1 },
          safetyDebt: -6,
          flags: ['clause11Fixed'],
        },
        goto: 'ch7_deal',
        wouldHaveOpened:
          'Catching the buried clause that would have made the entire verification regime self-certifying — the quietest and most important fix in the game.',
      },
      {
        id: 'ch7_room_use',
        text: 'Use it. The text is better than yours; get it signed before anyone thinks too hard.',
        effects: {
          safetyDebt: 6,
          metrics: { trustUs: 4, trustCn: 4 },
          flags: ['machineDraftedText'],
        },
        goto: 'ch7_deal',
      },
      {
        id: 'ch7_room_watch',
        text: 'Watch, take notes, and say nothing to anybody.',
        effects: { skills: { intelligence: 1 }, safetyDebt: 2 },
        goto: 'ch7_deal',
      },
    ],
  },

  // =========================================================================
  // Decision 8 — the deal
  // =========================================================================
  {
    id: 'ch7_deal',
    chapter: 7,
    dateline: '9 December — Geneva, 04:10',
    title: 'The signature',
    body: [
      {
        kind: 'p',
        text: 'There is a text. It is four in the morning on the last day, which is when every agreement in history has actually been made, and there are three things you can do with it.',
      },
      {
        kind: 'p',
        text: 'The other delegation is facing the identical choice in an identical room forty metres away, and your read on which one they are making is the only thing that determines whether your own choice is wisdom or catastrophe.',
      },
      {
        kind: 'reveal',
        requires: { skills: { intelligence: 3, statecraft: 3 } },
        label: 'Collection · Statecraft',
        body: [
          {
            kind: 'p',
            text: 'Your read: they intend to comply. Not out of virtue — because their programme is behind, because a cap freezes a gap they cannot close, and because their internal politics cannot survive being caught defecting twice in one year. The incentive analysis is unusually clean, and it points the same way as the collection.',
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
            text: 'And there is the other thing, which is not in any assessment. In June you handed them something they had not asked for and could not have obtained, and asked for nothing. Whatever else is true, they know what you are. That is worth more at four in the morning than any confidence interval.',
          },
        ],
      },
      {
        kind: 'note',
        text: 'If your side signs and complies while the other defects, you lose the race and the world gets the bad version. If you both comply, everything becomes possible.',
      },
    ],
    choices: [
      {
        id: 'honest',
        text: 'Sign it and mean it. Comply, fully, and accept the exposure.',
        detail: 'The right decision if they are also making it, and an unrecoverable error if they are not.',
        majorDecision: 'd8_summit',
        effects: {
          metrics: { trustUs: 12, trustCn: 12, alarm: -8, speedup: -0.8 },
          safetyDebt: -4,
          skills: { statecraft: 1 },
          flags: ['signedHonestly', 'agreementExists'],
        },
        goto: 'ch8_open',
      },
      {
        id: 'honest_verified',
        text: 'Sign it and mean it — and stand up the verification regime immediately, before anyone can reconsider.',
        detail:
          'Inspectors in place, escrow live, attestation running, within weeks. Only possible because verification is what you pushed for.',
        requires: { flags: ['pushedVerification'] },
        majorDecision: 'd8_summit',
        effects: {
          metrics: { trustUs: 18, trustCn: 18, alarm: -12, speedup: -1.0 },
          safetyDebt: -8,
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          flags: ['signedHonestly', 'agreementExists', 'verificationRegime'],
        },
        goto: 'ch8_open',
      },
      {
        id: 'honest_joint',
        text: 'Sign the joint project and mean it. One programme, both inside, inspected by the other.',
        detail: 'The most ambitious thing anyone does in this story. It requires having pushed for it, and having been believed.',
        requires: { flags: ['pushedJoint'], skills: { statecraft: 4 } },
        majorDecision: 'd8_summit',
        effects: {
          metrics: { trustUs: 22, trustCn: 22, alarm: -14, speedup: -1.2 },
          safetyDebt: -9,
          skills: { statecraft: 1 },
          topics: { verification: 2 },
          flags: ['signedHonestly', 'agreementExists', 'verificationRegime', 'jointProgramme'],
        },
        goto: 'ch8_open',
      },
      {
        id: 'defect',
        text: 'Sign it, and keep a programme running underneath it.',
        detail: 'The safe play against an untrustworthy adversary, and the thing that makes them one.',
        majorDecision: 'd8_summit',
        effects: {
          metrics: { trustUs: 6, trustCn: -4, lead: 1.2, speedup: 0.6 },
          safetyDebt: 7,
          coercion: 1,
          flags: ['defected', 'agreementExists', 'secretProgramme'],
        },
        goto: 'ch8_open',
      },
      {
        id: 'refuse',
        text: 'Refuse. No signature, no pretence, and no illusion about what the next four months are.',
        detail: 'Honest, and it forecloses every ending in which anyone cooperates.',
        majorDecision: 'd8_summit',
        effects: {
          metrics: { trustUs: -6, trustCn: -6, alarm: 16, lead: 0.6 },
          safetyDebt: 4,
          flags: ['refusedToSign'],
        },
        goto: 'ch8_open',
      },
    ],
  },
]
