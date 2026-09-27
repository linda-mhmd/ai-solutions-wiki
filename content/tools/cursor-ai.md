---
title: "Cursor - AI Code Editor"
description: "Cursor is an AI-first code editor built on VS Code. It uses Claude, OpenAI GPT-5.6, Gemini, and Grok models, plus its own Composer model, to autocomplete, explain, refactor, and generate code across your entire codebase. The default choice for developers building AI applications."
date: 2026-06-22
tags: ["cursor", "ai-coding", "code-editor", "vibe-coding", "developer-tools", "ide", "claude", "gpt"]
tool_category: "Frontend"
related:
  - basics/what-is-vibe-coding
  - tools/claude-anthropic
  - tools/openai-api
  - comparisons/context-engineering-vs-prompt-engineering
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/hand-tracing-red-light-notext.png" alt="A hand tracing a glowing red light path through darkness: the developer guides the direction, the AI fills in the path." loading="lazy">
  <figcaption>Cursor turns the editor into a conversation. You describe the destination, the model traces the route.</figcaption>
</figure>

Cursor is an AI-first code editor, built as a fork of VS Code and developed by Anysphere. It embeds frontier models from Anthropic, OpenAI, Google and SpaceXAI, plus its own Composer model, directly into the editing experience so that autocomplete, multi-file edits, and codebase-wide queries happen inside a single tool rather than across a browser tab and an IDE. For developers building AI applications, Cursor removes the context-switching that slows down every cycle of the coding loop.

Official site: https://cursor.com  
Documentation: https://docs.cursor.com  
Changelog: https://cursor.com/changelog

---

## Current models (September 2026)

Cursor's documentation, checked on 25 September 2026, lists these as its current models: **Claude Opus 5.5, Claude Sonnet 5, Claude Fable 5.1, Gemini 3.1 Pro, Gemini 3.8 Flash, Muse Spark 1.3, GPT-5.6 Sol, Terra and Luna, Grok 4.7, 4.6 and 4.5, and Composer 2.5.** Three details matter when you pick one:

- **Claude Opus 5.5** is listed at $4 input / $20 output per 1M tokens with $0.20 cache reads, 20% below Claude Opus 5, with a 300K default and 1M maximum context. Claude Opus 5 is still listed but hidden by default. See [Claude Opus 5.5](/news/claude-opus-5-5/).
- **Grok 4.7** is described by Cursor as "jointly trained by Cursor and SpaceXAI". It sits in Cursor's own "Cursor Models" usage pool with Grok 4.6, Grok 4.5 and Composer 2.5, which carries significantly more included usage than the third-party pool. Its standard window in Cursor is 256K, extendable to 500K at 2x rates. **Grok 4.7 Fast**, the same model at 2x price, is available only in Cursor and SpaceXAI's Grok Build, not on the public xAI API, and Cursor makes Fast the default speed tier on Pro and higher plans. See [Grok 4.7](/news/grok-4-7/).
- **GPT-6 is not listed yet.** OpenAI released GPT-6 Astra (3 September) and GPT-6 Sol and Luna (22 September), and GitHub Copilot added all three, but Cursor's model list and pricing page still stopped at GPT-5.6 on 25 September 2026. Check the Cursor changelog before assuming GPT-6 access.

