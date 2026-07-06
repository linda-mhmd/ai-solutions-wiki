---
title: "OpenCode"
description: "An open-source, provider-agnostic AI coding agent for the terminal, with a headless server, build and plan agents, and support for 75+ model providers."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["ai-coding", "coding-agent", "terminal", "open-source", "cli", "self-hosting"]
tool_category: "AI"
related:
  - tools/claude-code
  - tools/aider
  - tools/goose
  - glossary/agentic-loops
  - glossary/model-context-protocol
  - comparisons/open-source-coding-agents
  - comparisons/claude-code-vs-cursor-vs-codex
---

<figure class="bz-figure">
  <img src="/img/ai-machine/light-beams-junction-notext.png" alt="White light beams passing through dark-red junction machinery, suggesting requests routed to many different model providers." loading="lazy">
  <figcaption>OpenCode is a routing junction: one terminal agent that sends your coding work to any of 75+ model providers, cloud or local.</figcaption>
</figure>

OpenCode is an open-source AI coding agent that runs in your terminal. It reads your repository, edits files, runs shell commands, and completes multi-step tasks through the same read-plan-edit-run loop as [Claude Code](/tools/claude-code/), but it is not tied to any single model vendor. You point it at Anthropic, OpenAI, Google, a local model, or any of 75+ providers, and the agent behaves the same way underneath. It is released under the MIT license and is built by the team that originated it in the SST open-source ecosystem, now organised under the Anomaly org.

The distinctive design choice is a client/server split. OpenCode runs a headless server that does the real work, and the terminal interface (TUI), a desktop app, an IDE extension, and a web view are all clients that talk to it. That means the same session can be driven from more than one surface, and the agent can run on a remote machine while you attach from your laptop.

## Where OpenCode sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Clients</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Terminal (TUI)</span>
      <span class="bz-arch-chip">Desktop app (beta)</span>
      <span class="bz-arch-chip">IDE extension</span>
      <span class="bz-arch-chip">Web view</span>
      <span class="bz-arch-chip-note">All front-ends attach to one running server</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Server</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Headless API server</span>
      <span class="bz-arch-chip">opencode serve</span>
      <span class="bz-arch-chip-note">Runs the agent loop; default port 4096, can run on a remote host</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Agents</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">build (default)</span>
      <span class="bz-arch-chip">plan (restricted)</span>
      <span class="bz-arch-chip">Subagents: General, Explore, Scout</span>
      <span class="bz-arch-chip-note">Switch build and plan with Tab; call subagents with @mentions</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Tools and permissions</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">File edits</span>
      <span class="bz-arch-chip">Bash</span>
      <span class="bz-arch-chip">LSP servers</span>
      <span class="bz-arch-chip">Per-tool approval gates</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Anthropic, OpenAI, Google</span>
      <span class="bz-arch-chip">Bedrock, Vertex, Azure</span>
      <span class="bz-arch-chip">Local: Ollama, LM Studio, llama.cpp</span>
      <span class="bz-arch-chip-note">75+ providers via the AI SDK and Models.dev</span>
    </div>
  </div>
</div>

## Installation

OpenCode ships as a single command install script, and through most package managers.

```bash
# Install script (macOS, Linux, WSL)
curl -fsSL https://opencode.ai/install | bash

# Or via a package manager
npm install -g opencode-ai
brew install anomalyco/tap/opencode
```

Once installed, start it in a project directory. Running with no arguments opens the terminal interface.

```bash
cd my-project
opencode          # launch the TUI in the current repo
```

## Two ways to use it

The first pattern is an interactive session. Inside the TUI you run `/init` once to let the agent survey the project, `/connect` to authenticate a provider, and `/models` to choose the model. Press `Tab` to switch between the full-access **build** agent and the read-only **plan** agent, which asks permission before it edits files or runs commands.

```bash
# Inside the OpenCode TUI
/init                     # survey the repo and write an AGENTS.md
/connect                  # authenticate a provider (OAuth or API key)
/models                   # pick a model, e.g. anthropic/claude-sonnet-4-5
# type a task, then press Tab to flip between build and plan
```

