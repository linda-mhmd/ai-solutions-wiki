---
title: "Amazon SageMaker - Custom ML Model Training and Deployment"
description: "What SageMaker is, when to use it instead of Bedrock, key capabilities, pricing model, and the workflows that suit it best."
date: 2026-03-24
categories: [Tools]
tags: ["ai-ml", "advanced", "amazon-sagemaker", "ml-training", "model-deployment", "aws", "mlops", "aws-service"]
related:
  - tools/amazon-bedrock
  - tools/kubeflow
  - tools/mlflow
  - comparisons/sagemaker-vs-bedrock
  - comparisons/sagemaker-vs-vertex-ai
alternatives:
  open_source:
    - tools/kubeflow
    - tools/mlflow
    - tools/ray
  azure: tools/azure-machine-learning
  gcp: tools/google-vertex-ai
solutions:
  - solutions/finance/credit-scoring
  - solutions/healthcare/medical-imaging
  - solutions/manufacturing
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Amazon SageMaker is AWS's managed platform for training, deploying, and monitoring custom machine learning models. It sits at the other end of the spectrum from Bedrock: Bedrock gives you access to pre-built foundation models through an API; SageMaker gives you the infrastructure to train your own models or fine-tune existing ones.

A naming note: on 3 December 2024 AWS renamed this ML service **Amazon SageMaker AI** and reused the name "Amazon SageMaker" for a broader unified data, analytics and AI platform (SageMaker Unified Studio, Lakehouse, Catalog) that includes SageMaker AI. The `sagemaker` APIs, SDK and console URLs did not change. This page covers SageMaker AI.

## When to Use SageMaker

SageMaker is the right choice when:
- You need to train a custom model on your own data (classification, regression, object detection, time series forecasting)
- You need to fine-tune a foundation model on domain-specific data for specialized tasks
- You are working with tabular or structured data where traditional ML models (XGBoost, LightGBM) outperform LLMs
- Your inference requirements include latency or cost constraints that foundation model APIs cannot meet
- You need full control over model architecture, training process, and artifact management

SageMaker is not the right choice when your primary use case is prompting a foundation model - use Bedrock for that. The operational overhead of SageMaker is significant; it pays off only when you actually need custom training.

## Key Capabilities

**Training** - SageMaker manages compute provisioning for training jobs. You provide a training script and a dataset location in S3; SageMaker provisions instances, mounts data, runs the job, and saves the model artifact. Managed Spot Training uses EC2 spot instances for up to 90% cost reduction on interruptible training jobs.

**SageMaker JumpStart** - A model hub with pre-trained models and one-click fine-tuning workflows for common open-weight foundation models (for example Llama, Mistral, Qwen and Gemma; Gemma 4 variants were added in September 2026). This is the fastest path from raw model to fine-tuned deployment if your use case fits a supported model.

**SageMaker Pipelines** - Automated ML workflows that chain data processing, training, evaluation, and deployment steps. Pipelines are version-controlled and support conditional logic (e.g., only deploy if evaluation metrics exceed a threshold).

**Real-time and batch inference** - Real-time endpoints scale automatically and support A/B testing between model versions. Batch Transform runs inference over large datasets in S3 without a persistent endpoint.

**Model Monitor** - Detects data drift and model quality degradation in production. Configurable checks compare live inference data distributions against training data baselines and alert when drift exceeds thresholds. Model Monitor went into maintenance mode in mid-2026 and has been closed to new customers since 30 July 2026, along with Clarify, Debugger, Ground Truth and several other SageMaker AI features (see the [2026 AWS lifecycle wave](/news/aws-service-deprecations-2026/)). For new projects AWS points to its open-source monitoring solutions built on SageMaker AI MLflow and Evidently AI, with CloudWatch and QuickSight for alerting and dashboards.

## Pricing Model

SageMaker costs have several components:
- Training: per-hour rate for the instance type used during training
- Inference: per-hour for real-time endpoints, per-record for batch transform
- Storage: S3 for data and model artifacts, EFS for shared storage during training
- Feature Store: per-record for writes, per-hour for online store

For most teams, inference endpoint costs dominate total SageMaker spend. Right-sizing instances (using ml.g4dn.xlarge instead of ml.p3.2xlarge where inference latency allows) and enabling auto-scaling down to zero instances during low-traffic periods significantly reduce costs.

## Getting Started

The SageMaker console provides Jupyter-based notebook environments (SageMaker Studio) for development. For new projects, start in Studio with a managed notebook - it handles IAM, VPC, and S3 access configuration automatically. Move to Pipelines when you need reproducibility and automation.

The SageMaker Python SDK provides higher-level abstractions over the raw APIs. Using the SDK's Estimator and Model classes rather than raw API calls reduces boilerplate and handles common configuration patterns.

## Sources

- AWS Documentation. "What is Amazon SageMaker AI?" (rename on 3 December 2024 and the unified Amazon SageMaker platform). https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html
- AWS Documentation. "Amazon SageMaker Model Monitor availability change" (no longer open to new customers; recommended replacements; fetched 25 September 2026). https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-availability-change.html
- AWS Documentation. "Services in maintenance" (SageMaker AI Clarify, Debugger, Ground Truth, Model Monitor and others, announced 30 June 2026). https://docs.aws.amazon.com/general/latest/gr/maintenance_services.html
- AWS. "Gemma-4-31B-it-assistant and Gemma-4-31B-IT-NVFP4 models now available on Amazon SageMaker JumpStart." September 2026. https://aws.amazon.com/about-aws/whats-new/2026/01/gemma-4-31b-it-assistant-gemma-4-31b-it-nvfp4-jumpstart/
