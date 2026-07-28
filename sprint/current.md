# Current

**Status: shipped and clean.** Both pages are built, verified and pushed.
Nothing is in flight.

The site is now a standalone replacement: it no longer links to the Wix site
for anything, and it catches the old site's URLs. What is left is a deploy
decision and two client answers.

## Blocked on the client

- **Early-bird deadline.** `event.earlyBird` is `false` and the site advertises
  no offer, which is correct until there is a date. If one exists, set
  `earlyBirdEnds` and flip the flag.
- **Membership intake.** `/apply` currently asks people to email. The old Wix
  form had fourteen fields and two reference blocks; a static site cannot
  accept a POST, so there is nothing to port it to. If CSI wants structured
  intake back, stand up a hosted form (Tally, Google Forms, Fillout) and point
  `instituteLinks.apply` at it — that constant is the only thing to change.
  The original field list is preserved in `docs/source-content/apply.md`.
- **Disclaimer typo.** The published legal text reads "is a an independent".
  Reproduced verbatim rather than silently corrected — editing published
  legal wording is the client's call. See `lib/legal.ts`.

## Blocked on a decision, not on work

- **Deploy.** The repo is on GitHub and needs no environment variables — OG URLs
  and `sitemap.xml` fall back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. It is
  unclear whether a Vercel project is connected; there is no `.vercel/` in this
  checkout. If the GitHub integration is connected on the dashboard, every push
  has been deploying already.

  **Redirects need a Vercel/Node deploy.** `next.config.ts` now carries ~50
  redirects for old Wix URLs. A static export (`output: 'export'`) would drop
  them silently — if hosting ever moves to plain static files, those rules
  must be reimplemented at the CDN.

## Known dead ends, deliberate

- **13 `/post/<slug>` blog URLs 404.** Not redirected on purpose: a reader who
  clicked through to a specific article is better served by a 404 than by
  being dumped on `/institute` as though it were the thing they asked for.
  Fixed properly by porting the blog — see `backlog.md`, the post text is
  already extracted.
