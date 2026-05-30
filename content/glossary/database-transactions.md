---
title: "Database Transactions"
description: "Units of work in a database that group multiple operations into a single atomic, consistent, isolated, and durable sequence with commit and rollback capabilities."
date: 2026-03-28
categories: [Glossary]
tags: [databases, transactions, concurrency, isolation-levels, data-integrity]
last_updated: 2026-05-30
---

A database transaction is a logical unit of work that groups one or more database operations into a sequence that either completes entirely or has no effect at all. Transactions provide the mechanism through which databases maintain data integrity in the presence of concurrent access and system failures.

## Transaction Lifecycle

A transaction begins with a `BEGIN` (or `START TRANSACTION`) statement. The application then executes a series of reads and writes. If all operations succeed and the application is satisfied, it issues a `COMMIT` to make all changes permanent. If an error occurs or the application detects a problem, it issues a `ROLLBACK` to undo all changes made since the transaction began.

**Savepoints** allow partial rollbacks within a transaction. A savepoint marks a point in the transaction that you can roll back to without abandoning the entire transaction. This is useful for implementing retry logic around specific operations within a larger workflow.

## Isolation Levels

Isolation levels control the degree to which concurrent transactions see each other's uncommitted changes.

**Read Uncommitted** allows dirty reads - a transaction can see uncommitted changes from other transactions. Rarely used in practice.

**Read Committed** ensures a transaction only sees data committed before each statement begins. This is the default in PostgreSQL and Oracle. It prevents dirty reads but allows non-repeatable reads (re-reading the same row may yield different values).

**Repeatable Read** ensures that if a transaction reads a row, re-reading it will return the same value. This is the default in MySQL InnoDB. It prevents dirty reads and non-repeatable reads but in some implementations allows phantom reads (new rows matching a query predicate appear).

**Serializable** provides the strongest guarantee: transactions behave as if they executed sequentially. This prevents all anomalies but reduces concurrency.

## Implementation Mechanisms

**Write-Ahead Logging (WAL)** records all changes to a log before applying them to data files. If the system crashes, the log is replayed to restore committed transactions and roll back incomplete ones.

**Multi-Version Concurrency Control (MVCC)** maintains multiple versions of each row so readers do not block writers. PostgreSQL, Oracle, and MySQL InnoDB all use MVCC. Each transaction sees a consistent snapshot of the database.

**Two-Phase Locking (2PL)** acquires all necessary locks before releasing any, ensuring serializability. Strict 2PL holds all locks until commit or rollback.

## Origins and History

Jim Gray established the theoretical foundations of transaction processing in his 1981 paper, defining the properties that reliable transactions must satisfy [1]. His work on locking, recovery, and concurrency control earned him the Turing Award in 1998. The write-ahead logging approach was formalized by Mohan et al. in the ARIES recovery algorithm in 1992 [2].

## Sources

1. Gray, J. (1981). "The Transaction Concept: Virtues and Limitations." *Proceedings of the 7th International Conference on Very Large Data Bases*, 144-154.
2. Mohan, C., Haderle, D., Lindsay, B., Pirahesh, H., & Schwarz, P. (1992). "ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks Using Write-Ahead Logging." *ACM Transactions on Database Systems*, 17(1), 94-162.
