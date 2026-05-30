---
title: "CI/CD Pipelines for AI Projects"
description: "Building reliable CI/CD pipelines for AI projects: model artifact management, automated evaluation gates, GitHub Actions workflows, and deployment strategies that prevent quality regressions."
date: 2026-03-25
categories: [Guides]
tags: ["devops", "intermediate", "ci-cd", "mlops", "deployment", "automation", "pipelines"]
related:
  - glossary/ci-cd
  - guides/testing-ai-systems
  - patterns/feature-flags-ai
  - patterns/microservices-for-ai
  - tools/amazon-sagemaker
last_updated: 2026-05-30
---

CI/CD for AI projects extends standard continuous integration with model-specific concerns: evaluation gates that test output quality, artifact management for models and embeddings, and deployment strategies that allow gradual rollout and fast rollback. The pipeline infrastructure is familiar; the evaluation logic is new.

## What Belongs in an AI CI/CD Pipeline

A complete AI CI/CD pipeline covers:

1. **Code quality** - Linting, type checking, unit tests for deterministic components
2. **Integration tests** - Pipeline assembly tests with mocked model APIs
3. **Evaluation gate** - Run the curated test set against the proposed changes and fail the pipeline if quality metrics regress
4. **Artifact build** - Package the application, generate new embeddings if the embedding model changed, update the vector index
5. **Staging deployment** - Deploy to a staging environment and run smoke tests
6. **Production deployment** - Deploy with a canary rollout strategy, monitor metrics, promote or rollback

## GitHub Actions Workflow Structure

```yaml
name: AI Pipeline CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: pytest tests/unit/ -v
      - run: pytest tests/integration/ -v --mock-models

  evaluate:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - name: Run evaluation suite
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: python scripts/evaluate.py --test-set eval/test_cases.jsonl --threshold 0.80
      - name: Post evaluation results
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('eval_results.json'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Evaluation Results\n- Faithfulness: ${results.faithfulness}\n- Relevance: ${results.relevance}\n- Pass: ${results.passed}`
            });

  deploy-staging:
    needs: evaluate
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        run: ./scripts/deploy.sh staging
      - name: Smoke test
        run: pytest tests/smoke/ --env staging

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production (canary)
        run: ./scripts/deploy.sh production --canary 10
      - name: Monitor canary
        run: ./scripts/monitor-canary.sh --duration 600 --threshold 0.95
```

## Evaluation Gates

An evaluation gate runs your test set against the proposed changes and fails the CI job if quality metrics fall below a defined threshold.

**Designing the test set** - Your evaluation test set should cover the distribution of production queries. Include:
- Typical queries (most common patterns in production)
- Edge cases (very short queries, very long documents, queries with no good answer)
- Regression cases (queries that previously caused failures)
- Domain-specific cases (if your application serves multiple domains, test each)

**Setting thresholds** - Start with your current production quality as the baseline. Set thresholds slightly below baseline to catch meaningful regressions without blocking on noise. A 3-5% drop from baseline is usually a meaningful signal.

**Handling flakiness** - Model outputs vary between runs. Run each test case twice and average the evaluator scores to reduce variance. For critical test cases, run three times.

## Model Artifact Management

If your pipeline includes custom model artefacts (fine-tuned model weights, custom embedding models, generated vector indices), manage them as versioned artefacts separate from application code.

**S3 as artefact store** - Store model weights, embedding indices, and evaluation datasets in S3 with versioned paths: `s3://your-bucket/models/embedding-model/v3/`. Reference the artefact version in your deployment configuration.

**Triggering re-embedding** - Track whether the embedding model version has changed. If it has, the CI pipeline should trigger a re-embedding job (SageMaker Processing job, Fargate task, or Glue job) and update the vector index before deploying application code.

**Artefact promotion** - A model artefact trained in staging should be promoted to production rather than retrained. This guarantees that what was evaluated in staging is exactly what runs in production.

## Deployment Strategies

**Blue/green deployment** - Maintain two identical environments. Route traffic to the new environment after deployment passes smoke tests. Rollback by switching traffic back to the old environment. Works well for stateless AI services.

**Canary deployment** - Route a small percentage of traffic to the new version. Increase percentage over time if metrics remain healthy. Most appropriate when you cannot fully replicate production query distribution in staging.

**Shadow deployment** - Send production traffic to both old and new versions simultaneously. Compare outputs without exposing users to the new version. Useful for measuring quality differences before any user impact.

## Handling Evaluation in Pull Requests

For collaborative teams, run evaluation on every pull request that changes prompts, models, pipeline logic, or evaluation data. Post results as a PR comment so reviewers can see the quality impact before merging.

Evaluation results that should appear in the PR comment:
- Overall pass/fail for the evaluation gate
- Score for each evaluation dimension (faithfulness, relevance, accuracy)
- A diff of which test cases improved and which degraded
- Cost of running the evaluation (tokens consumed)

This makes prompt engineering changes as reviewable as code changes.
