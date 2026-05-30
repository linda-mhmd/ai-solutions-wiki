---
title: "API Versioning Strategies for AI Services"
description: "How to version AI APIs as models evolve: URL path versioning, header versioning, model version pinning, backward compatibility, and deprecation policies."
date: 2026-03-28
categories: [Guides]
tags: [api-versioning, api-design, backward-compatibility, deprecation, ai-engineering]
related:
  - glossary/openapi
  - guides/grpc-ai-services
  - guides/ci-cd-for-ai
last_updated: 2026-05-30
---

AI APIs change more frequently than traditional APIs. Model updates alter output quality, new features add response fields, prompt templates evolve, and response formats are refined. Without a versioning strategy, these changes break consumers. With a poor versioning strategy, you accumulate maintenance debt supporting too many versions. This guide covers practical versioning approaches for AI services.

## Why AI APIs Need Explicit Versioning

Traditional API versioning handles structural changes: new fields, removed endpoints, changed data types. AI APIs add a second dimension: behavioural changes. The same API contract with a new model version may return different predictions, different confidence scores, or different text. Consumers depend on specific behaviours, not just schemas.

Examples of AI API changes that require versioning:

- **Model update** - A new model version produces better outputs overall but changes behaviour for specific input categories
- **Response format change** - Adding a `confidence` field or restructuring the `metadata` object
- **New capability** - Adding streaming support or new model parameters
- **Prompt template change** - Modifying the system prompt changes output style and content
- **Embedding model change** - Switching embedding models makes old vectors incompatible

## Versioning Approaches

### URL Path Versioning

The most common and explicit approach. The version is part of the URL:

```
POST /v1/predict
POST /v2/predict
```

Advantages:
- Unambiguous - version is visible in every request
- Easy to route different versions to different backends
- Simple to monitor and rate-limit per version
- Cache-friendly (different URLs are different cache keys)

Disadvantages:
- URL changes require client updates
- Can lead to code duplication between versions

This is the recommended approach for most AI APIs.

### Header Versioning

The version is specified in a request header:

```
POST /predict
X-API-Version: 2
```

Advantages:
- URL stays stable
- Cleaner URL structure

Disadvantages:
- Version is invisible in logs, bookmarks, and curl examples unless you inspect headers
- Harder to route at the load balancer level

### Model Version Pinning

For AI APIs specifically, allow consumers to pin to a model version independently of the API version:

```
POST /v1/predict
X-Model-Version: gpt-4-2025-12-01
```

This separates two concerns:
- **API version** - Controls the request/response schema
- **Model version** - Controls inference behaviour

Consumers that need deterministic output pin to a specific model version. Consumers that want the latest quality improvements use the default (latest) model version.

## Managing Breaking vs Non-Breaking Changes

### Non-Breaking Changes (No Version Bump)

- Adding an optional request field with a default value
- Adding a new field to the response
- Improving model quality without changing the response schema
- Adding a new endpoint

### Breaking Changes (Require Version Bump)

- Removing or renaming a response field
- Changing a field's data type
- Changing default model behaviour in ways consumers depend on
- Removing an endpoint
- Changing authentication mechanism

### Gray Area: Model Behaviour Changes

Model updates are the hardest to classify. A model that produces "better" outputs overall may produce worse outputs for a specific consumer's use case. Strategies:

- **Default to latest** - New model versions are the default. Consumers who need stability pin to a specific version.
- **Notify and migrate** - Announce model version changes in advance. Provide a migration period where both versions are available.
- **Shadow testing** - Run new model versions in shadow mode, comparing outputs against the current version before switching.

## Deprecation Policy

Define a clear deprecation lifecycle:

1. **Active** - Fully supported, receiving updates
2. **Deprecated** - Still functional but no new features. Deprecation header included in responses: `Sunset: Sat, 01 Nov 2026 00:00:00 GMT`
3. **Retired** - Returns 410 Gone with a message pointing to the replacement version

Timelines:
- Announce deprecation at least 90 days before retirement
- Monitor usage of deprecated versions and proactively reach out to remaining consumers
- Provide migration guides with specific changes needed

## Implementation Pattern

```python
from fastapi import FastAPI, Header, HTTPException

app = FastAPI()

# Version router
v1_app = FastAPI()
v2_app = FastAPI()

app.mount("/v1", v1_app)
app.mount("/v2", v2_app)

@v1_app.post("/predict")
async def predict_v1(request: PredictRequestV1):
    # V1 behaviour: returns flat prediction
    return {"prediction": model.predict(request)}

@v2_app.post("/predict")
async def predict_v2(
    request: PredictRequestV2,
    x_model_version: str = Header(default="latest"),
):
    # V2 behaviour: returns prediction with metadata
    model = get_model(x_model_version)
    result = model.predict(request)
    return {
        "prediction": result.value,
        "confidence": result.confidence,
        "model_version": model.version,
        "metadata": result.metadata,
    }
```

Keep version-specific code isolated. Shared logic lives in a common layer. Version-specific serialisation and behaviour live in version-specific modules. This prevents changes to one version from accidentally affecting another.
