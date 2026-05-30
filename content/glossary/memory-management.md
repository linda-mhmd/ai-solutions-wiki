---
title: "Memory Management"
description: "Operating system techniques for managing physical and virtual memory, including paging, segmentation, virtual address spaces, and page replacement algorithms."
date: 2026-03-28
categories: [Glossary]
tags: [operating-systems, memory-management, virtual-memory, paging, segmentation]
last_updated: 2026-05-30
---

Memory management is the operating system function responsible for allocating physical memory to processes, providing each process with its own virtual address space, and handling the movement of data between RAM and disk when physical memory is insufficient. Effective memory management is critical for system stability, security, and performance.

## Virtual Memory

Virtual memory gives each process the illusion of having its own large, contiguous address space, independent of the physical RAM available. The OS and hardware (the Memory Management Unit, or MMU) translate virtual addresses to physical addresses transparently. This provides three key benefits: isolation (processes cannot access each other's memory), simplicity (each process sees a clean address space starting at zero), and the ability to run programs whose total memory exceeds physical RAM.

## Paging

Paging divides virtual memory into fixed-size blocks called pages (typically 4 KB) and physical memory into same-size blocks called frames. The OS maintains a page table for each process that maps virtual page numbers to physical frame numbers. When a process accesses a virtual address, the MMU looks up the page table to find the corresponding physical frame.

**Page faults** occur when a process accesses a page that is not currently in physical memory. The OS traps the fault, loads the required page from disk (swap space), updates the page table, and resumes the process. Frequent page faults (thrashing) severely degrade performance.

**Page replacement algorithms** decide which page to evict when physical memory is full. Least Recently Used (LRU) evicts the page not accessed for the longest time. Clock (Second Chance) approximates LRU with lower overhead. Optimal replaces the page that will not be used for the longest time in the future (theoretical best case, used as a benchmark).

## Segmentation

Segmentation divides a process's address space into logical segments of variable size: code, data, stack, heap. Each segment has a base address and a length. Segmentation supports the logical structure of programs but can cause external fragmentation (gaps between allocated segments). Most modern systems use paging or a combination of paging and segmentation (as in x86 architectures, though segments are largely unused in 64-bit mode).

## Memory Allocation

**Contiguous allocation** assigns each process a single block of physical memory. Simple but leads to external fragmentation. **Non-contiguous allocation** (paging) eliminates external fragmentation by mapping scattered frames to contiguous virtual pages.

**Kernel memory allocation** uses specialized allocators like the slab allocator (Linux), which pre-allocates caches of frequently used object sizes to reduce fragmentation and allocation overhead.

## Translation Lookaside Buffer (TLB)

The TLB is a hardware cache of recent page table entries. Since page table lookups require memory accesses, the TLB dramatically speeds up virtual-to-physical address translation. TLB miss rates are typically very low (under 1%) because programs exhibit strong locality of reference.

## Origins and History

Virtual memory was first implemented in the Atlas computer at the University of Manchester in 1962 by Tom Kilburn and colleagues [1]. The concept of demand paging was refined through the Multics project at MIT in the mid-1960s [2]. Peter Denning formalized the working set model for page replacement in 1968, providing the theoretical basis for understanding thrashing [3].

## Sources

1. Kilburn, T., Edwards, D.B.G., Lanigan, M.J., & Sumner, F.H. (1962). "One-Level Storage System." *IRE Transactions on Electronic Computers*, EC-11(2), 223-235.
2. Corbato, F.J. & Vyssotsky, V.A. (1965). "Introduction and Overview of the Multics System." *AFIPS Conference Proceedings*, 185-196.
3. Denning, P.J. (1968). "The Working Set Model for Program Behavior." *Communications of the ACM*, 11(5), 323-333.
