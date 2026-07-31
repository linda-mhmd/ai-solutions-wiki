---
title: "Context Engineering"
description: "The practice of curating and maintaining the optimal set of tokens an LLM sees during inference: managing the whole information ecosystem of an agent, not just the instruction text."
date: 2026-06-14
lastmod: 2026-06-14
last_updated: 2026-06-14
categories: [Glossary]
tags: ["ai-ml", "intermediate", "context-engineering", "prompt-engineering", "agents", "llm"]
related:
  - comparisons/context-engineering-vs-prompt-engineering
  - glossary/prompt-engineering
  - glossary/agent-harness
  - glossary/agent-memory
  - glossary/tokenmaxxing
  - patterns/context-window-management
  - glossary/rag
---

Context engineering is the practice of curating and maintaining the optimal set of tokens a language model sees during inference. Where prompt engineering focuses on writing the instruction, context engineering designs and manages the entire information ecosystem the model works with on each turn: the instructions, the retrieved knowledge, the tool results, the conversation history, and the agent's own notes. As agents run over many steps, the central problem becomes managing that context state over time, and context engineering is the discipline of doing it well.

## Why it became the dominant framing

Single-turn prompting hit a ceiling once tasks needed external knowledge, persistent state, and multi-step reasoning. In a long agent run, the model's context window fills with history, tool outputs, and retrieved documents, and naively stuffing everything in degrades quality and cost. By 2025 the field had largely shifted from prompt engineering to context engineering as the framing for production agent work, adopted by model labs and framework authors alike. See [context engineering vs prompt engineering]({{< relref "comparisons/context-engineering-vs-prompt-engineering" >}}).

## The attention budget

A useful mental model is that context is a finite, precious resource. Every token you add depletes an attention budget, much like human working memory. The goal is not to give the model everything, it is to find the smallest set of high-signal tokens that make the desired outcome most likely. More context is not better context.

## Core techniques

- **Just-in-time retrieval** - store lightweight identifiers and fetch the actual data at runtime through tools, rather than pre-loading everything into the window. Related: [RAG]({{< relref "glossary/rag" >}}).
- **Compaction and summarization** - for long-horizon tasks, summarize the history and re-initialize a fresh window with the distilled state, so the agent keeps going without dragging its entire transcript along.
- **Structured note-taking** - have the agent persist notes outside the context window and read them back when needed, a simple form of external memory. See [agent memory]({{< relref "glossary/agent-memory" >}}).
- **Sub-agent architectures** - let specialist sub-agents work in clean, focused windows and return only condensed summaries to a coordinator, keeping any single window small.
- **Tool result curation** - decide what of a tool's output actually enters the context, trim noisy results, and keep tools self-contained and clearly described so their outputs stay compact.
- **Window management** - track how full the window is and apply the techniques above before quality starts to drop. See [context window management]({{< relref "patterns/context-window-management" >}}).

## Where it fits

Context engineering is one of the central jobs of an [agent harness]({{< relref "glossary/agent-harness" >}}). The harness is the machinery; context engineering is the strategy that machinery executes on every turn. Prompt engineering does not disappear, it becomes one part of a larger practice: a well-written instruction is still necessary, but it is no longer sufficient.

## Origins and History

The term gained prominence in 2025 as practitioners and labs needed a name for the work of managing an agent's full context, not just its prompt. Anthropic's engineering essay on effective context engineering for AI agents became a widely cited reference, framing context as a finite attention budget and codifying techniques like just-in-time retrieval, compaction, and agentic note-taking. LangChain, LlamaIndex, and others adopted the framing through 2025 and 2026.

## Tokenmaxxing and the backlash

As context engineering became established practice, a countertrend emerged: [tokenmaxxing]({{< relref "glossary/tokenmaxxing" >}}), the practice of maximizing AI token consumption as a visible productivity signal. Organizations encouraged developers to "use as much AI as possible" without measuring outcomes, leading to runaway costs and gaming of usage leaderboards.

IBM and Brookings both documented the problem. The backlash reframed context engineering as optimization, not maximization: the goal is to use the smallest set of high-signal tokens that make the desired outcome most likely. More context is not better context, and more tokens is not more intelligence.

## Sources

1. Anthropic. "Effective context engineering for AI agents." [https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
2. The Decoder. "Anthropic claims context engineering beats prompt engineering when managing AI agents." [https://the-decoder.com/anthropic-claims-context-engineering-beats-prompt-engineering-when-managing-ai-agents/](https://the-decoder.com/anthropic-claims-context-engineering-beats-prompt-engineering-when-managing-ai-agents/)
3. Elastic Search Labs. "Context engineering vs prompt engineering." [https://www.elastic.co/search-labs/blog/context-engineering-vs-prompt-engineering](https://www.elastic.co/search-labs/blog/context-engineering-vs-prompt-engineering)

## Further reading for vibecoders

- [What is a token?](/basics/what-is-a-token/): Context engineering is about managing tokens effectively — understand what they are and why they cost money.
- [What is rate limiting?](/basics/what-is-rate-limiting/): Aggressive context engineering can hit token-per-minute limits — know how to handle 429 errors.
- [Tokenmaxxing](/glossary/tokenmaxxing/): The anti-pattern of maximizing token usage without measuring outcomes.
