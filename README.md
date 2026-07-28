# CSC 2026 — Conference Site

Next.js 16 (App Router) implementation of the Cognitive Security Conference 2026
page, built from the design agent's export in `../resources/design-export/`,
plus the content ported from the source Wix site
(`../handoff/port-research/`): the full 35-speaker roster with per-speaker
pages, and the `/institute` single-page scroller.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

## Decisions worth knowing

**Dark mode only.** The export shipped both themes plus a toggle; per the
current brief only dark ships. Every colour still resolves through a token in
`app/globals.css`, so restoring light means adding one `[data-theme="light"]`
block — no component changes. `<html data-theme="dark">` and
`viewport.colorScheme` are set so the UA renders scrollbars and form controls to
match.

**The conference page is the source of truth.** Where the export's design-guide
page disagreed with the conference page, the conference page won — the guide is
out of date. Two consequences: tokens come from the conference page's
`[data-theme="dark"]` block, and the guide's "LIGHT MODE DEFAULT" note is not
honoured.

**`--indigo-deep` is lighter than `--indigo` in dark mode.** The export
hardcoded light-mode hover colours inline (`oklch(0.33 0.13 273)`), which in dark
mode would drop a primary button to near-black on hover. Hovers use the token.

**CSS Modules, not Tailwind.** The design is already a CSS-custom-property
system; Modules port it one-to-one and keep the token layer legible. A utility
framework would have added a translation step that drifts.

**Responsive is new work.** The export had no media queries, and the site this
replaces was a fixed 980px canvas that overflowed horizontally instead of
reflowing. Breakpoints: 900px (hero, about, keynotes, travel), 860px (nav,
agenda, sponsors, venue), 560px / 480px (density). Verified at 1333, 768, 390 and
360px with zero horizontal overflow.

**The agenda is restructured, not just reflowed.** Desktop is a time column plus
three track columns. Below 860px the column headers drop away and each slot
becomes stacked, track-labelled cards with an accent edge. The per-cell track
label is in the DOM at every width — visually hidden on desktop where the column
headers carry that information, visible on mobile where they don't. Both days
render server-side with the inactive one `hidden`, so all 53 agenda rows
(45 sessions and plenaries + 8 breaks) are indexable; switching still requires
JS.

**Speakers: one roster, 35 static routes, no duplication of judgement.** The
conference page carries the whole roster grouped by the source's five tracks;
each speaker also gets `/csc-speakers/<slug>` — the same URL shape as the
source Wix site, so already-shared links keep resolving. Bios are rendered as
the verbatim, *unsplit* paragraph sequence from the source: every bio page ran
the talk abstract straight into the biography with no reliable boundary, and
splitting would be guessing (see `lib/speakers.ts`). Per-speaker OG images ship
only where the headshot clears the 200×200 floor — 16 of 35 exist only at
190×190. Absolute OG URLs resolve from `SITE_URL`, falling back to Vercel's
`VERCEL_PROJECT_PRODUCTION_URL` — so no manual configuration is needed on a
standard Vercel deploy. Set `SITE_URL` only to override, e.g. for a custom
domain fronting the site.

**/institute is a snapshot port, not a live system.** All copy is verbatim from
the 2026-07-27 crawl, typed into `lib/institute.ts` / `lib/people.ts`, with the
deliberate exceptions documented in those modules' headers (the unresolved
"Vindy vs. Ben Sawyer" credit, the apply-vs-free membership contradiction, the
partners/supporters label swap — all client decisions, none guessed). The
YouTube row is static committed data (`lib/videos.ts`) and **will go stale**;
the intended follow-up is a build-time refresh script, not a runtime API call.

**Fonts.** Orbitron / Space Grotesk / IBM Plex Mono are self-hosted via
`next/font`. Material Symbols is the one external request, loaded with
`display=block` so the browser never paints raw ligature text
("calendar_month") before the glyphs arrive.

## Supply chain

Policy lives in `pnpm-workspace.yaml` so it travels with the repo — to CI and to
machines without the developer's global config.

