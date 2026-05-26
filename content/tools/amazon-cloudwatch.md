---
title: "Amazon CloudWatch - Monitoring and Observability for AI"
description: "Using Amazon CloudWatch for AI workloads: custom metrics for LLM cost and token usage, alarms for model quality, log insights for inference debugging, and anomaly detection."
date: 2026-03-25
categories: [Tools]
tags: ["devops", "intermediate", "aws-cloudwatch", "monitoring", "logging", "metrics", "observability"]
related:
  - patterns/observability-ai
  - glossary/observability
  - glossary/drift-detection
  - tools/amazon-bedrock
  - tools/aws-lambda
  - tools/azure-monitor
  - tools/google-cloud-monitoring
  - tools/prometheus
  - tools/grafana
---

Amazon CloudWatch is AWS's monitoring and observability service. It collects metrics, logs, and traces from AWS services and custom applications, providing dashboards, alarms, and anomaly detection across the AWS resource stack. For AI workloads, CloudWatch provides the infrastructure monitoring layer, Lambda execution metrics, API Gateway latency, SQS queue depth, while AI-specific observability (token usage, response quality) requires custom metric publication.

Official documentation: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/  
Pricing: https://aws.amazon.com/cloudwatch/pricing/  
Service quotas: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_limits.html

**Azure equivalent:** Azure Monitor with Application Insights.
**GCP equivalent:** Google Cloud Monitoring (formerly Stackdriver).

## Core Capabilities

**Metrics** - Numeric time-series data. CloudWatch automatically collects metrics from AWS services (Lambda invocations, API Gateway latency, SQS message counts). Custom metrics can be published via the PutMetricData API from application code. Metrics are retained at 1-second resolution for 3 hours, 1-minute resolution for 15 days, and 1-hour resolution for 63 days.

**Logs** - CloudWatch Logs collects log streams from Lambda functions, ECS containers, API Gateway, and custom applications via the CloudWatch Logs agent or SDK. Log Insights provides a SQL-like query language for searching and aggregating log data. Logs are retained indefinitely by default (configurable per log group).

**Alarms** - Alarms monitor a metric and transition between OK, ALARM, and INSUFFICIENT_DATA states based on threshold conditions. Alarm actions can notify via SNS (email, SMS, PagerDuty), trigger Lambda functions, or scale EC2 Auto Scaling groups.

**Dashboards** - CloudWatch Dashboards display widgets (metrics graphs, alarm status, log query results, text) in a configurable layout. Dashboards support cross-account and cross-region views.

**Anomaly Detection** - CloudWatch uses machine learning to model the expected range of a metric based on historical patterns. Anomaly detection alarms trigger when a metric falls outside the expected band, without requiring a manually specified threshold.

## Custom Metrics for LLM Cost Tracking

CloudWatch does not automatically track Bedrock token usage. Publish custom metrics from your Lambda function or application on every inference call.

```python
import boto3
import json
import time

cloudwatch = boto3.client('cloudwatch')

def invoke_model_with_metrics(prompt: str, model_id: str, environment: str):
    bedrock = boto3.client('bedrock-runtime')

    start_time = time.time()

    response = bedrock.invoke_model(
        modelId=model_id,
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2048,
            "messages": [{"role": "user", "content": prompt}]
        })
    )

    latency_ms = (time.time() - start_time) * 1000
    body = json.loads(response['body'].read())

    input_tokens = body['usage']['input_tokens']
    output_tokens = body['usage']['output_tokens']

    # Publish custom metrics
    cloudwatch.put_metric_data(
        Namespace='AI/LLMMetrics',
        MetricData=[
            {
                'MetricName': 'InputTokens',
                'Value': input_tokens,
                'Unit': 'Count',
                'Dimensions': [
                    {'Name': 'ModelId', 'Value': model_id},
                    {'Name': 'Environment', 'Value': environment}
                ]
            },
            {
                'MetricName': 'OutputTokens',
                'Value': output_tokens,
                'Unit': 'Count',
                'Dimensions': [
                    {'Name': 'ModelId', 'Value': model_id},
                    {'Name': 'Environment', 'Value': environment}
                ]
            },
            {
                'MetricName': 'InferenceLatencyMs',
                'Value': latency_ms,
                'Unit': 'Milliseconds',
                'Dimensions': [
                    {'Name': 'ModelId', 'Value': model_id},
                    {'Name': 'Environment', 'Value': environment}
                ]
            }
        ]
    )

    return body['content'][0]['text']
```

