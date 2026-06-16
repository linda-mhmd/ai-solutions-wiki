---
title: "Agent Harness"
description: "The software scaffolding wrapped around a language model that turns it into a working agent: the loop, tool execution, context and memory management, state, guardrails, error recovery, and tracing."
date: 2026-06-14
lastmod: 2026-06-14
last_updated: 2026-06-14
categories: [Glossary]
tags: ["ai-agents", "intermediate", "agent-harness", "scaffolding", "llm", "context-engineering"]
related:
  - glossary/context-engineering
  - glossary/agent-memory
  - glossary/tool-use
  - glossary/ai-agents
  - tools/langgraph
  - patterns/agentic-workflows
---

An agent harness is the software scaffolding wrapped around a language model that turns a text generator into a working agent. The model decides what to do next; the harness is everything else that makes that decision useful: the loop that runs it, the tools it can call, the context and memory it sees, the state it keeps between steps, the guardrails that constrain it, the recovery logic when something fails, and the tracing that lets you see what happened. A common way to put it: the model is the smallest part of an agent system.

## Why the term matters

Through 2025 and 2026, agent harness (or agent scaffolding) became a first-class engineering term. The reason is practical: once teams had access to similarly capable models, the quality difference between agents came mostly from harness design, how context is curated, how clearly tools are defined, how gracefully errors are handled, rather than from the choice of model. Two teams using the same model can ship agents that feel worlds apart, and the difference is the harness.

## Core components

- **The agent loop** - the observe, reason, act, observe cycle that runs the model repeatedly until a task is done or a stop condition is hit.
- **Tool layer** - the definitions, execution, and result handling for the functions the agent can call. Tools should be self-contained, hard to misuse, and clearly described. See [tool use]({{< relref "glossary/tool-use" >}}).
- **Context management** - deciding what goes into the model's limited window on each turn, and what gets summarized or dropped. This is where [context engineering]({{< relref "glossary/context-engineering" >}}) lives.
- **Memory and state** - what persists across turns and across sessions, and how it is stored and retrieved. See [agent memory]({{< relref "glossary/agent-memory" >}}).
- **Guardrails and policy** - input and output checks, permission boundaries, and limits on what the agent may do.
- **Error recovery** - retries, fallbacks, and the ability to notice a failed step and try a different approach rather than continuing on bad state.
- **Observability** - tracing every step, tool call, and intermediate result so failures can be diagnosed.

## Harness versus framework

A framework like [LangGraph]({{< relref "tools/langgraph" >}}) or [CrewAI]({{< relref "tools/crewai" >}}) is a toolkit for building a harness: it gives you loop, tool, and state primitives so you do not start from zero. A harness is the specific assembled system you run in production. You can build a harness without a framework, and a framework does not absolve you of the design work, the hard parts (context curation, tool ergonomics, recovery) are yours regardless.

## Origins and History

The word harness was borrowed from testing, where a test harness is the scaffolding that runs code under controlled conditions. As agents moved from demos to production in 2024 and 2025, practitioners needed a name for the large body of non-model code that made agents work, and harness fit. By 2026 it was used widely across the ecosystem, including by framework vendors and model labs, and a body of writing on harness engineering emerged. Coding agents such as Anthropic's Claude Code are frequently cited examples: the agent's behavior is dominated by its harness, not by a single prompt.

## Sources

1. Firecrawl. "What is an agent harness?" [https://www.firecrawl.dev/blog/what-is-an-agent-harness](https://www.firecrawl.dev/blog/what-is-an-agent-harness)
2. MongoDB. "Agent harness: why the LLM is the smallest part of your agent system." [https://www.mongodb.com/company/blog/technical/agent-harness-why-llm-is-smallest-part-of-your-agent-system](https://www.mongodb.com/company/blog/technical/agent-harness-why-llm-is-smallest-part-of-your-agent-system)
3. Hugging Face. "Agent glossary." [https://huggingface.co/blog/agent-glossary](https://huggingface.co/blog/agent-glossary)
