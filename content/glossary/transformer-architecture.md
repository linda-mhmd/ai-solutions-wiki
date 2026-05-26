---
title: "Transformer Architecture"
description: "What the transformer architecture is, how it differs from prior approaches, and why it dominates modern AI systems."
date: 2026-03-28
categories: [Glossary]
tags: [transformer, attention, deep-learning, NLP, foundation-models]
related:
  - glossary/attention-mechanism
  - glossary/llm
  - glossary/foundation-models
  - glossary/neural-network
---

The transformer is a neural network architecture introduced in the 2017 paper "Attention Is All You Need" by Vaswani et al. It processes input sequences entirely through attention mechanisms, without recurrence or convolution. Virtually all modern large language models (GPT, Claude, Llama, Gemini) are built on transformer variants.

## How It Works

A transformer consists of an encoder (processes input) and a decoder (produces output), though many modern models use only one half. Each layer contains two sub-components: a multi-head self-attention mechanism and a feed-forward neural network. Layer normalization and residual connections stabilize training.

The input sequence is first converted to embeddings, then augmented with positional encodings (since attention has no inherent sense of order). These representations pass through multiple transformer layers, each refining the representation by attending to relevant context.

**Encoder-only models** (BERT) process the full input bidirectionally and are used for classification, extraction, and embedding tasks. **Decoder-only models** (GPT, Claude) process tokens left-to-right and are used for text generation. **Encoder-decoder models** (T5, original transformer) are used for translation and summarization.

## Why It Matters

The transformer's key advantage is parallelism. Unlike RNNs that process tokens sequentially, transformers process all positions simultaneously during training. This enables training on massive datasets using GPU clusters, which directly led to the scaling of foundation models.

For technical decision-makers, the transformer architecture determines the cost and capability profile of AI systems. Context window length, inference latency, and memory requirements all derive from transformer design choices. Understanding these tradeoffs informs decisions about model selection, infrastructure sizing, and cost management.

## Practical Considerations

Transformer inference cost scales with sequence length. Longer context windows require more memory and compute. Techniques like KV-cache optimization, quantization, and sparse attention are engineering responses to these constraints. When evaluating AI platforms, understanding that longer contexts cost more - both in latency and dollars - helps set realistic expectations for production workloads.

## Sources

1. Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L., and Polosukhin, I. (2017). "Attention Is All You Need." *Advances in Neural Information Processing Systems 30 (NIPS 2017).*, Original transformer paper introducing self-attention, multi-head attention, and positional encoding; the architecture underlying GPT, BERT, Claude, and all modern LLMs. [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
2. Devlin, J., Chang, M.-W., Lee, K., and Toutanova, K. (2018). "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding." *arXiv:1810.04805.*, Introduced masked language modeling for encoder-only transformers; established pre-training + fine-tuning as the dominant NLP paradigm. [https://arxiv.org/abs/1810.04805](https://arxiv.org/abs/1810.04805)
3. Brown, T. et al. (2020). "Language Models are Few-Shot Learners." *Advances in Neural Information Processing Systems 33 (NeurIPS 2020).*, GPT-3 paper demonstrating in-context learning at scale; first demonstration that large decoder-only transformers exhibit emergent few-shot capabilities. [https://arxiv.org/abs/2005.14165](https://arxiv.org/abs/2005.14165)
