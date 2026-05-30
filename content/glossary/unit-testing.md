---
title: "Unit Testing"
description: "What unit testing is, how isolation and test doubles work, and assertion patterns relevant to AI application development."
date: 2026-03-28
categories: [Glossary]
tags: [unit-testing, testing, quality, ai-engineering]
related:
  - guides/unit-testing-ai-applications
  - guides/testing-ai-systems
  - glossary/mocking
  - glossary/test-fixture
last_updated: 2026-05-30
---

Unit testing is the practice of testing individual functions, methods, or classes in isolation from the rest of the system. Each unit test verifies that a single piece of logic produces the correct output for a given input. Unit tests are fast (milliseconds per test), cheap (no external services), and deterministic (same result every time).

## Isolation

The defining characteristic of a unit test is isolation. The code under test should not depend on databases, APIs, file systems, or other services. Dependencies are replaced with test doubles (mocks, stubs, or fakes) so that the test exercises only the logic being tested.

In AI applications, isolation means the unit test never calls a model API. Functions that build prompts, parse model responses, validate inputs, chunk documents, or compute embeddings are all testable in isolation. The model call itself is a boundary that unit tests do not cross.

## Test Doubles

Test doubles replace real dependencies with controlled substitutes.

**Stubs** return predetermined values. A stub model client always returns the same response, regardless of input. Stubs verify that your code handles the response correctly.

**Mocks** record interactions. A mock model client records what prompts were sent to it, allowing you to assert that your code sent the right prompt. Mocks verify that your code sends the right request.

**Fakes** are simplified implementations. An in-memory vector store is a fake: it implements the same interface as a real vector store but uses a Python dictionary instead of a database. Fakes verify that your code interacts with the dependency correctly.

**Spies** are partial mocks that wrap real objects and record calls while still executing the real logic. Useful when you want to verify interactions without changing behavior.

## Assertion Patterns

**Exact match:** `assert result == expected`. Used for deterministic outputs like parsed values, computed scores, or template renders.

**Property assertions:** `assert 0 <= result.confidence <= 1`. Used when the exact value varies but must satisfy constraints.

**Structural assertions:** `assert "answer" in result and "sources" in result`. Used when the shape matters more than the content.

**Exception assertions:** `with pytest.raises(ValueError)`. Used to verify that invalid inputs are rejected.

## What to Unit Test in AI Codebases

Focus unit tests on deterministic logic: prompt template rendering, output parsing, input validation, chunking algorithms, embedding preprocessing, configuration loading, and error handling. These components are stable, fast to test, and provide high confidence. Model inference outputs are not suitable for unit testing because they are non-deterministic by nature.

## Running Unit Tests

Unit tests should run in under 30 seconds for the entire suite, execute on every commit and pull request, and never require network access or API keys. Use pytest markers (`@pytest.mark.unit`) to separate unit tests from integration and evaluation tests so CI can run the appropriate subset at each stage.

## Sources

- Beck, K. (2003). *Test-Driven Development: By Example*. Addison-Wesley. (TDD and unit testing as a discipline; defines test isolation and the test-first approach.)
- Meszaros, G. (2007). *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley. (Canonical reference for test doubles (mocks, stubs, fakes, spies); the terminology used throughout this article comes from this book.)
- Fowler, M. (2014). Mocks aren't stubs. *martinfowler.com*. (Precise definitions distinguishing mocks from stubs; classic reference for understanding test double semantics.)
