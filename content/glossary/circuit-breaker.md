---
title: "Circuit Breaker Pattern"
description: "What the circuit breaker pattern is, why AI services need it for handling model timeouts and rate limits, and how to implement it with AWS Step Functions."
date: 2026-03-25
categories: [Glossary]
tags: ["architecture", "intermediate", "circuit-breaker", "resilience", "fault-tolerance", "distributed-systems", "pattern"]
related:
  - patterns/circuit-breaker-ai
  - patterns/microservices-for-ai
  - glossary/serverless
  - tools/amazon-step-functions
  - guides/testing-ai-systems
last_updated: 2026-05-30
---

The Circuit Breaker pattern is a software design pattern that prevents a system from repeatedly attempting an operation that is likely to fail. It monitors calls to an external service and, when the failure rate crosses a threshold, "trips" the circuit: subsequent calls immediately return a fallback response instead of calling the failing service. After a timeout, the circuit allows a probe request through to check if the service has recovered.

The name comes from electrical circuit breakers, which automatically interrupt current when they detect a fault, protecting the rest of the circuit from damage.

## The Three States

**Closed** - Normal operation. Requests pass through to the external service. Failures are counted. The circuit closes when the failure rate stays below the threshold.

**Open** - The circuit has tripped due to excessive failures. Requests immediately return a fallback response without calling the external service. No requests reach the failing service, preventing amplification of the problem.

**Half-open** - After a defined timeout (e.g., 30 seconds), the circuit allows a single test request through. If it succeeds, the circuit closes and normal operation resumes. If it fails, the circuit opens again.

## Why AI Services Need Circuit Breakers

AI services fail in distinct ways that make circuit breakers particularly valuable:

**Model API timeouts** - Foundation model APIs can be slow under high load. A timeout that propagates to the user produces a poor experience. A circuit breaker trips after repeated timeouts and returns a cached or degraded response immediately.

**Rate limit errors** - AI APIs enforce rate limits (requests per minute, tokens per minute). When you hit a rate limit, retrying immediately makes it worse. A circuit breaker that opens on rate limit errors gives the API time to recover before probe requests resume.

**Cascade failure** - If 10 services all call the same model API and the API goes down, all 10 services fail simultaneously and all 10 start retrying. This amplifies load on the recovering API. Circuit breakers in each service prevent this cascade.

**Quota exhaustion** - If a service has consumed its token quota for the hour, continuing to call the API wastes time waiting for errors. The circuit breaker detects the pattern quickly and switches to fallback.

## Implementation with AWS Step Functions

Step Functions has built-in retry and catch blocks that implement circuit breaker-like behaviour at the workflow level:

```json
"InvokeModel": {
  "Type": "Task",
  "Resource": "arn:aws:states:::bedrock:invokeModel",
  "Retry": [{
    "ErrorEquals": ["ThrottlingException", "States.Timeout"],
    "IntervalSeconds": 2,
    "MaxAttempts": 3,
    "BackoffRate": 2
  }],
  "Catch": [{
    "ErrorEquals": ["States.ALL"],
    "Next": "FallbackState",
    "ResultPath": "$.error"
  }],
  "Next": "ProcessOutput"
}
```

The retry block handles transient failures with exponential backoff. The catch block handles persistent failures by routing to a fallback state rather than failing the entire workflow.

## Relationship to Retry Logic

Retry logic and circuit breakers are complementary:

- **Retry** handles transient failures: a single failed request is retried a small number of times with backoff. Appropriate when failure is unusual.
- **Circuit breaker** handles systematic failures: many consecutive failures indicate the service is down, and retrying is counterproductive. The circuit opens and requests fail fast until recovery.

Use both together: retry individual requests (up to 3 times), and open the circuit if 50% of requests in the last 30 seconds have failed despite retries.

## Fallback Options

The circuit breaker's value depends on having a meaningful fallback:
- Return a cached response from a previous successful call
- Call a smaller, faster, cheaper model instead of the primary model
- Return a template-based response for common cases
- Queue the request for processing when the circuit closes
- Return a clear "service temporarily unavailable" message

The fallback should be defined before enabling the circuit breaker, not discovered during an incident.

## Sources

- Fowler, M. (2014). Circuit breaker. *martinfowler.com*. (Canonical definition of the circuit breaker pattern; the three-state model referenced across all implementations.)
- Nygard, M. T. (2018). *Release It!: Design and Deploy Production-Ready Software* (2nd ed.). Pragmatic Bookshelf. (Introduced the circuit breaker pattern for software; Chapter 5 covers stability patterns including circuit breakers and bulkheads.)
- Akka Project. (2019). Akka circuit breaker documentation. *Akka*. (Production circuit breaker implementation reference with state machine, configurable thresholds, and fallback patterns.)
