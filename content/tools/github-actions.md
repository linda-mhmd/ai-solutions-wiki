---
title: "GitHub Actions - CI/CD for AI Projects"
description: "GitHub Actions workflow syntax, Hugo deployment pattern, Python testing pipelines, Docker builds, Terraform plan/apply, and model evaluation as a CI step for AI projects."
date: 2026-03-25
categories: [Tools]
tags: ["devops", "beginner", "github-actions", "ci-cd", "automation", "pipelines", "deployment"]
related:
  - guides/ci-cd-ai-detailed
  - guides/infrastructure-as-code-ai
  - glossary/ci-cd
  - patterns/blue-green-deployment
  - patterns/canary-deployment
last_updated: 2026-05-30
---

GitHub Actions is GitHub's built-in CI/CD platform. Workflows are defined as YAML files in `.github/workflows/` and triggered by repository events (push, pull request, tag, schedule). Each workflow consists of jobs, each job consists of steps, and steps run shell commands or call reusable actions from the GitHub Actions marketplace.

**Azure equivalent:** Azure DevOps Pipelines.
**GCP equivalent:** Google Cloud Build.

## Workflow Syntax Fundamentals

```yaml
name: AI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  AWS_REGION: eu-west-1
  PYTHON_VERSION: '3.12'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run tests
        run: pytest tests/ -v --tb=short
```

Key concepts:
- `on:` defines the trigger events
- `env:` sets environment variables available to all jobs
- `jobs:` defines parallel or sequential job groups
- `steps:` are sequential within a job
- `uses:` calls a reusable action (e.g. `actions/checkout@v4`)
- `run:` executes shell commands

## Hugo Deployment Pattern

Hugo is a static site generator. All of Linda's wiki sites use GitHub Actions to build Hugo and deploy to GitHub Pages or S3. This is the standard pattern:

```yaml
# .github/workflows/deploy.yml
name: Deploy Hugo Site

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive  # required for Hugo themes as git submodules
          fetch-depth: 0          # full history for .Lastmod to work

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: '0.147.0'
          extended: true          # required for SCSS/Sass processing

      - name: Build
        run: hugo --minify

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

For S3 deployment (when hosting on AWS CloudFront):
```yaml
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::${{ vars.AWS_ACCOUNT_ID }}:role/github-deploy
          aws-region: ${{ env.AWS_REGION }}

      - name: Deploy to S3
        run: |
          aws s3 sync ./public s3://${{ vars.SITE_BUCKET }}/ \
            --delete \
            --cache-control "max-age=3600"

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ vars.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

## Python Testing Pipeline

A complete Python test pipeline for an AI Lambda function:

```yaml
name: Python CI

on: [push, pull_request]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: 'pip'

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-dev.txt

      - name: Lint with ruff
        run: ruff check src/ tests/

      - name: Type check with mypy
        run: mypy src/

      - name: Unit tests
        run: pytest tests/unit/ -v --cov=src --cov-report=xml

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage.xml
```

Integration tests (calling real AWS services) run only on merges to main, gated by AWS credentials:
```yaml
  integration-tests:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    needs: lint-and-test

    permissions:
      id-token: write  # required for OIDC authentication
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::${{ vars.AWS_ACCOUNT_ID }}:role/github-integration-test
          aws-region: eu-west-1

      - name: Integration tests
        run: pytest tests/integration/ -v -m integration
        env:
          BEDROCK_MODEL_ID: anthropic.claude-haiku-4-5-20251001
          ENVIRONMENT: test
```

## Docker Build and Push to ECR

For SageMaker inference containers or ECS deployments:

```yaml
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::${{ vars.AWS_ACCOUNT_ID }}:role/github-ecr-push
          aws-region: eu-west-1

      - name: Login to ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push
        env:
          REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          REPOSITORY: ai-inference
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $REGISTRY/$REPOSITORY:$IMAGE_TAG .
          docker push $REGISTRY/$REPOSITORY:$IMAGE_TAG
          # Also tag as latest for human reference (do not use latest in IaC)
          docker tag $REGISTRY/$REPOSITORY:$IMAGE_TAG $REGISTRY/$REPOSITORY:latest
          docker push $REGISTRY/$REPOSITORY:latest
```

