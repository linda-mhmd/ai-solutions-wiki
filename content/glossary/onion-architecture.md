---
title: "Onion Architecture"
description: "An architecture pattern placing the domain model at the core with infrastructure concerns on the outside, inverting traditional dependencies."
date: 2026-03-28
categories: [Glossary]
tags: [onion-architecture, architecture-patterns, domain-driven-design, clean-architecture, dependency-inversion]
last_updated: 2026-05-30
---

Onion Architecture is a software architecture pattern that places the domain model at the center of the application, with all dependencies pointing inward. Infrastructure concerns (databases, frameworks, external services) reside in the outermost layers and depend on the domain, never the reverse.

## Origins and History

Onion Architecture was introduced by Jeffrey Palermo in a series of blog posts in 2008. Palermo was motivated by the limitations of traditional layered architecture, where the business logic layer typically depends on the data access layer, coupling domain logic to persistence technology. His approach inverted these dependencies, drawing on the Dependency Inversion Principle from Robert C. Martin's SOLID principles (1996) and ideas from Alistair Cockburn's Hexagonal Architecture (Ports and Adapters, 2005). Robert C. Martin later synthesized similar ideas into "Clean Architecture" (2012), and these patterns are often discussed together as concentric architecture patterns. All three share the fundamental principle: source code dependencies must point inward, toward higher-level policies and domain logic.

## How It Works

The architecture is visualized as concentric rings. The innermost ring contains the **Domain Model** -- entities and value objects representing core business concepts with no external dependencies. The next ring contains **Domain Services** -- business logic that operates on domain entities but does not fit within a single entity. The **Application Services** ring coordinates use cases and workflows, defining interfaces (ports) for external dependencies. The outermost ring contains **Infrastructure** -- implementations of repositories, external service clients, frameworks, and UI. Dependencies always point inward: infrastructure implements interfaces defined by inner layers but inner layers never reference infrastructure directly.

## Practical Applications

Onion Architecture is used in enterprise applications where business logic must be insulated from technology changes, in domain-driven design implementations where the domain model is the primary investment, and in systems that need to support multiple delivery mechanisms (web, API, CLI) or swap infrastructure components (change databases, switch message brokers) without modifying business logic. It is commonly implemented in .NET (Clean Architecture templates), Java (Spring-based hexagonal designs), and TypeScript applications.

## Sources

1. Palermo, J. (2008). "The Onion Architecture." [https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
2. Martin, R.C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
3. Cockburn, A. (2005). "Hexagonal Architecture (Ports and Adapters)." [https://alistair.cockburn.us/hexagonal-architecture/](https://alistair.cockburn.us/hexagonal-architecture/)
