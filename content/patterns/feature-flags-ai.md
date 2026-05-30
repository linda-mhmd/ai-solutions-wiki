---
title: "Feature Flags for AI Model Deployment"
description: "Using feature flags to safely roll out AI model changes: A/B testing models, canary deployments, gradual traffic shifting, and instant rollback without redeployment."
date: 2026-03-25
categories: [Patterns]
tags: ["software-engineering", "intermediate", "feature-flags", "ai-deployment", "rollout", "experimentation", "progressive-delivery"]
related:
  - glossary/feature-flags
  - patterns/circuit-breaker-ai
  - patterns/microservices-for-ai
  - guides/ci-cd-for-ai
  - guides/testing-ai-systems
last_updated: 2026-05-30
---

Model deployments are not like code deployments. A code change is either correct or incorrect - tests can verify it. A model change produces outputs that are statistically better or worse, and that difference often only becomes visible under real production traffic with real user queries. Feature flags give you control over which model handles which traffic, enabling safe rollout, A/B comparison, and instant rollback without redeployment.

## What Feature Flags Enable for AI

**Canary deployment** - Route 5% of traffic to the new model, monitor quality metrics and error rates, then increase the percentage gradually. If metrics degrade, cut back to 0% without a deployment.

**A/B testing models** - Split traffic evenly between model A and model B. Measure downstream outcomes (user satisfaction score, task completion rate, escalation rate to humans) to determine which model performs better in production.

**User segment targeting** - Roll out a new model to internal users first, then beta customers, then all customers. Users who opted into early access get the new model; others get the stable version.

**Kill switch** - Instantly disable a new model version if it starts producing bad outputs in production. No deployment required.

**Model versioning** - Pin specific customers or use cases to a specific model version for stability, while other customers get the latest model.

## Flag Design for Model Selection

A model selection flag is a string-valued flag rather than a boolean:

```json
{
  "flag": "inference_model",
  "default": "claude-3-haiku",
  "rules": [
    {
      "condition": {"user_segment": "internal"},
      "value": "claude-opus-4-6"
    },
    {
      "condition": {"rollout_percentage": 10},
      "value": "claude-sonnet-4-6"
    }
  ]
}
```

The inference service reads this flag at request time, not at startup. This allows changes to take effect without restarting the service.

## Metrics to Monitor During Rollout

A model rollout flag without metrics monitoring is just adding risk without control. Define your quality metrics before enabling the flag:

**Output quality metrics** - Human ratings (sampled), automated evaluation scores (using an evaluator model), task-specific metrics (accuracy, F1, ROUGE for summarisation).

**Operational metrics** - Latency (p50, p95, p99), error rate (timeouts, malformed responses, rate limits), token consumption per request.

**Business metrics** - For customer-facing applications: user satisfaction, task completion, escalation rate, return rate on queries.

Alert when any metric degrades beyond a threshold compared to the control group. Most feature flag platforms support automatic kill switches that flip the flag back to default when a metric alert fires.

## Implementing with AWS AppConfig

AWS AppConfig is a managed feature flag and configuration service integrated into the AWS console.

1. Create an AppConfig application, environment (prod/staging), and configuration profile.
2. Store your model selection configuration as a JSON document in AppConfig.
3. Use a deployment strategy that controls rollout speed (10% of targets per interval, with CloudWatch alarm as a rollback trigger).
4. In your Lambda or ECS service, use the AppConfig Lambda extension or SDK to retrieve the configuration. AppConfig caches the config locally and polls for updates, adding negligible latency.

```python
import boto3

appconfig = boto3.client('appconfigdata')

def get_model_config(session_token):
    response = appconfig.get_latest_configuration(ConfigurationToken=session_token)
    return json.loads(response['Configuration'].read())
```

AppConfig supports rollback triggers linked to CloudWatch alarms. If your error rate alarm fires during deployment, AppConfig automatically reverts to the previous configuration.

## Implementing with LaunchDarkly

LaunchDarkly is a dedicated feature flag platform with richer targeting and experimentation capabilities.

```python
import ldclient
from ldclient.config import Config

ldclient.set_config(Config("your-sdk-key"))
client = ldclient.get()

def get_model_for_user(user_id, user_segment):
    context = ldclient.Context.create({
        "kind": "user",
        "key": user_id,
        "segment": user_segment
    })
    model_name = client.variation("inference_model", context, "claude-3-haiku")
    return model_name
```

LaunchDarkly's experimentation feature can track downstream metrics (provided via events) and calculate statistical significance of differences between flag variants.

## Separating Prompt Flags from Model Flags

Model selection is one dimension of a flag-controlled rollout. Prompt changes are another. Keep them separate:

- `inference_model` - which model to call
- `system_prompt_version` - which system prompt template to use
- `retrieval_top_k` - how many documents to retrieve
- `response_format` - structured JSON vs. freeform text

This granularity allows you to identify which change drove a quality improvement or degradation. A flag that controls model and prompt simultaneously makes it impossible to attribute the cause.

## Flag Hygiene

Feature flags accumulate. Set a cleanup date when creating any flag. Once a rollout is complete and the old model is fully retired, remove the flag from the codebase. Dead flags that remain in code are a maintenance burden and a source of confusion during incident response.
