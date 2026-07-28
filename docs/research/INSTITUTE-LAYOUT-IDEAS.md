# /institute — layout variety recommendations

Analysis date: 2026-07-27. Against: `csi-web/app/institute/page.tsx`, all of
`components/institute/`, the conference page's CSS modules, and the content
actually available in `lib/institute.ts` / `lib/people.ts` / `lib/videos.ts`.

## The diagnosis in one paragraph

The conference page earns its variety from **five distinct layout grammars**
(asymmetric hero, dense table, inverse lattice, split panel, centred dot-field
CTA) plus a graphic vocabulary (dot fields, washes, corner brackets, stat
numerals). The institute page uses **one grammar nine times**: `wrap` →
`Kicker` → optional deck → grid of `--surface` cards with 1px `--line`
borders. Eight of nine sections are that shape. There is **no hero at all** —
the page opens cold on the same kicker device every other section uses — there
is **no inverse band**, no full-bleed moment, no dot field (except, ironically,
the two placeholder plates faking artwork in Research), and every section sits
at the same visual volume. The client's "masses of garbage" reaction is the
correct response to nine consecutive card grids.

Everything below reuses conference devices. No new dependencies, no new
tokens, no new assets except where explicitly flagged as "commission".

---

## Ranked recommendations (impact per unit of effort)

The top three are independent and can be implemented immediately.

### 1. Give the page a hero — convert Mission (M)

**Now:** `Mission.tsx` opens with `01 / MISSION` kicker, a 5/7 two-column
lead, and the definition in a small cyan-ruled card. It looks like a body
section that happens to be first. First impression = flat.

**Instead:** Rebuild as a true hero on the `Hero.module.css` pattern:

- Section shell: `position: relative; overflow: hidden` with the **22px dot
  field masked in from the upper right** (`Hero .dots`) and the **dual
  cyan/magenta radial washes** (`Hero .wash`). This is the single cheapest
  "this page has graphics now" move on the list.
- Asymmetric `1.35fr / 1fr` grid. Left: the mission's two existing punch
  lines set as the display headline — `TRADITIONAL CYBERSECURITY ISN'T
  ENOUGH.` / `WE NEED COGNITIVE SECURITY.` in Orbitron at
  `clamp(36px, 5.5vw, 64px)`, with "COGNITIVE SECURITY" in
  `--indigo-deep` (the `titleAccent` device). `mission.deck` becomes the
  muted lede beneath. All copy already exists in `lib/institute.ts`.
- Right: the **definition as the framed plate** — `02 / DEFINITION` mono
  kicker, "What is cognitive security?", two short paragraphs — inside a
  `--surface` plate with the **corner registration brackets** and the fine
  indigo `plateDots` mask from the hero emblem plate. The definition *is*
  this page's emblem; framing it says so. Keeps its `#definition` anchor.
- Below, a **three-up stat strip** on `--surface` (exact `Hero .stats`
  reuse): `05 / RESEARCH PILLARS` · `22 / EXPERTS & ADVISORS` ·
  `501(c)(3) / NONPROFIT`. All three derivable from existing data — compute
  the 22 from `people.length` so it can't drift; the EIN note in
  `getInvolved.note` backs the third.
- Mobile: single column, headline first, plate second (hero already
  demonstrates the `order: -1` / cap-width pattern; here the headline should
  lead, so no reorder needed). No overflow risk — this is a proven layout.

**Reuses:** hero dot field, washes, plate + brackets, titleAccent, stat strip.

### 2. Events → inverse-band lattice (S)

**Now:** `InstituteEvents` is 4 cards in a 2×2 grid on `--bg`. Sections 05,
06, 07 in a row are all "kicker + cards on bg/surface" — the dead middle of
the scroll.

**Instead:** This is the institute's structural twin of the sponsor strip, and
it should take the **inverse band**:

- Section background `--inv-bg`, bottom border `--inv-line`, headings in
  `--inv-ink`, kicker in `--inv-muted` (Sponsors already defines this exact
  palette usage).
