---
title: "Redis"
description: "What Redis is, how it provides in-memory data storage, and common use cases for caching and real-time AI applications."
date: 2026-03-28
categories: [Glossary]
tags: [redis, caching, in-memory, ElastiCache, performance]
related:
  - glossary/dynamodb
  - glossary/message-queue
---

Redis is an open-source, in-memory data store used as a cache, message broker, and real-time data structure server. It stores data in memory for sub-millisecond read and write latency, supporting data structures like strings, hashes, lists, sets, sorted sets, and streams.

## How It Works

Redis keeps all data in RAM, providing extremely fast access (typically < 1ms). Data can be persisted to disk for durability, but the primary value is speed. Redis supports atomic operations on complex data structures, pub/sub messaging, Lua scripting, and transactions.

**Amazon ElastiCache for Redis** is the managed Redis service on AWS. It handles cluster provisioning, patching, failover, and backups. ElastiCache Serverless automatically scales capacity based on workload.

## Why It Matters for AI

**Inference caching** - cache model responses for repeated or similar queries. If the same question has been asked recently, return the cached response instead of running inference again. This reduces latency from seconds to sub-millisecond and significantly reduces inference costs.

**Feature store serving** - Redis provides the low-latency serving layer for real-time ML features. Features computed offline are loaded into Redis, and the inference service reads them at prediction time with sub-millisecond latency.

**Session state** - AI chat applications store conversation history in Redis for fast retrieval across requests.

**Rate limiting** - Redis atomic counters implement token bucket or sliding window rate limiting for AI API endpoints.

**Real-time leaderboards and counters** - sorted sets maintain ranked data structures updated in real time.

## Practical Considerations

Redis is limited by available memory. Data that exceeds memory capacity must be sharded across multiple nodes (Redis Cluster) or evicted using a configured policy (LRU, LFU). For data that does not require sub-millisecond latency, DynamoDB provides a more cost-effective alternative with practically unlimited capacity.

## Practical Guidance

Use ElastiCache Serverless for variable workloads to avoid capacity planning. Set appropriate TTLs on cached data to prevent stale responses. Use Redis Cluster mode for datasets that exceed single-node memory. Monitor memory usage, eviction rates, and cache hit ratios. For AI inference caching, implement semantic caching (cache based on embedding similarity rather than exact key match) to improve hit rates for paraphrased queries.

## Sources

- Carlson, J. L. (2013). *Redis in Action*. Manning. (Redis data structures: strings, hashes, lists, sets, sorted sets; caching, rate limiting, and session storage patterns.)
- Sanfilippo, S. (2009). Redis: Remote Dictionary Server. *Redis.io*. (Original Redis implementation; in-memory data structure store with persistence options, the primary reference for Redis architecture.)
- Mäkinen, M. (2020). Semantic caching for AI applications. *Redis Blog*. (Semantic caching using Redis vector similarity search; applies to AI prompt caching and RAG query deduplication.)
