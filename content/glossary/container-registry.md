---
title: "Container Registry"
description: "What container registries are, how ECR, Docker Hub, Azure ACR, and GCP Artifact Registry compare, and patterns for AI workload container management."
date: 2026-03-24
categories: [Glossary]
tags: ["devops", "beginner", "container-registry", "docker", "images", "ecr", "kubernetes"]
last_updated: 2026-05-30
---

A container registry is a storage and distribution system for container images. Container images (Docker images) are versioned, layered archives containing an application and all its dependencies. Registries store these images and serve them to container runtimes (Lambda, ECS, Fargate, Kubernetes) at deployment time.

## Why Container Registries Matter for AI

AI workloads frequently use containers rather than ZIP-based Lambda deployments because:

- **Large dependencies** - machine learning libraries (PyTorch, TensorFlow, OpenCV) often exceed Lambda's 250 MB ZIP limit. Container images can be up to 10 GB on Lambda.
- **Complex system dependencies** - FFmpeg, GDAL (for geospatial), or custom compiled libraries require system packages not available in the standard Lambda runtime.
- **Reproducibility** - the same container image runs identically in development, CI, and production.
- **Custom runtimes** - any language or runtime that runs in Linux runs in a container.

## AWS: Amazon ECR

Amazon Elastic Container Registry (ECR) is AWS's managed container registry. It integrates with IAM for access control, Lambda for container image deployment, ECS/Fargate for task definitions, and EKS for Kubernetes workloads.

Key features:
- **Private registries** - images accessible only within your AWS account (or via cross-account policies)
- **ECR Public** - public registry for sharing images (similar to Docker Hub)
- **Lifecycle policies** - automatically clean up untagged images older than N days
- **Vulnerability scanning** - Basic scanning (on push) or Enhanced scanning (continuous, powered by Amazon Inspector) detects known CVEs in image layers
- **Image replication** - replicate images to multiple regions for multi-region deployments

ECR authentication integrates with the AWS CLI: `aws ecr get-login-password | docker login`. Lambda and ECS pull images from ECR using the task's IAM execution role - no credentials to manage.

## Docker Hub

Docker Hub is the default public registry for the Docker ecosystem. Most public base images (python:3.12, node:20, ubuntu:22.04) originate from Docker Hub. For private images, Docker Hub offers paid plans but rate-limits anonymous pulls.

For production AI workloads on AWS, use ECR rather than Docker Hub: ECR avoids rate limiting, keeps images in the same region as your workloads (faster pull times), and uses IAM instead of username/password.

## Azure: Azure Container Registry (ACR)

ACR is Microsoft's managed container registry. It integrates with Azure Container Apps, AKS, and Azure Functions for container deployments. Geo-replication is a first-class ACR feature (replicate to multiple Azure regions from one registry). ACR Tasks automates build pipelines triggered by base image updates.

## GCP: Artifact Registry

Google Cloud Artifact Registry (successor to Container Registry / GCR) stores Docker images, Helm charts, npm packages, and Python packages in one service. It integrates with Cloud Build, Cloud Run, and GKE. Artifact Registry supports per-repository IAM permissions for fine-grained access control.

## Image Tagging Strategy

Effective tagging enables reliable deployments and rollbacks:

- `latest` - do not rely on this in production; it is ambiguous
- Semantic version (`v1.4.2`) - explicit, correlates to Git tags
- Git commit SHA (`abc1234`) - precise, immutable reference for CI/CD
- Environment + version (`prod-v1.4.2`) - indicates deployment context

For AI applications, include the model version or configuration hash in the tag when the image embeds model weights or prompts.

## Related Articles

- [Serverless Computing]({{< relref "serverless.md" >}}) - Lambda supports container image deployment
- [Terraform]({{< relref "/tools/terraform.md" >}}) - IaC for ECR lifecycle policies and permissions
- [Infrastructure as Code]({{< relref "infrastructure-as-code.md" >}}) - managing registry configuration

## Sources

- Merkel, D. (2014). Docker: Lightweight Linux containers for consistent development and deployment. *Linux Journal*, 239. (Docker container image format and registry architecture; the foundation for modern container registries.)
- Burns, B., Grant, B., Oppenheimer, D., Brewer, E., & Wilkes, J. (2016). Borg, Omega, and Kubernetes. *ACM Queue*, 14(1), 70–93. (Container orchestration at scale; image distribution and registry requirements for cluster-scale deployments.)
- AWS. (2024). *Amazon ECR User Guide*. Amazon Web Services. (ECR private registries, lifecycle policies, vulnerability scanning, and cross-account access configuration.)
