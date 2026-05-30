---
title: "PACELC Theorem"
description: "An extension of the CAP theorem that addresses the trade-off between latency and consistency even when no network partition is present."
date: 2026-03-28
categories: [Glossary]
tags: [distributed-systems, pacelc, cap-theorem, consistency, latency]
last_updated: 2026-05-30
---

The PACELC theorem extends the CAP theorem by stating that in a distributed system, if there is a Partition (P), the system must choose between Availability (A) and Consistency (C); Else (E), when the system is running normally without partitions, it must choose between Latency (L) and Consistency (C). This captures a trade-off that CAP ignores: the tension between consistency and latency during normal operation.

## Why CAP Is Incomplete

The CAP theorem only describes system behavior during network partitions. But partitions are rare events in well-managed networks. During the vast majority of a system's operational life, there is no partition - and the system still faces a fundamental trade-off. Replicating data to multiple nodes takes time. A system can either wait for all replicas to acknowledge a write (strong consistency, higher latency) or acknowledge the write after fewer replicas confirm (lower latency, weaker consistency).

## Reading the PACELC Classification

PACELC classifies systems by their choices in both situations.

**PA/EL systems** choose Availability during partitions and Latency during normal operation. Cassandra and DynamoDB (default settings) follow this model. They prioritize responsiveness at all times, accepting eventual consistency.

**PC/EC systems** choose Consistency in both scenarios. Google Spanner, VoltDB, and traditional single-node relational databases fall here. They sacrifice latency (and availability during partitions) for strong consistency guarantees.

**PA/EC systems** choose Availability during partitions but Consistency during normal operation. MongoDB with majority write concern behaves this way: strongly consistent under normal conditions but potentially inconsistent during partitions.

**PC/EL systems** choose Consistency during partitions but Latency during normal operation. This is a less common combination, as it represents an unusual set of priorities.

## Practical Application

PACELC provides a more useful framework for evaluating distributed databases than CAP alone because it addresses the trade-off engineers encounter daily (latency vs. consistency) rather than only the trade-off during rare partition events. When selecting a database for a distributed system, PACELC encourages evaluating both dimensions of behavior.

## Origins and History

Daniel Abadi proposed the PACELC theorem in a 2012 paper, arguing that the CAP theorem fails to capture the complete set of trade-offs in distributed database design [1]. Abadi observed that many systems classified identically under CAP (for example, both Cassandra and VoltDB are technically CP-capable) exhibit fundamentally different behavior under normal conditions, and PACELC explains why [1].

## Sources

1. Abadi, D.J. (2012). "Consistency Tradeoffs in Modern Distributed Database System Design." *Computer*, 45(2), 37-42.
2. Brewer, E.A. (2012). "CAP Twelve Years Later: How the 'Rules' Have Changed." *Computer*, 45(2), 23-29.
