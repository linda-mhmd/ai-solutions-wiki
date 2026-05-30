---
title: "Testing Strategy"
description: "The testing pyramid, test-driven development, and the discipline of building confidence in software through automated verification. A structured approach to knowing that code does what it is supposed to do."
layout: single
tags: ["testing", "tdd", "unit-testing", "integration-testing", "testing-pyramid"]
categories: ["Foundations"]
last_updated: 2026-05-30
---

Automated testing is not about finding bugs. It is about preventing them from surviving. A test suite is a specification written in code - an executable description of what the software is supposed to do, verified continuously. When a change breaks something, the suite says so immediately rather than waiting for a user to discover it in production.

Kent Beck formalized Test Driven Development in *Test Driven Development: By Example* (2002), building on work he had done at Chrysler in the mid-1990s. The testing pyramid was articulated by Mike Cohn in *Succeeding with Agile* (2009) and later popularized by Martin Fowler. These two contributions - TDD as a development practice and the pyramid as an organizational framework - form the core of modern testing strategy.

---

## The Testing Pyramid

The testing pyramid describes how automated tests should be distributed across three levels: unit tests at the base, integration tests in the middle, and end-to-end tests at the top.

```
         /\
        /  \
       / E2E \          Few, slow, expensive
      /--------\
     /Integration\      Moderate number
    /------------\
   /  Unit Tests  \     Many, fast, cheap
  /______________\
```

The shape is not arbitrary. It reflects the tradeoff between speed, cost, and coverage at each level. Unit tests are fast (milliseconds), cheap to write and maintain, and easy to run locally. End-to-end tests are slow (minutes), expensive to maintain, and often flaky. A test suite with most tests at the top runs slowly, provides uncertain coverage, and fails unpredictably.

The pyramid is a heuristic, not a rule. Some systems - particularly those with complex integrations - benefit from more integration tests. But the principle holds: tests lower in the pyramid run faster, are more stable, and provide more precise feedback about what failed.

---

## Unit Tests

A unit test verifies the behavior of a single unit of code in isolation. A unit is typically a class or function. The dependencies of the unit are replaced with test doubles - controlled substitutes that return predictable values.

Unit tests have three properties that make them valuable:

**Fast.** A unit test that calls a database is not a unit test - it is a slow, fragile integration test. Real unit tests run in microseconds to milliseconds. A suite of 10,000 unit tests should run in seconds.

**Deterministic.** A unit test that passes sometimes and fails sometimes (a "flaky" test) provides no value. It is a source of noise that erodes trust in the suite. Determinism requires controlling all sources of randomness, time, and external state.

**Specific.** When a unit test fails, it should be immediately obvious what failed and why. A test that exercises 10 functions and produces a cryptic assertion error leaves the developer to debug which of the 10 is responsible.

```
// Unit test - isolated, fast, deterministic
def test_apply_payment_reduces_balance():
    account = LoanAccount(id="acc-1", balance=Money(1000, "USD"))
    payment = Payment(amount=Money(250, "USD"))

    account.apply_payment(payment)

    assert account.balance == Money(750, "USD")
```

No database. No HTTP calls. No file system. Pure logic tested in pure isolation.

---

## Test Doubles

Test doubles are substitutes for real dependencies in unit tests. Martin Fowler's taxonomy from *Patterns of Enterprise Application Architecture* (2002) identifies several types:

**Stub**: Returns a hard-coded response. Use when you need to provide canned input to the unit under test.

**Mock**: Verifies that specific interactions occurred. Use when the behavior being tested is a side effect (a call to a notification service, a log entry) rather than a return value.

**Fake**: A working implementation with simplified behavior (an in-memory repository instead of a real database). Use when you need realistic behavior but not production infrastructure.

**Spy**: Like a stub but also records how it was called. Use to verify interactions without full mock setup.

The distinction between mocks and stubs matters. Overusing mocks produces tests that verify implementation details - the test knows which methods are called, in what order, with what arguments. When the implementation changes (but the behavior is the same), the mock-heavy tests fail, even though nothing is broken. Prefer testing outcomes (return values, state changes) over interactions (method calls) where possible.

---

## Test Driven Development

TDD is a development practice, not just a testing practice. The cycle is:

1. **Red**: Write a test for a behavior that does not yet exist. The test fails.
2. **Green**: Write the minimum code necessary to make the test pass.
3. **Refactor**: Clean up the implementation without breaking the test.

The value of TDD is not primarily the test coverage it produces. It is the design feedback. Code that is hard to test in isolation is code with poor design - tight coupling, unclear responsibilities, hidden dependencies. When writing the test first, the developer encounters the design problem before writing the code, while it is cheap to fix.

Beck's *Three Rules of TDD* (as later formalized by Robert C. Martin):
1. Do not write production code until you have a failing unit test.
2. Do not write more of a unit test than is sufficient to fail.
3. Do not write more production code than is sufficient to pass the failing test.

