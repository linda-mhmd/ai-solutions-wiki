---
title: "AutoML - Automated Machine Learning Model Training"
description: "Google AutoML enables users to train custom ML models for vision, language, tabular data, and video with minimal machine learning expertise through automated model architecture search."
date: 2026-03-28
categories: [Tools]
tags: [gcp, google-cloud, automl, machine-learning, model-training, no-code-ml]
related:
  - tools/amazon-sagemaker
  - tools/google-vertex-ai
  - tools/google-cloud-vision
  - tools/google-cloud-natural-language
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Google AutoML is a suite of machine learning products that enables developers and data scientists to train custom, high-quality models with minimal ML expertise. AutoML uses neural architecture search (NAS) and transfer learning to automatically find the best model architecture and hyperparameters for a given dataset and task. Users provide labeled training data, select a task type, and AutoML handles feature engineering, architecture selection, hyperparameter tuning, and model evaluation -- producing a deployable model without writing training code.

AutoML is now integrated into Vertex AI (rebranded Gemini Enterprise Agent Platform in April 2026 — see [Google Vertex AI](/tools/google-vertex-ai/) for the full story) as the primary interface for no-code/low-code model training. It originally covered four domains: AutoML Vision (image classification and object detection), AutoML Natural Language (text classification, entity extraction, sentiment analysis), AutoML Tables (tabular data classification, regression, and forecasting), and AutoML Video Intelligence (video classification, object tracking, action recognition). Two of those are gone. Training new AutoML Text models (classification, entity extraction, sentiment) ended on 15 September 2024, and existing AutoML Text models could be served only until 15 June 2025; Google points text customisation to Gemini prompting and tuning instead. AutoML Video was deprecated on 31 July 2024 and is no longer available since 31 July 2025, with Gemini fine-tuning on video data as the suggested path. Image and tabular AutoML remain. Each domain applies its own preprocessing, augmentation, and architecture search strategies. AutoML Tables is particularly notable because it competes with traditional ML approaches (XGBoost, random forests) on tabular data, often matching or exceeding manually tuned models.

The practical value of AutoML is in the middle ground between pre-trained APIs and custom model training. Pre-trained APIs (Vision AI, Natural Language AI) work out of the box but may not recognize domain-specific patterns. Custom model training on Vertex AI provides full control but requires ML engineering expertise. AutoML bridges this gap: a domain expert with labeled data but no ML experience can produce a custom model that recognizes their specific image categories, text classifications, or tabular prediction targets. Models can be deployed to Vertex AI endpoints for online prediction, exported to TensorFlow Lite for edge/mobile deployment, or used for batch prediction on Cloud Storage data.

## Key Capabilities

- **Neural Architecture Search** - Automatically discovers optimal model architectures through Google's NAS technology, producing models tailored to the specific dataset.
- **Transfer Learning** - Leverages pre-trained models as a starting point, enabling high accuracy even with small training datasets (hundreds of examples).
- **Image and Tabular Coverage** - Supports image and tabular tasks under Vertex AI; the text and video AutoML objectives have been retired in favour of Gemini tuning.
- **Edge Export** - Export trained image models to TensorFlow Lite (now branded LiteRT) for deployment on mobile devices, edge hardware, and IoT devices.

## AWS Equivalent

AutoML is Google Cloud's counterpart to Amazon SageMaker Autopilot. Both services automate model training, hyperparameter tuning, and model selection. SageMaker Autopilot focuses on tabular data and generates readable notebooks showing the training process, while AutoML covers image as well as tabular data (its text and video objectives have been retired). SageMaker Canvas provides a similar no-code interface. Google's AutoML benefits from Google's pioneering research in neural architecture search (the NASNet paper), while SageMaker offers deeper integration with the broader SageMaker ecosystem.

## Origins and History

Google AutoML was announced in January 2018, with AutoML Vision as the first product. The technology was based on Google Brain's neural architecture search research, including the 2017 NASNet paper by Zoph et al. AutoML Natural Language and AutoML Translation followed in mid-2018. AutoML Tables for tabular data launched in April 2019. In 2021, Google consolidated all AutoML products under Vertex AI, making Vertex AI the unified interface for both AutoML and custom model training. AutoML Edge models, enabling export to TensorFlow Lite, were introduced in 2019 for vision and later expanded to other domains. Since 2024 Google has narrowed AutoML, retiring the text and video objectives in favour of Gemini prompting and tuning.

## Sources

1. Google Cloud Documentation. "AutoML overview." https://cloud.google.com/vertex-ai/docs/beginner/beginners-guide
2. Zoph, B. et al. "Learning Transferable Architectures for Scalable Image Recognition." CVPR 2018. https://arxiv.org/abs/1707.07012
3. Google Cloud Documentation. "Vertex AI deprecations" (AutoML Video shut down 31 July 2025; AutoML Text training ended 15 September 2024, existing models served until 15 June 2025). https://cloud.google.com/vertex-ai/docs/deprecations
