---
title: "Ray - Distributed AI Compute Framework"
description: "A comprehensive reference for Ray: distributed Python computing, Ray Train for ML training, Ray Serve for inference, and scaling AI workloads across clusters."
date: 2026-03-28
categories: [Tools]
tags: [ray, distributed-computing, training, serving, scaling, python]
related:
  - tools/amazon-sagemaker
  - tools/amazon-emr
  - tools/mlflow
last_updated: 2026-05-30
---

Ray is an open-source framework for scaling Python applications across clusters of machines. It provides a simple API for distributing any Python function across multiple CPUs and GPUs, plus specialized libraries for ML training (Ray Train), hyperparameter tuning (Ray Tune), model serving (Ray Serve), reinforcement learning (RLlib), and data processing (Ray Data). For AI projects, Ray solves the scaling problem: when a training job does not fit on one GPU, when inference needs to scale beyond one server, or when data processing exceeds single-machine capacity.

Official documentation: https://docs.ray.io/

## Core Concepts

**Tasks** - Remote function calls that run on available cluster resources. Decorate a Python function with `@ray.remote`, and calling `function.remote()` schedules it on a worker node. Ray handles serialization, scheduling, and result retrieval.

**Actors** - Stateful objects distributed across the cluster. An actor maintains state between method calls, enabling patterns like in-memory caches, streaming processors, and stateful model servers.

**Object Store** - A shared-memory store distributed across the cluster. Large objects (datasets, model weights) are stored once in the object store and accessed by any task or actor without copying. This eliminates the data transfer bottleneck in distributed computing.

## Ray Train (Distributed ML Training)

Ray Train scales ML training from one GPU to hundreds. It wraps existing training frameworks (PyTorch, TensorFlow, Hugging Face Transformers, XGBoost, LightGBM) and handles distributed communication, checkpoint management, and fault tolerance.

For LLM fine-tuning, Ray Train with DeepSpeed or FSDP distributes model parameters and gradients across multiple GPUs. A training script that runs on one GPU can scale to a multi-node GPU cluster with minimal code changes:

```python
from ray.train.torch import TorchTrainer

trainer = TorchTrainer(
    train_func,
    scaling_config=ScalingConfig(num_workers=8, use_gpu=True)
)
result = trainer.fit()
```

## Ray Tune (Hyperparameter Optimization)

Ray Tune runs hyperparameter searches in parallel across cluster resources. It supports search algorithms (random, grid, Bayesian, HyperOpt, Optuna), scheduling algorithms (ASHA for early stopping of bad trials, Population Based Training), and resource management (allocating GPUs per trial).

Tune integrates with experiment trackers (MLflow, W&B) to log results and with Ray Train for distributed training within each trial. This combination enables large-scale hyperparameter optimization where each trial is itself a distributed training job.

## Ray Serve (Model Serving)

Ray Serve deploys ML models as scalable REST API endpoints. It supports multi-model composition (chaining a preprocessing model, an inference model, and a post-processing step), dynamic batching (grouping incoming requests for efficient GPU utilization), and autoscaling (adjusting replicas based on request queue depth).

For LLM serving, Ray Serve integrates with vLLM for efficient inference serving. The combination provides continuous batching, PagedAttention for memory efficiency, and horizontal scaling across GPUs.

## Ray Data (Distributed Data Processing)

Ray Data provides distributed data loading and transformation for ML pipelines. It reads from S3, Parquet, CSV, and custom sources, applies transformations (map, filter, flat_map) in parallel, and streams data into Ray Train without materializing the entire dataset in memory.

This is particularly valuable for large training datasets that do not fit in memory: Ray Data streams batches to the training loop, overlapping data loading with training computation for maximum throughput.

## Deployment on AWS

**Amazon SageMaker** - SageMaker supports Ray as a distributed training framework. Launch Ray clusters on SageMaker training instances for managed infrastructure.

**Amazon EKS** - Deploy Ray clusters on Kubernetes using KubeRay, the Ray Kubernetes operator. KubeRay handles cluster provisioning, auto-scaling, and fault recovery. This is the most common production deployment pattern.

**EC2** - Launch Ray clusters directly on EC2 instances using the Ray cluster launcher. Supports spot instances with automatic fault tolerance (failed workers are replaced and tasks are retried).

**Anyscale** - The managed Ray platform from the creators of Ray. Provides a fully managed Ray environment with autoscaling, job management, and enterprise support.

## Pricing

Ray is open-source (Apache 2.0 license) and free. Infrastructure costs depend on the deployment target (EC2, EKS, SageMaker). Anyscale charges for managed platform features on top of infrastructure costs. The primary cost driver is GPU hours consumed during training and inference.
