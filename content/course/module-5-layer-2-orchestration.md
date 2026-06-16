---
title: "Module 5: Layer 2: Orchestration"
description: "Module 5 of the AI Film Crew course: Orchestration. About 1.6 minutes, with the full video and its content to read through."
date: 2026-06-15
last_updated: 2026-06-15
weight: 5
chapter: 5
layer: "Layer 2"
duration_min: 1.6
video_file: "m05.mp4"
summary: "What gives the orders. Workflows that retry, wait for free, and show exactly what broke."
tags: ["course","aws","beginner"]
concepts:
  - event-driven-architecture
  - idempotency
  - circuit-breaker
services:
  - aws-step-functions
  - amazon-eventbridge
  - amazon-cloudwatch
  - aws-mediaconvert
---

Layer two: orchestration. The layer that gives the orders. This is the layer that lists the steps, runs them in order, retries what fails, and shows exactly where something broke.

{{< five-layers active="2" >}}

{{< still src="m05-a.jpg" caption="What gives the orders. Workflows that retry, wait for free, and show exactly what broke." >}}

## The recipe the computer follows

The moment a file lands in storage, an event fires, and a Step Functions workflow wakes up. Think of it as a recipe the computer follows, step by step. It lists every step, runs them in order, retries what fails, and shows exactly where something broke.

{{< chain >}}
S3 event | the upload trigger wakes the workflow | amazon-s3
File sanitizer | checks codec, container, duration | aws-step-functions
Already processed? | a choice that prevents double work
Preprocess | hands off to MediaConvert | aws-mediaconvert
Labels, transcript, meaning | three analyses fan out in parallel
Merge to brief | the streams come back together
{{< /chain >}}


{{< still src="m05-b.jpg" >}}
## Nine workflows, and the main one only delegates

VideoFlow runs nine of these workflows. The main one drives the whole pipeline, and it never does any work itself. It only delegates. The orchestrator is a conductor, not a worker. It decides what happens next and hands each task to the layer below.

## The zero-compute poll

Here is the pattern that makes it cheap. To wait on a slow job, the workflow asks: are you done? If not, it pauses. Completely.

> Nothing runs during a Wait state. Polling a transcription job costs zero compute.

One pattern, reused for Transcribe, Bedrock Data Automation, and MediaConvert. Every slow job in the system waits the same free way.

## Orchestration is also where time lives

EventBridge fires the schedules, queues decouple the work, alarms watch the metrics.

{{< chain >}}
EventBridge | fires the schedules | amazon-eventbridge
Queues | decouple the work
Alarms | watch the metrics | amazon-cloudwatch
{{< /chain >}}

## When it fails at 2 a.m., no log hunting

And when something fails at 2 a.m., the execution history shows every state with its input, its output, and the exact error, inline. No log hunting. You do not go digging through scattered logs to find the failure. The failed state is right there, with what went in, what came out, and the exact error.

> An assembly line where every station is visible, and the conveyor belt itself is free.

But orders are nothing without workers. Layer three.
