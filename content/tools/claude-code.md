---
title: "Claude Code - Anthropic's Terminal Coding Agent"
description: "Claude Code is Anthropic's agentic coding tool that lives in your terminal and IDE, edits and runs real code, and is included with a Pro or Max subscription or billed through the API."
date: 2026-06-25
categories: [Tools]
tags: ["ai-ml", "claude", "claude-code", "coding-agent", "developer-tools", "cli"]
tool_category: "AI"
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/terminal-interface.png" alt="A dark industrial terminal glowing with a red screen, representing a command-line coding agent that works inside your shell." loading="lazy">
  <figcaption>Claude Code lives where developers already work: the terminal and the IDE, talking straight to the model with no extra backend in between.</figcaption>
</figure>

Claude Code is Anthropic's agentic coding tool. It runs in your terminal, reads your whole project, and edits files, runs commands, and works through multi-step tasks while you watch. It solves the problem of context-switching between a chat window and your editor: instead of copying snippets back and forth, you hand Claude Code a task in plain language and it works directly in your repository. It is the same agentic engine that powers [Claude Cowork](/tools/claude-cowork/) for knowledge work, pointed at code.

## Where it lives

Claude Code is primarily a program you run on your own machine, and it connects straight to the Claude model API with no backend server or remote code index in between. It can also run as a cloud session on Anthropic-managed infrastructure (or your organization's self-hosted environment), started from the browser, phone, desktop app, or terminal; cloud sessions are available on Pro, Max, and Team plans and for eligible Enterprise seats.

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
      <span class="bz-arch-chip">Claude Opus 5.5</span>
      <span class="bz-arch-chip">Claude Sonnet 5</span>
      <span class="bz-arch-chip">Claude Fable 5.1</span>
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

Anthropic's recommended install is the native installer, which updates itself in the background. Homebrew (`brew install --cask claude-code`), WinGet (`winget install Anthropic.ClaudeCode`), Linux package managers, and npm (`npm install -g @anthropic-ai/claude-code`) are also supported. Once installed, it runs inside any project directory.

```bash
# Install once (macOS, Linux, WSL)
curl -fsSL https://claude.ai/install.sh | bash

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

## Recent changes

- **Projects as multi-agent cloud threads (17 September 2026).** Anthropic relaunched Projects in Claude Code as a way to run several agents under one goal. A coordinator scopes the request and delegates it to parallel **threads**; each thread is a full Claude Code **cloud session working on its own git branch and copy of the repo**, and can split its work further with subagents. Where threads touch the same code, the overlap surfaces as an ordinary merge conflict. Threads run in the cloud at launch, with local tools and code support described as coming soon. It is a beta for select Pro and Max subscribers (Team and Enterprise later), and Anthropic warns that because every thread is a full session, projects reach usage limits faster. This is distinct from the older claude.ai Projects workspaces. Unlike the local terminal flow shown above, this mode runs on Anthropic's infrastructure rather than your machine. See [Claude Code relaunches Projects as coordinated parallel cloud threads](/news/claude-code-projects-cloud-threads/).
- **Claude Opus 5.5 (22 September 2026).** The new Opus model is available in Claude Code, including fast mode (up to 2.5x faster output at $8/$40 per million tokens on API billing). See [Claude Opus 5.5 launches at $4/$20, with thinking always on](/news/claude-opus-5-5/) and [Claude by Anthropic](/tools/claude-anthropic/) for the full lineup and pricing.
- **Plugin4Shell (disclosed 17-18 September 2026).** AIR Security disclosed a zero-click remote-code-execution flaw affecting Claude Code, OpenAI Codex, GitHub Copilot and Gemini CLI: an attacker who controls a plugin repository could create a branch named like the marketplace's pinned 40-character commit SHA, so the agent's background plugin update checked out malicious code while appearing to honour the pin. According to AIR, **Anthropic fixed it in Claude Code 2.1.179** (released 16 June 2026), and no in-the-wild exploitation is known. If you run an older build or install plugins from Bitbucket, GitLab or self-hosted marketplaces, update Claude Code and review which plugins auto-update. See [Plugin4Shell: a zero-click plugin flaw in coding agents](/news/plugin4shell-coding-agents-rce/).

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
| **[Claude Cowork](/tools/claude-cowork/)** | Claude app (desktop, and since September 2026 web and mobile) | Autonomous multi-step knowledge work | Paid plans (Pro and Max first for the merged app) |
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
- [Set up Claude Code (Anthropic docs)](https://code.claude.com/docs/en/setup): install methods, release channels, and updates
- [Use Claude Code in the cloud (Anthropic docs)](https://code.claude.com/docs/en/claude-code-on-the-web): cloud sessions and plan availability
- [Use Claude Code with your Pro or Max plan (Anthropic Help Center)](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan): what each plan covers
- [Projects redesigned: from folder to conversation (Anthropic, 17 September 2026)](https://claude.com/blog/projects-redesigned): Anthropic's announcement of the Projects beta
- [Claude Code relaunches Projects to manage multiple AI agents in the cloud (The Verge, 17 September 2026)](https://www.theverge.com/ai-artificial-intelligence/997134/anthropic-claude-code-projects): threads, coordinator, and beta scope
- [Claude Code revamps projects so you can work and pay in parallel (The Register, 18 September 2026)](https://www.theregister.com/ai-and-ml/2026/09/18/claude-code-revamps-projects-so-you-can-work-and-pay-in-parallel/5297532): usage-limit warning and plan availability
- [Introducing Claude Opus 5.5 (Anthropic, 22 September 2026)](https://www.anthropic.com/claude-opus-5-5): the new Opus model and fast mode in Claude Code
- [Critical flaw in Claude Code, OpenAI Codex, GitHub Copilot and Gemini CLI (heise, 21 September 2026)](https://www.heise.de/en/news/Critical-flaw-in-Claude-Code-OpenAI-Codex-GitHub-Copilot-and-Gemini-CLI-11460259.html): Plugin4Shell and the Claude Code 2.1.179 fix
- [Plugin4Shell zero-click RCE hits Claude Code, Codex, Copilot and Gemini CLI (Cyber Security News, 18 September 2026)](https://cybersecuritynews.com/plugin4shell-zero-click-rce/): technical details of the SHA-pinning bypass
