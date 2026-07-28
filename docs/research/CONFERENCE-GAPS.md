# CSC 2026 — Parity Gap Analysis

Scope: what the **source Wix conference cluster** contains versus what `csi-web`
currently ships. This is a parity audit, not a best-practices checklist — nothing is
proposed here that the source site does not already have, except where noted as a
correction to something the source gets wrong.

Authority: `handoff/content/*.md`, `handoff/raw-html/*.html`,
`handoff/screenshots/desktop/*`, `handoff/assets/`. Every claim below was checked
against those files.

Companion deliverable: **`speakers-full.json`** — all 35 speakers, extracted.

---

## 1. Canonical keynote taglines

The two source pages disagree. Measured, not assumed:

| Speaker | Landing page (`cognitive-security-conference`) | Roster page + own bio page |
|---|---|---|
| Rand Waltzman | The Evolution of Cognitive Security | **The Godfather of Cognitive Security** |
| Terri Borras | Cognitive Warfare & the Information Environment | **Defending the Moment Before Decision** |
| Ashley Rose | Human Risk Management | **The Pioneer of Human Risk Management** |
| Dave Pitts | Cognitive Warfare | **The Battle for Decision Autonomy** |

**Treat the roster/bio-page value as canonical.** Four reasons, in order of weight:

1. **Two independent surfaces agree.** The roster page tagline and the `H2` on the
   speaker's own bio page match **exactly for all 35 speakers**, not just the four
   keynotes (verified programmatically across every `csc-speakers__*.md`). The landing
   page is the lone dissenter, and only for the four it happens to show.
2. **It is the only version that covers the whole roster.** The landing page carries
   taglines for 4 of 35. Adopting it as canonical would mean two different naming
   conventions in one dataset.
3. **The landing-page labels are topic tags, not epithets, and they collide.** Borras
   and Pitts both reduce to "Cognitive Warfare" — Pitts' is literally just that string.
   They read as placeholder section labels.
4. **It is nearly a no-op for the app.** `lib/content.ts` already uses the canonical
   form for Waltzman, Rose and Pitts. Only Borras uses the landing-page variant
   (`"COGNITIVE WARFARE & THE INFO ENVIRONMENT"` → `"DEFENDING THE MOMENT BEFORE
   DECISION"`). One field.

`speakers-full.json` carries the canonical string in `tagline` and preserves the
landing-page variant in `taglineConference` (non-null for those four only), so the
decision stays reversible without a re-crawl.

---

## 2. Speaker detail pages: **expand-in-place. No per-speaker routes.**

### What the content actually measures

| Metric | Value |
|---|---|
| Speakers | 35 |
| With a substantive bio | **35 of 35** — there are no near-empty pages |
| Total bio prose | 10,074 words |
| Median per speaker | 268 words |
| Range | 115 (Lucas Pralle) – 722 (Winn Schwartau) |
| Below 150 words | 2 (Pralle 115, Tomm Larson 118) |
| Credential bullets | 3–8, median 5 |
| With a session title on the bio page | 33 of 35 |
| With a LinkedIn URL | 33 of 35 |

### Recommendation

**A full 35-speaker roster section on the conference page, each speaker expanding in
place. No `/speakers/<slug>` routes.**

Justified from the content, not from preference:

- **268 median words is an accordion panel, not a page.** Bio prose plus ~5 credential
  bullets, a session title and a session time is roughly one viewport when open. A
  dedicated route for that much text is mostly chrome — which is exactly what the
  source's own bio pages are: a back link, the same fields, and Wix gallery furniture.
- **The SEO argument does not survive contact with the data.** All 35 panels can be
  server-rendered collapsed (the existing `Agenda` already does precisely this trick —
  both days in the DOM, inactive one `hidden`). One document containing every speaker
  name, tagline and bio is indexable for "‹speaker name› CSC 2026" without 35 routes.
- **Deep-linking is solved by anchors.** `#speaker-bruce-schneier` plus `:target` gives
  shareable per-speaker links today. The Wix URLs that people have actually linked to
  (`/csc-speakers/<slug>`) are best served by **301s to those anchors**, not by
  rebuilding 35 pages to catch them.
