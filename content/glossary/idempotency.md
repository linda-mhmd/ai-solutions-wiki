---
title: "Idempotency"
description: "What idempotency means, how idempotency keys work for API endpoints, and why safe retry behaviour is critical for AI inference APIs handling expensive operations."
date: 2026-03-28
categories: [Glossary]
tags: [idempotency, api-design, reliability, retry, distributed-systems]
related:
  - glossary/grpc
  - glossary/openapi
  - guides/api-rate-limiting-ai
last_updated: 2026-05-30
---

An operation is idempotent if performing it multiple times produces the same result as performing it once. In API design, idempotency means that retrying a request - due to network timeouts, client errors, or load balancer retries - does not cause unintended side effects like duplicate charges, duplicate document processing, or repeated model invocations.

HTTP GET, PUT, and DELETE are idempotent by definition. GET retrieves state without modifying it. PUT replaces a resource entirely (doing it twice yields the same state). DELETE removes a resource (deleting something already deleted is a no-op). POST is not inherently idempotent - posting the same request twice can create two resources.

## Idempotency Keys

For non-idempotent operations (creating records, triggering processing jobs, running inference), the standard approach is an idempotency key: a unique identifier the client includes with each request.

The server workflow:
1. Client sends a request with an `Idempotency-Key` header (typically a UUID)
2. Server checks if this key has been seen before
3. If new: process the request, store the result mapped to the key
4. If seen: return the stored result without re-processing

The key-to-result mapping is stored with a TTL (commonly 24-48 hours). After the TTL expires, the key can be reused.

## Why AI APIs Need Idempotency

AI inference operations are expensive. A single LLM API call might cost dollars and take seconds to complete. A document processing pipeline might trigger embedding generation, vector storage, and multiple model calls. Without idempotency:

- A network timeout causes the client to retry, and the system processes the same document twice
- A load balancer retries a request that actually succeeded, resulting in duplicate billing
- A batch job restarts and resubmits requests that already completed

Idempotency prevents all of these scenarios.

## Implementation Patterns

**Database-Backed** - Store idempotency keys in a database table with the request hash and response. Use a unique constraint on the key to handle concurrent duplicate requests. PostgreSQL's `INSERT ... ON CONFLICT` makes this straightforward.

**Redis-Backed** - Store keys in Redis with a TTL. Faster than database lookups but requires Redis availability. Use `SET key value NX EX ttl` for atomic check-and-set.

**Request Fingerprinting** - For systems where clients do not send idempotency keys, compute a fingerprint from the request body (hash of the input). This provides automatic deduplication but can produce false matches if different intentional requests happen to be identical.

Idempotency is not optional for production AI APIs. It is a reliability requirement that prevents expensive and confusing duplicate processing.

## Sources

- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media. Chapter 11: Stream Processing. (Idempotent consumers in distributed systems; exactly-once semantics and idempotency keys as practical alternatives.)
- Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Doctoral dissertation, UC Irvine. (REST constraints including HTTP method semantics; GET, PUT, DELETE as idempotent methods.)
- Birman, K. P. (2012). *Guide to Reliable Distributed Systems*. Springer. Chapter 4: At-most-once and at-least-once delivery. (Idempotency as the mechanism for safe retry behavior in distributed systems with at-least-once delivery guarantees.)
