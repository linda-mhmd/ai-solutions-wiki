---
title: "Kolmogorov-Arnold Network"
description: "How KANs replace fixed activation functions with learnable functions on edges, offering interpretable and efficient alternatives to standard MLPs."
date: 2026-03-28
categories: [Glossary]
tags: [KAN, neural-network, activation-function, interpretability, deep-learning]
related:
  - glossary/neural-network
  - glossary/activation-function
  - glossary/deep-learning
  - glossary/neural-architecture-search
last_updated: 2026-05-30
---

A Kolmogorov-Arnold Network (KAN) is a neural network architecture based on the Kolmogorov-Arnold representation theorem, which states that any continuous multivariate function can be decomposed into sums and compositions of univariate functions. Unlike standard multi-layer perceptrons (MLPs), which use fixed activation functions on nodes, KANs place learnable activation functions on edges (connections between nodes), with nodes performing only summation.

## How It Works

In a traditional MLP, each neuron applies a fixed nonlinear function (like ReLU or GELU) after computing a weighted sum of its inputs. In a KAN, each connection between layers has its own learnable univariate function, typically represented as a B-spline. The node simply sums the outputs of all incoming edge functions. This means a KAN with n inputs and m outputs in a single layer learns n*m separate univariate functions rather than m activation functions applied to linear combinations.

The B-spline parameterization allows each edge function to be an arbitrary smooth curve, giving KANs much more expressive power per parameter than MLPs. The learnable activation functions can also be inspected and symbolically regressed, making KANs more interpretable. Researchers have extracted known scientific formulas from trained KAN models by examining the learned edge functions.

## Why It Matters

KANs offer two potential advantages: better parameter efficiency and improved interpretability. On scientific and mathematical tasks, KANs have achieved comparable accuracy to MLPs with significantly fewer parameters. Their interpretability makes them particularly valuable in scientific discovery, where understanding the learned function matters as much as prediction accuracy. KANs represent a fundamental rethinking of neural network design, moving expressiveness from nodes to edges.

## Practical Considerations

KANs are still early-stage technology. Training is slower than MLPs due to the overhead of B-spline computation, and scaling to the sizes used in modern deep learning remains an open research question. Current implementations (pykan, efficient-kan) work well for small to medium-scale problems. For production systems, KANs are most promising as components within larger architectures or for scientific modeling tasks where interpretability is essential. They are not yet a practical replacement for MLPs in large-scale language or vision models.

## Sources

- Kolmogorov, A.N. (1957). On the representation of continuous functions of many variables by superposition of continuous functions of one variable and addition. *Doklady Akademii Nauk SSSR, 114*(5), 953–956. (Kolmogorov's original representation theorem.)
- Arnold, V.I. (1963). On functions of three variables. *American Mathematical Society Translations, 28*, 51–54. (Arnold's completion of the Kolmogorov-Arnold theorem.)
- Liu, Z., et al. (2024). KAN: Kolmogorov-Arnold Networks. *arXiv:2404.19756*. (Original KAN paper introducing learnable B-spline activations on edges.)
