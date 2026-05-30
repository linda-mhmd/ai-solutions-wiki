---
title: "Mocking"
description: "Test doubles for AI systems: mocks, stubs, fakes, and spies explained, with guidance on when to use each for testing AI applications."
date: 2026-03-28
categories: [Glossary]
tags: [mocking, testing, test-doubles, quality, ai-engineering]
related:
  - guides/mocking-ai-services
  - guides/testing-ai-systems
  - glossary/unit-testing
  - glossary/test-fixture
last_updated: 2026-05-30
---

Mocking is a testing technique where real dependencies are replaced with controlled substitutes called test doubles. In AI systems, mocking is essential because real dependencies (LLM APIs, embedding services, vector databases) are slow, expensive, and non-deterministic. Test doubles provide fast, free, and predictable behavior for testing.

## Types of Test Doubles

**Mocks** are objects that record how they were called and allow you to assert on those interactions. A mock LLM client records the prompts sent to it so you can verify your code sent the correct prompt structure.

```python
mock_client = MagicMock()
pipeline.run("test", client=mock_client)
mock_client.generate.assert_called_once()
assert "test" in mock_client.generate.call_args[0][0]
```

**Stubs** return predetermined responses without recording interactions. A stub embedding service always returns the same vector. Stubs are simpler than mocks and are used when you only care about how your code handles the response, not what it sent.

**Fakes** are working implementations with simplified internals. An in-memory vector store that implements cosine similarity search is a fake: it behaves like a real vector store but uses a dictionary instead of a database. Fakes are more realistic than stubs but require more implementation effort.

**Spies** wrap real objects, delegating calls to the real implementation while recording the interactions. Useful when you need real behavior but also want to verify that specific calls were made.

## When to Use Each for AI Systems

Use **stubs** for most unit tests where you need to feed a known response into your parser or pipeline logic. They are the simplest and fastest option.

Use **mocks** when you need to verify that your code sends the correct request to the model API: right prompt format, correct parameters, appropriate headers.

Use **fakes** for integration tests that need realistic behavior from dependencies. An in-memory vector store with real cosine similarity is more trustworthy than a stub that returns hardcoded results.

Use **spies** rarely, typically when debugging test failures where you need to see both the real behavior and the interaction log.

## Risks of Over-Mocking

Mocking creates a gap between tests and reality. If you mock everything, your tests verify that your code works with your mocks, not with real services. Mitigate this by running a small set of tests against real services on a schedule, re-recording VCR cassettes periodically, and defining contracts between services that are tested independently. The goal is confidence that mocked tests reflect real behavior, not blind trust in mocks.

## Sources

- Meszaros, G. (2007). *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley. (Canonical taxonomy of test doubles: mocks, stubs, fakes, spies, and dummies; the source of the terminology used throughout this article.)
- Fowler, M. (2014). Mocks aren't stubs. *martinfowler.com*. (Precise distinction between mocks (interaction-based) and stubs (state-based); when each is appropriate; classical vs. mockist testing styles.)
- Freeman, S., & Pryce, N. (2009). *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley. (Mock-based TDD; using mocks to discover interfaces and drive design; avoiding over-mocking with the GOOS style.)
