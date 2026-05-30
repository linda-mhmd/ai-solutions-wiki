---
title: "Edge MLOps"
description: "Device-aware CI/CD for edge ML models: model optimization, over-the-air deployment, device fleet management, and monitoring at the edge."
date: 2026-03-28
categories: [Patterns]
tags: [edge, mlops, iot, deployment, model-optimization, ci-cd, fleet-management]
related:
  - glossary/edge-computing
  - patterns/canary-deployment
  - patterns/model-versioning
  - patterns/continuous-training-pattern
last_updated: 2026-05-30
---

Deploying ML models to edge devices introduces constraints that cloud-based MLOps pipelines do not account for. Edge devices have limited compute, memory, and storage. Network connectivity is intermittent or absent. Thousands of heterogeneous devices must be updated safely. Edge MLOps adapts the ML lifecycle to these constraints.

## Model Optimization Pipeline

Models trained in the cloud must be optimized before edge deployment. The optimization pipeline includes multiple stages, each reducing model size and computational requirements.

**Quantization** - Convert model weights from 32-bit floating point to 8-bit integer or lower precision. Post-training quantization is fast but may reduce accuracy. Quantization-aware training preserves accuracy by simulating reduced precision during training.

**Pruning** - Remove weights or entire neurons that contribute minimally to model output. Structured pruning removes entire channels or layers, producing models that run faster on standard hardware without sparse computation support.

**Distillation** - Train a smaller student model to mimic the behavior of the larger cloud model. The student model is purpose-built for the target hardware and can be significantly smaller while maintaining acceptable accuracy for the edge use case.

**Format conversion** - Export the optimized model to an edge-compatible runtime format: TensorFlow Lite, ONNX Runtime Mobile, Core ML, or a vendor-specific format for specialized hardware (NPUs, TPUs).

## Device-Aware CI/CD

The CI/CD pipeline must build and test model packages for each target device type. A single model may produce multiple artifacts: one quantized for ARM Cortex-A processors, another for NVIDIA Jetson GPUs, another for Apple Neural Engine. Each variant is tested on representative hardware or accurate emulators.

**Hardware-in-the-loop testing** - Maintain a device lab with representative hardware from each device type in the fleet. Run inference benchmarks, accuracy tests, and power consumption measurements on real hardware before approving deployment.

**Staged rollout** - Deploy to a small percentage of devices first. Monitor for inference errors, crashes, and performance regressions before expanding to the full fleet. Group devices by hardware type and deploy each variant independently.

## Over-the-Air Deployment

Push model updates to edge devices using an OTA update system. Model packages must be signed and verified on-device before loading. Support rollback to the previous model version if the new version fails validation on-device. Handle partial downloads and resume capability for devices with unreliable connectivity.

## Edge Monitoring

Edge devices cannot stream high-volume telemetry continuously. Collect inference metrics locally and upload summaries when connectivity is available. Track prediction distribution, latency, error rates, and input data statistics. Aggregate fleet-wide metrics in the cloud for drift detection and performance monitoring.

## Federated Learning Integration

When edge devices generate labeled data locally, use federated learning to improve the model without centralizing sensitive data. Each device computes gradient updates locally and uploads encrypted updates to a central aggregator. The improved model is then distributed back to the fleet through the standard OTA pipeline.
