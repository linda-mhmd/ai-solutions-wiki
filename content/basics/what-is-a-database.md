---
title: "What is a Database?"
description: "A database is an organised system for storing and retrieving data. Every app that remembers anything uses one."
date: 2026-05-24
level: 3
categories: [Basics]
tags: [beginner, database, sql, postgresql, data]
youtube_id: "Tk1t3WKK-ZY"
youtube_title: "What is a Database?"
youtube_channel: "ByteByteGo"
docs: "https://www.postgresql.org/docs/current/intro-whatis.html"
docs_label: "What is PostgreSQL?, Official Docs"
faqs:
  - question: "What is the difference between SQL and NoSQL databases?"
    answer: "SQL (relational) databases store data in structured tables with defined columns and relationships between tables. They enforce a schema, every row in a table must have the same shape. Great for structured data where relationships matter (users, orders, products). NoSQL databases (document stores, key-value stores, graph databases) are more flexible, each record can have a different shape. Great for unstructured data, rapidly changing schemas, or specific access patterns. Most apps use a relational database (PostgreSQL) and add a cache (Redis) for performance."
  - question: "What is a schema?"
    answer: "A schema is the structure of your database, what tables exist, what columns each table has, and what data types those columns hold. In a relational database, the schema is defined before you add data and enforced by the database: you cannot add a string where an integer is expected, or leave out a required field. Schema changes (migrations) require careful planning in production systems because they modify the structure of existing data."
  - question: "What is an ORM?"
    answer: "An ORM (Object-Relational Mapper) is a library that lets you interact with a database using your programming language's objects instead of writing SQL directly. Instead of `SELECT * FROM users WHERE id = 42`, you write `User.find(42)` or similar. ORMs generate the SQL for you and map rows to objects. Popular ORMs: Prisma (JavaScript/TypeScript), SQLAlchemy (Python), ActiveRecord (Ruby), Hibernate (Java). ORMs speed up development but can generate inefficient SQL for complex queries, knowing SQL remains valuable."
---

{{< quickanswer >}}
A database is a system for storing structured data in a way that makes it easy to find, update, and delete specific records. Every app that remembers anything, your account, your order history, your settings, your messages, stores that data in a database.
{{< /quickanswer >}}

## The simplest explanation

A spreadsheet is a database. It has rows (records) and columns (fields). A proper database takes this idea and makes it:

- **Much larger**, billions of rows, terabytes of data
- **Much faster**, finds any record in milliseconds using indexes
- **Concurrent**, handles thousands of reads and writes simultaneously without corruption
- **Reliable**, survives crashes without losing data (ACID properties)
- **Queryable**, you can ask complex questions across multiple tables at once

When you create an account on a website, a new row is added to a `users` table. When you log in, the system finds your row by email and checks your password hash. When you update your profile, it modifies that row. This read/write cycle happens billions of times per second across all the apps you use.

## SQL: the language of relational databases

Most databases are queried using **SQL** (Structured Query Language), pronounced "sequel" or "S-Q-L". SQL has been the standard since the 1970s and is still essential. [More: SQL, MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/SQL)

The four core operations (CRUD):

```sql
-- Create: add a new record
INSERT INTO users (name, email, city)
VALUES ('Linda', 'linda@example.com', 'Vienna');

-- Read: retrieve records
SELECT name, email FROM users WHERE city = 'Vienna';

-- Update: modify an existing record
UPDATE users SET city = 'Berlin' WHERE email = 'linda@example.com';

-- Delete: remove a record
DELETE FROM users WHERE email = 'linda@example.com';
```

More complex queries join multiple tables:

```sql
-- Find all orders for users in Vienna
SELECT users.name, orders.total, orders.created_at
FROM orders
JOIN users ON orders.user_id = users.id
WHERE users.city = 'Vienna'
ORDER BY orders.created_at DESC;
```

