---
title: "GitHub Copilot - AI Pair Programmer"
description: "GitHub Copilot is Microsoft's multi-model AI coding assistant, integrated into VS Code, JetBrains, Vim, and GitHub.com. It generates code completions, answers questions about your codebase, runs agents, and reviews pull requests. Covers the September 2026 model lineup, deprecation schedule, billing changes, Plugin4Shell and the Doe v. GitHub ruling."
date: 2026-06-22
categories: [Tools]
tags: ["github-copilot", "ai-coding", "microsoft", "openai", "developer-tools", "ide", "code-completion", "pair-programming"]
tool_category: "Frontend"
related:
  - tools/cursor-ai
  - tools/openai-api
  - basics/what-is-github
  - basics/what-is-version-control
  - basics/what-is-vibe-coding
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

GitHub Copilot is Microsoft's AI coding assistant, released publicly in 2022 and now the most widely deployed AI tool in enterprise software development. It is now a multi-model product. The model picker spans OpenAI (GPT-6 Astra, Sol and Luna; GPT-5.6), Anthropic (Claude Opus 5.5, Fable 5.1, Sonnet 5), Google (Gemini 3.8 Flash), xAI (Grok 4.7) and Microsoft's own MAI-Code-1.1-Flash, with an Auto mode that picks per prompt. See [Models and policy changes, September 2026](#models-and-policy-changes-september-2026) below. It is integrated directly into the editors and platforms developers already use: VS Code, JetBrains IDEs, Vim, Neovim, and GitHub.com. It generates inline code completions as you type, answers questions about your codebase in a chat sidebar, reviews pull requests, and in its Enterprise tier, understands the full context of your GitHub repositories.

The problem Copilot solves is friction at the implementation layer. A developer who knows what to build still spends significant time on boilerplate, remembering API signatures, writing tests for obvious cases, and translating intent into working syntax. Copilot compresses that gap by making the next line of code available before you have finished thinking about it.

<figure class="bz-figure">
  <img src="/img/juggling/juggler-brain-circuit-notext.png" alt="A silhouette juggler with a red and green circuit-brain pattern traced above their head: two intelligences coordinating, the human directing, the AI completing." loading="lazy">
  <figcaption>Copilot does not replace the developer. It handles the next line while you think about the next decision.</figcaption>
</figure>

## Integration stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Editor</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">VS Code</span>
      <span class="bz-arch-chip">JetBrains IDEs</span>
      <span class="bz-arch-chip">Vim / Neovim</span>
      <span class="bz-arch-chip">GitHub.com</span>
      <span class="bz-arch-chip">GitHub CLI</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Context</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Current file</span>
      <span class="bz-arch-chip">Open tabs</span>
      <span class="bz-arch-chip">Comments and docstrings</span>
      <span class="bz-arch-chip">Repository index (Enterprise)</span>
      <span class="bz-arch-chip-note">Enterprise tier indexes your full GitHub organisation for semantic search across all repos</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">AI Backend</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPT-6 Astra / Sol / Luna</span>
      <span class="bz-arch-chip">Claude Opus 5.5 / Fable 5.1 / Sonnet 5</span>
      <span class="bz-arch-chip">Gemini 3.8 Flash</span>
      <span class="bz-arch-chip">Grok 4.7</span>
      <span class="bz-arch-chip">MAI-Code-1.1-Flash</span>
      <span class="bz-arch-chip-note">Users pick per session (plan-dependent); Business and Enterprise admins control availability through model policies</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Features</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Inline completion</span>
      <span class="bz-arch-chip">Copilot Chat</span>
      <span class="bz-arch-chip">CLI assistant</span>
      <span class="bz-arch-chip">PR review</span>
      <span class="bz-arch-chip">Cloud agent</span>
      <span class="bz-arch-chip">GitHub.com chat</span>
    </div>
  </div>
</div>

## Installation

### VS Code

1. Open the Extensions panel (`Cmd+Shift+X` on macOS, `Ctrl+Shift+X` on Windows/Linux).
2. Search for **GitHub Copilot** and install the extension published by GitHub.
3. Install **GitHub Copilot Chat** for the sidebar chat panel.
4. Sign in with your GitHub account when prompted.
5. Accept the inline suggestion that appears on your next keystroke with `Tab`.

### JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.)

1. Open **Settings > Plugins > Marketplace**.
2. Search for **GitHub Copilot** and click Install.
3. Restart the IDE and sign in with your GitHub account from the status bar.

### Vim / Neovim

Using vim-plug:

```vim
Plug 'github/copilot.vim'
```

Then run `:PlugInstall` and authenticate:

```vim
:Copilot setup
```

Accept suggestions with `Tab`. Dismiss with `Ctrl+]`. Cycle through alternatives with `Alt+]` and `Alt+[`.

### GitHub CLI

```bash
gh extension install github/gh-copilot
gh copilot suggest "how do I find the process using port 3000"
gh copilot explain "git rebase -i HEAD~3"
```

---

## Core features

### Inline completion

Copilot predicts the next line, block, or function body as you type. The suggestion appears as grey ghost text. Press `Tab` to accept. Press `Esc` to dismiss. Press `Alt+]` to see the next suggestion if the first is not what you want.

Copilot is most accurate when you give it clear context:

- Write a comment describing what the function should do before the function signature.
- Name your functions and variables descriptively. `processUserPayment()` generates better completions than `doThing()`.
- Keep related code in open tabs. Copilot reads all open files for context.

Example: write this comment, then let Copilot complete the function:

```python
# Parse a JWT token without verification, return the payload as a dict.
# Raise ValueError if the token is malformed.
def decode_jwt_payload(token: str) -> dict:
```

Copilot generates the base64 decode, the JSON parse, and the error handling.

### Copilot Chat

The chat panel (sidebar in VS Code, tool window in JetBrains) accepts natural language questions about your code and slash commands that operate on selected text.

**Slash commands:**

| Command | What it does |
|---|---|
| `/explain` | Explains the selected code in plain English |
| `/fix` | Identifies and fixes the bug in the selection |
| `/tests` | Generates unit tests for the selected function or file |
| `/doc` | Writes a docstring for the selected function |
| `/simplify` | Rewrites the selection with less complexity |

**Example: `/explain` on a selected function**

> **You:** `/explain`
>
> **Copilot:** This function implements a debounce pattern. It returns a new function that delays calling the original function until `delay` milliseconds have passed since the last invocation. If the returned function is called again before the delay expires, the timer resets. This is typically used on input event handlers to avoid firing an API call on every keystroke.

**Example: `/fix` on a bug**

> **You:** `/fix`
>
> **Copilot:** The issue is on line 12: `user.permissions.includes(role)` will always return `false` because `permissions` is an array of objects, not strings. Change it to `user.permissions.some(p => p.role === role)`.

**Example: `/tests` for a utility function**

> **You:** `/tests`
>
> **Copilot:** Generates a full test suite with describe/it blocks covering the happy path, empty input, null input, boundary values, and the known edge case in line 8.

**Natural language requests:**

```
Add error handling to this fetch call. Use try/catch. Log the error with the URL and status code. Return null on failure instead of throwing.
```

Copilot rewrites the selected fetch call with the requested error handling in place.

### GitHub.com integration

On GitHub.com, open any repository and press `.` to open the web editor, or navigate to any file and use the Copilot button in the top right to open a chat panel. Ask questions about the repository, a specific PR, or an issue:

- "What does this repository do and what are its main modules?"
- "Summarise the changes in PR #847."
- "Find all places where this function is called."
- "What issues are blocking the v2.1 milestone?"

### PR review

Copilot can review your pull request automatically when you open it, or on demand from the PR page. It reads the diff and leaves comments on specific lines calling out potential bugs, missing error handling, security issues, and deviations from patterns elsewhere in the codebase.

To trigger a review: on the PR page, click **Copilot** in the Reviewers section and select **Request review**. Copilot adds inline comments within a few seconds. Each comment includes a suggested fix you can accept with one click.

### Copilot cloud agent (formerly Copilot Workspace)

Copilot Workspace, the GitHub Next technical preview that planned multi-file changes from an issue, has been discontinued: its site (copilot-workspace.githubnext.com) now returns 404 and it no longer appears in GitHub's plan documentation. Its successor is **Copilot cloud agent** (earlier called the coding agent). You assign it an issue, start a session from the agents panel on GitHub.com, VS Code or chat integrations, or mention `@copilot` on a pull request. It researches the repository, proposes a plan, makes changes on a branch in the background, and opens a pull request when you are ready. On Business and Enterprise, an administrator must enable the cloud agent policy first. For multi-file work inside your local editor, use agent mode in VS Code or JetBrains.

---

## PR review workflow with Copilot

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Open PR</span>
    <span class="bz-flow-step-desc">Push your branch and open a pull request on GitHub.com as normal.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Request Copilot review</span>
    <span class="bz-flow-step-desc">Add Copilot as a reviewer from the Reviewers panel. Copilot reads the full diff.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Review suggestions</span>
    <span class="bz-flow-step-desc">Copilot adds inline comments on specific lines with a rationale and a suggested fix for each.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Accept or dismiss</span>
    <span class="bz-flow-step-desc">Accept a suggestion with one click to apply the fix directly to the branch, or dismiss with a note.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Push and merge</span>
    <span class="bz-flow-step-desc">Accepted fixes commit automatically. Human reviewers see a cleaner diff with mechanical issues already resolved.</span>
  </div>
</div>

---

## Enterprise features

**Copilot Enterprise** is the tier aimed at large organisations on GitHub Enterprise Cloud. Key additions over the Business tier:

- **Repository indexing:** Copilot builds a semantic index of your entire GitHub organisation. Chat questions can draw on code from repos you do not have open locally.
- **Model policies:** Admins control which models users can pick. Under "default model enablement", new models are switched on automatically unless an admin has turned off the global default or disabled that model. Claude Fable 5.1 is the exception: it is off by default because it requires data retention. Options span GPT-6, Claude, Gemini, Grok and MAI models, depending on your organisation's preference or data residency requirements. See [OpenAI API](/tools/openai-api/), [Claude Anthropic](/tools/claude-anthropic/), and [Google Gemini](/tools/google-gemini/) for the current lineups.
- **Copilot cloud agent:** Background, multi-file task completion starting from an issue or the agents panel (described above); on Business and Enterprise an admin enables it by policy.
- **Custom completion models (unconfirmed):** GitHub previously previewed completion models fine-tuned on an organisation's private code. The feature does not appear in GitHub's current plan documentation (checked 25 September 2026), so confirm availability with GitHub before planning around it.
- **Admin controls:** Usage dashboards show which developers are using Copilot, how frequently, and how many suggestions they accept. Seat assignment and policy management are centralised.
- **Content exclusions:** Exclude specific files or directories from Copilot's context, for example secrets files, generated code, or licensed third-party source.
- **IP indemnity:** Microsoft provides legal indemnification if Copilot-generated code is found to infringe a copyright claim (Business and Enterprise tiers).

---

## Pricing

| Plan | Price | Who it is for |
|---|---|---|
| **Free** | $0 | Individual developers: limited agent use, an allowance of GitHub AI Credits, up to 2,000 completions/month, Auto model selection only |
| **Student** | $0 | Verified students: agents included (no third-party agents), Auto model selection only |
| **Pro** | $10/month | Individuals: a selection of models, 1,000 base + 500 flex AI credits per month (free for some users, such as verified teachers and popular open-source maintainers) |
| **Pro+** | $39/month | Power users: access to premium models, 3,900 base + 3,100 flex AI credits per month |
| **Max** | $100/month | High-volume individuals: priority access to premium models, 10,000 base + 10,000 flex AI credits per month |
| **Business** | $19/seat/month | Organisations: 1,900 AI credits per user per month, admin controls, policy management, IP indemnity |
| **Enterprise** | $39/seat/month | GitHub Enterprise Cloud customers: 3,900 AI credits per user per month, priority access to premium models, enterprise-grade controls |

Prices in USD from GitHub's plan documentation, checked 25 September 2026. Copilot is not available for GitHub Enterprise Server. Usage beyond a plan's GitHub AI Credits is billed under usage-based billing, so treat the seat price as a floor, not a total. The September billing changes are listed below.

**Doe v. GitHub: Ninth Circuit affirms dismissal of the DMCA claims (16 September 2026).** In the long-running suit by anonymous open-source developers against GitHub and OpenAI, a unanimous Ninth Circuit panel upheld the dismissal of claims under DMCA §1202. The court held that Copilot and Codex create new works rather than copies from which copyright management information was stripped. Judge Eric Miller wrote that the court declined "to transform run-of-the-mill copyright infringement claims into DMCA claims." The ruling does not settle whether Copilot output can infringe copyright. The panel expressly left ordinary infringement claims open and found the plaintiffs had standing. For buyers, the practical takeaway is unchanged: keep Copilot's duplicate-detection filter on and rely on the IP indemnity terms in Business and Enterprise contracts, since ordinary copyright risk still exists. Full writeup: [Doe v. GitHub at the Ninth Circuit](/news/doe-v-github-ninth-circuit/).

## Copilot vs alternatives

| | GitHub Copilot | Cursor | Devin Desktop (formerly Windsurf/Codeium) | Amazon Q Developer (formerly CodeWhisperer) |
|---|---|---|---|---|
| **IDE support** | VS Code, JetBrains, Vim, GitHub.com | VS Code fork (Cursor IDE only) | VS Code fork | VS Code, JetBrains, Visual Studio, CLI |
| **Multi-file editing** | Agent mode (IDE), cloud agent (GitHub.com) | Composer and Agent (local, all tiers) | Cascade agent | Agentic coding in IDE and CLI |
| **Codebase context** | Repo index (Enterprise), open tabs (all) | Full local codebase index (all tiers) | "Fast context" (per Devin plans page) | Workspace context |
| **PR review** | Yes, native GitHub integration | Yes (Bugbot) | Not documented | Not documented |
| **Enterprise admin controls** | Yes, usage dashboards, seat management | Yes (Teams, Enterprise) | Yes (Teams, Enterprise) | Yes, IAM Identity Center integration (Pro) |
| **Model choice** | GPT-6, Claude, Gemini, Grok, MAI (plan-dependent) | GPT-5.6, Claude, Gemini, Grok (all paid tiers) | OpenAI, Claude, Gemini, SpaceXAI, open models, SWE-2 | Claude models |
| **Price per seat (USD/month)** | Free / $10 / $39 / $100 / $19 / $39 | Free / $20 / $60 / $200; Teams $40 | Free / $20 / $200; Teams $80 + $40 per seat | Free / $19 (Pro) |
| **Best for** | GitHub-native teams, PR-centric workflows | Multi-file refactors in local IDE | Teams also using Cognition's Devin agents | AWS-native teams |

Amazon CodeWhisperer was folded into **Amazon Q Developer**; AWS also sells a separate agentic IDE, **Kiro** (Free, then $20 to $200 per user per month). Codeium renamed itself Windsurf, and windsurf.com now redirects to Cognition's Devin Desktop.

---

## When not to use GitHub Copilot

**You need multi-file Composer-style editing in your local IDE.** Copilot's agent mode now edits across files locally, and the cloud agent works on GitHub.com in the background. If you want Composer-style multi-file refactors with a codebase-wide semantic index on every paid tier, compare Cursor before committing.

**Your environment is air-gapped or has strict data residency requirements.** Copilot sends code context to Microsoft's servers. Even with Business or Enterprise data agreements, the model runs remotely. If your security policy prohibits sending source code to any external service, you need a self-hosted solution such as Continue.dev with a local model, or a model you host yourself behind your own network controls.

**You need to avoid GitHub vendor lock-in.** Copilot's strongest features, PR review, repository indexing and the cloud agent, are GitHub-specific. If your organisation uses GitLab, Bitbucket, or Azure DevOps as its primary SCM, Copilot's GitHub-native advantages do not apply.

**Model choice flexibility matters more than ecosystem depth.** Copilot now has a model picker on individual plans too, but access is tiered: GPT-6 Astra, GPT-6 Sol, Claude Opus 5.5 and Claude Fable 5.1 need Pro+ or higher, while Pro gets GPT-6 Luna, Grok 4.7 and Gemini 3.8 Flash. Premium models bill under usage-based billing. If you want the widest menu on the cheapest paid tier, compare Cursor's model list and usage pools before committing.

**You are primarily a solo developer on a tight budget.** The free tier covers light use. Devin Desktop (formerly Windsurf) advertises unlimited Tab completions on its free plan, and Amazon Q Developer's free tier includes 50 agentic requests a month. Compare those before paying for Copilot Pro if cost is the primary constraint.

---

## Further reading

- [GitHub Copilot documentation](https://docs.github.com/en/copilot): official docs covering installation, features, and admin configuration for all tiers
- [GitHub Copilot trust centre](https://resources.github.com/copilot-trust-center/): data handling, privacy policy, and security posture for enterprise evaluation
- [GitHub Copilot for Business: getting started](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization): seat management, policy controls, and usage monitoring
- [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent): what the background agent that replaced Copilot Workspace can do, and how admins enable it
- [Copilot Chat slash commands](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide): full reference for `/explain`, `/fix`, `/tests`, `/doc`, and context variables
- [GitHub Copilot in the CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/about-github-copilot-in-the-cli): `gh copilot suggest` and `gh copilot explain` reference
- [What is vibe coding](/basics/what-is-vibe-coding/): how AI coding tools change the development workflow and what skills still matter
- [Cursor AI](/tools/cursor-ai/): the main alternative to Copilot for multi-file, locally-indexed AI editing
- [OpenAI API](/tools/openai-api/): the current GPT-5.6 lineup that powers Copilot Chat

## Sources

1. GitHub Changelog, 22 September 2026, "OpenAI's GPT-6 Sol and GPT-6 Luna now available": [https://github.blog/changelog/2026-09-22-openais-gpt-6-sol-and-gpt-6-luna-now-available](https://github.blog/changelog/2026-09-22-openais-gpt-6-sol-and-gpt-6-luna-now-available)
2. GitHub Changelog, 22 September 2026, "Claude Opus 5.5 is now available in GitHub Copilot": [https://github.blog/changelog/2026-09-22-claude-opus-5-5-is-now-available-in-github-copilot](https://github.blog/changelog/2026-09-22-claude-opus-5-5-is-now-available-in-github-copilot)
3. GitHub Changelog, 21 September 2026, "Grok 4.7 is now available in GitHub Copilot": [https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot](https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot)
4. GitHub Changelog, 4 September 2026, "GPT-6 Astra is generally available in GitHub Copilot": [https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot](https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot)
5. GitHub Changelog, 3 September 2026, "Gemini 3.8 Flash is now available in GitHub Copilot": [https://github.blog/changelog/2026-09-03-gemini-3-8-flash-is-now-available-in-github-copilot](https://github.blog/changelog/2026-09-03-gemini-3-8-flash-is-now-available-in-github-copilot)
6. GitHub Changelog, 1 September 2026, "Claude Fable 5.1 is generally available in GitHub Copilot": [https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot](https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot)
7. GitHub Changelog, 31 August 2026, "Selected GitHub Copilot models deprecated" (1 September wave): [https://github.blog/changelog/2026-08-31-selected-github-copilot-models-deprecated](https://github.blog/changelog/2026-08-31-selected-github-copilot-models-deprecated)
8. GitHub Changelog, 3 September 2026, "Upcoming deprecation of selected GitHub Copilot models" (2 October wave): [https://github.blog/changelog/2026-09-03-upcoming-deprecation-of-selected-github-copilot-models](https://github.blog/changelog/2026-09-03-upcoming-deprecation-of-selected-github-copilot-models)
9. GitHub Changelog, 18 September 2026, "Upcoming deprecation of selected GitHub Copilot models in mid-October" (19 October wave): [https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october](https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october)
10. GitHub Changelog, 10 September 2026, "MAI-Code-1-Flash deprecated": [https://github.blog/changelog/2026-09-10-mai-code-1-flash-deprecated](https://github.blog/changelog/2026-09-10-mai-code-1-flash-deprecated)
11. GitHub Changelog, 28 August 2026, "Upcoming changes to GitHub Copilot policies and billing": [https://github.blog/changelog/2026-08-28-upcoming-changes-to-github-copilot-policies-and-billing](https://github.blog/changelog/2026-08-28-upcoming-changes-to-github-copilot-policies-and-billing)
12. GitHub Changelog, 3 September 2026, "Reopening Copilot Business and Enterprise signups": [https://github.blog/changelog/2026-09-03-reopening-copilot-business-and-enterprise-signups](https://github.blog/changelog/2026-09-03-reopening-copilot-business-and-enterprise-signups)
13. GitHub Changelog, 31 August 2026, "Copilot model access update for GitHub Team plans": [https://github.blog/changelog/2026-08-31-copilot-model-access-update-for-github-team-plans](https://github.blog/changelog/2026-08-31-copilot-model-access-update-for-github-team-plans)
14. GitHub Changelog, 14 September 2026, "Configure cost and quality in Copilot auto model selection": [https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection](https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection)
15. GitHub Changelog, 24 September 2026, "Default Enablement of Copilot features for Copilot Business and Enterprise": [https://github.blog/changelog/2026-09-24-default-enablement-of-copilot-features-for-copilot-business-and-enterprise](https://github.blog/changelog/2026-09-24-default-enablement-of-copilot-features-for-copilot-business-and-enterprise)
16. heise online, 21 September 2026, "Critical flaw in Claude Code, OpenAI Codex, GitHub Copilot, and Gemini CLI" (Plugin4Shell; Copilot unpatched, GitHub not responding): [https://www.heise.de/en/news/Critical-flaw-in-Claude-Code-OpenAI-Codex-GitHub-Copilot-and-Gemini-CLI-11460259.html](https://www.heise.de/en/news/Critical-flaw-in-Claude-Code-OpenAI-Codex-GitHub-Copilot-and-Gemini-CLI-11460259.html)
17. Courthouse News Service, 16 September 2026, "Coders lose appeal in copyright fight against AI tools" (Doe v. GitHub, Ninth Circuit): [https://www.courthousenews.com/coders-lose-appeal-in-copyright-fight-against-ai-tools/](https://www.courthousenews.com/coders-lose-appeal-in-copyright-fight-against-ai-tools/)
18. Gibson Dunn, "Ninth Circuit clarifies limits of DMCA liability for AI-generated code": [https://www.gibsondunn.com/ninth-circuit-clarifies-limits-of-dmca-liability-for-ai-generated-code/](https://www.gibsondunn.com/ninth-circuit-clarifies-limits-of-dmca-liability-for-ai-generated-code/)
19. This wiki, "Plugin4Shell": [/news/plugin4shell-coding-agents-rce/](/news/plugin4shell-coding-agents-rce/)
20. This wiki, "Doe v. GitHub at the Ninth Circuit": [/news/doe-v-github-ninth-circuit/](/news/doe-v-github-ninth-circuit/)
21. GitHub Docs, "Plans for GitHub Copilot" (plan prices and AI credit allowances), checked 25 September 2026: [https://docs.github.com/en/copilot/get-started/plans](https://docs.github.com/en/copilot/get-started/plans)
22. GitHub Docs, "About GitHub Copilot cloud agent": [https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
23. AWS, Amazon Q Developer pricing (Free, Pro $19/user/month), checked 26 September 2026: [https://aws.amazon.com/q/developer/pricing/](https://aws.amazon.com/q/developer/pricing/); Kiro pricing: [https://kiro.dev/pricing/](https://kiro.dev/pricing/)
24. Devin plans and pricing (windsurf.com redirects to Devin Desktop), checked 26 September 2026: [https://windsurf.com/pricing](https://windsurf.com/pricing)
