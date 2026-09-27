---
title: "Azure Computer Vision - AI-Powered Image and Video Analysis"
description: "Azure Computer Vision is an AI service that analyzes images and videos to extract visual features, detect objects, read text, and generate descriptions using deep learning models."
date: 2026-03-28
categories: [Tools]
tags: [azure, computer-vision, image-analysis, ocr, object-detection, ai-services]
related:
  - tools/amazon-rekognition
  - tools/azure-cognitive-services
  - tools/azure-custom-vision
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Azure Computer Vision is a cloud-based AI service within Azure AI Services that provides pre-trained deep learning models for analyzing images and videos. The service extracts rich visual information including object detection, image classification, text recognition (OCR), image captioning and dense captioning, and face detection. Powered by Microsoft's Florence large vision model, Image Analysis 4.0 provided significantly improved accuracy compared to earlier versions. For AI pipelines, Computer Vision provides the visual understanding layer that processes images from cameras, documents, product photos, satellite imagery, and video streams.

The Image Analysis 4.0 API, built on the Florence foundation model, provides a unified endpoint for multiple vision tasks. Image captioning generates natural language descriptions of image content. Dense captioning provides descriptions for multiple regions within an image. Object detection identifies and locates objects with bounding boxes across thousands of object categories. Tagging assigns content tags with confidence scores. Smart cropping identifies the most important region of an image for aspect ratio-appropriate thumbnails. The multimodal embedding feature generates vector representations of both images and text in a shared embedding space, enabling semantic image search where text queries find visually relevant images without manual tagging.

OCR (optical character recognition) extracts printed and handwritten text from images and documents in over 160 languages. The Read API handles complex documents with mixed content including tables, headers, footnotes, and multiple columns, returning structured text output with bounding box coordinates, confidence scores, and reading order detection. Spatial Analysis, now retired, used edge-deployed models on Azure Stack Edge devices to understand people's movement and presence in physical spaces from video feeds (occupancy monitoring, queue management, zone-based entry/exit counting).

**Status (September 2026):** Microsoft now brands the service Azure Vision in Foundry Tools. The Image Analysis 4.0 API is **deprecated and will be retired on 25 September 2028**; Microsoft's migration guide points to GPT-family multimodal models in Microsoft Foundry and to Azure Content Understanding. Spatial Analysis has been retired, and its documentation now redirects to Azure Content Understanding for video. The Read (OCR) API is listed as legacy. Plan new projects on the recommended alternatives rather than on Image Analysis 4.0.

Official documentation: https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/

## Key Capabilities

- **Florence Foundation Model** - Image Analysis 4.0 powered by Microsoft's large vision model provides state-of-the-art accuracy for captioning, detection, and classification
- **Multimodal Embeddings** - Joint image-text embedding space enables semantic image search using natural language queries without manual tagging
- **Advanced OCR** - Reads printed and handwritten text in 160+ languages from complex documents with table detection and reading order preservation

## AWS Equivalent

Azure Computer Vision is Azure's counterpart to Amazon Rekognition. Both provide pre-trained vision models for image and video analysis, but Computer Vision's Florence foundation model-based architecture provides a unified model for multiple tasks with multimodal embeddings, while Rekognition offers separate models for specific tasks (face analysis, content moderation, custom labels). Rekognition's face analysis and celebrity recognition features are more mature. With Image Analysis 4.0 on a retirement path, the closer Azure counterpart for new builds is multimodal LLMs in Microsoft Foundry or Azure Content Understanding.

## Origins and History

Azure Computer Vision was one of the original Cognitive Services APIs, first offered as part of Project Oxford at Build 2015 in April 2015. It became part of Azure Cognitive Services in 2016. The Read API for advanced OCR was added in 2019. Spatial Analysis for video understanding launched in 2020. The major upgrade to Image Analysis 4.0, powered by the Florence large vision model developed by Microsoft Research, was released in GA in 2023. This version introduced multimodal embeddings, dense captioning, and significantly improved accuracy across all vision tasks. Background removal and custom model training on top of the Florence base model were added as additional capabilities in 2023-2024. Microsoft has since deprecated Image Analysis 4.0, with retirement set for 25 September 2028.

## Sources

1. Microsoft Learn. "What is Azure AI Computer Vision?" https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview
2. Microsoft Research. "Florence: A New Foundation Model for Computer Vision." November 2021. https://www.microsoft.com/en-us/research/project/project-florence-vl/
3. Microsoft Learn. "Migrate from Azure Vision Image Analysis" (retirement 25 September 2028), accessed 25 September 2026. https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/migration-options
