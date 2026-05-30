---
title: "Multi-Provider LLM Failover"
description: "Automatic failover between LLM providers for high availability: health checking, routing strategies, response normalization, and cost-aware provider selection."
date: 2026-03-28
categories: [Patterns]
tags: [failover, multi-provider, llm, high-availability, routing, resilience, production]
related:
  - patterns/circuit-breaker-ai
  - patterns/multi-model-routing
  - patterns/graceful-degradation-ai
  - patterns/rate-limiting-ai
last_updated: 2026-05-30
---

Depending on a single LLM provider creates a single point of failure. Provider outages, rate limit exhaustion, and regional incidents can take down your entire AI-powered application. Multi-provider failover maintains connections to multiple LLM providers and automatically routes traffic to a healthy provider when the primary becomes unavailable.

## Provider Health Checking

**Active health checks** - Send lightweight probe requests to each provider on a regular interval (every 10-30 seconds). Measure response latency and verify response quality. A provider that responds slowly or returns degraded output is marked unhealthy before it causes user-facing errors.

**Passive health checks** - Monitor the error rate and latency of production requests to each provider. Use a sliding window to calculate failure rates. When the failure rate exceeds a threshold, mark the provider as unhealthy. This catches issues that active probes miss, such as rate limiting that only affects production traffic volumes.

**Circuit breaker integration** - Wrap each provider connection with a circuit breaker. When the circuit opens for the primary provider, the routing layer immediately redirects traffic to the secondary provider without waiting for active health checks to detect the issue.

## Routing Strategies

**Primary-secondary** - Route all traffic to the primary provider. Fail over to the secondary only when the primary is unhealthy. Simple to implement and minimizes cost when the primary provider offers better pricing.

**Weighted distribution** - Distribute traffic across providers according to configured weights (e.g., 80% primary, 20% secondary). This keeps the secondary provider warm and validates its behavior continuously. During failover, shift 100% to the healthy provider.

**Latency-based** - Route each request to the provider currently offering the lowest latency. This naturally shifts traffic away from a provider experiencing performance degradation before it fails completely.

**Cost-aware** - Select the cheapest provider that meets the quality and latency requirements for each request. Use a tiered approach where simple requests go to cheaper models and complex requests go to more capable (expensive) providers.

## Response Normalization

Different providers return responses in different formats with different metadata fields. The failover layer must normalize responses so that downstream application code does not need to handle provider-specific formats. Define a canonical response schema that includes the generated text, token usage, finish reason, and model identifier. Map each provider's response format to this schema.

## Prompt Compatibility

Prompts optimized for one provider's model may perform differently on another provider's model. Maintain provider-specific prompt variants and select the appropriate variant based on which provider is handling the request. Test prompt variants across providers as part of the evaluation pipeline.

## State Management

For multi-turn conversations, ensure that conversation history is stored in a provider-agnostic format. If a failover occurs mid-conversation, the new provider must be able to continue the conversation using the stored history. Do not store conversation state in provider-specific session mechanisms.

## Monitoring and Alerting

Track provider health, failover events, and per-provider metrics (latency, error rate, cost, token usage). Alert on failover events so the operations team is aware. Track the frequency of failovers per provider to identify chronic reliability issues that may warrant changing the provider configuration. Monitor for quality differences between providers using automated evaluation on a sample of production traffic.
