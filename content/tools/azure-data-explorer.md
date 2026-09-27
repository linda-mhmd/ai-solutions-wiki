---
title: "Azure Data Explorer - Real-Time Analytics and Time Series Database"
description: "Azure Data Explorer is a fast, fully managed data analytics service optimized for real-time analysis of large volumes of streaming and time series data."
date: 2026-03-28
categories: [Tools]
tags: [azure, analytics, time-series, real-time, kusto, log-analytics]
related:
  - tools/amazon-timestream
  - tools/azure-monitor
  - tools/azure-synapse-analytics
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Azure Data Explorer (ADX), also known as Kusto, is a fully managed big data analytics platform optimized for near-real-time analysis of large volumes of streaming data, time series data, and log data. The service ingests data at high throughput from event sources (Event Hubs, IoT Hub, Blob Storage, Kafka), indexes it automatically, and makes it queryable within seconds using Kusto Query Language (KQL). For AI workloads, ADX serves as the analytics engine for real-time feature computation, IoT telemetry analysis, model monitoring metric aggregation, and exploratory data analysis on high-velocity datasets where traditional databases or data warehouses cannot deliver sub-second query performance.

ADX's columnar storage engine and advanced indexing (including full-text indexing, dynamic schema, and free-text search) are designed for analytics queries over datasets ranging from gigabytes to petabytes. The query engine executes distributed queries across cluster nodes with automatic parallelization and caching. KQL, the native query language, provides expressive syntax for time series analysis including make-series for creating regular time series, series_decompose for trend and seasonality extraction, series_outliers for anomaly detection, and series_periods_detect for periodicity analysis. These built-in time series functions enable real-time anomaly detection and pattern analysis without external ML models.

The service supports native machine learning capabilities directly within queries. The autocluster plugin identifies common patterns in data, the basket plugin finds frequent itemsets, and the diffpatterns plugin identifies differences between data segments. Python and R plugins allow running custom ML code inline within KQL queries for advanced analytics scenarios. ADX also provides a native connector for Azure Machine Learning, enabling scoring of ML models against data stored in ADX. For dashboards, ADX integrates with Azure Managed Grafana, Power BI, and its own ADX Dashboards feature for building interactive real-time visualizations.

Official documentation: https://learn.microsoft.com/en-us/azure/data-explorer/

## Key Capabilities

- **Sub-Second Ingestion-to-Query** - Streaming ingestion makes data queryable within seconds, enabling real-time monitoring and alerting on high-velocity data streams
- **Built-In Time Series Analysis** - Native KQL functions for time series creation, decomposition, anomaly detection, forecasting, and periodicity detection
- **Inline ML Capabilities** - Built-in clustering, pattern analysis, and anomaly detection plugins plus Python/R runtime for custom ML within queries
- **Massive Scale** - Columnar storage with automatic indexing handles petabyte-scale datasets with sub-second query performance across distributed clusters

## AWS Equivalent

Azure Data Explorer is Azure's counterpart to Amazon Timestream. Both are optimized for time series and telemetry data, but ADX is a significantly broader analytics platform supporting ad-hoc exploration, free-text search, and inline ML, while Timestream focuses specifically on time series storage and querying. Note that Timestream for LiveAnalytics has been closed to new customers since 20 June 2025; new AWS deployments use Timestream for InfluxDB, or Amazon OpenSearch Service for log-style exploration closer to ADX.

## Origins and History

Azure Data Explorer originated as an internal Microsoft service called Kusto, built to analyze telemetry from Azure, Office 365, Windows, and Xbox services. It was made available as a public Azure service in general availability on February 7, 2019. The technology also powers Azure Monitor Logs (Log Analytics) and Azure Sentinel (Microsoft Sentinel), giving it one of the largest production deployments of any analytics engine. Free cluster offerings for development and learning were introduced in 2020. The Synapse Data Explorer pool, integrating ADX capabilities within Synapse Analytics workspaces, launched in preview in 2022 and was retired on 7 October 2025, with Microsoft directing users to Eventhouse in Microsoft Fabric Real-Time Intelligence, which runs the same Kusto engine. Continuous enhancements have added features including materialized views, follower databases, and enhanced Python plugin capabilities.

## Sources

1. Microsoft Learn. "What is Azure Data Explorer?" https://learn.microsoft.com/en-us/azure/data-explorer/data-explorer-overview
2. Microsoft Azure Blog. "Azure Data Explorer is now generally available." February 7, 2019. https://azure.microsoft.com/en-us/blog/azure-data-explorer-technology-101/
3. Microsoft Learn. "What is Azure Synapse Data Explorer?" (retirement notice, 7 October 2025), accessed 25 September 2026. https://learn.microsoft.com/en-us/azure/synapse-analytics/data-explorer/data-explorer-overview
4. AWS General Reference. "Services in maintenance" (Amazon Timestream for LiveAnalytics), accessed 25 September 2026. https://docs.aws.amazon.com/general/latest/gr/maintenance_services.html
