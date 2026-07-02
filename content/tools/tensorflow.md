---
title: "TensorFlow"
description: "TensorFlow is Google's open-source end-to-end machine learning platform, strongest today in production serving, mobile and edge deployment, and TPU training."
date: 2026-07-01
tags: ["deep-learning", "training", "framework", "open-source", "production", "edge"]
tool_category: "AI"
related:
  - tools/pytorch
  - tools/huggingface-transformers
  - glossary/deep-learning
  - glossary/neural-network
  - guides/edge-ai-deployment
  - comparisons/gpu-vs-tpu
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/pipeline-components-sequence-notext.png" alt="Precision industrial components arranged in sequence, representing an end-to-end machine learning pipeline from training to deployment." loading="lazy">
  <figcaption>TensorFlow is built as a full pipeline: train, package as a SavedModel, then serve it on a server, a phone, or a browser.</figcaption>
</figure>

TensorFlow is an open-source, end-to-end machine learning platform developed and maintained by Google. It represents computation as dataflow graphs whose nodes are operations and whose edges carry tensors, and it maps those graphs across CPUs, GPUs, and Google's Tensor Processing Units (TPUs). TensorFlow 1.x used static graphs you built then ran inside a session. TensorFlow 2.x made eager execution the default, so code runs immediately like normal Python, and reintroduced graph speed on demand through the `@tf.function` decorator. Today its centre of gravity is production: serving, mobile and edge deployment, and TPU training, rather than research prototyping.

## Where TensorFlow sits

TensorFlow spans the whole lifecycle, from a high-level model API down to the hardware, and out to deployment targets that most other frameworks leave to third parties.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">API</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Keras 3</span>
      <span class="bz-arch-chip">tf.keras</span>
      <span class="bz-arch-chip-note">High-level model definition, multi-backend</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Core</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Dataflow graphs</span>
      <span class="bz-arch-chip">tf.GradientTape</span>
      <span class="bz-arch-chip">tf.data</span>
      <span class="bz-arch-chip">tf.distribute</span>
      <span class="bz-arch-chip-note">Autodiff, input pipelines, distribution strategies</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compiler</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">XLA / OpenXLA</span>
      <span class="bz-arch-chip-note">Op fusion and TPU compilation</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Deployment</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">TF Serving</span>
      <span class="bz-arch-chip">LiteRT</span>
      <span class="bz-arch-chip">TensorFlow.js</span>
      <span class="bz-arch-chip-note">Server, on-device, and browser targets</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">CPU</span>
      <span class="bz-arch-chip">GPU</span>
      <span class="bz-arch-chip">TPU</span>
      <span class="bz-arch-chip-note">TPU support is first-class</span>
    </div>
  </div>
</div>

## Graphs, tracing, and autodiff

Two mechanisms define how TensorFlow runs. The `@tf.function` decorator turns a Python function into a graph: on first call it traces the Python into a `tf.Graph`, and later calls reuse that graph, skipping the interpreter for speed and portability. AutoGraph converts Python control flow such as `if` and `for` into graph operations automatically. Gradients come from `tf.GradientTape`, which records operations in a context and computes derivatives by reverse-mode automatic differentiation when you call `tape.gradient(loss, variables)`. Underneath, XLA can fuse operations into optimised kernels and is the compilation backbone for TPUs. The trained result is packaged as a SavedModel, the language-neutral artifact that TF Serving, LiteRT, and TensorFlow.js all consume.

## Keras 3 is now multi-backend

The most important recent change is Keras 3. Released in late 2023, it is a full rewrite that runs the same model code on TensorFlow, JAX, or PyTorch. You pick the backend with the `KERAS_BACKEND` environment variable before importing Keras; TensorFlow is the default. Since TensorFlow 2.16, `tf.keras` is Keras 3 with the TensorFlow backend. This means TensorFlow is now one backend among several rather than Keras's exclusive engine, and Keras releases publish on keras.io rather than in TensorFlow's notes.

## Installing TensorFlow

```bash
# CPU only, all platforms
pip install tensorflow

# GPU support on Linux or WSL2 (bundles CUDA and cuDNN wheels)
pip install tensorflow[and-cuda]

# Verify the GPU is visible
python3 -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```

The old `tensorflow-gpu` package is gone; use the `[and-cuda]` extra. Native Windows GPU support ended after TF 2.10, so use WSL2 for GPU on Windows. Keras 3 ships as a dependency, so `tf.keras` already gives you Keras 3.

## A Keras 3 model, end to end

Define a convolutional classifier, compile it with a loss and optimiser, then fit with callbacks for early stopping and checkpointing.

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

model = keras.Sequential([
    keras.Input(shape=(32, 32, 3)),
    layers.Conv2D(32, 3, activation="relu"),
    layers.BatchNormalization(),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, activation="relu"),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dropout(0.4),
    layers.Dense(128, activation="relu"),
    layers.Dense(10),  # logits
])

model.compile(
    optimizer=keras.optimizers.Adam(1e-3),
    loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=["accuracy"],
)

