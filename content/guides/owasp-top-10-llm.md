---
title: "OWASP Top 10 for LLM Applications (2025)"
description: "Practical guide to the OWASP Top 10 vulnerabilities for LLM applications, covering prompt injection, data leakage, supply chain risks, and mitigation strategies."
date: 2026-03-28
categories: [Guides]
tags: [owasp, llm, security, vulnerabilities, prompt-injection, ai-security]
related:
  - glossary/prompt-injection
  - glossary/ai-red-team
  - guides/ai-security-best-practices
  - patterns/prompt-injection-defense
  - patterns/guardrails-pattern
---

The OWASP Top 10 for LLM Applications identifies the most critical security risks in applications built on large language models. This guide summarizes each vulnerability and provides practical mitigation strategies.

## LLM01: Prompt Injection

Attackers manipulate model behavior through crafted inputs, either directly (user input) or indirectly (malicious content in retrieved documents). This is the most fundamental LLM vulnerability because models cannot architecturally distinguish trusted instructions from untrusted input.

**Mitigations:** Input sanitization and validation, output filtering, privilege separation (limit what actions the model can trigger), separate models for different trust levels, human approval for high-impact actions, monitoring for anomalous outputs.

## LLM02: Sensitive Information Disclosure

Models may reveal sensitive data from training data (memorization), system prompts, or connected data sources. Users can craft queries to extract confidential business logic, personal data, or API keys embedded in prompts.

**Mitigations:** Scrub sensitive data from training sets, avoid putting secrets in system prompts, implement output filtering for PII and credentials, use data loss prevention controls, apply principle of least privilege to data access.

## LLM03: Supply Chain Vulnerabilities

Risks from compromised pre-trained models, poisoned training data, vulnerable ML libraries, and malicious plugins or tools. Models downloaded from public repositories may contain backdoors or be trained on manipulated data.

**Mitigations:** Verify model provenance and integrity, scan dependencies for vulnerabilities, use private model registries, audit third-party plugins, maintain a software bill of materials.

## LLM04: Data and Model Poisoning

Attackers corrupt training data or fine-tuning datasets to manipulate model behavior. This can introduce biases, create backdoors triggered by specific inputs, or degrade model performance on targeted tasks.

**Mitigations:** Validate and audit training data sources, implement data quality checks, use anomaly detection on training data, monitor model behavior for unexpected changes after fine-tuning.

## LLM05: Improper Output Handling

Application code trusts LLM output without validation, leading to injection attacks (XSS, SQL injection, command injection) when model output is passed to downstream systems, rendered in browsers, or used to construct queries.

**Mitigations:** Treat all LLM output as untrusted, apply context-appropriate output encoding, validate outputs against expected schemas, use parameterized queries for database interactions.

## LLM06: Excessive Agency

Models are granted access to tools, APIs, or systems with more permissions than necessary. When combined with prompt injection or hallucinated tool calls, excessive agency allows unintended actions with real-world consequences.

**Mitigations:** Apply least-privilege to all tool access, require human approval for destructive actions, limit the rate and scope of automated actions, implement undo mechanisms, audit all tool invocations.

## LLM07: System Prompt Leakage

Attackers extract system prompts through conversational techniques, revealing business logic, safety rules, and behavioral instructions. Leaked system prompts enable more effective prompt injection attacks.

**Mitigations:** Do not rely on system prompt secrecy for security, assume prompts will be extracted, implement defense in depth beyond the system prompt, monitor for prompt extraction attempts.

## LLM08: Vector and Embedding Weaknesses

Vulnerabilities in RAG pipelines including poisoned embeddings, unauthorized access to vector stores, and manipulation of retrieval results to influence model outputs.

**Mitigations:** Apply access controls to vector databases, validate and sanitize documents before embedding, monitor retrieval patterns for anomalies, implement document-level access filtering.

## LLM09: Misinformation

Models generate plausible but incorrect information (hallucinations) that users or downstream systems act upon. This is particularly dangerous in domains like healthcare, legal, and financial advice.

**Mitigations:** RAG with verified sources, output verification against ground truth, confidence indicators, clear disclaimers about AI limitations, human review for high-stakes outputs.

## LLM10: Unbounded Consumption

Attackers cause excessive resource consumption through crafted inputs that trigger expensive operations: long outputs, recursive agent loops, or computationally intensive retrieval queries. This can lead to denial of service or extreme costs.

**Mitigations:** Token budgets per request and per user, rate limiting, timeout enforcement, monitoring for anomalous consumption patterns, circuit breakers for runaway processes.

## Sources

- OWASP. "OWASP Top 10 for Large Language Model Applications, Version 2.0." (2025). https://owasp.org/www-project-top-10-for-large-language-model-applications/, The canonical source for this list. Version 2.0 restructured from the 2023 v1.1 list; the 2025 edition reflects production deployment experience with agentic and multi-modal systems.
- OWASP GenAI Working Group. https://genai.owasp.org, The project page with supplementary guidance, extended mappings to MITRE ATLAS, and tooling references.
- Greshake, K. et al. "Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection." (2023). https://arxiv.org/abs/2302.12173, Formal analysis of indirect prompt injection (LLM01), demonstrating attacks on LLM-integrated applications through document and web content.
- Perez, E. and Ribeiro, I. "Ignore Previous Prompt: Attack Techniques For Language Models." (2022). https://arxiv.org/abs/2211.09527, Systematic study of prompt injection techniques referenced in the LLM01 section.
