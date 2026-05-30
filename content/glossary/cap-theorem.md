---
title: "CAP Theorem"
description: "A fundamental theorem in distributed systems stating that a distributed data store can provide at most two of three guarantees: Consistency, Availability, and Partition Tolerance."
date: 2026-03-28
categories: [Glossary]
tags: [distributed-systems, cap-theorem, databases, consistency, availability]
last_updated: 2026-05-30
---

The CAP theorem states that a distributed data store cannot simultaneously provide all three of the following guarantees: Consistency, Availability, and Partition Tolerance. When a network partition occurs, the system must choose between consistency and availability.

## The Three Guarantees

**Consistency** means that every read receives the most recent write or an error. All nodes in the distributed system see the same data at the same time. This is linearizability, not the "C" in ACID (which refers to constraint satisfaction).

**Availability** means that every request receives a non-error response, without the guarantee that it contains the most recent write. The system continues to operate and serve requests even if some nodes are unreachable.

**Partition Tolerance** means the system continues to operate despite arbitrary message loss or failure of part of the network. In any real distributed system, network partitions are inevitable, so partition tolerance is not optional.

## Practical Implications

Since network partitions will happen in any distributed system, the real choice is between CP and AP behavior during a partition.

**CP systems** (Consistency + Partition Tolerance) refuse to serve requests when they cannot guarantee consistency. Examples include HBase, MongoDB (with majority read concern), and etcd. During a partition, the minority side becomes unavailable.

**AP systems** (Availability + Partition Tolerance) continue serving requests during a partition, even if some responses may be stale. Examples include Cassandra, DynamoDB (with eventual consistency), and CouchDB. After the partition heals, the system reconciles divergent data.

When no partition is occurring, a system can provide both consistency and availability. The trade-off only applies during the partition event itself.

## Common Misconceptions

CAP does not mean you must permanently sacrifice one of the three properties. The choice between C and A is made per-operation or per-partition event, not as a permanent architectural decision. Many systems offer tunable consistency, allowing different operations to make different trade-offs. DynamoDB, for example, offers both eventually consistent and strongly consistent reads.

## Origins and History

Eric Brewer presented the CAP conjecture during his keynote address at the ACM Symposium on Principles of Distributed Computing (PODC) in 2000, arguing that designers of shared-data systems must choose between the three properties [1]. Seth Gilbert and Nancy Lynch formally proved the conjecture as a theorem in 2002 [2]. Brewer later revisited and refined the theorem in 2012, clarifying common misinterpretations [3].

## Sources

1. Brewer, E.A. (2000). "Towards Robust Distributed Systems." Keynote at *ACM PODC 2000*.
2. Gilbert, S. & Lynch, N. (2002). "Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services." *ACM SIGACT News*, 33(2), 51-59.
3. Brewer, E.A. (2012). "CAP Twelve Years Later: How the 'Rules' Have Changed." *Computer*, 45(2), 23-29.
