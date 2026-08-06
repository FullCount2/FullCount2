# Agent F — Citation Forensics

**Assignment:** Determine whether a claimed peer-reviewed paper exists:
"Anomalous Electromagnetic and Radiometric Signatures at the Skinwalker Ranch
Research Site," allegedly published January 2026 in the *Journal of Scientific
Exploration*, allegedly led by Dr. Travis Taylor with "instrumentation
specialists from several university physics departments," presenting sensor
data from 2022–2025.

**Verdict: THE PAPER DOES NOT EXIST. Confidence: high.**

---

## Why the verdict is firm

### 1. A "January 2026" JSE issue is structurally impossible

The *Journal of Scientific Exploration* is **quarterly**, published at the end
of March, June, September, and December (Society for Scientific Exploration,
<https://www.scientificexploration.org/journal>). The issues bracketing the
alleged date:

| Issue | Season | Publication date |
|---|---|---|
| Vol. 39 No. 4 | Winter 2025 | December 18, 2025 |
| Vol. 40 No. 1 | Spring 2026 | March 26, 2026 |

- Archive: <https://journalofscientificexploration.org/index.php/jse/issue/archive>
- Vol. 40 No. 1: <https://journalofscientificexploration.org/index.php/jse/issue/view/115/53>
- Vol. 39 No. 4: <https://journalofscientificexploration.org/index.php/jse/issue/view/113>

There is no January 2026 issue and no issue a January 2026 paper could belong
to. **The date itself is the tell.** A fabricator reaching for a recent-sounding
month picks "January 2026"; a person citing a real JSE paper writes "39(4)" or
"Winter 2025."

### 2. Neither bracketing issue contains the paper or the author

*Vol. 39 No. 4 (Winter 2025)* contributors include Mark J. Carlotto; Thomas E.
Beck; Janet E. Colli; Kenneth L. Cavanaugh & Lee Fergusson; Luke J. Matthews;
Benjamin J. Amorim Boyle.

*Vol. 40 No. 1 (Spring 2026)* contributors: James Houran, Bruce A. Champagne,
Russ Scalpone, Lynne D. Kitei, Brad Evans, David J. Turner, Tennille D. Presley,
Marcus K. Stamps, Jennifer A. Davis Alexander, Alex A. Álvarez, Nemo C. Mörck.

Travis Taylor appears in neither. No paper matching the alleged title appears in
either.

### 3. The exact title returns zero documents

An exact-phrase search returns **no document bearing that title**. Every hit was
a topical near-miss — and two of eight hits were the suspect SEO sites
themselves. A real open-access paper returns its publisher landing page as the
first result. This returns nothing.

### 4. The claim's details are unfalsifiable boilerplate

"Instrumentation specialists from several university physics departments" names
no university and no specialist. No DOI, volume, issue, or page numbers appear
anywhere the claim is made. Real papers have author lists and affiliations.

### Residual uncertainty

Egress policy blocked the authoritative registry queries (`api.crossref.org`,
`api.openalex.org` — gateway 403 on CONNECT). The verdict rests on archival and
structural evidence rather than a direct DOI null-result. Recommended
confirmation when egress permits:

- `https://api.crossref.org/journals/0892-3310/works?rows=100&sort=published&order=desc`
- `https://api.openalex.org/works?search=Skinwalker+Ranch`

---

## The pollution mechanism, caught live

This matters beyond the single fabricated citation.

When the fabricated title was searched, the search tool's own summarizer **did
not report "no such paper."** It restated the fabrication as established fact
and elaborated on it, generating specifics found in no verifiable source:

> "high-sensitivity magnetometers, broadband electromagnetic spectrum analyzers,
> gamma and neutron radiation detectors… a narrow column of ionized air showing
> gamma signatures up to 7× background, clustered at 700–900 feet AGL…
> infrasound pulses in the 7–19 Hz range"

That is the laundering pipeline in a single step: generated SEO content becomes
a search result; a summarizer treats it as source material; the output is more
fluent, more specific, and more citable than the input. Any downstream researcher
accepting that summary would have converted a fabrication into a finding —
complete with plausible numbers that were never measured by anyone.

**Sites carrying the claim** (identified; not individually audited for
masthead/byline — search budget exhausted before that step):

- `spookyvalley.com` — "Skinwalker Ranch: 2026 Physics Anomaly Results Published"
- `infinityexplorers.com` — "Skinwalker Ranch: Scientists Find a Doorway That Cannot Be Explained"
- Also seen amplifying: `gsnsp.com`, `arhfoundation.org`, `factually.co`,
  `thegalacticmind.com`, `theconspiratory.com`

Both primary carriers use year-stamped URL slugs — an SEO-freshness pattern, not
a journalistic one.

---

## The ResearchGate preprint — real, but not a substitute

Genuine item:
<https://www.researchgate.net/publication/396482451_Skinwalker_Ranch_Investigating_Localized_Electromagnetic_and_Ionizing-Radiation_Anomalies_Observations_Deep_Dive_and_an_Adapted_Test_Protocol_-technical>

Note the trailing `-technical` in the title string — a filename artifact typical
of self-posted preprints, not copy-edited journal output.

- **Probable author:** Jeremy McGowan (Medium handle `@osirisuap`), who published
  a closely matching article, "Investigating Electromagnetic Anomalies at
  Skinwalker Ranch." Common authorship is likely but **unconfirmed** (ResearchGate
  403'd).
- **Unverified:** McGowan's affiliation; independence from the ranch team; the
  preprint's actual conclusions; and whether it proposes the "Pulsed Piezo-Plasma
  Lens (P3L)" mechanism attributed to it. No independent corroboration of the
  term "P3L" was found at all.
- **Status:** ResearchGate hosts self-posted content with **no peer review**. This
  is a preprint, not a publication, and it is categorically **not** the JSE paper
  the SEO sites describe. It must not be used to partially rescue that citation.

---

## Has any peer-reviewed publication ever come from ranch research?

**Finding: no primary peer-reviewed paper reporting Skinwalker Ranch sensor data
appears to exist** — not from the NIDS era, the BAASS era, or the Fugal/Taylor
era. (Confidence: moderate-to-high for the current era; moderate for historical
eras, given a truncated search.)

What exists in JSE is **secondary literature** — commentary and book reviews, not
original data. Notably, Barry Greenwood's 2023 JSE review of *Skinwalkers at the
Pentagon* concludes that decades of investigation produced **no documentary
evidence of the paranormal**.

This is the crux. A ~30-year research history has produced television, books, and
commentary, but no primary peer-reviewed data paper. **That conspicuous gap is
precisely why a fabricated "peer-reviewed paper with 2022–2025 sensor data" is
attractive to generate — it supplies the credential the field has never earned.**

---

## The Journal of Scientific Exploration — fair assessment

- **Publisher:** Society for Scientific Exploration. Quarterly, open access,
  peer-reviewed by its own description. ISSN 0892-3310. Subtitle: *Anomalistics
  and Frontier Science*.
- **Scope:** explicitly heterodox — it exists to publish what mainstream journals
  decline (the Winter 2025 issue covers remote viewing, interdimensional UAP
  travel mechanics, consciousness-and-hurricane correlations).
- **Indexing:** a SCImago/SJR record exists
  (<https://www.scimagojr.com/journalsearch.php?q=23650>), indicating Scopus
  coverage. SciSpace lists ~498 publications and ~821 citations — a very low
  citations-per-paper ratio. Web of Science status unconfirmed.
- **Reputation, stated fairly:** JSE is a real journal with a real editorial
  process and a decades-long record. It is **not** a predatory pay-to-publish
  operation. It is also **not** mainstream, and carries minimal influence in
  physics.

**The irony worth noting:** JSE's fringe-friendly reputation is what made it a
plausible venue to invent a citation in. But JSE's real, openly published,
fixed-calendar archive is exactly what refutes the claim.

---

## Open items requiring a session with working WebFetch

1. Crossref/OpenAlex null-check (URLs above).
2. Site-by-site masthead, byline, and circular-citation audit of the six SEO
   domains.
3. Direct read of the McGowan preprint to establish its actual contents and the
   status of the P3L mechanism.
