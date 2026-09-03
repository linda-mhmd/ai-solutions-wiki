---
title: "Argo Workflows - Kubernetes-Native Workflow Engine"
description: "Argo Workflows is an open-source, container-native workflow engine that runs each step of a workflow as a Kubernetes pod, defined declaratively as a custom resource."
date: 2026-09-03
categories: [Tools]
tags: ["open-source", "kubernetes", "workflow-engine", "ci-cd", "machine-learning-pipelines", "batch-processing", "cncf", "gitops"]
related:
  - tools/temporal
  - tools/crossplane
  - glossary/workflow-engine
  - glossary/kubernetes
  - patterns/declarative-control-planes-for-agents
last_updated: 2026-09-03
---

Argo Workflows is an open-source, container-native workflow engine for orchestrating parallel jobs on Kubernetes. Workflows are defined as a Kubernetes Custom Resource Definition (CRD) — a `Workflow` object written in YAML — in which each step runs as its own container in its own pod, sequenced either as a linear list of steps or as a directed acyclic graph (DAG) of dependencies. It was originally built by Applatix and is now maintained under the Argo Project umbrella at the Cloud Native Computing Foundation (CNCF).

Official documentation: https://argo-workflows.readthedocs.io/

## Key Capabilities

- **Workflow as a CRD** - A `Workflow` (or reusable `WorkflowTemplate`/`CronWorkflow`) is a native Kubernetes object; the Argo controller reconciles it the same way Kubernetes reconciles a Deployment, scheduling each step as a pod
- **DAG and Steps Templates** - Model a pipeline as sequential steps or as a DAG with explicit dependencies, fan-out/fan-in parallelism, loops, and conditionals
- **Artifact Passing** - Inputs and outputs move between steps via artifacts stored in S3, GCS, Azure Blob Storage, or other backends, so downstream steps can consume upstream results
- **Retries, Timeouts, and Suspension** - Per-step retry policies, timeouts, exit handlers, and the ability to suspend a running workflow for manual approval before resuming it
- **CronWorkflows** - Native cron-based scheduling for recurring workflows without an external scheduler
- **Multi-Language Clients** - A CLI, REST/gRPC API, and SDKs including the community Hera SDK for defining workflows in Python instead of raw YAML

## Argo Workflows vs. Temporal

Both are used to orchestrate multi-step processes with retries and dependency management, but they differ in how a workflow is authored and where its state lives. Argo Workflows is declarative: a workflow is YAML (or Python generating YAML via Hera) describing containers and their dependencies, and each step's isolation boundary is a Kubernetes pod, with state tracked through the Kubernetes API and etcd. Temporal (see [Temporal](/tools/temporal/)) is code-first: a workflow is a function written in a general-purpose language (Go, Java, TypeScript, Python, .NET), and the Temporal server persists an event history of that function's execution so a crashed worker can replay to its exact stopping point. In practice, this makes Argo Workflows a natural fit for ETL, ML training, and CI/CD pipelines built on containers already running in a Kubernetes cluster, while Temporal is more often chosen for long-running, stateful business processes — payment flows, order management, human-in-the-loop approvals — that need exactly-once semantics and don't need every step to be a container.

## CNCF Status and the Argo Project Family

Argo Workflows is one of four sub-projects under the Argo Project, alongside **Argo CD** (declarative GitOps continuous delivery), **Argo Rollouts** (progressive delivery — canary and blue/green rollouts), and **Argo Events** (event-driven workflow triggering). All four share governance, branding, and a combined annual ArgoCon event, which is why the project's icon and marketing use one shared "Argo" mark rather than a logo per sub-project. The Argo Project entered the CNCF Incubator in April 2020, and reached Graduated status — the CNCF's highest maturity tier — on December 6, 2022. Argo Workflows is licensed under the Apache License 2.0, and its GitHub repository lists roughly 200 organizations as production users, including Adobe, BlackRock, Capital One, Google, IBM, Intuit, and NVIDIA.

## Use Cases

- **CI/CD** - Build, test, and deploy stages modeled as workflow steps, running natively on the same Kubernetes cluster as the workloads being deployed
- **Machine learning pipelines** - Data preprocessing, training, validation, and deployment stages codified as reusable, versioned workflows; Argo Workflows underlies Kubeflow Pipelines and integrates with tools like Katib and Netflix's Metaflow
- **Batch and data processing** - ETL jobs, large-scale data transformations, backups, and migrations, where each stage's container-level isolation and Argo's parallelism controls manage throughput
- **Infrastructure automation** - Multi-step provisioning or maintenance tasks that need Kubernetes-native retry and dependency semantics

## Fit for Agent-Triggered Tasks

Because a `Workflow` is a plain Kubernetes object, it is a convenient target for automation that needs to run a repeatable, multi-step, possibly long-running task without holding state in its own process: an agent, or a step in a scaffolder template (see [Backstage as an agent interface](/guides/backstage-as-an-agent-interface/)), can submit a `Workflow` CRD and let the Argo controller own retries, parallelism, and pod scheduling from there — conceptually similar to how [Crossplane](/tools/crossplane/) hands infrastructure provisioning to a Kubernetes controller rather than a client-side script, and an instance of the broader [declarative control planes for agents](/patterns/declarative-control-planes-for-agents/) pattern.

## Origins and History

Argo (the workflow engine that became Argo Workflows) was created by Applatix, a Kubernetes-focused startup, and pushed to GitHub in August 2017; the team re-implemented the engine as a Kubernetes CRD that October. Applatix was acquired by Intuit in January 2018, and Intuit continued open-source development of Argo. Argo CD and Argo Events followed later in 2018, and Argo Rollouts in 2019, forming the four-project Argo Project. The project joined the CNCF Incubator in April 2020 and graduated in December 2022. Several of Argo's original creators later founded Akuity, a commercial vendor offering a managed Argo CD platform.

## Sources

1. https://argo-workflows.readthedocs.io/en/latest/
2. https://github.com/argoproj/argo-workflows
3. https://www.cncf.io/projects/argo/
4. https://www.cncf.io/blog/2020/04/07/toc-welcomes-argo-into-the-cncf-incubator/
5. https://www.cncf.io/announcements/2022/12/06/the-cloud-native-computing-foundation-announces-argo-has-graduated/
6. https://www.cncf.io/blog/2022/09/21/four-lessons-that-took-argo-from-first-commit-to-gitops-darling/
7. https://www.xgrid.co/resources/temporal-vs-argo-workflows-architecture-comparison/
8. https://www.intuit.com/blog/news-social/welcome-applatix-to-the-intuit-team/
