---
title: "Strangler Fig Pattern for AI Migration"
description: "How to gradually replace manual processes and legacy rule-based systems with AI using the strangler fig pattern: routing traffic incrementally, maintaining fallback paths, and validating quality before full cutover."
date: 2026-03-25
categories: [Patterns]
tags: ["architecture", "advanced", "strangler-fig", "migration", "legacy-modernization", "ai-integration", "refactoring"]
related:
  - guides/ai-architecture-patterns
  - patterns/feature-flags-ai
  - patterns/circuit-breaker-ai
  - glossary/agentic-ai
  - guides/choosing-your-first-ai-use-case
last_updated: 2026-05-30
---

The Strangler Fig pattern was named and described by Martin Fowler in 2004, drawing on the metaphor of a strangler fig plant that grows around a host tree, gradually replacing it. The pattern describes a migration strategy: rather than replacing a legacy system all at once (a "big bang" migration), you incrementally route functionality through a new system while keeping the legacy system running. Over time, the new system handles more and more traffic until the legacy system can be retired.

For AI adoption, the strangler fig is the most practical migration pattern in enterprise settings. It avoids the binary choice of "build everything before going live" vs. "go live without validation," and it maintains a working fallback at every stage of the migration.

## The Core Pattern

The strangler fig works by placing a facade (a router or proxy) in front of the existing system. Initially, the facade routes all traffic to the legacy system. As the AI replacement is built and validated, the facade progressively routes more traffic to the AI system, while retaining the ability to route back to the legacy system at any time.

```
Requests -> [Facade/Router] -> Legacy System (100%)

           ... build and validate AI component ...

Requests -> [Facade/Router] -> AI System (20%) + Legacy System (80%)

           ... validate quality metrics ...

Requests -> [Facade/Router] -> AI System (80%) + Legacy System (20%)

           ... confirm quality ...

Requests -> [Facade/Router] -> AI System (100%)
                                  (Legacy system retired)
```

The key insight: the legacy system runs continuously until the AI system is proven. You are not betting on the AI working before you have evidence that it works.

## Applying the Pattern to AI Migration

### Phase 1: AI-Assist (Human-in-the-Loop)

The AI system is introduced as a tool for the humans doing the manual work, not as a replacement for them. The routing layer sends requests to both the legacy process and the AI, but a human reviews the AI output before it affects any downstream system.

This phase validates:
- Whether the AI output is useful (does it reduce human effort?)
- Whether the AI output is accurate (do humans accept it with minimal editing?)
- Whether the data flows correctly (can the AI reach the data it needs?)

Example: A document classification team currently classifies 500 documents per day manually. In Phase 1, the AI generates a suggested classification for each document, which a human reviewer accepts, modifies, or rejects. No automation; just a UI change that surfaces the AI suggestion alongside the document.

Measure: What percentage of AI suggestions are accepted without modification? This is the baseline accuracy metric that determines readiness for Phase 2.

### Phase 2: AI-First with Human Review for Exceptions

The AI system handles requests autonomously for the subset of cases where confidence is high. Cases below a confidence threshold are routed to a human reviewer (the legacy process).

The routing logic is now: confidence score above threshold -> AI handles it. Below threshold -> human handles it.

This phase validates:
- Whether the confidence threshold reliably identifies cases the AI gets right vs. wrong
- Whether throughput improvements justify continued investment
- Whether edge cases handled by humans reveal patterns the AI should learn

Example: Documents where the AI classification confidence exceeds 90% are classified automatically. Documents below 90% are routed to the human queue. Start with a conservative threshold (95%) and lower it as the team gains confidence.

Measure: Precision and recall of AI classifications in the autonomous subset. Error rate compared to human baseline. Throughput of the human queue (it should shrink as confidence is gained).

### Phase 3: AI-Primary with Sampling and Audit

The AI handles the large majority of cases autonomously. A random sample of AI-handled cases is audited by humans to maintain quality visibility. Edge cases identified as high-risk continue to route to humans.

The routing logic: AI handles everything except defined high-risk categories, with sampling for quality audit.

Example: 95% of documents are classified automatically. 5% are randomly sampled and reviewed weekly. Documents containing flagged terms (legal, regulatory, financial thresholds above X) still route to human review.

