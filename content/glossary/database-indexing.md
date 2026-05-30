---
title: "Database Indexing"
description: "Data structures that improve query performance by providing fast lookup paths to rows in database tables, including B-tree, hash, and bitmap index types."
date: 2026-03-28
categories: [Glossary]
tags: [databases, indexing, b-tree, query-performance, database-optimization]
last_updated: 2026-05-30
---

A database index is a data structure that provides a fast lookup path to rows in a table, much like the index in a book points you to the page containing a topic. Without an index, the database must scan every row in a table (a full table scan) to find matching records. With a well-chosen index, the database locates the relevant rows directly.

## Index Types

**B-tree indexes** are the default index type in most relational databases. A B-tree is a balanced tree structure where each node contains multiple keys and pointers, keeping the tree shallow even for millions of rows. B-trees support equality lookups, range queries, and prefix matching efficiently. They are the right choice for most general-purpose indexing needs.

**Hash indexes** map keys to locations using a hash function. They provide O(1) average-case lookups for exact equality comparisons but do not support range queries or ordering. PostgreSQL supports hash indexes; MySQL InnoDB uses an adaptive hash index internally.

**Bitmap indexes** store a bit array for each distinct value in the indexed column, with one bit per row indicating whether that row has that value. They excel at columns with low cardinality (few distinct values) and are highly efficient for combining multiple conditions with AND/OR logic. Bitmap indexes are common in data warehouse systems like Oracle and are less practical for OLTP workloads with frequent updates.

**GiST and GIN indexes** handle specialized data types. GiST (Generalized Search Tree) supports geometric data, full-text search, and range types. GIN (Generalized Inverted Index) is optimized for composite values like arrays, JSONB, and full-text search vectors.

## Index Design Considerations

**Composite indexes** cover multiple columns. The order of columns matters: a composite index on (last_name, first_name) supports queries filtering on last_name alone or both columns, but not first_name alone. Place the most selective column first.

**Covering indexes** include all columns needed by a query, allowing the database to answer the query entirely from the index without accessing the table data. This eliminates random I/O to the heap.

**Write overhead** is the primary cost of indexing. Every INSERT, UPDATE, or DELETE must also update all affected indexes. Over-indexing slows write performance and increases storage requirements.

## Origins and History

Rudolf Bayer and Edward McCreight invented the B-tree in 1972 while working at Boeing Scientific Research Labs [1]. The B-tree became the dominant index structure for databases and file systems. Douglas Comer's 1979 survey formalized and popularized the B-tree's role in database systems [2].

## Sources

1. Bayer, R. & McCreight, E. (1972). "Organization and Maintenance of Large Ordered Indexes." *Acta Informatica*, 1(3), 173-189.
2. Comer, D. (1979). "The Ubiquitous B-Tree." *ACM Computing Surveys*, 11(2), 121-137.
