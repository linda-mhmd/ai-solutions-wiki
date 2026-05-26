---
title: "Deep Learning"
description: "What deep learning is, how it differs from traditional machine learning, and when deep learning is the right approach for your problem."
date: 2026-03-28
categories: [Glossary]
tags: [deep-learning, neural-network, machine-learning, AI, GPU]
related:
  - glossary/neural-network
  - glossary/transformer-architecture
  - glossary/transfer-learning
  - glossary/supervised-learning
---

Deep learning is a subset of machine learning that uses neural networks with many layers (hence "deep") to automatically learn hierarchical representations from data. Unlike traditional machine learning, which requires manual feature engineering, deep learning models learn to extract features directly from raw inputs - pixels, text tokens, audio waveforms.

## How It Differs from Traditional ML

In traditional machine learning, a data scientist manually selects and engineers features (e.g., extracting edge histograms from images, computing TF-IDF scores from text). The model then learns a mapping from these hand-crafted features to predictions.

In deep learning, the lower layers of the network learn basic features (edges, simple patterns), middle layers compose these into higher-level features (shapes, phrases), and upper layers combine those into task-specific representations (objects, sentiment). This automatic feature hierarchy is why deep learning excels on unstructured data like images, text, and audio.

## When Deep Learning Is the Right Choice

Deep learning excels when you have large volumes of unstructured data (images, text, audio, video), the relationships in the data are complex and hierarchical, and you have sufficient compute resources for training. Modern foundation models are deep learning models, so most teams consume deep learning through APIs (Bedrock, OpenAI) rather than training models from scratch.

Deep learning is not the right choice when your dataset is small (hundreds of examples), you need fully interpretable decisions (regulatory requirements), or your data is structured and tabular (gradient-boosted trees often outperform deep learning on tabular data).

## Infrastructure Implications

Deep learning training requires GPU or specialized accelerator hardware. Inference can run on CPUs for smaller models but benefits from GPUs for larger ones. For most enterprise teams, the practical path is using managed AI services (Amazon Bedrock, SageMaker) rather than managing GPU infrastructure directly. When you do need custom training, spot instances and managed training jobs reduce cost significantly compared to on-demand GPU instances.

## Why It Matters

Deep learning is the technology behind the current AI wave. Understanding its strengths and limitations helps technical leaders make informed build-versus-buy decisions, set realistic expectations for AI project outcomes, and plan infrastructure budgets appropriately.

## Sources

1. LeCun, Y., Bengio, Y., and Hinton, G. (2015). "Deep Learning." *Nature* 521, pp. 436–444., Accessible overview of deep learning by its three principal architects; covers convolutional networks, RNNs, and the key ideas that distinguish deep from shallow learning. [https://doi.org/10.1038/nature14539](https://doi.org/10.1038/nature14539)
2. Goodfellow, I., Bengio, Y., and Courville, A. (2016). *Deep Learning.* MIT Press., Comprehensive textbook; standard graduate-level reference. Freely available at [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/)
3. Krizhevsky, A., Sutskever, I., and Hinton, G.E. (2012). "ImageNet Classification with Deep Convolutional Neural Networks." *NIPS 2012.*, AlexNet; the empirical demonstration that deep networks trained with GPUs substantially outperform classical computer vision, triggering the modern deep learning era. [https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html](https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)
