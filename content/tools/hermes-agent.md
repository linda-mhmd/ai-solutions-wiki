---
title: "Hermes Agent"
description: "Nous Research's open-source, self-improving AI agent that runs as a persistent process, remembers across sessions, and reaches you from the terminal or 20+ messaging platforms."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["ai-agent", "coding-agent", "open-source", "persistent-memory", "orchestration", "nous-research"]
tool_category: "AI"
related:
  - tools/opencode
  - tools/claude-code
  - glossary/agent-memory
  - glossary/agentic-loops
  - glossary/multi-agent-orchestration
  - glossary/model-context-protocol
  - comparisons/open-source-coding-agents
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/hub-spokes-orchestration-notext.png" alt="A mechanical hub with copper arms radiating outward, suggesting one agent coordinating many channels and tools." loading="lazy">
  <figcaption>Hermes is a hub, not a single tool: one persistent agent that reaches you across many channels and delegates work to many tools.</figcaption>
</figure>

Hermes Agent is an open-source AI agent from Nous Research that runs as a persistent process on a server, a GPU box, or a serverless backend, rather than as a one-off command in your terminal. It keeps a memory that survives across sessions, it writes and improves its own skills as it works, and you reach it either from a terminal or from more than 20 messaging platforms through a single gateway. It is released under the MIT license and is written mostly in Python.

Hermes is not primarily a code editor. It is closer to a long-running assistant that *orchestrates* other tools, including the coding agents on this wiki. Its official skills include delegating a coding task to [OpenCode](/tools/opencode/) or to OpenAI Codex, which it drives through its terminal tools. That places Hermes one layer above a tool like [Claude Code](/tools/claude-code/): where a coding agent runs the read-plan-edit-run loop itself, Hermes decides what to work on, remembers the context, and hands the editing to a specialist.

## Where Hermes sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Gateway and platforms</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Terminal (CLI, TUI)</span>
      <span class="bz-arch-chip">Telegram, Discord, Slack</span>
      <span class="bz-arch-chip">WhatsApp, Signal, Email, SMS</span>
      <span class="bz-arch-chip-note">One gateway process serves the CLI and 20+ messaging platforms</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Agent core</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Reasoning and tool-calling loop</span>
      <span class="bz-arch-chip">delegate_task subagents</span>
      <span class="bz-arch-chip-note">Spawns isolated subagents for parallel work, background tasks supported</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Memory</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Persistent memory</span>
      <span class="bz-arch-chip">Cross-session search (FTS5)</span>
      <span class="bz-arch-chip">User modeling (Honcho)</span>
      <span class="bz-arch-chip-note">Searches its own past conversations and builds a model of you</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Skills</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Procedural knowledge docs</span>
      <span class="bz-arch-chip">skill_manage tool</span>
      <span class="bz-arch-chip-note">Creates and edits its own skills; compatible with the agentskills.io standard</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Tools and backends</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">MCP servers</span>
      <span class="bz-arch-chip">Web search, image, TTS, browser</span>
      <span class="bz-arch-chip">Backends: local, docker, ssh, singularity, modal, daytona</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Nous Portal, OpenRouter</span>
      <span class="bz-arch-chip">Anthropic, OpenAI, Google, Bedrock</span>
      <span class="bz-arch-chip">Local: Ollama, vLLM, SGLang, llama.cpp</span>
    </div>
  </div>
</div>

## Installation

Hermes installs with a single script on Linux, macOS, WSL2, and Android (Termux), or with one PowerShell command on native Windows.

```bash
# Linux, macOS, WSL2, Android (Termux)
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

```powershell
# Native Windows PowerShell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

After reloading your shell, log in and start the agent. The `--portal` flag sets Nous Portal as the model provider and enables the tool gateway.

```bash
source ~/.bashrc          # or source ~/.zshrc
hermes setup --portal     # OAuth login and first-run configuration
hermes                    # start the CLI, or: hermes --tui
```

## Two ways to use it

The first pattern is the messaging gateway. You configure a platform once, start the gateway, and then talk to the agent from your chat app of choice. The same slash commands work across every channel.

