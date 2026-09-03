---
title: "Amazon OpenSearch Service - Search and Analytics for AI"
description: "Using Amazon OpenSearch Service for vector search, full-text search, and log analytics in AI-powered applications."
date: 2026-03-25
categories: [Tools]
tags: ["data-engineering", "intermediate", "search", "vector-search", "aws", "aws-service", "elasticsearch"]
related:
  - glossary/rag
  - glossary/vector-database
  - patterns/rag-implementation
  - guides/building-rag-systems
  - tools/amazon-bedrock
  - tools/azure-search
  - tools/elasticsearch
layer: data
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-09-03
lastmod: 2026-09-03
enhanced_pass: "2026-06"
---

Amazon OpenSearch Service is a managed deployment of OpenSearch (the open-source fork of Elasticsearch). It handles cluster provisioning, patching, scaling, and backups. For AI applications, its primary use cases are vector similarity search (for RAG and semantic search), full-text search over document collections, and log/event analytics.

Official documentation: https://aws.amazon.com/opensearch-service/
Pricing: https://aws.amazon.com/opensearch-service/pricing/
Service quotas: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/limits.html

**Azure equivalent:** Azure AI Search (formerly Cognitive Search). **GCP equivalent:** Vertex AI Search, part of Vertex AI (rebranded Gemini Enterprise Agent Platform in April 2026 — see [Google Vertex AI](/tools/google-vertex-ai/) for the full story).

## Foundations first

Before the AI specifics, the core ideas:

- **Search engine** - software that builds an index over your documents so you can find matches fast, instead of scanning every record. The classic approach is the **inverted index** (a map from each word to the documents that contain it), which is why keyword search returns results in milliseconds.
- **Full-text search** - finding documents by the words they contain, with help from analyzers that handle stemming (matching "run" to "running"), stop words, and typos.
- **Vector search** - finding documents by meaning rather than exact words. Text is turned into a list of numbers (an **embedding**), and the engine returns the items whose vectors sit closest to the query vector. See {{< relref "glossary/vector-database" >}} and {{< relref "glossary/embeddings" >}}.
- **k-NN (k-nearest neighbors)** - the algorithm that returns the k closest vectors to a query. Doing this exactly over millions of vectors is slow, so engines use approximate nearest neighbor (ANN) methods such as HNSW. See {{< relref "glossary/k-nearest-neighbors" >}}.
- **Managed service** - AWS runs the servers, patching, scaling, and backups for you, so you operate a search index without operating the machines under it. See {{< relref "glossary/database-indexing" >}} for how indexes work in general.

OpenSearch began as a community fork of Elasticsearch in 2021 after Elastic changed its licence. It is now developed under the OpenSearch Software Foundation (a Linux Foundation project, since 2024). Amazon OpenSearch Service is AWS's hosted version of that open-source engine.

## OpenSearch Serverless vs Managed Clusters

**OpenSearch Serverless** eliminates cluster management entirely. You create a collection (search, time-series, or vector-search type), and AWS handles scaling, replication, and capacity. Cost is based on OCUs (OpenSearch Compute Units, roughly 6 GB of RAM and matching vCPU each) plus storage. For AI RAG applications, Serverless is the default choice: no capacity planning, and it scales to zero when idle.

The **next generation of OpenSearch Serverless** went generally available on 28 May 2026, rebuilt for agent and RAG workloads. AWS reports that it scales capacity up to 20 times faster than the previous architecture, fully decouples compute from storage (so compute can scale independently of how much data you store), releases compute after 10 minutes of inactivity for true scale-to-zero, and can cost up to 60 percent less than provisioning managed clusters for peak load. For vector collections it uses GPU-backed compute to build HNSW indexes faster than CPU-only builds.

**Managed clusters** (also called managed domains) give you control over instance types, shard counts, and configuration. Billing is per instance hour plus EBS storage, with Reserved Instances and Savings Plans available for steady workloads. Use managed clusters when you need specific performance tuning, very high ingestion rates, UltraWarm or cold storage tiers for cheap long-term log retention, or features not yet available in Serverless.

## Vector Search for RAG

OpenSearch supports k-nearest-neighbor (k-NN) search using the `knn_vector` field type. This enables semantic similarity search: given a query vector (embedding), find the N most similar document vectors in the index. It offers both exact k-NN and approximate nearest neighbor (ANN) search, with HNSW and IVF (inverted file) index implementations.

