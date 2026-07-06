---
title: "Diffusion Language Model (dLLM)"
description: "A non-autoregressive approach to text generation that produces tokens by iteratively denoising a masked or noised sequence in parallel, rather than one token at a time."
date: 2026-07-06
lastmod: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "llm", "generation", "diffusion"]
related:
  - glossary/diffusion-models
  - glossary/transformer-architecture
  - glossary/inference
  - glossary/reasoning-models
last_updated: 2026-07-06
---

A diffusion language model (dLLM) is a non-autoregressive approach to text generation. Instead of predicting one token at a time from left to right, it produces a whole sequence by iteratively denoising a noised or masked sequence in parallel. Each refinement step can update many token positions at once, so the model can generate many tokens per step. This is a distinct paradigm from the autoregressive {{< relref "glossary/transformer-architecture" >}} that underpins most large language models, and it targets large speedups at generation time. Diffusion language models are a category rather than a single paper: the continuous-text-diffusion anchor is Diffusion-LM (Stanford, NeurIPS 2022), and a production example is Google DeepMind's Gemini Diffusion.

## How it works

An autoregressive model factorises text as a chain of next-token predictions, so it must decode sequentially. A diffusion language model borrows the denoising idea from diffusion models and applies it to sequences of text. It starts from a corrupted sequence - noised in a continuous latent space, or masked at the token level - and runs a series of denoising steps that progressively recover a clean sequence. Because each step operates on the full sequence, multiple positions are refined together rather than emitted one after another. Diffusion-LM demonstrated this on continuous representations of text and showed that the intermediate, gradually denoised states give a handle for fine-grained, controllable generation. The trade-off is a different compute profile at {{< relref "glossary/inference" >}} time: fewer sequential dependencies, more parallel updates per step.

## Why it matters

The practical draw is speed. Generating tokens in parallel, rather than strictly one at a time, lets a diffusion language model produce many tokens per step, which can translate into large end-to-end speedups for text generation. Google DeepMind's Gemini Diffusion is presented as an experimental model that uses this diffusion approach to text, illustrating that the paradigm is moving from research into production systems. Controllability is a second draw: the iterative denoising process exposes intermediate states that can be steered, which Diffusion-LM used for controllable text generation.

## Distinction from image diffusion

Diffusion language models share the denoising principle with image {{< relref "glossary/diffusion-models" >}}, but the target is discrete or latent text rather than pixels. The mechanism is adapted to sequences of tokens, and the goal is fluent, controllable language generation rather than image synthesis. Treat the two as siblings that share a training idea, not as the same model applied to a different medium.

## Origins and History

The continuous-text-diffusion anchor is Diffusion-LM, introduced by Xiang Lisa Li, John Thickstun, Ishaan Gulrajani, Percy Liang, and Tatsunori Hashimoto at Stanford and published at NeurIPS 2022. That work applied a continuous diffusion process to text representations and showed it improves controllable text generation. The paradigm later appeared in production systems: Google DeepMind's Gemini Diffusion is a state-of-the-art experimental model that generates text with a diffusion approach rather than left-to-right autoregression, emphasising the parallel-generation speed advantage.

## Sources

1. Li, X. L., Thickstun, J., Gulrajani, I., Liang, P., Hashimoto, T. (Stanford). *Diffusion-LM Improves Controllable Text Generation.* NeurIPS 2022. arXiv:2205.14217. [https://arxiv.org/abs/2205.14217](https://arxiv.org/abs/2205.14217)
2. Google DeepMind. *Gemini Diffusion.* [https://deepmind.google/models/gemini-diffusion/](https://deepmind.google/models/gemini-diffusion/)
