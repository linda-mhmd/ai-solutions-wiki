---
title: "Caching Patterns for AI Applications"
description: "Semantic caching, Anthropic prompt caching, response caching, and embedding caching for AI applications. Cost savings analysis and implementation guidance."
date: 2026-03-26
categories: [Patterns]
tags: ["architecture", "intermediate", "caching", "latency", "cost-reduction", "semantic-cache", "llm"]
related:
  - patterns/cost-optimization
  - patterns/rag-implementation
  - glossary/embeddings
  - guides/getting-started-with-bedrock
last_updated: 2026-05-30
---

Model inference is expensive and slow compared to returning a cached result. In AI applications, the decision of what to cache and how to cache it has a larger impact on cost and performance than almost any other architectural choice. This article covers the four main caching patterns for production AI systems.

## Why Caching Matters More for AI

A conventional API call might cost fractions of a cent and complete in under 100ms. A large language model call can cost tens of cents and take several seconds. Even a modest cache hit rate - 20% to 30% - produces material cost savings at production scale. At high request rates, caching is often the difference between a viable unit economics model and one that does not scale.

Beyond cost, cached responses are instantaneous from the user's perspective. For AI features in interactive products, cache hits provide a noticeably better experience.

## Pattern 1: Response Caching

The simplest form of caching: store the full model response keyed by an exact hash of the input. When the same input arrives again, return the stored response without calling the model.

This works well for:
- High-traffic, low-variety queries (common search queries, frequently asked questions)
- Deterministic generation tasks where the same input should always produce the same output
- Expensive generation that is unlikely to change (document summaries, translated content)

Implementation with Amazon ElastiCache (Redis):

```python
import hashlib
import json
import redis

cache = redis.Redis(host='your-elasticache-endpoint', port=6379)

def cached_model_call(prompt: str, ttl: int = 3600) -> str:
    key = hashlib.sha256(prompt.encode()).hexdigest()
    cached = cache.get(key)
    if cached:
        return json.loads(cached)

    result = call_model(prompt)
    cache.setex(key, ttl, json.dumps(result))
    return result
```

Set TTL based on how frequently the expected correct answer could change. For static content (product descriptions, policy explanations), 24 hours or more is reasonable. For time-sensitive content, use shorter TTLs or cache invalidation on data updates.

## Pattern 2: Semantic Caching

Exact-match response caching misses cases where two different phrasings of the same question should return the same answer. Semantic caching addresses this by caching by meaning rather than exact text.

The approach:

1. Embed each incoming query using an embedding model
2. Search a vector store for cached responses whose query embeddings are within a similarity threshold
3. If a close match is found, return the cached response
4. If no close match is found, call the model, then store the result with its embedding

The similarity threshold is the key tuning parameter. A threshold that is too tight misses valid cache hits. A threshold that is too loose returns incorrect answers for queries that seem similar but require different responses.

A practical starting threshold for cosine similarity is 0.92 to 0.95. Test this against representative query pairs from your domain to find the right value. Customer support queries about billing are often similar enough to share a cached answer; medical or legal queries typically need tighter thresholds or no semantic caching at all.

Amazon OpenSearch Service with vector search capabilities is a common backend for semantic cache stores. For simpler deployments, pgvector in RDS PostgreSQL works well.

## Pattern 3: Anthropic Prompt Caching

Anthropic's prompt caching feature (available through Amazon Bedrock for Claude models) caches the KV (key-value) state of a prompt at a specified breakpoint. Subsequent requests that share the same prefix up to that breakpoint reuse the cached computation rather than reprocessing those tokens.

This is especially valuable when:
- A large system prompt is sent with every request
- A long document is included in every query (RAG document context, reference material)
- A large set of few-shot examples is repeated across many calls

Cost savings from prompt caching are significant: Anthropic charges approximately 90% less for cached input tokens compared to uncached input tokens (write price is slightly higher than standard, but read price is much lower). For applications with large, repeated prompts, this can reduce per-call costs by 60% to 80%.

To use prompt caching, mark the cacheable portion of the prompt with a cache control breakpoint. The first request with a given prefix processes and caches it. Subsequent requests within the cache TTL (5 minutes for default caching) reuse the cache.

This type of caching is handled entirely by the model provider - there is no application-side infrastructure to manage.

## Pattern 4: Embedding Caching

Embedding generation is fast and cheap compared to generation, but in RAG pipelines it happens on every query. For applications with high query volume and a stable document corpus, caching embeddings for both documents and queries reduces latency and cost.

Document embeddings should be computed once when a document is ingested and stored in the vector database. This is standard practice and most RAG implementations do it by default.

Query embedding caching is less commonly implemented but worthwhile for high-traffic applications. If the same query (or a very similar one) is submitted repeatedly, the query embedding can be cached using the same exact-match or semantic-match approach described above.

## Combining Patterns

Production systems often layer multiple caching patterns:

1. Check the exact-match response cache first (fastest, cheapest)
2. If no hit, check the semantic cache (moderate overhead, high hit rate for common queries)
3. If no hit, check whether prompt caching applies (handled by the API, transparent to application)
4. On a full miss, call the model and populate all relevant caches

Each layer reduces the fraction of requests that reach the model. In practice, exact-match and semantic caching together handle 30% to 60% of requests in many production deployments, with prompt caching reducing the cost of the remaining calls by 60% to 80%.

## Sources

- Anthropic Prompt Caching documentation: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
- Amazon ElastiCache: https://aws.amazon.com/elasticache/
