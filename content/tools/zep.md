---
title: "Zep - Temporal Knowledge-Graph Memory for Agents"
description: "What Zep is, how it builds a temporal knowledge graph of agent memory with Graphiti to track how facts change over time, and when graph memory beats a simple vector store."
date: 2026-06-14
lastmod: 2026-09-25
last_updated: 2026-09-25
categories: [Tools]
tags: ["ai-agents", "intermediate", "zep", "agent-memory", "knowledge-graph", "memory"]
related:
  - glossary/agent-memory
  - comparisons/mem0-vs-zep-vs-letta
  - tools/mem0
  - tools/letta
  - guides/knowledge-graph-guide
last_verified: 2026-09-25
---

Zep is a memory layer for AI agents built around a temporal knowledge graph. Instead of storing memories only as embeddings to match by similarity, Zep extracts entities and the relationships between them and records when each fact was true, so an agent can reason about how knowledge changed over time, not just what is most similar to the current message. Zep itself is offered as a managed cloud service (Zep Cloud); its graph engine is available as the open-source project Graphiti.

**Self-hosting:** Zep has stopped maintaining and releasing Zep Community Edition, the Apache 2.0 self-hosted version of the Zep memory service. Teams that need to self-host now build on the open-source Graphiti library directly, which provides the temporal knowledge graph but not Zep Cloud's full managed service.

## How it works

As conversations and business data flow in, Zep builds a graph: people, projects, preferences, and the relationships connecting them, each edge stamped with time. When a fact is superseded, the graph records the change rather than silently overwriting it, so the history is preserved and queryable. On retrieval, Zep can answer not only "what do we know about this user" but "what was true as of last month" and "how did this preference evolve." This temporal structure is the core differentiator from a plain vector memory.

## When Zep makes sense

Zep is a good fit when:
- Facts change over time and the changes matter: status, ownership, preferences, account state.
- You need to reason over relationships between entities, not just recall isolated snippets.
- You combine conversational memory with structured business data and want them in one connected store.

It is heavier than a drop-in vector memory, so for simple personalization where you only need "remember this preference," a tool like [Mem0]({{< relref "tools/mem0" >}}) may be enough. For reported memory benchmarks, Zep has been cited at the top of temporal recall evaluations, though benchmark numbers move and should be checked against current results.

## Graph versus vector memory

A vector memory finds things similar to your query, which is excellent for straightforward recall but weak at time and relationships. A graph memory like Zep models entities and connections explicitly and can traverse them, which is what makes temporal and relational reasoning possible. The trade-off is complexity: graphs are more work to build and operate. See [agent memory]({{< relref "glossary/agent-memory" >}}) for the broader picture.

## Origins and History

Zep started as a memory service for conversational agents and evolved toward temporal knowledge graphs as teams hit the limits of similarity-only recall. The underlying graph engine was released as the open-source Graphiti project, which builds and queries temporally aware knowledge graphs for agents. Zep later discontinued the self-hosted Zep Community Edition and moved its open-source focus to Graphiti, keeping the full Zep service cloud-only. Benchmark and adoption figures are as reported and change over time.

## Sources

1. Zep. Official site and documentation. [https://www.getzep.com/](https://www.getzep.com/)
2. Mem0. "Graph memory solutions for AI agents." [https://mem0.ai/blog/graph-memory-solutions-ai-agents](https://mem0.ai/blog/graph-memory-solutions-ai-agents)
3. Zep. "Announcing a New Direction for Zep's Open Source Strategy" (Zep Community Edition discontinued; open-source focus moves to Graphiti). [https://blog.getzep.com/announcing-a-new-direction-for-zeps-open-source-strategy/](https://blog.getzep.com/announcing-a-new-direction-for-zeps-open-source-strategy/)
4. Graphiti on GitHub. [https://github.com/getzep/graphiti](https://github.com/getzep/graphiti)
5. Atlan. "Best AI agent memory frameworks 2026." [https://atlan.com/know/best-ai-agent-memory-frameworks-2026/](https://atlan.com/know/best-ai-agent-memory-frameworks-2026/)
