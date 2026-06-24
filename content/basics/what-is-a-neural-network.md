---
title: "What is a Neural Network?"
description: "A neural network is the core architecture behind modern AI. Plain-English explanation of how layers, weights, and backpropagation work, with no maths required."
date: 2026-06-22
level: 1
categories: [Basics]
tags: ["beginner", "neural-networks", "deep-learning", "machine-learning", "ai-basics"]
youtube_id: "aircAruvnKk"
youtube_title: "But what is a neural network? | Deep learning chapter 1"
youtube_channel: "3Blue1Brown"
docs: "https://playground.tensorflow.org"
docs_label: "TensorFlow Neural Network Playground (interactive)"
faqs:
  - question: "Why is it called a neural network?"
    answer: "The name comes from biological neurons in the brain. Biological neurons receive signals from other neurons, and if the combined signal is strong enough, they fire and pass a signal forward. Artificial neural networks loosely mimic this: each node (artificial neuron) receives numeric inputs, multiplies them by learned weights, adds them together, and produces an output. The similarity is at the conceptual level; artificial neural networks do not actually work like the brain in any biologically accurate sense."
  - question: "What is the difference between a neural network and deep learning?"
    answer: "Deep learning is neural networks with many layers: typically more than two hidden layers. Early neural networks had one or two layers and struggled with complex tasks. Deep networks with many layers can learn hierarchical features: low layers detect edges, middle layers detect shapes, high layers detect objects. 'Deep' specifically refers to the depth (number of layers). ChatGPT runs on a very deep neural network with billions of parameters."
  - question: "How does a neural network learn?"
    answer: "Through backpropagation. The network makes a prediction, compares it to the correct answer, calculates the error, and propagates that error backwards through the layers to adjust the weights. This adjustment is called a gradient descent step. Repeat this millions of times on millions of examples, and the weights gradually converge to values that produce correct predictions. The learning is entirely in the weight adjustments."
  - question: "What is a transformer and how does it relate to neural networks?"
    answer: "A transformer is a specific neural network architecture introduced in 2017 that underlies all modern large language models. It uses a mechanism called self-attention to process all parts of a sequence simultaneously rather than step by step. GPT-4, Claude, Llama, and Gemini are all transformer neural networks. The transformer is the dominant architecture for language, image (Vision Transformer), and audio tasks."
  - question: "How many neurons does a modern neural network have?"
    answer: "GPT-3 has 175 billion parameters (weights). Each parameter is a connection weight in the network. A network with 175 billion parameters has a rough equivalent of hundreds of billions of 'connections', vastly exceeding the 100-500 trillion synapses in the human brain in sheer number but utterly different in architecture and function."
---

{{< quickanswer >}}
A neural network is a mathematical system of connected nodes organised in layers that learns to map inputs to outputs by adjusting billions of internal numerical weights. It is the core architecture behind all modern AI: image recognition, language models, voice synthesis, and recommendation systems all run on neural networks. The "neural" comes from a loose analogy to neurons in the brain, but modern neural networks are best understood as very large, deeply layered mathematical functions.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/juggling/neural-network-nodes-notext.png" alt="White and grey interconnected circular nodes forming a neural network pattern on a dark background: layers of artificial neurons passing signals between them." loading="lazy">
  <figcaption>Each circle is a node (neuron). Each line is a connection with a learned weight. Signal flows left to right through the layers; learning flows right to left as errors are corrected.</figcaption>
</figure>

## The building block: a single neuron

A single artificial neuron does one simple thing:

1. Receives multiple numerical inputs (from the previous layer or from raw data)
2. Multiplies each input by a learned weight (how important this input is)
3. Adds all the results together
4. Applies an activation function (to introduce non-linearity)
5. Outputs a number to the next layer

```python
# One artificial neuron
def neuron(inputs, weights, bias):
    weighted_sum = sum(x * w for x, w in zip(inputs, weights)) + bias
    return relu(weighted_sum)  # activation function: return 0 if negative, value if positive

def relu(x):
    return max(0, x)
```

One neuron is trivial. A network of millions of neurons, organised in many layers, learns to represent extremely complex patterns.