- **Per-speaker OG images — the one real argument for routes — fails on our assets.**
  Each Wix bio page uses the headshot as its OG image. 16 of 35 headshots are 190×190,
  under the 200×200 OG floor and far under the 1200×630 recommendation. We cannot ship
  good per-speaker social cards from what we hold, so the strongest reason to mint 35
  URLs evaporates.

### On the hybrid (roster + routes for deep links/indexing)

**Over-engineering at this volume.** It publishes the same 10,074 words at two URLs,
which buys a canonical-tag and duplicate-content problem and doubles the maintenance
surface — for a two-day event, in exchange for no content a visitor cannot already
reach. Revisit only if the client wants per-speaker social cards *and* re-supplies
headshots at 1200×630; both conditions, not either.

---

## 3. Parity matrix

`✅` shipped · `⚠️` partial · `❌` absent · `➕` app-only addition

### 3.1 `cognitive-security-conference` — landing page

| Source element | In app? | Data held? | Note |
|---|---|---|---|
| CSC26 raven emblem, hero | ✅ | — | |
| Hero headline / BSides-adjacency framing | ✅ | — | Rewritten ("Defend the mind."), intent preserved |
| Dates, venue, 300-attendee cap | ✅ | — | |
| "Purchase Tickets" hero button | ✅ | — | **App is correct; source is broken** — see §5 |
| Sponsor logo row (7) | ✅ | — | |
| Testimonial carousel | ⚠️ | partial | Source = **3 slides**; app = 1, and **paraphrased**. See §4.6 |
| Positioning statement | ✅ | — | Rewritten, faithful |
| Keynote Speakers (4) | ✅ | — | Borras tagline should change — §1 |
| "See Full Speakers List" | ⚠️ | ✅ | Links *offsite* to Wix; should target the in-page roster once built |
| Travel briefs (2 PDFs) + copy | ✅ | — | |
| Venue block | ✅ | — | |
| "Get Your Tickets Now!" | ✅ | — | |
| Ticket price | ❌ | ✅ | **$500 General Admission** — §4.3 |
| ROI / "event our industry always wanted" copy | ✅ | — | Folded into About |
| Call for Sponsors (prospectus mailto) | ✅ | — | |
| 501(c)(3) / EIN / Oregon reg. footer | ✅ | — | |
| Disclaimer / Sitemap / Donate / Contact | ✅ | — | |
| — | ➕ | — | **Three-track section** — app-only, no source equivalent |
| — | ➕ | — | **Inline two-day agenda** — the source landing page has none |

### 3.2 `csc26-speakers` / `cognitive-security-conference-speakers` — roster

Both URLs serve identical HTML.

| Source element | In app? | Data held? | Note |
|---|---|---|---|
| 35 speakers in 5 groups (Keynote / Defending Humans / Critical Cognitive Infrastructure / Applied Training / Master of Ceremonies) | ❌ | ✅ | **The headline gap.** App shows 4 + 7 name-chips |
| Headshot per speaker | ⚠️ | ✅ | 4 in `public/`; other 31 in `handoff/assets/speakers/` |
| Tagline per speaker | ❌ | ✅ | |
| Link to individual bio | ❌ | ✅ | Becomes expand-in-place — §2 |
| Group headings as section structure | ❌ | ✅ | `track` / `trackLabel` in the JSON |
| Call for Sponsors, Hosted by | ✅ | — | |

Note: `moreSpeakersCount = 28` in `lib/content.ts` is **wrong**. 35 total − 4 keynotes
shown − 7 chips = **24**. The current figure implies a 39-speaker roster.

### 3.3 `csc26-agenda`

| Source element | In app? | Data held? | Note |
|---|---|---|---|
| Thursday / Friday switch | ✅ | — | App's is a real tablist; source's is two links to the same URL |
| Full session table | ⚠️ | ✅ | App renders **45 of 53** rows |
| **8 break rows** | ❌ | ✅ | Thu 10:10/2:00/3:00/4:00, Fri 10:20/2:00/3:00/4:00 |
| Check-in and lunch rows | ✅ | — | |
| **"Filter by Track" dropdown** | ❌ | ✅ | Per-day `<select>` on the source |
| End times | ❌ | ✅ | Source table has Start *and* End; app shows a combined range only |
| Track / Title / Name columns | ✅ | — | |

