---
title: "CI/CD for AI Projects - A Complete Pipeline Guide"
description: "A detailed walkthrough of a CI/CD pipeline for AI: source control, Docker builds, model evaluation, staged deployment, and drift monitoring with GitHub Actions and Terraform."
date: 2026-03-25
categories: [Guides]
tags: ["devops", "advanced", "ci-cd", "mlops", "automation", "deployment", "testing"]
related:
  - glossary/ci-cd
  - guides/infrastructure-as-code-ai
  - patterns/blue-green-deployment
  - patterns/canary-deployment
  - tools/github-actions
  - patterns/model-versioning
last_updated: 2026-05-30
---

Continuous integration and continuous deployment (CI/CD) for AI projects extends the standard software pipeline with model-specific stages: model evaluation, artifact versioning, and drift detection. A team that skips these stages ships model updates without knowing whether the new version is better than the old one. This article describes a complete CI/CD pipeline for an AI project, covering each stage with concrete examples.

## What Goes in Source Control

An AI project has more versioned artefacts than a standard application. Source control should contain:

**Code:**
- Inference handler (Lambda function code, FastAPI application)
- Prompt templates (version-controlled as text files, not hardcoded in application code)
- Data preprocessing scripts
- Evaluation scripts and test fixtures

**Configuration:**
- Model ID and version pins (never float to "latest" in production)
- Bedrock agent configuration (instruction text, knowledge base IDs)
- Infrastructure as code (Terraform modules or CDK stacks)
- Deployment environment configuration (dev/staging/prod parameter files)

**What does not go in source control:**
- Model weights (use S3 with versioning enabled)
- Training datasets (use S3 with strict access control)
- Secrets (use AWS Secrets Manager or GitHub Actions secrets)

## Pipeline Stages

### Stage 1: Source (Trigger)

The pipeline triggers on:
- Pull request opened (runs tests, does not deploy)
- Merge to `main` (runs tests + deploys to staging)
- Tag push `v*` (deploys to production after manual approval)

```yaml
# .github/workflows/ai-pipeline.yml
on:
  push:
    branches: [main]
    tags: ['v*']
  pull_request:
    branches: [main]
```

### Stage 2: Build

The build stage creates the deployable artefacts.

**Lambda package build:**
```yaml
- name: Build Lambda package
  run: |
    pip install -r requirements.txt -t ./package/
    cp -r src/ ./package/
    cd package && zip -r ../function.zip .
```

**Docker image build (for SageMaker or ECS deployments):**
```yaml
- name: Build and push Docker image
  run: |
    docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$GITHUB_SHA .
    docker push $ECR_REGISTRY/$ECR_REPOSITORY:$GITHUB_SHA
```

Always tag Docker images with the Git commit SHA, not "latest". This makes rollbacks deterministic: you always know exactly which code version is running.

### Stage 3: Test

Testing for AI systems covers three layers.

**Unit tests** - Test individual functions in isolation. Mock Bedrock calls using moto or the AWS SDK's mock client. Test prompt construction, response parsing, and error handling.

```python
def test_prompt_construction():
    prompt = build_prompt(user_query="What is my account balance?",
                          context={"account_id": "123"})
    assert "account balance" in prompt
    assert "123" in prompt
    assert len(prompt) < 4000  # stays within token budget
```

**Integration tests** - Test the full inference path against real AWS services in a dev environment. These tests use real Bedrock API calls. Tag them separately and run them only on merge to main, not on every pull request (they cost money and take time).

```python
@pytest.mark.integration
def test_bedrock_invoke():
    response = invoke_model(prompt="Summarise: The sky is blue.")
    assert len(response) > 0
    assert "blue" in response.lower()
```

**Model evaluation** - This is the stage most software CI/CD pipelines omit but AI pipelines require. Run the new prompt template or model configuration against a fixed evaluation dataset. Compare key metrics against baseline:

```python
def evaluate_model(test_cases, model_id, prompt_template):
    results = []
    for case in test_cases:
        response = invoke_model(case["input"], model_id, prompt_template)
        score = evaluate_response(response, case["expected"])
        results.append(score)
    return {
        "accuracy": mean(results),
        "latency_p95": p95(latencies),
        "cost_per_request": total_tokens / len(test_cases) * token_price
    }
```

