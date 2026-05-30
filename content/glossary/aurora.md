---
title: "Amazon Aurora"
description: "What Aurora is, how it provides managed relational database performance, and when to choose Aurora for AI application backends."
date: 2026-03-28
categories: [Glossary]
tags: [Aurora, RDS, relational-database, PostgreSQL, MySQL]
related:
  - glossary/dynamodb
  - glossary/data-warehouse
last_updated: 2026-05-30
---

Amazon Aurora is a managed relational database service compatible with MySQL and PostgreSQL. It provides up to five times the throughput of standard MySQL and three times the throughput of standard PostgreSQL, with automatic storage scaling, built-in high availability (six-way replication across three availability zones), and automated backups.

## How It Works

Aurora separates compute and storage. The storage layer automatically replicates data six ways across three AZs and grows automatically up to 128 TB. Compute instances (writer and up to 15 read replicas) can be resized or replaced without storage changes. Failover to a read replica takes typically under 30 seconds.

**Aurora Serverless v2** scales compute capacity automatically based on demand, from 0.5 ACU to hundreds of ACUs. It eliminates capacity planning for variable workloads and can scale to zero during idle periods (with Aurora Serverless v2 minimum capacity settings).

**Aurora PostgreSQL** supports pgvector, enabling vector similarity search directly in your relational database - useful for RAG implementations that want to avoid a separate vector database service.

## Why It Matters for AI

Many AI applications need a relational database alongside their AI components: user accounts, billing records, audit logs, structured metadata, and reporting data are naturally relational. Aurora provides the relational database backend with the performance and availability that production AI applications require.

**pgvector on Aurora PostgreSQL** allows teams to store embeddings and run vector similarity searches alongside relational data in a single database. For RAG implementations with moderate vector volumes (millions, not billions), this eliminates the need for a separate vector database, simplifying architecture and operations.

## Aurora vs. DynamoDB

Use Aurora when your data is inherently relational (complex joins, transactions, foreign key constraints), when you need SQL compatibility, or when pgvector eliminates the need for a separate vector database. Use DynamoDB for key-value access patterns, extreme scale, and serverless operational simplicity.

## Practical Guidance

Use Aurora Serverless v2 for variable workloads. Create read replicas in different AZs for high availability and read scaling. Enable Performance Insights to identify slow queries. Use Aurora Global Database for multi-region disaster recovery. For AI applications combining relational data with vector search, evaluate pgvector on Aurora PostgreSQL as a simpler alternative to running both RDS and a dedicated vector database.

## Sources

- Verbitski, A., Gupta, A., Saha, D., Brahmadesam, M., Gupta, K., Mittal, R., Krishnamurthy, S., Maurice, S., Kharatishvili, T., & Bao, X. (2017). Amazon Aurora: Design considerations for high throughput cloud-native relational databases. *Proceedings of ACM SIGMOD*, 1041–1052. (Original Aurora paper; storage/compute separation, six-way replication, and fast crash recovery.)
- Stonebraker, M., & Cattell, R. (2011). Ten rules for scalable performance in 'simple operation' datastores. *Communications of the ACM*, 54(6), 72–80. (Relational vs. NoSQL trade-offs; when relational databases remain the right choice.)
- pgvector. (2021). *Open-source vector similarity search for Postgres*. GitHub. (pgvector extension enabling vector similarity search in PostgreSQL/Aurora; used for RAG applications avoiding separate vector databases.)
