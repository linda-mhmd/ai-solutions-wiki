---
title: "Module 6: Layer 3: Compute"
description: "Module 6 of the AI Film Crew course: Compute. About 1.4 minutes, with the full video and its content to read through."
date: 2026-06-15
last_updated: 2026-06-15
weight: 6
chapter: 6
layer: "Layer 3"
duration_min: 1.4
video_file: "m06.mp4"
summary: "What does the work. Serverless functions that exist only while they run."
tags: ["course","aws","beginner"]
concepts:
  - serverless
  - infrastructure-as-code
services:
  - aws-lambda
  - aws-mediaconvert
  - aws-fargate
---

Layer three: compute. The layer that does the work. After the order is taken, something has to actually fulfill it. This is where the labor happens: the functions, the jobs, and the containers that pick up work, do one thing, and stop.

{{< five-layers active="3" >}}

{{< still src="m06-a.jpg" caption="What does the work. Serverless functions that exist only while they run." >}}

## No servers, just workers that appear when needed

VideoFlow has no servers. It has about 38 Lambda functions: small pieces of code that exist only while they are needed. A Lambda is a motion-sensor light. It switches on when something happens, runs for seconds, then disappears. One checks the file. One extracts audio. One builds a clip. Each does a single job, then stops existing.


{{< still src="m06-b.jpg" >}}
## The shapes of compute

For the heavy lifting there is a different shape. The same idea, sized differently for the size of the job.

{{< chain >}}
Lambda | a motion-sensor light: on, runs for seconds, gone | aws-lambda
MediaConvert | one job, three derivatives at once | aws-mediaconvert
Fargate | containers for renders too big for a function | aws-fargate
Batch | bursts through frame jobs
{{< /chain >}}

Containers on Fargate handle renders too big for a function. Batch bursts through frame jobs. Right tool, right size: a function for seconds, a container for minutes.

## One MediaConvert job, three derivatives at once

One MediaConvert job takes the upload and emits three derivatives at once:

- A small **540p proxy** for editing.
- **Clean audio** for transcription.
- **A frame every two seconds** for vision.

The original is never touched again.

## Idle costs almost nothing

> Because compute only exists while running, an idle pipeline costs almost nothing.

Ten thousand videos a month or zero: the workers clock out either way.

But workers do not decide what to make. For that, this system has something stranger. Layer four.
