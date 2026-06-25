---
title: "Claude Code - Anthropic's Terminal Coding Agent"
description: "Claude Code is Anthropic's agentic coding tool that lives in your terminal and IDE, edits and runs real code, and is included with a Pro or Max subscription or billed through the API."
date: 2026-06-25
categories: [Tools]
tags: ["ai-ml", "claude", "claude-code", "coding-agent", "developer-tools", "cli"]
tool_category: "AI"
last_updated: 2026-06-25
lastmod: 2026-06-25
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/terminal-interface.png" alt="A dark industrial terminal glowing with a red screen, representing a command-line coding agent that works inside your shell." loading="lazy">
  <figcaption>Claude Code lives where developers already work: the terminal and the IDE, talking straight to the model with no extra backend in between.</figcaption>
</figure>

Claude Code is Anthropic's agentic coding tool. It runs in your terminal, reads your whole project, and edits files, runs commands, and works through multi-step tasks while you watch. It solves the problem of context-switching between a chat window and your editor: instead of copying snippets back and forth, you hand Claude Code a task in plain language and it works directly in your repository. It is the same agentic engine that powers [Claude Cowork](/tools/claude-cowork/) for knowledge work, pointed at code.

## Where it lives

Claude Code is not a website. It is a program you run on your own machine, and it connects straight to the Claude model API with no backend server or remote code index in between.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Where you run it</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Terminal</span>
      <span class="bz-arch-chip">VS Code and forks</span>
      <span class="bz-arch-chip">Cursor</span>
      <span class="bz-arch-chip">JetBrains (IntelliJ, PyCharm)</span>
      <span class="bz-arch-chip">GitHub Actions</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">The agent</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Claude Code</span>
      <span class="bz-arch-chip-note">Plans a task, edits files, runs commands, checks the result</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">The model</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Claude Opus 4.8</span>
      <span class="bz-arch-chip">Claude Sonnet 4.6</span>
      <span class="bz-arch-chip-note">Reached directly over the API, no remote index</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your environment</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Local files and git</span>
      <span class="bz-arch-chip">Shell commands</span>
      <span class="bz-arch-chip">MCP tools and servers</span>
    </div>
  </div>
</div>

## Install it

Claude Code installs as a global command through npm, then runs inside any project directory.

```bash
# Install once, globally
npm install -g @anthropic-ai/claude-code

# Start an interactive session in your project
cd my-project
claude
```

## What it is for

Once a session is open, you describe work in plain language and Claude Code carries it out across your files.

```text
> explain how authentication flows through this codebase
> fix the failing test in tests/login.spec.ts, then run the suite
> add a rate limiter to the /api/upload route and update the docs
```

For automation and scripting, the headless mode runs a one-shot task and prints the result, which is useful in CI and shell pipelines.

```bash
# Headless: run a single task and print the output
claude -p "summarize the changes in the last 5 commits"
```

A typical task moves through the same loop every time, which is what makes it an [agentic loop](/glossary/agentic-loops/) rather than a single answer.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Describe</span><span class="bz-flow-step-desc">You hand Claude Code a task in plain language inside your project.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Plan</span><span class="bz-flow-step-desc">It reads the relevant files and breaks the work into concrete steps.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Act</span><span class="bz-flow-step-desc">It edits files and runs commands, asking before risky actions.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Check</span><span class="bz-flow-step-desc">It runs tests or builds, reads the output, and fixes what broke.</span></div>
</div>

## Which subscription you need

Claude Code is covered by a normal Claude subscription, so you do not pay separately for the chat apps and the coding agent.

- **Pro** (about 19 EUR per month, listed at 20 US dollars): includes Claude Code in the terminal and in supported IDEs, alongside the web, desktop, and mobile apps on one subscription.
- **Max** (about 92 or 185 EUR per month, listed at 100 or 200 US dollars): the same access with 5x or 20x the usage and priority on new models.
- **Team Premium and Enterprise**: Claude Code for organizations, with admin controls and billing.
- **API**: pay-per-token billing for automation. Since 15 June 2026, programmatic use (the Agent SDK, the `claude -p` headless command, the GitHub Actions integration, and third-party apps) draws from a separate monthly Agent SDK credit at standard API rates, rather than your interactive subscription pool.

## The Claude product family

Claude Code is one of several products built on the same models. They differ mainly in where they run and what they produce.

| | Where it lives | What it is for | Plan needed |
|---|---|---|---|
| **[Claude Code](/tools/claude-code/)** | Terminal and IDEs | Editing, running, and shipping code | Pro, Max, Team Premium, or API |
| **[Claude Design](/tools/claude-design/)** | claude.ai (Anthropic Labs) | Designing UI and documents as HTML | Pro, Max, Team, Enterprise |
| **[Claude Cowork](/tools/claude-cowork/)** | Claude Desktop app | Autonomous multi-step knowledge work | Any paid plan |
| **[Claude apps and API](/tools/claude-anthropic/)** | Web, mobile, desktop, API | Chat, analysis, building on the model | Free and up |

## When not to use it

- **You do not write or run code.** For document and file work without a terminal, [Claude Cowork](/tools/claude-cowork/) fits better.
- **You want a chat answer, not file edits.** The [Claude apps](/tools/claude-anthropic/) are the lighter choice for questions and drafting.
- **You need a visual prototype.** [Claude Design](/tools/claude-design/) produces editable interface and document layouts; Claude Code produces working code.
- **Your budget is strict and usage is heavy.** Watch the plan limits, since large agent runs consume usage quickly and programmatic runs bill at API rates.

## Further reading

- [Claude Cowork](/tools/claude-cowork/): the same agent architecture for knowledge work instead of code
- [Claude Design](/tools/claude-design/): turning conversation into editable HTML and document layouts
- [Claude by Anthropic](/tools/claude-anthropic/): the models and apps underneath all of these products
- [Claude Code vs Cursor vs Codex](/comparisons/claude-code-vs-cursor-vs-codex/): how the leading coding agents compare
- [Agentic loops](/glossary/agentic-loops/): the plan, act, and check cycle behind agent coding tools
- [Claude Code by Anthropic (official product page)](https://claude.com/product/claude-code): features, supported IDEs, and setup
- [Use Claude Code with your Pro or Max plan (Anthropic Help Center)](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan): what each plan covers
