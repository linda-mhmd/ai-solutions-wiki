---
title: "Amazon Timestream - Time Series Database"
description: "A comprehensive reference for Amazon Timestream: purpose-built time series storage, query patterns, and integration with IoT and operational AI workloads."
date: 2026-03-28
categories: [Tools]
tags: [amazon-timestream, AWS, time-series, IoT, monitoring, database, "aws-service"]
related:
  - tools/aws-iot-core
  - tools/amazon-managed-grafana
  - tools/amazon-quicksight
  - tools/azure-data-explorer
  - tools/timescaledb
  - tools/influxdb
last_updated: 2026-05-30
---

Amazon Timestream is a serverless time series database designed for storing and analyzing trillions of time series events per day. It automatically manages data lifecycle, moving recent data from a high-performance memory store to a cost-optimized magnetic store based on retention policies you define. For AI projects involving IoT telemetry, operational metrics, or any time-stamped measurement data, Timestream provides fast ingestion and purpose-built query functions at a fraction of the cost of running a general-purpose database.

Official documentation: https://docs.aws.amazon.com/timestream/

## Core Concepts

**Database** - The top-level container. Each database holds multiple tables and has its own encryption and access control settings.

**Table** - A table stores time series records. Each table has two storage tiers: a memory store (for recent, frequently queried data) and a magnetic store (for older, less frequently accessed data). You configure retention periods for each tier independently. For example, keep the last 24 hours in memory and the last 90 days on magnetic storage.

**Record** - A single data point consisting of a measure name, measure value, timestamp, and one or more dimensions. Dimensions are metadata attributes (device_id, region, sensor_type) that identify the time series. Timestream supports single-measure records (one value per record) and multi-measure records (multiple related values in a single record, reducing storage cost and improving query performance).

**Scheduled Query** - A pre-defined query that runs on a schedule, materializing results into a destination table. Use this to pre-aggregate raw high-frequency data into summary tables (hourly averages, daily maximums) that are cheaper to store and faster to query for dashboards.

## Time Series Query Functions

Timestream's SQL dialect includes purpose-built time series functions that would be complex to express in standard SQL.

**Interpolation** - Fill gaps in sparse time series using linear interpolation, constant fill, or last-value carry-forward. Essential for aligning time series from sensors reporting at different intervals.

**Time binning** - Aggregate data into fixed time windows (bin function). Group sensor readings into 5-minute, 1-hour, or 1-day bins for summarization.

**Time series functions** - Running averages, derivatives (rate of change), and lag/lead functions operate directly on ordered time series data without self-joins.

## Integration with IoT Core

The most common ingestion pattern for IoT data routes messages through AWS IoT Core rules directly into Timestream. IoT devices publish MQTT messages, IoT Core rules extract the timestamp and measurements, and Timestream ingests them. This pattern handles millions of messages per second without provisioning any infrastructure.

For non-IoT sources, Timestream provides a write API. Common patterns include Lambda functions processing CloudWatch metrics, Kinesis Data Streams for high-throughput event processing, and Telegraf (the open-source metrics agent) with its native Timestream output plugin.

## Grafana Integration

Timestream has a native data source plugin for Amazon Managed Grafana. This enables teams to build operational dashboards with real-time and historical views directly on top of Timestream data. The combination of Timestream for storage and Grafana for visualization is the standard pattern for IoT monitoring dashboards in AWS.

## ML and Anomaly Detection

Timestream data feeds into ML workflows through several paths. Export to S3 (via scheduled queries or UNLOAD) for SageMaker training. Use Lookout for Metrics to detect anomalies in Timestream-stored metrics. Or query Timestream directly from Lambda-based inference pipelines for real-time feature retrieval.

For predictive maintenance use cases, the pattern is: store sensor telemetry in Timestream, train failure prediction models in SageMaker using exported historical data, and run inference against real-time Timestream queries to predict which equipment needs maintenance.

## Pricing

Timestream charges separately for writes, memory store, magnetic store, and queries. Write costs scale with the number of records ingested. Memory store costs more per GB than magnetic store but provides faster query performance. Query costs are based on data scanned, so well-structured data (effective use of dimensions and time ranges in queries) significantly reduces costs. Multi-measure records reduce both storage and query costs compared to single-measure records.