The second pattern is a project config file, `opencode.json`, checked into the repo so the whole team shares one setup. This example pins a model, wires an API key from the environment, and sets the server port.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "provider": {
    "anthropic": { "options": { "apiKey": "{env:ANTHROPIC_API_KEY}" } }
  },
  "autoupdate": true,
  "server": { "port": 4096 }
}
```

For scripting and CI, OpenCode also runs one-shot prompts without the interface: `opencode run "write unit tests for the auth module"`.

## Typical workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Connect a model</span>
    <span class="bz-flow-step-desc">Authenticate any provider with /connect, then pick the model with /models.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Plan</span>
    <span class="bz-flow-step-desc">Use the read-only plan agent to explore the code and agree an approach first.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Build</span>
    <span class="bz-flow-step-desc">Switch to the build agent so it edits files and runs commands to make the change.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Review</span>
    <span class="bz-flow-step-desc">Inspect the diffs, approve gated actions, and commit with your normal git flow.</span>
  </div>
</div>

## How it compares

| | OpenCode | Claude Code | Crush | Aider |
|---|---|---|---|---|
| **Maintainer** | Anomaly (SST) | Anthropic | Charm | Aider community |
| **License** | MIT | Proprietary | FSL-1.1-MIT | Apache-2.0 |
| **Language** | TypeScript | Proprietary | Go | Python |
| **Model coupling** | Any provider | Anthropic only | Any provider | Any provider |
| **Interface** | TUI, desktop, IDE, web | Terminal, VS Code, desktop | Terminal only | Terminal |
| **Best for** | Multi-surface, provider choice | Deep Anthropic-native work | One fast Go binary | Git-centric pair coding |

Crush deserves a note here because of the shared name. The original OpenCode was a Go project (`opencode-ai/opencode`); it was archived, and its author continued the work at Charm under the name [Crush](https://github.com/charmbracelet/crush). The OpenCode described on this page is a separate TypeScript agent that carries the `opencode` name today. If you want a single self-contained Go binary, Crush is the closer fit; if you want the multi-client server architecture and the build/plan agent system, OpenCode is.

## When not to use it

- **You want one static binary with no runtime.** OpenCode is a TypeScript stack with a server component. Crush ships as a single Go binary with fewer moving parts.
- **You need a pinned, reproducible CLI.** OpenCode releases very frequently and enables auto-update by default. For locked toolchains, disable `autoupdate` and pin a version, or choose a slower-moving tool.
- **You are all-in on one vendor's managed features.** If you only ever use Anthropic models and want the tightest native integration, subagents, and hooks, [Claude Code](/tools/claude-code/) is built for that. OpenCode trades vendor-specific depth for provider breadth.
- **You want a graphical editor.** OpenCode is terminal-first. If you want AI inside a full IDE, [Cursor](/tools/cursor-ai/) or a VS Code extension such as [Cline](/tools/cline/) fits better.

## Further reading

- [OpenCode documentation](https://opencode.ai/docs/): official install, configuration, agents, and provider setup.
- [OpenCode on GitHub](https://github.com/sst/opencode): source, issues, and release history under the MIT license.
- [Open-source coding agents compared](/comparisons/open-source-coding-agents/): where OpenCode sits among the Claude Code alternatives.
- [Claude Code vs Cursor vs Codex](/comparisons/claude-code-vs-cursor-vs-codex/): the proprietary tools OpenCode competes with.
- [Aider](/tools/aider/): the git-centric terminal agent, another provider-agnostic option.
- [Agentic loops](/glossary/agentic-loops/): the read-plan-edit-run cycle every coding agent runs.

## Sources

- [OpenCode documentation](https://opencode.ai/docs/): definition, install commands, build and plan agents, config schema, provider list.
- [OpenCode on GitHub](https://github.com/sst/opencode): MIT license, TypeScript, `opencode serve` headless server (repo redirects to the anomalyco org after the maintainers' rename).
- [Crush on GitHub](https://github.com/charmbracelet/crush): Charm's terminal agent, FSL-1.1-MIT, Go.
- [Original opencode-ai/opencode](https://github.com/opencode-ai/opencode): archived, with the official notice that the project continued as Crush.
