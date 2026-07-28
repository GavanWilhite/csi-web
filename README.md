# Cognitive Security Institute — website

Next.js 16 (App Router), TypeScript, CSS Modules, pnpm. Dark mode only.
Statically prerendered: every route is HTML at build time, no server rendering
at request time and no runtime data fetching.

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
```

## Routes

| Route | What |
|---|---|
| `/` | CSC 2026 conference page |
| `/csc-speakers` | Full 35-speaker roster |
| `/csc-speakers/[slug]` | 35 speaker pages, one per speaker |
| `/csc26-agenda` | Full two-day agenda, pinnable |
| `/institute` | The Institute: mission, pillars, channel, projects, publications, events, people, get involved |

Speaker URLs match the old Wix site's shape, so links already shared keep
resolving.

## Where things live

```
app/                 routes; globals.css holds the token layer
components/          conference page + shared (Nav, Footer, MailLink, Icon)
components/institute/ the /institute sections
lib/                 all content, as typed data
public/assets/       logos, portraits, project art, sponsor marks
```

**Content is data, not markup.** To change copy, a speaker, a session or a
sponsor, edit `lib/` — not a component:

| File | Holds |
|---|---|
| `lib/event.ts` | Event facts, outbound URLs, conference nav |
| `lib/content.ts` | Tracks, keynote cards, sponsors |
| `lib/agenda.ts` | All 53 agenda rows (45 sessions + 8 breaks) |
| `lib/speakers.ts` | 35 speakers: bios, credentials, headshots, sessions |
| `lib/institute.ts` | Institute copy, pillars, projects, publications, events |
| `lib/people.ts` | 22 staff, board and council members |
| `lib/videos.ts` | YouTube snapshot for the channel row |
| `lib/contact.ts` | Encoded contact address |

Design rules are in [DESIGN.md](./DESIGN.md). Conventions for agents and
contributors are in [AGENTS.md](./AGENTS.md).

## Things that will bite you

**No linter.** `eslint` and `eslint-config-next` are deliberately absent: their
transitive dependencies tripped the supply-chain trust policy below, and
allowlisting them would have meant vouching for unaudited packages. Type safety
comes from `tsc` during `next build`. If you want linting, prefer a
single-binary tool (Biome, oxlint) over the eslint dependency tree.

**`--indigo` is not a button colour.** At its lightness, white text on it is
3.75:1 and fails WCAG AA. Filled buttons use `--action`. See DESIGN.md.

**The channel row goes stale.** `lib/videos.ts` is a point-in-time snapshot of
the eight most recent uploads, taken 2026-07-27. A build-time refresh script is
the intended follow-up; there is deliberately no runtime API call, because that
would break the static prerender.

**Contact addresses are never written literally.** Use `<MailLink>`; see
DESIGN.md.

**`SITE_URL` is optional.** Absolute OG URLs resolve from `SITE_URL`, falling
back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so a standard Vercel deploy
needs no configuration. Set `SITE_URL` only to override for a custom domain.

## Supply chain

Policy is in `pnpm-workspace.yaml` so it travels with the repo to CI. pnpm 10.x
*also* honours these in `.npmrc` (kebab-case), contrary to current pnpm.io docs
— verified empirically. Casing is format-specific and **fails silently**:
camelCase in `pnpm-workspace.yaml`, kebab-case in `.npmrc`.

- `minimumReleaseAge: 10080` — 7 days. Why the lockfile holds React at 19.2.4
  while 19.2.7 exists.
- `trustPolicy: no-downgrade`, empty exclude list.
- `onlyBuiltDependencies: []` — no dependency may run install scripts.

Verify by behaviour, not by config: `pnpm config get` echoes keys it never
applies.

## Known gaps

- **Institute imagery** — the pillar images and project art are in place, but
  several source hero images in the original crawl were Wix placeholders (one
  was 9×5px) and were never usable. Sections that would have used them ship
  without.
- **Low-resolution headshots** — 16 of 35 speaker portraits exist only at
  190×190. Per-speaker OG images ship only above the 200×200 floor.
- **Blog not ported** — the three "latest" cards link out to the live Wix posts.
- **Unresolved content questions** are flagged in the module headers of
  `lib/institute.ts` and `lib/people.ts` rather than guessed: the Evil Digital
  Twin presenter credit, the partners/supporters label swap, and three roster
  titles that contradict the person's own bio.
- **No early-bird deadline** — `event.earlyBird` is `false`; the advertised
  July 16 date passed. Set `earlyBirdEnds` and flip it if a new one exists.
- **No published ticket price** — pricing lives on Zeffy so it cannot go stale
  here.

All seven sponsors ship, MindShield included: it appeared on the source landing
page though not its sponsors page, and the client confirmed it stays.