```bash
hermes gateway setup      # interactive platform configuration
hermes gateway start      # start the gateway, then message the bot
# in any conversation, shared slash commands work:
#   /skills    list and run skills
#   /model     switch the model
#   /new       start a fresh conversation
```

The second pattern is delegation. Hermes carries a bundled skill for handing a coding task to OpenCode. It drives the OpenCode CLI through its terminal tool, so Hermes keeps the memory and context while OpenCode does the file edits.

```text
terminal(command="opencode run 'Add retry logic to API calls and update tests'",
         workdir="~/project")
```

Skills can also be invoked directly and stacked. For example, `/github-pr-workflow /test-driven-development fix issue #123 and open a PR` chains two skills into one instruction.

## Typical workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Deploy</span>
    <span class="bz-flow-step-desc">Install Hermes on a VPS or serverless backend so it runs continuously.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Connect channels</span>
    <span class="bz-flow-step-desc">Wire up the gateway to Telegram, Slack, email, or the terminal.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Delegate and remember</span>
    <span class="bz-flow-step-desc">Ask for work; Hermes recalls context and delegates coding to OpenCode or Codex.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Learn</span>
    <span class="bz-flow-step-desc">It writes new skills from the task and persists what it learned for next time.</span>
  </div>
</div>

## How it compares

Hermes belongs in a different column from the terminal coding agents. It is a persistent, memory-backed orchestrator, not a stateless editor you launch per task.

| | Hermes Agent | Claude Code | OpenCode |
|---|---|---|---|
| **Category** | Persistent orchestrating agent | Coding agent | Coding agent |
| **Runs as** | Long-running server process | Per-session in your terminal | Per-session, with a server |
| **Memory** | Persistent across sessions | Per-session context | Per-session context |
| **Reach** | 20+ chat platforms plus CLI | Terminal, VS Code, desktop | Terminal, desktop, IDE, web |
| **Does coding by** | Delegating to OpenCode or Codex | Editing files itself | Editing files itself |
| **Best for** | An always-on assistant that coordinates tools | Deep Anthropic-native coding | Provider-agnostic coding |

## When not to use it

- **You want an in-editor coding assistant.** Hermes runs as a server process and delegates editing to other agents. For file-by-file work in your IDE, use a coding agent such as [Cline](/tools/cline/) or a terminal agent such as [OpenCode](/tools/opencode/) directly.
- **You want the single best code editor.** Hermes orchestrates specialists rather than being one. Deep coding still runs through OpenCode, Codex, or [OpenHands](/tools/openhands/).
- **You do not want to run infrastructure.** The gateway means managing platform tokens and a VPS or serverless backend. A local per-session CLI has far less operational overhead.
- **You only need a quick one-shot task.** The value of Hermes is persistence and memory over time. For a single edit, the setup is more than the job requires.

## Further reading

- [Hermes Agent documentation](https://hermes-agent.nousresearch.com/docs/): official quickstart, skills, tools, and provider setup.
- [Hermes Agent on GitHub](https://github.com/NousResearch/hermes-agent): source and releases under the MIT license.
- [OpenCode](/tools/opencode/): the terminal coding agent Hermes delegates editing to.
- [Open-source coding agents compared](/comparisons/open-source-coding-agents/): where Hermes fits among the alternatives.
- [What is agent memory?](/glossary/agent-memory/): the persistence that makes Hermes different.
- [Multi-agent orchestration](/glossary/multi-agent-orchestration/): the pattern Hermes uses to coordinate specialist agents.

## Sources

- [Hermes Agent documentation](https://hermes-agent.nousresearch.com/docs/): definition, install, gateway, skills, tools, terminal backends, and providers.
- [Hermes Agent on GitHub](https://github.com/NousResearch/hermes-agent): MIT license, Python, and release metadata (v0.18.0, tag v2026.7.1, published 2026-07-01).
- [OpenCode delegation skill](https://hermes-agent.nousresearch.com/docs/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-opencode): the bundled skill for handing coding tasks to OpenCode.
