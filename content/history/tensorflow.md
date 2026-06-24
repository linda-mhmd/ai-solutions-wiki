---
title: "TensorFlow (2015)"
description: "Google's open-source machine learning framework for building and training neural networks, the 2015 release that made large-scale deep learning broadly accessible."
date: 2026-06-23
categories: [History]
tags: [computing-history, tensorflow, machine-learning, deep-learning, neural-networks, open-source, google]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/fortran
  - history/integrated-circuit
  - history/sql
faqs:
  - question: "Who created TensorFlow and when was it released?"
    answer: "The Google Brain team built TensorFlow and Google released it as open source on 9 November 2015 under the Apache 2.0 licence. It grew out of an earlier internal system called DistBelief, which Google used from 2011 to train large neural networks across its data centres. DistBelief was tied to Google's infrastructure and hard to share. TensorFlow was a clean redesign meant to be portable, faster, and usable both inside and outside Google. Releasing it freely was a deliberate move to set a standard and attract a community of researchers and engineers."
  - question: "What does the name TensorFlow mean?"
    answer: "The name describes how the framework works. A tensor is a multi-dimensional array of numbers, the basic unit of data in machine learning. An image, a batch of text, or a layer's weights are all tensors. A program in TensorFlow is a graph of operations, and tensors flow through that graph from one operation to the next. So TensorFlow literally means tensors flowing through a computation graph. That graph can then run on a CPU, a GPU, or specialised hardware without changing your code."
  - question: "Is TensorFlow still used in 2026?"
    answer: "Yes. TensorFlow is active and maintained, with regular releases from Google and a large open-source community. It runs in production at many companies and powers a huge amount of deployed machine learning, especially on mobile and edge devices through TensorFlow Lite and in browsers through TensorFlow.js. In research, PyTorch has become the more popular choice for new work. TensorFlow remains strong for production serving, deployment tooling, and existing systems built over the past decade. The two frameworks now share many ideas."
---

TensorFlow is Google's open-source framework for building and training neural networks. The Google Brain team released it on 9 November 2015 under a permissive licence. By giving away a fast, portable, well-documented system, Google put large-scale deep learning within reach of researchers, students, and companies who could never have built such tooling alone.

<figure class="bz-figure"><img src="/img/enterprise-dark/server-team-green-notext.png" alt="A dark server room with the silhouettes of a small team facing racks lit by green screen glow. The scene evokes the data-centre scale of compute that TensorFlow was designed to harness for training neural networks." loading="lazy"><figcaption>TensorFlow let the same model code run on a laptop or across a data centre full of accelerators.</figcaption></figure>

## What it was

Before TensorFlow, training a neural network often meant writing low-level code by hand. You had to manage the maths of each layer, the gradients used for learning, and the awkward business of spreading work across multiple processors. This was slow, error-prone, and out of reach for most teams.

TensorFlow handled the hard parts. You described your model as a graph of operations. Each node was a mathematical step, such as a matrix multiply or an activation function. Data, in the form of tensors, flowed between the nodes. A tensor is a multi-dimensional array, the natural shape for images, text batches, and the weights inside a model.

The key trick was automatic differentiation. Training a network means nudging millions of numbers in the right direction. TensorFlow worked out the gradients for the whole graph automatically, so you did not derive them by hand. The same graph then ran on a laptop CPU, a powerful GPU, or a cluster, with little change to your code.

Think of a recipe written as steps with clear inputs and outputs. Once the recipe exists, you can cook it in a home kitchen or scale it across a restaurant's whole brigade. TensorFlow was that portable recipe for neural networks, and it figured out the corrections needed to improve the dish each time.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Define</span><span class="bz-flow-step-desc">Describe the model as a graph of operations, with tensors as the data that flows between nodes.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Forward pass</span><span class="bz-flow-step-desc">Feed in data, run it through the graph, and produce a prediction.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Compute gradients</span><span class="bz-flow-step-desc">Automatic differentiation measures how wrong the prediction was and how each weight contributed.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Update and repeat</span><span class="bz-flow-step-desc">Adjust the weights, then loop over more data until the model learns the task.</span></div>
</div>

