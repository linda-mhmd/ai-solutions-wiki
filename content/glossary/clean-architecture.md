---
title: "Clean Architecture"
description: "What clean architecture is, how dependency inversion organizes code layers, and when this structure benefits AI applications."
date: 2026-03-28
categories: [Glossary]
tags: [clean-architecture, design-pattern, SOLID, dependency-inversion, architecture]
related:
  - glossary/hexagonal-architecture
  - glossary/ports-and-adapters
  - glossary/domain-driven-design
  - glossary/repository-pattern
last_updated: 2026-05-30
---

Clean architecture is a software design approach that organizes code into concentric layers with dependencies pointing inward. The innermost layer contains business logic (domain entities and use cases) with no dependencies on external frameworks, databases, or UI. Outer layers (adapters, infrastructure) implement the interfaces defined by inner layers. This structure, popularized by Robert C. Martin, ensures business logic is isolated, testable, and independent of implementation details.

## How It Works

**Entities (innermost)** contain core business rules and domain objects. They have no dependencies on anything external.

**Use cases** contain application-specific business rules. They orchestrate entities to accomplish specific tasks (e.g., "process an invoice," "run inference on a document"). They depend only on entities and abstract interfaces.

**Interface adapters** convert data between the format used by use cases and the format needed by external systems. Controllers, presenters, and repository implementations live here.

**Frameworks and drivers (outermost)** contain the database, web framework, AI model APIs, and other external tools. They implement the interfaces defined by inner layers.

The critical rule: dependencies only point inward. Inner layers define interfaces; outer layers implement them.

## Why It Matters

Clean architecture makes business logic testable without databases, APIs, or frameworks. It makes the system adaptable - you can swap a database, replace an AI model provider, or change the web framework without touching business logic. For AI applications, this means the orchestration logic (what to do with model outputs, how to validate results, which models to call in which order) is separated from the implementation details of specific AI services.

## Practical Guidance

Apply clean architecture to the core of your system where business logic is complex and likely to outlive specific technology choices. Do not over-architect simple CRUD services or Lambda functions with minimal business logic. The goal is protecting valuable business logic from technology churn, not adding layers to every piece of code. In practice, many teams find that hexagonal architecture (a closely related pattern) provides the same benefits with a simpler mental model.

## Sources

- Martin, R. C. (2012). The clean architecture. *The Clean Coder blog*. (Original post defining the clean architecture model; concentric layers with inward dependency rule.)
- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall. (Full book treatment of clean architecture; entities, use cases, interface adapters, and frameworks layers.)
- Cockburn, A. (2005). Hexagonal architecture. *Alistair Cockburn's blog*. (Ports and adapters / hexagonal architecture; the closely related pattern mentioned; many teams find it equivalent with simpler terminology.)
