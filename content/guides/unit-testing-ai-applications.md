---
title: "Unit Testing AI Applications"
description: "How to unit test AI codebases effectively: testing prompt templates, output parsers, data validation, chunking functions, and embedding preprocessing with pytest examples."
date: 2026-03-28
categories: [Guides]
tags: [unit-testing, testing, pytest, ai-engineering, quality]
related:
  - guides/testing-ai-systems
  - guides/integration-testing-ai-pipelines
  - glossary/unit-testing
  - glossary/test-fixture
last_updated: 2026-05-30
---

Unit testing AI applications follows the same principle as unit testing any software: isolate small pieces of logic and verify they work correctly. The key insight for AI codebases is knowing where the boundary lies between deterministic code (which you unit test thoroughly) and model inference (which you do not unit test, because the outputs are non-deterministic).

## What to Unit Test in an AI Codebase

The deterministic code surrounding model calls is usually larger than the model call itself. This code is fully testable with standard unit testing techniques.

**Prompt templates.** Verify that templates render correctly with different variable combinations, handle missing variables gracefully, and produce well-formed prompts.

```python
import pytest
from your_app.prompts import build_rag_prompt

def test_rag_prompt_includes_context():
    prompt = build_rag_prompt(
        question="What is RAG?",
        context_chunks=["RAG stands for Retrieval-Augmented Generation."],
        system_instruction="Answer concisely."
    )
    assert "What is RAG?" in prompt
    assert "Retrieval-Augmented Generation" in prompt
    assert "Answer concisely" in prompt

def test_rag_prompt_handles_empty_context():
    prompt = build_rag_prompt(
        question="What is RAG?",
        context_chunks=[],
        system_instruction="Answer concisely."
    )
    assert "no relevant context" in prompt.lower()
```

**Output parsers.** These take raw model output and extract structured data. Test them with a variety of well-formed and malformed inputs.

```python
from your_app.parsers import parse_json_response

def test_parse_valid_json():
    raw = '{"answer": "Paris", "confidence": 0.95}'
    result = parse_json_response(raw)
    assert result.answer == "Paris"
    assert result.confidence == 0.95

def test_parse_json_with_markdown_fences():
    raw = '```json\n{"answer": "Paris"}\n```'
    result = parse_json_response(raw)
    assert result.answer == "Paris"

def test_parse_invalid_json_returns_error():
    raw = "This is not JSON at all."
    result = parse_json_response(raw)
    assert result.error is not None
```

**Data validation.** Test input validation, schema enforcement, and boundary checks.

```python
from your_app.validation import validate_query

def test_query_too_long_is_rejected():
    long_query = "a" * 10001
    with pytest.raises(ValueError, match="exceeds maximum"):
        validate_query(long_query)

def test_empty_query_is_rejected():
    with pytest.raises(ValueError, match="empty"):
        validate_query("")
```

**Chunking functions.** Chunkers are pure functions: given a document and configuration, they produce deterministic chunks. Test boundary conditions thoroughly.

```python
from your_app.chunking import chunk_by_tokens

def test_short_document_returns_single_chunk():
    chunks = chunk_by_tokens("Hello world.", max_tokens=100, overlap=10)
    assert len(chunks) == 1
    assert chunks[0].text == "Hello world."

def test_overlap_between_chunks():
    text = "Word " * 200  # Long enough to require multiple chunks
    chunks = chunk_by_tokens(text, max_tokens=50, overlap=10)
    for i in range(1, len(chunks)):
        # Last tokens of previous chunk should appear in next chunk
        prev_end = chunks[i - 1].text.split()[-5:]
        curr_start = chunks[i].text.split()[:10]
        overlap_words = set(prev_end) & set(curr_start)
        assert len(overlap_words) > 0
```

**Embedding preprocessing.** Test text cleaning, normalization, and tokenization before embedding.

```python
from your_app.preprocessing import normalize_for_embedding

def test_normalize_strips_html():
    result = normalize_for_embedding("<p>Hello <b>world</b></p>")
    assert "<" not in result
    assert "Hello world" in result

def test_normalize_collapses_whitespace():
    result = normalize_for_embedding("Hello    \n\n   world")
    assert result == "Hello world"
```

## What Not to Unit Test

Do not unit test model inference outputs. A test like `assert model.generate("What is 2+2?") == "4"` is a flaky test by definition. Model outputs vary between runs, model versions, and even temperature settings. Use evaluation frameworks (covered in the testing-ai-systems guide) for validating model output quality.

Do not unit test third-party API behavior. Testing that the OpenAI SDK correctly sends a request is OpenAI's responsibility, not yours. Test that your code correctly prepares the request and handles the response.

## Test Fixtures for AI Pipelines

Create reusable fixtures for common test data.

```python
import pytest

@pytest.fixture
def sample_chunks():
    return [
        {"text": "Python was created by Guido van Rossum.", "source": "doc1.pdf", "page": 1},
        {"text": "Python 3.0 was released in 2008.", "source": "doc1.pdf", "page": 3},
    ]

@pytest.fixture
def sample_model_response():
    return {
        "content": "Python was created by Guido van Rossum and version 3.0 was released in 2008.",
        "usage": {"input_tokens": 150, "output_tokens": 25},
        "stop_reason": "end_turn"
    }

@pytest.fixture
def sample_embedding():
    """A deterministic fake embedding for testing cosine similarity logic."""
    return [0.1] * 1536  # Matches OpenAI ada-002 dimension
```

Store large fixture data in JSON files under a `tests/fixtures/` directory rather than inline in test files. This keeps tests readable and makes fixtures reusable across test modules.

## Running the Suite

Structure your tests to run fast. Unit tests for an AI application should complete in under 30 seconds, even for a large codebase, because they never call external services. Run them on every commit and every pull request with no exceptions. Any test that requires a model API call belongs in the integration or evaluation suite, not here.

```bash
# Run only unit tests (exclude integration and eval markers)
pytest tests/unit/ -v --tb=short

# Run with coverage
pytest tests/unit/ --cov=your_app --cov-report=term-missing
```

Mark tests clearly so that CI can run the right subset at the right time. Use pytest markers (`@pytest.mark.unit`, `@pytest.mark.integration`, `@pytest.mark.eval`) to separate the tiers.
