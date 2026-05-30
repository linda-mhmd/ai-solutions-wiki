---
title: "Concurrency and Synchronization"
description: "Techniques for managing concurrent execution in operating systems and applications, including mutexes, semaphores, monitors, and strategies for preventing deadlocks and race conditions."
date: 2026-03-28
categories: [Glossary]
tags: [operating-systems, concurrency, synchronization, mutexes, semaphores, deadlocks]
last_updated: 2026-05-30
---

Concurrency occurs when multiple processes or threads make progress within overlapping time periods. Synchronization provides mechanisms to coordinate concurrent execution and protect shared resources from race conditions, where the outcome depends on the unpredictable order in which operations execute.

## The Critical Section Problem

A critical section is a region of code that accesses a shared resource (a global variable, a file, a data structure) and must not be executed by more than one thread at a time. A correct solution to the critical section problem must satisfy three conditions: mutual exclusion (at most one thread in the critical section), progress (if no thread is in the critical section and some threads want to enter, one must be allowed in), and bounded waiting (a thread waiting to enter will eventually get in).

## Synchronization Primitives

**Mutexes (mutual exclusion locks)** are the simplest synchronization mechanism. A thread acquires (locks) the mutex before entering the critical section and releases (unlocks) it when leaving. Only one thread can hold the mutex at a time; others block until it is released.

**Semaphores** generalize mutexes to allow a configurable number of concurrent accesses. A counting semaphore initialized to N permits up to N threads to enter simultaneously. A binary semaphore (initialized to 1) behaves like a mutex. Semaphores support two operations: wait (decrement, potentially blocking) and signal (increment, potentially unblocking a waiting thread).

**Monitors** combine mutual exclusion with condition variables into a higher-level construct. A monitor is an object whose methods are automatically mutually exclusive. Condition variables within the monitor allow threads to wait for specific conditions and be signaled when those conditions change. Java's `synchronized` keyword and `wait`/`notify` implement the monitor pattern.

**Read-Write Locks** allow multiple concurrent readers or a single exclusive writer. This improves performance when reads greatly outnumber writes, which is common in database systems and caches.

## Common Concurrency Problems

**Race conditions** occur when the result depends on the timing of thread execution. Two threads incrementing a shared counter without synchronization may both read the same value, increment it, and write back the same result, losing one increment.

**Deadlocks** occur when two or more threads each hold a resource the other needs, creating a circular wait. Prevention strategies include imposing a global resource ordering, using timeouts, or avoiding hold-and-wait conditions.

**Priority inversion** occurs when a high-priority thread waits for a lock held by a low-priority thread, which is itself preempted by a medium-priority thread. Priority inheritance protocols address this by temporarily boosting the lock holder's priority.

## Origins and History

Edsger Dijkstra introduced semaphores and formalized the mutual exclusion problem in his 1965 manuscript "Cooperating Sequential Processes" [1]. He also described the dining philosophers problem as a concurrency illustration. C.A.R. Hoare proposed monitors in 1974 as a structured alternative to semaphores [2]. Per Brinch Hansen independently developed a similar concept around the same time [3].

## Sources

1. Dijkstra, E.W. (1965). "Cooperating Sequential Processes." *Technological University Eindhoven*, EWD-123.
2. Hoare, C.A.R. (1974). "Monitors: An Operating System Structuring Concept." *Communications of the ACM*, 17(10), 549-557.
3. Brinch Hansen, P. (1973). *Operating System Principles*. Prentice Hall.
