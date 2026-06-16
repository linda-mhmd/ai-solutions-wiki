---
title: "Amazon Lookout for Vision - Visual Anomaly Detection"
description: "Amazon Lookout for Vision was an AWS visual inspection service. AWS ended support on 31 October 2025. Use SageMaker AI or Amazon Bedrock instead."
date: 2026-03-28
categories: [Tools]
tags: [amazon-lookout-vision, AWS, computer-vision, anomaly-detection, manufacturing, quality, "aws-service"]
related:
  - tools/amazon-rekognition
  - tools/amazon-sagemaker
  - tools/amazon-bedrock
  - tools/aws-s3
layer: models
provider: aws
pricing_model: payg
maturity: production
status: discontinued
status_detail: "AWS closed Amazon Lookout for Vision to new customers on 10 October 2024 and ended support on 31 October 2025. After that date the console, APIs, and existing resources stopped working. AWS recommends Amazon SageMaker AI (with built-in computer vision algorithms and SageMaker JumpStart) or Amazon Bedrock as replacements."
status_source: "https://aws.amazon.com/blogs/machine-learning/exploring-alternatives-and-seamlessly-migrating-data-from-amazon-lookout-for-vision/"
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

> Discontinued service. AWS closed Amazon Lookout for Vision to new customers on 10 October 2024 and ended support on 31 October 2025. After that date you can no longer access the Lookout for Vision console, APIs, or resources. Do not start new projects on it. For visual quality inspection today, use Amazon SageMaker AI (with built-in computer vision algorithms or models from SageMaker JumpStart), Amazon Bedrock, or an AWS Partner solution. See the official migration guidance in Sources. This page is kept for reference and to help anyone migrating off the service.

Amazon Lookout for Vision was a managed computer vision service for visual quality inspection. It detected defects, anomalies, and irregularities in images of manufactured products, materials, or any visual subject where you need to distinguish "normal" from "abnormal." The service could train a usable model from a small set of example images, which made it attractive for industrial use cases where labeled defect data is scarce.

Official documentation (archived): https://docs.aws.amazon.com/lookout-for-vision/
Migration and alternatives: https://aws.amazon.com/blogs/machine-learning/exploring-alternatives-and-seamlessly-migrating-data-from-amazon-lookout-for-vision/

## Foundations for beginners

Before the specifics, a few plain-language ideas this service was built on:

- **Computer vision** - getting software to interpret the content of images and video, for example "is there a scratch on this part?" See {{< relref "glossary/computer-vision" >}}.
- **Anomaly detection** - learning what "normal" looks like from examples, then flagging anything that deviates from it. This matters when defects are rare and you have far more good examples than bad ones. See {{< relref "glossary/anomaly-detection" >}}.
- **Model training and inference** - training is teaching a model from labeled examples; inference is running the trained model on new images to get a prediction. See {{< relref "glossary/inference" >}}.
- **Object storage** - Lookout for Vision read its training images from Amazon S3, AWS object storage, where each image is stored as an object in a bucket. See {{< relref "tools/aws-s3" >}}.

In the AI stack, Lookout for Vision sat at the models layer: a pre-built, task-specific model you trained on your own data rather than a general purpose foundation model.

## What replaced it

AWS recommends three migration paths, in its own migration guidance:

- **Amazon SageMaker AI** - build, train, and deploy custom computer vision models, including built-in algorithms and pre-trained defect detection models from SageMaker JumpStart. This is the closest like-for-like path for a custom inspection model. See {{< relref "tools/amazon-sagemaker" >}}.
- **Amazon Bedrock** - for use cases without strict low-latency requirements, foundation models can describe images and help flag visual issues, and can generate code to build a detection pipeline. See {{< relref "tools/amazon-bedrock" >}}.
- **AWS Partner solutions** - pre-built SaaS and managed services for visual quality inspection, listed in the AWS Solutions Library under "Computer Vision for Quality Insights".

Amazon Lookout for Vision is part of a wider AWS Lookout family wind-down: Amazon Lookout for Metrics also reached end of support in 2025 (see its own transition guidance). Lookout for Equipment was a separate product. The sections below describe how Lookout for Vision worked, for readers maintaining or migrating an existing deployment.

## Core Concepts

The concepts below describe how the service worked. They are written in the past tense because the service is no longer available, but the ideas carry over to the SageMaker AI and Bedrock paths that replaced it.

**Project** - The top-level container that grouped datasets and models for a single inspection task (for example, inspecting circuit boards for solder defects).

**Dataset** - A collection of labeled images split into training and test sets. Images were labeled as "normal" or "anomaly." For segmentation models, anomalous images also included pixel-level masks indicating the defect location.

**Model** - A trained visual inspection model. Lookout for Vision supported two model types: image classification (normal vs anomaly at the image level) and image segmentation (identifying the location and type of defect within the image). Segmentation models required more labeled data but provided richer output.

