# Agent D — Physical Sciences Adversarial Analysis

> **Scope note:** Metabunk/Wikipedia/Skeptical Inquirer direct fetch returned 403 (egress
> policy). Metabunk content below is from search-result extraction and is second-hand where
> load-bearing. **Everything in the "Physics of the measurement" sections is
> first-principles and does not depend on those sources.**

**Bottom line up front:** Claims 1–6 and 9–12 have strong, specific, physics-forced mundane
explanations, and in several cases the anomalous interpretation is not merely unlikely but
**internally incoherent** (notably #1 and #2). Claim 7 has a mundane explanation close to
certain. Claim 8 is mostly resolved by a 45-year-old federal investigation, but a subset of
2019–2021 Pacific Northwest cases is **genuinely unresolved as to agent** and is not
force-fit. The single most damning finding is uniform: **no raw data has been released for
any claim, and no discriminating test has been performed for any claim.**

---

## 1. Laser beam "interrupted mid-air, then continues"

**Physics.** This is decisive: **you cannot see a laser beam from the side at all.** In
clean air you see nothing. Side visibility comes entirely from light scattered *out* of the
beam toward the camera:

- **Rayleigh scattering off air molecules:** ~1.2×10⁻⁵ m⁻¹ at 550 nm at sea level. For a 1 W
  laser at 100 m viewed with a 1 cm² aperture, collected flux is ~10⁻¹³ W per metre of beam.
  **A consumer camera cannot see this.**
- **Mie scattering off aerosols:** ~1×10⁻⁵ m⁻¹ in very clean air to ~10⁻³ m⁻¹ in haze —
  **one to two orders of magnitude above Rayleigh** in the boundary layer.

**The visible beam is an aerosol tracer.** Apparent brightness at height *z* is proportional
to local aerosol scattering coefficient β_sca(z), **not to the beam's existence.** A "gap" is
a statement about **where the dust is**, not where the light is.

**Ranked mundane explanations**

1. **Layered aerosol structure — bright surface layer, clean slot, bright residual layer
   aloft.** Not exotic; it is the *standard* nocturnal boundary-layer structure that every
   ceilometer in the world shows. After sunset a shallow stable boundary layer (50–300 m)
   traps aerosol near the surface; above it a cleaner entrainment zone; above that the
   residual layer of the previous day's aerosol-laden air. A vertical beam through this stack
   looks **exactly like: bright, gap, bright.** *The Uinta Basin is notorious for
   exceptionally strong, persistent temperature inversions* — they drive the basin's
   documented wintertime ozone episodes. **This explanation predicts the observation,
   including the resumption above the gap, with no free parameters.**
2. **Camera dynamic range, tone curve, codec banding.** 8-bit H.264/HEVC quantization turns
   smooth low-contrast gradients into flat blocks with hard edges.
3. **Rolling shutter × modulated source.** The leading Metabunk candidate. *Caveat honoured:*
   readout is normally along the long axis and the stills were portrait, so banding should run
   sideways — unless footage was rotated.
4. **Atmospheric turbulence** if the claim is power-meter-based.
5. **Post-production alteration** — a **contested forum allegation, not established.** That it
   cannot be checked without raw files is itself the point.

**What the anomalous reading requires — and why it collapses.** An opaque obstruction needs
optical depth τ ≳ 3 and lateral extent ≥ beam diameter. **But if the object is opaque, there
is no beam above it.** An object that removes the beam at height *h* yet permits a collimated
beam of identical direction, divergence, and polarization above *h* is not a known passive
material. The only way to have the beam gone at *h* and back above *h* is for **the light to
be present throughout and only the scatterers to be missing — which is the mundane hypothesis,
verbatim.** Additionally, a real obstruction would be *illuminated* — a bright terminal spot.
None is presented.

> **This is the rare case where the anomalous interpretation is not just improbable but
> self-refuting given the stated observation.**

**Discriminating tests:** (1) fly a drone with a diffuse white target or 532 nm filtered
photodiode up through the gap on camera — **a few hundred dollars, one evening**; (2)
co-located ceilometer/backscatter lidar profiling aerosol vs. altitude; (3) radiosonde
temperature/humidity profile; (4) parallel global-shutter camera; (5) wavelength dependence
(aerosol Ångström exponent ~1–2 vs. broadband obstruction); (6) release RAW stills and
uncompressed video with settings, timestamps, and coincident METAR.

**Done? No — none of the six.**

**Addendum on power-meter claims.** Over a long path, **scintillation** from refractive-index
turbulence produces log-normal fluctuations; in saturated turbulence the scintillation index
approaches 1, meaning ~100% swings with deep multi-dB fades lasting ms to tens of ms. Add beam
wander and **bats and insects** — a dusk-active rural site with a 2–5 cm beam sees crossings
continuously; a known nuisance in free-space optical links. **A "beam break" under 100 ms is
meaningless without turbulence characterization and a control path.**

---

## 2. LiDAR "structures under the mesa"

**Physics.** Lidar is **time-of-flight ranging with a near-IR pulse** — typically 905, 1064,
or 1550 nm. Absorption and scattering in soil and rock at these wavelengths is enormous;
**penetration depth into rock is micrometres.**

Lidar "penetrates" in exactly two senses: **geometric penetration of vegetation canopy**
(photons find gaps between leaves — this is why bare-earth DEMs work; it is not material
penetration), and **bathymetric lidar at 532 nm through clear water** to ~1–3 Secchi depths.

> **There is no lidar wavelength, power, or configuration that images through rock. A claimed
> lidar detection of a subsurface structure is a category error, not a marginal measurement.**

**Ranked explanations for "anomalous returns":** (1) **occlusion shadow rendered as a void** —
where the scanner had no line of sight there are no points, and TIN interpolation turns a data
hole into an apparent cavity; (2) **multipath** — a pulse bounces off a specular surface,
over-reports range, and plots *below* the true surface as a phantom subsurface layer; (3)
**retroreflection / range walk / blooming**; (4) **multiple-time-around returns** — at high
PRF the return from pulse *n−1* arrives inside pulse *n*'s window, fabricating a coherent
phantom surface at fixed offset; (5) **GNSS/IMU trajectory error near a cliff face** —
severe and underrated: a several-hundred-foot wall halves sky view, cuts satellite count,
raises PDOP, injects pseudorange multipath; the SBET degrades and **the entire point cloud
smears**; (6) **airborne targets** — birds, insects, dust, precipitation.

### GPR reality check — this matters more than the lidar

GPR depth of investigation is governed by **electrical conductivity**:

| Medium | Realistic 100 MHz penetration |
|---|---|
| Ice | 100s of m |
| Dry clean quartz sand / dry limestone | 10–30 m |
| Moist silt | 2–5 m |
| **Clay-rich shale / marlstone / saline** | **0.5–3 m** |

The Uinta Basin section — Green River Formation lacustrine marlstone and organic-rich oil
shale with evaporitic minerals (nahcolite, dawsonite), overlain by Uinta and Duchesne River
mudstone/sandstone — is **exactly the clay-rich, conductive, evaporite-bearing case where GPR
dies within metres.** **Claiming GPR imaging of a structure hundreds of feet into that mesa is
not physically credible.** The methods that *do* have that depth of investigation — seismic
reflection/refraction, ERT, gravity — have not been shown.

### Magnetometry reality check
Weakly magnetic sediments (low signal); **a working ranch in an oilfield basin is saturated
with anthropogenic iron** (fencing, well casing, buried pipe, abandoned drill string,
culverts, cattle guards, the rig itself); **diurnal geomagnetic variation is 20–100 nT** and
requires a simultaneously-recording base station — without one you "discover" the daily Sq
variation; depth-to-source inversion is famously non-unique. **A magnetic anomaly can never
say "manufactured."**

### Base rate of false anomalies
In applied geophysics that actually gets ground-truthed — **UXO remediation** — the
overwhelming majority of excavated targets are geology, modern scrap, or nothing.
Pre-classification false-positive dig rates **above 90%, often exceeding 100:1**, are routine.
**"We found an anomaly, therefore something is there" has a terrible historical track record.**

**Discriminating tests:** release raw LAS/LAZ plus SBET trajectory, calibration report, and
flight logs (multipath, MTA, and registration error are detectable by any specialist in an
afternoon); repeat on different headings/altitudes/days with a different vendor; run seismic
or ERT; core the interval with a logged depth record and chain of custody.

**Done? No.** And on the crucial one: **the recovered ceramic reportedly came from a spoils
pit, with no logged depth interval. That is a fatal chain-of-custody failure regardless of
what the material turns out to be.**

---

## 3. Drill bits breaking, shearing, "melting"

**Physics.** Bit destruction is **the normal terminal state of every drill bit.** Every bit
pulled receives an IADC dull grade recording wear and dull characteristic (BT broken teeth,
CT chipped, WT worn, HC heat checking, RO ring out, CR cored). **Bits are consumables.**

**Geology:** Duchesne River Fm (fluvial sandstone/mudstone) → Uinta Fm → Green River Fm
(lacustrine marlstone, oil shale, carbonate, **silicified zones and chert**) → Colton/Wasatch.
The operative feature is **hard–soft interbedding with carbonate and silicified stringers —
the single most destructive lithology for both PDC and roller-cone bits.** Chert is Mohs 7
with UCS that can exceed 300–400 MPa.

**Ranked mundane explanations**

1. **Stick-slip torsional oscillation.** The bit stalls, torque builds in the string, then
   releases. **Instantaneous downhole bit RPM during the slip phase can reach 3–10× surface
   RPM** — precisely the regime that chips and spalls PDC cutters. Field studies routinely
   find stick-slip in the majority of drilling hours in hard/interbedded rock.
2. **Bit whirl (especially backward whirl).** Cutters travel backwards under impact loading;
   produces overgauge, lobed hole, chipped cutters. **A mechanical instability, not an
   obstruction.**
3. **Hard-stringer interface severity** — soft mudstone into silicified stringer at constant
   WOB produces an impact spike. Classic PDC killer.
4. **Wrong WOB/RPM and inadequate hydraulics.** Note: reports describe drilling **upward into
   the mesa** — upward/highly-inclined holes have vastly worse cuttings evacuation, causing
   **regrind of cuttings under the bit**, which destroys bits fast, independently of anything else.
5. **Thermal damage presenting as "melting."** Sintered polycrystalline diamond **graphitizes
   and suffers cobalt-binder thermal-expansion damage above ~700–750 °C.** What fails is not
   diamond — **diamond doesn't melt** — but the cobalt binder, the WC-Co substrate, and the
   steel body. A blued, heat-checked, smeared bit face is entirely ordinary. **Crucially, the
   show's "without an associated temperature spike" framing uses *surface* or *near-bit*
   temperature, which does not measure the cutter–rock flash temperature at the contact patch
   — those differ by many hundreds of degrees.**
6. **Bit balling.** Green River marlstone plus water is a textbook balling case.
7. **Junk in hole.** A lost cone, a shed cutter, casing, or lost tooling. **"We hit something
   harder than tungsten carbide" is the standard field description of junk — and of chert.**

**Discriminating tests:** SEM fractography (impact spalling vs. fatigue vs. thermal
delamination are well-characterized and distinguishable); metallography for an
untempered-martensite "white layer"; microhardness traverse (directly measures peak
temperature and dwell); Raman sp²/sp³ ratio for graphitization; EDS/XRF on the smear (bit's
own alloy → friction, or foreign material → a real question); junk basket / magnet sub /
downhole camera; **a downhole drilling-dynamics memory sub (kHz tri-axial accelerometer +
downhole RPM) — commercially standard, and this alone would settle it**; core the interval and
measure UCS and Cerchar abrasivity.

**Done? No** — no fractography, metallography, hardness traverse, Raman, dynamics data, IADC
dull sheets, or core.

> **Honest assessment: this claim has the weakest anomalous case of the twelve.** The prior on
> "drill bit destroyed while drilling upward through interbedded shale and chert with unknown
> hydraulics" is overwhelming, and the diagnostic tests are cheap, standard, and were not run.

---

## 4. Drones failing / losing telemetry

**Physics.** Three independent RF-dependent subsystems: the **command/video link** (2.4/5.8
GHz ISM); **GNSS**, at ~**−130 dBm** at the antenna — an extraordinarily weak signal, trivially
jammed or desensed; and the **magnetometer** for heading (corrupted heading + valid position =
the flight controller fights itself). Plus a non-RF constraint: **rotor thrust scales with air
density.**

**Ranked mundane explanations**

1. **Self-inflicted RF interference.** A TV production runs dozens of transmitters — *and the
   show deliberately fires high-power transmitters as experiments.* Front-end desense of a
   drone receiver by a nearby high-power emitter is **not subtle physics; it is guaranteed.**
2. **GNSS jamming/desense in L1 — and here is the elegant part.** The show's own "anomalous
   1.6 GHz signal" sits in the GNSS/Iridium band. If a real emitter at ~1.5–1.6 GHz exists on
   that property, **it explains both claims at once with one cause.** Note the S7E3 detail:
   **GPS L1 C/A and Galileo E1 are both at 1575.42 MHz; BeiDou B1I is at 1561.098 MHz;
   GLONASS L1 is FDMA across ~1598.06–1605.38 MHz.** A narrowband emitter at ~1575 MHz kills
   GPS *and* Galileo while leaving GLONASS and BeiDou functional.

   > **That is the textbook signature of an ordinary L1 jammer. As reported, the observation
   > argues *for* a terrestrial jammer, not against it.**
3. **GNSS multipath and sky-view occlusion at the mesa wall.** Urban-canyon studies show
   accuracy degrading from 3–5 m to 15–30 m. DJI craft drop to ATTI mode, drift, and — with an
   inexperienced pilot — hit the wall. **"Lost comms around 800 feet" is the geometry of losing
   line-of-sight over a mesa.**
4. **Compass interference** from iron-bearing soils, buried casing and pipe (an oilfield
   basin), the rig, vehicles. Produces the "toilet bowl" — widening spirals — then a crash.
5. **Density altitude and battery sag.** The ranch is ~5,000–5,700 ft. At 35 °C, density
   altitude reaches ~8,500–9,000 ft, where air density is ~75% of sea level; hover demand
   forces ~15% higher RPM and disproportionately higher current → LiPo sag → low-voltage
   auto-land or hard cell collapse. **In cold, LiPo internal resistance more than doubles.**
6. **ESC/motor/prop failures** on high-hour production airframes. 7. **Pilot error** — the
   largest category in every sUAS dataset. 8. **Geofencing / automatic RTH** misread as malfunction.

**Base rate:** consumer drone loss runs ~1 per few hundred to few thousand flight hours.
Across multiple seasons in a cluttered, high-altitude, RF-dense, magnetically-contaminated
environment, **multiple losses are the expected outcome.**

**Discriminating test — and the evidence already exists.** **Publish the flight logs.** The
DJI onboard `.DAT` records at 5–200 Hz: IMU, magnetometer XYZ, GPS satellite count and health
flags, per-cell battery voltages, motor current and RPM, ESC error codes, downlink signal
strength. **It states unambiguously whether the craft lost GNSS lock, saw a magnetic anomaly,
browned out a cell, or threw an ESC fault.** Pair with timestamped spectrum captures of
1.5–1.6 and 2.4/5.8 GHz, plus a control drone flown 20 km away simultaneously.

**Done? No.** "Telemetry analysis" has been described verbally on air; no logs released for
any incident. **The definitive evidence is sitting on the aircraft's own storage.**

---

## 5. Radiation spikes

**Baselines.** Outdoor ambient dose rate at ~1,600 m on the Colorado Plateau is typically
**0.01–0.03 mR/hr**, running above the US average for two compounding reasons: altitude (the
cosmic component roughly doubles per 1,500–2,000 m) and **uranium-bearing geology** — the
Colorado Plateau is the largest historical US uranium source, with weak mineralization
widespread through the Uinta Basin.

- **"A few tenths of a mR/hr"** = 3–30× baseline. **Entirely ordinary** over mineralized
  outcrop, mine spoil, phosphate, granite, or radon-daughter plate-out. **Not a finding.**
- **"A few mR/hr"** is genuinely elevated *if real* — but see artifacts.

**Poisson statistics — the decisive point.** A GM tube at background counts ~20–60 cpm, and
σ = √N. On a 6-second window you collect ~2–6 counts, so **σ/N is 40–70%.** Consumer meters
display a short rolling-window rate, so they display **2–4× excursions constantly, from noise
alone.** A "spike" is meaningless without the raw count rate, integration time, and a
pre-specified threshold in σ.

**Radon and daughters.** Rn-222 → Po-218 → Pb-214 (t½ 26.8 min) → Bi-214 (t½ 19.9 min, gammas
at 609/1120/1764 keV). Outdoor radon varies by an order of magnitude **diurnally**, peaking
just before dawn under a stable nocturnal inversion — **the very same inversion invoked in
claim #1.** Separately, **rainfall washout of radon daughters produces a sharp
factor-of-several gamma increase lasting 30–90 minutes**, decaying with the Pb-214/Bi-214
half-lives. This trips environmental monitoring networks routinely. **If a spike coincides
with rain onset, it is washout, essentially without exception.**

**RF pickup — the most relevant artifact here.** A GM tube runs at 400–900 V on a
high-impedance anode; the discriminator triggers on transients of millivolts to volts. **A
nearby transmitter, arcing relay, VFD on a pump jack, vehicle ignition, or ESD event injects
counts directly into the pulse chain.** This is documented, and it is **maximally relevant at
a site that deliberately fires high-power transmitters and then reads a nearby counter.**

> **The reported correlation — "radiation spikes when we transmit" — is the predicted
> artifact, not evidence against it.**

**Detector taxonomy**

| Detector | Distinguishes | Used? |
|---|---|---|
| GM tube | Counts only. No energy info | Yes — inadequate |
| Ion chamber | True exposure rate, energy-flat | Not shown |
| **NaI(Tl) / CZT spectrometer** | **Full spectrum — K-40 1461, Bi-214 609/1764, Tl-208 2615 keV. Settles everything in minutes** | **Not shown** |
| Thin-window pancake / ZnS(Ag) | Alpha — only within ~2–3 cm (α range in air ≈4 cm at 5 MeV). **Any standoff "alpha detection" claim is physically impossible** | — |
| He-3 / BF3 + moderator | Neutrons, best γ rejection | Not demonstrated |
| Li-6/B-10 or plastic scintillator | Nominally neutrons — **highly γ-sensitive without proper pulse-shape discrimination** | Unknown |

**On neutrons specifically.** Neutron detection is hard and gamma false positives are the
central engineering problem. Per the GAO technology assessment, **He-3 tubes — the gold
standard — still misclassify roughly 4 gamma pulses per 10,000**, and most alternative solid
scintillators "are sensitive to both neutron and gamma interactions and are prone to producing
false neutron counts." Even with advanced PSD, the *design objective* is no more than one
false positive per **10⁶** gamma interactions. **A scintillator "neutron detector" without
demonstrated PSD, operated in a rising gamma field, is a gamma detector wearing a label.**
Separately, **cosmic-ray neutrons are a large, real, altitude-dependent background** — ~2.5–3×
sea level at 1,600 m, with genuine solar-modulation variability publicly logged by the
worldwide neutron monitor network.

**Discriminating tests:** gamma spectroscopy on every excursion; **simultaneous co-located
control detector off-site — non-negotiable and never done**; log transmitter state alongside
the counter and shield the tube, then repeat; log rainfall and time-of-day and fit spike decay
against the 26.8/19.9 min half-lives; for neutrons, Cd-difference or moderator-in/out plus raw
PSD data cross-checked against the neutron monitor network; publish calibration certificates
and full time-series.

**Done? No** — none.

> **Note the self-undermining datum:** the show's own S6E7 conclusion that a major gamma spike
> may have been **"spoofed"** is a **data-integrity admission**, and it should retroactively
> reduce confidence in every reading from that same detector chain.

---

## 6. The "superconductor" / anomalous material

**What a superconductivity claim actually requires** — fully standardized, not negotiable:

1. **Zero resistance by four-point (Kelvin) measurement**, R falling to the voltmeter's noise
   floor (nV) and *staying there* below T_c. Two-point measurements are worthless.
   **Nothing described on the show is a resistance measurement at all.**
2. **A reproducible T_c**, appearing at the same temperature on cooling and warming, shifting
   downward under applied field and transport current.
3. **The Meissner effect** — *flux expulsion*, demonstrated as χ → −1 (SI) in a SQUID or VSM,
   with characteristic ZFC/FC splitting.
4. **Reproducibility in independent labs** from a stated composition and synthesis route.

**Levitation proves nothing.** Ordinary diamagnets levitate: pyrolytic graphite floats over
neodymium magnets at room temperature; a 16 T magnet levitates a live frog. Distinguishing
diamagnetic repulsion from type-II flux pinning requires an actual measurement. **LN₂-specific
confound: vigorous nitrogen boiling produces a vapour cushion that floats light objects** — a
Leidenfrost-like gas-film effect — and buoyancy/thermal-contraction effects are easy to
mistake for levitation.

> **An internal inconsistency worth flagging:** a shard whose XRF shows **Ni, Fe, and Co — the
> three room-temperature ferromagnets** — should be **attracted** to a magnet, strongly.
> "Contains Ni/Fe/Co" and "is repelled by a magnet" are in tension and warrant scrutiny of the
> measurement before any exotic inference.

**The "self-healing" observation has a completely standard explanation: SEM charging.**
Uncoated or poorly-grounded insulating ceramics accumulate charge under the beam, producing
image drift, contrast inversion, apparent feature migration, and hole-like artifacts that
change with dwell time, accelerating voltage, and scan parameters. Add **electron-beam-induced
carbon contamination deposition**, which literally fills and darkens scanned areas over time,
and beam-induced desorption of adsorbed water. Per the Metabunk discussion, the team used "the
time-tested diagnostic technique of turning it off and on again," got a new image, and "the
holes seem to vanish."

> **Rescanning after a power cycle and getting a different image is the diagnostic signature of
> a charging artifact, not of self-healing.**

**Provenance is the deepest problem.** The material came from a **spoils pit**, with no logged
depth interval and no chain of custody. Drilling spoils on a working ranch in an oilfield basin
contain mud additives, cement, casing scale, hardfacing, and refractory debris. **Ni/Fe/Co is
the composition of ordinary superalloys and hardfacing.** And: the Metabunk thread notes that
**the ranch owner donated $5 million to Utah Valley University**, the institution performing
the analysis. **That is not proof of anything, but it is a conflict of interest any referee
would require disclosed — and the broadcast did not disclose it.**

### Historical base rate — every well-documented case has resolved terrestrial
- **Ubatuba (Brazil, 1957) magnesium** — **Mg isotope ratios fall within terrestrial limits.**
  High-purity Mg was commercially available in 1957.
- **"Art's Parts" — the single most-hyped "UFO metamaterial."** Analyzed by **Oak Ridge
  National Laboratory** for AARO (report released 2024): **terrestrial in origin.** Mg and Pb
  isotopic compositions within expected terrestrial values, and it **does not meet the
  theoretical requirements to function as the claimed terahertz waveguide.** *A national lab,
  on the flagship sample, negative.*
- **Nolan, Vallée, Jiang & Lemke (2022), *Progress in Aerospace Sciences* 128:100788.**
  Precision matters: largely a **methods review** with a case study, in an **invitation-only
  review journal**. The case-study sample showed **isotopic ratios consistent with terrestrial
  norms.** It did **not** report an anomalous isotopic signature. **Even the most-cited
  peer-reviewed UAP materials paper is not a positive result.**
- **LK-99 (July 2023) — the cautionary base rate for this exact failure mode.** An extraordinary
  superconductivity claim supported by a levitation video and a resistance drop. Within weeks:
  no lab reproduced zero resistance or a genuine Meissner transition; the resistance drop was
  attributed to a **Cu₂S impurity's structural transition**; the levitation video showed only
  one edge lifting, consistent with ordinary ferro-/dia-magnetism in an inhomogeneous sample.
  **From claim to conventional explanation in under two months — because the raw claims were
  specific enough to test and the synthesis was published.**

**Discriminating tests:** four-point R(T) 300→4 K in applied field (PPMS); χ(T) ZFC and FC
(SQUID/VSM); specific heat C(T)/T showing a jump at T_c; XRD phase ID; EPMA/ICP-MS composition;
independent replication from a stated synthesis; logged core interval with chain of custody and
blind submission. For the SEM claim: **sputter-coat with Au/Pd or carbon, re-image at multiple
accelerating voltages and dwell times, image in variable-pressure mode, and image a
known-mundane ceramic control under identical conditions. If the control "heals" too, done.**

**Done? No.** No peer-reviewed publication reports a superconducting transition in ranch
material. No R(T), no χ(T), no C(T), no blind replication.

---

## 7. "Rigor mortis not setting in"

**Physiology.** After death, anaerobic glycolysis drives pH from ~7.2 toward 5.4–5.7 and
consumes ATP. **Myosin head detachment from actin requires ATP binding**, so below ~1 µmol/g
permanent actomyosin cross-bridges form — that is rigor. **Resolution is not ATP returning; it
is proteolysis** — calpains and cathepsins degrading the Z-disc, titin, desmin, nebulin.

**The human textbook (2–6 h onset) is the wrong reference.** The relevant literature is bovine
meat science:

- **Well-fed, well-rested cattle exsanguinated at slaughter: 9–12 hours may elapse before
  onset** — high glycogen delays it.
- **Mode of death matters enormously:** ~4.2 h after bleeding death, ~2 h after electrical
  death, ~1.2 h after drug-induced death.
- **Antemortem exertion or stress depletes glycogen**, accelerating onset dramatically; violently
  used muscle groups can show **cadaveric spasm**.
- **Temperature is the dominant modifier.** Postmortem glycolysis follows roughly Q₁₀ ≈ 2–3, so
  a carcass at 35 °C runs 2–4× faster than at 15 °C. The literature is explicit that rigor
  **onsets early and rapidly at high temperature, requiring only a shorter time for
  resolution**, versus late and slowly at low temperature.
- **Large bovines have enormous thermal mass, and the rumen keeps fermenting after death.**
  Core temperature can *rise* postmortem — "heat toning"/"bone taint," with core temps above
  40 °C documented hours after death.

> **This cuts directly against the inference. High ambient temperature does not just accelerate
> onset — it accelerates resolution. In a large bovine in summer heat, rigor can come and go
> quickly.**

**Ranked explanations:** (1) **the carcass is LATE, not fresh** — death 12–36 h earlier in warm
weather; rigor came and went. A warm, flaccid, bloated carcass is a *late* carcass; bloat,
greenish flank discoloration, skin slippage, and hair slip mark this stage and are easy for a
non-veterinarian to misread. **This is by far the most likely error.** (2) genuinely EARLY —
death 30–90 min prior; (3) **rigor was broken mechanically** — once broken by handling, it does
not return in that muscle group; (4) assessment error — rigor is graded in defined muscle
groups by trained personnel, and palpation of a 500 kg animal by a non-specialist is
unreliable; (5) emaciated or very young animals may show rigor too weakly to detect.

**Discriminating tests:** verified time of death (witness, trail camera, GPS/activity collar);
**deep core temperature plus ambient log through a Henssge-type cooling model**; a
veterinarian's written graded assessment; **vitreous humour potassium** — rises approximately
linearly with PMI, the single best chemical PMI marker in large animals, cheap and quantitative;
field necropsy with histology; **forensic entomology** — blowfly instar staging gives PMI to
within hours in warm weather, completely independent of rigor.

**Done? No** — none published.

> **The mundane explanation here is not merely available, it is near-certain. "Rigor hadn't set
> in" cannot distinguish "died 45 minutes ago" from "died yesterday in the heat," and without a
> time of death it carries no information at all.**

---

## 8. Cattle mutilation "surgical precision"

**The mechanism, in sequence.** (1) The animal dies of ordinary causes — background adult
cattle mortality in extensive range operations runs ~1–4%/yr, higher for calves: lightning,
bloat, clostridial disease, pneumonia, anaplasmosis, calving complications, larkspur toxicity,
nitrate poisoning. **Dead cattle are common.** (2) **Blowflies oviposit within minutes to a
couple of hours** at moist orifices; eggs hatch in ~8–24 h at summer temperatures; larvae
secrete proteolytic enzymes that dissolve tissue **at a sharp margin set by where the maggot
mass sits** — the direct source of "clean, straight-edged" removals. (3) **Birds take the eyes,
tongue, lips, and anus first**, because a mature cow's hide is 5–9 mm thick and extraordinarily
tough.

> **The list of "surgically removed" organs is precisely the list of avian and insect access
> points. That is the whole explanation for the pattern.**

(4) **The hide edges desiccate** — collagen shrinks as it dries, curling the margin into what
looks like a knife cut, sometimes with a bevelled or "cauterized" appearance. Under
magnification the same edge is irregular and shows beak/tooth scalloping. (5)
**"Exsanguination"** — dead animals do not bleed; blood settles by gravity into the dependent
side and clots. **But an average cow holds 30–40 litres of blood; actually removing it would
leave an enormous pool and a collapsed vascular system, neither of which is ever reported.**
(6) **Bloat** stretches the hide taut and tears existing openings into smooth clean-looking
ovals. (7) **"No tracks"** — on hard, dry, rocky rangeland (the Uinta Basin exactly) nothing
leaves tracks. **Absence of tracks is not absence of predators.**

**The formal investigations.** **Kenneth Rommel, *Operation Animal Mutilation*** — FBI-funded
(LEAA grant), New Mexico, May 1979 – June 1980, **297 pages**, **25 mutilations personally
inspected**, every one attributed to predation/scavenging plus decomposition. Rommel: "the
rough jagged nature of the incisions together with the evidence at the scene clearly indicates
that the carcass was damaged by predators and/or scavengers," and, to the FBI in March 1980,
**"No factual data has been supplied supporting these theories."** Earlier state investigations
(Colorado 1975, Nebraska, Kansas) concurred. **Staked-carcass control experiments have
repeatedly reproduced the full "mutilation" appearance with ordinary scavengers on camera.**

### Where this analysis declines to force a debunk

The **2019–2021 Pacific Northwest cases** deserve honest treatment. Wheeler County, Oregon
reported 5+ confirmed cases since 2019; Crook County had **six carcasses in seven days from 27
February 2021**. Deputy Jeremiah Holmes said he was "absolutely convinced it's not predators";
officers noted scavengers "appeared to have hardly touched these carcasses."

**That is a genuine complication. Late February in central Oregon has essentially zero blowfly
activity, so the insect leg of the standard model does not apply to those specific cases.** Two
honest observations pull in opposite directions: cold also drastically slows decomposition,
*preserving* the clean-edged appearance and keeping carcasses from being consumed; and the
removal pattern is still the avian/orifice pattern. But some cases remain formally unsolved as
to agent, and there is a plausible human-actor hypothesis with motive and means.

> **The accurate statement: a subset of individual modern cases is unresolved as to who or what,
> while no case in fifty years has produced physical evidence pointing away from ordinary
> terrestrial causes.** This is a general Western-US ranching phenomenon, not Skinwalker-specific.

**The decisive test:** **necropsy by a veterinary pathologist with histology of the wound
margins.** Predator/insect margins show tissue crushing, irregular collagen, and hemorrhage-free
avulsion; a scalpel cut shows a clean transected collagen plane. **These are trivially
distinguishable under a microscope. This single test resolves the "surgical precision" claim
outright.** Plus entomology for PMI, toxicology, trail cameras, staked-carcass controls.

**Done? Rarely, and not for the Skinwalker-associated cases.** No histology of wound margins
from any ranch case has been published.

---

## 9. "Systems being hacked"

**"Hacked" is an inference about *causation* drawn from an observation of *malfunction*.** The
observation is malfunction. Establishing intrusion requires forensic evidence of an ingress
path; establishing *anomalous* intrusion requires excluding every conventional one.

**Ranked mundane explanations:** (1) **ordinary internet-facing attack surface** — any exposed
SSH or RDP endpoint receives thousands of credential-stuffing attempts per day, and Mirai-family
botnets continuously scan all of IPv4 for default-credential IP cameras. **If they expose
cameras, they are being probed constantly. This requires zero anomaly and is essentially
guaranteed — the ranch's own IT account concedes it.** (2) credential phishing, password reuse,
leaked API keys — the overwhelming majority of real breaches; (3) **insider access** — TV
production turnover is high and provisioning informal; (4) **SD-card and storage corruption** —
consumer and counterfeit microSD fail at high rates; heat, vibration, and hot-unplug produce
truncated files, presenting exactly as "our footage was erased"; (5) **rural grid power
quality** — long single-phase feeders, reclosers, lightning, plus oilfield VFD harmonics; (6)
**grounding faults and ESD** — a high-desert site with very low humidity is an ESD nightmare,
and ground-potential rise from a nearby strike destroys copper Ethernet between buildings
lacking fibre isolation; (7) **their own RF experiments** — firing high-power transmitters near
unshielded USB 3.0, HDMI, and Ethernet corrupts data links and can reset devices; **USB 3.0 is
a well-documented radiator around 2.4 GHz.** *They are, plausibly, jamming their own
infrastructure on purpose and then reporting the result as an attack.*

**What the anomalous reading requires:** failures physically impossible for conventional causes
— e.g. **simultaneous, identical corruption on air-gapped, unpowered media** in separate
locations.

**Discriminating tests:** forensic disk images with documented hashes taken *before*
remediation; full NTP-disciplined auth logs on write-once storage; NetFlow or full pcap showing
the ingress path (or credibly showing its absence); firmware integrity verification;
power-quality monitoring correlated with incident timestamps; air-gapped unpowered control
media; pre-registered timing correlation corrected for multiple comparisons.

**Done? No.** **"We can't explain it" ranks below "we didn't look" until forensic images, logs,
and flow records exist.**

---

## 10. Telescope / camera / equipment failure — the quiet killer

Suppose the ranch runs **N ≈ 100** devices continuously. Annualized failure rates: indoor
consumer electronics ~2–10%/yr; SD cards and consumer drives substantially higher; **outdoor
sensors in a high desert with −20 to +38 °C swings, dust, UV, and daily condensation cycles:
realistically 20–40%/yr.**

At 25%/yr on 100 devices: **~25 failures/year ≈ one every two weeks**, entirely expected, with
nothing anomalous anywhere. Add batteries in cold, connector corrosion, **condensation on
optics at dawn** (driven by the same nocturnal inversion invoked in claims #1 and #5), dew on
telescope correctors, dust, UV-degraded jackets.

**Then apply the reporting filter.** A device that works is never mentioned; a device that fails
during an interesting moment becomes a data point.

> **If you have 100 devices failing one per fortnight, and an "interesting moment" every two
> days, the probability of at least one failure coinciding with *some* interesting moment over
> a season approaches 1. This manufactures correlation out of nothing.**

**Discriminating test:** **log every device's uptime continuously**, define "events" by a
pre-registered independent criterion, and compute failure rate during events vs. baseline with
a Poisson rate-ratio test. Deploy duplicate control instruments off-site.

**Done? No.** **No uptime denominator has ever been published, for any device, for any season.
Without it, no equipment-failure claim can carry evidential weight even in principle.**

---

## 11. RF signals (~1.6 GHz)

**What actually lives at 1.5–1.7 GHz** — one of the busiest satellite/aeronautical
neighbourhoods in the spectrum:

| Service | Frequency |
|---|---|
| **BeiDou B1I** | 1561.098 MHz |
| **GPS L1 C/A, Galileo E1, QZSS L1, SBAS/WAAS, BeiDou B1C** | **1575.42 MHz** |
| **GLONASS L1 (FDMA)** | ~1598.06–1605.38 MHz |
| **Iridium (up and down)** | **1616–1626.5 MHz** ← "1.6 GHz" |
| Inmarsat space-to-Earth / Earth-to-space | 1525–1559 / 1626.5–1660.5 MHz |
| Radio astronomy (protected) | 1610.6–1613.8 MHz (OH line, 1612 MHz) |
| L-band ATC / air surveillance radar | 1215–1400 MHz |
| Aeronautical mobile telemetry | 1435–1525 MHz |

**The stated "anomalous" characteristic is the textbook signature of Iridium.** Iridium is
TDMA/FDMA with **8.3 ms bursts on 41.667 kHz channels** — on a spectrum analyzer in max-hold, a
bursty, smeared blob. And critically: **because the satellites are LEO transiting at ~27,000
km/h, Iridium bursts Doppler-shift by up to roughly ±37 kHz over a ~ten-minute pass.** A
geostationary signal sits still in frequency; **a LEO signal genuinely drifts.**

> **So "it drifts across the spectrum, unlike a locked satellite signal" is not evidence against
> a satellite — it is the specific discriminator that identifies a *low-Earth-orbit* satellite.**

**"Dirty harmonics — smaller echo signals above and below" is a description of
spectrum-analyzer front-end overload and intermodulation** — artifacts *of the instrument*, not
features of the air. A wideband preamp plus broadband antenna near a strong emitter guarantees
intermod products across the band.

Local context: Utah hosts substantial DoD RF activity (UTTR, Hill AFB, Dugway) and is a heavy
AMT user; the Uinta Basin is an active oilfield with Inmarsat/BGAN terminals on sites and trucks.

**On the RTK/GPS-lock-loss claims:** an emitter near 1575 MHz destroys L1 lock. **This is the
same single cause that explains claim #4**, and the S7E3 detail that GLONASS/BeiDou craft
survived while GPS craft failed is essentially **a diagnostic fingerprint of a narrowband L1
jammer.**

**Discriminating tests:** (1) **the 10 dB attenuator test** — increase input attenuation by 10
dB; real signals stay at the same displayed amplitude, **analyzer-generated spurs drop by
20–30 dB.** *One knob, under a minute; every RF engineer does it reflexively.* (2) directional
antenna bearings from two locations; (3) **ephemeris correlation** with a pass predictor; (4)
**record I/Q and demodulate — Iridium is openly decodable** with `gr-iridium` /
`iridium-toolkit` on a cheap SDR. **If the "anomalous signal" decodes as Iridium frames, that
is conclusive and takes an afternoon.** (5) simultaneous control site 50 km away.

**Done? No** — no attenuator test, no bearings, no ephemeris correlation, no I/Q captures, no
control site. **Test #4 would be trivially decisive and has not been reported.**

---

## 12. The general methodological problem

Not one more claim — **the reason none of the preceding eleven can currently function as
evidence regardless of what is actually happening on that property.**

**No controls.** **Not one published measurement has a simultaneous, co-located control.**
Without a matched control site, "anomalous" means only "different from my expectation" — never
"different from a comparable place." **Every claim in this document would be transformed by a
single control station 50 km away.**

**No blinding.** Operators know when the interesting moment is and read instruments accordingly.

**No pre-registration.** Hypotheses, thresholds, and analysis choices are selected after seeing
the data — a garden of forking paths.

**The look-elsewhere effect, quantified.** Run **M** detectors with integration time **τ** over
duration **T**. Expected ≥3σ excursions from pure noise ≈ **M · (T/τ) · 0.0027**.

- 10 detectors, τ = 1 s, one 8-hour night: 10 × 28,800 × 0.0027 ≈ **780 three-sigma "events"
  per night, from noise alone.**
- Even at 5σ: ≈ 0.16 events/night per 10 channels — **several per month, still from nothing.**

> **Reporting one of these as "the anomaly" is not weak evidence; it is guaranteed output.
> Publishing excursions without stating M, τ, T, and a pre-registered threshold conveys zero
> information.**

**Texas sharpshooter.** The Triangle and the Mesa were defined *after* the events that made
them notable. Subsequent events there are then counted as confirming a hypothesis the locations
were selected to satisfy.

**Non-specialist operators.** **Every artifact identified in this document — GM-tube RF pickup,
SEM charging and carbon contamination, spectrum-analyzer intermod, lidar multipath and MTA
returns, GNSS multipath, radon washout, rolling shutter, LN₂ vapour-cushion levitation, codec
banding — is thoroughly known to the relevant specialist community and unfamiliar to a capable
generalist.** Not a slight; a structural prediction about what happens when many instruments
are operated by people expert in none of them.

**Commercial incentive and edit control.** **The mere possibility of undetectable
post-production alteration is disqualifying for evidence that exists only as broadcast footage.**

**No raw data — the decisive failure.**

| Claim | Data that exists but has not been released |
|---|---|
| Laser gap | RAW stills, uncompressed video, camera/laser specs, weather |
| LiDAR | LAS/LAZ point cloud, SBET trajectory, calibration report |
| Drill bits | IADC dull grades, fractography, downhole dynamics logs |
| Drones | DJI `.DAT` and `.txt` flight logs |
| Radiation | Count time-series, spectra, calibration certificates |
| Material | R(T), χ(T), C(T), XRD, chain-of-custody |
| Cattle | Necropsy reports, histology, toxicology |
| Hacking | Forensic images, auth logs, NetFlow |
| RF | I/Q captures, analyzer settings, bearings |

Mick West has documented attempting and failing to obtain even the raw text files from the 2021
bottle-drop experiment. **A claim that cannot be checked is not a scientific claim, independent
of whether it happens to be true.**

**No replication.** No independent team has run the same measurement with its own calibrated
instruments.

**Undisclosed conflict of interest.** The owner's **$5 million donation to Utah Valley
University** — the institution performing the materials analysis — was not disclosed in the
broadcast.

---

## Summary matrix

| # | Claim | Best mundane explanation | Strength of mundane case | Test done? |
|---|---|---|---|---|
| 1 | Laser gap | Layered aerosol structure; codec banding; rolling shutter | **Very strong — anomalous reading is self-refuting** | No |
| 2 | LiDAR subsurface | Occlusion shadow, multipath, MTA, GNSS/IMU smear. **Lidar cannot image through rock** | **Decisive — category error** | No |
| 3 | Drill bit destruction | Stick-slip (3–10× RPM), whirl, chert stringers, thermal binder damage, junk, upward-hole regrind | **Very strong — the normal end state of bits** | No |
| 4 | Drone failures | Self-inflicted RF/GNSS interference; multipath; compass; density-altitude sag. **GLONASS/BeiDou-survive detail is an L1 jammer fingerprint** | **Very strong; logs would settle it immediately** | No |
| 5 | Radiation spikes | Poisson noise (σ/N 40–70%), radon diurnal + rain washout, NORM geology, **RF pickup during their own transmissions** | **Very strong; show's own "spoofed spike" admission compounds it** | No |
| 6 | Superconductor / material | Diamagnetism ≠ superconductivity; LN₂ vapour cushion; SEM charging = "self-healing"; spoils-pit provenance; Ni/Fe/Co = superalloy | **Very strong. Base rate: Ubatuba, Art's Parts (ORNL: terrestrial), Nolan/Vallée, LK-99** | No |
| 7 | No rigor mortis | Carcass is post-rigor, not pre-rigor. Heat accelerates onset **and resolution** | **Near-certain; contentless without verified TOD** | No |
| 8 | Cattle mutilation | Blowfly proteolysis + avian orifice feeding + hide desiccation + hypostasis + bloat. Rommel 1980 | **Strong generally; a subset of 2019–21 PNW cold-weather cases genuinely unresolved as to agent** | Rarely |
| 9 | Hacking | Ordinary attack surface (guaranteed), storage failure, power transients, ESD, self-inflicted EMI | **Strong; forensics never attempted** | No |
| 10 | Equipment failure | ~25 expected failures/yr on 100 outdoor devices; reporting filter manufactures correlation | **Decisive — no denominator ever published** | No |
| 11 | 1.6 GHz RF | Iridium 1616–1626.5 MHz with **±37 kHz LEO Doppler (explains the "drift" precisely)**; analyzer intermod explains "dirty harmonics" | **Very strong; one attenuator knob or one SDR capture settles it** | No |
| 12 | Methodology | No controls, no blinding, no pre-registration, **~780 three-sigma noise events per 10-channel night**, no raw data, no replication, undisclosed COI | **Structural — invalidates all of 1–11 as evidence** | N/A |

---

## Residuals this analysis declines to force-fit

1. **A subset of the 2019–2021 Oregon cattle deaths** is unresolved as to agent. Cold-weather
   cases with minimal insect and scavenger activity are not fully covered by the standard
   blowfly/avian model, and experienced officers who examined them in person said so. Best
   guess is a human actor with motive; **"unresolved" is the honest word.** Not
   Skinwalker-specific.
2. **The S7E3 drone-constellation observation**, if factually as described, is a **good
   observation** — specific, falsifiable, informative either way. It has an obvious terrestrial
   explanation (an L1 jammer at ~1575 MHz — illegal, but entirely earthly). **The logs would
   settle it.**
3. **No one has produced a complete, image-by-image account of every laser-gap frame.** The
   aerosol explanation is *forced* by the physics — a beam that resumes above the gap requires
   that light was present throughout — but the show has never released enough information to
   close each individual case. **The correct statement is "the observation is fully explained by
   the atmosphere plus the camera, and is incompatible with an obstruction," not "here is the
   specific aerosol layer on that night."**
4. **The show's own S6E7 conclusion that a gamma spike was "spoofed"** is not an anomaly claim —
   it is a **data-integrity admission**, and it should retroactively lower confidence in every
   other reading from the same detector chain, **including readings the show still presents as
   anomalous.**
