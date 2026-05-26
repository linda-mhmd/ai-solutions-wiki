---
title: "Message Queue"
description: "What message queues are, how they decouple services, and when to use SQS versus other messaging patterns."
date: 2026-03-28
categories: [Glossary]
tags: [message-queue, SQS, decoupling, async, event-driven]
related:
  - glossary/pub-sub
  - glossary/event-driven-architecture
  - glossary/kafka
---

A message queue is a communication mechanism where messages are sent to a queue by producers and consumed by consumers asynchronously. The queue acts as a buffer between services, decoupling the producer from the consumer so they can operate independently, at different speeds, and without direct knowledge of each other.

## How It Works

A producer sends a message to the queue. The message persists in the queue until a consumer retrieves and processes it. After successful processing, the consumer acknowledges the message (deletes it from the queue). If processing fails, the message becomes visible again for retry or is moved to a dead-letter queue after repeated failures.

**Amazon SQS** (Simple Queue Service) is AWS's managed message queue. Standard queues provide at-least-once delivery with best-effort ordering. FIFO queues provide exactly-once delivery with guaranteed ordering (lower throughput). Both scale automatically with no capacity management.

## Why It Matters

Message queues solve three critical problems:

**Decoupling** - the producer does not need to know which service processes the message, how many consumers there are, or whether they are currently running. Services can be developed, deployed, and scaled independently.

**Load leveling** - a queue absorbs traffic spikes. If a burst of inference requests arrives, the queue holds them until the inference service can process them at its own pace, preventing overload.

**Reliability** - messages persist in the queue even if the consumer is temporarily unavailable. Processing eventually completes when the consumer recovers, with no data loss.

## AI Workload Patterns

Message queues are the standard pattern for asynchronous AI processing. A web API receives a request, places it on an SQS queue, and returns a job ID. An inference worker polls the queue, processes the request, and writes results to a database or S3. The client polls for results or receives a callback. This pattern handles variable inference latency, enables horizontal scaling of workers, and isolates the API from model processing failures.

## Practical Guidance

Use SQS Standard for most workloads. Use FIFO queues only when message ordering is essential (adds cost and reduces throughput). Configure dead-letter queues to capture failed messages for debugging. Set visibility timeout longer than your expected processing time to prevent duplicate processing. Monitor queue depth to trigger auto-scaling of consumer instances.

## Sources

- Birman, K. P., & Joseph, T. A. (1987). Reliable communication in the presence of failures. *ACM Transactions on Computer Systems*, 5(1), 47–76. (Foundational work on reliable message delivery in distributed systems; the theoretical basis for message queue durability and at-least-once delivery guarantees.)
- Hohpe, G., & Woolf, B. (2003). *Enterprise Integration Patterns*. Addison-Wesley. Chapter 3: Messaging Channels. (Message queue patterns; point-to-point channels, dead-letter channels, and competing consumers, the canonical reference for messaging architecture.)
- Vogels, W. (2004). Eventually consistent. *ACM Queue*. (Eventual consistency through async messaging; the design philosophy underlying SQS standard queues.)
