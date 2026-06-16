---
title: "Amazon EventBridge - Event-Driven AI Orchestration"
description: "Amazon EventBridge is a serverless event bus that routes events between AWS services, SaaS apps, and your code to build loosely coupled workflows."
date: 2026-03-25
categories: [Tools]
tags: ["cloud-computing", "intermediate", "event-driven", "orchestration", "serverless", "workflow", "aws-service"]
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
layer: orchestration
provider: aws
pricing_model: payg
maturity: production
---

Amazon EventBridge is a serverless event bus that routes events between AWS services, SaaS applications, and your own code. In AI pipelines it acts as the connective tissue between loosely coupled steps - decoupling event producers (S3 uploads, API calls, scheduled jobs) from event consumers (Lambda functions, Step Functions workflows, SQS queues).

Official documentation: https://aws.amazon.com/eventbridge/
Pricing: https://aws.amazon.com/eventbridge/pricing/
Service quotas: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-quota.html

**Azure equivalent:** Azure Event Grid. **GCP equivalent:** Google Eventarc.

EventBridge is the successor to Amazon CloudWatch Events and extends it: the two share an API and CloudWatch Events rules continue to work, but new development should use the EventBridge name and console.

## Foundations First

If you are new to this, a few plain-language ideas make EventBridge click:

- **Event** - a small JSON message saying "something happened" (a file was uploaded, a payment cleared, a job finished). The producer does not care who reads it.
- **Event-driven architecture** - a style where components react to events instead of calling each other directly, so each part can change or fail without breaking the others. See {{< relref "/glossary/event-driven-architecture.md" >}}.
- **Loose coupling** - keeping producers and consumers independent so you can add, remove, or replace one side without touching the other.
- **Serverless** - you run code and route messages without managing servers; you pay per use and AWS handles scaling. See {{< relref "/glossary/serverless.md" >}}.

A useful contrast: a {{< relref "/glossary/message-queue.md" >}} delivers a message to one consumer that pulls work off the queue, while an event bus like EventBridge fans the same event out to every rule that matches it. EventBridge can feed queues (Amazon SQS) and topics (Amazon SNS), so the two work together rather than competing.

In an AI system, EventBridge is most often the orchestration layer that wires data and model steps together: a new document triggers text extraction, then embedding, then indexing, with each step decoupled from the next.

## How EventBridge Works

EventBridge receives **events** (JSON objects describing something that happened) and evaluates them against **rules**. A rule matches events using a pattern and forwards matching events to one or more **targets**. Targets include Lambda, Step Functions, SQS, SNS, and many more.

The default **event bus** carries events from AWS services. EventBridge works with over 200 event sources and over 20 target types. Note that some AWS services publish to the default bus automatically, while others (notably Amazon S3) require you to turn on EventBridge notifications for the specific resource first. You can also create custom event buses to separate concerns (for example, one bus per application domain).

**EventBridge Pipes** provide point-to-point connections between a source (Amazon SQS, DynamoDB Streams, Amazon Kinesis, Amazon MSK, and others) and a single target, with optional filtering, enrichment, and transformation in between. Pipes are billed per request after filtering, so events you filter out do not cost extra. Useful when you want to enrich an event (for example, look up a record) before triggering downstream processing.

**EventBridge Scheduler** is the recommended way to run cron-based and one-time triggers, superseding the older "scheduled rules" on the event bus. It supports one-time and recurring schedules with time zone and daylight-saving awareness, can target over 200 AWS services, and as of 2025 is available in all AWS Regions. In February 2026 it added CloudWatch resource-count metrics so you can monitor how close you are to your schedule quotas.

## AI Pipeline Patterns

