---
title: "Virtualization Fundamentals"
description: "The technology of creating virtual instances of computing resources, including hypervisor-based virtual machines, containers, and the formal requirements for virtualizable architectures."
date: 2026-03-28
categories: [Glossary]
tags: [operating-systems, virtualization, hypervisors, virtual-machines, containers]
last_updated: 2026-05-30
---

Virtualization is the technology that creates virtual versions of physical computing resources - processors, memory, storage, and networks - allowing multiple isolated environments to share the same physical hardware. It is the foundation of cloud computing, modern data centers, and container-based application deployment.

## Hypervisor-Based Virtualization

A hypervisor (or Virtual Machine Monitor) creates and manages virtual machines (VMs), each running its own complete operating system.

**Type 1 (bare-metal) hypervisors** run directly on the physical hardware without a host operating system. VMware ESXi, Microsoft Hyper-V, and Xen are Type 1 hypervisors. They provide high performance and are used in production data centers and cloud infrastructure (AWS EC2 uses a modified Xen/KVM hypervisor).

**Type 2 (hosted) hypervisors** run as an application on top of a host operating system. VirtualBox and VMware Workstation are Type 2 hypervisors. They are convenient for development and testing but add overhead from the host OS layer.

Each virtual machine gets virtualized CPU cores, memory, disk, and network interfaces. The guest operating system runs unmodified (in full virtualization) or with minor kernel modifications (in paravirtualization, as Xen originally required). Hardware-assisted virtualization (Intel VT-x, AMD-V) provides CPU support for efficient VM execution, making full virtualization practical with near-native performance.

## Containers

Containers virtualize at the operating system level rather than the hardware level. All containers on a host share the same kernel but have isolated file systems, process trees, and network stacks. Linux containers rely on kernel features: namespaces provide isolation (PID, network, mount, user) and cgroups control resource limits (CPU, memory, I/O).

Containers start in seconds (vs. minutes for VMs), consume less memory (no duplicate OS kernel), and package an application with its dependencies into a portable image. Docker popularized containers, and Kubernetes orchestrates them at scale.

**Containers vs. VMs** is not an either-or choice. VMs provide stronger isolation (separate kernels) and are appropriate when running untrusted workloads or different operating systems. Containers provide lighter-weight isolation and density for trusted, homogeneous workloads. Many production environments run containers inside VMs.

## Key Use Cases

**Server consolidation** runs multiple workloads on fewer physical servers, improving hardware utilization. **Development environments** reproduce production configurations locally. **Disaster recovery** enables VM snapshots, live migration, and rapid failover. **Multi-tenancy** isolates customer workloads on shared infrastructure.

## Origins and History

IBM pioneered virtualization with the CP-40 system in 1967 and its successor CP-67, which allowed multiple virtual machines to run concurrently on a single mainframe [1]. Gerald Popek and Robert Goldberg formalized the requirements for virtualizable computer architectures in their 1974 paper, defining the conditions under which a hypervisor can faithfully reproduce the underlying machine [2]. The x86 architecture was not natively virtualizable by these criteria until Intel VT-x (2005) and AMD-V (2006) added hardware support. Docker, released in 2013, made Linux containers accessible to mainstream developers [3].

## From staple to expensive legacy: the Broadcom era

For two decades, VMware's x86 virtualization was the default way to consolidate enterprise servers. That changed in 2023. Broadcom completed its acquisition of VMware on 22 November 2023, then ended perpetual licenses on 11 December 2023 and moved customers to subscription-only bundles [4]. Organizations locked into VMware faced sharp price increases with no quick exit. It is a textbook case of vendor lock-in turning a trusted product into expensive legacy.

So is virtualization "expensive legacy" now? It depends entirely on whether you can leave. Virtualization itself is not obsolete, because it still runs underneath most of the cloud. The newer abstraction for packaging and running applications is the container, popularized by Docker and orchestrated by Kubernetes. Teams that want off VMware now weigh open hypervisors like Proxmox and KVM, or public cloud, against the cost of staying. For the contract side of this story, see [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/), the [history of IT](/guides/history-of-it/), and the [interactive IT history timeline](/explore/it-timeline/).

## Sources

1. Creasy, R.J. (1981). "The Origin of the VM/370 Time-Sharing System." *IBM Journal of Research and Development*, 25(5), 483-490.
2. Popek, G.J. & Goldberg, R.P. (1974). "Formal Requirements for Virtualizable Third Generation Architectures." *Communications of the ACM*, 17(7), 412-421.
3. Merkel, D. (2014). "Docker: Lightweight Linux Containers for Consistent Development and Deployment." *Linux Journal*, 2014(239).
4. Broadcom (2023). "Broadcom Completes Acquisition of VMware" (22 November 2023); VMware, "End of Availability of Perpetual Licensing and SaaS Services" (11 December 2023).
