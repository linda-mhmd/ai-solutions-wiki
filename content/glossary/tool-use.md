---
title: "Tool Use (in Language Models)"
description: "The capability of a language model to invoke external tools — APIs, code execution, retrieval, computation — and incorporate their results into subsequent reasoning. Foundational mechanism behind agents, function calling, and MCP."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "intermediate", "agents", "llm", "tool-use", "function-calling"]
related:
  - glossary/function-calling
  - glossary/model-context-protocol
  - glossary/ai-agent
  - glossary/agentic-rag
  - glossary/llm
---

Tool use is the umbrella capability of a language model to invoke external systems — APIs, code execution sandboxes, retrieval indices, calculators, browsers, databases — and condition its subsequent generation on the returned results. It is the broadest level of abstraction; specific mechanisms include [function calling](/glossary/function-calling/), the [Model Context Protocol](/glossary/model-context-protocol/), code interpreters, and bespoke prompted tool grammars. Tool use is what turns a language model from a static text generator into an actor in a software environment, and is the foundational primitive of [AI agents](/glossary/ai-agent/).

## Mechanism

A tool-using model is conditioned, by training and/or by prompt, to either generate a normal text response or to emit a structured tool-invocation token sequence. The runtime intercepts tool-invocation outputs, dispatches the call to the named tool, and returns the result as an observation in the next turn. The model then resumes generation with the observation in context.

Three main implementation styles co-exist in production systems:

