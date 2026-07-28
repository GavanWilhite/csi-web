# FACT-CHECK — csi-web vs. authoritative sources

Independent audit, 2026-07-27. Scope: `csi-web` (`/`, 35 × `/csc-speakers/<slug>`, `/institute`)
against `handoff/content/*.md`, `handoff/content/csc26-agenda.json`,
`handoff/content/csc26-speakers.json`, `handoff/port-research/speakers-full.json`,
`handoff/assets/**`, and `handoff/raw-html/*.html` where a discrepancy needed settling.

Method: `lib/*.ts` was loaded directly (Node type-stripping) and diffed programmatically
against the source JSON/markdown; headshots and portraits were byte-hashed and
pixel-compared; rendered output was read from `.next/server/app/**.html`; every outbound
URL was requested. Nothing was edited in `csi-web`.

**Bottom line:** the data is remarkably clean. Every speaker, every agenda row, every
person, every URL and every event fact checks out against source. What does *not* check
out is a small set of markdown artefacts that reach the rendered page as literal
characters, one agenda slot that is 20 minutes too long, and two claims the site makes
that no source supports.

---

## 1. Blocking — wrong facts

### 1.1 Agenda overstates Web Begole's session by 20 minutes, and contradicts his own profile page

| | |
|---|---|
| **File** | `csi-web/lib/agenda.ts` (Thursday, `cols("3:20–4:00", …)`, CCI cell) |
| **Renders as** | `"Truth" Machines…` under the row time **3:20–4:00**, no per-talk time marker |
| **Correct** | **3:20 PM – 3:40 PM** |
| **Source** | `content/csc26-agenda.json` row 21; `content/csc26-agenda.md` line 86: `Thursday\| 3:20 PM\| 3:40 PM\| Critical Cognitive Infrastructure\| "Truth" Machines…\| WEB BEGOLE` |

Every other 20-minute talk in the grid carries an `at:` marker that bounds it (Damianos →
Carpenter, Maury → Acosta, Yin → Heiding). Begole is alone in his slot, so the row header
is all a reader gets, and it says 40 minutes. This is also a **same-site contradiction**:
`/csc-speakers/web-begole` correctly renders `THURSDAY · 3:20 PM – 3:40 PM · CRITICAL
COGNITIVE INFRASTRUCTURE`. Fix: give the cell an explicit end, or an `at`/duration marker.

Milder instance of the same pattern: **Fred Heiding**, Friday, is `at: "11:50"` inside a
`11:30–12:15` row, so the grid implies he runs to 12:15; source and his profile page both
say **11:50–12:10**.

### 1.2 "CSI ran Cognitive Security Villages" at Black Hat USA and DEF CON 33 — unsupported

| | |
|---|---|
| **File** | `csi-web/lib/institute.ts` → `events.whereWeveBeen` (renders in section 07) |
| **Wrong value** | "CSI ran Cognitive Security Villages across Hacker Summer Camp 2025 (BSides Las Vegas, Black Hat USA, DEF CON 33) and at National Cyber Summit 2025." |
| **Source** | `content/hsc2025.md`, `content/ncs2025.md` |

What the source actually documents for Hacker Summer Camp 2025:

- **BSides Las Vegas** — "Cognitive Security Village (Middle Ground)… Find us on the 2nd
  floor of the Tuscany". ✔ a CSI village.
- **Black Hat USA** — a *briefing*: "Evil Digital Twin, Too: The First 30 Months of
  Psychological Manipulation of Humans by AI" (South Seas A & B). No village.
- **DEF CON 33** — a workshop, "Using Evil Digital Twins for Fun and Profit", staged in
  **Adversary Village** — somebody else's village, not CSI's.
- `ncs2025.md` does show a Cognitive Security Village at National Cyber Summit 2025. ✔

So two of the four named events did not host a CSI village. Suggested correction:
"CSI ran Cognitive Security Villages at BSides Las Vegas and National Cyber Summit 2025,
and presented at Black Hat USA and DEF CON 33 during Hacker Summer Camp 2025."

### 1.3 "100% OF PROCEEDS SUPPORT THE 501(C)(3)" — unsupported claim about ticket revenue

