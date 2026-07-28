# Letting a non-technical collaborator change `csi-web`

Research date: 2026-07-27. Every factual claim below is cited to an official GitHub,
Vercel, Next.js, or vendor documentation URL. Claims I could **not** verify from official
docs are collected in [Unverified](#unverified--verify-before-relying-on-these) and flagged
inline as **[UNVERIFIED]**.

---

## TL;DR

1. **The owner's original plan — mint a scoped token of his own and put it in Vercel env
   vars — is the wrong mechanism twice over.** Not primarily because it is insecure (a
   fine-grained PAT scoped to one repo is a reasonable credential), but because **Vercel
   environment variables cannot deliver a credential to a person.** They are read by the
   build and by server functions ([Vercel](https://vercel.com/docs/environment-variables)).
   Getting one out to a laptop requires `vercel env pull` — a terminal — which is exactly
   the thing the collaborator will not do. It solves nothing and adds a leak path. Details
   in [Part 4](#part-4--vercel-verdict).

2. **There are two different problems here and they have two different answers.**
   "Change the copy on the conference page" and "make arbitrary code changes" are not the
   same request. Conflating them is why this looked hard.

3. **For content (the 90% case): a Git-backed CMS with account-free login.**
   Recommendation: **Keystatic**, fallback **Decap CMS + DecapBridge**. The collaborator
   logs into a web page with email/Google, edits in a rich-text UI, and the CMS's own
   GitHub credential writes the commit. No GitHub account, no terminal, no shared secret.
   [Part 1](#part-1--content-editing).

4. **For arbitrary code changes: the Claude Code GitHub Action, driven from the browser.**
   The collaborator types `@claude fix the thing` into a GitHub issue comment; the agent
   runs in the owner's CI and opens a PR. **This requires the collaborator to have a GitHub
   account with write access** — the action "can only be triggered by users with write
   access to the repository"
   ([anthropics/claude-code-action security docs](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)).
   No credential is shared. [Part 2](#part-2--arbitrary-code-changes-without-sharing-a-credential).

5. **Push back on the premise.** "Creating a GitHub account is too intimidating" is not
   true in the way the owner thinks. GitHub signup is a browser form with a **"Continue
   with Google"** button
   ([GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github)).
   That is ~90 seconds and no more intimidating than any SaaS signup. The genuinely hard
   part was never the account — it was `gh auth login`, `git clone`, `git push`. Those are
   avoidable. The account is not, if code changes are in scope.

6. **This decision gates the Wix blog port.** Moving the blog to MDX-in-Git removes the
   WYSIWYG editor the client has today. If no CMS ships alongside the port, the port is a
   **regression** for the client. See [Part 6](#part-6--the-wix-blog-and-the-wysiwyg-question).

---

## Constraints (as corrected)

| | |
|---|---|
| Repo | `github.com/GavanWilhite/csi-web` — **public**, owned by a personal account (not an org) |
| Stack | Next.js 16 App Router, deployed on Vercel |
| Collaborator | **May not have a GitHub account.** Would be intimidated by creating one. **Will not touch a terminal.** |
| Owner | Does not want to mint/share a credential from his own account. Willing to do one-time setup himself. |
| Goal | Collaborator can change the site; owner keeps a review gate |

**A grounding fact that changes the shape of the answer:** `csi-web` today has **no content
files**. All copy, speakers, tracks, sponsors, agenda and event facts live in TypeScript
modules — `lib/content.ts` (121 lines), `lib/event.ts` (48 lines), `lib/agenda.ts` (292
lines). **No CMS can edit TypeScript.** Every CMS option below has a hard prerequisite:
extract that content into schema'd Markdown/MDX/JSON/YAML files first. That is a real story,
not a footnote. See [Prerequisite](#prerequisite-the-content-is-not-in-files-yet).

---

## The one distinction that decides everything

| The collaborator wants to… | Right tool | Needs GitHub account? | Needs terminal? |
|---|---|---|---|
| Change copy, a speaker bio, an agenda slot, a photo, a blog post | **Git-backed CMS** | No | No |
| Change layout, add a section, fix a bug, restructure a page | **Claude Code GitHub Action** | **Yes** | No |
| Anything, from his own machine, with his own Claude Code | PAT / collaborator + `gh auth login` | Yes | **Yes** — out of scope |

There is **no mechanism** that gives a person with no GitHub account the ability to make
arbitrary code changes to a repo. Not a token, not a proxy, not a CMS. If arbitrary code
changes are genuinely required, an account is required. State that plainly to the owner
rather than searching for a way around it.

---

## Part 1 — Content editing

### Prerequisite: the content is not in files yet

Before any CMS is viable, `lib/content.ts`, `lib/event.ts` and `lib/agenda.ts` must become
data files with a schema — e.g. `content/speakers/*.md`, `content/agenda.json`,
`content/event.json`. The React components then read those files instead of importing
constants. Budget this as its own story. It is also *good* independently: it makes the
agenda and speaker roster diffable and lets an agent edit them safely.

### Comparison

| CMS | Editor needs a GitHub account? | Who holds the write credential | Owner-approval gate (PR/draft) | Git-backed? | Next.js App Router | Cost at this scale |
|---|---|---|---|---|---|---|
| **Keystatic Cloud** | **No** — "team members to edit content without needing a GitHub account" ([docs](https://keystatic.com/docs/cloud)) | Keystatic Cloud | Branches in GitHub mode; **PR behaviour in Cloud not documented [UNVERIFIED]** | Yes | First-class, official App Router guide ([docs](https://keystatic.com/docs/installation-next-js)) | **Free** to 3 users; Pro $10/mo + $5/user ([docs](https://keystatic.com/docs/cloud)) |
| **Keystatic GitHub mode** | **Yes**, with `write` access ([docs](https://keystatic.com/docs/github-mode)) | Editor's own GitHub OAuth, via a GitHub App you register | Branches, `branchPrefix` | Yes | Same | Free |
| **Decap CMS + DecapBridge** | **No** — email invite, Google or Microsoft ([DecapBridge](https://decapbridge.com/)) | DecapBridge service | **Yes — verified.** `publish_mode: editorial_workflow` opens a real PR per entry ([Decap](https://decapcms.org/docs/editorial-workflows/)) | Yes | Framework-agnostic static admin page | **Free** — 3 sites, 10 collaborators/site |
| **Decap CMS + GitHub backend** | **Yes** — "all users must have push access to your content repository" ([Decap](https://decapcms.org/docs/github-backend/)) | Editor's own GitHub OAuth | Yes, same as above | Yes | Same | Free |
| **Decap CMS + Git Gateway / Netlify Identity** | No | Netlify Git Gateway | Yes | Yes | Same | **Do not build new — Netlify Identity is deprecated** ([Netlify docs](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/), [Decap discussion #7419](https://github.com/decaporg/decap-cms/discussions/7419)) |
| **Sveltia CMS** | **Yes** — "relies on the Git backend for user authentication"; account-free login is on the roadmap ([docs](https://sveltiacms.app/en/docs)) | Editor's git account | Yes (editorial workflow mode) | Yes | Framework-agnostic | Free |
| **TinaCMS + TinaCloud** | **No** — "Editors can create a TinaCloud account with just their email" ([FAQ](https://tina.io/docs/introduction/faq)) | TinaCloud GitHub App | Yes — draft PR per branch, but **Editorial Workflow requires Team Plus, $41/mo** ([workflow docs](https://tina.io/docs/drafts/editorial-workflow), [pricing](https://tina.io/pricing)) | Yes | Officially supported ([docs](https://tina.io/docs/frameworks/next/app-router)) — but documented Vercel Data Cache caveats | Free tier = 2 users |
| **Sanity** | No — email login | n/a | Drafts/publish, **not PRs** | **No** — content lives in Sanity's dataset | Yes | Free: 20 seats but **only Administrator and Viewer roles**; Editor role needs Growth $15/seat/mo ([pricing](https://www.sanity.io/pricing)) |
| **Contentful** | No — email login | n/a | Drafts/scheduled publish, **not PRs** | **No** — hosted content platform | Yes ([Vercel integration](https://vercel.com/docs/integrations/cms/contentful)) | Free: 10 users, 2 roles, 1 space ([pricing](https://www.contentful.com/pricing/)) |
| **Vercel first-party CMS** | — | — | — | — | — | **Does not exist.** Vercel ships integrations + Content Link visual editing over third-party CMSs ([Vercel](https://vercel.com/docs/integrations/cms)) |

### Reading the table

- **Git-backed vs hosted is the fork in the road.** Keystatic / Decap / Sveltia / Tina keep
  content as files in `csi-web`. The repo stays the single source of truth, an agent can
  still edit content directly, and there is no vendor holding the client's words. Sanity
  and Contentful move content out of git into their cloud — the site then fetches or
  rebuilds from an API. That is a legitimate architecture, but it changes what "the repo"
  means and adds a second system for the owner to administer. **For this project, stay
  git-backed.**

- **Sanity's free tier is a trap for this use case.** 20 seats sounds generous, but the free
  plan only offers Administrator and Viewer roles — there is no Editor role without paying
  $15/seat/month ([pricing](https://www.sanity.io/pricing)). Giving a non-technical
  collaborator Administrator on the content backend is the opposite of a review gate.

- **TinaCMS is the most complete product and the worst fit on price.** Email login is
  verified, App Router is supported, but the PR-approval gate — the thing the owner cares
  about — starts at $41/month. Free tier is 2 users with commit-straight-to-main.

- **Decap is the only option where the approval gate is verified in official docs.**
  `publish_mode: editorial_workflow` commits to `cms/<collection>/<slug>` and opens a pull
  request; the owner publishes by merging it
  ([Decap](https://decapcms.org/docs/editorial-workflows/)). That is exactly the requested
  shape. The catch: Decap's own "choosing a backend" page still points at Netlify Identity
  ([Decap](https://decapcms.org/docs/choosing-a-backend/)) with no deprecation notice, even
  though Netlify has deprecated it. Decap's docs are behind reality; use DecapBridge instead.

- **Keystatic is the lightest integration.** Admin UI lives at `/keystatic` inside the same
  Next.js app, config is a TypeScript file with a real schema, three files plus one API
  route ([docs](https://keystatic.com/docs/installation-next-js)). Nothing rewires the dev
  server (contrast Tina, which wraps `next dev`).

---

## Part 2 — Arbitrary code changes without sharing a credential

### 2a. Claude Code GitHub Action — **the answer for code**

**What it is.** An official Anthropic GitHub Action. A `@claude` mention in an issue or PR
comment triggers Claude Code inside the owner's GitHub Actions runner; it reads the repo,
makes changes, and opens a pull request
([Claude Code docs](https://code.claude.com/docs/en/github-actions)).

**Setup (owner, once).** Run `/install-github-app` in Claude Code. It installs the Claude
GitHub App on the repo, adds the workflow file, and adds the `ANTHROPIC_API_KEY` repository
secret. Manual path: install [github.com/apps/claude](https://github.com/apps/claude), add
the secret, copy
[`examples/claude.yml`](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml)
into `.github/workflows/`. Repository admin required. The App requests **Contents: Read &
write, Issues: Read & write, Pull requests: Read & write**
([docs](https://code.claude.com/docs/en/github-actions)).

**Does the owner share a secret?** **No.** The Anthropic API key lives in GitHub Actions
secrets, never leaves CI. The GitHub write credential is the App's own installation token,
minted per-run and **expiring after 1 hour**
([GitHub](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)).

**Whose name is on the commits?** The Claude GitHub App / bot. The triggering comment is
attributed to the collaborator, so the PR shows who asked.

**How the owner revokes.** Uninstall the App from repo settings, remove the collaborator, or
delete the workflow file. Instant, and does not touch anything else.

**The hard constraint.** "The action can only be triggered by users with write access to the
repository"
([security docs](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)).
So the collaborator needs a GitHub account and a collaborator invite. **That is the floor.**
On a personal-account repo there is exactly one collaborator level: "Collaborators on a
personal repository can pull (read) the contents of the repository and push (write) changes"
— no read-only or triage tier
([GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository)).

**Security notes worth heeding.** On a public repo, do not set `allowed_bots: '*'` — the
security doc warns that any GitHub App created by anyone could then invoke the action with a
prompt it controls. Also treat issue text from outsiders as untrusted input; hidden markdown
is a documented prompt-injection vector
([security docs](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)).

**Cost.** GitHub Actions minutes + Anthropic API tokens per invocation
([docs](https://code.claude.com/docs/en/github-actions)).

### 2b. GitHub App (custom) — right primitive, unnecessary work here

A GitHub App is genuinely the canonical delegated-access primitive: installed on a personal
account, granted access to **specific repositories**, authenticating with **1-hour
installation tokens** that can be further narrowed to a subset of repos and permissions
([GitHub](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation),
[About GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps)).
No long-lived shared secret, clean bot attribution, revoke by uninstalling.

**But:** registering one is a ~22-step form requiring a name and homepage URL (webhooks can
be deselected)
([GitHub](https://docs.github.com/en/apps/creating-github-apps/setting-up-a-github-app/registering-a-github-app)),
and then *you have to write the code that uses it*. For one collaborator on one repo this is
over-engineering — **and the Claude GitHub App already is this App**, built and hosted.
Build a custom App only if you need branded bot commits or you're routing through Bedrock/
Vertex, which is the exact case Anthropic's docs call out
([docs](https://code.claude.com/docs/en/github-actions)).

### 2c. Other CI triggers — mostly dead ends

- **`workflow_dispatch`**: "Write access to the repository is required to perform these
  steps" ([GitHub](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)).
  Same floor as above, worse UX (no free-text instruction).
- **Issue / issue comment on a public repo**: anyone with a GitHub account can file one
  without write access — this is the only trigger a non-collaborator can pull. But the
  Claude action's own write-access check will reject them, and removing that check on a
  **public** repo means anyone on the internet can run an agent with write permissions in
  your CI. Do not do this.

### 2d. Self-hosted proxy service — **refuted, don't build it**

The instinct in the brief is correct. A service holding the GitHub credential and accepting
calls from the collaborator's agent does not remove the trust boundary, it moves it: whoever
can call the proxy can write to the repo, so **the proxy needs its own authentication** — and
now you are minting and shipping *that* credential to a non-technical person via a terminal,
which is the original problem plus a server to run, patch, and monitor. It also loses
everything GitHub gives you for free: audit trail, 1-hour token expiry, secret scanning, and
a review gate. The Claude Code GitHub Action *is* the well-built version of this proxy, and
it already exists.

### 2e. Fork + pull request — correct in general, dead on these constraints

For the record, since it was the leading candidate before the correction:

- Forking a public repo requires **no grant from the owner at all**; anyone can fork any
  public repository ([GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks)).
- Attribution is perfect, the owner keeps a merge gate, zero credentials change hands.
- **It requires a GitHub account and a git workflow.** Dead here.

Gotchas worth knowing if a *technical* contributor ever uses this path:

- Secrets are withheld from fork PRs: "With the exception of `GITHUB_TOKEN`, secrets are not
  passed to the runner when a workflow is triggered from a forked repository"
  ([GitHub](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)).
  So the Claude action cannot run on a fork PR — no `ANTHROPIC_API_KEY`.
- Workflow runs from fork PRs "may require manual approval from a maintainer with write
  access" ([GitHub](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/approve-runs-from-forks)).
- Vercel will not auto-deploy a fork PR: "If you receive a pull request from a fork of your
  repository, Vercel will require authorization from you or a team member to deploy the pull
  request. This behavior protects you from leaking sensitive project information such as
  environment variables and the OIDC Token"
  ([Vercel](https://vercel.com/docs/git/vercel-for-github)). So no preview URL until the
  owner clicks approve — which blunts the review loop.
- Forks of public repos are public and cannot be made private
  ([GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks)).

---

## Part 3 — Credential mechanisms (the fallback tier, and the owner's original idea)

Kept because the owner asked, and because one of these is the right answer if he ever wants
the collaborator running Claude Code locally.

### 3a. Fine-grained personal access token

- **Restrictable to one repo:** yes. Under "Repository access", choose **Only select
  repositories** and pick `csi-web`
  ([GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)).
- **Minimum permission set for clone / commit / push:**
  - **Contents — Read and write.** "Required for git clone/push operations"
    ([GitHub](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens)).
  - **Metadata — Read.** Listed as a separate read-only permission; GitHub's REST permissions
    reference states it is "not automatically granted" and must be explicitly selected.
    **[UNVERIFIED]** — in the live UI Metadata is normally pre-selected and locked once any
    other repository permission is chosen; I could not confirm that behaviour from docs.
  - **Pull requests — Read and write**, *only* if the agent should open PRs via the API or
    `gh`. Not needed for plain push.
  - Nothing else. Not Workflows, not Actions, not Administration.
- **Expiry:** an integer between **1 and 366 days**, or none. "Infinite lifetimes are allowed
  but may be blocked by a maximum lifetime policy set by your organization or enterprise
  owner" — there is no org here, so an infinite token *is* allowed. **Don't.** Set 30 days
  ([GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)).
- **Individually revocable:** yes — Delete next to the token in settings
  ([same](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)).
- **Blast radius:** limited to the selected repo and selected permissions, but it authenticates
  **as the owner**.

### 3b. Deploy key

- **Per-repository, and only one repository:** "Deploy keys only grant access to a single
  repository" and "you can't reuse a deploy key for multiple repositories"
  ([GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)).
  Genuinely the tightest blast radius available — it literally cannot reach another repo.
- **Write access is grantable**, and this is the sharp edge: write permission on a deploy key
  confers rights "equivalent to an organization member with admin access, or a collaborator on
  a personal repository" ([same](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)).
  Within that one repo it can force-push and rewrite history.
- **Can it open PRs?** It authenticates git over SSH only. GitHub's docs do not address API
  access; a deploy key is not an API credential, so `gh pr create` will not work with it.
  **[UNVERIFIED]** — stated as an inference from what the docs do and don't cover.
- **Downsides the docs name explicitly:** "usually not protected by a passphrase", "don't have
  an expiry date", and they keep working after the person who created them is removed
  ([same](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)).
- Requires the collaborator to place a private key file on disk and configure SSH. Terminal.
  Out of scope.

### 3c. Collaborator invite + `gh auth login`

The step-by-step the brief asked for, because the "too hard for him" premise deserves a
concrete answer:

**Accepting the invite (browser, ~30 seconds):** owner goes to repo → Settings → Collaborators
→ Add people → types the username → confirm. The invitee "will receive an email inviting them
to the repository. Once they accept your invitation, they will have collaborator access"
([GitHub](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)).
Click a link in an email. That is the whole thing.

**`gh auth login` (device flow, ~6 prompts):** the CLI's default is a browser-based flow; it
prints a one-time code, the user opens `https://github.com/login/device`, pastes the code, and
clicks Authorize; the CLI polls until authorized and stores the token in the OS credential
store ([gh manual](https://cli.github.com/manual/gh_auth_login),
[GitHub device flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)).
The code expires after 15 minutes. **The user never sees, types, or understands a token.**

**Honest verdict on the premise:** conceptually this is easy — copy a code, paste it in a
browser. The hard parts are the parts nobody counts: installing `gh`, knowing what a terminal
is, `cd`-ing into a directory, and recovering when something goes wrong with no mental model.
So the owner is right that the CLI is out of reach, and wrong that the *account* is. Signing
up is a browser form with a **Continue with Google** option, no payment
([GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github)).

### Mechanism comparison

| Mechanism | Owner shares a secret? | Blast radius | Commits carry | Revocation | Steps for a non-technical user | Suitable here? |
|---|---|---|---|---|---|---|
| **Git-backed CMS (Keystatic / Decap+Bridge)** | No | Content files only | CMS's GitHub App (Tina can co-author to the editor's email — [FAQ](https://tina.io/docs/introduction/faq)) | Remove user in CMS dashboard | Click email link, set password, edit in a web UI | ✅ **Yes — content** |
| **Claude Code GitHub Action** | No | One repo, 1-hour token, Contents/Issues/PRs | Claude bot; triggering comment attributed to the person | Uninstall App or remove collaborator | Make account → accept invite → type `@claude …` in a browser | ✅ **Yes — code** |
| **Custom GitHub App** | No | One repo, 1-hour token | Your bot | Uninstall | Same as above | ⚠️ Over-engineered |
| **Fork + PR** | No | Their fork only | Collaborator's account — cleanest of all | Ignore/close their PRs | Account + git workflow | ❌ Needs terminal |
| **Fine-grained PAT (owner's)** | **Yes** | One repo, chosen permissions — but acts **as the owner** | Whatever the agent's local git config says; push authenticates as owner | Delete token | Account not needed, but terminal is | ⚠️ Fallback only |
| **Deploy key (write)** | **Yes** | One repo, but admin-equivalent on it; **never expires** | Local git config; push attributed to the key | Delete key | Terminal + SSH config | ❌ |
| **Collaborator + `gh auth login`** | No | Full push on the repo | Collaborator's account | Remove collaborator | Account + terminal | ❌ Terminal |
| **Token in Vercel env vars** | **Yes** | See Part 4 | n/a — doesn't reach the person | Delete var + rotate token | Terminal anyway (`vercel env pull`) | ❌ **Doesn't work** |
| **Self-hosted proxy** | Relocates it | Whatever the proxy allows | Proxy's identity | Shut it down | Terminal + a new credential | ❌ Don't build |

---

## Part 4 — Vercel verdict

**Is storing a GitHub write token in Vercel env vars appropriate here? No — and not for the
reason the owner probably expects.**

**What Vercel env vars actually are.** Key-value pairs "configured outside your source code",
"encrypted at rest and visible to any user that has access to the project". Your source code
reads them "during the Build Step or during Function execution". Vercel explicitly says "It is
safe to use both non-sensitive and sensitive data, such as tokens"
([Vercel](https://vercel.com/docs/environment-variables)).

So as a *storage* mechanism for a token your *deployed app* uses, they are fine and
purpose-built. That is not what is being asked.

**Failure mode 1 — it does not solve the problem.** Vercel env vars are consumed by the build
and by server functions. There is no path from a Vercel env var to a credential on a
collaborator's laptop except `vercel env pull`, which "creates a `.env` file in your project's
current directory" ([Vercel](https://vercel.com/docs/environment-variables)) — a CLI, in a
checked-out repo, in a terminal. The collaborator cannot do any of that. The plan is a no-op.

**Failure mode 2 — `NEXT_PUBLIC_` is one typo away from total exposure.** Next.js: "In order
to make the value of an environment variable accessible in the browser, Next.js can 'inline' a
value, at build time, into the js bundle that is delivered to the client... To tell it to do
this, you just have to prefix the variable with `NEXT_PUBLIC_`"
([Next.js](https://nextjs.org/docs/app/guides/environment-variables)). Non-prefixed variables
"are only available in the Node.js environment" — server-only. Vercel adds these prefixes
automatically for framework system variables on production and preview builds
([Vercel](https://vercel.com/docs/environment-variables/framework-environment-variables)).
Name a GitHub write token `NEXT_PUBLIC_GITHUB_TOKEN` and it is compiled into JavaScript served
to every visitor of a public conference website. There is no undo — the value is frozen into
that build's bundle.

**Failure mode 3 — the public repo makes recovery from a mistake harder, not easier.** The
token now exists in a second place that an agent working in the repo might read and helpfully
"add to `.env` so it works locally", and `.env` files are one bad `.gitignore` edit from being
committed to a public repository.

**Verdict:** a fine-grained PAT scoped to `csi-web` with Contents:RW and a 30-day expiry is a
*defensible credential*. Putting it in Vercel env vars is a *wrong delivery mechanism*. If a
token is ever needed, it goes into the collaborator's OS keychain via a CLI login — which
brings us back to why the CMS/Action answer is right.

**Does Vercel offer deploy access without GitHub write access?** Yes, via team RBAC. A
**Contributor** assigned **Project Developer** on just this project can create deployments and
manage preview/development env vars without any GitHub permission
([Vercel](https://vercel.com/docs/rbac/access-roles)). Two caveats:
- RBAC only exists on Vercel **teams**, and the finer roles are Pro/Enterprise features.
- "To import or connect a GitHub repository owned by a personal account, you must be the
  repository Owner. A Collaborator on a personal repository cannot create new Vercel projects
  from that repository" ([Vercel](https://vercel.com/docs/git/vercel-for-github)).

This is useful if you want the collaborator to *see* preview deploys and comment on them.
It does not let him change anything, so it is a complement to the CMS, not an alternative.

---

## Part 5 — Secret hygiene on a public repo

If a token is committed to `csi-web` anyway, here is what actually happens:

- **Secret scanning is free and automatic on public repositories**
  ([GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)).
- **GitHub auto-revokes its own leaked tokens:** "GitHub automatically revokes GitHub personal
  access tokens (PATs) leaked in public repositories"
  ([GitHub](https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret)).
  For third-party partner patterns, "GitHub automatically reports the leak to the secret
  provider, who may immediately revoke the secret" ([same](https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret)).
- **Push protection *for users* is enabled by default** and "stops you from pushing secrets to
  public repositories on GitHub". Push protection *for repositories* is **disabled by default**
  and must be turned on. Anyone with write access can bypass a block by stating a reason
  ([GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection)).
  **Action item: turn on repository-level push protection for `csi-web`.**
- **How fast do leaked secrets get harvested?** Not covered by GitHub docs. Third-party
  sources: Palo Alto Unit 42 reports threat actors harvesting credentials from public repos
  within ~5 minutes of exposure; a widely-cited honeypot experiment recorded a first
  unauthorized login **34 minutes** after exposing SSH credentials in a public repo
  ([Comparitech](https://www.comparitech.com/blog/information-security/github-honeypot/)).
  GitGuardian's 2026 report counts ~29M new hardcoded secrets added to public GitHub in 2025
  ([Snyk summary](https://snyk.io/articles/state-of-secrets/)). **These are press/vendor
  sources, not official docs — treat the numbers as order-of-magnitude, not precise.**

The practical read: GitHub's auto-revocation is a strong safety net *for GitHub's own tokens*.
It is not a substitute for not putting them there.

---

## Part 6 — The Wix blog and the WYSIWYG question

**Direct answer: porting the blog off Wix into MDX-in-Git is viable only if a CMS ships as part
of the port.**

Today the client has a WYSIWYG editor. MDX in a git repo gives them a text file they cannot
reach without a GitHub account and an editor. On its own that is a straight downgrade in
capability, delivered as an "upgrade". If the port lands without a CMS, expect the client to
either stop publishing or ask to go back.

**But this is a solved problem, not a blocker.** Every git-backed CMS in Part 1 provides a
rich-text editing surface over Markdown/MDX:

- **Keystatic** — schema'd collections with a document field; blog posts get a proper editor
  and typed frontmatter (author, date, tags) rather than free-form YAML the client can break.
- **Decap CMS** — markdown widget with a rich-text toggle, plus `editorial_workflow` so a post
  arrives as a PR the owner can read before it goes live
  ([Decap](https://decapcms.org/docs/editorial-workflows/)).

**So the sequencing matters:** do not port the blog first and figure out editing later.
Decide the CMS, extract the content into files with a schema that the CMS and the components
share, then port. The CMS is not an optional phase-two nicety — it is the thing that makes
the port not-a-regression.

---

## Part 7 — Attribution and audit

| Path | Commit author | Can the owner tell it apart from his own work? |
|---|---|---|
| Fork + PR | Collaborator's GitHub account | **Yes, perfectly** |
| Collaborator + gh CLI | Collaborator's account | **Yes** |
| Claude Code GitHub Action | Claude bot; PR links the triggering comment and its author | **Yes** |
| Keystatic / Decap + hosted auth | The CMS's GitHub App | Partly — the app is distinguishable from the owner, but not one editor from another in git history. The CMS's own user list is the record. |
| TinaCloud | "the author on Git commits is the TinaCloud GitHub app"; optional co-authoring attributes the editor's email ([FAQ](https://tina.io/docs/introduction/faq)) | **Yes, if co-authoring is enabled** |
| Owner's PAT | Whatever the agent's local `user.name` says; the *push* authenticates as the owner | **No** — indistinguishable in practice |
| Deploy key | Local git config; push attributed to the key | Partly |

**The personal-account limitation the brief asked about is real.** A personal account has a
**security log**, not an organization audit log: it records "actions you perform", retains
**90 days**, and is oriented at your own account activity rather than everything happening in
your repositories
([GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/reviewing-your-security-log)).
There is no org-style audit log of collaborator actions on a personal repo.

**Consequence:** on a personal account, **git history and PR history are your audit log.**
That is a further argument against a shared PAT (which makes every action look like the
owner's) and for the CMS/Action paths (which put a distinct identity on every change).

---

## Recommendation

### Primary — do both of these

**Track A — content: add a Git-backed CMS. Pick Keystatic.**

Why Keystatic over the alternatives: it is free at this scale, editors can log in via
Keystatic Cloud **without a GitHub account** ([docs](https://keystatic.com/docs/cloud)), it has
a first-class Next.js **App Router** integration that lives inside the app you already have
([docs](https://keystatic.com/docs/installation-next-js)), and its schema is a TypeScript file
— which means the same file that defines the CMS also documents the content model for whoever
(or whatever) edits the repo next. Nothing rewires the dev server.

**Fallback — Decap CMS + DecapBridge**, if a hard PR-approval gate is a requirement. It is the
only combination where the owner-approves-by-merging workflow is verified in official docs
(`publish_mode: editorial_workflow` →
[Decap](https://decapcms.org/docs/editorial-workflows/)), it is free
([DecapBridge](https://decapbridge.com/): 3 sites, 10 collaborators), and being a
framework-agnostic static admin page it survives any future rebuild of the site.

**Do not** use Decap's Git Gateway/Netlify Identity path — Netlify Identity is deprecated.
**Do not** use Sanity's free tier for this (no Editor role without paying). **Do not** use
TinaCMS unless you'll pay $41/mo for the approval gate.

**Track B — code: install the Claude Code GitHub Action, and have the collaborator make a
GitHub account.**

This is the only mechanism that gives arbitrary code changes with zero shared credentials, a
browser-only UX, and a merge gate. The account is unavoidable and is genuinely easy — Continue
with Google.

### Rejected, with reasons

| Option | Why not |
|---|---|
| Owner's PAT in Vercel env vars | Doesn't deliver the credential to a person at all; one `NEXT_PUBLIC_` typo from public exposure on a public site |
| Owner's PAT handed over directly | Requires a terminal anyway; makes every action look like the owner's in the only audit trail a personal account has |
| Deploy key | Terminal + SSH; never expires; admin-equivalent within the repo |
| Fork + PR | Requires a git workflow. Correct answer for a *technical* contributor |
| Custom GitHub App | The Claude GitHub App already is one |
| Self-hosted proxy | Moves the trust boundary, adds a server, needs its own credential |
| Sanity / Contentful | Not git-backed; free tiers don't give a safe editor role (Sanity) or add a second content system to administer |

---

## Click-by-click setup

### Owner — one-time (≈45 minutes, plus the content-extraction story)

**Step 0 — prerequisite (a dev/agent task, not a click-through).** Extract `lib/content.ts`,
`lib/event.ts`, `lib/agenda.ts` into content files — e.g. `content/speakers/*.md`,
`content/agenda.json`, `content/event.json` — and change the components to read from them.
Nothing below works until this is done.

**Step 1 — install Keystatic.**
1. In `csi-web`: `pnpm add @keystatic/core @keystatic/next @markdoc/markdoc`
2. Create `keystatic.config.ts` at the repo root defining collections for speakers, agenda
   sessions, sponsors and blog posts, matching the files from Step 0.
3. Add the four Admin UI files and the API route exactly as in
   [Keystatic's Next.js guide](https://keystatic.com/docs/installation-next-js).
4. Deploy. Confirm `https://<your-site>/keystatic` loads.

**Step 2 — connect Keystatic Cloud.**
1. Sign in at [keystatic.com](https://keystatic.com) with your GitHub account.
2. Create a project and connect it to `GavanWilhite/csi-web`.
3. Set `storage: { kind: 'cloud' }` and the cloud project name in `keystatic.config.ts`. Deploy.
4. Invite the collaborator by email from the Keystatic Cloud dashboard. Free plan covers 3 users.

**Step 3 — turn on push protection** (2 clicks, do it regardless).
GitHub → `csi-web` → **Settings** → **Code security** → enable **Push protection** for the
repository. (User-level push protection is already on by default, but repository-level is not
— [GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection).)

**Step 4 — install the Claude Code GitHub Action** (only if code changes are in scope).
1. In Claude Code on your machine, run `/install-github-app` and follow the prompts. It installs
   [github.com/apps/claude](https://github.com/apps/claude), adds the workflow, and sets the
   `ANTHROPIC_API_KEY` repository secret. You must be repo admin.
2. When it asks which repositories, choose **Only select repositories → csi-web**.
3. Do **not** set `allowed_bots: '*'` in the workflow. This is a public repo.

**Step 5 — invite the collaborator on GitHub** (only if you did Step 4).
GitHub → `csi-web` → **Settings** → **Collaborators** → **Add people** → their username →
confirm. Note: on a personal repo this is full push access — there is no read-only tier
([GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository)).
Add a branch protection rule on `main` requiring a pull request if the UI offers it — see
[Unverified](#unverified--verify-before-relying-on-these).

---

### Forward this to the collaborator verbatim

> **Editing the website**
>
> **A. Changing words, photos, speakers, agenda or blog posts**
>
> 1. Check your email for an invitation from Keystatic. Click the link and set a password.
> 2. Go to **https://<the-site>/keystatic** and sign in.
> 3. Pick what you want to change from the list on the left — Speakers, Agenda, Sponsors, Blog.
> 4. Edit it like a document. Add photos with the upload button.
> 5. Click **Save**. That's it — the site updates itself in a minute or two.
>
> There is nothing to install and nothing to download. If you close the tab mid-edit, just come
> back to the same address.
>
> **B. Changing how the site looks or works (layout, new sections, fixing something broken)**
>
> One-time setup, about two minutes:
>
> 1. Go to **https://github.com/signup**.
> 2. Click **Continue with Google** and use your normal email. (Or use email + password if you
>    prefer.)
> 3. Pick any username. Confirm the code GitHub emails you.
> 4. You'll get a second email: *"Gavan invited you to collaborate."* Click **View invitation**,
>    then **Accept invitation**.
>
> Then, whenever you want a change:
>
> 1. Go to **https://github.com/GavanWilhite/csi-web/issues**
> 2. Click the green **New issue** button.
> 3. Write what you want, starting with `@claude`. For example:
>    > `@claude The speaker photos on the conference page are too small on my phone. Can you make them bigger and stack them in one column on narrow screens?`
> 4. Click **Create**.
> 5. Wait a few minutes. An AI assistant will read the site's code, make the change, and post a
>    link back to the issue showing exactly what it changed. Gavan reviews it and clicks merge.
>    You'll see the change go live after he does.
>
> You never need to install anything, use a terminal, or handle any passwords or keys beyond
> your own GitHub login. If something doesn't work, reply in the same issue and say so — the
> assistant reads replies.

---

## Unverified — verify before relying on these

1. **Keystatic Cloud's exact login mechanism.** Their docs state team members can "edit content
   without needing a GitHub account" ([docs](https://keystatic.com/docs/cloud)) but do not
   document which identity providers are offered (email link? Google?). **Confirm by creating a
   free Keystatic Cloud project and sending yourself a test invite before committing to it.**
2. **Whether Keystatic Cloud can gate changes behind a pull request.** GitHub mode documents
   branch creation and `branchPrefix` ([docs](https://keystatic.com/docs/github-mode)); Cloud's
   PR behaviour is not documented. If a hard approval gate is required, use the Decap +
   DecapBridge fallback, where it is verified.
3. **Whether DecapBridge supports `publish_mode: editorial_workflow`.** Decap's editorial
   workflow is verified; DecapBridge's homepage does not mention PR support. Confirm before
   choosing it *for* the approval gate.
4. **Whether the Metadata permission is auto-selected in the fine-grained PAT UI.** GitHub's
   REST reference says Metadata is "not automatically granted"; common experience is that it is
   pre-selected and locked. Immaterial in practice — just tick it.
5. **Whether branch protection requiring a PR is available on a public repo owned by a personal
   account on GitHub Free.** GitHub's rulesets page describes rulesets as being for "customers
   on GitHub Team and GitHub Enterprise plans"
   ([GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)),
   and the protected-branches page only confirms branch *restrictions* for Free
   **organizations** ([GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)).
   **Check `csi-web` → Settings → Branches / Rules directly.** If unavailable, the review gate
   depends on the collaborator's cooperation plus `git revert`, which is acceptable for one
   trusted person but should be known.
6. **Deploy keys and the API.** Stated inference, not a doc quote — GitHub's deploy-keys page
   does not address API/PR capability at all.
7. **Secret-harvesting timings** (5 minutes / 34 minutes) are from vendor and press sources, not
   GitHub documentation.
8. **Claude Code's non-CLI surfaces** (web app, desktop) are deliberately out of scope here —
   a separate agent is covering them. If Claude Code's web surface can drive a repo with a
   browser-only login, it may beat Track B and should be checked against this document.

---

## Sources

GitHub — [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) ·
[Permissions required for fine-grained PATs](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens) ·
[Managing deploy keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys) ·
[Inviting collaborators to a personal repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository) ·
[Permission levels for a personal account repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository) ·
[About forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) ·
[About creating GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps) ·
[Registering a GitHub App](https://docs.github.com/en/apps/creating-github-apps/setting-up-a-github-app/registering-a-github-app) ·
[Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation) ·
[Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) ·
[Manually run a workflow](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow) ·
[Approve runs from forks](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/approve-runs-from-forks) ·
[GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token) ·
[About secret scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning) ·
[About push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection) ·
[Remediating a leaked secret](https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret) ·
[Reviewing your security log](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/reviewing-your-security-log) ·
[About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) ·
[About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) ·
[Creating an account on GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) ·
[Authorizing OAuth apps (device flow)](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)

GitHub CLI — [gh auth login](https://cli.github.com/manual/gh_auth_login)

Anthropic — [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) ·
[claude-code-action security docs](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)

Vercel — [Environment variables](https://vercel.com/docs/environment-variables) ·
[Framework environment variables](https://vercel.com/docs/environment-variables/framework-environment-variables) ·
[Deploying GitHub projects with Vercel](https://vercel.com/docs/git/vercel-for-github) ·
[Access roles](https://vercel.com/docs/rbac/access-roles) ·
[CMS integrations](https://vercel.com/docs/integrations/cms)

Next.js — [Environment variables](https://nextjs.org/docs/app/guides/environment-variables)

CMS vendors — [Keystatic Cloud](https://keystatic.com/docs/cloud) ·
[Keystatic GitHub mode](https://keystatic.com/docs/github-mode) ·
[Keystatic + Next.js](https://keystatic.com/docs/installation-next-js) ·
[Decap backends](https://decapcms.org/docs/backends-overview/) ·
[Decap GitHub backend](https://decapcms.org/docs/github-backend/) ·
[Decap editorial workflow](https://decapcms.org/docs/editorial-workflows/) ·
[DecapBridge](https://decapbridge.com/) ·
[Sveltia CMS docs](https://sveltiacms.app/en/docs) ·
[TinaCMS FAQ](https://tina.io/docs/introduction/faq) ·
[Tina editorial workflow](https://tina.io/docs/drafts/editorial-workflow) ·
[Tina pricing](https://tina.io/pricing) ·
[Tina + Next App Router](https://tina.io/docs/frameworks/next/app-router) ·
[Sanity pricing](https://www.sanity.io/pricing) ·
[Contentful pricing](https://www.contentful.com/pricing/)

Third-party (non-authoritative, flagged in text) —
[Netlify Git Gateway](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/) ·
[Decap discussion #7419](https://github.com/decaporg/decap-cms/discussions/7419) ·
[Comparitech GitHub honeypot](https://www.comparitech.com/blog/information-security/github-honeypot/) ·
[Snyk / GitGuardian state of secrets](https://snyk.io/articles/state-of-secrets/)
