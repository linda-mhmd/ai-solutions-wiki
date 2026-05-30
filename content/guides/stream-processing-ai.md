---
title: "Real-Time Data Pipelines for AI Workloads"
description: "Implementation guide for real-time streaming data pipelines: four-layer architecture, Flink feature computation, late-arriving data handling with watermarks, event-driven inference, schema evolution, and operational monitoring."
date: 2026-03-28
categories: [Guides]
tags: [stream-processing, flink, kafka, real-time, feature-store, data-engineering]
related:
  - glossary/stream-processing
  - patterns/stream-processing-ai
  - glossary/change-data-capture
  - guides/data-quality-ai
  - glossary/kafka
  - glossary/apache-flink
  - guides/mlops-getting-started
  - patterns/event-driven-ai
last_updated: 2026-05-30
---

**This page is a build guide.** For the architectural pattern describing dual-write consistency guarantees and training-serving skew prevention, see [Real-Time Feature Computation Pattern](/patterns/stream-processing-ai/).

Batch data pipelines compute features from historical data on scheduled intervals, typically hourly or daily. For AI use cases requiring fresh signals, fraud detection scores, real-time recommendation ranking, dynamic pricing, this latency is too high. A fraud model running on hour-old transaction features will miss velocity attacks entirely. Real-time streaming pipelines compute features and trigger inference as events arrive, reducing feature freshness from hours to seconds.

## Architecture Overview

A real-time AI data pipeline has four layers:

1. **Event Ingestion** - Kafka, Kinesis, or Pub/Sub receives raw events from applications, databases (via CDC), and external sources
2. **Stream Processing** - Flink, Kafka Streams, or Spark Structured Streaming transforms, enriches, and aggregates events into features
3. **Feature Serving** - Computed features are written to an online feature store (Redis, DynamoDB) for low-latency inference lookups
4. **Inference Trigger** - Events or feature updates trigger real-time inference, or features are read on-demand when inference requests arrive

## Stream Processing with Apache Flink

Flink is the most capable framework for complex real-time feature computation. It handles event-time processing, stateful aggregations, and exactly-once guarantees.

### Real-Time Feature Computation

```java
// Compute rolling 30-minute purchase count per user
DataStream<FeatureEvent> purchaseCounts = events
    .filter(e -> e.getType().equals("purchase"))
    .keyBy(Event::getUserId)
    .window(SlidingEventTimeWindows.of(
        Time.minutes(30), Time.minutes(1)))
    .aggregate(new CountAggregator())
    .map(count -> new FeatureEvent(
        count.getUserId(),
        "purchase_count_30m",
        count.getValue()));

// Write to feature store
purchaseCounts.addSink(new RedisSink<>(redisConfig));
```

### Enrichment with External Data

Stream processing often needs to join streaming events with reference data:

```java
// Enrich transactions with user profile data
DataStream<EnrichedTransaction> enriched = transactions
    .keyBy(Transaction::getUserId)
    .connect(userProfiles.keyBy(Profile::getUserId))
    .process(new EnrichmentFunction());
```

Use Flink's broadcast state for small reference datasets and async I/O for lookups against external stores.

### Handling Late-Arriving Data

Events arrive out of order. A mobile app might send events from a period of offline usage when connectivity resumes. Configure watermarks to handle this:

```java
WatermarkStrategy<Event> strategy = WatermarkStrategy
    .<Event>forBoundedOutOfOrderness(Duration.ofMinutes(5))
    .withTimestampAssigner((event, timestamp) ->
        event.getEventTime().toEpochMilli());
```

Events arriving after the watermark are considered late. Options:
- **Allow lateness** - Accept late events and update results (supported by Flink windowing)
- **Side output** - Route late events to a separate stream for batch reprocessing
- **Drop** - Discard late events if feature freshness is more important than completeness

## Stream-to-Feature-Store Pattern

The most common real-time AI pattern: stream processing computes features and writes them to an online store where the inference service reads them.

### Write Path

```
Events → Kafka → Flink → Redis/DynamoDB (online store)
                      → S3/Delta Lake (offline store)
```

Write to both online and offline stores from the same pipeline. The online store serves real-time inference. The offline store provides training data and backfill capability.

### Read Path

```
Inference Request → Read features from Redis → Combine with request features → Model inference
```

The inference service reads pre-computed streaming features (purchase count in the last 30 minutes) and combines them with request-time features (current item being viewed) before calling the model.

## Event-Driven Inference

For some use cases, inference should trigger immediately when an event arrives rather than waiting for an inference request:

- **Fraud detection** - Score every transaction as it occurs
- **Anomaly detection** - Evaluate every sensor reading in real time
- **Content moderation** - Classify every user submission immediately

Pattern: the stream processor calls the inference service directly for each event (or micro-batch) and writes the prediction result to a topic or database.

## Operational Considerations

**Checkpointing** - Configure Flink checkpointing to ensure exactly-once processing. Checkpoint interval balances recovery time against checkpoint overhead. Start with 60-second intervals.

**Backpressure** - When the processing layer cannot keep up with the ingestion rate, backpressure propagates upstream. Monitor backpressure metrics and scale processing parallelism accordingly.

**Schema Evolution** - Events change over time. Use Avro or Protobuf with a schema registry (Confluent Schema Registry) to manage schema evolution without breaking consumers.

**Monitoring** - Track end-to-end latency (event time to feature store write), throughput, checkpoint duration, and consumer lag. Alert when lag exceeds the freshness SLO.

Real-time pipelines are more complex to operate than batch. Start with the use cases where freshness directly impacts business outcomes and expand from there.

## Sources

- Kleppmann, M. *Designing Data-Intensive Applications.* O'Reilly Media, 2017., Chapters 10–11 cover stream processing, exactly-once semantics, and the trade-offs between batch and streaming architectures. The standard reference for distributed data systems.
- Apache Flink Documentation. "Event Time and Watermarks." https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/, Authoritative reference for the watermark and late-data handling patterns described above.
- Confluent Documentation. "Schema Registry." https://docs.confluent.io/platform/current/schema-registry/index.html, Schema evolution strategy referenced in the Operational Considerations section.
- Kreps, J. "The Log: What Every Software Engineer Should Know About Real-Time Data's Unifying Abstraction." *LinkedIn Engineering Blog* (2013). https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying, Foundational essay on log-based event streaming that underpins Kafka and streaming pipelines.
