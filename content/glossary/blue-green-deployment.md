---
title: "Blue-Green Deployment"
description: "What blue-green deployment is, how it works, why it matters for zero-downtime AI model updates, and how it compares to canary and rolling deployments."
date: 2026-03-25
categories: [Glossary]
tags: ["devops", "intermediate", "blue-green-deployment", "zero-downtime", "deployment", "release", "rollback"]
related:
  - patterns/blue-green-deployment
  - patterns/canary-deployment
  - guides/ci-cd-ai-detailed
  - tools/amazon-lambda
last_updated: 2026-05-30
---

Blue-green deployment is a release technique that maintains two identical production environments - one active (serving traffic), one idle (available for deployment) - and switches traffic between them when releasing a new version. The two environments are conventionally named "blue" and "green," with the active environment alternating between the two colours on each deployment.

The technique was originally described and named by Daniel Terhorst-North and Jez Humble in the context of continuous delivery, and later popularised by Martin Fowler's writing on deployment patterns.

## How It Works

At any point in time, one environment is designated as live and receives all production traffic. The other environment is idle but fully provisioned and ready. The deployment sequence is:

1. Deploy the new version to the idle environment
2. Run automated tests against the idle environment
3. Switch the load balancer, DNS, or alias to point to the idle environment
4. The previously idle environment becomes live; the previously live environment becomes idle
5. Keep the previously live environment running as a rollback target

The switch in step 3 is instantaneous. From the user's perspective, there is no deployment window - traffic simply moves from one version to another without downtime.

## The Critical Property: Instant Rollback

Blue-green deployment's primary value is not zero-downtime deployment. It is instant rollback. Because the previous version remains running throughout the deployment and validation period, rolling back is identical in cost and speed to the original switch: flip the alias back.

This is fundamentally different from a rolling deployment (where the old version is gradually replaced and recovery requires redeployment) or an in-place deployment (where recovery requires reverting code and restarting, a process that takes minutes or more).

## Application to AI Systems

AI model updates have an unusual failure mode: they can degrade quality without producing any technical errors. A new prompt template might produce responses that are technically valid JSON, return HTTP 200, and complete in acceptable time - but contain hallucinations or miss important context that the previous version handled correctly.

Blue-green deployment helps with this failure mode because:

**The previous version stays running.** If quality issues surface 30 minutes after deployment (for example, through user feedback or quality monitoring), rolling back is immediate. There is no need to redeploy the previous version.

**Testing on real infrastructure before switching.** Smoke tests run against the new version in the idle environment before any user traffic is affected. Integration tests that call real Bedrock APIs can validate output format and basic quality.

**Clean version separation.** At any moment, you know exactly which version is live and which is idle. There is no state where some users are on the old version and others are on the new version (that is canary deployment, a separate pattern).

## Comparison with Related Patterns

**Canary deployment** gradually shifts a percentage of traffic to the new version (e.g. 5%, then 25%, then 100%). It provides a longer observation window with limited blast radius at each stage. It is more complex to implement than blue-green and requires traffic splitting infrastructure. Blue-green is binary (all-or-nothing); canary is gradual.

**Rolling deployment** replaces instances of the old version with the new version one at a time. It has no idle environment cost but provides no instant rollback - reverting requires a new rolling deployment in the opposite direction. It is the default deployment strategy for Kubernetes and ECS services.

**In-place deployment** replaces the running version on existing infrastructure. The simplest approach operationally, but carries the highest risk: there is no previous version running to roll back to.

| Strategy | Downtime | Rollback speed | Infrastructure cost | Complexity |
|---|---|---|---|---|
| Blue-green | None | Instant | 2x during deployment | Low |
| Canary | None | Instant (reduce weight) | 2x during rollout | Medium |
| Rolling | Minimal | Slow (new rolling deploy) | No overhead | Low |
| In-place | Brief | Slow (redeploy) | No overhead | Lowest |

## Sources and Further Reading

- Fowler, M. "BlueGreenDeployment." Martin Fowler's Bliki. [https://martinfowler.com/bliki/BlueGreenDeployment.html](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- Humble, J. and Farley, D. (2010). *Continuous Delivery*. Addison-Wesley. Chapter 10: Deploying and Releasing Applications.
- AWS Documentation: Lambda aliases for traffic shifting. [https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html)