- The 4 blocks become cells in the **single-1px hairline lattice**
  (`Sponsors .grid` technique: cells draw right+bottom, container draws
  top+left — no doubled borders). 2×2 on desktop, 1-col under 860px. Cell
  content: name in display caps (`--inv-ink`), sub in amber mono (amber reads
  well on `--inv-bg` — the sponsors' "prospectus" link proves it), body in
  `--inv-muted`, CognectCon's outbound CTA in amber mono.
- `whereWeveBeen` (the Hacker Summer Camp / DEF CON line) becomes a **fifth
  cell spanning the full row** at the bottom of the lattice, mono,
  letter-spaced — a "field record" strip. This is the page's best
  credibility line and currently renders as a muted footnote.
- Zero overflow risk; the lattice is already proven at all widths.

**Reuses:** inverse band, hairline lattice, inverse type palette. One CSS
module rewrite plus trivial TSX changes.

### 3. Get Involved → full-bleed dot-field CTA (S)

**Now:** kicker + three cards on `--surface`. The page's one ask ends at the
same volume as everything above it.

**Instead:** Close the page the way the conference does — `TicketsCta`:

- Full-width section, **14px dot field masked open through the middle**
  (`TicketsCta .dots` verbatim), centred `max-width: 900px` inner.
- `getInvolved.deck` is already a manifesto line — set it as the big centred
  display heading: `COGNITIVE SECURITY IS A COLLECTIVE MISSION,` /
  `NOT A COMPETITIVE GAME.` at `clamp(30px, 6vw, 56px)`. (Drop the current
  "Get involved" heading; the nav anchor label carries that.)
- The three routes stay, but as a **compact 3-up row on the dotted band**
  (borders `--line`, background `--surface-solid` so the dots don't muddy
  text), each reduced to icon + name + one-line blurb + button. DONATE keeps
  the filled-indigo primary; APPLY and GET IN TOUCH drop to the outlined
  secondary style — three identical buttons is part of the current monotony,
  and the org is a nonprofit: donate is the primary ask (it's already the
  nav CTA).
- EIN note stays as the mono strip under the row.
- Under 560px: stack the cards, full-width buttons (TicketsCta already
  demonstrates the narrow behaviour).

**Reuses:** masked dot field, centred CTA composition, primary/secondary
button pair. Mostly a CSS-module swap.

### 4. Five Pillars → numbered ledger table (M)

**Now:** 5-up card grid, each card image-on-top + tiny number + name + blurb.
At 5-up the images render ~200px wide and identical — this is the section
that most literally reads "row of slop cards", and it wastes the page's best
image set.

**Instead:** Restructure as a **dense numbered ledger** — the institute's
answer to the agenda table:

- One bordered table shell (`--line` border, `--surface` fill, hairline row
  separators — `Agenda .table` grammar), five full-width rows.
- Each row, desktop: a fixed left column with the numeral **01–05 set huge**
  in Orbitron (`clamp(40px, 6vw, 64px)`, `--cyan` at full strength or ink at
  30% — echo the agenda's mono time column, scaled up); then name in display
  caps + blurb; then the **pillar image as a fixed-width cell on the right**
  (~220px, cover-cropped, `grayscale(0.35)` with hover-to-colour — the
  portrait treatment from Keynotes/Team). Row height ~140–160px keeps it
  dense.
- Mobile (<700px): rows unwind like agenda rows — image becomes a short
  banner strip on top of each row, numeral shrinks and inlines with the
  name. Under 560px, pull the shell full-bleed with the agenda's
  `margin-inline: calc(var(--gutter) * -1)` device.
- Overflow note: keep the big numerals in normal flow (a grid column), not
  absolutely positioned — then there is nothing to clip and the 360px
  guarantee is safe. If any decorative oversized type is layered instead,
  the section needs `overflow: hidden` like the hero.

**Reuses:** agenda table shell + hairlines + column rhythm + full-bleed
mobile device; portrait grayscale/hover. This gives the page its
"operations document" moment.

### 5. Research → one honest split panel, two demoted links (M)

**Now:** three identical cards, and **two of the three fake their artwork
with dot-plate placeholders**. The component comment says "peers, not
ranked" — but visually two empty plates beside one real image is precisely
the thinness the client is reacting to. The equality is a fiction: CAT is a
flagship research framework; EDT and Phish Golf are outbound links with
one-line blurbs.

**Instead:** rank them honestly:

- **CAT gets the Venue split panel**: `1.1fr/1fr` bordered panel. Left: the
  real CAT artwork (800×968, currently cover-cropped to 16:10 in a small
  card — let it breathe at ~500px in the photo slot, `object-fit: cover`,
  panel-height-bound). Right: a **facts stack with hairline separators**
  (`Venue .facts`): what it is (the existing blurb), who leads it (Dr.
  Matthew Canham — stated in Porter's bio, so on record), and the `VIEW THE
  CAT` button. Optionally a corner-bracket frame on the image to rhyme with
  the hero plate.
- **EDT and Phish Golf drop to a two-up strip of compact text rows** below
  the panel — mono kicker (`TALK SERIES` / `COMPETITION`, both supportable
  from existing copy), heading, one-line blurb, mono arrow link. **Delete
  the dot-plate placeholders entirely.** A confident text row beats a fake
  image every time.
- Mobile: panel stacks (Venue already does this), strip stacks.

**Reuses:** Venue split panel + facts stack; mono link rows.
**Commission (optional, one line each):** a 16:10 key visual for Evil
Digital Twin (glitched/mirrored head silhouette) and one for Phish Golf
(scorecard/flag motif) would let these return to image cards later — do not
substitute CSS art for them now.

### 6. Publications → editorial masthead + index rows (S)

**Now:** journal plate + three post cards. Cards again.

**Instead:** the one **quiet, editorial** section of the page:

- The journal becomes a **masthead**: keep the magenta accent rule but set
  "COGNITIVE SECURITY JOURNAL" larger (`clamp(24px, 4vw, 40px)` display),
  with "Open-access · peer-reviewed · ed. Robert H. Thomson" as a mono
  deck line (all in existing copy), and the interest-form link as the mono
  CTA. A split composition — masthead left (7fr), submit-interest block
  right (5fr) — inverts the Mission's old 5/7 and adds asymmetry for free.
- The three posts become **hairline-separated index rows, not cards**: mono
  date + read-time column on the left (agenda time-column grammar), title
  in text face, categories in cyan mono, `→` at the right edge. Three rows
  of a list read as "an index of a living archive"; three boxes read as
  more boxes.
- Mobile: date column collapses above the title. No overflow risk.

**Reuses:** accent rule, agenda's mono left-column rhythm, About's
asymmetric split.

### 7. Programmes → alternating split panels + the pull-quote (M)

**Now:** two tall parallel cards (SHIELD cyan, CTX amber), internally
identical: heading, paragraphs, hairline list.

**Instead:** stack them as **two full-width split panels with alternating
orientation** — the page's zig-zag moment:

- **SHIELD**: left column = identity (big display "SHIELD", mono expansion,
  lead credit) and — the star — the tagline *"People aren't the weakest
  link – they're security's greatest strength."* set as an **About-style
  quote block** (cyan left rule, italic, attribution "SHIELD — CSI's human
  risk community"). Right column = the four activities as a **Venue facts
  stack** (hairline rows, mono names in cyan).
- **CTX**: mirrored — seeking-list facts stack on the left, identity on the
  right, amber-keyed. The mirror is the point: two programmes, two
  orientations, no more twin cards.
- Mobile: both collapse identity-first, single column (Venue pattern).

**Reuses:** split panel, facts stack, quote block + accent rule, per-card
`--accent` custom property already in the TSX.

### 8. Team — vary the scale by group, feature the director (S/M)

**Now:** honestly the least broken section — 22 faces are inherently
graphic. But three groups get identical 6-up treatment, so it reads as one
undifferentiated wall.

**Instead**, three cheap moves, no structural rewrite:

- **Board (3 people) goes 3-up** at larger scale — three governance
  portraits at ~380px cells with the **Keynotes cyan→indigo gradient rule**
  under the portrait. Staff and Council stay 6-up. Scale difference alone
  breaks the wall into chapters.
- Group headings become **count kickers**: `09 / STAFF`, `03 / BOARD OF
  DIRECTORS`, `10 / ADVISORY COUNCIL` — mono, computed from
  `people.filter(...).length`, extending the page's numbering device
  downward for free.
- The `sacIntro` paragraph moves beside the Council heading as a
  right-column aside (About split grammar) instead of another stacked
  intro paragraph.
- Optional (M): a feature row for the Executive Director — Canham's card
  first at 2×2 scale within the staff grid. Defensible, but do the three S
  moves first; they may be enough.
- Keep the `<details>` disclosure exactly as is — it's good.

**Reuses:** Keynotes portrait card + gradient rule, kicker numbering, About
split.

### 9. Watch — leave it alone (S: no-op)

The horizontal snap scroller is already the page's one non-card grammar and
its thumbnails are the page's richest imagery. Two tiny touches at most: let
the track's right edge bleed to the viewport edge (visible crop = "there's
more", the scroller already owns its overflow), and nothing else. Do not add
washes here; after change #1 the hero above it is loud enough.

---

## Rhythm — the volume sequence

Current state: every section is mezzo-forte. Proposed loud/quiet contour:

| # | Section | Volume | Ground | Devices |
|---|---------|--------|--------|---------|
| 01 | Hero (Mission + Definition) | **LOUD** | `--bg` + dots + washes | display type, plate, brackets, stat strip |
| 02 | Watch | medium | `--bg` | media scroller (unchanged) |
| 03 | Pillars ledger | **LOUD** (graphic) | `--surface` shell on `--bg` | table, big numerals, 5 images |
| 04 | Research | medium | `--bg` | split panel, CAT art |
| 05 | Publications | *quiet* | `--bg` | editorial rows, hairlines |
| 06 | Programmes | medium | `--surface` band | alternating splits, pull-quote |
| 07 | Events | **LOUD** (break) | `--inv-bg` | inverse lattice |
| 08 | Team | medium-quiet | `--bg` | portrait wall, scale shifts |
| 09 | Get Involved | **LOUD** (close) | `--bg` + dot field | centred CTA |
| — | Footer | — | `--inv-bg` | existing |

Loud–quiet–loud with the inverse band landing at ~70% scroll depth, exactly
where the conference places its sponsor band. Note Events (inv) and Footer
(inv) are separated by two full sections, so the two inverse moments never
touch. **One inverse band only** — a second (e.g. on Programmes) would
devalue both.

## Background alternation summary

`bg(hero, dotted)` → `bg` → `surface-band` → `bg` → `bg` → `surface-band` →
**`inv-bg`** → `bg` → `bg(dot field)` → `inv footer`. Never two `--surface`
bands adjacent; never `--surface` touching `--inv-bg`.

## Graphics with no new assets — assignment map

- **Hero:** 22px dot field (upper-right mask) + cyan/magenta washes +
  bracketed definition plate + 7px indigo plate-dots + stat numerals.
- **Pillars:** the five WebP images (the page's best unused graphic asset —
  currently shrunk to thumbnails) + oversized 01–05 numerals.
- **Research:** the CAT image at meaningful size; corner brackets on it.
- **Publications:** magenta accent rule; mono date column; hairline index.
- **Programmes:** cyan quote-rule pull-quote; cyan/amber accent keys.
- **Events:** inverse hairline lattice (the lattice *is* the graphic).
- **Team:** 22 portraits with grayscale→colour hover + gradient rules +
  count kickers.
- **Get Involved:** 14px centre-masked dot field + display-scale deck.

## Genuinely needs commissioning (do not fake in CSS)

1. **A square/emblem CSI mark** — the CSC page's framed-emblem hero works
   because the ravens logo is strong; CSI only has a horizontal wordmark,
   which is why the hero above frames the definition instead. An emblem
   would upgrade hero + social cards. One line: *a square CSI sigil in the
   ravens-logo style, mono-friendly, dark-ground.*
2. **Evil Digital Twin key visual** (16:10) and **Phish Golf key visual**
   (16:10) — until they exist, those two projects ship as text rows (see
   #5), not placeholder plates.
3. **Event photography** — CSI ran villages at DEF CON 33 / Black Hat /
   BSides; one strong crowd photo would let Events carry an image cell in
   the lattice. Until then the lattice stands alone fine.

## Constraint check

- **Tokens/dark-only:** every treatment above names only existing tokens;
  inverse sections use the `--inv-*` family exclusively.
- **Overflow at 1333/768/390/360:** all full-bleed moves use the two proven
  devices (own-overflow scroller; negative-margin table bleed at ≤560px).
  The only new risk class is oversized numerals/type — keep them **in flow**
  (grid columns), or inside an `overflow: hidden` section like the hero.
  Flagged per-section above.
- **Static prerender:** nothing here fetches; stat-strip counts are computed
  from imported data at build time.
- **Reduced motion:** nothing proposed animates. All motion is hover-state
  colour/filter transitions, already globally floored to 0.01ms by
  `globals.css`. Degradation: instant state change.
- **No invented content:** every headline, stat, quote and label above is
  quoted or computed from `lib/institute.ts` / `lib/people.ts`. Two derived
  labels to sanity-check with the client: the "TALK SERIES"/"COMPETITION"
  kickers in #5 and the pull-quote attribution line in #7.

## If you only do three things

**#1 (hero), #2 (inverse events lattice), #3 (dot-field CTA).** They are the
first thing seen, the mid-scroll break, and the last thing seen — the three
points a scrolling client actually judges — and none of them touches the
sections in between.