| | |
|---|---|
| **File** | `csi-web/components/TicketsCta.tsx` line 30 |
| **Source** | `content/donate.md`: "Did you know? We fundraise with Zeffy to ensure **100% of your donation** goes to our mission!" |

The only 100% claim anywhere in the crawl is scoped to **donations**, on the Zeffy
donation form. No source page makes any statement about where ticket proceeds go. The
institute page's equivalent line (`components/institute/Support.tsx`: "100% OF DONATIONS
FUND THE MISSION") is correctly scoped; this one is not. Either drop it or get the claim
confirmed by the client.

---

## 2. Blocking — markdown artefacts rendered as literal text

These are not "wrong facts", but they are visible garbage on shipped pages and were
verified in the built HTML, not inferred.

**Root cause (single, and worth fixing at the source):**
`csi-web/scripts/clean-bio-markdown.py` → `fix_ts()` contains

```python
if "](" not in body and "**" not in body:
    return m.group(0)          # <- skips the literal entirely
```

so any string literal whose only markdown is `_emphasis_` or an escaped `\-` is never
cleaned. The script also only ever touches `speakers-full.json` and `lib/speakers.ts` —
`lib/people.ts` was never run through it at all.

### 2.1 `lib/speakers.ts` — `brian-brushwood`, bio paragraph 3

Renders in `.next/server/app/csc-speakers/brian-brushwood.html` as
`_Scam Nation_ ,` / `_The Modern Rogue_` / `_World's Greatest Con_ ,` /
`_The Tonight Show with Jay Leno_ ,` / `_Anderson Cooper 360°_ ,` / `_Hacking the System_`
— six literal underscore pairs plus the space-before-comma artefacts.
Source (`content/csc-speakers__brian-brushwood.md`) sets those as italics; correct text is
`Scam Nation, the self-described…`, `The Modern Rogue and hosts World's Greatest Con, a…`,
`… on The Tonight Show with Jay Leno, on Anderson Cooper 360°, and starred in Hacking the
System on the National Geographic Channel.`

### 2.2 `lib/speakers.ts` — `brian-steed`, bio paragraph 4

Renders `…bears its same title: _Narrative War: The Philosophy of Social Conflict_.`
Correct: `…bears its same title: Narrative War: The Philosophy of Social Conflict.`
(`content/csc-speakers__brian-steed.md`).

### 2.3 `lib/speakers.ts` — `winn-schwartau`, bio paragraphs 7–13

Seven consecutive lines each begin with a literal backslash-hyphen:
`\- Why information overload is becoming a weapon`, `\- How "Too Much Information"
degrades decision-making`, … through `\- How cybersecurity principles can be adapted to
defend human cognition`. Verified rendered in `csc-speakers/winn-schwartau.html`.
Source has these as a bullet list under "Participants will discover:".

### 2.4 `lib/speakers.ts` — `fred-heiding`, bio paragraph 1

Renders `…into ScamBench (<https://scambench.com/),> a benchmark designed to…`
(HTML-escaped `&lt;`/`&gt;` in the built page).
Correct visible text, per `raw-html/csc-speakers__fred-heiding.html`
(`ScamBench (` + anchor text `https://scambench.com/),` + ` a benchmark…`):
`…into ScamBench (https://scambench.com/), a benchmark designed to…`
The `<` `>` are html2text autolink residue. (The trailing `),` inside the URL is broken at
source — the anchor's `href` is literally `https://scambench.com/),` — so leaving the
punctuation where it is matches the source; only the angle brackets are ours.)

### 2.5 `lib/people.ts` — `winn-schwartau`, bio paragraphs 1, 3, 5

Renders on `/institute` as
`_The Civilian Architect of Information Warfare_  \- Commodore Pat Tyrrell OBE Royal Navy, 1996`,
`_Electronic Pearl Harbor Prophet_  \- BankInfo Security, 2023`,
`_We are defenseless_. - The Art & Science of Metawar, 2024`.
Source `content/staff__winn-schwartau.md` renders these as italic pull-quotes with an
em-dash attribution.

### 2.6 `lib/people.ts` — `winn-schwartau`, bio paragraphs 2, 4, 7

