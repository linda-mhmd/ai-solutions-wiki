---
title: "CPU Scheduling"
description: "Operating system algorithms that determine which process or thread runs on the CPU, including FCFS, SJF, Round Robin, and priority-based scheduling."
date: 2026-03-28
categories: [Glossary]
tags: [operating-systems, cpu-scheduling, algorithms, processes, performance]
last_updated: 2026-05-30
---

CPU scheduling is the operating system function that determines which ready process or thread gets to execute on the CPU and for how long. Since a typical system has more runnable processes than CPU cores, the scheduler must allocate CPU time fairly and efficiently. The choice of scheduling algorithm directly affects system responsiveness, throughput, and fairness.

## Scheduling Criteria

**CPU utilization** measures the percentage of time the CPU is doing useful work. **Throughput** counts the number of processes completed per unit time. **Turnaround time** is the total time from process submission to completion. **Waiting time** is the total time a process spends in the ready queue. **Response time** is the time from submission to the first response, critical for interactive systems.

## Scheduling Algorithms

**First-Come, First-Served (FCFS)** runs processes in the order they arrive. It is simple to implement but suffers from the convoy effect: a single long-running process delays all processes behind it, inflating average waiting time.

**Shortest Job First (SJF)** selects the process with the smallest expected CPU burst. It minimizes average waiting time and is provably optimal in that regard. However, it requires knowing burst lengths in advance (typically estimated from past behavior) and can starve long processes that perpetually wait behind shorter ones.

**Shortest Remaining Time First (SRTF)** is the preemptive version of SJF. If a new process arrives with a shorter remaining burst than the currently running process, the scheduler preempts the running process. This improves average turnaround time but adds context switch overhead.

**Round Robin (RR)** assigns each process a fixed time quantum (typically 10-100 milliseconds). When a process's quantum expires, it is preempted and placed at the back of the ready queue. Round Robin provides fair CPU access and good response times for interactive systems. A small quantum improves responsiveness but increases context switch overhead; a large quantum degrades to FCFS behavior.

**Priority Scheduling** assigns each process a priority and runs the highest-priority process first. Priorities can be static (assigned at creation) or dynamic (adjusted based on behavior). The risk is starvation of low-priority processes, mitigated by aging: gradually increasing the priority of waiting processes over time.

**Multilevel Feedback Queue (MLFQ)** uses multiple queues with different priorities and time quanta. New processes start in the highest-priority queue. If a process uses its entire quantum (indicating it is CPU-bound), it moves to a lower-priority queue. I/O-bound processes that voluntarily yield stay in high-priority queues. This automatically separates interactive and batch workloads.

## Modern Scheduling

Linux uses the Completely Fair Scheduler (CFS), which models an ideal multitasking processor and allocates CPU time proportionally based on process weights. Windows uses a multilevel feedback queue with dynamic priority adjustment.

## Origins and History

CPU scheduling research dates to the earliest time-sharing systems in the 1960s. The mathematical foundations of SJF optimality were established by Conway, Maxwell, and Miller in 1967 [1]. Corbato's work on CTSS at MIT in 1962 introduced practical time-sharing scheduling [2]. The Linux CFS was developed by Ingo Molnar and merged into the Linux kernel in version 2.6.23 (2007) [3].

## Sources

1. Conway, R.W., Maxwell, W.L., & Miller, L.W. (1967). *Theory of Scheduling*. Addison-Wesley.
2. Corbato, F.J. et al. (1962). "An Experimental Time-Sharing System." *AFIPS Conference Proceedings*, 335-344.
3. Molnar, I. (2007). "CFS Scheduler." Linux kernel documentation. [https://www.kernel.org/doc/Documentation/scheduler/sched-design-CFS.txt](https://www.kernel.org/doc/Documentation/scheduler/sched-design-CFS.txt)
