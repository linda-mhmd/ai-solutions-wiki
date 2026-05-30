---
title: "NoSQL Databases"
description: "A broad category of non-relational database systems designed for specific data models and access patterns, including document, key-value, column-family, and graph stores."
date: 2026-03-28
categories: [Glossary]
tags: [databases, nosql, document-database, key-value, graph-database, distributed-systems]
last_updated: 2026-05-30
---

NoSQL databases are non-relational data stores designed to handle data models and access patterns that relational databases serve poorly or inefficiently. Rather than storing data in fixed-schema tables with SQL as the query language, NoSQL systems use flexible schemas and purpose-built data models optimized for specific workloads.

## Database Categories

**Document databases** store data as semi-structured documents, typically JSON or BSON. Each document can have a different structure, making them natural for content management, user profiles, and catalogs. MongoDB and Amazon DocumentDB are widely used examples. Documents can be nested, and queries can filter on any field within the document.

**Key-value stores** provide the simplest model: a key maps to a value (which can be a string, number, or binary blob). They offer extremely fast lookups by key but limited query capability beyond key-based access. Redis, Amazon DynamoDB (in its simplest usage), and Memcached are examples. Key-value stores excel as caches, session stores, and shopping carts.

**Column-family stores** organize data into rows and column families rather than traditional rows and columns. Each row can have a different set of columns, and column families group related data that is frequently accessed together. Apache Cassandra and Apache HBase are the primary examples. This model suits time-series data, IoT telemetry, and write-heavy workloads with high throughput requirements.

**Graph databases** model data as nodes (entities) and edges (relationships) with properties on both. They excel at queries that traverse relationships, such as social network connections, recommendation engines, and fraud detection. Neo4j and Amazon Neptune are common choices. Graph queries that would require many recursive joins in SQL execute efficiently with native graph traversal.

## When to Use NoSQL

NoSQL databases are a strong fit when the data model is naturally non-tabular, when schema flexibility is needed, when horizontal scalability is a priority, or when read/write patterns favor a specific access pattern over ad-hoc querying. They are a poor fit when complex joins, multi-table transactions, or ad-hoc analytical queries are primary requirements.

## Trade-offs

Most NoSQL databases adopt eventual consistency by default (BASE semantics) rather than strict ACID transactions, though many now offer configurable consistency levels. DynamoDB provides strongly consistent reads as an option. MongoDB supports multi-document ACID transactions.

## Origins and History

Carlo Strozzi first used the term "NoSQL" in 1998 for his lightweight relational database that did not use SQL as its interface [1]. The modern NoSQL movement began in 2009 when Johan Oskarsson organized a meetup in San Francisco to discuss non-relational distributed databases, reviving the term for a new generation of systems [2]. Key publications that influenced the movement include Amazon's Dynamo paper (2007) [3] and Google's Bigtable paper (2006) [4].

## Sources

1. Strozzi, C. (1998). NoSQL: A Relational Database Management System. [http://www.strozzi.it/cgi-bin/CSA/tw7/I/en_US/nosql](http://www.strozzi.it/cgi-bin/CSA/tw7/I/en_US/nosql)
2. Oskarsson, J. (2009). NOSQL meetup, San Francisco.
3. DeCandia, G. et al. (2007). "Dynamo: Amazon's Highly Available Key-value Store." *ACM SOSP 2007*.
4. Chang, F. et al. (2006). "Bigtable: A Distributed Storage System for Structured Data." *OSDI 2006*.
