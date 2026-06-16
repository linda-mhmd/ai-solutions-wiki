---
title: "Delta Lake vs Apache Iceberg for Lakehouse Architecture"
description: "Comparing Delta Lake and Apache Iceberg as open table formats for lakehouse architectures supporting AI/ML workloads."
date: 2026-03-28
last_verified: 2026-06-14
categories: [Comparisons]
tags: [Delta-Lake, Iceberg, lakehouse, data-engineering, storage]
last_updated: 2026-06-14
lastmod: 2026-06-14
---

Open table formats bring database-like capabilities (ACID transactions, schema evolution, time travel) to data lake storage. Delta Lake and Apache Iceberg are the two leading formats, and the choice affects ML data pipelines, feature engineering, and training data management. This comparison covers the differences relevant to AI/ML teams building lakehouse architectures.

## Format Overview

**Delta Lake** (2019, Databricks, now a Linux Foundation project) stores data in Parquet files with a JSON-based transaction log (`_delta_log/`). The transaction log records every change to the table, enabling ACID transactions, time travel, and schema enforcement. Delta Lake is tightly integrated with the Databricks ecosystem and Apache Spark. Delta Lake 4.0 (June 2025) builds on Apache Spark 4.0 and added the Variant type for semi-structured data, Coordinated Commits for safe cross-engine writes, and Delta Connect for Spark Connect. Delta Lake 4.1 (March 2026) moved to Spark 4.1, brought production support for catalog-managed tables, and now requires Java 17 or newer.

**Apache Iceberg** (2018, Netflix, now Apache) stores data in Parquet (or ORC/Avro) files with a metadata layer consisting of manifest files and manifest lists. Iceberg's architecture separates the catalog (where tables live), metadata (schema, partitioning, snapshots), and data (files). Iceberg is engine-agnostic by design. The Iceberg v3 table specification reached broad availability in 2026 (generally available on Snowflake in May 2026, public preview on Databricks) and adds deletion vectors, row lineage, the Variant type, geometry and geography types, nanosecond timestamps, and default column values. The latest Iceberg library release is 1.11.0 (May 2026).

## Feature Comparison

| Feature | Delta Lake | Apache Iceberg |
|---|---|---|
| Transaction log | JSON files in `_delta_log/` | Manifest files + manifest lists |
| ACID transactions | Yes | Yes |
| Time travel | Yes (version-based and timestamp) | Yes (snapshot-based and timestamp) |
| Schema evolution | Add columns, rename, reorder | Full schema evolution (add, drop, rename, reorder, type promotion) |
| Partition evolution | Requires table rewrite | In-place (no data rewrite needed) |
| Hidden partitioning | No (partitions visible to users) | Yes (automatic partition transforms) |
| Row-level updates | MERGE, UPDATE, DELETE | MERGE, UPDATE, DELETE (copy-on-write or merge-on-read) |
| Merge strategies | Copy-on-write, plus merge-on-read via deletion vectors | Copy-on-write and merge-on-read |
| Engine support | Spark, Flink, Trino, DuckDB | Spark, Flink, Trino, DuckDB, Dremio, Snowflake, BigQuery |
| Catalog | Unity Catalog, Hive Metastore | REST catalog, Hive, AWS Glue, Nessie, Polaris |
| Compaction | OPTIMIZE command | Rewrite manifests and data files |
| Data layout | ZORDER BY and liquid clustering | Sort order in table spec |
| Vendor backing | Databricks, Linux Foundation | Netflix origin, broad community (Apache) |

## ML Workload Considerations

### Training Data Management

**Time travel for reproducibility.** Both formats support time travel, allowing ML teams to recreate the exact training dataset used for any model version. This is essential for reproducibility and auditing.

Delta Lake accesses historical versions by version number (`VERSION AS OF 5`) or timestamp. Iceberg uses snapshot IDs or timestamps. Both are effective, but Iceberg's snapshot architecture handles large tables with many versions more efficiently because it does not need to replay a transaction log.

**Schema evolution for feature changes.** ML feature schemas change frequently as data scientists add, remove, or modify features. Iceberg's partition evolution (changing the partitioning strategy without rewriting data) is a significant advantage. Delta Lake requires rewriting the table to change partitioning, which is expensive for multi-terabyte feature tables.

### Feature Store Integration

Feature stores that persist features to a lakehouse benefit from table format capabilities. Both formats support:

