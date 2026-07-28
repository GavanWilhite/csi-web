# 03 — Conference Page Content Spec

Everything that currently lives on the CSC 2026 conference page and its four sub-pages,
with the real copy. This is a content spec, not a layout spec — structure and treatment
are the design agent's call.

Reference screenshots: `screenshots/desktop/cognitive-security-conference/` (5 files),
plus `csc26-agenda/`, `csc26-speakers/`, `csc26-venue/`, `csc26-sponsors/`,
`csc26-tickets/`.

## Event facts

| Field | Value |
|---|---|
| Name | Cognitive Security Conference 2026 (CSC 2026) |
| Dates | **August 6–7, 2026** (Thursday–Friday) |
| Venue | Tuscany Suites & Casino, 255 E Flamingo Rd, Las Vegas, NV 89169 |
| Rooms | Firenze, Tuscany, and Siena |
| Capacity | **300 attendees** |
| General Admission | **$500** |
| Early-bird deadline | July 16 *(already past as of capture — confirm with client)* |
| Ticketing | Zeffy (third-party iframe), `zeffy.com/en-US/ticketing/cognitive-security-conference` |
| Schedule | Aug 6, 9:00 AM – Aug 7, 5:00 PM MST |
| Room block | `res.windsurfercrs.com/ibe/details.aspx?propertyid=16539&nights=1&checkin=8/5/2026&group=0826CSIRB&lang=en-us` |
| Host | Cognitive Security Institute, 501(c)(3), EIN 92-3238363 |
| Sponsorship contact | `info@cognitivesecurityinstitute.org` |
| Positioning relative to other events | Immediately after BSides Las Vegas, during "Hacker Summer Camp" week |

## Current page sections, in order

### 1. Hero

Assets: `assets/brand/csc26-logo-ravens.png` (3783×3145, RGBA — twin ravens, Saturn ring,
"VEGAS · 2026").

Current copy:

> **Your People are HERE!**
> Beat the neverending lines of Hacker Summer Camp this year and come to the premiere of
> the Cognitive Security Conference instead!
> **Aug. 6-7th** — **at the Tuscany**
> *(After BSides Las Vegas!)*
> `[Purchase Tickets]`

⚠️ The CTA currently links to `/cognitive-security-conference` (itself). It should point
to `/csc26-tickets`.

### 2. Sponsor bar

Seven sponsors. Logos in `assets/brand/sponsors/` — all white-on-transparent PNG.

| Sponsor | File | Link |
|---|---|---|
| Living Security | `living-security.png` | livingsecurity.com |
| Fable | `fable.png` | fablesecurity.com |
| ObscureIQ | `obscureiq.png` | — |
| DeepTrust | `deeptrust.png` | — |
| MindShield | `mindshield.png` | — |
| HRL Laboratories | `hrl-laboratories.png` | hrl.com |
| Strategos International | `strategos-international.png` | strategosintl.com |

The home page shows two additional logos not on the conference page: **WIBU Systems**
and **BeyondTrust**.

### 3. Testimonial carousel

Three rotating quotes. Two captured in full:

> "You can find two people who come together who would not normally meet, and they are
> going to go create a paper or a project from the connections made here. That is the
> most important thing as everything becomes more robotic and the human element goes
> away."
> — **Web Begole**, Co-Founder & CTO, MarketReader

> "I met people I never would have found on LinkedIn and never would have connected with
> otherwise. I am taking away some really deep conversations that I think are going to go
> places."
> — **Kathryn Brett Goldman**, CEO & Founder, Cybermaniacs

### 4. Positioning statement

> **The Cognitive Security Conference is the premier event for human risk management,
> AI security, and cognitive warfare professionals.**
>
> Hosted by the Cognitive Security Institute, this event has become the most highly
> anticipated conference in the cognitive domain. It brings together a unique blend of
> security practitioners, researchers, neuroscientists, mentalists, psychologists, con
> artists, policymakers, and many others who operate in and study cognitive hacking.

### 5. Keynote speakers

Four keynotes. **Note the tagline conflict** documented in `01-CURRENT-STATE-AUDIT.md` —
these differ from the speakers page. Conference-page versions:

| Speaker | Tagline here | LinkedIn |
|---|---|---|
| Terri Borras | Cognitive Warfare & the Information Environment | `/in/aidatborras/` |
| Ashley Rose | Human Risk Management | `/in/ashley-m-rose/` |
| Rand Waltzman | The Evolution of Cognitive Security | `/in/randwaltzman/` |
| Dave Pitts | Cognitive Warfare | `/in/1davepitts/` |