## How Cursor fits into the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Editor</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">VS Code fork</span>
      <span class="bz-arch-chip">All VS Code extensions</span>
      <span class="bz-arch-chip">Cursor-specific UI overlays</span>
      <span class="bz-arch-chip-note">Full VS Code compatibility: themes, keybindings, settings sync</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Context</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Open files</span>
      <span class="bz-arch-chip">@file</span>
      <span class="bz-arch-chip">@folder</span>
      <span class="bz-arch-chip">@web</span>
      <span class="bz-arch-chip">@docs</span>
      <span class="bz-arch-chip">@git</span>
      <span class="bz-arch-chip">Codebase index</span>
      <span class="bz-arch-chip-note">Cursor indexes your repo on first open; @-symbols pin specific sources into the prompt</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">AI Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Claude Opus 5.5 / Sonnet 5 / Fable 5.1</span>
      <span class="bz-arch-chip">GPT-5.6 Sol / Terra / Luna</span>
      <span class="bz-arch-chip">Grok 4.7 (and 4.7 Fast)</span>
      <span class="bz-arch-chip">Gemini 3.8 Flash / 3.1 Pro</span>
      <span class="bz-arch-chip">Composer 2.5</span>
      <span class="bz-arch-chip-note">Switch models per session, or let Auto route per request. See the current lineups on the <a href="/tools/claude-anthropic/">Claude</a>, <a href="/tools/openai-api/">OpenAI API</a> and <a href="/tools/xai-grok/">xAI Grok</a> pages</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Features</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Tab completion</span>
      <span class="bz-arch-chip">Composer / Agent mode</span>
      <span class="bz-arch-chip">Chat (Cmd+L)</span>
      <span class="bz-arch-chip">Terminal integration</span>
      <span class="bz-arch-chip">Background agents</span>
      <span class="bz-arch-chip-note">Composer handles multi-file edits; background agents run tasks asynchronously</span>
    </div>
  </div>
</div>

---

## Installation and first-time setup