## Why it mattered

TensorFlow arrived at the right moment. Deep learning had recently proven itself on hard problems like image recognition, but the tools were fragmented. Releasing a polished, free framework from Google gave the field a common foundation. A graduate student and a large company could now use the same system.

It made deep learning portable across hardware. The same model ran on a CPU for quick tests, then on GPUs for serious training. Google later built custom chips called Tensor Processing Units, or TPUs, designed to run TensorFlow workloads quickly. The framework hid the differences so you focused on the model, not the machine.

The open-source choice was strategic and effective. A large community formed fast. People wrote tutorials, shared models, and reported bugs. TensorFlow became a default teaching tool and a resume skill. The launch helped trigger a wave of competing and complementary frameworks, raising the quality of machine-learning tooling across the industry.

## How it connects to AI today

TensorFlow's core ideas now sit at the heart of nearly every AI system. Modern models, including the large language models behind today's chatbots, are still graphs of tensor operations trained by automatic differentiation across many accelerators. That is the exact shape of problem TensorFlow popularised. The vocabulary of tensors, graphs, and gradients is now standard.

The framework also evolved. Early TensorFlow forced you to build a static graph before running it, which felt rigid. Version 2.0, released in 2019, made "eager execution" the default, so code runs step by step like ordinary Python. It absorbed the friendly Keras API as its main interface. These changes mirrored what made the rival framework PyTorch pleasant to use, and the two now share many concepts.

A builder meets TensorFlow's family constantly. TensorFlow Lite runs models on phones, so on-device features like speech and image recognition often ship through it. TensorFlow.js runs models in a web browser with no server. TensorFlow Serving and the wider TFX toolkit handle deployment, the unglamorous work of putting a trained model into production reliably. Much of Google's own AI, and a large slice of mobile machine learning, runs on this stack.

The hardware story continues too. TPUs, born to accelerate TensorFlow, now train and serve some of the largest models in the world, including parts of Google's own foundation models. So even when you use a different framework, you often run it on infrastructure shaped by TensorFlow's design choices. The line from a 2015 graph engine to a 2026 training cluster is direct.

## Still in use today

TensorFlow is active and maintained. Google ships regular releases, and a broad community contributes code, fixes, and models. It remains one of the most widely deployed machine-learning frameworks, with particular strength in production, mobile, and browser settings where its deployment tooling is mature and well tested.

Its position has shifted, though. For new research and experimentation, PyTorch has overtaken it as the more common choice, valued for its flexibility and its head start on eager-style coding. Many papers and tutorials now assume PyTorch. TensorFlow responded by adopting eager execution and Keras, narrowing the gap in everyday use.

So TensorFlow persists for clear reasons. A decade of production systems are built on it, and rewriting working software carries risk and cost. Its deployment path from training to phones, browsers, and servers is hard to beat. And its conceptual legacy, tensors flowing through differentiable graphs on flexible hardware, is now the foundation of how modern AI works, whichever framework you open.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where TensorFlow sits in the broader story of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how machine-learning foundations connect to modern AI topics.
- [FORTRAN (1957)](/history/fortran/): the language that first made numeric and scientific computing accessible, a distant ancestor of model code.
- [The integrated circuit (1958)](/history/integrated-circuit/): the chip lineage that leads to the GPUs and TPUs TensorFlow runs on.
- [TensorFlow official site](https://www.tensorflow.org/): documentation, tutorials, and guides for every part of the framework.
- [TensorFlow white paper, 2015](https://arxiv.org/abs/1603.04467): the original design paper describing the system and its goals.
- [TensorFlow on Wikipedia](https://en.wikipedia.org/wiki/TensorFlow): history, architecture, and ecosystem overview with sources.
