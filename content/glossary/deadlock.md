---
title: "Deadlock"
description: "A condition where two or more processes are permanently blocked, each waiting for a resource held by another, along with the Coffman conditions and strategies for prevention, avoidance, and detection."
date: 2026-03-28
categories: [Glossary]
tags: [operating-systems, deadlock, concurrency, resource-management, synchronization]
last_updated: 2026-05-30
---

A deadlock occurs when two or more processes or threads are permanently blocked because each is waiting to acquire a resource held by another member of the set. No process can proceed, and without intervention, the deadlock persists indefinitely. Deadlocks are a fundamental problem in concurrent systems, from operating system kernels to database transaction managers to distributed applications.

## Coffman Conditions

Edward Coffman, Michael Elphick, and Arie Shoshani identified four necessary conditions for deadlock in 1971 [1]. All four must hold simultaneously for a deadlock to occur.

**Mutual exclusion** - At least one resource must be held in a non-shareable mode. Only one process can use the resource at a time.

**Hold and wait** - A process holding at least one resource is waiting to acquire additional resources held by other processes.

**No preemption** - Resources cannot be forcibly taken from a process; they must be released voluntarily by the holding process.

**Circular wait** - A circular chain of two or more processes exists, where each process is waiting for a resource held by the next process in the chain.

## Handling Strategies

**Prevention** eliminates one or more of the Coffman conditions by design. The most practical approach is eliminating circular wait by imposing a total ordering on resource types and requiring processes to request resources in increasing order. Eliminating hold-and-wait requires processes to request all resources at once before beginning execution, which is often impractical.

**Avoidance** dynamically analyzes resource allocation to ensure the system never enters an unsafe state. The Banker's Algorithm, devised by Dijkstra, examines each resource request and grants it only if a safe sequence of process completions exists [2]. Avoidance requires advance knowledge of each process's maximum resource needs.

**Detection and recovery** allows deadlocks to occur and periodically checks for them. The system maintains a resource allocation graph and looks for cycles. When a deadlock is detected, recovery options include terminating one or more deadlocked processes, rolling back transactions, or preempting resources from selected processes.

**Ignoring** (the ostrich algorithm) simply accepts that deadlocks are rare enough that the cost of prevention or detection outweighs the occasional need to restart the system. Linux and Windows take this approach for most user-space resource conflicts.

## Deadlocks in Practice

**Database systems** handle deadlocks through detection: the database engine maintains a wait-for graph and aborts one transaction when a cycle is detected, returning a deadlock error to the application.

**Distributed systems** face more complex deadlock scenarios because the resource allocation graph spans multiple machines. Distributed deadlock detection requires coordination between nodes, adding complexity and latency.

## Origins and History

The formal study of deadlock began with Dijkstra's work on the dining philosophers problem and the Banker's Algorithm in the 1960s [2]. Coffman, Elphick, and Shoshani systematized the four necessary conditions and the classification of handling strategies in their 1971 paper [1]. Holt formalized the resource allocation graph model in 1972 [3].

## Sources

1. Coffman, E.G., Elphick, M.J., & Shoshani, A. (1971). "System Deadlocks." *ACM Computing Surveys*, 3(2), 67-78.
2. Dijkstra, E.W. (1965). "Cooperating Sequential Processes." *Technological University Eindhoven*, EWD-123.
3. Holt, R.C. (1972). "Some Deadlock Properties of Computer Systems." *ACM Computing Surveys*, 4(3), 179-196.
