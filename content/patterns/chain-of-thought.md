---
title: "Chain-of-Thought Prompting - Step-by-Step Reasoning for LLMs"
description: "Chain-of-thought prompting techniques that improve LLM performance on reasoning tasks by encouraging explicit intermediate steps."
date: 2026-03-28
categories: [Patterns]
tags: [prompt-engineering, reasoning, chain-of-thought, accuracy, techniques]
related:
  - patterns/react-pattern-ai
  - patterns/reflection-pattern
  - patterns/direct-model-interface
last_updated: 2026-05-30
---

Chain-of-thought (CoT) prompting instructs the model to show its reasoning step by step before producing a final answer. Instead of jumping directly to a conclusion, the model works through the problem explicitly. This simple technique significantly improves accuracy on math, logic, multi-step reasoning, and complex analysis tasks.

## The Core Technique

The simplest form of CoT is adding "Think step by step" or "Show your reasoning" to the prompt. The model then generates intermediate reasoning steps before the final answer. These steps serve as a form of working memory, allowing the model to decompose complex problems into manageable pieces.

**Zero-shot CoT** - Add a reasoning instruction to the prompt without providing examples. "Solve this problem step by step." This works surprisingly well for capable models and requires no example crafting.

**Few-shot CoT** - Include one or more examples that demonstrate the desired reasoning format. Show the model a question, the step-by-step reasoning, and the answer. Then present the actual question. The model follows the demonstrated pattern. This produces more consistent reasoning structures than zero-shot.

**Structured CoT** - Define explicit reasoning stages. For a business analysis task: "Step 1: Identify the key metrics. Step 2: Analyze trends. Step 3: Consider confounding factors. Step 4: State your conclusion with confidence level." This templates the reasoning process and ensures no stages are skipped.

## Why It Works

LLMs generate tokens sequentially. Each token is influenced by all preceding tokens. When a model jumps directly to an answer, it must compress all reasoning into the hidden states during a single forward pass. When it reasons step by step, each intermediate conclusion becomes part of the context that influences subsequent reasoning. The model effectively gets more "compute time" on hard problems by generating more tokens.

This also means CoT is most valuable for tasks that genuinely require multi-step reasoning. For simple lookups or pattern matching, CoT adds tokens without improving accuracy.

## Practical Applications

**Mathematical reasoning** - CoT transforms model performance on math word problems. Without CoT, models frequently make errors on multi-step calculations. With CoT, accuracy improves dramatically because each arithmetic step is explicit and each intermediate result is visible.

**Code debugging** - Ask the model to trace through code execution step by step. "Walk through this function with input X. What happens at each line?" This catches bugs that the model would miss if asked simply "Is there a bug in this code?"

**Decision analysis** - For complex decisions with multiple factors, CoT ensures all factors are considered. "Evaluate this architectural decision. Consider: performance impact, cost impact, team skill requirements, maintenance burden, and migration complexity. Then provide your recommendation."

**Data interpretation** - When analyzing charts, tables, or datasets, CoT prompting produces more accurate interpretations. "First describe what the data shows. Then identify trends. Then note anomalies. Then draw conclusions."

## Extended Thinking

Modern frontier models offer extended thinking capabilities that formalize CoT at the model level. The model uses a dedicated thinking phase with a separate token budget before generating its visible response. This is particularly effective for complex tasks because the thinking tokens can explore multiple approaches without cluttering the visible output.

When using extended thinking, you typically do not need to add "think step by step" to your prompt - the model does this automatically. Instead, focus your prompt on defining the task clearly and specifying the desired output format.

## Limitations and Considerations

**Token cost** - CoT increases output token count by two to five times. For high-volume applications, this cost adds up. Consider whether the accuracy improvement justifies the additional spend for each use case.

**Latency** - More tokens means more generation time. For latency-sensitive applications, the additional reasoning steps may push response times beyond acceptable thresholds.

**Faithfulness** - The reasoning steps the model shows are not necessarily the actual computation that produced the answer. The model may generate plausible-looking reasoning that leads to a predetermined (and possibly wrong) conclusion. Do not treat CoT traces as reliable explanations of the model's decision process.

**Overthinking** - On simple tasks, CoT can actually reduce accuracy. The model may overcomplicate a straightforward question by reasoning itself into an incorrect answer. Match the technique to the difficulty of the task.

## Sources and Further Reading

- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903) - Original research paper by Wei et al. introducing chain-of-thought prompting
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought) - Official guidance on using CoT with Claude models
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) - Best practices for prompting including reasoning strategies
- [Large Language Models are Zero-Shot Reasoners](https://arxiv.org/abs/2205.11916) - Research on zero-shot chain-of-thought prompting
