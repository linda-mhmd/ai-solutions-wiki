---
title: "Circuit Breaker Pattern for AI Services"
description: "Handling model failures gracefully in production AI systems: fallback strategies, degraded mode operation, retry with backoff, and protecting downstream services from cascade failure."
date: 2026-03-25
categories: [Patterns]
tags: ["architecture", "intermediate", "circuit-breaker", "resilience", "fault-tolerance", "ai-services", "api"]
related:
  - glossary/circuit-breaker
  - patterns/microservices-for-ai
  - patterns/feature-flags-ai
  - tools/amazon-step-functions
  - guides/testing-ai-systems
last_updated: 2026-05-30
---

Model APIs fail. They time out under high load, return rate limit errors when traffic spikes, and occasionally return malformed responses that cannot be parsed. A production AI service that propagates these failures directly to users provides a worse experience than gracefully degrading to a simpler alternative. The circuit breaker pattern protects your system from cascade failure when upstream AI services are unhealthy.

## How Circuit Breakers Work

A circuit breaker wraps calls to an external service and tracks failure rate over a sliding time window. It operates in three states:

**Closed** - Normal operation. Requests pass through to the AI service. Failures are counted. If the failure rate crosses a threshold (e.g. 50% failures in the last 30 seconds), the circuit opens.

**Open** - The circuit has tripped. Requests immediately return a fallback response without calling the AI service. A timer determines how long the circuit stays open (e.g. 30 seconds).

**Half-open** - The timer has expired. A single probe request is allowed through. If it succeeds, the circuit closes and normal operation resumes. If it fails, the circuit opens again and the timer resets.

## Failure Modes in AI Services

AI services fail in distinct ways that require different circuit breaker strategies:

**Timeout failures** - The model takes longer than acceptable (e.g. > 10 seconds). Set aggressive timeouts and count them as failures. Do not let a slow model hold connections open.

**Rate limit errors (HTTP 429)** - The AI provider has throttled your traffic. Open the circuit immediately on rate limit errors rather than retrying, as retrying amplifies the problem. Back off exponentially when the circuit closes.

**Malformed responses** - The model returns output that fails schema validation. Parse failures should count toward the failure threshold. A model in a degraded state often produces incoherent output before timing out entirely.

**Context window exceeded** - Input was too large for the model. This is a client error, not a service failure, and should not trip the circuit. Handle it separately by truncating or chunking input.

## Fallback Strategies

The value of a circuit breaker comes from having a meaningful fallback. Options ranked by user experience quality:

**Cached response** - If the same or similar query was answered recently, return the cached response. Works well for frequently repeated queries in knowledge-base applications.

**Simpler model** - Call a smaller, faster, cheaper model instead of the primary model. For summarisation, a smaller model often produces adequate quality. For complex reasoning, degraded quality may be acceptable over no response.

**Template-based response** - For structured outputs (a customer support response, a document classification), a rule-based fallback that covers common cases provides partial value without the model.

**Graceful degradation message** - If no meaningful fallback exists, return a clear message: "AI assistance is temporarily unavailable. Please try again in a few minutes." This is honest and sets expectations correctly.

**Queue for later processing** - If the task is not time-sensitive, accept the request, queue it, and process it when the model recovers. Confirm to the user that their request was accepted.

## Retry Logic with Backoff

Retries and circuit breakers work together. Retry policies apply when the circuit is closed (normal operation). Circuit breakers apply when the failure rate has become systematic.

For AI service calls, use exponential backoff with jitter:

```python
import random, time

def call_with_retry(fn, max_retries=3, base_delay=1.0):
    for attempt in range(max_retries):
        try:
            return fn()
        except RateLimitError:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
            time.sleep(delay)
        except TimeoutError:
            if attempt == max_retries - 1:
                raise
            time.sleep(base_delay * (attempt + 1))
```

Do not retry on non-retryable errors: invalid API key, malformed request, or context window exceeded. Retrying these wastes time and budget.

## Implementation on AWS

**AWS Step Functions** has built-in retry and catch blocks that implement circuit breaker-like behaviour at the workflow level. Define retry policies per state:

```json
"Retry": [{
  "ErrorEquals": ["ThrottlingException", "States.Timeout"],
  "IntervalSeconds": 2,
  "MaxAttempts": 3,
  "BackoffRate": 2
}],
"Catch": [{
  "ErrorEquals": ["States.ALL"],
  "Next": "FallbackHandler"
}]
```

**Lambda with custom circuit breaker** - Store circuit state (open/closed/half-open, failure count, last failure time) in DynamoDB or ElastiCache. Check state at the start of each Lambda invocation. Update state based on call outcome.

**Third-party libraries** - `resilience4j` (Java), `pybreaker` (Python), and `opossum` (Node.js) implement the circuit breaker pattern and can be bundled into Lambda layers or container images.

## Testing the Fallback Path

Circuit breakers are only as good as the fallback they activate. Test the fallback path explicitly in your test suite and in staging environments. Common failures:

- The fallback itself calls the same failing service
- The cached response is stale and incorrect
- The degraded message is technical jargon that confuses users
- The circuit never closes because the half-open probe request is also misconfigured

Inject failures in load tests to verify the circuit trips correctly and the fallback produces an acceptable response.

## Sources and Further Reading

1. Nygard, M. (2007). *Release It! Design and Deploy Production-Ready Software.* Pragmatic Bookshelf., First systematic description of the Circuit Breaker pattern as an architectural stability pattern (Chapter 4). The three-state model (closed/open/half-open) used in this article originates here.
2. Fowler, M. "CircuitBreaker." *martinfowler.com*, 2014. [https://martinfowler.com/bliki/CircuitBreaker.html](https://martinfowler.com/bliki/CircuitBreaker.html), Canonical reference description of the pattern.
3. Newman, S. (2015). *Building Microservices: Designing Fine-Grained Systems.* O'Reilly Media., Chapter 11 covers resilience patterns including circuit breakers in the context of service-to-service calls, applicable to AI service integration.
