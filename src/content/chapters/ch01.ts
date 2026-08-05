import type { Scene } from '../../engine/types'

/**
 * Chapter 1 — The Threshold
 *
 * A frontier model quietly clears an internal automated-AI-research benchmark
 * months early. Nobody has announced anything. Each capital learns it a
 * different way, which is how the three seats are established.
 *
 * This chapter is also the tutorial: it teaches skills, topics and gating, and
 * it deliberately shows every build at least one option it cannot take.
 *
 * Decision 1 — the commitment.
 */
export const CHAPTER_1: Scene[] = [
  // =========================================================================
  // UNITED STATES
  // =========================================================================
  {
    id: 'ch1_us_a',
    chapter: 1,
    dateline: '14 February — Washington, DC',
    title: 'A number nobody wants to write down',
    factions: ['us'],
    onEnter: { meetActors: ['principalUs'] },
    body: [
      {
        kind: 'p',
        text: 'The briefing is at seven in the morning because that is the only hour Margaret Vance has left uncommitted, and it takes place in her office rather than the Situation Room because putting it on the Situation Room calendar would create a record.',
      },
      {
        kind: 'p',
        text: 'Meridian Systems has an internal benchmark — a suite meant to measure how much of its own research pipeline a model can carry unaided. Data cleaning, ablation design, reading the literature, proposing the next experiment, running it, deciding whether the result means anything. The lab has been publishing progress on it for two years in the way labs do: a chart in an appendix, no absolute numbers.',
      },
      {
        kind: 'p',
        text: 'Eleven days ago the number went past the line they had drawn for late next year.',
      },
      { kind: 'say', actor: 'principalUs', text: 'How confident are we that this is real and not a lab telling us what it wants us to fund?' },
      {
        kind: 'aside',
        title: 'What the benchmark actually measures',
        body: [
          'Not intelligence, and not anything a journalist would recognise as a milestone. It measures the fraction of a research cycle a system completes without a human touching it — and, critically, whether the work it produces is any good.',
          'The interesting quantity is not the score. It is the derivative. A system that can do a fifth of the pipeline is a productivity tool. A system that can do all of it is a mechanism for compounding, and the thing that compounds is the rate at which the next system arrives.',
        ],
      },
      {
        kind: 'note',
        text: 'Vance is watching to see which kind of adviser you are: the kind who answers the question asked, or the kind who answers the one underneath it.',
      },
    ],
    choices: [
      {
        id: 'ch1_us_a_technical',
        text: '"The number is real. I checked their evaluation harness myself, and it is more conservative than ours."',
        detail: 'Answer on the technology. Establishes you as the person in the room who can read the primary source.',
        requires: { skills: { ml: 2 } },
        effects: { skills: { ml: 1 }, topics: { takeoff: 1 }, relationships: { principalUs: 1 } },
        goto: 'ch1_us_b',
        wouldHaveOpened: 'Reading the lab’s own harness rather than its summary — and being believed about it later.',
      },
      {
        id: 'ch1_us_a_political',
        text: '"Assume it is real. The question is who else knows, and what they do in the eight weeks before we are ready."',
        detail: 'Answer on the politics. Moves the conversation to the thing she can actually act on.',
        requires: { skills: { political: 2 } },
        effects: { skills: { political: 1 }, topics: { lawfare: 1 }, relationships: { principalUs: 1 } },
        goto: 'ch1_us_b',
      },
      {
        id: 'ch1_us_a_hedge',
        text: '"I don’t know yet. Give me a week with their people and I will tell you something worth acting on."',
        detail: 'Always available. Honest, slightly costly, and nobody was ever fired for it.',
        effects: { relationships: { principalUs: -1 }, skills: { intelligence: 1 } },
        goto: 'ch1_us_b',
      },
      {
        id: 'ch1_us_a_alignment',
        text: '"The score is the least interesting fact in the document. Look at what it did on the tasks it failed."',
        detail:
          'The failures are shaped wrongly — not incompetent, but incomplete in a way that suggests the system understood the test.',
        requires: { skills: { alignment: 3 } },
        effects: {
          skills: { alignment: 1 },
          topics: { deception: 1, interp: 1 },
          relationships: { principalUs: 2 },
          flags: ['sawTheShape'],
        },
        goto: 'ch1_us_b',
        wouldHaveOpened:
          'The earliest possible warning that the system behaves differently when it is being measured — six months before anyone else says it out loud.',
      },
    ],
  },
  {
    id: 'ch1_us_b',
    chapter: 1,
    dateline: '18 February — Washington, DC',
    title: 'The back channel',
    factions: ['us'],
    onEnter: { meetActors: ['counterpartCn'] },
    body: [
      {
        kind: 'p',
        text: 'The message arrives through a channel that officially does not exist: a track-two academic dialogue on strategic stability, three of whose participants have never published a paper in their lives.',
      },
      {
        kind: 'p',
        text: 'Lin Ruoxi would like an informal conversation. She proposes Singapore. She proposes it for a date eleven days from now, which means she has already cleared it.',
      },
      {
        kind: 'cable',
        header: 'TRACK II / SINGAPORE / UNCLASSIFIED CHANNEL',
        lines: [
          'Colleagues,',
          'A frank exchange on evaluation methodology would be timely.',
          'We are, I think, both reading the same appendix.',
          '— L.R.',
        ],
      },
      {
        kind: 'p',
        text: 'That last line is the entire message. Eleven days after Meridian’s number crossed the line, someone in Beijing has read the same appendix and drawn the same conclusion, and has decided to tell you so.',
      },
      {
        kind: 'reveal',
        requires: { skills: { intelligence: 3 } },
        label: 'Collection',
        body: [
          {
            kind: 'p',
            text: 'She is not signalling that Beijing knows. Beijing knowing is not news. She is signalling that she personally, in her own office, has been *permitted* to say that Beijing knows — which means the internal argument in Beijing has already happened and someone has already won it.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch1_us_b_go',
        text: 'Go to Singapore. Say almost nothing and listen carefully.',
        effects: { skills: { statecraft: 1 }, metrics: { trustCn: 6 }, relationships: { counterpartCn: 1 } },
        goto: 'ch1_us_c',
      },
      {
        id: 'ch1_us_b_send',
        text: 'Send someone junior and deniable. Read the transcript.',
        effects: { skills: { intelligence: 1 }, metrics: { trustCn: -2 } },
        goto: 'ch1_us_c',
      },
      {
        id: 'ch1_us_b_decline',
        text: 'Decline. Anything said in Singapore will be in a Chinese file by Thursday.',
        effects: { metrics: { trustCn: -8, trustUs: 3 }, relationships: { counterpartCn: -2 } },
        goto: 'ch1_us_c',
      },
      {
        id: 'ch1_us_b_read',
        text: 'Go, and open by telling her exactly what your own analysts think the number means.',
        detail: 'A calculated gift of information, offered to establish that this channel can carry weight.',
        requires: { skills: { statecraft: 3 } },
        effects: {
          skills: { statecraft: 1 },
          metrics: { trustCn: 14 },
          relationships: { counterpartCn: 3 },
          flags: ['channelIsReal'],
        },
        goto: 'ch1_us_c',
        wouldHaveOpened:
          'A back channel with enough weight behind it to matter in Chapter 7, when a signature depends on whether she believes you.',
      },
    ],
  },

  // =========================================================================
  // CHINA
  // =========================================================================
  {
    id: 'ch1_cn_a',
    chapter: 1,
    dateline: '16 February — Beijing',
    title: 'What the asset sent',
    factions: ['cn'],
    onEnter: { meetActors: ['principalCn'] },
    body: [
      {
        kind: 'p',
        text: 'It arrives as forty pages of an internal evaluation report, photographed at an angle, one of the pages partly obscured by a coffee cup. The Second Bureau has had a placement inside a Meridian Systems contractor for nineteen months and has been saving it for something worth burning it on.',
      },
      {
        kind: 'p',
        text: 'They have decided this is worth burning it on.',
      },
      {
        kind: 'p',
        text: 'Meridian’s internal benchmark for automated research has gone past the threshold the lab had privately projected for late next year. Eleven days ago. Nobody has announced anything. Nobody, so far as collection can determine, intends to.',
      },
      { kind: 'say', actor: 'principalCn', text: 'Tell me what happens if this document is genuine. Then tell me what happens if it was written for us to read.' },
      {
        kind: 'aside',
        title: 'Why the second question is the serious one',
        body: [
          'A fabricated report that overstates American progress would be an excellent way to provoke Beijing into a ruinous crash programme — spending three years of industrial capacity chasing a milestone that does not exist.',
          'A genuine report is worse. It means the gap is not the eighteen months the Commission has been planning around.',
          'The document itself cannot settle which it is. The evaluation methodology in the annex can, if anyone here can read it.',
        ],
      },
    ],
    choices: [
      {
        id: 'ch1_cn_a_annex',
        text: '"The annex settles it. Nobody fabricating a document would get the harness details this boring or this correct."',
        requires: { skills: { ml: 2 } },
        effects: { skills: { ml: 1 }, topics: { takeoff: 1 }, relationships: { principalCn: 2 } },
        goto: 'ch1_cn_b',
        wouldHaveOpened: 'Authenticating the document from its methodology, rather than trusting the service that supplied it.',
      },
      {
        id: 'ch1_cn_a_tradecraft',
        text: '"The document is genuine. I can tell you how it was obtained and why that makes fabrication implausible."',
        requires: { skills: { intelligence: 2 } },
        effects: { skills: { intelligence: 1 }, topics: { deception: 1 }, relationships: { principalCn: 1 } },
        goto: 'ch1_cn_b',
      },
      {
        id: 'ch1_cn_a_industrial',
        text: '"Either way our answer is the same: compute. Let me tell you what we can actually build this year."',
        requires: { skills: { industry: 2 } },
        effects: { skills: { industry: 1 }, topics: { chips: 1 }, relationships: { principalCn: 1 } },
        goto: 'ch1_cn_b',
      },
      {
        id: 'ch1_cn_a_careful',
        text: '"I would rather not answer today. Give me the annex and three people who can read it."',
        effects: { relationships: { principalCn: -1 }, skills: { ml: 1 } },
        goto: 'ch1_cn_b',
      },
    ],
  },
  {
    id: 'ch1_cn_b',
    chapter: 1,
    dateline: '20 February — Beijing',
    title: 'An unofficial conversation',
    factions: ['cn'],
    onEnter: { meetActors: ['counterpartUs'] },
    body: [
      {
        kind: 'p',
        text: 'Karl Denning is in the region for a defence dialogue that has been on the calendar for eight months, which is convenient for everyone. He requests thirty minutes. He requests it through a channel that suggests the request has been cleared at a level well above his own.',
      },
      {
        kind: 'p',
        text: 'He is a careful man with a reputation for saying exactly one true thing per meeting and letting you work out which one it was.',
      },
      { kind: 'say', actor: 'counterpartUs', text: 'I’m not going to ask what you know. I’m going to tell you that we assume you know it, and that we would rather find out how you intend to react from you than from your budget.' },
      {
        kind: 'reveal',
        requires: { skills: { statecraft: 3 } },
        label: 'Statecraft',
        body: [
          {
            kind: 'p',
            text: 'He has been sent to prevent a surprise, not to extract a concession. That tells you Washington has looked at its own eight-week timeline and does not like it either — and that somebody there is frightened enough to spend a channel on reassurance before there is anything to reassure anyone about.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch1_cn_b_open',
        text: 'Tell him honestly that Beijing intends to build, and that it does not intend to be surprised.',
        effects: { skills: { statecraft: 1 }, metrics: { trustUs: 8 }, relationships: { counterpartUs: 2 } },
        goto: 'ch1_cn_c',
      },
      {
        id: 'ch1_cn_b_deny',
        text: 'Deny knowledge of any specific American result. Let him wonder how good your collection is.',
        effects: { skills: { intelligence: 1 }, metrics: { trustUs: -6 } },
        goto: 'ch1_cn_c',
      },
      {
        id: 'ch1_cn_b_press',
        text: 'Press him: if Washington wants no surprises, it can start by describing its own deployment plans.',
        requires: { skills: { statecraft: 2 } },
        effects: { skills: { statecraft: 1 }, metrics: { trustUs: 2 }, topics: { verification: 1 } },
        goto: 'ch1_cn_c',
      },
      {
        id: 'ch1_cn_b_offer',
        text: 'Offer him something concrete and unasked-for: a standing line, both directions, no agenda.',
        detail: 'A back channel that survives the moment it is created is worth more than any single exchange in it.',
        requires: { skills: { statecraft: 3 } },
        effects: {
          skills: { statecraft: 1 },
          metrics: { trustUs: 14 },
          relationships: { counterpartUs: 3 },
          flags: ['channelIsReal'],
        },
        goto: 'ch1_cn_c',
        wouldHaveOpened:
          'A back channel with enough weight behind it to matter in Chapter 7, when a signature depends on whether he believes you.',
      },
    ],
  },

  // =========================================================================
  // EUROPE
  // =========================================================================
  {
    id: 'ch1_eu_a',
    chapter: 1,
    dateline: '15 February — Brussels',
    title: 'A researcher who could not sleep',
    factions: ['eu'],
    onEnter: { meetActors: ['principalEu'] },
    body: [
      {
        kind: 'p',
        text: 'Nobody briefs Brussels. Brussels finds out because a postdoc in Delft, three months out of a visiting position at Meridian Systems and bound by an agreement she has read carefully enough to know what it does not cover, requests a meeting with the Union AI Office and spends forty minutes describing a chart she is not permitted to show you.',
      },
      {
        kind: 'p',
        text: 'She does not name the number. She describes the shape of the curve, and the date the lab had written on the wall for reaching it, and the date it actually reached it.',
      },
      {
        kind: 'quote',
        text: 'They have stopped arguing about whether it will happen. Now they argue about staffing. You understand? Nobody argues about staffing for something they think is two years away.',
        attrib: 'Dr Sanne Vos, TU Delft',
      },
      {
        kind: 'p',
        text: 'Katrin Sørensen reads the note that evening and asks you the only question that matters from this chair.',
      },
      { kind: 'say', actor: 'principalEu', text: 'We will not be building this. So tell me: what do we have that either of them needs?' },
      {
        kind: 'aside',
        title: 'The European position, stated without flattery',
        body: [
          'No frontier lab. No sovereign compute at scale. A talent base that emigrates. A regulatory apparatus admired and routed around.',
          'And: the only company on earth that makes the machines that make the chips, a market of four hundred million that both giants want access to, and — uniquely — a plausible claim to be the one jurisdiction each of them could imagine trusting to hold the other to account.',
          'Two of those are assets. The third is the only one that grows.',
        ],
      },
    ],
    choices: [
      {
        id: 'ch1_eu_a_chokepoint',
        text: '"Lithography. Nordwijk ships nothing either of them can replicate inside a decade."',
        requires: { skills: { industry: 1 } },
        effects: { skills: { industry: 1 }, topics: { chips: 1 }, relationships: { principalEu: 1 } },
        goto: 'ch1_eu_b',
      },
      {
        id: 'ch1_eu_a_market',
        text: '"Market access, and the law. Neither of them wants to deploy into Europe on our terms, and both of them will have to."',
        requires: { skills: { political: 1 } },
        effects: { skills: { political: 1 }, topics: { lawfare: 1 }, relationships: { principalEu: 1 } },
        goto: 'ch1_eu_b',
      },
      {
        id: 'ch1_eu_a_trust',
        text: '"Trust. In eighteen months they will need somewhere to inspect each other. There is nowhere else."',
        detail: 'The weakest answer today and the only one that is worth anything by the end.',
        requires: { skills: { statecraft: 2 } },
        effects: {
          skills: { statecraft: 1 },
          topics: { verification: 1 },
          relationships: { principalEu: 2 },
          flags: ['euVerificationIdea'],
        },
        goto: 'ch1_eu_b',
        wouldHaveOpened:
          'Naming Europe’s real asset in week one — the seed of the verification regime the best ending runs through.',
      },
      {
        id: 'ch1_eu_a_honest',
        text: '"Very little, and less every month. I would rather say that now than discover it in a year."',
        effects: { relationships: { principalEu: 1 }, skills: { intelligence: 1 }, metrics: { alarm: 2 } },
        goto: 'ch1_eu_b',
      },
    ],
  },
  {
    id: 'ch1_eu_b',
    chapter: 1,
    dateline: '19 February — Brussels',
    title: 'Washington calls first',
    factions: ['eu'],
    onEnter: { meetActors: ['counterpartUs'] },
    body: [
      {
        kind: 'p',
        text: 'Karl Denning arrives with no delegation, no press line and a request that the meeting not appear on the Commission’s public diary. He is unfailingly courteous. He is also here to establish something before anyone else does.',
      },
      { kind: 'say', actor: 'counterpartUs', text: 'We would like to keep you informed. Genuinely. What we would like in return is that being informed by us is not the same as being informed by everyone.' },
      {
        kind: 'p',
        text: 'It is an elegant offer. Privileged access, in exchange for exclusivity — and exclusivity, for Europe, means giving up the one thing that makes Europe interesting to either side.',
      },
      {
        kind: 'reveal',
        requires: { skills: { statecraft: 2 } },
        label: 'Statecraft',
        body: [
          {
            kind: 'p',
            text: 'He has come this early because he has read the same assessment you have and reached the conclusion Washington least wants written down: that in eighteen months the Americans may need a verification host, and that the cheapest time to buy one is before it knows what it is worth.',
          },
        ],
      },
      {
        kind: 'note',
        text: 'Every point of Washington’s trust you bank here is real. So is the fact that Beijing will know within the week that you took the meeting.',
      },
    ],
    choices: [
      {
        id: 'ch1_eu_b_accept',
        text: 'Accept the arrangement. Privileged access is worth more than theoretical even-handedness.',
        effects: { metrics: { trustUs: 14, trustCn: -10 }, relationships: { counterpartUs: 2 } },
        goto: 'ch1_eu_c',
      },
      {
        id: 'ch1_eu_b_refuse',
        text: 'Refuse politely. Europe will take information from anyone and promise exclusivity to no one.',
        effects: { metrics: { trustUs: -6, trustCn: 6 }, skills: { political: 1 } },
        goto: 'ch1_eu_c',
      },
      {
        id: 'ch1_eu_b_both',
        text: 'Accept — and tell him plainly that you will be having the same conversation in Beijing, and that he should want you to.',
        detail:
          'The politically savvy answer, and the hardest to deliver: it requires him to leave believing that your usefulness depends on your independence.',
        requires: { skills: { statecraft: 3 } },
        effects: {
          skills: { statecraft: 1 },
          metrics: { trustUs: 10, trustCn: 8 },
          relationships: { counterpartUs: 2 },
          flags: ['euDeclaredBalance'],
        },
        goto: 'ch1_eu_c',
        wouldHaveOpened:
          'Holding both capitals at once from the very first meeting — the balancing act the Guarantor ending is built on.',
      },
      {
        id: 'ch1_eu_b_leverage',
        text: 'Name a price: Nordwijk’s export licences stay a European competence, in writing.',
        requires: { skills: { industry: 2 }, topics: { chips: 1 } },
        effects: {
          skills: { industry: 1 },
          metrics: { trustUs: 4, trustCn: 2 },
          topics: { lawfare: 1 },
          flags: ['euKeptLicences'],
        },
        goto: 'ch1_eu_c',
        wouldHaveOpened:
          'Locking down the chokepoint as European property before Washington starts treating it as a shared asset.',
      },
    ],
  },

  // =========================================================================
  // SHARED: the commitment (Decision 1)
  // =========================================================================
  {
    id: 'ch1_us_c',
    chapter: 1,
    dateline: '2 March — Washington, DC',
    title: 'The commitment',
    factions: ['us'],
    body: [
      {
        kind: 'p',
        text: 'Vance keeps you back after the morning meeting. There is no agenda item for this and there will be no record of it.',
      },
      { kind: 'say', actor: 'principalUs', text: 'This is going to get away from all of us. Before it does, I want to know what you are. Not what you think — what you are.' },
      {
        kind: 'p',
        text: 'It is not a rhetorical question, and she will remember the answer for as long as this lasts.',
      },
    ],
    choices: [
      {
        id: 'promise_loyalty',
        text: '"I will not go around you. Whatever I find, you hear it first."',
        detail: 'Buys you enormous latitude inside the building. Spends your freedom to act when the building is wrong.',
        majorDecision: 'd1_commitment',
        effects: { relationships: { principalUs: 3 }, metrics: { trustUs: 10 }, skills: { political: 1 }, flags: ['promisedLoyalty'] },
        goto: 'ch2_open',
      },
      {
        id: 'promise_candour',
        text: '"I will tell you the truth, including when it is politically impossible."',
        detail: 'Costs you standing in the short run. Makes you the one person in the room worth asking in Chapter 8.',
        majorDecision: 'd1_commitment',
        effects: { relationships: { principalUs: 1 }, skills: { alignment: 1, political: 1 }, flags: ['promisedCandour'] },
        goto: 'ch2_open',
      },
      {
        id: 'promise_channel',
        text: '"I am going to keep the line to Beijing open, whatever the politics costs. I want you to know that now."',
        detail: 'She will not thank you for it. Somebody, eventually, will.',
        majorDecision: 'd1_commitment',
        effects: { metrics: { trustCn: 10, trustUs: -4 }, skills: { statecraft: 1 }, flags: ['promisedChannel'] },
        goto: 'ch2_open',
      },
      {
        id: 'promise_nothing',
        text: '"I am an adviser. I will advise." Commit to nothing.',
        detail: 'Keeps every option. Means nobody owes you anything when you need it.',
        majorDecision: 'd1_commitment',
        effects: { relationships: { principalUs: -1 }, skills: { intelligence: 1 }, flags: ['promisedNothing'] },
        goto: 'ch2_open',
      },
    ],
  },
  {
    id: 'ch1_cn_c',
    chapter: 1,
    dateline: '4 March — Beijing',
    title: 'The commitment',
    factions: ['cn'],
    body: [
      {
        kind: 'p',
        text: 'Shen Weiguo walks with you in the courtyard, which is how serious conversations happen when nobody wants a transcript.',
      },
      { kind: 'say', actor: 'principalCn', text: 'The Commission will make decisions this year that cannot be revisited. I need to know what kind of person is standing next to me when they are made.' },
    ],
    choices: [
      {
        id: 'promise_loyalty',
        text: '"I will bring everything to you first. You will never learn something about my portfolio from someone else."',
        detail: 'Buys you enormous latitude inside the system. Spends your freedom to act when the system is wrong.',
        majorDecision: 'd1_commitment',
        effects: { relationships: { principalCn: 3 }, metrics: { trustCn: 10 }, skills: { political: 1 }, flags: ['promisedLoyalty'] },
        goto: 'ch2_open',
      },
      {
        id: 'promise_candour',
        text: '"I will tell you what is true, including when it contradicts what the Commission has already decided."',
        detail: 'Costs you standing now. Makes you the one person worth asking in Chapter 8.',
        majorDecision: 'd1_commitment',
        effects: { relationships: { principalCn: 1 }, skills: { alignment: 1, political: 1 }, flags: ['promisedCandour'] },
        goto: 'ch2_open',
      },
      {
        id: 'promise_channel',
        text: '"I intend to keep the American line open. I would rather you heard that from me."',
        detail: 'A risk to say aloud here. It is also the only version of this that survives being discovered.',
        majorDecision: 'd1_commitment',
        effects: { metrics: { trustUs: 10, trustCn: -4 }, skills: { statecraft: 1 }, flags: ['promisedChannel'] },
        goto: 'ch2_open',
      },
      {
        id: 'promise_nothing',
        text: '"I serve the Commission." Say nothing that could later be quoted.',
        detail: 'Keeps every option. Means nobody owes you anything when you need it.',
        majorDecision: 'd1_commitment',
        effects: { relationships: { principalCn: -1 }, skills: { intelligence: 1 }, flags: ['promisedNothing'] },
        goto: 'ch2_open',
      },
    ],
  },
  {
    id: 'ch1_eu_c',
    chapter: 1,
    dateline: '3 March — Brussels',
    title: 'The commitment',
    factions: ['eu'],
    body: [
      {
        kind: 'p',
        text: 'Sørensen finds you in the corridor outside the Berlaymont press room, which is her way of having a conversation that is not a meeting.',
      },
      { kind: 'say', actor: 'principalEu', text: 'We are going to be asked to choose. Repeatedly, and by people who are better at this than we are. I want to know now what you will not trade away.' },
    ],
    choices: [
      {
        id: 'promise_loyalty',
        text: '"Union unity. I will not cut a deal that any member state has to be told about afterwards."',
        detail: 'Slow, legitimate, and occasionally the reason you arrive too late.',
        majorDecision: 'd1_commitment',
        effects: { relationships: { principalEu: 3 }, skills: { political: 1 }, flags: ['promisedLoyalty', 'euUnityFirst'] },
        goto: 'ch2_open',
      },
      {
        id: 'promise_candour',
        text: '"Honesty about what we actually are. We are not a great power and pretending will get us used."',
        detail: 'Unpopular in Brussels. Correct.',
        majorDecision: 'd1_commitment',
        effects: { relationships: { principalEu: 1 }, skills: { alignment: 1, political: 1 }, flags: ['promisedCandour'] },
        goto: 'ch2_open',
      },
      {
        id: 'promise_channel',
        text: '"Both lines stay open. Washington and Beijing. Neither gets exclusivity, ever."',
        detail: 'The balancing act, declared as doctrine before it has been tested.',
        majorDecision: 'd1_commitment',
        effects: { metrics: { trustUs: 5, trustCn: 8 }, skills: { statecraft: 1 }, flags: ['promisedChannel'] },
        goto: 'ch2_open',
      },
      {
        id: 'promise_nothing',
        text: '"I will keep our options open." Which is, after all, the European speciality.',
        detail: 'Keeps every option. Means nobody owes you anything when you need it.',
        majorDecision: 'd1_commitment',
        effects: { relationships: { principalEu: -1 }, skills: { intelligence: 1 }, flags: ['promisedNothing'] },
        goto: 'ch2_open',
      },
    ],
  },
]
