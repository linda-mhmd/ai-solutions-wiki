---
title: "Apache Kafka"
description: "What Kafka is, how it provides distributed event streaming, and when to choose Kafka for AI data pipelines."
date: 2026-03-28
categories: [Glossary]
tags: [kafka, streaming, event-driven, MSK, data-engineering]
related:
  - glossary/kinesis
  - glossary/message-queue
  - glossary/pub-sub
  - glossary/event-driven-architecture
last_updated: 2026-05-30
---

Apache Kafka is a distributed event streaming platform for building real-time data pipelines and streaming applications. It provides durable, ordered, replayable event logs that decouple producers from consumers and support multiple independent consumer groups reading the same data at different speeds.

## How It Works

Producers publish records to topics. Each topic is divided into partitions, distributed across brokers for parallelism and fault tolerance. Records within a partition are strictly ordered and assigned an offset (sequence number). Consumer groups read from partitions, with each partition assigned to one consumer in the group for parallel processing.

Kafka retains records for a configurable duration (days, weeks, or indefinitely), allowing consumers to replay historical data. This is fundamentally different from message queues where messages are deleted after consumption.

**Amazon MSK** (Managed Streaming for Apache Kafka) provides a fully managed Kafka service. AWS handles broker provisioning, patching, and cluster management. MSK Serverless eliminates capacity planning entirely.

## Why It Matters for AI

Kafka excels as the central nervous system for AI data pipelines. Common patterns include streaming training data from operational systems to feature stores, publishing model inference results for downstream consumption, feeding real-time events to streaming analytics and anomaly detection, and enabling event replay for reprocessing when models or logic change.

The replay capability is particularly valuable for AI: when you deploy a new model, you can reprocess historical events to backfill predictions or compare new model performance against historical data.

## Kafka vs. Message Queues

Kafka is a log, not a queue. Messages are not deleted after consumption. Multiple consumer groups can read the same data independently. This makes Kafka suitable for event sourcing, audit logs, and multi-consumer architectures. For simple task distribution (one message, one consumer), SQS is simpler and cheaper.

## Practical Guidance

Use MSK Serverless to avoid capacity management. Design topics around event types, not consumers. Keep messages small (< 1 MB); store large payloads in S3 and reference them in Kafka messages. Monitor consumer lag to detect processing bottlenecks. Use Kafka Connect for standardized integrations with databases, S3, and other systems rather than writing custom producers and consumers.

## Sources

- Kreps, J., Narkhede, N., & Rao, J. (2011). Kafka: A distributed messaging system for log aggregation. *NetDB Workshop at VLDB 2011*. (Original Kafka paper; introduced the commit log abstraction and multi-consumer replay model.)
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media. Chapter 11: Stream Processing. (Definitive treatment of Kafka as a distributed commit log; compares it to databases and message queues.)
- Kreps, J. (2013). The log: What every software engineer should know about real-time data's unifying abstraction. *LinkedIn Engineering Blog*. (Explains why the append-only log is the fundamental primitive underlying Kafka; foundational conceptual reference.)
