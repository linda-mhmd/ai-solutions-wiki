---
title: "Event-Driven Architecture for AI"
description: "What event-driven architecture is, how S3 triggers, EventBridge, and Step Functions patterns enable scalable AI pipelines."
date: 2026-03-24
categories: [Glossary]
tags: ["software-engineering", "intermediate", "event-driven", "messaging", "pub-sub", "kafka", "decoupling"]
last_updated: 2026-05-30
---

Event-driven architecture (EDA) is a software design pattern where components communicate by producing and consuming events - records of something that happened. Components are decoupled: the producer does not know who will consume the event, and consumers do not know who produced it. This decoupling makes systems more scalable, maintainable, and extensible.

## Core Concepts

**Events** are immutable records of facts. "A video file was uploaded to S3" is an event. "An analysis job completed" is an event. Events carry context (what happened, when, relevant identifiers) but are not commands ("process this file" is a command, not an event).

**Producers** emit events when state changes. S3 emits ObjectCreated events. Rekognition emits job completion events. Your Lambda functions can publish custom events.

**Consumers** subscribe to relevant events and act on them. A Lambda function that starts transcription when a video arrives is a consumer.

**Event buses** route events from producers to consumers based on rules. Amazon EventBridge is the primary AWS event bus.

## Why EDA for AI Pipelines

AI pipelines are naturally event-driven because each step's completion triggers the next. A synchronous architecture (caller waits for each step) does not work when steps take minutes (MediaConvert transcoding) or are asynchronous by design (Rekognition video analysis).

Event-driven patterns enable:
- **Long-running workflows** - a pipeline can span hours across multiple services
- **Parallel processing** - one event triggers multiple independent consumers simultaneously
- **Retry and error handling** - failed events route to dead-letter queues for inspection and replay
- **Loose coupling** - adding a new processing step requires adding a consumer, not modifying existing code

## Key AWS Patterns

**S3 trigger pattern:** File upload triggers EventBridge rule, rule invokes Lambda. The simplest event-driven pattern. Configure the trigger in the S3 bucket notification settings or through EventBridge's S3 integration.

**Async job completion pattern:** Rekognition and Transcribe run async jobs and publish completion to SNS. Route SNS messages to EventBridge or SQS, then to Lambda. The Lambda that submitted the job does not poll - it exits and the system wakes up on completion.

**Step Functions orchestration:** For multi-step pipelines with complex branching, error handling, and retry logic, Step Functions provides a managed state machine. Each state in the workflow is a step; transitions are triggered by step completion events. Visualize the execution in the AWS console.

**Fan-out pattern:** One event triggers multiple independent processes. An S3 upload EventBridge rule targets three Lambda functions: thumbnail generation, virus scan, and metadata extraction. All run simultaneously without coupling.

## EventBridge vs SQS vs SNS

These three services are often confused:

- **EventBridge** - intelligent routing based on event content (rules and patterns), integrates with 200+ AWS services
- **SQS** - message queue for point-to-point, durable, ordered (FIFO) delivery; consumers poll
- **SNS** - pub/sub fan-out; one message to multiple subscribers (Lambda, SQS, HTTP endpoints)

Use EventBridge when event routing logic matters. Use SQS when you need durable buffering between a producer and a single consumer. Use SNS when you need to deliver the same message to multiple heterogeneous endpoints.

## Related Articles

- [Amazon EventBridge]({{< relref "/tools/amazon-eventbridge.md" >}}) - primary event bus
- [AWS Step Functions]({{< relref "/tools/aws-step-functions.md" >}}) - orchestration for multi-step pipelines
- [Serverless Computing]({{< relref "serverless.md" >}}) - execution model for event consumers

## Sources

- Hohpe, G., & Woolf, B. (2003). *Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions*. Addison-Wesley. (Canonical reference for event-driven patterns including publish-subscribe, message channels, and routing; the foundation modern EDA implementations are built on.)
- Fowler, M. (2017). What do you mean by "event-driven"? *martinfowler.com*. (Defines event notification, event-carried state transfer, event sourcing, and CQRS as distinct EDA patterns.)
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media. Chapter 11: Stream Processing. (Log-based messaging and event-driven data pipelines; foundational for AI pipeline EDA design.)
