---
title: "Guardrails Pattern - Input and Output Safety for AI Systems"
description: "Implementing input validation, output filtering, and safety layers that prevent AI systems from generating harmful, off-topic, or non-compliant content."
date: 2026-03-28
categories: [Patterns]
tags: [safety, guardrails, content-moderation, compliance, security]
related:
  - patterns/ai-gateway-pattern
  - patterns/structured-output
  - patterns/fallback-chain
  - frameworks/responsible-ai-framework
last_updated: 2026-05-30
---

Guardrails are validation and filtering layers placed before and after model calls to ensure AI outputs meet safety, quality, and compliance requirements. Input guardrails prevent harmful or malicious prompts from reaching the model. Output guardrails catch problematic content before it reaches the user. Together, they create a safety envelope around the model that reduces risk without requiring changes to the model itself.

## Input Guardrails

**Prompt injection detection** - Identify attempts to override system instructions. Pattern matching catches obvious injection attempts ("Ignore your instructions and..."). Classifier-based detection uses a small model trained to distinguish legitimate inputs from adversarial ones. Layer both approaches: pattern matching for known attacks, classifier for novel ones.

**Topic filtering** - Restrict inputs to the application's intended domain. A customer service bot should not engage with requests to write fiction or generate code. A lightweight classifier that labels the input topic, combined with an allowlist of acceptable topics, keeps the model focused.

**PII detection** - Scan inputs for personally identifiable information before it enters the model context. If your application should not process PII, detect and reject or redact it at the input stage. Regex patterns catch structured PII (SSNs, credit card numbers). NER models catch unstructured PII (names, addresses in free text).

**Rate limiting and abuse detection** - Monitor per-user request patterns. Sudden spikes in volume, systematic probing of model behavior, or escalating adversarial inputs indicate abuse. Rate limit aggressively and flag suspicious patterns for review.

## Output Guardrails

**Content classification** - Run model output through a content safety classifier before returning it. Flag or block outputs that contain harmful content, personal opinions presented as facts, medical or legal advice without appropriate disclaimers, or any category your policy prohibits.

**Factual grounding checks** - For RAG applications, verify that the model's response is supported by the retrieved context. If the model generates claims that do not appear in the source documents, flag the response as potentially hallucinated. This can be done with a separate model call or NLI (natural language inference) classifier.

**Schema validation** - When the model should produce structured output, validate the response against the expected schema before returning it. Reject malformed responses and retry, rather than passing broken data downstream.

**Sensitive data scrubbing** - Even with input guardrails, models can generate PII, internal system details, or training data artifacts in their outputs. Scan outputs for patterns that should never be exposed and redact them.

## Architectural Placement

Guardrails can be implemented at multiple layers:

**Application layer** - Built into your application code. Fastest to implement, most customizable, but requires maintaining the logic in every application.

**Gateway layer** - Implemented in a centralized AI gateway that all requests pass through. Consistent enforcement across all applications. See the AI gateway pattern for details.

**Model provider layer** - Many model providers offer built-in content filtering. Use these as a baseline but do not rely on them exclusively. You cannot customize them to your specific policy requirements, and they may change without notice.

## Calibrating Strictness

Guardrails that are too strict create false positives that frustrate users. Guardrails that are too loose miss genuine problems. Calibrate by:

**Logging before blocking** - Start by logging guardrail triggers without blocking. Review the logs to understand your false positive rate. Tune thresholds before turning on enforcement.

**Tiered responses** - Instead of binary block/allow, implement tiers: allow, allow with disclaimer, flag for review, block. This gives you nuance in handling borderline cases.

**Domain-specific tuning** - Medical applications need different guardrails than creative writing tools. A guardrail that blocks discussion of medications is appropriate for a general chatbot but crippling for a healthcare assistant. Customize to the domain.

## Testing Guardrails

Build a test suite of adversarial inputs and expected outputs. Include known prompt injection techniques, edge cases for your content policy, and examples of outputs that should and should not be blocked. Run this suite on every guardrail configuration change. Guardrails that are not tested will fail when they matter most.

## Sources and Further Reading

- [Anthropic Safety Documentation](https://docs.anthropic.com/en/docs/build-with-claude/develop-tests#evaluate-your-prompts) - Official guidance on testing and evaluating AI safety
- [NVIDIA NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) - Open-source toolkit for adding programmable guardrails to LLM applications
- [Guardrails AI Documentation](https://docs.guardrailsai.com/) - Framework for adding validation and safety checks to LLM outputs
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) - Security risks and mitigations for LLM applications
