---
title: "Elasticsearch - Search and Vector Engine"
description: "A comprehensive reference for Elasticsearch: full-text search, vector search, hybrid retrieval, and integration patterns for AI applications."
date: 2026-03-28
categories: [Tools]
tags: [elasticsearch, search, vector-search, hybrid-search, NLP, analytics]
related:
  - tools/amazon-opensearch
  - tools/pinecone
  - tools/weaviate
last_updated: 2026-05-30
---

Elasticsearch is a distributed search and analytics engine built on Apache Lucene. It has long been the standard for full-text search, log analytics, and application search. With the addition of dense vector fields and approximate nearest neighbor (ANN) search, Elasticsearch now serves as a hybrid search engine that combines traditional keyword search with vector similarity search. For AI projects, Elasticsearch is valuable when you need both structured search and semantic search in a single system, particularly when the organization already operates Elasticsearch infrastructure.

Official documentation: https://www.elastic.co/guide/en/elasticsearch/reference/current/

## Core Concepts

**Index** - A collection of documents with a defined mapping (schema). An index is distributed across shards for parallel processing and replicated for fault tolerance.

**Document** - A JSON object stored in an index. Documents have fields with defined types: text (for full-text search), keyword (for exact matching), dense_vector (for embeddings), and many others.

**Mapping** - The schema definition for an index. Mappings define field types, analyzers (for text processing), and indexing options. For vector search, the mapping includes the dense_vector field type with dimension and similarity metric configuration.

**Query DSL** - Elasticsearch's JSON-based query language. Supports boolean queries, full-text matching, range filters, aggregations, and vector similarity in a composable structure.

## Vector Search (kNN)

Elasticsearch supports approximate k-nearest-neighbor (kNN) search on dense_vector fields. Vectors are indexed using HNSW for fast retrieval. A basic vector search query:

```json
{
  "knn": {
    "field": "embedding",
    "query_vector": [0.1, 0.2, ...],
    "k": 10,
    "num_candidates": 100
  }
}
```

The `num_candidates` parameter controls the accuracy-speed trade-off: more candidates produce more accurate results at the cost of latency.

## Hybrid Search

Elasticsearch's ability to combine keyword and vector search in a single query is its primary advantage for AI applications. The Reciprocal Rank Fusion (RRF) retriever merges results from both retrieval methods:

A hybrid query searches for documents matching keyword terms AND semantically similar to a query vector, merging the ranked lists into a single result. This handles queries where both exact terminology and conceptual similarity matter, which is common in enterprise search, legal document retrieval, and technical documentation.

## ELSER (Elastic Learned Sparse Encoder)

ELSER is Elastic's trained sparse embedding model that generates sparse vector representations for text. Unlike dense vectors that capture general semantics, sparse vectors preserve individual term importance, providing better out-of-domain performance without fine-tuning. ELSER runs within Elasticsearch as a machine learning model, generating embeddings at index time and query time without external API calls.

## Ingest Pipelines

Ingest pipelines process documents before indexing. For AI applications, pipelines can: call an ML model to generate embeddings (using the inference API connected to OpenAI, Cohere, Hugging Face, or ELSER), extract text from PDFs and Office documents (using the attachment processor), enrich documents with NLP analysis (entity extraction, language detection), and chunk long documents for embedding.

This means document processing and embedding generation can happen within Elasticsearch without external orchestration.

## Integration with LLM Applications

Elasticsearch connects to LLM orchestration frameworks (LangChain, LlamaIndex) as a retriever. The integration leverages hybrid search to provide high-quality context for RAG applications. The pattern is: user query goes to Elasticsearch (keyword + vector search), top results are passed to the LLM as context, and the LLM generates a grounded response.

## Elastic Cloud vs Self-Managed

**Elastic Cloud** - Managed Elasticsearch on AWS, GCP, or Azure. Handles cluster provisioning, scaling, upgrades, and monitoring. Includes Kibana for visualization and ML model management. This is the recommended deployment for most teams.

**Self-managed** - Download and run Elasticsearch on your own infrastructure. Provides full control but requires significant operational expertise. Common on AWS using EC2 instances or EKS.

**Amazon OpenSearch** - AWS's managed fork of Elasticsearch. Compatible with most Elasticsearch APIs but diverges in newer features. Consider OpenSearch when staying within the AWS ecosystem is a priority.

## Pricing

Elastic Cloud charges based on deployment size (CPU, memory, storage) and data transfer. Self-managed has no licensing cost for the basic features (Elasticsearch is open-source under SSPL/Elastic License), but enterprise features (ML, security, alerting) require a paid subscription. Vector search and ELSER are included in the Elasticsearch license.
