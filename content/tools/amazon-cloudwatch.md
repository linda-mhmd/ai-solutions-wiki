---
title: "Amazon CloudWatch - Monitoring and Observability for AI"
description: "Using Amazon CloudWatch for AI workloads: custom metrics for LLM cost and token usage, alarms for model quality, log insights for inference debugging, and anomaly detection."
date: 2026-03-25
categories: [Tools]
tags: ["devops", "intermediate", "monitoring", "logging", "metrics", "observability", "aws-service"]
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
layer: infrastructure
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon CloudWatch is AWS's monitoring and observability service. It collects metrics, logs, and traces from AWS services and custom applications, providing dashboards, alarms, and anomaly detection across the AWS resource stack. For AI workloads, CloudWatch provides the infrastructure monitoring layer, Lambda execution metrics, API Gateway latency, SQS queue depth, while AI-specific observability (token usage, response quality) requires custom metric publication.

Official documentation: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/  
Pricing: https://aws.amazon.com/cloudwatch/pricing/  
Service quotas: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_limits.html

**Azure equivalent:** Azure Monitor with Application Insights.
**GCP equivalent:** Google Cloud Monitoring (formerly Stackdriver).

## Foundations for beginners

Before the AWS specifics, the underlying ideas:

- **Monitoring** - collecting predefined signals about a running system (is it up, how fast, how many errors) and alerting when something crosses a threshold. It answers "is it healthy?"
- **Observability** - the broader ability to ask new questions about a system from the outside, using its outputs, without changing it. The three classic signals are metrics (numbers over time), logs (timestamped event records), and traces (the path of one request across services). See {{< relref "glossary/observability" >}}.
- **Metric** - a number measured repeatedly over time, such as requests per minute or latency. A **log** is a text record of a single event. A **trace** follows one request as it moves through multiple components.
- **Alarm / alert** - a rule that watches a metric and notifies a human or triggers an action when a condition is met.

CloudWatch is AWS's built-in home for all three signals. You do not install a separate agent for most AWS services: they publish metrics and logs to CloudWatch automatically. The same service applies to any workload, a web app, a database, or an AI system. For AI specifically, you layer on extra signals (token usage, response quality, agent behaviour) on top of the same plumbing. Prerequisite concepts worth reading first: {{< relref "glossary/observability" >}}, {{< relref "glossary/anomaly-detection" >}}, and {{< relref "glossary/token-budget" >}}.

## Core Capabilities

**Metrics** - Numeric time-series data. CloudWatch automatically collects metrics from AWS services (Lambda invocations, API Gateway latency, SQS message counts). Custom metrics can be published via the PutMetricData API from application code. Data is aggregated and retained on a rolling schedule: sub-1-minute (high-resolution) data points for 3 hours, 1-minute resolution for 15 days, 5-minute resolution for 63 days, and 1-hour resolution for 455 days (15 months). After 15 months a metric with no new data points expires. CloudWatch also ingests metrics over the OpenTelemetry Protocol (OTLP), which you query with the Prometheus Query Language (PromQL) in CloudWatch Query Studio.

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
# Cost expression (verify current pricing on the Bedrock pricing page)
# Claude Sonnet on-demand: input $0.003/1K tokens, output $0.015/1K tokens
DailyCost = (SUM(InputTokens) * 0.003 / 1000) + (SUM(OutputTokens) * 0.015 / 1000)
```

Always confirm the rates on the [Amazon Bedrock pricing page](https://aws.amazon.com/bedrock/pricing/) before relying on a cost dashboard: per-model rates change, and batch and prompt-caching tiers cost less than on-demand. See {{< relref "glossary/token-budget" >}} for how to set spend limits.

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
            'Label': 'Daily Cost (USD)',
            'ReturnData': True
        }
    ],
    ComparisonOperator='GreaterThanThreshold',
    Threshold=50.0,  # USD 50 daily budget alert
    EvaluationPeriods=1,
    AlarmActions=[SNS_TOPIC_ARN]
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

## Generative AI observability (2025)

CloudWatch now ships a built-in generative AI observability experience, announced in preview in July 2025 and generally available on 13 October 2025. It gives an out-of-the-box view of latency, token usage, errors, and performance across an AI workload, from individual model invocations up to multi-step agent operations, so you no longer have to build every token dashboard by hand. It includes a Model Invocations dashboard for model usage and token spend, end-to-end prompt tracing, and a curated invocation log that surfaces the exact inputs and outputs of each call.

The feature targets agentic workloads on {{< relref "glossary/aws-agentcore" >}} (capturing decision metrics for Agents, Memory, built-in Tools, Gateways, and Identity) and works with common orchestration frameworks including Strands Agents, LangChain, and LangGraph. In December 2025 AWS added AgentCore Evaluations: automated quality scoring of agents with 13 pre-built evaluators across dimensions such as helpfulness, tool selection, and response accuracy, connecting those scores back to the underlying prompts and logs. It builds on standard CloudWatch primitives (Application Signals, Alarms, Logs Insights), so the manual instrumentation patterns above still apply where you need custom signals or are not on AgentCore.

## Best practices

For monitoring AI workloads on AWS, follow the operational excellence guidance in the AWS Well-Architected Generative AI Lens, which calls for comprehensive observability across every layer of the system, from foundation models to user interactions. See the [Generative AI Lens operational excellence pillar](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/operational-excellence.html) and the wiki {{< relref "foundations/well-architected" >}} overview.

## Integration with Bedrock, Lambda, and Step Functions

- **Lambda:** CloudWatch automatically receives Lambda metrics (invocations, errors, duration, concurrent executions) and Lambda function logs. No configuration required beyond a CloudWatch Logs IAM policy on the execution role.
- **Bedrock:** Bedrock publishes invocation metrics to CloudWatch when model invocation logging is enabled. Custom metrics require application-level instrumentation.
- **Step Functions:** State machine execution metrics (executions started, failed, succeeded, throttled) publish automatically. Individual state timing metrics require X-Ray tracing.

## Sources and Further Reading

- AWS Documentation: Amazon CloudWatch. [https://aws.amazon.com/cloudwatch/](https://aws.amazon.com/cloudwatch/)
- AWS Documentation: CloudWatch Logs Insights query syntax. [https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html)
- AWS Documentation: Publishing custom metrics. [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html)
- AWS Documentation: Amazon Bedrock model invocation logging. [https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html)
- AWS Documentation: CloudWatch metrics concepts (resolution and retention). [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html)
- AWS What's New: Generative AI observability now generally available for Amazon CloudWatch (13 October 2025). [https://aws.amazon.com/about-aws/whats-new/2025/10/generative-ai-observability-amazon-cloudwatch](https://aws.amazon.com/about-aws/whats-new/2025/10/generative-ai-observability-amazon-cloudwatch)
- AWS What's New: CloudWatch GenAI observability supports AgentCore Evaluations (2 December 2025). [https://aws.amazon.com/about-aws/whats-new/2025/12/cloudwatch-genai-observability-agentcore-evaluations](https://aws.amazon.com/about-aws/whats-new/2025/12/cloudwatch-genai-observability-agentcore-evaluations)
- AWS Well-Architected: Generative AI Lens, operational excellence pillar. [https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/operational-excellence.html](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/operational-excellence.html)
- Amazon Bedrock pricing (verify current per-model token rates). [https://aws.amazon.com/bedrock/pricing/](https://aws.amazon.com/bedrock/pricing/)
