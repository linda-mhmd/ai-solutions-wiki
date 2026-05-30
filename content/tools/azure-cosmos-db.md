---
title: "Azure Cosmos DB - Globally Distributed Multi-Model Database"
description: "Azure Cosmos DB is a fully managed, globally distributed NoSQL and relational database service designed for low-latency, high-throughput applications at any scale."
date: 2026-03-28
categories: [Tools]
tags: [azure, database, nosql, globally-distributed, multi-model]
related:
  - tools/amazon-dynamodb
  - tools/amazon-neptune
last_updated: 2026-05-30
---

Azure Cosmos DB is Microsoft Azure's globally distributed, multi-model database service that provides single-digit millisecond response times and guaranteed availability backed by comprehensive SLAs. Unlike most managed database services that support a single data model, Cosmos DB supports multiple APIs: NoSQL (document), MongoDB, Apache Cassandra, Apache Gremlin (graph), Table, and PostgreSQL. This multi-model approach means teams can use their preferred data model and query language while benefiting from the same underlying globally distributed infrastructure.

For AI workloads, Cosmos DB serves several critical roles. Its vector search capability, introduced in 2023, enables storage and retrieval of vector embeddings for retrieval-augmented generation (RAG) patterns alongside the application data that produced those embeddings. The change feed feature provides a real-time stream of document modifications, enabling event-driven architectures where data changes trigger AI processing via Azure Functions. The globally distributed nature of the service, with automatic multi-region replication, ensures that AI-powered applications deliver consistent low-latency responses regardless of user location.

Cosmos DB uses a provisioned throughput model measured in Request Units per second (RU/s), where each RU represents the cost of reading a single 1 KB document. The serverless capacity mode, suitable for development and intermittent workloads, charges per-request instead. Autoscale mode automatically adjusts throughput between a configured minimum and maximum based on demand, which suits AI workloads with unpredictable traffic patterns. The service guarantees five well-defined consistency levels ranging from strong to eventual, allowing developers to choose the exact trade-off between consistency, availability, and latency for their use case.

Official documentation: https://learn.microsoft.com/en-us/azure/cosmos-db/

## Key Capabilities

- **Multi-Model APIs** - Support for NoSQL, MongoDB, Cassandra, Gremlin (graph), Table, and PostgreSQL APIs on a single distributed database engine
- **Global Distribution** - Turnkey multi-region replication with automatic failover, configurable consistency levels, and single-digit millisecond reads and writes worldwide
- **Integrated Vector Search** - Native vector indexing and similarity search for RAG patterns, eliminating the need for a separate vector database
- **Change Feed** - Real-time ordered stream of document changes that powers event-driven architectures and materialized views

## AWS Equivalent

Azure Cosmos DB covers functionality split between Amazon DynamoDB (key-value/document) and Amazon Neptune (graph). Cosmos DB's multi-model approach provides graph queries via its Gremlin API and document queries via its NoSQL API in a single service, whereas AWS requires two separate managed services. DynamoDB offers simpler pricing and tighter Lambda integration, while Cosmos DB provides more flexible consistency models and native multi-region writes.

## Origins and History

Cosmos DB originated as Azure DocumentDB, a document database service launched in April 2015. At the Build 2017 conference in May 2017, Microsoft rebranded and expanded it as Azure Cosmos DB, adding support for multiple data models and global distribution as first-class features. The service was designed by Leslie Lamport's team at Microsoft Research, incorporating the TLA+ specification language for formal verification. Vector search support was announced at Build 2023 and reached general availability in late 2023. The PostgreSQL API (powered by the Citus distributed database engine) was added in October 2023.

## Sources

1. Microsoft Learn. "Welcome to Azure Cosmos DB." https://learn.microsoft.com/en-us/azure/cosmos-db/introduction
2. Microsoft Azure Blog. "Azure Cosmos DB: The industry's first globally-distributed, multi-model database service." May 10, 2017. https://azure.microsoft.com/en-us/blog/azure-cosmos-db-microsofts-globally-distributed-multi-model-database-service/
