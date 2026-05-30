---
title: "Disaster Recovery for AI Systems"
description: "How to plan disaster recovery for AI systems: RTO/RPO targets, multi-region model serving, model artifact backup, and failover strategies for inference and data pipelines."
date: 2026-03-28
categories: [Guides]
tags: [disaster-recovery, high-availability, multi-region, rto, rpo, ai-engineering]
related:
  - guides/incident-management-ai
  - guides/capacity-planning-ai
  - glossary/error-budget
last_updated: 2026-05-30
---

Disaster recovery (DR) for AI systems extends standard DR planning with concerns unique to ML workloads: model artifacts that take hours to retrain, vector indexes that require rebuilding, feature stores with complex state, and GPU capacity that may not be available in the failover region. A DR plan that covers only the application tier but ignores the model and data tiers will fail when tested.

## RTO and RPO Definitions

**Recovery Time Objective (RTO)** - The maximum acceptable time between the disaster and service restoration. An RTO of 15 minutes means the system must be serving requests within 15 minutes of a region failure.

**Recovery Point Objective (RPO)** - The maximum acceptable amount of data loss measured in time. An RPO of 1 hour means you can tolerate losing up to 1 hour of data (model updates, feature store changes, user interactions).

Set RTO and RPO per component, not globally:

| Component | RTO | RPO | Rationale |
|---|---|---|---|
| Inference endpoint | 5 minutes | N/A (stateless) | Direct user impact |
| Feature store | 15 minutes | 5 minutes | Stale features degrade quality |
| Vector index | 30 minutes | 1 hour | Can serve with slightly stale index |
| Training pipeline | 4 hours | 24 hours | Training is not real-time critical |
| Evaluation pipeline | 4 hours | 24 hours | Can pause without user impact |

## Multi-Region Inference

### Active-Active

Both regions serve production traffic simultaneously. A global load balancer (AWS Global Accelerator, CloudFront, Route 53 latency-based routing) routes users to the nearest healthy region.

Requirements:
- Model artifacts deployed to both regions
- Inference infrastructure provisioned in both regions (including GPU capacity)
- Feature store replicated or accessible from both regions
- Vector index replicated or served from a globally accessible endpoint

Active-active provides the lowest RTO (near zero) but doubles infrastructure costs.

### Active-Passive

The primary region serves all traffic. The secondary region has infrastructure provisioned but idle or scaled down. On failure, DNS or load balancer shifts traffic to the secondary region.

Requirements:
- Model artifacts stored in the secondary region (S3 cross-region replication)
- Infrastructure defined as code, ready to scale up
- GPU capacity reserved or available on-demand in the secondary region
- Automated failover triggered by health checks

Active-passive is cheaper but has a non-zero RTO while the secondary region scales up. GPU availability in the secondary region is the biggest risk - if on-demand GPU capacity is exhausted, failover fails.

## Model Artifact Backup

Model artifacts are the core asset. Losing a trained model means retraining, which can take hours to days and cost thousands in compute.

- **S3 Cross-Region Replication** - Replicate the model artifact bucket to the DR region. Use S3 versioning to protect against accidental deletion.
- **Model Registry Replication** - If using MLflow or SageMaker Model Registry, replicate the registry database and artifact store.
- **Container Image Replication** - Replicate ECR images to the DR region using ECR replication rules or cross-region image copies in CI/CD.

## Vector Index Recovery

Vector indexes (Pinecone, OpenSearch, pgvector) are expensive to rebuild because they require re-embedding source documents. Plan for this:

- **Replicated vector database** - Use a managed service with built-in replication (Pinecone, OpenSearch with cross-cluster replication)
- **Source data backup** - Keep the source documents and embeddings in durable storage (S3). If the index is lost, rebuild from the stored embeddings rather than re-embedding from source documents.
- **Index snapshots** - Take regular snapshots of the vector index. Store snapshots in the DR region.

## Feature Store Recovery

Feature stores maintain computed features for online inference. Recovery depends on the store type:

- **Online store** (DynamoDB, Redis) - Use DynamoDB global tables or Redis cross-region replication for continuous sync
- **Offline store** (S3, data warehouse) - S3 cross-region replication. The offline store is the source of truth; the online store can be rebuilt from it.

## DR Testing

A DR plan that has never been tested is a wish, not a plan. Test quarterly:

1. **Tabletop exercise** - Walk through the failover procedure with the team. Identify gaps in documentation and assumptions.
2. **Component failover** - Fail over individual components (database, feature store) and verify recovery.
3. **Full region failover** - Simulate a complete region failure. Route traffic to the DR region. Validate inference quality, latency, and data freshness.
4. **Chaos engineering** - Inject failures in production (with safeguards). Kill GPU nodes, degrade network, throttle storage. Verify that the system degrades gracefully.

Document the results of each test. Track the actual RTO and RPO achieved versus the targets. Fix gaps before the next test.
