---
title: "GPU Scheduling for AI: Slurm, Kubernetes, MIG"
description: "How GPUs are allocated to AI training and inference jobs, covering Slurm and Kubernetes, gang scheduling, and sharing a GPU with MIG, time-slicing, and MPS."
date: 2026-07-02
categories: [Guides]
tags: [gpu, scheduling, kubernetes, slurm, mig, ai-infrastructure]
related:
  - guides/distributed-training-fsdp-deepspeed
  - guides/scaling-ai-infrastructure
  - comparisons/gpu-clouds-and-neoclouds
  - patterns/gpu-pooling
  - glossary/kubernetes
  - glossary/cpu-scheduling
last_verified: 2026-07-02
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/server-room-corridor-notext.png" alt="A dark data-center corridor lined with red-lit server racks, representing a fleet of GPUs waiting to be allocated to jobs." loading="lazy">
  <figcaption>A GPU fleet is expensive and finite. Scheduling decides which job gets which GPU, when, and for how long.</figcaption>
</figure>

GPU scheduling is the problem of deciding which job runs on which GPU, and when. It matters because GPUs are the most expensive part of an AI stack and the easiest to waste. An idle H100 still costs money, and a cluster that hands whole GPUs to jobs that need a fraction of one can burn most of its budget on air. Good scheduling keeps utilization high while making sure large training jobs get the coordinated GPUs they need. This guide covers the two scheduler worlds, how jobs get placed, and how to share a single GPU safely.

## Why GPUs are hard to schedule

CPUs are easy to share: the operating system slices time between processes thousands of times a second. GPUs are different. By default a GPU is allocated whole, one GPU to one container or process, because splitting it safely needs extra hardware or software. That coarse granularity creates three problems:

- **Fragmentation.** A job needing one GPU can leave the other seven on an eight-GPU node stranded if the scheduler is not packing carefully.
- **Gang requirements.** A distributed training job needs all its GPUs at once or none of them. Starting half the workers is useless and wastes the GPUs they hold while they wait.
- **Bursty demand.** Interactive development and inference need a GPU briefly and often, while training holds many GPUs for hours or days. The same cluster has to serve both.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Submit</span>
    <span class="bz-flow-step-desc">A job declares how many GPUs it needs and of what type.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Queue</span>
    <span class="bz-flow-step-desc">The scheduler holds it until enough GPUs are free, applying quotas and priority.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Place</span>
    <span class="bz-flow-step-desc">It bin-packs the job onto nodes, keeping multi-GPU jobs on fast interconnects.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Run and release</span>
    <span class="bz-flow-step-desc">The job runs, then frees its GPUs for the next in the queue.</span>
  </div>
</div>

## Two scheduler worlds: Slurm and Kubernetes

Most GPU clusters run one of two schedulers, from two different traditions.

| | Slurm | Kubernetes |
|---|---|---|
| **Origin** | High-performance computing | Cloud-native containers |
| **Job model** | Batch jobs, `sbatch` and `srun` | Pods and controllers |
| **GPU request** | `--gres=gpu:2` | `nvidia.com/gpu: 2` |
| **Gang scheduling** | Native | Needs Kueue or Volcano |
| **Strength** | Large batch training, fair-share queues | Mixed training and serving, ecosystem |
| **Best for** | Research and HPC clusters | Platform teams running many workloads |

**Slurm** comes from supercomputing and is still the default for large training clusters. It models GPUs as generic resources (GRES), supports partitions, fair-share accounting, and backfill scheduling that slots small jobs into gaps without delaying big ones. A job asks for GPUs directly:

```bash
#!/bin/bash
#SBATCH --job-name=train
#SBATCH --partition=gpu
#SBATCH --gres=gpu:8          # 8 GPUs on one node
#SBATCH --nodes=4             # across 4 nodes = 32 GPUs
srun python train.py
```

**Kubernetes** schedules containers and now runs a large share of AI workloads because one cluster can host training, inference, and everything else. GPUs are exposed through the NVIDIA device plugin, which advertises the `nvidia.com/gpu` resource, and a pod requests them like any other resource:

```yaml
resources:
  limits:
    nvidia.com/gpu: 2        # this pod gets 2 whole GPUs
```

The catch is gang scheduling. The default Kubernetes scheduler places pods one at a time, so a distributed job can get half its workers and deadlock. Batch systems layered on top, Kueue (the Kubernetes-native option) or Volcano, add all-or-nothing gang scheduling, queues, and quotas. On the operations side, the NVIDIA GPU Operator automates the driver, container toolkit, and device-plugin install so nodes are ready to serve GPUs without manual setup.

