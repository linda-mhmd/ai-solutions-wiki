---
title: "Canary Deployment for AI Models"
description: "Gradual traffic shifting to new model versions: how to implement canary deployments with Lambda weighted aliases and SageMaker production variants, with automatic rollback triggers."
date: 2026-03-25
categories: [Patterns]
tags: ["devops", "intermediate", "canary-deployment", "progressive-rollout", "release", "risk-management", "deployment"]
related:
  - glossary/canary-deployment
  - patterns/blue-green-deployment
  - guides/ci-cd-ai-detailed
  - tools/amazon-lambda
  - patterns/observability-ai
last_updated: 2026-05-30
---

A canary deployment releases a new version to a small subset of traffic before expanding to the full user base. The name comes from the historical practice of taking a canary into coal mines: the bird would alert miners to dangerous gases before concentrations reached levels harmful to humans. In software, the "canary" is a small fraction of production traffic exposed to the new version first, alerting the team to problems before all users are affected.

For AI model deployments, canary releases are valuable because model quality issues are not always binary. A new prompt version might produce subtly worse responses for a specific query pattern that does not appear in your evaluation dataset. Canary deployment limits the blast radius while you observe real production traffic.

## How Canary Deployment Works

Traffic is split between the current version (stable) and the new version (canary) using a weighted routing mechanism. A typical progression:

1. Deploy new version to 5% of traffic
2. Monitor for 15 minutes: error rate, latency, custom quality metrics
3. If healthy, increase to 25%
4. Monitor for 15 minutes
5. Increase to 50%, then 100%
6. If any step shows regression, roll back to 0% on the new version

```
Step 1:   [Stable 95%] + [Canary 5%]
Step 2:   [Stable 75%] + [Canary 25%]
Step 3:   [Stable 50%] + [Canary 50%]
Step 4:   [Stable 0%]  + [Canary 100%]
```

## AWS Implementation: Lambda Weighted Aliases

Lambda aliases support weighted routing, splitting traffic between two function versions. This is the simplest canary mechanism for serverless AI workloads.

```python
import boto3

lambda_client = boto3.client('lambda')

# Publish the new version
new_version = lambda_client.publish_version(
    FunctionName='ai-handler',
    Description=f'Canary release {git_sha}'
)

# Start canary: 5% to new version, 95% stays on current
lambda_client.update_alias(
    FunctionName='ai-handler',
    Name='production',
    FunctionVersion=current_stable_version,  # primary version
    RoutingConfig={
        'AdditionalVersionWeights': {
            new_version['Version']: 0.05  # 5% canary
        }
    }
)
```

**Progression script:**
```python
canary_stages = [0.05, 0.25, 0.50, 1.0]

for weight in canary_stages:
    if weight < 1.0:
        update_alias_weight(new_version, weight)
        metrics = monitor_for_minutes(15)

        if metrics['error_rate'] > 0.05 or metrics['p95_latency'] > 10.0:
            rollback(previous_version)
            raise Exception(f"Canary rollback triggered at {weight*100}%")
    else:
        # Full cut-over: set primary to new version, remove routing config
        lambda_client.update_alias(
            FunctionName='ai-handler',
            Name='production',
            FunctionVersion=new_version['Version'],
            RoutingConfig={'AdditionalVersionWeights': {}}
        )
```

## AWS Implementation: SageMaker Production Variants

SageMaker endpoints support multiple production variants with configurable traffic weights. This is the standard canary mechanism for model endpoints serving large models on GPU instances.

```python
sagemaker = boto3.client('sagemaker')

# Start canary: 10% to new model variant
sagemaker.update_endpoint_weights_and_capacities(
    EndpointName='ai-model-endpoint',
    DesiredWeightsAndCapacities=[
        {
            'VariantName': 'stable',
            'DesiredWeight': 9  # 90%
        },
        {
            'VariantName': 'canary',
            'DesiredWeight': 1  # 10%
        }
    ]
)

# After successful monitoring period: shift all traffic
sagemaker.update_endpoint_weights_and_capacities(
    EndpointName='ai-model-endpoint',
    DesiredWeightsAndCapacities=[
        {'VariantName': 'stable', 'DesiredWeight': 0},
        {'VariantName': 'canary', 'DesiredWeight': 1}
    ]
)
```

## Metrics to Monitor During a Canary

For standard software deployments, canary monitoring focuses on error rate and latency. AI services require additional metrics.

**Infrastructure metrics (CloudWatch):**
- Error rate per version (Lambda `Errors` metric filtered by version)
- Latency p50 and p95 per version
- Throttle rate

**AI-specific metrics (custom CloudWatch metrics):**
- Token usage per request (detect prompt injections or runaway token consumption)
- Response length distribution (significant changes may indicate quality issues)
- Output schema validation failure rate (if responses are parsed for structure)
- Bedrock guardrail block rate (sudden increase may indicate adversarial inputs hitting the new version)

**User experience signals:**
- Downstream error rates in services consuming the AI response
- Explicit feedback signals if your application collects thumbs up/down ratings

## Automatic Rollback Triggers

Configure CloudWatch alarms to trigger automatic rollback without human intervention. This requires a Lambda function or Step Functions workflow that monitors the alarm state and adjusts alias weights.

```python
# CloudWatch alarm event triggers this Lambda
def handle_canary_alarm(event, context):
    alarm_state = event['detail']['state']['value']

    if alarm_state == 'ALARM':
        # Immediately set canary weight to 0
        lambda_client.update_alias(
            FunctionName='ai-handler',
            Name='production',
            FunctionVersion=stable_version,
            RoutingConfig={'AdditionalVersionWeights': {}}
        )

        # Notify the team
        sns_client.publish(
            TopicArn=ALERT_TOPIC_ARN,
            Message=f"Canary rollback triggered. Alarm: {event['detail']['alarmName']}"
        )
```

**Rollback thresholds to configure:**
- Error rate > 5% sustained for 5 minutes
- Latency p95 > 10 seconds for 5 minutes
- More than 20 guardrail blocks in 5 minutes (potential adversarial traffic exploiting new version behaviour)

## Canary vs Blue-Green

| Property | Canary | Blue-Green |
|---|---|---|
| Traffic shift | Gradual (5% -> 100%) | Instant (0% -> 100%) |
| Blast radius | Limited by canary percentage | Full user base |
| Rollback speed | Instant (reduce weight to 0) | Instant (switch alias back) |
| Observation time | Built into the process | Manual post-deployment |
| Complexity | Higher (weight management) | Lower (binary switch) |
| Cost | Higher (both versions running) | Higher (both versions running) |

For model deployments, canary is generally preferred over blue-green because the gradual observation window catches quality regressions before they affect all users. Blue-green is preferred when speed of deployment is critical and the new version has been thoroughly validated in staging.

## Sources and Further Reading

- AWS Documentation: Lambda function aliases with weighted routing. [https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html)
- AWS Documentation: SageMaker deployment guardrails - canary traffic shifting. [https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-canary.html](https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-canary.html)
- AWS Documentation: SageMaker production variants. [https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints-variants.html](https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints-variants.html)
- Fowler, M. "CanaryRelease." Martin Fowler's Bliki. [https://martinfowler.com/bliki/CanaryRelease.html](https://martinfowler.com/bliki/CanaryRelease.html)
