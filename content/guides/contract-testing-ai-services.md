---
title: "Contract Testing for AI Microservices"
description: "Contract testing between AI services: defining input/output contracts, latency SLAs, Pact for AI services, provider vs consumer-driven contracts, and backward compatibility for model versions."
date: 2026-03-28
categories: [Guides]
tags: [contract-testing, testing, microservices, pact, ai-engineering]
related:
  - guides/integration-testing-ai-pipelines
  - guides/testing-ai-systems
  - glossary/integration-testing
last_updated: 2026-05-30
---

When an AI system is composed of microservices, each service boundary is a potential failure point. The embedding service changes its output dimension. The retrieval service adds a new field to its response. The inference service updates its model and the output format shifts. Contract testing catches these breaks before they reach production by defining and verifying the agreements between services.

## What Is a Contract in AI Systems

A contract defines the agreed interface between two services: what the consumer sends and what the provider returns. For AI services, contracts typically include:

**Input schema:** The shape and types of the request. For an embedding service: `{"text": string, "model": string (optional)}`.

**Output schema:** The shape and types of the response. For an embedding service: `{"embedding": float[], "dimension": int, "model": string, "usage": {"tokens": int}}`.

**Constraints:** Value ranges and invariants. The embedding array length must equal the dimension field. Token count must be positive. Dimension must be one of [384, 768, 1536].

**Latency SLA:** Maximum response time. The embedding service must respond within 500ms for text under 8192 tokens.

**Error contract:** How errors are reported. Status code 422 for invalid input with body `{"error": string, "code": string}`.

## Consumer-Driven Contracts

In consumer-driven contract testing, each consumer service defines what it needs from the provider. The provider then verifies it can satisfy all consumer contracts.

```python
# Consumer side: inference service defines what it needs from retrieval
from pact import Consumer, Provider

pact = Consumer("InferenceService").has_pact_with(Provider("RetrievalService"))

def test_retrieval_contract():
    expected = {
        "chunks": [
            {
                "text": "Example chunk text.",
                "source_id": "doc_123",
                "score": 0.95,
                "metadata": {"page": 1}
            }
        ],
        "query_embedding_dimension": 1536,
        "search_time_ms": 45
    }

    pact.given("documents exist in the index")
    pact.upon_receiving("a retrieval request")
    pact.with_request("POST", "/retrieve", body={
        "query_embedding": [0.1] * 1536,
        "top_k": 5,
        "filters": {"source_type": "pdf"}
    })
    pact.will_respond_with(200, body=Like(expected))

    with pact:
        result = retrieval_client.retrieve(
            query_embedding=[0.1] * 1536,
            top_k=5,
            filters={"source_type": "pdf"}
        )
        assert len(result.chunks) > 0
        assert all(hasattr(c, "score") for c in result.chunks)
```

**Provider verification:** The retrieval service runs the consumer-defined pact against its real implementation.

```python
# Provider side: retrieval service verifies it satisfies the contract
def test_provider_satisfies_contract():
    verifier = Verifier(provider="RetrievalService", provider_base_url="http://localhost:8001")
    verifier.verify_with_broker(
        broker_url="https://pact-broker.internal",
        consumer_version_selectors=[{"mainBranch": True}]
    )
```

## Provider-Driven Contracts

When the AI model provider defines the contract, consumers must conform. This is common when wrapping third-party model APIs.

```python
# Define the contract the model API provider guarantees
MODEL_API_CONTRACT = {
    "request": {
        "required_fields": ["model", "messages"],
        "messages_item": {"role": "str", "content": "str"},
    },
    "response": {
        "required_fields": ["id", "choices", "usage"],
        "choices_item": {
            "required_fields": ["message", "finish_reason"],
            "message": {"role": "str", "content": "str"}
        },
        "usage": {"prompt_tokens": "int", "completion_tokens": "int", "total_tokens": "int"}
    }
}

def test_response_matches_provider_contract():
    response = model_client.chat(
        model="gpt-4o",
        messages=[{"role": "user", "content": "Hello"}]
    )
    # Verify response matches the provider's contract
    assert "id" in response
    assert "choices" in response
    assert len(response["choices"]) > 0
    assert "message" in response["choices"][0]
    assert "content" in response["choices"][0]["message"]
    assert "usage" in response
    assert response["usage"]["total_tokens"] > 0
```

## Contracts for AI-Specific Concerns

### Embedding Dimension Contract

When the embedding model changes, the dimension may change. This breaks vector databases seeded with the old dimension.

```python
def test_embedding_dimension_contract():
    """Embedding dimension must match the vector database configuration."""
    EXPECTED_DIMENSION = 1536
    result = embedding_service.embed("test text")
    assert len(result.embedding) == EXPECTED_DIMENSION, (
        f"Embedding dimension changed to {len(result.embedding)}, "
        f"expected {EXPECTED_DIMENSION}. Vector DB needs reindexing."
    )
```

### Model Output Format Contract

When switching models or updating model versions, output format may change.

```python
def test_structured_output_contract():
    """Model must return valid JSON matching the expected schema."""
    response = model_service.generate(
        prompt="Classify this text: 'Great product!'",
        response_format={"type": "json_object"}
    )
    parsed = json.loads(response.content)

    # Contract: response must contain these fields with these types
    assert "label" in parsed, "Missing 'label' field in structured output"
    assert isinstance(parsed["label"], str), f"'label' must be string, got {type(parsed['label'])}"
    assert parsed["label"] in ["positive", "negative", "neutral"], (
        f"Invalid label: {parsed['label']}"
    )
    if "confidence" in parsed:
        assert 0 <= parsed["confidence"] <= 1

### Latency SLA Contract

```python
import time

def test_retrieval_latency_sla():
    """Retrieval must complete within 500ms for standard queries."""
    start = time.monotonic()
    result = retrieval_service.retrieve(
        query_embedding=[0.1] * 1536,
        top_k=10
    )
    elapsed_ms = (time.monotonic() - start) * 1000
    assert elapsed_ms < 500, f"Retrieval took {elapsed_ms:.0f}ms, SLA is 500ms"
```

## Backward Compatibility Testing

When updating a model version, verify that existing consumers still work.

```python
def test_model_v2_backward_compatible_with_v1_consumers():
    """New model version must satisfy all existing consumer contracts."""
    v1_test_cases = load_json_fixture("contracts/model_v1_expectations.json")
    for case in v1_test_cases:
        response = model_v2.generate(case["input"])
        parsed = json.loads(response.content)
        for field in case["required_fields"]:
            assert field in parsed, f"V2 model missing field '{field}' required by V1 consumers"
        for field, expected_type in case["field_types"].items():
            assert isinstance(parsed[field], eval(expected_type)), (
                f"V2 model field '{field}' type changed"
            )
```

## CI Integration

Run contract tests as part of both the provider's and consumer's CI pipelines. When a provider merges a change, verify it still satisfies all consumer contracts. When a consumer adds a new expectation, verify the provider currently satisfies it. Store contracts in a shared location (Pact Broker, shared Git repository, or artifact storage) so both sides can access them independently.

A contract test failure should block deployment of the offending service. This is a hard gate, not a warning, because a contract break means a production outage is imminent.