## Terraform Plan and Apply

Infrastructure changes require plan review before apply. The standard pattern runs `plan` on pull requests (output visible in the PR as a comment) and `apply` on merge to main:

```yaml
  terraform-plan:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'

    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: '1.10.0'

      - name: Terraform init
        run: terraform -chdir=infra/environments/staging init

      - name: Terraform plan
        id: plan
        run: |
          terraform -chdir=infra/environments/staging plan \
            -var-file=staging.tfvars \
            -out=plan.tfplan \
            -no-color 2>&1 | tee plan-output.txt

      - name: Comment plan on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const plan = fs.readFileSync('plan-output.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '## Terraform Plan\n```\n' + plan.slice(-60000) + '\n```'
            });
```

## Model Evaluation as a CI Step

Include model evaluation in the pipeline to catch quality regressions before deployment:

```yaml
  evaluate-model:
    runs-on: ubuntu-latest
    needs: lint-and-test
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::${{ vars.AWS_ACCOUNT_ID }}:role/github-bedrock-eval
          aws-region: eu-west-1

      - name: Run model evaluation
        run: |
          python scripts/evaluate_model.py \
            --test-cases data/evaluation-cases.json \
            --model-id anthropic.claude-sonnet-4-5-20251001-v2:0 \
            --prompt-template prompts/rag-prompt-template.txt \
            --output evaluation-results.json

      - name: Check evaluation threshold
        run: |
          python scripts/check_evaluation_threshold.py \
            --results evaluation-results.json \
            --min-accuracy 0.80

      - name: Upload evaluation results
        uses: actions/upload-artifact@v4
        with:
          name: evaluation-results-${{ github.sha }}
          path: evaluation-results.json
```

## Origins and History

GitHub announced Actions in limited public beta at GitHub Universe on October 16, 2018, in San Francisco. The announcement positioned Actions not as a traditional CI/CD pipeline product but as a general-purpose workflow automation system built on open-source principles. At launch, workflows were defined in a custom HCL-like syntax, and each action step ran inside a Docker container on GitHub's servers.

Industry analyst James Governor of RedMonk described the Universe 2018 launch as "low key revolutionary," noting that GitHub was embracing and extending CI/CD. The announcement was immediately seen as a competitive threat to established CI services such as CircleCI and Travis CI, which had built their businesses on tight GitHub integration.

Between the beta and general availability, GitHub made a significant design change: the workflow definition format was switched from HCL to YAML, aligning with the configuration language already familiar to most DevOps practitioners. GitHub Actions reached general availability at Universe 2019 in November, with full CI/CD capabilities including matrix builds, artifact storage, and caching.

## Sources

1. GitHub Blog. "GitHub Actions: built by you, run by us." October 17, 2018. [https://blog.github.com/2018-10-17-action-demos/](https://blog.github.com/2018-10-17-action-demos/)
2. Governor, J. "GitHub Universe 2018: Low Key Revolutionary." RedMonk. November 7, 2018. [https://redmonk.com/jgovernor/2018/11/07/github-universe-2018-low-key-revolutionary/](https://redmonk.com/jgovernor/2018/11/07/github-universe-2018-low-key-revolutionary/)
3. InfoQ. "GitHub Release Developer Workflow Tools: Actions, Suggested Changes & Security Alerts." October 2018. [https://www.infoq.com/news/2018/10/github-universe-2018-actions/](https://www.infoq.com/news/2018/10/github-universe-2018-actions/)
4. GitHub Blog. "New from Universe 2019: GitHub for mobile, GitHub Archive Program, and more." November 2019. [https://github.blog/news-insights/product-news/universe-day-one/](https://github.blog/news-insights/product-news/universe-day-one/)
5. GitHub Documentation: GitHub Actions. [https://docs.github.com/en/actions](https://docs.github.com/en/actions)
6. GitHub Documentation: Workflow syntax reference. [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
7. AWS Documentation: Configuring OpenID Connect in Amazon Web Services. [https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
8. peaceiris/actions-hugo. [https://github.com/peaceiris/actions-hugo](https://github.com/peaceiris/actions-hugo)
9. aws-actions/configure-aws-credentials. [https://github.com/aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)
