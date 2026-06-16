---
title: "Context Engineering vs Prompt Engineering"
description: "How context engineering differs from prompt engineering, why the framing shifted in 2025 and 2026, and when each one is the thing you should actually be working on."
date: 2026-06-14
lastmod: 2026-06-14
last_updated: 2026-06-14
categories: [Comparisons]
tags: ["ai-ml", "intermediate", "context-engineering", "prompt-engineering", "comparison", "agents"]
related:
  - glossary/context-engineering
  - glossary/prompt-engineering
  - glossary/agent-harness
  - patterns/prompt-engineering-patterns
  - patterns/context-window-management
---

Prompt engineering and context engineering are often treated as competitors. They are not. Prompt engineering is a part of context engineering. Prompt engineering shapes the instruction you give a model, what to do. Context engineering shapes the entire set of tokens the model sees, what it has to work with. For a single question, the prompt is most of the battle. For an agent running over many steps, the prompt is a small slice and the management of everything else dominates the outcome.

## The core difference

| Dimension | Prompt engineering | Context engineering |
|---|---|---|
| Focus | The instruction ("what to do") | The whole information ecosystem ("what the model has to work with") |
| Scope | Mostly single-turn | Iterative, across a multi-step run |
| What you tune | Wording, examples, format, role | Retrieval, memory, compaction, tool results, history, plus the prompt |
| Main failure it fixes | The model misunderstands the request | The window fills with low-signal tokens and quality or cost degrades |
| Mental model | Write a clear instruction | Manage a finite attention budget |
| Relationship | A subset | The superset |

## When prompt engineering is the job

If you are sending one request and getting one answer, with all the needed information already in the prompt, prompt engineering is most of what matters. Classification, extraction, rewriting, a single well-scoped generation: clear instructions, a few good examples, and a defined output format will get you most of the way. Reach for [prompt engineering patterns]({{< relref "patterns/prompt-engineering-patterns" >}}) here.

## When context engineering is the job

The moment a system needs external knowledge, persistent state, or several steps, the bottleneck moves. Now the questions are which documents to retrieve and when, what to remember across turns, how to summarize history so the window does not overflow, and which tool outputs are worth keeping. A perfectly worded prompt cannot save an agent whose context is full of stale, noisy, or missing information. This is the domain of [context engineering]({{< relref "glossary/context-engineering" >}}), and it is where most production agent quality is won or lost.

The reason this matters is that a model's attention is a finite resource. Anthropic describes "context rot": as the number of tokens in the window grows, the model's ability to accurately recall any one of them tends to fall. Long-running agents push past a single window entirely, so the practical toolkit is about deciding what survives. The recurring techniques are compaction (summarize the run so far and continue from the condensed version), structured note-taking (write durable state to an external file the agent can re-read after a reset), sub-agents (hand a focused subtask to a fresh context and keep only the distilled result), and just-in-time retrieval (pull information with tools at the moment it is needed rather than pre-loading everything). See [context window management]({{< relref "patterns/context-window-management" >}}) for the mechanics, and the [agent harness]({{< relref "glossary/agent-harness" >}}) for the surrounding loop that applies them.

## How they work together

In practice you do both. Context engineering decides what set of tokens the model sees on a given turn; prompt engineering decides how the instruction within that set is written. A strong agent has well-curated context and a well-written instruction. Treating prompt engineering as the whole job is the most common reason an agent that demos well falls apart over a long task: the prompt was fine, the context management was not.

## Sources

1. Anthropic. "Effective context engineering for AI agents." [https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
2. Anthropic. "Effective harnesses for long-running agents." [https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
3. Elastic Search Labs. "Context engineering vs prompt engineering." [https://www.elastic.co/search-labs/blog/context-engineering-vs-prompt-engineering](https://www.elastic.co/search-labs/blog/context-engineering-vs-prompt-engineering)
4. The Decoder. "Anthropic claims context engineering beats prompt engineering when managing AI agents." [https://the-decoder.com/anthropic-claims-context-engineering-beats-prompt-engineering-when-managing-ai-agents/](https://the-decoder.com/anthropic-claims-context-engineering-beats-prompt-engineering-when-managing-ai-agents/)
