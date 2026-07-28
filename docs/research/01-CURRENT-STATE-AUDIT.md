# 01 — Current State Audit

Factual record of the existing site as captured **2026-07-27**. Observations only; no
recommendations.

## Platform

- **Wix**, server-rendered (`server: Pepyaka`, assets on `static.wixstatic.com` and
  `static.parastorage.com`).
- 133 URLs across 7 sitemaps. Home page HTML is ~930KB, overwhelmingly framework payload.
- Dynamic collections back four URL patterns: `/staff/*`, `/staff-1/*`, `/council/*`,
  `/csc-speakers/*`.

## Layout and responsiveness

- Fixed **980px content canvas**. At a 606px viewport, `document.body.scrollWidth` was
  still 980 — the layout **overflows horizontally rather than reflowing**.
- Page `scrollHeight` was identical (4252px) at 1728px and 606px viewports, confirming no
  breakpoint reflow occurs in that range.
- Wix serves a separate mobile view via user-agent detection. That view was **not
  captured** and is not represented in this package.
- Evidence: `screenshots/narrow-viewport/cognitive-security-conference/`.

## Typography (computed, from the live conference page)

Family stack resolves to Wix-hosted webfonts wrapping:

| Role | Face |
|---|---|
| Dominant body | **Atkinson Hyperlegible Next Light** |
| Headings / emphasis | Atkinson Hyperlegible Next ExtraBold, Bold |
| Also present | Atkinson Hyperlegible Next Regular, Medium, Bold Italic; Atkinson Hyperlegible Bold |

Atkinson Hyperlegible is the Braille Institute's legibility-optimised family, released
under an open licence.

Observed `font-size`/`font-weight` pairs, by frequency:

```
10px/400 ×35   18px/400 ×20   16px/400 ×10   20px/400 ×6   24px/400 ×6
11px/700 ×4    38px/400 ×3    16px/700 ×3    23px/400 ×2   14px/400 ×2
33px/700 ×1    14px/700 ×1    36px/400 ×1    45px/700 ×1
```

There is no coherent modular scale — sizes are set ad hoc per element.

## Colour (computed, from the live conference page)

**Text colours, by frequency**

| Value | Hex | Count |
|---|---|---|
| `rgb(0, 0, 0)` | `#000000` | 33 |
| `rgb(255, 255, 255)` | `#FFFFFF` | 33 |
| `rgb(255, 224, 35)` | `#FFE023` | 10 |
| `rgb(109, 202, 251)` | `#6DCAFB` | 5 |
| `rgb(29, 221, 242)` | `#1DDDF2` | 4 |
| `rgb(252, 82, 26)` | `#FC521A` | 4 |
| `rgb(51, 153, 254)` | `#3399FE` | 4 |
| `rgb(24, 24, 24)` | `#181818` | 3 |

**Background colours, by frequency**

| Value | Hex | Count |
|---|---|---|
| `rgb(24, 24, 24)` | `#181818` | 5 |
| `rgba(84, 125, 246, 0.1)` | `#547DF6` @ 10% | 4 |
| `rgb(15, 24, 48)` | `#0F1830` | 2 |
| `rgb(51, 153, 254)` | `#3399FE` | 2 |
| `rgba(26, 24, 42, 0.63)` | `#1A182A` @ 63% | 2 |
| `rgb(252, 82, 26)` | `#FC521A` | 2 |
| `rgb(26, 24, 42)` | `#1A182A` | 1 |
| `rgb(255, 247, 48)` | `#FFF730` | 1 |
| `rgb(152, 48, 253)` | `#9830FD` | 1 |
| `rgb(40, 54, 120)` | `#283678` | 1 |

Six saturated accent hues (yellow, orange, magenta-purple, cyan, sky blue, royal blue)
are in simultaneous use on a single page, over near-black and deep-navy grounds.

## Section-by-section, conference page

Ordered as captured in `screenshots/desktop/cognitive-security-conference/`:

| # | Section | Notes |
|---|---|---|
| 01 | Sticky nav + hero | Neon raven/Saturn logo; yellow-on-teal gradient card, "Your People are HERE!" |
| 01 | Sponsor bar | Full-bleed **`#9830FD`** magenta band, 7 white logos |
| 01–02 | Testimonial carousel | Rotating quotes over a photographic LED-wall background |
| 02 | Positioning statement | Blue italic lede + body paragraph |
| 02–03 | Keynote speakers | 4 circular portraits on a blue grid-pattern panel |
| 03 | Planning Your Attendance | Two PDF travel-justification briefs |
| 03 | Venue | Address block + room-block CTA |
| 03–04 | Tickets | Embedded third-party **Zeffy** iframe |
| 04–05 | CSC 2026 wordmark + closing statement | |
| 05 | Call for Sponsors / Hosted by | Over the LED-wall photo |

## Defects observed

1. **Broken primary CTA.** The hero "Purchase Tickets" button links to
   `/cognitive-security-conference` — the page it is already on — not to
   `/csc26-tickets`. Confirmed in `content/cognitive-security-conference.md`.
2. **Contradictory speaker taglines.** The same four keynotes carry different
   descriptors on two pages:

   | Speaker | Conference page | Speakers page |
   |---|---|---|
   | Terri Borras | "Cognitive Warfare & the Information Environment" | "Defending the Moment Before Decision" |
   | Ashley Rose | "Human Risk Management" | "The Pioneer of Human Risk Management" |
   | Rand Waltzman | "The Evolution of Cognitive Security" | "The Godfather of Cognitive Security" |
   | Dave Pitts | "Cognitive Warfare" | "The Battle for Decision Autonomy" |

3. **Stale footer.** Reads `©2025 Cognitive Security Institute` sitewide.
4. **Expired offer displayed as live.** "Early-bird pricing is available until July 16th."
5. **Duplicated collections.** `/staff/*` and `/staff-1/*` contain the same 12 people at
   two URL sets. `/csc-speakers` and `/cognitive-security-conference-speakers` both serve
   speaker rosters.
6. **Orphaned draft pages in the sitemap.** `/copy-of-application`, `/copy-of-csc`.
7. **Low-resolution portraits.** Many headshots exist only at 190×190; see
   `assets/speakers/_headshot-map.json`.
8. **Heavy hero imagery.** `hero-radio-telescope.jpg` is 6850×5720 (11.8MB);
   `hero-led-wall.jpg` is 4032×3024 (8.9MB).
9. **Third-party checkout.** Ticketing is a Zeffy iframe, not a native flow.

## Organisational facts (from the footer, sitewide)

- Cognitive Security Institute — registered **501(c)(3)**
- **EIN:** 92-3238363
- **State of Oregon Registration #:** 66753
- Contact: `info@cognitivesecurityinstitute.org`
- Footer links: Disclaimer · Sitemap · Donate · Contact
