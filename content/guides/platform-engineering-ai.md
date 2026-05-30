---
title: "Building an ML/AI Internal Developer Platform"
description: "How to build an internal developer platform for AI/ML teams: service catalogs, golden paths for model deployment, self-service GPU provisioning, and reducing cognitive load on ML engineers."
date: 2026-03-28
categories: [Guides]
tags: [platform-engineering, developer-experience, mlops, infrastructure, backstage]
related:
  - glossary/platform-engineering
  - guides/ci-cd-for-ai
  - guides/capacity-planning-ai
  - patterns/microservices-for-ai
last_updated: 2026-05-30
---

AI/ML teams face infrastructure complexity that most backend teams do not encounter: GPU scheduling, CUDA version management, model artifact storage, experiment tracking, feature stores, and evaluation pipelines. Without a platform, each ML engineer becomes a part-time infrastructure engineer. An internal developer platform (IDP) for AI/ML solves this by providing self-service capabilities that abstract operational complexity while preserving the flexibility ML teams need.

## What to Build

An AI/ML IDP is not a single tool. It is a curated set of capabilities exposed through consistent interfaces.

### Service Catalog

Build a catalog of deployable service templates. Each template encodes best practices and produces a production-ready service:

- **Inference Service** - FastAPI or gRPC server with model loading, health checks, autoscaling configuration, Helm chart, CI/CD pipeline, and monitoring dashboard
- **Training Pipeline** - Argo Workflows or Kubeflow pipeline template with GPU node selection, artifact storage, experiment tracking integration, and cost tagging
- **Data Pipeline** - Spark or Flink job template with schema validation, data quality checks, and output registration in the data catalog
- **Evaluation Service** - Automated evaluation harness with test set management, metric computation, and regression detection

Teams instantiate these templates through a CLI or portal. The platform handles the boilerplate; the team fills in the model-specific logic.

### Self-Service GPU Provisioning

GPU access is the most common bottleneck for ML teams. The platform should provide:

- **On-demand GPU environments** - Request a Jupyter notebook or VSCode server with a specific GPU type (A100, H100, T4) and CUDA version. Provision in minutes, not days.
- **Training job submission** - Submit a training job with GPU requirements. The platform handles scheduling, preemption, and cost tracking.
- **Inference endpoint deployment** - Deploy a model to a GPU-backed endpoint with autoscaling. Specify the GPU type, minimum and maximum replicas, and scaling metric.

Use Kubernetes with GPU operators, Karpenter for node provisioning, and custom resource definitions for ML workloads.

### Golden Paths

A golden path for deploying an ML model might include:

1. Create a new service from the inference template
2. Add model loading code and inference logic
3. Write evaluation tests
4. Push to Git - CI runs tests, builds container, runs evaluation
5. Merge - CD deploys to staging, runs smoke tests
6. Promote to production with canary rollout

The platform provides every component in this chain. The ML engineer writes only step 2 and 3.

### Developer Portal

Use Backstage or a similar portal to provide a unified view:

- **Service ownership** - Which team owns which models, endpoints, and pipelines
- **Deployment status** - Current versions, rollout state, health
- **Cost attribution** - GPU hours, compute costs, and API costs per team and project
- **Documentation** - Runbooks, architecture diagrams, API specs, all linked from the service entry
- **On-call schedules** - Who to contact when an inference service has issues

## Implementation Approach

### Start with the Biggest Pain Point

Do not build the entire platform before delivering value. Survey your ML teams:

- If GPU provisioning takes days, start there
- If every team builds a different deployment pipeline, standardise inference deployment first
- If nobody knows what models are in production, build the service catalog first

### Treat the Platform as a Product

Platform engineering is product development. The ML teams are your users:

- **Interview users** - Understand their workflows, pain points, and workarounds
- **Measure adoption** - Track which golden paths are used and which are bypassed
- **Iterate** - Release improvements frequently based on user feedback
- **Document** - Self-service only works if the documentation is excellent

### Build on Existing Tools

Do not build custom solutions where mature tools exist:

| Capability | Tools |
|---|---|
| Developer portal | Backstage, Port, Cortex |
| Infrastructure provisioning | Terraform, Crossplane, Pulumi |
| Container orchestration | Kubernetes, EKS, GKE |
| CI/CD | GitHub Actions, GitLab CI, Argo CD |
| Experiment tracking | MLflow, Weights & Biases, Neptune |
| Feature store | Feast, Tecton, SageMaker Feature Store |

The platform team's job is integration and curation, not building everything from scratch.

## Measuring Success

Track these metrics to evaluate platform effectiveness:

- **Time to first deployment** - How long does it take a new ML engineer to deploy their first model?
- **Deployment frequency** - Are teams deploying more often with the platform?
- **Lead time for changes** - How quickly do code changes reach production?
- **Self-service ratio** - What percentage of infrastructure requests are handled by the platform vs manual tickets?
- **Developer satisfaction** - Regular surveys measuring ease of use and cognitive load

A successful AI/ML platform is one that ML engineers choose to use because it makes them faster, not one they are forced to use because it is mandated.
