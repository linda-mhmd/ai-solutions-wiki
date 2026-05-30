---
title: "API Design"
description: "REST, GraphQL, and gRPC. The principles of versioning, error handling, idempotency, and authentication that make APIs reliable contracts between systems."
layout: single
tags: ["api-design", "rest", "graphql", "grpc", "http"]
categories: ["Foundations"]
last_updated: 2026-05-30
---

An API is a contract between systems. Once published, it is consumed by callers who build against it, often without the ability to update their code when the API changes. This constraint - that breaking changes break callers - is the defining characteristic of API design. Most of the principles in this domain exist to preserve the contract while allowing the implementation to evolve.

Roy Fielding defined REST in his 2000 doctoral dissertation "Architectural Styles and the Design of Network-based Software Architectures." GraphQL was developed internally at Facebook from around 2012 and open-sourced in 2015. gRPC was open-sourced by Google in 2015, building on their internal Stubby RPC system. These three paradigms dominate modern API design, each with different strengths that make them appropriate for different contexts.

---

## REST

REST (Representational State Transfer) is an architectural style, not a protocol. Fielding identified six constraints that define a RESTful system: client-server separation, statelessness, cacheability, uniform interface, layered system, and (optionally) code-on-demand.

The uniform interface constraint is what most developers mean when they say REST: resources identified by URIs, representations transferred through standard formats (JSON, XML), and manipulation through standard HTTP methods.

**HTTP methods and their semantics:**

| Method | Semantic | Safe | Idempotent |
|--------|----------|------|------------|
| GET | Read a resource | Yes | Yes |
| POST | Create a resource or trigger action | No | No |
| PUT | Replace a resource completely | No | Yes |
| PATCH | Partially update a resource | No | No (in practice) |
| DELETE | Remove a resource | No | Yes |

Safe means the operation does not change server state. Idempotent means applying the operation multiple times produces the same result as applying it once. These properties matter for retry logic, caching, and recovery from network failures.

**Resource naming conventions:**

```
# Resources are nouns, not verbs
GET    /orders              # list orders
GET    /orders/{id}         # get one order
POST   /orders              # create an order
PUT    /orders/{id}         # replace an order
PATCH  /orders/{id}         # update fields on an order
DELETE /orders/{id}         # delete an order

# Nested resources express relationships
GET    /orders/{id}/items   # list items for an order
POST   /orders/{id}/items   # add an item to an order

# Actions that don't fit CRUD use verbs as sub-resources
POST   /orders/{id}/confirm # trigger state transition
POST   /orders/{id}/cancel
```

---

## HTTP Status Codes

Status codes communicate the result of an operation. Using them correctly means callers can implement generic error handling without parsing response bodies.

```
2xx - Success
  200 OK            - successful GET, PUT, PATCH
  201 Created       - successful POST that created a resource
  204 No Content    - successful DELETE or action with no response body
  202 Accepted      - request accepted for async processing

4xx - Client Errors (caller's fault)
  400 Bad Request   - malformed request, validation failure
  401 Unauthorized  - authentication required
  403 Forbidden     - authenticated but not authorized
  404 Not Found     - resource does not exist
  409 Conflict      - state conflict (e.g., duplicate creation)
  422 Unprocessable - request well-formed but semantically invalid
  429 Too Many Requests - rate limit exceeded

5xx - Server Errors (server's fault)
  500 Internal Server Error - generic server failure
  503 Service Unavailable   - temporarily unable to handle requests
```

Returning 200 with a body that contains `{"success": false, "error": "not found"}` is an antipattern. The HTTP status code is the primary error signal; the response body provides details.

---

## Versioning

APIs change. Versioning is the mechanism for managing that change without breaking existing callers.

**URI versioning**: `/v1/orders`, `/v2/orders`. Simple, visible, easy to route. The downside is that clients must explicitly migrate to new versions.

**Header versioning**: `Accept: application/vnd.example.v2+json`. Keeps URIs clean but is harder to test in a browser and less discoverable.

**Query parameter versioning**: `/orders?version=2`. Convenient for testing but easy to misuse.

The more important question is what constitutes a breaking change. Additive changes (new fields, new endpoints) are generally safe. Removals, renames, and semantic changes are breaking. A versioning strategy must define this boundary clearly.

---

## Pagination

Any endpoint that returns a collection must handle pagination. Returning unbounded collections causes timeouts, excessive memory use, and poor user experience.

**Cursor-based pagination** is preferred for most use cases:

```json
GET /orders?cursor=eyJpZCI6MTAwfQ&limit=20

{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTIwfQ",
    "has_more": true
  }
}
```

