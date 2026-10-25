---
title: "Amazon CloudFront - Content Delivery and Edge Compute"
description: "What Amazon CloudFront does, how its caching and signed URLs work, and where it fits in an AI pipeline that serves generated media or an inference API."
date: 2026-10-19
categories: [Tools]
tags: ["aws", "aws-service", "cdn", "content-delivery", "caching", "edge-computing", "intermediate", "infrastructure"]
related:
  - glossary/cdn
  - basics/what-is-caching
  - glossary/edge-computing
  - tools/google-media-cdn
  - tools/aws-waf
  - tools/aws-lambda
  - tools/amazon-cloudwatch
  - tools/aws-mediaconvert
layer: infrastructure
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-10-19
lastmod: 2026-10-19
last_verified: 2026-10-19
---

Amazon CloudFront is AWS's content delivery network. It sits in front of an origin you already have, an S3 bucket, an Application Load Balancer, an API Gateway endpoint or any public HTTP server, and answers requests from the point of presence closest to the user. When the edge already holds a valid copy of the response, the origin is never contacted. CloudFront is not an AI service, but it is the delivery layer in front of most AI products: the generated image, the rendered video, the model response that can be cached, and the API that must not fall over when a launch goes well.

Official documentation: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html  
Pricing: https://aws.amazon.com/cloudfront/pricing/  
Service quotas: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html

**Azure equivalent:** Azure Front Door (which merged the former Azure CDN profiles).
**GCP equivalent:** Cloud CDN for general traffic, {{< relref "tools/google-media-cdn" >}} for media at scale.

## Foundations for beginners

Two ideas carry most of the behaviour, and both are explained at more length elsewhere in this wiki:

- **A content delivery network** keeps copies of your content in many locations so a request travels a short distance instead of a long one. See {{< relref "glossary/cdn" >}}.
- **Caching** is the rule set that decides how long a copy stays valid and what counts as the same request. See {{< relref "basics/what-is-caching" >}}.

A CloudFront **distribution** is the unit you create. It has one or more **origins** (where the real content lives), a set of **cache behaviours** that match URL path patterns, and a domain name. You point your own domain at that distribution with a DNS record, attach a certificate, and traffic starts flowing through the edge.

## Core capabilities

**Caching and cache keys.** A cache policy defines what goes into the cache key: which query strings, headers and cookies matter, and what the default, minimum and maximum time to live are. Anything you leave out of the key makes the cache more effective and the response less personalised, which is the whole trade. An origin request policy separately controls what CloudFront forwards to the origin, so you can forward a header without caching on it.

**Invalidation.** When content changes before its TTL expires, you invalidate the path. A cheaper and more predictable pattern is to put a version or a content hash in the file name so a new file is a new URL and nothing needs invalidating.

**TLS and certificates.** CloudFront terminates TLS at the edge. Certificates for a distribution come from AWS Certificate Manager in the us-east-1 Region, regardless of where the origin runs: this surprises people the first time.

**Access control for private content.** Signed URLs and signed cookies make a file readable for a window of time or from a particular address range, which is how a download link can expire on its own. Origin Access Control lets a distribution read a private S3 bucket while the bucket itself stays closed to the internet.

**Protection.** AWS Shield Standard is included. AWS WAF attaches to a distribution for rules on top, see {{< relref "tools/aws-waf" >}}. Geographic restriction blocks or allows countries at the edge.

**Compute at the edge.** Two options, and they are not interchangeable:

- **CloudFront Functions** run lightweight JavaScript on viewer request and viewer response only, with sub-millisecond start up. They suit header rewriting, redirects, URL normalisation and simple token checks. A CloudFront KeyValueStore gives them a small read-only data set to look things up in without a network call.
- **Lambda@Edge** runs Node.js or Python on all four events, including origin request and origin response, and can make network calls. It costs more and adds latency, so it is for work that CloudFront Functions genuinely cannot do.

**Logging.** Standard logs and real-time logs land in S3, Kinesis Data Streams or CloudWatch Logs, which is where delivery problems are actually diagnosed. See {{< relref "tools/amazon-cloudwatch" >}}.

## Where it fits in an AI pipeline

**Serving generated media.** A pipeline that renders video or images writes the finished file to S3 and serves it through CloudFront. The file never changes once written, so the TTL can be long and the cost per view collapses to the data transfer. If the asset is private to one customer, a signed URL makes the share link expire instead of living forever.

**Caching model responses, carefully.** A model response can be cached when the same input must give the same output and the content is not personal: a classification of a public document, a translation of a fixed string, a rendered chart. Cache on the exact inputs by putting them in the cache key, and do not cache anything derived from a user's own data. A wrongly shared response is a data leak, not a performance bug.

**Streaming responses.** CloudFront passes through chunked responses, so a token-by-token stream from an inference endpoint works behind it. Such a response is not cacheable and the behaviour should say so.

**Protecting an expensive API.** The route to a model is the expensive route. WAF rate rules at the edge, plus an authorisation check in a CloudFront Function or at the origin, stop traffic before it reaches anything that bills per token. The identity side of that is {{< relref "tools/amazon-cognito" >}}.

## Cost model

Charges are driven by data transferred out to the internet, the number of requests, and a per-Region price that differs by where the viewer is. Data transfer from an AWS origin into CloudFront is not charged. Invalidation requests are free up to a monthly allowance and then billed per path. Functions, Lambda@Edge, real-time logs, field-level encryption and dedicated IP certificates are each billed separately. Committed-use pricing exists for predictable volume. Rates change, so confirm on the pricing page before building a cost model.

## Deciding between CloudFront and the alternatives

CloudFront is the obvious answer when your origin is already in AWS, when you want WAF and Shield in the same account, and when signed URLs for private S3 content are part of the design. A third-party CDN is the better answer when you want the delivery layer to outlive your choice of cloud, because the domain, the certificates and the cache rules then stay put if the workload moves. Running your own caching proxy makes sense when content may not leave your premises at all, and stops making sense as soon as the audience is spread across continents.

## Sources and Further Reading

1. AWS Documentation. "What is Amazon CloudFront?" https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html
2. AWS Documentation. "Control the cache key with a policy." https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html
3. AWS Documentation. "Serve private content with signed URLs and signed cookies." https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html
4. AWS Documentation. "Restrict access to an Amazon S3 origin with origin access control." https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
5. AWS Documentation. "Customize at the edge with CloudFront Functions." https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html
6. AWS Documentation. "Customize at the edge with Lambda@Edge." https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html
7. AWS Documentation. "Amazon CloudFront KeyValueStore." https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/kvs-with-functions.html
8. AWS. "Amazon CloudFront pricing." https://aws.amazon.com/cloudfront/pricing/
9. Microsoft Learn. "What is Azure Front Door?" https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview
10. Google Cloud Documentation. "Cloud CDN overview." https://cloud.google.com/cdn/docs/overview