`README.md` claims "all 53 sessions are indexable". It is **45** (Thursday 22, Friday
23, counted from `agenda.ts`), against 53 in `csc26-agenda.json` (Thursday 26, Friday
27). The difference is **exactly the 8 break rows** — nothing else is missing. Restoring
them makes the README's claim true; correct it in the same change.

### 3.4 `csc26-venue`

| Source element | In app? | Data held? | Note |
|---|---|---|---|
| H1, rooms (Firenze/Tuscany/Siena), address | ✅ | — | |
| Room-block link | ✅ | — | |
| "Planning Your Attendance" + 2 travel briefs | ✅ | — | |
| Venue photograph | n/a | n/a | **The source has none either** — not a parity gap. `README.md` lists this as a known gap; it is a client request, not a regression |

### 3.5 `csc26-sponsors`

| Source element | In app? | Data held? | Note |
|---|---|---|---|
| Sponsor logo wall | ✅ | — | App shows **7**; the sponsors *page* shows 6 (no MindShield), the landing page shows 7. App's set is the better one |
| **Outbound links on logos** | ❌ | ✅ | Source links Living Security, Fable, HRL, Strategos; ObscureIQ + DeepTrust unlinked |
| Sponsor tiers | n/a | n/a | **The source has no tiers** — flat wall. Do not invent them; see §6 |
| Prospectus mailto | ✅ | — | |

### 3.6 `csc26-tickets`

| Source element | In app? | Data held? | Note |
|---|---|---|---|
| "Conference Tickets" page | ⚠️ | — | App has a CTA section, not a page — acceptable under single-page scroller |
| 300-cap scarcity copy | ✅ | — | |
| Early-bird-until-July-16 copy | ⚠️ | — | Present but **stale** — §5 |
| **Embedded Zeffy checkout** | ❌ | — | Inline widget: date/location, General Admission **$500**, "Add +", donation field |
| **$500 price** | ❌ | ✅ | App never states a price |
| "View on Zeffy" outbound link | ✅ | — | |

### 3.7 `csc-speakers/<slug>` × 35 — bio pages

| Source element | In app? | Data held? | Note |
|---|---|---|---|
| Name, tagline, track | ❌ | ✅ | |
| Credential bullets (3–8) | ❌ | ✅ | |
| Day + start time | ❌ | ✅ | |
| Headshot | ❌ | ✅ | 16 low-res |
| LinkedIn | ❌ | ⚠️ | 33 of 35 |
| Session title | ❌ | ✅ | 33 from bio page; remaining 2 from the agenda |
| Session abstract + speaker bio prose | ❌ | ✅ | Not separable — see §6 |
| "Register Here!" CTA | ❌ | — | Trivial once panels exist |
| "Previous"/"Next" | n/a | ❌ | Wix gallery chrome — no target URLs in the HTML. Do not reproduce |

---

## 4. Ranked gaps

Ranked by attendee value against effort.

### 4.1 Full 35-speaker roster — **do first**
Source has a whole page for it; the app shows 4 speakers and a chip row. This is the
brief. Data is complete in `speakers-full.json`; the 31 missing headshots are a file
copy from `handoff/assets/speakers/`. While in there, fix `moreSpeakersCount`.

### 4.2 Speaker bios, expand-in-place
10,074 words the app currently discards, and the single biggest reason someone visits
a conference site after deciding to attend. Data complete. See §2.

### 4.3 Publish the ticket price ($500)
The source states it through the Zeffy embed; the app states no price anywhere. A
visitor cannot decide without leaving the site. Near-zero effort, high value —
**best value-to-effort ratio in this document.** Confirm the figure is current (§6).

### 4.4 Agenda break rows + end times
8 rows dropped — the app renders 45 of 53, and the deficit is exactly the breaks.
Breaks are how an attendee finds the hallway track and plans a call. Data is in
`csc26-agenda.json` already. Fix the README's "53" claim at the same time.

### 4.5 Agenda per-track filter
Source has a `<select>` per day. With 3 tracks and a track-coloured grid the app's
layout already conveys most of this, so the marginal gain is smaller than it looks —
but it is cheap and the source has it.

