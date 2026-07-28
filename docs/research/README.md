# CSI Website Redesign — Handoff Package

Everything needed to redesign and rebuild **cognitivesecurityinstitute.org** without
network access. Captured **2026-07-27** from the live Wix site.

## Deliverables requested

1. **A refreshed Cognitive Security Conference (CSC 2026) page** — the priority artifact.
2. **A design system page** — tokens, components, and usage rules for the new look.

This package is **source material and a factual audit**. It deliberately contains no art
direction — that is the design agent's call. `00-BRIEF-AS-STATED.md` records what the
client asked for, in their own words, and nothing more.

## Read in this order

| File | What it gives you |
|---|---|
| `00-BRIEF-AS-STATED.md` | The client's stated direction and audience, verbatim. Open items to confirm. |
| `01-CURRENT-STATE-AUDIT.md` | What the site looks like today, its extracted tokens, and its specific problems. |
| `02-CONTENT-INVENTORY.md` | All 133 pages, what each is for, and a keep / merge / cut recommendation. |
| `03-CONFERENCE-PAGE-SPEC.md` | Section-by-section spec for the conference page, with the real copy. |
| `04-ASSET-GUIDE.md` | What is in `assets/`, which files are the brand marks, and licensing caveats. |

## What is in this folder

```
handoff/
├── 00-BRIEF-AS-STATED.md … 04-ASSET-GUIDE.md   the written docs (start here)
├── screenshots/
│   ├── desktop/<page>/01.jpg…NN.jpg          full top-to-bottom scroll captures,
│   │                                         1728×941 viewport, in scroll order
│   └── narrow-viewport/                      evidence of the non-responsive layout
├── content/
│   ├── <slug>.md                             133 pages: title, meta, heading outline,
│   │                                          full body text with links preserved
│   ├── csc26-agenda.json                     53 conference sessions (structured)
│   ├── csc26-speakers.json                   35 speakers with track + tagline
│   └── site-map.json                         all 133 URLs with titles + descriptions
├── raw-html/<slug>.html                      unmodified server-rendered HTML, 133 pages
├── assets/
│   ├── brand/                                named logos + hero art (start here)
│   ├── brand/sponsors/                       7 sponsor logos, white-on-transparent
│   ├── speakers/                             35 headshots keyed by speaker slug
│   ├── documents/                            2 travel-justification PDFs
│   ├── conference/ people/ home/ other/      170 originals, bucketed by usage
│   ├── asset-index.json                      every asset → source URL → pages using it
│   └── _contact-sheet-conference.jpg         visual index of the conference assets
├── all-urls.txt, page-index.json, image-manifest.json   raw crawl output
└── crawl.py, fetch-assets.py, build-data.py, file-shots.sh   scripts used (re-runnable)
```

## Screenshot conventions

Captures are sequential viewport tiles, not stitched images. `01.jpg` is the top of the
page; each subsequent file is ~860px further down; the last file is flush with the page
bottom, so it usually overlaps the one before it. Viewport was 1728×941 CSS px at DPR 2.

| Page | Files | Page height |
|---|---|---|
| `home` | 3 | 2426px |
| `cognitive-security-conference` | 5 | 4252px |
| `csc26-agenda` | 6 | 4601px |
| `csc26-speakers` | 7 | 5588px |
| `about` | 5 | 4510px |
| `csc26-sponsors` | 3 | 2622px |
| `csc26-tickets` | 2 | 1253px |
| `csc26-venue` | 2 | 1064px |

## Caveats — read these

- **No true mobile capture.** The live site is not responsive: it renders on a fixed
  980px canvas and overflows horizontally rather than reflowing. Chrome would not size
  below a ~600px viewport, so `screenshots/narrow-viewport/` shows clipping, not a mobile
  layout. Wix serves a separate mobile view by user-agent sniffing, which was not
  captured. **Design mobile from scratch** — there is no mobile design worth preserving.
- **Headshot resolution varies.** Many are only 190×190 (the Wix display size was the
  largest available). Check `assets/speakers/_headshot-map.json` for dimensions before
  designing a layout that needs large portraits.
- **Third-party logos and headshots are not CSI's to relicense.** See `04-ASSET-GUIDE.md`.
- **Content dates are as-captured.** Early-bird pricing ends July 16 and today's date is
  past that; confirm current pricing with the client before publishing.