**S3 to processing pipeline:** When a video file lands in S3, an EventBridge rule matches the `Object Created` event and starts a Step Functions execution. You first enable EventBridge notifications on the bucket (in the bucket's Event notifications settings or via the API), after which S3 sends events to the default bus. The rule pattern then filters by prefix (`raw/`) so only relevant uploads trigger processing. Unlike legacy S3 event notifications, EventBridge lets several rules react to the same upload, which is what makes fan-out possible.

**Async AI job completion:** Rekognition video analysis is asynchronous. When a label detection job finishes, Rekognition publishes a completion event to SNS, which you forward to EventBridge. A rule matches the completion and triggers the next pipeline stage.

**Scheduled batch processing:** Run nightly summarization, embedding refresh, or cost reporting jobs using EventBridge Scheduler instead of managing cron infrastructure.

**Cross-service fan-out:** A single S3 upload can trigger multiple independent processes simultaneously - metadata extraction, virus scanning, thumbnail generation - by routing the same event to multiple Lambda targets. Each process runs independently without coupling.

## Rule Patterns

EventBridge rule patterns use JSON matching. A pattern like this matches only MP4 uploads to the `raw/` prefix in a specific bucket:

```json
{
  "source": ["aws.s3"],
  "detail-type": ["Object Created"],
  "detail": {
    "bucket": { "name": ["my-ai-pipeline-bucket"] },
    "object": { "key": [{ "prefix": "raw/" }] }
  }
}
```

Content filtering at the rule level means Lambda functions are invoked only for relevant events, reducing cost and complexity.

## Pricing

EventBridge is pay as you go, with no upfront cost. Events from AWS services (management events) are ingested on the default bus for free. Custom events and partner (SaaS) events cost $1.00 per million ingested events. EventBridge Pipes cost $0.40 per million requests after filtering. EventBridge Scheduler has a free tier of 14 million invocations per month, then $1.00 per million. Schema discovery is free for the first 5 million ingested events per month. Payloads are metered in 64 KB chunks, so a single large event can count as several billable events. Always check the live pricing page before estimating, since rates and free tiers change. (Source: AWS EventBridge pricing, verified June 2026.)

## Best Practices

For production event-driven and serverless designs, follow the AWS Well-Architected Framework, in particular the [Serverless Applications Lens](https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html). Practical guidance that matters most for EventBridge:

- Filter as early as possible at the rule or Pipes level so targets are invoked only for events they care about, which cuts cost and blast radius.
- Configure a dead-letter queue (an Amazon SQS queue) on rules and targets so failed deliveries are captured rather than lost.
- Use separate custom event buses per domain and tighten resource-based policies so only intended producers can publish.
- Treat event payloads as a contract: register and version them in the EventBridge Schema Registry so consumers do not break when producers change.

## Cross-Cloud Comparison

Azure Event Grid uses topics and subscriptions with a similar pattern-matching model. GCP Eventarc routes events from Cloud Storage, Pub/Sub, and Audit Logs to Cloud Run or Cloud Functions. EventBridge has the most extensive native AWS service integration of the three.

## Related Articles

- [Amazon S3]({{< relref "aws-s3.md" >}}) - primary event source
- [AWS Step Functions]({{< relref "tools/aws-step-functions" >}}) - common EventBridge target
- [AWS Lambda]({{< relref "/tools/aws-lambda.md" >}}) - the most common rule target
- [Azure Event Grid]({{< relref "/tools/azure-event-grid.md" >}}) - the Azure equivalent
- [Event-Driven Architecture]({{< relref "/glossary/event-driven-architecture.md" >}}) - architectural patterns
- [Serverless]({{< relref "/glossary/serverless.md" >}}) - the operating model behind EventBridge
- [Message Queue]({{< relref "/glossary/message-queue.md" >}}) - the complementary point-to-point pattern

## Sources

- [Amazon EventBridge overview](https://aws.amazon.com/eventbridge/) - official product page (AWS).
- [Amazon EventBridge features](https://aws.amazon.com/eventbridge/features/) - event bus, Pipes, Scheduler, Schema Registry, API Destinations.
- [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/) - user guide and API reference.
- [Amazon EventBridge pricing](https://aws.amazon.com/eventbridge/pricing/) - source for all pricing figures on this page.
- [EventBridge Scheduler now in all AWS Regions](https://aws.amazon.com/about-aws/whats-new/2025/07/amazon-eventbridge-scheduler-all-aws-regions/) - 2025 availability update.
- [EventBridge Scheduler resource count metrics](https://aws.amazon.com/about-aws/whats-new/2026/02/amazon-eventbridge-scheduler-resource-metrics/) - February 2026 update.
- [AWS Well-Architected Serverless Applications Lens](https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html) - serverless best practices.
- [Using S3 event notifications with EventBridge](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventBridge.html) - enabling S3 events to the bus.
