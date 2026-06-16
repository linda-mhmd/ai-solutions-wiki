---
title: "Amazon MSK - Managed Streaming for Apache Kafka"
description: "A comprehensive reference for Amazon MSK: managed Kafka clusters, event streaming patterns, and integration with AI/ML data pipelines."
date: 2026-03-28
categories: [Tools]
tags: [AWS, kafka, streaming, event-driven, data-pipelines, "aws-service"]
related:
  - tools/aws-lambda
  - tools/aws-s3
  - tools/amazon-eventbridge
  - tools/azure-event-hubs
  - tools/google-cloud-pub-sub
  - tools/apache-kafka
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
layer: data
provider: aws
pricing_model: payg
maturity: production
---

Amazon Managed Streaming for Apache Kafka (MSK) is a fully managed service for running Apache Kafka on AWS. Kafka is the industry standard for real-time event streaming, and MSK removes the operational burden of managing Kafka clusters: broker provisioning, patching, replication, and failure recovery are handled automatically. For AI projects, MSK serves as the real-time data backbone that feeds events into ML feature stores, inference pipelines, and analytics systems.

Amazon MSK is a live, actively developed AWS service. Recent releases include MSK Express brokers (a faster, more elastic broker type), KRaft support for Express brokers with Apache Kafka 3.9 (December 2025), and broker logs for Express brokers (February 2026).

Official documentation: https://docs.aws.amazon.com/msk/
Pricing: https://aws.amazon.com/msk/pricing/
Service quotas: https://docs.aws.amazon.com/msk/latest/developerguide/limits.html

## Beginner foundations

Before the AWS specifics, here are the underlying ideas in plain words.

- **Event streaming** - instead of saving data and querying it later (the database model), event streaming treats data as a continuous flow of small records (events) that systems can react to the moment they happen. A bank reacting to a card swipe within milliseconds is event streaming, not batch reporting.
- **Apache Kafka** - an open-source platform that stores these streams of events durably and lets many independent applications read them at their own pace. It is the de facto standard for this job. Amazon MSK runs Kafka for you so you do not have to operate the servers yourself.
- **Producer and consumer** - a producer is any application that writes events into Kafka. A consumer is any application that reads them. They are decoupled: producers do not know or wait for consumers, which is what makes the system scalable and resilient.
- **Broker and cluster** - a broker is a single Kafka server that stores data and serves reads and writes. A cluster is a group of brokers working together, spread across data centres for fault tolerance.

Prerequisite concepts worth reading first: {{< relref "glossary/kafka" >}}, {{< relref "glossary/event-driven-architecture" >}}, {{< relref "glossary/stream-processing" >}}, {{< relref "glossary/pub-sub" >}}, and {{< relref "glossary/message-queue" >}}.

## Core Concepts

**Cluster** - A managed Kafka cluster consisting of broker nodes distributed across availability zones. You choose the number of brokers, instance type, and storage volume. MSK manages cluster metadata for you. Newer Kafka versions use KRaft (Kafka Raft), Kafka's built-in consensus protocol, which removes the dependency on Apache ZooKeeper. Apache Kafka 3.9 on MSK is the last version to support both ZooKeeper and KRaft, and Apache Kafka 4.0 deprecates ZooKeeper-based metadata management, so new clusters should plan for KRaft.

**Topic** - A named stream of records. Producers write events to topics, and consumers read from them. Topics are partitioned for parallelism: more partitions enable higher throughput at the cost of increased resource usage.

**Express brokers** - A broker type for MSK Provisioned, designed for higher throughput and faster operations than standard brokers. AWS states Express brokers deliver up to 3x more throughput per broker, scale up to 20x faster, recover up to 90% quicker, support up to 5x more partitions per broker, and can improve price-performance by up to 50% for partition-bound workloads. New Express broker clusters on Kafka 3.9 use KRaft automatically.

**MSK Serverless** - A serverless option that removes the need to specify broker count and instance types. MSK Serverless automatically provisions and scales capacity based on throughput. Best for workloads with variable or unpredictable traffic patterns.

**MSK Connect** - A managed connector service compatible with Kafka Connect. Provides pre-built connectors for common sinks (Amazon S3, Amazon Redshift, Amazon OpenSearch Service, databases) and sources. Eliminates the need to run and manage connector infrastructure separately.

**MSK Replicator** - A fully managed feature that replicates data across MSK clusters in the same or different AWS Regions. It supports active-passive setups (for disaster recovery) and active-active setups (where clusters in multiple Regions serve reads and writes at once), without you operating MirrorMaker yourself.

## AI/ML Data Pipeline Patterns

**Real-time feature engineering** - Events from applications (user clicks, transactions, sensor readings) flow through MSK topics. Consumer applications compute features in real time (rolling averages, counts within time windows, session aggregations) and write them to a {{< relref "glossary/feature-store" >}}. These features are then available for real-time model inference with minimal latency.

