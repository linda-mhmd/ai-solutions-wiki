---
title: "Docker"
description: "What Docker is, how containers package applications, and best practices for containerizing AI workloads."
date: 2026-03-28
categories: [Glossary]
tags: [docker, containers, microservices, deployment, DevOps]
related:
  - glossary/kubernetes
  - glossary/container-registry
  - glossary/helm-chart
last_updated: 2026-05-30
---

Docker is a platform for building, shipping, and running applications in containers. A container packages an application with all its dependencies (runtime, libraries, system tools) into a standardized unit that runs consistently across any environment - developer laptop, CI server, or production cloud.

## How It Works

A **Dockerfile** defines the container image: the base operating system, installed packages, application code, and startup command. Building the Dockerfile produces an image - an immutable snapshot of the application and its dependencies. Running an image creates a container - an isolated process with its own filesystem, network, and resources.

Images are stored in container registries (Amazon ECR, Docker Hub) and pulled by orchestrators (ECS, EKS) to run containers across clusters.

## Why It Matters

Containers solve the "works on my machine" problem. The same container image runs identically in development, staging, and production. For AI workloads, this is critical: ML models depend on specific library versions (PyTorch, TensorFlow, CUDA), and version mismatches between training and inference environments cause subtle, hard-to-debug failures. Containers guarantee environment consistency.

## AI Workload Containers

**Inference containers** package the model, serving framework (FastAPI, TorchServe, Triton), and dependencies. Keep images small (multi-stage builds, slim base images) to reduce cold start time and storage costs.

**Training containers** package training code and dependencies. They are typically larger (include training libraries, GPU drivers) and run as batch jobs on ECS or SageMaker.

**Pipeline step containers** package individual processing steps (text extraction, embedding generation, post-processing). Each step is a container, enabling independent scaling and language-agnostic pipelines.

## Practical Guidance

Use multi-stage builds to keep production images small. Pin dependency versions explicitly (no `latest` tags). Use ECR for private image storage with vulnerability scanning. Minimize the number of layers and cache frequently. Run containers as non-root users for security. For GPU workloads, use NVIDIA's CUDA base images and ensure the host has the matching GPU drivers.

Treat containers as immutable. Configuration should come from environment variables or mounted config maps, not baked into the image. This enables the same image to run across environments with different settings.

## Sources

- Merkel, D. (2014). Docker: Lightweight Linux containers for consistent development and deployment. *Linux Journal*, 239. (Original Docker paper; container image layering, copy-on-write filesystem, and the Dockerfile build process.)
- Felter, W., Ferreira, A., Rajamony, R., & Rubio, J. (2015). An updated performance comparison of virtual machines and Linux containers. *2015 IEEE International Symposium on Performance Analysis of Systems and Software (ISPASS)*, 171–172. (Performance comparison showing containers add minimal overhead versus VMs; justification for containers in AI inference workloads.)
- Boettiger, C. (2015). An introduction to Docker for reproducible research. *ACM SIGOPS Operating Systems Review*, 49(1), 71–79. (Containers for scientific reproducibility; directly applicable to reproducible ML training environments.)
