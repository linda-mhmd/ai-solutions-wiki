---
title: "Azure Custom Vision - Custom Image Classification and Object Detection"
description: "Azure Custom Vision is an AI service for building custom image classification and object detection models with minimal training data and no machine learning expertise required."
date: 2026-03-28
categories: [Tools]
tags: [azure, computer-vision, image-classification, object-detection, custom-models, ai-services]
related:
  - tools/amazon-lookout-vision
  - tools/azure-computer-vision
  - tools/azure-cognitive-services
last_updated: 2026-05-30
---

Azure Custom Vision is an Azure AI service that enables building custom image classification and object detection models using transfer learning, requiring only a small number of labeled training images. The service provides both a web-based portal for no-code model building and REST APIs/SDKs for programmatic access, making it accessible to domain experts without machine learning backgrounds while also supporting developer-driven automation. Custom Vision handles the model architecture selection, training, evaluation, and deployment, allowing teams to focus on labeling domain-specific images rather than managing ML infrastructure.

The service supports two project types. Image classification assigns one or more labels to an entire image -- for example, classifying manufacturing products as pass/fail, identifying plant species in agricultural images, or categorizing document types from scanned images. Object detection locates and classifies multiple objects within an image by drawing bounding boxes -- for example, detecting components on a circuit board, counting items on a retail shelf, or identifying safety equipment in workplace photos. Both project types use transfer learning from Microsoft's pre-trained vision models, which means useful models can be trained with as few as 15 images per class, though accuracy improves with more data.

A distinctive feature is the ability to export trained models as compact models optimized for edge deployment. Export formats include TensorFlow, CoreML, ONNX, Dockerfile, and Vision AI Dev Kit, enabling inference on mobile devices, edge gateways, and embedded hardware without cloud connectivity. This is critical for manufacturing inspection, agricultural drone analysis, and other scenarios where real-time inference at the edge is required and cloud latency or connectivity is unacceptable. The training iteration model supports continuous improvement: as new images are collected in production, they can be labeled and used to retrain the model, progressively improving accuracy over time.

Official documentation: https://learn.microsoft.com/en-us/azure/ai-services/custom-vision-service/

## Key Capabilities

- **Few-Shot Learning** - Transfer learning enables useful model training with as few as 15 labeled images per class, lowering the data barrier for custom vision tasks
- **Edge Export** - Export trained models as TensorFlow, CoreML, ONNX, or Docker containers for inference on mobile and edge devices without cloud dependency
- **No-Code Portal** - Web-based interface for image upload, labeling, training, evaluation, and testing enables domain experts to build models without coding
- **Smart Labeler** - Suggested labels for uploaded images based on the current model accelerate the labeling workflow for iterative training

## AWS Equivalent

Azure Custom Vision is Azure's counterpart to Amazon Lookout for Vision (for defect detection) and Amazon Rekognition Custom Labels (for custom image classification). Custom Vision covers both classification and object detection in a single service with edge export capabilities, while AWS splits these across Lookout for Vision (anomaly/defect detection) and Rekognition Custom Labels (custom classification). Custom Vision's edge export support is more comprehensive.

## Origins and History

Azure Custom Vision launched in general availability in May 2018 as part of Azure Cognitive Services. The service evolved from Microsoft's earlier Project Custom Vision, which was announced at Build 2017. Object detection capability was added in GA in early 2019. The compact model export feature, enabling edge and mobile deployment, was progressively expanded from TensorFlow and CoreML to include ONNX, ARM-optimized models, and Vision AI Dev Kit formats. The Smart Labeler feature for AI-assisted image labeling was introduced in 2020. Microsoft has indicated that Custom Vision capabilities will be progressively integrated into the broader Azure AI Vision service (Florence model-based) for a unified vision AI experience.

## Sources

1. Microsoft Learn. "What is Azure AI Custom Vision?" https://learn.microsoft.com/en-us/azure/ai-services/custom-vision-service/overview
2. Microsoft Azure Blog. "Custom Vision Service general availability." May 2018. https://azure.microsoft.com/en-us/blog/custom-vision-service-is-now-generally-available/
