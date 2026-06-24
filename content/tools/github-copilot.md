---
title: "GitHub Copilot - AI Pair Programmer"
description: "GitHub Copilot is Microsoft's AI coding assistant, built on OpenAI models and integrated into VS Code, JetBrains, Vim, and GitHub.com. It generates code completions, answers questions about your codebase, and reviews pull requests."
date: 2026-06-22
categories: [Tools]
tags: ["github-copilot", "ai-coding", "microsoft", "openai", "developer-tools", "ide", "code-completion", "pair-programming"]
tool_category: "Frontend"
related:
  - tools/cursor-ai
  - basics/what-is-github
  - basics/what-is-version-control
  - basics/what-is-vibe-coding
---

GitHub Copilot is Microsoft's AI coding assistant, released publicly in 2022 and now the most widely deployed AI tool in enterprise software development. It is built on OpenAI's GPT-4o and Codex models, integrated directly into the editors and platforms developers already use: VS Code, JetBrains IDEs, Vim, Neovim, and GitHub.com. It generates inline code completions as you type, answers questions about your codebase in a chat sidebar, reviews pull requests, and in its Enterprise tier, understands the full context of your GitHub repositories.

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
      <span class="bz-arch-chip">GPT-4o (Copilot Chat)</span>
      <span class="bz-arch-chip">Codex-based completion</span>
      <span class="bz-arch-chip">Claude models (configurable in Enterprise)</span>
      <span class="bz-arch-chip">Gemini models (configurable in Enterprise)</span>
      <span class="bz-arch-chip-note">Enterprise admins can select which underlying model powers completions and chat</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Features</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Inline completion</span>
      <span class="bz-arch-chip">Copilot Chat</span>
      <span class="bz-arch-chip">CLI assistant</span>
      <span class="bz-arch-chip">PR review</span>
      <span class="bz-arch-chip">Copilot Workspace</span>
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

### Copilot Workspace (Enterprise)

Copilot Workspace lets you describe a task in natural language and have Copilot plan and draft the implementation across multiple files. Start from a GitHub issue. Copilot proposes a plan: which files to create, which to edit, and what each change should accomplish. You review and adjust the plan, then let it generate the code. You review the diff, run tests, and commit.

This is the closest Copilot gets to Cursor's Composer feature, but it runs on GitHub.com rather than in your local editor.

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
- **Model choice:** Admins can configure which model powers completions and chat. Options include GPT-4o, Claude Sonnet, and Gemini 1.5 Pro, depending on your organisation's preference or data residency requirements.
- **Copilot Workspace:** Multi-file task completion starting from a GitHub Issue (described above).
- **Fine-tuning on private code:** Available for organisations with sufficiently large codebases, allowing completions to reflect internal patterns and naming conventions.
- **Admin controls:** Usage dashboards show which developers are using Copilot, how frequently, and how many suggestions they accept. Seat assignment and policy management are centralised.
- **Content exclusions:** Exclude specific files or directories from Copilot's context, for example secrets files, generated code, or licensed third-party source.
- **IP indemnity:** Microsoft provides legal indemnification if Copilot-generated code is found to infringe a copyright claim (Business and Enterprise tiers).

---

## Pricing

| Plan | Price | Who it is for |
|---|---|---|
| **Free** | €0 | Individual developers, up to 2,000 completions/month and 50 chat messages/month |
| **Pro** | €10/month | Individual developers with no usage limits, access to all models |
| **Business** | €19/seat/month | Teams and organisations: admin controls, policy management, IP indemnity |
| **Enterprise** | €39/seat/month | Large organisations: repository indexing, model choice, Copilot Workspace, fine-tuning |

All prices converted from USD at approximate parity. Check [github.com/features/copilot](https://github.com/features/copilot) for current EUR pricing in your region.

---

## Copilot vs alternatives

| | GitHub Copilot | Cursor | Codeium | Amazon CodeWhisperer |
|---|---|---|---|---|
| **IDE support** | VS Code, JetBrains, Vim, GitHub.com | VS Code fork (Cursor IDE only) | VS Code, JetBrains, Vim, web | VS Code, JetBrains, Visual Studio |
| **Multi-file editing** | Workspace (Enterprise, GitHub.com) | Composer (local, all tiers) | Cascade (limited) | No |
| **Codebase context** | Repo index (Enterprise), open tabs (all) | Full local codebase index (all tiers) | Project-level context (Pro) | Workspace context (limited) |
| **PR review** | Yes, native GitHub integration | No | No | No |
| **Enterprise admin controls** | Yes, usage dashboards, seat management | Limited | Yes (Codeium Enterprise) | Yes, AWS IAM integration |
| **Model choice** | GPT-4o; Claude/Gemini (Enterprise) | GPT-4o, Claude, Gemini (all tiers) | Multiple (Cascade model) | Amazon Q models only |
| **Price per seat** | Free / €10 / €19 / €39 | Free / €20 / €40 | Free / €15 / custom | Free tier / €19 (Pro) |
| **Best for** | GitHub-native teams, PR-centric workflows | Multi-file refactors in local IDE | Cost-sensitive teams, JetBrains users | AWS-native teams already on Q Developer |

---

## When not to use GitHub Copilot

**You need multi-file Composer-style editing in your local IDE.** Copilot Workspace runs on GitHub.com and requires the Enterprise tier. If you need to refactor across 15 files in a single local session with full diff preview, Cursor's Composer delivers this more smoothly for any paying tier.

**Your environment is air-gapped or has strict data residency requirements.** Copilot sends code context to Microsoft's servers. Even with Business or Enterprise data agreements, the model runs remotely. If your security policy prohibits sending source code to any external service, you need a self-hosted solution such as Continue.dev with a local model, or Amazon CodeWhisperer with AWS PrivateLink.

**You need to avoid GitHub vendor lock-in.** Copilot's strongest features, PR review, repository indexing, Workspace, are GitHub-specific. If your organisation uses GitLab, Bitbucket, or Azure DevOps as its primary SCM, Copilot's GitHub-native advantages do not apply.

**Model choice flexibility matters more than ecosystem depth.** Copilot's model menu is available only on Enterprise. If you want to switch freely between Claude, Gemini, and GPT-4o at any tier, Cursor gives you that from the Pro plan upward.

**You are primarily a solo developer on a tight budget.** The free tier covers light use. But Codeium's free tier has no monthly usage cap and is otherwise comparable for inline completions. Consider Codeium free before paying for Copilot Pro if cost is the primary constraint.

---

## Further reading

- [GitHub Copilot documentation](https://docs.github.com/en/copilot): official docs covering installation, features, and admin configuration for all tiers
- [GitHub Copilot trust centre](https://resources.github.com/copilot-trust-center/): data handling, privacy policy, and security posture for enterprise evaluation
- [GitHub Copilot for Business: getting started](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization): seat management, policy controls, and usage monitoring
- [GitHub Copilot Workspace overview](https://githubnext.com/projects/copilot-workspace): GitHub Next's technical write-up on Workspace, the multi-file task completion feature
- [Copilot Chat slash commands](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide): full reference for `/explain`, `/fix`, `/tests`, `/doc`, and context variables
- [GitHub Copilot in the CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/about-github-copilot-in-the-cli): `gh copilot suggest` and `gh copilot explain` reference
- [What is vibe coding](/basics/what-is-vibe-coding/): how AI coding tools change the development workflow and what skills still matter
- [Cursor AI](/tools/cursor-ai/): the main alternative to Copilot for multi-file, locally-indexed AI editing
