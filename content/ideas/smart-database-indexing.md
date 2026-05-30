---
title: "AI-Recommended Database Indexes"
description: "AI analyzes query patterns and execution plans to recommend optimal database indexes, reducing manual DBA analysis."
date: 2026-03-28
categories: [Ideas]
tags: [database, indexing, performance, optimization, daily-ai-spark]
last_updated: 2026-05-30
---

Slow queries are a perennial problem. DBAs analyze query plans to determine which indexes would help, but most teams do not have a dedicated DBA. Developers add indexes reactively when something is slow, often without considering the impact on write performance or existing indexes that could be modified instead.

## The AI Approach

An LLM analyzes your slow query log, existing indexes, and table schemas to recommend new indexes, identify redundant indexes, and estimate the performance impact of changes.

## Three-Step Build

1. **Collect data** - Export your slow query log, current index definitions, and table schemas. For PostgreSQL, pull from `pg_stat_statements` and `pg_indexes`. For MySQL, use the slow query log and `SHOW INDEX`.
2. **Analyze** - Feed the query patterns, existing indexes, and schemas to an LLM. Ask it to identify queries that would benefit from new indexes, explain why, and suggest the specific index definition.
3. **Validate** - Run `EXPLAIN ANALYZE` on the slow queries with and without the suggested indexes in a test environment. Compare execution plans and timings.

## Where It Breaks

Index recommendations without understanding write patterns can degrade insert/update performance. The AI does not know your data distribution, so a recommended index on a low-cardinality column may not help. Recommendations need validation against realistic data volumes.

## The Production Path

Run the analysis weekly against production query statistics. Present recommendations as a dashboard that DBAs or senior developers review. Track which recommendations were accepted and their measured impact, feeding this back to improve future suggestions.
