---
title: "Cloud Pub/Sub - Messaging and Event Streaming"
description: "Google Cloud Pub/Sub is a fully managed real-time messaging service for asynchronous event-driven architectures, data streaming, and service integration."
date: 2026-03-28
categories: [Tools]
tags: [gcp, google-cloud, messaging, event-driven, streaming, pub-sub]
related:
  - tools/amazon-msk
  - tools/amazon-eventbridge
  - tools/google-cloud-dataflow
  - tools/google-cloud-functions
last_updated: 2026-05-30
---

Google Cloud Pub/Sub is a fully managed, serverless messaging service that enables asynchronous communication between services through a publish-subscribe pattern. Publishers send messages to topics, and subscribers receive messages from subscriptions attached to those topics. Pub/Sub decouples producers from consumers, handles message delivery guarantees, and scales automatically to handle millions of messages per second with no provisioning required.

Pub/Sub is the event backbone of many GCP architectures. In AI pipelines, it serves as the message bus that connects data producers to processing consumers. A common pattern has upstream services publishing events (new document uploaded, transaction completed, sensor reading received) to Pub/Sub topics, with Cloud Functions, Cloud Run, or Dataflow pipelines subscribing to process those events through AI services. Pub/Sub provides at-least-once delivery by default, with exactly-once delivery available for Dataflow consumers. Messages are retained for up to 31 days (configurable), providing a buffer that absorbs traffic spikes and allows consumers to process at their own pace.

Pub/Sub offers two subscription types: pull (subscribers request messages on their schedule) and push (Pub/Sub delivers messages to an HTTP endpoint). For streaming analytics, Pub/Sub integrates directly with Dataflow, providing a managed pipeline from event ingestion through processing to storage in BigQuery. Pub/Sub Lite offers a lower-cost alternative for high-volume workloads where zonal availability is acceptable. For organizations needing Kafka compatibility, Pub/Sub also supports the Kafka API through a managed Kafka integration, allowing existing Kafka producers and consumers to work with Pub/Sub without code changes.

## Key Capabilities

- **Serverless Auto-Scaling** - Handles zero to millions of messages per second with no capacity planning, provisioning, or partition management required.
- **At-Least-Once and Exactly-Once Delivery** - Default at-least-once delivery with exactly-once processing available for Dataflow subscribers, ensuring reliable event processing.
- **Message Ordering** - Optional ordering keys ensure messages with the same key are delivered in publish order, important for event-sourced architectures.
- **Dead-Letter Topics** - Automatically routes unprocessable messages to a dead-letter topic after a configurable number of delivery attempts, preventing poison messages from blocking processing.

## AWS Equivalent

Cloud Pub/Sub combines capabilities that AWS splits across Amazon MSK (managed Kafka for streaming), Amazon SNS (pub/sub messaging), Amazon SQS (message queuing), and Amazon EventBridge (event routing). Pub/Sub's serverless model is closest to SNS+SQS combined, while its streaming capabilities compete with MSK. Pub/Sub requires no partition management, unlike Kafka/MSK, but offers less granular control over message ordering and consumer group behavior.

## Origins and History

Google Cloud Pub/Sub was announced in 2014 and reached general availability in 2015. The service was built on Google's internal messaging infrastructure, which handles trillions of messages per day across Google's services. Pub/Sub Lite, a zonal lower-cost option, launched in general availability in March 2021. Exactly-once delivery for Dataflow subscribers was introduced in 2017. Message ordering support was added in 2020. In 2022, Google introduced BigQuery subscriptions, allowing messages to be written directly to BigQuery tables without intermediate processing. The Kafka-compatible API was added in 2023, simplifying migration for organizations with existing Kafka ecosystems.

## Sources

1. Google Cloud Documentation. "Pub/Sub overview." https://cloud.google.com/pubsub/docs/overview
2. Google Cloud Blog. "What is Pub/Sub?" https://cloud.google.com/pubsub/docs/overview
