---
title: "PII Redaction Pipeline"
description: "Automated detection and removal of personally identifiable information from LLM inputs and outputs: detection strategies, redaction methods, and compliance integration."
date: 2026-03-28
categories: [Patterns]
tags: [pii, redaction, privacy, compliance, data-protection, llm, pipeline]
related:
  - glossary/guardrails
  - patterns/prompt-injection-defense
  - patterns/ai-audit-trail
  - patterns/ai-governance
last_updated: 2026-05-30
---

LLMs process free-text input that frequently contains personally identifiable information. Users paste emails, support tickets, medical notes, and financial documents into prompts without considering what sensitive data they include. A PII redaction pipeline intercepts this data before it reaches the model and scrubs sensitive information from responses before they reach the user.

## Why Redaction Matters

Sending PII to a third-party model API creates compliance risk under GDPR, HIPAA, CCPA, and similar regulations. Even with self-hosted models, logging PII in prompt traces and evaluation datasets creates data retention liabilities. Redaction at the pipeline level protects against both intentional and accidental PII exposure.

## Detection Strategies

**Pattern-based detection** - Regular expressions and deterministic rules catch structured PII with high precision. Social Security numbers, credit card numbers, phone numbers, email addresses, and IP addresses all follow predictable formats. This layer is fast and has near-zero false negatives for well-formed data.

**Named entity recognition (NER)** - ML-based NER models identify names, addresses, dates of birth, and other unstructured PII that pattern matching cannot catch. Run a lightweight NER model as a preprocessing step. Models like spaCy's NER pipeline or AWS Comprehend's PII detection handle common entity types.

**Context-aware detection** - Some data is PII only in context. The number "42" is not sensitive, but "age: 42" paired with a name constitutes PII. Context-aware detection examines surrounding text to determine whether borderline data points are identifying.

## Redaction Methods

**Token replacement** - Replace detected PII with typed placeholders: `[NAME_1]`, `[SSN_1]`, `[EMAIL_1]`. Maintain a mapping table so placeholders can be reversed in the response if needed. This preserves the semantic structure of the text while removing identifying data.

**Generalization** - Replace specific values with generalized versions. An exact address becomes a city name. An age becomes an age range. This preserves analytical utility while reducing identifiability.

**Suppression** - Remove the PII entirely. Use this for data that has no relevance to the model's task, such as credit card numbers in a document summarization request.

## Pipeline Architecture

Deploy the redaction pipeline as a synchronous middleware layer in the LLM request path. On the inbound path, detect and redact PII from user input before it reaches the model. Store the redaction mapping in a short-lived, encrypted cache keyed to the request ID. On the outbound path, optionally re-hydrate placeholders with original values if the downstream consumer is authorized to see them.

Run detection asynchronously on model responses as well. The model may hallucinate PII that was not in the input, or it may reconstruct redacted information from context clues. Output-side redaction catches these cases.

## Monitoring

Track redaction rates by PII type, source, and application. A spike in SSN detections from a particular application may indicate a data handling problem upstream. Log redaction events (without the redacted values) for compliance auditing.