Followed by a `See Full Speakers List` link.

### 6. Planning Your Attendance

> Attending CSC 2026 may require advance coordination with your organization. To support
> your travel request, we've prepared two ready-to-use HR travel justification briefs —
> written for different professional contexts but equally useful for making the case
> internally.

- **Travel Brief: Human Risk & Security Professionals** — "For those coming from
  cybersecurity, insider threat, behavioral risk, security awareness, or organizational
  security backgrounds."
  → `assets/documents/CSC-2026-Human-Risk-Travel-Justification-Brief.pdf`
- **Travel Brief: Information Operations & Cognitive Warfare Professionals** — "For those
  coming from information operations, PSYOP, strategic communications, influence
  operations, cognitive warfare, or related national security fields."
  → `assets/documents/CSC-2026-Cognitive-Warfare-Travel-Justification-Brief.pdf`

This block is duplicated verbatim on `/csc26-venue`.

### 7. Venue

> **Venue** — Tuscany Suites & Casino, 255 E Flamingo Rd, Las Vegas, NV 89169
> We are in the Firenze, Tuscany, and Siena rooms
> `[Get room block details]`

### 8. Tickets

> **Get Your Tickets Now!**
> Due to space limitations, we are limited to **300** attendees. These tickets WILL sell out!
> Early-bird pricing is available until July 16th. Don't wait!

Embedded Zeffy widget: General Admission $500, optional donation field, `View on Zeffy`.

### 9. Closing statement

> **The Cognitive Security Conference is the event our industry always wanted but never had!**
>
> By bringing together the best in the industry across multiple disciplines to talk about
> cutting-edge issues in the emerging field of cognitive security, this conference
> provides the *highest ROI per square inch* of any similar conference in the past 20 years.

### 10. Call for Sponsors / Hosted by

> **Call for Sponsors** — Interested in more details? Reach out to us for the
> **Exhibitor & Sponsorship Prospectus**: info@cognitivesecurityinstitute.org
>
> **Hosted by:** [CSI logo]

## Speakers — 35 across 5 tracks

Full structured data: `content/csc26-speakers.json`
Headshots: `assets/speakers/<slug>.<ext>`, index at `_headshot-map.json`

| Track | Count |
|---|---|
| Keynote Speakers | 4 |
| Defending Humans | 11 |
| Critical Cognitive Infrastructure | 12 |
| Applied Training | 6 |
| Master of Ceremonies | 2 |

Each speaker carries a name and a one-line editorial tagline, e.g.:

- **BRUCE SCHNEIER** — "Amateurs hack systems; professionals hack people"
- **CLIFFORD STOLL** — Cybersecurity Legend, Longtime Skeptic of Computers in Class
- **BRIG. GEN. TERRI BORRAS (Ret)** — Defending the Moment Before Decision
- **LEN NOE** — The Human Cyborg
- **DR. GREGORY CARPENTER** — Cognitive Warfare's Epidemiologist
- **FC (FREAKY CLOWN)** — The Ethical Hacker Who Robs Banks for a Living

35 individual bio pages exist at `/csc-speakers/<slug>`; text in
`content/csc-speakers__<slug>.md`.

## Agenda — 53 sessions over 2 days

Full structured data: `content/csc26-agenda.json`
Fields: `Day`, `Start Time`, `End Time`, `Track`, `Title`, `Name`

Four track values: **Main Stage / All Tracks**, **Defending Humans**,
**Critical Cognitive Infrastructure**, **Applied Training**.

Both days run 8:00 AM check-in → 5:30 PM closing remarks, with three parallel tracks
between plenary slots. Current UI is a Wix table per day with a "Filter by Track"
dropdown, rendered light-on-dark with a purple header row.

Day shape:

| | Thursday Aug 6 | Friday Aug 7 |
|---|---|---|
| Opening remarks | James McQuiggan | Sumona Banerji |
| Morning keynote | Dr. Rand Waltzman — "The Decision Environment: An Operational Theory of Cognitive Conflict" | Brig. Gen. Terri Borras (Ret) — "Before the Decision" |
| Afternoon keynote | Dave Pitts — "The Battle for Decision Autonomy: A New Front in Strategic Competition" | Ashley Rose — "Start With the Why: A Decision Model for AI-Native Human Risk Management" |
| Closing remarks | James McQuiggan | Sumona Banerji |

One Friday Applied Training slot is still listed as **TBA**.
