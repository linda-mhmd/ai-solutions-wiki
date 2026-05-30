---
title: "Chain-of-Thought (CoT) Prompting"
description: "Eliciting intermediate reasoning steps from language models to improve performance on multi-step problems, with rigorous experimental evidence and known limitations."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "intermediate", "prompt-engineering", "reasoning", "llm"]
related:
  - glossary/prompt-engineering
  - glossary/inference-time-compute
  - glossary/llm
  - glossary/few-shot-learning
  - glossary/llm-as-a-judge
last_updated: 2026-05-30
---

Chain-of-thought (CoT) prompting is a technique for improving large language model performance on multi-step reasoning problems by eliciting intermediate reasoning traces before the final answer. The original result, Wei et al. (2022), demonstrated that for models above approximately 100B parameters, prompting with worked examples that include intermediate steps substantially improves arithmetic, commonsense, and symbolic reasoning accuracy. CoT has since become a foundational technique for reasoning systems and an active research area, with significant nuance about *when* and *why* it works.

## Mechanism

A CoT prompt supplies the model with one or more demonstrations in which the answer is preceded by an explicit chain of intermediate reasoning. The model, conditioned on the demonstrations, generates similar reasoning traces for new inputs before emitting the final answer. Two principal variants:

- **Few-shot CoT** (Wei et al., 2022): the demonstrations include reasoning traces written by hand.
- **Zero-shot CoT** (Kojima et al., 2022): appending the phrase *"Let's think step by step"* to the prompt elicits reasoning without demonstrations, achieving substantial gains on the original benchmarks.

Mechanistically, CoT works by allocating *more inference-time compute* to a problem: the model reasons through intermediate states whose representations are then attended to when producing the final token. This is the link to inference-time scaling work, see [Inference-Time Compute](/glossary/inference-time-compute/) and the discussion of OpenAI's o1 and Anthropic's extended-thinking modes below.

## Variants and Extensions

- **Self-Consistency** (Wang et al., 2023): sample multiple CoT traces and take the majority-vote final answer. Substantially improves accuracy on math and commonsense benchmarks at the cost of N× inference compute.
- **Tree of Thoughts** (Yao et al., 2023): generalises CoT from a linear trace to a search tree, enabling backtracking. Outperforms CoT on tasks requiring exploration (Game of 24, creative writing, mini-crosswords).
- **Graph of Thoughts** (Besta et al., 2024): generalises further to a DAG, allowing the model to merge and refine intermediate thoughts.
- **Least-to-Most Prompting** (Zhou et al., 2023): decompose the problem into sub-problems, solve each in turn. Empirically stronger on problems where the natural decomposition is non-obvious from the input.
- **Faithful CoT** (Lyu et al., 2023): emit the reasoning as executable code or formal logic, then execute. Removes the gap between stated reasoning and final answer.
- **Program-of-Thoughts** (Chen et al., 2023): write Python that computes the answer rather than reasoning in natural language. Outperforms CoT on numeric reasoning.

## When to Use Chain-of-Thought

CoT is the right tool when:

- The problem genuinely requires multi-step reasoning (arithmetic, logic, planning, structured analysis)
- The model is large enough that emergent CoT abilities apply (small models often perform *worse* with CoT, Wei et al., 2022)
- Latency budget tolerates the extra tokens (CoT outputs are typically 3–10× longer than direct answers)
- The reasoning trace is itself useful (auditability, evaluation, post-hoc verification)

CoT is *not* the right tool when:

- The problem is single-step (lookup, classification of clear-cut inputs), CoT wastes tokens and can hurt accuracy by introducing reasoning errors
- The model has been post-trained to reason internally (o1, Claude with extended thinking, DeepSeek-R1), these models reason in a hidden chain and benefit less from explicit CoT prompting
- The task is creative or stylistic, CoT can over-rationalise outputs that should be direct

## Limitations and Failure Modes

CoT is not a guaranteed accuracy boost and has well-documented failure modes:

- **Unfaithful reasoning** (Turpin et al., 2023; Lanham et al., 2023): the stated reasoning trace does not always reflect the actual computation; models can reach correct answers via wrong reasoning, or correct reasoning followed by an unrelated final answer. Audit traces critically.
- **Reasoning errors compound.** A single arithmetic mistake in step 3 propagates through steps 4–10. Self-Consistency partially mitigates by majority-voting over many traces.
- **Format brittleness.** Small changes to the demonstration format (commas vs newlines, "answer:" vs "Therefore,") can shift accuracy by several points (Sclar et al., 2024).
- **Bias and shortcut amplification.** CoT can rationalise biased outputs more confidently than direct prompting, making bias harder to detect (Turpin et al., 2023).
- **Capability gating.** CoT benefits emerge sharply at scale; for sub-100B models the gains are marginal or negative (Wei et al., 2022).

