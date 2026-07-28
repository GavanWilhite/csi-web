# Institute Content Spec

Source: the 2026-07-27 crawl in `handoff/`. Target: the Next.js app at `csi-web/`
(CSS Modules, content-as-typed-data in `lib/`, dark-only token system).

**All quoted copy in this document is verbatim from `handoff/content/*.md` or
`handoff/raw-html/*.html`.** Where a page is cited, the claim comes from that page.
Anything that is a recommendation rather than source content is marked *Rec.*

Two parts, different maturity:

- **Part 1 — ship now.** The institute elements that go onto the conference site in
  the near-term release. Implementation-ready.
- **Part 2 — later phase.** The full `/institute` single-page scroller. Planning
  material.

Not in scope for this document: the homepage YouTube scroller and the Published
Research module (handled separately).

---

---

# PART 1 — SHIP NOW

Scope: two things land on the conference site. (a) The **Cognitive Attack Taxonomy**
and its sibling Active Projects. (b) A rationalised set of **institute CTAs**.

## 1.1 Cognitive Attack Taxonomy (CAT)

**Source:** `content/research.md` → `raw-html/research.html`, section `Active Projects`.

### Section framing (the CAT's parent block on the source page)

The CAT is the first of three cards under an H1 `Active Projects`, introduced by:

> Our active research projects push boundaries and produce actionable tools for
> practitioners, policymakers, and educators.

### The CAT card — full verbatim copy

Heading (H3 on source):

> Cognitive Attack Taxonomy (CAT)

Body, two paragraphs:

> The CAT is a shared reference framework designed to classify and understand
> cognitive threats across domains.

> It considers cognitive vulnerabilities, exploits, tactics/techniques, tools, and
> procedures, relative to cognitive processing in the broadest possible sense within
> biological (humans and animals) and artificial (embodied and virtual) cognitive
> systems at all levels. Cognition from this perspective refers to information
> processing systems, which may, or may not, include awareness, consciousness, or
> sentience.

Button:

| Label | Destination | Attributes on source |
|---|---|---|
| `View the CAT` | `https://cognitiveattacktaxonomy.org/` | `target="_blank" rel="noreferrer noopener"` |

### Image

| Source name | File in `handoff/` | Dimensions | Bytes |
|---|---|---|---|
| `android-manipulating-holographic-screen.png` | `assets/other/439552_43b9395afd7c4458873a9b2e6cb23955~mv2.png` | 1984 × 2400 | 4,052,553 |

Resolved via `assets/asset-index.json`. It is a tall 4:5 portrait abstract, not a
screenshot of the taxonomy — treat it as decorative art, not a product shot. Needs
downscaling before it ships (4 MB PNG); re-encode to AVIF/WebP at ~800 × 968.

Alt text on the source page is the filename. *Rec:* write real alt or mark it
`alt=""` and let the heading carry the meaning — it is decorative.

### *Rec:* how CAT should present on the conference site

Add **one new section** to `app/page.tsx`, between `<TravelBriefs />` and
`<TicketsCta />`:

- Kicker `08 / INSTITUTE`, heading **"From the Institute"**. The conference page
  numbers sections sequentially in DOM order (`01 ABOUT`, `02 SPEAKERS`, `03 TRACKS`,
  `04 AGENDA`, `05 SPONSORS`, `06 VENUE`, `07 TRAVEL BRIEFS`, `08 REGISTRATION`), so
  `TicketsCta` renumbers `08 → 09`. That is a one-line change in
  `components/TicketsCta.tsx`; the index is a design device, not navigation, so
  nothing else depends on it.
