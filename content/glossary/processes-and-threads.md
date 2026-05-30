---
title: "Processes and Threads"
description: "The fundamental units of execution in operating systems, covering process lifecycle, thread management, context switching, and inter-process communication."
date: 2026-03-28
categories: [Glossary]
tags: [operating-systems, processes, threads, concurrency, context-switching, ipc]
last_updated: 2026-05-30
---

A process is an instance of a running program with its own address space, file descriptors, and system resources. A thread is a lightweight unit of execution within a process that shares the process's address space and resources. Understanding processes and threads is essential for building concurrent, efficient software.

## Process Lifecycle

A process moves through several states during its lifetime.

**New** - The process is being created. The OS allocates a Process Control Block (PCB), assigns a process ID (PID), and sets up the initial address space.

**Ready** - The process is loaded in memory and waiting for CPU time. It sits in the ready queue until the scheduler selects it.

**Running** - The process is actively executing instructions on a CPU core. Only one process per core can be in this state at any given time.

**Waiting (Blocked)** - The process is waiting for an event: I/O completion, a signal, or a resource to become available. It cannot use the CPU until the event occurs.

**Terminated** - The process has finished execution. The OS reclaims its resources and removes its PCB.

## Threads

Threads within a process share the same address space, global variables, open files, and heap memory. Each thread has its own stack, program counter, and register state. Creating a thread is cheaper than creating a process because there is no need to duplicate the address space.

**User-level threads** are managed by a threading library without kernel involvement. They are fast to create and switch between but cannot take advantage of multiple CPU cores because the kernel sees only one schedulable entity.

**Kernel-level threads** are managed by the OS kernel and can be scheduled on different cores. Most modern systems use kernel threads (pthreads on Linux, Windows threads) or a hybrid model.

## Context Switching

When the OS switches the CPU from one process or thread to another, it performs a context switch: saving the current execution state (registers, program counter, stack pointer) and loading the saved state of the next process or thread. Context switches have measurable overhead (typically microseconds) from saving/restoring state and from cache and TLB invalidation. Thread context switches within the same process are cheaper than process context switches because the address space does not change.

## Inter-Process Communication (IPC)

Since processes have separate address spaces, they need explicit mechanisms to exchange data.

**Pipes** provide a unidirectional byte stream between related processes. Named pipes (FIFOs) extend this to unrelated processes. **Message queues** allow processes to send structured messages. **Shared memory** maps a region of memory into multiple processes' address spaces for high-speed data exchange, but requires synchronization. **Sockets** provide communication between processes on the same or different machines over the network.

## Origins and History

The concept of multiprogramming (running multiple processes concurrently) dates to the early 1960s with systems like IBM OS/360 [1]. Lightweight threads emerged in the 1980s; the POSIX threads (pthreads) standard was published as IEEE 1003.1c in 1995, establishing a portable threading API for Unix-like systems [2].

## Sources

1. Silberschatz, A., Galvin, P.B., & Gagne, G. (2018). *Operating System Concepts*. 10th Edition. Wiley.
2. IEEE (1995). "POSIX.1c - Threads Extensions." IEEE 1003.1c-1995.
