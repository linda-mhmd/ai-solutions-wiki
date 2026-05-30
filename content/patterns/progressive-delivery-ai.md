---
title: "Progressive Delivery for AI Deployments"
description: "Combining feature flags, canary releases, and automated rollback for AI model deployments: AI-specific metrics, shadow mode testing, and gradual traffic shifting for inference services."
date: 2026-03-28
categories: [Patterns]
tags: [progressive-delivery, canary, feature-flags, rollback, deployment, ai-engineering]
related:
  - glossary/progressive-delivery
  - patterns/feature-flags-ai
  - guides/ci-cd-for-ai
last_updated: 2026-05-30
---

Deploying a new AI model is riskier than deploying a new application version. A model that passes evaluation tests can still fail on production traffic: edge cases the test set does not cover, latency differences under real load, or subtle quality degradation that metrics catch only at scale. Progressive delivery addresses this by gradually exposing new models to production traffic while monitoring AI-specific metrics and automatically rolling back when quality degrades.

## The Pattern

Progressive delivery for AI combines three mechanisms:

1. **Feature flags** control which model version serves each request
2. **Canary traffic splitting** gradually shifts traffic from the old model to the new one
3. **Automated analysis** compares metrics between old and new, triggering rollback if the new model underperforms

## Implementation with Argo Rollouts

Argo Rollouts provides Kubernetes-native progressive delivery with analysis runs:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: inference-service
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 5
        - pause: {duration: 10m}
        - analysis:
            templates:
              - templateName: ai-quality-check
            args:
              - name: canary-hash
                valueFrom:
                  podTemplateHashValue: Latest
        - setWeight: 25
        - pause: {duration: 15m}
        - analysis:
            templates:
              - templateName: ai-quality-check
        - setWeight: 50
        - pause: {duration: 15m}
        - analysis:
            templates:
              - templateName: ai-quality-check
        - setWeight: 100
```

The rollout progresses through stages: 5% traffic for 10 minutes, analyse, 25% for 15 minutes, analyse, 50% for 15 minutes, analyse, then full rollout. Any failed analysis triggers automatic rollback.

## AI-Specific Analysis Metrics

Standard canary metrics (error rate, latency) are necessary but not sufficient for AI deployments. Add AI-specific metrics:

### Response Quality

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: ai-quality-check
spec:
  metrics:
    - name: error-rate
      provider:
        prometheus:
          query: |
            sum(rate(inference_errors_total{rollout_hash="{{args.canary-hash}}"}[10m]))
            /
            sum(rate(inference_requests_total{rollout_hash="{{args.canary-hash}}"}[10m]))
      successCondition: result[0] < 0.01

    - name: p95-latency
      provider:
        prometheus:
          query: |
            histogram_quantile(0.95,
              rate(inference_latency_seconds_bucket{rollout_hash="{{args.canary-hash}}"}[10m]))
      successCondition: result[0] < 2.0

    - name: quality-score
      provider:
        prometheus:
          query: |
            avg(inference_quality_score{rollout_hash="{{args.canary-hash}}"})
      successCondition: result[0] > 0.85

    - name: hallucination-rate
      provider:
        prometheus:
          query: |
            sum(rate(inference_hallucination_total{rollout_hash="{{args.canary-hash}}"}[10m]))
            /
            sum(rate(inference_requests_total{rollout_hash="{{args.canary-hash}}"}[10m]))
      successCondition: result[0] < 0.05
```

### Cost Metrics

New models may use more tokens or require longer inference times:

- **Tokens per request** - A new model that generates 2x more tokens costs 2x more
- **GPU utilisation** - A larger model may saturate GPU memory, reducing throughput
- **Cache hit rate** - A model with different output patterns may invalidate caches

## Shadow Mode Testing

Before canary deployment, run the new model in shadow mode:

1. Production traffic goes to the current model (serves the response)
2. The same request is duplicated to the new model (response is discarded)
3. Both responses are logged and compared offline

Shadow mode catches issues without any user impact. Compare:
- Response length distribution
- Confidence score distribution
- Specific output patterns (formatting, tone, factual accuracy on known-good queries)
- Latency characteristics

Shadow testing is especially valuable for LLM deployments where output differences are qualitative and hard to capture in a single metric.

## Feature Flag Integration

Use feature flags for fine-grained control beyond traffic percentage:

```python
from openfeature import api

client = api.get_client()

def get_model_version(user_context):
    return client.get_string_value(
        "inference-model-version",
        default_value="v1.2",
        evaluation_context=user_context,
    )
```

Feature flags enable:
- **User segment targeting** - Roll out the new model to internal users first, then beta users, then all users
- **Instant kill switch** - Disable the new model immediately if issues are discovered, without a deployment
- **A/B testing** - Run two model versions simultaneously for comparison, with consistent assignment per user

## Rollback Triggers

Define explicit rollback criteria before deployment:

| Metric | Threshold | Action |
|---|---|---|
| Error rate | > 1% | Automatic rollback |
| P95 latency | > 2x baseline | Automatic rollback |
| Quality score | < 0.85 | Automatic rollback |
| Hallucination rate | > 5% | Automatic rollback |
| Cost per request | > 1.5x baseline | Alert, manual review |

Automatic rollback should complete within 2 minutes of detection. Every minute of degraded AI output erodes user trust.

The key principle: optimise for safe deployment, not fast deployment. A model that takes an hour to roll out safely is better than one that deploys in 5 minutes and causes a 30-minute incident.
