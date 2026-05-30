---
title: "Integration Testing AI Pipelines"
description: "How to integration test AI systems: testing RAG retrieval pipelines, model inference chains, tool-call sequences, and contract testing between services."
date: 2026-03-28
categories: [Guides]
tags: [integration-testing, testing, pipelines, ai-engineering, docker]
related:
  - guides/testing-ai-systems
  - guides/unit-testing-ai-applications
  - guides/mocking-ai-services
  - guides/contract-testing-ai-services
  - glossary/integration-testing
last_updated: 2026-05-30
---

Integration tests verify that components work together correctly. In AI systems, this means testing that the retrieval service feeds the right chunks to the prompt builder, that the prompt builder produces a well-formed request for the model API, and that the response parser correctly handles what the model returns. Individual components may pass unit tests but fail when connected due to mismatched interfaces, incorrect data flow, or timing issues.

## What Integration Tests Cover

**RAG retrieval pipelines end-to-end.** Seed a test vector database with known documents, run a query through the retrieval pipeline, and verify that the correct documents are returned in the expected format. This tests the chain: query embedding, vector search, result ranking, and chunk formatting.

```python
import pytest
from your_app.retrieval import RetrievalPipeline
from your_app.vectordb import InMemoryVectorStore

@pytest.fixture
def seeded_pipeline():
    store = InMemoryVectorStore()
    store.add_documents([
        {"id": "doc1", "text": "Python was created by Guido van Rossum.", "embedding": [0.1, 0.2, 0.3]},
        {"id": "doc2", "text": "Java was created by James Gosling.", "embedding": [0.4, 0.5, 0.6]},
    ])
    return RetrievalPipeline(vector_store=store, top_k=2)

def test_retrieval_returns_relevant_chunks(seeded_pipeline):
    results = seeded_pipeline.retrieve("Who created Python?", query_embedding=[0.1, 0.2, 0.3])
    assert len(results) > 0
    assert any("Python" in r.text for r in results)
    assert all(hasattr(r, "score") for r in results)
```

**Model inference chains.** Test that your pipeline correctly assembles a prompt from retrieved context, sends it to the model service, and parses the response. Use a mocked model that returns deterministic fixture responses.

```python
def test_inference_chain_produces_structured_output(seeded_pipeline, mock_model):
    mock_model.set_response('{"answer": "Guido van Rossum", "sources": ["doc1"]}')
    pipeline = InferencePipeline(retrieval=seeded_pipeline, model=mock_model)
    result = pipeline.run("Who created Python?", query_embedding=[0.1, 0.2, 0.3])
    assert result.answer == "Guido van Rossum"
    assert "doc1" in result.sources
    # Verify the model received the right prompt structure
    assert "Python was created by Guido" in mock_model.last_prompt
```

**Tool-call sequences.** For agent-based systems, test that the agent calls tools in the expected order with the correct parameters when given a deterministic mock model that returns predetermined tool-call instructions.

```python
def test_agent_calls_search_then_summarize(mock_model, mock_tools):
    mock_model.set_responses([
        {"tool_call": {"name": "search", "args": {"query": "quarterly revenue"}}},
        {"tool_call": {"name": "summarize", "args": {"text": "Revenue was $1M."}}},
        {"content": "The quarterly revenue was $1 million."}
    ])
    agent = Agent(model=mock_model, tools=mock_tools)
    result = agent.run("What was the quarterly revenue?")
    assert mock_tools.call_log == [
        ("search", {"query": "quarterly revenue"}),
        ("summarize", {"text": "Revenue was $1M."})
    ]
```

## Real Models vs Mocked Models

Use mocked models for integration tests that run on every pull request. Mocked models are fast, free, and deterministic. They verify that your pipeline logic is correct.

Use real models (or lightweight proxy models) for evaluation tests that run less frequently: on merge to main, on a nightly schedule, or when prompts change. These verify that the model produces quality outputs for your use case.

The boundary is clear: integration tests verify your code, evaluation tests verify the model. Do not mix them.

## Contract Testing Between Services

When your AI system is composed of microservices (a retrieval service, an inference service, a post-processing service), define contracts at each boundary.

A contract specifies: given this input shape, this service returns this output shape within this latency bound. For example, the retrieval service contract might state that given a query embedding of dimension 1536 and a top_k parameter, it returns an array of objects each containing `text`, `source`, `score`, and `metadata` fields, within 200 milliseconds.

Test contracts from both sides. The provider test verifies that the service honors its contract. The consumer test verifies that the consuming service handles the contracted response format correctly. When contracts break, both tests fail, making the break easy to diagnose.

## Docker-Based Test Environments

For integration tests that need a vector database, use Docker Compose to spin up ephemeral test infrastructure.

```yaml
# docker-compose.test.yml
services:
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
  test-runner:
    build: .
    depends_on:
      - qdrant
    environment:
      - VECTOR_DB_URL=http://qdrant:6333
    command: pytest tests/integration/ -v
```

This gives you a real vector database for testing retrieval logic without mocking the database layer. The environment is disposable and reproducible. Run it in CI with `docker compose -f docker-compose.test.yml up --abort-on-container-exit`.

## Structuring Integration Tests

Separate integration tests from unit tests using directory structure or pytest markers.

```
tests/
  unit/           # No external dependencies, runs in milliseconds
  integration/    # Requires mocked services or test containers
  eval/           # Requires real model APIs, runs on schedule
  fixtures/       # Shared test data
  conftest.py     # Shared fixtures
```

Integration tests should complete in under 5 minutes for a typical AI application. If they take longer, you are probably testing too many scenarios at this layer. Move detailed input-output coverage to unit tests and keep integration tests focused on verifying that components connect correctly.

## Common Integration Test Failures

**Schema mismatches.** Service A sends a field named `chunk_text`, service B expects `text`. Unit tests on each service pass, but integration tests catch the mismatch.

**Missing error handling.** The retrieval service returns an empty result set, and the prompt builder crashes because it assumes at least one chunk. Integration tests reveal these gaps.

**Timeout cascades.** The model API takes 10 seconds, but the calling service has a 5-second timeout. Integration tests with configurable latency in mocks catch these before production.

**Token limit violations.** Individually, context chunks are within limits. Combined into a prompt with system instructions, they exceed the model's context window. Integration tests that assemble full prompts catch this.
