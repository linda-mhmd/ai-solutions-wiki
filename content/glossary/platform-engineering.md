---
title: "Platform Engineering"
description: "What platform engineering means, how internal developer platforms accelerate AI/ML teams, and why self-service infrastructure reduces cognitive load and speeds delivery."
date: 2026-03-28
categories: [Glossary]
tags: [platform-engineering, developer-experience, mlops, infrastructure, self-service]
related:
  - guides/platform-engineering-ai
  - glossary/serverless
  - guides/ci-cd-for-ai
last_updated: 2026-05-30
---

Platform engineering is the discipline of building and maintaining internal developer platforms (IDPs) that provide self-service capabilities for software and AI/ML teams. Instead of each team configuring infrastructure, CI/CD pipelines, and observability from scratch, a platform team builds golden paths that abstract away operational complexity while preserving flexibility.

The goal is not to restrict what teams can do. It is to make the right thing the easy thing.

## Core Components of an Internal Developer Platform

**Service Catalog** - A registry of available services, templates, and capabilities. Teams browse, select, and instantiate pre-configured stacks. For AI teams this includes GPU-enabled compute templates, model serving blueprints, and vector database configurations.

**Self-Service Infrastructure** - Teams provision environments, databases, and compute resources through a portal or CLI without filing tickets. Backstage, Port, and Kratix are common platforms that expose Terraform or Crossplane resources through developer-friendly interfaces.

**Golden Paths** - Opinionated but flexible templates that encode best practices. A golden path for an ML inference service might include a Dockerfile, Helm chart, CI/CD workflow, monitoring dashboards, and load test configuration. Teams can deviate, but the default path handles 80% of cases.

**Developer Portal** - A unified interface showing service ownership, documentation, API specs, deployment status, and on-call schedules. Backstage is the most widely adopted open-source option.

## Why AI/ML Teams Need Platform Engineering

AI/ML teams face infrastructure complexity that general backend teams do not: GPU scheduling, model artifact storage, experiment tracking, feature stores, and evaluation pipelines. Without a platform, each ML engineer becomes a part-time infrastructure engineer.

Platform engineering addresses this by providing:

- **Standardised model deployment** - One command to deploy a model behind an autoscaling endpoint with canary rollout, health checks, and rollback
- **Environment parity** - Training and inference environments match, eliminating "works on my machine" issues with CUDA versions, library dependencies, and data access
- **Compliance by default** - Data access controls, audit logging, and model lineage tracking are built into the platform rather than bolted on per project
- **Cost visibility** - GPU and compute costs are attributed to teams and projects automatically, enabling informed capacity decisions

## Platform Engineering vs DevOps

DevOps is a culture and set of practices. Platform engineering is a product discipline that builds tools embodying DevOps principles. A DevOps team might write a wiki page explaining how to set up monitoring. A platform team builds a system where monitoring is configured automatically when a service is deployed.

The distinction matters because documentation-driven approaches do not scale. Self-service platforms do.

## Sources

- Gregor, H., & Skelton, M. (2022). *Platform Engineering on Kubernetes*. Manning. (Platform engineering principles applied to Kubernetes-based platforms; Internal Developer Platforms, golden paths, and self-service infrastructure.)
- Skelton, M., & Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution Press. (Platform teams as enablers; stream-aligned teams as consumers; the organizational model underlying platform engineering.)
- Humanitec. (2022). *State of Platform Engineering Report 2022*. Humanitec. (Survey of platform engineering adoption; Internal Developer Platform components and maturity model.)
