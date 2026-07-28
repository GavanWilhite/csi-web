# docs/

Preserved research and source material. 1.6MB, deliberately in version control.

## Why this is here

The site this replaces — `cognitivesecurityinstitute.org` on Wix — **is being
retired**. Once it is, the crawl in `source-content/` becomes the only record of
what it said. It was living in a sibling `handoff/` directory under no version
control at all, one `rm -rf` from gone. The heavy parts of that directory (raw
HTML, 438MB of downloaded assets) stayed out; the irreplaceable parts are here.

If `../handoff/` still exists on your machine it holds the originals, including
full-resolution assets. Do not assume it does.

## `research/`

| File | What |
|---|---|
| `00-BRIEF-AS-STATED.md` | The client's brief, recorded verbatim |
| `01-CURRENT-STATE-AUDIT.md` | The old Wix site: tokens, defects, platform notes |
| `02-CONTENT-INVENTORY.md` | All 133 pages, with the duplication analysis |
| `03-CONFERENCE-PAGE-SPEC.md` | Conference page content spec with real copy |
| `04-ASSET-GUIDE.md` | Asset provenance and rights caveats |
| `CONFERENCE-GAPS.md` | Parity analysis vs the Wix conference cluster |
| `FACT-CHECK.md` | Independent audit of the built site against source |
| `INSTITUTE-CONTENT-SPEC.md` | Institute IA and copy spec |
| `INSTITUTE-LAYOUT-IDEAS.md` | Layout recommendations; several not yet built |
| `DYNAMIC-MODULES.md` | How the Wix YouTube and blog widgets worked |
| `DELEGATION-OPTIONS.md` | Letting a non-technical person edit the site |
| `CLAUDE-CODE-ACCESS.md` | Same question, Claude Code specifically |
| `speakers-full.json` | 35 speakers: bios, credentials, sessions, headshots |
| `research-posts.json` | All 13 blog posts, extracted — the blog port is not done |
| `videos.json` | The channel snapshot `lib/videos.ts` was built from |
| `csc26-agenda.json` | 53 agenda rows, the authority for `lib/agenda.ts` |
| `csc26-speakers.json` | Roster with canonical taglines |

**Rights:** speaker headshots and sponsor marks are third-party. See
`04-ASSET-GUIDE.md` before reusing anything outside CSC-2026 promotion.

## `source-content/`

Extracted text of all 133 pages of the old site, one markdown file per page:
title, meta description, heading outline, and body text with links preserved.
The authority for any question of "what did the old site actually say?".