**Anomaly detection** - The inference operation. You sent an image to a running model, and it returned a classification (normal or anomaly), a confidence score, and for segmentation models, a pixel mask highlighting the defect areas.

## Training a Model

The workflow was straightforward. Upload images to Amazon S3, create a dataset in Lookout for Vision with labels, and start training. The service handled architecture selection, data augmentation, and hyperparameter optimization.

The service could train from a small starter set: a modest number of normal images plus a smaller number of anomalous examples for classification, and anomalous images with pixel masks for segmentation. In practice, model quality improved significantly with more data. The general guidance was to gather many examples of each class when possible, covering the full range of normal variation and defect types.

Image quality mattered: use consistent lighting, camera angle, and resolution across the dataset. Variation in these factors becomes noise that the model must learn to ignore, which reduces its ability to detect actual defects. This guidance applies equally to any computer vision model you train on a replacement service.

## Model Evaluation

After training, Lookout for Vision reported precision, recall, and F1 score on the test set. For manufacturing use cases, recall (the share of actual defects caught) usually matters most, because a missed defect is typically more costly than a false alarm. You could adjust the confidence threshold at inference time to trade off precision against recall based on your cost model. See {{< relref "glossary/precision-recall" >}} and {{< relref "glossary/f1-score" >}} for what these metrics mean. These same metrics and trade-offs apply when you evaluate a replacement model on SageMaker AI.

## Deployment Options

**Cloud inference** - Start the model as a hosted endpoint and send images via the API. Suitable for inspection stations with reliable network connectivity.

**Edge deployment** - Package the model for AWS IoT Greengrass and run inference on edge devices. This was the preferred approach for factory floor deployments where network latency or connectivity was a concern, since the model could run on standard hardware close to the camera. See {{< relref "glossary/edge-computing" >}}.

## Integration Patterns

A typical manufacturing inspection pipeline worked as follows: a camera captured an image at a production line station, the image was sent to the model (cloud or edge), the model returned normal or anomaly with a confidence score, and the system triggered an action (pass the item, divert it for manual inspection, or halt the line).

For cloud deployments, a common architecture used Amazon S3 event notifications or Kinesis Video Streams to trigger AWS Lambda functions that called the Lookout for Vision API. Results were stored in DynamoDB for tracking and sent to Amazon SNS for alerting when defects exceeded a threshold rate. The same event-driven shape, S3 to Lambda to a model endpoint to a datastore and alerting, carries over to a SageMaker AI based replacement. See {{< relref "tools/aws-lambda" >}}.

## Limitations

Lookout for Vision was purpose-built for binary anomaly detection and simple defect classification. It did not support complex multi-class classification (distinguishing between many different defect types), object detection (finding and locating multiple objects in a scene), or optical character recognition. For those capabilities, use Amazon Rekognition or Amazon SageMaker AI with a custom model. The most fundamental limitation today is that the service is discontinued, so it cannot be used for any new work.

## Migration and pricing

The service has ended, so there is no current pricing. While it was active, charges covered training (per hour), cloud inference (per hour the model was running), and edge inference (per unit deployed per month). Anyone still on Lookout for Vision should plan an exit: AWS provided an SDK export to copy a dataset (training images plus manifest files) from the service into an Amazon S3 bucket, which you can then reuse to train a model on SageMaker AI or another platform. See the migration guidance in Sources.

## Best practices

For visual inspection on AWS today, use the AWS Well-Architected Machine Learning Lens to design the replacement workload (data, training, deployment, and monitoring): https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html . For computer vision specifically, AWS Prescriptive Guidance covers image classification approaches on AWS: https://docs.aws.amazon.com/prescriptive-guidance/latest/image-classification/ .

## Sources

- AWS Machine Learning Blog, "Exploring alternatives and seamlessly migrating data from Amazon Lookout for Vision" (official discontinuation and migration guidance, with dates): https://aws.amazon.com/blogs/machine-learning/exploring-alternatives-and-seamlessly-migrating-data-from-amazon-lookout-for-vision/
- Amazon Lookout for Vision Developer Guide (archived documentation): https://docs.aws.amazon.com/lookout-for-vision/latest/developer-guide/
- Amazon Lookout for Vision API Reference: https://docs.aws.amazon.com/lookout-for-vision/latest/APIReference/Welcome.html
- AWS Press release, "AWS Announces General Availability of Amazon Lookout for Vision" (24 February 2021, launch context): https://press.aboutamazon.com/news-releases/news-release-details/aws-announces-general-availability-amazon-lookout-vision
- Amazon SageMaker AI (recommended replacement for custom vision models): https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html
- AWS Well-Architected Machine Learning Lens (design guidance for a replacement workload): https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html
