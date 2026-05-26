---
title: "Real-Time Feature Computation Pattern"
description: "The architectural pattern for computing ML features from event streams: windowed aggregations, stream-table joins, dual-write to online and offline stores, training-serving consistency, and operational trade-offs."
date: 2026-03-28
categories: [Patterns]
tags: [stream-processing, feature-store, real-time, flink, inference, ai-engineering]
related:
  - glossary/stream-processing
  - guides/stream-processing-ai
  - glossary/change-data-capture
  - glossary/feature-store
  - glossary/kafka
  - patterns/event-driven-ai
  - guides/mlops-getting-started
---

**This page describes the pattern.** For a full implementation guide covering pipeline architecture, late data handling, schema evolution, and event-driven inference, see [Real-Time Data Pipelines for AI Workloads](/guides/stream-processing-ai/).

The core problem this pattern solves: ML models need features that reflect current state, but computing features in batch introduces hours of staleness. For fraud detection, recommendation ranking, and dynamic pricing, a feature that is two hours old can be as misleading as no feature at all. The real-time feature computation pattern maintains continuously updated feature values by computing them in-stream as events arrive, making freshness a property of the architecture rather than a constraint of the compute schedule.

## The Pattern

```
Events → Stream Processor → Online Feature Store → Inference Service
                          → Offline Feature Store → Training Pipeline
```

1. Raw events flow into a streaming platform (Kafka, Kinesis)
2. A stream processor (Flink, Kafka Streams) computes features using windowed aggregations, joins, and transformations
3. Computed features are written to an online store (Redis, DynamoDB) for low-latency inference lookups
4. The same features are written to an offline store (S3, Delta Lake) for model training
5. The inference service reads features from the online store at request time

The dual write to online and offline stores ensures training-serving consistency: the model trains on the same features it will see at inference time.

## Windowed Aggregations

Most real-time features are windowed aggregations over event streams:

| Feature | Window | Aggregation |
|---|---|---|
| Purchase count (30 min) | Sliding, 30 min | Count |
| Average transaction amount (1 hour) | Sliding, 1 hour | Mean |
| Unique categories viewed (session) | Session, 30 min gap | Count distinct |
| Failed login attempts (10 min) | Sliding, 10 min | Count |
| Max single purchase (24 hours) | Sliding, 24 hours | Max |

### Implementation with Flink

```java
DataStream<Feature> features = events
    .keyBy(Event::getUserId)
    .window(SlidingEventTimeWindows.of(
        Time.minutes(30), Time.minutes(1)))
    .aggregate(new MultiFeatureAggregator());
```

The `MultiFeatureAggregator` computes multiple features from the same window to avoid redundant processing:

```java
public class MultiFeatureAggregator
    implements AggregateFunction<Event, FeatureAccumulator, Feature> {

    public FeatureAccumulator createAccumulator() {
        return new FeatureAccumulator();
    }

    public FeatureAccumulator add(Event event, FeatureAccumulator acc) {
        acc.count++;
        acc.totalAmount += event.getAmount();
        acc.categories.add(event.getCategory());
        acc.maxAmount = Math.max(acc.maxAmount, event.getAmount());
        return acc;
    }

    public Feature getResult(FeatureAccumulator acc) {
        return new Feature(
            acc.count,
            acc.totalAmount / acc.count,
            acc.categories.size(),
            acc.maxAmount
        );
    }
}
```

## Stream-Table Joins

Real-time features often need enrichment from reference data. A transaction event needs the user's account age, credit score, or segment membership:

```java
// Broadcast the user profile table to all parallel instances
BroadcastStream<UserProfile> profileBroadcast = profiles
    .broadcast(profileStateDescriptor);

DataStream<EnrichedEvent> enriched = events
    .connect(profileBroadcast)
    .process(new ProfileEnrichmentFunction());
```

For large reference tables, use Flink's async I/O to look up records from an external store without blocking the stream:

```java
DataStream<EnrichedEvent> enriched = AsyncDataStream
    .unorderedWait(
        events,
        new AsyncDatabaseLookup(connectionPool),
        1000,  // timeout ms
        TimeUnit.MILLISECONDS,
        100    // max concurrent requests
    );
```

## Consistency Between Online and Offline

The most common bug in real-time feature systems is training-serving skew: the model trains on features computed differently than the features it sees at inference time.

### Causes of Skew

- **Different code paths** - Batch feature computation uses SQL; online uses Flink. Logic diverges over time.
- **Different time semantics** - Batch uses processing time; streaming uses event time. Late-arriving events are handled differently.
- **Different data sources** - Batch reads from the warehouse; streaming reads from Kafka. The warehouse may have undergone additional cleaning.

### Prevention

- **Single computation path** - Compute features once in the stream processor and write to both online and offline stores
- **Feature logging** - At inference time, log the exact feature values used. Compare logged features against offline-computed features to detect skew.
- **Automated skew detection** - Periodically compute features using both the batch and streaming paths and alert if they diverge beyond a threshold.

## Operational Considerations

**State Size** - Long windows (24-hour sliding windows) with high-cardinality keys (per-user features for millions of users) create large state. Monitor Flink checkpoint size and RocksDB memory usage. Consider approximate algorithms (HyperLogLog for count distinct) for very large state.

**Backfill** - When adding a new feature or recovering from failure, you need to recompute features from historical data. Design the stream processor to also read from the offline store for backfill, producing the same output as the real-time path.

**Feature Freshness SLO** - Define and monitor the maximum acceptable delay between an event occurring and the corresponding feature being available in the online store. Alert when the SLO is breached.

Real-time feature computation adds significant operational complexity over batch. Use it selectively for features where freshness directly impacts prediction quality, and keep batch computation for features where hourly or daily freshness is sufficient.

## Sources

- Kreps, J., Narkhede, N., and Rao, J. "Kafka: A Distributed Messaging System for Log Processing." *NetDB Workshop at VLDB* (2011). https://www.microsoft.com/en-us/research/wp-content/uploads/2017/09/Kafka.pdf, Original Kafka paper describing the log-based event streaming model this pattern depends on.
- Zaharia, M. et al. "Apache Spark: A Unified Engine for Big Data Processing." *Communications of the ACM* 59, no. 11 (2016): 56–65. https://dl.acm.org/doi/10.1145/2934664, Covers structured streaming and stateful computation in Spark, an alternative to Flink for this pattern.
- Marz, N., and Warren, J. *Big Data: Principles and Best Practices of Scalable Real-Time Data Systems.* Manning Publications, 2015., Introduces the Lambda Architecture (batch layer + speed layer), the historical predecessor to the unified streaming approach described here.
- Apache Flink Documentation. "Stateful Stream Processing." https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/stateful-stream-processing/, Reference for windowed aggregations, state backends, and exactly-once semantics used in the Flink examples above.
