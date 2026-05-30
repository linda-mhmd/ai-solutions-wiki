---
title: "Amazon Lookout for Vision - Visual Anomaly Detection"
description: "A comprehensive reference for Amazon Lookout for Vision: automated visual inspection, defect detection, and deployment patterns for manufacturing and quality assurance."
date: 2026-03-28
categories: [Tools]
tags: [amazon-lookout-vision, AWS, computer-vision, anomaly-detection, manufacturing, quality]
related:
  - tools/amazon-rekognition
  - tools/amazon-sagemaker
  - tools/aws-s3
last_updated: 2026-05-30
---

Amazon Lookout for Vision is a managed computer vision service designed for visual quality inspection. It detects defects, anomalies, and irregularities in images of manufactured products, materials, or any visual subject where you need to distinguish "normal" from "abnormal." The service requires as few as 30 normal images and 20 anomalous images to train a usable model, making it accessible for industrial use cases where labeled defect data is scarce.

Official documentation: https://docs.aws.amazon.com/lookout-for-vision/
Pricing: https://aws.amazon.com/lookout-for-vision/pricing/
Service quotas: https://docs.aws.amazon.com/lookout-for-vision/latest/developer-guide/limits.html

## Core Concepts

**Project** - The top-level container that groups datasets and models for a single inspection task (for example, inspecting circuit boards for solder defects).

**Dataset** - A collection of labeled images split into training and test sets. Images are labeled as "normal" or "anomaly." For segmentation models, anomalous images also include pixel-level masks indicating the defect location.

**Model** - A trained visual inspection model. Lookout for Vision supports two model types: image classification (normal vs anomaly at the image level) and image segmentation (identifying the location and type of defect within the image). Segmentation models require more labeled data but provide richer output.

**Anomaly Detection** - The inference operation. You send an image to a running model, and it returns a classification (normal/anomaly), a confidence score, and for segmentation models, a pixel mask highlighting the defect areas.

## Training a Model

The workflow is straightforward. Upload images to S3, create a dataset in Lookout for Vision with labels, and start training. The service handles architecture selection, data augmentation, and hyperparameter optimization. Training typically completes in 1-2 hours.

The minimum data requirements are 20 normal and 10 anomaly images for classification, or 20 normal and 20 anomaly images with masks for segmentation. In practice, model quality improves significantly with more data. Aim for 100+ images of each class when possible, covering the full range of normal variation and defect types.

Image quality matters: use consistent lighting, camera angle, and resolution across your dataset. Variation in these factors becomes noise that the model must learn to ignore, reducing its ability to detect actual defects.

## Model Evaluation

After training, Lookout for Vision provides precision, recall, and F1 scores on the test set. For manufacturing use cases, pay particular attention to recall (the percentage of actual defects caught) because missed defects are typically more costly than false positives. Adjust the confidence threshold at inference time to trade off between precision and recall based on your cost model.

## Deployment Options

**Cloud inference** - Start the model as a hosted endpoint and send images via API. Suitable for inspection stations with network connectivity. Latency is typically 100-500ms per image depending on size.

**Edge deployment** - Package the model for AWS IoT Greengrass and run inference on edge devices. This is the preferred approach for factory floor deployments where network latency or connectivity is a concern. The edge model runs on standard hardware (x86 or ARM with sufficient memory).

## Integration Patterns

A typical manufacturing inspection pipeline works as follows: a camera captures an image at a production line station, the image is sent to Lookout for Vision (cloud or edge), the model returns normal or anomaly with confidence, and the system triggers an action (pass the item, divert it for manual inspection, or halt the line).

For cloud deployments, the common architecture uses S3 event notifications or Kinesis Video Streams to trigger Lambda functions that call the Lookout for Vision API. Results are stored in DynamoDB for tracking and sent to SNS for alerting when defects exceed a threshold rate.

## Limitations

Lookout for Vision is purpose-built for binary anomaly detection and simple defect classification. It does not support complex multi-class classification (distinguishing between 20 different defect types), object detection (finding and locating multiple objects in a scene), or OCR. For those capabilities, use Amazon Rekognition Custom Labels or SageMaker with a custom model.

## Pricing

Pricing covers three components: training (per hour), cloud inference (per hour the model is running), and edge inference (per unit deployed per month). The inference hosting cost runs continuously while the model is active, so factor this into the cost model. For intermittent inspection needs, consider starting and stopping the model on a schedule.
