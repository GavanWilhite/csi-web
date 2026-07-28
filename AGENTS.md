<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Working in this repo

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
  `<MailLink>` handles this; do not hand-roll a mailto.
- `TextPage`'s prose CSS is scoped to `:not([class])` on purpose. A bare
  `.body p` rule outranks a child page's own class and silently overrides it.
