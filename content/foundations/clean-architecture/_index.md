---
title: "Clean Architecture"
description: "Robert C. Martin's architectural pattern for organizing software so that business logic is independent of frameworks, databases, and delivery mechanisms. The dependency rule keeps the core stable while everything around it changes."
layout: single
tags: ["architecture", "clean-architecture", "dependency-rule", "hexagonal"]
categories: ["Foundations"]
last_updated: 2026-05-30
---

Clean Architecture was formalized by Robert C. Martin in his 2017 book of the same name, though the underlying ideas appear in his earlier work and draw on two related architectural patterns that preceded it: Alistair Cockburn's Hexagonal Architecture (2005, also called Ports and Adapters) and Jeffrey Palermo's Onion Architecture (2008). The three patterns share a central insight: the most important code in an application - the business rules - should be the most isolated from change. Infrastructure, frameworks, and delivery mechanisms are details. Details should depend on policies, not the other way around.

The practical problem these architectures address is a common one. An application starts with business logic and a database. The database grows into the application's identity - ActiveRecord patterns, ORM-specific query logic, database schema driving object design. Eventually the database cannot be changed, tested against, or replaced without rewriting the application. The same happens with web frameworks, external APIs, and messaging systems. The framework becomes the architecture. Clean Architecture is a discipline for preventing this.

---

## The Dependency Rule

The central rule of Clean Architecture is stated precisely: source code dependencies can only point inward. Nothing in an inner circle can know anything about something in an outer circle. This includes names of functions, classes, variables, and data formats.

The layers, from innermost to outermost:

```
+------------------------------------------+
|  FRAMEWORKS & DRIVERS                    |
|  (Web, DB, External APIs, UI)            |
|  +------------------------------------+  |
|  |  INTERFACE ADAPTERS               |  |
|  |  (Controllers, Presenters, Repos)  |  |
|  |  +------------------------------+  |  |
|  |  |  APPLICATION USE CASES      |  |  |
|  |  |  (Business Rules, Interactors) |  |
|  |  |  +--------------------------+ | |  |
|  |  |  |  ENTITIES               | | |  |
|  |  |  |  (Core Domain Objects)  | | |  |
|  |  |  +--------------------------+ | |  |
|  |  +------------------------------+  |  |
|  +------------------------------------+  |
+------------------------------------------+
```

Each layer knows only about the layers inside it. Entities know nothing. Use cases know about entities. Interface adapters know about use cases and entities. Frameworks and drivers know about everything.

This is not a new idea. E.W. Dijkstra described layered system design in 1968. What Clean Architecture provides is a concrete mapping from abstract layers to the specific responsibilities each layer carries in a modern application.

---

## Entities

Entities encapsulate the most general and high-level business rules. They are the least likely to change when something external to the application changes. If the application is a billing system, an `Invoice` with rules about line items, taxes, and payment terms is an entity. If it is a trading system, an `Order` with constraints on quantity, price, and settlement is an entity.

Entities should be plain objects - no framework annotations, no database decorators, no HTTP-specific logic. They express what the business is, independent of how it is delivered or stored.

---

## Use Cases

Use cases (also called interactors) contain application-specific business rules. They orchestrate the flow of data to and from entities to achieve a specific application goal. A use case is defined by what the user or calling system wants to accomplish: `PlaceOrder`, `GenerateInvoice`, `TransferFunds`.

Use cases depend on entities and on abstractions for their dependencies (repositories, notification services, external gateways). They do not depend on how those abstractions are implemented. A use case that places an order does not know whether the order is persisted to PostgreSQL or DynamoDB. It calls `order_repository.save(order)` and trusts the contract.

---

## Interface Adapters

Interface adapters translate between the language of use cases and entities, and the language of external systems. Controllers take HTTP requests and transform them into the data structures use cases expect. Presenters take use case output and transform it into the data structures views or APIs need. Repositories implement the persistence abstractions that use cases depend on.

This layer is where the translation work lives. It knows about both worlds - the inner world of business logic and the outer world of frameworks. It is the only place where both sides are visible.

---

## Frameworks and Drivers

The outermost layer contains the frameworks, tools, and drivers that the application uses. Web frameworks, database drivers, message brokers, external API clients - these are all in this layer. They are the most likely to change (frameworks get deprecated, databases get swapped, APIs change) and the least important to the business logic. Clean Architecture minimizes their footprint by pushing them to the edge.

