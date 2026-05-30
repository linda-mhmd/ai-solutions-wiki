---
title: "TinyML"
description: "How machine learning runs on microcontrollers and resource-constrained devices using TensorFlow Lite Micro and similar frameworks."
date: 2026-03-28
categories: [Glossary]
tags: [TinyML, edge-AI, microcontroller, TensorFlow-Lite, embedded-ML]
related:
  - glossary/edge-computing
  - glossary/neuromorphic-computing
  - glossary/quantization
  - glossary/ai-hardware
last_updated: 2026-05-30
---

TinyML refers to the practice of running machine learning inference on microcontrollers and ultra-low-power devices with as little as 256 KB of RAM and 1 MB of flash storage. These devices operate on milliwatts of power, enabling always-on ML capabilities in battery-powered sensors, wearables, and industrial equipment without cloud connectivity.

## How It Works

TinyML models are heavily optimized versions of standard neural networks. The workflow typically involves training a full-size model on a conventional machine, then applying aggressive compression through quantization (converting to INT8), pruning, and architecture-specific optimizations. The compressed model is then converted to a format suitable for microcontroller deployment.

**TensorFlow Lite Micro** is the most widely used TinyML framework. It provides a C++ interpreter that runs quantized TensorFlow models on ARM Cortex-M processors and other microcontrollers. **Edge Impulse** offers an end-to-end platform for collecting sensor data, training models, and deploying to embedded devices. **CMSIS-NN** provides optimized neural network kernels for ARM processors, accelerating common operations like convolutions and fully connected layers.

Typical TinyML applications include keyword spotting (detecting wake words), anomaly detection on sensor data (vibration monitoring for predictive maintenance), gesture recognition from accelerometers, and simple image classification on low-resolution camera inputs.

## Why It Matters

TinyML extends machine learning to the billions of microcontrollers already deployed worldwide. It enables AI at the extreme edge where cloud connectivity is unavailable, too slow, too expensive, or raises privacy concerns. Processing data locally on the device eliminates network latency, reduces bandwidth costs, and keeps sensitive data on-device. Industries from agriculture to manufacturing are deploying TinyML for predictive maintenance, quality inspection, and environmental monitoring.

## Practical Considerations

TinyML models are constrained to simple architectures: small CNNs, decision trees, or single-layer classifiers. Accuracy is necessarily lower than server-side models, so the task must be scoped appropriately. Development requires cross-compilation toolchains and on-device debugging, which adds complexity. Start with Edge Impulse or TensorFlow Lite Micro tutorials to evaluate feasibility for your use case. Power consumption, memory footprint, and inference latency are the key metrics. For tasks requiring more capability than a microcontroller provides, consider stepping up to a Linux-capable edge device running standard ML frameworks.

## Sources

- Warden, P., & Situnayake, D. (2019). *TinyML: Machine Learning with TensorFlow Lite on Arduino and Ultra-Low-Power Microcontrollers*. O'Reilly Media. (Foundational reference for TinyML deployment; defines the field and workflow.)
- Banbury, C., et al. (2021). MLPerf Tiny: Benchmarking machine learning on microcontrollers. *NeurIPS 2021 Datasets and Benchmarks Track*. (Standard benchmark suite for TinyML performance evaluation across devices.)
- David, R., et al. (2021). TensorFlow Lite Micro: Embedded machine learning for TinyML systems. *Proceedings of Machine Learning and Systems (MLSys), 3*. (Architecture and design of TF Lite Micro; the primary TinyML inference framework.)
