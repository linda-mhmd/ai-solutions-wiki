---
title: "PyTorch"
description: "PyTorch is the open-source deep learning framework behind most modern AI research and models, combining a GPU tensor library, automatic differentiation, and an eager, Python-native programming model."
date: 2026-07-01
tags: ["deep-learning", "training", "framework", "open-source", "gpu", "python"]
tool_category: "AI"
related:
  - tools/tensorflow
  - tools/huggingface-transformers
  - glossary/deep-learning
  - glossary/transformer-architecture
  - guides/fine-tuning-llms-guide
  - comparisons/gpu-vs-tpu
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/furnace-molten-red-notext.png" alt="Molten metal pouring in a dark furnace, representing the training process that shapes a model's weights." loading="lazy">
  <figcaption>Training is a foundry. PyTorch is the machinery that pours gradients through a model until its weights take the shape the data demands.</figcaption>
</figure>

PyTorch is an open-source deep learning framework that combines a NumPy-like tensor library with GPU acceleration, a reverse-mode automatic differentiation engine, and higher-level building blocks for defining and training neural networks. Its defining trait is define-by-run, also called eager execution: the computation graph is built dynamically as your Python runs, so a model is ordinary, debuggable Python rather than a static graph you compile first. It began at Meta AI and is now governed by the PyTorch Foundation under the Linux Foundation. It is the framework most new AI research and most open-weight [large language models](/glossary/llm/) are written in.

## Where PyTorch sits

PyTorch is the layer between your model code and the hardware. You describe a network and a training step in Python; PyTorch records the operations, computes gradients, and dispatches the math to a CPU, GPU, or other accelerator. Most people use it through higher-level libraries that build on top of it.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Ecosystem</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Hugging Face Transformers</span>
      <span class="bz-arch-chip">PyTorch Lightning</span>
      <span class="bz-arch-chip">torchvision</span>
      <span class="bz-arch-chip-note">High-level training and model libraries</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Core API</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">torch.nn</span>
      <span class="bz-arch-chip">autograd</span>
      <span class="bz-arch-chip">torch.optim</span>
      <span class="bz-arch-chip">DDP / FSDP2</span>
      <span class="bz-arch-chip-note">Layers, gradients, optimisers, distributed training</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compiler and runtime</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">torch.compile</span>
      <span class="bz-arch-chip">TorchInductor</span>
      <span class="bz-arch-chip">ExecuTorch</span>
      <span class="bz-arch-chip-note">Graph capture and kernel generation for speed and edge</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA CUDA</span>
      <span class="bz-arch-chip">AMD ROCm</span>
      <span class="bz-arch-chip">Apple MPS</span>
      <span class="bz-arch-chip">CPU</span>
      <span class="bz-arch-chip-note">Same code runs across backends</span>
    </div>
  </div>
</div>

## How autograd works

The heart of PyTorch is autograd, its automatic differentiation engine. When a tensor is marked `requires_grad=True`, every operation on it is recorded into a directed graph that also stores each operation's local derivative. The forward pass builds this graph on the fly. Calling `.backward()` on the loss walks the graph in reverse, applies the chain rule at each node, and fills in each parameter's gradient. PyTorch never builds full Jacobian matrices; it computes vector-Jacobian products, which is why reverse-mode is cheap for the common case of many parameters mapping to a single scalar loss. This is the mechanism every training loop relies on, and it is worth understanding before you rely on [gradient descent](/glossary/gradient-descent/) in practice.

## Installing PyTorch

Generate the exact command for your hardware from the official selector, since the index URL tracks your CUDA or ROCm version.

```bash
# CPU only
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# NVIDIA GPU (CUDA 12.8 build)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128

# Apple Silicon and default builds
pip install torch torchvision torchaudio
```

PyTorch follows a roughly quarterly release cadence on the 2.x line (2.12 as of mid-2026). On Apple Silicon the default build enables Metal (MPS) acceleration automatically.

## A real training loop

This is the canonical shape of PyTorch: define a module, run a forward pass, compute a loss, backpropagate, and step the optimiser.

```python
import torch
from torch import nn
from torch.utils.data import DataLoader, TensorDataset

device = "cuda" if torch.cuda.is_available() else "cpu"

X = torch.randn(2048, 20)
y = X @ torch.randn(20, 1) + 0.1 * torch.randn(2048, 1)
loader = DataLoader(TensorDataset(X, y), batch_size=64, shuffle=True)

class MLP(nn.Module):
    def __init__(self, in_dim, hidden=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden), nn.ReLU(), nn.Linear(hidden, 1)
        )
    def forward(self, x):
        return self.net(x)

model = MLP(20).to(device)
loss_fn = nn.MSELoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3)

model.train()
for epoch in range(10):
    for xb, yb in loader:
        xb, yb = xb.to(device), yb.to(device)
        optimizer.zero_grad()     # clear old gradients
        loss = loss_fn(model(xb), yb)
        loss.backward()           # autograd fills every .grad
        optimizer.step()          # update the weights
```

## Transfer learning with torch.compile

The common production pattern is transfer learning: freeze a pretrained backbone, retrain a small head, and wrap the model in `torch.compile` for a graph-optimised speedup.

