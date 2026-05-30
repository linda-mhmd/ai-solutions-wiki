---
title: "Blue-Green Deployment for AI Services"
description: "Zero-downtime model updates using blue-green deployment: how it works, AWS implementation with Lambda aliases and SageMaker variants, and rollback strategies for AI systems."
date: 2026-03-25
categories: [Patterns]
tags: ["devops", "intermediate", "blue-green-deployment", "zero-downtime", "release", "deployment", "rollback"]
related:
  - glossary/blue-green-deployment
  - patterns/canary-deployment
  - guides/ci-cd-ai-detailed
  - tools/amazon-lambda
  - patterns/model-versioning
last_updated: 2026-05-30
---

Blue-green deployment is a release technique that reduces downtime and deployment risk by running two identical production environments - one live (blue), one idle (green) - and switching traffic between them when a new version is ready. For AI services, blue-green deployment solves a specific problem: model updates that change output behaviour in ways that unit tests cannot fully predict.

## How Blue-Green Deployment Works

At any point in time, one environment serves all production traffic. The other environment sits idle but fully provisioned. When deploying a new version:

1. Deploy the new version to the idle environment (green)
2. Run smoke tests against the idle environment
3. Switch the router (a load balancer, DNS record, or Lambda alias) to point to green
4. Blue becomes idle; green is now live
5. Keep blue running for a defined period as a rollback target
6. If a problem is detected, switch traffic back to blue instantly

The key property is that the switch is instantaneous from the user's perspective. There is no gradual rollout - 100% of traffic moves in a single step.

```
Before deploy:          After deploy:
BLUE (live) <-+         BLUE (idle)
              |
GREEN (idle)  +->  GREEN (live) <-+
                                  |
                   Traffic switch +
```

## Why This Matters for AI Services

Model updates are different from code updates in one critical way: they can degrade quality in ways that are not immediately visible as errors. A new prompt template or model version might produce responses that are subtly worse - less accurate, more verbose, or missing important context - without throwing a single error or raising latency significantly.

Blue-green deployment gives you an instant rollback path. If users report quality degradation after a model update, you switch traffic back to the previous version in seconds rather than redeploying. The previous version remains running and available throughout the validation period.

## AWS Implementation: Lambda Aliases

Lambda function aliases are the simplest way to implement blue-green deployment for serverless AI workloads.

**Structure:**
- Lambda `$LATEST` and version numbers represent code versions
- A `production` alias points to a specific version
- Switching the alias is the deployment step

```python
# Deploy new version
new_version = lambda_client.publish_version(
    FunctionName='ai-handler',
    Description=f'Deploy {git_sha}'
)

# Run smoke tests against the new version ARN
run_smoke_tests(new_version['FunctionArn'])

# Switch the production alias (this is the instant cut-over)
lambda_client.update_alias(
    FunctionName='ai-handler',
    Name='production',
    FunctionVersion=new_version['Version']
)
```

**Rollback:**
```python
# Instant rollback: point alias back to previous version
lambda_client.update_alias(
    FunctionName='ai-handler',
    Name='production',
    FunctionVersion=previous_version  # stored before deployment
)
```

API Gateway routes to the Lambda alias ARN (e.g. `arn:aws:lambda:eu-west-1:123456789:function:ai-handler:production`). The API Gateway configuration does not change during deployment.

## AWS Implementation: SageMaker Endpoint Variants

For AI services deployed on SageMaker, production variants allow blue-green deployment at the endpoint level.

```python
import boto3

sagemaker = boto3.client('sagemaker')

# Create endpoint config with both variants (100% to blue, 0% to green)
sagemaker.create_endpoint_config(
    EndpointConfigName='ai-endpoint-config-v2',
    ProductionVariants=[
        {
            'VariantName': 'blue',
            'ModelName': 'ai-model-v1',
            'InitialInstanceCount': 1,
            'InstanceType': 'ml.g5.2xlarge',
            'InitialVariantWeight': 1.0  # 100% of traffic
        },
        {
            'VariantName': 'green',
            'ModelName': 'ai-model-v2',
            'InitialInstanceCount': 1,
            'InstanceType': 'ml.g5.2xlarge',
            'InitialVariantWeight': 0.0  # 0% of traffic (warm standby)
        }
    ]
)

# After smoke tests pass: shift all traffic to green
sagemaker.update_endpoint_weights_and_capacities(
    EndpointName='ai-endpoint',
    DesiredWeightsAndCapacities=[
        {'VariantName': 'blue', 'DesiredWeight': 0},
        {'VariantName': 'green', 'DesiredWeight': 1}
    ]
)
```

## AWS Implementation: API Gateway Stage Variables

For REST APIs, API Gateway stage variables let you point a stage at different Lambda versions or backend URLs without redeploying the API.

```hcl
# Terraform: API Gateway stage with stage variable
resource "aws_api_gateway_stage" "production" {
  rest_api_id   = aws_api_gateway_rest_api.main.id
  stage_name    = "production"

  variables = {
    lambda_version = "47"  # Update this to switch traffic
  }
}
```

The Lambda integration uses `${stageVariables.lambda_version}` in the function ARN, making the deployment step a single variable update.

## Rollback Strategies

**Criteria for automatic rollback:**
- Error rate on the new version exceeds a threshold (e.g. 5% of requests return errors) within 10 minutes
- Latency p95 exceeds the SLA (e.g. 10 seconds for a chat completion)
- CloudWatch alarm triggers on custom metric (e.g. model output schema validation failures)

**Criteria for manual rollback:**
- User-reported quality degradation (responses are less accurate, tone has changed)
- Business stakeholder identifies output issues during monitoring period
- Security team flags unexpected content in outputs

**Retention period for idle environment:**
Keep the previous environment running for at least 48 hours after a successful deployment. Model quality issues often surface gradually as users encounter edge cases. After 48 hours with no incidents, decommission the previous environment to avoid unnecessary cost.

## Blue-Green vs Canary

Blue-green and canary deployments are complementary rather than competing. Blue-green is an all-or-nothing switch with an instant rollback path. Canary gradually shifts traffic to the new version, allowing observation before full commitment.

For AI services, a common pattern combines both: use canary deployment to gradually shift traffic from 0% to 100% over 30-60 minutes (observing quality metrics), then retain the previous environment in a blue-green standby for 48 hours after full cut-over.

## Sources and Further Reading

- Fowler, M. "BlueGreenDeployment." Martin Fowler's Bliki. [https://martinfowler.com/bliki/BlueGreenDeployment.html](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- AWS Documentation: Lambda function aliases. [https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html)
- AWS Documentation: SageMaker production variants. [https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-blue-green.html](https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-blue-green.html)
- Humble, J. and Farley, D. (2010). *Continuous Delivery*. Addison-Wesley. Chapter 10: Deploying and Releasing Applications.