Measure: Quality metrics from the audit sample. Trend over time (is quality improving, stable, or degrading?). Cost per classification vs. baseline.

### Phase 4: Full AI Autonomy (Legacy Retirement)

When the AI has demonstrated sustained quality over a meaningful period, the sampling and audit process is the only remaining human touchpoint. The legacy manual process is retired. The facade routes 100% of traffic to the AI system.

The legacy system may be kept available for an emergency rollback window (30-90 days) before being decommissioned.

## The Fallback Path

The strangler fig's power comes from the maintained fallback. At every phase, there must be a defined path back to the previous state. This requires:

**The facade is always in place** - Even at Phase 4, requests go through the facade. The facade is what makes routing decisions and what makes rollback possible. Do not bypass it once the AI is running well.

**The legacy process remains operational** - Until full retirement, the legacy system or manual process must be able to handle the full load. Do not let it decay during the migration.

**Rollback is tested** - At each phase transition, test that routing back to the legacy path works. A rollback path that has never been exercised will not work when you need it.

**Rollback criteria are defined** - Before each phase transition, define the specific quality metric thresholds that would trigger a rollback. This prevents debates during an incident about whether to roll back.

## Implementation with AWS

**Traffic routing:** AWS API Gateway with stage variables and Lambda authorizers for routing logic. AWS Application Load Balancer weighted target groups for percentage-based routing.

**Feature flags:** AWS AppConfig for dynamic routing configuration without redeployment. Change the routing percentage without a code deploy.

**Quality monitoring:** Amazon CloudWatch dashboards tracking AI accuracy metrics alongside system metrics. CloudWatch Alarms that trigger when quality metrics drop below thresholds.

**Audit sampling:** Amazon Kinesis Data Firehose to capture a sample of AI decisions to S3 for human review.

**Circuit breaker:** Combine with the circuit breaker pattern (see [Circuit Breaker for AI Systems](../circuit-breaker-ai/)) to automatically route back to the legacy path when the AI error rate exceeds a threshold.

## Common Mistakes

**Skipping the AI-assist phase** - Teams eager to show automation results skip human-in-the-loop validation and go straight to Phase 2. This removes the opportunity to calibrate the confidence threshold with real human feedback.

**Retiring the legacy process too early** - The legacy process is retired before the AI has demonstrated sustained quality over a meaningful period. When the first quality issue appears, there is no fallback.

**Ignoring the long tail of edge cases** - The first 80% of cases are handled well by the AI; the remaining 20% (unusual formats, exception categories, ambiguous inputs) are not. These edge cases surface in Phase 3. Phase 2 accuracy metrics can look good while Phase 3 audit metrics reveal a quality gap.

**Routing by volume instead of by confidence** - Routing "20% of requests to the AI" (random selection) is weaker than routing "requests where confidence > 90% to the AI." The former validates volume; the latter validates calibration.

**Not measuring the right thing** - Measuring model accuracy in isolation (does the AI output the right answer in a test set?) does not measure business outcomes. Measure the thing that matters: time saved, error rate compared to human baseline, downstream process quality.

## Sources and Further Reading

- Fowler, M. "StranglerFigApplication" (2004). [https://martinfowler.com/bliki/StranglerFigApplication.html](https://martinfowler.com/bliki/StranglerFigApplication.html) - The original description of the strangler fig pattern.
- Fowler, M. "Strangler Fig" in *Patterns of Enterprise Application Architecture.* - Extended treatment of the migration pattern.
- AWS Documentation: AWS Application Load Balancer weighted target groups. [https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html)
- AWS Documentation: AWS AppConfig (feature flags and dynamic configuration). [https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html](https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html)
- Newman, S. (2021). *Building Microservices: Designing Fine-Grained Systems* (2nd ed.). O'Reilly Media. - Chapter on migration patterns includes extended treatment of strangler fig.
- Related pattern: [Circuit Breaker for AI Systems](../circuit-breaker-ai/) - automatic fallback routing when AI quality degrades.
- Related pattern: [Feature Flags for AI](../feature-flags-ai/) - progressive rollout and kill-switch capabilities.
