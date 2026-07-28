# Backlog

Not started. Roughly in value order.

## Blog port — data is ready

All 13 posts are extracted in `docs/research/research-posts.json` with hero
images matched. The three "latest" cards currently link out to the live Wix
posts, which die with that site.

This was blocked on whether a non-technical person needed a WYSIWYG editor. That
resolved: **no CMS — the site is updated agentically through GitHub.** So the
objection is gone and this is unblocked.

- **Acceptance:** 13 posts as content in the repo, `/post/{slug}` URLs preserved
  (already indexed, so no redirects needed), homepage row queries locally.
- **Note:** one post (`coupons-as-cognitive-malware`) has an empty `categoryIds`
  and could never appear in the source's own filtered row. Needs a category.

## YouTube refresh at build time

`lib/videos.ts` is a point-in-time snapshot and goes stale. The channel is
`UCcjtBmZGno8co3APMD56fuQ` (`@cognitivesecurityinstitute`).

- **Acceptance:** a build-time script refreshes the snapshot; the committed data
  stays as the fallback. Must not become a runtime fetch — that breaks the
  static prerender.
- **Tradeoff:** the Data API gives durations and needs a key; the RSS feed needs
  no key but has no duration data, which every card displays.

## Remaining layout ideas

`docs/research/INSTITUTE-LAYOUT-IDEAS.md` — three of nine are built. Unbuilt and
still worth considering: publications as an editorial index, SHIELD/CTX as
mirrored split panels, varying team card scale by group.

## Commissioned artwork

The layout research flagged three things worth commissioning rather than faking
in CSS: a square CSI emblem, key visuals for Evil Digital Twin and Phish Golf,
and event photography.

## Content questions the crawl cannot answer

Flagged in the module headers of `lib/institute.ts` and `lib/people.ts`, not
guessed:

- Evil Digital Twin credits "Dr. Vindy Sawyer"; every other page says "Dr. Ben
  D. Sawyer". No name currently ships.
- `/partners` and `/supporters` link to each other with swapped labels on four
  source pages. The logo wall is withheld until this resolves.
- Three roster titles contradict the person's own bio (McCallick, Alexander,
  Nobles).
- Dr. Sanny Liao's tagline carries the source's typo, "Behavioral Exonomist".
- 16 of 35 speaker headshots exist only at 190×190. Larger portraits need
  re-supplied images.
