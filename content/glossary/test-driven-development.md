---
title: "Test-Driven Development"
description: "The TDD red-green-refactor cycle and how it applies to AI application development where outputs are non-deterministic."
date: 2026-03-28
categories: [Glossary]
tags: [tdd, testing, development-practice, quality, ai-engineering]
related:
  - guides/unit-testing-ai-applications
  - guides/testing-ai-systems
  - glossary/unit-testing
  - glossary/property-based-testing
---

Test-driven development (TDD) is a software development practice where you write a failing test before writing the code that makes it pass. The cycle has three steps: red (write a failing test), green (write the minimum code to pass the test), and refactor (improve the code while keeping tests green).

## The Red-Green-Refactor Cycle

**Red.** Write a test that describes the behavior you want. Run it. It fails because the behavior does not exist yet. The failing test confirms that the test is actually testing something.

**Green.** Write the simplest code that makes the test pass. Do not optimize or generalize. Just make it work.

**Refactor.** Improve the code's structure, readability, and performance without changing its behavior. The tests verify that refactoring did not break anything.

Repeat this cycle for each new behavior.

## TDD for AI Development

TDD applies well to the deterministic components of AI systems: prompt builders, output parsers, data validators, chunking functions, and pipeline orchestration. These components have predictable inputs and outputs that are easy to specify in tests.

Example: building a prompt template with TDD.

1. **Red:** Write a test that asserts the prompt includes the user's question. It fails because the prompt builder does not exist.
2. **Green:** Implement a prompt builder that includes the question. Test passes.
3. **Red:** Write a test that asserts the prompt includes context chunks. It fails.
4. **Green:** Add context chunk injection to the prompt builder. Test passes.
5. **Refactor:** Extract common formatting logic. All tests still pass.

## Where TDD Does Not Apply Directly

TDD does not work for model inference because you cannot write a test that specifies the exact model output before the model exists. However, you can use TDD for the code around model calls: write tests for how your system should handle various model responses (valid JSON, malformed JSON, empty response, error response), then implement the handling logic.

For model quality, use evaluation-driven development instead: define quality metrics and thresholds, then iterate on prompts and configurations until the metrics are met. This is conceptually similar to TDD but operates at a statistical level rather than a deterministic one.

## Benefits for AI Projects

TDD forces you to design testable interfaces. AI code written without tests tends to tightly couple model calls with business logic, making it impossible to test without calling real models. TDD naturally produces code with clean separation between deterministic logic and model inference, dependency injection for model clients, and well-defined interfaces at service boundaries. These qualities make the codebase easier to test, debug, and maintain.

## Sources

- Beck, K. (2003). *Test-Driven Development: By Example*. Addison-Wesley. (The foundational TDD book; introduced and defined the red-green-refactor cycle.)
- Fowler, M. (2005). Test-driven development. *martinfowler.com*. (Canonical online reference for TDD terminology and practices.)
- Freeman, S., & Pryce, N. (2009). *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley. (Outside-in TDD; acceptance tests driving unit test design, particularly relevant for AI application integration testing.)
