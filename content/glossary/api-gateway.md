---
title: "API Gateway"
description: "What an API gateway is, how it manages API traffic, and when to use managed gateways versus custom solutions."
date: 2026-03-28
categories: [Glossary]
tags: [API-gateway, microservices, security, rate-limiting, AWS]
related:
  - glossary/load-balancer
  - glossary/serverless
  - glossary/service-mesh
  - glossary/api
last_updated: 2026-05-30
---

An API gateway is a service that sits between clients and backend services, acting as a single entry point for all API requests. It handles cross-cutting concerns - authentication, rate limiting, request routing, response transformation, and monitoring - so individual services do not have to implement these independently.

## How It Works

When a client sends a request, the API gateway receives it, applies policies (authentication, throttling, validation), routes it to the appropriate backend service, and returns the response. The gateway can transform requests and responses, aggregate results from multiple services, and cache responses to reduce backend load.

**Amazon API Gateway** is the managed AWS service supporting REST, HTTP, and WebSocket APIs. It integrates directly with Lambda for serverless backends, IAM for authentication, and CloudWatch for monitoring. HTTP APIs are simpler and cheaper; REST APIs offer more features (request validation, response transformation, API keys).

**Kong, Apigee, and Tyk** are alternative API gateway platforms that run on your own infrastructure or as managed services, offering more customization at the cost of operational overhead.

## Why It Matters

API gateways centralize concerns that would otherwise be duplicated across every service: authentication, rate limiting, logging, and CORS handling. This reduces code duplication, enforces consistent security policies, and provides a single point for monitoring and throttling.

For AI applications, API gateways are the standard front door for model inference APIs. They handle authentication, throttle requests to prevent overloading inference endpoints, and provide usage metrics for cost attribution.

## Practical Guidance

Use Amazon API Gateway with Lambda for serverless AI APIs - the integration is tight, scaling is automatic, and operational burden is minimal. For high-throughput, low-latency APIs, use HTTP APIs (lower overhead than REST APIs). Implement request validation at the gateway to reject malformed requests before they reach your backend. Set up usage plans and API keys for external consumers to control access and monitor usage patterns.

Watch for the API Gateway payload size limit (10 MB for REST, 10 MB for HTTP APIs) and timeout limits (29 seconds for REST, 30 seconds for HTTP). For long-running AI inference, use asynchronous patterns with Step Functions or SQS rather than synchronous API calls.

## Sources

- Richardson, C., & Smith, F. (2016). *Microservices: From Design to Deployment*. NGINX. (API gateway pattern in microservices; routing, authentication, and aggregation as gateway responsibilities.)
- Newman, S. (2015). *Building Microservices*. O'Reilly Media. Chapter 6: Deployment. (API gateway as the single entry point for microservice architectures; service composition patterns.)
- AWS. (2024). *Amazon API Gateway Developer Guide*. Amazon Web Services. (Authoritative reference for REST, HTTP, and WebSocket APIs; quota, integration, and throttling behavior.)
