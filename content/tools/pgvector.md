---
title: "pgvector - Vector Search in PostgreSQL"
description: "A comprehensive reference for pgvector: adding vector similarity search to PostgreSQL, indexing strategies, and patterns for combining relational and vector data."
date: 2026-03-28
categories: [Tools]
tags: [pgvector, PostgreSQL, vector-search, database, RAG, SQL]
related:
  - tools/pinecone
  - tools/amazon-bedrock
  - tools/amazon-redshift
last_updated: 2026-05-30
---

pgvector is an open-source PostgreSQL extension that adds vector data types and similarity search operators to PostgreSQL. Instead of running a separate vector database alongside your relational database, pgvector lets you store embeddings in the same database as your application data. For AI projects, pgvector is the pragmatic choice when your team already runs PostgreSQL, your vector search needs are moderate in scale, and you want to avoid the operational complexity of maintaining a separate vector database.

Official documentation: https://github.com/pgvector/pgvector

## Core Concepts

**vector data type** - A new column type that stores fixed-dimension float arrays. Define a column as `vector(1536)` for 1536-dimensional embeddings (the output dimension of OpenAI text-embedding-3-small). Vectors are stored as regular column values alongside other relational data.

**Distance operators** - pgvector provides operators for cosine distance (`<=>`), L2/Euclidean distance (`<->`), and inner product (`<#>`). These operators work in ORDER BY clauses to find nearest neighbors:

```sql
SELECT id, content, embedding <=> query_embedding AS distance
FROM documents
ORDER BY embedding <=> query_embedding
LIMIT 10;
```

**Indexes** - Without an index, similarity search performs a sequential scan (exact but slow). pgvector supports two index types for approximate nearest neighbor (ANN) search: IVFFlat and HNSW.

## Index Selection

**HNSW (Hierarchical Navigable Small World)** - The recommended index for most use cases. It provides better recall (accuracy) than IVFFlat, does not require training data, and supports efficient inserts without rebuilding. Build time is longer and memory usage is higher, but query performance is superior.

```sql
CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

**IVFFlat** - Faster to build and uses less memory. Requires specifying the number of lists (clusters) and works best when the data distribution is stable. The trade-off is lower recall compared to HNSW at the same query speed.

## Why pgvector Over a Dedicated Vector Database

The primary advantage is simplicity. If your application already uses PostgreSQL, pgvector eliminates an entire infrastructure component. You get:

- **Transactional consistency** - Vector operations participate in PostgreSQL transactions. Update a document and its embedding atomically.
- **Joined queries** - Combine vector similarity with relational filters, joins, and aggregations in a single SQL query. Find documents similar to a query vector where the author is in a specific department and the document was created in the last 30 days.
- **Existing tooling** - PostgreSQL's ecosystem of backup, replication, monitoring, and administration tools applies to vector data.
- **Simpler architecture** - One database to deploy, monitor, backup, and secure instead of two.

## When a Dedicated Vector Database is Better

pgvector has limitations at scale. Beyond approximately 10 million vectors, purpose-built vector databases (Pinecone, Qdrant, Weaviate) typically offer better query latency, more efficient memory usage, and features like distributed indexing that PostgreSQL does not provide natively. If vector search is the primary workload (not a supplement to relational queries), a dedicated solution may be more cost-effective.

## RDS and Aurora Support

pgvector is available on Amazon RDS for PostgreSQL and Amazon Aurora PostgreSQL. This means you can use managed PostgreSQL on AWS with vector search capabilities without self-managing the extension installation. Aurora's storage architecture (automatically scaling up to 128 TB) handles growing vector datasets well.

Bedrock Knowledge Bases supports Aurora PostgreSQL with pgvector as a vector store backend, providing a fully AWS-managed RAG pipeline.

## Performance Tuning

**maintenance_work_mem** - Increase for faster index building. HNSW index creation is memory-intensive; allocate at least 1 GB for large datasets.

**ef_search (HNSW)** - Controls the accuracy-speed trade-off at query time. Higher values improve recall at the cost of latency. Default is 40; increase to 100-200 for high-accuracy requirements.

**Partitioning** - For very large tables, partition by a dimension (date, tenant) so that vector searches scan only relevant partitions.

## Pricing

pgvector is free and open-source (PostgreSQL license). Costs are limited to the underlying PostgreSQL infrastructure. On RDS or Aurora, this is the standard instance and storage pricing with no premium for the pgvector extension.

## Sources and Further Reading

- [pgvector GitHub Repository](https://github.com/pgvector/pgvector) - Official documentation, installation instructions, and usage examples
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Core PostgreSQL documentation for understanding the underlying database
- [AWS RDS for PostgreSQL with pgvector](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PostgreSQL.Concepts.html) - AWS documentation on using pgvector with managed PostgreSQL
- [Supabase Vector Documentation](https://supabase.com/docs/guides/ai/vector-columns) - Practical guide to using pgvector in Supabase environments