- **Upsert operations** for updating feature values (MERGE INTO)
- **Point-in-time queries** for constructing training datasets without data leakage
- **Incremental reads** for streaming feature updates to online stores

Iceberg's merge-on-read strategy can be faster for write-heavy feature update workloads because it defers the merge to read time. Delta Lake historically used copy-on-write, but deletion vectors now give it a merge-on-read path as well: DELETE, UPDATE, and MERGE mark rows without rewriting the underlying Parquet files, which narrows the old gap for high-frequency updates.

### Data Quality and Validation

Delta Lake has built-in constraints (CHECK constraints, NOT NULL) and Lakeflow Declarative Pipelines (formerly Delta Live Tables) for declarative data quality pipelines. Iceberg relies on external tools ({{< relref "comparisons/great-expectations-vs-deequ" >}}, Great Expectations or Deequ) for data quality but integrates with more engines for running those checks.

### Large-Scale Training Data

For very large training datasets (10TB+), file listing performance matters. Iceberg's manifest-based metadata avoids listing files in object storage (a slow operation at scale). Delta Lake's transaction log requires reading and replaying log files, though the checkpoint mechanism mitigates this for tables with long histories.

## Ecosystem and Portability

**Delta Lake** is most mature on Databricks, where it is the native format. Open-source Delta Lake (delta-io) works with Spark, and connectors exist for other engines, but the richest feature set is on Databricks. If your organization is standardized on Databricks, Delta Lake is the natural choice.

**Apache Iceberg** was designed for multi-engine portability. The same Iceberg table can be read and written by Spark, Flink, Trino, Snowflake, BigQuery, and others without data movement. For organizations that use multiple compute engines or want to avoid vendor lock-in, Iceberg's portability is a decisive advantage.

## When to Choose Delta Lake

- Databricks is the primary data platform
- Existing Delta Lake tables and pipelines
- Team familiarity with Delta Lake APIs
- Need for Lakeflow Declarative Pipelines (formerly Delta Live Tables, a declarative pipeline framework)
- Unity Catalog for governance

## When to Choose Iceberg

- Multi-engine environment (Spark + Trino + Flink)
- Need for partition evolution without data rewrites
- Very large tables where metadata performance matters
- Vendor-neutral strategy to avoid lock-in
- Snowflake or BigQuery as a primary query engine (native Iceberg support)

## Convergence

The two formats are converging in capabilities, and the gap is narrowing further at the spec level. Delta Lake added deletion vectors (merge-on-read) and broader engine support, while Iceberg v3 picked up deletion vectors, row lineage, default column values, and a Variant type that mirrors Delta's. Both now share a binary Variant encoding for semi-structured data, which makes the formats more alike than they were in 2023.

The organizational lines have also blurred. In June 2024 Databricks acquired Tabular, the company founded by the original creators of Apache Iceberg, and stated its intent to work with both the Delta Lake and Iceberg communities toward a single interoperable standard. The practical bridge today is Delta Lake UniForm, which writes a Delta table once and exposes Iceberg (and Hudi) metadata over the same Parquet files, so Iceberg readers such as Snowflake and BigQuery can query it without copying data. On the Iceberg side, vendor-neutral REST catalogs such as Apache Polaris (originally from Snowflake) push the same write-once, read-anywhere goal.

Both communities are active and well-funded, so the practical decision increasingly comes down to ecosystem fit, governance, and catalog strategy rather than raw feature gaps.

## Sources

- [Delta Lake 4.0 release notes](https://delta.io/blog/2025-09-25-delta-lake-40/) - Delta Lake (official blog)
- [Delta Lake 4.1.0 released](https://delta.io/blog/2026-03-01-delta-lake-4-1-0-released/) - Delta Lake (official blog)
- [Apache Iceberg releases](https://iceberg.apache.org/releases/) - Apache Iceberg (official)
- [Announcing Apache Iceberg v3 Support on Snowflake](https://www.snowflake.com/en/blog/apache-iceberg-v3-support/) - Snowflake
- [Databricks + Tabular](https://www.databricks.com/blog/databricks-tabular) - Databricks
- [Delta Lake Universal Format (UniForm) for Iceberg compatibility, now in GA](https://www.databricks.com/blog/delta-lake-universal-format-uniform-iceberg-compatibility-now-ga) - Databricks
- [Apache Polaris](https://polaris.apache.org/) - Apache Software Foundation
