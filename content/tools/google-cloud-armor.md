---
title: "Cloud Armor - Web Application Firewall and DDoS Protection"
description: "Google Cloud Armor provides web application firewall (WAF), DDoS protection, and adaptive security policies for applications deployed on Google Cloud."
date: 2026-03-28
categories: [Tools]
tags: [gcp, google-cloud, security, waf, ddos-protection, network-security]
related:
  - tools/aws-waf
  - tools/google-cloud-run
  - tools/google-cloud-functions
last_updated: 2026-05-30
---

Google Cloud Armor is a web application firewall (WAF) and DDoS protection service that defends applications running on Google Cloud from network and application-layer attacks. It operates at the edge of Google's global network, filtering malicious traffic before it reaches your application infrastructure. Cloud Armor protects applications behind external HTTP(S) load balancers, including workloads on Compute Engine, GKE, Cloud Run, and Cloud Functions, providing a consistent security layer regardless of the backend compute platform.

Cloud Armor's security policies consist of rules that evaluate incoming requests against configurable conditions and take actions (allow, deny, rate-limit, redirect, or throttle). Rules can match on IP addresses, IP ranges, geographic regions, HTTP headers, request paths, query parameters, and custom expressions using the Common Expression Language (CEL). Pre-configured WAF rules based on the OWASP ModSecurity Core Rule Set protect against common web vulnerabilities including SQL injection, cross-site scripting (XSS), remote code execution, and local file inclusion. Adaptive Protection uses machine learning to detect and mitigate Layer 7 DDoS attacks by analyzing traffic patterns and automatically suggesting rules to block anomalous traffic.

For AI-powered applications, Cloud Armor is essential for protecting public-facing inference endpoints and APIs. As organizations expose AI capabilities through APIs -- chatbots, document processing endpoints, recommendation services -- they become targets for abuse, scraping, and DDoS attacks. Cloud Armor's rate limiting prevents individual clients from overwhelming AI inference endpoints, while bot management features distinguish legitimate users from automated scrapers. Named IP address lists allow quick blocking of known malicious networks, and the preview mode lets teams evaluate rule impact before enforcement.

## Key Capabilities

- **Pre-Configured WAF Rules** - OWASP-based rule sets for SQL injection, XSS, remote code execution, and other common web attack vectors, deployable with one click.
- **Adaptive Protection** - ML-based anomaly detection that identifies Layer 7 DDoS attacks and automatically suggests mitigation rules based on traffic pattern analysis.
- **Rate Limiting** - Per-client rate limiting by IP, header, or other attributes, protecting backend services from traffic spikes and abuse.
- **Bot Management** - reCAPTCHA Enterprise integration for distinguishing human users from automated bots, with challenge pages and score-based access control.

## AWS Equivalent

Cloud Armor is Google Cloud's counterpart to AWS WAF combined with AWS Shield. AWS WAF provides application-layer firewall rules, while AWS Shield (Standard and Advanced) provides DDoS protection. Cloud Armor combines both capabilities in a single service. AWS WAF offers more granular rule customization through its rule groups marketplace, while Cloud Armor's Adaptive Protection provides more automated ML-based DDoS detection. Both services integrate with their respective CDN/load balancing infrastructure.

## Origins and History

Google Cloud Armor was announced at Google Cloud Next 2018 in July 2018 and reached general availability in 2019. The service built on Google's internal DDoS mitigation infrastructure, which protects Google Search, YouTube, and Gmail from some of the largest attacks on the internet. Pre-configured WAF rules based on OWASP ModSecurity were added in 2019. Adaptive Protection, the ML-based DDoS detection feature, launched in preview in 2021 and reached GA in 2022. Rate limiting and bot management with reCAPTCHA Enterprise integration were added in 2022, expanding Cloud Armor from a WAF/DDoS service to a broader application protection platform. Edge security policies for Cloud CDN were introduced in 2023.

## Sources

1. Google Cloud Documentation. "Cloud Armor overview." https://cloud.google.com/armor/docs/cloud-armor-overview
2. Google Cloud Blog. "Introducing Google Cloud Armor Adaptive Protection." 2021. https://cloud.google.com/blog/products/identity-security/google-cloud-armor-adaptive-protection
