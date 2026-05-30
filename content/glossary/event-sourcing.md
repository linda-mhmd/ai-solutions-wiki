---
title: "Event Sourcing"
description: "What event sourcing is, why it matters for AI audit trails and pipeline replay, its relationship to CQRS, and when to apply it in AI systems."
date: 2026-03-25
categories: [Glossary]
tags: ["software-engineering", "intermediate", "event-sourcing", "event-driven", "audit-log", "cqrs", "architecture"]
related:
  - patterns/event-sourcing-ai
  - glossary/event-driven-architecture
  - patterns/data-pipeline-patterns
  - tools/aws-eventbridge
  - tools/amazon-step-functions
last_updated: 2026-05-30
---

Event Sourcing is an architectural pattern where the state of a system is stored as an immutable sequence of events rather than as a current snapshot. Instead of writing "the document is in state X," you write "Document Submitted event occurred, then Document Processed event occurred, then Document Indexed event occurred." The current state is derived by replaying the event sequence from the beginning.

## The Core Principle

In a conventional database-backed application, when a document's status changes from "pending" to "processed," you update a row in a table. The previous state is overwritten and lost.

In an event-sourced application, you append a new event:
```json
{
  "event_type": "DocumentProcessed",
  "document_id": "doc-123",
  "processed_at": "2026-03-25T14:22:00Z",
  "chunks_produced": 12,
  "embedding_model": "amazon-titan-v2"
}
```

The table row is never updated. All events are retained. The current status of the document is computed by reading all events for `doc-123` in order.

## Why It Matters for AI Systems

**Audit trails** - Regulated AI applications (financial, healthcare, legal) must be able to prove what data was used to produce a specific AI output. An event log provides complete provenance: document version X was retrieved and included in prompt P which produced output O.

**Pipeline replay** - When you upgrade an embedding model, you need to re-embed all existing documents. With event sourcing, the original ingestion events still exist. You replay them through the new processing logic without re-fetching from source systems.

**Debugging** - If a model produces an unexpected output, you can reconstruct the exact state of the system at the time of the request: which document versions were in the index, what query was sent, what context was retrieved.

**Temporal queries** - "What did the system know at 9:00am yesterday?" is trivially answerable from an event log. It is very difficult to answer from a system that only stores current state.

## Relationship to CQRS

Event Sourcing is often used alongside CQRS (Command Query Responsibility Segregation). CQRS separates the write model (commands that produce events) from the read model (projections built from events).

In an AI knowledge base:
- **Write model:** Accept new documents, process them, produce events
- **Read models (projections):** The vector search index (a projection over "chunk embedded" events), the document status dashboard (a projection over all document lifecycle events), the retrieval statistics table

Projections can be rebuilt at any time by replaying the event stream. If the vector index becomes corrupted or the index schema needs to change, drop it and rebuild from events.

## When to Use Event Sourcing

Event sourcing adds implementation complexity. It is appropriate when:
- You have regulatory requirements for an immutable audit trail
- You need the ability to replay the pipeline with different processing logic
- Multiple downstream consumers need to react to the same events independently
- You need to rebuild read models as query patterns change

It is not appropriate when:
- The pipeline is simple and linear with no replay requirements
- The team is small and the operational overhead outweighs the benefits
- You just need logging (structured logging to CloudWatch or S3 is much simpler)

## Implementation on AWS

The event store can be implemented with:
- **DynamoDB** with a composite key (entity_id + timestamp) for real-time event sourcing with per-entity queries
- **Kinesis Data Streams** for high-throughput streaming event pipelines
- **S3** with a time-partitioned key scheme for low-cost archival and batch replay

EventBridge routes events from producers to multiple consumers without tight coupling. Each consumer subscribes to the event types it cares about.

## Sources

- Fowler, M. (2005). Event sourcing. *martinfowler.com*. (Coined the "event sourcing" pattern name; canonical definition used across the industry.)
- Young, G. (2010). CQRS and Event Sourcing. *CQRS Documents*. (Foundational treatment of event sourcing combined with CQRS; defined the event store and projection concepts.)
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media. Chapter 11: Stream Processing. (Log-as-event-store; explains why an immutable log is equivalent to and preferable to mutable state for event-sourced systems.)
