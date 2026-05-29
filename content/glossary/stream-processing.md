---
title: "Stream Processing"
description: "What stream processing is, how Flink, Spark Streaming, and Kafka Streams enable real-time data transformation, and why streaming matters for AI feature computation."
date: 2026-03-28
categories: [Glossary]
tags: [stream-processing, flink, spark-streaming, kafka-streams, real-time, data-engineering]
related:
  - guides/stream-processing-ai
  - patterns/stream-processing-ai
  - glossary/change-data-capture
---

Stream processing is the continuous computation of results as data arrives, rather than waiting to collect a batch and process it all at once. Data flows through a processing pipeline record by record or in micro-batches, producing results with low latency.


<figure class="bz-figure">
  <img src="/img/dark-cherry/data-projection.png" alt="A dark cylinder projecting continuous rows of red light points in real time: a stream of signals arriving faster than any batch could capture." loading="lazy">
  <figcaption>Stream processing handles data as it arrives. Not stored, then processed. Processed as it moves. The projection never stops. The system must keep up or fall behind permanently.</figcaption>
</figure>

The distinction from batch processing is fundamental: batch operates on bounded datasets (all records from yesterday), while stream processing operates on unbounded datasets (records that keep arriving indefinitely).

## Core Concepts

**Event Time vs Processing Time** - Event time is when the event actually occurred. Processing time is when the system processes it. Events can arrive late or out of order. Robust stream processors handle this gap using watermarks - a mechanism that tracks how far behind the latest event time the system should wait before considering a window complete.

**Windowing** - Grouping unbounded data into finite chunks for aggregation. Tumbling windows are fixed-size, non-overlapping intervals. Sliding windows overlap. Session windows group events by periods of activity separated by gaps. A real-time feature computing "purchases in the last 30 minutes" uses a sliding window.

**State Management** - Stream processors maintain state across events: running counts, aggregations, joins between streams. Flink manages state with checkpointing and exactly-once semantics. Kafka Streams uses local RocksDB state stores with changelog topics for recovery.

**Exactly-Once Semantics** - Guaranteeing that each record is processed exactly once, even during failures and restarts. This is the hardest problem in stream processing and different frameworks achieve it differently.

## Key Frameworks

**Apache Flink** - The most capable open-source stream processor. True event-time processing, exactly-once state management, sophisticated windowing, and both stream and batch modes. Used by companies processing millions of events per second.

**Apache Kafka Streams** - A lightweight stream processing library that runs as part of your application (no separate cluster). Best for simpler transformations, enrichment, and aggregations where Kafka is already the backbone.

**Apache Spark Structured Streaming** - Micro-batch processing on the Spark engine. Processes data in small batches (as low as 100ms intervals). Good when you already have a Spark investment and can tolerate micro-batch latency.

**Amazon Kinesis Data Analytics** - Managed Flink service on AWS. No cluster management. Integrates with Kinesis streams, S3, and other AWS services.

## Stream Processing for AI

AI systems benefit from stream processing in two key areas: real-time feature computation (computing features at inference time from live data) and continuous data pipeline processing (transforming and enriching data as it arrives for model training and feature stores).

## Sources

- Zaharia, M., et al. (2013). Discretized streams: Fault-tolerant streaming computation at scale. *SOSP 2013*. (Spark Streaming; introduced the micro-batch model that Spark Structured Streaming builds on.)
- Carbone, P., et al. (2015). Apache Flink: Stream and batch processing in a single engine. *IEEE Data Engineering Bulletin, 38*(4), 28–38. (Apache Flink; defined true streaming with event-time processing and exactly-once state semantics.)
- Akidau, T., et al. (2015). The dataflow model: A practical approach to balancing correctness, latency, and cost in massive-scale, unbounded, out-of-order data processing. *VLDB 2015*. (Google Dataflow model; defined windowing, watermarks, and triggers, the conceptual foundation for Flink and Beam.)