With token metrics in CloudWatch, create a metric math expression for daily cost:
```
# Cost expression (verify current pricing)
# Claude Sonnet: input $0.003/1K tokens, output $0.015/1K tokens
DailyCost = (SUM(InputTokens) * 0.003 / 1000) + (SUM(OutputTokens) * 0.015 / 1000)
```

## CloudWatch Alarms for AI Workloads

**Lambda error rate alarm:**
```python
cloudwatch.put_metric_alarm(
    AlarmName='ai-handler-error-rate-high',
    AlarmDescription='Lambda error rate exceeded 5%',
    MetricName='Errors',
    Namespace='AWS/Lambda',
    Statistic='Sum',
    Period=300,
    EvaluationPeriods=2,
    Threshold=10,
    ComparisonOperator='GreaterThanThreshold',
    Dimensions=[
        {'Name': 'FunctionName', 'Value': 'ai-handler'},
        {'Name': 'Resource', 'Value': 'ai-handler:production'}
    ],
    AlarmActions=[SNS_TOPIC_ARN],
    TreatMissingData='notBreaching'
)
```

**Token budget alarm** (alert when daily spend approaches budget):
```python
cloudwatch.put_metric_alarm(
    AlarmName='ai-daily-token-budget-warning',
    AlarmDescription='Daily token spend approaching budget',
    Metrics=[
        {
            'Id': 'input_tokens',
            'MetricStat': {
                'Metric': {
                    'Namespace': 'AI/LLMMetrics',
                    'MetricName': 'InputTokens',
                    'Dimensions': [{'Name': 'Environment', 'Value': 'production'}]
                },
                'Period': 86400,  # 24 hours
                'Stat': 'Sum'
            }
        },
        {
            'Id': 'cost',
            'Expression': 'input_tokens * 0.000003',  # per-token cost
            'Label': 'Daily Cost (USD)'
        }
    ],
    ComparisonOperator': 'GreaterThanThreshold',
    Threshold': 50.0,  # EUR 50 daily budget alert
    EvaluationPeriods': 1,
    AlarmActions': [SNS_TOPIC_ARN]
)
```

## Log Insights for Inference Debugging

CloudWatch Logs Insights queries let you investigate inference behaviour across thousands of log entries.

**Find slow requests:**
```
fields @timestamp, request_id, latency_ms, model_id
| filter latency_ms > 5000
| sort latency_ms desc
| limit 20
```

**Summarise token usage by model:**
```
fields model_id, input_tokens, output_tokens
| stats sum(input_tokens) as total_input,
        sum(output_tokens) as total_output,
        count(*) as requests
        by model_id
| sort requests desc
```

**Find requests that triggered guardrails:**
```
filter guardrail_triggered = true
| fields @timestamp, request_id, user_id, guardrail_action
| sort @timestamp desc
| limit 50
```

## Integration with Bedrock, Lambda, and Step Functions

- **Lambda:** CloudWatch automatically receives Lambda metrics (invocations, errors, duration, concurrent executions) and Lambda function logs. No configuration required beyond a CloudWatch Logs IAM policy on the execution role.
- **Bedrock:** Bedrock publishes invocation metrics to CloudWatch when model invocation logging is enabled. Custom metrics require application-level instrumentation.
- **Step Functions:** State machine execution metrics (executions started, failed, succeeded, throttled) publish automatically. Individual state timing metrics require X-Ray tracing.

## Sources and Further Reading

- AWS Documentation: Amazon CloudWatch. [https://aws.amazon.com/cloudwatch/](https://aws.amazon.com/cloudwatch/)
- AWS Documentation: CloudWatch Logs Insights query syntax. [https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html)
- AWS Documentation: Publishing custom metrics. [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html)
- AWS Documentation: Amazon Bedrock model invocation logging. [https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html)
