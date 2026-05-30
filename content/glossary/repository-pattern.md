---
title: "Repository Pattern"
description: "What the repository pattern is, how it abstracts data access, and when to use it in AI application architectures."
date: 2026-03-28
categories: [Glossary]
tags: [repository-pattern, DDD, design-pattern, data-access, clean-architecture]
related:
  - glossary/domain-driven-design
  - glossary/aggregate-root
  - glossary/unit-of-work
  - glossary/clean-architecture
last_updated: 2026-05-30
---

The repository pattern provides a collection-like interface for accessing domain objects, abstracting the details of data storage and retrieval. The domain layer works with repositories as if they were in-memory collections (add, get, find, remove), while the repository implementation handles the specifics of database queries, ORM mapping, or API calls.

## How It Works

A repository interface is defined in the domain layer: `OrderRepository` with methods like `findById(id)`, `save(order)`, and `findByCustomer(customerId)`. The implementation (in an infrastructure layer) translates these calls to SQL queries, DynamoDB operations, or API calls. The domain code never knows or cares about the storage mechanism.

Each aggregate root typically has one repository. The repository loads and saves the entire aggregate as a unit, maintaining the aggregate's consistency guarantees.

## Why It Matters

The repository pattern decouples domain logic from data access technology. This provides several benefits:

**Testability** - domain logic can be tested with in-memory repository implementations, without databases or external services. Tests run fast and are deterministic.

**Flexibility** - the storage technology can be changed (PostgreSQL to DynamoDB, local to cloud) by swapping the repository implementation without modifying domain code.

**Clarity** - the repository interface documents the data access patterns the domain actually needs, making it clear what queries are required and why.

## Practical Considerations

Do not create a generic repository (Repository<T>) with methods for every possible query. This defeats the purpose by leaking storage concerns into the interface. Instead, define specific methods that match the domain's actual access patterns.

For AI applications, repositories commonly abstract access to model registries (save/load model artifacts), feature stores (read features for inference), vector databases (store/retrieve embeddings), and conversation stores (save/load chat histories).

## Practical Guidance

Keep repository interfaces focused on what the domain needs, not what the database can do. Avoid exposing query builders or raw database operations through the repository. Use the repository to encapsulate complex queries that would otherwise be scattered across the codebase. In serverless architectures, repositories abstract the specifics of DynamoDB, S3, or API calls behind clean domain interfaces.

## Sources

- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley. Chapter 10: Data Source Architectural Patterns. (Original repository pattern definition; the data mapping layer between domain objects and database persistence.)
- Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley. Part III, Chapter 6. (Repository as part of the DDD building blocks; abstracting persistence behind a collection-like interface.)
- Vernon, V. (2013). *Implementing Domain-Driven Design*. Addison-Wesley. Chapter 12: Repositories. (Practical repository implementations; port-and-adapter repositories; in-memory repositories for testing.)
