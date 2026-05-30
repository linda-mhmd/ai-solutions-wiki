---
title: "Change Data Capture"
description: "What change data capture (CDC) is, how Debezium and AWS DMS enable real-time data replication, and why CDC matters for keeping AI feature stores and training data current."
date: 2026-03-28
categories: [Glossary]
tags: [change-data-capture, debezium, dms, data-engineering, streaming, kafka]
related:
  - glossary/stream-processing
  - guides/stream-processing-ai
  - patterns/event-sourcing-ai
last_updated: 2026-05-30
---

Change data capture (CDC) is a pattern that identifies and captures changes made to data in a source system (inserts, updates, deletes) and delivers those changes to downstream consumers in real time or near real time. Instead of periodically querying the full dataset, CDC streams only what changed.

CDC replaces batch ETL for scenarios where data freshness matters. A batch job that runs hourly means downstream systems are always up to one hour stale. CDC delivers changes within seconds.

## How CDC Works

**Log-Based CDC** - Reads the database transaction log (write-ahead log in PostgreSQL, binlog in MySQL, oplog in MongoDB). This is the most reliable approach because transaction logs are the source of truth for all changes. It adds minimal load to the source database because the logs are already being written.

**Query-Based CDC** - Periodically queries the source table for rows where a timestamp column changed since the last poll. Simpler to set up but misses deletes, adds query load to the source, and has higher latency.

**Trigger-Based CDC** - Database triggers fire on each change and write to a shadow table. Adds write overhead to every transaction and is database-specific. Rarely used in modern architectures.

## Key Tools

**Debezium** - An open-source CDC platform built on Kafka Connect. It reads transaction logs from PostgreSQL, MySQL, MongoDB, SQL Server, Oracle, and others, then publishes change events to Kafka topics. Each change event includes the before and after state of the row, the operation type, and metadata. Debezium is the most widely adopted open-source CDC tool.

**AWS Database Migration Service (DMS)** - A managed service that replicates data from source databases to targets including S3, Kinesis, Kafka, Redshift, and other databases. DMS supports both full-load migration and ongoing CDC replication. It handles schema mapping and transformation.

**AWS Kinesis Data Streams** - While not a CDC tool itself, Kinesis is frequently the target for CDC events in AWS architectures, feeding real-time data to Lambda consumers, analytics, and AI feature pipelines.

## CDC for AI Systems

AI systems depend on fresh data. A recommendation model using day-old user activity data misses recent behaviour. A fraud detection system with stale transaction data has a blind spot. CDC ensures that feature stores, vector databases, and training datasets reflect the current state of source systems with minimal latency.

## Sources

- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media. Chapter 11: Stream Processing. (Definitive treatment of log-based CDC; describes transaction log tailing as the foundation of reliable change propagation.)
- Debezium Project. (2019). Debezium: Change data capture for microservices. *Red Hat engineering blog*. (Debezium architecture; explains log-based CDC implementation across PostgreSQL, MySQL, and MongoDB.)
- Zaharia, M., et al. (2016). Apache Spark: A unified engine for big data processing. *Communications of the ACM, 59*(11), 56–65. (Stream processing context for downstream CDC consumers.)
