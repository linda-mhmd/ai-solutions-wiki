---
title: "Chroma - Lightweight Embedding Database"
description: "A comprehensive reference for Chroma: the open-source embedding database for AI applications, local development, and lightweight production deployments."
date: 2026-03-28
categories: [Tools]
tags: [chroma, vector-database, embeddings, RAG, open-source, python]
related:
  - tools/pinecone
  - tools/weaviate
  - tools/langchain
last_updated: 2026-05-30
---

Chroma is an open-source embedding database designed for simplicity and developer experience. It runs in-process (embedded in your Python application), as a standalone server, or as a managed cloud service. Chroma's primary value is speed of development: you can have a working vector search system in under 10 lines of Python. For AI projects, Chroma is the go-to choice for prototyping RAG systems, local development, and production deployments where the dataset is moderate in size (up to low millions of documents).

Official documentation: https://docs.trychroma.com/

## Core Concepts

**Collection** - A named group of documents, embeddings, and metadata. Collections are the primary organizational unit. Each collection has a configured embedding function (or you provide embeddings directly) and a distance metric.

**Document** - A text string stored in the collection. Chroma can store both the original document text and the embedding vector, eliminating the need for a separate document store in simple applications.

**Embedding** - A vector representation of the document. Chroma can generate embeddings automatically using a configured embedding function (defaulting to a local sentence-transformers model) or accept pre-computed embeddings.

**Metadata** - Key-value pairs associated with each document. Metadata supports filtering during queries: retrieve documents that are both semantically similar and match specific metadata conditions.

## Getting Started

Chroma's minimal setup is its greatest strength:

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("docs")

collection.add(
    documents=["Document text here", "Another document"],
    ids=["doc1", "doc2"],
    metadatas=[{"source": "manual"}, {"source": "faq"}]
)

results = collection.query(query_texts=["search query"], n_results=5)
```

This code creates an in-memory database, adds documents (automatically generating embeddings), and queries for similar documents. No server setup, no API keys for the default embedding model, no configuration files.

## Persistence and Deployment Modes

**In-memory** - Default mode. Data lives in memory and is lost when the process exits. Best for testing and experimentation.

**Persistent client** - Data is persisted to a local directory. The database survives process restarts. Suitable for single-process applications and development:

```python
client = chromadb.PersistentClient(path="/data/chroma")
```

**Client-server** - Chroma runs as a standalone server (Docker or direct), and your application connects via HTTP. This separates the database from the application process, enabling multiple applications to share the same data and independent scaling.

**Chroma Cloud** - Managed hosting with automatic scaling, backups, and team management. Eliminates operational overhead for production deployments.

## Integration with LLM Frameworks

Chroma integrates natively with LangChain, LlamaIndex, and other LLM orchestration frameworks. In LangChain, Chroma is the default vector store for many examples and tutorials. The integration handles embedding generation, document storage, and retrieval through a consistent interface.

## When Chroma Fits and When It Does Not

**Good fit**: Prototyping RAG applications, local development environments, small to medium datasets (up to a few million documents), single-team applications, and projects where developer velocity matters more than enterprise features.

**Less suitable**: Multi-tenant SaaS applications (limited multi-tenancy support compared to Weaviate or Pinecone), datasets with hundreds of millions of vectors (consider Pinecone or Qdrant), and workloads requiring advanced features like hybrid search or real-time replication.

## Metadata Filtering

Chroma supports where clauses on metadata and where_document clauses on document content. Filters use operators like $eq, $ne, $gt, $lt, $in, and $nin. Logical operators $and and $or combine conditions:

```python
results = collection.query(
    query_texts=["search query"],
    where={"source": {"$eq": "manual"}, "date": {"$gt": "2025-01-01"}},
    n_results=10
)
```

## Pricing

Chroma is open-source (Apache 2.0 license) and free to self-host. Chroma Cloud pricing is usage-based, covering storage, queries, and embeddings generated. For most development and moderate-scale production use cases, the self-hosted option has zero licensing cost beyond infrastructure.
