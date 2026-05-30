---
title: "Incident Management for AI Systems"
description: "How to handle incidents in AI systems: on-call rotations, escalation policies, AI-specific runbooks, and post-incident reviews for model and infrastructure failures."
date: 2026-03-28
categories: [Guides]
tags: [incident-management, on-call, sre, runbooks, observability, ai-engineering]
related:
  - glossary/aiops
  - glossary/error-budget
  - guides/disaster-recovery-ai
last_updated: 2026-05-30
---

AI systems fail in ways that traditional software does not. A model can produce confidently wrong answers without raising errors. Inference latency can degrade gradually as GPU memory fragments. Retrieval quality can drop silently when embedding drift goes undetected. Incident management for AI systems must handle both infrastructure failures and model quality degradation.

## On-Call Structure

### Who Is On-Call

AI systems span multiple domains. A single on-call rotation rarely covers all failure modes:

- **Infrastructure on-call** - Handles compute, networking, storage, and Kubernetes issues. Responds to node failures, scaling problems, and resource exhaustion.
- **ML/AI on-call** - Handles model quality, evaluation failures, data drift, and retrieval degradation. Requires domain knowledge to distinguish a model bug from expected behaviour on edge cases.
- **Data on-call** - Handles pipeline failures, data quality issues, and source system outages. Responds when training data or feature store updates fail.

Small teams may combine these into a single rotation. Larger organisations split them with clear escalation paths between tiers.

### Escalation Policy

Define escalation clearly before incidents occur:

1. **L1 (5 minutes)** - Alert fires, on-call engineer is paged. Acknowledge within 5 minutes.
2. **L2 (15 minutes)** - If no acknowledgment, escalate to secondary on-call.
3. **L3 (30 minutes)** - If unresolved, escalate to the team lead and relevant domain expert.
4. **Executive (60 minutes)** - For customer-impacting incidents lasting more than 30 minutes, notify engineering leadership.

Use PagerDuty, Opsgenie, or Incident.io for automated escalation.

## AI-Specific Runbooks

Standard runbooks cover infrastructure failures. AI systems need additional runbooks for model and data failures.

### Model Quality Degradation

**Symptoms**: Evaluation metrics drop, user complaints increase, downstream system accuracy decreases.

**Steps**:
1. Check if a new model version was recently deployed. Compare evaluation metrics between current and previous versions.
2. Check data freshness. Is the feature store receiving updates? Is the vector index current?
3. Check for data distribution shift. Compare recent input distributions against the training distribution.
4. If a recent model deployment caused the issue, rollback to the previous version.
5. If data drift is the cause, trigger a retraining pipeline with recent data.

### Inference Latency Spike

**Symptoms**: P95 or P99 latency exceeds SLO, timeout rate increases.

**Steps**:
1. Check GPU utilisation and memory. Are GPUs saturated? Is memory fragmented?
2. Check request queue depth. Is the system overloaded? Scale up replicas if auto-scaling has not triggered.
3. Check for input anomalies. Are requests suddenly larger (longer prompts, bigger documents)?
4. Check upstream dependencies. Is the vector database, feature store, or model provider slow?
5. If GPU memory fragmentation is the cause, perform a rolling restart of inference pods.

### Retrieval Quality Failure

**Symptoms**: Retrieved documents are irrelevant, RAG system returns wrong information.

**Steps**:
1. Check if the embedding model or index was recently updated.
2. Verify the vector database is healthy and returning results.
3. Run a set of known-good queries against the retrieval system and compare results to expected output.
4. Check if source documents were recently updated or deleted.
5. If the index is corrupted, trigger a reindex from the source data.

## Severity Levels

Define severity relative to user impact:

| Severity | Description | Response Time | Example |
|---|---|---|---|
| SEV1 | Complete service outage | Immediate | Inference endpoint returns 500 for all requests |
| SEV2 | Major degradation | 15 minutes | Model quality dropped 30%, affecting most users |
| SEV3 | Partial degradation | 1 hour | Latency elevated for 10% of requests |
| SEV4 | Minor issue | Next business day | Evaluation pipeline failed for non-critical test set |

## Post-Incident Review

After every SEV1 and SEV2 incident, conduct a blameless post-incident review:

- **Timeline** - What happened, when, and what actions were taken
- **Root cause** - Why did the failure occur? Distinguish between proximate cause and contributing factors
- **Detection** - How was the incident detected? Could it have been detected earlier?
- **Resolution** - What fixed the issue? How long did it take?
- **Action items** - What changes will prevent recurrence or improve detection? Assign owners and deadlines.

Post-incident reviews are not blame exercises. They are learning opportunities. If your review identifies a person as the root cause, you have not dug deep enough. Ask why the system allowed the error to propagate.
