---
title: "Agent Memory"
description: "How an AI agent retains and recalls information beyond a single context window: short-term versus long-term, episodic versus semantic, and vector versus graph memory, plus the tools that provide it."
date: 2026-06-14
lastmod: 2026-06-14
last_updated: 2026-06-14
categories: [Glossary]
tags: ["ai-agents", "intermediate", "agent-memory", "memory", "context-engineering", "llm"]
related:
  - comparisons/mem0-vs-zep-vs-letta
  - glossary/context-engineering
  - glossary/agent-harness
  - tools/mem0
  - tools/zep
  - tools/letta
  - patterns/memory-pattern-ai
---

Agent memory is how an AI agent retains and recalls information beyond a single context window. A language model by itself is stateless: once a conversation scrolls out of its window, it is gone. Memory is the layer that lets an agent remember a user's preferences across sessions, pick up a long task where it left off, and accumulate knowledge over time. It is what separates a chatbot that forgets you every time from an assistant that knows you.

## Short-term versus long-term

- **Short-term memory** is the information held in the model's context window right now: the current conversation, recent tool results, the working state of the task. It is fast and immediate but bounded by the window size, and it disappears when the window is cleared.
- **Long-term memory** is information persisted outside the window, in a database, and retrieved back into context when relevant. This is what survives across sessions and lets an agent build a lasting picture of a user or a project.

Long-term memory only helps if the right pieces are read back into the window at the right time, which is why memory and [context engineering]({{< relref "glossary/context-engineering" >}}) are two sides of the same problem.

## Episodic versus semantic

- **Episodic memory** records specific events: this user asked for X on this date, this task failed for this reason. It is the agent's log of what happened.
- **Semantic memory** holds distilled facts and knowledge: this user prefers metric units, this project uses Postgres. It is what the agent has learned, abstracted away from any single event.

Mature systems use both: episodic memory captures raw interactions, and a summarization step distills them into stable semantic facts.

## Vector versus graph memory

- **Vector memory** stores text as embeddings and retrieves by similarity. It is simple and fast, and it is the most common approach, but it is weak at relationships and at time: it can find "things like this" but struggles with "how this fact changed."
- **Graph memory** stores entities and the relationships between them, often with a temporal dimension that records when each fact was true. It is better for reasoning over connected facts and over how knowledge evolves, at the cost of more complexity.

The right choice depends on the workload: vector for straightforward recall and personalization, graph for evolving facts and relationships that matter.

## Why it matters

Memory is what makes personalization, continuity, and long-horizon work possible. Without it, every session starts from zero, and any task longer than one context window falls apart. With it, an agent can stay coherent over thousands of steps by keeping notes outside the window and reading them back as needed, a technique central to [context engineering]({{< relref "glossary/context-engineering" >}}) and to any serious [agent harness]({{< relref "glossary/agent-harness" >}}).

## Tools

A set of dedicated memory frameworks emerged to provide this layer so teams do not build it from scratch: [Mem0]({{< relref "tools/mem0" >}}) for drop-in persistent memory, [Zep]({{< relref "tools/zep" >}}) for temporal knowledge-graph memory, and [Letta]({{< relref "tools/letta" >}}) for an agent runtime with memory as a first-class primitive. For a direct comparison, see [Mem0 vs Zep vs Letta]({{< relref "comparisons/mem0-vs-zep-vs-letta" >}}).

## Sources

1. Atlan. "Best AI agent memory frameworks 2026." [https://atlan.com/know/best-ai-agent-memory-frameworks-2026/](https://atlan.com/know/best-ai-agent-memory-frameworks-2026/)
2. "AI agent memory in 2026: Mem0 vs Zep vs Letta vs Cognee, a practical guide." [https://dev.to/agdex_ai/ai-agent-memory-in-2026-mem0-vs-zep-vs-letta-vs-cognee-a-practical-guide-cfa](https://dev.to/agdex_ai/ai-agent-memory-in-2026-mem0-vs-zep-vs-letta-vs-cognee-a-practical-guide-cfa)
3. Anthropic. "Effective context engineering for AI agents." [https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
