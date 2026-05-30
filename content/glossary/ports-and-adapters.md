---
title: "Ports and Adapters"
description: "What the ports and adapters pattern is, how it structures application boundaries, and its relationship to hexagonal architecture."
date: 2026-03-28
categories: [Glossary]
tags: [ports-and-adapters, hexagonal-architecture, design-pattern, dependency-inversion, architecture]
related:
  - glossary/hexagonal-architecture
  - glossary/clean-architecture
  - glossary/repository-pattern
last_updated: 2026-05-30
---

Ports and adapters is the architectural pattern behind hexagonal architecture, coined by Alistair Cockburn. A port is an interface that defines how the application communicates with the outside world. An adapter is a concrete implementation that connects a port to a specific technology. The pattern ensures that the application core depends only on abstractions (ports), never on specific external systems.

## How It Works

**Inbound ports** define how the outside world drives the application. An `InferenceService` port might define methods like `classifyDocument(document)` and `summarizeText(text)`. Inbound adapters (REST controller, gRPC handler, CLI, event consumer) call these ports.

**Outbound ports** define what external capabilities the application needs. A `ModelProvider` port might define `generateCompletion(prompt)` and `generateEmbedding(text)`. Outbound adapters (Bedrock client, OpenAI client, local model wrapper) implement these ports.

The application core contains business logic that uses outbound ports and is invoked through inbound ports, without knowing which specific technologies are connected.

## Why It Matters

Ports and adapters formalize the dependency inversion principle at the architectural level. The most common benefit is testability: every external dependency can be replaced with a test double by swapping the adapter. The second benefit is flexibility: when requirements change (new API provider, different database, additional ingestion method), only adapters change.

## Practical Examples in AI

An AI inference service might define these outbound ports:
- `ModelPort` - abstracts the LLM provider (Bedrock, OpenAI, local model)
- `EmbeddingPort` - abstracts the embedding model
- `VectorStorePort` - abstracts the vector database (OpenSearch, pgvector, Pinecone)
- `DocumentStorePort` - abstracts document storage (S3, local filesystem)

Each port has one or more adapters. Swapping from OpenSearch to pgvector requires only a new adapter implementing `VectorStorePort`.

## Practical Guidance

Define ports based on what the application needs, not what a specific technology offers. A `VectorStorePort` should have methods like `findSimilar(embedding, limit)`, not OpenSearch-specific query DSL. Test each adapter independently against the port interface. Use dependency injection to wire adapters at application startup based on configuration.

## Sources

- Cockburn, A. (2005). Hexagonal architecture. *alistair.cockburn.us*. (Original definition of ports and adapters; driving vs. driven ports; the symmetry principle that no external system is privileged.)
- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall. (Dependency inversion as the foundational principle; ports and adapters as the practical pattern implementing the dependency rule.)
- Vernon, V. (2013). *Implementing Domain-Driven Design*. Addison-Wesley. Chapter 4: Architecture. (Ports and adapters in the context of DDD; how hexagonal architecture supports domain model isolation.)
