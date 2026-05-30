---
title: "Weaviate - Open-Source Vector Database"
description: "A comprehensive reference for Weaviate: open-source vector search, hybrid retrieval, generative search modules, and self-hosted deployment patterns."
date: 2026-03-28
categories: [Tools]
tags: [weaviate, vector-database, RAG, semantic-search, open-source]
related:
  - tools/pinecone
  - tools/chroma-db
  - tools/qdrant
  - tools/amazon-bedrock
alternatives:
  open_source:
    - tools/qdrant
    - tools/pgvector
    - tools/chroma-db
  aws: tools/amazon-opensearch
  azure: tools/azure-search
  gcp: tools/google-vertex-ai
solutions:
  - solutions/retail/recommendation-engine
  - solutions/finance/fraud-detection
last_updated: 2026-05-30
---

Weaviate is an open-source vector database that combines vector search with structured filtering and a modular architecture for embedding generation and generative AI integration. Unlike managed-only solutions, Weaviate can be self-hosted (Docker, Kubernetes) or used as a managed cloud service. For enterprise AI projects, Weaviate is a strong choice when you need full control over the infrastructure, want to avoid vendor lock-in, or require features like multi-tenancy and built-in embedding generation.

Official documentation: https://weaviate.io/developers/weaviate

## Core Concepts

**Collection (formerly Class)** - A group of objects with a shared schema. Each collection defines properties (named, typed fields), the vectorizer module (which embedding model to use), and the vector index configuration. A Weaviate instance can host multiple collections.

**Object** - A data record in a collection, consisting of properties (structured data like title, content, category) and a vector. Vectors can be provided explicitly or generated automatically by a configured vectorizer module.

**Modules** - Pluggable components that extend Weaviate's capabilities. Vectorizer modules (text2vec-openai, text2vec-cohere, text2vec-transformers) generate embeddings automatically during ingestion. Generative modules (generative-openai, generative-cohere) enable RAG queries directly within Weaviate.

**Multi-tenancy** - Native support for isolating data by tenant within a single collection. Each tenant's data is stored separately, enabling efficient per-tenant queries and data management. This is critical for SaaS applications serving multiple customers.

## Search Capabilities

**Vector search** - Find objects by semantic similarity using approximate nearest neighbor (ANN) algorithms. Weaviate uses HNSW (Hierarchical Navigable Small World) indexing by default, providing sub-millisecond query latency on collections with millions of objects.

**Keyword search** - BM25-based keyword search that ranks by term frequency and document length. Useful when exact term matching matters more than semantic understanding.

**Hybrid search** - Combines vector and keyword search results using reciprocal rank fusion. This addresses the weaknesses of each approach individually: vector search catches semantic meaning but may miss exact terms, keyword search catches exact terms but misses paraphrases.

**Filtered search** - Apply structured filters (equality, range, boolean operators) alongside any search type. Filters are applied at the index level, not as a post-processing step, so they do not degrade search performance.

## Generative Search (RAG in the Database)

Weaviate's generative modules enable RAG queries as a single API call. You issue a search query, Weaviate retrieves relevant objects, and then passes them to a configured LLM to generate a response. The entire retrieve-and-generate pipeline happens within the database query:

```graphql
{
  Get {
    Documents(nearText: {concepts: ["renewable energy policy"]}) {
      title
      content
      _additional {
        generate(singleResult: {prompt: "Summarize this document: {content}"}) {
          singleResult
        }
      }
    }
  }
}
```

This simplifies application architecture by eliminating the need for a separate retrieval step and LLM call in application code.

## Deployment Options

**Weaviate Cloud** - Fully managed clusters with automated backups, scaling, and monitoring. The simplest path to production. Available in multiple cloud regions.

**Self-hosted (Docker)** - Run Weaviate as a Docker container for development and small deployments. A single container can handle millions of objects on modest hardware.

**Self-hosted (Kubernetes)** - Production-grade self-hosted deployment using Helm charts. Supports horizontal scaling, replication, and integration with Kubernetes monitoring tools. Choose this when data sovereignty requirements mandate self-hosting.

## Schema Design Best Practices

Design collections around query patterns, not source data structure. If you need to search across document chunks but also retrieve full documents, create two collections (Chunks and Documents) with cross-references. Use properties for data you need to filter on or return in results. Keep vectors aligned to a single embedding model per collection.

## Pricing

Weaviate Cloud pricing is based on cluster size (CPU, memory, storage). Self-hosted is free (open-source, BSD-3-Clause license) but requires infrastructure costs and operational effort. For teams evaluating Weaviate, start with the free sandbox tier on Weaviate Cloud, then decide between managed and self-hosted based on compliance requirements and operational capability.
