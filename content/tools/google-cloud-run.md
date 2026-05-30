---
title: "Cloud Run - Serverless Container Platform"
description: "Google Cloud Run is a fully managed serverless platform for running containerized applications that scale automatically from zero to thousands of instances."
date: 2026-03-28
categories: [Tools]
tags: [gcp, google-cloud, serverless, containers, compute, microservices]
related:
  - tools/aws-fargate
  - tools/google-cloud-functions
  - tools/google-vertex-ai
  - tools/google-cloud-pub-sub
last_updated: 2026-05-30
---

Google Cloud Run is a fully managed serverless platform for deploying and running containerized applications. You package your application as a container image, deploy it to Cloud Run, and the platform handles provisioning, scaling (including to zero), load balancing, TLS certificates, and HTTPS endpoint creation. Cloud Run supports any programming language, framework, or binary that can run in a container, giving it more flexibility than Cloud Functions while maintaining serverless operational simplicity.

Cloud Run is increasingly central to AI application architectures on GCP. It provides the compute layer for serving AI-powered APIs, web applications, and microservices. Common patterns include: hosting inference APIs that call Vertex AI models with custom pre/post-processing logic, serving AI chatbots and conversational applications, running document processing services that combine Document AI with custom business logic, and deploying MLOps tools and dashboards. Cloud Run's support for up to 32 GiB memory and 8 vCPUs per instance makes it capable of running moderately sized ML models directly, and GPU support (in preview) enables serving larger models without dedicated infrastructure.

Cloud Run services respond to HTTPS requests, while Cloud Run jobs execute batch tasks to completion. Services scale based on concurrent requests, with configurable minimum instances (to avoid cold starts) and maximum instances (to control cost). Cloud Run integrates with Eventarc for event-driven processing, Pub/Sub for asynchronous messaging, Cloud SQL and Firestore for data persistence, and Secret Manager for credentials. Cloud Run also supports multi-container deployments (sidecars) for patterns like service mesh proxies, logging agents, and AI model serving alongside application logic. The platform is built on Knative, the open-source Kubernetes-based serverless platform, ensuring portability to any Knative-compatible environment.

## Key Capabilities

- **Any Language, Any Framework** - Deploy any application packaged as a container, with no language or framework restrictions, unlike function-as-a-service platforms.
- **Scale to Zero** - Instances scale down to zero when idle, eliminating cost for inactive services, and scale up within seconds when requests arrive.
- **GPU Support** - GPU-attached instances (in preview) for serving ML models, running inference, and other GPU-accelerated workloads without managing infrastructure.
- **Multi-Container Pods** - Sidecar containers for service mesh, logging, monitoring, and other cross-cutting concerns deployed alongside the main application container.

## AWS Equivalent

Cloud Run is Google Cloud's counterpart to AWS Fargate (serverless containers) combined with aspects of AWS App Runner (simplified container deployment). Fargate runs containers on ECS or EKS without managing servers but requires more configuration around task definitions, services, and load balancers. Cloud Run provides a simpler deployment model -- a single `gcloud run deploy` command -- with automatic HTTPS endpoints. App Runner offers a similar simplicity but lacks Cloud Run's event-driven and scale-to-zero capabilities.

## Origins and History

Cloud Run was announced at Google Cloud Next 2019 in April 2019 and reached general availability in November 2019. Built on Knative, it was Google's answer to the growing demand for serverless containers that combined the flexibility of containers with the operational simplicity of functions-as-a-service. Cloud Run for Anthos (running on GKE) was launched simultaneously but was later deprecated in favor of standalone Cloud Run. Cloud Run jobs, for batch workloads, reached GA in 2022. Multi-container support (sidecars) was introduced in 2023. GPU support entered preview in 2023, positioning Cloud Run as a platform for AI inference workloads. In 2024, Cloud Run added support for VPC-native networking and direct VPC egress.

## Sources

1. Google Cloud Documentation. "Cloud Run overview." https://cloud.google.com/run/docs/overview/what-is-cloud-run
2. Google Cloud Blog. "Cloud Run, a managed compute platform for deploying containers." April 2019. https://cloud.google.com/blog/products/serverless/announcing-cloud-run-the-newest-member-of-our-serverless-compute-stack
