---
title: "AWS WAF - Web Application Firewall"
description: "AWS WAF is a web application firewall that protects web applications and APIs from common exploits, bot traffic, and malicious requests at the edge."
date: 2026-03-28
categories: [Tools]
tags: [aws-waf, AWS, security, firewall, web-security, api-protection, "aws-service"]
related:
  - tools/google-cloud-armor
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

AWS WAF (Web Application Firewall) is a managed firewall service that protects web applications and APIs against common web exploits, bot traffic, and application-layer attacks. It integrates with Amazon CloudFront, Application Load Balancer, Amazon API Gateway, and AWS AppSync to inspect and filter HTTP/HTTPS requests before they reach your application. For AI workloads, WAF is critical for protecting inference APIs from abuse, rate-limiting expensive model invocations, blocking prompt injection attempts delivered via HTTP, and preventing unauthorized scraping of AI-generated content.

Official documentation: https://docs.aws.amazon.com/waf/

## Key Capabilities

- **Managed Rule Groups** - Pre-configured rule sets from AWS and AWS Marketplace sellers that protect against OWASP Top 10 vulnerabilities, known bad inputs, and common bot signatures without writing custom rules
- **Custom Rules with Flexible Conditions** - Write rules that inspect request headers, body, URI, query strings, and IP addresses using string matching, regex patterns, size constraints, and geographic conditions
- **Rate-Based Rules** - Automatically block IP addresses (or other aggregation keys) that exceed a configurable request threshold within an evaluation window of 1, 2, 5 (default), or 10 minutes, essential for protecting costly AI inference endpoints from abuse
- **Bot Control** - Managed rule group that detects and manages bot traffic using browser fingerprinting, CAPTCHA challenges, and behavioral analysis

## AWS/Cloud Equivalent

AWS WAF is comparable to Google Cloud Armor, which provides similar DDoS protection and web application firewall capabilities for Google Cloud load balancers. Azure Web Application Firewall provides equivalent functionality integrated with Azure Application Gateway and Front Door. Cloudflare WAF is a popular third-party alternative that operates at the CDN edge. AWS WAF's primary advantage is its native integration with CloudFront and ALB, enabling rule deployment without additional infrastructure changes in AWS-native architectures.

## Origins and History

AWS WAF was launched in October 2015 as a basic web application firewall integrated with CloudFront. The original version (now called WAF Classic) had limited rule flexibility; AWS WAF Classic reaches end of support on 7 October 2026, so any remaining Classic web ACLs need migrating to the current AWS WAF. AWS WAF v2, released in November 2019, was a complete redesign with a new API, support for rule groups, managed rules from the AWS Marketplace, and integration with ALB and API Gateway. Bot Control was added in April 2021, and Fraud Control (for account creation and login fraud) followed in November 2021. The addition of CAPTCHA and Challenge actions gave WAF the ability to differentiate between human users and automated clients without blocking legitimate traffic outright.

## Sources

1. AWS. "AWS WAF Documentation." https://docs.aws.amazon.com/waf/
2. AWS Security Blog. "Introducing AWS WAF v2." November 2019.
3. AWS. "Rate-based rule high-level settings." AWS WAF Developer Guide, accessed 25 September 2026. https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-high-level-settings.html
4. AWS General Reference. "Services in sunset" (AWS WAF Classic, end of support 7 October 2026), accessed 25 September 2026. https://docs.aws.amazon.com/general/latest/gr/sunset_services.html
