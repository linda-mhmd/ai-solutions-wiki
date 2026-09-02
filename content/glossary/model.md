---
title: "Machine Learning Model"
description: "A machine learning model is the artefact produced by training: a fixed architecture plus the numeric parameters learned from data, which together turn an input into a prediction. The distinction between architecture, weights, and the deployable artefact is what most model operations depend on."
date: 2026-09-02
categories: [Glossary]
tags: [machine-learning, model, weights, parameters, inference, training, model-artifact]
related:
  - glossary/foundation-models
  - glossary/neural-network
  - glossary/inference
  - glossary/model-registry
last_updated: 2026-09-02
---

A **machine learning model** is what training produces. It has two parts: an **architecture**, which is the fixed structure defining how an input is transformed into an output, and **parameters** (also called weights), which are the numbers inside that structure, learned from data. Running an input through the architecture using those parameters is [inference](/glossary/inference/). Everything else in machine learning operations — versioning, registries, deployment, fine-tuning, distribution — is about managing this artefact.

## Core Concepts

**Architecture versus parameters.** The architecture is written by a human: a convolutional network, a [transformer](/glossary/transformer-architecture/), a diffusion U-Net. It is code, and it is usually small. The parameters are found by optimisation and are usually large — billions of floating-point numbers. Two models sharing one architecture but trained on different data are entirely different models. This is why "which architecture is it" and "which weights are these" are separate questions.

**Training versus inference.** During **training**, parameters are adjusted to reduce a [loss function](/glossary/loss-function/) over a dataset, typically by [gradient descent](/glossary/gradient-descent/) and [backpropagation](/glossary/backpropagation/). During **inference** the parameters are frozen and only the forward pass runs. Training is expensive and occasional; inference is cheap per call and continuous. Most production cost sits in inference because of volume.

**The model artefact.** In practice a model on disk is a set of files: the weights in a serialisation format, a configuration describing the architecture, and often a tokenizer or preprocessing definition. Common formats include `safetensors`, ONNX, and framework-native checkpoints. Anything reproducible needs the artefact plus its provenance — data, code version, hyperparameters — which is what a [model registry](/glossary/model-registry/) and [model lineage](/glossary/model-lineage-glossary/) exist to record.

**Parameter count is not capability.** Parameter count bounds memory and compute requirements, but says little on its own about quality. Training data, training compute, and post-training all matter as much or more. A model's precision also decides its footprint: the same parameter count at FP16, FP8, or 4-bit occupies very different memory, which is what [quantization](/glossary/quantization/) exploits.

**Models are statistical, not rule-based.** A model encodes correlations found in its training data. It has no notion of truth, and it degrades when production data drifts away from what it was trained on — the failure mode tracked as [data drift](/glossary/data-drift/) and [model drift](/glossary/model-drift/).

## Where the word gets overloaded

"Model" is used at several different scopes, and conflating them causes real confusion:

| Usage | What is actually meant |
|---|---|
| "Train a model" | Produce weights for an architecture from data |
| "Deploy the model" | Serve the artefact behind an endpoint |
| "Call the model" | Send a request to a hosted inference API |
| "A model like GPT or Claude" | A [foundation model](/glossary/foundation-models/): a large model pre-trained on broad data, adapted to many tasks |
| "Open-weight model" | The parameters are downloadable; the training data and code usually are not |

The last row is the one that most often misleads. Published weights make a model inspectable and self-hostable, subject to its licence and to whether you own hardware that can hold it. They do not make it reproducible, because reproducing it would require the data and the training run.

## Relationship to generative models

Generative models are ordinary models whose output is a sample from a learned distribution rather than a label or a number. A [diffusion model](/glossary/diffusion-models/) learns to reverse a noising process and generates an image by denoising from random noise; a large language model predicts a probability distribution over the next token and generates text by sampling from it repeatedly. In both cases the definition above still holds exactly: an architecture plus learned parameters, run forward.

## Sources

1. Goodfellow, I., Bengio, Y., Courville, A. *Deep Learning*. MIT Press, 2016. [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/)
2. Google. "Machine Learning Crash Course — descending into ML." [https://developers.google.com/machine-learning/crash-course](https://developers.google.com/machine-learning/crash-course)
3. Mitchell, M. et al. "Model Cards for Model Reporting." FAT* 2019. [https://arxiv.org/abs/1810.03993](https://arxiv.org/abs/1810.03993)
4. Hugging Face. "Safetensors: a safe and fast format for storing tensors." [https://huggingface.co/docs/safetensors/index](https://huggingface.co/docs/safetensors/index)
5. Bommasani, R. et al. "On the Opportunities and Risks of Foundation Models." Stanford CRFM, 2021. [https://arxiv.org/abs/2108.07258](https://arxiv.org/abs/2108.07258)
