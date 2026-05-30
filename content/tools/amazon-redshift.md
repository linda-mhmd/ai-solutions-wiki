---
title: "Amazon Redshift - Cloud Data Warehouse"
description: "A comprehensive reference for Amazon Redshift: columnar data warehousing, ML integration, and analytics patterns for AI-driven enterprise data platforms."
date: 2026-03-28
categories: [Tools]
tags: [amazon-redshift, AWS, data-warehouse, analytics, SQL, ML]
related:
  - tools/amazon-athena
  - tools/amazon-glue
  - tools/amazon-quicksight
  - tools/amazon-sagemaker
  - tools/azure-synapse-analytics
  - tools/google-bigquery
  - tools/clickhouse
last_updated: 2026-05-30
---

Amazon Redshift is a fully managed, petabyte-scale data warehouse service. It uses columnar storage, massively parallel processing (MPP), and result caching to deliver fast SQL analytics over large datasets. For AI projects, Redshift serves as the structured data foundation: the place where cleaned, modeled business data lives and where feature engineering, reporting, and model monitoring queries run at scale.

Official documentation: https://docs.aws.amazon.com/redshift/

## Core Concepts

**Cluster** - A set of compute nodes (leader node plus compute nodes) that process queries in parallel. You choose the node type (RA3 for managed storage, DC2 for local SSD) and the number of nodes. RA3 nodes separate compute and storage, allowing independent scaling and automatic tiering between SSD and S3.

**Redshift Serverless** - A serverless option that provisions capacity automatically. You specify a base capacity in RPUs (Redshift Processing Units), and the service scales up for demanding queries and scales down during idle periods. Best for variable workloads and teams that want to avoid cluster sizing decisions.

**Schemas and Tables** - Standard SQL objects. Redshift supports distribution styles (KEY, EVEN, ALL) that control how data is distributed across nodes, and sort keys that control the physical ordering of data on disk. Correct distribution and sort key choices can improve query performance by orders of magnitude.

## Redshift ML

Redshift ML brings machine learning directly into SQL. You create a model using CREATE MODEL with a SQL query that defines training data and a target column. Redshift exports the data to SageMaker Autopilot, which trains and tunes a model automatically. The trained model is deployed back to Redshift as a SQL function that you call in SELECT statements.

```sql
CREATE MODEL customer_churn_model
FROM (SELECT features... FROM customer_data)
TARGET churn_flag
FUNCTION predict_churn
IAM_ROLE 'arn:aws:iam::role/redshift-ml';
```

After training, predictions are as simple as:

```sql
SELECT customer_id, predict_churn(features...)
FROM active_customers;
```

This pattern is powerful for organizations where the analytics team is SQL-proficient but not Python-proficient. It brings ML predictions into existing BI workflows without separate inference infrastructure.

## Feature Engineering in Redshift

Redshift's SQL engine handles common feature engineering tasks efficiently:

**Window functions** - Compute rolling averages, running totals, rank, and lag/lead values partitioned by entity and ordered by time. These are the building blocks of temporal features for ML models.

**Materialized views** - Pre-compute expensive feature queries and refresh them on a schedule. Materialized views with AUTO REFRESH stay current as underlying data changes.

**Data sharing** - Share live data across Redshift clusters without copying. A data engineering cluster can produce features and share them with a separate analytics cluster, maintaining a single source of truth.

## Redshift Spectrum

Redshift Spectrum extends SQL queries to data stored in S3 without loading it into Redshift. This enables a lakehouse pattern: hot, frequently queried data lives in Redshift tables, while cold or semi-structured data remains in S3 and is queried through Spectrum. For ML workflows, this means you can join Redshift-resident feature tables with S3-resident training data in a single query.

## Integration with the AWS AI Stack

Redshift connects to the broader AI ecosystem in several ways. Glue ETL jobs load and transform data into Redshift. QuickSight connects directly for BI dashboards. SageMaker reads training data from Redshift via Spark connectors or Data Wrangler. Redshift Data API enables Lambda functions to run queries asynchronously, feeding results into downstream ML pipelines.

## Pricing

Redshift Provisioned charges per node-hour based on node type and count. Redshift Serverless charges per RPU-hour consumed during query execution. Spectrum charges per TB of S3 data scanned (same as Athena). For cost optimization, use RA3 nodes with managed storage, pause clusters during off-hours, and use reserved instances for predictable workloads. Serverless is often more cost-effective for workloads that are active less than 40% of the time.
