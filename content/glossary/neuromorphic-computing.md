---
title: "Neuromorphic Computing"
description: "How brain-inspired spiking neural networks and specialized hardware like Intel Loihi enable ultra-low-power AI at the edge."
date: 2026-03-28
categories: [Glossary]
tags: [neuromorphic, spiking-neural-network, Intel-Loihi, edge-AI, emerging-tech]
related:
  - glossary/ai-hardware
  - glossary/tinyml
  - glossary/edge-computing
  - glossary/neural-network
last_updated: 2026-05-30
---

Neuromorphic computing is an approach to processor design and neural network architecture inspired by the structure and function of biological brains. Unlike conventional GPUs that process data in synchronized batches of floating-point operations, neuromorphic chips use spiking neural networks (SNNs) that communicate through discrete electrical pulses (spikes), processing information asynchronously and consuming power only when neurons fire.

## How It Works

In a spiking neural network, each neuron accumulates incoming spikes over time. When its membrane potential exceeds a threshold, it fires a spike to connected neurons and resets. This event-driven computation means inactive neurons consume virtually no power, unlike conventional neural networks where every neuron computes at every time step.

**Intel Loihi 2** is the most prominent neuromorphic research chip, featuring 128 cores with one million programmable neurons and on-chip learning capabilities. **IBM TrueNorth** demonstrated large-scale neuromorphic architectures with one million neurons. **BrainChip Akida** targets commercial edge applications like audio classification and gesture recognition.

Neuromorphic chips are optimized for temporal data: sensor streams, audio, event cameras, and other time-varying signals. They process data as it arrives rather than in batches, enabling real-time low-latency inference. On-chip learning allows adaptation without communicating with a server, which is critical for privacy-sensitive edge applications.

## Why It Matters

Neuromorphic computing offers orders-of-magnitude improvements in power efficiency for specific workloads. Where a GPU might consume hundreds of watts for inference, a neuromorphic chip can perform comparable tasks in milliwatts. This enables always-on AI in battery-powered devices, remote sensors, implantable medical devices, and IoT deployments where power and bandwidth are severely constrained.

## Practical Considerations

Neuromorphic computing is still primarily a research and early-commercial technology. Programming models differ fundamentally from conventional deep learning frameworks, requiring expertise in spike-timing and neuromorphic algorithms. Software ecosystems (Intel's Lava framework, Norse for PyTorch) are maturing but limited compared to CUDA/PyTorch. Evaluate neuromorphic hardware for extreme power-constrained edge applications where latency and efficiency outweigh ecosystem maturity. For most workloads, conventional hardware with quantized models remains more practical.

## Sources

- Mead, C. (1990). Neuromorphic electronic systems. *Proceedings of the IEEE, 78*(10), 1629–1636. (Coined "neuromorphic computing"; foundational paper by Carver Mead.)
- Mahowald, M., & Douglas, R. (1991). A silicon neuron. *Nature, 354*, 515–518. (First VLSI spiking neuron circuit.)
- Davies, M., et al. (2018). Loihi: A neuromorphic manycore processor with on-chip learning. *IEEE Micro, 38*(1), 82–99. (Intel Loihi chip; practical neuromorphic hardware for research.)
