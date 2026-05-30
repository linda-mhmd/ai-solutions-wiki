---
title: "Embedding Pipeline Patterns"
description: "End-to-end patterns for generating, storing, and querying embeddings at scale. Chunking strategies, vector database selection, and index maintenance."
date: 2026-03-28
categories: [Patterns]
tags: [embeddings, vector-database, RAG, search, pipeline]
last_updated: 2026-05-30
---

Embeddings convert text, images, or other data into dense vector representations that capture semantic meaning. An embedding pipeline handles the full lifecycle: chunking source content, generating embeddings, storing them in a vector database, and querying them for retrieval. Getting each stage right is critical for downstream quality, especially in RAG systems.

## Chunking Strategy

How you split source documents into chunks determines retrieval quality more than any other factor.

**Fixed-size chunking** - Split text into chunks of N tokens with overlap. Simple to implement but ignores document structure. A chunk boundary may fall in the middle of a paragraph, splitting a coherent thought across two chunks and degrading retrieval relevance.

**Semantic chunking** - Split at natural boundaries: paragraph breaks, section headers, or topic shifts. This preserves coherent units of meaning in each chunk. Use the document's structure (headers, lists, paragraphs) as primary split points, with token-size limits as a secondary constraint.

**Hierarchical chunking** - Create chunks at multiple levels of granularity: document-level, section-level, and paragraph-level. Store embeddings for each level. Query against paragraph-level embeddings for precision, then expand to section-level context when building the prompt. This combines precise retrieval with rich context.

**Chunk size selection** - Smaller chunks (100-200 tokens) produce more precise retrieval but may lack context. Larger chunks (500-1000 tokens) provide more context but may dilute relevance with irrelevant content. The optimal size depends on the query patterns and the content type. Experiment with your actual queries and measure retrieval quality.

## Embedding Generation

**Model selection** - Choose an embedding model that matches your content domain and query patterns. General-purpose models (Amazon Titan Embeddings) work well for most content. Domain-specific models may perform better for specialized content (medical, legal, scientific).

**Batch processing** - Generate embeddings in batches for initial ingestion and incremental updates. Track which content has been embedded and which needs reprocessing after content changes. Implement a change detection mechanism that triggers re-embedding only for modified content.

**Metadata enrichment** - Store metadata alongside each embedding: source document ID, chunk position, section title, document type, and creation date. This metadata enables filtered search (only search within documents of type X) and provides context for the retrieval results.

## Vector Storage

**Database selection** - For small-to-medium scale (under 1 million vectors), pgvector or similar extensions to existing databases minimize operational overhead. For large scale (millions to billions of vectors), dedicated vector databases (Pinecone, Weaviate, Qdrant) or managed services (Amazon OpenSearch with vector search) provide better performance.

**Index types** - HNSW (Hierarchical Navigable Small World) indexes offer the best balance of search speed and recall for most use cases. IVF (Inverted File) indexes use less memory but may miss relevant results. Flat indexes are exact but too slow for large collections. Choose based on your collection size and accuracy requirements.

**Hybrid search** - Combine vector similarity search with keyword search for better retrieval. Vector search handles semantic matching (finding relevant content even when wording differs). Keyword search handles exact term matching (finding specific names, codes, or technical terms). Weighted combination of both produces the best results for most applications.

## Pipeline Operations

**Incremental updates** - When source content changes, detect the change, re-chunk the affected content, generate new embeddings, and update the vector store. Avoid full reindexing for incremental changes. Track content versions to ensure embeddings stay synchronized with source content.

**Quality monitoring** - Regularly evaluate retrieval quality by testing with known queries and expected results. Track retrieval precision and recall over time. Degradation in retrieval quality may indicate embedding model drift, content changes that require re-chunking, or index maintenance needs.

**Index maintenance** - Vector indexes can degrade over time as content is added and removed. Schedule periodic index rebuilds for optimal query performance. Monitor query latency as a proxy for index health.
