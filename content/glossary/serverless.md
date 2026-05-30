---
title: "Serverless Computing"
description: "What serverless computing means, how Lambda, Fargate, and Step Functions fit AI workloads, and when serverless is and is not the right choice."
date: 2026-03-24
categories: [Glossary]
tags: ["cloud-computing", "beginner", "serverless", "functions", "event-driven", "aws-lambda", "cloud"]
last_updated: 2026-05-30
---

Serverless computing is a cloud execution model where the cloud provider manages server provisioning, scaling, and availability. You deploy code or containers without managing the underlying infrastructure. Billing is based on actual usage (invocations, duration) rather than reserved capacity.

"Serverless" does not mean no servers exist - it means you do not manage them. The abstraction shifts operational responsibility to the cloud provider.

## AWS Serverless Services

**AWS Lambda** is the primary serverless compute service. You deploy a function (Python, Node.js, Java, Go, or any language via custom runtimes), configure a trigger, and Lambda runs your code on demand. Key characteristics:
- Maximum 15-minute execution timeout
- Up to 10 GB memory (also controls CPU allocation)
- Scales to thousands of concurrent executions automatically
- Billed per 1ms of execution time and per request

Lambda is appropriate for: event-triggered processing (S3 uploads, API requests), short-to-medium duration tasks, spiky or unpredictable workloads.

**AWS Fargate** runs containers without managing EC2 instances. Unlike Lambda, there is no timeout limit and no function paradigm - you run a Docker container with whatever your application requires. Fargate suits longer-running tasks, workloads requiring specific system dependencies, and batch processing jobs.

**AWS Step Functions** is a serverless orchestration service. It manages multi-step workflows as state machines: each step calls a Lambda, Fargate task, or AWS service API; Step Functions handles sequencing, parallel execution, error handling, and retries. For AI pipelines with 5+ steps, Step Functions provides visibility and reliability that raw Lambda chains cannot.

## When Serverless Fits AI Workloads

Serverless excels for:

**Event-driven processing** - a video arrives, Lambda triggers, processing begins. No idle compute waiting for uploads.

**Variable load** - AI applications often have spiky demand (batch processing at night, burst during business hours). Serverless scales to zero between bursts, so you pay only for active processing.

**Short-to-medium tasks** - invoking Bedrock, calling Transcribe, extracting text with Textract, enriching metadata all complete in seconds. Lambda is the natural container.

**API backends** - Lambda behind API Gateway handles AI query routing, response formatting, and authentication without managed servers.

## When Serverless Does Not Fit

**Long video processing** - a 2-hour video transcoding job exceeds Lambda's 15-minute limit. Use MediaConvert or Fargate.

**GPU workloads** - Lambda does not offer GPU instances. Custom ML inference requiring GPU runs on EC2 or SageMaker.

**Sustained high throughput** - at very high sustained request rates (thousands per second continuously), provisioned capacity on EC2 may be cheaper than Lambda's per-invocation cost.

**Large model loading** - loading a 10 GB model into memory on Lambda cold start takes too long for acceptable latency. SageMaker inference endpoints keep models warm.

## Cold Starts

Lambda cold starts occur when a new execution environment initializes. The runtime loads, your deployment package extracts, and initialization code runs before your handler executes. Cold start duration ranges from tens of milliseconds (Python, Node.js) to seconds (Java, .NET).

For AI applications where users notice latency, mitigate cold starts with:
- Provisioned Concurrency (pre-warmed execution environments, adds cost)
- Keeping handler initialization lightweight (defer SDK client creation)
- Using smaller runtimes (Python or Node.js over Java for Lambda)

## Related Articles

- [AWS Lambda]({{< relref "/tools/aws-lambda.md" >}}) - primary serverless compute
- [Event-Driven Architecture]({{< relref "event-driven-architecture.md" >}}) - architectural pattern for serverless
- [AWS Step Functions]({{< relref "/tools/aws-step-functions.md" >}}) - serverless orchestration

## Sources

- Jonas, E., et al. (2019). Cloud programming simplified: A Berkeley view on serverless computing. *arXiv:1902.03383*. (Berkeley serverless computing survey; defines characteristics, use cases, and limitations; standard academic reference for the paradigm.)
- Baldini, I., et al. (2017). Serverless computing: Current trends and open problems. *Research Advances in Cloud Computing*. (Survey of serverless architectures, cold start issues, and latency characteristics.)