Three paragraphs whose entire content is zero-width space(s) (`"​​"`, `"​"`,
`"​"`). They produce three empty `<p>` elements in `/institute`, and because
`components/institute/Team.tsx` uses `key={para.slice(0, 32)}`, paragraphs 4 and 7 collide
on the **same React key**. Drop them.

### 2.7 `lib/people.ts` — `sarah-fuller`, bio paragraph 1

Renders `…three enthusiastic little boys _(send help!)_.` Source italicises it.

---

## 3. Should fix (not blocking, but wrong or misleading)

| # | File | Issue |
|---|---|---|
| 3.1 | `components/Hero.tsx` | Stat reads **"35+ SPEAKERS"**. The roster is exactly 35 (source and site agree). Use `35`. |
| 3.2 | `lib/agenda.ts` (Thu & Fri 8:00 rows) | Title **"Check-in & coffee"**. Source says only `Check-In` (`csc26-agenda.json` rows 0, 26). Nothing in the crawl mentions coffee. |
| 3.3 | `lib/agenda.ts` vs `lib/speakers.ts` | **Six sessions carry two different titles on the same site** — the agenda grid uses shortened forms while the speaker profile carries the full source title. See table below. Defensible for grid fit, but it is real drift and worth a deliberate decision. |
| 3.4 | `lib/institute.ts` (module header) | Header comment claims one garbled SHIELD bullet "is repaired minimally". It was not repaired — the entire "Why Join SHIELD?" block containing it (`content/shield.md`, "Connect through our with a diverse, global community across sectors.") was dropped. Comment is inaccurate; correct it or the next agent will look for a repair that isn't there. |
| 3.5 | `lib/institute.ts` → `research.evilDigitalTwin` | The blurb drops **both** presenter names. Only one is disputed: `content/research.md` says "Dr. Vindy Sawyer and **Dr. Matthew Canham**", and Canham's credit is corroborated uncontested in `content/hsc2025.md` (Black Hat and DEF CON listings) and `content/staff__dr.-matthew-canham.md`. Consider restoring Canham. |
| 3.6 | `lib/speakers.ts` → `sanny-liao.tagline` | "The Behavioral **Exonomist** Moving Security Beyond the Weakest Link" — carried verbatim from the source roster page, where it is a typo for "Economist". Faithful, but it ships a visible misspelling of a speaker's own tagline. Client call. |
| 3.7 | `lib/institute.ts` → `shield.tagline` | Uses straight apostrophes (`aren't`, `they're`) where the source and the rest of the site use curly. Cosmetic inconsistency. |
| 3.8 | `lib/content.ts` → `tracks[2].sessionCount` | "10 SESSIONS" for Applied Training is correct against source, but one of the 10 is the unannounced `TBA` slot (Friday 10:45). Accurate; just be aware the number counts a placeholder. |

### 3.3 detail — agenda title vs. speaker-profile title

| Speaker | Agenda grid (`lib/agenda.ts`) | Profile page / source |
|---|---|---|
| Lucas Pralle | Engineering for Human Cognition and Creativity | Engineering For Human Cognition and Creativity **- Building a Future We Actually Want** |
| FC (Freaky Clown) | Gaining Physical Access: Techniques, … | Gaining Physical Access: **The** Techniques, … |
| Dr. Bryce-Allen Bagley | Neurosecurity: State of the Art and … | Neurosecurity: **the** State of the Art and … |
| Chloe Tucker (×2) | From Zero to (Tabletop) Hero, Part I / Part II | **Part I: / Part II:** From Zero to (Tabletop) Hero: **Building Tabletop Exercises for Human-Centered Defense** |
| Perry Carpenter | Build the Con. Break the Con: The Science of Deception, Live | Build the Con. Break the Con: **Exploring** the Science of Deception **-- Live** |
| Winn Schwartau | Critical Ignoring**:** TMI & Cognitive Pearl Harbors | Critical Ignoring TMI & Cognitive Pearl Harbors |
| — | Session TBA | TBA |

---

## 4. Divergences from source that are defensible — each confirmed intentional

Every item below was checked against the source and against the build's own documentation.
All are deliberate, and all are correctly reasoned.

