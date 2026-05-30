---
title: "CI/CD Testing Strategy for AI Systems"
description: "Which tests to run at each CI/CD stage: PR-level unit tests, merge-level eval suites, scheduled regression and drift detection, cost budgets, and GitHub Actions examples."
date: 2026-03-28
categories: [Guides]
tags: [ci-cd, testing, github-actions, ai-engineering, automation]
related:
  - guides/testing-ai-systems
  - guides/test-environments-ai
  - guides/integration-testing-ai-pipelines
  - glossary/ci-cd
last_updated: 2026-05-30
---

AI systems need a tiered CI/CD testing strategy because different tests have vastly different costs and execution times. Running a full evaluation suite with real model API calls on every pull request is expensive and slow. Running only unit tests on merge to main misses quality regressions. The right approach runs the right tests at the right time.

## The Testing Tiers

### Tier 1: Every Pull Request

**What runs:** Unit tests, integration tests with mocked models, linting, type checking, prompt template snapshots.

**Cost:** $0 in API calls. Execution time under 5 minutes.

**Purpose:** Catch code bugs, interface mismatches, broken parsers, and unintentional prompt changes.

```yaml
# .github/workflows/pr-tests.yml
name: PR Tests
on: [pull_request]
jobs:
  unit-and-integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements-dev.txt
      - run: pytest tests/unit/ tests/integration/ -v --tb=short -x
      - run: mypy src/
      - run: ruff check src/
```

### Tier 2: Merge to Main

**What runs:** Everything from Tier 1 plus a focused evaluation suite with real model API calls. Run 50-100 curated test cases through the actual model and evaluate output quality.

**Cost:** $1-10 per run depending on model and test set size.

**Purpose:** Catch quality regressions introduced by code changes. Validate that prompts, parsers, and pipeline logic produce good results with real models.

```yaml
# .github/workflows/merge-eval.yml
name: Merge Evaluation
on:
  push:
    branches: [main]
jobs:
  eval-suite:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements-dev.txt
      - run: pytest tests/eval/ -v --tb=long
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          MODEL_NAME: gpt-4o-mini  # Use cheaper model for merge checks
      - uses: actions/upload-artifact@v4
        with:
          name: eval-results
          path: eval_results/
```

### Tier 3: Scheduled Full Regression

**What runs:** The complete evaluation suite with the production model, all golden dataset tests, retrieval quality benchmarks, and drift detection checks.

**Cost:** $20-100 per run.

**Purpose:** Catch model quality drift (the model provider updates the model), knowledge base degradation, and slow performance regressions. Runs nightly or weekly.

```yaml
# .github/workflows/nightly-eval.yml
name: Nightly Full Evaluation
on:
  schedule:
    - cron: "0 2 * * *"  # 2 AM UTC daily
jobs:
  full-eval:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements-dev.txt
      - run: pytest tests/eval/ tests/regression/ -v --tb=long
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          MODEL_NAME: gpt-4o  # Production model for full eval
      - name: Check for quality drift
        run: python scripts/check_quality_drift.py --baseline eval_baseline.json --results eval_results/latest.json
      - name: Alert on regression
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: '{"text": "Nightly eval failed. Check results."}'
```

### Tier 4: Pre-Deployment Gate

**What runs:** A focused smoke test against the staging environment with the production model. Verifies that the deployment artifact works correctly with real infrastructure.

**Cost:** $1-5 per deployment.

**Purpose:** Final validation before production. Catches environment-specific issues (wrong model version, missing API keys, network configuration).

## Cost Budgets for CI Model Calls

Set explicit monthly budgets for CI testing.

```python
# scripts/check_ci_budget.py
import os
import json

MONTHLY_BUDGET_USD = 500
COST_LOG = "ci_costs.json"

def log_cost(test_suite: str, cost_usd: float):
    costs = json.loads(open(COST_LOG).read()) if os.path.exists(COST_LOG) else []
    costs.append({"suite": test_suite, "cost": cost_usd, "date": datetime.now().isoformat()})
    with open(COST_LOG, "w") as f:
        json.dump(costs, f)

    month_total = sum(c["cost"] for c in costs if c["date"][:7] == datetime.now().strftime("%Y-%m"))
    if month_total > MONTHLY_BUDGET_USD * 0.8:
        print(f"WARNING: CI cost this month: ${month_total:.2f} / ${MONTHLY_BUDGET_USD}")
    if month_total > MONTHLY_BUDGET_USD:
        raise SystemExit(f"CI budget exceeded: ${month_total:.2f}")
```

Track costs per suite to identify which tests are most expensive. Often a small number of test cases account for most of the cost (long prompts with large contexts).

## Parallelizing Test Suites

AI eval suites can be parallelized since test cases are independent.

```yaml
jobs:
  eval:
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - run: pytest tests/eval/ --shard-id=${{ matrix.shard }} --num-shards=4
```

With pytest-xdist:

```bash
pytest tests/eval/ -n 4 --dist=loadgroup
```

Be mindful of API rate limits when parallelizing. Four parallel workers each sending model requests can hit rate limits that sequential execution would not. Add retry logic with exponential backoff.

## Prompt Change Detection

Trigger the eval suite automatically when prompts change, even if no code changes.

```yaml
on:
  push:
    paths:
      - "src/prompts/**"
      - "src/templates/**"
      - "config/model_config.yaml"
```

Prompt changes are the most common cause of quality regressions. A single word change in a system prompt can alter model behavior significantly. Always run the eval suite when prompts change.

## Reporting and Dashboards

Store evaluation results as CI artifacts and track them over time.

```python
# scripts/generate_eval_report.py
def generate_report(results: dict) -> str:
    return f"""
## Evaluation Report
- **Date:** {results['date']}
- **Model:** {results['model']}
- **Overall accuracy:** {results['accuracy']:.2%}
- **Faithfulness:** {results['faithfulness']:.2%}
- **Answer relevancy:** {results['relevancy']:.2%}
- **Regressions:** {results['regression_count']} / {results['total_cases']}
"""
```

Post evaluation summaries as PR comments when triggered by merge events. This gives reviewers immediate visibility into quality impact without downloading artifacts.

## Failure Response Playbook

When CI tests fail, the response depends on the tier.

**Tier 1 failure (PR):** The PR author fixes the issue. Tests must pass before merge.

**Tier 2 failure (merge to main):** Investigate immediately. If the eval suite detects a quality regression, consider reverting the merge while investigating.

**Tier 3 failure (nightly):** Could indicate model drift, knowledge base issues, or infrastructure problems. Investigate within one business day. Check if the model provider made changes.

**Tier 4 failure (pre-deployment):** Block the deployment. Fix the issue and re-run before proceeding.
