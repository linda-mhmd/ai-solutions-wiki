---
title: "The Agent-Framework Layer Matures: ADK 2.0, Pydantic AI 2.0, CrewAI 1.15"
description: "In mid-2026 the agent-framework layer hit stable milestones: Google's ADK 2.0, Pydantic AI 2.0, and CrewAI 1.15 all shipped, while LlamaIndex notably held back from a 1.0."
date: 2026-06-25
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [agent-frameworks, open-source, multi-agent, developer-tools, orchestration]
related:
  - comparisons/crewai-vs-langgraph
  - comparisons/langchain-vs-llamaindex
  - glossary/multi-agent-orchestration
---

The frameworks people use to build agents hit a run of stable milestones in mid-2026. Google's Agent Development Kit reached 2.0, Pydantic AI shipped its 2.0, and CrewAI reached 1.15, all within weeks. The pattern is a layer maturing: after two years of churn, several agent frameworks now offer stable, versioned APIs you can build a product on rather than chase.

## What happened

**Google ADK 2.0.0** reached general availability on 19 May 2026, centered on a graph-based multi-agent engine for defining and running coordinated agents. **Pydantic AI v2.0.0** shipped on 23 June 2026 as a stable release, bringing its type-safe, Python-native approach to a 2.0 API. **CrewAI 1.15.0** (25 June 2026) advanced its declarative "flows" for orchestrating role-based agents.

Two absences are as informative as the releases. **LlamaIndex did not ship a 1.0**, staying on its 0.14.x line, and the **OpenAI Agents SDK remained a 0.x** with incremental updates. So the "stable 1.0/2.0" milestone is real for some frameworks but not universal; the layer is maturing unevenly.

## Why it matters for builders

A stable major version is a signal you can plan around: fewer breaking changes, clearer support, and an API worth learning deeply. If you are choosing an agent framework in 2026, the release status is now a real input, a 2.0 GA (ADK, Pydantic AI) implies more stability than a pre-1.0 line (LlamaIndex, OpenAI Agents SDK), though maturity is not the only axis.

The deeper trend is that these frameworks are converging on the same primitives: define agents, give them tools, coordinate them in a graph or flow, and observe the result. That convergence, plus open protocols like MCP and the Agent Client Protocol, means the [multi-agent orchestration](/glossary/multi-agent-orchestration/) patterns are becoming portable across frameworks. Pick one that fits your language and stability needs; see [CrewAI vs LangGraph](/comparisons/crewai-vs-langgraph/) and [LangChain vs LlamaIndex](/comparisons/langchain-vs-llamaindex/) for the trade-offs.

## Sources

- Google Agent Development Kit (ADK) releases: https://github.com/google/adk-python/releases
- Pydantic AI v2.0.0 release: https://github.com/pydantic/pydantic-ai/releases
- CrewAI releases: https://github.com/crewAIInc/crewAI/releases

## Further reading

- [CrewAI vs LangGraph](/comparisons/crewai-vs-langgraph/): two approaches to multi-agent orchestration.
- [LangChain vs LlamaIndex](/comparisons/langchain-vs-llamaindex/): choosing a framework, including the one that held back from 1.0.
- [What is multi-agent orchestration?](/glossary/multi-agent-orchestration/): the pattern these frameworks implement.
