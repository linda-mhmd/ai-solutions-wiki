---
title: "Prompt Injection Defense"
description: "Layered defense strategies against prompt injection attacks in production LLM applications: input validation, output filtering, privilege separation, and monitoring."
date: 2026-03-28
categories: [Patterns]
tags: [prompt-injection, security, llm, defense-in-depth, input-validation, production]
related:
  - glossary/prompt-injection
  - glossary/guardrails
  - patterns/ai-governance
  - patterns/pii-redaction-pipeline
last_updated: 2026-05-30
---

Prompt injection is the most pervasive security risk in LLM-powered applications. An attacker crafts input that overrides the system prompt, causing the model to ignore its instructions and perform unintended actions. No single technique eliminates the risk entirely. Effective defense requires multiple independent layers, each reducing the attack surface so that a bypass at one layer is caught by another.

## Why Single-Layer Defense Fails

A system that relies solely on input filtering will eventually encounter an encoding trick, unicode substitution, or multi-turn attack sequence that evades the filter. A system that trusts model output without validation will eventually execute a tool call the model was manipulated into making. Defense in depth treats each layer as fallible and stacks independent controls so the overall system remains secure even when individual layers are bypassed.

## Defense Layers

**Input sanitization** - Strip or reject known injection patterns before the input reaches the model. This includes instruction-override phrases, encoded payloads, and delimiter manipulation attempts. Use deterministic rules, not another LLM, for this layer. Regex and allowlist-based approaches are fast and predictable.

**System prompt hardening** - Write system prompts that explicitly instruct the model to ignore user attempts to override instructions. Include canary phrases and delimiters that separate trusted instructions from untrusted user input. Mark sections clearly with tags like `[SYSTEM]` and `[USER_INPUT]`.

**Privilege separation** - The model should never have direct access to sensitive operations. Place a deterministic validation layer between the model and any tool calls, database queries, or API requests. If the model generates a SQL query, validate it against an allowlist of permitted operations before execution. Never pass raw model output to an interpreter or shell.

**Output filtering** - Inspect model responses before returning them to the user. Check for data exfiltration attempts where the model encodes sensitive information in its response. Validate that outputs conform to expected schemas and do not contain system prompt content.

**Monitoring and anomaly detection** - Log all inputs and outputs. Flag conversations where the model's behavior deviates from expected patterns, such as suddenly changing persona, referencing system prompt content, or attempting unauthorized tool calls. Alert on statistical anomalies in output length, topic drift, or tool invocation frequency.

## Implementation Architecture

Deploy input sanitization as a synchronous middleware layer in the request pipeline. Run it before the request reaches the LLM gateway. Place output filtering as a post-processing step before the response is returned.

For privilege separation, implement a tool execution broker that validates every model-requested action against a policy file. The policy defines which tools are callable, with what parameters, and under what conditions. The broker rejects any request that does not match a permitted pattern.

## Operational Considerations

Update injection pattern databases regularly. Prompt injection techniques evolve rapidly, and defenses that worked six months ago may not cover current attack vectors. Run automated red-team tests against your defenses as part of CI/CD. Treat injection defense as an ongoing operational concern, not a one-time implementation.

No defense eliminates the risk of prompt injection completely. The goal is to reduce the probability and blast radius of a successful attack to an acceptable level for your application's threat model.
