---
title: "Vector Search Optimization Patterns"
description: "Improving vector search quality and performance. Index tuning, hybrid search, re-ranking, and query optimization for production RAG systems."
date: 2026-03-28
categories: [Patterns]
tags: [vector-search, optimization, RAG, embeddings, performance]
last_updated: 2026-05-30
---

Vector search is the retrieval backbone of RAG systems. Getting it right determines whether the AI system finds relevant context or generates responses from irrelevant or missing information. Optimization targets three dimensions: relevance (finding the right content), performance (finding it fast), and cost (finding it efficiently).

## Index Optimization

The vector index structure determines the speed-accuracy tradeoff for search operations.

**HNSW tuning** - HNSW indexes have two key parameters: M (connections per node) and efConstruction (construction-time search breadth). Higher values improve recall at the cost of memory and build time. For most applications, M=16 and efConstruction=200 provide a good balance. Increase efConstruction for datasets where accuracy is critical.

**efSearch tuning** - The search-time parameter controls how many nodes are explored during a query. Higher values improve recall but increase latency. Tune this parameter to meet your latency SLA while maximizing recall. Start at efSearch=100 and adjust based on measured recall and latency.

**Index rebuild frequency** - As content is added and removed, index quality degrades. Schedule periodic index rebuilds (weekly or monthly) to restore optimal performance. Monitor search latency as a proxy for index health.

## Hybrid Search

Combining vector similarity search with keyword search produces better results than either approach alone.

**Vector + BM25** - Run both a vector similarity search and a BM25 keyword search on the same query. Merge the results using reciprocal rank fusion (RRF) or weighted combination. Vector search handles semantic similarity ("machine learning" matching "artificial intelligence"). BM25 handles exact term matching ("error code 12345" matching documents containing that exact code).

**Weight tuning** - The relative weight of vector and keyword results depends on the query type. Conceptual queries benefit from higher vector weight. Exact-match queries benefit from higher keyword weight. Use query classification to dynamically adjust weights, or tune a fixed weight that performs well across your query distribution.

**Filtered search** - Apply metadata filters before or during vector search to narrow the search space. Filtering by document type, date range, or category before computing similarity reduces noise and improves relevance. Pre-filtering is faster for highly selective filters; post-filtering is better for broad filters.

## Re-Ranking

Initial retrieval casts a wide net. Re-ranking narrows it to the most relevant results.

**Cross-encoder re-ranking** - Retrieve top-K results (K=20-50) using vector search, then re-rank them using a cross-encoder model that evaluates query-document pairs for relevance. Cross-encoders are more accurate than bi-encoder similarity scores but too expensive to run on the full collection. Using them only on the top-K candidates balances accuracy and cost.

**LLM re-ranking** - Pass the top-K results to an LLM and ask it to rank them by relevance to the query. This can incorporate reasoning about relevance that embedding similarity misses. More expensive than cross-encoder re-ranking but handles nuanced relevance judgments better.

**Diversity-aware re-ranking** - Ensure the final result set covers different aspects of the query rather than returning multiple variations of the same content. After relevance ranking, apply a diversity filter that penalizes results too similar to already-selected results.

## Query Optimization

The query itself can be optimized for better retrieval.

**Query expansion** - Augment the user's query with related terms, synonyms, or rephrased versions. Run multiple expanded queries and merge the results. This improves recall for queries that use different terminology than the indexed content.

**Hypothetical document embedding (HyDE)** - Generate a hypothetical answer to the query using an LLM, then embed the hypothetical answer and use it as the search query. The hypothetical answer is closer in embedding space to relevant documents than the original question. This technique consistently improves retrieval quality for question-answering use cases.

**Query decomposition** - For complex queries that ask about multiple topics, decompose into sub-queries, run each independently, and combine results. A query about "pricing and features of product X" is better served by separate searches for "product X pricing" and "product X features" than a single combined search.

## Monitoring and Evaluation

**Retrieval metrics** - Track precision@K (what fraction of retrieved results are relevant) and recall@K (what fraction of relevant documents are retrieved) using labeled evaluation sets. Monitor these metrics over time to detect retrieval quality degradation.

**Query-level analysis** - Log queries that produce poor downstream results (low user satisfaction, incorrect AI responses). Analyze whether the issue was retrieval (wrong documents found) or generation (right documents, wrong response). This directs optimization effort to the right component.
