---
title: "Database Normalization"
description: "A systematic approach to organizing relational database tables to reduce data redundancy and improve data integrity, progressing through normal forms from 1NF to 5NF."
date: 2026-03-28
categories: [Glossary]
tags: [databases, normalization, relational-databases, data-modeling, schema-design]
last_updated: 2026-05-30
---

Database normalization is a systematic process for organizing columns and tables in a relational database to minimize data redundancy and eliminate undesirable insertion, update, and deletion anomalies. The process works by decomposing tables into smaller, well-structured relations according to a series of rules called normal forms.

## How It Works

Normalization proceeds through progressively stricter levels, each building on the previous one.

**First Normal Form (1NF)** requires that every column contains only atomic (indivisible) values and that each row is unique. A table storing multiple phone numbers in a single column violates 1NF. The fix is to move phone numbers into a separate table with one row per number.

**Second Normal Form (2NF)** requires 1NF plus the elimination of partial dependencies. Every non-key column must depend on the entire primary key, not just part of it. This matters only when the primary key is composite. If a column depends on only one part of a two-column key, it belongs in a separate table.

**Third Normal Form (3NF)** requires 2NF plus the elimination of transitive dependencies. Non-key columns must depend directly on the primary key, not on other non-key columns. If a table has columns for employee ID, department ID, and department name, the department name depends on department ID rather than employee ID and should be moved to a departments table.

**Boyce-Codd Normal Form (BCNF)** strengthens 3NF by requiring that every determinant is a candidate key. BCNF handles edge cases where 3NF still permits certain anomalies in tables with multiple overlapping candidate keys.

**Fourth Normal Form (4NF)** eliminates multi-valued dependencies, and **Fifth Normal Form (5NF)** eliminates join dependencies that cannot be reduced to simpler components.

## When to Normalize and When Not To

Most transactional (OLTP) systems benefit from normalization to 3NF or BCNF. This reduces storage waste, simplifies updates, and prevents inconsistencies. However, analytical (OLAP) systems and read-heavy workloads often deliberately denormalize tables to reduce the number of joins at query time, trading storage efficiency for read performance.

## Origins and History

E.F. Codd introduced the relational model and the concept of normalization in his landmark 1970 paper, defining first, second, and third normal forms [1]. Codd later refined the theory with Boyce-Codd Normal Form in 1974 [2]. Ronald Fagin extended the framework with fourth and fifth normal forms in the mid-1970s [3].

## Sources

1. Codd, E.F. (1970). "A Relational Model of Data for Large Shared Data Banks." *Communications of the ACM*, 13(6), 377-387.
2. Codd, E.F. (1974). "Recent Investigations into Relational Data Base Systems." *IBM Research Report RJ1385*.
3. Fagin, R. (1977). "Multivalued Dependencies and a New Normal Form for Relational Databases." *ACM Transactions on Database Systems*, 2(3), 262-278.
