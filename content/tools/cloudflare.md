---
title: "Cloudflare - CDN, Edge Compute and AI Gateway"
description: "What Cloudflare offers beyond the CDN: Workers at the edge, Workers AI, AI Gateway in front of model providers, and R2 object storage without egress fees."
date: 2026-10-19
categories: [Tools]
tags: ["cdn", "content-delivery", "caching", "edge-computing", "security", "serverless", "ai-gateway", "intermediate", "infrastructure"]
related:
  - glossary/cdn
  - basics/what-is-caching
  - glossary/edge-computing
  - tools/amazon-cloudfront
  - tools/azure-front-door
  - tools/minio
layer: infrastructure
provider: other
pricing_model: freemium
maturity: production
last_updated: 2026-10-19
lastmod: 2026-10-19
last_verified: 2026-10-19
---

Cloudflare began as a content delivery network with DDoS protection and has become a platform that also runs code, stores objects and sits in front of AI model providers. For an architecture decision the important property is independence: it belongs to none of the three big clouds, so the domain, the certificates, the cache rules and the edge logic stay put if the workload itself moves. That is the whole argument for it, and it is a strong one.

Official documentation: https://developers.cloudflare.com/cache/  
Workers: https://developers.cloudflare.com/workers/  
Workers AI: https://developers.cloudflare.com/workers-ai/  
AI Gateway: https://developers.cloudflare.com/ai-gateway/  
R2 object storage: https://developers.cloudflare.com/r2/

**AWS equivalent:** {{< relref "tools/amazon-cloudfront" >}} plus Lambda@Edge, AWS WAF and S3.
**Azure equivalent:** {{< relref "tools/azure-front-door" >}} plus Azure Functions and Blob Storage.

## Foundations for beginners

The underlying ideas are covered elsewhere: what a CDN does in {{< relref "glossary/cdn" >}}, what caching decides in {{< relref "basics/what-is-caching" >}}, and what running code at the edge means in {{< relref "glossary/edge-computing" >}}.

The Cloudflare-specific point is where it sits. Traffic reaches Cloudflare because your domain's DNS points at it, not because your origin is hosted there. The origin can be anywhere: an AWS load balancer, a server in your own rack, a bucket. That is why it composes with the clouds instead of competing with them.

## The parts that matter for an AI architecture

**CDN and cache.** Edge caching with per-rule control over the cache key, TTLs and purge. Tiered caching reduces how often the origin is asked at all. Standard CDN behaviour, with the usual trade between a cache that is effective and a response that is personalised.

**Workers.** JavaScript, TypeScript, Python or WebAssembly running at the edge on a startup model measured in milliseconds. Useful for auth checks, request shaping, routing between origins and small APIs. Compared with Lambda@Edge it starts faster and costs less, and it is a different runtime, not a port.

**Workers AI.** Inference on Cloudflare's own GPUs, called from a Worker, with a catalogue of open models. It suits small, latency-sensitive tasks close to the user: classification, embeddings, moderation, a quick summary. It is not where a large frontier model workload belongs.

**AI Gateway.** A proxy that sits between your application and a model provider, whoever that provider is. It gives caching of identical requests, rate limiting, retries and fallbacks between providers, and one place where every call is logged with its cost and latency. For a team that cannot see what its AI spend is doing, this is often the fastest fix available, and it does not require changing providers.

**R2.** S3-compatible object storage with no egress fee. That single property changes the economics of anything that serves large files repeatedly, which is why it shows up in media and dataset architectures.

**Zero Trust and WAF.** Access control in front of internal applications, plus the firewall, bot management and rate limiting the company is known for.

## Where it fits, and where it does not

It fits when delivery should not be tied to one cloud, when an API in front of a model needs a rate limit and a cache before anything expensive happens, and when large files are served often enough that egress is the real bill.

It does not replace the cloud the application runs in. The compute model is deliberately small and short-lived, the storage is object storage and not a database you would run a platform on, and the AI catalogue is not the place for the heaviest workloads. Treating it as a fourth hyperscaler leads to a disappointing project.

## Cost model

A free tier that is genuinely usable, then paid plans per product: Workers by requests and CPU time, R2 by stored volume and operations with no egress charge, AI Gateway and Workers AI by usage. Enterprise agreements exist above that. Confirm current rates on Cloudflare's own pricing pages before modelling anything.

## Data residency note

Being able to say where traffic is handled matters in European projects. Cloudflare sells a regional services option that keeps TLS termination and inspection within a chosen region. If residency is a requirement rather than a preference, confirm exactly which products that covers for your plan, because it does not apply uniformly across the whole platform.

## Sources and Further Reading

1. Cloudflare Docs. "Cache." https://developers.cloudflare.com/cache/
2. Cloudflare Docs. "Workers." https://developers.cloudflare.com/workers/
3. Cloudflare Docs. "Workers AI." https://developers.cloudflare.com/workers-ai/
4. Cloudflare Docs. "AI Gateway." https://developers.cloudflare.com/ai-gateway/
5. Cloudflare Docs. "R2 object storage." https://developers.cloudflare.com/r2/
