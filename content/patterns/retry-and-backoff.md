---
title: "Retry and Backoff Patterns for AI Services"
description: "Exponential backoff with jitter, retry budgets, and idempotency patterns for production AI systems. Why AI services require different retry logic than conventional APIs."
date: 2026-03-26
categories: [Patterns]
tags: ["software-engineering", "intermediate", "retry", "backoff", "resilience", "error-handling", "api"]
related:
  - patterns/circuit-breaker-ai
  - patterns/observability-ai
  - guides/testing-ai-systems
  - glossary/inference
last_updated: 2026-05-30
---

Every distributed system needs retry logic. AI services need it more than most, and they need it differently. A conventional API rate limit is measured in requests per second. An AI service rate limit is measured in tokens per minute, which means a burst of short requests and a burst of long requests hit the limit at completely different rates. Model inference also takes longer than a database query, which changes the math on timeout and retry budget design.

## Why AI Services Are Different

Three properties of AI services complicate standard retry logic:

**Token-based rate limits** - AWS Bedrock and most model APIs enforce limits on tokens per minute (TPM) in addition to requests per minute (RPM). Two applications making the same number of API calls can have wildly different token consumption depending on prompt length and response size. A retry that sends the same large prompt again on failure consumes double the tokens, which can make a rate limit problem worse.

**High and variable latency** - Model inference takes anywhere from a fraction of a second to tens of seconds depending on model size and output length. A timeout set for a conventional API call (500ms to 2 seconds) will produce false timeouts on long inference requests. Timeouts for AI services should be based on measured p99 latency for the specific model and output length being requested.

**Non-idempotent effects** - If a model call succeeds but the response is lost in transit (network error after the model returns), a naive retry will call the model again and incur the cost twice. For streaming responses, partial delivery adds another failure mode. Idempotency keys are essential.

## Exponential Backoff with Jitter

The standard algorithm for retry delays is exponential backoff: each retry waits twice as long as the previous one. Starting from a 1-second base delay, the sequence is 1s, 2s, 4s, 8s, 16s.

Without jitter, all retrying clients that hit a limit at the same moment will also retry at the same moment, creating a thundering herd. Jitter adds randomness to spread retries:

```python
import random
import time

def backoff_delay(attempt: int, base: float = 1.0, cap: float = 32.0) -> float:
    """Full jitter: random value between 0 and the capped exponential."""
    exponential = min(cap, base * (2 ** attempt))
    return random.uniform(0, exponential)

def call_with_retry(fn, max_attempts: int = 5):
    for attempt in range(max_attempts):
        try:
            return fn()
        except RateLimitError as e:
            if attempt == max_attempts - 1:
                raise
            delay = backoff_delay(attempt)
            time.sleep(delay)
```

The "full jitter" approach (random between 0 and the exponential cap) reduces mean retry delay compared to "equal jitter" while still spreading load. For AI services under rate pressure, full jitter is the right default.

## Retry Budgets

A retry budget caps the total number of retries the system will issue over a time window, independent of how many individual requests are failing. Without a budget, a storm of failures can produce a storm of retries that amplifies the load on an already struggling service.

For Lambda functions calling Bedrock, implement a retry budget using a token bucket in DynamoDB or ElastiCache:

- On each successful call, add a token to the bucket (up to a maximum)
- On each retry, consume a token from the bucket
- If the bucket is empty, fail fast rather than retry

This gives healthy traffic headroom to retry while preventing failure storms from compounding.

## Idempotency

For calls that have side effects (writing to a database, sending a notification, charging a customer based on AI output), idempotency prevents duplicate actions when retries occur.

The pattern for AI service calls:

1. Generate a unique idempotency key for each logical operation before the first attempt
2. Pass the key to the AI service call if the API supports it (Bedrock does not natively, but the surrounding infrastructure can enforce it)
3. Store the key and the result in a cache (DynamoDB with a TTL) after the first successful call
4. On retry, check the cache before calling the model - if the result is already there, return it without calling the model again

The cache TTL should match the window during which retries could plausibly occur, typically 5 to 15 minutes.

## What to Retry

Not all errors are worth retrying. Retrying a bad request (HTTP 400, validation error) will never succeed. Only retry on:

- HTTP 429 (rate limit / throttling)
- HTTP 503 (service unavailable)
- HTTP 500 (transient server error)
- Network timeouts, where the request may not have reached the service

Do not retry on HTTP 400 (bad request), HTTP 401 (authentication failure), or model content policy violations. These will not succeed on retry.

## Lambda-Specific Considerations

AWS Lambda has built-in retry behavior for asynchronous invocations (it retries twice on failure). When Lambda is invoking Bedrock, this means a failed Lambda execution can result in three total Bedrock calls if your function also has internal retry logic. Design for this interaction:

- Use idempotency keys tied to the Lambda request ID to prevent duplicate model calls across Lambda retries
- Set Lambda's maximum retry count to 0 for synchronous API workflows where the caller handles retries
- Use Lambda Destinations to route failed events to a dead-letter queue for inspection rather than retrying indefinitely

## Sources

- AWS general guidance on error retries and exponential backoff: https://docs.aws.amazon.com/general/latest/gr/api-retries.html
- Marc Brooker, "Exponential Backoff And Jitter" (AWS Architecture Blog): https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