**Event-driven inference** - An MSK topic receives events that require ML predictions (fraud scoring for transactions, content classification for uploads). A consumer application reads events, calls the model endpoint, and writes results to an output topic. This decouples the production system from the ML infrastructure and handles backpressure naturally through Kafka's consumer group mechanics.

**Training data collection** - Production events streamed through MSK are simultaneously written to S3 (via MSK Connect with an S3 sink connector) for model training. This ensures training data reflects actual production patterns and arrives continuously without batch ETL jobs.

## MSK Serverless vs Provisioned

MSK Serverless is the simpler option: no broker count, no instance sizing, no storage management. It scales automatically and bills on usage (an hourly cluster rate, an hourly per-partition rate, per-GB data written and read, and storage consumed). Choose serverless for new projects, variable workloads, or teams without Kafka operational expertise.

MSK Provisioned gives full control over cluster configuration. Choose provisioned when you need specific Kafka features or broker types not offered in serverless (Express brokers, tiered storage, custom configurations), when throughput is consistently high and predictable (provisioned can be cheaper at steady-state high volume), or when you need fine-grained control over broker placement and networking. Within Provisioned, you choose between standard brokers and the newer Express brokers depending on your throughput and partition needs.

## Integration with Lambda

MSK integrates with {{< relref "tools/aws-lambda" >}} as an event source. Lambda polls the Kafka topic and invokes your function with batches of records. This is the simplest pattern for processing MSK events when the processing logic is straightforward. Lambda handles offset management and scaling automatically.

For complex processing that requires state (windowed aggregations, joins across topics), use Amazon Managed Service for Apache Flink (see {{< relref "tools/apache-flink" >}}) or a containerized Kafka Streams application on Amazon ECS or Amazon EKS instead of Lambda.

## Security

MSK supports TLS encryption in transit, encryption at rest with AWS KMS, and multiple authentication mechanisms: IAM access control (recommended for new deployments), SASL/SCRAM (username/password), and mutual TLS (certificate-based). For network isolation, MSK clusters run in your Amazon VPC with security group controls.

## Best practices

For production deployments, follow the AWS Well-Architected Framework. AWS publishes a streaming lens with concrete guidance for Kafka-style workloads: see the [Streaming Media Lens](https://docs.aws.amazon.com/wellarchitected/latest/streaming-media-lens/streaming-media-lens.html) and the general framework at the [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html). Practical starting points for MSK: spread brokers across at least three Availability Zones, prefer IAM access control, enable encryption in transit and at rest, set alarms on consumer lag and disk usage, and use tiered storage (standard brokers) to keep long-retention topics affordable. On the wiki, see {{< relref "foundations/well-architected" >}} for the pillars in plain words.

## Monitoring

MSK emits metrics to CloudWatch across three levels: cluster-level (aggregate throughput, storage), broker-level (CPU, memory, network), and topic-level (messages per second, bytes per second, consumer lag). Consumer lag is the most important metric for AI pipelines: it tells you how far behind your processing is from the latest events. Alert on consumer lag increasing, as it indicates your consumers cannot keep up with the event rate.

## Pricing

MSK Provisioned with standard brokers charges per broker-hour (billed per second) plus storage in GB-months, with optional provisioned storage throughput billed separately. Express brokers add a per-GB charge for data written, at higher hourly rates, in exchange for their throughput and scaling gains. MSK Serverless bills on usage: an hourly cluster rate, an hourly per-partition rate, per-GB data written and read, and storage consumed. MSK Connect bills per connector-hour based on the number of workers and MSK Connect Units (MCUs). Estimate costs from your expected data volume (message size multiplied by messages per second multiplied by seconds per month) and your retention period. Internal broker-to-broker replication data transfer is not charged; standard AWS data transfer charges apply for cross-Region traffic and internet egress. Always confirm current rates on the official pricing page below, since prices vary by Region and change over time.

## Sources

- [Amazon MSK product page](https://aws.amazon.com/msk/) - official overview, Express broker performance claims (AWS).
- [Amazon MSK pricing](https://aws.amazon.com/msk/pricing/) - current pricing model for Provisioned, Express brokers, Serverless, and MSK Connect (AWS).
- [Amazon MSK Developer Guide: supported Apache Kafka versions](https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.html) - version table, KRaft, and ZooKeeper deprecation (AWS).
- [Amazon MSK introduces KRaft support for Express Brokers with Apache Kafka v3.9](https://aws.amazon.com/about-aws/whats-new/2025/12/aws-msk-express-brokers-support-kraft) - December 18, 2025 announcement (AWS).
- [Amazon MSK now supports broker logs on Express Brokers](https://aws.amazon.com/about-aws/whats-new/2026/02/aws-msk-express-brokers-support-broker-logs) - February 2026 announcement (AWS).
- [Amazon MSK Replicator](https://docs.aws.amazon.com/msk/latest/developerguide/msk-replicator.html) - cross-Region and same-Region replication, active-active and active-passive (AWS).
- [Apache Kafka](https://kafka.apache.org/) and [Apache Kafka source](https://github.com/apache/kafka) - the open-source project MSK runs.
