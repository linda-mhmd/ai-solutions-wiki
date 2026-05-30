---
title: "VCR Pattern for AI API Testing"
description: "Record-and-replay pattern for AI API testing: capture real model responses once, replay them in CI for deterministic, fast, and free tests."
date: 2026-03-28
categories: [Patterns]
tags: [testing, mocking, vcr, replay, ai-engineering]
related:
  - guides/mocking-ai-services
  - guides/testing-ai-systems
  - guides/integration-testing-ai-pipelines
  - glossary/mocking
last_updated: 2026-05-30
---

The VCR (Video Cassette Recorder) pattern records real HTTP interactions with external APIs and replays them in subsequent test runs. For AI API testing, this means calling the real LLM or embedding API once, saving the response to a cassette file, and replaying that exact response in every future test run. Tests become deterministic, fast, and free of API costs.

## How It Works

1. **Record mode.** The first time a test runs, HTTP requests pass through to the real API. The request and response are captured and saved to a cassette file (YAML or JSON).
2. **Replay mode.** On subsequent runs, the library intercepts HTTP requests, matches them against recorded cassettes, and returns the stored response without making a real API call.
3. **No-record mode.** In CI, set the mode to replay-only. If a request does not match any cassette, the test fails rather than making an unrecorded API call.

## Implementation with vcrpy

```python
import vcr

my_vcr = vcr.VCR(
    cassette_library_dir="tests/cassettes",
    record_mode="none",  # CI: replay only, fail on cache miss
    filter_headers=["authorization", "x-api-key"],  # Strip secrets
    filter_post_data_parameters=["api_key"],
)

@my_vcr.use_cassette("chat_completion.yaml")
def test_chat_pipeline():
    response = pipeline.run("What is the capital of France?")
    assert "Paris" in response.answer
    assert response.usage.total_tokens > 0
```

To record new cassettes:

```bash
# Record mode: makes real API calls and saves responses
VCR_RECORD_MODE=new_episodes pytest tests/integration/test_chat.py
```

## Cassette Management

**Directory structure.** Organize cassettes by test module:

```
tests/cassettes/
  test_chat/
    basic_question.yaml
    long_context.yaml
    error_response.yaml
  test_embeddings/
    single_text.yaml
    batch_embed.yaml
```

**Filtering secrets.** Always filter API keys, auth tokens, and other sensitive data before committing cassettes to version control. Configure the VCR instance to strip these headers and parameters automatically.

**Cassette freshness.** Cassettes go stale when API response formats change. Schedule monthly re-recording by setting `record_mode="all"` in a dedicated CI job. Compare the new cassettes against the old ones to detect API changes.

## Benefits for AI Testing

**Determinism.** The same recorded response is returned every time. Tests that use VCR cassettes never flake due to model non-determinism.

**Speed.** Replaying a cassette takes microseconds. A test suite that would take 10 minutes with real API calls completes in seconds.

**Cost.** After initial recording, tests consume zero API tokens. This makes it safe to run tests on every commit and in parallel.

**Realistic responses.** Unlike hand-crafted fixture responses, VCR cassettes contain real API responses with accurate headers, status codes, and body formatting. This catches integration issues that simplified mocks would miss.

## Limitations

**Request matching fragility.** VCR matches requests by URL, method, and body. If your code changes the prompt slightly (adds a space, reorders parameters), the cassette will not match and the test fails. Use flexible matching or request body filtering to reduce brittleness.

**Stale responses.** If the API provider changes their response format, cassettes still return the old format. Tests pass but production breaks. Mitigate by re-recording periodically and running a small set of live-API tests on a schedule.

**Large cassettes.** LLM responses can be large (especially with long completions or batch embedding responses). Cassette files can grow to hundreds of kilobytes. Use Git LFS for cassette directories if they exceed a few megabytes total.

## When to Use

Use the VCR pattern for integration tests that need realistic API responses but cannot afford the cost and non-determinism of live calls. It is particularly valuable during development, when tests run frequently, and in CI where determinism is essential. Pair it with a scheduled suite that uses real API calls to catch cassette staleness.
