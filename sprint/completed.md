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

## Machine-readable surfaces — shipped

Made the site legible to crawlers and assistants, on the same principle as
everything else here: generated from `lib/`, never hand-maintained.

- **schema.org JSON-LD** on `/`, `/institute` and all 35 speaker pages —
  `Event` (dates, venue as a `PostalAddress`, capacity, Zeffy offer, 35
  performers), `NGO` (registration facts already in the footer), and `Person`
  per speaker, cross-linked by `@id` so a speaker resolves to the event they
  perform in. Offer carries a URL but no price: pricing lives on Zeffy and
  would go stale here.
- **`/llms.txt`** (index) and **`/llms-full.txt`** (~106kB, the whole site as
  markdown), per llmstxt.org.
- **`/robots.txt`** now names the AI crawlers explicitly. A wildcard already
  allowed them; the named groups document the decision so nobody later reads
  silence as an oversight.

**Honest assessment:** llms.txt is published by roughly one site in ten as of
mid-2026 and the major crawlers largely skip it in favour of fetching HTML.
It costs a few kB and no maintenance. The JSON-LD is the surface with actual
consumers today, and is where the value is.

**Found while doing it:** speaker names are stored all-caps for display, so
structured data would have shouted every name at Google. Added
`speaker.properName` — cased by hand across all 35, because "MCQUIGGAN"
title-cases to "Mcquiggan" and FC is not "Fc". Also caught `/llms.txt`
reporting "30 agenda rows"; that counted grid rows, not sessions, against the
53 the site advertises.

## Build-time content gate — shipped

The generated surfaces stay current on their own for *content* edits, but two
kinds of drift are silent and neither is fixable by documentation:

- **A new route** does not add itself to `lib/sitemap.ts` or `llmsIndex()`.
  Verified empirically: a throwaway `app/drift-test/page.tsx` built and served
  fine while appearing in none of `sitemap.xml`, `/sitemap` or `llms.txt`.
- **A fact stored twice** — `event.dates` vs the ISO pair, `speaker.name` vs
  `properName`.

`scripts/check-content.mjs` (no dependencies) now runs after `next build` and
fails it on those, plus the contact address appearing in any machine surface.
It reads the **built artifacts**, so it cannot be satisfied by source that
looks right but generates nothing. All four checks were verified by
deliberately breaking each one.

Also removed one duplicated fact rather than checking it: `event.venueAddress`
is now derived from `venueAddressParts` instead of being typed out twice.

## Contact as endpoints, not a menu — shipped

`/contact` reproduced the old Wix form's seven-option dropdown as seven mail
rows and showed no address. Reworked twice on client feedback; where it landed:

- **`/contact` is generic** — the address as a mailto link with a copy button
  beside it (the ordinary copy-field affordance), and one line of guidance.
  It does **not** list the reasons to get in touch: the CTA that raised the
  subject is where the reader already is.
- **Each reason is a route**: `/contact/<path>`, ten of them, prerendered from
  `contactPaths` in `lib/contact.ts`. These are endpoints on purpose — each is
  meant to **become a hosted form** later, at which point the page changes and
  no link does. The first seven are the Wix dropdown's own options; the last
  three (sponsorship, SHIELD, CTX) are asks the site makes that the form did
  not cover.
- **In-context CTAs link there** instead of carrying a `mailto:` —
  Sponsors → `/contact/sponsorship`, get-involved → `/contact/partnership`,
  the SHIELD and CTX cards → their own paths. That collapsed three components
  to plain links and let `MailLink` be deleted entirely, along with
  `mailSubject` on `Project` and `Route`.

**The address is one text node**, not split across elements. Splitting buys
nothing (it is already absent from the HTML, so the only scrapers left run JS
and read `textContent`) and injects whitespace or newlines into the clipboard,
producing an address that looks right and pastes broken.

Verified in-browser: `writeText` resolves with the exact address and no
whitespace; the confirmation label flips within 3ms and reverts after 2.1s; a
drag-select across the address yields exactly the address; keyboard focus
reaches the copy button and shows the cyan ring; 40/40 overflow checks clean
across 10 routes; unknown slugs 404; nothing orphaned — every contact path has
an inbound link, the four with CTAs have two.

**Measurement note:** `getComputedStyle(el, ':focus-visible')` returns the base
style, not the focused one — pseudo-*classes* are not readable that way. It
looked like the focus ring was missing when it was not. Check focus with a real
Tab and a screenshot.
