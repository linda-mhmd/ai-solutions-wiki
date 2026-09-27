---
title: "TimescaleDB - Time-Series Database on PostgreSQL"
description: "TimescaleDB is an open-source time-series database built as a PostgreSQL extension, optimized for fast ingest and complex queries on time-stamped data."
date: 2026-03-28
categories: [Tools]
tags: [open-source, time-series, database, postgresql, iot, monitoring]
related:
  - tools/amazon-timestream
  - tools/influxdb
  - tools/prometheus
  - tools/grafana
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

TimescaleDB is an open-source time-series database implemented as a PostgreSQL extension, combining the reliability and ecosystem of PostgreSQL with optimizations specifically designed for time-series workloads. By building on PostgreSQL rather than creating a new database from scratch, TimescaleDB provides full SQL support, joins with relational data, existing PostgreSQL tooling compatibility, and the ability to handle both time-series and relational data in a single system.

TimescaleDB's core innovation is the hypertable, which automatically partitions time-series data into chunks by time (and optionally by space dimensions like device ID or location). This partitioning is transparent to users, who interact with hypertables as if they were standard PostgreSQL tables. The chunked architecture enables efficient data retention policies, tiered storage to S3 for older data, and parallelized queries across time ranges. Additional time-series features include continuous aggregates (automatically maintained materialized views), compression achieving 90-95% storage reduction, and specialized analytical functions for time-weighted averages, gap filling, and downsampling.

TimescaleDB is widely used in IoT monitoring, financial market data, DevOps observability, and industrial telemetry. Its PostgreSQL compatibility makes it attractive to teams already invested in the PostgreSQL ecosystem who need time-series capabilities without adopting a separate specialized database. The company behind it, Timescale, Inc., renamed itself **Tiger Data** in June 2025; it provides a managed cloud service (Tiger Cloud, formerly Timescale Cloud) alongside the self-hosted TimescaleDB extension, which remains under the TimescaleDB name (2.x line; 2.30.1 released 17 September 2026).

## Key Capabilities

- **Full PostgreSQL Compatibility** - Works as a PostgreSQL extension, supporting full SQL, joins, stored procedures, and the entire PostgreSQL tooling ecosystem
- **Automatic Time Partitioning** - Hypertables transparently partition data by time for efficient ingestion, queries, and data lifecycle management
- **Continuous Aggregates** - Incrementally maintained materialized views that automatically update as new data arrives
- **Columnar Compression** - Automatic compression of older chunks achieving 90-95% storage savings while maintaining query capability

## Cloud Equivalents

TimescaleDB is the open-source alternative to Amazon Timestream, Microsoft Fabric Real-Time Intelligence, and Google Cloud's time-series capabilities in Bigtable. Note that Amazon Timestream for LiveAnalytics closed to new customers on 20 June 2025 (AWS recommends Amazon Timestream for InfluxDB instead), and Azure Time Series Insights was retired on 7 July 2024 in favour of Real-Time Intelligence in Microsoft Fabric. Unlike purpose-built time-series databases, TimescaleDB's PostgreSQL foundation allows combining time-series and relational queries in a single system, though purpose-built services may offer simpler operational models for pure time-series workloads.

## Origins and History

TimescaleDB was created by Ajay Kulkarni and Mike Freedman (a Princeton University computer science professor) and first released in April 2017. The repository is dual-licensed: code outside the `tsl` directory is under the Apache License 2.0, while advanced features in the `tsl` directory (such as compression/columnstore and continuous aggregates) are under the source-available Timescale License, and built binaries are split accordingly. Timescale, Inc. was founded in 2015, has raised about $180 million in venture funding, and rebranded as Tiger Data on 17 June 2025.

## Sources

1. https://www.tigerdata.com/ (formerly timescale.com)
2. https://github.com/timescale/timescaledb (LICENSE file: Apache 2.0 outside `tsl`, Timescale License inside; release 2.30.1, 17 September 2026)
3. Tiger Data, "Timescale is now Tiger Data" (17 June 2025): https://www.tigerdata.com/blog/timescale-becomes-tigerdata
4. AWS, "Amazon Timestream for LiveAnalytics availability change" (closed to new customers 20 June 2025): https://docs.aws.amazon.com/timestream/latest/developerguide/AmazonTimestreamForLiveAnalytics-availability-change.html
5. Microsoft Learn, "Migrating Time Series Insights to Real-Time Intelligence in Microsoft Fabric" (retired 7 July 2024): https://learn.microsoft.com/en-us/azure/time-series-insights/migration-to-fabric
