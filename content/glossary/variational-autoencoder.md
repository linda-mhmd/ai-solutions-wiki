---
title: "Variational Autoencoder"
description: "How VAEs learn structured latent spaces for generation, interpolation, and representation learning."
date: 2026-03-28
categories: [Glossary]
tags: [VAE, generative-models, latent-space, deep-learning, unsupervised-learning]
related:
  - glossary/autoencoder
  - glossary/gan
  - glossary/diffusion-models
  - glossary/deep-learning
last_updated: 2026-05-30
---

A variational autoencoder (VAE) is a generative model that learns a compressed, continuous latent representation of data. Unlike standard autoencoders that map inputs to fixed points in latent space, VAEs map inputs to probability distributions, enabling smooth interpolation and meaningful generation of new samples.

## How It Works

A VAE consists of an encoder and a decoder. The encoder maps an input (such as an image) to the parameters of a probability distribution, typically a Gaussian defined by a mean and variance vector. During training, a latent vector is sampled from this distribution using the reparameterization trick, which allows gradients to flow through the sampling operation. The decoder then reconstructs the input from the sampled latent vector.

The training objective combines two terms: a reconstruction loss (how well the decoder recreates the input) and a KL divergence term (how close the learned distributions are to a standard normal prior). This regularization prevents the latent space from collapsing into disconnected clusters and ensures that nearby points in latent space produce similar outputs.

## Why It Matters

VAEs provide a principled framework for learning latent representations with a well-defined probabilistic interpretation. They enable applications such as image generation, anomaly detection (by measuring reconstruction error), drug molecule design (by interpolating in chemical latent space), and data augmentation. Unlike GANs, VAEs offer stable training and explicit density estimation, though they typically produce slightly blurrier outputs.

## Practical Considerations

For production use, VAEs excel when the goal is representation learning or anomaly detection rather than photorealistic generation. They are easier to train than GANs and provide a natural anomaly score via reconstruction error. Modern variants like VQ-VAE (used in image and audio tokenization) and hierarchical VAEs have significantly improved generation quality. Many contemporary systems use VAE-style encoders as components within larger architectures, such as the latent space in Stable Diffusion.

## Sources

- Kingma, D. P., & Welling, M. (2014). Auto-encoding variational Bayes. *ICLR 2014*. (Original VAE paper; introduced the reparameterization trick and the ELBO training objective.)
- Rezende, D. J., Mohamed, S., & Wierstra, D. (2014). Stochastic backpropagation and approximate inference in deep generative models. *ICML 2014*. (Concurrent VAE derivation; independently introduced the same reparameterization approach.)
- van den Oord, A., & Vinyals, O. (2017). Neural discrete representation learning (VQ-VAE). *NeurIPS 2017*. (VQ-VAE; introduced vector-quantized latent spaces used in DALL-E, Stable Diffusion, and audio tokenization.)
