---
title: "GPU Pooling"
description: "Shared GPU infrastructure with intelligent scheduling: maximizing GPU utilization across teams, managing heterogeneous hardware, and reducing idle compute costs."
date: 2026-03-28
categories: [Patterns]
tags: [gpu, infrastructure, scheduling, resource-management, cost-optimization, kubernetes]
related:
  - patterns/cost-optimization
  - patterns/batch-inference
  - patterns/continuous-training-pattern
  - patterns/edge-mlops
last_updated: 2026-05-30
---

GPUs are expensive and frequently underutilized. A team that owns dedicated GPU nodes for training uses them heavily during experiment sprints and leaves them idle between sprints. Meanwhile, another team waits weeks for GPU capacity. GPU pooling creates a shared infrastructure layer where GPU resources are allocated dynamically based on demand rather than statically assigned to teams.

## The Utilization Problem

In a typical organization without pooling, each team provisions GPUs for peak demand. Training workloads are bursty: a team might need 32 GPUs for a week-long training run, then zero GPUs for two weeks while they analyze results. Static allocation means the organization pays for peak capacity continuously while average utilization sits below 30%.

## Pool Architecture

**Centralized GPU cluster** - All GPUs are managed as a single shared pool. Teams submit workloads to a scheduling system that allocates GPUs from the pool. No team owns specific hardware. The pool spans multiple GPU types (A100, H100, L4) to serve different workload profiles.

**Scheduler** - An intelligent scheduler matches workloads to available GPUs based on requirements (GPU memory, interconnect bandwidth, runtime estimate) and policies (team priority, preemption rules, fair-share quotas). Kubernetes with a GPU-aware scheduler (Volcano, Run:ai, or Kueue) is the common foundation.

**Quota and fair-share** - Each team receives a guaranteed minimum quota of GPU-hours per period. Unused quota from one team becomes available to others. Teams can burst above their quota when the pool has spare capacity, but burst workloads are preemptible by guaranteed-quota workloads.

**Preemption policies** - When demand exceeds capacity, the scheduler preempts lower-priority workloads to make room for higher-priority ones. Training jobs must checkpoint regularly so that preempted work can resume from the last checkpoint rather than restarting from scratch.

## Heterogeneous Hardware Management

Not all GPUs are interchangeable. A large language model training run needs high-memory GPUs with NVLink interconnect. An inference workload might run well on smaller GPUs. The scheduler must match workload requirements to hardware capabilities. Label GPU nodes with their specifications and use affinity rules to place workloads on compatible hardware.

## Multi-Tenancy Isolation

Shared GPU infrastructure requires isolation between tenants. Use Kubernetes namespaces, network policies, and GPU partitioning (MIG on A100/H100) to prevent workloads from interfering with each other. Ensure that one team's workload cannot access another team's data or model artifacts through shared GPU memory.

## Cost Allocation

Track GPU-hours consumed by each team, project, and workload type. Map consumption to cost centers for internal chargeback. Provide teams with visibility into their usage patterns so they can optimize their workloads. Show utilization dashboards that demonstrate the cost savings from pooling versus dedicated allocation.

## Operational Practices

Monitor GPU health continuously. Faulty GPUs cause silent training corruption that is expensive to debug. Run periodic hardware diagnostics and remove unhealthy nodes from the pool automatically. Maintain spare capacity for high-priority workloads that cannot wait for preemption.
