---
title: "Letta - Agent Runtime with First-Class Memory"
description: "What Letta (formerly MemGPT) is, how its operating-system-inspired design lets an agent manage its own memory like RAM, and when a memory-native runtime beats a drop-in memory library."
date: 2026-06-14
lastmod: 2026-06-14
last_updated: 2026-06-14
categories: [Tools]
tags: ["ai-agents", "intermediate", "letta", "memgpt", "agent-memory", "runtime"]
related:
  - glossary/agent-memory
  - comparisons/mem0-vs-zep-vs-letta
  - tools/mem0
  - tools/zep
  - glossary/agent-harness
---

Letta, formerly the MemGPT project, is an agent runtime in which memory is a first-class primitive rather than a bolt-on. Instead of giving you a library to attach memory to an existing app, Letta provides the environment in which agents run, and within it an agent manages its own memory deliberately: deciding what to keep in its limited context, what to move to long-term storage, and what to pull back in when needed. The design is inspired by how an operating system manages memory.

## How it works

The core idea from MemGPT is to treat the context window like RAM and long-term storage like disk, with the agent acting as its own memory manager. When the working context fills, the agent pages information out to long-term storage and reads it back later when relevant, the same pattern an OS uses for virtual memory. Memory edits are explicit operations the agent performs, which makes its memory controllable and inspectable rather than implicit. Letta wraps this in a runtime that also handles orchestration and state, so memory management is part of how the agent runs, not an external service it calls.

## When Letta makes sense

Letta is a good fit when:
- You are building a long-running, stateful agent from the ground up and want memory and orchestration handled as one system.
- You want explicit, controllable memory operations rather than automatic, opaque extraction.
- Persistent, self-managed state over long horizons is central to the product, not an add-on.

It is more than you need when:
- You just want to add memory to an existing app, where a drop-in layer like [Mem0]({{< relref "tools/mem0" >}}) is simpler.
- Your main need is temporal or relational reasoning over evolving facts, where a graph memory like [Zep]({{< relref "tools/zep" >}}) fits better.

## Runtime versus library

This is the key distinction. [Mem0]({{< relref "tools/mem0" >}}) and [Zep]({{< relref "tools/zep" >}}) are layers you add to your own agent. Letta is the runtime your agent lives in. That makes Letta more opinionated and more capable for memory-centric, long-running agents, and heavier if all you wanted was to remember a few user preferences. It pairs naturally with the broader idea of an [agent harness]({{< relref "glossary/agent-harness" >}}): Letta is, in effect, a harness with memory at its center.

## Origins and History

Letta grew out of MemGPT, a research project that proposed treating an LLM's context window like an operating system manages memory, paging information between a working context and external storage so an agent could handle conversations and tasks far longer than a single window. The project was commercialized as Letta, with reported early-stage venture funding, and the runtime kept memory as its defining feature. Funding and naming details are as reported and evolve over time.

## Sources

1. Letta. Official site and documentation. [https://www.letta.com/](https://www.letta.com/)
2. Atlan. "Best AI agent memory frameworks 2026." [https://atlan.com/know/best-ai-agent-memory-frameworks-2026/](https://atlan.com/know/best-ai-agent-memory-frameworks-2026/)
3. "AI agent memory in 2026: Mem0 vs Zep vs Letta vs Cognee." [https://dev.to/agdex_ai/ai-agent-memory-in-2026-mem0-vs-zep-vs-letta-vs-cognee-a-practical-guide-cfa](https://dev.to/agdex_ai/ai-agent-memory-in-2026-mem0-vs-zep-vs-letta-vs-cognee-a-practical-guide-cfa)
