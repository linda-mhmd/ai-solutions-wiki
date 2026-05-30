---
title: "Computer Vision"
description: "What computer vision is, how it works in AI applications, and how AWS Rekognition, Azure Computer Vision, and GCP Vision AI compare."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "beginner", "computer-vision", "image-recognition", "object-detection", "deep-learning", "cnn"]
last_updated: 2026-05-30
---

Computer vision is a field of artificial intelligence that enables machines to interpret and understand visual information from images and video. Modern computer vision systems use deep learning - specifically convolutional neural networks (CNNs) and transformer architectures - trained on large labeled datasets to classify objects, detect faces, read text, and understand scenes.

## Core Tasks

**Object detection** identifies what objects appear in an image and where (bounding boxes). A video surveillance system detecting people, vehicles, and packages uses object detection.

**Image classification** assigns a label to an entire image. "This image contains a dog" rather than "there is a dog in the bottom-right quadrant."

**Optical character recognition (OCR)** extracts text from images and documents. Receipts, forms, license plates, and signs all contain text that OCR makes machine-readable.

**Facial analysis** detects faces, estimates age/emotion/gaze, and compares faces against reference photos. Used in identity verification, access control, and media applications.

**Scene understanding** labels the overall context of an image (outdoor, beach, kitchen) and identifies relationships between objects.

**Video analysis** extends image capabilities to temporal sequences: tracking objects across frames, detecting specific activities (running, falling), and identifying scene changes.

## AWS: Amazon Rekognition

Amazon Rekognition is AWS's managed computer vision service. It exposes pre-trained models through a simple API - you pass an image (S3 URI or base64) and receive structured JSON results.

Official documentation: https://aws.amazon.com/rekognition/

Key capabilities:
- **Label detection** - identifies thousands of objects, scenes, and activities
- **Face detection and analysis** - bounding boxes, emotions, age range, landmarks
- **Face search** - compare a face against a collection of indexed faces
- **Text in image** - OCR for words in natural scenes
- **Content moderation** - detect unsafe or explicit content with confidence scores
- **Celebrity recognition** - identify public figures
- **Video analysis** - asynchronous job processing for video files stored in S3

Rekognition Custom Labels trains a model on your own labeled images for domain-specific detection (e.g., detecting specific product defects or company logos).

## Azure: Computer Vision

Azure Computer Vision (part of Azure AI Services) offers comparable capabilities: image captioning, object detection, OCR (via Document Intelligence), face detection (Azure Face API), and spatial analysis for video streams. Azure's Document Intelligence is particularly strong for structured document processing beyond basic OCR.

## GCP: Vision AI

Google Cloud Vision AI provides label detection, OCR, face detection, and landmark recognition. Google's Vision API benefits from the training data underlying Google Images and Google Photos. GCP also offers Video Intelligence API for video analysis and Document AI for intelligent document processing.

## Choosing a Service

For AWS-native pipelines, Rekognition integrates directly with S3, Lambda, Step Functions, and EventBridge without additional authentication complexity. Azure Computer Vision is a natural fit for Microsoft-centric environments. GCP Vision AI has strong performance on natural image classification.

All three services offer similar accuracy on common tasks. Choose based on your cloud platform rather than capability differences for standard use cases.

## Sources

- LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). Gradient-based learning applied to document recognition. *Proceedings of the IEEE, 86*(11), 2278–2324. (LeNet; foundational CNN paper for image recognition.)
- Krizhevsky, A., Sutskever, I., & Hinton, G.E. (2012). ImageNet classification with deep convolutional neural networks. *Advances in Neural Information Processing Systems 25*. (AlexNet; demonstrated deep CNN superiority on large-scale image classification.)
- Simonyan, K., & Zisserman, A. (2015). Very deep convolutional networks for large-scale image recognition. *ICLR 2015*. (VGGNet; depth vs. performance analysis.)
- He, K., et al. (2016). Deep residual learning for image recognition. *CVPR 2016*. (ResNet; introduced skip connections enabling much deeper networks.)
- Dosovitskiy, A., et al. (2021). An image is worth 16×16 words: Transformers for image recognition at scale. *ICLR 2021*. (ViT; vision transformer architecture.)
- Ren, S., et al. (2015). Faster R-CNN: Towards real-time object detection with region proposal networks. *NeurIPS 2015*. (Faster R-CNN; standard object detection architecture.)

## Related Articles

- [Amazon Rekognition]({{< relref "/tools/amazon-rekognition.md" >}}) - detailed service guide
- [FFmpeg]({{< relref "/tools/ffmpeg.md" >}}) - frame extraction before Rekognition analysis
- [Building an AI Video Pipeline]({{< relref "/solutions/media/video-pipeline-architecture.md" >}}) - end-to-end example
