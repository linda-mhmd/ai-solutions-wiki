---
title: "Reasoning Models"
description: "Language models post-trained to allocate substantial inference-time compute to internal reasoning before producing final answers — the o1 / R1 generation."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "advanced", "llm", "reasoning", "inference-time-compute"]
related:
  - glossary/chain-of-thought
  - glossary/inference-time-compute
  - glossary/llm
  - glossary/foundation-models
  - glossary/direct-preference-optimization
---

Reasoning models are large language models post-trained to allocate substantial inference-time compute to internal reasoning before producing a final answer. Where a conventional LLM emits its answer immediately after the prompt, a reasoning model first generates a long, often hidden, chain of thought that explores, plans, backtracks, and verifies — sometimes for thousands or tens of thousands of tokens — and only then produces the visible response. The class was established by OpenAI's o1 (September 2024), generalised by DeepSeek's R1 (January 2025), and is now represented in every major model family (o3, Claude with extended thinking, Gemini 2.0 Flash Thinking, Qwen3, GLM-Z1). Reasoning models trade latency and cost for substantially higher accuracy on math, coding, scientific reasoning, and planning tasks — a different scaling axis from parameter count.

## Mechanism

A reasoning model is a transformer LLM trained with a two-part objective:

1. **Reasoning generation** — produce a long chain of intermediate thoughts (often delimited by special tokens or simply by a model-internal convention).
2. **Answer extraction** — produce the final answer conditioned on the reasoning trace.

Two principal training recipes have been published:

- **Search + distillation** (early o1 hypotheses; explicit in works like rStar-Math; Chen et al., 2025). Generate reasoning traces via search (best-of-N, MCTS, process-reward-model-guided search), filter for correctness, and distil into a single-pass model. Inference is fast because the search has been amortised into the model.
- **RL with verifiable rewards** (DeepSeek-R1; DeepSeek-AI, 2025). Start from a base model. Define rewards that can be machine-verified (math answer correctness, code passing tests, formal proofs). Run RL (Group Relative Policy Optimisation, GRPO) with these rewards. The model learns to extend its chain of thought when the reward improves with more thinking. R1-Zero showed this works *without* an SFT cold start, producing emergent reasoning.

The R1 technical report demonstrated that the reasoning behaviour itself emerges from the RL signal — the model spontaneously develops verification, backtracking, and re-reading of the prompt as effective strategies for the verifier-checked rewards. This was the first widely-replicated open recipe for reasoning models.

## Inference-Time Behaviour

A reasoning model's response is structurally:

```
<thinking>
... long chain of reasoning, often 1k–30k tokens,
including dead ends, restarts, self-correction ...
</thinking>
<answer>
... concise final answer ...
</answer>
```

The thinking section may be hidden from the user (OpenAI o1, Claude extended thinking with `redacted_thinking`) or visible (DeepSeek-R1, Gemini Flash Thinking). Provider APIs typically expose a `reasoning_effort` or `thinking_budget` parameter that scales the maximum reasoning tokens, with corresponding accuracy / latency trade-off curves.

## Why Reasoning Models Matter

The empirical result, established across o1, R1, and successors: on hard reasoning benchmarks (AIME, MATH-500, GPQA Diamond, Codeforces, FrontierMath), reasoning models outperform conventional LLMs by large margins, and accuracy continues to improve with thinking-token budget — a different scaling regime than pretraining-compute scaling (Snell et al., 2024). For sufficiently hard problems, a smaller reasoning model with more thinking can outperform a larger conventional model.

This shifts cost economics: instead of paying for parameter count, you pay for thinking tokens. The right axis for a given task depends on whether the task benefits from reasoning at all (highly structured domains like math and coding: yes; conversational helpfulness, summarisation: marginal).

## Where Reasoning Models Win

- Mathematical problem-solving (AIME, MATH, USAMO)
- Competitive programming (Codeforces, LiveCodeBench)
- Scientific reasoning (GPQA, scientific literature analysis)
- Planning under constraints (combinatorial optimisation, scheduling, theorem proving)
- Complex code refactoring with verifiable tests
- Multi-step reasoning over structured data (SQL generation, data transformations)

## Where Reasoning Models Do Not Win (or Cost More Than They Help)

- Single-step factual questions
- Conversational helpfulness, customer support
- Summarisation, paraphrasing, translation
- Creative writing (reasoning can over-constrain stylistic choices)
- Latency-bound interactive applications (the thinking phase can take 30+ seconds)
- High-throughput batch tasks where compute per request must be minimal

For these tasks, prefer a conventional model and reserve the reasoning model for the subset of queries that need it. Routing patterns (cheap classifier → reasoning model only when needed) are common (see Ong et al., 2024).

