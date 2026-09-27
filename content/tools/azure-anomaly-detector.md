---
title: "Azure Anomaly Detector - Time Series Anomaly Detection"
description: "Azure Anomaly Detector is an AI service that identifies anomalies in time series data using machine learning models that automatically adapt to data patterns."
date: 2026-03-28
categories: [Tools]
tags: [azure, anomaly-detection, time-series, monitoring, ai-services]
related:
  - tools/amazon-lookout-metrics
  - tools/azure-cognitive-services
  - tools/azure-monitor
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Azure Anomaly Detector is an Azure AI service that detects anomalies in time series data without requiring machine learning expertise or labeled training data. The service uses unsupervised learning models, primarily based on Microsoft Research's Spectral Residual (SR) and Convolutional Neural Network (CNN) algorithms, that automatically learn the normal patterns in time series data and flag data points that deviate significantly. It is used in scenarios such as monitoring business KPIs for unexpected changes, detecting equipment malfunctions from sensor telemetry, identifying fraud patterns in transaction data, and spotting anomalies in application performance metrics.

The service provides two detection modes. Univariate anomaly detection analyzes a single time series and identifies points that fall outside expected boundaries. It handles seasonality, trends, and irregular patterns automatically without parameter tuning. The API accepts a batch of time series data points and returns anomaly flags, expected values, and upper/lower boundaries for each point. The streaming (last point) mode evaluates whether the most recent data point is anomalous, enabling real-time monitoring scenarios. Multivariate anomaly detection, a more advanced capability, analyzes correlations across multiple time series simultaneously to detect anomalies that would be invisible when examining each series independently -- for example, detecting a subtle equipment degradation pattern visible only in the correlation between temperature, vibration, and power consumption.

The multivariate detector uses a Graph Attention Network to model inter-variable dependencies and identify groups of variables contributing to each anomaly. This is particularly valuable for IoT and industrial monitoring scenarios where systems have dozens or hundreds of correlated sensors. The service requires a training step for multivariate detection (providing historical normal data), after which it can evaluate new data windows for anomalies. Both univariate and multivariate APIs are accessible via REST endpoints and client SDKs for Python, C#, JavaScript, and Java.

**Status (September 2026):** Anomaly Detector is being retired on **1 October 2026**. New resources could not be created after 20 September 2023, and Microsoft lists it among retired Foundry Tools (the current name for Azure AI services) that should not be used for new applications. Existing workloads should migrate now, for example to anomaly detection in Microsoft Fabric Real-Time Intelligence (preview) or to open-source detectors hosted on Azure Machine Learning.

Official documentation: https://learn.microsoft.com/en-us/azure/ai-services/anomaly-detector/

## Key Capabilities

- **Unsupervised Detection** - Automatically learns normal patterns from time series data without labeled anomaly examples or manual threshold configuration
- **Multivariate Analysis** - Detects complex anomalies across correlated time series using Graph Attention Networks that model inter-variable dependencies
- **Real-Time Streaming** - Last-point detection mode evaluates the most recent data point against historical patterns for real-time monitoring integration
- **Root Cause Contribution** - Multivariate detection identifies which variables contributed most to each detected anomaly, accelerating investigation

## AWS Equivalent

Azure Anomaly Detector's AWS counterpart was Amazon Lookout for Metrics. Both provided managed anomaly detection for time series data: Anomaly Detector offered univariate and multivariate modes with different algorithms, while Lookout for Metrics focused on monitoring business metrics with built-in data source connectors and automated alerting. Both have now been wound down: Lookout for Metrics was shut down on 10 October 2025, and Anomaly Detector retires on 1 October 2026. On AWS, comparable capabilities now come from CloudWatch anomaly detection or custom models on SageMaker AI.

## Origins and History

Azure Anomaly Detector was first announced in preview at Ignite 2018 and reached general availability on March 3, 2020. The univariate detection algorithm is based on Microsoft Research's Spectral Residual and CNN approach published at KDD 2019. Multivariate anomaly detection, based on Graph Attention Network research, was added in GA in 2021. Microsoft announced in September 2023 that the Anomaly Detector service would be retired on 1 October 2026 and blocked creation of new resources from 20 September 2023.

## Sources

1. Microsoft Learn. "What is Azure Anomaly Detector?" https://learn.microsoft.com/en-us/azure/ai-services/anomaly-detector/overview
2. Ren et al. "Time-Series Anomaly Detection Service at Microsoft." KDD 2019. https://arxiv.org/abs/1906.03821
3. Microsoft Learn. "What are Foundry Tools?" (retired services list), accessed 25 September 2026. https://learn.microsoft.com/en-us/azure/ai-services/what-are-ai-services
4. AWS General Reference. "Services in full shutdown" (Amazon Lookout for Metrics, 10 October 2025), accessed 25 September 2026. https://docs.aws.amazon.com/general/latest/gr/full_shutdown_services.html
