---
title: "Test Fixture"
description: "What test fixtures are, how they provide predefined data and state for reproducible tests, and fixture patterns for AI systems."
date: 2026-03-28
categories: [Glossary]
tags: [test-fixture, testing, data, quality, ai-engineering]
related:
  - guides/test-data-management-ai
  - guides/unit-testing-ai-applications
  - glossary/unit-testing
  - glossary/golden-dataset
last_updated: 2026-05-30
---

A test fixture is a fixed state or set of data used as a baseline for running tests. Fixtures ensure that tests start from a known, reproducible state, making test results consistent and debuggable. The term covers both the data used in tests (sample documents, model responses, embeddings) and the setup/teardown logic that prepares the test environment.

## Types of Fixtures

**Data fixtures.** Predefined data used as test inputs or expected outputs. In AI systems, this includes sample documents, query-answer pairs, pre-computed embeddings, and recorded model responses.

**State fixtures.** Setup logic that creates a specific system state before a test runs. Examples: seeding a vector database with known documents, configuring a mock model client, or creating a temporary directory for file-based operations.

**Teardown fixtures.** Cleanup logic that restores the system to its original state after a test completes. Examples: clearing a test database, removing temporary files, or resetting mock call logs.

## Fixtures in pytest

pytest provides a powerful fixture system using the `@pytest.fixture` decorator. Fixtures can be scoped (per test, per class, per module, or per session), parameterized, and composed.

```python
@pytest.fixture
def sample_chunks():
    return [
        {"text": "Python is a programming language.", "source": "doc1"},
        {"text": "Machine learning uses data.", "source": "doc2"},
    ]

@pytest.fixture
def mock_model():
    model = MockLLMClient()
    model.set_response('{"answer": "test answer"}')
    return model

def test_pipeline_uses_chunks(sample_chunks, mock_model):
    pipeline = Pipeline(model=mock_model)
    result = pipeline.run("test query", chunks=sample_chunks)
    assert result.answer == "test answer"
```

## Fixture Patterns for AI Systems

**Response fixtures.** Store sample model API responses as JSON files in a `tests/fixtures/` directory. Load them in tests to simulate different response scenarios: valid responses, malformed responses, error responses, and edge cases.

**Embedding fixtures.** Pre-compute or generate deterministic fake embeddings for test documents. Use hash-based generation for consistency: the same text always produces the same fake embedding.

**Vector database fixtures.** Seed an in-memory or containerized vector store with known documents before retrieval tests. Use fixture scope to control whether the database is shared across tests (faster) or recreated for each test (more isolated).

**Golden fixtures.** Curated, human-reviewed datasets used for regression testing. These are versioned and updated intentionally, not automatically. Changes to golden fixtures require review.

## Best Practices

Keep fixtures small and focused. A fixture that creates an entire application state is hard to understand and maintain. Prefer composing small fixtures over creating large monolithic ones. Store large fixture data in files rather than inline in test code. Version fixture files alongside tests in source control so they evolve together.

## Sources

- Meszaros, G. (2007). *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley. Chapter 5: Test Fixtures. (Definitive taxonomy of test fixtures: fresh fixtures, shared fixtures, and inline setup vs. delegated setup patterns.)
- Beck, K. (2003). *Test-Driven Development: By Example*. Addison-Wesley. (Test fixtures in the context of TDD; setUp and tearDown lifecycle; the relationship between fixtures and test isolation.)
- Fowler, M. (2006). ObjectMother. *martinfowler.com*. (Object Mother pattern for building test fixtures; factory methods for creating test data in a consistent, reusable way.)
