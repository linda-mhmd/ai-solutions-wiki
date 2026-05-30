---
title: "Amazon Rekognition - Image and Video Analysis"
description: "What Rekognition does, which features work well in enterprise applications, accuracy considerations, pricing, and common integration patterns."
date: 2026-03-24
categories: [Tools]
tags: ["ai-ml", "intermediate", "computer-vision", "image-analysis", "video-analysis", "aws", "object-detection"]
last_updated: 2026-05-30
---

Amazon Rekognition is AWS's managed computer vision service. It provides pre-trained models for object detection, scene analysis, text detection, facial analysis, and content moderation - accessible through an API without requiring ML expertise to deploy or operate.

## Core Feature Areas

**Object and scene detection** - Identifies thousands of objects, activities, and scenes in images. Returns labels with confidence scores and bounding box coordinates. Useful for content categorization, asset management, and search indexing for image libraries.

**Text detection** - Extracts printed and handwritten text from images, returning text content and bounding boxes. This is distinct from Amazon Textract - Rekognition's text detection handles in-scene text (signs, labels, screens) while Textract is optimized for structured document extraction.

**Facial analysis** - Detects faces and analyzes attributes: approximate age range, emotions, face landmarks, pose. Does not identify individuals unless used with a custom face collection.

**Face search (custom collections)** - Build a private database of faces and search images or video streams for matching individuals. Used in identity verification workflows and access control systems. Not a public celebrity recognition feature - you provide and control the face collection.

**Content moderation** - Classifies images and video frames by content type, flagging nudity, violence, drugs, hate symbols, and gambling content. Confidence thresholds are configurable. Common in user-generated content moderation workflows.

**Video analysis** - All features above apply to video, either as stored video files (S3) or via Kinesis Video Streams for real-time analysis. Video analysis runs asynchronously; you poll for job completion or receive an SNS notification.

**Custom labels** - Train a custom object detection model using your own labeled images. Useful when the pre-trained object categories do not match your specific use case (e.g., detecting specific product types, equipment models, or damage types). Requires 50-250 labeled training images per class.

## When to Use Rekognition

Rekognition is the right choice when:
- You need computer vision capabilities without building or hosting models
- Your use case fits the pre-trained categories (objects, scenes, text, faces, moderation)
- You are on AWS and want simple IAM-based access control
- You need to process images at scale without GPU infrastructure

Custom Labels is the right path when the pre-trained categories do not cover your domain. If Custom Labels accuracy is insufficient after training with available labeled data, SageMaker with a custom model may be needed.

## Accuracy Considerations

Pre-trained model accuracy varies significantly by use case. Object detection on clear, well-lit images performs well. Text detection accuracy degrades with handwriting, unusual fonts, and low resolution. Content moderation has configurable thresholds to trade off false positives against false negatives.

Always validate accuracy on representative samples from your actual production data, not on demo or benchmark data. For regulated applications (content moderation with legal implications, identity verification), Rekognition output should inform, not replace, human review.

## Pricing

Rekognition is priced per image analyzed (for image features) or per minute of video analyzed (for video features). Custom Labels has separate training and inference pricing. Free tier covers 5,000 images/month for the first 12 months.

At high volume, per-image costs add up quickly. For workloads processing millions of images monthly, evaluate whether SageMaker hosting of open-source vision models (YOLO, ViT) offers a better cost profile at the expense of operational overhead.
