---
title: "Positional Encoding"
description: "How transformers represent sequence order using sinusoidal, rotary (RoPE), and ALiBi positional encoding schemes."
date: 2026-03-28
categories: [Glossary]
tags: [positional-encoding, RoPE, ALiBi, transformer, attention]
related:
  - glossary/transformer-architecture
  - glossary/attention-mechanism
  - glossary/long-context-model
  - glossary/embeddings
last_updated: 2026-05-30
---

Positional encoding is the mechanism that gives transformer models a sense of token order. Since self-attention treats its input as a set (with no inherent notion of position), positional information must be explicitly injected. The choice of positional encoding scheme affects a model's ability to generalize to sequence lengths not seen during training, which directly impacts context window capabilities.

## How It Works

**Sinusoidal encodings**, introduced in the original transformer paper, add fixed sine and cosine functions of different frequencies to each position. Each dimension uses a different frequency, creating a unique pattern for every position. While elegant, these encodings do not naturally extend to lengths beyond training.

**Learned positional embeddings** train a separate embedding vector for each position (up to a maximum length). This is simple and effective but strictly bounds the context window to the trained length.

**Rotary Position Embedding (RoPE)** encodes position by rotating query and key vectors in pairs of dimensions. The rotation angle is proportional to the position, so the dot product between queries and keys naturally encodes their relative distance. RoPE enables better length generalization and is used in LLaMA, Mistral, and many modern LLMs. Techniques like YaRN and NTK-aware scaling extend RoPE to longer contexts by adjusting rotation frequencies.

**ALiBi** (Attention with Linear Biases) takes a different approach: instead of modifying embeddings, it adds a linear penalty to attention scores based on the distance between tokens. This requires no additional parameters and generalizes well to longer sequences than seen in training.

## Why It Matters

Positional encoding determines a model's effective context window. The shift from learned embeddings to RoPE and ALiBi is what enabled the jump from 2K-4K token contexts to 100K+ tokens. For technical decision-makers, understanding positional encoding explains why some models can be extended to longer contexts through fine-tuning while others cannot.

## Practical Considerations

When selecting or fine-tuning models, check which positional encoding is used. RoPE-based models can often be extended to longer contexts with relatively cheap fine-tuning using scaling techniques. ALiBi models generalize to moderate length extensions without any fine-tuning. These properties influence total cost of ownership for applications requiring long-context processing.

## Sources

- Vaswani, A., et al. (2017). Attention is all you need. *NeurIPS 2017*. (Introduced sinusoidal positional encodings in the original transformer.)
- Su, J., et al. (2024). RoFormer: Enhanced transformer with rotary position embedding. *Neurocomputing, 568*. (RoPE; relative position encoding through rotation.)
- Press, O., Smith, N.A., & Lewis, M. (2022). Train short, test long: Attention with linear biases enables input length extrapolation. *ICLR 2022*. (ALiBi; position-based attention bias for length generalization.)
- Peng, B., et al. (2023). YaRN: Efficient context window extension of large language models. *arXiv:2309.00071*. (YaRN; RoPE scaling technique for extending trained context limits.)
