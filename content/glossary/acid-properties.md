---
title: "ACID Properties"
description: "The four guarantees that database transactions provide to ensure data reliability: Atomicity, Consistency, Isolation, and Durability."
date: 2026-03-28
categories: [Glossary]
tags: [databases, transactions, acid, data-integrity, relational-databases]
last_updated: 2026-05-30
---

ACID is an acronym for Atomicity, Consistency, Isolation, and Durability - four properties that guarantee database transactions are processed reliably even in the presence of errors, power failures, or concurrent access. These properties are the foundation of transactional integrity in relational database systems.

## The Four Properties

**Atomicity** guarantees that a transaction is treated as a single indivisible unit. Either all operations within the transaction complete successfully and are committed, or none of them take effect. If a bank transfer debits one account but the system crashes before crediting the other, atomicity ensures the debit is rolled back.

**Consistency** ensures that a transaction brings the database from one valid state to another. All integrity constraints, foreign keys, check constraints, and application-level invariants must hold before and after the transaction. A transaction that would violate a constraint is aborted.

**Isolation** controls how concurrent transactions interact. Without isolation, one transaction might read data that another transaction has modified but not yet committed. Isolation levels range from Read Uncommitted (weakest, allows dirty reads) through Read Committed, Repeatable Read, to Serializable (strongest, transactions behave as if executed one at a time).

**Durability** guarantees that once a transaction is committed, its effects persist even if the system crashes immediately afterward. This is typically implemented through write-ahead logging (WAL), where changes are written to a durable log before being applied to the database files.

## Isolation Levels in Practice

Most production databases default to Read Committed (PostgreSQL, Oracle) or Repeatable Read (MySQL InnoDB). Serializable isolation provides the strongest guarantees but reduces throughput due to increased locking or conflict detection. Choosing an isolation level is a trade-off between correctness and performance.

## ACID vs. BASE

Distributed NoSQL systems often adopt BASE semantics (Basically Available, Soft state, Eventually consistent) instead of strict ACID, trading immediate consistency for higher availability and partition tolerance. Some modern distributed SQL databases like CockroachDB and Google Spanner provide ACID guarantees across distributed nodes.

## Origins and History

Jim Gray formalized the transaction concept and its properties in his 1981 paper, establishing atomicity, consistency, and durability as requirements for reliable transaction processing [1]. The ACID acronym itself was coined by Theo Haerder and Andreas Reuter in their 1983 paper, which added isolation as an explicit property and gave the set its memorable name [2].

## Sources

1. Gray, J. (1981). "The Transaction Concept: Virtues and Limitations." *Proceedings of the 7th International Conference on Very Large Data Bases*, 144-154.
2. Haerder, T. & Reuter, A. (1983). "Principles of Transaction-Oriented Database Recovery." *ACM Computing Surveys*, 15(4), 287-317.