model.fit(
    x_train, y_train, validation_split=0.1, epochs=20, batch_size=128,
    callbacks=[keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True)],
)
model.evaluate(x_test, y_test)
```

## A tf.data pipeline with a custom training loop

For full control, build an input pipeline with `tf.data` and write the training step yourself inside a `@tf.function`.

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

(x_train, y_train), _ = keras.datasets.mnist.load_data()
x_train = (x_train / 255.0).astype("float32")

train_ds = (
    tf.data.Dataset.from_tensor_slices((x_train, y_train))
    .shuffle(10_000).batch(128).prefetch(tf.data.AUTOTUNE)  # overlap prep with training
)

model = keras.Sequential([
    keras.Input(shape=(28, 28)),
    layers.Reshape((28, 28, 1)),
    layers.Conv2D(32, 3, activation="relu"),
    layers.GlobalAveragePooling2D(),
    layers.Dense(10),
])

optimizer = keras.optimizers.Adam()
loss_fn = keras.losses.SparseCategoricalCrossentropy(from_logits=True)

@tf.function  # traced once into a graph, then reused
def train_step(images, labels):
    with tf.GradientTape() as tape:
        logits = model(images, training=True)
        loss = loss_fn(labels, logits)
    grads = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(zip(grads, model.trainable_variables))
    return loss

for epoch in range(5):
    for images, labels in train_ds:
        loss = train_step(images, labels)
    print(f"epoch {epoch}: loss={float(loss):.4f}")
```

## From training to deployment

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Build</span>
    <span class="bz-flow-step-desc">Define a model in Keras 3 or with low-level tf ops.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Train</span>
    <span class="bz-flow-step-desc">Fit with tf.data pipelines and tf.distribute across GPUs or TPUs.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Export</span>
    <span class="bz-flow-step-desc">Save a SavedModel, the portable deployment artifact.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Serve</span>
    <span class="bz-flow-step-desc">Deploy with TF Serving, on-device with LiteRT, or in-browser with TF.js.</span>
  </div>
</div>

For scale, `tf.distribute` strategies handle multi-GPU (`MirroredStrategy`), multi-machine (`MultiWorkerMirroredStrategy`), and TPU (`TPUStrategy`) training with the same model code. For edge, LiteRT (the 2024 rebrand of TensorFlow Lite) runs models on mobile and embedded targets, and now also runs models authored in PyTorch and JAX, which is why the name dropped "TensorFlow".

## How it compares

| | TensorFlow | [PyTorch](/tools/pytorch/) | JAX | Keras 3 |
|---|---|---|---|---|
| **Core model** | Eager, graphs via tf.function | Eager, compile optional | Functional transforms | API over a backend |
| **Autodiff** | GradientTape | autograd | jax.grad | Delegates |
| **Research use** | Declining | Dominant | Rising at scale | Sits on top |
| **Production** | Very strong (TF Serving, TFX) | Strong, growing | Emerging | Inherits backend |
| **Mobile / edge** | Most mature (LiteRT) | ExecuTorch (newer) | Limited | Via TF backend |
| **Best for** | Production, edge, TPU | New research, LLMs | TPU-scale training | Portable code |

## When not to use TensorFlow

- **You are doing research or reproducing recent papers.** The overwhelming majority of new papers and open-weight models ship in [PyTorch](/tools/pytorch/) first, so reproducing state of the art in TensorFlow means fighting missing ports.
- **You want frontier TPU-scale training.** Google itself trains its largest models in JAX; the JAX stack is the recommended path in that regime.
- **You are sensitive to migration churn.** The TF1 to TF2 move, the Keras 3 transition, and the tf.lite to LiteRT split have each imposed real migration costs.
- **You want the biggest community momentum.** Fewer new libraries and checkpoints target TensorFlow now, which slows debugging and hiring.
- **You only need an on-device runtime.** For pure on-device inference, LiteRT or ExecuTorch as a standalone runtime is the target, not full TensorFlow.

## Further reading

- [TensorFlow documentation](https://www.tensorflow.org/): official guides and API reference.
- [Introducing Keras 3](https://keras.io/keras_3/): the multi-backend rewrite that reshaped TensorFlow's role.
- [LiteRT (formerly TensorFlow Lite)](https://ai.google.dev/edge/litert): the on-device runtime.
- [PyTorch](/tools/pytorch/): the dominant research alternative.
- [What is deep learning?](/glossary/deep-learning/): the field these frameworks serve.
- [Edge AI deployment](/guides/edge-ai-deployment/): where TensorFlow's mobile maturity pays off.
- [GPU vs TPU](/comparisons/gpu-vs-tpu/): the hardware choice behind TensorFlow's TPU strength.

## Sources

- Abadi, M., et al. (2016). TensorFlow: A System for Large-Scale Machine Learning. *OSDI 2016*. https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi
- TensorFlow. Better performance with tf.function. https://www.tensorflow.org/guide/function
- TensorFlow. Distributed training. https://www.tensorflow.org/guide/distributed_training
- Keras. Introducing Keras 3.0. https://keras.io/keras_3/
- Google Developers Blog. TensorFlow Lite is now LiteRT (2024). https://developers.googleblog.com/tensorflow-lite-is-now-litert/
- TensorFlow releases. https://github.com/tensorflow/tensorflow/releases
