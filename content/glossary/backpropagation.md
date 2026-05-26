---
title: "Backpropagation"
description: "What backpropagation is, how it computes gradients for neural network training, and why it matters for understanding AI systems."
date: 2026-03-28
categories: [Glossary]
tags: [backpropagation, training, gradient-descent, neural-network, deep-learning]
related:
  - glossary/gradient-descent
  - glossary/loss-function
  - glossary/neural-network
  - glossary/deep-learning
---

Backpropagation (short for "backward propagation of errors") is the algorithm that computes how much each weight in a neural network contributed to the prediction error. It calculates the gradient of the loss function with respect to every weight by applying the chain rule of calculus, layer by layer, from the output back to the input.

## How It Works

Training a neural network involves two passes:

**Forward pass** - input data flows through the network, layer by layer, producing a prediction. The loss function compares this prediction to the true label, producing a single error value.

**Backward pass (backpropagation)** - starting from the loss, the algorithm computes the gradient (partial derivative) of the loss with respect to each weight. It works backward through the network: first the output layer weights, then the preceding layer, and so on. Each layer's gradients are computed using the chain rule, multiplying local gradients by the gradients already computed for later layers.

Once all gradients are computed, the optimizer (e.g., Adam, SGD) updates each weight in the direction that reduces the loss.

## Why It Matters

Backpropagation is what makes training deep neural networks possible. Without an efficient way to compute gradients for millions or billions of parameters, modern AI would not exist. Understanding backpropagation helps explain several practical phenomena:

**Vanishing gradients** - in very deep networks, gradients can become extremely small as they propagate backward, making early layers learn very slowly. This motivated architectural innovations like residual connections, batch normalization, and the transformer architecture.

**Exploding gradients** - conversely, gradients can grow exponentially, destabilizing training. Gradient clipping (capping gradient magnitude) is the standard mitigation.

**Memory requirements** - backpropagation requires storing intermediate activations from the forward pass to compute gradients. This is why training requires significantly more memory than inference and why batch size is limited by GPU memory.

## Practical Implications

For technical leaders, backpropagation is foundational context for understanding training costs. Training time, GPU memory requirements, and the feasibility of fine-tuning large models all derive from backpropagation's computational demands. Techniques like gradient checkpointing (recomputing activations instead of storing them) trade compute for memory, enabling fine-tuning of larger models on available hardware.

## Sources

1. Rumelhart, D.E., Hinton, G.E., and Williams, R.J. (1986). "Learning Representations by Back-propagating Errors." *Nature* 323, pp. 533–536., The paper that made backpropagation widely known and demonstrated it could train multi-layer networks to represent complex functions.
2. LeCun, Y., Boser, B., Denker, J.S., Henderson, D., Howard, R.E., Hubbard, W., and Jackel, L.D. (1989). "Backpropagation Applied to Handwritten Zip Code Recognition." *Neural Computation* 1(4), pp. 541–551., First successful application of backprop to convolutional networks on a real-world task; demonstrated the practical viability of the algorithm.
3. Baydin, A.G., Pearlmutter, B.A., Radul, A.A., and Siskind, J.M. (2018). "Automatic Differentiation in Machine Learning: a Survey." *Journal of Machine Learning Research* 18(153), pp. 1–43., Comprehensive survey of automatic differentiation (the computational framework that implements backpropagation in modern frameworks like PyTorch and JAX). [https://jmlr.org/papers/v18/17-468.html](https://jmlr.org/papers/v18/17-468.html)
