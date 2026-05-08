---
title: "Structured Output"
description: "Constraining a language model to emit output that conforms to a specified schema (JSON, regex, grammar). The decoding-time technique behind reliable function calling, agent tool calls, and machine-readable LLM responses."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "intermediate", "llm", "function-calling", "decoding"]
related:
  - glossary/function-calling
  - glossary/tool-use
  - glossary/llm
  - glossary/prompt-engineering
---

Structured output is the practice of constraining a language model's generation so that the output conforms to a specified schema — typically a JSON Schema, regular expression, context-free grammar, or Pydantic / dataclass type. It is the engineering technique that makes [function calling](/glossary/function-calling/) and machine-readable LLM responses reliable in production: prompting alone produces schema-violating output at non-trivial rates, while constrained decoding can reduce this rate to zero.

## Mechanism

Structured output is implemented at the decoding step. At each token, the language model produces a distribution over the vocabulary. A constraint engine masks out tokens that would lead to an invalid sequence under the schema, renormalises the remaining distribution, and samples (or argmaxes) from the masked distribution. The output is mathematically guaranteed to satisfy the schema.

The dominant techniques:

- **Grammar-constrained decoding** (Geng et al., 2023; Willard & Louf, 2023). Compile the schema (JSON Schema, regex, EBNF) into a finite-state machine or pushdown automaton. At each step, query the FSM for the set of valid next tokens and mask the rest. The Outlines library and Microsoft Guidance implement this approach.
- **Speculative validation with retry.** Generate freely, validate, and retry if invalid. Cheaper to implement but does not guarantee success.
- **JSON-mode decoding.** A simpler subset that constrains output to syntactically valid JSON without enforcing a specific schema. Most provider APIs support this.
- **Schema-aware fine-tuning.** Train the model on schema-conformant outputs so that the unconstrained distribution naturally satisfies the schema. Combined with constrained decoding for guarantees.

OpenAI's Structured Outputs (released August 2024) and Anthropic's tool-use schema enforcement use grammar-constrained decoding under the hood, providing strict JSON Schema adherence at the API level.

## When to Use Structured Output

Use structured output whenever the downstream consumer is a program rather than a human:

- Function and tool calls (the model emits a function name and typed arguments)
- Agent reasoning traces (action selection, intermediate state)
- Information extraction (entities, relations, fields from documents)
- API response synthesis (returning structured data from a natural-language query)
- Classification with rich rationales (label + evidence + confidence)
- Pipelines that branch on LLM output (the next step needs reliable parsing)

Avoid structured output when:

- The output is end-user-facing prose (unnecessary cost; readability suffers)
- The schema is unstable and frequently changes (constraint compilation has overhead)
- The constraint is so restrictive it harms quality (over-constrained schemas can collapse into degenerate outputs — see the discussion in Tam et al., 2024)

## Quality Trade-off

A subtle finding from recent work (Tam et al., 2024) is that strict schema constraints can *reduce* output quality on reasoning tasks, even though they guarantee parseability. The hypothesis: the constraint forces tokens that the unconstrained distribution would not have chosen, suppressing the natural reasoning path. Mitigations:

- **Reason then format.** Ask the model to reason in unconstrained natural language first, then emit the constrained structured object as the final step. The reasoning conditions the structured output without constraining the reasoning itself. This is the dominant production pattern.
- **Provide sufficient schema flexibility.** Optional fields, free-text reasoning slots, and `string` fields for explanations let the model express nuance.
- **Compare with vs without structured output** on a held-out set when first integrating; if quality drops materially, restructure the schema.

## Common Pitfalls

- **Deeply nested schemas.** Constrained decoding handles them, but error rates on the *content* (semantic correctness of values) rise with nesting depth. Flatten where possible.
- **Free-text fields with hidden constraints.** A `string` field with an instruction like "must be a valid SQL query" is *not* constrained — only the type is. Validate semantically with a downstream check.
- **Enums beat free-text.** Where the value should come from a fixed set, model it as an enum in the schema. Reliability and downstream code simplicity both improve.
- **Required vs optional.** Mark only what is truly required; over-required schemas force the model to invent values.
- **`additionalProperties: true`.** Allowing extra properties is convenient but creates a downstream parsing surface. Set `additionalProperties: false` in JSON Schema where supported.

## Implementations

- **Outlines** (Willard & Louf, 2023) — open-source constrained-decoding library, used as the reference implementation for many providers.
- **Microsoft Guidance** — programming model for constrained generation with templated control flow.
- **LMQL** (Beurer-Kellner et al., 2023) — query language with first-class constraint syntax.
- **OpenAI Structured Outputs** — provider-native JSON Schema enforcement, August 2024 release.
- **Anthropic tool use** — schema enforcement via native tool-use API.
- **Google Gemini structured output** — `responseSchema` parameter on Gemini API.
- **AWS Bedrock Converse `toolUse`** — schema-validated tool inputs.
- **Pydantic + Instructor** — Python ergonomics layer over multiple provider backends, validates with Pydantic.

## Related Concepts

- [Function Calling](/glossary/function-calling/) — structured output is the underlying mechanism
- [Tool Use](/glossary/tool-use/) — depends on structured output for reliable tool dispatch
- [Prompt Engineering](/glossary/prompt-engineering/) — schema design is a form of prompt engineering
- [LLM-as-a-Judge](/glossary/llm-as-a-judge/) — judges typically emit structured scores
- [Hallucination](/glossary/hallucination/) — schema-level validity does not prevent semantic hallucination

## Sources and Further Reading

- Willard, B. T., Louf, R. (2023). *Efficient Guided Generation for Large Language Models.* arXiv:2307.09702. [https://arxiv.org/abs/2307.09702](https://arxiv.org/abs/2307.09702)
- Geng, S., Josifoski, M., Peyrard, M., West, R. (2023). *Grammar-Constrained Decoding for Structured NLP Tasks without Finetuning.* EMNLP 2023. arXiv:2305.13971. [https://arxiv.org/abs/2305.13971](https://arxiv.org/abs/2305.13971)
- Beurer-Kellner, L., Fischer, M., Vechev, M. (2023). *Prompting Is Programming: A Query Language for Large Language Models (LMQL).* PLDI 2023. arXiv:2212.06094. [https://arxiv.org/abs/2212.06094](https://arxiv.org/abs/2212.06094)
- Tam, Z. R., Wu, C.-K., Tsai, Y.-L., et al. (2024). *Let Me Speak Freely? A Study on the Impact of Format Restrictions on Performance of Large Language Models.* arXiv:2408.02442. [https://arxiv.org/abs/2408.02442](https://arxiv.org/abs/2408.02442)
- OpenAI (2024). *Introducing Structured Outputs in the API.* [https://openai.com/index/introducing-structured-outputs-in-the-api/](https://openai.com/index/introducing-structured-outputs-in-the-api/)
- JSON Schema specification. [https://json-schema.org/specification](https://json-schema.org/specification)
- Outlines: structured generation library. [https://github.com/dottxt-ai/outlines](https://github.com/dottxt-ai/outlines)
