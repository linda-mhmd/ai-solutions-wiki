---
title: "AWS IoT Core - IoT Platform for AI Applications"
description: "A comprehensive reference for AWS IoT Core: device connectivity, message routing, rules engine, and integration patterns for IoT-driven AI and ML workloads."
date: 2026-03-28
categories: [Tools]
tags: [aws-iot-core, AWS, IoT, MQTT, edge, device-management]
related:
  - tools/amazon-timestream
  - tools/amazon-sagemaker
  - tools/aws-lambda
  - tools/azure-iot-hub
  - tools/eclipse-mosquitto
last_updated: 2026-05-30
---

AWS IoT Core is a managed service that connects IoT devices to the AWS cloud. It handles device authentication, message brokering (via MQTT, HTTPS, and WebSocket protocols), and message routing through a rules engine that directs device data to AWS services. For AI projects, IoT Core is the entry point for sensor data that feeds ML models: predictive maintenance systems, anomaly detection, quality monitoring, and environmental intelligence.

Official documentation: https://docs.aws.amazon.com/iot/

## Core Concepts

**Thing** - A representation of a physical device or logical entity in the IoT Core registry. Things have attributes (metadata like location, firmware version, device type), belong to thing groups, and are associated with certificates for authentication.

**Message Broker** - The MQTT message broker that handles publish/subscribe communication between devices and the cloud. Devices publish messages to topics (e.g., sensors/factory-1/temperature) and subscribe to topics to receive commands. The broker supports QoS 0 (at most once) and QoS 1 (at least once) delivery.

**Rules Engine** - An SQL-based engine that evaluates incoming messages and routes them to AWS services. A rule consists of a SQL query (filtering and transforming the message) and one or more actions (writing to S3, Timestream, DynamoDB, Lambda, Kinesis, SQS, SNS, or other services). Rules are the bridge between device data and the analytics/AI stack.

**Device Shadow** - A JSON document representing the desired and reported state of a device. Shadows enable cloud applications to read the last reported state and set desired states even when the device is offline. When the device reconnects, it syncs with its shadow.

## Rules Engine for AI Pipelines

The rules engine is where IoT data enters the AI pipeline. Common routing patterns:

**Telemetry to Timestream** - Route sensor readings directly to Timestream for time series storage and analytics. The rule extracts timestamp, measurements, and device metadata from the MQTT message and writes them as Timestream records.

**Events to Lambda** - Trigger Lambda functions for real-time processing: threshold alerting, feature computation, or inference calls. When a temperature sensor reports an anomalous reading, a rule triggers a Lambda that calls a SageMaker endpoint for anomaly classification.

**Raw data to S3** - Archive all device messages to S3 (via Kinesis Firehose) for batch analytics and model training. This creates a complete data lake of IoT events that supports historical analysis and training data generation.

**Enrichment and filtering** - The rules SQL supports WHERE clauses, functions (math, string, conditional), and topic-level filtering. Filter out heartbeat messages, compute derived values (Fahrenheit to Celsius conversion), and route different message types to different destinations.

## ML at the Edge

For use cases requiring low-latency inference on the device itself, AWS IoT Greengrass extends cloud capabilities to edge devices. Greengrass runs ML models locally using SageMaker Neo-compiled models or custom inference containers. The device performs inference on local data and sends results (not raw data) to the cloud, reducing bandwidth and latency.

Common edge ML patterns include visual quality inspection (camera + Lookout for Vision model on Greengrass), predictive maintenance (vibration sensor + anomaly detection model), and natural language processing (voice commands processed locally for immediate response).

## Device Security

IoT Core uses X.509 certificate-based authentication. Each device has a unique certificate, and IoT policies control which topics the device can publish to and subscribe from. This is critical for AI applications because compromised device data can poison ML models.

Best practices include: one certificate per device (never share certificates), least-privilege policies (devices can only publish to their own topics), and certificate rotation for long-lived deployments.

## Scale Considerations

IoT Core handles billions of messages per day across millions of devices. There are account-level throttles on message publish rate, rules engine evaluations, and device shadow updates. For large deployments, monitor these quotas and request increases early. The rules engine processes messages in near-real-time with typical latency under 100ms from publish to action execution.

## Pricing

IoT Core charges per million messages (with message size tiers), per rules engine evaluation, per device shadow operation, and per device registry operation. The message cost is the dominant factor. Optimize by batching multiple sensor readings into a single message and filtering noisy devices at the edge before publishing.
