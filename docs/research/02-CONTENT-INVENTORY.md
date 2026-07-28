# 02 — Content Inventory

All 133 crawled URLs. Descriptive record only — what exists, how substantial it is, and
where content is duplicated. Full text for every page is in `content/<slug>.md`; the
machine-readable version is `content/site-map.json`.

`Chars` is extracted body text length including nav/footer chrome (~1,400 chars of which
is boilerplate on every page). Treat anything under ~2,500 as a thin or utility page.

## Shape of the site

| Group | Count |
|---|---|
| Top-level pages | 42 |
| Speaker bios — `/csc-speakers/*` | 35 |
| Blog posts — `/post/*` | 13 |
| Staff bios — `/staff/*` | 12 |
| Staff bios — `/staff-1/*` | 12 (same 12 people as above) |
| Council bios — `/council/*` | 10 |
| Blog categories — `/blog/categories/*` | 9 |
| **Total** | **133** |

## Conference cluster (CSC 2026)

The priority cluster. Global nav exposes exactly these five plus DONATE.

| Slug | Title | Chars | Notes |
|---|---|---|---|
| `cognitive-security-conference` | Conference | 10,531 | Landing page. Hero CTA is broken (links to itself). |
| `csc26-speakers` | Speakers | 14,737 | 35 speakers, 5 tracks. Structured: `content/csc26-speakers.json` |
| `cognitive-security-conference-speakers` | Speakers | 14,737 | **Byte-identical to `csc26-speakers`.** Nav points here. |
| `csc26-agenda` | Agenda | 9,414 | 53 sessions, 2 days. Structured: `content/csc26-agenda.json` |
| `csc26-venue` | Venue | 4,218 | Tuscany Suites & Casino + travel briefs |
| `csc26-sponsors` | Sponsors | 4,315 | 7 sponsor logos |
| `csc26-tickets` | Purchase Tickets | 3,211 | Zeffy iframe. GA $500, cap 300. |
| `csc-speakers` | CSC Speakers (List) | 11,346 | Third speaker listing; parent of the 35 bio pages |
| `copy-of-csc` | CSC-Blank | 2,920 | Empty template left in the sitemap |
| `supporters` | Speakers | 4,943 | Title says "Speakers"; content is supporters |

## Institute pages

| Slug | Title | Chars | Notes |
|---|---|---|---|
| `index` | Home | 19,975 | Largest page. Sponsor bar, video carousel, research cards, CTA block |
| `about` | About | 7,893 | Mission + "What is Cognitive Security?" + team + board |
| `research` | Research | 9,548 | |
| `publications` | Publications | 6,110 | |
| `journal` | Journal | 4,258 | |
| `initiatives` | Initiatives | 6,469 | |
| `shield` | Human Risk (SHIELD) | 3,367 | Named programme |
| `ctx` | CTX | 4,675 | Named programme |
| `edu` | Academy | 2,413 | Thin |
| `resources` | Resources | 6,118 | |
| `media` | Media | 1,858 | Thin |
| `events` | Events | 6,404 | |
| `blog` | Blog | 8,623 | Index over 13 posts, 9 categories |

## People pages

| Slug | Title | Chars | Notes |
|---|---|---|---|
| `meet-our-team` | Meet Our Team | 4,470 | |
| `staff` | Staff2 (List) | 5,186 | Internal working title leaked into `<title>` |
| `board-of-directors` | Board of Directors | 2,579 | 3 members |
| `strategic-advisory-council` | Advisory Council | 6,776 | Parent of 10 `/council/*` bios |
| `/staff/*` | 12 bios | ~2,000 ea. | |
| `/staff-1/*` | 12 bios | ~2,000 ea. | **Same 12 people, duplicate URL set** |

The 12 duplicated people: Anna Varfolomeeva, Dr. Ben D. Sawyer, Dr. Matthew Canham,
Dr. Robert Thomson, Dr. Tamara Schwartz, Holly-Jane Grayling, K. Melton,
Leah Von Kreman, Natilie McCallick, Royce J. Porter, Sarah Fuller, Winn Schwartau.

## Membership, funnels and utility

| Slug | Title | Chars | Notes |
|---|---|---|---|
| `join` | Community | 6,219 | |
| `apply` | Membership Application | 2,671 | |
| `copy-of-application` | Membership Application | 2,998 | **Duplicate draft**, still in sitemap |
| `donate` | Support Our Mission | 816 | Thinnest page on the site |
| `partners` | Sponsors | 7,565 | |
| `contact` | Contact | 2,088 | |
| `course-waitlist-form` | Course-Waitlist-Form | 2,485 | |
| `waitlistquestionnaire` | EmailedWaitlistQuestionnaire | 3,862 | Internal name in `<title>` |
| `thankyou` | Thank you! | 1,539 | Confirmation |
| `thank-you-for-completing` | Survey Thank you! | 1,526 | Confirmation |
| `course-waitlist-survey-thank-you` | Thank you! | 1,550 | Confirmation |
| `disclaimer` | Disclaimer | 2,204 | Legal |
| `sitemap` | Sitemap | 2,947 | |

Three near-identical thank-you pages exist.

## Past events

| Slug | Title | Chars |
|---|---|---|
| `hsc2025` | HSC 2025 | 7,742 |
| `ncs2025` | NCS 2025 | 3,554 |

## Blog

13 posts under `/post/*`, 9 categories: AI Security, Announcements, Cognitive
Resilience, Cognitive Warfare, Human-Centered Cyber, Media, Neurosecurity, Research,
Resources.

Post titles run academic — e.g. "Developing a Neurosecurity Framework to Defend Against
the Coming Neurowar", "NIST Special Publication: Minding the Gaps in Human-Centered
Cybersecurity", "What Can Cognitive Security Learn from the B-17 Flying Fortress?".
Full text for each is in `content/post__*.md`.

## Duplication summary

| Duplicate set | Members |
|---|---|
| Speaker rosters | `csc26-speakers`, `cognitive-security-conference-speakers` (identical), `csc-speakers` |
| Staff bios | `/staff/*` and `/staff-1/*` — 12 people, 24 URLs |
| Membership application | `apply`, `copy-of-application` |
| Thank-you pages | `thankyou`, `thank-you-for-completing`, `course-waitlist-survey-thank-you` |
| Empty templates | `copy-of-csc` |
