---
title: "SQL Fundamentals"
description: "Structured Query Language, the standard language for defining, manipulating, and querying data in relational database management systems."
date: 2026-03-28
categories: [Glossary]
tags: [databases, sql, relational-databases, queries, data-manipulation]
last_updated: 2026-05-30
---

Structured Query Language (SQL) is the standard language for interacting with relational database management systems. It provides a declarative syntax for defining database structures, inserting and modifying data, querying information, and controlling access. SQL is used by virtually every relational database, including PostgreSQL, MySQL, Oracle, SQL Server, and SQLite.

## Core Sublanguages

**Data Definition Language (DDL)** creates and modifies database structures. `CREATE TABLE` defines a new table with its columns, data types, and constraints. `ALTER TABLE` modifies an existing table. `DROP TABLE` removes it. DDL also covers indexes, views, schemas, and sequences.

**Data Manipulation Language (DML)** reads and modifies data. `SELECT` retrieves rows from one or more tables. `INSERT` adds new rows. `UPDATE` modifies existing rows. `DELETE` removes rows. These four operations correspond to the CRUD (Create, Read, Update, Delete) pattern in application development.

**Data Control Language (DCL)** manages permissions. `GRANT` gives users or roles permission to perform operations on database objects. `REVOKE` removes those permissions.

## Querying with SELECT

The SELECT statement is the most complex and frequently used SQL operation. A query can filter rows with `WHERE`, group results with `GROUP BY`, filter groups with `HAVING`, sort results with `ORDER BY`, and limit output with `LIMIT` or `FETCH`.

**Joins** combine rows from multiple tables. An `INNER JOIN` returns only matching rows. A `LEFT JOIN` returns all rows from the left table and matching rows from the right. `RIGHT JOIN` and `FULL OUTER JOIN` work similarly. `CROSS JOIN` produces the Cartesian product.

**Aggregation functions** summarize groups of rows. `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX` are the standard aggregate functions. Combined with `GROUP BY`, they enable reporting and analytics queries.

**Subqueries** nest one SELECT inside another, appearing in WHERE clauses, FROM clauses, or SELECT lists. Common Table Expressions (CTEs) using the `WITH` keyword provide a more readable alternative for complex nested queries.

## Transactions in SQL

`BEGIN` starts a transaction, `COMMIT` makes changes permanent, and `ROLLBACK` undoes all changes since the last BEGIN. Savepoints allow partial rollbacks within a transaction.

## Origins and History

Donald Chamberlin and Raymond Boyce at IBM developed SEQUEL (Structured English Query Language) in 1974 as a practical interface to Codd's relational model [1]. The name was later shortened to SQL. IBM's System R prototype demonstrated the language's viability. SQL was adopted as an ANSI standard in 1986 and an ISO standard in 1987, with major revisions in SQL-92, SQL:1999, SQL:2003, SQL:2011, SQL:2016, and SQL:2023 [2].

## Sources

1. Chamberlin, D.D. & Boyce, R.F. (1974). "SEQUEL: A Structured English Query Language." *Proceedings of the 1974 ACM SIGFIDET Workshop on Data Description, Access and Control*, 249-264.
2. ISO/IEC 9075:2023. "Information technology - Database languages - SQL." International Organization for Standardization.
