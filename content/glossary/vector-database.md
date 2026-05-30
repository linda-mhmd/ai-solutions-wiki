---
title: "Vector Database"
description: "What vector databases are, how they enable semantic search, popular options including Pinecone, Weaviate, and pgvector, and when to use them."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "intermediate", "vector-database", "embeddings", "similarity-search", "rag", "storage"]
related:
  - glossary/rag
  - glossary/embeddings
  - tools/amazon-opensearch
  - patterns/rag-implementation
  - guides/building-rag-systems
last_updated: 2026-05-30
---

A vector database stores and retrieves high-dimensional vectors - numerical representations of data - using similarity search rather than exact matching. In AI applications, vectors represent the semantic meaning of text (or images, or audio) as computed by embedding models. A vector database answers the question: "what content is most similar in meaning to this query?"

## Why Vector Databases Exist

Traditional databases store and retrieve structured data using exact matches, range queries, and joins. They can answer "find all documents tagged 'invoice' from March 2026." They cannot efficiently answer "find documents that discuss similar topics to this paragraph," because similarity in meaning does not map to equality in structured fields.

Vector databases solve this with approximate nearest neighbor (ANN) search algorithms (HNSW, IVF, FAISS). These algorithms find the K most similar vectors to a query vector from a collection of millions or billions of vectors, typically in milliseconds.

## How Embedding Enables Semantic Search

To use a vector database for semantic search:

1. Text is passed through an embedding model (e.g., Amazon Titan Embeddings, OpenAI text-embedding-3, Cohere Embed)
2. The embedding model outputs a vector of 768, 1,536, or more dimensions that represents the text's meaning
3. The vector is stored in the vector database alongside the original text
4. At query time, the query is embedded using the same model
5. The database finds stored vectors closest to the query vector
6. The corresponding text is returned as search results

Text about "motor vehicle accident" and "car crash" will have similar vectors, so a search for one retrieves the other - even with no keyword overlap.

## Popular Options

**Pinecone** - Fully managed, dedicated vector database service. Simple API, scales to billions of vectors. No infrastructure management. Higher cost than self-hosted options at scale.

**Weaviate** - Open source vector database with built-in embedding capabilities, hybrid search (vector + keyword), and a flexible schema. Can be self-hosted or used as a cloud service.

**Qdrant** - Open source, designed for high performance and filtering. Good for use cases requiring metadata filtering combined with vector search.

**pgvector** - PostgreSQL extension that adds vector storage and ANN search to standard Postgres. Best choice when you already use PostgreSQL and your scale does not justify a dedicated vector database. Up to 10-50 million vectors works well; above that, dedicated vector databases outperform.

**Amazon OpenSearch with vector engine** - Adds ANN search to OpenSearch. Good for AWS-native deployments, especially where hybrid search (combining keyword and semantic) is needed. Used as the backend for Amazon Bedrock Knowledge Bases.

**Amazon Aurora (pgvector)** - Managed PostgreSQL on AWS with pgvector support. Appropriate for moderate-scale RAG implementations that already use Aurora.

## When to Use a Vector Database

Use a vector database when:
- You need semantic search across a large document collection (1,000+ documents)
- Your RAG system needs to retrieve relevant context efficiently at query time
- You need to find similar items by meaning rather than exact properties

For small-scale RAG (under a few hundred documents), loading all content directly into the model context may be simpler than maintaining a vector database. The overhead of a vector database is justified when the content exceeds what fits in a context window or when sub-second retrieval latency matters.

## Sources

- Johnson, J., Douze, M., & Jégou, H. (2019). Billion-scale similarity search with GPUs. *IEEE Transactions on Big Data, 7*(3), 535–547. (FAISS; foundational ANN search library powering most vector databases.)
- Malkov, Y.A., & Yashunin, D.A. (2020). Efficient and robust approximate nearest neighbor search using hierarchical navigable small world graphs. *IEEE TPAMI, 42*(4), 824–836. (HNSW; the primary indexing algorithm used in Pinecone, Weaviate, Qdrant, and pgvector.)
- Lewis, P., et al. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *NeurIPS 2020*. (RAG; established vector retrieval as the standard approach for grounding LLM responses.)
