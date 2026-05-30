---
title: "Integration Testing"
description: "What integration testing is, how it verifies component interactions, and where test boundaries belong in AI systems."
date: 2026-03-28
categories: [Glossary]
tags: [integration-testing, testing, quality, ai-engineering]
related:
  - guides/integration-testing-ai-pipelines
  - guides/testing-ai-systems
  - glossary/unit-testing
  - glossary/end-to-end-testing
last_updated: 2026-05-30
---

Integration testing verifies that multiple components work correctly together. While unit tests validate individual functions in isolation, integration tests validate the connections between them: data flows correctly from one component to the next, interfaces match, and the combined behavior produces the expected result.

## Scope and Boundaries

An integration test exercises two or more components connected through their real interfaces. The boundary of an integration test is the point where you stop using real components and start using test doubles.

In AI systems, common integration test boundaries include:

- **Retrieval pipeline:** Test the chain from query processing through embedding, vector search, and result formatting. The vector database may be a real containerized instance (Qdrant, Pinecone dev mode) or an in-memory fake.
- **Inference pipeline:** Test from prompt assembly through model invocation to response parsing. The model is typically mocked with a deterministic stub.
- **Agent pipeline:** Test from task input through tool selection, tool execution, and result synthesis. Tools may be mocked or sandboxed.

The model API is usually the boundary. Integration tests use mocked models to stay fast and deterministic. Tests that use real models are evaluation tests, a distinct category.

## What Integration Tests Catch

Integration tests catch failures that unit tests miss:

**Interface mismatches.** Service A returns `{"text": "..."}` but service B expects `{"content": "..."}`. Both pass unit tests but fail when connected.

**Data format incompatibilities.** The chunker produces plain text but the prompt builder expects objects with `text` and `metadata` fields.

**Error propagation failures.** The retrieval service returns an error, but the inference service does not handle it and crashes.

**Configuration drift.** Two services expect different embedding dimensions, token limits, or model identifiers.

## Test Infrastructure

Integration tests often require running services. Docker Compose is the standard approach for spinning up ephemeral test infrastructure: vector databases, caches, message queues. These containers start before tests run, accept test traffic, and are destroyed after tests complete.

For CI environments, use service containers or Docker Compose with `--abort-on-container-exit` to run the test suite and tear down infrastructure automatically.

## Placement in the Test Pyramid

Integration tests sit between unit tests and end-to-end tests. They are slower than unit tests (seconds to minutes vs milliseconds) but faster and cheaper than E2E tests. A typical AI application has hundreds of unit tests, tens of integration tests, and a handful of E2E tests. Integration tests should run on every pull request alongside unit tests, completing within 5 minutes.

## Sources

- Fowler, M. (2018). Integration testing. *martinfowler.com*. (Definition and scope of integration tests; distinction from unit and E2E tests; where to draw integration test boundaries.)
- Cohn, M. (2009). *Succeeding with Agile: Software Development Using Scrum*. Addison-Wesley. (Test pyramid: integration tests as the middle layer balancing confidence and speed.)
- Newman, S. (2015). *Building Microservices*. O'Reilly Media. Chapter 7: Testing. (Integration testing for microservices; contract testing and the challenge of testing distributed systems.)
