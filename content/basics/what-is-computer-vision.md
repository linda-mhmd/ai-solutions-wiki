---
title: "What is Computer Vision?"
description: "Computer vision is the AI field that enables software to understand images and video. Plain-English guide covering how it works and where it is used in 2026."
date: 2026-06-22
level: 1
categories: [Basics]
tags: ["beginner", "computer-vision", "image-recognition", "cnn", "ai-basics", "object-detection"]
docs: "https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html"
docs_label: "AWS Rekognition Documentation"
faqs:
  - question: "What is the difference between computer vision and image recognition?"
    answer: "Image recognition is one task within computer vision: identifying what is in an image (a cat, a car, a face). Computer vision is the broader field that also includes object detection (where are the objects in the image), image segmentation (pixel-level boundaries of each object), depth estimation (how far away objects are), video analysis (what is happening over time), and 3D reconstruction. Image recognition is the most commonly known sub-task."
  - question: "How accurate is computer vision in 2026?"
    answer: "On standard image classification benchmarks, leading models now exceed human-level accuracy (97%+). In real-world production conditions, accuracy depends heavily on the quality and diversity of training data. Medical imaging AI matches or exceeds radiologist performance on specific tasks (detecting certain cancers in scans) but must be validated on local populations. Autonomous vehicle vision systems remain a hard problem due to edge cases in real-world conditions."
  - question: "Do I need a GPU to run computer vision models?"
    answer: "For inference (running a trained model on images), modern lightweight models run acceptably on CPU for non-real-time use cases. For real-time video processing (30+ FPS), a GPU is required. For training computer vision models, a GPU is effectively required: training ResNet-50 on ImageNet takes 14 days on a single CPU vs about 3 hours on a modern GPU. Cloud APIs (AWS Rekognition, Google Vision, Azure Computer Vision) handle the GPU infrastructure for you."
  - question: "What is object detection vs image classification?"
    answer: "Image classification answers 'what is the main subject of this image?' and returns a single label (cat, car, person). Object detection answers 'what objects are in this image and where are they?' and returns bounding boxes with labels for every detected object. Object detection is used in retail (count items on shelves), manufacturing (detect defects on a production line), security (count people, detect vehicles), and autonomous driving (detect other cars, pedestrians, signs)."
  - question: "How does computer vision work with multimodal LLMs?"
    answer: "Multimodal LLMs like GPT-4o, Claude claude-opus-4-8, and Gemini combine computer vision encoders with language model decoders. The vision encoder converts an image into a vector representation that the language model can understand. This allows you to ask questions about images in plain language: 'What defects do you see in this product photo?' or 'Read the text from this invoice and return it as JSON.' Multimodal LLMs have largely replaced standalone computer vision APIs for tasks that require combining visual understanding with language."
---

{{< quickanswer >}}
Computer vision is the field of AI that enables software to understand images and video: recognising objects, detecting faces, reading text, tracking motion, and interpreting what is happening in a visual scene. Modern computer vision uses deep learning (convolutional neural networks and vision transformers) and is embedded in products ranging from smartphone cameras and medical imaging tools to warehouse robots and self-driving cars.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lens-cylinder-copper-notext.png" alt="A precision red machined lens on dark slate: a computer vision model is a precision optical instrument that filters and focuses visual information into structured data." loading="lazy">
  <figcaption>Computer vision acts like a precision optical instrument: where a camera captures raw light, a vision model focuses that signal into structured understanding: what objects are where, doing what.</figcaption>
</figure>

## The core problem computer vision solves

Humans recognise objects effortlessly. You glance at a photo and instantly know it contains two people, a dog, a coffee table, and a window. This task that takes your brain under a second has no simple programmatic solution.

You cannot write code that says "if pixels at position (100, 200) through (300, 400) are brown-ish, it is a dog." Dogs vary wildly in colour, size, breed, pose, and lighting. Computer vision solves this by training neural networks on millions of labelled images until they learn the features that define each class.

## Core computer vision tasks

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Classification</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">What is in this image?</span>
      <span class="bz-arch-chip">Single label output</span>
      <span class="bz-arch-chip-note">Used in: product categorisation, quality control pass/fail, content moderation</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Object detection</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">What objects are where?</span>
      <span class="bz-arch-chip">Bounding boxes + labels</span>
      <span class="bz-arch-chip-note">Used in: retail shelf analysis, security cameras, autonomous driving, defect detection</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Segmentation</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Pixel-level boundaries</span>
      <span class="bz-arch-chip">Semantic (class per pixel)</span>
      <span class="bz-arch-chip">Instance (each object separately)</span>
      <span class="bz-arch-chip-note">Used in: medical imaging, satellite imagery analysis, augmented reality</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">OCR and document understanding</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Optical character recognition</span>
      <span class="bz-arch-chip">Table extraction</span>
      <span class="bz-arch-chip">Form field detection</span>
      <span class="bz-arch-chip-note">Used in: invoice processing, contract extraction, identity document verification</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Video analysis</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Action recognition</span>
      <span class="bz-arch-chip">Object tracking</span>
      <span class="bz-arch-chip">Anomaly detection</span>
      <span class="bz-arch-chip-note">Used in: sports analysis, security monitoring, manufacturing process control</span>
    </div>
  </div>
</div>

## How computer vision works

