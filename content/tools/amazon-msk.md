---
title: "Amazon MSK - Managed Streaming for Apache Kafka"
description: "A comprehensive reference for Amazon MSK: managed Kafka clusters, event streaming patterns, and integration with AI/ML data pipelines."
date: 2026-03-28
categories: [Tools]
tags: [amazon-msk, AWS, kafka, streaming, event-driven, data-pipelines]
related:
  - tools/aws-lambda
  - tools/aws-s3
  - tools/amazon-eventbridge
  - tools/azure-event-hubs
  - tools/google-cloud-pub-sub
  - tools/apache-kafka
last_updated: 2026-05-30
---

Amazon Managed Streaming for Apache Kafka (MSK) is a fully managed service for running Apache Kafka on AWS. Kafka is the industry standard for real-time event streaming, and MSK removes the operational burden of managing Kafka clusters: broker provisioning, patching, replication, and failure recovery are handled automatically. For AI projects, MSK serves as the real-time data backbone that feeds events into ML feature stores, inference pipelines, and analytics systems.

Official documentation: https://docs.aws.amazon.com/msk/
Pricing: https://aws.amazon.com/msk/pricing/
Service quotas: https://docs.aws.amazon.com/msk/latest/developerguide/limits.html

## Core Concepts

**Cluster** - A managed Kafka cluster consisting of broker nodes distributed across availability zones. You choose the number of brokers, instance type, and storage volume. MSK manages ZooKeeper (or KRaft in newer versions) automatically.

**Topic** - A named stream of records. Producers write events to topics, and consumers read from them. Topics are partitioned for parallelism: more partitions enable higher throughput at the cost of increased resource usage.

**MSK Serverless** - A serverless option that removes the need to specify broker count and instance types. MSK Serverless automatically provisions and scales capacity based on throughput. Best for workloads with variable or unpredictable traffic patterns.

**MSK Connect** - A managed connector service compatible with Kafka Connect. Provides pre-built connectors for common sinks (S3, Redshift, OpenSearch, databases) and sources. Eliminates the need to run and manage connector infrastructure separately.

## AI/ML Data Pipeline Patterns

**Real-time feature engineering** - Events from applications (user clicks, transactions, sensor readings) flow through MSK topics. Consumer applications compute features in real time (rolling averages, counts within time windows, session aggregations) and write them to a feature store. These features are then available for real-time model inference with minimal latency.

**Event-driven inference** - An MSK topic receives events that require ML predictions (fraud scoring for transactions, content classification for uploads). A consumer application reads events, calls the model endpoint, and writes results to an output topic. This decouples the production system from the ML infrastructure and handles backpressure naturally through Kafka's consumer group mechanics.

**Training data collection** - Production events streamed through MSK are simultaneously written to S3 (via MSK Connect with an S3 sink connector) for model training. This ensures training data reflects actual production patterns and arrives continuously without batch ETL jobs.

## MSK Serverless vs Provisioned

MSK Serverless is the simpler option: no broker count, no instance sizing, no storage management. It scales automatically and charges based on throughput (per GB ingested and retained). Choose serverless for new projects, variable workloads, or teams without Kafka operational expertise.

MSK Provisioned gives full control over cluster configuration. Choose provisioned when you need specific Kafka features not yet supported in serverless (tiered storage, custom configurations), when throughput is consistently high and predictable (provisioned can be cheaper at steady-state high volume), or when you need fine-grained control over broker placement and networking.

## Integration with Lambda

MSK integrates with Lambda as an event source. Lambda polls the Kafka topic and invokes your function with batches of records. This is the simplest pattern for processing MSK events when the processing logic is straightforward. Lambda handles offset management and scaling automatically.

For complex processing that requires state (windowed aggregations, joins across topics), use Amazon Managed Service for Apache Flink or a containerized Kafka Streams application on ECS/EKS instead of Lambda.

## Security

MSK supports TLS encryption in transit, encryption at rest with KMS, and multiple authentication mechanisms: IAM (recommended for new deployments), SASL/SCRAM (username/password), and mutual TLS (certificate-based). For network isolation, MSK clusters run in your VPC with security group controls.

## Monitoring

MSK emits metrics to CloudWatch across three levels: cluster-level (aggregate throughput, storage), broker-level (CPU, memory, network), and topic-level (messages per second, bytes per second, consumer lag). Consumer lag is the most important metric for AI pipelines: it tells you how far behind your processing is from the latest events. Alert on consumer lag increasing, as it indicates your consumers cannot keep up with the event rate.

## Pricing

MSK Provisioned charges per broker-hour and per GB of storage. MSK Serverless charges per GB of data throughput and per GB-hour of retention. Estimate costs based on your expected data volume: message size multiplied by messages per second multiplied by seconds per month, then factor in retention period. Data transfer between MSK and consumers in the same AZ is free.
