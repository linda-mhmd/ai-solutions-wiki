---
title: "Semantic Caching for AI Applications"
description: "Caching AI model responses based on semantic similarity rather than exact match. Implementation patterns, cache invalidation, and cost-quality tradeoffs."
date: 2026-03-28
categories: [Patterns]
tags: [caching, cost-optimization, latency, embeddings, performance]
last_updated: 2026-05-30
---

Traditional caching matches requests by exact key. For AI applications, this is almost useless because the same question phrased differently produces a cache miss every time. Semantic caching uses embedding similarity to match requests by meaning, dramatically improving cache hit rates.

## How Semantic Caching Works

When a request arrives, it is converted to an embedding vector. This vector is compared against cached request embeddings. If a cached request is sufficiently similar (above a similarity threshold), the cached response is returned without making a model call.

**Embedding generation** - Use a fast, lightweight embedding model to convert requests to vectors. The embedding model should be cheap and fast since it runs on every request. Amazon Titan Embeddings or similar models work well for this purpose.

**Similarity search** - Store cached embeddings in a vector database or in-memory index (FAISS, pgvector). When a new request arrives, perform a nearest-neighbor search against cached embeddings. Return the cached response if the similarity score exceeds the threshold.

**Threshold tuning** - The similarity threshold determines the tradeoff between cache hit rate and response relevance. A high threshold (0.98+) only matches near-identical requests - safe but low hit rate. A lower threshold (0.90-0.95) matches semantically similar requests - higher hit rate but risk of returning responses that do not exactly match the question. Tune the threshold empirically by reviewing cache hits and measuring user satisfaction.

## Cache Invalidation

Semantic caches have unique invalidation challenges because the cached content may become stale or irrelevant independent of the request pattern.

**Time-based TTL** - Set a time-to-live appropriate for the content type. Factual queries about static data can have long TTLs (hours to days). Queries about dynamic data (prices, availability, recent events) need short TTLs (minutes to hours). Conversational responses should generally not be cached long.

**Context-dependent invalidation** - If the cached response depends on context that has changed (updated documentation, new product information, changed policies), the cache entry should be invalidated when the underlying context changes. Track which context sources each cache entry depends on.

**Quality-based invalidation** - If user feedback indicates a cached response was unhelpful, invalidate that entry. This prevents repeatedly serving a poor response to similar questions.

## Implementation Patterns

**Read-through cache** - The application always checks the cache first. On a cache miss, it calls the model, stores the response in the cache with its embedding, and returns the response. This is transparent to the calling code.

**Write-through with variants** - For important queries, generate and cache responses for anticipated phrasings proactively. When documentation changes, pre-generate and cache responses for known common questions about the changed content.

**Multi-tier caching** - Combine exact-match caching (fastest, highest confidence) with semantic caching (broader coverage, lower confidence). Check the exact-match cache first, then the semantic cache, then call the model.

## Cost-Quality Tradeoffs

**Cost reduction** - Semantic caching reduces model API costs proportionally to the cache hit rate. A 40% hit rate on a system processing 100,000 requests per day at $0.01 per request saves $400 per day. The cost of embedding generation and vector search is typically 10-100x cheaper than a full model call.

**Quality risk** - Cached responses may not perfectly match the nuance of the new request. For high-stakes applications (medical, legal, financial advice), semantic caching should be used conservatively or not at all. For informational queries and customer support, the quality tradeoff is usually acceptable.

**Monitoring** - Track cache hit rate, average similarity score of served cached responses, and user satisfaction for cached vs. non-cached responses. A declining satisfaction rate for cached responses indicates the threshold needs tightening.
