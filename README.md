# Cognitive Security Institute — website

Next.js 16 (App Router), TypeScript, CSS Modules, pnpm. Dark mode only.
Statically prerendered: every route is HTML at build time, no server rendering
at request time and no runtime data fetching.

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm check          # content consistency (also runs as part of build)
```

## Routes

| Route | What |
|---|---|
| `/` | CSC 2026 conference page |
| `/csc-speakers` | Full 35-speaker roster |
| `/csc-speakers/[slug]` | 35 speaker pages, one per speaker |
| `/csc26-agenda` | Full two-day agenda, pinnable |
| `/institute` | The Institute: mission, pillars, channel, projects, publications, events, people, get involved |
| `/apply` | Membership application |
| `/contact` | Contact, by pre-addressed mail |
| `/disclaimer` | Legal notice, verbatim from the old site |
| `/sitemap` | Human-readable index (`/sitemap.xml` is generated separately) |

Machine surfaces, all generated from the same `lib/` content the pages
render — `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, plus
schema.org JSON-LD on `/`, `/institute` and the 35 speaker pages.

**This site no longer depends on the old one.** Every outbound link to
`cognitivesecurityinstitute.org` is gone except three blog-post URLs, the
travel-brief PDFs are self-hosted, and the last five routes above replace
pages that died with the Wix site.

URLs match the old site's shape wherever one existed — speakers, agenda,
contact, disclaimer, sitemap, apply — and `lib/redirects.ts` catches the ~50
that had no equivalent, so shared links and search results keep resolving
after the domain moves. `pnpm build` then a run of the check in
`sprint/completed.md` covers all 133 crawled URLs.

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
| `lib/contact.ts` | Encoded contact address, contact subjects |
| `lib/apply.ts` | Membership application copy |
| `lib/legal.ts` | Disclaimer text — verbatim, do not edit |
| `lib/sitemap.ts` | Site index, drives `/sitemap` and `/sitemap.xml` |
| `lib/redirects.ts` | Old Wix URL → new route |
| `lib/site.ts` | Base URL resolution for absolute links |
| `lib/schema.ts` | schema.org JSON-LD (Event, NGO, Person) |
| `lib/llms.ts` | `/llms.txt` and `/llms-full.txt` |

Design rules are in [DESIGN.md](./DESIGN.md). Conventions for agents and
contributors are in [AGENTS.md](./AGENTS.md). Where the work stands is in
[sprint/](./sprint/current.md). Research, specs and the preserved crawl of the
old site are in [docs/](./docs/README.md) — that crawl is the only record of a
site being retired.

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
DESIGN.md. Nothing address-shaped may appear in the served HTML — not the raw
address and not an `[at]`/`[dot]` rendering of it, which harvesters normalise
as a matter of course. `<MailLink>` with no children renders a neutral
placeholder until hydration.

**Adding a page? The build will fail until you index it.**
`scripts/check-content.mjs` runs after `next build` and rejects a route that
is in neither `sitemap.xml` nor `llms.txt` — because a page nothing links to
is invisible, and that failure is otherwise silent. It also catches
`event.dates` drifting from the ISO dates, a mistyped `properName`, and the
contact address leaking into a machine surface.

**Never put the address in a machine surface.** JSON-LD and the `llms.txt`
files are plain text served to anything that asks — an `email` property or a
contact line there would undo `lib/contact.ts` completely. Both modules carry
a warning to that effect; heed it.

**Speaker names exist twice.** `speaker.name` is the all-caps display form the
roster uses; `speaker.properName` is ordinary casing, and is what structured
data and the markdown surfaces emit. Shouting a name at a search engine is not
what the typography meant. Cased by hand — "MCQUIGGAN" title-cases wrong and
FC is not "Fc".

**Redirects need a Node deploy.** `lib/redirects.ts` keeps ~50 old Wix URLs
alive. Vercel handles this; a static export (`output: 'export'`) would drop
every rule silently.

**`SITE_URL` is optional.** Absolute OG URLs resolve from `SITE_URL`, falling
back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so a standard Vercel deploy
needs no configuration. Set `SITE_URL` only to override for a custom domain.
Whichever is used, it is read **at build time** — setting it only at runtime
does nothing.

## Deployment

**Connected to Vercel via the GitHub integration. Every push to `main`
deploys to production.** No staging step, no manual promote — see the warning
at the top of [AGENTS.md](./AGENTS.md) before pushing. Other branches get
preview deployments.

No environment variables are required. There is no `.vercel/` directory in
the repo and there does not need to be; the project link lives on Vercel's
side.

The ~50 redirects in `lib/redirects.ts` depend on this being a Node deploy.
`output: 'export'` would drop every one of them silently.

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
- **Blog not ported** — the three "latest" cards are the only outbound links
  left to the old site, and they die with it. The other ten posts' `/post/`
  URLs 404 here by design (see `sprint/current.md`). All 13 posts are already
  extracted in `docs/research/research-posts.json`, so the port is unblocked.
- **Membership intake is an email**, not a form — the Wix form cannot be
  ported to a static site. Point `instituteLinks.apply` at a hosted form to
  replace it.
- **YouTube descriptions carry dead old-site URLs** in `lib/videos.ts`. They
  are YouTube's own text, render as plain text clamped to two lines, and are
  never links — they will go when the channel snapshot is next regenerated.
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
