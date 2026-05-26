---
title: "Function Calling"
description: "Structured tool invocation by language models: how the model emits typed function calls, how runtimes execute them, and the engineering trade-offs versus alternative tool-use mechanisms."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "intermediate", "agents", "tool-use", "llm", "openai", "anthropic"]
related:
  - glossary/tool-use
  - glossary/model-context-protocol
  - glossary/ai-agent
  - glossary/structured-output
  - glossary/llm
  - glossary/prompt-engineering
---

Function calling is the mechanism by which a large language model emits a structured request to invoke a named function with typed arguments, rather than emitting free-form text. The model is supplied with a schema describing each available function (name, description, JSON Schema for arguments). At inference time the model decides whether to answer in natural language or to emit a function-call object that the runtime parses, executes, and returns to the model for a second pass. Function calling underpins most production agent and tool-use systems built on top of foundation models.

## Mechanism

A function-calling turn proceeds as follows:

1. The host serialises a list of function specifications (`name`, `description`, `parameters` as JSON Schema) into the prompt or as a structured field in the API request.
2. The model is trained or fine-tuned to either produce natural-language output or emit a structured token sequence representing a function call. Modern providers (OpenAI, Anthropic, Google, Mistral, AWS Bedrock) expose this via a dedicated `tool_use` / `function_call` field in the API response.
3. The host validates the arguments against the schema, executes the function, and returns the result as a `tool_result` / `function` message in a subsequent turn.
4. The model conditions on the result and either calls another tool, calls a tool in parallel (most modern APIs support this), or returns natural language.

Under the hood, providers implement function calling by training the model on conversations that interleave natural language with structured tool calls (e.g. Toolformer-style supervision), and by using grammar-constrained decoding or structured-output decoding (e.g. JSON-mode, XML tags) to ensure schema validity. See Schick et al. (2023) for the supervised approach and Willard & Louf (2023) for grammar-constrained decoding.

## When to Use Function Calling

Function calling is the right primitive when:

- The agent must take discrete actions (read a database, call an API, write a file) with well-defined inputs and outputs
- The set of available actions is known at session start and changes infrequently
- The runtime can validate and sandbox each call before execution
- The desired output is a typed value (not free-form prose)

It is not the right primitive when:

- The action space is open-ended (use a more general tool-use protocol such as [MCP](/glossary/model-context-protocol/) or code execution)
- The model needs to compose tools at fine granularity (consider [code interpreter](/glossary/aws-agentcore/) patterns where the model writes code that calls many functions)
- Latency is paramount and the second model pass after tool execution is unacceptable

## Schema Design

Function-calling reliability depends heavily on schema design. Empirical guidance from production systems and provider documentation:

- **Names matter.** Use verbs (`search_docs`, `create_ticket`) — the model uses the name as the strongest signal for when to invoke the function.
- **Descriptions are prompts.** The `description` field is concatenated into the model's context. Spend effort on it. Describe pre-conditions, side effects, and when not to call.
- **Constrain enums aggressively.** Replace free-text arguments with enums where possible. The model is more reliable selecting from a closed set than free-typing.
- **Avoid deeply nested schemas.** Flatten where you can. Nested arrays of objects are a known source of malformed calls.
- **Required vs optional.** Mark only what is truly required; optional arguments with sensible defaults reduce hallucinated arguments.

OpenAI's structured-outputs feature (Lutkevich, 2024) and Anthropic's tool-use schema validation enforce JSON Schema strictly at decoding time, eliminating most schema-violation errors when used.

## Parallel and Multi-Step Function Calling

Modern APIs (OpenAI Chat Completions, Anthropic Messages, Bedrock Converse) support emitting multiple function calls in a single assistant turn. The runtime executes them concurrently and returns all results in the next user turn. This pattern reduces wall-clock latency for independent reads (e.g. fetching weather and stock price simultaneously) and is the default for retrieval-heavy agents.

