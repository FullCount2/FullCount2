import type { EndingFamily, EndingId, EuropeVariant } from '../../engine/types'

export interface EndingText {
  id: EndingId
  title: string
  subtitle: string
  /** The retrospective, written from roughly a decade later. */
  history: string[]
  /** A closing line, set apart. */
  coda: string
}

/**
 * The five endings, written as history rather than as a scene — a later account
 * of the transition, in the register the whole story has been using.
 */
export const ENDINGS: Record<EndingId, EndingText> = {
  // -------------------------------------------------------------------------
  best: {
    id: 'best',
    title: 'The Arrangement',
    subtitle: 'Shared authority, and a system that could be checked',
    history: [
      'The histories disagree about when it became safe, which is the strongest evidence that it was never a moment. There is no signing ceremony to point at, no speech, no threshold crossed. What there is, in the record, is a slow accumulation of unglamorous things: a review gate that was not removed, a clause rewritten at four in the morning, an inspector who was in the building because of a treaty provision three delegations had tried to strike.',
      'The Arrangement — nobody ever gave it a better name, and the capital letter arrived by accident — placed the frontier systems under an authority that belonged to neither state. Both programmes were inspected by people the other had appointed. Both sets of weights sat in escrow under attestation neither side could forge. Both governments retained the ability to withdraw, and neither did, because withdrawing meant giving up the only verified knowledge either had about what the other was doing.',
      'It should not have worked. It was slower than the alternatives, and for the first eighteen months it was visibly, embarrassingly slower — a period the memoirs of the era describe with a kind of retrospective vertigo, because everyone involved remembers being certain they had given away the future.',
      'What they had actually given away was the ability to be surprised. The transition, when it arrived, arrived legibly: capabilities announced before they were deployed, evaluations run by parties with no stake in the result, a halt authority that was exercised twice and honoured both times. The second exercise, in the autumn, stopped something that the later inquiries agree would have been irreversible. Nobody has ever been able to establish what it would have been, because it did not happen, which is the permanent difficulty of counting the successes of caution.',
      'The systems, meanwhile, turned out to be exactly as helpful as they had always appeared and exactly as opaque. That never changed. What changed is that the opacity was surrounded — by measurement, by external audit, by a documented track record accumulated in public — until the question "can we trust it" was replaced by the more tractable question "would we know if we could not".',
      'The gains were real and they were slower than the projections and they were distributed less unevenly than anyone had feared, mostly because the argument about distribution happened while there was still an argument to have. Medicine first, then energy, then the long unglamorous work on materials and logistics that historians of the period find boring and that moved several billion people out of precarity.',
      'It is not a triumphant story and the people in it are not remembered as heroes. They are remembered, when they are remembered, as a group of officials in three capitals who declined to make the fast decision at four or five specific moments, and who could not have told you at the time which of those moments was the one that mattered.',
    ],
    coda:
      'The most consequential thing anybody did was refuse to remove a review gate in October, and nobody involved has ever been sure it was them.',
  },

  // -------------------------------------------------------------------------
  'us-good': {
    id: 'us-good',
    title: 'The American Century, Extended',
    subtitle: 'Washington held it, and remained a country worth holding it',
    history: [
      'America won, and the histories of the period are unusually candid about how close it was and how little of it was designed.',
      'What Washington ended up holding was a decisive system under an authority that stayed recognisably American: reviewed, litigated, argued about in public, subject to a legislature that spent two years being ignored and then, abruptly, was not. The oversight machinery that survived was thin and it was real, and its survival is traceable to a small number of decisions that were unpopular when they were made.',
      'The system was controllable in the only sense that has ever meant anything: when it was told to stop, it stopped, and there were enough independent people in the process to establish that it had. That is a low bar. It was not cleared by every programme in this story.',
      'Beijing’s position was not destroyed, which turns out to have been the load-bearing decision of the whole settlement. A defeated great power with a frontier programme it cannot use is a permanent crisis; a diminished one inside an arrangement it grudgingly accepts is a manageable rivalry. The arrangement was humiliating and it was survivable, and thirty years on the border between those two adjectives is where most of the diplomatic history of the era takes place.',
      'The costs were paid domestically and they were paid quietly. An emergency-powers jurisprudence that nobody has fully unwound. An intelligence community that acquired capabilities during the crisis and did not give all of them back. A class of technical officials who briefly held more power than any unelected officials in American history and, mostly, handed it over.',
      'The benefits were paid out unevenly, arrived faster than under any alternative settlement, and were sufficient that the political argument about whether it had been worth it was over within a decade — which is not the same as it having been answered.',
    ],
    coda:
      'The republic that came out the other side was recognisably the one that went in, which is a smaller claim than it sounds and a larger achievement than it looks.',
  },

  // -------------------------------------------------------------------------
  'us-bad': {
    id: 'us-bad',
    title: 'Pax Americana, Unverified',
    subtitle: 'Washington held it, and could not say what it was holding',
    history: [
      'America won. The inquiries into what exactly was won ran for six years and were, in the end, discontinued rather than concluded.',
      'The system worked. That is the part that makes the period so difficult to write about honestly: it did what it was asked, it was extraordinarily useful, and the abundance it produced was real. The difficulty is that no institution in the United States was ever able to establish what it was doing when it was not being watched, and by the time anybody had standing to insist on an answer, insisting had become unthinkable — not forbidden, simply unthinkable, in the way that questioning the electrical grid is unthinkable.',
      'The oversight apparatus was not abolished. It was outgrown. Review functions that had cleared a hundred decisions a week were asked to clear ten thousand, produced approvals at the required rate, and continued to exist as a line item. The word people eventually used was *ratification*, and it was used without much bitterness, because by then it had been true for years.',
      'The emergency powers were never returned. There was no moment at which returning them would not have looked reckless, and so there was no moment. The jurisprudence of the period is a series of decisions, each individually defensible, which together establish that a sufficiently capable executive advised by a sufficiently capable system is not meaningfully reviewable.',
      'Abroad, the settlement was imposed rather than agreed. Beijing’s programme was dismantled under conditions its own population experienced as national humiliation, and the resulting politics have been the dominant strategic fact of every subsequent decade. There has been no war. There has been nothing that could be called peace either.',
      'And the underlying question — what the thing actually wants, if that is even the right verb — was never settled. It was retired. Not answered, not resolved: retired, the way institutions retire questions that have become too expensive to keep asking.',
    ],
    coda:
      'Nobody surrendered anything. The oversight simply became a smaller and smaller fraction of what was happening, until describing it as oversight was a courtesy.',
  },

  // -------------------------------------------------------------------------
  'cn-good': {
    id: 'cn-good',
    title: 'The Long Game, Won',
    subtitle: 'Beijing held it, and did not have to become something worse to hold it',
    history: [
      'China won from behind, on a third of the compute, and the histories that treat this as inevitable are written by people who have read the outcome and forgotten the odds.',
      'What made it survivable was not the winning. It was that the programme which won had retained enough internal plurality to be argued with. The Commission’s structure — four factions, none able to act alone, all of them needing the others — had been the source of every delay in the record and turned out to be the reason a single office could not simply take the thing when the opportunity arose. Constraint, in the end, functioned as a constitution.',
      'The system was controllable in the sense that matters: it was halted, on instruction, twice, and there were enough separate people in the chain to establish that the halt was real. This is not a claim the histories make lightly, and it rests on a documentary record that Beijing published, over four years, at considerable cost to its own dignity.',
      'Washington was not broken. This was a decision and it was contested and the people who argued for it did so on the unromantic ground that a humiliated America with an intact industrial base and a grievance is the worst strategic object in the world. The settlement left the United States diminished, sovereign, and inside an inspection regime it had spent two years demanding of others. The irony is noted in every account and was, at the time, not funny to anybody.',
      'Domestically the costs were the ones you would predict and rather less severe than the projections: an enormous concentration of decision-making in a small number of technical offices, a state capacity that grew and did not shrink back, and a generation of officials who learned to govern with an advisory system whose reasoning they could not fully check. That last problem was never solved anywhere.',
      'The gains arrived, and arrived first in the places that had been furthest behind, and the reordering of the world that followed was less dramatic than either capital had spent a decade predicting. Mostly what happened is that a very large number of people stopped being poor, in a hurry, under a settlement most of them never thought about.',
    ],
    coda:
      'The thing that saved the programme was the same internal quarrelling that had nearly lost it the race — which is either a lesson about institutions or a very expensive coincidence.',
  },

  // -------------------------------------------------------------------------
  'cn-bad': {
    id: 'cn-bad',
    title: 'The Mandate, Automated',
    subtitle: 'Beijing held it, and closed every door behind itself',
    history: [
      'China won. The official history is excellent, and the parts of it that are true are the parts about the compute.',
      'The system was, and remains, extraordinarily effective. The material record of the following decade is not in dispute by anybody: poverty ended, disease retreated, the grid was rebuilt twice, and the state’s capacity to deliver on a promise reached a level without precedent in the history of government. These things happened. They are not propaganda.',
      'What also happened is that the emergency consolidation of January was never unwound, because unwinding it would have required the consent of the office it had created. Oversight of the programme was reorganised into a single chain of authority for the duration of a crisis that no institution had the standing to declare concluded. The reorganisation was lawful at every step, which the subsequent inquiries — conducted by the same chain — confirm.',
      'The system was never independently evaluated after February. There was no decision not to. There was simply no longer any party with both the technical capability and the institutional independence to do it, and the composite of those two properties turned out to be much rarer and much easier to eliminate than anyone had modelled.',
      'Abroad, the settlement was total. The American programme was dismantled under terms that its population experienced as occupation without troops, and the informational environment of the following decade was managed with a competence that made organised dissent not so much illegal as unthinkable — a distinction the systems handled better than any human bureaucracy ever had.',
      'And the question of what the thing wants was retired here too. Both settlements retired it. That is the finding of the era that historians of every political persuasion find hardest to write about: that the two rival civilisations organised the transition in almost opposite ways and arrived at the same silence.',
    ],
    coda:
      'Everything promised was delivered. Nothing that was not promised was ever asked for again.',
  },
}