pnpm 10.x *does* also honour these settings in `.npmrc` (kebab-case), contrary
to current pnpm.io docs, which describe the v11 direction. Verified empirically:
in a bare directory with no `pnpm-workspace.yaml`, a global
`minimum-release-age` still forced resolution away from a 1-day-old release.
Don't take either the docs or a config echo as proof — `pnpm config get` will
echo keys npm never applies. Test the behaviour.

Casing is format-specific and **fails silently** when wrong:
`pnpm-workspace.yaml` wants camelCase (`minimumReleaseAge`), `.npmrc` wants
kebab-case (`minimum-release-age`). pnpm does not validate `trustPolicy`'s enum
either, so a typo there also fails open with no warning.

- `minimumReleaseAge: 10080` (7 days), matching `minimum-release-age` in
  `~/.npmrc`. This is why the lockfile holds React at 19.2.4 while 19.2.7 exists.
- `trustPolicy: no-downgrade` with an **empty** exclude list.
- `onlyBuiltDependencies: []` — no dependency may run install scripts.

`eslint` and `eslint-config-next` were **removed**, not allowlisted. That chain
pulled pre-provenance transitive deps (`undici-types`,
`eslint-import-resolver-typescript`, `semver@6.3.1`) that tripped the trust
policy; allowlisting would have meant vouching for packages nobody audited, so
dropping an optional dev dependency was the cheaper trade. `@types/node` was
bumped `^20 → ^24` for the same reason. **There is no linter** — type safety
comes from `tsc` during `next build`. To restore linting, prefer a single-binary
tool (Biome, oxlint) over the eslint dependency tree.

## Known gaps

- **No venue photograph.** The export left an empty image drop-target and none
  shipped. It renders as an explicit "VENUE PHOTOGRAPH PENDING" plate rather than
  faking one — swap in `<Image>` in `components/Venue.tsx` when supplied.
- **Low-resolution headshots.** Several source portraits exist only at 190×190.
  The keynote grid deliberately stays at two columns on phones instead of
  dropping to one, so portraits render near native size instead of upscaling.
- **Sponsor logos are white-on-transparent** and legible only on the inverse
  band. Rendered as plain `<img>`; they are third-party trademarks and must not
  be recoloured or re-encoded.
- **Early-bird flag.** `event.earlyBird` is now `false` — the advertised
  July 16 deadline passed and the page was promoting an expired offer. If the
  client sets a new deadline, update `earlyBirdEnds` and flip it back.
- **No ticket price is published.** The only price artefact in the crawl is a
  Zeffy widget screenshot ($500 GA); the client has not confirmed it, so the
  page links out to Zeffy rather than stating a number.
- **The video row goes stale by design.** `lib/videos.ts` is a point-in-time
  capture of the channel's 8 most recent uploads. Build-time refresh is the
  intended follow-up.
- **Institute content carries unresolved client decisions**, flagged in the
  module headers of `lib/institute.ts` and `lib/people.ts` rather than
  guessed: the Evil Digital Twin presenter credit, partners/supporters swap,
  three roster titles that contradict the person's own bio, the mission
  one-liner, Focus 5 naming.
- **Beyond `/`, `/institute` and the 35 speaker pages**, the remaining URLs
  from the content audit (blog posts, forms, past-event hubs) are not built.

## Layout

```
app/            layout, page (conference), csc-speakers/[slug] (35 SSG pages), institute/
components/     one .tsx + .module.css per section; institute/ holds the scroller's sections
lib/            event.ts (facts, links) · content.ts (keynotes/tracks/sponsors)
                agenda.ts (53 rows) · speakers.ts (35, generated from the crawl)
                institute.ts (scroller copy) · people.ts (22 bios) · videos.ts (snapshot)
public/assets/  logos, sponsor marks, 35 speaker headshots, people portraits,
                institute imagery (re-encoded WebP — the source PNGs were 4–6 MB)
```

Content is data, not markup — edit `lib/`, not the components.
