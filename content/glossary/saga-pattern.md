---
title: "Saga Pattern"
description: "What the saga pattern is, how it manages distributed transactions across microservices, and implementation approaches."
date: 2026-03-28
categories: [Glossary]
tags: [saga, microservices, distributed-transactions, choreography, orchestration]
related:
  - glossary/event-driven-architecture
  - glossary/cqrs
  - glossary/domain-driven-design
last_updated: 2026-05-30
---

The saga pattern manages data consistency across multiple microservices without distributed transactions. Instead of a single atomic transaction spanning multiple databases, a saga is a sequence of local transactions where each service performs its own transaction and publishes an event that triggers the next step. If any step fails, compensating transactions undo the previous steps.

## How It Works

Each step in the saga completes a local transaction and triggers the next step. If step 3 of 5 fails, compensating transactions are executed for steps 2 and 1 (in reverse order) to undo their changes. Unlike database rollbacks, compensating transactions are explicit business logic: "cancel the reservation," "refund the payment," "release the inventory."

**Choreography** - each service publishes events and listens for events from other services. No central coordinator. Services are loosely coupled but the overall flow is implicit and harder to understand as complexity grows.

**Orchestration** - a central saga orchestrator (often implemented with Step Functions) explicitly defines the sequence, calls each service, and manages compensating transactions on failure. The flow is visible and manageable but introduces a single point of coordination.

## Why It Matters

In microservices architectures, operations that span multiple services (placing an order that involves inventory, payment, and shipping) cannot use a single database transaction. The saga pattern provides a structured approach to maintaining consistency without coupling services through shared databases or distributed transaction protocols.

For AI pipelines that span multiple services (document ingestion, embedding generation, index update, notification), the saga pattern ensures that failures in later steps trigger cleanup of earlier steps rather than leaving the system in an inconsistent state.

## Practical Guidance

Use orchestration (Step Functions) for complex sagas with many steps - the explicit flow is easier to understand, debug, and modify. Use choreography for simple, two-to-three step sagas where the overhead of an orchestrator is not justified. Always define compensating transactions explicitly for each step. Implement idempotency in each service to handle retries safely. Log saga state transitions for debugging and audit purposes.

## Sources

- Garcia-Molina, H., & Salem, K. (1987). Sagas. *ACM SIGMOD 1987*. (Original saga paper; defined long-lived transactions with compensating transactions as the alternative to distributed ACID transactions.)
- Richardson, C. (2018). *Microservices Patterns: With Examples in Java*. Manning Publications. Chapter 4: Managing transactions with sagas. (Definitive implementation reference for orchestration vs. choreography sagas in microservices.)
- Hohpe, G., & Woolf, B. (2003). *Enterprise Integration Patterns*. Addison-Wesley. (Process manager pattern; the orchestration saga is an instance of the process manager pattern.)
