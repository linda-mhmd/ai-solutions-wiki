---
title: "Amazon Kinesis"
description: "What Amazon Kinesis is, how it processes streaming data in real time, and when to use Kinesis versus other streaming options."
date: 2026-03-28
categories: [Glossary]
tags: [kinesis, streaming, real-time, data-engineering, AWS]
related:
  - glossary/kafka
  - glossary/message-queue
  - glossary/event-driven-architecture
last_updated: 2026-05-30
---

Amazon Kinesis is a managed platform for collecting, processing, and analyzing streaming data in real time. It enables continuous ingestion of data from thousands of sources (application logs, IoT sensors, clickstreams, video feeds) and processing within seconds of arrival.

## Kinesis Services

**Kinesis Data Streams** is the core streaming service. Producers write records to shards; consumers read and process records in order. Data is retained for 24 hours (extendable to 365 days). You manage shard count to control throughput.

**Kinesis Data Firehose** is the simplest way to load streaming data into destinations (S3, Redshift, OpenSearch, HTTP endpoints). It handles batching, compression, and delivery without writing consumer code. Use Firehose when you need to land streaming data in a destination with minimal code.

**Kinesis Data Analytics** runs SQL or Apache Flink applications on streaming data for real-time analytics, transformations, and anomaly detection.

## Why It Matters for AI

Real-time AI applications need streaming infrastructure. Examples include real-time fraud detection (process each transaction as it occurs), live content moderation (analyze user-generated content immediately), operational anomaly detection (detect infrastructure issues from streaming metrics), and real-time personalization (update recommendations based on current behavior).

Kinesis provides the data transport layer: events arrive continuously, processing happens within seconds, and results feed downstream systems (alerts, dashboards, databases).

## Kinesis vs. Kafka

Kinesis is fully managed with no infrastructure to operate, integrates tightly with AWS services, and scales by adding shards. Kafka (MSK) offers higher throughput, longer retention, more flexible consumer patterns, and a richer ecosystem of connectors. Choose Kinesis for simpler streaming needs with minimal operational overhead. Choose MSK/Kafka for high-throughput, complex streaming architectures or when you need Kafka's ecosystem.

## Practical Guidance

Size shards based on your expected throughput (1 MB/s write, 2 MB/s read per shard). Use enhanced fan-out for multiple consumers that need dedicated throughput. Use Firehose for simple data landing; use Data Streams with Lambda or KCL consumers for custom processing logic. Monitor iterator age to ensure consumers are keeping up with producers.

## Sources

- Akidau, T., Baldacci, A., Balikov, K., Čuklev, D., Perry, J., Whittle, S., Lam, W., Malone, B., Nathan, D., & Saecker, M. (2013). MillWheel: Fault-tolerant stream processing at internet scale. *Proceedings of the VLDB Endowment*, 6(11), 1033–1044. (Stream processing foundations at scale; watermarks, exactly-once semantics, and out-of-order data handling underlying Kinesis design.)
- Zaharia, M., Das, T., Li, H., Hunter, T., Shenker, S., & Stoica, I. (2013). Discretized streams: Fault-tolerant streaming computation at scale. *Proceedings of ACM SOSP*, 423–438. (Streaming computation at scale; fault tolerance via micro-batching, the theoretical basis for streaming data pipelines like Kinesis.)
- AWS. (2024). *Amazon Kinesis Data Streams Developer Guide*. Amazon Web Services. (Shards, enhanced fan-out, iterator types, and the Kinesis Client Library architecture.)