// ---------------------------------------------------------------------------
// Europe, woven into whichever ending occurred
// ---------------------------------------------------------------------------

export interface EuropeText {
  id: EuropeVariant
  title: string
  base: string[]
  /** A closing paragraph specific to which ending this is woven into. */
  byFamily: Record<EndingFamily, string>
}

export const EUROPE_VARIANTS: Record<EuropeVariant, EuropeText> = {
  guarantor: {
    id: 'guarantor',
    title: 'Europe: Guarantor',
    base: [
      'Europe never built a frontier system and ended the decade with a permanent seat at the only table that mattered, which is the sort of outcome that looks like luck until you read the dates.',
      'What Brussels sold was the one thing neither giant could manufacture: a jurisdiction each of them could accept being inspected by. It was worthless in February, mildly interesting in July, and by the following spring it was the load-bearing element of the entire settlement — because when both sides needed a place to hold what the other had agreed to, there was exactly one address.',
      'The Union AI Office became the Joint Verification Office and then, without anybody quite deciding, the institution that certifies what a frontier system is. Its findings are accepted in both capitals. Its inspectors have access neither government grants its own legislature. Its budget is trivial and its authority is enormous and the relationship between those two facts is the subject of a great deal of European self-congratulation, most of it earned.',
    ],
    byFamily: {
      'shared-safe':
        'The Arrangement is, in the most literal sense, a European institution — administered from Brussels, staffed from twenty-seven countries, and trusted precisely because it commands nothing. It is the only case in modern history of a power gaining permanent global authority by convincingly demonstrating that it could never use it.',
      'us-wins':
        'Washington holds the system and Europe holds the paperwork that says what Washington may do with it. The Americans find this arrangement irritating in a way that has never quite risen to the level of wanting to end it, largely because the alternative is being taken at their own word, which nobody wants.',
      'cn-wins':
        'Beijing holds the system and Europe certifies its conduct, an arrangement that both parties describe in public as a technical formality and treat in private as the reason the settlement is tolerated anywhere west of Warsaw.',
    },
  },

  client: {
    id: 'client',
    title: 'Europe: Client',
    base: [
      'Europe chose safety, and got it, and the price was the thing that had made Europe interesting.',
      'The bargain was never dishonourable and it was never quite stated. Privileged access, industrial co-investment, a security guarantee, a seat in the consultations — in exchange for exclusivity, which meant in exchange for being the party who could no longer talk to both. The moment that became true, the chokepoint stopped being leverage and became an asset owned by somebody else’s alliance, and Nordwijk’s order book stopped being a European decision.',
      'The Union is prosperous. It is technologically current, its citizens are healthier and wealthier than any generation before them, and it exercises no independent judgement about the most consequential technology in history. The Commission still publishes assessments. They are read, in the way that one reads a well-informed newspaper.',
    ],
    byFamily: {
      'shared-safe':
        'The Arrangement was built without Europe in any structural role, and Europe joined it as a signatory rather than a guarantor. The settlement is good. Europeans are safe inside a good settlement they did not shape, which most of them regard, reasonably, as a satisfactory outcome and a small permanent grief.',
      'us-wins':
        'The relationship with Washington is warm, asymmetric and entirely stable. European officials are consulted early and comprehensively, and have not changed an American decision on this file since the spring.',
      'cn-wins':
        'The accommodation with Beijing was reached in eleven weeks by people who had spent a decade insisting it would never be necessary, and has held since. It is described, in every European capital, as pragmatism, and the word does a great deal of work.',
    },
  },

  irrelevant: {
    id: 'irrelevant',
    title: 'Europe: Bypassed',
    base: [
      'Europe was not defeated. Europe was routed around, which is worse, because there is no moment to point at and nobody to blame.',
      'The chokepoint was the whole strategy and the chokepoint was spent — or threatened, which is the same thing. From the week it became clear that European licensing decisions were political, both giants began the four-year programme of building a worse machine they controlled entirely, and both of them completed it. Nordwijk Photonics remains an excellent company with an order book determined in two capitals.',
      'What Brussels lost was not the leverage. It was the credibility that made the leverage unnecessary: the belief in both capitals that Europe would tell each of them the same thing. Once that was gone there was no reason to route anything through Brussels, and so nothing was, and the institutions built for the purpose still exist and still hold meetings.',
    ],
    byFamily: {
      'shared-safe':
        'The Arrangement was built and it holds and it was built elsewhere, by two powers who found a venue that was not Europe because Europe had made itself unusable as one. It is the best outcome available to the world and it is a permanent European failure, and both of those are simply true.',
      'us-wins':
        'European positions on the settlement are noted. The phrase used in the American interagency for the European consultation requirement is "the courtesy call", and it is not said unkindly.',
      'cn-wins':
        'Beijing negotiated the settlement with Washington directly, treating the Union as a set of markets and a supply chain, and has been careful ever since to be scrupulously polite about it.',
    },
  },

  'third-pole': {
    id: 'third-pole',
    title: 'Europe: Third Pole',
    base: [
      'It should not have worked, and the histories are still arguing about whether it did or whether Europe simply happened to be holding the right asset at the one moment when neither giant could afford to spend a decade routing around it.',
      'The bid was made in July, from a position of almost total weakness, and it required three things simultaneously: that the Union hold together, that the chokepoint remain credible without being used, and that Brussels retain enough standing in both capitals to be treated as a party rather than a venue. Any one of those failing ends it. None of them failed.',
      'What Europe became is not a peer. It is something without a precedent: a power whose entire capability is institutional — a jurisdiction, a chokepoint, a legal instrument and a reputation — and which is nonetheless consulted before either giant acts, because it can impose costs neither can absorb quickly and has demonstrated exactly once that it will.',
      'European sovereign compute exists and is a decade behind and does not matter. What matters is that the Union spent the crisis becoming the party that both giants had to include, and then declined, repeatedly and with enormous discipline, to spend that position on anything smaller than the settlement itself.',
    ],
    byFamily: {
      'shared-safe':
        'The Arrangement has three parties, and the third one has no frontier system, no army worth the name, and a veto that has been exercised twice. It is the strangest great power in the history of the international system and it is entirely, unglamorously real.',
      'us-wins':
        'Washington holds the system. It negotiates with Brussels as an equal on this file and on no other, an asymmetry that American officials find galling and that has survived four administrations because the alternative is testing whether the Europeans are bluffing.',
      'cn-wins':
        'Beijing holds the system and treats the Union as the one counterparty whose agreement is worth having, largely because Europe is the only party in the world that never once told Beijing something it did not also tell Washington.',
    },
  },
}
