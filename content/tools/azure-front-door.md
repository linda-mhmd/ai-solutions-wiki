---
title: "Azure Front Door - Edge Delivery, Load Balancing and WAF"
description: "What Azure Front Door does, how its caching and routing rules work, and where it fits when an AI application on Azure has to be delivered and protected at the edge."
date: 2026-10-19
categories: [Tools]
tags: ["azure", "cdn", "content-delivery", "caching", "edge-computing", "security", "intermediate", "infrastructure"]
related:
  - glossary/cdn
  - basics/what-is-caching
  - tools/amazon-cloudfront
  - tools/azure-blob-storage
  - tools/aws-waf
  - tools/azure-monitor
layer: infrastructure
provider: azure
pricing_model: payg
maturity: production
last_updated: 2026-10-19
lastmod: 2026-10-19
last_verified: 2026-10-19
---

Azure Front Door is Microsoft's edge platform: content delivery, global load balancing and a web application firewall sold as one profile rather than three products. A request from a user enters Microsoft's network at the nearest edge location, is answered from cache when a valid copy is there, and is otherwise routed to whichever origin is healthy and closest. It is not an AI service, but on Azure it is usually the thing in front of an AI application, and the place where delivery, routing and protection are configured together.

Official documentation: https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview  
Caching behaviour: https://learn.microsoft.com/en-us/azure/frontdoor/front-door-caching  
WAF on Front Door: https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/afds-overview

**AWS equivalent:** {{< relref "tools/amazon-cloudfront" >}} for the CDN part, with AWS Global Accelerator and AWS WAF covering the routing and firewall parts separately.
**GCP equivalent:** Cloud CDN behind an external Application Load Balancer, with Cloud Armor as the WAF.

## Foundations for beginners

Two underlying ideas are covered at more length elsewhere in this wiki: what a content delivery network is, in {{< relref "glossary/cdn" >}}, and how caching decides what counts as the same request, in {{< relref "basics/what-is-caching" >}}.

What is specific to Front Door is that it bundles three jobs most platforms sell apart:

- **Delivery.** Caching static responses at the edge so the origin is not asked again.
- **Global load balancing.** Choosing between several origins, in different regions, by health and by latency, and failing over when one stops answering.
- **Protection.** A web application firewall with managed rule sets, bot rules and rate limiting, applied before a request reaches your application.

A Front Door **profile** is the unit you create. Inside it, an **endpoint** has a hostname, a **route** matches paths and sends them to an **origin group**, and the origin group holds the actual origins with their health probes.

## Core capabilities

**Caching and rules.** Caching is enabled per route. The Rules Engine then changes behaviour by condition: rewrite a path, add a security header, vary the cache key on a query string, bypass the cache for a path that must never be stored. Purge is by path or by wildcard.

**Routing and failover.** Origins carry a priority and a weight. Health probes decide which are eligible, and traffic moves to the next priority when the current one fails. This is the part that has no single equivalent on AWS, where CloudFront and Global Accelerator split the job.

**TLS and custom domains.** Managed certificates for your own domains, with TLS terminated at the edge. Private Link support means the origin can stay off the public internet entirely.

**WAF.** Microsoft-managed rule sets, custom rules, rate limiting and bot protection, attached to the same profile. Policies can be run in detection mode first, which is the only sane way to turn one on in front of a live application.

**Tiers.** Standard and Premium differ in whether Private Link, bot protection and the managed rule sets are included. Choose by the protection you need, not by the delivery features, which are largely shared.

## Where it fits in an AI application

**In front of the API.** The route to a model is the expensive route, so rate limiting and bot rules at the edge are cheaper than any check inside your application. A burst stopped at the edge costs nothing in tokens.

**Serving generated media.** Images, audio and video produced by a pipeline are written once and read many times. They cache well and cheaply. Content that belongs to one customer should not be cached shared, and the cache key is where that is decided.

**Multi-region AI workloads.** When the same application runs in two regions for capacity or residency reasons, Front Door is what sends a user to the right one and what moves traffic when a region degrades.

**Streaming responses.** A token-by-token response passes through, but is not cacheable. Say so explicitly on that route rather than relying on the default.

## Cost model

Billing combines a base fee per profile with outbound data transfer, requests, and extras for WAF rules, Private Link and additional domains. Standard and Premium are priced differently and the tier is chosen per profile. Rates change: confirm on the Azure pricing page before building a model.

## Deciding between Front Door and the alternatives

Front Door is the natural answer when the application already runs on Azure, when the WAF and the CDN should be managed by one team in one place, and when global failover between regions is a requirement rather than a nice-to-have. A vendor-neutral CDN is the better answer when the delivery layer should outlive the choice of cloud. Running your own caching proxy makes sense only where content cannot leave your own premises.

## Sources and Further Reading

1. Microsoft Learn. "What is Azure Front Door?" https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview
2. Microsoft Learn. "Caching with Azure Front Door." https://learn.microsoft.com/en-us/azure/frontdoor/front-door-caching
3. Microsoft Learn. "Azure Web Application Firewall on Azure Front Door." https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/afds-overview
4. AWS Documentation. "What is Amazon CloudFront?" https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html
5. Google Cloud Documentation. "Cloud CDN overview." https://cloud.google.com/cdn/docs/overview