- Placement rationale: the conference page's closing move is the registration ask.
  A credibility section ("this conference is run by an institute that ships a public
  research artifact") belongs immediately before that ask, not after it.
- Layout: **CAT as the lead card** — image left, copy right, `View the CAT` as a
  primary button. It is the only one of the three with a live public destination and
  a self-contained definition, so it carries the section on its own.
- Add `{ href: "#institute", label: "INSTITUTE" }` to `navLinks` in `lib/event.ts`.
  Per the brief the nav gains an "Institute" item; until `/institute` exists it
  anchors to this section rather than 404ing.
- Content goes in a new `lib/institute.ts` as typed data, matching `lib/content.ts`.
  Do not inline the copy in the component.

### 1.2 The two sibling Active Projects

Same `Active Projects` block on `content/research.md`.

**Evil Digital Twin** — verbatim:

> Evil Digital Twin is an ongoing talk series by Dr. Vindy Sawyer and Dr. Matthew
> Canham. It equips the cybersecurity practitioner community to understand the
> cognitive security implications of human digital twins, agentic systems, and
> digital cognitive agents. The series bridges current research with real-world
> practitioner concerns at the intersection of cognitive security, AI capability, and
> adversarial system design.

| Label | Destination |
|---|---|
| `Evil Digital Twin.ai` | `https://www.evildigitaltwin.ai/` |

Image: `lone-figure-observing-digital-hologram.png` →
`assets/other/439552_5a511721e48f4b9a9bbfd0325f662903~mv2.png` (1984 × 2400, 5.6 MB).

⚠ **Name conflict.** This copy says **"Dr. Vindy Sawyer"**. Every other page says
**"Dr. Ben D. Sawyer"** — `content/hsc2025.md` credits the same Evil Digital Twin
talks at Black Hat and DEF CON to "Dr. Ben D. Sawyer; Dr. Matthew Canham", and
`/staff/dr.-ben-d.-sawyer` is the Board Chair's bio. Do not ship "Vindy" without a
human confirming it.

**Cognitive Security Research Library** — verbatim:

> Access white papers, reports, frameworks, and foundational documents from our team
> and contributors. Open knowledge for an open future.

Button: `COMING SOON` — on the source this is `<button type="button">` with **no
destination**. It is an inert placeholder, not a link.

Image: `figure-reaching-toward-rippling-digital-artifacts.png` →
`assets/other/439552_76ad0e6bc4b84ab8bb6413187d91b80e~mv2.png` (1984 × 2400, 5.8 MB).

### *Rec:* ship alongside CAT, or wait?

| Project | Ship now? | Why |
|---|---|---|
| **Cognitive Attack Taxonomy** | **Yes** | Live external destination, self-contained definition, the strongest single proof that the Institute produces public work. |
| **Evil Digital Twin** | **Yes, but demoted** | Live destination (`evildigitaltwin.ai`) and directly relevant to the conference audience — two of its talks were CSC-adjacent Hacker Summer Camp sessions. Render as a compact secondary link beneath CAT, not a peer card. Blocked on resolving the Sawyer name. |
| **Cognitive Security Research Library** | **No** | It has no destination. Shipping a third card whose button does nothing reproduces the exact defect being fixed elsewhere on this page. Hold until the library exists. |

## 1.3 Complete CTA inventory — all 42 top-level pages

Method: every `wixui-button` anchor, every form submit control, and every `mailto:`
in `raw-html/*.html` for the 42 top-level slugs, de-duplicated per page.
`«CSI»` = `https://www.cognitivesecurityinstitute.org`.

### Sitewide chrome — present on all 42 Wix pages

| Label | Destination | Where |
|---|---|---|
| `Conference` | `«CSI»/cognitive-security-conference` | nav |
| `Speakers` | `«CSI»/cognitive-security-conference-speakers` | nav |
| `Venue` | `«CSI»/csc26-venue` | nav |
| `Sponsors` | `«CSI»/csc26-sponsors` | nav |
| `Agenda` | `«CSI»/csc26-agenda` | nav |
| `DONATE` | `«CSI»/donate` | nav (button) |
| `Disclaimer` | `«CSI»/disclaimer` | footer |
| `Sitemap` | `«CSI»/sitemap` | footer |
| `Donate` | `«CSI»/donate` | footer |
| `Contact` | `«CSI»/contact` | footer |

The whole global nav is conference-only. There is **no institute navigation anywhere
on the live site** — every institute page is reachable only from `/sitemap`, from
in-body links, or by URL. That is the single biggest structural finding in this
inventory.

### Body CTAs, by page

**`/` (home)**

| Label | Destination |
|---|---|
| `Conference Registration` | `«CSI»/cognitive-security-conference` |
| `COURSE WAITLIST` | `«CSI»/course-waitlist-form` |
| `Apply for Membership` | `«CSI»/join` |
| `View More` | `«CSI»/research` |
| `Become a Member` | `«CSI»/join` |
| `Donate` | `«CSI»/donate` |

**Conference cluster**

| Page | Label | Destination |
|---|---|---|
| `/cognitive-security-conference` | `Purchase Tickets` | `«CSI»/cognitive-security-conference` ⚠ **broken — self-link** |
| | `See Full Speakers List` | `«CSI»/cognitive-security-conference-speakers` |
| | `Get room block details` | `https://res.windsurfercrs.com/ibe/details.aspx?propertyid=16539&nights=1&checkin=8/5/2026&group=0826CSIRB&lang=en-us` |
| | `View on Zeffy` | `https://www.zeffy.com/en-US/ticketing/cognitive-security-conference` |
| | `info@cognitivesecurityinstitute.org` | `mailto:…?subject=I'm%20interested%20in%20the%20CSC%202026%20Prospectus` |
| `/csc26-tickets` | `View on Zeffy` | same Zeffy ticketing URL |
| `/csc26-venue` | `Get room block details` | same room-block URL |
| `/csc26-agenda` | `Thursday`, `Friday` | `«CSI»/csc26-agenda` (JS tab controls, self-link by design) |
| `/csc-speakers` | `Read More` × 35 | `«CSI»/csc-speakers/<slug>` |
| `/csc26-sponsors`, `/csc26-speakers`, `/cognitive-security-conference-speakers`, `/copy-of-csc` | prospectus mailto only | as above |

**Institute pages**

| Page | Label | Destination |
|---|---|---|
| `/about` | — | **no body CTA** |
| `/research` | `Learn More` | `«CSI»/initiatives` |
| | `View the CAT` | `https://cognitiveattacktaxonomy.org/` |
| | `Evil Digital Twin.ai` | `https://www.evildigitaltwin.ai/` |
| | `COMING SOON` | ⚠ **dead — `<button type="button">`, no destination** |
| | `View More` | `«CSI»/publications` |
| | `Contact Us` | `«CSI»/contact` |
| | `Partnerships` | `«CSI»/supporters` ⚠ **label/destination swap** |
| | `Corp Support` | `«CSI»/partners` ⚠ **label/destination swap** |
| `/publications` | `Apply Today!` | ⚠ **dead — no destination** |
| `/journal` | `Submit Your Interest` | `https://docs.google.com/forms/d/e/1FAIpQLScsx84hWv3OL8WHUSKrdCeVhbk3DcZAojOP3hnXCA9_mOJm8Q/viewform?usp=publish-editor` |
| `/initiatives` | `Contact Us` | `«CSI»/contact` |
| `/ctx` | `Become a Member` | `«CSI»/join` |
| | `Partnerships` | `«CSI»/supporters` ⚠ swap |
| | `Supporters` | `«CSI»/partners` ⚠ swap |
| | `Contact Us` | `«CSI»/contact` |
| `/shield` | — | **no body CTA at all** — the page says "get in touch" and references a LinkedIn community, and links neither |
| `/edu` | `Register` | form submit (email waitlist) |
| | `Become a Member` | `«CSI»/join` |
| | `Contact Us` | `«CSI»/contact` |
| `/resources` | `Watch on Youtube` | `https://youtube.com/@cognitivesecurityinstitute?si=rsNX9DQr5X8RYnsP` |
| | `Apply Now` | `«CSI»/join` |
| | `Contact Us` | `«CSI»/contact` |
| | `Events` | `«CSI»/events` |
| `/media` | — | **none** (page is empty: "Check back soon") |
| `/events` | `CognectCon.com` | `https://www.cognectcon.com/` |
| | `Register` | form submit (village mailing list) |
| | `Contact Us` | `«CSI»/contact` |
| | `Join Today!` | `«CSI»/join` |
| `/blog` | 9 category filters | `«CSI»/blog/categories/<slug>` |

**Membership, partnership, utility**

| Page | Label | Destination |
|---|---|---|
| `/join` | `Apply Today!` | `«CSI»/apply` |
| | `Apply for Free Membership` | `«CSI»/apply` |
| | `Contact Us` | `«CSI»/contact` |
| | `Explore Partnerships` | `«CSI»/supporters` ⚠ swap |
| | `Visit Supporters Page` | `«CSI»/partners` ⚠ swap |
| `/apply` | `Submit` | form submit |
| `/copy-of-application` | `Submit` | form submit |
| `/donate` | `Continue` | Zeffy-hosted form. ⚠ The URL is **not a CSI page** — canonical is `https://www.zeffy.com/en-US/donation-form/support-our-mission-28` |
| `/partners` | `Contact Us` | `«CSI»/contact` |
| | `Learn More About CSI` | `«CSI»/about` |
| | `Request a Deck` | `«CSI»/contact` |
| `/supporters` | `Contact Us` | `«CSI»/contact` |
| `/contact` | `Send` | form submit |
| `/course-waitlist-form` | `Submit` | form submit |
| `/waitlistquestionnaire` | `Submit` | form submit |

**People pages**

| Page | Label | Destination |
|---|---|---|
| `/meet-our-team` | 9 portrait cards | `«CSI»/staff/<slug>` |
| `/board-of-directors` | 3 portrait cards | `«CSI»/staff/<slug>` |
| `/strategic-advisory-council` | 10 portrait cards | `«CSI»/council/<slug>` |
| `/staff` | `Read More` × 12 | `«CSI»/staff-1/<slug>` ⚠ **broken — all 12 targets are empty stubs** |

**Past events**

| Page | Label | Destination |
|---|---|---|
| `/hsc2025` | `Speaking Events`, `CSI Meetups` | `«CSI»/hsc2025` (in-page jumps) |
| | `EvilDigitalTwin.ai` × 3 | `https://www.evildigitaltwin.ai/` |
| | `Apply Today!` | ⚠ **dead — no destination** |
| | `Contact Us` | `«CSI»/contact` |
| | `Donate` | `«CSI»/donate` |
| | inline | `bsideslv.org/talks#WMZJTT`, `bsideslv.org/map`, `blackhat.com/us-25/briefings/schedule/#evil-digital-twin-too-…`, `barcodesecurity.com/hsc2025-csi/`, `eventbrite.com/e/i-am-machine-premiere-tickets-1432321615509` |
| `/ncs2025` | `Download Slide Deck` | `«CSI»/_files/ugd/439552_c88db25c2c2943ceb464364a14b09951.pdf` |
| | `Apply Today!` | ⚠ **dead — no destination** |
| | `Contact Us` | `«CSI»/contact` |
| | `Donate` | `«CSI»/donate` |

**No body CTAs at all:** `/about`, `/media`, `/shield`, `/disclaimer`, `/sitemap`,
`/meet-our-team`, `/board-of-directors`, `/strategic-advisory-council`,
`/thankyou`, `/thank-you-for-completing`, `/course-waitlist-survey-thank-you`,
`/csc26-speakers`, `/cognitive-security-conference-speakers`, `/blog`.

### Broken or unexpected — the full defect list

1. **`Purchase Tickets` self-links.** The conference hero's primary CTA points at the
   page it is on. Already fixed in `csi-web` (`links.tickets` → Zeffy).
2. **Four dead buttons.** `Apply Today!` on `/publications`, `/hsc2025`, `/ncs2025`
   and `COMING SOON` on `/research` are all `<button type="button">` with no
   destination. The three `Apply Today!` instances sit under the heading "Join us to
   help protect what makes us human: our ability to think for ourselves" and clearly
   intend `/apply` or `/join`.
3. **Partnerships / Supporters are systematically swapped.** On `/research`, `/ctx`,
   `/join` *and* `/sitemap`, a link labelled "Partnerships" goes to `/supporters` and
   a link labelled "Supporters" (or "Corp Support", or "Visit Supporters Page") goes
   to `/partners`. Meanwhile the pages' own H1s are `PARTNERSHIP` on `/partners` and
   `SUPPORTERS` on `/supporters`. **Every navigational reference on the site
   contradicts the destination page's own heading.** Needs a human decision, not a
   code fix.
4. **`/staff` links exclusively to blank pages.** All 12 `Read More` buttons target
   `/staff-1/<slug>`, which contain no prose — just a name, a role, a Wix
   `Image-empty-state.png` placeholder, a leaked collection sort token (`2`, `2a`,
   `28`…) and dangling `Previous`/`Next`. The real bios are at `/staff/<slug>`.
5. **`/donate` is not a CSI page.** It resolves to
   `zeffy.com/en-US/donation-form/support-our-mission-28`. Every "Donate" CTA on the
   site is really an offsite handoff. *Rec:* point `links.donate` at the Zeffy URL
   directly rather than through the redirect.
6. **Two page titles are wrong.** `/supporters` has `<title>Speakers | Cognitive
   Security Institute</title>`; `/partners` has `<title>Sponsors | …</title>`;
   `/staff` has `<title>Staff2 (List) | …</title>` — an internal Wix collection name.
7. **Alternate domain in links.** `/hsc2025` links speaker bios on
   `cognitivesecurity.institute` rather than `cognitivesecurityinstitute.org`
   (5 occurrences, the only page that does this).
8. **`/shield` has zero outbound links** despite copy promising an "active LinkedIn
   community" and inviting readers to "get in touch". The only SHIELD LinkedIn URL
   anywhere in the crawl is `linkedin.com/groups/18699026/`, buried in a YouTube
   video description on the home page.

### *Rec:* which CTAs belong on the conference site now, and where

The conference page currently exposes: `TICKETS` (nav), `SPEAKERS`/`AGENDA`/`VENUE`/
`SPONSORS` (nav anchors), room block, two travel-brief PDFs, sponsor prospectus
mailto, and `DONATE`/`CONTACT`/`DISCLAIMER`/`SITEMAP` (footer). Everything below is
an addition or a correction to that.

| CTA | Label | Destination | Placement | Why |
|---|---|---|---|---|
| **View the CAT** | `VIEW THE CAT` | `https://cognitiveattacktaxonomy.org/` | new `08 / INSTITUTE` section, primary button | The shippable institute artifact. §1.1. |
| **Evil Digital Twin** | `EVILDIGITALTWIN.AI` | `https://www.evildigitaltwin.ai/` | same section, secondary text link | Live destination, conference-relevant. Blocked on the Sawyer name. |
| **Institute** | `INSTITUTE` | `#institute` | nav, after `SPONSORS` | The brief's nav requirement. Re-point to `/institute` when it exists. |
| **Become a member** | `BECOME A MEMBER` | `«CSI»/join` | `08 / INSTITUTE` section, and footer beside `DONATE` | Membership is free and is the Institute's primary conversion — it appears as a CTA on 6 source pages. Currently absent from the conference site entirely. |
| **Donate** | `DONATE` | `https://www.zeffy.com/en-US/donation-form/support-our-mission-28` | footer (already present) — **change the URL** | `links.donate` currently points at `«CSI»/donate`, which is only a redirect to Zeffy. Go direct. |

**Deliberately not added now:**

- `COURSE WAITLIST` → `/course-waitlist-form`. The course it gates does not exist
  (`/edu` reads "We're in the final stages of announcing our first live course" and
  `/initiatives` lists CSI Academy as "COMING SOON!"). Adding a waitlist CTA to a
  signed-off conference page adds a second competing conversion for a product with no
  ship date. Revisit when the Academy launches.
- `Partnerships` / `Supporters`. Blocked on defect 3 — do not propagate a
  label/destination swap onto the new site.
- `Watch on Youtube`, `CognectCon.com`, `Submit Your Interest` (journal),
  `Download Slide Deck`. Institute-audience CTAs with no conference relevance; they
  belong in Part 2.
- Any `Contact Us` beyond the existing footer `CONTACT`. The source site has 10
  separate `Contact Us` buttons all pointing at the same form; one is enough.

---

---

# PART 2 — LATER PHASE: the `/institute` page

Structure decided by the client: **a single-page scroller**, built the same way as
the conference page — one route, stacked full-width sections, sticky nav with
click-to-scroll anchors. `/institute` gets **its own menu** listing its own sections;
it does not reuse `SPEAKERS`/`AGENDA`/`VENUE`/`SPONSORS`.

## Volume, measured

Body prose per source page with nav/footer chrome stripped (script:
`scratchpad/measure.py`; "chars" in `02-CONTENT-INVENTORY.md` include ~1,400 chars of
per-page boilerplate, so those numbers overstate by 2–5× on thin pages).

| Page | Words | Page | Words |
|---|---|---|---|
| `index` | 1,757 *(≈1,600 of it is YouTube descriptions — not page copy)* | `join` | 470 |
| `research` | 463 | `events` | 461 |
| `blog` (index) | 439 | `hsc2025` | 434 |
| `about` | 363 | `publications` | 361 |
| `ctx` | 336 | `initiatives` | 334 |
| `resources` | 332 | `partners` | 322 |
| `journal` | 318 | `shield` | 280 |
| `strategic-advisory-council` | 253 | `supporters` | 237 |
| `apply` | 154 (form labels) | `ncs2025` | 147 |
| `edu` | 116 | `staff` | 113 |
| `disclaimer` | 90 | `meet-our-team` | 76 |
| `contact` | 72 (form) | `media` | 42 (empty) |
| `board-of-directors` | 34 | `donate` | 37 (Zeffy) |

**Total unique institute prose ≈ 4,000 words**, plus **≈ 3,700 words** across 22
person bios, plus **≈ 10,600 words** across 13 blog posts.

Deduplication is significant and real — these blocks are repeated verbatim:

| Repeated block | Appears on |
|---|---|
| "Together we can reduce time-to-hire, increase economic mobility, and strengthen the cybersecurity workforce at scale." | `ctx`, `edu`, `initiatives` |
| "Schedule a briefing to learn how CSI amplifies national cyber readiness…" | `ctx`, `edu`, `initiatives`, `hsc2025`, `ncs2025` |
| "Join us to help protect what makes us human: our ability to think for ourselves." | `publications`, `hsc2025`, `ncs2025` |
| "part demo lab, part tactical playground" (CogSec Village description) | `events`, `hsc2025`, `ncs2025` |

4,000 words across 11 sections is roughly the conference page's own density. A single
scroller is a comfortable fit.

## Page furniture

- **Conference banner** at the very top, above the nav or as the first band, linking
  back to `/`. Per the brief. Carry `event.dates` and `event.venue` from
  `lib/event.ts` so it cannot drift from the conference page.
- **Sticky nav** — same `components/Nav.tsx` construction, different item list.
  Reuse the mobile drawer behaviour verbatim.
- **Footer** — reuse `components/Footer.tsx` unchanged. The 501(c)(3) / EIN /
  Oregon registration block is already correct there.

## Ordered sections — page structure *and* menu

Kicker convention matches the conference page (`Kicker` component: `index`, `label`,
`icon`, `heading`).

| # | Kicker label | Heading | Anchor | Menu? | Source |
|---|---|---|---|---|---|
| 01 | `MISSION` | A human-centered approach to security | `#mission` | **Yes** | `about` |
| 02 | `DEFINITION` | What is cognitive security? | `#definition` | No — reads as part of 01 | `about` |
| 03 | `FOCUS 5` | The Focus 5 pillars | `#focus-5` | No — visual, scrolled past | `initiatives`, `research` |
| 04 | `RESEARCH` | Research and active projects | `#research` | **Yes** | `research` |
| 05 | `PUBLICATIONS` | Publications and the Journal | `#publications` | No — adjacent to 04 | `publications`, `journal` |
| 06 | `PROGRAMMES` | SHIELD and CTX | `#programmes` | **Yes** | `shield`, `ctx` |
| 07 | `EVENTS` | Events and community | `#events` | **Yes** | `events`, `resources` |
| 08 | `TEAM` | The people | `#team` | **Yes** | `meet-our-team`, `board-of-directors`, `strategic-advisory-council`, 22 bios |
| 09 | `PARTNERS` | Partners and supporters | `#partners` | No — adjacent to 10 | `partners`, `supporters` |
| 10 | `JOIN` | Join the movement | `#join` | **Yes** | `join` |
| 11 | `SUPPORT` | Support our mission | `#support` | No — the nav's `DONATE` button is this section's CTA | `donate` |

**Menu = 6 anchors + 1 button**, mirroring the conference nav's 4 anchors + `TICKETS`:

```
MISSION   RESEARCH   PROGRAMMES   EVENTS   TEAM   JOIN   [ DONATE ]
```

Sections 02, 03, 05, 09 and 11 are scrolled past. Each sits immediately after the
menu item that covers it, so no menu target is more than one section away from any
content.

---

### 01 / MISSION — "A human-centered approach to security"

Source: `content/about.md`.

Deck (H6 under the `ABOUT US` H1):

> The Cognitive Security Institute defends cognitive security — across human,
> artificial, and hybrid cognitive systems.

Body:

> The Cognitive Security Institute maps, defends, and advances understanding of
> cognitive attack surfaces, across human, artificial, and hybrid cognitive systems.

> In the digital age, our thoughts, beliefs, and decisions are under constant attack.
> Sophisticated adversaries use cognitive warfare to erode trust, manipulate
> perceptions, and destabilize societies. These threats target past our systems, to
> our very minds.

> Traditional cybersecurity alone isn't enough.

> We need cognitive security.

Then, under the H1 `A Human-Centered Approach to Security`:

> We bridge the gap between traditional cybersecurity and a growing spectrum of
> cognitive attack surfaces — human, artificial, and hybrid.

> We're building a special community where talent, taxonomy, and telemetry converge to
> outpace emerging threats and reclaim our agency in an increasingly manipulated
> world.

> By combining rigorous research, open publication, and professional collaboration,
> CSI empowers people and organizations to build resilience, counter manipulation, and
> lead innovation in the AI era.

*Rec:* also fold in the home page's closing statement (`content/index.md`), which is
the only place the mission is stated in threat-first terms:

> As sophisticated adversaries blend state and criminal tactics in order to target
> everyday citizens and organizations across sectors, the Cognitive Security Institute
> is building the future of resilience.

> Through community, research, and awareness, we're crafting a global backbone for
> cognitive security.

> Our goal is to build resilience and proactive defenses against cognitive attacks on
> human, artificial, and hybrid intelligence systems, protecting their capacity to
> perceive, reason, decide, and act.

⚠ **Three conflicting one-line mission statements.** `index` H1: "We define **and
defend** cognitive security — across human, artificial, and hybrid **cognition**."
`about` deck: "The Cognitive Security Institute **defends** cognitive security —
across human, artificial, and hybrid **cognitive systems**." `about` body: "…**maps,
defends, and advances understanding of cognitive attack surfaces**, across…". Pick
one. This is the sentence the whole page hangs on.

### 02 / DEFINITION — "What is cognitive security?"

Source: `content/about.md`, H2 `What is Cognitive Security?`.

> Cognitive attacks manipulate human minds, artificial cognition, or the hybrid teams
> they form together. These threats combine psychological, technological, and
> geopolitical tactics.

> CSI exists to proactively defend against them.

> Humanity is currently experiencing a phase transition in its relationship with
> technology and with itself. This transition will impact every aspect of our lives.
> The interconnection between people from distant parts of the globe will continue to
> present new opportunities and challenges. Technologically mediated communications
> make the challenge of determining truth from fiction difficult at best and
> impossible at worst. The ability to project force from remote parts of the globe are
> giving rise to new dimensions of security.

⚠ The third paragraph is markedly more academic than everything around it and
contains a grammatical error ("The ability to project force … **are** giving rise").
It is exactly the register the client called "academic trying to be cool". *Rec:* cut
or rewrite; flag for the client either way.

### 03 / FOCUS 5 — "The Focus 5 pillars"

Source: `content/initiatives.md`.

Intro:

> At the Cognitive Security Institute, our strategy is a living framework rather than
> a fixed roadmap. Each initiative is designed to move the field of cognitive security
> forward by aligning with our Focus 5: five interwoven domains that guide everything
> we build, research, and share.

> These five domains are symbiotic focus areas which inform every initiative, course,
> partnership, and publication we launch. Together, they collectively define what it
> means to defend cognition across human, artificial, and hybrid systems.

The five, verbatim from `initiatives`:

| Pillar | Blurb |
|---|---|
| **AI Security & Threat Analysis** | Understanding and mitigating the use of synthetic media and automated systems in attacks of all complexities and actors. |
| **Cognitive Resilience** | Developing strategies to strengthen cognitive resilience and accurate sensemaking under adversarial conditions. |
| **Cognitive Systems Security** | Integrating psychology, behavioral science, and systems engineering into security practices that address cognitive attack surfaces across human, artificial, and hybrid systems. |
| **Neurosecurity** | Exploring how BCIs, neural data, and bio-digital convergence challenge traditional concepts of privacy, security, and identity. |
| **Cognitive Warfare & Tradecraft** | Tracking, modeling, and preparing for adversarial manipulation techniques targeting beliefs, behaviors, and decisions. |

⚠ **The Focus 5 are named differently on two pages.** `content/research.md` lists
them under "CSI's Focus 5 Areas" as: *AI Security & Threat Analysis, Cognitive
Systems Security, **Cognitive Warfare Tradecraft**, **Cognitive Resilience &
Wellbeing**, Neurosecurity* — with no blurbs. `initiatives` has the blurbs and
different names for two of the five. *Rec:* take `initiatives` as canonical (it is
the only version with definitions) and confirm with the client.

Images exist for all five and are shared between the two pages —
`assets/other/439552_cddcc0018caf4055bb5c230833d458c4~mv2.jpg` (AI eye),
`…e906e57f5849493cbbb5b731d0713495~mv2.jpg` (lotus),
`…3460c463750744708a7e530c4c10f1c0~mv2.jpg` (pixelated vision),
`…031bd075bf1e4aee899f25dacb2b0626~mv2.jpg` (crystalline brain),
`…f0ab06c1f81f44e5af3bbddecc94f029~mv2.png` (digital echo).

### 04 / RESEARCH — "Research and active projects"

Source: `content/research.md`.

Deck:

> From Theory to Tactical Cognitive Standards

> Our research incubator bridges the gap between academic insight and real-world
> application. By unifying open standards, shared data, and interdisciplinary
> expertise, we're shaping the field of cognitive security one breakthrough at a time.

Active Projects intro + the three project cards: **full copy in §1.1 and §1.2 above.**
By the time `/institute` ships, the Research Library may have a destination — check
before rendering `COMING SOON`.

Closing block:

> Our incubator thrives on partnerships. If you're a researcher, academic,
> practitioner, investor, or innovator in the space, we'd love to hear from you.

### 05 / PUBLICATIONS — "Publications and the Journal"

Source: `content/publications.md`, `content/journal.md`.

Publications deck:

> Insight that moves the field of cognitive security forward.

> We publish frameworks, workshop reports, essays, and field guides that explore the
> evolving landscape of cognitive security—from frontline challenges to strategic,
> long-range thinking.

> Whether it's co-developed with national institutions, emerging from live events, or
> authored by members of our global community, each publication reflects our
> commitment to principled, actionable insight.

Journal:

> Cognitive Security JOURNAL — Open-access peer-reviewed scientific papers, case
> studies, and editorials

> The Official Journal of the Cognitive Security Institute

> Articles published in Cognitive Security are open-access peer-reviewed scientific
> papers, case studies, and editorials. It is currently under the leadership of
> Robert H. Thomson.

> The objective of the journal is to promote critical awareness of issues in Cognitive
> Security by providing a venue for scholarly debate around ideas and problems in
> understanding cognitive attack surfaces across human, artificial, and hybrid
> cognitive systems. Our mission is to support Cognitive Security education by
> providing scientific and pedagogical information to its readership, to facilitate
> interdisciplinary communication among researchers, and to offer a prestige
> publication supportive of interdisciplinary investigation across the full scope of
> cognitive security.

> To accomplish this, Cognitive Security is dedicated to fair treatment of reviewers
> and editorial staff. Reviewers are vetted and paid fairly for their reviewing
> services. The Journal operates on a cost-recovery basis, leveraging a modest
> submission fee to offset reviewing expenses and an article processing fee (APC) for
> accepted Open Access submissions. We also apply 15% of our APC fees to support
> waivers for underserved populations and those demonstrating financial need.

The journal disclaimer paragraph ("States of fact and opinion in the articles in
Cognitive Security are those of the respective authors…") should move to `/disclaimer`
rather than sit mid-scroller. CTA `Submit Your Interest` → the Google Form URL in §1.3.

The 13 posts, for the in-page list (title · author · date · read time · categories):

| Title | Byline | Date | Cats |
|---|---|---|---|
| Developing a Neurosecurity Framework to Defend Against the Coming Neurowar | mcanham | Jan 12 (2026) · 7 min | Neurosecurity, Cognitive Warfare |
| Coupons as Cognitive Malware: Attacking Interconnected Systems | mcanham | Dec 9, 2025 · 9 min | — |
| What Can Cognitive Security Learn From The B-17 Flying Fortress? | CSI | Nov 18, 2025 · 3 min | Cognitive Resilience, Human-Centered Cyber |
| Darwin Monkey: Next Generation Neuromorphic Computing… | Deft9 Solutions | Nov 11, 2025 · 6 min | Research, AI Security, Cognitive Warfare |
| NIST Special Publication: Minding the Gaps in Human-Centered Cybersecurity | CSI | Apr 2, 2025 · 1 min | Research, Human-Centered Cyber |
| Neurosecurity: Human Brain Electro-Optical Signals as MASINT | CSI | Mar 1, 2020 · 1 min | Neurosecurity, Research |
| The Enduring Mystery of the Repeat Clickers | CSI | Aug 1, 2019 · 1 min | Research, Human-Centered Cyber |
| Developing Training Research to Improve Cyber Defense of Industrial Control Systems | CSI | Sep 1, 2018 · 1 min | Cognitive Warfare, Research |
| Socio-technical communication: The hybrid space and the OLB model… | CSI | Jul 3, 2018 · 1 min | Cognitive Warfare, Research |
| Understanding Online Information Operations: … (INSITE) | CSI | Jul 3, 2018 · 1 min | Research, Cognitive Warfare, Cognitive Resilience |
| A Computational Social Science Approach… | CSI | Jan 1, 2018 · 1 min | Research, Human-Centered Cyber |
| Macrocognition Applied to the Hybrid Space… | CSI | May 28, 2017 · 1 min | Cognitive Warfare, Research |
| Exploring the Hybrid Space | CSI | Jun 21, 2016 · 1 min | Research, Cognitive Warfare |

⚠ Bylines are Wix account names (`mcanham`, `CSI`, `Deft9 Solutions` — the last is a
vendor, not an author). Real author lists exist inside the post bodies (e.g. "Matthew
Canham, Stephen M. Fiore, Michael Constantino, Bruce Caulkins, Irwin Hudson, Lauren
Reinerman-Jones"). Use those, not the account names.

### 06 / PROGRAMMES — "SHIELD and CTX"

Source: `content/shield.md`, `content/ctx.md`.

**SHIELD** — full verbatim:

> Welcome to SHIELD
> Security & Human Insight for Educating Leaders on Defence
> Lead: Holly-Jane Grayling

> People aren't the weakest link - they're security's greatest strength.

> **What is SHIELD?** We are a free global community for professionals, researchers,
> and enthusiasts passionate about human risk, behavioural security, and cognitive
> resilience.

> We connect academia and industry to explore a science-first, evidence-based approach
> to understanding and managing human risk in an increasingly complex digital world.

> Through collaboration, research, expert discussions, and shared insight, SHIELD
> creates a space where security, psychology, behavioural science, risk, and technology
> intersect - helping organisations move beyond awareness alone toward measurable
> human resilience.

Why join (4 items):

| | |
|---|---|
| **Learn What Works** | Real-world strategies, tested approaches, and honest lessons from the field. |
| **Share your Experience** | Contribute insights, challenges, and lessons from your own work. |
| **Build your Network** | Connect through our with a diverse, global community across sectors. ⚠ *garbled — "Connect through our with a"* |
| **Your Space. Your Pace.** | A flexible, no-pressure community you can engage with at your own pace. |

Activities (4 items):

| | |
|---|---|
| **Monthly Meetings** | We meet virtually every month and record the sessions. |
| **Upskilling Sessions** | Every 3rd session is more practical where you'll learn new skills or polish existing ones. |
| **Private Community** | We have an active LinkedIn community sharing news, resources and insight between sessions. |
| **Special Projects** | We are tackling some of the biggest challenges in our field specifically, phishing simulations and AI cognitive resilience. |

Closing:

> **Want to Collaborate?** We're always keen to connect with presenters, researchers,
> lived-experience voices, and professionals who want to contribute to meaningful
> conversations and shared learning. If you have ideas, insights, research, or
> experiences to share, get in touch.

⚠ SHIELD uses British spelling (`behavioural`, `organisations`, `Defence`) against US
spelling everywhere else on the site. It is the programme lead's own voice — decide
whether to normalise or preserve. ⚠ The page has **no links at all**; "get in touch"
and "active LinkedIn community" both need destinations (see Needs a human).

**CTX** — full verbatim:

> CYBER TALENT EXCHANGE (CTX)

> CTX is a powerful new initiative designed to bridge the growing disconnect between
> talented cyber professionals looking for work and organizations struggling to fill
> the roles that protect infrastructure, data, and trust.

> Across our networks, we've heard the same thing again and again:
> "I'm ready to work, but no one's hiring."
> "We've got open seats, but can't find qualified candidates."

> We believe the issue is a connection problem rather than a pipeline problem.

> The Cyber Talent eXchange intends to close that gap, aligning real-world skills with
> open roles faster and smarter.

> We're not starting from scratch. We're starting from community momentum and a wave
> of skilled cybersecurity professionals looking for their next mission. What we need
> now are the connectors—recruiters, headhunters, employers, funders—to bring this
> exchange to life.

> Join now to become an early-stage collaborator on this important cyber readiness
> initiative!

"We're Currently Seeking" — three numbered groups:

1. **Recruiters & Talent Partners** — "Are you a recruiter, hiring manager, or talent
   scout looking to place top-tier talent? Let us connect you with a motivated,
   pre-qualified pool of job seekers, from apprentices to seasoned pros."
2. **Employers & Workforce Partners** — "We're building an initiative that makes it
   easier for orgs of all sizes to hire faster, tap into diverse talent pools, and
   unlock internship funding. Early-stage partners will help shape the tools,
   pipelines, and support systems we develop."
3. **Funders & Sponsors** — "Philanthropy and public-private partnerships are the
   engine behind CTX, helping to: Build a no-cost program for talented job seekers.
   Expand outreach to underserved talent pools. Activate apprenticeships, contracts,
   and full-time placements."

Closing:

> Together we can reduce time-to-hire, increase economic mobility, and strengthen the
> cybersecurity workforce at scale.

*Rec:* also mention the **Phishing Golf Tournament** here — it is the third Active
Initiative on `content/initiatives.md` and the only one with a live destination:

> Instead of swinging clubs, cyber pros craft nine phishing emails across nine
> "holes," each targeting fictional personas with unique objectives and difficulty
> levels. — `https://phish.golf`

⚠ **CSI Academy** (`/edu`, `/initiatives`) is "COMING SOON!" with an email waitlist and
no course. Two of the three "Active Initiatives" are therefore not active. Confirm
whether the Academy still exists before giving it space.

### 07 / EVENTS — "Events and community"

Source: `content/events.md`, plus the Meetings block from `content/resources.md`.

Deck:

> From community calls to expert-led workshops, our events bring people together to
> learn, connect, and shape the future of cognitive security.

**CognectCon** — "Cognitive Security Workshop":

> CognectCon is where the cognitive security community comes together to tackle the
> biggest problems we face.

> Each workshop focuses on a high-impact theme, gathering experts, creatives, and
> practitioners to collaboratively design actionable solutions. This is not your
> typical conference! CognectCon is a high-signal, low-fluff working summit built
> around innovation, cross-disciplinary insight, and momentum.

→ `https://www.cognectcon.com/`

**CogSec Village** — "Hands-On Immersive Experience":

> The Cognitive Security Village is our hands-on exploration space at major
> conferences and meetups—part demo lab, part tactical playground. Designed for
> hackers, researchers, and curious minds alike, the village showcases just how easy
> it is to hack the human brain.

> Expect: Interactive experiments in influence, bias, and deception · Live challenges
> and simulations · Community-driven talks, tools, and surprise drops

> Each village event is different, tailored to the space, audience, and moment. But
> one thing's always true: the most dangerous exploit is the one inside your mind.

**Workshops & Meetups** — "Virtual, On-Demand, and In-Person":

> Whether it's a tailored workshop for your team or a pop-up CSI meetup in your area,
> our events are designed to move the needle. We offer immersive learning and
> networking experiences that explore the frontiers of cognitive security.

> We've hosted: Custom workshops for cybersecurity teams, researchers, and educators ·
> Live cohorts on cognitive defense and resilience · In-person meetups sponsored by
> forward-thinking partners across the globe

**Private Community Meetings** — "Reflect, Connect, and Grow Together":

> In addition to public-facing workshops and events, CSI hosts a rhythm of curated,
> members-only gatherings designed for deeper dialogue and trust-based collaboration.

> These include: Weekly discussion forums where cognitive security professionals,
> researchers, and strategists unpack real-world challenges, recent research, and
> emerging threats in a trusted space. · Monthly SHIELD meetings (Security & Human
> Insight for Educating Leaders on Defense) that provide space for shared reflection,
> burnout prevention, and collective strategy among human-centered cybersecurity and
> human risk management professionals.

> These sessions are gated, high-signal, and intentionally low-profile to preserve
> their value and integrity.

⚠ `SHIELD` expands to "…Educating Leaders on **Defense**" here and "…on **Defence**"
on `/shield` and in Holly-Jane Grayling's role title. Pick one.

CTA: `Watch on Youtube` → `https://youtube.com/@cognitivesecurityinstitute`.

*Rec:* fold `/hsc2025` and `/ncs2025` into a small "Where we've been" list here —
Hacker Summer Camp 2025 (BSides LV, Black Hat USA, DEF CON 33) and National Cyber
Summit 2025. Both are dated hub pages for events a year past; they do not deserve
sections, but the fact that CSI ran a village at all three is worth one line.

### 08 / TEAM — "The people"

Sources: `meet-our-team` (9 staff), `board-of-directors` (3), `strategic-advisory-council`
(10 + the only real prose of the four roster pages), and 22 bios under `/staff/*` and
`/council/*`.

**Staff (9)** — names and roles verbatim:

| Name | Role |
|---|---|
| Dr. Matthew Canham | Executive Director |
| Winn Schwartau | Director of Special Projects |
| Leah Von Kreman | Volunteer Coordinator |
| K. Melton | Director of Community Events & Programs |
| Holly-Jane Grayling | Director of SHIELD (Security & Human Insight for Educating Leaders on Defence) |
| Royce J. Porter | Security Researcher |
| Anna Varfolomeeva | Director of Communications |
| Sarah Fuller | Senior Advisor - Strategy |
| Natilie McCallick | Administrative Assistant |

**Board of Directors (3):** Dr. Ben D. Sawyer (Board Chair), Dr. Tamara Schwartz
(Board Member), Dr. Robert Thomson (Board Member).

**Strategic Advisory Council (10)** — the only roster page with body copy:

> A council of trusted experts guiding our mission at the intersection of technology,
> psychology, and human resilience.

> The CSI Strategic Advisory Council (SAC) brings together trusted voices from across
> cybersecurity, psychology, defense, technology, education, and ethics. These
> individuals serve as critical thought partners, challenging us to think bigger (and
> smarter) and ensuring our work remains both visionary and grounded in real-world
> impact.

> The threats we face are complex, global, and evolving. No single perspective is
> sufficient to navigate them. That's why we've assembled a council that reflects the
> interdisciplinary, cross-sector nature of the field itself.

> The SAC exists not to oversee, but to amplify. To pressure-test ideas, share insights
> from lived experience, and offer strategic guidance as we build the future of
> cognitive security.

> The Council is non-governing and nonpartisan. Each member participates in a personal
> capacity, contributing their expertise in service of our shared mission.

Members: Adam Beal (Scientist, Entrepreneur, Venture Capitalist, Corporate
Strategist) · Dr. Calvin Nobles (Dean, School of Cybersecurity & IT, UMD) · Dr. Sean
Guillory (Board Member, Information Professionals Association) · Sumona Banerji
(Cyber-Psychology Researcher; Founder of MindShield) · Alexandra Bruce (Assistant Vice
President; Repeat Clicker Manager) · Dr. Gareth Doherty (Strategic Management Expert) ·
Oz Alashe (CEO and Founder, CybSafe) · Candy Alexander (Strategic AI Advisor;
Independent Consultant) · Dr. Rosanna Guadagno (Assoc. Prof. of Persuasive Information
Systems, University of Oulu) · Perry Carpenter (Chief Human Risk Management Strategist,
KnowBe4).

**Bio handling.** 22 bios, 55–382 words each, ~3,700 words total. *Rec:* render as a
portrait grid where each card opens a disclosure (`<details>`) with the full bio —
keeps all of it on the page, satisfies the single-scroller default, and avoids 22
routes for content that averages 170 words. Bios are already SSR'd so they stay
indexable.

⚠ Title contradictions to resolve before porting (all four rosters vs. the person's
own bio):

| Person | Roster says | Their bio says |
|---|---|---|
| Natilie McCallick | Administrative Assistant | "currently the **Director of Operations** at the Cognitive Security Institute" |
| Candy Alexander | Strategic AI Advisor; Independent Consultant | "**Chief Information Security Officer at NeuEon**" |
| Dr. Calvin Nobles | Dean, School of Cybersecurity & IT, **UMD** | "**University of Maryland Global Campus (UMGC)**" — a different institution |

⚠ Other bio-level issues: Oz Alashe's bio ends with a raw pasted Notion URL as visible
body text (strip it). Every second social slot is labelled "LinkedIn" regardless of
destination — actual targets include `canham.ai`, `winnschwartau.com`,
`scholar.google.com/citations`, `clarity.fm/adammbeal`, `beta.oulu.fi`. Eight people
have a "LinkedIn" label with no href at all. Dr. Rosanna Guadagno's bio describes a
book as "forthcoming" — check whether it has since published.

⚠ **Alt text is unusable sitewide.** Every roster grid reuses one filename for all
cards: `matthew.avif` for all 9 staff on `/about` and `/meet-our-team`, `bensaw.avif`
for all 3 board members, one hashed name for all 10 council members, and the literal
Wix placeholder `Image-empty-state.png` on every bio page. All 22 need alt text
written.

✅ **Good news on portraits:** unlike the conference speaker headshots, staff portraits
downloaded at **2048 × 2048** (`assets/people/`), so the team grid has real source
resolution to work with. One exception: `Calvin.png` is 6642 × 6689 (~44 MP) and needs
explicit downscaling; Natilie McCallick's is only 426 × 488 and is the only one served
as AVIF rather than PNG.

### 09 / PARTNERS — "Partners and supporters"

Sources: `content/partners.md` (H1 `PARTNERSHIP`, corporate programme, 14 logos),
`content/supporters.md` (H1 `SUPPORTERS`, 5 logos). ⚠ **Blocked on the swap defect
(§1.3 #3) — resolve which page is which before writing this section.**

From `partners`:

> In a world where everything can be faked, trust becomes the rarest asset. Join us in
> working to protect it.

> Our partnership program offers premium branding, thought leadership, and direct
> connection to the fastest-growing discipline in security: the defense of cognitive
> systems — human, artificial, and hybrid — against advanced AI manipulation and
> psychological cyber threats.

Six benefit tiles — **Brand Leadership** ("Position your brand at the frontier of
cognitive security — the essential next phase of cyber risk management — as AI-powered
social engineering becomes a defining threat."), **Talent Access** ("…responding to the
industry's 3.5 million unfilled security roles…"), **Thought Leadership**,
**Measurable Returns**, **Policy & Standards**, **Field Stewardship**.

> **CSI is Different** — Non-profit, vendor-neutral, and mission-first. · Rooted in
> advancing the science of cognitive security, not profit margins · Built by a global
> community, not gatekept by insiders. · Focused on unifying the field under shared
> standards.

From `supporters`:

> Securing the Future of Human Thought, Together

> We work with companies, institutions, and fellow non-profits who share our belief
> that cognitive security is critical infrastructure. Let's build something great
> together.

> Cognitive security is a multidisciplinary, global challenge. Regardless of your
> vertical, your partnership with CSI has the potential to accelerate innovative
> solutions at the intersection of technology, cybersecurity, psychology, and human
> resilience.

> **Ways to Partner** — Research Projects · Event Sponsorships · Educational
> Integration · Resource & Knowledge Sharing · Mission Support

Six benefit tiles: **Strategic Visibility**, **Network Integration**, **Subject Matter
Experts**, **Speaking & Co-Promotion**, **Exclusive Opportunities**, **Collaborative
Dev**.

Logos — `/partners` (14): KnowBe4, Leidos, Maro (`seekmaro.com`), Cybermaniacs, CybSafe,
Re-Thinking The Human Factor, GhostEye, Barcode Security, AwareGO, Get Real Security,
ObscureIQ, SwRI, Modus Cyberandi, PocketCISO. `/supporters` (5): OODA, ObscureIQ,
Maltego, Barcode Security, Belay7.

⚠ Three logo files are **not in the crawl** — Maro, Cybermaniacs and Maltego render as
empty links on `/partners`. All logos are third-party trademarks: see
`04-ASSET-GUIDE.md` before re-encoding.

### 10 / JOIN — "Join the movement"

Source: `content/join.md`.

> Become part of a global community advancing cognitive security across human,
> artificial, and hybrid systems.

> Join us to defend cognitive systems against the threats that target how we think,
> decide, and act.

> We're cultivating a thriving network of professionals, researchers, educators, and
> emerging leaders who see cognitive security as a collective mission rather than a
> competitive game.

> Membership is free and open to anyone aligned with our vision. It only requires a
> simple application. No dues or gatekeeping, just a commitment to a future where
> cognitive systems stay resilient and autonomy remains defendable.

> Our members come from every sector, discipline, and part of the world. What unites us
> is a shared belief: we must build the defenses that cognitive security demands,
> together.

Six member benefits, verbatim headings + blurbs:

| | |
|---|---|
| **Access to Exclusive Gatherings** | Private AMAs, off-the-record discussions, roundtables, and members-only forums designed for deeper, safer conversations. |
| **Cognitive Resilience** | Peer support spaces and practitioner resources designed for those on the cognitive front lines. |
| **Early Access to Resources & Recordings** | Watch expert presentations and access resources before they're released publicly. |
| **Direct Access to an Expert Community** | Connect with like-minded professionals across security, psychology, governance, academia, and more. |
| **Invitations to Cohorts & Program Pilots** | Get first dibs on joining workshops, research cohorts, and early-stage projects in cognitive security. |
| **Open Pathways to Contribution** | Whether you're a creator, researcher, strategist, or storyteller, we'll help you find your place in the field. |

**Professional Tier:**

> The Professional Tier is invitation-only, and serves as our SME-led working group, a
> space for high-trust collaboration.

> Members are nominated or selected based on demonstrated expertise, leadership,
> community engagement, or critical skillsets in cognitive security and adjacent
> domains. Professional members contribute to strategic projects, co-author content,
> and advise on the development of tools and educational programs.

> This tier includes: Opportunities to co-author research, tools, and courses ·
> Priority invites to roundtables, pilots, and paid opportunities · Advanced briefings
> and early previews of incubated tools · Recognition as a trusted contributor to the
> field

**Volunteering:**

> We believe in access and agency. Members can fulfill tiered volunteer commitments in
> exchange for membership perks — no paywall required.

> Every hour you contribute helps build tools, publish resources, and grow the field of
> cognitive security.

⚠ **Contradiction:** `/join` says "Membership is free… No dues or gatekeeping, just a
commitment". The application at `/apply` says "Please complete this form to join the
**applicant waitlist**. We will inform you when there is an opening for you in the CSI
community", requires 6 mandatory fields plus a LinkedIn profile, and asks for two
references, "preferably" current members in good standing. The confirmation page
(`/thankyou`) reads "We will review your submission and notify you **if you have been
accepted**." Free and open, or waitlisted and vetted — the client must pick one story.

### 11 / SUPPORT — "Support our mission"

`/donate` has no CSI copy — the URL resolves to
`zeffy.com/en-US/donation-form/support-our-mission-28`. The only usable line is the
Zeffy meta description:

> Help Cognitive Security Institute raise funds for Support Our Mission. Make a
> donation on Zeffy, and ensure 100% of your donation goes to fund Cognitive Security
> Institute's mission.

and the on-form note:

> Did you know? We fundraise with Zeffy to ensure 100% of your donation goes to our
> mission!

*Rec:* write a short original block (the 100%-to-mission fact and the 501(c)(3)
status are the persuasive content) with a single `DONATE` button going straight to the
Zeffy form. Do not iframe Zeffy — the conference page already learned that lesson with
ticketing.

## Sub-routes that warrant their own URL

Per the decision, in-page sections are the default; each of these has to earn its
route.

1. **`/institute/blog` + `/institute/blog/<slug>` — recommended, but only when the
   blog itself ports.** Justification: each of the 13 posts is a standalone document
   with its own author list, publication date, categories and meta description, and
   three exceed 1,700 words (the longest is 2,423). They are citable scholarly
   objects — a post published in 2016 needs a stable, shareable URL that is not a
   fragment of a marketing page. Summarising in-page is not a substitute for the
   artifact. **Until then**, section 05 carries a 3-card "latest" list linking out to
   the live Wix `/post/<slug>` URLs.

2. **`/disclaimer` — recommended.** Justification: it is a legal notice, linked from
   the footer of every page including the conference page, and must resolve at its own
   URL for that link to be honest. It is 90 words and not institute marketing content.
   Full text from `content/disclaimer.md`:

   > The Cognitive Security Institute is a an independent, non-partisan, institution
   > dedicated to examining new and emerging threats to security arising from
   > information processing systems (human and artificial) at multiple scales. The
   > views expressed on this site are attributable to their individual authors writing
   > in their personal capacity only, and not to the Cognitive Security Institute or
   > any other author, the editors, or any other person, organization, or institution
   > with which the author might be affiliated.

   ⚠ Contains a typo in the first line: "is **a a**n independent". Fix on port.

**Explicitly not recommended as routes**, though the source site has them:

- **Person bios** (22 pages). Disclosure cards inside section 08 instead — 170 words
  average does not justify a URL, and the source's own bio routes are half-broken.
- **`/contact`, `/apply`, `/course-waitlist-form`.** Forms, not content. See below.
- **`/media`, `/edu`, `/publications`, `/journal`, `/initiatives`, `/resources`,
  `/shield`, `/ctx`, `/partners`, `/supporters`, `/events`, `/meet-our-team`,
  `/board-of-directors`, `/strategic-advisory-council`, `/staff`.** All fold into the
  11 sections above; none exceeds 470 words.

## What is excluded, and why

| Excluded | Why |
|---|---|
| `/staff-1/*` (12 pages) | Empty stubs. No prose — just a name, a role, a Wix `Image-empty-state.png` placeholder, a leaked collection sort token (`2`, `2a`, `2cc`, `28`…) rendered as visible text, and dangling `Previous`/`Next`. Real bios are at `/staff/*`. |
| `/copy-of-application` | Orphaned duplicate draft of `/apply`, still in the sitemap. |
| `/copy-of-csc` | Empty conference template — nav, a sponsor call, a footer. Titled `CSC-Blank`. |
| `/thankyou`, `/thank-you-for-completing`, `/course-waitlist-survey-thank-you` | Three near-identical form confirmations, 29–33 words each. Whatever form service replaces Wix will supply its own confirmation state. |
| `/waitlistquestionnaire` | Internal Wix name leaked to `<title>` (`EmailedWaitlistQuestionnaire`). A survey funnel, not content. |
| `/course-waitlist-form`, `/edu` | Waitlist for a course that does not exist. `/edu` is a form plus a boilerplate CTA block copied from `/ctx`. Revisit when CSI Academy launches. |
| `/media` | Literally empty: "Check back soon — Once posts are published, you'll see them here." |
| `/sitemap` | A hand-maintained link list for a site that had no navigation. A single-page scroller with a working menu makes it redundant — and the existing one propagates the Partnerships/Supporters swap. |
| `/staff`, `/meet-our-team`, `/board-of-directors` as pages | Three conflicting team rosters with different membership and ordering. Merged into section 08. |
| `/hsc2025`, `/ncs2025` as pages | Hub pages for August/September 2025 events. Reduced to a "where we've been" line in section 07. |
| `/csc-speakers`, `/csc26-*`, `/cognitive-security-conference*` | Conference cluster — already served by `/`. |
| Home page YouTube scroller, Published Research module | Owned by another agent. |

## Needs a human

Blocking or near-blocking. Grouped by who has to answer.

**Client decisions — no correct answer derivable from the crawl:**

1. **Partnerships vs. Supporters.** Which page is the corporate programme and which is
   the nonprofit/research-ally programme? Four pages link them backwards from their own
   H1s. Blocks section 09.
2. **The one-line mission statement.** Three conflicting versions (section 01).
3. **Free membership or vetted waitlist?** `/join` and `/apply`/`/thankyou` tell
   opposite stories (section 10).
4. **Natilie McCallick, Candy Alexander, Calvin Nobles** — roster titles contradict
   their own bios (section 08).
5. **"Dr. Vindy Sawyer" or "Dr. Ben D. Sawyer"** in the Evil Digital Twin copy (§1.2).
   Blocks shipping EDT in Part 1.
6. **Focus 5 naming** — `research` and `initiatives` disagree on two of the five
   (section 03).
7. **Defence or Defense** in the SHIELD expansion (sections 06, 07, 08).
8. **Is CSI Academy still live?** "COMING SOON" as of the crawl; two of three "Active
   Initiatives" are not active.
9. **Are the 14 `/partners` and 5 `/supporters` logos current?** Some appear on both.
   Trademark permission to reproduce needs confirming per `04-ASSET-GUIDE.md`.
10. **Dr. Rosanna Guadagno's "forthcoming" book** — likely stale; confirm status.

**Assets the client must supply:**

11. **Every institute hero image.** The crawl captured Wix's LQIP placeholders, not the
    originals — `surreal-pixelated-sky-digital-scape.png` came down at **9 × 5 px**,
    `silhouettes-of-group-w-holographic-cubes-wireframe.png` at **19 × 10 px**. This
    affects `/about`, `/meet-our-team`, `/board-of-directors`,
    `/strategic-advisory-council`, `/join`, `/ctx` and others. Full-resolution
    originals are required.
12. **Three partner logos** absent from the crawl: Maro (`seekmaro.com`), Cybermaniacs,
    Maltego (on `/partners`).
13. **Alt text for all 22 portraits** — none exists (section 08).
14. **`/shield` destinations** — the SHIELD LinkedIn community URL (probably
    `linkedin.com/groups/18699026/`, found only in a YouTube description on the home
    page) and a "get in touch" target.

**Infrastructure that cannot be ported, only replaced:**

15. **Four Wix-hosted forms** — membership application (`/apply`, 15+ fields including
    two reference blocks), contact (`/contact`), course waitlist
    (`/course-waitlist-form`), event/village mailing list (`/events`, `/edu`). Field
    labels are captured in `content/*.md`; the submission backend, validation,
    storage and notification routing are not. A form service must be chosen.
16. **Zeffy** for donations (`zeffy.com/en-US/donation-form/support-our-mission-28`)
    and ticketing. Third-party hosted; link out, don't rebuild.
17. **Google Form** for journal submissions (URL in §1.3) — currently carries
    `?usp=publish-editor`, an editor-mode parameter that should not be in a public
    link.
18. **YouTube channel** `@cognitivesecurityinstitute` — 8 embedded videos on the home
    page. Owned by the other agent, noted here for completeness.

**Defects to fix rather than reproduce:** the four dead buttons, the `/staff` →
`/staff-1` link chain, the `/donate` redirect hop, the three wrong `<title>` tags, the
`cognitivesecurity.institute` alternate domain, the `is a an` typo in the disclaimer,
the garbled "Connect through our with a diverse, global community" on `/shield`, and
"The ability to project force … **are** giving rise" on `/about`.
