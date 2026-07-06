---
title: "Cline"
description: "An open-source coding agent for your IDE and terminal that plans before it acts and asks approval for every file edit and command, keeping a human in the loop."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["ai-coding", "coding-agent", "vs-code", "open-source", "human-in-the-loop", "mcp"]
tool_category: "AI"
related:
  - tools/opencode
  - tools/claude-code
  - tools/cursor-ai
  - glossary/model-context-protocol
  - glossary/agentic-loops
  - comparisons/open-source-coding-agents
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lever-chain-mechanism-notext.png" alt="A hand pushing a lever that drives a mechanical chain, suggesting a human approving each automated step." loading="lazy">
  <figcaption>Cline keeps a hand on the lever: it proposes a plan and waits for your approval before every file edit and command.</figcaption>
</figure>

Cline is an open-source coding agent that runs in your IDE and terminal. It reads and writes files, runs terminal commands, uses a browser, and builds features through conversation, but it does none of that silently. Every file edit and every terminal command surfaces for your approval first, so you always see and confirm what changes. It is released under the Apache-2.0 license by Cline Bot Inc. and is written in TypeScript.

Its most-used surface is the Visual Studio Code extension, where edits appear in a diff view you approve or reject. Cline has since grown a command-line interface, a JetBrains plugin, and a Kanban board, all built on the same agent core. Cline is model-agnostic: you bring your own API key for a cloud or local model, and it also offers hosted billing options if you prefer not to manage keys.

## Where Cline sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Interfaces</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">VS Code extension</span>
      <span class="bz-arch-chip">CLI</span>
      <span class="bz-arch-chip">JetBrains plugin</span>
      <span class="bz-arch-chip">Kanban board</span>
      <span class="bz-arch-chip-note">All share one agent core</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Control</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Plan mode and Act mode</span>
      <span class="bz-arch-chip">Per-action approval</span>
      <span class="bz-arch-chip">Checkpoints</span>
      <span class="bz-arch-chip-note">Approve every edit and command; roll back with checkpoints</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Tools</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">File read and write</span>
      <span class="bz-arch-chip">Terminal execution</span>
      <span class="bz-arch-chip">Browser</span>
      <span class="bz-arch-chip">MCP servers</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Anthropic, OpenAI, Google</span>
      <span class="bz-arch-chip">Bedrock, Azure, Vertex, Groq</span>
      <span class="bz-arch-chip">Local: Ollama, LM Studio</span>
      <span class="bz-arch-chip-note">Bring your own key, or hosted billing</span>
    </div>
  </div>
</div>

## Installation

Cline installs from the Visual Studio Marketplace as a VS Code extension. There is also an official command-line interface.

```bash
# Command-line interface
npm i -g cline
```

For the editor extension, search for "Cline" in the VS Code Extensions view, or install the extension id `saoudrizwan.claude-dev`. A JetBrains plugin and a Kanban web board (`npx kanban`) are also available.

## Two ways to use it

The first pattern is plan then act. You start a task in **Plan mode**, where Cline explores the codebase, asks clarifying questions, and lays out a strategy without changing anything. Once you agree, you switch to **Act mode** and Cline executes the plan, surfacing each edit for approval.

```text
# In Plan mode
"Explore how auth is handled and propose where to add refresh tokens."
# Cline reads files, asks questions, and writes a plan.

# Switch to Act mode
"Looks good, implement it."
# Cline edits files and runs commands, one approval at a time.
```

The second pattern is connecting an [MCP server](/glossary/model-context-protocol/) so Cline can reach systems beyond your files, such as a database or a cloud API. Once attached, the agent can query those systems as part of a task, still gated by your approvals.

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}
```

## Typical workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Plan</span>
    <span class="bz-flow-step-desc">In Plan mode, Cline explores the code and proposes a strategy.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Approve the plan</span>
    <span class="bz-flow-step-desc">You review and agree the approach before any change is made.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Act with approvals</span>
    <span class="bz-flow-step-desc">In Act mode, Cline edits files and runs commands, each one confirmed by you.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Checkpoint</span>
    <span class="bz-flow-step-desc">Changes are tracked as checkpoints, so you can undo the agent's work.</span>
  </div>
</div>

## How it compares

| | Cline | Cursor | OpenCode | Claude Code |
|---|---|---|---|---|
| **Type** | Open-source agent extension | AI-native editor | Terminal agent | Terminal agent |
| **License** | Apache-2.0 | Proprietary | MIT | Proprietary |
| **Primary surface** | VS Code, CLI | Full editor | Terminal | Terminal, VS Code |
| **Model coupling** | Any provider | Multiple | Any provider | Anthropic only |
| **Approval model** | Every action gated | Configurable | Plan agent gates | Configurable |
| **Best for** | Reviewed edits in your IDE | Everyday visual editing | Provider-agnostic terminal | Anthropic-native depth |

## When not to use it

- **You want fully unattended automation.** Cline is built around per-action approval. For hands-off, long-running jobs where you cannot review each step, an autonomous agent such as [OpenHands](/tools/openhands/) fits better.
- **You cannot grant local file and shell access.** Cline runs inside your IDE and terminal with real access to your machine. In locked-down environments that is not allowed.
- **You want a pure terminal tool.** If you live in the command line and do not want an editor extension, [Aider](/tools/aider/) or [OpenCode](/tools/opencode/) is a closer fit.
- **You want one vendor's managed stack.** If you only use Anthropic models and want native subagents and hooks, [Claude Code](/tools/claude-code/) is purpose-built for that.

## Further reading

- [Cline documentation](https://docs.cline.bot/): official setup, plan and act modes, MCP, and provider configuration.
- [Cline on GitHub](https://github.com/cline/cline): source and issues under the Apache-2.0 license.
- [Open-source coding agents compared](/comparisons/open-source-coding-agents/): where Cline sits among the alternatives.
- [Cursor](/tools/cursor-ai/): the AI-native editor Cline is often compared against.
- [What is the Model Context Protocol?](/glossary/model-context-protocol/): the standard Cline uses to reach external systems.
- [Agentic loops](/glossary/agentic-loops/): the read-plan-edit-run cycle behind every coding agent.

## Sources

- [Cline documentation](https://docs.cline.bot/): definition, plan and act modes, approvals, checkpoints, MCP, and supported providers.
- [Cline on GitHub](https://github.com/cline/cline): Apache-2.0 license, TypeScript, VS Code and CLI surfaces, and provider list.
