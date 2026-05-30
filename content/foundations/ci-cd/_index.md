---
title: "Continuous Integration and Continuous Delivery"
description: "The discipline of keeping software in a releasable state at all times through automated build, test, and deployment pipelines. CI/CD is the operational foundation that makes everything else sustainable."
layout: single
tags: ["ci-cd", "continuous-integration", "continuous-delivery", "deployment", "pipelines"]
categories: ["Foundations"]
last_updated: 2026-05-30
---

Jez Humble and David Farley published *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation* in 2010. The book codified practices that leading software teams had been developing for nearly a decade, formalizing them into a coherent discipline. The central premise is straightforward: if releasing software is painful, the solution is to do it more often, not less, until the pain is reduced through automation, feedback, and practice.

Before CI/CD, software releases were infrequent events - quarterly, monthly, sometimes weekly. The infrequency made each release large, complex, and high-risk. The risk justified making them infrequent. This feedback loop produced release processes that required dedicated teams, multi-day freezes, and elaborate coordination. Continuous Delivery breaks the loop by making releases small, automated, and routine.

---

## Continuous Integration

Continuous Integration is the practice of merging all developer working copies to a shared main branch multiple times per day. The integration is "continuous" in the sense that integration happens constantly rather than at the end of a development cycle.

Martin Fowler described CI in his 2006 article "Continuous Integration" (building on earlier work with Kent Beck at Chrysler): the practice requires a shared source repository, an automated build, automated tests that validate the build, and a policy that the main branch is always in a working state.

The value of CI is not the automation itself. It is the feedback loop. When integration happens continuously, integration failures are discovered within minutes, while the code that caused them is fresh in the developer's memory. When integration happens weekly or monthly, failures are discovered after days of divergent work, and the cause is buried under layers of unrelated changes.

**The broken build is the highest priority.** A CI discipline requires that a broken main branch is fixed immediately, before any new work proceeds. A broken build that persists means new changes are piling up on top of unknown brokenness. The discipline only works if the constraint is honored.

---

## The Deployment Pipeline

Humble and Farley's deployment pipeline is the technical implementation of CI/CD. It is an automated manifestation of the process of getting software from version control to production. Every code change passes through the same pipeline. The pipeline's job is to assert confidence in the change at each stage.

A standard pipeline structure:

```
Commit
  |
  v
[ Compile / Build ]
  |
  v
[ Unit Tests ]         -- fast feedback, seconds
  |
  v
[ Static Analysis ]    -- lint, type check, security scan
  |
  v
[ Integration Tests ]  -- slower, minutes
  |
  v
[ Acceptance Tests ]   -- full behavior verification
  |
  v
[ Deploy to Staging ]
  |
  v
[ Smoke Tests ]        -- is it alive?
  |
  v
[ Manual Gate? ]       -- optional: human approval
  |
  v
[ Deploy to Production ]
```

Each stage provides a specific kind of confidence. Unit tests verify component logic. Integration tests verify boundaries. Acceptance tests verify user-facing behavior. The staging deployment verifies that the deployment process itself works. Each stage fails fast if something is wrong, preventing the change from proceeding to more expensive stages.

The pipeline must be fast enough to provide actionable feedback. Humble and Farley recommend the commit stage (build + unit tests) completes in under 10 minutes. Longer pipelines discourage developers from running them locally and encourage batching changes, which defeats the purpose.

---

## Continuous Delivery vs. Continuous Deployment

These are related but distinct:

**Continuous Delivery** means every change is releasable to production at any time. The pipeline verifies this. Whether to actually deploy is a business decision, not a technical one. A team practicing CD can deploy multiple times per day but may choose not to.

**Continuous Deployment** means every change that passes the pipeline is automatically deployed to production. No human approval. The pipeline is the gatekeeper.

Most organizations practice Continuous Delivery rather than Continuous Deployment. Some parts of the business (medical devices, financial systems, regulated industries) require human approval even when the software is technically ready.

---

## Feature Flags

Feature flags (also called feature toggles or feature gates) decouple deployment from release. A feature is deployed to production behind a flag - available in the codebase but not active for users. The flag is enabled separately, often without a code deployment.

