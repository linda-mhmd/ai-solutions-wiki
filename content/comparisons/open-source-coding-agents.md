---
title: "Open-Source Coding Agents: the Claude Code Alternatives"
description: "A 2026 map of the open-source coding agents that compete with Claude Code, Cursor, and Codex, comparing OpenCode, Aider, Cline, Goose, OpenHands, Hermes, and more."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["comparison", "ai-coding", "coding-agent", "open-source", "claude-code", "developer-tools"]
---

<figure class="bz-figure">
  <img src="/img/ai-machine/weaving-conductor-split-notext.png" alt="A split image: hands weaving glowing threads on one side, a small conductor before a bright tower on the other, suggesting building and directing." loading="lazy">
  <figcaption>An open-source coding agent is a tool you both build with and direct: you keep the code and the model choice, and the agent does the weaving.</figcaption>
</figure>

The proprietary coding tools get the headlines, but a large open-source field now does the same job: [Claude Code](/tools/claude-code/), [Cursor](/tools/cursor-ai/), and OpenAI Codex all have free, source-available alternatives you can inspect, self-host, and point at any model. This page maps that field. It covers the terminal agents, the editor extensions, the autonomous platforms, and the persistent orchestrators, and it explains which one fits which job.

Every tool here runs the same core loop: read the code, plan a change, edit files, run commands, and check the result. That shared shape is why they feel similar. What actually separates them are three axes, and if you hold these in mind the whole field sorts itself out.

- **Surface.** Where you sit: a pure terminal interface, an extension inside your IDE, or a server you reach from a chat app.
- **Model coupling.** Whether the tool is locked to one vendor's models (like Codex or Gemini CLI) or is provider-agnostic and runs against Claude, GPT, Gemini, or a local model (like OpenCode, Aider, or Cline).
- **Autonomy.** Whether it pauses for your approval on every action (Cline) or runs a task end to end in a sandbox (OpenHands).

## The shared anatomy

Under the surface differences, these agents are built from the same layers.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Interface</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Terminal (TUI)</span>
      <span class="bz-arch-chip">IDE extension</span>
      <span class="bz-arch-chip">Chat platforms</span>
      <span class="bz-arch-chip-note">Where you give instructions and review changes</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Agent loop</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Plan</span>
      <span class="bz-arch-chip">Edit</span>
      <span class="bz-arch-chip">Run</span>
      <span class="bz-arch-chip">Check</span>
      <span class="bz-arch-chip-note">The read-plan-edit-run cycle over your repository</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Tools and permissions</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">File edits</span>
      <span class="bz-arch-chip">Shell</span>
      <span class="bz-arch-chip">Browser</span>
      <span class="bz-arch-chip">MCP servers</span>
      <span class="bz-arch-chip">Approval gates</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Anthropic, OpenAI, Google</span>
      <span class="bz-arch-chip">Open-weight models</span>
      <span class="bz-arch-chip">Local runtimes</span>
      <span class="bz-arch-chip-note">Provider-agnostic tools swap this layer freely</span>
    </div>
  </div>
</div>

## The field at a glance

| | Maintainer | License | Models | Surface | Best for |
|---|---|---|---|---|---|
| **[OpenCode](/tools/opencode/)** | Anomaly (SST) | MIT | Any provider | Terminal, IDE, web | Provider choice, multi-surface |
| **[Aider](/tools/aider/)** | Aider community | Apache-2.0 | Any provider | Terminal | Git-centric pair coding |
| **[Goose](/tools/goose/)** | AAIF (Linux Foundation) | Apache-2.0 | Any provider | Desktop, CLI, API | On-machine automation |
| **Crush** | Charm | FSL-1.1-MIT | Any provider | Terminal | One fast Go binary |
| **[Cline](/tools/cline/)** | Cline Bot | Apache-2.0 | Any provider | VS Code, CLI | Reviewed edits in an IDE |
| **Continue** | continuedev | Apache-2.0 | Any provider | IDE, CLI | Autocomplete plus agent |
| **[OpenHands](/tools/openhands/)** | All-Hands-AI | MIT (mixed) | Any via LiteLLM | CLI, cloud, CI | Autonomous sandboxed tasks |
| **Codex CLI** | OpenAI | Apache-2.0 | OpenAI models | Terminal | OpenAI-native terminal work |
| **Gemini CLI** | Google | Apache-2.0 | Gemini models | Terminal | Search-grounded, big context |
| **Qwen Code** | Alibaba (QwenLM) | Apache-2.0 | Any provider | Terminal | Open Qwen-model coding |
| **[Hermes Agent](/tools/hermes-agent/)** | Nous Research | MIT | Any provider | CLI, 20+ chat apps | Persistent orchestrator |
| **Roo Code** | Roo Code, Inc. | Apache-2.0 | Any provider | VS Code | Discontinued 2026-05-15 |

## The terminal-native agents

These run in your shell and edit your local files. [OpenCode](/tools/opencode/) is provider-agnostic and unusual for its client/server split, with a headless server that a terminal, desktop, IDE, or web client can all attach to, plus a build agent and a read-only plan agent. [Aider](/tools/aider/) is the git-native option: it commits every change as a separate, reversible git commit and builds a map of your repository to work on larger codebases. [Goose](/tools/goose/) is a broader on-machine agent with a desktop app, CLI, and API, extended through MCP and packaged into shareable YAML recipes.

