---
title: "Fine-Tuning vs Prompt Engineering vs RAG"
description: "The three main approaches to customizing LLM behavior for specific use cases - when each is appropriate and how they compare."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "intermediate", "fine-tuning", "transfer-learning", "model-training", "domain-adaptation", "llm"]
related:
  - glossary/llm
  - glossary/foundation-models
  - comparisons/rag-vs-fine-tuning
  - tools/amazon-sagemaker
  - tools/amazon-bedrock
last_updated: 2026-05-30
---

When an LLM does not perform well enough out of the box for your specific use case, you have three main options: change how you ask (prompt engineering), give it relevant information at query time (RAG), or change the model itself (fine-tuning). Understanding when each approach is appropriate is one of the most important decisions in AI system design.

<figure class="bz-figure">
  <img src="/img/craft/polaroid-experiments-three-approaches-text.png" alt="Three polaroid photographs showing different experimental approaches: prompt engineering, RAG, and fine-tuning as distinct paths to model customization." loading="lazy">
  <figcaption>Three approaches, three trade-offs. Prompt engineering is fast and cheap. RAG adds knowledge without retraining. Fine-tuning changes the model itself. Most projects should try them in that order.</figcaption>
</figure>

## Prompt Engineering

Prompt engineering is the practice of designing and refining the text inputs (prompts) sent to an LLM to improve its output quality, consistency, and format.

**When it works:** Most of the time. Before trying anything else, improve your prompt. Better task description, few-shot examples, explicit output format requirements, and chain-of-thought instructions resolve most performance gaps without any additional infrastructure.

**When it does not work:** When the model genuinely does not have the knowledge needed to answer (it is not in training data), when consistency requirements exceed what natural language instructions can enforce, or when extremely high volume makes long prompts cost-prohibitive.

**Cost:** Near-zero. A few hours of engineering work.

## Retrieval Augmented Generation (RAG)

RAG provides the model with relevant information from an external knowledge base at query time. The information is retrieved from a vector database and included in the prompt, so the model can answer based on your specific documents rather than its general training knowledge.

**When it works:** When the performance gap is due to missing knowledge - your organization's documents, recent data, proprietary information, or rapidly changing content. RAG adds this knowledge without retraining the model.

**When it does not work:** When the issue is not missing knowledge but rather the model's behavior: it formats output incorrectly, uses the wrong tone, or fails to apply domain-specific reasoning conventions. RAG does not change model behavior.

**Cost:** Infrastructure cost for a vector database and embedding pipeline. Typically $100-500/month for moderate-scale internal knowledge bases.

## Fine-Tuning

Fine-tuning continues the training process on a dataset of examples specific to your use case. The model's weights are updated to better reflect the patterns, style, and knowledge in your training data.

**When it works:** When you need to change the model's behavior (output format, tone, domain-specific reasoning style), when you have thousands of high-quality examples, or when you need to improve performance on a highly specialized task that general-purpose models handle poorly.

**When it does not work:** When you do not have enough labeled data (hundreds of examples are rarely enough; thousands are typically needed), when you are trying to add factual knowledge (fine-tuned knowledge is brittle and may not generalize), or when the base model performs reasonably well with good prompting.

**Cost:** Training compute (hundreds to thousands of dollars per training run), ongoing inference cost for the fine-tuned model endpoint, and significant engineering effort for data preparation and evaluation.

## Decision Guide

1. Start with prompt engineering. It is free and fast. You will often get further than expected.
2. If the gap is missing knowledge - add RAG. Deploy a vector database with your knowledge source.
3. If the gap is behavior or style after good prompting - consider fine-tuning. Only proceed if you have substantial labeled data.
4. Fine-tuning plus RAG is appropriate for the most demanding applications: fine-tuning for behavior, RAG for knowledge.

The most common mistake is going straight to fine-tuning when better prompting or RAG would have solved the problem at a fraction of the cost and complexity.

## Sources

- Howard, J., & Ruder, S. (2018). Universal language model fine-tuning for text classification. *ACL 2018*. (ULMFiT; established fine-tuning pretrained LMs as the standard NLP paradigm.)
- Devlin, J., et al. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. *NAACL 2019*. (BERT fine-tuning paradigm for downstream tasks.)
- Brown, T., et al. (2020). Language models are few-shot learners. *NeurIPS 2020*. (GPT-3; demonstrated few-shot prompting as an alternative to fine-tuning.)
- Lewis, P., et al. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *NeurIPS 2020*. (RAG; alternative to fine-tuning for knowledge-grounded tasks.)
- Hu, E.J., et al. (2022). LoRA: Low-rank adaptation of large language models. *ICLR 2022*. (Parameter-efficient fine-tuning using low-rank weight updates.)
