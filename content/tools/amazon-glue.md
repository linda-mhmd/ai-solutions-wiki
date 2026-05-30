---
title: "Amazon Glue - Serverless ETL and Data Integration"
description: "A comprehensive reference for Amazon Glue: serverless data integration, ETL jobs, data catalog, and data preparation for AI/ML pipelines."
date: 2026-03-28
categories: [Tools]
tags: [amazon-glue, AWS, ETL, data-integration, data-catalog, serverless]
related:
  - tools/aws-s3
  - tools/amazon-athena
  - tools/amazon-sagemaker
  - tools/amazon-redshift
  - tools/azure-data-factory
  - tools/google-cloud-dataflow
  - tools/dbt
last_updated: 2026-05-30
---

Amazon Glue is a serverless data integration service that provides ETL (Extract, Transform, Load) capabilities and a centralized data catalog. For AI projects, Glue handles the data engineering that precedes model training: crawling data sources to discover schemas, transforming raw data into clean features, and maintaining a metadata catalog that makes data discoverable across the organization.

Official documentation: https://docs.aws.amazon.com/glue/
Pricing: https://aws.amazon.com/glue/pricing/
Service quotas: https://docs.aws.amazon.com/glue/latest/dg/limits.html

## Core Concepts

**Data Catalog** - A centralized metadata repository that stores table definitions, schemas, and partition information. Crawlers automatically populate the catalog by scanning data sources (S3, RDS, Redshift, DynamoDB). Once cataloged, data is queryable through Athena, Redshift Spectrum, and EMR without manual schema definition.

**Crawler** - An automated process that connects to a data store, infers the schema, and creates or updates table definitions in the Data Catalog. Crawlers handle format detection (CSV, JSON, Parquet, Avro, ORC), schema inference (column names and types), and partition detection (for data organized in Hive-style partitions like year=2025/month=03/).

**ETL Job** - A processing job that reads data from sources, applies transformations, and writes results to targets. Jobs can be authored in Python (PySpark) or Scala, using either the Glue-specific DynamicFrame API or standard Spark DataFrames. Glue provisions and manages the Spark infrastructure automatically.

**Workflow** - An orchestration mechanism that chains crawlers, ETL jobs, and triggers into a sequence. Workflows define dependencies between jobs and handle conditional execution and error handling.

## Glue for ML Data Preparation

The typical ML data preparation pipeline in Glue follows this pattern:

1. Crawl source data (databases, S3 files, APIs via custom connectors) to catalog schemas.
2. Run ETL jobs to clean data: handle nulls, deduplicate, standardize formats, resolve schema inconsistencies.
3. Compute features: aggregate, join, pivot, and derive new columns from raw data.
4. Write output to S3 in Parquet format, partitioned by date or entity, ready for SageMaker training.

Glue is well-suited for data preparation tasks up to moderate scale (tens of GB to low TB). For datasets in the multi-TB range, EMR provides more control and often better performance.

## Glue DataBrew

Glue DataBrew is a visual data preparation tool for users who prefer a no-code interface. It provides 250+ pre-built transformations (string cleaning, date parsing, statistical imputation, outlier detection) accessible through a visual interface. DataBrew generates profiling reports that summarize data quality metrics, distributions, and correlations.

For AI projects, DataBrew is useful during the exploration phase: data scientists can profile datasets, understand distributions, and prototype transformations visually before codifying them in ETL jobs for production.

## Glue Data Quality

Glue Data Quality (powered by the open-source Deequ library) enables you to define and evaluate data quality rules. Rules check for completeness (column X is never null), uniqueness (column Y has no duplicates), freshness (data was updated within the last 24 hours), and statistical bounds (column Z mean is between 10 and 20).

Integrate data quality checks into your ML pipeline to catch data issues before they corrupt model training. A quality check failure can trigger an alert or halt the pipeline before bad data reaches the training job.

## Job Bookmarks

Glue Job Bookmarks track which data has already been processed, enabling incremental ETL. When a job runs with bookmarks enabled, it only processes new or modified data since the last run. This is essential for daily or hourly pipeline runs where reprocessing the entire dataset would be wasteful.

## Pricing

Glue ETL jobs charge per DPU-hour (Data Processing Unit). Each DPU provides 4 vCPUs and 16 GB of memory. The minimum billing increment is 1 minute for Glue 2.0+ jobs. Crawlers charge per DPU-hour consumed during crawling. The Data Catalog is free for the first million objects and $1 per 100,000 objects thereafter. For cost control, right-size the number of DPUs and use job bookmarks to avoid reprocessing data.
