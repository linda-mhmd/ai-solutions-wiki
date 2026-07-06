---
title: "Goose"
description: "An open-source, on-machine AI agent with a desktop app, CLI, and API that extends through MCP, works with any LLM, and captures workflows as shareable recipes."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["ai-agent", "coding-agent", "open-source", "mcp", "cli", "automation"]
tool_category: "AI"
related:
  - tools/opencode
  - tools/claude-code
  - glossary/model-context-protocol
  - glossary/agentic-loops
  - comparisons/open-source-coding-agents
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/gears-neural-wires-notext.png" alt="Interlocking gears laced with glowing neural wires, suggesting an agent that drives real tools through many connected extensions." loading="lazy">
  <figcaption>Goose runs the machinery on your own box: an on-machine agent that drives real tools through MCP extensions.</figcaption>
</figure>

Goose is an open-source AI agent that runs on your own machine as a desktop app, a command-line tool, and an embeddable API. It goes beyond suggesting code: it installs dependencies, executes commands, edits files, and tests its work locally. It extends through the [Model Context Protocol](/glossary/model-context-protocol/), so the same agent can reach databases, APIs, browsers, and services through a growing set of MCP extensions. It is released under the Apache-2.0 license and is written mostly in Rust.

Goose was created by Block and is now governed by the Agentic AI Foundation (AAIF) at the Linux Foundation, a vendor-neutral, community-run home. The project moved to the `aaif-goose` organisation, and its documentation now lives at goose-docs.ai. It is a general-purpose agent rather than a coding-only tool, which makes it useful for research, data work, and automation as well as writing software.

## Where Goose sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Interfaces</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Desktop app</span>
      <span class="bz-arch-chip">CLI</span>
      <span class="bz-arch-chip">API</span>
      <span class="bz-arch-chip-note">macOS, Linux, and Windows</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Agent core</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Planning and tool-calling loop</span>
      <span class="bz-arch-chip">Runs locally</span>
      <span class="bz-arch-chip-note">Installs, executes, edits, and tests on your machine</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Extensions</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">MCP servers</span>
      <span class="bz-arch-chip">Built-in, command-line, remote</span>
      <span class="bz-arch-chip">Recipes (portable YAML)</span>
      <span class="bz-arch-chip-note">Connect databases, APIs, browsers, GitHub, and more</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Anthropic, OpenAI, Google</span>
      <span class="bz-arch-chip">Azure, Bedrock, OpenRouter</span>
      <span class="bz-arch-chip">Local: Ollama</span>
      <span class="bz-arch-chip-note">Model-agnostic, 15+ providers</span>
    </div>
  </div>
</div>

## Installation

Goose installs as a command-line tool through an official script. The desktop app is a separate download from the releases page.

```bash
curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
```

After installing, configure a model provider before your first run.

```bash
goose configure    # choose "Configure Providers", pick a provider, enter an API key
```

## Two ways to use it

The first pattern is an interactive session. You start a session, work with the agent, and resume it later where you left off.

```bash
goose session        # start a new session
goose session -r     # resume the previous session
```

The second pattern is adding an MCP extension so Goose can reach a new system. You can add one interactively, or load it directly when starting a session.

```bash
# load a built-in extension and an MCP server at launch
goose session --with-builtin "developer" \
              --with-extension "uvx mcp-server-fetch"
```

For repeatable work, Goose captures a task as a **recipe**: a portable YAML file you can share with your team and run in CI. A minimal recipe needs a title, a description, and either instructions or a prompt.

```yaml
version: "1.0.0"
title: "Summarize open issues"
description: "Fetch and summarize this week's open GitHub issues"
prompt: "List open issues opened in the last 7 days and group them by label"
settings:
  goose_provider: "anthropic"
```

## Typical workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Configure</span>
    <span class="bz-flow-step-desc">Run goose configure to set a model provider and API key.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Extend</span>
    <span class="bz-flow-step-desc">Add MCP extensions so the agent can reach your tools and data.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Run a session</span>
    <span class="bz-flow-step-desc">Ask Goose to do the work; it executes and tests locally on your machine.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Capture a recipe</span>
    <span class="bz-flow-step-desc">Save the workflow as YAML to share with the team or run in CI.</span>
  </div>
</div>

## How it compares

| | Goose | OpenCode | Cline | Claude Code |
|---|---|---|---|---|
| **Maintainer** | AAIF (Linux Foundation) | Anomaly (SST) | Cline Bot | Anthropic |
| **License** | Apache-2.0 | MIT | Apache-2.0 | Proprietary |
| **Surface** | Desktop, CLI, API | Terminal, IDE, web | VS Code, CLI | Terminal, VS Code |
| **Scope** | General-purpose agent | Coding agent | Coding agent | Coding agent |
| **Extends via** | MCP plus recipes | MCP | MCP | MCP |
| **Best for** | On-machine automation | Provider-agnostic coding | Reviewed IDE edits | Anthropic-native depth |

## When not to use it

- **You want a managed cloud service.** Goose runs on your machine, so you own setup, secrets, and sandboxing. If you want a hosted agent with no local footprint, a cloud offering suits better.
- **You only want one model in one terminal.** Goose is a broad, general-purpose agent. For a narrow single-vendor coding CLI, [Claude Code](/tools/claude-code/) or a lighter tool is less overhead.
- **You cannot grant local execution.** Goose installs and runs commands on your machine. In environments where an agent cannot have that access, it is the wrong fit.
- **You need per-edit approval in an editor.** For a reviewed, diff-by-diff IDE workflow, [Cline](/tools/cline/) is designed around that gate.

## Further reading

- [Goose documentation](https://goose-docs.ai): official install, providers, extensions, and recipes.
- [Goose on GitHub](https://github.com/aaif-goose/goose): source and releases under the Apache-2.0 license.
- [Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation): the Linux Foundation home that now governs Goose.
- [Open-source coding agents compared](/comparisons/open-source-coding-agents/): where Goose sits among the alternatives.
- [What is the Model Context Protocol?](/glossary/model-context-protocol/): the standard Goose uses for extensions.

## Sources

- [Goose documentation](https://goose-docs.ai): definition, install, session and provider configuration, extensions, and recipes.
- [Goose on GitHub](https://github.com/aaif-goose/goose): Apache-2.0 license, Rust, and the move from Block to the `aaif-goose` organisation.
- [Linux Foundation announces the Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation): the governance move for Goose.
