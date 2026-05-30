---
title: "Feature Flags"
description: "What feature flags are, how they enable safe AI model rollouts, A/B testing, and instant rollback - and the tools available for implementing them."
date: 2026-03-25
categories: [Glossary]
tags: ["software-engineering", "intermediate", "feature-flags", "progressive-delivery", "rollout", "experimentation", "deployment"]
related:
  - patterns/feature-flags-ai
  - guides/ci-cd-for-ai
  - glossary/ci-cd
  - patterns/circuit-breaker-ai
last_updated: 2026-05-30
---

A feature flag (also called a feature toggle or feature switch) is a configuration value that controls whether a specific feature or behaviour is active, without requiring a code deployment to change it. Features are wrapped in conditional checks that read the flag value at runtime. Changing the flag value changes behaviour immediately, across all running instances, without restarting the service.

## Basic Concept

Without feature flags:
```python
response = call_model("claude-opus-4-6", prompt)
```

With a feature flag:
```python
model = feature_flags.get("inference_model", default="claude-3-haiku")
response = call_model(model, prompt)
```

Changing the flag value from `"claude-3-haiku"` to `"claude-opus-4-6"` in the flag management system takes effect immediately for all new requests, without any code change or deployment.

## Why Feature Flags Matter for AI

Model deployments carry more risk than code deployments because the failure mode is subtle. A code bug either crashes or produces a wrong result that can be tested. A model quality regression produces outputs that are slightly worse - coherent, plausible-looking, but less accurate or less helpful. This kind of regression is hard to detect without live user traffic or careful evaluation.

Feature flags allow:

**Gradual rollout** - Route 5% of traffic to the new model, measure quality and error metrics, increase to 20%, then 50%, then 100%. Roll back instantly if metrics degrade.

**A/B testing** - Split traffic evenly between two models and measure which produces better downstream outcomes (lower escalation rate, higher satisfaction score, higher task completion rate).

**User segment targeting** - Give internal users or beta customers the new model first. Only roll out to all customers after validation.

**Instant kill switch** - If a model starts producing inappropriate or incorrect outputs in production, flip the flag to route all traffic back to the previous model. No deployment required.

## Feature Flag Tools

**AWS AppConfig** - Managed flag and configuration service within AWS. Integrates with CloudWatch alarms for automatic rollback when a metric threshold is breached. Good choice for AWS-native stacks. Free tier covers most use cases.

**LaunchDarkly** - Dedicated feature flag platform with sophisticated targeting rules, experimentation (A/B testing with statistical significance calculations), and integrations with observability tools. Priced per monthly active user. Industry standard for teams that need rich experimentation capabilities.

**Unleash** - Open-source feature flag platform. Can be self-hosted (free) or used as a managed service. Strong community support. Good choice for teams that want flag management without vendor lock-in.

**Environment variables** - The simplest possible feature flag. Set `MODEL_NAME=claude-opus-4-6` in your environment. Change it and restart. No dynamic updates, but sufficient for small projects where deployment is fast and rollback is acceptable.

## Flag Types for AI

**String flags** - Control which model, prompt template, or configuration variant to use. Most common for AI.

**Percentage rollout flags** - Route a percentage of traffic to a new variant. Increase the percentage over time as confidence grows.

**User targeting flags** - Activate a feature for specific users or user segments. Used for beta access and internal testing.

**Kill switch flags** - Boolean flags that disable a feature entirely. Defaults to enabled; flip to disabled in an emergency.

## Flag Hygiene

Feature flags are technical debt if left indefinitely. When a rollout is complete and the old model is retired, remove the flag and the conditional logic from the codebase. A codebase with many stale flags is harder to understand and maintain, and flags that reference removed functionality cause confusion during incident response.

## Sources

- Hodgson, P. (2017). Feature toggles (aka feature flags). *martinfowler.com*. (Canonical feature flags reference; defines toggle types (release, experiment, ops, permission) and flag lifecycle management.)
- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley. Chapter 10: Deploying and Releasing Applications. (Feature flags as a continuous delivery mechanism enabling trunk-based development.)
- Kohavi, R., Tang, D., & Xu, Y. (2020). *Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing*. Cambridge University Press. (A/B testing methodology that feature flags enable; experimental design for gradual model rollouts.)
