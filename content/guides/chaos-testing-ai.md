---
title: "Chaos Testing for AI Systems"
description: "Chaos engineering for AI: injecting model API latency, simulating provider outages, degraded embeddings, corrupted indexes, and verifying graceful degradation with LitmusChaos and Gremlin."
date: 2026-03-28
categories: [Guides]
tags: [chaos-engineering, testing, resilience, infrastructure, ai-engineering]
related:
  - guides/testing-ai-systems
  - guides/contract-testing-ai-services
  - guides/test-environments-ai
  - patterns/circuit-breaker-ai
last_updated: 2026-05-30
---

Chaos testing deliberately injects failures into a system to verify it degrades gracefully rather than catastrophically. AI systems have unique failure modes: model APIs go down, embedding services return garbage, vector databases lose indexes, and model responses take 30 seconds instead of 3. Testing these scenarios before they happen in production is the difference between a degraded experience and a complete outage.

## Why AI Systems Need Chaos Testing

Traditional applications fail in predictable ways: databases go down, services return errors, networks partition. AI systems have all of these failure modes plus model-specific ones:

- The model provider silently updates the model and output quality drops
- Embedding API returns vectors with wrong dimensions after a version change
- Vector database index corruption produces irrelevant retrieval results
- Token limits are hit due to unexpectedly long context, causing truncated responses
- Model API latency spikes from 2 seconds to 45 seconds under load
- Rate limiting kicks in during traffic spikes, causing cascading failures

## Injecting Model API Latency

Test how your system behaves when the model API slows down.

```python
import time
from unittest.mock import patch

class LatencyInjector:
    """Wraps a model client to inject configurable latency."""
    def __init__(self, real_client, latency_seconds: float):
        self.real_client = real_client
        self.latency_seconds = latency_seconds

    def generate(self, *args, **kwargs):
        time.sleep(self.latency_seconds)
        return self.real_client.generate(*args, **kwargs)

def test_system_handles_slow_model():
    slow_client = LatencyInjector(mock_model, latency_seconds=15)
    pipeline = Pipeline(model=slow_client, timeout=10)

    result = pipeline.run("test query")

    # System should timeout and return a graceful error, not hang
    assert result.error == "timeout"
    assert result.fallback_used is True

def test_system_handles_intermittent_slowness():
    """Model is fast 80% of the time, slow 20% of the time."""
    call_count = {"n": 0}
    original_generate = mock_model.generate

    def flaky_generate(*args, **kwargs):
        call_count["n"] += 1
        if call_count["n"] % 5 == 0:
            time.sleep(20)  # Every 5th call is slow
        return original_generate(*args, **kwargs)

    mock_model.generate = flaky_generate
    pipeline = Pipeline(model=mock_model, timeout=10, retries=2)

    # Run multiple requests and verify overall success rate
    results = [pipeline.run(f"query {i}") for i in range(20)]
    success_rate = sum(1 for r in results if r.error is None) / len(results)
    assert success_rate >= 0.80, f"Success rate {success_rate:.2%} too low under intermittent slowness"
```

## Simulating Model Provider Outages

Test complete provider unavailability.

```python
class OutageSimulator:
    """Simulates a model provider outage."""
    def generate(self, *args, **kwargs):
        raise ConnectionError("Model provider is unavailable")

def test_full_provider_outage():
    pipeline = Pipeline(
        primary_model=OutageSimulator(),
        fallback_model=mock_model,
        cache=response_cache
    )

    # System should fall back to secondary model or cache
    result = pipeline.run("What is Python?")
    assert result.error is None
    assert result.model_used in ["fallback", "cache"]

def test_outage_with_no_fallback():
    pipeline = Pipeline(primary_model=OutageSimulator(), fallback_model=None, cache=None)
    result = pipeline.run("What is Python?")
    assert result.error is not None
    assert "unavailable" in result.user_message.lower()
    # User-facing message should be helpful, not a stack trace
    assert "try again" in result.user_message.lower()
```

## Testing with Degraded Embedding Quality

What happens when the embedding service returns low-quality vectors?

