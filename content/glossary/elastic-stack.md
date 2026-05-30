---
title: "Elastic Stack (ELK)"
description: "What the Elastic Stack is, how Elasticsearch, Logstash, and Kibana work together, and when to use it for log management."
date: 2026-03-28
categories: [Glossary]
tags: [elastic-stack, ELK, Elasticsearch, logging, observability]
related:
  - glossary/observability
  - glossary/grafana
  - glossary/prometheus
last_updated: 2026-05-30
---

The Elastic Stack (formerly ELK Stack) is a set of tools for collecting, storing, searching, and visualizing log data: Elasticsearch (search and analytics engine), Logstash (data processing pipeline), Kibana (visualization), and Beats (lightweight data shippers). Together, they provide centralized log management and full-text search across distributed systems.

## Components

**Elasticsearch** is a distributed search engine built on Apache Lucene. It indexes and stores log data, enabling fast full-text search, filtering, and aggregation across billions of log entries. It also serves as a general-purpose analytics engine.

**Logstash** ingests data from multiple sources, transforms it (parsing, enrichment, filtering), and sends it to Elasticsearch. It handles diverse log formats and protocols.

**Kibana** provides dashboards, visualizations, and an interactive query interface for exploring data in Elasticsearch. It enables log exploration, pattern discovery, and operational monitoring.

**Beats** are lightweight agents that ship data from servers to Logstash or Elasticsearch. Filebeat (logs), Metricbeat (metrics), and Packetbeat (network data) are the most common.

## Why It Matters

Centralized logging is essential for troubleshooting distributed systems. When an AI inference request fails, you need to correlate logs across the API gateway, load balancer, inference service, and downstream dependencies. The Elastic Stack makes this possible by centralizing logs from all services and providing search and correlation capabilities.

**Amazon OpenSearch Service** is the AWS-managed service based on the OpenSearch fork of Elasticsearch. It provides the same search and analytics capabilities with managed infrastructure, automatic scaling, and integration with AWS services.

## Practical Guidance

Use structured logging (JSON format) from applications to enable rich querying without complex parsing. Set index lifecycle policies to rotate and delete old data automatically, controlling storage costs. Use index patterns and Kibana saved searches to standardize how the team investigates issues. For most AWS workloads, Amazon OpenSearch Service reduces operational burden significantly compared to self-managed Elasticsearch clusters. Consider log sampling for high-volume, low-value logs (health checks, routine operations) to control costs.

## Sources

- Gormley, C., & Tong, Z. (2015). *Elasticsearch: The Definitive Guide*. O'Reilly Media. (Comprehensive reference for Elasticsearch; inverted index, distributed search, and aggregation framework.)
- Shay Banon. (2010). Elasticsearch. *GitHub/elastic*. (Original release of Elasticsearch; distributed REST-based search engine built on Apache Lucene.)
- Turnbull, J. (2014). *The Logstash Book*. James Turnbull. (Log collection, parsing, and enrichment with Logstash; structured logging pipeline design for distributed systems.)
