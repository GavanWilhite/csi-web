<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Working in this repo

## ⚠️ This repo is live — pushing publishes

It is connected to Vercel through the GitHub integration and **every push to
`main` deploys straight to production**, at the Cognitive Security Institute's
public domain. There is no staging step and no manual promote.

So `git push` here is not "saving work" — it is putting it in front of the
public, a conference audience and the institute's own members. Treat it as an
outward-facing action:

- **Do not push unless you were asked to.** Commit freely; pushing is a
  separate decision that belongs to the user.
- `pnpm build` must be clean first — it runs `scripts/check-content.mjs`, and
  that gate exists precisely because a broken generated surface is invisible
  locally.
- If you need to see something deployed without publishing it, push a branch
  rather than `main`; Vercel builds a preview for it. Only `main` is
  production.

Note there is no `.vercel/` directory in the checkout. That is normal — the
project link lives on Vercel's side. Its absence is not evidence that nothing
is connected, and has misled at least one session already.

## Orientation

Read [DESIGN.md](./DESIGN.md) before touching anything visual, and
[README.md](./README.md) for where content lives. Start a session with
[sprint/current.md](./sprint/current.md); `docs/research/` holds the specs and
audits behind decisions already made, and `docs/source-content/` is the
extracted text of the old Wix site — the authority for "what did it actually
say?", and the only record now that the site is being retired. The rules below are the ones
most often broken by someone arriving cold.

## Before you start

- **pnpm only.** Never `npm install` here — it will write a lockfile that
  bypasses the supply-chain policy in `pnpm-workspace.yaml`.
- **Do not add dependencies.** If you believe one is genuinely required, stop
  and say so rather than adding it. The policy will likely block it anyway.
- **There is no linter.** `tsc` during `next build` is the only static check, so
  run `pnpm build` — not just `pnpm dev` — before claiming anything works.

## Editing content

Copy, speakers, sessions, sponsors and people are typed data in `lib/`. Edit
those files, not the components. A component that hardcodes a sentence is a bug.

Some values are load-bearing and deliberate. The module headers of
`lib/institute.ts`, `lib/people.ts`, `lib/speakers.ts` and `lib/agenda.ts`
record decisions that look like mistakes and are not — a British spelling kept
because it is the programme lead's own voice, a name omitted because two source
pages disagree, a tagline chosen over a conflicting one. **Read the header
before "fixing" anything in those files**, and if you override a documented
decision, update the note.

Content came from a 2026-07-27 crawl of the Wix site. Prose is quoted, not
paraphrased. Do not silently reword an attributed quotation.

## Verifying visual work

Claiming it works requires:

1. `pnpm build` clean.
2. **Zero horizontal overflow at 1333 / 768 / 390 / 360px**, measured by
   comparing `document.documentElement.scrollWidth` to `window.innerWidth` on
   every route you touched. Do not eyeball a screenshot.
3. Keyboard: every control reachable, focus visible, nothing trapped.

Two measurement traps that have produced false bug reports here:

- **Lazy images.** `loading="lazy"` means `naturalWidth === 0` until the element
  is scrolled into view *and* has had time to decode. Scroll, wait, then
  measure — or you will report 22 broken portraits that are all fine.
- **RSC payload.** Grepping built HTML for a string will match Next's inline
  React payload, not just rendered text. Strip `<script>` blocks and tags before
  asserting that something does or does not appear on the page.

## Running a server

Kill the previous one before starting a new one. Leaving several `next start`
processes on different ports means whoever is reviewing may be looking at a
build from twenty minutes ago, and the resulting "you didn't fix it" is
unfalsifiable. One server, and rebuild before you restart it.

## The old site is gone

`cognitivesecurityinstitute.org` on Wix is being retired, and this site
replaces it. Two rules follow:

- **Never add a link to the old site.** If you need something that only exists
  there, take it from `docs/source-content/` and host it here. The only
  remaining references are three blog-post URLs in `lib/institute.ts`, and
  they are a known gap, not a pattern to copy.
- **Never break an old URL.** `lib/redirects.ts` maps ~50 retired paths onto
  this site. If you rename or remove a route, check whether a redirect points
  at it. The full check — all 133 crawled URLs against a running server — is
  in `sprint/completed.md`.

## Machine-readable surfaces

`/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt` and the
schema.org JSON-LD on `/`, `/institute` and the speaker pages are all
**generated from `lib/`** — never hand-written. A machine surface that
disagrees with the page a human sees is worse than not having one, so if you
change content, they follow automatically. Check they still do.

Two hard rules:

- **No contact address in any of them.** They are plain text served to
  anything that asks. An `email` property in JSON-LD or a contact line in
  `llms-full.txt` hands the address to every harvester going and undoes
  `lib/contact.ts`.
- **Use `speaker.properName`, not `speaker.name`,** in anything a machine
  reads. `name` is the roster's all-caps display form.

Route Handlers need `export const dynamic = "force-static"` or the site stops
being fully static.

**`pnpm build` enforces this** — `scripts/check-content.mjs` runs after
`next build` and fails it on four things that are otherwise silent:

1. A route that exists but is in neither `sitemap.xml` nor `llms.txt`. **This
   is what will catch you when you add a page.** Add it to `lib/sitemap.ts`
   and `llmsIndex()`, or to the exclusion set in the script if leaving it
   unlisted is deliberate.
2. `event.dates` disagreeing with `event.startDate`/`endDate`.
3. A `speaker.properName` that is not the same name as `speaker.name`.
4. The contact address appearing in any machine surface.

It reads the built artifacts, not the source, so it cannot be satisfied by
code that looks right but generates nothing. Run it alone with `pnpm check`.

## Things that are intentional

- No linter, no light mode, no ticket price, no `<noscript>` email fallback.
- `--indigo` is never a filled button ground; `--action` is.
- `lib/videos.ts` is a stale-by-design snapshot; do not add a runtime fetch,
  which would break the static prerender.
- `event.earlyBird` is `false` because the advertised date passed.
- The disclaimer reads "is a an independent". That typo is in the published
  legal text and ships verbatim. Do not fix it.
- `/post/<slug>` URLs 404 rather than redirecting to `/institute`. Sending
  someone who wanted a specific article to a page that is not it is worse
  than a 404.
- **Nothing address-shaped in the HTML.** Not `info@…`, and not
  `info [at] … [dot] org` either — the second is the pattern harvesters
  normalise first, so shipping it in static HTML defeats the whole scheme.
  `<EmailAddress />` handles this; do not hand-roll a mailto, and do not split
  an address across elements — see DESIGN.md for why that is worse, not better.
- **A reason to get in touch is a route, not a mailto.** Each lives at
  `/contact/<path>`, generated from `contactPaths` in `lib/contact.ts`, so it
  can become a hosted form later without any link changing. Link CTAs there.
  `/contact` itself stays generic — it does not list them, because the CTA
  that raised the subject is where the reader already is.
- `TextPage`'s prose CSS is scoped to `:not([class])` on purpose. A bare
  `.body p` rule outranks a child page's own class and silently overrides it.
