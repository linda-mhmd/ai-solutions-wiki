---
title: "Cursor - AI Code Editor"
description: "Cursor is an AI-first code editor built on VS Code. It uses Claude and OpenAI's GPT-5.6 models to autocomplete, explain, refactor, and generate code across your entire codebase. The default choice for developers building AI applications."
date: 2026-06-22
tags: ["cursor", "ai-coding", "code-editor", "vibe-coding", "developer-tools", "ide", "claude", "gpt"]
tool_category: "Frontend"
related:
  - basics/what-is-vibe-coding
  - tools/claude-anthropic
  - tools/openai-api
  - comparisons/context-engineering-vs-prompt-engineering
last_updated: 2026-09-03
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/hand-tracing-red-light-notext.png" alt="A hand tracing a glowing red light path through darkness: the developer guides the direction, the AI fills in the path." loading="lazy">
  <figcaption>Cursor turns the editor into a conversation. You describe the destination, the model traces the route.</figcaption>
</figure>

Cursor is an AI-first code editor, built as a fork of VS Code and developed by Anysphere. It embeds Claude and OpenAI's GPT-5.6 models directly into the editing experience so that autocomplete, multi-file edits, and codebase-wide queries happen inside a single tool rather than across a browser tab and an IDE. For developers building AI applications, Cursor removes the context-switching that slows down every cycle of the coding loop.

Official site: https://cursor.com  
Documentation: https://docs.cursor.com  
Changelog: https://cursor.com/changelog

---

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
      <span class="bz-arch-chip">Claude Sonnet 5 (default)</span>
      <span class="bz-arch-chip">Claude Opus 5</span>
      <span class="bz-arch-chip">GPT-5.6</span>
      <span class="bz-arch-chip-note">Switch models per session; Opus and GPT-5.6 for complex reasoning, Sonnet for speed — see the current lineups on the <a href="/tools/claude-anthropic/">Claude</a> and <a href="/tools/openai-api/">OpenAI API</a> pages</span>
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

| | Cursor | GitHub Copilot | Windsurf | Codeium |
|---|---|---|---|---|
| **Base editor** | VS Code fork | Plugin for any editor | VS Code fork | Plugin for any editor |
| **Multi-file editing** | Yes (Composer) | Limited (Edits, preview) | Yes (Cascade) | Limited |
| **Context window** | Up to 1M tokens (Claude) | 64K tokens | Up to 200K tokens | 16K tokens |
| **Models available** | Claude, GPT-5.6 | GPT-5.6 | Claude, GPT-5.6 | Codeium custom model |
| **Codebase indexing** | Yes, semantic | Yes, basic | Yes, semantic | Yes, basic |
| **Rules / conventions** | `.cursor/rules/` | Custom instructions | Workspace rules | `.codeium/` config |
| **Terminal integration** | Yes (Agent mode) | No | Yes | No |
| **Background agents** | Yes | No | Limited | No |
| **Price per month** | Free / €19 Pro / €38 Business | Free / €10 Individual / €19 Business | Free / €15 Pro | Free / €12 Pro |

**Key differentiator:** Cursor's combination of Claude's long context window, semantic codebase indexing, and multi-file Composer puts it ahead of plugin-based tools for complex refactors and greenfield feature development. Windsurf is the closest alternative and is worth evaluating if you prefer a different pricing model. GitHub Copilot remains the default choice for teams already inside the GitHub Enterprise ecosystem where SSO and audit logging are pre-configured.

---

## Pricing

| Plan | Price | What is included |
|------|-------|-----------------|
| **Free** | €0/month | 2,000 completions/month, 50 slow premium requests, access to basic models |
| **Pro** | €19/month | Unlimited completions, 500 fast premium requests, all models including Opus and GPT-5.6, background agents |
| **Business** | €38/seat/month | Everything in Pro, SSO, audit logs, admin dashboard, privacy controls, centralized billing |

The Free tier is enough to evaluate Cursor for a single project. Pro is the practical minimum for professional use. Business is required for teams that need compliance logging or want to disable training data sharing at the organizational level.

Fast premium requests use Claude Sonnet 5 or GPT-5.6 at full speed. Slow requests use the same models at reduced priority. The 500 fast requests on Pro reset monthly; heavy Composer sessions can exhaust this in a week on complex projects.

---

## When not to use Cursor

**Your team requires a specific enterprise IDE.** JetBrains IDEs (IntelliJ, PyCharm, WebStorm) and Eclipse have deep integrations with enterprise toolchains: profilers, debuggers, build systems, and code review plugins tuned to those environments. Cursor has no equivalent. If your team's workflow depends on IntelliJ's refactoring engine or a proprietary JetBrains plugin, switching editors carries a real cost.

**Your project requires an air-gapped or offline environment.** Cursor sends code to external model APIs. There is no fully offline mode. For classified projects, regulated environments with strict data residency, or networks without outbound internet access, Cursor is not suitable. Look at GitHub Copilot with a self-hosted Azure OpenAI endpoint, or JetBrains AI with a local model.

**Context window costs are a concern at scale.** Each Composer session sends tens of thousands of tokens to the model API. At Pro tier, this is included in the flat fee. If you run Cursor on behalf of a team under Business tier, or integrate it into automated pipelines, model usage can scale beyond the included allocation. Monitor usage per seat before rolling out to large teams.

**You need deterministic, reproducible builds in CI.** Cursor is an interactive editor, not a pipeline tool. For automated code generation in CI/CD, use the Anthropic API or OpenAI API directly with version-pinned models.

---

## Further reading

- [Cursor documentation](https://docs.cursor.com): official reference for all features, keybindings, and configuration options
- [Cursor rules community repository](https://github.com/PatrickJS/awesome-cursorrules): community-maintained collection of `.cursor/rules/` files for common frameworks and languages
- [What is vibe coding?](/basics/what-is-vibe-coding/): foundational explainer for the AI-assisted development workflow that Cursor is built around
- [Claude Anthropic](/tools/claude-anthropic/): the model powering Cursor's default completions and Composer sessions
- [OpenAI API](/tools/openai-api/): the current GPT-5.6 lineup available as Cursor's OpenAI model option
- [Anthropic model documentation](https://docs.anthropic.com/en/docs/about-claude/models): current Claude model IDs, context windows, and pricing
- [Context engineering vs prompt engineering](/comparisons/context-engineering-vs-prompt-engineering/): why what you include in the context window matters more than how you phrase the instruction
- [Cursor changelog](https://cursor.com/changelog): weekly release notes; Cursor ships updates at a pace that makes the changelog more useful than any third-party summary
