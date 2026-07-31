---
title: "What is Microservices Architecture?"
description: "Microservices break large applications into small, independent services. Each does one thing, deploys independently, and communicates over a network. The opposite of a monolith."
date: 2026-07-30
level: 3
categories: [Basics]
tags: [microservices, architecture, monolith, api, distributed-systems, cloud-native]
faqs:
  - question: "Should I start with microservices?"
    answer: "Almost never. Start with a monolith. It's simpler to develop, deploy, and debug. Extract services later when you have clear reasons—scaling needs, team organization, or specific components that benefit from independence. Premature microservices cause more problems than they solve."
  - question: "How many services is too many?"
    answer: "There's no fixed number, but complexity grows with service count. A 'microservice' that only one other service calls might not need to be separate. If you can't explain why something is a separate service, it probably shouldn't be."
  - question: "What's the difference between microservices and an API?"
    answer: "An API is an interface—how you talk to something. A microservice is an architecture pattern—how you structure your application. Microservices expose APIs to communicate with each other. A monolith can also have APIs."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Microservices architecture structures an application as a collection of small, independent services. Each service handles one capability (user authentication, payments, notifications), owns its own data, and communicates with others over a network (HTTP, gRPC, message queues). This contrasts with a monolith, where everything is one deployable unit.
{{< /quickanswer >}}

## Monolith vs. microservices

### The monolith

All code in one application:

```
┌─────────────────────────────────────────────┐
│               Monolith App                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │  Users  │ │ Orders  │ │Payments │  ...   │
│  └─────────┘ └─────────┘ └─────────┘        │
│  ┌─────────────────────────────────────────┐│
│  │         Shared Database                  ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

**Pros**:
- Simple to develop and understand
- Easy to deploy (one thing to deploy)
- No network calls between components
- Transactions across components are straightforward
- Easier to debug

**Cons**:
- Entire app deploys together (risky, slow)
- Scaling is all-or-nothing
- One part can crash the whole app
- Teams step on each other
- Technology choices are global

### Microservices

Many independent services:

```
┌───────────┐   ┌───────────┐   ┌───────────┐
│   Users   │   │  Orders   │   │ Payments  │
│  Service  │   │  Service  │   │  Service  │
└─────┬─────┘   └─────┬─────┘   └─────┬─────┘
      │               │               │
      │   HTTP/gRPC/Messages          │
      └───────────────┼───────────────┘
                      │
      ┌───────────────┼───────────────┐
      │               │               │
┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
│  Users DB │   │ Orders DB │   │Payments DB│
└───────────┘   └───────────┘   └───────────┘
```

**Pros**:
- Independent deployment per service
- Scale services individually
- Failure isolation (one service crashing doesn't kill all)
- Teams own their services end-to-end
- Technology choices per service

**Cons**:
- Network complexity (services calling services)
- Distributed system problems (latency, failures, consistency)
- Operational overhead (many things to deploy/monitor)
- Data consistency is hard (no transactions across services)
- Debugging across services is complex

## Characteristics of microservices

### Single responsibility

Each service does one thing:
- **User service**: Authentication, profiles, settings
- **Order service**: Creating orders, order status
- **Payment service**: Processing payments
- **Notification service**: Sending emails, SMS, push

Not: "the service that handles users, orders, and half of payments."

### Independent deployment

Change and deploy one service without touching others:

```bash
# Deploy just the payment service
kubectl set image deployment/payments payments=payments:v2.0.1
# Other services unaffected
```

### Own their data

Each service owns its database/storage:

- User service → user database
- Order service → order database
- Payment service → payment database

Services don't share databases. They communicate through APIs.

### Communicate over network

Services call each other via:
- **HTTP/REST**: Simple, widely understood
- **gRPC**: Faster, typed, good for internal communication
- **Message queues** (Kafka, RabbitMQ): Asynchronous, decoupled

```javascript
// User service calls order service
const orders = await fetch('http://order-service/users/123/orders')
  .then(res => res.json());