OpenSearch Service is the vector store AWS recommends for Amazon Bedrock, with a native two-way integration. In Amazon Bedrock Knowledge Bases, OpenSearch Serverless is the Quick Create default, but it is now one of several supported vector stores: Amazon Aurora PostgreSQL with pgvector, Amazon Neptune Analytics, an OpenSearch managed cluster (supported since March 2025), and third-party stores such as Pinecone and MongoDB Atlas. For cost-sensitive workloads, AWS also added Amazon S3 Vectors (generally available since December 2025), which AWS says lowers vector storage and query costs by up to 90 percent versus dedicated vector databases. When you use a Knowledge Base, Bedrock handles chunking, embedding generation, and index management, and you query through the Bedrock API rather than directly through OpenSearch.

For custom RAG implementations, you manage the index directly: embed documents using a model such as Amazon Titan Text Embeddings or Cohere Embed, index the vectors alongside metadata, and query with `knn` at retrieval time. See {{< relref "patterns/rag-implementation" >}} and {{< relref "guides/building-rag-systems" >}} for end-to-end patterns.

## Hybrid Search

OpenSearch supports hybrid search combining vector similarity (semantic relevance) and BM25 full-text scoring. A normalization processor blends the two scores. Hybrid search outperforms either method alone for most information retrieval tasks, especially when users mix keyword and semantic queries.

## Full-Text Search Patterns

OpenSearch's full-text capabilities handle:
- Multilingual search with language-specific analyzers (stemming, stop words)
- Fuzzy matching for typo tolerance
- Autocomplete using edge n-grams
- Aggregations for faceted navigation (filter by category, date range, etc.)

## Analytics and Observability

OpenSearch Dashboards (the open-source Kibana equivalent) provides visualization for log data. Standard use: index Lambda logs, CloudWatch metrics, or application events, then build dashboards showing error rates, latency percentiles, and throughput.

For AI applications, this means you can index LLM traces (from Langfuse or custom logging) into OpenSearch and query patterns across thousands of calls.

## Cross-Cloud Comparison

Azure AI Search offers built-in semantic ranking, hybrid search, and a managed indexer pipeline. Vertex AI Search integrates tightly with Google's foundation models for grounded answers. OpenSearch's advantage is the open-source ecosystem and its dual role as both a search engine and a log analytics platform within AWS.

## Best practices

AWS publishes operational guidance for OpenSearch Service. For production work, follow the [Operational best practices for Amazon OpenSearch Service](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/bp.html) (sizing, shard strategy, dedicated master nodes, and Multi-AZ). For overall architecture decisions, the [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) and its reliability and cost pillars apply: prefer Serverless when traffic is spiky so you pay only for what you use, and reserve managed clusters for steady, high-volume workloads where Reserved Instances cut cost.

## Sources

- [Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service/) - official product page
- [Amazon OpenSearch Service Developer Guide](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html) - official documentation
- [The next generation of Amazon OpenSearch Serverless is now generally available](https://aws.amazon.com/about-aws/whats-new/2026/05/amazon-opensearch-serverless-next-generation-generally-available/) - 28 May 2026 GA announcement (20x faster scaling, scale-to-zero, up to 60 percent cost savings)
- [The next generation of Amazon OpenSearch Serverless: Built from the ground up for agents](https://aws.amazon.com/blogs/big-data/the-next-generation-of-amazon-opensearch-serverless-built-from-the-ground-up-for-agents/) - AWS Big Data Blog (compute and storage decoupling, GPU-accelerated HNSW builds)
- [Vector database for Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service/serverless-vector-database/) - k-NN, ANN, HNSW and IVF, Bedrock integration
- [Amazon S3 Vectors is now generally available](https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-s3-vectors-generally-available/) - low-cost vector storage option for Bedrock Knowledge Bases
- [OpenSearch project (open source)](https://github.com/opensearch-project/OpenSearch) - the upstream engine on GitHub
- [Amazon OpenSearch Service pricing](https://aws.amazon.com/opensearch-service/pricing/) - OCU and instance-hour pricing

## Related Articles

- [Amazon Bedrock]({{< relref "amazon-bedrock.md" >}}) - OpenSearch is the recommended vector store for Bedrock Knowledge Bases
- [Embeddings]({{< relref "/glossary/embeddings.md" >}}) - vectors stored and searched in OpenSearch
- [LlamaIndex]({{< relref "llamaindex.md" >}}) - framework that integrates with OpenSearch for RAG
