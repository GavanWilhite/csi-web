# Icebox

Speculative. Do not act without asking.

## The rest of the Wix site

Roughly 100 unique pages beyond what is built: programmes (`/shield`, `/ctx`,
`/edu`), `/research`, `/publications`, `/journal`, `/resources`, membership
funnels, past events (`hsc2025`, `ncs2025`), and 22 staff/council bio pages.

`docs/research/02-CONTENT-INVENTORY.md` has the page-by-page inventory and the
duplication analysis — deduplicated, 133 URLs is closer to 100 real pages. Much
of it is thin or contradictory and should be cut rather than ported.

## Letting a non-technical person edit the site

Researched, then parked. Two documents:

- `docs/research/DELEGATION-OPTIONS.md` — git-backed CMS options, and why
  storing a GitHub token in Vercel env vars is the wrong mechanism.
- `docs/research/CLAUDE-CODE-ACCESS.md` — Claude Code's non-CLI surfaces and the
  GitHub Action path, where the collaborator only comments on an issue.

Current direction is agentic updates through GitHub, so neither is needed yet.
The hard floor either way: arbitrary code changes require a GitHub account.

## Restoring light mode

Every colour resolves through a token, so this is one `[data-theme="light"]`
block rather than a component sweep. The design export shipped light values if
they are ever wanted.

## Reinstating the skip link

Removed at the client's request. It was a keyboard-accessibility affordance,
visible only on focus; the CSS is retained in `globals.css` with a note.
