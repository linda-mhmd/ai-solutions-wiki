---
title: "Instructor - Structured Output from LLMs"
description: "A comprehensive reference for Instructor: extracting structured, validated data from LLM responses using Pydantic models, retry logic, and streaming."
date: 2026-03-28
categories: [Tools]
tags: [instructor, structured-output, pydantic, extraction, validation, python]
related:
  - tools/pydantic-ai
  - tools/langchain
  - tools/openai-api
last_updated: 2026-05-30
---

Instructor is a Python library that patches LLM client libraries (OpenAI, Anthropic, Google, Mistral, and others) to return structured, validated Pydantic models instead of raw text. You define a Pydantic model describing the output structure, and Instructor handles the function calling, response parsing, validation, and retry logic. For AI projects, Instructor solves the reliability problem of extracting structured data from LLMs: it guarantees that model output conforms to a defined schema or raises an explicit error.

Official documentation: https://python.useinstructor.com/

## Core Concepts

**Response model** - A Pydantic model that defines the expected output structure. The model's fields, types, validators, and docstrings are used to construct the function calling schema sent to the LLM.

```python
from pydantic import BaseModel, Field

class ExtractedEntity(BaseModel):
    name: str = Field(description="The entity name")
    entity_type: str = Field(description="Person, Organization, or Location")
    confidence: float = Field(ge=0, le=1, description="Confidence score")
```

**Patching** - Instructor patches the LLM client to accept a `response_model` parameter. The patched client transparently handles schema conversion, function calling, response parsing, and validation:

```python
import instructor
from openai import OpenAI

client = instructor.from_openai(OpenAI())
entity = client.chat.completions.create(
    model="gpt-4o",
    response_model=ExtractedEntity,
    messages=[{"role": "user", "content": "Extract: Apple Inc. is based in Cupertino"}]
)
```

The returned `entity` is a validated Pydantic object, not a dictionary or raw string.

**Retry logic** - When the LLM returns output that fails Pydantic validation (wrong type, missing field, failed validator), Instructor automatically retries with the validation error message appended to the conversation. The model sees what went wrong and corrects its output. Configurable via `max_retries`.

## Why Instructor Over Raw Function Calling

LLM function calling returns JSON, but that JSON is not validated against business rules. A confidence score might be 1.5 (out of bounds), a required field might be null, or an enum field might contain a value not in the allowed set. Instructor adds Pydantic validation on top of function calling, catching these errors and auto-retrying.

Additionally, Instructor handles the boilerplate: converting Pydantic models to JSON schemas, extracting the function call response, parsing it back into a Pydantic object, and managing the retry conversation. This reduces per-extraction code from 20+ lines to 5.

## Advanced Patterns

**Partial streaming** - Stream structured output as it is generated. The LLM produces JSON incrementally, and Instructor yields partial Pydantic objects as fields are completed. This enables real-time UI updates during extraction.

**Iterable extraction** - Extract a list of structured objects from a single LLM call. Define `response_model=Iterable[ExtractedEntity]` to extract multiple entities from a text passage.

**Nested models** - Pydantic models can contain other models, enabling complex hierarchical extraction. Extract a document with sections, each section with paragraphs, each paragraph with entities.

**Validators** - Pydantic validators add business logic to extraction. A validator can check that dates are in the future, that referenced entities exist in a database, or that extracted values fall within expected ranges. Failed validators trigger automatic retry with the validation error message.

## Multi-Provider Support

Instructor supports patching multiple LLM clients: OpenAI, Anthropic, Google Generative AI, Mistral, Cohere, and any provider that supports function calling. The same Pydantic models work across all providers. This enables model comparison: test the same extraction task across providers and select the one with the highest accuracy and lowest cost.

## When to Use Instructor

Instructor is the right tool when you need structured output from LLM calls with validation guarantees. Common use cases include: entity extraction, document classification, form parsing, data normalization, and any task where the output must conform to a defined schema.

For simple cases where the LLM's built-in JSON mode or structured output is sufficient, Instructor adds unnecessary complexity. Use it when you need validation, retry logic, or complex nested extraction.

## Pricing

Instructor is open-source (MIT license) and free. Retry logic consumes additional LLM API calls (typically 1-2 retries for 5-10% of requests), so factor this into cost estimates. The overall cost impact is minimal compared to the reliability improvement.