For multi-step plans, the agent loop iterates: the model emits a tool call, receives a result, reasons, emits the next call. The [ReAct pattern](https://arxiv.org/abs/2210.03629) (Yao et al., 2023) — interleaving Reasoning traces with Action steps — is the foundational paradigm; modern implementations omit the explicit "Thought:" prefix because reasoning is implicit in the post-tool conditioning.

## Reliability and Failure Modes

Production function-calling systems exhibit several recurring failure modes that engineering teams should monitor:

- **Schema violations.** The model emits arguments that do not validate. Mitigation: strict structured-output decoding, retry with the validation error fed back to the model.
- **Hallucinated functions.** The model invents a function name not in the schema. Mitigation: validate the function name against the registered set; return an error message that lists available functions.
- **Argument drift.** The model passes plausible but incorrect values (wrong ID, wrong unit). Mitigation: add validation at the function boundary; for high-stakes calls, require human confirmation.
- **Premature termination.** The model returns a natural-language answer without calling the required tool. Mitigation: tool-choice forcing (`tool_choice: "required"` in OpenAI; `tool_choice: {"type": "tool"}` in Anthropic).
- **Tool-loop divergence.** The model repeatedly calls the same tool with the same arguments. Mitigation: deduplicate identical calls in the agent loop and bound the iteration count.

Patil et al. (2023) — Gorilla — quantified the gap between closed and open models on tool-use benchmarks; subsequent work (Berkeley Function Calling Leaderboard, 2024–2025) tracks this systematically.

## Function Calling vs Alternatives

| Mechanism | Surface | Discovery | Where it fits |
|---|---|---|---|
| **Function calling** (native) | Single API, in-process | Static schema at request time | Default for single-application agents |
| **[MCP](/glossary/model-context-protocol/)** | Cross-process, JSON-RPC | Server-advertised manifest | Multi-host, multi-tool platforms |
| **Code interpreter** | Sandboxed Python/JS | Open-ended | Open-ended computation, data analysis |
| **Plan-and-execute** | Plan first, then execute | Pre-planned tool list | Long-horizon tasks, deterministic pipelines |

## Related Concepts

- [Tool Use](/glossary/tool-use/) — the broader behaviour function calling implements
- [Model Context Protocol](/glossary/model-context-protocol/) — standardised cross-process tool invocation
- [Structured Output](/glossary/structured-output/) — the underlying decoding technique enabling reliable function calls
- [AI Agent](/glossary/ai-agent/) — the system that consumes function calling as a primitive
- [Prompt Engineering](/glossary/prompt-engineering/) — schema descriptions are part of prompt engineering
- [Hallucination](/glossary/hallucination/) — function-calling reduces hallucination by grounding answers in tool results

## Sources and Further Reading

- Schick, T., Dwivedi-Yu, J., Dessì, R., et al. (2023). *Toolformer: Language Models Can Teach Themselves to Use Tools.* NeurIPS 2023. arXiv:2302.04761. [https://arxiv.org/abs/2302.04761](https://arxiv.org/abs/2302.04761)
- Yao, S., Zhao, J., Yu, D., et al. (2023). *ReAct: Synergizing Reasoning and Acting in Language Models.* ICLR 2023. arXiv:2210.03629. [https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)
- Patil, S. G., Zhang, T., Wang, X., Gonzalez, J. E. (2023). *Gorilla: Large Language Model Connected with Massive APIs.* arXiv:2305.15334. [https://arxiv.org/abs/2305.15334](https://arxiv.org/abs/2305.15334)
- Willard, B. T., Louf, R. (2023). *Efficient Guided Generation for Large Language Models.* arXiv:2307.09702. [https://arxiv.org/abs/2307.09702](https://arxiv.org/abs/2307.09702)
- Qin, Y., Liang, S., Ye, Y., et al. (2024). *ToolLLM: Facilitating Large Language Models to Master 16000+ Real-World APIs.* ICLR 2024. arXiv:2307.16789. [https://arxiv.org/abs/2307.16789](https://arxiv.org/abs/2307.16789)
- Berkeley Function Calling Leaderboard. [https://gorilla.cs.berkeley.edu/leaderboard.html](https://gorilla.cs.berkeley.edu/leaderboard.html)
- OpenAI (2024). *Function calling and other API updates.* [https://platform.openai.com/docs/guides/function-calling](https://platform.openai.com/docs/guides/function-calling)
- Anthropic. *Tool use (function calling).* [https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview)
- AWS. *Amazon Bedrock Converse API: tool use.* [https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference-call.html](https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference-call.html)