- **Trained tool use** — the model is post-trained on examples of correct tool use (Toolformer; Schick et al., 2023). The model emits structured tool calls natively in a provider-defined format. Examples: Anthropic Claude tool use, OpenAI function calling, Google Gemini function calling, Mistral function calling, AWS Bedrock Converse `toolUse`.
- **Prompted tool use** — the model is given a prompt-level grammar (e.g. ReAct's `Thought / Action / Observation`; Yao et al., 2023) and follows it without dedicated training. Less reliable but model-agnostic.
- **Code as tools** — the model writes code (Python, SQL, JavaScript) that is executed in a sandbox; the executed result is the observation. Strong on numeric reasoning (PoT; Chen et al., 2023) and open-ended computation. Used in OpenAI Code Interpreter, Anthropic Computer Use, AgentCore Code Interpreter.

## When Tool Use Helps

Empirical evidence (Schick et al., 2023; Mialon et al., 2023; Patil et al., 2023) supports tool use whenever the task involves:

- **Computation** the model performs unreliably (arithmetic, statistics, unit conversion) — delegate to a calculator or Python.
- **Knowledge** the model lacks or might hallucinate (private documents, current events, large catalogues) — delegate to retrieval (see [RAG](/glossary/rag/) and [Agentic RAG](/glossary/agentic-rag/)).
- **Side effects** in external systems (write to a database, send an email, create a ticket) — these *must* be tools; the model cannot "do" them in text.
- **Determinism** requirements — programmatic checks (regex, schema validation, formal verification) belong in tools.

## When Tool Use Hurts

Tool use adds latency, cost, and failure modes. Avoid it when:

- The model can answer reliably from parametric knowledge and the task is low-stakes (e.g. paraphrasing, summarisation of in-context text)
- The tool surface is poorly designed and unreliable (the model will spend turns recovering from tool errors)
- The orchestration layer cannot bound iterations and cost
- The use case is creative generation where deterministic tools add no value

## Failure Modes

Mialon et al. (2023) and the Berkeley Function-Calling Leaderboard (BFCL) catalogue the recurring failure modes:

- **Wrong tool selection.** The model picks an inappropriate tool. Mitigation: clear tool descriptions, tool-choice forcing on critical paths.
- **Schema violations.** The model emits malformed arguments. Mitigation: structured-output decoding (Willard & Louf, 2023), retry with the validation error.
- **Tool-result misinterpretation.** The model misreads the result and proceeds incorrectly. Mitigation: structured tool outputs with clear field semantics, examples in the tool description.
- **Tool loops.** Repeated calls to the same tool with the same arguments. Mitigation: deduplicate, cap iterations.
- **Unproductive exploration.** Long chains of tool calls that do not converge. Mitigation: planner-executor split (plan once, execute deterministically); tool budgets; explicit stop conditions.
- **Premature termination.** Answer without calling a required tool. Mitigation: tool-choice forcing; runtime checks that fire if specific tools were not invoked.

## Tool Use vs Plain Generation: a Decision Framework

A practical engineering rule for whether to wire a capability as a tool or rely on parametric knowledge:

1. *Can the answer change between training cuts?* → Tool (retrieval / API).
2. *Does the answer require exact arithmetic, exact strings, or determinism?* → Tool (calculator / code).
3. *Does the action have an external side effect?* → Tool (the model cannot perform it).
4. *Is the failure cost dominated by hallucination?* → Tool (with citations).
5. Otherwise → parametric generation with optional verification.

## Frameworks Implementing Tool Use

- **OpenAI** — function calling, structured outputs, Code Interpreter
- **Anthropic** — tool use, computer use, code execution beta
- **Google** — Gemini function calling, code execution
- **AWS** — Bedrock Converse `toolUse`, AgentCore (Runtime, Gateway, Code Interpreter, Browser)
- **Open frameworks** — LangGraph, CrewAI, LlamaIndex, AWS Strands, AutoGen, smolagents, DSPy
- **Cross-host protocol** — Model Context Protocol ([MCP](/glossary/model-context-protocol/))

See [CrewAI vs LangGraph](/comparisons/crewai-vs-langgraph/), [LangChain vs LlamaIndex](/comparisons/langchain-vs-llamaindex/), and [LangChain vs DSPy](/comparisons/langchain-vs-dspy/) for framework-level comparisons.

## Related Concepts

- [Function Calling](/glossary/function-calling/) — the most common provider-native implementation of tool use
- [Model Context Protocol](/glossary/model-context-protocol/) — the cross-host standard for tool exposure
- [AI Agent](/glossary/ai-agent/) — the higher-level system built on tool use
- [Agentic RAG](/glossary/agentic-rag/) — retrieval-as-tool, the most common production tool-use pattern
- [Hallucination](/glossary/hallucination/) — well-designed tool use is the primary mitigation
- [Guardrails](/glossary/guardrails/) — runtime layer that gates tool calls

## Sources and Further Reading

- Schick, T., Dwivedi-Yu, J., Dessì, R., et al. (2023). *Toolformer: Language Models Can Teach Themselves to Use Tools.* NeurIPS 2023. arXiv:2302.04761. [https://arxiv.org/abs/2302.04761](https://arxiv.org/abs/2302.04761)
- Yao, S., Zhao, J., Yu, D., et al. (2023). *ReAct: Synergizing Reasoning and Acting in Language Models.* ICLR 2023. arXiv:2210.03629. [https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)
- Mialon, G., Dessì, R., Lomeli, M., et al. (2023). *Augmented Language Models: A Survey.* TMLR 2023. arXiv:2302.07842. [https://arxiv.org/abs/2302.07842](https://arxiv.org/abs/2302.07842)
- Parisi, A., Zhao, Y., Fiedel, N. (2022). *TALM: Tool Augmented Language Models.* arXiv:2205.12255. [https://arxiv.org/abs/2205.12255](https://arxiv.org/abs/2205.12255)
- Patil, S. G., Zhang, T., Wang, X., Gonzalez, J. E. (2023). *Gorilla: Large Language Model Connected with Massive APIs.* arXiv:2305.15334. [https://arxiv.org/abs/2305.15334](https://arxiv.org/abs/2305.15334)
- Qin, Y., Liang, S., Ye, Y., et al. (2024). *ToolLLM: Facilitating Large Language Models to Master 16000+ Real-World APIs.* ICLR 2024. arXiv:2307.16789. [https://arxiv.org/abs/2307.16789](https://arxiv.org/abs/2307.16789)
- Chen, W., Ma, X., Wang, X., Cohen, W. W. (2023). *Program of Thoughts Prompting.* TMLR. arXiv:2211.12588. [https://arxiv.org/abs/2211.12588](https://arxiv.org/abs/2211.12588)
- Gao, L., Madaan, A., Zhou, S., et al. (2023). *PAL: Program-Aided Language Models.* ICML 2023. arXiv:2211.10435. [https://arxiv.org/abs/2211.10435](https://arxiv.org/abs/2211.10435)
- Willard, B. T., Louf, R. (2023). *Efficient Guided Generation for Large Language Models.* arXiv:2307.09702. [https://arxiv.org/abs/2307.09702](https://arxiv.org/abs/2307.09702)
- Berkeley Function Calling Leaderboard. [https://gorilla.cs.berkeley.edu/leaderboard.html](https://gorilla.cs.berkeley.edu/leaderboard.html)
- Anthropic. *Tool use overview.* [https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview)
- OpenAI. *Function calling guide.* [https://platform.openai.com/docs/guides/function-calling](https://platform.openai.com/docs/guides/function-calling)
- AWS. *Amazon Bedrock Converse API: tool use.* [https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference-call.html](https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference-call.html)
