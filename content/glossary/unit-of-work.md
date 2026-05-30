---
title: "Unit of Work Pattern"
description: "What the unit of work pattern is, how it coordinates database changes, and when to apply it in application architecture."
date: 2026-03-28
categories: [Glossary]
tags: [unit-of-work, design-pattern, transactions, data-access, DDD]
related:
  - glossary/repository-pattern
  - glossary/aggregate-root
  - glossary/domain-driven-design
last_updated: 2026-05-30
---

The unit of work pattern tracks changes to domain objects during a business operation and coordinates writing those changes to the database as a single atomic transaction. It maintains a list of objects affected by the operation (new, modified, deleted) and commits all changes together, ensuring data consistency.

## How It Works

During a business operation, domain objects are loaded and modified. The unit of work tracks which objects have changed. When the operation completes, the unit of work opens a database transaction, persists all changes (inserts, updates, deletes), and commits the transaction. If any persistence operation fails, the entire transaction is rolled back.

This contrasts with saving each change immediately as it happens, which risks leaving the database in an inconsistent state if a later change fails.

## Why It Matters

The unit of work ensures that a business operation either fully succeeds or fully fails at the database level. It prevents partial updates that leave data inconsistent. It also batches database operations, reducing the number of round trips to the database.

For AI applications that process multi-step operations (ingest a document, extract metadata, create embeddings, update the index), the unit of work ensures that partial failures do not leave orphaned records. Either the entire ingestion completes, or nothing is committed.

## Relationship to ORMs

Most ORMs implement the unit of work pattern internally. SQLAlchemy's Session, Entity Framework's DbContext, and Hibernate's Session all track changes and commit them as a transaction. When using an ORM, you are typically using a unit of work without explicitly implementing one.

## Practical Guidance

In serverless and microservices architectures with DynamoDB, the unit of work concept translates to DynamoDB's TransactWriteItems, which atomically writes up to 100 items across multiple tables. For operations spanning multiple services, the saga pattern replaces the unit of work since no single transaction can span multiple databases. Use the unit of work within a single service's database boundary and sagas for cross-service coordination.

## Sources

- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley. Chapter 11: Object-Relational Behavioral Patterns. (Original Unit of Work pattern definition; change tracking, batch updates, and the relationship to the identity map.)
- Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley. Part III: Refining the Model. (Repository and Unit of Work in the DDD context; managing persistence as part of aggregate lifecycle.)
- Richardson, C. (2018). *Microservices Patterns*. Manning. Chapter 4: Managing transactions with sagas. (Saga pattern as the replacement for Unit of Work across service boundaries; where Unit of Work stops and sagas begin.)
