---
title: "CI/CD - Continuous Integration and Continuous Delivery"
description: "What CI/CD is, why it matters for AI projects, the tools involved, and the AI-specific considerations that extend standard pipelines."
date: 2026-03-25
categories: [Glossary]
tags: ["devops", "beginner", "ci-cd", "continuous-integration", "continuous-delivery", "automation", "pipelines"]
related:
  - guides/ci-cd-for-ai
  - guides/testing-ai-systems
  - glossary/feature-flags
  - glossary/property-based-testing
  - patterns/feature-flags-ai
last_updated: 2026-05-30
---

CI/CD stands for Continuous Integration and Continuous Delivery (or Continuous Deployment). It is a software engineering practice that automates the building, testing, and deployment of code changes.

<figure class="bz-figure">
  <img src="/img/obsidian-lab/pipeline-components-sequence-notext.png" alt="A sequence of connected pipeline components: code flows through build, test, and deploy stages in an automated sequence." loading="lazy">
  <figcaption>CI/CD is a pipeline. Code enters at one end, passes through automated build and test stages, and emerges as a deployed release. Every stage is automated, repeatable, and auditable.</figcaption>
</figure>

**Continuous Integration (CI)** means every code change is automatically built and tested when it is pushed to version control. The goal is to detect integration errors and quality regressions quickly - within minutes of a change being made - rather than discovering them days or weeks later when they are harder to diagnose.

**Continuous Delivery (CD)** means every change that passes CI is automatically prepared for release. The deployment to production may still require a manual approval step. Continuous Deployment goes one step further: passing CI triggers automatic deployment to production without manual intervention.

## Why CI/CD Matters for AI Projects

Standard software CI/CD tests whether code is correct. AI CI/CD must also test whether model outputs are good enough. This is a harder problem because "good enough" is a statistical property, not a binary pass/fail.

Without CI/CD, AI teams make changes to prompts, retrieval logic, or model configurations manually, test informally ("it looks better"), and deploy without a quality gate. Quality regressions slip through because no systematic comparison is made between the old and new version.

With CI/CD, every prompt change triggers an automated evaluation run. The pipeline measures quality metrics, compares to the baseline, and fails the deployment if quality has regressed. This brings the same discipline to AI quality that unit tests bring to code correctness.

## Standard CI/CD Tools

**GitHub Actions** - Workflow automation built into GitHub. Free tier covers most small-to-medium AI projects. Supports parallel jobs, reusable workflows, and integration with AWS and other cloud providers via official actions.

**GitLab CI** - Equivalent to GitHub Actions for teams using GitLab. Native integration with the GitLab container registry and Kubernetes runners.

**CircleCI** - Hosted CI/CD service with strong support for Docker-based workloads. Used by teams that need more execution environment control than GitHub Actions provides.

**Jenkins** - Self-hosted CI/CD server. High flexibility, high operational overhead. Appropriate for large enterprises with existing Jenkins infrastructure.

## AI-Specific CI/CD Considerations

**Evaluation gates** - Add an evaluation step after unit and integration tests. The evaluation step runs a curated test set against the proposed changes using the real model API (or a proxy) and compares scores to the baseline. Fail the pipeline if scores fall below threshold.

**Token cost management** - Model API calls in CI have a real cost. Use smaller, faster models for evaluation (Claude Haiku instead of Claude Opus) when evaluating quality dimensions that do not require the most capable model. Cache model responses for identical inputs across CI runs.

**Model artefact versioning** - If your pipeline includes fine-tuned models or custom embedding models, store them in S3 or a model registry with explicit version references. The CI pipeline should record which model version was evaluated and deployed.

**Secret management** - Model API keys are secrets. Store them in GitHub Actions secrets, AWS Secrets Manager, or equivalent. Never hardcode API keys in workflow files or application code.

**Flakiness handling** - Model outputs are non-deterministic. A test case that passes 80% of the time will occasionally fail CI even when nothing is wrong. Use deterministic evaluation metrics where possible, run evaluation multiple times and average scores, and set thresholds that account for expected variance.

## Sources

- Fowler, M., & Foemmel, M. (2006). Continuous integration. *ThoughtWorks*. (Original continuous integration article by Martin Fowler; defined the practice and rationale.)
- Humble, J., & Farley, D. (2010). *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation*. Addison-Wesley. (Definitive reference for CI/CD pipelines; defined the deployment pipeline concept.)
- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press. (DORA research; empirically demonstrated that CI/CD practices are the strongest predictor of software delivery performance.)
