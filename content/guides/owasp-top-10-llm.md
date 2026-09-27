---
title: "OWASP Top 10 for LLM Applications (2026)"
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
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

The OWASP Top 10 for LLM Applications identifies the most critical security risks in applications built on large language models. This guide follows the **2026 edition**, published by the OWASP GenAI Security Project on 3 August 2026 and announced on 2 September 2026, which reorders the 2025 list based on thousands of real-world incidents and renames System Prompt Leakage to Hidden Context Exposure. It summarizes each vulnerability and provides practical mitigation strategies. When the model acts as an agent with tools and memory rather than as a component, pair this list with the OWASP Top 10 for Agentic Applications.

## LLM01: Prompt Injection

Attackers manipulate model behavior through crafted inputs, either directly (user input) or indirectly (malicious content in retrieved documents). This is the most fundamental LLM vulnerability because models cannot architecturally distinguish trusted instructions from untrusted input.

The 2026 edition extends this entry to cross-modal attacks, where instructions are hidden inside an image or an audio track.

**Mitigations:** Input sanitization and validation, output filtering, privilege separation (limit what actions the model can trigger), separate models for different trust levels, human approval for high-impact actions, monitoring for anomalous outputs.

## LLM02: Sensitive Information Disclosure

Models may reveal sensitive data from training data (memorization), system prompts, or connected data sources. Users can craft queries to extract confidential business logic, personal data, or API keys embedded in prompts.

**Mitigations:** Scrub sensitive data from training sets, avoid putting secrets in system prompts, implement output filtering for PII and credentials, use data loss prevention controls, apply principle of least privilege to data access.

## LLM03: Excessive Agency

Models are granted access to tools, APIs, or systems with more permissions than necessary. When combined with prompt injection or hallucinated tool calls, excessive agency allows unintended actions with real-world consequences.

This entry climbed from sixth (2025) to third (2026), which OWASP calls the most consequential move on the list, because agentic deployments are where OWASP's incident evidence shows the damage landing.

**Mitigations:** Apply least-privilege to all tool access, require human approval for destructive actions, limit the rate and scope of automated actions, implement undo mechanisms, audit all tool invocations.

## LLM04: Supply Chain

Risks from compromised pre-trained models, poisoned training data, vulnerable ML libraries, and malicious plugins or tools. Models downloaded from public repositories may contain backdoors or be trained on manipulated data.

The 2026 edition also covers the case where a promoted model artifact is not what it claims to be.

**Mitigations:** Verify model provenance and integrity, scan dependencies for vulnerabilities, use private model registries, audit third-party plugins, maintain a software bill of materials.

## LLM05: Data and Model Poisoning

Attackers corrupt training data or fine-tuning datasets to manipulate model behavior. This can introduce biases, create backdoors triggered by specific inputs, or degrade model performance on targeted tasks.

The 2026 edition folds fine-tuning subversion into this entry.

**Mitigations:** Validate and audit training data sources, implement data quality checks, use anomaly detection on training data, monitor model behavior for unexpected changes after fine-tuning.

## LLM06: Unbounded Consumption

Attackers cause excessive resource consumption through crafted inputs that trigger expensive operations: long outputs, recursive agent loops, or computationally intensive retrieval queries. This can lead to denial of service or extreme costs.

This entry rose four places, from tenth (2025) to sixth (2026).

**Mitigations:** Token budgets per request and per user, rate limiting, timeout enforcement, monitoring for anomalous consumption patterns, circuit breakers for runaway processes.

## LLM07: Misinformation

Models generate plausible but incorrect information (hallucinations) that users or downstream systems act upon. This is particularly dangerous in domains like healthcare, legal, and financial advice.

**Mitigations:** RAG with verified sources, output verification against ground truth, confidence indicators, clear disclaimers about AI limitations, human review for high-stakes outputs.

## LLM08: Hidden Context Exposure

Attackers extract system prompts and other hidden context through conversational techniques, revealing business logic, safety rules, and behavioral instructions. Leaked system prompts enable more effective prompt injection attacks.

Called System Prompt Leakage in 2025, the 2026 edition renames and broadens it to Hidden Context Exposure: any hidden, non-user-facing context placed in the model's window (system prompts, developer instructions, retrieved policy text, tool and function schemas) can be extracted, inferred, or reconstructed.

**Mitigations:** Do not rely on system prompt or hidden-context secrecy for security, assume prompts and tool schemas will be extracted, keep credentials and tokens out of the context entirely, implement defense in depth beyond the system prompt, monitor for prompt extraction attempts.

## LLM09: Vector and Embedding Weaknesses

Vulnerabilities in RAG pipelines including poisoned embeddings, unauthorized access to vector stores, and manipulation of retrieval results to influence model outputs.

**Mitigations:** Apply access controls to vector databases, validate and sanitize documents before embedding, monitor retrieval patterns for anomalies, implement document-level access filtering.

## LLM10: Improper Output Handling

Application code trusts LLM output without validation, leading to injection attacks (XSS, SQL injection, command injection) when model output is passed to downstream systems, rendered in browsers, or used to construct queries.

This entry fell furthest in 2026, from fifth to tenth, but now also covers the insecure code that AI coding assistants generate at scale.

**Mitigations:** Treat all LLM output as untrusted, apply context-appropriate output encoding, validate outputs against expected schemas, use parameterized queries for database interactions.

## Sources

- OWASP GenAI Security Project. "OWASP GenAI LLM Top 10 2026." (3 August 2026). https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/, The current edition of the list; source for the 2026 ranking, the rename of System Prompt Leakage to Hidden Context Exposure, and the scope changes noted above.
- OWASP GenAI Security Project. "OWASP GenAI Security Project Unveils 2026 Top 10 for LLM Applications, New Agent Control Standard and Sponsors as Community Tops 30,000 Members." (2 September 2026). https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/, Announcement of the 2026 edition and the Agent Control Standard.
- OWASP. "OWASP Top 10 for Large Language Model Applications, Version 2.0." (2025). https://owasp.org/www-project-top-10-for-large-language-model-applications/, The previous (2025) edition. Version 2.0 restructured from the 2023 v1.1 list; the 2025 edition reflects production deployment experience with agentic and multi-modal systems.
- OWASP GenAI Working Group. https://genai.owasp.org, The project page with supplementary guidance, extended mappings to MITRE ATLAS, and tooling references.
- Greshake, K. et al. "Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection." (2023). https://arxiv.org/abs/2302.12173, Formal analysis of indirect prompt injection (LLM01), demonstrating attacks on LLM-integrated applications through document and web content.
- Perez, E. and Ribeiro, I. "Ignore Previous Prompt: Attack Techniques For Language Models." (2022). https://arxiv.org/abs/2211.09527, Systematic study of prompt injection techniques referenced in the LLM01 section.