If evaluation metrics regress below a threshold (e.g. accuracy drops more than 5%), the pipeline fails and the deployment does not proceed.

### Stage 4: Model Artifact Versioning

Before deploying, store the model configuration as a versioned artefact in S3. This is your audit trail and your rollback mechanism.

```yaml
- name: Upload model config to S3
  run: |
    aws s3 cp model-config.json \
      s3://$MODEL_BUCKET/configs/$GITHUB_SHA/model-config.json \
      --metadata "commit=$GITHUB_SHA,branch=$GITHUB_REF_NAME,eval-score=$EVAL_SCORE"
```

For fine-tuned models on SageMaker, register the model in SageMaker Model Registry with evaluation metrics attached:

```yaml
- name: Register model version
  run: |
    python scripts/register_model.py \
      --model-artifact s3://$MODEL_BUCKET/models/$GITHUB_SHA/ \
      --evaluation-results evaluation-results.json \
      --approval-status PendingManualApproval
```

### Stage 5: Deploy to Staging

Deploy to the staging environment automatically on merge to main. Staging uses the same infrastructure configuration as production but at a smaller scale.

```yaml
- name: Deploy to staging
  run: |
    terraform -chdir=infra/staging apply -auto-approve \
      -var="lambda_s3_key=function-$GITHUB_SHA.zip" \
      -var="model_config_key=configs/$GITHUB_SHA/model-config.json"
```

Run smoke tests against the staging environment after deployment to confirm the deployed service is reachable and returning valid responses.

### Stage 6: Deploy to Production

Production deployments require a manual approval gate for AI services. A model update that passed evaluation may still have unexpected behaviour in production with real user traffic. The manual gate is the last checkpoint.

```yaml
- name: Await approval
  uses: trstringer/manual-approval@v1
  with:
    approvers: engineering-leads
    minimum-approvals: 1

- name: Deploy to production (canary)
  run: |
    # Shift 10% of traffic to new version first
    aws lambda update-alias \
      --function-name ai-handler \
      --name production \
      --routing-config AdditionalVersionWeights={"$NEW_VERSION"=0.10}
```

After canary deployment, monitor error rates and latency for 15-30 minutes before shifting remaining traffic.

### Stage 7: Monitor and Detect Drift

The pipeline does not end at deployment. A CloudWatch alarm monitors model performance metrics and alerts when they degrade.

```yaml
# CloudWatch alarm in Terraform
resource "aws_cloudwatch_metric_alarm" "model_error_rate" {
  alarm_name          = "ai-handler-error-rate-high"
  metric_name         = "Errors"
  namespace           = "AWS/Lambda"
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 2
  threshold           = 10
  comparison_operator = "GreaterThanThreshold"
  alarm_actions       = [aws_sns_topic.alerts.arn]
}
```

For longer-term drift detection, SageMaker Model Monitor runs scheduled evaluation jobs comparing the current model's output distribution against a baseline captured at deployment time.

## Infrastructure as Code for the Pipeline

The pipeline infrastructure itself is managed as code using Terraform:

```hcl
# S3 bucket for model artifacts with versioning
resource "aws_s3_bucket" "model_artifacts" {
  bucket = "ai-model-artifacts-${var.environment}"
}

resource "aws_s3_bucket_versioning" "model_artifacts" {
  bucket = aws_s3_bucket.model_artifacts.id
  versioning_configuration {
    status = "Enabled"
  }
}
```

## Sources and Further Reading

- GitHub Documentation: GitHub Actions workflow syntax. [https://docs.github.com/en/actions](https://docs.github.com/en/actions)
- AWS Documentation: Amazon SageMaker Model Registry. [https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html](https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html)
- AWS Documentation: SageMaker Model Monitor. [https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html)
- Humble, J. and Farley, D. (2010). *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation*. Addison-Wesley.
- Mohamed, L. (2026). "CI/CD for AI Projects - A Complete Pipeline Guide." AI Solutions Wiki. Linda Mohamed, AI & Cloud Consultant.
