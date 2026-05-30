---
title: "Structured Output - Enforcing JSON and Schema Compliance from LLMs"
description: "Techniques for getting reliable, machine-parseable structured output from LLMs: JSON mode, schema enforcement, constrained decoding, and validation patterns."
date: 2026-03-28
categories: [Patterns]
tags: [structured-output, JSON, schema, reliability, integration]
related:
  - patterns/guardrails-pattern
  - patterns/direct-model-interface
  - patterns/tool-use-pattern
last_updated: 2026-05-30
---

When LLMs feed downstream systems rather than human readers, the output must be structured and parseable. A pipeline that expects a JSON object with specific fields cannot handle a conversational response that wraps the data in markdown and adds explanatory text. Structured output patterns ensure the model produces exactly the format your system needs, every time.

## Approaches to Structured Output

**Prompt-based JSON** - Include explicit instructions in the prompt: "Respond with a JSON object containing the fields: category (string), confidence (float between 0 and 1), and reasoning (string). Output only the JSON, no other text." This works most of the time with capable models but is not guaranteed. The model may add markdown code fences, include explanatory text, or produce malformed JSON.

**JSON mode** - Most model providers offer a JSON mode that constrains the model's output to valid JSON. The model cannot produce non-JSON tokens. This guarantees syntactic validity but does not guarantee the JSON matches your expected schema. The model might return valid JSON with the wrong field names or structure.

**Schema-constrained generation** - Provide a JSON Schema definition and the model is constrained to produce output that conforms to that schema. This is the most reliable approach: the output is guaranteed to be valid JSON with the correct structure, field names, and types. Anthropic and OpenAI both support this through their tool use and structured output APIs.

**Constrained decoding** - Libraries like Outlines and Guidance modify the token sampling process to enforce grammar constraints at generation time. Each token is sampled only from tokens that are valid continuations of the partially generated structured output. This works with open-source models and provides absolute guarantees about output format.

## Schema Design Best Practices

**Keep schemas simple** - Deeply nested schemas with many optional fields increase the chance of quality issues in the values, even when the structure is correct. Flat or shallow schemas produce better results.

**Use enums for categorical fields** - Instead of allowing free-text strings for fields like "category" or "severity," define an enum of valid values. This eliminates inconsistency (e.g., "high," "High," "HIGH") and makes downstream processing reliable.

**Include description fields** - JSON Schema supports description annotations on each field. Use them. These descriptions act as instructions to the model about what each field should contain. A field called "summary" is ambiguous; a field called "summary" with description "A one-sentence summary of the main finding, written in past tense" is specific.

**Required versus optional** - Mark fields as required only if they are always applicable. Optional fields with null defaults handle cases where the model legitimately has nothing to provide for a field. Forcing the model to populate a field that does not apply to the input produces fabricated content.

## Validation and Error Handling

Even with schema-constrained generation, validate the output programmatically.

**Schema validation** - Validate the response against your JSON Schema using a standard validator. This catches any schema violations that slipped through.

**Semantic validation** - Check that values make sense beyond structural correctness. A confidence score of 0.0 for every response, or identical values across different inputs, indicates the model is not engaging with the content meaningfully.

**Retry with feedback** - When validation fails, retry the request with the original prompt plus the invalid output and the specific validation error. "Your previous output had an error: the 'amount' field must be a positive number, but you provided -5. Please correct." One retry resolves most validation failures.

## Integration Patterns

**Typed clients** - Generate client code from your JSON Schema so downstream consumers work with typed objects rather than raw JSON. This catches integration errors at compile time rather than runtime.

**Schema versioning** - When your output schema evolves, version it. Old prompts with old schemas should continue to work until you explicitly migrate them. Breaking schema changes without coordination will break downstream pipelines.

**Batch processing** - For high-volume structured output, batch requests and validate the entire batch before processing. This lets you catch systematic issues (model consistently producing wrong values for a field) before the bad data propagates through your system.