### 4.6 Second testimonial (and un-paraphrase the first)
Two issues, one section. The source carousel is **3 slides** (`comp-moggjqbs2`,
`comp-moggjqby5`, `comp-moggjqc14`); only slide 1 is in the server HTML. Slide 2 was
captured in the earlier audit (`03-CONFERENCE-PAGE-SPEC.md`) as Kathryn Brett Goldman,
CEO & Founder, Cybermaniacs. Slide 3 is unrecovered.

Separately, the app's `About.tsx` blockquote is **not the source quote**. Source:

> "You can find two people who come together who would not normally meet, and they are
> going to go create a paper or a project from the connections made here."

App: *"You can find two people here who would never normally meet, and they'll go
create a paper or a project from the connection."*

An attributed quotation should not be edited for rhythm. Restore verbatim.

### 4.7 Hyperlink the sponsor logos
Source links 4 of 7 to sponsor sites. Sponsors paid for the click. Trivial.

### 4.8 Correct the track session counts
`lib/content.ts` declares 12 / 13 / 10. The source agenda has **11 / 12 / 10**
(Defending Humans / Critical Cognitive Infrastructure / Applied Training), and the
app's own `agenda.ts` renders 11 / 12 / 10. Two numbers are inflated by one.

### 4.9 Redirects for the 35 Wix speaker URLs
Not a page build — a redirect map from `/csc-speakers/<slug>` to the roster anchors.
`speakers-full.json` carries `slug` and `bioPage` for exactly this.

### 4.10 Embedded Zeffy checkout — **probably not worth it**
The source embeds the widget inline. It is a third-party iframe with its own CSP,
layout and dark-mode implications, and the app already links out to the same flow.
Publishing the price (§4.3) captures most of the value at a fraction of the cost.
Recommend the link plus a price, not the embed.

### 4.11 Social/OG image — **low priority, and the source is no better**
Neither the source cluster pages nor the app set an OG image (the bio pages set the
headshot; the cluster pages set nothing). The app has `openGraph` title/description but
no `images` and no `metadataBase`. Worth ten minutes with the raven emblem; not worth
scheduling.

### Explicitly not worth building
- **Per-speaker routes** — §2.
- **"Previous/Next" speaker navigation** — Wix furniture with no targets; meaningless
  in an expand-in-place roster.
- **A separate venue page / sponsors page / tickets page** — the source splits these
  because Wix pages are how it is built. The single-page scroller already carries every
  field on them. The only thing on `csc26-tickets` not on the landing page is the price
  and the widget, both handled above.
- **Sponsor tiers** — the source has none. Do not invent a hierarchy among paying
  sponsors; see §6.

---

## 5. Source defects — do **not** reproduce

1. **Hero "Purchase Tickets" links to itself.** On
   `cognitive-security-conference`, the button targets
   `https://www.cognitivesecurityinstitute.org/cognitive-security-conference` — the page
   it is on. The app already points at Zeffy. Keep the app's behaviour.
2. **Keynote taglines contradict between the source's own two pages** — §1. Ship the
   canonical set; do not mirror the inconsistency.
3. **Early-bird pricing is still advertised after the deadline.** `csc26-tickets` says
   "available until July 16th"; today is 2026-07-27. `event.earlyBird` is `true` in
   `lib/event.ts`. Flip it (client confirmation — §6).
4. **The agenda's Thursday/Friday "tabs" are two links back to the same URL.** They do
   not switch anything server-side. The app's real tablist is strictly better.
5. **The sponsors page omits MindShield** while the landing page shows it (verified: the
   unlabelled landing-page logo is byte-identical to
   `public/assets/sponsors/mindshield.png`). Do not propagate the omission — confirm the
   roster instead (§6).
6. **Speaker bio "Previous"/"Next"** — labels with no targets.
7. **Sponsor marks are white-on-transparent only** and legible only on a dark band. Not
   a bug to fix in code: request light-background versions from each sponsor rather than
   recolouring a trademark.

---

## 6. Needs a human

**Blocking a correct build:**

- **Confirm $500 is the current ticket price**, and whether any other tier exists. Taken
  from a crawled Zeffy widget screenshot — it is the only price artefact we hold.
- **Early-bird flag.** July 16 has passed. Flip `event.earlyBird`, or supply the new
  deadline. Drives the hero flag *and* the registration paragraph.
