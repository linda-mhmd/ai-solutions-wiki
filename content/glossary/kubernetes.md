---
title: "Kubernetes"
description: "What Kubernetes is, how it orchestrates containers at scale, and when to use EKS versus simpler alternatives."
date: 2026-03-28
categories: [Glossary]
tags: [kubernetes, EKS, container-orchestration, microservices, infrastructure]
related:
  - glossary/docker
  - glossary/helm-chart
  - glossary/service-mesh
  - glossary/auto-scaling
last_updated: 2026-05-30
---

Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It manages where containers run, restarts failed containers, scales capacity based on demand, handles service discovery, and manages configuration and secrets.

## How It Works

Kubernetes organizes containers into pods (the smallest deployable unit, one or more containers sharing network and storage). Pods are managed by deployments (which ensure a desired number of pod replicas are running), exposed by services (which provide stable network endpoints), and configured via config maps and secrets.

The cluster consists of a control plane (API server, scheduler, controller manager) and worker nodes (where pods run). The control plane makes scheduling decisions; worker nodes execute workloads.

**Amazon EKS** (Elastic Kubernetes Service) manages the control plane for you, handling upgrades, patching, and high availability. You manage or use Fargate for worker nodes.

## Why It Matters

Kubernetes is the industry standard for running containerized workloads at scale. For AI platforms with multiple services (inference endpoints, feature engineering, data processing, APIs), Kubernetes provides consistent deployment, scaling, and management across all components.

However, Kubernetes is complex. It introduces a significant learning curve and ongoing operational overhead. The team must understand pods, services, deployments, namespaces, RBAC, networking, storage classes, and the ecosystem of tools built on top (Helm, Istio, ArgoCD).

## When to Use Kubernetes

Kubernetes is appropriate when you have many (10+) microservices, need fine-grained control over scheduling and resource allocation, require multi-cloud portability, or need capabilities that managed services do not provide (custom operators, GPU scheduling, complex networking).

## When Not to Use Kubernetes

For simpler workloads, AWS offers lower-overhead alternatives. ECS Fargate runs containers without Kubernetes complexity. Lambda handles event-driven workloads without any container management. SageMaker manages ML inference endpoints without orchestration overhead.

## Practical Guidance

Use EKS with managed node groups or Fargate to reduce operational burden. Adopt Helm for deployment management and ArgoCD or Flux for GitOps-based deployments. Start with a single namespace and simple deployments before adopting advanced features. Budget for the platform team expertise needed to operate Kubernetes well.

## Sources

- Burns, B., Grant, B., Oppenheimer, D., Brewer, E., & Wilkes, J. (2016). Borg, Omega, and Kubernetes. *ACM Queue, 14*(1). (Design history of Kubernetes; explains the Borg/Omega precedents and the design decisions that shaped K8s.)
- Burns, B., et al. (2022). *Kubernetes: Up and Running* (3rd ed.). O'Reilly Media. (Standard practical reference for Kubernetes operations and deployment patterns.)
- Verma, A., et al. (2015). Large-scale cluster management at Google with Borg. *EuroSys 2015*. (Borg system paper; the internal Google predecessor that informed Kubernetes design.)
