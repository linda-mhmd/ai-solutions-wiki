---
title: "Coding Agents in 2026: Cline Open-Sources Its Runtime, Cognition Opens a Protocol"
description: "The first half of 2026 reshaped coding agents: Cline extracted and open-sourced its agent runtime and shipped a CLI, Cognition opened the Agent Client Protocol, and Cursor 3 rebuilt around parallel agents."
date: 2026-06-26
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [coding-agents, open-source, cline, cursor, devin, developer-tools]
related:
  - comparisons/open-source-coding-agents
  - tools/cline
  - tools/openhands
---

The coding-agent field moved fast in the first half of 2026, and the most consequential change was structural: the agent runtime is being decoupled from the editor. Cline extracted its core agent engine into an open-source SDK and launched a standalone CLI, Cognition rebranded Windsurf as Devin Desktop and shipped an open Agent Client Protocol, and Cursor 3 rebuilt its interface around running many agents in parallel. If you build with coding agents, the surfaces are converging on a shared shape.

## What happened

**Cline** made the clearest open-sourcing move. On 12 to 13 May 2026 it released `@cline/sdk`, an open-source TypeScript agent runtime, and a standalone Cline CLI built on it, decoupling the agent loop from the VS Code extension. On 26 June, Cline v4.0.0 rebuilt the extension itself to run entirely on that SDK. This turns a previously extension-locked agent into a reusable runtime any team can build on.

**Cognition** rebranded the Windsurf IDE as Devin Desktop on 2 June 2026 and shipped the open-source Agent Client Protocol (ACP), which lets third-party agents (Codex, Claude, OpenCode) run inside ACP-compatible editors. Devin itself stays proprietary; only the protocol is open. **Cursor 3** (2 April 2026, proprietary) rebuilt around an agent-centered interface that runs many agents in parallel across repos and environments. On the open-source side, [OpenHands](/tools/openhands/) shipped continuously through the period, and [Aider](/tools/aider/) had no major release in the window.

## Why it matters for builders

The pattern to notice is the split between the agent runtime and the interface. Cline's SDK and Cognition's ACP both say the same thing: the valuable, reusable part is the agent loop (plan, edit, run, check, with tools and permissions), and it should be portable across editors and CLIs rather than trapped in one. That is good for you, because it means less lock-in and more ability to mix a runtime you trust with an interface you like.

For choosing tools, the [open-source coding agents comparison](/comparisons/open-source-coding-agents/) maps the field on surface, model coupling, and autonomy. The 2026 shift adds a fourth axis worth weighing: whether the agent's runtime is open and reusable ([Cline](/tools/cline/) now) or bundled into a closed product (Cursor, Devin). Open protocols like ACP make it easier to move between them.

## Sources

- Cline, "Introducing the Cline SDK" (13 May 2026): https://cline.bot/blog/introducing-cline-sdk-the-upgraded-agent-runtime
- Cline v4.0.0 release (26 June 2026): https://github.com/cline/cline/releases/tag/v4.0.0
- Cognition, "Windsurf is now Devin Desktop" and the Agent Client Protocol (2 June 2026): https://devin.ai/blog/windsurf-is-now-devin-desktop
- Cursor, "Cursor 3" (2 April 2026): https://cursor.com/blog/cursor-3

## Further reading

- [Open-source coding agents compared](/comparisons/open-source-coding-agents/): the full landscape and how to choose.
- [Cline](/tools/cline/): the agent whose runtime is now open source.
- [OpenHands](/tools/openhands/): the continuously-shipping open autonomous agent.
