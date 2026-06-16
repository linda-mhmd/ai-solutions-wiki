---
title: "Weaviate vs pgvector - Vector Database Comparison"
description: "Comparing Weaviate and pgvector for vector search, covering architecture, performance, operational complexity, and when to choose each."
date: 2026-03-28
last_verified: 2026-06-14
categories: [Comparisons]
tags: [Weaviate, pgvector, PostgreSQL, vector-search, database]
last_updated: 2026-06-14
lastmod: 2026-06-14
---

Weaviate is a purpose-built vector database. pgvector is a PostgreSQL extension that adds vector operations to an existing relational database. This comparison helps teams decide between adding vector search to their existing PostgreSQL setup or introducing a dedicated vector database.

## Architecture

**Weaviate** is a standalone vector database designed for semantic search. It stores objects with properties and vectors, supports multiple vectorization modules, and exposes REST, GraphQL, and gRPC APIs (gRPC is the high-performance path for batch imports and search). Available as open source (self-hosted) or Weaviate Cloud (managed). As of v1.37 (released April 2026), Weaviate ships a built-in Model Context Protocol (MCP) server at the `/v1/mcp` endpoint, so AI agents and IDEs can query and write to the database natively without a custom integration layer.

**pgvector** is a PostgreSQL extension that adds a vector data type and similarity search operators. It runs within your existing PostgreSQL database. Vectors are stored alongside relational data in regular tables with standard SQL access.

## Feature Comparison

| Feature | Weaviate | pgvector |
|---|---|---|
| Vector search | Core capability (HNSW) | Extension (HNSW, IVFFlat) |
| Hybrid search | Built-in (BM25 + vector) | Combine with pg_trgm or full-text search |
| Built-in vectorization | Yes (OpenAI, Cohere, Hugging Face modules) | No (bring your own vectors) |
| Relational data | Object properties (not relational) | Full relational model |
| SQL support | No (GraphQL/REST) | Full SQL |
| ACID transactions | Object-level | Full ACID transactions |
| Joins | Not supported | Full JOIN support |
| Max dimensions | Unlimited | 16,000 for the `vector` type; up to 2,000 for HNSW or IVFFlat indexes (use `halfvec` for larger indexed vectors) |
| Filtering | Property-based filtering with vector search | SQL WHERE clauses with vector search |

## Performance

**Weaviate** is optimized for vector search and delivers consistent sub-50ms latency at million-scale. HNSW indexing is tuned for vector workloads. Performance degrades gracefully as dataset size grows.

**pgvector** performance depends on PostgreSQL configuration, index type, and dataset size:
- Under 1 million vectors: performs well with proper indexing (HNSW preferred over IVFFlat)
- 1-10 million vectors: requires careful tuning (shared_buffers, effective_cache_size, maintenance_work_mem)
- Over 10 million vectors: performance may degrade; consider a dedicated vector database

pgvector's HNSW implementation has improved significantly and is competitive with dedicated vector databases at moderate scale. pgvector 0.8.0 (October 2024) added iterative index scans (`hnsw.iterative_scan` and `ivfflat.iterative_scan`), which keep scanning the index when a restrictive `WHERE` filter returns too few rows. This addresses the long-standing overfiltering problem where a filtered vector query could return fewer results than requested. The latest release is 0.8.2 (February 2026).

## Operational Complexity

**pgvector** has a massive advantage for teams already running PostgreSQL:
- No new infrastructure to deploy or manage
- No new backup procedures
- No new monitoring setup
- No new access control configuration
- Vectors live alongside application data with full transactional guarantees

**Weaviate** requires:
- Deploying and managing a new service
- Configuring backup and recovery
- Setting up monitoring
- Managing access control
- Data synchronization between PostgreSQL (application data) and Weaviate (vectors)

The operational cost of running a separate vector database is non-trivial. For small to medium datasets, pgvector avoids this entirely.

## Cost

**pgvector:** No additional cost beyond your existing PostgreSQL infrastructure. May need to increase instance size for memory and compute if vector operations add load.

**Weaviate self-hosted:** Infrastructure cost only. Requires dedicated compute and storage. A minimum production deployment needs 3 nodes.

**Weaviate Cloud:** A free Sandbox is available for evaluation (limited object count and duration). In October 2025, Weaviate restructured Weaviate Cloud into usage-based plans. The pay-as-you-go Flex plan starts at roughly $45/month, with billing driven by three dimensions: vector dimensions stored (object count times dimensionality, adjusted for replication), storage, and backups. Annual Plus and enterprise Premium tiers add stronger SLAs and dedicated infrastructure. Always check the current pricing page, as rates vary by cloud provider and region.

For teams already running PostgreSQL with moderate vector search needs, pgvector is effectively free.

## Data Consistency

**pgvector** stores vectors in the same database as application data. When you update a product description and its embedding in a single transaction, both succeed or both fail. This eliminates synchronization issues.

**Weaviate** is a separate system. Application data lives in your primary database; vectors live in Weaviate. Keeping them in sync requires explicit synchronization logic. If the sync fails, the vector database may return results for deleted records or miss newly created ones.

This consistency advantage is significant for applications where data changes frequently.

## When to Choose pgvector

- You already use PostgreSQL
- Dataset is under 5 million vectors
- You need transactional consistency between application data and vectors
- You want to minimize operational complexity
- You need relational queries alongside vector search (JOINs, GROUP BY)
- Budget is constrained

## When to Choose Weaviate

- You need large-scale vector search (10M+ vectors)
- You want built-in vectorization (no need to manage embedding generation)
- You need sophisticated hybrid search out of the box
- You are building a search-centric application where vector search is the primary operation
- Your team has capacity to manage additional infrastructure

## Practical Recommendation

Start with pgvector. It is the simplest path if you already use PostgreSQL. If and when you encounter performance limitations (query latency increasing, resource contention with application queries), evaluate migrating to a dedicated vector database like Weaviate. Many teams find that pgvector handles their needs indefinitely, especially with the HNSW improvements in recent versions.

## Sources

- [pgvector on GitHub (README, supported types, dimension limits, iterative index scans)](https://github.com/pgvector/pgvector)
- [pgvector 0.8.0 release announcement (PostgreSQL News)](https://www.postgresql.org/about/news/pgvector-080-released-2952/)
- [Weaviate release notes (supported versions)](https://docs.weaviate.io/weaviate/release-notes)
- [Weaviate 1.37 release blog (built-in MCP server)](https://weaviate.io/blog/weaviate-1-37-release)
- [A simpler, more transparent pricing model for Weaviate Cloud (October 2025)](https://weaviate.io/blog/weaviate-cloud-pricing-update)
