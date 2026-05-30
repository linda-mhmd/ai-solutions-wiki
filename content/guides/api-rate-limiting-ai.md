---
title: "Rate Limiting for LLM and AI Endpoints"
description: "How to implement rate limiting for AI API endpoints: token bucket and sliding window algorithms, per-user and per-model limits, token-based rate limiting for LLMs, and graceful degradation."
date: 2026-03-28
categories: [Guides]
tags: [rate-limiting, api-design, llm, throttling, cost-control, ai-engineering]
related:
  - glossary/idempotency
  - guides/api-versioning-ai
  - guides/capacity-planning-ai
last_updated: 2026-05-30
---

AI inference endpoints are expensive to serve. A single LLM request can consume GPU seconds and cost cents to dollars. Without rate limiting, a single misbehaving client can exhaust GPU capacity, degrade service for all users, and generate unexpected costs. Rate limiting for AI endpoints must account for the variable cost per request - a 4,000-token response consumes 40x the resources of a 100-token response.

## Rate Limiting Algorithms

### Token Bucket

The token bucket is the most common rate limiting algorithm. A bucket holds tokens up to a maximum (burst capacity). Tokens are added at a fixed rate. Each request consumes one or more tokens. If the bucket is empty, the request is rejected or queued.

```python
import time
from dataclasses import dataclass

@dataclass
class TokenBucket:
    capacity: int       # Maximum tokens (burst limit)
    refill_rate: float  # Tokens added per second
    tokens: float       # Current token count
    last_refill: float  # Timestamp of last refill

    def allow(self, cost: int = 1) -> bool:
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(
            self.capacity,
            self.tokens + elapsed * self.refill_rate
        )
        self.last_refill = now

        if self.tokens >= cost:
            self.tokens -= cost
            return True
        return False
```

For AI endpoints, set the cost per request based on estimated token usage rather than treating every request equally.

### Sliding Window

The sliding window algorithm counts requests within a rolling time window. It provides smoother rate limiting than fixed windows, which can allow burst traffic at window boundaries.

```python
import time
from collections import deque

class SlidingWindow:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = deque()

    def allow(self) -> bool:
        now = time.time()
        # Remove expired entries
        while self.requests and self.requests[0] < now - self.window_seconds:
            self.requests.popleft()

        if len(self.requests) < self.max_requests:
            self.requests.append(now)
            return True
        return False
```

### Fixed Window Counter

Simpler but less precise. Counts requests in fixed time intervals (per minute, per hour). A client can burst at the boundary of two windows, getting 2x the limit momentarily. For AI endpoints where individual requests are expensive, this boundary burst can be problematic.

## Multi-Dimensional Rate Limiting for AI

AI endpoints benefit from rate limiting on multiple dimensions simultaneously:

### Requests Per Minute

Basic protection against request flooding:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1711584060
```

### Tokens Per Minute

LLM endpoints should limit total tokens (input + output) per time window. A client sending 10 requests with 10,000 tokens each consumes the same resources as 100 requests with 1,000 tokens:

```python
# Rate limit by token consumption
token_limit = TokenBucket(
    capacity=100000,      # 100K token burst
    refill_rate=1666,     # ~100K tokens per minute
    tokens=100000,
    last_refill=time.time()
)

def check_rate_limit(user_id, estimated_tokens):
    bucket = get_bucket(user_id)
    if not bucket.allow(cost=estimated_tokens):
        raise RateLimitExceeded(
            retry_after=estimated_tokens / bucket.refill_rate
        )
```

### Cost Per Day

For usage-based billing, enforce daily spending limits:

```python
daily_cost = get_daily_cost(user_id)
estimated_cost = estimate_request_cost(request)
if daily_cost + estimated_cost > user.daily_limit:
    raise DailyLimitExceeded(current=daily_cost, limit=user.daily_limit)
```

### Concurrent Requests

Limit the number of simultaneous in-flight requests per user. LLM inference holds GPU resources for the entire generation duration. Too many concurrent requests from one user starves others:

```python
concurrent = get_concurrent_count(user_id)
if concurrent >= user.max_concurrent:
    raise ConcurrentLimitExceeded(max=user.max_concurrent)
```

## Implementation with Redis

For distributed rate limiting across multiple API server instances, use Redis:

```python
import redis

r = redis.Redis()

def sliding_window_rate_limit(user_id: str, limit: int, window: int) -> bool:
    key = f"rate:{user_id}:{int(time.time()) // window}"
    pipe = r.pipeline()
    pipe.incr(key)
    pipe.expire(key, window)
    count = pipe.execute()[0]
    return count <= limit
```

## Graceful Degradation

When rate limits are hit, provide useful responses:

```json
{
  "error": "rate_limit_exceeded",
  "message": "Token limit exceeded. 95,000 of 100,000 tokens used this minute.",
  "retry_after_seconds": 12,
  "limit": 100000,
  "remaining": 0,
  "reset_at": "2026-03-28T14:30:00Z"
}
```

Return HTTP 429 with `Retry-After` header. For streaming endpoints, consider accepting the request but with reduced `max_tokens` rather than rejecting entirely.

## Rate Limiting by Tier

Different user tiers get different limits:

| Tier | Requests/min | Tokens/min | Concurrent | Daily Cost |
|---|---|---|---|---|
| Free | 10 | 10,000 | 2 | $1 |
| Standard | 60 | 100,000 | 10 | $50 |
| Enterprise | 300 | 1,000,000 | 50 | Custom |

Implement tier-based limits through configuration rather than code. Store limits in a database or configuration service so they can be adjusted without deployment.
