# CSC 2026 — Conference Site

Next.js 16 (App Router) implementation of the Cognitive Security Conference 2026
page, built from the design agent's export in `../resources/design-export/`.

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
render server-side with the inactive one `hidden`, so all 53 sessions are
indexable; switching still requires JS.

**Fonts.** Orbitron / Space Grotesk / IBM Plex Mono are self-hosted via
`next/font`. Material Symbols is the one external request, loaded with
`display=block` so the browser never paints raw ligature text
("calendar_month") before the glyphs arrive.

## Supply chain

Policy lives in `pnpm-workspace.yaml`, **not** `.npmrc` — pnpm reads only auth
and registry settings from npmrc, so a global `minimum-release-age` there does
not govern pnpm installs.

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
- **Early-bird flag.** `event.earlyBird` in `lib/event.ts` is `true` to match the
  export, but the advertised deadline (July 16) has passed. Confirm with the
  client and flip it — it drives both the hero flag and the registration copy.
- **This is one page.** The other 130-odd URLs from the content audit are not
  built.

## Layout

```
app/            layout (fonts, metadata), page (section composition), globals.css (tokens)
components/     one .tsx + .module.css per section; Nav and Agenda are client components
lib/            event.ts (facts, links), content.ts (speakers/tracks/sponsors), agenda.ts (53 sessions)
public/assets/  logos, sponsor marks, keynote portraits
```

Content is data, not markup — edit `lib/`, not the components.