**Crush** is worth knowing because of a naming tangle. The original OpenCode was a Go project (`opencode-ai/opencode`); it was archived, and its author continued the work at Charm under the name Crush. So Crush is the official continuation of that original codebase: a single Go binary with strong LSP-enhanced context and mid-session model switching. The OpenCode covered on this wiki is a separate TypeScript agent that carries the `opencode` name today.

Three of the terminal agents come from the big model labs and ship as open-source CLIs, but two are tied to their maker's models. **Codex CLI** (OpenAI, Apache-2.0, written in Rust) runs against OpenAI models via a ChatGPT account or an API key. **Gemini CLI** (Google, Apache-2.0) is locked to Gemini models but adds Google Search grounding and a very large context window. **Qwen Code** (Alibaba, Apache-2.0) is the exception: it began as a fork of Gemini CLI (from version 0.8.2, then developed independently) and stays provider-agnostic, working with OpenAI, Anthropic, Gemini, and Qwen models as well as local runtimes.

## The IDE and platform agents

[Cline](/tools/cline/) lives mainly in VS Code and is built around a human in the loop: it plans in Plan mode, executes in Act mode, and asks approval for every file edit and terminal command, with checkpoints to undo its work. **Continue** is the long-standing open-source assistant across VS Code and JetBrains, offering autocomplete, chat, and an agent, plus a command-line agent called `cn`. Note one caveat: its main `continuedev/continue` repository is now read-only and marked no longer actively maintained, while its command-line agent ships from the separate `@continuedev/cli` package. Check the current state before you standardise a team on it.

[OpenHands](/tools/openhands/) sits at the autonomous end. Formerly OpenDevin, it runs the agent inside a sandboxed Docker container so it can write code, run commands, and browse safely, and it offers a CLI, a cloud service, and a GitHub Action for issue-to-pull-request automation.

**Roo Code** was a popular fork of Cline that added a multi-mode system (Code, Architect, Ask, Debug, and custom modes). Its official documentation states the extension was shut down on 2026-05-15 and points users to Cline or a community fork. Treat it as discontinued rather than a current choice.

## The orchestrator: a different layer

[Hermes Agent](/tools/hermes-agent/) from Nous Research does not belong in the same column as the others. It is a persistent, memory-backed agent that runs as a server and reaches you across more than 20 messaging platforms, and it does deep coding by delegating to OpenCode or Codex rather than editing files itself. If the tools above are the workers, Hermes is closer to a foreman that remembers context and hands out the work. See [multi-agent orchestration](/glossary/multi-agent-orchestration/) for the pattern it uses.

## How to choose

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Ask 1</span>
    <span class="bz-flow-step-name">Where do you work?</span>
    <span class="bz-flow-step-desc">Terminal points to OpenCode or Aider; an IDE points to Cline.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Ask 2</span>
    <span class="bz-flow-step-name">Which models?</span>
    <span class="bz-flow-step-desc">Locked to one vendor is fine for Codex or Gemini CLI; otherwise pick provider-agnostic.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Ask 3</span>
    <span class="bz-flow-step-name">How much autonomy?</span>
    <span class="bz-flow-step-desc">Approve each step with Cline, or run tasks end to end with OpenHands.</span>
  </div>
</div>

| Your priority | Best fit |
|---|---|
| **Provider freedom in the terminal** | OpenCode, Aider |
| **Reviewed edits inside an IDE** | Cline |
| **Autonomous, sandboxed runs** | OpenHands |
| **On-machine general automation** | Goose |
| **A single fast Go binary** | Crush |
| **An always-on assistant with memory** | Hermes Agent |
| **Staying in one vendor's ecosystem** | Codex CLI, Gemini CLI |

The open-source tools trade the polish and support of a paid product for two things that matter to many teams: you can point them at any model, including a local one, and you can read and self-host the code. If those matter less to you than a single integrated experience, the [proprietary trio](/comparisons/claude-code-vs-cursor-vs-codex/) may still be the better pick. Many teams run both: a paid tool for daily editing and an open-source agent for provider-flexible or self-hosted work.

## Further reading

- [Claude Code vs Cursor vs Codex](/comparisons/claude-code-vs-cursor-vs-codex/): the proprietary tools this open-source field competes with.
- [OpenCode](/tools/opencode/): the provider-agnostic terminal agent with a build and plan agent system.
- [Cline](/tools/cline/): the approval-gated coding agent for your IDE.
- [OpenHands](/tools/openhands/): the autonomous, sandboxed agent platform.
- [Hermes Agent](/tools/hermes-agent/): the persistent orchestrator that delegates coding to other agents.
- [What are AI agents?](/glossary/ai-agents/): the concept every tool here is built on.
- [Agentic loops](/glossary/agentic-loops/): the read-plan-edit-run cycle explained.

## Sources

- [OpenCode](https://opencode.ai/docs/), [Aider](https://aider.chat/), [Goose](https://goose-docs.ai), [Cline](https://docs.cline.bot/), [OpenHands](https://docs.openhands.dev/), and [Hermes Agent](https://hermes-agent.nousresearch.com/docs/) official documentation.
- [Crush on GitHub](https://github.com/charmbracelet/crush) and the [archived original opencode](https://github.com/opencode-ai/opencode) that continued as Crush.
- [Codex CLI](https://github.com/openai/codex), [Gemini CLI](https://github.com/google-gemini/gemini-cli), and [Qwen Code](https://github.com/QwenLM/qwen-code) repositories for license, language, and model coupling.
- [Continue](https://github.com/continuedev/continue) and [Roo Code](https://github.com/RooCodeInc/Roo-Code) repositories for their current maintenance status.