---

## Hexagonal Architecture and Ports and Adapters

Cockburn's formulation uses different terminology for the same structure. Ports are the interfaces that the application defines - the contracts it requires from the outside world. Adapters are the implementations that satisfy those contracts. A repository interface is a port. The PostgreSQL implementation of that repository is an adapter.

The hexagon shape in Cockburn's diagrams is deliberate: it emphasizes that there is no "top" or "bottom" of the system, no primary direction of access. HTTP, message queues, CLIs, and test harnesses are all adapters. The application does not care which adapter is driving it.

---

## Onion Architecture

Palermo's Onion Architecture emphasizes the same dependency rule with a focus on domain objects at the center. It explicitly names domain services (logic that does not belong to a single entity) as an inner layer, and application services (use cases) as the next layer out. The outer layers are infrastructure: UI, tests, and infrastructure code.

The practical contribution of Onion Architecture is clarity about where domain logic that spans multiple entities belongs. A pricing engine that must consult multiple entities and external rate tables is a domain service, not use case logic and not entity logic.

---

## The Humble Object Pattern

A recurring challenge in Clean Architecture is testing code that is difficult to test in isolation - code that renders HTML, calls external APIs, or reads from a database. Martin recommends the Humble Object pattern: split each such component into a thin, hard-to-test wrapper (the Humble Object) and a testable core that contains all the interesting logic.

A presenter that formats data for a view is hard to test because the view is a UI concern. Extract the formatting logic into a pure function that takes data and returns a view model. The Humble Object is the thin glue that binds the view model to the actual UI framework. The interesting logic is tested without a UI.

---

## How This Applies to AI Systems

The dependency rule resolves one of the most common structural problems in AI systems: business logic that is entangled with a specific LLM provider.

**The LLM is infrastructure, not a domain object.** An OpenAI `ChatCompletion` call is as much an implementation detail as a SQL query. It belongs in the outermost layer. The business rules - what questions to ask, what constitutes a valid response, how to evaluate output quality - belong in use cases and entities. A system where prompt engineering logic and OpenAI SDK calls are mixed together in the same module has the same structural problem as a system where business rules and SQL queries are mixed together.

**RAG system layering.** A retrieval-augmented generation system has natural Clean Architecture layers. Entities: the documents and their chunking rules. Use cases: the retrieval and synthesis logic (what to retrieve, how to rank, how to combine into a response). Interface adapters: the vector store repository, the LLM gateway, the HTTP controller that accepts queries. Frameworks: the vector database driver, the LLM SDK, the web framework.

**Agent frameworks and the dependency rule.** An agent's decision logic - how it chooses tools, evaluates results, decides to terminate - is use case logic. The tools themselves are adapters. The LLM that powers the agent's reasoning is infrastructure. Structuring agent code this way means swapping the underlying model, changing the tool set, or testing decision logic in isolation all become straightforward rather than structural rewrites.

**ML pipeline architecture.** A training pipeline has the same layers. The data schema and validation rules are entities. The training orchestration logic is a use case. The specific ML framework (PyTorch, JAX, sklearn) is infrastructure. When the framework is pushed to the outermost layer, the pipeline logic can be tested with stub implementations, and framework migrations affect only the adapter layer.

### Related Pages
- [SOLID Principles](/foundations/solid-principles/) - the Dependency Inversion Principle is the mechanism that enforces the dependency rule
- [Domain-Driven Design](/foundations/domain-driven-design/) - DDD provides the vocabulary for designing the entity and domain service layers
- [Design Patterns](/foundations/design-patterns/) - Adapter and Factory patterns appear throughout Clean Architecture implementations

## Sources and Further Reading

- [Martin, Robert C. *Clean Architecture: A Craftsman's Guide to Software Structure and Design.* Pearson, 2017](https://www.pearson.com/en-us/subject-catalog/p/clean-architecture-a-craftsmans-guide-to-software-structure-and-design/P200000009528) - The definitive reference for Clean Architecture
- [Cockburn, Alistair. "Hexagonal Architecture." (2005)](https://alistair.cockburn.us/hexagonal-architecture/) - Original description of Ports and Adapters architecture
- [Palermo, Jeffrey. "The Onion Architecture." (2008)](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/) - Introduction to Onion Architecture
- [Martin, Robert C. "The Clean Architecture." The Clean Code Blog, 2012](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Blog post summarizing Clean Architecture principles
