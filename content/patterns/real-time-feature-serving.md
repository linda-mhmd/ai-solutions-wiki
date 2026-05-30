---
title: "Real-Time Feature Serving"
description: "Sub-millisecond feature serving for online inference: architecture, caching strategies, precomputation patterns, and consistency guarantees."
date: 2026-03-28
categories: [Patterns]
tags: [feature-serving, real-time, low-latency, online-inference, feature-store, caching]
related:
  - patterns/ml-feature-platform
  - patterns/caching-for-ai
  - patterns/batch-inference
  - patterns/real-time-vs-batch
last_updated: 2026-05-30
---

Online ML models that serve predictions in real time need feature values with single-digit millisecond latency. A fraud detection model evaluating a transaction cannot wait for a SQL query to compute the customer's 30-day spending average. Real-time feature serving precomputes and caches feature values so they are available instantly at inference time.

## The Latency Budget

A real-time inference request has a total latency budget, typically 50-200 milliseconds. This budget must cover feature retrieval, model inference, post-processing, and network overhead. If feature retrieval takes 100 milliseconds, little budget remains for the model itself. Feature serving must consume no more than 5-10 milliseconds of the total budget.

## Architecture

**Online feature store** - A low-latency key-value store (Redis, DynamoDB, Aerospike) indexed by entity ID. Each entry contains the precomputed feature vector for that entity. The inference service performs a single lookup by entity ID and receives all required features in one round trip.

**Precomputation pipeline** - A batch or streaming pipeline that computes feature values and writes them to the online store. Batch features (e.g., 30-day aggregates) are computed hourly or daily by a scheduled pipeline. Streaming features (e.g., count of events in the last 5 minutes) are computed continuously from event streams.

**Feature retrieval service** - A thin service layer that handles feature lookups, default value imputation for missing features, and feature vector assembly. It fetches features from the online store, applies any last-mile transformations, and returns the assembled vector to the inference service.

## Precomputation Patterns

**Materialized aggregates** - Precompute common aggregations (sum, count, average, max) over sliding windows and store the results. When the window slides, update the aggregate incrementally rather than recomputing from scratch.

**Event-driven updates** - Each incoming event triggers an update to the affected entity's features. A new purchase event increments the customer's purchase count and updates the running total. Use stream processing (Kafka Streams, Flink) to maintain these running aggregates.

**Scheduled snapshots** - For features that change slowly (customer demographics, account type), compute values on a daily schedule and cache them. These features do not need streaming updates.

## Consistency Considerations

Real-time feature serving trades strict consistency for latency. A feature computed from a batch pipeline may be up to one pipeline cycle stale. A streaming feature may reflect events with seconds of delay. Document the staleness guarantee for each feature so that model developers understand the freshness of their inputs.

For features where staleness is unacceptable (e.g., current account balance for a fraud check), compute the feature inline during the inference request. Accept the latency cost for these critical features and budget accordingly.

## Fallback Behavior

When a feature lookup fails or returns no data (new entity with no history), the serving layer must return sensible defaults. Define default values for each feature during feature registration. Use population-level statistics (global average, median) as defaults rather than zeros, which can bias model predictions.

## Scaling

Partition the online store by entity ID to distribute load across nodes. Replicate for read throughput. Monitor cache hit rates and store size. Evict features for entities that have not been queried recently to manage memory. Right-size the store based on the active entity count, not the total entity count.