The dominant architecture for computer vision is the Convolutional Neural Network (CNN), with Vision Transformers (ViT) increasingly replacing them for large-scale tasks.

**How a CNN sees an image:**
1. The first layers detect simple features: edges, corners, gradients
2. Middle layers combine simple features into shapes and textures
3. Deeper layers combine shapes into object parts (wheel, window, door)
4. The final layers combine parts into objects (car)
5. The output layer produces a probability score for each class

```python
import torch
import torchvision.transforms as transforms
from torchvision.models import resnet50, ResNet50_Weights
from PIL import Image

# Load a pre-trained ResNet-50 model (trained on 1.2M ImageNet images)
model = resnet50(weights=ResNet50_Weights.IMAGENET1K_V2)
model.eval()

# Preprocess the image
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

image = Image.open("product_photo.jpg")
input_tensor = transform(image).unsqueeze(0)

# Run inference
with torch.no_grad():
    output = model(input_tensor)
    probabilities = torch.softmax(output, dim=1)
    top5 = torch.topk(probabilities, 5)

# Top 5 predictions with confidence scores
```

## Using computer vision via API

For most production use cases, cloud APIs are faster to deploy than building and hosting your own models.

```python
import boto3
import json

client = boto3.client('rekognition', region_name='eu-west-1')

with open('product.jpg', 'rb') as image_file:
    image_bytes = image_file.read()

# Detect objects and labels
response = client.detect_labels(
    Image={'Bytes': image_bytes},
    MaxLabels=10,
    MinConfidence=70
)

for label in response['Labels']:
    print(f"{label['Name']}: {label['Confidence']:.1f}%")
    # Output examples:
    # Person: 99.8%
    # Clothing: 94.2%
    # Laptop: 87.3%
```

## Multimodal LLMs: computer vision plus language

Modern multimodal LLMs combine vision understanding with language generation. Instead of getting a label list, you ask questions about the image in plain language:

```python
from anthropic import Anthropic
import base64

client = Anthropic()

with open("invoice.jpg", "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode("utf-8")

response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",
                        "data": image_data,
                    },
                },
                {
                    "type": "text",
                    "text": "Extract all line items from this invoice and return as JSON with fields: description, quantity, unit_price, total."
                }
            ],
        }
    ],
)

print(response.content[0].text)
```

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Define the task</span>
    <span class="bz-flow-step-desc">Decide: classification, detection, segmentation, OCR, or open-ended visual Q&A. Task determines the right model and API.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Choose access route</span>
    <span class="bz-flow-step-desc">Cloud API (AWS Rekognition, Google Vision, Azure) for standard tasks. Multimodal LLM (GPT-4o, Claude) for complex visual reasoning. Open-source model for custom tasks needing fine-tuning.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Integrate and validate</span>
    <span class="bz-flow-step-desc">Test on representative images from your actual use case. AI accuracy on stock photos differs significantly from accuracy on your specific image types and conditions.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Fine-tune if needed</span>
    <span class="bz-flow-step-desc">If a pre-trained model's accuracy is insufficient on your specific images (unusual products, niche defect types), fine-tune with 50-500 labelled examples of your actual data.</span>
  </div>
</div>

## Computer vision services comparison

| Service | Best for | Pricing (approx.) |
|---|---|---|
| **AWS Rekognition** | Face detection, content moderation, label detection | €0.001-€0.004/image |
| **Google Cloud Vision** | OCR, logo detection, label detection | €0.0015-€0.006/image |
| **Azure Computer Vision** | Document analysis, OCR, spatial analysis | €0.001-€0.004/image |
| **AWS Textract** | Structured document extraction (forms, tables) | €0.015/page |
| **GPT-4o / Claude** | Complex visual reasoning, multimodal Q&A | €0.003-€0.015/image |
| **YOLO (open source)** | Real-time object detection, self-hosted | Free (self-host cost only) |

## When not to use off-the-shelf computer vision

**Highly specific domain images**: A model trained on consumer photos will underperform on satellite imagery, manufacturing defect photos, or medical scans. These domains require fine-tuning on domain-specific training data.

**Real-time on-device requirements**: Cloud APIs add 100-500ms of latency. For real-time applications on edge devices (cameras, robots, phones), you need lightweight models like MobileNet or YOLO that run locally.

**Highly regulated medical contexts**: Medical AI in EU healthcare must comply with the Medical Device Regulation (MDR) and the EU AI Act's high-risk provisions. Consumer-grade APIs are not certified for clinical diagnosis.

## What's next

- [What is Machine Learning?](/basics/what-is-machine-learning/): The training process behind computer vision models
- [What is a Neural Network?](/basics/what-is-a-neural-network/): CNNs and ViTs are neural networks: understanding the architecture helps
- [AWS Rekognition](/tools/aws-rekognition/): Deep dive on the AWS managed computer vision service

## Further reading

- [AWS Rekognition documentation](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html): API reference for face detection, label detection, and content moderation
- [PyTorch Computer Vision Tutorial](https://pytorch.org/tutorials/intermediate/torchvision_tutorial.html): How to train an object detection model with your own images
- [Roboflow](https://roboflow.com): Platform for labelling images and training custom object detection models, used by teams without ML expertise
- [Papers With Code: Computer Vision](https://paperswithcode.com/area/computer-vision): Benchmark results and state-of-the-art models for all CV tasks
