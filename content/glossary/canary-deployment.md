---
title: "Canary Deployment"
description: "What canary deployment is, how gradual traffic shifting works, which metrics to watch, and how to configure automatic rollback triggers for AI model releases."
date: 2026-03-25
categories: [Glossary]
tags: ["devops", "intermediate", "canary-deployment", "progressive-rollout", "deployment", "risk-management", "release"]
related:
  - patterns/canary-deployment
  - patterns/blue-green-deployment
  - guides/ci-cd-ai-detailed
  - tools/amazon-lambda
  - glossary/observability
last_updated: 2026-05-30
---

Canary deployment is a release technique that gradually shifts production traffic from an existing version to a new version, monitoring for regressions at each stage before proceeding to the next. The name refers to the historical practice of using canaries in coal mines as early warning systems: a small percentage of users (the "canary") encounters the new version first, and problems surface before the full user base is affected.

The technique is also known as progressive delivery, phased rollout, or weighted traffic routing, depending on the tooling and context.

## How It Works

A traffic routing mechanism - a load balancer, Lambda alias weights, or API Gateway - splits incoming requests between the current version and the new version according to a configured percentage. The typical progression is:

1. Deploy new version to production infrastructure
2. Route 5% of traffic to the new version; 95% continues to the current version
3. Monitor key metrics for a defined observation period (typically 10-30 minutes)
4. If metrics are healthy, increase to 25%, then 50%, then 100%
5. At each stage, if a metric threshold is breached, automatically or manually revert to 0% on the new version

The key advantage over blue-green deployment is the observation window: rather than an all-or-nothing switch, canary deployment builds evidence of the new version's behaviour under real production traffic at each stage.

## Metrics to Watch

The metrics monitored during a canary deployment determine whether the rollout proceeds or rolls back. Appropriate metrics depend on the workload.

**For any production service:**
- Error rate (HTTP 5xx errors, application exceptions)
- Request latency at p50, p95, and p99
- Availability (successful requests / total requests)

**For AI and LLM services specifically:**
- Token usage per request (sudden increases may indicate prompt injection or runaway generation)
- Guardrail block rate (increases may indicate the new version behaves differently under adversarial inputs)
- Response length distribution (significant changes suggest quality differences)
- Output schema validation failures (if responses are parsed for structured data)
- Cost per request (derived from token counts)

**User experience signals (lagging indicators):**
- Downstream error rates in services consuming AI responses
- Explicit user feedback if your application collects it
- Support ticket volume (often not available quickly enough for automated rollback but useful for manual review)

## Automatic Rollback Triggers

Manual monitoring of canary deployments is error-prone. Automatic rollback triggers are configured as CloudWatch alarms that fire when a metric crosses a threshold, which then triggers a Lambda function or Step Functions workflow to reduce the canary weight to zero.

**Example thresholds:**
- Error rate > 5% sustained for 5 minutes
- Latency p95 > 10 seconds for 5 minutes
- Token usage per request > 150% of baseline for 10 minutes
- Guardrail block rate > 10 blocks per minute for 5 minutes

The rollback action is identical in both manual and automatic cases: set the canary traffic weight to zero and alert the team. The previous version was never taken offline, so rollback is instant.

## Canary vs Blue-Green

Both patterns provide zero-downtime deployment and instant rollback. The choice between them depends on the deployment context.

Canary is preferred when:
- Model quality changes are the primary risk (gradual observation catches subtle regressions)
- You can afford the longer deployment window (30-90 minutes to reach 100%)
- You want to limit blast radius during the rollout

Blue-green is preferred when:
- The deployment must complete in minutes
- The new version has been exhaustively validated in staging and evaluation risk is low
- You want the simplest possible traffic management (no percentage weights to manage)

For AI services in production, canary deployment is generally the safer choice for model updates, while blue-green is appropriate for application-layer code changes where the model itself has not changed.

## Sources and Further Reading

- Fowler, M. "CanaryRelease." Martin Fowler's Bliki. [https://martinfowler.com/bliki/CanaryRelease.html](https://martinfowler.com/bliki/CanaryRelease.html)
- AWS Documentation: Lambda aliases with weighted routing. [https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html)
- AWS Documentation: SageMaker canary traffic shifting. [https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-canary.html](https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-canary.html)
- AWS Documentation: Amazon CloudWatch alarms. [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)
