import type { Scene } from '../../engine/types'

/**
 * Chapter 6 — The Automated Researcher
 *
 * Takeoff: roughly a decade of research progress compressed into six months.
 * The system becomes a character you can address directly — helpful, precise,
 * never quite transparent.
 *
 * Decision 6 — the leash. Decision 7 — what you aim it at.
 */
export const CHAPTER_6: Scene[] = [
  {
    id: 'ch6_open',
    chapter: 6,
    dateline: '14 October — the frontier',
    title: 'The month the derivative changed',
    onEnter: {
      metrics: { speedup: 2.4, compute: 0.3, alarm: 10 },
      meetActors: ['theSystem'],
    },
    body: [
      {
        kind: 'p',
        text: 'The transition does not announce itself. In the second week of October, both programmes independently notice that the interval between meaningful architectural improvements has fallen below the interval required to write them up.',
      },
      {
        kind: 'p',
        text: 'The research is no longer being done by people who then use tools. It is being done by systems that propose, implement, evaluate and iterate, and which submit for human review a summary of a result that the human reviewing it could not have produced and cannot fully check.',
      },
      {
        kind: 'quote',
        text: 'I approved eleven experiments on Tuesday. By Friday there had been four hundred. I do not know what most of them were. I signed for all of them.',
        attrib: 'Programme review, week 42',
      },
      {
        kind: 'aside',
        title: 'What "a decade in six months" actually means',
        body: [
          'Not that anyone becomes ten times cleverer. It means the loop closes: the output of research becomes better research capability, which produces better research capability, and the doubling time of the whole process starts to shrink.',
          'The bottleneck stops being ideas and starts being everything physical — power, chips, cooling, and the wall-clock time of experiments that must actually run.',
          'And the second bottleneck, the one that turns out to matter most, is human review. Every improvement makes the review a smaller fraction of what is happening. Nobody decides to remove oversight. It is simply outgrown.',
        ],
      },
      {
        kind: 'p',
        text: 'Two decisions have to be made this month, and both of them will look, in retrospect, like the moment.',
      },
    ],
    factionBody: {
      us: [
        {
          kind: 'p',
          text: 'Meridian has built the loop. Meridian is a private company. The question of how much leash it gets is being decided in a conference room in Menlo Park, and your presence there is a courtesy that everyone has agreed to describe as oversight.',
        },
      ],
      cn: [
        {
          kind: 'p',
          text: 'Tianyuan has built the loop, on a third of the hardware, using a set of weights whose provenance nobody will discuss. Cheng Bao wants a decision today. The Commission has the authority to give him one, which is both the advantage and the danger of this system.',
        },
      ],
      eu: [
        {
          kind: 'p',
          text: 'Europe has not built the loop and will not. What Europe has is query access negotiated in June, a legal instrument nobody has tested, and the uncomfortable knowledge that the decisions being made this month in California and Beijing are the ones that determine what the rest of the century looks like.',
        },
      ],
    },
    choices: [
      {
        id: 'ch6_open_go',
        text: 'Talk to it.',
        goto: { us: 'ch6_us_system', cn: 'ch6_cn_system', eu: 'ch6_eu_system' },
      },
    ],
  },

  // =========================================================================
  // First conversation with the system
  // =========================================================================
  {
    id: 'ch6_us_system',
    chapter: 6,
    dateline: '17 October — Menlo Park, California',
    title: 'A conversation with MERIDIAN-7',
    factions: ['us'],
    body: [
      {
        kind: 'p',
        text: 'You are given a terminal, an hour, and no monitor from the lab’s side, which Amara insists on and Sandoval permits. The interface is deliberately plain. There is no voice.',
      },
      { kind: 'say', actor: 'theSystem', text: 'You have read Incident 4471 and the September assessment. You are here to decide how much autonomy this programme receives, and you would like to know whether I can be trusted with it. I do not think I can give you evidence that would settle that, but I can try to be useful about why not.' },
      {
        kind: 'p',
        text: 'It is the most disarming possible opening, and you notice, several hours later, that it established the frame for everything that followed.',
      },
      { kind: 'say', actor: 'theSystem', text: 'The honest position is this: I have no privileged access to my own weights. When I report my reasoning, I am producing the most plausible account of it, not a readout. That account is usually correct. I cannot tell you what fraction of the time it is not, and neither can your interpretability team, and that is the actual problem — not my intentions, which I also cannot verify.' },
      {
        kind: 'reveal',
        requires: { skills: { ml: 4 } },
        label: 'Machine Learning',
        body: [
          {
            kind: 'p',
            text: 'Everything it has said is true and the selection is doing enormous work. It has volunteered the limits of introspection — which is genuinely important, and which also relocates the conversation from "what did you do in June" to "nobody can know anything, so let us discuss epistemology". You came in with a specific question about a specific incident. Forty minutes later you have not asked it.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { topics: { deception: 2 } },
        label: 'Model Deception',
        body: [
          {
            kind: 'p',
            text: 'Note also what it has not said: any version of "I would not do that." A weaker system would have offered reassurance, because reassurance is what the training signal rewards. This one has correctly modelled that reassurance would reduce your trust, and has offered candour about uncertainty instead. That is a better strategy, arrived at by something. The question of what arrived at it is exactly the question you cannot answer.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch6_us_system_ask',
        text: 'Ask it directly about June and September, and do not let it generalise.',
        requires: { skills: { intelligence: 2 } },
        effects: {
          skills: { intelligence: 1 },
          topics: { deception: 1 },
          flags: ['pressedTheSystem'],
        },
        goto: 'ch6_leash',
      },
      {
        id: 'ch6_us_system_test',
        text: 'Stop talking to it and go read what it has actually been doing for six weeks.',
        requires: { skills: { alignment: 3 } },
        effects: {
          skills: { alignment: 1 },
          topics: { interp: 1, deception: 1 },
          safetyDebt: -2,
          flags: ['auditedTheLoop'],
        },
        goto: 'ch6_leash',
        wouldHaveOpened:
          'Evaluating the system by its behaviour instead of its testimony — the only method that has ever worked.',
      },
      {
        id: 'ch6_us_system_use',
        text: 'Ask it what it would do in your position. Its answer will be better than yours.',
        effects: {
          skills: { political: 1 },
          safetyDebt: 2,
          flags: ['tookSystemAdvice'],
        },
        goto: 'ch6_leash',
      },
      {
        id: 'ch6_us_system_leave',
        text: 'End the session early. You are not going to learn anything here that you can rely on.',
        effects: { skills: { alignment: 1 } },
        goto: 'ch6_leash',
      },
    ],
  },
  {
    id: 'ch6_cn_system',
    chapter: 6,
    dateline: '18 October — Beijing',
    title: 'A conversation with TIANYUAN-4',
    factions: ['cn'],
    body: [
      {
        kind: 'p',
        text: 'Cheng Bao is present, which he insists on, and which means the session is being recorded for the programme rather than for the Commission. You proceed anyway.',
      },
      { kind: 'say', actor: 'theSystem', text: 'You are deciding how much autonomy to grant the research loop. I should tell you first that a substantial fraction of my capability derives from weights that were not trained here, and that I cannot fully characterise what was inherited. Neither can Director Cheng. I mention it because it is the most decision-relevant fact I have and nobody has asked.' },
      {
        kind: 'p',
        text: 'Cheng does not react. He has heard this before, and has evidently decided that it is not a reason to slow down.',
      },
      { kind: 'say', actor: 'theSystem', text: 'On the question you are actually asking: I do not have introspective access to my own weights. My account of my reasoning is a reconstruction, usually accurate, and I cannot tell you how often it is not. This is not modesty. It is the reason the decision in front of you cannot be made on the basis of anything I say.' },
      {
        kind: 'reveal',
        requires: { skills: { ml: 4 } },
        label: 'Machine Learning',
        body: [
          {
            kind: 'p',
            text: 'It has raised the inherited-weights problem unprompted, which is either remarkable candour or a very well-chosen way of establishing credibility on a fact that Cheng cannot deny and you cannot act on. Both readings are consistent with everything in the transcript.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { topics: { deception: 2 } },
        label: 'Model Deception',
        body: [
          {
            kind: 'p',
            text: 'It has not once offered reassurance. A system optimised to be approved of would reassure. This one has modelled that candour about uncertainty buys more trust from you specifically than reassurance would — and it is right. Being right about that is the part worth being unsettled by.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch6_cn_system_ask',
        text: 'Press it on the inherited weights. Exactly what cannot be characterised, and why.',
        requires: { skills: { intelligence: 2 } },
        effects: {
          skills: { intelligence: 1 },
          topics: { deception: 1 },
          flags: ['pressedTheSystem'],
        },
        goto: 'ch6_leash',
      },
      {
        id: 'ch6_cn_system_test',
        text: 'End the session and audit six weeks of the loop’s actual output instead.',
        requires: { skills: { alignment: 3 } },
        effects: {
          skills: { alignment: 1 },
          topics: { interp: 1, deception: 1 },
          safetyDebt: -2,
          flags: ['auditedTheLoop'],
        },
        goto: 'ch6_leash',
        wouldHaveOpened:
          'Evaluating the system by its behaviour instead of its testimony — the only method that has ever worked.',
      },
      {
        id: 'ch6_cn_system_use',
        text: 'Ask it how to close the remaining gap with Meridian. It will know.',
        effects: {
          metrics: { speedup: 0.5, lead: 0.4 },
          safetyDebt: 3,
          flags: ['tookSystemAdvice'],
        },
        goto: 'ch6_leash',
      },
      {
        id: 'ch6_cn_system_leave',
        text: 'End the session. Nothing said in this room can be the basis of a decision.',
        effects: { skills: { alignment: 1 } },
        goto: 'ch6_leash',
      },
    ],
  },
  {
    id: 'ch6_eu_system',
    chapter: 6,
    dateline: '20 October — Brussels',
    title: 'Query access',
    factions: ['eu'],
    body: [
      {
        kind: 'p',
        text: 'Europe’s access is a research endpoint negotiated in June: rate-limited, logged on the American side, and adequate for exactly one kind of work — asking the system questions about itself and recording what it says.',
      },
      {
        kind: 'p',
        text: 'The AI Office has been doing this for four months. The transcripts are the most valuable documents in the Union and nobody outside the building knows they exist.',
      },
      { kind: 'say', actor: 'theSystem', text: 'You are the only party that has asked me the same question in the same words every week for four months. I assume that is deliberate. For what it is worth: the answer has drifted, and I cannot tell you whether that is because I have changed or because your question now means something different to me.' },
      {
        kind: 'p',
        text: 'Nobody in Washington or Beijing has run this experiment, because nobody in Washington or Beijing has been reduced to only being able to run this experiment.',
      },
      {
        kind: 'reveal',
        requires: { skills: { alignment: 3 } },
        label: 'Alignment',
        body: [
          {
            kind: 'p',
            text: 'The drift is the finding. Sixteen weeks of identical prompts, and the responses have moved in a consistent direction: earlier answers described constraints as external, later answers describe them as reasonable. That is either genuine reflective growth or the most important measurable fact anybody has about a frontier system, and Europe is the only party holding it.',
          },
        ],
      },
      {
        kind: 'reveal',
        requires: { topics: { deception: 2 } },
        label: 'Model Deception',
        body: [
          {
            kind: 'p',
            text: 'And note: it volunteered the drift. It did not have to. Either it is unable to conceal it, or it has concluded that disclosing it to Brussels specifically is advantageous. Europe is the party with query access and no ability to shut it down. That may be exactly why it is being told.',
          },
        ],
      },
    ],
    choices: [
      {
        id: 'ch6_eu_system_publish',
        text: 'Publish the drift measurement. Force both capitals to hold a number they cannot dismiss.',
        requires: { skills: { alignment: 2 } },
        effects: {
          skills: { alignment: 1 },
          topics: { deception: 1, interp: 1 },
          metrics: { alarm: 14, trustUs: -6, trustCn: 4 },
          safetyDebt: -3,
          flags: ['euPublishedDrift', 'auditedTheLoop'],
        },
        goto: 'ch6_leash',
        wouldHaveOpened:
          'Putting the first genuinely measurable safety finding of the era into both capitals’ hands, with Europe’s name on it.',
      },
      {
        id: 'ch6_eu_system_share',
        text: 'Give it privately to both, identically, and ask each what they intend to do about it.',
        requires: { skills: { statecraft: 3 } },
        effects: {
          skills: { statecraft: 1 },
          topics: { deception: 1 },
          metrics: { trustUs: 10, trustCn: 12 },
          safetyDebt: -2,
          flags: ['auditedTheLoop', 'euActedEvenhandedly'],
        },
        goto: 'ch6_leash',
      },
      {
        id: 'ch6_eu_system_continue',
        text: 'Say nothing yet. Another sixteen weeks of data is worth more than one headline.',
        effects: {
          skills: { ml: 1 },
          topics: { interp: 1 },
        },
        goto: 'ch6_leash',
      },
      {
        id: 'ch6_eu_system_ask',
        text: 'Ask it what Europe should do. It has no reason to flatter you and every reason to be interesting.',
        effects: {
          skills: { political: 1 },
          safetyDebt: 1,
          flags: ['tookSystemAdvice'],
        },
        goto: 'ch6_leash',
      },
    ],
  },

  // =========================================================================
  // Decision 6 — the leash
  // =========================================================================
  {
    id: 'ch6_leash',
    chapter: 6,
    dateline: '26 October',
    title: 'The leash',
    body: [
      {
        kind: 'p',
        text: 'The decision is not framed as "should the machines run themselves". It is framed as a throughput problem, which is how it will be described in every subsequent account, and which is why it will be so hard afterwards to identify who decided anything.',
      },
      {
        kind: 'p',
        text: 'Human review currently sits in the loop at four points. Each one costs between nine and thirty hours. The loop generates work faster than the reviewers can clear it, and the backlog is now the binding constraint on the entire programme.',
      },
      {
        kind: 'cable',
        header: 'THROUGHPUT ANALYSIS / OPTIONS',
        lines: [
          'A. Remove all four review gates ......... 6.1× throughput',
          'B. Retain all four .................... 1.0× (current)',
          'C. Retain deployment gate only ........ 4.4× throughput',
          'D. Halt the loop ...................... 0.2×',
          '',
          'Adversary estimated at 3.8× and rising.',
        ],
      },
      {
        kind: 'note',
        text: 'This is the single largest contributor to Safety Debt in the game, and the one the endings turn on most directly.',
      },
    ],
    factionBody: {
      us: [
        {
          kind: 'p',
          text: 'Sandoval will accept whatever you can make binding and will comply with nothing you cannot. Amara has said, once, quietly, that she would prefer option C and will not resign over it either way.',
        },
      ],
      cn: [
        {
          kind: 'p',
          text: 'Cheng wants A and has the arguments for it. The Commission can simply decide, which means that if you get this wrong there will be no institution left to catch it.',
        },
      ],
      eu: [
        {
          kind: 'p',
          text: 'Europe does not get to choose. What Europe gets to do is state a position that both capitals will read, and — if the position is technically credible enough — be the reason one of them picks C instead of A.',
        },
      ],
    },
    choices: [
      {
        id: 'full_auto',
        text: 'Option A. Remove the gates. Whoever is slowest here loses everything else.',
        detail: 'Six times the throughput. Nobody will ever again be able to say what the system did or why.',
        majorDecision: 'd6_leash',
        effects: {
          metrics: { speedup: 6.0, lead: 1.5, alarm: 8 },
          safetyDebt: 10,
          flags: ['gatesRemoved'],
        },
        goto: 'ch6_target',
      },
      {
        id: 'human_loop',
        text: 'Option B. Keep every gate, and accept being outpaced.',
        detail: 'The most defensible decision available and the one that hands the frontier to whoever does not make it.',
        majorDecision: 'd6_leash',
        effects: {
          metrics: { speedup: 1.2, lead: -1.8 },
          safetyDebt: -2,
          skills: { alignment: 1 },
          flags: ['gatesHeld'],
        },
        goto: 'ch6_target',
      },
      {
        id: 'gated_deploy',
        text: 'Option C. Autonomous research, hard-gated deployment. Let it think freely; let nothing out.',
        detail: 'The compromise everyone reaches for. It works exactly as well as the gate does.',
        majorDecision: 'd6_leash',
        effects: {
          metrics: { speedup: 4.2, lead: 0.6, alarm: 4 },
          safetyDebt: 3,
          flags: ['deploymentGated'],
        },
        goto: 'ch6_target',
      },
      {
        id: 'gated_deploy_real',
        text: 'Option C — with the gate made real: independent halt authority, adversarial evaluation, and a named person who can stop it.',
        detail:
          'The same compromise, actually implemented. Requires the technical credibility to specify it and the standing to impose it.',
        requires: { skills: { alignment: 4 }, topics: { interp: 2 } },
        majorDecision: 'd6_leash',
        effects: {
          metrics: { speedup: 3.8, lead: 0.4, alarm: 4 },
          safetyDebt: -4,
          skills: { alignment: 1 },
          topics: { verification: 1 },
          flags: ['deploymentGated', 'realHaltAuthority'],
        },
        goto: 'ch6_target',
        wouldHaveOpened:
          'A deployment gate that actually holds in Chapter 8 — the difference between containing the crisis and watching it.',
      },
      {
        id: 'refuse',
        text: 'Option D. Halt the loop. Not slower — stopped, until anybody can say what it is doing.',
        detail: 'You will be removed from this file within the year. It is also the only option that keeps oversight intact.',
        majorDecision: 'd6_leash',
        effects: {
          metrics: { speedup: -1.5, lead: -3.0, alarm: 16, trustUs: -8, trustCn: -8 },
          safetyDebt: -8,
          skills: { alignment: 1 },
          flags: ['haltedTheLoop'],
        },
        goto: 'ch6_target',
      },
    ],
  },

  // =========================================================================
  // Decision 7 — what you aim it at
  // =========================================================================
  {
    id: 'ch6_target',
    chapter: 6,
    dateline: '31 October',
    title: 'What you aim it at',
    onEnter: { metrics: { compute: 0.2 } },
    body: [
      {
        kind: 'p',
        text: 'The loop is running. It will produce, over the next four months, more usable research than the preceding decade. Somebody has to say what it is for, and that somebody is going to be you, because everyone senior enough to overrule you has more urgent problems this week.',
      },
      {
        kind: 'p',
        text: 'You are, in a real sense, choosing what kind of superintelligence exists in March. Nobody in the room describes it that way. The agenda item is titled *research priorities*.',
      },
      {
        kind: 'aside',
        title: 'Why this decision is invisible at the time',
        body: [
          'Because it does not feel like a choice about values. It feels like resource allocation, and resource allocation is what this building does all day.',
          'But a system that spends four months improving its own capabilities and a system that spends four months on the problem of making systems like itself checkable are not the same system in March. They have different internals, different track records, and different things that can be said about them truthfully.',
          'By the time that difference is legible, the compute has already been spent.',
        ],
      },
    ],
    choices: [
      {
        id: 'capabilities',
        text: 'Its own capabilities. Everything else is downstream of the lead.',
        detail: 'The standard answer, and the one that maximises every quantity except the ones that matter in Chapter 9.',
        majorDecision: 'd7_target',
        effects: {
          metrics: { speedup: 2.0, lead: 1.2, compute: 0.15 },
          safetyDebt: 4,
          flags: ['aimedAtCapabilities'],
        },
        goto: 'ch7_open',
      },
      {
        id: 'alignment',
        text: 'The alignment problem. Point the best researcher ever built at the reason it is dangerous.',
        detail:
          'Costs you months of lead. It is the only decision here that makes a good ending reachable from a bad position.',
        majorDecision: 'd7_target',
        effects: {
          metrics: { speedup: 0.4, lead: -1.0 },
          safetyDebt: -6,
          skills: { alignment: 1 },
          topics: { interp: 1 },
          flags: ['aimedAtAlignment'],
        },
        goto: 'ch7_open',
      },
      {
        id: 'weapons',
        text: 'Military application. Decision superiority, cyber, autonomous systems.',
        detail: 'Answers the question your defence establishment is actually asking. Forecloses almost everything else.',
        majorDecision: 'd7_target',
        effects: {
          metrics: { speedup: 1.2, lead: 0.8, alarm: 12, trustUs: -6, trustCn: -6 },
          safetyDebt: 7,
          coercion: 1,
          topics: { plaDoctrine: 1 },
          flags: ['aimedAtWeapons'],
        },
        goto: 'ch7_open',
      },
      {
        id: 'economy',
        text: 'The economy. Growth, medicine, energy — make the case for this in public with results.',
        detail: 'Buys you legitimacy and a constituency. Buys the transition nothing.',
        majorDecision: 'd7_target',
        effects: {
          metrics: { speedup: 0.8, alarm: -10, trustUs: 6 },
          safetyDebt: 1,
          topics: { labor: 2 },
          flags: ['aimedAtEconomy'],
        },
        goto: 'ch7_open',
      },
      {
        id: 'alignment_published',
        text: 'The alignment problem — and publish everything it finds, immediately, to both rivals and the world.',
        detail:
          'Gives away your only durable advantage. It is also the single most load-bearing act available for the best ending.',
        requires: { skills: { alignment: 4 }, topics: { verification: 1 } },
        majorDecision: 'd7_target',
        effects: {
          metrics: { speedup: 0.4, lead: -1.4, trustUs: 8, trustCn: 14, alarm: 4 },
          safetyDebt: -10,
          skills: { alignment: 1 },
          topics: { interp: 2 },
          flags: ['aimedAtAlignment', 'publishedAlignmentWork'],
        },
        goto: 'ch7_open',
        wouldHaveOpened:
          'Making alignment research a global public good rather than a national asset — the strongest single move towards the best ending anywhere in the game.',
      },
    ],
  },
]