1. **Keynote epithets.** `lib/content.ts` uses the roster/bio-page taglines
   ("THE GODFATHER OF COGNITIVE SECURITY", "DEFENDING THE MOMENT BEFORE DECISION",
   "THE PIONEER OF HUMAN RISK MANAGEMENT", "THE BATTLE FOR DECISION AUTONOMY"), not the
   landing page's stale topic tags ("The Evolution of Cognitive Security", "Cognitive
   Warfare & the Information Environment", "Human Risk Management", "Cognitive Warfare").
   Verified: all four match `cognitive-security-conference-speakers.md` exactly, the
   landing-page variants really are different, and all four LinkedIn URLs match the
   landing page (`aidatborras`, `ashley-m-rose`, `randwaltzman`, `1davepitts`).
   Documented in `CONFERENCE-GAPS.md §1`. **Intentional.**
2. **Early-bird disabled.** `event.earlyBird = false`. `content/csc26-tickets.md`:
   "Early-bird pricing is available until July 16th." Today is 2026-07-27 — expired. The
   flag correctly suppresses the hero badge and the registration sentence. **Correct call**,
   already flagged CLIENT MUST CONFIRM in `lib/event.ts`.
3. **Membership: apply-framing, not free-framing.** Confirmed the build did what it was
   told. `grep` over `lib/`, `components/`, `app/` finds "free", "no dues", "no
   gatekeeping" **only inside code comments** — never in shipped copy. The shipped line,
   `join.body[3]`, is a faithful paraphrase of `content/apply.md` ("Please complete this
   form to join the applicant waitlist. We will inform you when there is an opening for you
   in the CSI community"), and `content/join.md`'s contradictory "Membership is free…
   No dues or gatekeeping" is correctly absent. **Intentional and executed correctly.**
4. **Partners / supporters.** No logo wall, no Partnerships/Supporters links, shared prose
   plus a contact CTA. The source label swap is real (`content/partners.md` and
   `content/supporters.md` cross-link with contradictory labels). **Intentional.**
5. **Evil Digital Twin presenter credit omitted.** `content/research.md` credits "Dr. Vindy
   Sawyer"; every other page (`about.md`, `board-of-directors.md`, `hsc2025.md`,
   `staff__dr.-ben-d.-sawyer.md`) says "Dr. Ben D. Sawyer". Dropping the disputed name is
   correct. (See 3.5 for the Canham half.) **Intentional.**
6. **`bio` left unsplit** (abstract runs into biography with no reliable boundary), and
   rendered under a neutral heading rather than mislabelled "Bio". Verified: the source
   pages genuinely have no separator. **Intentional.**
7. **`linkedin: null` for Bruce Schneier and Constantine.** Verified: their source pages
   render a LinkedIn icon with no href. Not guessed. **Correct.**
8. **Third Active Project (Cognitive Security Research Library) omitted** — its source
   button is a dead `<button type="button">`. **Intentional.**
9. **`?usp=publish-editor` stripped** from the journal interest form URL. Editor-mode
   param; stripping is right. Verified the stripped URL returns 200.
10. **Donate goes straight to Zeffy**, skipping `/donate`. Verified: `content/donate.md`
    *is* the Zeffy form. **Correct.**
11. **SHIELD keeps British spelling** ("behavioural", "Defence"). Matches its own page and
    Holly-Jane Grayling's staff role title verbatim. **Intentional and flagged.**
12. **Three roster-vs-bio title contradictions kept as roster titles** (Natilie McCallick
    "Administrative Assistant" vs bio "Director of Operations"; Candy Alexander; Dr. Calvin
    Nobles). Verified all three contradictions are real in the source. **Intentional,
    correctly deferred to client.**
13. **About-page third "definition" paragraph cut** ("Humanity is currently experiencing a
    phase transition…"). Verified present in `content/about.md` and grammatically broken
    as described. **Intentional, flagged CLIENT TO CONFIRM.**
14. **Mission one-liner** uses the `/about` deck version. Verified three conflicting
    versions exist across source pages. **Intentional, flagged.**
15. **Videos are a point-in-time snapshot.** All 8 records match `videos.json` exactly. The
    livestream `U9axbn-GHMw` correctly carries `hqdefault.jpg` rather than a constructed
    `maxresdefault.jpg` (which 404s). **Correct and well-documented.**
16. **Blog port deferred**; three latest posts link out. All three verified — see §5.
17. **Footer `©2026`** where every source page says `©2025`. Reasonable for a 2026
    relaunch; noting it only because it is a deliberate divergence.
18. **Keynote cards use roster headshots**, not the landing page's separate (different Wix
    media IDs) crops for Ashley Rose and Rand Waltzman. Gives one face per person sitewide.
    **Defensible.**

