---
title: "Module 8: Layer 5: State"
description: "Module 8 of the AI Film Crew course: State. About 1.3 minutes, with the full video and its content to read through."
date: 2026-06-15
last_updated: 2026-06-15
weight: 8
chapter: 8
layer: "Layer 5"
duration_min: 1.3
video_file: "m08.mp4"
summary: "Where everything rests. The bedrock the whole stack stands on."
tags: ["course","aws","beginner"]
concepts:
  - file-systems
  - embeddings
  - vector-database
  - inference
services:
  - amazon-dynamodb
  - amazon-opensearch
---

Layer five: state. The bedrock. Every layer above is allowed to vanish. Functions disappear, workflows end, agents forget. This layer is not.

{{< five-layers active="5" >}}

{{< still src="m08-a.jpg" caption="Where everything rests. The bedrock the whole stack stands on." >}}

This is where everything rests. Compute can be re-rented by the second. Workflows wake and end. Agents hold a thought just long enough to answer and then let it go. State is the one layer that is not allowed to forget, because everything else can be rebuilt from what lives here.

## Five kinds of memory

Five kinds of memory, chosen by access pattern. Not one database asked to be everything.

{{< chain >}}
S3 | three buckets, the source of truth | amazon-s3
DynamoDB | metadata and the media index, in milliseconds | amazon-dynamodb
OpenSearch | semantic search over transcripts | amazon-opensearch
ElastiCache | hot reads, instant | amazon-elasticache
Aurora | records where transactions matter | amazon-aurora
{{< /chain >}}

Three S3 buckets are the source of truth: input, output, assets. Everything else can be rebuilt from them. DynamoDB holds the metadata: every video, every job, the media library index, with answers in milliseconds. OpenSearch makes it findable, with semantic search over transcripts and embeddings: ask for the part about pricing, and it knows. ElastiCache keeps hot reads instant. Aurora keeps the records where transactions matter. Shared file systems give render workers scratch space.

Each store is picked for the way it is read, not because it is the one tool you happen to know. Six shapes of access, six tools, no single database forced to pretend it is all of them.


{{< still src="m08-b.jpg" >}}
## State has gravity

And notice: state is the only layer with gravity. The functions, the workflows, the agents, the containers all float away the moment they finish. State stays.

> State is the only layer with gravity. Compute can be re-rented by the second. Your data cannot.

That is the bottom of the dig. Now watch what the whole stack does together.
