---
title: "Contract Testing"
description: "What contract testing is, how it verifies service integration agreements, and when to use it instead of end-to-end tests."
date: 2026-03-28
categories: [Glossary]
tags: [contract-testing, testing, microservices, API, Pact]
related:
  - glossary/semantic-versioning
  - glossary/ci-cd
  - glossary/api
last_updated: 2026-05-30
---

Contract testing verifies that two services (a consumer and a provider) agree on the format and behavior of their API interactions. Instead of testing the full integrated system end-to-end, contract tests verify each side independently against a shared contract, catching integration issues early without requiring both services to be running simultaneously.

## How It Works

**Consumer-driven contract testing** (the most common approach, popularized by Pact) works in two phases:

1. The consumer team writes tests that define their expectations: "When I call GET /documents/123, I expect a JSON response with fields id, title, and status." These expectations are captured as a contract.

2. The provider team runs their service against the consumer's contract, verifying that the provider's actual responses match the consumer's expectations.

If the provider makes a change that breaks a consumer's contract, the provider's CI pipeline catches it before deployment.

## Why It Matters

In microservices architectures, the most common integration failures are mismatched API expectations: the provider changes a field name, adds a required parameter, or changes a response format. End-to-end tests catch these but are slow, flaky, and expensive to maintain. Contract tests catch the same integration issues in seconds, running independently in each team's CI pipeline.

For AI applications with multiple services (API gateway, inference service, post-processing, storage), contract tests verify that each service's API contract is honored, preventing the silent integration failures that are common when teams deploy independently.

## Practical Guidance

Use Pact for consumer-driven contract testing between HTTP services. Start with the most critical service boundaries - the ones that break most often or cause the most pain when they break. Contract tests complement, not replace, unit tests (verify internal logic) and a small number of end-to-end tests (verify critical user journeys). Keep contracts focused on the data structure and status codes that consumers actually use, not every field the provider returns.

For AI model APIs, contract tests verify response format and required fields, not prediction accuracy (which requires different evaluation approaches).

## Sources

- Fowler, M. (2011). Consumer-driven contracts: A service evolution pattern. *martinfowler.com*. (Defined consumer-driven contract testing; the pattern underlying Pact and all modern contract testing tools.)
- Richardson, C. (2018). *Microservices Patterns*. Manning. Chapter 3: Interprocess communication in a microservice architecture. (Contract testing in the microservices context; API versioning and backward compatibility strategies.)
- IainAtkinson & Bethany Skurrie. (2018). Pact specification. *pact.io*. (Pact; the most widely used consumer-driven contract testing tool; specification and protocol.)
