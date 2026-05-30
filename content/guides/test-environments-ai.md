---
title: "Managing Test Environments for AI Systems"
description: "Test environment strategies for AI: local dev with mocked models, staging with real models, Docker Compose for local AI stacks, cost management, and production parity."
date: 2026-03-28
categories: [Guides]
tags: [test-environments, testing, docker, infrastructure, ai-engineering, cost-management]
related:
  - guides/testing-ai-systems
  - guides/integration-testing-ai-pipelines
  - guides/mocking-ai-services
  - guides/ci-cd-testing-ai
last_updated: 2026-05-30
---

AI systems require multiple test environments, each balancing cost, speed, and realism. A developer running tests locally cannot wait for real model API calls or pay for them on every save. A staging environment needs real model behavior to validate quality. Production must be monitored but never used for testing. Getting this layering right is critical for both developer velocity and test confidence.

## Environment Tiers

### Local Development

Local development uses mocked models and in-memory services for maximum speed and zero cost.

**What runs locally:**
- Unit tests with no external dependencies
- Integration tests with mocked LLM APIs and in-memory vector stores
- E2E tests with Playwright and mocked AI API responses

**What does not run locally:**
- Tests against real LLM APIs (too slow, too expensive)
- Tests against production databases or vector stores
- Load tests or performance benchmarks

```python
# conftest.py - local environment configuration
import os

@pytest.fixture(autouse=True)
def local_env_setup(monkeypatch):
    monkeypatch.setenv("MODEL_PROVIDER", "mock")
    monkeypatch.setenv("VECTOR_DB_URL", "memory://")
    monkeypatch.setenv("EMBEDDING_PROVIDER", "mock")
```

### CI Environment

CI runs the same local tests plus integration tests with containerized services (vector databases, caches). Model API calls are mocked except in scheduled evaluation suites.

### Staging

Staging uses real model APIs with test data. It validates that the application works with actual model responses, real network latency, and production-like infrastructure. Staging catches issues that mocks hide: API format changes, rate limiting behavior, model quality regressions.

### Production

Production is not a test environment. Monitor it (sample and evaluate live traffic) but never run test workloads against production infrastructure. The exception is canary deployments where a small percentage of real traffic is routed to a new version for comparison.

## Docker Compose for Local AI Stacks

Run the full application stack locally without cloud dependencies.

```yaml
# docker-compose.dev.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MODEL_PROVIDER=mock
      - VECTOR_DB_URL=http://qdrant:6333
      - REDIS_URL=redis://redis:6379
    depends_on:
      - qdrant
      - redis

  qdrant:
    image: qdrant/qdrant:v1.12.0
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # Optional: local model for testing
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_models:/root/.ollama

volumes:
  qdrant_data:
  ollama_models:
```

Start the stack with `docker compose -f docker-compose.dev.yml up -d`. Seed the vector database with test data using a setup script that runs after the containers are healthy.

```bash
#!/bin/bash
# scripts/seed_test_data.sh
echo "Waiting for Qdrant..."
until curl -s http://localhost:6333/healthz > /dev/null; do sleep 1; done
echo "Seeding test data..."
python scripts/seed_vector_db.py --env=dev
```

## Cost Management for Test Environments

Real LLM API calls are expensive. Manage costs deliberately.

**Budget per environment:**
- Local development: $0 (all mocked)
- CI per PR: $0 (all mocked)
- CI merge to main: $1-5 per run (small eval suite with real models)
- Nightly full eval: $20-50 per run
- Staging: $100-500/month (depends on testing frequency)

**Cost control strategies:**

Use the cheapest model that validates your pipeline. If your production model is GPT-4o, use GPT-4o-mini for staging tests that validate pipeline behavior rather than output quality. Reserve the production model for the final eval suite.

```python
# Environment-specific model configuration
MODEL_CONFIG = {
    "local": {"provider": "mock", "model": None},
    "ci": {"provider": "mock", "model": None},
    "ci_eval": {"provider": "openai", "model": "gpt-4o-mini"},
    "staging": {"provider": "openai", "model": "gpt-4o-mini"},
    "staging_eval": {"provider": "openai", "model": "gpt-4o"},
    "production": {"provider": "openai", "model": "gpt-4o"},
}
```

Cache model responses in CI. If the same prompt is sent twice (across runs for unchanged prompts), return the cached response instead of making a new API call. Invalidate the cache when prompts change.

Set hard spending limits on API keys used in test environments. A runaway test loop should not drain your budget.

## Production Parity Challenges

Test environments never perfectly match production. Acknowledge the gaps and mitigate them.

**Model version drift.** Production may run a different model version than staging if the provider updates silently. Pin model versions where possible and monitor for version changes.

**Traffic patterns.** Test traffic is artificial. Production traffic includes query patterns, volumes, and edge cases that no test suite covers completely. This is why production monitoring is essential even with thorough testing.

**Infrastructure differences.** Local Docker containers do not have the same performance characteristics as managed cloud services. A vector search that takes 5ms locally may take 50ms in production due to network latency, index size, or instance specifications.

**Data scale.** Test vector databases contain hundreds of documents. Production may contain millions. Retrieval quality and latency change with scale. Run scale tests periodically against a staging environment populated with production-scale data.

## Environment Switching

Make environment switching a single configuration change, not a code change.

```python
# config.py
import os

ENV = os.getenv("APP_ENV", "local")

def get_model_client():
    config = MODEL_CONFIG[ENV]
    if config["provider"] == "mock":
        return MockModelClient()
    elif config["provider"] == "openai":
        return OpenAIClient(model=config["model"])

def get_vector_store():
    url = os.getenv("VECTOR_DB_URL", "memory://")
    if url.startswith("memory://"):
        return InMemoryVectorStore()
    return QdrantVectorStore(url=url)
```

Environment configuration should live in environment variables or configuration files, never in code branches like `if os.getenv("ENV") == "test"` scattered throughout the application.