```

### Organized around business capabilities

Services map to business domains, not technical layers:

**Good** (business-oriented):
- Customer service
- Inventory service  
- Shipping service

**Less good** (technical layers):
- API layer
- Business logic layer
- Data access layer

## When microservices make sense

### Scaling requirements differ

Your search feature needs 10x the resources of user profiles. With microservices, scale search independently.

### Teams are large and need autonomy

50+ developers working on one codebase creates friction. Teams owning independent services can move faster.

### Parts have different stability requirements

Your payment system must be rock-solid. Your experimental recommendation feature can break sometimes. Separate them.

### Parts have different technology needs

Machine learning in Python, real-time features in Go, user interface in Node.js. Microservices allow mixing.

### Independent deployment is valuable

You want to deploy the checkout flow multiple times a day without risking the rest of the system.

## When to stick with a monolith

### Early-stage product

You don't know your domain well yet. Refactoring a monolith is easier than rearchitecting distributed services.

### Small team

If fewer than 10 developers, microservices overhead likely exceeds benefit. One person can understand a well-structured monolith.

### Simple domain

Not every application is complex. A straightforward CRUD app doesn't need distributed architecture.

### You can't run a monolith reliably

If your team struggles to deploy one thing, multiple things will be worse. Get the fundamentals right first.

## The distributed systems tax

Microservices turn every function call into a network call. This introduces:

### Network latency

```
Monolith: getUser() → 0.001ms
Microservices: HTTP to user-service → 5ms
```

Add up dozens of calls and latency compounds.

### Network failures

Networks fail. Services must handle:
- Timeouts
- Retries
- Circuit breakers (stop calling failing services)
- Fallbacks

### Data consistency

In a monolith:
```sql
BEGIN TRANSACTION;
  UPDATE orders SET status = 'paid';
  UPDATE inventory SET quantity = quantity - 1;
COMMIT;
```

In microservices, this is two services, two databases, no simple transaction. You need:
- Eventual consistency (accept temporary inconsistency)
- Saga pattern (coordinated compensating actions)
- Careful design

### Debugging complexity

"The order failed" in a monolith → look at one log file.

"The order failed" in microservices → request touched 7 services, check all their logs, correlate with request ID.

Tools help (distributed tracing), but complexity remains.

## Patterns for microservices

### API Gateway

Single entry point for external traffic:

```
Client → API Gateway → Microservices
```

The gateway handles:
- Routing to correct service
- Authentication
- Rate limiting
- Request aggregation

Tools: Kong, AWS API Gateway, nginx

### Service mesh

Network-level handling of service-to-service communication:

- Automatic retries
- Circuit breaking
- mTLS (encryption between services)
- Traffic management

Tools: Istio, Linkerd

### Event-driven communication

Services publish events; other services subscribe:

```
Order Service publishes: "OrderCreated"
    → Payment Service processes payment
    → Inventory Service updates stock
    → Notification Service sends email
```

Decouples services. Failures don't cascade. But adds complexity (eventual consistency, message ordering).

### Database per service

Each service owns its data. No shared databases. Enforce boundaries.

If services need each other's data:
- Call their API
- Subscribe to their events
- Maintain a local cache

## Migration: monolith to microservices

### The strangler fig pattern

Don't rewrite everything at once. Gradually extract services:

1. Build new features as microservices
2. Extract one capability from the monolith
3. Route traffic to the new service
4. Remove old code from monolith
5. Repeat

The monolith shrinks as services grow (like a strangler fig tree).

### What to extract first

Good candidates for extraction:
- Components with different scaling needs
- Components that change frequently
- Components with clear boundaries
- Components that a single team owns

Bad candidates:
- Tightly coupled code
- Components you don't understand well
- Core domain logic (extract last, understand first)

## Real-world examples

### Netflix

Thousands of microservices. Pioneered many patterns (circuit breakers, chaos engineering). This scale justified massive investment in distributed systems expertise.

### Amazon

Famously moved from monolith to services. The "two-pizza team" rule—services small enough for teams that two pizzas can feed.

### Spotify

Squads (teams) own services. Technical decisions made by squads. Alignment through guilds (cross-squad communities of practice).

### Most companies

Somewhere in between. A monolith with a few extracted services. Some legacy, some modern. Hybrid architectures are common.

## The honest truth

Microservices are not always better. They trade one set of problems for another.

**Monolith problems**: Deployment bottlenecks, scaling limitations, team coordination.

**Microservices problems**: Distributed system complexity, operational overhead, consistency challenges.

Choose based on your actual constraints:
- Team size
- Scaling needs
- Domain complexity
- Operational capability

Many successful companies run large monoliths. Many struggle with premature microservices.

## Further reading

- [What are containers?](/basics/what-are-containers/): How microservices are typically packaged
- [What is Kubernetes?](/basics/what-is-kubernetes/): Orchestrating many microservices
- [What is cloud-native?](/basics/what-is-cloud-native/): The broader philosophy
- [What is DevOps and CI/CD?](/basics/what-is-devops-and-cicd/): Enabling frequent, independent deployments
- [What is an API?](/basics/what-is-an-api/): How microservices communicate
