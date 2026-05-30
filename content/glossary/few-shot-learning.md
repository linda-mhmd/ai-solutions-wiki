---
title: "Few-Shot Learning"
description: "What few-shot learning is, how it enables models to generalize from minimal examples, and practical prompting strategies."
date: 2026-03-28
categories: [Glossary]
tags: [few-shot-learning, prompt-engineering, in-context-learning, LLM, machine-learning]
related:
  - glossary/zero-shot-learning
  - glossary/transfer-learning
  - glossary/prompt-engineering
  - glossary/llm
last_updated: 2026-05-30
---

Few-shot learning is the ability of a model to perform a new task after seeing only a small number of examples (typically 2-10). In the context of large language models, few-shot learning usually means including a few input-output examples in the prompt to demonstrate the desired behavior.

## How It Works

In traditional machine learning, few-shot learning involves specialized architectures (meta-learning, prototypical networks) that learn to learn from small datasets. In the LLM era, few-shot learning is most commonly achieved through in-context learning: you provide examples directly in the prompt, and the model infers the pattern.

For example, to classify customer support tickets, you include 3-5 examples of tickets with their correct categories in the prompt, followed by the new ticket to classify. The model generalizes the classification pattern from the examples without any weight updates or fine-tuning.

## Why It Matters

Few-shot learning dramatically reduces the barrier to deploying AI for new tasks. Instead of collecting thousands of labeled examples and training a custom model, you can often get acceptable performance by crafting a prompt with a handful of representative examples. This means new AI capabilities can be prototyped in hours rather than weeks.

## Best Practices

**Choose diverse, representative examples** that cover the range of expected inputs. If you are classifying into five categories, include at least one example per category.

**Order matters** - examples at the end of the prompt tend to have more influence. Place the most representative examples closest to the query.

**Format consistently** - use the exact same format for each example and for the query. Inconsistent formatting confuses the model about what pattern to follow.

**Test with held-out examples** - measure accuracy on examples not included in the prompt to get an honest assessment of performance.

## When to Move Beyond Few-Shot

Few-shot prompting has limits. If accuracy is insufficient, the logical progression is: add more examples (up to context window limits), implement RAG to dynamically select the most relevant examples, fine-tune the model on your labeled data, or train a task-specific model. Each step increases accuracy but also increases cost and complexity.

## Sources

- Brown, T., et al. (2020). Language models are few-shot learners. *NeurIPS 2020*. (GPT-3; demonstrated in-context few-shot learning as an emergent capability of large models.)
- Snell, J., Swersky, K., & Zemel, R. (2017). Prototypical networks for few-shot learning. *NeurIPS 2017*. (Metric-learning approach to classical few-shot learning.)
- Finn, C., Abbeel, P., & Levine, S. (2017). Model-agnostic meta-learning for fast adaptation of deep networks. *ICML 2017*. (MAML; gradient-based meta-learning for few-shot generalization.)
