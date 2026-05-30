---
title: "Stored Procedures and Triggers"
description: "Server-side database programs that encapsulate reusable logic and automatically respond to data events, executing within the database engine itself."
date: 2026-03-28
categories: [Glossary]
tags: [databases, stored-procedures, triggers, sql, server-side-logic]
last_updated: 2026-05-30
---

Stored procedures and triggers are programs that execute inside the database engine rather than in application code. Stored procedures are explicitly called by applications to perform defined operations. Triggers fire automatically in response to specific data events. Both move logic closer to the data, reducing network round trips and centralizing business rules.

## Stored Procedures

A stored procedure is a named, precompiled collection of SQL statements and control-flow logic stored in the database. Applications call procedures by name, passing parameters and receiving results. A procedure for transferring funds between accounts might accept source account, destination account, and amount as parameters, then execute the debit and credit within a transaction.

**Advantages** include reduced network traffic (one call replaces multiple SQL statements), consistent enforcement of business rules regardless of which application accesses the data, precompiled execution plans that avoid repeated query parsing, and fine-grained security (users can be granted execute permission on a procedure without direct table access).

**Disadvantages** include vendor-specific procedural languages (PL/pgSQL, T-SQL, PL/SQL) that lock logic to a database platform, difficulty in version control and testing compared to application code, and the risk of creating opaque business logic that is hard to discover and maintain.

## Triggers

A trigger is a procedure that fires automatically when a specified event occurs on a table: INSERT, UPDATE, or DELETE. Triggers can execute BEFORE or AFTER the event and can access both the old and new row values.

**Common uses** include audit logging (recording who changed what and when), enforcing complex constraints that cannot be expressed with declarative constraints, maintaining derived or denormalized data, and replicating changes to other tables.

**Caution** is warranted with triggers. They execute invisibly, making it difficult to trace the full effect of a data change. Cascading triggers (one trigger firing another) can create complex, hard-to-debug chains. Excessive trigger logic degrades write performance because every INSERT, UPDATE, or DELETE on the table incurs the trigger overhead.

## Stored Functions

Most databases also support stored functions (user-defined functions), which differ from procedures in that they return a value and can be used within SQL expressions. A function that calculates sales tax can be called directly in a SELECT statement.

## Origins and History

Stored procedures appeared in early commercial databases in the 1980s. Sybase introduced them in its SQL Server product in 1987, and the concept carried forward when Microsoft licensed the Sybase codebase [1]. Oracle introduced PL/SQL in 1988 [2]. The SQL:1999 standard formalized stored routines (procedures and functions) as part of the SQL/PSM (Persistent Stored Modules) specification [3].

## Sources

1. Sybase, Inc. (1987). Sybase SQL Server product documentation.
2. Oracle Corporation (1988). PL/SQL User's Guide and Reference.
3. ISO/IEC 9075-4:1999. "Information technology - Database languages - SQL - Part 4: Persistent Stored Modules (SQL/PSM)."
