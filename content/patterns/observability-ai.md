---
title: "Observability for AI Systems - Logs, Metrics, Traces"
description: "Applying the three pillars of observability to AI workloads: CloudWatch for metrics and alarms, Langfuse for LLM tracing, OpenTelemetry for distributed traces, and custom AI metrics."
date: 2026-03-25
categories: [Patterns]
tags: ["devops", "intermediate", "observability", "llm-monitoring", "tracing", "metrics", "ai-operations"]
related:
  - tools/aws-cloudwatch
  - patterns/canary-deployment
  - glossary/observability
  - glossary/drift-detection
  - guides/ci-cd-ai-detailed
last_updated: 2026-05-30
---

Observability is the ability to understand the internal state of a system from its external outputs. For traditional software, three categories of output provide this understanding: logs (discrete events), metrics (numeric measurements over time), and traces (the path a request takes through a distributed system). AI systems generate all three but require additional instrumentation to capture the information that matters: token usage, response quality, cost per request, and model version attribution.

## Why AI Systems Need Specialized Observability

A standard web application becomes unresponsive or throws HTTP 500 errors when something goes wrong. AI systems can fail silently. A model can return a response with a 200 status code while:

- Hallucinating incorrect information
- Exceeding the token budget by 10x due to a prompt injection
- Returning responses that violate your content policy
- Degrading in quality due to model drift over time

Standard application monitoring catches the first category (technical failures). Specialized AI observability catches the others.

## Pillar 1: Metrics

Metrics are numeric measurements aggregated over time. For AI systems, three categories matter.

**Infrastructure metrics** (standard CloudWatch):
- Lambda invocation count, error rate, duration p50/p95/p99
- API Gateway 4xx and 5xx error rates, latency
- SQS queue depth (for async AI pipelines)

**AI-specific metrics** (custom CloudWatch metrics):
```python
import boto3

cloudwatch = boto3.client('cloudwatch')

def publish_ai_metrics(model_id, input_tokens, output_tokens,
                        latency_ms, request_id):
    cloudwatch.put_metric_data(
        Namespace='AI/LLMMetrics',
        MetricData=[
            {
                'MetricName': 'InputTokens',
                'Value': input_tokens,
                'Unit': 'Count',
                'Dimensions': [
                    {'Name': 'ModelId', 'Value': model_id},
                    {'Name': 'Environment', 'Value': ENVIRONMENT}
                ]
            },
            {
                'MetricName': 'OutputTokens',
                'Value': output_tokens,
                'Unit': 'Count',
                'Dimensions': [
                    {'Name': 'ModelId', 'Value': model_id},
                    {'Name': 'Environment', 'Value': ENVIRONMENT}
                ]
            },
            {
                'MetricName': 'InferenceLatencyMs',
                'Value': latency_ms,
                'Unit': 'Milliseconds',
                'Dimensions': [
                    {'Name': 'ModelId', 'Value': model_id}
                ]
            }
        ]
    )
```

**Cost tracking metrics:**
Calculate cost per request using the token counts and published pricing:
```python
# Anthropic Claude Sonnet example pricing (verify current pricing)
INPUT_TOKEN_COST = 0.003 / 1000   # per token
OUTPUT_TOKEN_COST = 0.015 / 1000  # per token

cost = (input_tokens * INPUT_TOKEN_COST) + (output_tokens * OUTPUT_TOKEN_COST)
```

Publish cost as a CloudWatch metric and set a budget alarm to alert when daily spend exceeds a threshold.

## Pillar 2: Logs

Logs capture discrete events with context. For AI systems, every inference call should produce a structured log entry.

**Enable Bedrock model invocation logging** (this is off by default):
```python
bedrock_client = boto3.client('bedrock')
bedrock_client.put_model_invocation_logging_configuration(
    loggingConfig={
        'cloudWatchConfig': {
            'logGroupName': '/aws/bedrock/model-invocations',
            'roleArn': BEDROCK_LOGGING_ROLE_ARN,
            'largeDataDeliveryS3Config': {
                'bucketName': LOG_BUCKET,
                'keyPrefix': 'bedrock-logs/'
            }
        },
        'textDataDeliveryEnabled': True,
        'imageDataDeliveryEnabled': False
    }
)
```

**Structured application log entry:**
```python
import json, logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def log_inference(request_id, user_id, model_id, prompt_template_version,
                   input_tokens, output_tokens, latency_ms, guardrail_triggered):
    logger.info(json.dumps({
        "event": "inference_complete",
        "request_id": request_id,
        "user_id": user_id,           # for debugging, not prompt content
        "model_id": model_id,
        "prompt_template_version": prompt_template_version,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "latency_ms": latency_ms,
        "guardrail_triggered": guardrail_triggered,
        "environment": ENVIRONMENT
    }))
```

Use CloudWatch Logs Insights to query these structured logs for operational analysis.

## Pillar 3: Traces

Distributed traces show the full path of a request through multiple services. For multi-agent AI systems, a trace might span: API Gateway -> Lambda orchestrator -> Bedrock agent -> Knowledge base -> Lambda tool -> DynamoDB.

**OpenTelemetry for distributed tracing:**
```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

tracer = trace.get_tracer(__name__)

def handle_user_request(user_query):
    with tracer.start_as_current_span("handle_user_request") as span:
        span.set_attribute("user_query_length", len(user_query))

        with tracer.start_as_current_span("bedrock_invoke") as child_span:
            response = invoke_bedrock(user_query)
            child_span.set_attribute("model_id", MODEL_ID)
            child_span.set_attribute("output_tokens", response['usage']['outputTokens'])

        return process_response(response)
```

AWS X-Ray integrates with Lambda and API Gateway for automatic trace capture, with OpenTelemetry SDK support for custom instrumentation.

## LLM-Specific Tracing with Langfuse

Langfuse is an open-source LLM observability platform that captures prompt/response pairs, token counts, cost, and user feedback in a searchable interface. It is the recommended tool for production LLM quality monitoring.

```python
from langfuse import Langfuse
from langfuse.decorators import observe, langfuse_context

langfuse = Langfuse()

@observe()
def generate_response(user_query: str) -> str:
    langfuse_context.update_current_observation(
        input=user_query,
        metadata={"prompt_template_version": PROMPT_VERSION}
    )

    response = call_bedrock(user_query)

    langfuse_context.update_current_observation(
        output=response['text'],
        usage={
            "input": response['usage']['inputTokens'],
            "output": response['usage']['outputTokens']
        }
    )

    return response['text']
```

Langfuse provides a dashboard showing: average latency per model, token usage trends, cost per day, user sessions, and the ability to search and replay specific conversations for debugging.

## Dashboard Design

A well-designed AI observability dashboard has three sections.

**Operational health** (visible at all times):
- Current error rate vs 7-day baseline
- p95 latency vs SLA threshold
- Requests per minute with trend

**Cost and usage:**
- Daily token spend with 30-day trend
- Cost per request by model
- Projected monthly spend vs budget

**Quality indicators:**
- Guardrail block rate
- Response length distribution
- User feedback score (if collected)

## Sources and Further Reading

- AWS Documentation: Amazon CloudWatch. [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/)
- Langfuse Documentation: Getting started. [https://langfuse.com/docs](https://langfuse.com/docs)
- OpenTelemetry Documentation: Getting started. [https://opentelemetry.io/docs/](https://opentelemetry.io/docs/)
- AWS Documentation: Amazon Bedrock model invocation logging. [https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html)
- Majors, C., Fong-Jones, L., and Miranda, G. (2022). *Observability Engineering*. O'Reilly Media.