Download the installer from [cursor.com](https://cursor.com). Cursor ships native packages for macOS, Windows, and Linux.

```bash
# macOS: open the downloaded .dmg and drag Cursor to Applications
# Linux: download the .AppImage or .deb, then:
chmod +x cursor-*.AppImage && ./cursor-*.AppImage
# or
sudo dpkg -i cursor-*.deb
```

On first launch, Cursor imports your VS Code settings, extensions, and keybindings automatically. Sign in with a GitHub or Google account to activate your plan.

**Connect to a project:**

```bash
# Open any existing project from the terminal
cursor /path/to/your/project

# Or open the current directory
cursor .
```

Cursor indexes your codebase in the background after you open a project. The index enables `@codebase` queries and powers the relevance ranking for Composer. For large monorepos, indexing takes a few minutes on first open and stays current as files change.

**Install your existing VS Code extensions:**

Open the Extensions panel (`Cmd+Shift+X` on macOS). All extensions from the VS Code Marketplace install and run identically inside Cursor.

---

## Core features

### Tab completion

Cursor's tab completion goes beyond single-line suggestions. It reads the surrounding context, including adjacent functions and imported modules, and fills multiple lines at once. Press `Tab` to accept the full suggestion or use the arrow keys to step through alternatives.

```python
# You type the function signature and docstring
def calculate_discount(price: float, user_tier: str) -> float:
    """Return discounted price based on user tier."""

# Cursor completes the body:
    tiers = {"gold": 0.20, "silver": 0.10, "bronze": 0.05}
    discount = tiers.get(user_tier, 0)
    return price * (1 - discount)
```

The model reads the `user_tier` parameter name, the docstring, and the return type annotation to generate a pattern-consistent implementation rather than a generic placeholder.

### Composer and Agent mode

Composer (`Cmd+I` on macOS) is the multi-file editing interface. You describe what you want in plain English. Cursor reads the relevant files, generates a diff across all affected files, and presents the changes for review. You accept, reject, or modify before anything is written to disk.

**Example: add input validation to a FastAPI endpoint**

Open Composer and type:

```
Add Pydantic input validation to the POST /users endpoint in routes/users.py.
The request body must include email (valid email format) and name (non-empty string).
Return a 422 with a clear error message if validation fails.
```

Cursor reads `routes/users.py`, identifies the existing endpoint signature, generates the Pydantic model, imports it, and updates the route handler. The diff shows every line changed. Review and press `Accept All` to apply.

**Example: refactor to async/await**

```
Refactor get_user_by_id() in services/user_service.py to use async/await.
Update all callers in routes/users.py and tests/test_users.py to match.
```

Cursor traces the call graph, updates the three files, and presents the full diff. This task would take 10-15 minutes manually; Composer produces it in under 30 seconds.

**Agent mode** extends Composer with terminal access. Cursor can run commands (install packages, run tests, check linting) as part of the task and loop until the output confirms success.

### Chat: Cmd+L

Chat (`Cmd+L`) opens a conversation panel pinned to the right of the editor. Use it to ask questions about the codebase without making changes.

```
What does the @file:services/auth_service.py token_refresh() function do,
and why does it call revoke_old_tokens() before issuing the new token?
```

Cursor reads the file, traces the function, and explains the logic. The answer includes references to the specific lines. Click a reference to jump directly to that location in the editor.

Chat also accepts code selections. Highlight a block, press `Cmd+L`, and ask about the selected code only.

### @-symbols: pinning context

The `@` prefix pins specific sources into the model's context window:

| Symbol | What it includes |
|--------|-----------------|
| `@file:path/to/file.py` | The full content of one file |
| `@folder:src/services/` | All files inside a directory |
| `@web:https://docs.example.com` | Fetched content of a URL |
| `@docs` | Indexed documentation from configured sources |
| `@git` | Recent commits and diff history |
| `@codebase` | Cursor's semantic search across the full repo |

**Example: use @file to give targeted context**

```
Using @file:schemas/invoice.py as the source of truth for the Invoice model,
write a serialization function that converts an Invoice to the format expected
by the QuickBooks API documented at @web:https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/invoice
```

Cursor fetches the URL, reads the schema file, and generates the serialization function against both sources simultaneously.

### Rules: persistent behavior instructions

Create a `.cursor/rules/` directory at your project root and add `.mdc` files to encode project-specific conventions. Cursor loads these rules on every Composer and Chat session.

```bash
mkdir -p .cursor/rules
```

```markdown
# .cursor/rules/python.mdc
- Use `async/await` for all I/O-bound operations. Never use synchronous `requests` in FastAPI routes.
- All functions must have type annotations on parameters and return values.
- Error handling uses `HTTPException` with explicit `status_code` and `detail`. No bare `raise`.
- Tests use `pytest` with `pytest-asyncio`. Test files mirror the source path: `routes/users.py` -> `tests/routes/test_users.py`.
```

Rules eliminate the need to repeat conventions in every prompt. They are committed to the repo so the whole team shares the same Cursor behavior.

### Background agents

Background agents run tasks outside the editor without blocking your current session. Start a background agent from the Cursor dashboard or via the command palette:

```
Run the full test suite, identify any failures caused by the auth refactor,
and propose fixes without applying them yet.
```

The agent runs `pytest`, reads the failure output, traces the source of each failure, and returns a summary with proposed diffs. You review the results and apply selectively.

Background agents are useful for long-running tasks (test suites, database migrations, build verification) that would otherwise block the interactive session.

---

## Composer workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Open Composer</span>
    <span class="bz-flow-step-desc">Press Cmd+I. Cursor opens the Composer panel in the active workspace.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Describe the task</span>
    <span class="bz-flow-step-desc">Write a plain-English instruction. Reference specific files, functions, or constraints. Add @-symbols to pin external sources.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Cursor reads relevant files</span>
    <span class="bz-flow-step-desc">The model searches the codebase index, opens the relevant files, and reads the surrounding context before generating output.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Model generates diff</span>
    <span class="bz-flow-step-desc">Cursor presents a unified diff across all affected files. No changes are written to disk at this stage.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Review changes</span>
    <span class="bz-flow-step-desc">Step through each file change. Click individual hunks to accept or reject them. Ask follow-up questions in the same Composer session.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 6</span>
    <span class="bz-flow-step-name">Accept or reject</span>
    <span class="bz-flow-step-desc">Press Accept All to apply every change, or accept file by file. Rejected changes are discarded without touching the working tree.</span>
  </div>
</div>

---

## Cursor vs alternatives

| | Cursor | GitHub Copilot | Devin Desktop (formerly Windsurf) |
|---|---|---|---|
| **Base editor** | VS Code fork | Plugin for any editor | VS Code fork |
| **Multi-file editing** | Yes (Composer, Agent) | Yes (agent mode) | Yes (Cascade) |
| **Context window** | Up to 1M tokens (Claude) | Model-dependent | Up to 200K tokens |
| **Models available** | Claude, GPT-5.6, Gemini, Grok, Composer | GPT-6, GPT-5.6, Claude, Gemini, Grok, MAI | OpenAI, Claude, Gemini, SpaceXAI, open models, SWE-2 |
| **Codebase indexing** | Yes, semantic | Yes, basic | Yes, semantic |
| **Rules / conventions** | `.cursor/rules/` | Custom instructions | Workspace rules |
| **Terminal integration** | Yes (Agent mode) | Yes (agent mode, Copilot CLI) | Yes |
| **Background agents** | Yes (cloud agents) | Yes (Copilot cloud agent) | Yes (Devin Cloud) |
| **Price per month (USD)** | Free / $20 Pro / $60 Pro+ / $200 Ultra / $40 per Teams seat | Free / $10 Pro / $39 Pro+ / $100 Max / $19 Business / $39 Enterprise | Free / $20 Pro / $200 Max / Teams $80 + $40 per seat |

Windsurf, which had itself absorbed the Codeium brand, is now part of Cognition: as of 26 September 2026, windsurf.com redirects to Cognition's **Devin Desktop**, and its pricing page lists Devin plans.

**Key differentiator:** Cursor's combination of Claude's long context window, semantic codebase indexing, and multi-file Composer puts it ahead of plugin-based tools for complex refactors and greenfield feature development. Devin Desktop (formerly Windsurf) is the closest alternative and is worth evaluating if you prefer a different pricing model. GitHub Copilot remains the default choice for teams already inside the GitHub Enterprise ecosystem where SSO and audit logging are pre-configured.

---

## Pricing

| Plan | Price (USD) | What is included |
|------|-------|-----------------|
| **Hobby** | Free | No credit card required, limited Agent requests, access to Composer |
| **Pro** | $20/month | Extended Agent limits, frontier models, MCPs, skills and hooks, cloud agents, Bugbot on usage-based billing |
| **Pro+** | $60/month | Pro with higher included usage; Cursor recommends it for daily agent users |
| **Ultra** | $200/month | Pro with the highest individual usage; for agent power users |
| **Teams** | $40/user/month (Standard; Premium also offered) | Centralised billing, team marketplace for rules, skills and plugins, shared cloud agents, Bugbot reviews, usage analytics, team-wide privacy mode, SAML/OIDC SSO |
| **Enterprise** | Custom | Pooled usage, invoice billing, SCIM, model and MCP access controls, audit logs, AI code tracking API |

Prices from [cursor.com/pricing](https://cursor.com/pricing), checked 25 September 2026, exclusive of tax. Every plan includes a set amount of model usage, drawn from **two monthly usage pools**: "Cursor Models" (Grok 4.7/4.6/4.5 and Composer 2.5) and "Other Models" (third-party models at the provider's API price plus a Cursor Token Rate). Once the included amount is used, on-demand usage is billed in arrears. See [Cursor's models and pricing page](https://cursor.com/docs/models-and-pricing) for per-model rates.

The Hobby tier is enough to evaluate Cursor for a single project. Pro is the practical minimum for professional use. Teams is required for teams that need SSO, centralised billing or an organisation-wide privacy mode.

Heavy Agent and Composer sessions on premium third-party models draw down the "Other Models" pool quickly; check the usage dashboard before assuming a flat fee covers a month of intensive work.

---

## When not to use Cursor

**Your team requires a specific enterprise IDE.** JetBrains IDEs (IntelliJ, PyCharm, WebStorm) and Eclipse have deep integrations with enterprise toolchains: profilers, debuggers, build systems, and code review plugins tuned to those environments. Cursor has no equivalent. If your team's workflow depends on IntelliJ's refactoring engine or a proprietary JetBrains plugin, switching editors carries a real cost.

**Your project requires an air-gapped or offline environment.** Cursor sends code to external model APIs. There is no fully offline mode. For classified projects, regulated environments with strict data residency, or networks without outbound internet access, Cursor is not suitable. Look at GitHub Copilot with a self-hosted Azure OpenAI endpoint, or JetBrains AI with a local model.

**Context window costs are a concern at scale.** Each Composer session sends tens of thousands of tokens to the model API. Each plan includes a fixed usage allowance, with on-demand usage billed beyond it. If you run Cursor on behalf of a team under the Teams plan, or integrate it into automated pipelines, model usage can scale beyond the included allocation. Monitor usage per seat before rolling out to large teams.

**You need deterministic, reproducible builds in CI.** Cursor is an interactive editor, not a pipeline tool. For automated code generation in CI/CD, use the Anthropic API or OpenAI API directly with version-pinned models.

---

## Further reading

- [Cursor documentation](https://docs.cursor.com): official reference for all features, keybindings, and configuration options
- [Cursor rules community repository](https://github.com/PatrickJS/awesome-cursorrules): community-maintained collection of `.cursor/rules/` files for common frameworks and languages
- [What is vibe coding?](/basics/what-is-vibe-coding/): foundational explainer for the AI-assisted development workflow that Cursor is built around
- [Claude Anthropic](/tools/claude-anthropic/): the Claude models (Opus 5.5, Sonnet 5, Fable 5.1) available in Cursor
- [OpenAI API](/tools/openai-api/): the current GPT-5.6 lineup available as Cursor's OpenAI model option
- [Anthropic model documentation](https://docs.anthropic.com/en/docs/about-claude/models): current Claude model IDs, context windows, and pricing
- [Context engineering vs prompt engineering](/comparisons/context-engineering-vs-prompt-engineering/): why what you include in the context window matters more than how you phrase the instruction
- [Cursor changelog](https://cursor.com/changelog): weekly release notes; Cursor ships updates at a pace that makes the changelog more useful than any third-party summary

## Sources

1. Cursor, Models & Pricing (usage pools, per-model rates, Claude Opus 5.5, Grok 4.7 and Grok 4.7 Fast rows), checked 25 September 2026: [https://cursor.com/docs/models-and-pricing](https://cursor.com/docs/models-and-pricing)
2. Cursor, Grok 4.7 model page (256K/500K context, effort levels, Fast default on Pro and higher): [https://cursor.com/docs/models/grok-4-7](https://cursor.com/docs/models/grok-4-7)
3. Cursor, Models documentation (current model list and context windows): [https://cursor.com/docs/models](https://cursor.com/docs/models)
4. xAI, Grok 4.7 overview ("Grok 4.7 Fast ... available only in Cursor and Grok Build"): [https://docs.x.ai/developers/grok-4-7](https://docs.x.ai/developers/grok-4-7)
5. This wiki, "Grok 4.7": [/news/grok-4-7/](/news/grok-4-7/)
6. This wiki, "Claude Opus 5.5": [/news/claude-opus-5-5/](/news/claude-opus-5-5/)
7. Cursor, Pricing (Hobby, Pro $20, Pro+ $60, Ultra $200, Teams $40/user, Enterprise), checked 25 September 2026: [https://cursor.com/pricing](https://cursor.com/pricing)
8. GitHub Docs, "Plans for GitHub Copilot" (Free, Pro $10, Pro+ $39, Max $100, Business $19, Enterprise $39), checked 25 September 2026: [https://docs.github.com/en/copilot/get-started/plans](https://docs.github.com/en/copilot/get-started/plans)
9. Devin Desktop (windsurf.com redirects here) and Devin plans and pricing, checked 26 September 2026: [https://devin.ai/desktop](https://devin.ai/desktop), [https://windsurf.com/pricing](https://windsurf.com/pricing)
