---
title: "Progressive Delivery"
description: "What progressive delivery means, how feature flags, canary releases, and automated rollback combine to reduce deployment risk for AI systems."
date: 2026-03-28
categories: [Glossary]
tags: [progressive-delivery, feature-flags, canary, rollback, deployment]
related:
  - patterns/progressive-delivery-ai
  - patterns/feature-flags-ai
  - guides/ci-cd-for-ai
last_updated: 2026-05-30
---

Progressive delivery is a deployment strategy that gradually exposes new code or model versions to increasing percentages of traffic while monitoring key metrics. If metrics degrade, the system automatically rolls back. If metrics hold, traffic shifts continue until the new version serves 100% of requests.

The term, popularised by James Governor of RedMonk, extends continuous delivery by adding fine-grained control over who sees what and when. Continuous delivery gets code to production quickly. Progressive delivery ensures it gets to users safely.

## Key Mechanisms

**Feature Flags** - Boolean or multivariate toggles that control whether a user sees a new feature. Feature flags decouple deployment from release: code reaches production but remains dormant until the flag is enabled. LaunchDarkly, Flagsmith, and open-source options like OpenFeature provide flag management with targeting rules, percentage rollouts, and kill switches.

**Canary Releases** - A new version receives a small percentage of production traffic (often 1-5%) while the existing version handles the rest. Metrics are compared between the canary and baseline. If error rates, latency, or business metrics degrade beyond a threshold, the canary is terminated. Argo Rollouts and Flagger automate this on Kubernetes.

**Blue-Green Deployments** - Two identical environments exist. Traffic routes entirely to one (blue). The new version deploys to the other (green). After validation, traffic switches to green. Rollback is an instant switch back to blue. Simpler than canary but provides less gradual validation.

**Automated Rollback** - Monitoring systems evaluate canary metrics against predefined success criteria. If the canary fails, rollback happens automatically without human intervention. This is the critical difference between progressive delivery and manual canary testing.

## Why AI Systems Need Progressive Delivery

AI systems have failure modes that standard integration tests cannot catch. A model might produce syntactically valid but semantically wrong output. Latency might increase only for certain input distributions. Retrieval quality might degrade for specific query types.

Progressive delivery catches these issues by exposing the new version to real traffic and real users before full rollout. Combined with AI-specific metrics (response relevance scores, hallucination rates, token costs), progressive delivery provides a safety net that testing alone cannot.

The cost of a bad AI deployment is often higher than a bad backend deployment. Users lose trust in AI systems faster than in traditional software. Progressive delivery reduces that risk.

## Sources

- Governor, J. (2018). Progressive delivery: The next step after CI/CD. *RedMonk*. (Coined "progressive delivery"; defined the combination of feature flags, canary releases, and automated rollback.)
- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley. Chapter 10: Deploying and Releasing Applications. (Blue-green deployments and canary releases as continuous delivery patterns; foundational for progressive delivery.)
- Kohavi, R., Tang, D., & Xu, Y. (2020). *Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing*. Cambridge University Press. (Experimental design for traffic splitting; methodology behind automated canary success criteria.)