- **Friday 10:45 AM, Applied Training is "TBA"** in the source agenda. Still unfilled.
- **Is MindShield a 2026 sponsor?** On the landing page, absent from the sponsors page.
- **Sponsor tiers.** The source shows a flat wall with no hierarchy. If tiers exist,
  they exist only in the prospectus, which is not in the crawl.

**Content the crawl cannot supply:**

- **16 headshots exist only at 190×190** — ashley_rose, bonnie-rushing, brian-steed,
  bryce-allen, fc, greg-carpenter, jeff-jockisch, jessica-barker, len-noe, peggy-yin,
  perry-carpenter, rand-waltzman, sanny-liao, sara-rabinovitch, tamara-schwartz,
  web-begole. That was the largest version on the CDN. Any portrait rendered above
  ~190px needs re-supplied images. Note this includes **two of the four keynotes**.
- **LinkedIn URLs for Bruce Schneier and Constantine.** Their bio pages render the
  LinkedIn icon without a link. `null` in the dataset, not guessed.
- **Testimonial slides 2 and 3.** Slide 2 is attributed to Kathryn Brett Goldman
  (Cybermaniacs) in the earlier audit but is not in the crawled HTML — confirm the
  wording before publishing an attributed quote. Slide 3 is entirely unrecovered.
- **Abstract vs. bio boundary.** Every bio page runs the talk abstract straight into the
  speaker biography with no markup separating them, and the split is not reliably
  machine-detectable (some abstracts open with the speaker's own name). `bio` in the
  JSON is therefore the **verbatim paragraph sequence**, unsplit. If the design needs
  them as separate fields, a human must mark the boundary — I did not guess it.
- **Venue photograph.** Never existed on the source. Client-supplied or drop the plate.

**Rights, before launch:**

- **Speaker headshots** are speaker-supplied; rights likely cover CSC-2026 promotion
  only. Confirm before any reuse outside that context.
- **Hero/footer background stock imagery** carries Envato-style `-utc` filenames. Verify
  the purchased licence covers the redesigned usage.

---

## 7. `speakers-full.json`

35 records, source order (Keynote → Defending Humans → Critical Cognitive
Infrastructure → Applied Training → Master of Ceremonies). Field names follow
`lib/content.ts` conventions. Missing values are `null`, never inferred.

```ts
type SpeakerTrack =
  | "keynote" | "defending-humans" | "cognitive-infra" | "applied-training" | "mc";

interface SpeakerSession {
  day: "thu" | "fri";
  dayLabel: string;        // "Thursday"
  start: string;           // "9:30 AM"
  end: string;             // "10:10 AM"
  track: string;           // TrackId, or "main-stage"
  trackLabel: string;      // "Main Stage / All Tracks"
  title: string;           // verbatim from csc26-agenda.json
}

interface Speaker {
  slug: string;                    // matches the Wix /csc-speakers/<slug> URL
  name: string;                    // as printed, e.g. "DR. RAND WALTZMAN"
  tagline: string;                 // canonical — roster + bio page (§1)
  taglineConference: string | null;// landing-page variant; non-null for 4 keynotes
  track: SpeakerTrack;
  trackLabel: string;              // "Keynote Speakers", "Defending Humans", …
  bioPage: string;                 // source URL, for redirects
  headshot: string;                // "/assets/speakers/<file>" — 31 still to copy in
  headshotWidth: number;
  headshotHeight: number;
  headshotLowRes: boolean;         // true when min dimension < 300px (16 speakers)
  linkedin: string | null;         // null for bruce-schneier, constantine
  credentials: string[];           // 3–8 bullets, verbatim
  sessionTitle: string | null;     // from the bio page; null for the same two
  bio: string[];                   // verbatim paragraphs, unsplit (§6)
  bioWordCount: number;
  sessions: SpeakerSession[];      // joined from csc26-agenda.json; 1–3 each
}
```

Integrity, as generated:

- 35 / 35 have a headshot, a tagline, credentials, a non-empty `bio`, and ≥1 session.
- 35 / 35 taglines agree between the roster page and the bio-page `H2`.
- Multi-session: `sumona-banerji` (3), `sara-rabinovitch` (2), `chloe-tucker` (2),
  `james-mcquiggan` (2).
- All prose is quoted verbatim from `handoff/content/csc-speakers__*.md`. Nothing was
  summarised, rewritten, or supplied from outside the crawl.
