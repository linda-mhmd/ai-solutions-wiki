---
title: "LangChain 1.0: The First Stable Release Consolidates on LangGraph"
description: "LangChain 1.0 shipped on October 22, 2025 with create_agent, agent middleware, and standard content blocks. Here is what changed and what it means for builders."
date: 2025-10-22
lastmod: 2026-06-15
last_updated: 2026-06-15
categories: [News]
tags: [langchain, langgraph, agents, agent-middleware, llm-frameworks, structured-output]
related:
  - tools/langchain
  - tools/langgraph
  - patterns/agentic-workflows
  - glossary/ai-agent
---

LangChain reached its first stable release on October 22, 2025, and it is more of a reset than an incremental bump. Both the Python and JavaScript packages hit 1.0 together, the sprawling collection of chains and helpers was trimmed down, and the framework now stands on a single agent abstraction (`create_agent`) running on the LangGraph runtime. A follow up, LangChain 1.1, landed on December 2, 2025. If you build LLM applications, this changes the recommended way to assemble agents and the contract you get back from models.

## What happened

LangChain 1.0 made a clean break from the old "chains everywhere" design and committed to a stable surface, with no breaking changes planned until a future 2.0. The headline pieces:

- `create_agent` is the new standard entry point for building agents. It replaces both the legacy `AgentExecutor` and the `langgraph.prebuilt.create_react_agent` shortcut. You give it a model, tools, and a system prompt, and it runs the basic agent loop: call the model, let it choose tools, finish when no more tools are called.
- Agent middleware gives you hooks at every step of that loop instead of subclassing. LangChain ships built in middleware for human in the loop approval, message history summarization, and PII redaction, and you can write your own.
- Standard content blocks arrived as a new `content_blocks` property on messages. It exposes modern model features (reasoning traces, citations, tool calls) through one provider agnostic shape, supported across `langchain-anthropic`, `langchain-aws`, `langchain-openai`, `langchain-google-genai`, and `langchain-ollama`.
- Legacy functionality moved to a separate `langchain-classic` package. That includes the old chains, retrievers such as `MultiQueryRetriever`, the indexing API, the hub module, and `langchain-community` exports. The core `langchain` namespace is now focused on agent building blocks.
- LangGraph 1.0 became the foundational runtime underneath, providing durable state, resumable execution, and human in the loop patterns.

LangChain 1.1, on December 2, 2025, added model profiles. Chat models now expose a `.profile` attribute describing their capabilities (structured output, function calling, and similar), sourced from the open models.dev catalog. The summarization middleware and native structured output strategy use these profiles to make smarter decisions, and `create_agent` gained support for `SystemMessage` instances, built in model retry with backoff, and OpenAI moderation as middleware.

## Why it matters for builders

The practical shift is that there is now one blessed way to build an agent rather than a dozen overlapping chains. If you have been choosing between `AgentExecutor`, `create_react_agent`, and hand rolled LangGraph, the answer is now `create_agent` plus middleware. Cross cutting concerns like guardrails, summarization, and approval steps become composable middleware instead of bespoke wrapping code.

Standard content blocks reduce provider lock in at the message layer: code that reads reasoning or citations no longer has to special case each provider's response format. And because structured output generation is folded into the main agent loop, you avoid the extra model call that older patterns needed, which trims latency and cost.

The trade off is migration work. Anything you relied on from the old chains or retrievers now lives in `langchain-classic`, so upgrading is not a no op.

## What to do

- New projects: start on `create_agent` and add middleware for guardrails, summarization, and any human in the loop steps.
- Existing projects: pin your current version, read the official migration guide, and budget time to either move imports to `langchain-classic` or refactor onto `create_agent`.
- Multi provider apps: adopt `content_blocks` so reasoning and citation handling is uniform, and lean on model profiles (1.1) to detect capabilities instead of hard coding them.

## Sources

1. LangChain blog. "LangChain and LangGraph Agent Frameworks Reach v1.0 Milestones." [https://www.langchain.com/blog/langchain-langgraph-1dot0](https://www.langchain.com/blog/langchain-langgraph-1dot0)
2. LangChain changelog. "LangChain 1.0 now generally available." [https://changelog.langchain.com/announcements/langchain-1-0-now-generally-available](https://changelog.langchain.com/announcements/langchain-1-0-now-generally-available)
3. LangChain changelog. "LangChain 1.1." [https://changelog.langchain.com/announcements/langchain-1-1](https://changelog.langchain.com/announcements/langchain-1-1)
4. LangChain docs. "What's new in LangChain v1." [https://docs.langchain.com/oss/python/releases/langchain-v1](https://docs.langchain.com/oss/python/releases/langchain-v1)

## Further reading

- [LangChain vs LlamaIndex](/comparisons/langchain-vs-llamaindex/): choosing an orchestration framework.
- [CrewAI vs LangGraph](/comparisons/crewai-vs-langgraph/): the multi-agent framework LangChain 1.0 consolidates on.
- [What is agentic AI?](/glossary/agentic-ai/): the workloads create_agent targets.
- [Open-source coding agents compared](/comparisons/open-source-coding-agents/): where framework-built agents fit.
