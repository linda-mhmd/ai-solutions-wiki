---
title: "Vision Transformer"
description: "How Vision Transformers (ViT) apply the transformer architecture to image recognition by treating images as sequences of patches."
date: 2026-03-28
categories: [Glossary]
tags: [ViT, vision-transformer, computer-vision, deep-learning, image-recognition]
related:
  - glossary/transformer-architecture
  - glossary/convolutional-neural-network
  - glossary/attention-mechanism
  - glossary/computer-vision
last_updated: 2026-05-30
---

A Vision Transformer (ViT) applies the transformer architecture, originally designed for text, to image recognition tasks. Instead of processing pixels through convolutional filters, ViT divides an image into fixed-size patches, linearly embeds each patch, and processes the resulting sequence with a standard transformer encoder. This approach demonstrated that pure transformer architectures can match or exceed CNN performance on image classification when trained with sufficient data.

## How It Works

An input image is split into non-overlapping patches (typically 16x16 pixels). Each patch is flattened and projected through a linear layer to produce a patch embedding. A learnable classification token is prepended to the sequence, and positional embeddings are added to retain spatial information. The sequence then passes through multiple transformer encoder layers with multi-head self-attention and feed-forward networks. The final representation of the classification token is used for prediction.

ViT's self-attention allows every patch to attend to every other patch from the first layer, giving it a global receptive field that CNNs achieve only through deep stacking. Variants include **DeiT** (data-efficient training with distillation), **Swin Transformer** (shifted window attention for hierarchical features), and **BEiT** (self-supervised pre-training using masked image modeling).

## Why It Matters

ViT unified the architecture paradigm across vision and language, enabling multimodal models that share the same backbone for both modalities. This convergence simplifies engineering, allows shared infrastructure, and facilitates models like CLIP that jointly understand images and text. ViT variants now power image classification, object detection, segmentation, and medical imaging at scale.

## Practical Considerations

ViTs require large datasets or strong pre-training to outperform CNNs. For smaller datasets, CNNs or hybrid CNN-transformer architectures often perform better. Swin Transformer provides a good balance between ViT's global attention and CNN-like hierarchical processing. Pre-trained ViT models from timm and Hugging Face transfer well to domain-specific tasks. Consider inference cost: ViT attention scales quadratically with the number of patches, so higher-resolution inputs are significantly more expensive than with CNNs.

## Sources

- Dosovitskiy, A., et al. (2021). An image is worth 16x16 words: Transformers for image recognition at scale. *ICLR 2021*. (Original ViT paper; demonstrated pure transformer architectures match CNN performance at scale.)
- Liu, Z., et al. (2021). Swin Transformer: Hierarchical vision transformer using shifted windows. *ICCV 2021*. (Swin; extended ViT to dense prediction tasks with hierarchical shifted-window attention.)
- Touvron, H., et al. (2021). Training data-efficient image transformers & distillation through attention. *ICML 2021*. (DeiT; showed ViTs can train competitively on ImageNet-1k alone using distillation.)
- Bao, H., Dong, L., & Wei, F. (2022). BEiT: BERT pre-training of image transformers. *ICLR 2022*. (BEiT; self-supervised ViT pre-training via masked image modeling, paralleling BERT for vision.)
