---
title: "Module 4: Layer 1: Interface"
description: "Module 4 of the AI Film Crew course: Interface. About 1.4 minutes, with the full video and its content to read through."
date: 2026-06-15
last_updated: 2026-06-15
weight: 4
chapter: 4
layer: "Layer 1"
duration_min: 1.4
video_file: "m04.mp4"
summary: "What you click. The only layer most people see, and deliberately the dumbest one."
tags: ["course","aws","beginner"]
concepts:
  - api-gateway
  - nextjs
  - api
  - cdn
  - event-driven-architecture
---

Layer one: the interface. The only layer most people ever see.

{{< five-layers active="1" >}}

{{< still src="m04-a.jpg" caption="What you click. The only layer most people see, and deliberately the dumbest one." >}}

For VideoFlow the interface is a web dashboard, a Next.js app, where an operator drags in footage and watches the pipeline run. But a click is just the surface. Underneath, every button becomes a request to a REST API.

## The request chain

{{< chain >}}
Next.js | the app you see
CloudFront | cache and TLS | amazon-cloudfront
API Gateway | auth and routing
FastAPI | REST and OpenAPI
{{< /chain >}}

Underneath every click, the request travels down a short chain. Here the REST API is FastAPI, with every route documented. In front of it, CloudFront caches the app close to you and handles encryption. API Gateway checks who you are before a single function runs.


{{< still src="m04-b.jpg" >}}
## A thin pane of glass

Notice what the interface does not do.

> Makes no decisions. Owns no data. A thin pane of glass over everything below.

That is the discipline of a layered system. The layer you touch is deliberately the dumbest one. Everything real happens below.

## Three surfaces, one API

The dashboard, the searchable media library, the use-case wizard: all of it just reads and writes through that one API.

- **Dashboard.** Pipeline health, live runs.
- **Media library.** Semantic search over footage.
- **Use-case wizard.** News, aftermovie, wrapped.

One REST API underneath. Three different surfaces, but none of them is the work. They are all just views, each one reading and writing through the same single API.

## The handoff

And when the operator drops a file, the interface does exactly one thing. It puts the video in a bucket, and walks away. The input bucket is the only thing the interface touches.

Who picks it up? That is layer two.
