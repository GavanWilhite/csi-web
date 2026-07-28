# Current

**Status: shipped and clean.** Both pages are built, verified and pushed.
Nothing is in flight.

The only thing standing between here and a public launch is the deploy
decision, plus one client answer.

## Blocked on the client

- **Early-bird deadline.** `event.earlyBird` is `false` and the site advertises
  no offer, which is correct until there is a date. If one exists, set
  `earlyBirdEnds` and flip the flag.

## Blocked on a decision, not on work

- **Deploy.** The repo is on GitHub and needs no environment variables — OG URLs
  fall back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. It is unclear whether a
  Vercel project is connected; there is no `.vercel/` in this checkout. If the
  GitHub integration is connected on the dashboard, every push has been
  deploying already.
