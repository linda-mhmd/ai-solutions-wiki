---
title: "Kubeflow - Machine Learning Platform for Kubernetes"
description: "Kubeflow is an open-source machine learning platform that makes deploying, scaling, and managing ML workflows on Kubernetes simple and portable."
date: 2026-03-28
categories: [Tools]
tags: [open-source, machine-learning, kubernetes, mlops, pipelines, model-serving]
related:
  - tools/amazon-sagemaker
  - tools/google-vertex-ai
  - tools/mlflow
  - tools/ray
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Kubeflow is an open-source machine learning platform built on Kubernetes that provides a complete toolkit for developing, training, and deploying ML models at scale. Its mission is to make ML workflows on Kubernetes simple, portable, and scalable by providing a standardized set of components that cover the full ML lifecycle: experimentation in notebooks, distributed training, hyperparameter tuning, pipeline orchestration, model serving, and feature management.

The platform's core subprojects include Kubeflow Pipelines (a workflow orchestration system for defining and running ML pipelines as DAGs), Kubeflow Trainer (distributed training and LLM fine-tuning, the successor to the Training Operator), Katib (automated hyperparameter tuning and neural architecture search), Kubeflow Hub (formerly Model Registry), Kubeflow Notebooks, the Spark Operator, and the Kubeflow SDK. Model serving is usually handled by KServe, which started inside Kubeflow and is now a separate CNCF incubating project. Kubeflow leverages Kubernetes-native concepts like custom resource definitions (CRDs) to manage distributed training jobs across frameworks including PyTorch, JAX, DeepSpeed, Hugging Face, MLX, and XGBoost. This Kubernetes-native approach means Kubeflow inherits Kubernetes' capabilities for resource management, scaling, and multi-tenancy.

Kubeflow is used by organizations that want to build standardized, cloud-agnostic ML platforms on their existing Kubernetes infrastructure. It is particularly popular in enterprises with multi-cloud or hybrid cloud strategies, as it provides the same ML workflow experience regardless of the underlying cloud provider. Companies including Google, Bloomberg, Spotify, and various financial institutions have deployed Kubeflow for production ML workloads.

## Key Capabilities

- **Kubeflow Pipelines** - Visual and SDK-based pipeline authoring for reproducible, versioned ML workflows with artifact tracking
- **KServe integration** - Serverless model inference with autoscaling, canary rollouts, and support for PyTorch, TensorFlow, ONNX, LLM runtimes, and custom containers (KServe is now its own CNCF project)
- **Katib** - Automated hyperparameter tuning with support for grid search, random search, Bayesian optimization, and neural architecture search
- **Kubeflow Trainer** - Kubernetes-native distributed training and fine-tuning for PyTorch, JAX, DeepSpeed, Hugging Face, and XGBoost with gang scheduling

## Cloud Equivalents

Kubeflow is the open-source alternative to AWS SageMaker, Google Vertex AI (rebranded Gemini Enterprise Agent Platform in April 2026 — see [Google Vertex AI](/tools/google-vertex-ai/) for the full story), and Azure Machine Learning. Managed ML platforms provide tighter integration with cloud-native services and simpler setup, while Kubeflow offers full portability across clouds and on-premises environments at the cost of greater operational complexity.

## Origins and History

Kubeflow originated at Google in 2017 as a project to simplify running TensorFlow on Kubernetes. It was open-sourced in December 2017 by Jeremy Lewi, David Aronchick, and other Google engineers. The project is licensed under the Apache License 2.0. Kubeflow was accepted into the Cloud Native Computing Foundation (CNCF) as an incubating project on 25 July 2023 and moved to the Graduated maturity level on 24 July 2026. The project expanded well beyond TensorFlow to become a comprehensive ML platform supporting all major frameworks.

## Sources

1. https://www.kubeflow.org/
2. https://github.com/kubeflow/kubeflow
3. Kubeflow. "Kubeflow Subprojects." https://www.kubeflow.org/docs/components/
4. CNCF. Kubeflow project page (accepted 25 July 2023, graduated 24 July 2026). https://www.cncf.io/projects/kubeflow/
5. CNCF. KServe project page (incubating). https://www.cncf.io/projects/kserve/