```python
import torch
from torch import nn
from torchvision import models

device = "cuda" if torch.cuda.is_available() else "cpu"

model = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)
for p in model.parameters():
    p.requires_grad = False                       # freeze the backbone

model.fc = nn.Linear(model.fc.in_features, 10)    # new trainable head
model = model.to(device)

compiled = torch.compile(model, mode="max-autotune")  # graph capture + kernel gen
optimizer = torch.optim.AdamW(model.fc.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

imgs = torch.randn(16, 3, 224, 224, device=device)
labels = torch.randint(0, 10, (16,), device=device)

optimizer.zero_grad()
loss = loss_fn(compiled(imgs), labels)
loss.backward()
optimizer.step()
```

Introduced in PyTorch 2.0, `torch.compile` captures the model into a graph with TorchDynamo, traces the backward pass with AOTAutograd, and generates fused GPU kernels with TorchInductor. The first call pays a compilation cost; later calls run the optimised graph. It is opt-in and backward-compatible, so you add it without rewriting model code.

## The typical path from idea to model

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Define</span>
    <span class="bz-flow-step-desc">Write a network as an nn.Module and load data with DataLoader.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Train</span>
    <span class="bz-flow-step-desc">Loop forward, loss, backward, step, using autograd for gradients.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Scale</span>
    <span class="bz-flow-step-desc">Shard across GPUs with FSDP2 and compile with torch.compile.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Deploy</span>
    <span class="bz-flow-step-desc">Serve with vLLM or TorchServe, or export to edge with ExecuTorch.</span>
  </div>
</div>

For very large models, PyTorch provides distributed training primitives: DistributedDataParallel replicates the model and all-reduces gradients across GPUs, while FSDP2 shards parameters, gradients, and optimiser state to fit models that no single GPU can hold. On the deployment side, ExecuTorch (GA in late 2025) exports and runs the same model on phones and embedded devices, closing PyTorch's historical edge gap.

## How it compares

| | PyTorch | [TensorFlow](/tools/tensorflow/) | JAX | Keras 3 |
|---|---|---|---|---|
| **Execution** | Eager, compile optional | Eager, graphs via tf.function | Functional transforms | API over a backend |
| **Autodiff** | autograd | GradientTape | jax.grad | Delegates to backend |
| **Research use** | Dominant | Declining | Rising at scale | Sits on top |
| **Edge** | ExecuTorch | LiteRT (mature) | Limited | Via backend |
| **Best for** | New research, LLMs, fast iteration | Production, mobile, TPU | TPU-scale training | Portable multi-backend code |

PyTorch and TensorFlow are both eager-first with optional graph compilation. JAX is functional and shines on TPUs. Keras 3 is not a rival engine but a high-level API that runs on PyTorch, TensorFlow, or JAX.

## When not to use PyTorch

- **You run an existing TensorFlow production estate.** If you already depend on TF Serving, TFX, or TensorFlow.js, rewriting into PyTorch adds risk. [Keras 3](/tools/tensorflow/) is often the better bridge.
- **You need TPU-scale functional training.** For very large training runs on TPUs, JAX with XLA is generally the stronger fit.
- **You target deeply embedded devices with a mature toolchain.** ExecuTorch narrows this, but LiteRT still has broader coverage for constrained microcontrollers.
- **You only need to serve, not train.** For pure inference, a dedicated runtime such as [vLLM](/tools/vllm/), [TensorRT-LLM](/tools/tensorrt-llm/), or ONNX Runtime often beats plain eager PyTorch.
- **You want a no-code path.** PyTorch is a code-first library. Non-engineers are better served by managed platforms.

## Further reading

- [PyTorch documentation](https://pytorch.org/docs/): official API reference and tutorials.
- [PyTorch install selector](https://pytorch.org/get-started/locally/): the authoritative source for install commands.
- [TensorFlow](/tools/tensorflow/): the main alternative framework and its trade-offs.
- [Hugging Face Transformers](/tools/huggingface-transformers/): the model library most PyTorch LLM work runs through.
- [What is deep learning?](/glossary/deep-learning/): the field PyTorch is built to serve.
- [Fine-tuning LLMs guide](/guides/fine-tuning-llms-guide/): putting PyTorch and adapters to work.
- [GPU vs TPU](/comparisons/gpu-vs-tpu/): the hardware choice underneath the framework.

## Sources

- Paszke, A., et al. (2019). PyTorch: An Imperative Style, High-Performance Deep Learning Library. *NeurIPS 2019*. https://papers.nips.cc/paper/9015-pytorch-an-imperative-style-high-performance-deep-learning-library
- PyTorch. torch.compile and the PyTorch 2.x stack. https://pytorch.org/get-started/pytorch-2-x/
- PyTorch. Overview of the PyTorch autograd engine. https://pytorch.org/blog/overview-of-pytorch-autograd-engine/
- PyTorch Foundation expands to an umbrella foundation (2025). https://pytorch.org/blog/pt-foundation-expands/
- PyTorch. Introducing ExecuTorch 1.0 (2025). https://pytorch.org/blog/introducing-executorch-1-0/
- PyTorch releases. https://github.com/pytorch/pytorch/releases
