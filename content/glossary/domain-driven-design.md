---
title: "Domain-Driven Design (DDD)"
description: "What domain-driven design is, how it aligns software architecture with business domains, and when to invest in DDD."
date: 2026-03-28
categories: [Glossary]
tags: [DDD, domain-driven-design, architecture, bounded-context, microservices]
related:
  - glossary/bounded-context
  - glossary/aggregate-root
  - glossary/hexagonal-architecture
  - glossary/data-mesh
last_updated: 2026-05-30
---

Domain-Driven Design (DDD) is a software design approach that structures code around the business domain rather than technical concerns. It emphasizes close collaboration between domain experts and developers, a shared ubiquitous language, and architectural boundaries that mirror business boundaries. DDD was introduced by Eric Evans in his 2003 book of the same name.

## Core Concepts

**Ubiquitous language** - developers and domain experts use the same terminology in code, conversations, and documentation. If the business calls it an "enrollment," the code calls it an Enrollment, not a Registration or Signup. This eliminates translation errors between business requirements and implementation.

**Bounded context** - a boundary within which a particular model and language are consistent. Different parts of the business may use the same term differently (a "customer" means different things to sales, billing, and support). Each bounded context has its own model of that concept.

**Entities, value objects, and aggregates** structure the domain model. Entities have identity (a specific order), value objects do not (a money amount), and aggregates define consistency boundaries (an order with its line items).

## Why It Matters

DDD provides the conceptual foundation for decomposing systems into microservices. Each bounded context maps naturally to a service with its own data store, API, and team. When AI capabilities are added to an existing system, DDD helps identify which bounded contexts benefit from AI (and how AI models should be integrated without creating cross-context coupling).

## When to Use DDD

DDD is most valuable for complex business domains where the logic is intricate, evolving, and central to competitive advantage. Simple CRUD applications or purely technical infrastructure projects do not benefit from DDD's overhead.

## Practical Guidance

Start with strategic DDD: identify bounded contexts and their relationships (context mapping) before diving into tactical patterns (aggregates, repositories). Invest in the ubiquitous language - it is the most impactful and lowest-cost DDD practice. Do not apply every DDD pattern everywhere; use tactical patterns in the core domain where business logic is complex, and simpler approaches (CRUD, transaction scripts) in supporting subdomains.

## Sources

- Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley. (The original DDD book; defined ubiquitous language, bounded contexts, aggregates, and strategic/tactical patterns.)
- Vernon, V. (2013). *Implementing Domain-Driven Design*. Addison-Wesley. (Definitive implementation guide; detailed treatment of aggregates, domain events, and bounded context integration patterns.)
- Fowler, M. (2014). Bounded context. *martinfowler.com*. (Concise canonical explanation of bounded contexts; widely cited reference for how DDD maps to microservices decomposition.)
