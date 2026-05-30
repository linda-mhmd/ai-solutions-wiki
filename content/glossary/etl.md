---
title: "ETL - Extract, Transform, Load"
description: "What ETL is, how it powers data pipelines, and how it compares to ELT for modern data architectures."
date: 2026-03-28
categories: [Glossary]
tags: [ETL, data-engineering, data-pipeline, AWS-Glue, data-warehouse]
related:
  - glossary/elt
  - glossary/data-warehouse
  - glossary/data-lake
last_updated: 2026-05-30
---

ETL (Extract, Transform, Load) is a data integration pattern that moves data from source systems to a destination system. Data is extracted from source systems, transformed (cleaned, enriched, aggregated, reformatted) in a processing layer, and loaded into the target system (data warehouse, data lake, or feature store).

## How It Works

**Extract** reads data from source systems: databases, APIs, files, streaming sources, SaaS applications. Extraction can be full (all data) or incremental (only changes since the last extraction).

**Transform** applies business logic to the extracted data: data type conversion, null handling, deduplication, joins across sources, aggregation, validation, and enrichment. Transformations ensure data quality and conformance to the target schema.

**Load** writes the transformed data to the target system in the expected format and schema.

**AWS Glue** is the managed ETL service on AWS. It provides serverless Spark-based processing, a visual ETL editor, automatic schema discovery, and a data catalog. Glue jobs can transform data in S3, load into Redshift, or prepare data for ML training.

## Why It Matters for AI

AI systems depend on clean, well-structured data. ETL pipelines are the mechanism that transforms raw operational data into training datasets, feature tables, and evaluation benchmarks. Poor ETL (missing values, duplicates, stale data, incorrect joins) directly degrades model quality. Investing in robust ETL is often the highest-leverage action for improving AI outcomes.

## ETL vs. ELT

Traditional ETL transforms data before loading. Modern ELT loads raw data first and transforms within the destination system (using the warehouse's compute power). ELT is preferred when the destination has powerful compute (Redshift, BigQuery), when you want to preserve raw data, and when transformation requirements evolve frequently.

## Practical Guidance

Use incremental extraction whenever possible to reduce processing time and cost. Implement data quality checks within the pipeline (row counts, null rates, value ranges) and fail loudly when quality degrades. Version your transformation logic in source control. Schedule pipeline monitoring to detect failures before downstream consumers (dashboards, models) are affected.

## Sources

- Kimball, R., & Caserta, J. (2004). *The Data Warehouse ETL Toolkit*. Wiley. (Definitive ETL reference; covers extraction strategies, transformation patterns, and error handling.)
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media. Chapter 10: Batch Processing. (Theoretical treatment of data transformation pipelines; MapReduce and Spark as the foundations of modern ETL.)
- Zaharia, M., et al. (2012). Resilient distributed datasets: A fault-tolerant abstraction for in-memory cluster computing. *NSDI 2012*. (Spark RDDs; the compute engine underlying AWS Glue and most large-scale ETL.)