## Layers: how networks get their power

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Input layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Raw data (pixels, tokens, numbers)</span>
      <span class="bz-arch-chip-note">One node per input feature. An image of 224x224 pixels = 150,528 input nodes (three colour channels).</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hidden layers (1 to 100+)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Feature detection</span>
      <span class="bz-arch-chip">Pattern abstraction</span>
      <span class="bz-arch-chip">Hierarchical representation</span>
      <span class="bz-arch-chip-note">Each layer learns more abstract features than the one before it. "Deep" learning = many hidden layers.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Output layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Classification (one score per class)</span>
      <span class="bz-arch-chip">Next token probability (language models)</span>
      <span class="bz-arch-chip">Regression value</span>
    </div>
  </div>
</div>

## How learning works: backpropagation

Training a neural network is the process of finding the right values for all the weights, starting from random values.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Forward pass</span>
    <span class="bz-flow-step-name">Make a prediction</span>
    <span class="bz-flow-step-desc">Input data flows through all layers from left to right. The network produces an output: a predicted class, a next word, or a number.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Loss calculation</span>
    <span class="bz-flow-step-name">Measure the error</span>
    <span class="bz-flow-step-desc">Compare the prediction to the correct answer. The loss function quantifies how wrong the prediction was. Lower is better.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Backward pass</span>
    <span class="bz-flow-step-name">Assign blame to each weight</span>
    <span class="bz-flow-step-desc">Calculus tells us which weights contributed most to the error. This gradient information flows right to left through the network.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Weight update</span>
    <span class="bz-flow-step-name">Adjust and repeat</span>
    <span class="bz-flow-step-desc">Each weight is nudged slightly in the direction that reduces the loss. Repeat on millions of examples until the network predicts correctly.</span>
  </div>
</div>

## Types of neural networks

| Type | Input | Used for |
|---|---|---|
| **Feedforward (dense)** | Tabular data | Classification, regression on structured data |
| **Convolutional (CNN)** | Images, video | Image recognition, object detection, medical imaging |
| **Recurrent (RNN/LSTM)** | Sequences | Time series, older language models (pre-transformer) |
| **Transformer** | Text, images, audio | Language models (GPT, Claude, Llama), vision models, audio |
| **Diffusion model** | Noise | Image generation (Stable Diffusion, DALL-E 3) |
| **Graph neural network** | Graphs (molecules, networks) | Drug discovery, social network analysis, fraud detection |

## A concrete example: image classification

Training a neural network to classify handwritten digits (0-9):

```python
import torch
import torch.nn as nn

class DigitClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Flatten(),
            nn.Linear(784, 256),   # 28x28 pixel image → 256 hidden neurons
            nn.ReLU(),
            nn.Linear(256, 128),   # 256 → 128
            nn.ReLU(),
            nn.Linear(128, 10),    # 128 → 10 output classes (digits 0-9)
        )

    def forward(self, x):
        return self.layers(x)

model = DigitClassifier()
# Total parameters: 784*256 + 256 + 256*128 + 128 + 128*10 + 10 = 235,146
# Each parameter is one weight that will be learned during training
```

After training on 60,000 examples, this small network classifies handwritten digits with 98%+ accuracy. A transformer with billions of parameters applies the same core principle to vastly more complex tasks.

## Why this matters for understanding AI

Once you understand neural networks, the capabilities and limitations of modern AI make sense:

- **Why does it get better with more data?** More training examples mean more iterations of the weight-adjustment loop, producing better-tuned weights.
- **Why is it hard to explain?** There is no single "rule" to read out. Knowledge is distributed across millions of weights.
- **Why does it hallucinate?** The network learned to predict plausible output from training patterns. It has no external fact-checking mechanism.
- **Why is training expensive?** Millions of forward and backward passes through billions of parameters require thousands of specialised chips (GPUs/TPUs) running for weeks.

## What's next

- [What is Machine Learning?](/basics/what-is-machine-learning/): The broader context for how neural networks are trained
- [What is a Large Language Model?](/basics/what-is-an-llm/): How transformer neural networks power text AI
- [What is Generative AI?](/basics/what-is-generative-ai/): How neural networks are used to create content

## Further reading

- [TensorFlow Neural Network Playground](https://playground.tensorflow.org): Interactive browser demo where you can watch a neural network learn in real time
- [But what is a neural network? (3Blue1Brown)](https://www.youtube.com/watch?v=aircAruvnKk): The clearest visual explanation available; highly recommended starting point
- [Neural Networks and Deep Learning (Nielsen)](http://neuralnetworksanddeeplearning.com): Free online book, mathematically precise but accessible