This separation solves several problems. Long-lived feature branches create integration debt; flags allow unfinished features to be deployed to production (dark launching) without being visible to users. Flags allow incremental rollout to subsets of users. They allow instant rollback by disabling a flag rather than reverting a deployment.

```
if feature_flags.is_enabled("new-checkout-flow", user_id):
    return new_checkout_flow(cart)
else:
    return legacy_checkout_flow(cart)
```

Feature flags introduce complexity: flag logic must eventually be removed (flag debt accumulates quickly), flags must be tested in all configurations, and flag state becomes distributed operational knowledge. They are a tool for specific problems, not a default development pattern.

---

## Deployment Strategies

**Blue-Green Deployment**: Two identical production environments (blue and green) exist simultaneously. One is live; the other is idle. A new version is deployed to the idle environment. After verification, traffic is switched from the live environment to the newly deployed one. Rollback is instant: switch traffic back. The cost is double the infrastructure.

**Canary Release**: A new version is deployed to a small subset of production traffic (the "canary" instances) while the majority continues on the old version. Metrics are monitored. If the canary behaves well, the release proceeds to full traffic. If not, the canary is removed. The risk window is narrow and the impact radius is small.

**Rolling Deployment**: Instances are updated one at a time (or in small batches) while the rest continue serving traffic. The new version is gradually replacing the old version across the fleet. There is a period where both versions are running simultaneously; this requires the two versions to be compatible (database migrations must be backward compatible, API contracts must be honored by both versions).

---

## Infrastructure as Code

Treating infrastructure configuration as source code - versioned, tested, and deployed through the same pipeline as application code - is a prerequisite for reliable CI/CD at scale. Tools like Terraform, Pulumi, and Ansible make environments reproducible and changes auditable.

Infrastructure drift (where production differs from what the code specifies because of manual changes) is one of the most common sources of hard-to-diagnose production incidents. Infrastructure as Code prevents drift by making the code the authoritative source of truth.

---

## How This Applies to AI Systems

AI systems introduce several dimensions of change that classical CI/CD does not handle by default: model versions, prompt versions, evaluation results, and external API dependencies are all moving parts with their own deployment and rollback concerns.

**Model versioning in the pipeline.** When a new model version becomes available (GPT-4o, Claude Sonnet 3.7, Llama 4), deploying it requires the same rigor as deploying new application code. The pipeline should include an evaluation stage that runs the new model version against a golden dataset and compares results to the previous version. A regression in evaluation scores blocks the deployment, just as a failing unit test blocks a code deployment.

**Prompt deployment pipelines.** Prompts are code. A change to a system prompt should trigger the pipeline, run evaluation tests, and require a passing evaluation gate before the change reaches production. This is not how most teams manage prompts today - prompts are often edited in production without version control - but it is how they should be managed in systems where prompt quality matters.

**A/B testing LLM responses.** Feature flags for AI systems often control which model, which prompt version, or which retrieval strategy is active. Blue-green deployment of prompt versions, with automatic rollback if evaluation scores drop below a threshold, is a practical pattern for safe prompt iteration.

**Automated evaluation gates.** The acceptance test stage of an AI pipeline runs automated evaluations: does the system answer a representative sample of questions correctly? Does it hallucinate on the known hard cases? Does latency stay within bounds? Does cost per request stay within budget? These gates prevent regressions from reaching production automatically.

**Canary releases for model changes.** Deploying a new model version to 5% of traffic and monitoring output quality metrics before rolling out fully is the AI equivalent of a canary release. The monitoring requires evaluation logic - not just latency and error rate, but output quality signals.

**Rollback strategy for AI systems.** Rollback in AI systems is more complex than rolling back application code. A model that has been serving users may have influenced downstream state (written to databases, sent emails, updated records). Rollback logic must account for this. The deployment pipeline should make the rollback scope explicit: what is rolled back, and what is not.

### Related Pages
- [Testing Strategy](/foundations/testing-strategy/) - evaluation frameworks are the testing pyramid for AI components in the CI/CD context
- [Security Fundamentals](/foundations/security/) - secrets management for API keys in CI/CD pipelines
- [API Design](/foundations/api-design/) - versioning strategy for AI service APIs deployed through pipelines
