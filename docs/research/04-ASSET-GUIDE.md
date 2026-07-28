# 04 — Asset Guide

170 unique original-resolution files pulled from the Wix CDN, plus 2 PDFs. Wix serves
images through resize/crop transforms (`/v1/fill/w_190,h_190,...`); every file here is
the **untransformed original**, which is usually much larger than the size the live site
displays.

`assets/asset-index.json` maps every file → source URL → the pages that use it.

## Start here — `assets/brand/`

| File | Dimensions | Size | What it is |
|---|---|---|---|
| `csi-logo-horizontal-white.png` | 2718×578 | 63KB | **Primary CSI logo.** Shield + brain-circuit mark with wordmark. White wordmark on transparency — it will look blank on a white background; composite it on dark to inspect. Blue circuit accent inside the shield. Appears on **132 of 133 pages**. |
| `csc26-logo-ravens.png` | 3783×3145 | 2.0MB | **CSC 2026 event mark.** Twin ravens in a Saturn-style ring, "VEGAS · 2026". Sourced from the conference t-shirt artwork. RGBA. |
| `hero-radio-telescope.jpg` | 6850×5720 | 11.8MB | Radio telescope at dusk. Section background on the conference page. |
| `hero-led-wall.jpg` | 4032×3024 | 8.9MB | Close-up LED/SMD video wall. Footer background across the conference cluster. |

Both hero images are far larger than any web use requires.

## `assets/brand/sponsors/` — 7 logos

All white-on-transparent PNG, 244KB total: `living-security`, `fable`, `obscureiq`,
`deeptrust`, `mindshield`, `hrl-laboratories`, `strategos-international`.

Because they are white-on-transparent, they are invisible on light backgrounds. If the
new design is light-mode, **dark or colour versions must be requested from each sponsor**
— do not recolour a sponsor's mark unilaterally.

Two further logos appear on the home page but were not on the conference page: **WIBU
Systems** and **BeyondTrust**.

## `assets/speakers/` — 35 headshots

Keyed by speaker slug, matching `bio_page` in `content/csc26-speakers.json`.
`_headshot-map.json` records each file's source URL and pixel dimensions.

**16 of 35 are 190×190 or smaller** — that was the largest version on the CDN:

> ashley_rose, bonnie-rushing, brian-steed, bryce-allen, fc, greg-carpenter,
> jeff-jockisch, jessica-barker, len-noe, peggy-yin, perry-carpenter, rand-waltzman,
> sanny-liao, sara-rabinovitch, tamara-schwartz, web-begole

Any layout using portraits larger than ~190px will need re-supplied images for these 16.
The remaining 19 range up to 1708×2560.

Styling is inconsistent across the set: colour, black-and-white, one yellow duotone
(Jeff Jockisch), one deliberately glitched/pixelated (Bonnie Rushing), varied crops and
backgrounds.

## `assets/documents/` — 2 PDFs

- `CSC-2026-Human-Risk-Travel-Justification-Brief.pdf` (1 page)
- `CSC-2026-Cognitive-Warfare-Travel-Justification-Brief.pdf` (1 page)

Linked from both the conference page and the venue page.

## Bulk buckets

| Folder | Files | Size | Contents |
|---|---|---|---|
| `conference/` | 49 | 31MB | Speaker headshots, sponsor logos, section backgrounds, event marks |
| `people/` | 25 | 65MB | Staff and board portraits — stylised vector/painted illustrations, not photographs |
| `home/` | 5 | 9.1MB | Home-page imagery |
| `other/` | 91 | 302MB | Everything else: blog post art, research card images, programme graphics |

`assets/_contact-sheet-conference.jpg` is an 8-column visual index of the conference
bucket — open it to identify files by eye rather than by hash filename.

Filenames are Wix media hashes (`439552_<hash>~mv2.png`). The original upload names are
often recoverable from the markup in `content/*.md` — e.g.
`CSI-logo_hz.png`, `CSC 26 tshirt logo-trans.png`, `terri-borras.jpeg`.

## Rights and licensing — read before reuse

- **Speaker headshots** are supplied by the speakers. Rights almost certainly cover
  promotion of this event only. Do not reuse them beyond CSC-2026 context without
  confirming.
- **Sponsor logos** are the sponsors' trademarks. Use as-is at correct proportions; do
  not recolour, crop, or restyle. Request official light-background versions if needed.
- **Stock imagery.** The hero files carry stock-library naming
  (`antenna-satellite-dish-clipping-path-included-2026-01-06-09-30-02-utc.jpg`,
  `abstract-close-up-bright-colored-led-smd-video-wal-2026-03-11-00-55-59-utc.jpg`) —
  the `-utc` timestamp suffix is characteristic of Envato/Elements downloads. **The
  client holds whatever licence was purchased; verify before reusing in a new design**,
  particularly if the redesign changes the usage context.
- **Staff/board portraits** are illustrated derivatives, presumably commissioned. Origin
  unconfirmed.
- **The CSI logo and CSC event mark** are the client's own.

## Practical notes

- Nothing here is an SVG. Both logos are raster PNG at high resolution — good enough to
  work from, but **request vector source from the client** for production.
- Total package is ~430MB, dominated by unoptimised originals. Everything will need
  resizing and re-encoding for delivery.
- Some originals are already `.avif`; others are `.png`/`.jpg`/`.jpeg`. Extensions in the
  index reflect the CDN's original format.