SQL reads almost like English. You do not need to master it to be effective, but reading a query and understanding what it does is a valuable skill. [Try it interactively: SQLBolt](https://sqlbolt.com/)

## Relational vs non-relational databases

**Relational databases** (SQL) store data in related tables. A `users` table and an `orders` table are linked, each order has a `user_id` that references a specific user. This relationship is enforced by the database (foreign key constraint). Examples: [PostgreSQL](https://www.postgresql.org/), MySQL, SQLite, MariaDB.

**Non-relational databases** (NoSQL) store data in other formats:
- **Document stores** (MongoDB, Firestore): JSON-like documents, flexible schema, good for hierarchical data
- **Key-value stores** (Redis, DynamoDB in simple mode): ultra-fast lookup by key, excellent for caching and sessions
- **Column stores** (Cassandra, BigQuery): optimised for reading large datasets, used in analytics
- **Graph databases** (Neo4j): store relationships as first-class data, used for social networks and recommendation engines
- **Vector databases** (Pinecone, pgvector, Weaviate): store and query high-dimensional embeddings for AI applications

**For most applications, start with PostgreSQL**, the most capable, well-supported, and feature-rich open-source relational database. Add Redis as a cache if you need performance. Only reach for specialised databases when you have a specific need they solve. [More: PostgreSQL vs MongoDB, DigitalOcean](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems)

## ACID properties, why databases are reliable

Databases guarantee **ACID** for transactions, groups of operations that must all succeed or all fail:

- **Atomicity**: a transaction either completes entirely or not at all. If a payment deducts from your balance but the order record fails to create, the deduction is rolled back.
- **Consistency**: the database always goes from one valid state to another. Rules (constraints, foreign keys) are always enforced.
- **Isolation**: concurrent transactions do not interfere with each other. Two people booking the last seat see correct results.
- **Durability**: once committed, data survives crashes. It is written to disk.

These properties are what make databases trustworthy for financial transactions, medical records, and anything else where data integrity is critical.

## Indexes: how queries stay fast

A database with millions of rows needs a way to find records without reading every row. That is what **indexes** do.

An index on the `email` column of `users` lets the database find any user by email in O(log n) time, milliseconds even with 100 million rows, instead of scanning every row linearly. [More: Use The Index, Luke](https://use-the-index-luke.com/) is the best free resource on database indexing.

The trade-off: indexes speed up reads but slow down writes (the index must also be updated). Over-indexing hurts write performance. Index the columns you actually query on.

## Migrations: changing your schema safely

When your app needs a new column or a new table, you write a **migration**, a script that modifies the database schema. Migrations:
- Are tracked in version control alongside your code
- Run in order (migration_001_add_users, migration_002_add_orders)
- Can be rolled back if something goes wrong

Every serious ORM has a migration system. In production, migrations need care: adding a column to a 100-million-row table can lock the table for minutes.

## Vector databases and AI

Modern AI applications use **embeddings**, numerical representations of text, images, or audio as high-dimensional vectors. Semantic search, recommendation systems, and RAG (Retrieval-Augmented Generation) all require storing and querying these vectors.

Vector databases efficiently find the most similar vectors to a query:
- **[Pinecone](https://www.pinecone.io/)**, managed vector database
- **[pgvector](https://github.com/pgvector/pgvector)**, PostgreSQL extension for vector storage (same database, no extra service)
- **[Weaviate](https://weaviate.io/)**, open-source vector database with hybrid search
- **[Chroma](https://www.trychroma.com/)**, simple, open-source, good for prototyping

For most AI applications, pgvector in Supabase lets you do vector search in your existing PostgreSQL database without additional infrastructure.

## Managed databases: skip the administration

Running your own database server involves backups, updates, replication, and security patches. Cloud providers offer managed databases where they handle all of this:

| Provider | Database | Notes |
|---|---|---|
| **[Supabase](https://supabase.com/)** | PostgreSQL | Free tier, excellent DX, includes Auth and Storage |
| **[Neon](https://neon.tech/)** | PostgreSQL | Serverless, branching, great for development |
| **[PlanetScale](https://planetscale.com/)** | MySQL | Branching workflow for schema changes |
| **[Firebase Firestore](https://firebase.google.com/products/firestore)** | NoSQL (document) | Google, easy to start, good for mobile apps |
| **[Redis Cloud](https://redis.io/cloud/)** | Redis | Managed Redis for caching and queues |
| **AWS RDS / Aurora** | PostgreSQL, MySQL | Enterprise-grade, highly available |

For a prototype: Supabase or Neon. Both are free, PostgreSQL-based, and work with every major framework.

## Further reading

- [SQLBolt, interactive SQL lessons](https://sqlbolt.com/), the best free way to actually learn SQL by doing
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/), from fundamentals to advanced queries
- [Use The Index, Luke](https://use-the-index-luke.com/), database indexing explained without jargon
- [Supabase documentation](https://supabase.com/docs), excellent docs for getting started with PostgreSQL
- [Database Design for Beginners, ByteByteGo](https://www.youtube.com/@ByteByteGo), video explanations with clear diagrams
- [Prisma (ORM) documentation](https://www.prisma.io/docs/), if you use TypeScript/JavaScript, Prisma is the most popular ORM

## What's next

Next: [What is AI?](/basics/what-is-ai/), what artificial intelligence actually is, how large language models work, and how they fit into everything you have just learned.
