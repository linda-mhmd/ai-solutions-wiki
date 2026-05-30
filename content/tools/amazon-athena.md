---
title: "Amazon Athena - Serverless SQL Analytics"
description: "A comprehensive reference for Amazon Athena: serverless query engine for S3 data, integration with Glue Data Catalog, and analytics patterns for AI/ML projects."
date: 2026-03-28
categories: [Tools]
tags: [amazon-athena, AWS, SQL, analytics, serverless, data-lake]
related:
  - tools/aws-s3
  - tools/amazon-glue
  - tools/amazon-quicksight
  - tools/amazon-redshift
last_updated: 2026-05-30
---

Amazon Athena is a serverless query engine that runs SQL queries directly against data stored in Amazon S3. There is no infrastructure to manage: no clusters, no servers, no capacity planning. You point Athena at your S3 data (using table definitions from the Glue Data Catalog), write SQL, and get results. For AI projects, Athena is the go-to tool for ad-hoc data exploration, training data validation, and lightweight analytics that do not justify a dedicated data warehouse.

Official documentation: https://docs.aws.amazon.com/athena/
Pricing: https://aws.amazon.com/athena/pricing/
Service quotas: https://docs.aws.amazon.com/athena/latest/ug/service-limits.html

## Core Concepts

**Workgroup** - An isolation boundary for queries. Workgroups control query settings (result location, encryption, query size limits), enforce cost controls (per-query data scan limits), and separate usage metrics. Create workgroups per team or per project to track and control costs.

**Query** - A standard SQL statement executed against tables in the Glue Data Catalog. Athena uses the Trino (formerly PrestoSQL) engine and supports ANSI SQL with extensions for complex types (arrays, maps, structs), window functions, and geospatial operations.

**Data Source** - While S3 is the primary data source, Athena Federated Query extends SQL access to DynamoDB, RDS, Redshift, CloudWatch Logs, and custom sources through Lambda-based connectors. This enables cross-source queries without data movement.

## Data Format Optimization

Query cost in Athena is based on data scanned. Format choice dramatically affects cost and performance.

**Parquet or ORC** - Columnar formats that enable Athena to read only the columns referenced in the query. A query selecting 3 columns from a 50-column table scans 94% less data in Parquet than in CSV. Always convert data to Parquet for recurring query workloads.

**Partitioning** - Organize data in S3 using Hive-style partitions (s3://bucket/table/year=2025/month=03/). Athena uses partition pruning to skip irrelevant partitions entirely. A query filtered to a single month scans only that partition instead of the entire table.

**Compression** - Parquet files compressed with Snappy or ZSTD reduce both storage costs and scan costs. Athena decompresses during query execution with negligible performance impact.

## AI/ML Use Cases

**Training data exploration** - Before training a model, explore the dataset with SQL: check distributions, find class imbalances, identify missing values, and validate join keys. Athena is faster than loading data into a notebook for initial exploration of large datasets.

**Training data generation** - Write SQL queries that join, filter, and aggregate raw data into training-ready datasets. Save the output as a CTAS (Create Table As Select) query in Parquet format. This is often simpler than writing PySpark for straightforward transformations.

**Model evaluation analysis** - After model inference, store predictions alongside ground truth in S3. Query with Athena to compute accuracy metrics across segments (by region, customer type, time period). SQL-based analysis is accessible to business analysts who may not use Python.

**Data quality checks** - Run validation queries before model training: check for null rates, value distributions, date range coverage, and referential integrity. Schedule these checks with Step Functions or EventBridge.

## CTAS and INSERT INTO

CTAS (Create Table As Select) creates a new table from query results, written to S3 in your specified format. Use CTAS to materialize intermediate datasets or convert formats. INSERT INTO appends query results to an existing table. Together, these enable incremental data pipeline patterns without external orchestration.

## Cost Management

Athena charges per TB of data scanned. At $5 per TB, costs can grow quickly on unoptimized datasets. Key cost controls:

- Convert to Parquet (10-100x cost reduction vs CSV)
- Partition by commonly filtered columns (date is the most common)
- Use column projection (SELECT specific columns, never SELECT *)
- Set per-query data scan limits in workgroup settings
- Use LIMIT during exploration to avoid full table scans

## Pricing

Athena charges $5 per TB of data scanned, with a 10 MB minimum per query. Cancelled queries are charged for the data scanned before cancellation. DDL operations (CREATE TABLE, ALTER TABLE) and failed queries are free. For predictable workloads, Athena Provisioned Capacity offers per-hour pricing that can be cheaper at high volumes.
