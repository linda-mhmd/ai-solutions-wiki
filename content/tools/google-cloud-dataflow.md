---
title: "Cloud Dataflow - Unified Stream and Batch Data Processing"
description: "Google Cloud Dataflow is a fully managed service for executing Apache Beam pipelines for both stream and batch data processing at scale."
date: 2026-03-28
categories: [Tools]
tags: [gcp, google-cloud, data-processing, streaming, batch, apache-beam]
related:
  - tools/amazon-glue
  - tools/amazon-emr
  - tools/google-bigquery
  - tools/google-cloud-pub-sub
  - tools/google-cloud-dataproc
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Google Cloud Dataflow is a fully managed service for executing data processing pipelines written using the Apache Beam SDK. It supports both batch and streaming workloads with a unified programming model, meaning the same pipeline code can process bounded (batch) and unbounded (streaming) data sources. Dataflow automatically manages resource provisioning, worker scaling, and optimization of the execution plan, freeing developers to focus on pipeline logic rather than infrastructure.

Dataflow is central to AI and analytics architectures on GCP. In a typical ML pipeline, Dataflow handles the extract-transform-load (ETL) work: reading raw data from Cloud Storage or Pub/Sub, cleaning and transforming it, computing features, and writing results to BigQuery or Vertex AI Feature Store (Vertex AI was rebranded Gemini Enterprise Agent Platform in April 2026 - see [Google Vertex AI](/tools/google-vertex-ai/) for the full story). For streaming use cases, Dataflow processes events from Pub/Sub in real time, enabling applications like real-time anomaly detection, clickstream analysis, and sensor data processing. Dataflow's windowing and watermark semantics handle out-of-order and late-arriving data gracefully, which is critical for production streaming systems.

The service provides Dataflow Templates -- pre-built and parameterized pipelines for common tasks like streaming data from Pub/Sub to BigQuery, bulk loading from Cloud Storage to BigQuery, and data format conversion. These templates enable deployment without writing any code. For custom pipelines, Dataflow supports the Apache Beam SDKs in Java, Python, and Go. Dataflow Prime, the latest execution engine, introduces vertical autoscaling (right-sizing individual workers), horizontal autoscaling, and intelligent scheduling for improved performance and cost efficiency. Dataflow SQL, which let users write streaming SQL queries that ran as Dataflow pipelines, has been retired: it disappeared from the console on 31 July 2024 and from the gcloud CLI on 31 January 2025. Google recommends Beam SQL instead.

## Key Capabilities

- **Unified Batch and Stream Processing** - A single Apache Beam pipeline handles both batch and streaming data with consistent semantics, avoiding the need for separate systems.
- **Autoscaling** - Dataflow Prime automatically scales workers horizontally and vertically based on pipeline throughput, minimizing cost while meeting latency requirements.
- **Pre-Built Templates** - Ready-to-deploy pipeline templates for common data integration patterns, including Pub/Sub-to-BigQuery, GCS-to-BigQuery, and CDC replication.
- **Beam SQL** - Write streaming and batch transforms in SQL through Apache Beam's SQL support (the replacement for the retired Dataflow SQL).

## AWS Equivalent

Cloud Dataflow combines capabilities that AWS distributes across Amazon Glue (managed ETL), Amazon EMR (managed Spark/Hadoop for batch), and Amazon Managed Service for Apache Flink (managed stream processing, formerly Kinesis Data Analytics). Dataflow's unified batch-and-stream model via Apache Beam differentiates it from the AWS approach of using separate services for batch and streaming. AWS offers managed Apache Flink through Amazon Managed Service for Apache Flink, while Dataflow is tightly coupled to Apache Beam.

## Origins and History

Dataflow originated from Google's internal FlumeJava (batch) and MillWheel (streaming) systems, both described in published research papers. Google Cloud Dataflow was announced at Google I/O in June 2014 and reached general availability in August 2015. In January 2016, Google donated the Dataflow programming model to the Apache Software Foundation, where it became Apache Beam (Batch + strEAM). This made the model portable across multiple runners, including Dataflow, Apache Spark, and Apache Flink. Dataflow Prime was announced in 2021, introducing vertical autoscaling and right-fitting. Dataflow SQL was added in 2019 to bring SQL-based stream processing to the platform and was retired in 2024-2025 in favour of Beam SQL.

## Sources

1. Google Cloud Documentation. "Dataflow overview." https://cloud.google.com/dataflow/docs/overview
2. Akidau, T. et al. "The Dataflow Model: A Practical Approach to Balancing Correctness, Latency, and Cost in Massive-Scale, Unbounded, Out-of-Order Data Processing." Proc. VLDB Endowment, 2015.
3. Google Cloud Documentation. "Dataflow release notes" (Dataflow SQL deprecated; console access removed 31 July 2024, CLI 31 January 2025; use Beam SQL). https://cloud.google.com/dataflow/docs/release-notes
