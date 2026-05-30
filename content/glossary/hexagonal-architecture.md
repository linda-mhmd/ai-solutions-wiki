---
title: "Hexagonal Architecture"
description: "What hexagonal architecture is, how ports and adapters decouple business logic from infrastructure, and practical implementation guidance."
date: 2026-03-28
categories: [Glossary]
tags: [hexagonal-architecture, ports-and-adapters, architecture, design-pattern, clean-architecture]
related:
  - glossary/clean-architecture
  - glossary/ports-and-adapters
  - glossary/domain-driven-design
  - glossary/repository-pattern
last_updated: 2026-05-30
---

Hexagonal architecture (also called ports and adapters) organizes applications so that business logic is at the center, completely isolated from external systems. The application defines ports (interfaces for how it interacts with the outside world) and adapters (implementations that connect those ports to specific technologies). The hexagonal shape in diagrams emphasizes that the application has many external connections, none of which are more fundamental than others.

## How It Works

**The core (inside the hexagon)** contains domain logic and application services. It defines ports: interfaces that describe what external capabilities it needs (a database, a notification service, an AI model) and what capabilities it offers (API endpoints, event handlers).

**Driving adapters (left side)** trigger the application: REST controllers, CLI handlers, event consumers, scheduled jobs. They receive external input and call the application through its inbound ports.

**Driven adapters (right side)** are called by the application: database implementations, AI API clients, message publishers, file storage. They implement the outbound ports defined by the core.

The core never references a specific adapter. It depends only on the port interfaces it defines.

## Why It Matters

This architecture makes the application core testable and adaptable. Tests use in-memory adapters instead of real databases and APIs, running in milliseconds. Changing from one AI provider to another (Bedrock to OpenAI, or vice versa) requires only a new adapter, not changes to business logic.

For AI applications, the business logic (how to orchestrate prompts, validate outputs, handle fallbacks, manage conversation state) is the most valuable and long-lived code. Hexagonal architecture protects it from changes in AI model providers, databases, and frameworks.

## Practical Guidance

Start with two adapter types per port: the real implementation and a test fake. This immediately validates that the port interface is well-designed. Keep ports focused on the application's needs, not the capabilities of specific technologies. Apply hexagonal architecture to services with meaningful business logic; thin wrappers or simple data transformations do not warrant the overhead.

## Sources

- Cockburn, A. (2005). Hexagonal architecture (Ports and adapters). *Alistair Cockburn's blog*. (Original paper defining hexagonal architecture; introduced ports, adapters, and the symmetry principle.)
- Martin, R. C. (2017). *Clean Architecture*. Prentice Hall. (Generalizes hexagonal architecture into clean architecture; dependency rule as the core principle.)
- Newman, S. (2019). *Monolith to Microservices*. O'Reilly Media. (Hexagonal architecture as a foundation for microservice extraction; anti-corruption layer patterns.)