---

## 5. Verified clean — no findings

Listed so the absence of a finding is legible as a check performed, not a check skipped.

**People — speakers (35).**
Roster parsed from `cognitive-security-conference-speakers.md` and diffed field-by-field:
**all 35 slugs, names, taglines, track assignments, track labels and display order are
identical.** No one dropped, invented or duplicated. `lib/speakers.ts` also matches
`speakers-full.json` on every field (`sessions` differs only by two internal keys the site
doesn't need; five bios differ only by whitespace normalisation, and spot-checking against
`content/csc-speakers__*.md` and `raw-html/` shows the **site's** spacing is the faithful
one — e.g. Web Begole's double space after "manufactured it.").

**Headshots (35).** Every file in `public/assets/speakers/` is **byte-identical** to
`handoff/assets/speakers/`, and every one was confirmed to appear on that speaker's own
bio page (Wix media ID cross-checked against `content/csc-speakers__<slug>.md`).
`headshotWidth`/`Height` match `_headshot-map.json`; the `headshotLowRes` flag matches the
computed `min(dim) < 300` rule on all 35 (16 true).

**Speaker LinkedIn URLs.** All 33 non-null URLs match the URL linked on that speaker's own
source page. Three differ only by a trailing slash (`ashley_rose`, `jessica-barker`,
`brian-brushwood`).

**Credentials.** Every credential bullet on every speaker page is present in the site
record, and the per-speaker bullet count matches the source page exactly for all 35.

**People — institute (22).** 9 staff, 3 board, 10 council — names and order identical to
`meet-our-team.md`, `board-of-directors.md`, `strategic-advisory-council.md`. Every role
string and every bio paragraph found verbatim in the person's own source page. All 22
portraits pixel-matched (mean abs diff 0.34–0.75/255 after format conversion) to the image
on that person's own page — **no portrait is on the wrong person**. LinkedIn and website
URLs all correct, including the source's habit of labelling every social slot "LinkedIn"
regardless of destination. The Notion URL stripped from Oz Alashe's bio is confirmed
present at source and correctly removed.

**Agenda.** 53 rows on the site, 53 in `csc26-agenda.json`, and `csc26-agenda.md` agrees
with the JSON row-for-row. Every one of the 53 site rows matches source on **day, start
time and track**. All **8 breaks** are present at exactly the source times
(Thu 10:10–10:45, 2:00–2:15, 3:00–3:20, 4:00–4:30; Fri 10:20–10:45, 2:00–2:15, 3:00–3:20,
4:00–4:30). **No session start time was altered to accommodate them.** Track counts:
Defending Humans **11**, Critical Cognitive Infrastructure **12**, Applied Training **10** —
matching both the source and the `sessionCount` values `lib/content.ts` declares, and
rendering as "TRACK A · 11 SESSIONS" / "B · 12" / "C · 10" in the built HTML.
Only two end times drift (§1.1) and eight titles are restyled (§3.2, §3.3).

**Cross-consistency.** Every speaker's `sessions[]` matches the agenda on day, start, track
and (source-form) title. The only drifts are the ones listed in §1.1 and §3.3.

**Event facts.** All verbatim against `csc26-venue.md`, `csc26-tickets.md`,
`cognitive-security-conference.md` and the sitewide footer:
dates `August 6–7, 2026`; venue `Tuscany Suites & Casino`; address
`255 E Flamingo Rd, Las Vegas, NV 89169`; rooms `Firenze · Tuscany · Siena`; capacity
`300` ("Due to space limitations, we are limited to 300 attendees"); EIN `92-3238363`;
State of Oregon Registration `#66753`; `501(c)(3)`.

**Outbound URLs.** All 21 URLs in `lib/event.ts` + `lib/institute.ts` are well-formed and
were requested: **20 × HTTP 200** (following redirects). `https://fablesecurity.com/`
returns 403 to `curl` — bot protection, not a broken link; it is the exact URL the source
landing page links. Both travel-brief PDFs return 200 and are mapped to the correct
labels (`f74dceb6…` → Human Risk, `4adf13c2…` → Cognitive Warfare, per the source anchors'
`title` attributes). Room-block URL, tickets URL, prospectus mailto and all four footer
links match source character-for-character.

**Sponsors.** Seven names in the source landing page's order: Living Security, Fable,
MindShield, ObscureIQ, HRL Laboratories, DeepTrust, Strategos International. All seven
logo files are **byte-identical** to the crawled Wix originals. Exactly the four the source
links carry URLs (Living Security → livingsecurity.com, Fable → fablesecurity.com,
HRL → hrl.com, Strategos → strategosintl.com); MindShield, ObscureIQ and DeepTrust are
unlinked at source and unlinked here. The third logo, unnamed in the extracted text, is
confirmed as MindShield from `raw-html/cognitive-security-conference.html`
(`title="MindShield White.png"`, wrapped in a non-anchor `linkElement` div).

**Institute copy.** Every prose string longer than 40 characters in `lib/institute.ts` was
matched against the full 133-page markdown corpus. **All but five matched verbatim**, and
of those five: `whereWeveBeen` is §1.2; `evilDigitalTwin.blurb` and `join.body[3]` are the
documented intentional rewrites (§4.5, §4.3); `journal.body[0]` is verbatim from
`content/journal.md` with a link stripped ("It is currently under the leadership of Robert
H. Thomson"); `support.body[0]` composes the footer's 501(c)(3) line with
`content/donate.md`'s Zeffy sentence and `content/index.md` line 195's "build resilience
and proactive defenses against cognitive attacks on human, artificial, and hybrid
intelligence systems" — all three accurate.

**Focus 5.** Names, order and blurbs identical to `content/initiatives.md`. All five images
pixel-matched to the correct pillar's source image (diff ≤ 0.70/255). CAT copy verbatim.

**Latest posts (3).** Titles, URLs, dates and read times all verified against the post
pages, not just the blog index: Neurowar `Jan 12` + `7 min read`; Coupons `Dec 9, 2025` +
`9 min read`; B-17 `Nov 18, 2025` + `3 min read`. Categories verified against the category
index pages: Neurowar → Neurosecurity + Cognitive Warfare ✔; Coupons → none ✔;
B-17 → Cognitive Resilience + Human-Centered Cyber ✔.

**Build integrity.** 35 speaker pages built; all 35 slugs linked from the home page; all
72 referenced local assets exist on disk; every in-page anchor
(`#speakers #agenda #venue #sponsors #roster #mission #research #programmes #events #team
#join`) resolves to a real `id` in the rendered HTML.

---

## 6. Could not verify

- **That a LinkedIn URL belongs to the named human.** LinkedIn blocks automated fetch.
  Verified only that each URL is the one the source page links for that person — which
  covers "did the port mis-assign a URL" but not "was the source itself wrong".
- **Contents of the two travel-brief PDFs.** Confirmed both resolve (200) and are attached
  to the correct labels; did not read the documents to confirm which audience each targets.
- **Whether "Dr. Vindy Sawyer" is a typo for Dr. Ben D. Sawyer.** Unresolved at source;
  the site's decision to omit is the safe one, but the underlying fact is still open.
- **Whether a new early-bird deadline exists.** `lib/event.ts` correctly flags this as a
  client question. Nothing in the crawl answers it.
- **Original marketing copy has no source to check against.** The Hero lede, the three
  track blurbs, the About framing sentence, the TravelBriefs blurb and the section kickers
  are newly written. They were read for factual assertions and contain none that contradict
  source — but "verified" is the wrong word for them. One judgement call worth noting: the
  About section renders the source's "con artists" as "**reformed** con artists"
  (`components/About.tsx`); the attributed Web Begole pull-quote beside it is verbatim.
- **Whether the client considers `©2026` (vs source `©2025`) correct.**
