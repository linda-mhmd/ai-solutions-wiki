---
title: "Amazon DynamoDB"
description: "What DynamoDB is, how its key-value model works, and when to choose DynamoDB for AI application data."
date: 2026-03-28
categories: [Glossary]
tags: [DynamoDB, NoSQL, key-value, serverless, AWS]
related:
  - glossary/redis
  - glossary/aurora
  - glossary/serverless
last_updated: 2026-05-30
---

Amazon DynamoDB is a fully managed NoSQL database that provides single-digit millisecond performance at any scale. It is a key-value and document database with automatic scaling, built-in security, backup, and global replication. DynamoDB is serverless - there are no servers to manage, patch, or scale.

## How It Works

DynamoDB stores items (rows) in tables. Each item is identified by a primary key: either a simple partition key or a composite key (partition key + sort key). Items can have any attributes (columns) without a fixed schema. The partition key determines data distribution across partitions for scalable performance.

**On-demand capacity** charges per request, scaling automatically with no capacity planning. **Provisioned capacity** reserves read/write throughput for predictable costs with auto-scaling. On-demand is simpler; provisioned is cheaper for steady, predictable workloads.

**Global secondary indexes (GSIs)** enable querying on attributes other than the primary key. **DynamoDB Streams** provides a change data capture feed for triggering downstream processing when items are modified.

## Why It Matters for AI

DynamoDB is the default choice for AI application metadata, session state, and operational data on AWS:

**Conversation history** - store chat histories for AI assistants, keyed by session ID with sort key for message order.

**Job tracking** - track asynchronous AI processing jobs (status, timestamps, results location) with the job ID as partition key.

**Feature flags and configuration** - store model configuration, A/B test assignments, and feature flags with low-latency reads.

**User preferences** - store user settings, feedback, and personalization data for AI applications.

## Practical Guidance

Design your primary key and access patterns before creating the table - DynamoDB requires knowing your query patterns upfront. Use single-table design for related entities to minimize the number of tables. Set up DynamoDB Streams with Lambda to trigger downstream processing when data changes. Use on-demand capacity mode when starting and switch to provisioned with auto-scaling once patterns are established.

Watch for hot partitions: if one partition key receives disproportionate traffic, performance degrades. Distribute traffic across partition keys using composite keys or write sharding.

## Sources

- DeCandia, G., Hastorun, D., Jampani, M., Kakulapati, G., Lakshman, A., Pilchin, A., Sivasubramanian, S., Vosshall, P., & Vogels, W. (2007). Dynamo: Amazon's highly available key-value store. *Proceedings of ACM SOSP*, 205–220. (Original Dynamo paper; eventual consistency, consistent hashing, and the design principles underlying DynamoDB.)
- Sivasubramanian, S. (2012). Amazon DynamoDB: A seamlessly scalable non-relational database service. *Proceedings of ACM SIGMOD*, 729–730. (DynamoDB's evolution from Dynamo; automatic partitioning, provisioned throughput, and the managed service model.)
- Vogels, W. (2009). Eventually consistent. *Communications of the ACM*, 52(1), 40–44. (Theoretical foundation for eventual consistency underlying DynamoDB's design; BASE properties vs. ACID.)
