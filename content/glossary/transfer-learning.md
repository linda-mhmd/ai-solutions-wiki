---
title: "Transfer Learning"
description: "What transfer learning is, how pre-trained models reduce training costs, and when to fine-tune versus train from scratch."
date: 2026-03-28
categories: [Glossary]
tags: [transfer-learning, fine-tuning, pre-training, foundation-models, machine-learning]
related:
  - glossary/fine-tuning
  - glossary/foundation-models
  - glossary/few-shot-learning
  - glossary/deep-learning
last_updated: 2026-05-30
---

Transfer learning is a technique where a model trained on one task is reused as the starting point for a different but related task. Instead of training from scratch on your specific data, you start with a model that has already learned general features from a large dataset and adapt it to your domain.

## How It Works

A model pre-trained on a large, general-purpose dataset (ImageNet for vision, internet text for language) has already learned useful representations: edges and textures for images, grammar and world knowledge for text. Transfer learning takes this pre-trained model and either uses it directly as a feature extractor or fine-tunes it on your specific dataset with a much smaller amount of task-specific data.

**Feature extraction** freezes the pre-trained model weights and trains only a new output layer on your data. This is fast, requires little data, and works when your task is similar to the pre-training task.

**Fine-tuning** unfreezes some or all layers and trains the entire model on your data with a low learning rate. This adapts the learned representations to your domain and typically achieves better performance, but requires more data and compute.

## Why It Matters

Transfer learning is the reason modern AI is accessible to organizations without massive datasets or GPU clusters. Instead of needing millions of labeled images to build an image classifier, you can fine-tune a pre-trained model with hundreds of examples. Instead of training a language model from scratch (costing millions of dollars), you can fine-tune or prompt-engineer an existing foundation model.

## Practical Application

Most enterprise AI work today is transfer learning in some form. When you use Amazon Bedrock to call Claude or use a pre-trained embedding model for RAG, you are leveraging transfer learning - someone else invested the compute to pre-train the model, and you adapt its capabilities to your use case through prompting, fine-tuning, or retrieval augmentation.

The decision framework: start with prompt engineering (zero transfer learning cost), move to few-shot prompting, then RAG, then fine-tuning, and only train from scratch if none of those approaches meet your quality requirements.

## Sources

- Pan, S.J., & Yang, Q. (2010). A survey on transfer learning. *IEEE Transactions on Knowledge and Data Engineering, 22*(10), 1345–1359. (Comprehensive survey formalizing transfer learning terminology and taxonomy.)
- Yosinski, J., et al. (2014). How transferable are features in deep neural networks? *NeurIPS 2014*. (Empirical analysis of which layers transfer and which are task-specific.)
- Howard, J., & Ruder, S. (2018). Universal language model fine-tuning for text classification. *ACL 2018*. (ULMFiT; established fine-tuning pre-trained LMs as the standard NLP transfer learning paradigm.)
