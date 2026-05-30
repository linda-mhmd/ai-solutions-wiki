---
title: "Operating System Fundamentals"
description: "The core concepts of operating systems including the kernel, system calls, resource management, and the role of the OS as an intermediary between hardware and applications."
date: 2026-03-28
categories: [Glossary]
tags: [operating-systems, kernel, system-calls, resource-management, computer-science]
last_updated: 2026-05-30
---

An operating system (OS) is the software layer between hardware and application programs. It manages hardware resources (CPU, memory, storage, I/O devices), provides abstractions that simplify application development, and enforces security and isolation between programs. Every general-purpose computer runs an operating system: Linux, Windows, macOS, and others.

## The Kernel

The kernel is the core component of an operating system that runs in privileged mode with direct hardware access. It provides the fundamental services that all other software depends on.

**Monolithic kernels** (Linux, traditional Unix) run all OS services (process management, file systems, device drivers, networking) in a single address space in kernel mode. This is efficient but means a bug in any component can crash the entire system.

**Microkernels** (Minix, L4, QNX) run only the most essential services in kernel mode (scheduling, IPC, basic memory management) and implement file systems, device drivers, and networking as user-space processes. This improves isolation and reliability at the cost of performance overhead from inter-process communication.

**Hybrid kernels** (Windows NT, macOS XNU) combine elements of both, running some services in kernel space for performance and others in user space for stability.

## System Calls

System calls are the interface between user-space applications and the kernel. When an application needs to perform a privileged operation (opening a file, allocating memory, creating a process, sending network data), it makes a system call. The CPU switches from user mode to kernel mode, the kernel performs the operation, and control returns to the application. Common system calls include `open`, `read`, `write`, `fork`, `exec`, `mmap`, and `socket`.

## Resource Management

The OS manages four primary resources. **CPU** scheduling determines which process runs on which processor core and for how long. **Memory** management provides each process with a virtual address space and maps it to physical RAM. **Storage** management provides file systems that organize data on disks. **I/O** management provides device drivers that abstract hardware differences behind uniform interfaces.

## Protection and Isolation

The OS enforces boundaries between processes. Each process has its own virtual address space and cannot read or write another process's memory without explicit shared memory arrangements. User permissions control access to files and devices. These protections prevent both accidental interference and malicious exploitation.

## Origins and History

Modern operating system concepts trace to the 1960s. MIT's CTSS (1961) introduced time-sharing. Multics (1965) pioneered hierarchical file systems and memory segmentation. Unix, created by Ken Thompson and Dennis Ritchie at Bell Labs in 1969, established the design principles (everything is a file, small composable tools, plain text interfaces) that influence systems today [1]. The Silberschatz, Galvin, and Gagne textbook lineage, beginning with the first edition in 1983, has been the standard reference for OS education [2].

## Sources

1. Ritchie, D.M. & Thompson, K. (1974). "The UNIX Time-Sharing System." *Communications of the ACM*, 17(7), 365-375.
2. Silberschatz, A., Galvin, P.B., & Gagne, G. (2018). *Operating System Concepts*. 10th Edition. Wiley.
