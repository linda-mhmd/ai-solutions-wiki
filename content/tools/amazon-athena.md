---
title: "Amazon Athena - Serverless SQL Analytics"
description: "Reference for Amazon Athena: serverless SQL query engine for data in Amazon S3, with Glue Data Catalog integration and analytics patterns for AI/ML."
date: 2026-03-28
categories: [Tools]
tags: [AWS, SQL, analytics, serverless, data-lake, "aws-service"]
related:
  - tools/aws-s3
  - tools/amazon-glue
  - tools/amazon-quicksight
  - tools/amazon-redshift
layer: data
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Athena is a serverless query engine that runs SQL queries directly against data stored in Amazon S3. There is no infrastructure to manage: no clusters, no servers, no capacity planning. You point Athena at your S3 data (using table definitions from the Glue Data Catalog), write SQL, and get results. For AI projects, Athena is the go-to tool for ad-hoc data exploration, training data validation, and lightweight analytics that do not justify a dedicated data warehouse.

Official documentation: https://docs.aws.amazon.com/athena/
Pricing: https://aws.amazon.com/athena/pricing/
Service quotas: https://docs.aws.amazon.com/athena/latest/ug/service-limits.html

## Foundations first

If these terms are new, read these before the specifics below.

- **SQL** - the standard query language for asking questions of structured data ("show me all rows where the country is Germany, grouped by month"). Athena speaks SQL, so if you can write SQL you can use Athena. See {{< relref "glossary/sql-fundamentals" >}}.
- **Object storage** - storing files (objects) in buckets rather than on a disk attached to a server. Amazon S3 is object storage, and it is where Athena reads its data from. See {{< relref "tools/aws-s3" >}}.
- **Data lake** - a central place (usually S3) where you keep raw and processed data in open file formats, without first loading it into a database. See {{< relref "glossary/data-lake" >}}.
- **Serverless** - you do not provision or manage any servers. You bring a query, AWS runs it on capacity you never see, and you pay only for what you use. See {{< relref "glossary/serverless" >}}.
- **Data Catalog** - a metadata directory that records what tables exist, their columns, and where their files live in S3. Athena uses the AWS Glue Data Catalog so your SQL knows the shape of the data. See {{< relref "glossary/data-catalog" >}}.

In plain terms: Athena lets you run SQL over files sitting in S3 as if they were database tables, without ever standing up a database. It is the serverless front door to a {{< relref "glossary/data-lake" >}}, and it sits in the data layer of the AI stack: the place where raw data is explored and shaped before it feeds models. It complements rather than replaces a {{< relref "glossary/data-warehouse" >}} such as {{< relref "tools/amazon-redshift" >}}.

## Core Concepts

**Workgroup** - An isolation boundary for queries. Workgroups control query settings (result location, encryption, query size limits), enforce cost controls (per-query data scan limits), and separate usage metrics. Create workgroups per team or per project to track and control costs.

**Query** - A standard SQL statement executed against tables in the Glue Data Catalog. Athena SQL runs on a managed build of the open-source Trino engine (Trino was formerly named PrestoSQL). The current default is Athena engine version 3, which tracks improvements from the upstream Trino and Presto projects. It supports ANSI SQL with extensions for complex types (arrays, maps, structs), window functions, row pattern matching (MATCH_RECOGNIZE), and geospatial operations.

**Data Source** - While S3 is the primary data source, Athena Federated Query extends SQL access to DynamoDB, RDS, Redshift, CloudWatch Logs, and other sources through Lambda-based connectors. Since the April 2026 managed connectors release, Athena can also create and run Glue Data Catalog connectors for a set of sources (including DynamoDB, PostgreSQL, MySQL, and Snowflake) on your behalf, so you query data outside S3 without deploying or maintaining the connector Lambda yourself. This enables cross-source queries without data movement.

**Query results** - By default query output is written to an S3 location you control. Since June 2025, Athena also offers managed query results: Athena stores, encrypts, and expires results for you at no additional storage cost, removing the need to provision and clean up a results bucket. It is available in all Regions where Athena runs except AWS GovCloud and China.

