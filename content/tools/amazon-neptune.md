---
title: "Amazon Neptune - Graph Database for AI Applications"
description: "A comprehensive reference for Amazon Neptune: graph data modeling, knowledge graphs, GraphRAG, fraud detection, and AI/ML workflows."
date: 2026-03-28
categories: [Tools]
tags: [AWS, graph-database, knowledge-graph, fraud-detection, graphrag, "aws-service"]
related:
  - tools/amazon-bedrock
  - tools/amazon-sagemaker
  - tools/amazon-opensearch
  - glossary/rag
  - glossary/graph-neural-network
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
layer: data
provider: aws
pricing_model: payg
maturity: production
---

Amazon Neptune is a fully managed graph database service that supports both property graph (using Apache TinkerPop Gremlin and Neo4j's openCypher) and RDF graph (using SPARQL) models. For AI projects, Neptune excels at representing and querying complex relationships: knowledge graphs for RAG systems, fraud detection networks, recommendation engines based on social connections, and identity resolution across disparate data sources.

Neptune comes in two engines that complement each other. **Neptune Database** is the transactional graph database (an always-on cluster or serverless) for applications that read and write graph data continuously. **Neptune Analytics** is a separate, memory-optimized engine that loads a graph into memory to run graph analytics algorithms and low-latency analytic queries, and it is the engine behind Neptune's native vector search and GraphRAG features.

Official documentation: https://docs.aws.amazon.com/neptune/
Pricing: https://aws.amazon.com/neptune/pricing/
Service quotas: https://docs.aws.amazon.com/neptune/latest/userguide/limits.html

## Foundations for beginners

A few underlying ideas make Neptune easier to understand.

- **Graph database** - a database that stores data as a network of nodes (things) and edges (the relationships between them) rather than as rows in tables. It is built for questions about how things are connected. Asking "which accounts share a device with this one, two hops away" is a single short query in a graph, but a chain of expensive joins in a relational database.
- **Property graph vs RDF** - two ways to model a graph. A property graph attaches free-form key-value properties to nodes and edges and is the common choice for application development. RDF (Resource Description Framework) models data as subject-predicate-object triples and is a W3C standard suited to shared vocabularies (ontologies) and linked data.
- **Managed service** - AWS runs the servers, patching, backups, and replication for you, so you work with the database, not the machines underneath it.
- **Knowledge graph** - a graph that captures the entities in a domain and the facts that connect them, used as a structured memory an application (or an AI model) can query.

In an AI system, Neptune is part of the {{< relref "glossary/rag" >}} data layer: it holds the connected facts that complement the unstructured text stored in a {{< relref "glossary/vector-database" >}}.

## Core Concepts

**Cluster** - A Neptune Database cluster consists of one primary writer instance and up to 15 read replicas that share the same underlying storage. Storage is managed automatically, grows in segments, and scales up to 128 TiB (in supported Regions outside China and GovCloud). The architecture is similar to Amazon Aurora: the storage layer is replicated across multiple Availability Zones, and the cluster provides high availability with automatic failover to a replica.

**Property Graph** - The most common model for application workloads. Nodes (vertices) represent entities, edges represent relationships, and both can have key-value properties. Queried using Gremlin traversal language or the newer openCypher query language.

**RDF Graph** - Resource Description Framework model, queried using SPARQL. Better suited for ontology-driven data models, linked data, and scenarios where data interoperability across organizations matters (common in healthcare, government, and research).

**Neptune ML** - A built-in integration with Amazon SageMaker AI that enables graph neural network (GNN) training directly on Neptune data, using the open-source Deep Graph Library (DGL). Neptune ML exports graph data, trains GNN models in SageMaker, and deploys them as Neptune query endpoints. This enables ML predictions (link prediction, node classification, and node regression) to be requested through ordinary Gremlin or openCypher queries.

**Neptune Analytics** - A memory-optimized analytics engine, separate from the transactional database, that loads a graph into memory to run built-in graph algorithms (for example PageRank, community detection, and shortest path) and low-latency analytic queries. It also provides Neptune's native vector search, storing embeddings alongside graph data so a single query can combine structural traversal with semantic similarity. It is the engine that powers Neptune's GraphRAG features.

## Knowledge Graphs for RAG

One of the most valuable AI applications of Neptune is building knowledge graphs that enhance retrieval-augmented generation (see {{< relref "glossary/rag" >}}). While vector search retrieves documents based on semantic similarity, a knowledge graph retrieves based on structured relationships. Combining both approaches, known as GraphRAG, produces more accurate, more complete, and more explainable answers because the model can follow the actual connections between facts.

The pattern works as follows: extract entities and relationships from documents using NLP (Amazon Bedrock or Amazon Comprehend), store them as nodes and edges in Neptune, and at query time, traverse the graph to find relevant entities and their connections. Pass this structured context to the foundation model alongside vector-retrieved passages.

For example, in a financial services context, a question about "exposure to Company X" benefits from graph traversal that follows ownership chains, subsidiary relationships, and counterparty connections that vector search alone would miss.

You do not have to build this plumbing by hand. There are two AWS-supported paths:

- **Amazon Bedrock Knowledge Bases** offers fully managed GraphRAG with Neptune Analytics as the graph store. Bedrock automatically extracts entities and relationships, builds and maintains the graph and the embeddings, and serves combined graph plus vector retrieval, so you do not manage the graph construction yourself.
- **The GraphRAG Toolkit**, an open-source framework AWS released in January 2025 (`awslabs/graphrag-toolkit` on GitHub), automates graph construction from unstructured text and gives you more control. It provides graph store implementations for both Neptune Analytics and Neptune Database, with vector stores on Neptune Analytics or Amazon OpenSearch Serverless.

## Fraud Detection Patterns

Graph databases are exceptionally effective for fraud detection because fraud often involves coordinated networks of entities. Patterns that are invisible in tabular data become obvious in a graph: multiple accounts sharing the same device fingerprint, phone number, or IP address within a short time window.

A typical fraud detection query in Gremlin traverses from a suspicious transaction to the account, then to shared attributes (email domain, device, address), then to other accounts sharing those attributes, looking for clusters of connected entities with suspicious characteristics. Neptune's optimized graph storage makes these multi-hop traversals fast even at scale.

## Neptune Serverless

Neptune Serverless automatically scales compute capacity based on workload. It eliminates the need to provision instance sizes and handles traffic spikes without manual intervention. For AI projects with variable query patterns (heavy during model training data extraction, light during inference), serverless can significantly reduce costs compared to provisioned instances.

Neptune Serverless scales in Neptune Capacity Units (NCUs) between a configured minimum and maximum, where each NCU provides roughly 2 GiB of memory plus associated compute and networking. You set the minimum low for development environments and higher for production workloads with latency requirements. Capacity adjusts continuously with load, so you pay for what the workload actually consumes rather than for a fixed instance size.

## Query Language Choice

**Gremlin** is the standard for property graph traversals. It uses an imperative, step-by-step traversal syntax. Most application developers find it intuitive for path-finding and neighborhood queries.

**openCypher** provides a more declarative SQL-like syntax for property graphs. It is often easier to read and write for developers coming from a SQL background. Neptune supports openCypher natively.

**SPARQL** is the choice for RDF data models. Use it when your data model is ontology-driven or when you need to integrate with linked data standards.

## Pricing

Neptune charges for instance hours (or NCUs for serverless), storage, I/O operations, and data transfer. For graph workloads, the instance size is the primary cost driver. Start with a smaller instance for development and right-size based on query latency requirements. Neptune ML incurs additional Amazon SageMaker AI costs for model training, and Neptune Analytics is billed separately by its in-memory capacity. Check the official pricing page for current rates, since they vary by Region and change over time.

## Best practices

AWS publishes architecture guidance you should consult before a production deployment. The [AWS Reference Architectures for Using Graph Databases](https://github.com/aws-samples/aws-dbs-refarch-graph) repository helps you choose a graph data model and query language and shows example deployment topologies. For the broader operational picture (reliability, security, cost, and performance) see the [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) and {{< relref "foundations/well-architected" >}}. Practical starting points: model your graph around the traversals your application actually runs, place read replicas in separate Availability Zones for high availability, enable encryption at rest with AWS KMS and run inside a VPC, and prefer serverless when query volume is spiky or hard to predict.

## Sources

- [Amazon Neptune product page](https://aws.amazon.com/neptune/) - AWS
- [What Is Amazon Neptune? (User Guide)](https://docs.aws.amazon.com/neptune/latest/userguide/intro.html) - AWS documentation, primary source for cluster, replica, and storage details
- [Amazon Neptune features](https://aws.amazon.com/neptune/features/) - AWS, query language versions, storage limit, and AI/ML features
- [Amazon Neptune ML](https://aws.amazon.com/neptune/machine-learning/) - AWS
- [Amazon Neptune now supports the open-source GraphRAG Toolkit](https://aws.amazon.com/about-aws/whats-new/2025/01/amazon-neptune-open-source-graphrag-toolkit) - AWS What's New, January 2025
- [graphrag-toolkit](https://github.com/awslabs/graphrag-toolkit) - open-source project repository (awslabs, GitHub)
- [Amazon Neptune pricing](https://aws.amazon.com/neptune/pricing/) - AWS