Cursor-based pagination handles real-time data correctly - if new records are inserted while a client is paginating, cursor pagination does not skip or repeat items. Offset-based pagination (`?page=3&page_size=20`) fails this property.

---

## Idempotency

Idempotency keys allow safe retries of non-idempotent operations. A client includes a unique key with a POST request. If the server receives the same key twice, it returns the result of the first request rather than executing the operation again. This prevents double-charges, duplicate orders, and other harmful duplications caused by network retries.

```
POST /payments
Idempotency-Key: 8f14e45f-ceea-367f-a027-aa0e2a5d5b67

{
  "amount": 10000,
  "currency": "USD",
  "card_token": "tok_xxxx"
}
```

Stripe popularized this pattern. It is essential for any API that handles financial transactions or creates real-world side effects.

---

## GraphQL

GraphQL, developed at Facebook circa 2012, is a query language for APIs. Instead of multiple REST endpoints that return fixed shapes, GraphQL exposes a single endpoint where clients specify exactly what data they need.

```graphql
query {
  order(id: "ord_123") {
    id
    status
    customer {
      name
      email
    }
    items {
      product { name }
      quantity
      price
    }
  }
}
```

GraphQL eliminates over-fetching (receiving more data than needed) and under-fetching (requiring multiple requests to assemble needed data). It is well-suited for complex, nested data models and for clients (mobile apps) where bandwidth matters.

The tradeoffs: GraphQL is more complex to implement on the server, authorization is more complex (field-level vs. endpoint-level), and caching is harder (no resource-level cache headers).

---

## gRPC

gRPC uses Protocol Buffers as its interface definition language and HTTP/2 as its transport. Services and messages are defined in `.proto` files, from which client and server code is generated in multiple languages.

```protobuf
service OrderService {
  rpc GetOrder (GetOrderRequest) returns (Order);
  rpc StreamOrders (StreamOrdersRequest) returns (stream Order);
}

message Order {
  string id = 1;
  string status = 2;
  repeated OrderItem items = 3;
}
```

gRPC is appropriate for internal service-to-service communication where performance matters, where strong typing is valuable, and where streaming is needed. It is not appropriate for browser clients (without a proxy), and the binary format makes it harder to debug than JSON.

---

## Authentication and Rate Limiting

**Authentication** verifies identity. The standard patterns: API keys (simple, stateless, suitable for server-to-server), OAuth 2.0 (for delegated authorization, particularly for user-facing flows), and JWT tokens (stateless bearer tokens that encode claims).

**Rate limiting** protects the service from abuse and overload. Include rate limit information in response headers so clients can adapt:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1735689600
```

Return 429 with a `Retry-After` header when the limit is exceeded. Clients can then implement automatic backoff without guessing how long to wait.

---

## How This Applies to AI Systems

AI services expose a set of API design challenges that extend classical patterns.

**Streaming responses.** LLM responses are long and generated incrementally. Returning a complete response only after generation is finished produces poor user experience (many seconds of apparent inactivity) and risks timeout failures. Server-Sent Events (SSE) and HTTP streaming allow tokens to be sent to the client as they are generated. The API contract changes: instead of returning a single JSON object, the endpoint streams a series of events. Designing this interface - how to signal completion, how to handle errors mid-stream, how to convey metadata - requires careful thought.

**Token counting and cost management.** LLM API calls are billed by token. An AI service API should expose token usage to callers so they can reason about cost. Response objects should include `prompt_tokens`, `completion_tokens`, and `total_tokens`. Rate limits for AI services are often expressed in tokens-per-minute rather than requests-per-minute, requiring different client-side logic.

**Fallback chains in the API.** An AI service that depends on a single LLM provider is fragile. The API design should abstract the provider so the service can fall back to alternative models (a less capable but more available model, or a cached result) transparently. The caller should not need to know which provider served the request; the response should indicate what actually happened so callers can make informed decisions.

**Idempotency for agent actions.** Agents that take real-world actions (sending emails, creating records, calling external APIs) need idempotency keys for exactly the same reasons payment APIs do. An agent that retries a failed tool call without idempotency protection can create duplicate real-world effects. The tool API should accept and enforce idempotency keys.

**Versioning prompt interfaces.** When an AI service exposes a prompt-based interface (accepting natural language queries, for example), versioning is still relevant: the semantics of what the service does can change even when the request format does not. Explicit versioning of evaluation-level behavior ("this endpoint now uses model version X and prompt version Y") helps callers understand what they are consuming.

### Related Pages
- [Security Fundamentals](/foundations/security/) - authentication and secrets management for API keys
- [CI/CD](/foundations/ci-cd/) - deploying API changes safely and managing breaking changes
- [Testing Strategy](/foundations/testing-strategy/) - contract testing for API consumers
