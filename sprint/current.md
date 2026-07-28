# Current

**Status: shipped and clean.** Both pages are built, verified and pushed.
Nothing is in flight.

The site is now a standalone replacement: it no longer links to the Wix site
for anything, and it catches the old site's URLs. What is left is three
client answers.

> **This repo is live.** It is connected to Vercel and **auto-deploys on
> every push to `main`**. See the deployment note in [AGENTS.md](../AGENTS.md)
> before you push.

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

## Deployment

Connected to Vercel through the GitHub integration: **a push to `main` is a
production deploy.** No environment variables are needed — OG URLs and
`sitemap.xml` resolve from `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel
injects at build. There is no `.vercel/` in the checkout because the link
lives on the Vercel side, not in the repo; its absence does not mean
unconnected.

**Redirects need this Node deploy.** `next.config.ts` carries ~50 redirects
for old Wix URLs. A static export (`output: 'export'`) would drop them
silently — if hosting ever moves to plain static files, those rules must be
reimplemented at the CDN.

## Known dead ends, deliberate

- **13 `/post/<slug>` blog URLs 404.** Not redirected on purpose: a reader who
  clicked through to a specific article is better served by a 404 than by
  being dumped on `/institute` as though it were the thing they asked for.
  Fixed properly by porting the blog — see `backlog.md`, the post text is
  already extracted.
