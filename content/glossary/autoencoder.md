---
title: "Autoencoder"
description: "What autoencoders are, how they learn compressed data representations, and practical applications in anomaly detection and dimensionality reduction."
date: 2026-03-28
categories: [Glossary]
tags: [autoencoder, deep-learning, dimensionality-reduction, anomaly-detection, representation-learning]
related:
  - glossary/neural-network
  - glossary/dimensionality-reduction
  - glossary/deep-learning
last_updated: 2026-05-30
---

An autoencoder is a neural network trained to reconstruct its input through a bottleneck layer. The network has two halves: an encoder that compresses the input into a lower-dimensional representation (the latent space), and a decoder that reconstructs the original input from that compressed representation. By forcing information through a bottleneck, the autoencoder learns to capture the most important features of the data.

## How It Works

The encoder maps high-dimensional input (an image, a transaction record, a sensor reading) to a compact latent vector. The decoder maps that latent vector back to the original dimensionality. The network is trained to minimize reconstruction error - the difference between the input and its reconstruction.

**Variational autoencoders (VAEs)** add a probabilistic twist: the latent space is constrained to follow a known distribution (typically Gaussian), enabling generation of new data by sampling from the latent space.

**Denoising autoencoders** are trained to reconstruct clean inputs from corrupted versions, learning robust representations that ignore noise.

## Practical Applications

**Anomaly detection** is the most common enterprise application. Train the autoencoder on normal data. At inference time, anomalous inputs (fraud, defects, intrusions) produce high reconstruction error because the model has never learned to represent them. This works well for fraud detection, manufacturing quality control, and infrastructure anomaly detection.

**Dimensionality reduction** compresses high-dimensional data for visualization, storage, or as features for downstream models. Autoencoders can capture non-linear relationships that PCA misses.

**Data denoising** removes noise from signals, images, or sensor data by training on clean-noisy pairs.

## When to Use Autoencoders

Autoencoders are most valuable when you need anomaly detection without labeled anomaly examples, when you need to compress data while preserving important structure, or when you need to generate variations of existing data. For pure generative tasks, diffusion models and GANs typically produce higher-quality output. For simple dimensionality reduction on tabular data, PCA may be sufficient and more interpretable.

## Sources

- Rumelhart, D.E., Hinton, G.E., & Williams, R.J. (1986). Learning representations by back-propagating errors. *Nature, 323*, 533–536. (Autoencoder concept introduced as part of backpropagation framework.)
- Vincent, P., et al. (2008). Extracting and composing robust features with denoising autoencoders. *ICML 2008*. (Denoising autoencoders; learning robust representations from corrupted inputs.)
- Kingma, D.P., & Welling, M. (2014). Auto-encoding variational Bayes. *International Conference on Learning Representations (ICLR)*. (VAE original paper; probabilistic latent space for generation.)
- Hawkins, S., et al. (2002). Outlier detection using replicator neural networks. *Data Warehousing and Knowledge Discovery*, 170–180. (Reconstruction error for anomaly detection.)