The rules seem extreme but enforce a discipline: only write code that is justified by a test. The result is no untested code and no unnecessary code.

---

## Integration Tests

Integration tests verify that two or more components work together correctly. They test at the boundary between components - between the application and the database, between two services, between the application and an external API.

Integration tests are slower than unit tests because they exercise real infrastructure. The tradeoff is that they test things unit tests cannot: that the SQL query actually returns the right rows, that the API client correctly handles a 429 response, that the message consumer deserializes payloads correctly.

A key discipline in integration testing is scope: each integration test should cross exactly one external boundary. A test that covers the HTTP controller, the business logic, and the database at once is not an integration test - it is an end-to-end test that is hard to maintain and slow to run.

---

## End-to-End Tests

End-to-end tests verify complete user flows through the system - from input at the outermost layer to output at the outermost layer, exercising real infrastructure throughout. They are the closest analog to how a real user experiences the system.

Their cost is high: they require a running system, real or realistic infrastructure, and they are inherently slow. They are also the most likely to be flaky - a test that depends on 10 moving parts fails when any one of them misbehaves. The testing pyramid recommends having few of them, focused on the most critical user journeys.

---

## Property-Based Testing

Property-based testing supplements example-based testing. Instead of specifying a particular input and expected output, property-based tests specify invariants that should hold for all inputs, and the testing framework generates hundreds or thousands of random inputs to find violations.

Hypothesis (Python) and QuickCheck (Haskell, ported to many languages) are the primary frameworks. A property test for a sorting function might assert that the output always has the same length as the input, always contains only elements from the input, and is always in non-decreasing order - without specifying any particular input.

Property-based testing is particularly effective at finding edge cases - empty lists, negative numbers, Unicode characters - that example-based tests fail to exercise.

---

## Mocking vs. Real Dependencies

The debate between mocking and using real dependencies is a practical one. Mocking enables fast, isolated tests but risks diverging from real behavior. Real dependencies (a test database, a real HTTP server) are slower but provide higher confidence.

The pragmatic resolution: use real dependencies in integration tests, use test doubles in unit tests, and be deliberate about which tests belong at which level. The worst outcome is a large suite of unit tests that mock the database and produce high coverage metrics while providing low confidence - because the mock behavior never matches the real database behavior under corner cases.

As Fowler notes: tests that use mocks heavily tend to be fragile to refactoring. If the tests encode *how* the code works rather than *what* it produces, they become an obstacle to improvement rather than a safety net.

---

## How This Applies to AI Systems

Testing AI systems requires extending classical testing practices to handle components whose outputs are probabilistic, contextual, and difficult to specify exactly.

**Evaluation frameworks as test suites.** The analog of a unit test for an LLM-powered component is an evaluation: a set of inputs paired with expected outputs or quality criteria, run against the component automatically. Frameworks like RAGAS (for RAG systems), LangSmith, and custom evaluation harnesses implement this pattern. The evaluation is not a unit test - LLM outputs are not deterministic - but it provides the same continuous verification signal.

**Golden dataset testing.** A golden dataset is a curated set of inputs with known-good outputs, maintained over time. Running the AI component against the golden dataset after any change verifies that the component's behavior has not regressed. This is the AI equivalent of regression testing. The challenge is maintenance: golden datasets become stale as the domain evolves, and curating them is labor-intensive.

**Prompt regression testing.** Prompts are code. When a prompt changes, it should be validated against a set of test cases. A CI pipeline that runs prompt regression tests before merging changes catches regressions before they reach production. This requires a small, fast evaluation suite (not a full benchmark) that covers the most critical behaviors.

**Testing the non-LLM parts rigorously.** The retrieval logic, the chunking strategy, the context assembly, the output parsing, the tool dispatch logic - all of these are deterministic components that can be tested with classical unit and integration tests. A well-structured AI system has a large base of classical tests and a smaller set of LLM-specific evaluations. Conflating the two leads to expensive, slow evaluation runs for logic that could be tested cheaply.

**Contract testing for multi-agent systems.** When multiple agents communicate, contract tests verify that each agent produces outputs that its consumers can parse. Consumer-driven contract testing (Pact and similar frameworks) detects breaking changes at service boundaries before integration tests run.

**The test double pattern for LLM calls.** In unit tests for agent logic, the LLM call is a test double. A stub LLM that returns canned responses allows decision logic, state management, and tool dispatch to be tested without API costs, latency, or non-determinism. The integration tests then verify the actual LLM behavior.

### Related Pages
- [SOLID Principles](/foundations/solid-principles/) - the Dependency Inversion Principle makes LLM calls testable via substitution
- [CI/CD](/foundations/ci-cd/) - evaluation gates in AI deployment pipelines are the testing pyramid's top level in a CI/CD context
- [Clean Architecture](/foundations/clean-architecture/) - clean architecture isolates the LLM dependency, making the rest of the system unit-testable