## Engineering Considerations

- **Latency.** Reasoning responses can take seconds to minutes. Streaming the thinking is sometimes possible (DeepSeek-R1 streams the reasoning); often only the final answer is streamed. Plan UX accordingly.
- **Cost.** Thinking tokens are billed (typically at the same rate as output tokens). A single hard query can consume 10× the tokens of a regular request.
- **CoT prompting can hurt.** "Let's think step by step" interferes with the trained internal reasoning. Provider documentation typically advises *not* prompting a reasoning model the same way you would prompt a conventional one (Anthropic and OpenAI publish specific guidance).
- **Function calling and tool use.** Most reasoning models support tool use, and the tool-calling format may differ from non-reasoning siblings (OpenAI's `o-series` requires Responses API; Anthropic's extended thinking interleaves with tool calls).
- **Hallucination dynamics differ.** Reasoning models can confidently fabricate elaborate justifications. The thinking trace looks plausible but may be unfaithful (Turpin et al., 2023; Lanham et al., 2023). Treat verification as a separate step.

## Open vs Closed

The reasoning-model class went from closed-only (o1, September 2024) to open-replicable (DeepSeek-R1, January 2025) within four months. R1 (671B MoE), R1-Distill variants (1.5B–70B dense), and the open-source GRPO recipe enable any team with adequate compute to train reasoning capability into existing base models. Subsequent open releases (Qwen3, GLM-Z1, Llama Nemotron Reasoning) confirm that the recipe transfers across model families.

## Related Concepts

- [Chain-of-Thought](/glossary/chain-of-thought/) — the prompting precursor; reasoning models internalise CoT through training
- [Inference-Time Compute](/glossary/inference-time-compute/) — the scaling phenomenon reasoning models exploit
- [Direct Preference Optimization](/glossary/direct-preference-optimization/) — alternative post-training; orthogonal to reasoning training but often combined
- [Reinforcement Learning](/glossary/reinforcement-learning/) — RL with verifiable rewards is the dominant reasoning-training recipe
- [LLM](/glossary/llm/), [Foundation Models](/glossary/foundation-models/)

## Sources and Further Reading

- OpenAI (2024). *Learning to Reason with LLMs (o1 system card).* [https://openai.com/index/learning-to-reason-with-llms/](https://openai.com/index/learning-to-reason-with-llms/)
- DeepSeek-AI (2025). *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning.* arXiv:2501.12948. [https://arxiv.org/abs/2501.12948](https://arxiv.org/abs/2501.12948)
- Snell, C., Lee, J., Xu, K., Kumar, A. (2024). *Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters.* arXiv:2408.03314. [https://arxiv.org/abs/2408.03314](https://arxiv.org/abs/2408.03314)
- Wu, Y., Sun, Z., Li, S., et al. (2024). *Inference Scaling Laws: An Empirical Analysis of Compute-Optimal Inference for Problem-Solving with Language Models.* arXiv:2408.00724. [https://arxiv.org/abs/2408.00724](https://arxiv.org/abs/2408.00724)
- Chen, X., Yang, C., Wang, Z., et al. (2025). *rStar-Math: Small LLMs Can Master Math Reasoning with Self-Evolved Deep Thinking.* arXiv:2501.04519. [https://arxiv.org/abs/2501.04519](https://arxiv.org/abs/2501.04519)
- Shao, Z., Wang, P., Zhu, Q., et al. (2024). *DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models (GRPO).* arXiv:2402.03300. [https://arxiv.org/abs/2402.03300](https://arxiv.org/abs/2402.03300)
- Turpin, M., Michael, J., Perez, E., Bowman, S. R. (2023). *Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting.* NeurIPS 2023. arXiv:2305.04388. [https://arxiv.org/abs/2305.04388](https://arxiv.org/abs/2305.04388)
- Lanham, T., Chen, A., Radhakrishnan, A., et al. (2023). *Measuring Faithfulness in Chain-of-Thought Reasoning.* arXiv:2307.13702. [https://arxiv.org/abs/2307.13702](https://arxiv.org/abs/2307.13702)
- Ong, I., Almahairi, A., Wu, V., et al. (2024). *RouteLLM: Learning to Route LLMs with Preference Data.* arXiv:2406.18665. [https://arxiv.org/abs/2406.18665](https://arxiv.org/abs/2406.18665)
- Anthropic. *Extended thinking with Claude.* [https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
- OpenAI. *Reasoning models guide.* [https://platform.openai.com/docs/guides/reasoning](https://platform.openai.com/docs/guides/reasoning)