## Relation to Reasoning Models

The 2024–2025 generation of reasoning models, OpenAI o1, o3, Anthropic Claude with extended thinking, DeepSeek-R1, Google Gemini 2.0 Flash Thinking, internalises CoT through post-training (typically RLHF or RL with verifiable rewards). These models emit a long, often hidden, chain of thought before the visible answer, and scale accuracy with thinking-token budget rather than parameter count. See [Inference-Time Compute](/glossary/inference-time-compute/) for the underlying scaling phenomenon (Snell et al., 2024) and DeepSeek-AI (2025) for an open-source training recipe.

For these models, prompting *with* explicit CoT instructions is often unnecessary or counter-productive, the model already reasons internally, and "Let's think step by step" can interfere with the trained behaviour. Provider documentation should be consulted for each model.

## Related Concepts

- [Inference-Time Compute](/glossary/inference-time-compute/): the underlying scaling phenomenon CoT exploits
- [Prompt Engineering](/glossary/prompt-engineering/): CoT is one of the highest-leverage prompting techniques
- [Few-Shot Learning](/glossary/few-shot-learning/): CoT is most effective in few-shot settings
- [LLM-as-a-Judge](/glossary/llm-as-a-judge/): judges often use CoT to produce calibrated scores
- [Hallucination](/glossary/hallucination/): unfaithful CoT is a hallucination of reasoning, not just facts

## Sources and Further Reading

- Wei, J., Wang, X., Schuurmans, D., et al. (2022). *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models.* NeurIPS 2022. arXiv:2201.11903. [https://arxiv.org/abs/2201.11903](https://arxiv.org/abs/2201.11903)
- Kojima, T., Gu, S. S., Reid, M., Matsuo, Y., Iwasawa, Y. (2022). *Large Language Models are Zero-Shot Reasoners.* NeurIPS 2022. arXiv:2205.11916. [https://arxiv.org/abs/2205.11916](https://arxiv.org/abs/2205.11916)
- Wang, X., Wei, J., Schuurmans, D., et al. (2023). *Self-Consistency Improves Chain of Thought Reasoning in Language Models.* ICLR 2023. arXiv:2203.11171. [https://arxiv.org/abs/2203.11171](https://arxiv.org/abs/2203.11171)
- Yao, S., Yu, D., Zhao, J., et al. (2023). *Tree of Thoughts: Deliberate Problem Solving with Large Language Models.* NeurIPS 2023. arXiv:2305.10601. [https://arxiv.org/abs/2305.10601](https://arxiv.org/abs/2305.10601)
- Besta, M., Blach, N., Kubicek, A., et al. (2024). *Graph of Thoughts: Solving Elaborate Problems with Large Language Models.* AAAI 2024. arXiv:2308.09687. [https://arxiv.org/abs/2308.09687](https://arxiv.org/abs/2308.09687)
- Zhou, D., Schärli, N., Hou, L., et al. (2023). *Least-to-Most Prompting Enables Complex Reasoning in Large Language Models.* ICLR 2023. arXiv:2205.10625. [https://arxiv.org/abs/2205.10625](https://arxiv.org/abs/2205.10625)
- Chen, W., Ma, X., Wang, X., Cohen, W. W. (2023). *Program of Thoughts Prompting: Disentangling Computation from Reasoning for Numerical Reasoning Tasks.* TMLR. arXiv:2211.12588. [https://arxiv.org/abs/2211.12588](https://arxiv.org/abs/2211.12588)
- Turpin, M., Michael, J., Perez, E., Bowman, S. R. (2023). *Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting.* NeurIPS 2023. arXiv:2305.04388. [https://arxiv.org/abs/2305.04388](https://arxiv.org/abs/2305.04388)
- Lanham, T., Chen, A., Radhakrishnan, A., et al. (2023). *Measuring Faithfulness in Chain-of-Thought Reasoning.* arXiv:2307.13702. [https://arxiv.org/abs/2307.13702](https://arxiv.org/abs/2307.13702)
- Sclar, M., Choi, Y., Tsvetkov, Y., Suhr, A. (2024). *Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design.* ICLR 2024. arXiv:2310.11324. [https://arxiv.org/abs/2310.11324](https://arxiv.org/abs/2310.11324)
- Snell, C., Lee, J., Xu, K., Kumar, A. (2024). *Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters.* arXiv:2408.03314. [https://arxiv.org/abs/2408.03314](https://arxiv.org/abs/2408.03314)
- DeepSeek-AI (2025). *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning.* arXiv:2501.12948. [https://arxiv.org/abs/2501.12948](https://arxiv.org/abs/2501.12948)
- OpenAI (2024). *Learning to Reason with LLMs (o1 system card).* [https://openai.com/index/learning-to-reason-with-llms/](https://openai.com/index/learning-to-reason-with-llms/)
