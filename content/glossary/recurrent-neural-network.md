---
title: "Recurrent Neural Network"
description: "How RNNs, LSTMs, and GRUs process sequential data, the vanishing gradient problem, and where recurrent models still apply."
date: 2026-03-28
categories: [Glossary]
tags: [RNN, LSTM, GRU, sequence-modeling, deep-learning]
related:
  - glossary/transformer-architecture
  - glossary/state-space-model
  - glossary/temporal-convolutional-network
  - glossary/neural-network
last_updated: 2026-05-30
---

A recurrent neural network (RNN) is a neural architecture that processes sequential data by maintaining a hidden state that carries information from previous time steps. At each step, the network takes the current input and the prior hidden state to produce an output and an updated state. This makes RNNs naturally suited to time series, speech, and language tasks where order matters.

## How It Works

The basic RNN applies the same weight matrices at every time step, creating a chain of computations across the sequence. However, standard RNNs struggle with long sequences because gradients either vanish (shrink to near zero) or explode (grow uncontrollably) during backpropagation through time.

**Long Short-Term Memory (LSTM)** networks address this with a gating mechanism: input, forget, and output gates control what information to store, discard, or pass forward in a dedicated cell state. This allows LSTMs to maintain relevant context over hundreds of time steps. **Gated Recurrent Units (GRUs)** simplify the LSTM by merging the cell state and hidden state, using only reset and update gates, which reduces parameters while achieving comparable performance on many tasks.

## Why It Matters

RNNs were the dominant architecture for sequence modeling before transformers. They powered early machine translation (seq2seq models), speech recognition, and text generation. Understanding RNNs remains important because many production systems in time-series forecasting, sensor data processing, and embedded applications still use LSTM or GRU variants, particularly where low latency and small model size are required.

## Practical Considerations

RNNs process tokens sequentially, which limits training parallelism and makes them slower to train than transformers on large datasets. For new projects, transformers or state-space models are typically preferred for long sequences. However, RNNs remain competitive for short sequences on edge devices where model size is constrained. If maintaining a legacy RNN system, consider benchmarking against a small transformer or temporal convolutional network to evaluate whether migration offers meaningful improvements.

## Sources

1. Hochreiter, S. and Schmidhuber, J. (1997). "Long Short-Term Memory." *Neural Computation* 9(8), pp. 1735–1780., Foundational LSTM paper introducing the gating mechanism that solved the vanishing gradient problem in RNNs. [https://www.bioinf.jku.at/publications/older/2604.pdf](https://www.bioinf.jku.at/publications/older/2604.pdf)
2. Cho, K., van Merriënboer, B., Gulcehre, C., Bahdanau, D., Bougares, F., Schwenk, H., and Bengio, Y. (2014). "Learning Phrase Representations using RNN Encoder–Decoder for Statistical Machine Translation." *Proceedings of the 2014 Conference on Empirical Methods in Natural Language Processing (EMNLP).*, Introduced the GRU architecture and the encoder-decoder framework for machine translation. [https://arxiv.org/abs/1406.1078](https://arxiv.org/abs/1406.1078)
3. Bengio, Y., Simard, P., and Frasconi, P. (1994). "Learning Long-Term Dependencies with Gradient Descent is Difficult." *IEEE Transactions on Neural Networks* 5(2), pp. 157–166., Theoretical analysis of the vanishing gradient problem that LSTMs were designed to solve.
