# Completed

## Conference page (CSC 2026) — shipped

Built from a design-agent export, made responsive from scratch (the export had
no media queries; the Wix site it replaces used a fixed 980px canvas that
overflowed rather than reflowed).

- Full 35-speaker roster, now at `/csc-speakers`, plus 35 static
  `/csc-speakers/[slug]` pages on the source's URL shape so shared links keep
  resolving.
- Complete 53-row agenda including the 8 breaks the export dropped, with a
  pinnable `/csc26-agenda`.
- The agenda restructures on mobile rather than reflowing: desktop is a time
  column plus three track columns; under 860px it becomes stacked,
  track-labelled cards.
- Venue photograph supplied by the client.

**Live bugs fixed along the way:** track counts were 12/13/10 and should have
been 11/12/10; the Web Begole pull-quote was a paraphrase of an attributed
quotation; sponsor logos were unlinked; `event.earlyBird` was advertising an
expired offer; Web Begole's session showed a 3:20–4:00 slot when the source says
3:20–3:40.

## Institute page — shipped

`/institute` as a single-page scroller: hero, five pillars, channel, projects,
publications, events, people, get involved.

- Copy cut by roughly two thirds, by deleting whole blocks rather than
  rewording, then cut again in a second review pass.
- Layout variety borrowed from the conference page's own grammar — dot fields,
  washes, corner brackets, the inverse band, a full-bleed closing CTA — so the
  two pages read as one site.
- Project art fetched from each project's own site (CAT, Phish Golf, Evil
  Digital Twin), including EDT's animated loop as an animated icon.
- Bios open in a `<dialog>` lightbox rather than expanding inside a grid cell.

## Cross-cutting

- **Contrast:** `--indigo` gave white text 3.75:1 and failed AA as a button
  ground. Added `--action` (6.18:1) and moved every filled button to it —
  including the conference page's `GET TICKETS`, which was failing too.
- **Email harvesting:** no address appears literally in any HTML or bundle.
  ROT13 in `lib/contact.ts`, assembled after hydration by `<MailLink>`.
  Deliberately no `<noscript>` fallback.
- **Supply chain:** 7-day release cooldown, `trustPolicy: no-downgrade` with an
  empty exclude list, no dependency install scripts. eslint was removed rather
  than allowlisting unaudited transitive dependencies.
- **Docs:** README (current state), DESIGN.md (the system as built), AGENTS.md
  (conventions and the measurement traps that produced false bug reports here).

## Research, preserved in `docs/`

A 133-page crawl of the Wix site, a parity analysis, an independent fact-check,
and specs for the institute port. Moved into version control because the source
site is being retired.

## Cutting the site loose from Wix — shipped

The old site is being retired, so every dependency on it had to go: outbound
links, hotlinked files, and the inbound URLs people already hold.

**Links repointed.** `links.institute` → `/institute`; `contact`, `disclaimer`
and `sitemap` → real pages here at the same paths; `instituteLinks.apply` →
`/apply`. `links.fullAgenda` was dead and now points at `/csc26-agenda`.

**Files self-hosted.** Both travel-brief PDFs were served from Wix's
`/_files/ugd/` store and now live in `public/assets/documents/`.

**Four pages built** on a shared `TextPage` shell:

- `/disclaimer` — legal text verbatim, typo included (`lib/legal.ts`).
- `/contact` — the Wix form's seven subject options as pre-addressed mail.
  The form posted to Wix and this site is static, so there is nothing to port.
- `/apply` — asks for an email with links to yourself and any member
  references. Interim; see `current.md`.
- `/sitemap` — indexes what exists rather than reproducing the old page,
  which listed ~20 Wix pages that have no equivalent here.

**Old URLs caught.** ~50 redirect rules in `lib/redirects.ts`, verified
against all 133 URLs in the crawl: 120 resolve, and the 13 that do not are the
blog posts, left to 404 deliberately. Includes the per-person `/staff/:slug`,
`/staff-1/:slug` and `/council/:slug` pages, and `/donate`'s hop to Zeffy.

**Also added:** `app/sitemap.ts` and `app/robots.ts` — the old site published
its own, and the domain would have served none after the cutover. Both read
`lib/sitemap.ts`, so the human page and the XML cannot drift.

**Bugs found and fixed in the process:**

- `MailLink` shipped `info [at] domain [dot] org` in the *static HTML* the
  moment a call site omitted children — which `/apply` does. That is the most
  widely recognised obfuscation pattern going, so it handed the address to
  exactly the harvesters the module exists to defeat. The pre-hydration label
  is now a neutral placeholder.
- `TextPage`'s prose defaults (`.body p`, `.body ul`) outranked child pages'
  own classes, so the contact list rendered with a bullet indent and lost its
  spacing. Scoped to `:not([class])`.
- `/staff` and `/staff-1` (the index pages) 404'd — `:slug` does not match an
  empty segment.
- `/sitemap` was missing from its own XML.
- `resolveSiteUrl()` was private to `app/layout.tsx`; extracted to `lib/site.ts`
  so the sitemap and robots share one resolver instead of copying it.
