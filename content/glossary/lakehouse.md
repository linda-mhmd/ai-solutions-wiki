---
title: "Lakehouse Architecture"
description: "What a lakehouse is, how it combines data lake flexibility with warehouse performance, and practical implementation options."
date: 2026-03-28
categories: [Glossary]
tags: [lakehouse, data-lake, data-warehouse, Delta-Lake, analytics]
related:
  - glossary/data-lake
  - glossary/data-warehouse
  - glossary/etl
last_updated: 2026-05-30
---

A lakehouse is a data architecture that combines the flexibility and low-cost storage of a data lake with the performance, ACID transactions, and schema enforcement of a data warehouse. It stores data in open file formats on object storage (S3) but adds a metadata and transaction layer that enables warehouse-like query performance and data management.

## How It Works

The lakehouse adds a transaction layer on top of data lake storage. Technologies like Delta Lake, Apache Iceberg, and Apache Hudi provide ACID transactions, schema evolution, time travel (querying historical versions), and efficient upserts on data stored in Parquet files on S3.

Query engines (Athena, Redshift Spectrum, Spark, Trino) read the transaction log to understand which files are current, enabling consistent queries without a traditional database engine. The same data serves both BI/analytics workloads and ML training workloads without copying between systems.

## Why It Matters

The traditional pattern - data lake for raw storage plus data warehouse for analytics - creates data duplication, synchronization complexity, and separate governance models. The lakehouse eliminates this by providing a single copy of data that serves all workloads.

For AI teams, the lakehouse is particularly valuable because ML workloads and BI workloads use the same governed data without separate pipelines. Data scientists can run Spark ML jobs directly on the same tables that analysts query with SQL. Schema enforcement and data versioning provide the reproducibility that ML experiments require.

## AWS Implementation

**Apache Iceberg on S3** with AWS Glue Data Catalog is AWS's preferred lakehouse approach. Athena, EMR, Redshift Spectrum, and Glue all support Iceberg tables natively. Iceberg provides ACID transactions, partition evolution (change partitioning without rewriting data), and time travel.

**Redshift Spectrum** queries data in S3 directly using Redshift's query engine, combining Redshift's performance with S3's storage economics.

## Practical Guidance

Start with Apache Iceberg if building a new data platform on AWS. Use Parquet as the underlying file format. Implement table maintenance (compaction, snapshot expiration) to maintain query performance over time. The lakehouse does not eliminate the need for data modeling - invest in schema design and data quality just as you would for a traditional warehouse.

## Sources

- Armbrust, M., et al. (2021). Lakehouse: A new generation of open platforms that unify data warehousing and advanced analytics. *CIDR 2021*. (Introduced the lakehouse concept and defined its design goals; foundational paper for the architecture.)
- Armbrust, M., et al. (2020). Delta Lake: High-performance ACID table storage over cloud object stores. *VLDB 2020*. (Delta Lake; the first widely-adopted open table format enabling ACID transactions on object storage.)
- Apache Software Foundation. (2021). Apache Iceberg table format specification. (Iceberg; AWS-preferred open table format for lakehouse on S3; technical basis for Athena/Glue/EMR lakehouse integration.)