## Sharing one GPU

Handing a whole GPU to a notebook that uses five percent of it is the biggest source of waste. Three mechanisms let several workloads share one physical GPU, with very different isolation.

<figure class="bz-figure">
  <img src="/img/juggling/four-balls-overlap-rgb-notext.png" alt="Four glowing translucent spheres overlapping on black, a metaphor for several workloads sharing one GPU at the same time." loading="lazy">
  <figcaption>Sharing a GPU is a juggling act: how many jobs can occupy one device before they interfere depends on the mechanism you choose.</figcaption>
</figure>

| | MIG | Time-slicing | MPS |
|---|---|---|---|
| **Mechanism** | Hardware partitions | Round-robin time sharing | Concurrent shared context |
| **Memory isolation** | Yes, dedicated per instance | No | No |
| **Fault isolation** | Strong | Weak | Weak |
| **Overhead** | None, true partitions | Context-switch cost | Low |
| **Best for** | Multi-tenant inference | Dev and bursty jobs | Co-located small jobs |

- **MIG (Multi-Instance GPU)** partitions a data-center GPU (A100, H100, and Blackwell generations) in hardware into as many as seven isolated instances, each with its own memory and compute slice. It gives the hardest isolation, which is what you want for multi-tenant inference where one tenant must not affect another.
- **Time-slicing** oversubscribes a GPU by letting processes take turns on it. It is simple and needs no special hardware, but there is no memory isolation and a context-switch cost, so it suits development and bursty, low-stakes workloads rather than production training.
- **MPS (Multi-Process Service)** lets several processes run on one GPU concurrently through a shared context, packing small jobs together more efficiently than time-slicing, with weaker isolation than MIG.

## Keeping utilization high

Beyond placement, a few practices decide whether an expensive cluster earns its keep:

- **Bin-pack, do not spread.** Fill nodes before starting new ones so multi-GPU jobs can find contiguous space and idle nodes can scale down.
- **Be topology-aware.** Keep the GPUs of one job on the same node or NVLink domain, because [distributed training](/guides/distributed-training-fsdp-deepspeed/) is sensitive to interconnect speed.
- **Use quotas and priorities.** Fair-share and preemption stop one team monopolising the cluster and let urgent jobs jump the queue.
- **Separate training from serving.** Long training jobs and latency-sensitive inference have opposite needs; MIG or dedicated node pools keep them from interfering.

## When not to build GPU scheduling

- **You have one GPU and one user.** Run the job directly. A scheduler adds pure overhead.
- **You rent per-job cloud GPUs.** If you spin up a node per training run and tear it down after, the cloud provider is your scheduler. See [GPU clouds and neoclouds](/comparisons/gpu-clouds-and-neoclouds/).
- **Your utilization is already high with whole-GPU allocation.** Do not add MIG or time-slicing complexity until measurement shows GPUs sitting idle.

## Further reading

- [Distributed training: FSDP, DeepSpeed, and parallelism](/guides/distributed-training-fsdp-deepspeed/): the multi-GPU jobs that make gang scheduling necessary.
- [Scaling AI infrastructure](/guides/scaling-ai-infrastructure/): where scheduling sits in the broader platform.
- [GPU pooling](/patterns/gpu-pooling/): the pattern of sharing a GPU fleet across teams.
- [GPU clouds and neoclouds](/comparisons/gpu-clouds-and-neoclouds/): renting GPUs instead of scheduling your own.
- [CPU scheduling](/glossary/cpu-scheduling/): the operating-system idea GPU scheduling borrows from and departs from.
- [NVIDIA Multi-Instance GPU User Guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/): the reference for hardware partitioning.

## Sources

- NVIDIA. "Multi-Instance GPU (MIG) User Guide." https://docs.nvidia.com/datacenter/tesla/mig-user-guide/. Hardware partitioning of data-center GPUs.
- NVIDIA. "GPU Operator Documentation." https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html. Automated driver, toolkit, and device-plugin management, plus time-slicing and MPS.
- Kubernetes. "Schedule GPUs." https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/. The device-plugin model and requesting GPUs in pods.
- Kubernetes. "Kueue: Kubernetes-native Job Queueing." https://kueue.sigs.k8s.io/. Gang scheduling, quotas, and queues for batch workloads.
- SchedMD. "Slurm Generic Resource (GRES) Scheduling." https://slurm.schedmd.com/gres.html. Requesting and scheduling GPUs in Slurm.
