---
title: "Neural Network"
description: "What neural networks are, how they learn from data, and where they fit in modern AI system architecture."
date: 2026-03-28
categories: [Glossary]
tags: [neural-network, deep-learning, machine-learning, AI]
related:
  - glossary/deep-learning
  - glossary/activation-function
  - glossary/backpropagation
  - glossary/loss-function
last_updated: 2026-05-30
---

A neural network is a computational model inspired by biological neurons, consisting of layers of interconnected nodes (neurons) that learn to map inputs to outputs by adjusting connection weights during training. Neural networks are the foundation of modern AI, powering everything from image recognition to language models.


<figure class="bz-figure">
  <img src="/img/dark-cherry/gears-mechanism.png" alt="Dark industrial gears interlocked under red light: each component transforming motion from the previous layer and passing it forward." loading="lazy">
  <figcaption>A neural network is layers of transformations. Each layer receives the output of the last, applies weights, and passes its result forward. Like gears, the meaning emerges from the chain, not any single component.</figcaption>
</figure>

## How It Works

A neural network has three types of layers: an input layer (receives raw data), one or more hidden layers (perform computations), and an output layer (produces predictions). Each neuron receives inputs, multiplies them by learned weights, adds a bias term, and passes the result through an activation function that introduces non-linearity.

During training, the network processes examples, compares its predictions to correct answers using a loss function, and adjusts weights via backpropagation to reduce the error. This process repeats over many iterations (epochs) until the network achieves acceptable accuracy on held-out validation data.

## Types of Neural Networks

**Feedforward networks** pass information in one direction, input to output. They are the simplest form and work for tabular data and basic classification.

**Convolutional neural networks (CNNs)** use spatial filters to detect patterns in images and are the standard for computer vision tasks.

**Recurrent neural networks (RNNs)** process sequential data by maintaining internal state, though they have been largely supplanted by transformers for most sequence tasks.

**Transformers** use attention mechanisms to process sequences in parallel and are the architecture behind modern language models.

## Why It Matters

For technical leaders, neural networks are the building block of nearly every AI capability your organization will deploy. You rarely build neural networks from scratch - instead, you use pre-trained foundation models or fine-tune existing architectures. Understanding the fundamentals helps you evaluate tradeoffs: model size versus inference cost, training data requirements, and the distinction between what neural networks learn well (pattern recognition, generation) and what they struggle with (precise arithmetic, guaranteed factual accuracy).

## When to Use Neural Networks

Neural networks excel when you have large amounts of data, the relationships between inputs and outputs are complex and non-linear, and you can tolerate probabilistic rather than deterministic outputs. For small datasets or problems requiring interpretable decisions, simpler models (logistic regression, decision trees) may be more appropriate.

## Sources

1. Rosenblatt, F. (1958). "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain." *Psychological Review* 65(6), pp. 386–408., Introduced the perceptron, the single-neuron predecessor to multi-layer neural networks.
2. Rumelhart, D.E., Hinton, G.E., and Williams, R.J. (1986). "Learning Representations by Back-propagating Errors." *Nature* 323, pp. 533–536., Established backpropagation for multi-layer networks; the paper that made neural network training practical.
3. LeCun, Y., Bottou, L., Bengio, Y., and Haffner, P. (1998). "Gradient-Based Learning Applied to Document Recognition." *Proceedings of the IEEE* 86(11), pp. 2278–2324., Introduced LeNet and demonstrated convolutional neural networks on digit recognition; foundational CNN paper. [http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf](http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf)
4. Goodfellow, I., Bengio, Y., and Courville, A. (2016). *Deep Learning.* MIT Press., Comprehensive graduate-level textbook covering neural network theory, architectures, and training; freely available online at [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/)
