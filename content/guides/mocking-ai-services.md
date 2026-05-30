---
title: "Mocking AI Services for Testing"
description: "Strategies for mocking LLM APIs, embedding services, and vector databases in tests: fixture responses, VCR pattern, deterministic stubs, and lightweight proxy models."
date: 2026-03-28
categories: [Guides]
tags: [mocking, testing, ai-engineering, pytest, test-doubles]
related:
  - guides/testing-ai-systems
  - guides/integration-testing-ai-pipelines
  - patterns/vcr-pattern-ai
  - glossary/mocking
last_updated: 2026-05-30
---

Mocking AI services is essential for fast, deterministic, and cost-free tests. Every call to an LLM API costs money, takes seconds, and returns non-deterministic results. Tests that depend on live model APIs are slow, expensive, and flaky. This guide covers mock strategies for LLMs, embedding services, and vector databases, with concrete Python examples.

## Strategy 1: Fixture Responses

The simplest approach. For each test case, define the exact response the mock should return.

```python
from unittest.mock import MagicMock

def test_pipeline_formats_response_correctly():
    mock_client = MagicMock()
    mock_client.chat.completions.create.return_value = MagicMock(
        choices=[MagicMock(message=MagicMock(content='{"answer": "42", "confidence": 0.95}'))],
        usage=MagicMock(prompt_tokens=100, completion_tokens=20)
    )
    pipeline = Pipeline(client=mock_client)
    result = pipeline.run("What is the answer?")
    assert result.answer == "42"
    assert result.confidence == 0.95
```

**When to use:** Most integration tests. You control the exact response, making assertions predictable.

**Limitation:** Fixture responses do not evolve with the real API. If the API response format changes, your mocks will not catch it until production breaks.

## Strategy 2: Recorded Responses (VCR Pattern)

Record real API responses once, then replay them in subsequent test runs. The `vcrpy` library intercepts HTTP requests and stores responses as YAML cassettes.

```python
import vcr

@vcr.use_cassette("tests/cassettes/embedding_request.yaml", record_mode="none")
def test_embedding_pipeline():
    pipeline = EmbeddingPipeline(api_key="test-key")
    result = pipeline.embed("What is machine learning?")
    assert len(result.embedding) == 1536
    assert all(isinstance(v, float) for v in result.embedding)
```

Record cassettes once with `record_mode="new_episodes"`, then switch to `record_mode="none"` for CI. Re-record periodically (monthly or when API versions change) to keep cassettes fresh.

**When to use:** When you want realistic responses without the cost and latency of live calls. Particularly valuable for testing embedding outputs and complex structured responses.

**Limitation:** Cassettes are fragile. Any change to request parameters (different prompt text, different model name) produces a cache miss. Filter sensitive data (API keys) from cassettes before committing them.

## Strategy 3: Deterministic Stubs

Build a lightweight stub that implements the same interface as the real client but returns responses based on deterministic logic.

```python
class StubLLMClient:
    """Returns deterministic responses based on input keywords."""

    def generate(self, prompt: str, **kwargs) -> dict:
        if "error" in prompt.lower():
            raise APIError("Simulated API error")
        if "json" in kwargs.get("response_format", ""):
            return {"content": '{"result": "stub_value"}', "stop_reason": "end_turn"}
        return {"content": f"Stub response for: {prompt[:50]}", "stop_reason": "end_turn"}

class StubEmbeddingClient:
    """Returns a deterministic embedding based on text hash."""

    def embed(self, text: str) -> list[float]:
        import hashlib
        seed = int(hashlib.md5(text.encode()).hexdigest(), 16) % (2**32)
        rng = random.Random(seed)
        return [rng.uniform(-1, 1) for _ in range(1536)]
```

The embedding stub is particularly useful: it returns consistent vectors for the same text (enabling similarity assertions) while producing different vectors for different texts.

**When to use:** When you need many test cases with varied inputs and want predictable behavior without maintaining individual fixtures.

## Strategy 4: Lightweight Proxy Models

For tests that need realistic model behavior but cannot use the production model, run a small local model.

```python
# Use a tiny model via Ollama for integration testing
import requests

class LocalModelClient:
    def __init__(self, base_url="http://localhost:11434"):
        self.base_url = base_url

    def generate(self, prompt: str) -> str:
        response = requests.post(f"{self.base_url}/api/generate", json={
            "model": "tinyllama",
            "prompt": prompt,
            "stream": False
        })
        return response.json()["response"]
```

**When to use:** Evaluation-adjacent tests that need real language model behavior but run too frequently for production API calls. A TinyLlama or Phi model running locally produces meaningful text at no cost.

**Limitation:** Local models behave differently from production models. Do not rely on them for quality evaluation.

## Mocking Vector Databases

For retrieval tests, mock the vector database with an in-memory implementation.

```python
import numpy as np

class InMemoryVectorStore:
    def __init__(self):
        self.documents = []

    def add(self, doc_id: str, embedding: list[float], metadata: dict):
        self.documents.append({"id": doc_id, "embedding": np.array(embedding), "metadata": metadata})

    def search(self, query_embedding: list[float], top_k: int = 5) -> list[dict]:
        query = np.array(query_embedding)
        scored = []
        for doc in self.documents:
            score = float(np.dot(query, doc["embedding"]) / (np.linalg.norm(query) * np.linalg.norm(doc["embedding"])))
            scored.append({**doc, "score": score})
        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored[:top_k]
```

This implements real cosine similarity, so retrieval logic tests are meaningful. It is fast and requires no external services.

## When Mocking Hides Real Bugs

Mocking is not free of risk. Over-mocking can hide real integration problems.

**API format changes.** If the provider changes response format, your mocks still return the old format and tests pass while production breaks. Mitigate by re-recording VCR cassettes periodically and running a small set of live-API tests on a schedule.

**Latency and timeout behavior.** Mocks return instantly. Real APIs take 1-30 seconds. If your code has timeout handling, mocks will not exercise it. Add artificial latency to mocks when testing timeout logic.

**Rate limiting and retry logic.** Mocks never rate-limit. Test retry logic with mocks that return 429 errors on configurable intervals.

**Token counting.** Mocks do not count tokens. If your system depends on accurate token counts for chunking or cost tracking, the mock must include realistic usage data.

The rule of thumb: mock for speed and determinism in CI, but maintain a scheduled suite that hits real services to catch what mocks miss.