```python
import numpy as np

class DegradedEmbeddingService:
    """Returns embeddings with injected noise, simulating quality degradation."""
    def __init__(self, real_service, noise_level: float = 0.5):
        self.real_service = real_service
        self.noise_level = noise_level

    def embed(self, text: str) -> list[float]:
        real_embedding = np.array(self.real_service.embed(text))
        noise = np.random.normal(0, self.noise_level, size=real_embedding.shape)
        noisy_embedding = real_embedding + noise
        # Normalize to unit length
        noisy_embedding = noisy_embedding / np.linalg.norm(noisy_embedding)
        return noisy_embedding.tolist()

def test_retrieval_with_degraded_embeddings():
    degraded = DegradedEmbeddingService(embedding_service, noise_level=0.3)
    pipeline = RetrievalPipeline(embedding_service=degraded, vector_store=store)

    # Retrieval quality should degrade but not catastrophically
    results = pipeline.query("What is Python?")
    assert len(results) > 0  # Should still return something
    # Log quality for monitoring, even if we do not fail the test
    print(f"Top result score with degraded embeddings: {results[0].score:.3f}")
```

## Testing with Corrupted Vector DB Indexes

Simulate index corruption that causes retrieval to return irrelevant results.

```python
class CorruptedVectorStore:
    """Returns random documents regardless of query."""
    def __init__(self, real_store):
        self.real_store = real_store

    def search(self, query_embedding, top_k=5):
        # Return random documents with fake high scores
        all_docs = self.real_store.get_all_documents()
        random.shuffle(all_docs)
        for doc in all_docs[:top_k]:
            doc["score"] = random.uniform(0.7, 0.99)
        return all_docs[:top_k]

def test_system_with_corrupted_index():
    corrupted_store = CorruptedVectorStore(real_store)
    pipeline = RAGPipeline(vector_store=corrupted_store, model=mock_model)

    result = pipeline.run("What is Python?")

    # The system should still produce a response (even if low quality)
    assert result.answer is not None
    # If faithfulness checking is enabled, it should flag low confidence
    if hasattr(result, "confidence"):
        # With irrelevant context, confidence should be low
        print(f"Confidence with corrupted index: {result.confidence:.3f}")
```

## Verifying Graceful Degradation

Define what graceful degradation means for your system and test for it explicitly.

```python
DEGRADATION_REQUIREMENTS = {
    "model_outage": {
        "response_time": 5,         # seconds
        "user_gets_response": True,
        "response_quality": "cached_or_fallback",
        "error_message_helpful": True,
    },
    "slow_model": {
        "timeout_enforced": True,
        "max_wait_time": 15,         # seconds
        "retry_attempted": True,
    },
    "embedding_degradation": {
        "retrieval_still_works": True,
        "quality_metric_logged": True,
    },
}

def test_graceful_degradation_model_outage():
    reqs = DEGRADATION_REQUIREMENTS["model_outage"]
    pipeline = Pipeline(primary_model=OutageSimulator(), fallback_model=mock_model)

    start = time.monotonic()
    result = pipeline.run("test query")
    elapsed = time.monotonic() - start

    assert elapsed < reqs["response_time"], f"Response took {elapsed:.1f}s"
    assert result.answer is not None, "User did not get a response"
    assert "error" not in result.answer.lower() or "try again" in result.answer.lower()
```

## Tools for AI Chaos Testing

**LitmusChaos.** Open-source chaos engineering platform for Kubernetes. Use it to inject pod failures, network partitions, and resource constraints on AI service pods. Define chaos experiments as YAML:

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: model-service-chaos
spec:
  appinfo:
    appns: ai-platform
    applabel: app=model-service
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-network-latency
      spec:
        components:
          env:
            - name: NETWORK_LATENCY
              value: "5000"  # 5 second latency
            - name: TOTAL_CHAOS_DURATION
              value: "300"   # 5 minutes
```

**Gremlin.** Commercial chaos engineering platform with a broader set of attack types: CPU stress, memory exhaustion, DNS failures, and time travel (clock skew). Useful for testing how AI systems handle infrastructure-level failures.

**Custom middleware.** For most teams, a simple middleware that randomly injects failures based on configuration is sufficient. No need for a full chaos platform when a configurable error injector covers your failure modes.

```python
class ChaosMiddleware:
    def __init__(self, failure_rate=0.1, latency_ms=0, error_type="timeout"):
        self.failure_rate = failure_rate
        self.latency_ms = latency_ms
        self.error_type = error_type

    def wrap(self, func):
        def wrapper(*args, **kwargs):
            if random.random() < self.failure_rate:
                if self.error_type == "timeout":
                    time.sleep(30)
                    raise TimeoutError("Chaos: simulated timeout")
                elif self.error_type == "error":
                    raise RuntimeError("Chaos: simulated error")
            if self.latency_ms > 0:
                time.sleep(self.latency_ms / 1000)
            return func(*args, **kwargs)
        return wrapper
```

Run chaos tests in staging, never in production. Start with low failure rates and increase gradually. Document what you learn and convert findings into specific resilience improvements: circuit breakers, fallback chains, timeout configurations, and retry policies.
