---
title: "Zero-Shot Learning"
description: "What zero-shot learning is, how models perform tasks without examples, and when zero-shot approaches are sufficient."
date: 2026-03-28
categories: [Glossary]
tags: [zero-shot-learning, prompt-engineering, LLM, generalization, machine-learning]
related:
  - glossary/few-shot-learning
  - glossary/transfer-learning
  - glossary/prompt-engineering
  - glossary/llm
last_updated: 2026-05-30
---

Zero-shot learning is the ability of a model to perform a task it was not explicitly trained on, without any task-specific examples. The model generalizes from its pre-training knowledge to handle novel tasks based solely on a natural language description of what is needed.

## How It Works

In the context of large language models, zero-shot learning means providing a task instruction without any examples. You describe what you want ("Classify the following customer email as positive, negative, or neutral") and the model performs the task using its general understanding of language, categories, and the task description.

This works because foundation models are trained on diverse text that includes many implicit examples of classification, extraction, summarization, and reasoning. The model has seen enough varied contexts during pre-training to generalize to new task formulations without explicit demonstrations.

## Why It Matters

Zero-shot capability is what makes foundation models immediately useful. You can deploy an AI system for a new task without any training data, any model training, or any examples. This reduces time-to-value from weeks (collect data, label data, train model, evaluate) to minutes (write a prompt, test it).

For technical leaders, zero-shot performance is the baseline to measure. If a zero-shot prompt achieves acceptable accuracy for your use case, there is no need to invest in few-shot prompting, RAG, or fine-tuning. Start simple and add complexity only when the simpler approach falls short.

## Limitations

Zero-shot performance varies significantly by task. Models perform well on tasks well-represented in pre-training data (sentiment analysis, summarization, translation) and poorly on highly specialized or domain-specific tasks (classifying rare medical conditions, interpreting proprietary codes). When zero-shot accuracy is insufficient, the standard progression is: try few-shot prompting, then RAG, then fine-tuning.

## Practical Guidance

Always benchmark zero-shot performance before investing in more complex approaches. Use clear, specific instructions. Specify the output format explicitly. If the model produces inconsistent results, adding structure to the prompt (step-by-step instructions, output schema) often improves zero-shot performance more than adding examples would.

## Sources

- Brown, T., et al. (2020). Language models are few-shot learners. *NeurIPS 2020*. (GPT-3; demonstrated zero-shot and few-shot generalization in large language models; defined and named the zero-shot task paradigm for LLMs.)
- Wei, J., et al. (2022). Finetuned language models are zero-shot learners. *ICLR 2022*. (FLAN; showed that instruction fine-tuning substantially improves zero-shot performance across diverse tasks.)
- Kojima, T., et al. (2022). Large language models are zero-shot reasoners. *NeurIPS 2022*. (Zero-shot CoT; "Let's think step by step" as a universal zero-shot reasoning enhancement.)
