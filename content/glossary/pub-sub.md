---
title: "Pub/Sub - Publish-Subscribe Pattern"
description: "What the pub/sub pattern is, how it enables event-driven architectures, and when to use SNS versus direct messaging."
date: 2026-03-28
categories: [Glossary]
tags: [pub-sub, SNS, event-driven, messaging, decoupling]
related:
  - glossary/message-queue
  - glossary/event-driven-architecture
  - glossary/kafka
last_updated: 2026-05-30
---

Publish-subscribe (pub/sub) is a messaging pattern where publishers emit events to a topic without knowledge of which subscribers will receive them. Subscribers register interest in specific topics and receive all messages published to those topics. This decouples publishers from subscribers completely - neither needs to know about the other.

## How It Works

A publisher sends a message to a topic. The messaging system delivers a copy of the message to every subscriber of that topic. Subscribers can be queues, Lambda functions, HTTP endpoints, email addresses, or other services. Each subscriber processes the message independently.

**Amazon SNS** (Simple Notification Service) is AWS's managed pub/sub service. It supports fan-out to multiple SQS queues, Lambda functions, HTTP endpoints, and mobile push notifications. SNS + SQS is the standard fan-out pattern on AWS: SNS distributes the event, and SQS buffers it for each consumer.

## Pub/Sub vs. Message Queue

A message queue delivers each message to exactly one consumer (point-to-point). Pub/sub delivers each message to all subscribers (fan-out). Use a queue when one service should process each message. Use pub/sub when multiple services need to react to the same event.

## Why It Matters

Pub/sub enables event-driven architectures where services react to events rather than being called directly. When a new document is uploaded, an SNS topic notifies multiple independent services: one starts text extraction, another updates the search index, a third triggers compliance scanning. Adding a new subscriber requires no changes to the publisher.

For AI systems, pub/sub enables pipeline architectures where each processing stage publishes results that trigger the next stage. Document ingestion publishes to a topic; embedding generation subscribes and publishes its output to another topic; vector database indexing subscribes to that.

## Practical Guidance

Use SNS with SQS subscriptions for reliable fan-out (each subscriber gets its own queue with retry and dead-letter handling). Use SNS message filtering to route specific event types to specific subscribers without custom routing code. For high-throughput event streaming with replay capability, consider Kafka or Kinesis instead of SNS (which does not retain messages after delivery).

## Sources

- Hohpe, G., & Woolf, B. (2003). *Enterprise Integration Patterns*. Addison-Wesley. Chapter 6: Publish-Subscribe Channel. (Publish-subscribe pattern; topic-based routing, content-based filtering, and the fan-out pattern underlying modern pub/sub systems.)
- Eugster, P. T., Felber, P. A., Guerraoui, R., & Kermarrec, A.-M. (2003). The many faces of publish/subscribe. *ACM Computing Surveys*, 35(2), 114–131. (Survey of pub/sub systems; topic-based vs. content-based vs. type-based models; the theoretical foundation for modern event brokers.)
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media. Chapter 11: Stream Processing. (Event streams and pub/sub in the context of data systems; SNS, Kafka, and Kinesis compared.)
