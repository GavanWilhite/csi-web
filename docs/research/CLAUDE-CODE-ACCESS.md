# Claude Code Access for Non-Technical Collaborators

## Direct Answer: The Best Path

**GitHub Actions with the Claude Code Action is the lowest-friction way for a non-technical person with no GitHub account to make AI-assisted changes to your repo.**

The collaborator needs:
- Nothing to install
- No GitHub account (can remain non-technical)
- No personal access tokens or authentication
- Only: ability to open your repo on GitHub and write text in an issue

The collaborator's workflow:
1. Open a GitHub issue in your repository
2. Write what they want changed (e.g., "Fix the typo on line 42" or "Add a new FAQ entry about X")
3. Type `@claude` and describe the change in a comment
4. Claude Code runs in GitHub Actions, creates a pull request with the changes
5. You review the PR and merge it

**Setup effort (owner):** ~5 minutes. One-time.

**Setup effort (collaborator):** None.

---

## All Access Methods Compared

### 1. GitHub Actions (✅ Recommended)

**What it is:** Claude Code runs automatically in your CI/CD pipeline, triggered by issue/PR comments.

**Repo owner setup:**
1. Run `/install-github-app` in any Claude Code session (or manually install at https://github.com/apps/claude)
2. Add your Claude API key to GitHub repository secrets as `ANTHROPIC_API_KEY`
3. Copy a workflow file into `.github/workflows/` (template provided by the `/install-github-app` command)
4. That's it—Claude Code is now available to anyone with write access to issues

**Collaborator setup:**
- None. They just need to be able to access your GitHub repo and comment on issues.
- They don't need a GitHub account if you make the repo public and they comment anonymously (though GitHub requires an account to comment)
- **The only real requirement: GitHub account access.** This is unavoidable for any GitHub-based workflow.

**Collaborator experience:**
```
Issue: "Add testimonials to homepage"
Comment: @claude please add three testimonials to the testimonials section
         based on the feedback we received. Make them about 2-3 sentences each.
```
Claude creates a PR with the changes. You review and merge.

**GitHub App requirement:** Must be installed on your repository. Only the owner needs to do this.

**Key constraints:**
- Collaborator must have a GitHub account (this is GitHub's requirement, not Claude Code's)
- Collaborator should have write access to your repo (or you whitelist them per action)
- Claude Code runs on GitHub's runners, consuming your GitHub Actions minutes (usually free tier is sufficient)

**Documentation:** https://code.claude.com/docs/en/github-actions

---

### 2. Claude Code on the Web (Cloud Sessions)

**What it is:** Claude Code runs in Anthropic's managed cloud sandbox at claude.ai/code. The repo owner starts a session and the collaborator can view/interact with it.

**Repo owner setup:**
1. Install Claude GitHub App (same as GitHub Actions)
2. Sign in to claude.ai/code with your Claude account
3. Authenticate with GitHub (via GitHub App or `/web-setup`)
4. Create a cloud session pointing to your repo
5. (Optional) Enable session sharing with your collaborator

**Collaborator setup:**
- Must have a Claude account (Pro, Max, or Team/Enterprise)
- Must sign in to claude.ai
- No additional permissions or GitHub account needed *if* the owner shares the session with them

**Collaborator experience:**
- Owner starts a cloud session: "Write a new FAQ section based on recent support tickets"
- Owner shares the session link
- Collaborator can view Claude's progress in real time (read-only or can contribute to the conversation, depending on share settings)
- Cannot directly edit or make commits themselves—only the session owner can approve changes

**Key constraints:**
- Collaborator must pay for a Claude subscription (Pro $20/mo minimum)
- Collaborator cannot independently start their own cloud sessions without a GitHub account
- Session sharing is read-only or conversation-only; the collaborator cannot control the agent or approve edits
- Owner does the work; collaborator observes and advises

**Documentation:** https://code.claude.com/docs/en/claude-code-on-the-web

**Status:** Research preview (Pro, Max, Team, Enterprise only)

---

### 3. Claude Desktop App + Remote Control

**What it is:** You run Claude Code locally on your machine, and the collaborator monitors from their browser (no local setup needed).

**Repo owner setup:**
1. Install Claude Desktop app
2. Start a Claude Code session in the Desktop app
3. Run `/remote-control` command
4. Share the Remote Control URL with your collaborator

**Collaborator setup:**
- None—just needs the remote URL
- Can view your session progress from any browser
- Cannot interact or steer the agent

**Collaborator experience:**
- Passive viewing only
- Can watch you (or another agent) work on their behalf
- Cannot ask Claude questions or make decisions mid-session

**Key constraints:**
- Requires your machine to stay running (or use a scheduled routine instead)
- Collaborator has zero control; purely observational
- Your GitHub credentials are on your machine, not theirs

**Documentation:** https://code.claude.com/docs/en/remote-control

---

### 4. Claude Code Terminal (CLI)

**Ruled out:** Requires terminal access, which your collaborator will not use.

**You could run this yourself** and share results via PR or direct file transfer, but they cannot independently operate it.

---

## Detailed Comparison Table

| Feature | GitHub Actions | Cloud Sessions | Desktop + Remote Control | Terminal CLI |
|---------|---|---|---|---|
| **Collaborator needs GitHub account** | Yes¹ | No² | No | N/A |
| **Collaborator needs Claude account** | No | Yes | No | N/A |
| **Collaborator needs to install anything** | No | No (browser only) | No (browser only) | No |
| **Collaborator can independently trigger work** | Yes | No (owner triggers) | No (owner triggers) | No |
| **Collaborator can steer/interact** | Via comments | Yes (in shared session) | No (read-only) | No |
| **Blast radius control (requires approval)** | Via PR review | Via session sharing | Via session owner | N/A |
| **Owner setup time** | ~5 min | ~10 min | ~2 min | N/A |
| **Works if you're offline** | Yes (runs in CI) | Partially (session pauses) | No (your machine must run) | N/A |
| **Cost to collaborator** | $0 | $20+/mo (Claude subscription) | $0 | N/A |

¹ GitHub requires an account to comment on public issues, though you could make the issue private and add the collaborator as a contributor  
² But they must have write access to your repo to trigger the action, which GitHub also requires an account for

---

## Identity & Credentials: What Each Path Requires

### GitHub Actions
- **Collaborator identity:** GitHub account (username, no special permissions needed)
- **Your credentials:** Claude API key in repo secrets (never exposed to collaborator)
- **GitHub App:** Installed once by you on your repository
- **Result:** Collaborator has zero access to GitHub credentials or API keys

### Cloud Sessions (Shared)
- **Collaborator identity:** Claude account (email + password)
- **Your credentials:** GitHub App already authorized on your account
- **GitHub App:** Same one; sharing a session doesn't grant them new GitHub access
- **Result:** Collaborator sees the session, but all Git operations use your GitHub identity

### Desktop Remote Control
- **Collaborator identity:** None (just a URL)
- **Your credentials:** All on your local machine; never transmitted
- **GitHub App:** Not involved; you're already authenticated locally
- **Result:** Collaborator is completely anonymous and has zero credentials

---

## Guardrails & Blast Radius Control

### GitHub Actions
**How to prevent bad changes:**
1. **Pull Request Review:** Every Claude-generated change creates a PR. You must review and approve before it merges.
   - PR shows a diff; you can request changes or reject
   - Claude can reply to review comments but cannot merge without your approval
2. **Branch Protection:** In repo settings, require PR reviews before merging to `main`
3. **Permission Mode:** In `.claude/settings.json`, set the default permission mode to `plan` or `default` (manual mode) so Claude asks for approval on risky actions
4. **API Rate Limits:** GitHub's rate limits prevent runaway jobs
5. **CLAUDE.md Rules:** Include guardrails in your CLAUDE.md (e.g., "only edit content in `/src/content`, never change deployment config")

**Owner controls these; collaborator cannot bypass them.**

### Cloud Sessions (Shared)
**Guardrails:**
1. **You approve all edits:** The shared session still requires your approval before Claude pushes code
2. **Read-only vs. collaborative:** You choose whether the shared session lets them comment or just observe
3. **Session-level isolation:** They can only see what's in that session; they cannot browse your repos or access other sessions
4. **Permission modes:** Same as GitHub Actions—the session respects your permission mode settings

### Desktop Remote Control
**Guardrails:**
1. **You control the machine:** They cannot access anything outside the browser Remote Control interface
2. **Session-level isolation:** Same as above
3. **Your approval:** You approve all file edits and shell commands in real time

---

## What's NOT Possible Today

1. **Multi-user real-time collaborative editing:** There is no Google Docs-style "two developers in one session" mode. Session sharing is read-only or advisory (commenting on a shared session), not concurrent control.
   
2. **Passthrough GitHub credentials without creating a GitHub account for them:** Any GitHub-based workflow requires a GitHub account. You cannot hand someone an authentication token and have them work without one.

3. **No "invite collaborator" model where they get a personal seat in your project:** Claude Code Team plans support team members, but each team member still needs their own Claude account and typically their own GitHub account for independent work.

4. **No hosted collaboration sandbox where the owner pre-authorizes a collaborator's repo access without GitHub account:** The repo owner must always maintain the GitHub authentication boundary.

---

## Recommendation by Collaborator Type

**Scenario: "I want them to request changes, and I'll make them happen"**
→ **GitHub Actions**
- They describe the change in an issue comment
- Claude Code does it automatically
- You review the PR
- Simplest, most low-friction

**Scenario: "I want them to watch me work and advise in real time"**
→ **Claude Code on the Web (Cloud Sessions) with sharing**
- You start a session
- Share the link
- They observe and can comment ("make the font bigger", "that's perfect, deploy it")
- You control the keyboard

**Scenario: "I want them to see what the agent is doing but not interact"**
→ **Desktop App + Remote Control**
- You work locally
- Share a URL for read-only viewing
- They watch progress passively

**Scenario: "I want them to have full independent control but without a CLI"**
→ **Not currently possible without a GitHub account**
- If they must be GitHub-free, restrict to GitHub Actions (issue comment triggers only; you pre-approve)
- If they're willing to create a GitHub account, Cloud Sessions becomes viable

---

## GitHub Actions: Detailed Setup (5 Minutes)

### Step 1: Install the Claude GitHub App (repo owner)
```bash
# In any Claude Code session, run:
/install-github-app

# Follow the prompts:
# 1. Authorize the app on your GitHub account
# 2. Select the repository
# 3. Choose whether to set up GitHub Actions (say yes)
```

Or manually:
1. Visit https://github.com/apps/claude
2. Click "Install"
3. Select your repository

### Step 2: Add API Key to Secrets (repo owner)
1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `ANTHROPIC_API_KEY`
4. Value: your Claude API key from https://console.anthropic.com
5. Click "Add secret"

### Step 3: Add Workflow File (repo owner)
Copy the `/install-github-app` command's suggested workflow, or manually:

Create `.github/workflows/claude.yml`:
```yaml
name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Commit and push.

### Step 4: Test (repo owner)
1. Open a GitHub issue
2. Comment: `@claude what's in this repo?`
3. Claude responds automatically

### Step 5: Invite Collaborator (repo owner)
1. Go to repo Settings → Collaborators and teams
2. Add your collaborator as a "Collaborator" (write access)
3. Tell them to open an issue and mention `@claude`

**Collaborator now has zero setup.**

---

## Session Sharing: What It Looks Like

When you enable session sharing in Claude Code on the web:

1. **Private:** Only you can see it
2. **Team** (Enterprise/Team accounts): Other members of your claude.ai organization can view it
3. **Public** (Pro/Max accounts): Anyone with the link can view it

Shared sessions show:
- The conversation history
- Claude's in-progress or completed changes
- A diff viewer (to see what changed)
- The ability to leave comments and ask Claude follow-up questions

**They cannot:**
- Approve edits themselves (you must approve)
- Push code themselves (only the session owner can)
- Access your GitHub account or credentials

---

## Permission Modes for Safety

In your repo's `.claude/settings.json`, set the default permission mode so Claude Code asks for approval before risky actions:

```json
{
  "permissions": {
    "defaultMode": "default"
  }
}
```

**Permission modes:**
- `default` (Manual): Claude asks before every edit or shell command
- `acceptEdits`: Claude edits files without asking, but still asks before shell commands
- `plan`: Claude researches and proposes changes without editing; you approve the plan
- `auto`: Claude works autonomously (requires account eligibility); classifier reviews actions for safety

For a GitHub Actions workflow where a non-technical collaborator triggers work, **`plan` mode is ideal:**
- Claude reads the issue, researches the codebase
- Claude proposes a plan in the PR
- You review the plan and decide to approve or refine
- Claude executes only what you approved

---

## Cost Breakdown

| Method | Collaborator Cost | Owner Cost |
|--------|---|---|
| GitHub Actions | $0 | API token usage (pay-per-token) + GitHub Actions minutes (usually free) |
| Cloud Sessions (shared) | $20/mo (Claude subscription) | API token usage |
| Desktop + Remote Control | $0 | Electricity + your Claude subscription (if not already paying) |
| Terminal CLI | $0 | API token usage |

---

## Official Documentation

- **GitHub Actions:** https://code.claude.com/docs/en/github-actions
- **Claude Code on the Web (Cloud Sessions):** https://code.claude.com/docs/en/claude-code-on-the-web
- **Desktop App:** https://code.claude.com/docs/en/desktop
- **Permission Modes (Safety):** https://code.claude.com/docs/en/permission-modes
- **Memory & CLAUDE.md:** https://code.claude.com/docs/en/memory
- **Remote Control:** https://code.claude.com/docs/en/remote-control

---

## Summary: Your Best Bet

**For a non-technical collaborator with no GitHub account who should make changes to your repo without a terminal:**

1. **If you want them to independently request changes:** GitHub Actions (they comment on issues, Claude creates PRs)
2. **If you're willing to accept they need a Claude account:** Cloud Sessions (they watch and comment in real time)
3. **If they must remain anonymous and watch-only:** Desktop + Remote Control (they observe, you drive)

**GitHub Actions is the sweet spot: no setup for them, clear approval gates for you, and a permanent audit trail of what was changed and why.**