## Data Format Optimization

Query cost in Athena is based on data scanned. Format choice dramatically affects cost and performance.

**Parquet or ORC** - Columnar formats that let Athena read only the columns referenced in the query rather than every byte of every row. A query that selects a few columns from a wide table scans dramatically less data in Parquet than in row-based CSV, because the unreferenced columns are never read. AWS recommends converting data to a columnar format for recurring query workloads. See {{< relref "tools/aws-s3" >}} for where these files live.

**Partitioning** - Organize data in S3 using Hive-style partitions (s3://bucket/table/year=2026/month=03/). Athena uses partition pruning to skip irrelevant partitions entirely. A query filtered to a single month scans only that partition instead of the entire table. Partition projection can compute partition values from the query instead of reading them from the catalog, which avoids listing millions of partitions.

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

- Convert to a compressed columnar format (Parquet or ORC) instead of CSV or JSON
- Partition by commonly filtered columns (date is the most common)
- Use column projection (SELECT specific columns, never SELECT *)
- Set per-query data scan limits in workgroup settings
- Use LIMIT during exploration to avoid full table scans
- Reuse cached results for repeated queries via query result reuse

## Pricing

Athena's default model charges per terabyte of data scanned, with a 10 MB minimum per query. Cancelled queries are charged for the data scanned before cancellation, while DDL operations (CREATE TABLE, ALTER TABLE) and failed queries are not charged. Check the official pricing page for the current per-TB rate in your Region, since prices vary by Region.

For steady, high-volume, or latency-sensitive workloads, Athena offers Capacity Reservations: you reserve query processing capacity measured in Data Processing Units (DPUs) and pay a flat per-DPU-hour rate instead of per TB scanned, which makes cost predictable. As of February 2026 a reservation can be as small as 4 DPUs and is billed in 1-minute increments, so it can track variable workloads more closely than before. Athena for Apache Spark (notebook-based PySpark) is billed separately on its own per-DPU-hour rate. Storage in S3, Glue Data Catalog requests, and Lambda invocations for federated queries are billed by those services. Confirm all current figures on the official pricing page below.

## Recent developments

- Managed query results (June 2025): run queries without provisioning your own results bucket, with automatic encryption and cleanup at no extra storage cost.
- Athena for Apache Spark in notebooks (November 2025): a unified workspace to query data and develop PySpark jobs, running on Apache Spark 3.5.
- Glue Data Catalog materialized views (November 2025): pre-computed result tables, stored as Apache Iceberg, that refresh automatically and are queryable from Athena SQL.
- Managed federated connectors (April 2026): Athena creates and operates connectors for a set of external sources (including DynamoDB, PostgreSQL, MySQL, and Snowflake) so you do not maintain the connector infrastructure.
- Capacity Reservations enhancements (February and March 2026): 4 DPU minimum, 1-minute billing, and availability in many additional Regions.

## Sources

- Amazon Athena documentation: https://docs.aws.amazon.com/athena/
- Amazon Athena pricing: https://aws.amazon.com/athena/pricing/
- Athena release notes: https://docs.aws.amazon.com/athena/latest/ug/release-notes.html
- Athena engine version 3 reference: https://docs.aws.amazon.com/athena/latest/ug/engine-versions-reference-0003.html
- Top performance and cost tuning tips for Athena (AWS docs): https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html
- Managed query results (AWS What's New, June 2025): https://aws.amazon.com/about-aws/whats-new/2025/06/amazon-athena-managed-query-results-streamline-analysis-workflows/
- Trino project (the open-source engine Athena SQL builds on): https://trino.io/

## Best practices

Athena is covered by the AWS Well-Architected Framework, the standard methodology for reviewing cloud workloads. For Athena the most relevant pillars are cost optimization (format, partition, and scan-limit choices map directly to spend) and performance efficiency. See the {{< relref "foundations/well-architected" >}} overview and the {{< relref "glossary/cost-optimization-pillar" >}}, and AWS publishes a dedicated guide of top performance and cost tuning tips for Athena (linked in Sources).
