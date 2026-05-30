---
title: "Amazon Fraud Detector - ML-Based Fraud Prevention"
description: "A comprehensive reference for Amazon Fraud Detector: building fraud detection models, defining rules, and integrating real-time fraud scoring into transaction workflows."
date: 2026-03-28
categories: [Tools]
tags: [amazon-fraud-detector, AWS, fraud-detection, ML, security]
related:
  - tools/amazon-sagemaker
  - tools/aws-lambda
  - tools/amazon-eventbridge
last_updated: 2026-05-30
---

Amazon Fraud Detector is a managed service that uses machine learning to identify potentially fraudulent activity in real time. It combines your historical fraud data with Amazon's fraud detection expertise (patterns learned from AWS and Amazon.com) to train models that score transactions, account registrations, or any event for fraud risk. The service is designed so that fraud analysts and application developers can build and deploy detection models without deep ML knowledge.

Official documentation: https://docs.aws.amazon.com/frauddetector/
Pricing: https://aws.amazon.com/fraud-detector/pricing/

## Core Concepts

**Event Type** - Defines the schema of the activity you want to evaluate. For an online payment event, the schema might include IP address, email, transaction amount, card BIN, and device fingerprint. Each event type has associated entity types (the actor, such as a customer or merchant) and labels (legitimate or fraudulent).

**Model** - A trained ML model. Fraud Detector supports two model types: Online Fraud Insights (OFI), which uses your data plus Amazon's internal fraud patterns, and Transaction Fraud Insights (TFI), which adds payment-specific features like card velocity and address verification. You provide labeled historical data (events marked as fraud or legitimate), and the service trains a model automatically.

**Detector** - The evaluation engine. A detector combines one or more models with rules to produce outcomes. When you send an event to a detector, it scores the event using the model, evaluates rules against the score and event attributes, and returns an outcome.

**Rules** - Business logic that maps model scores and event attributes to outcomes. For example: if model score > 900, outcome is "block"; if model score > 700 and email domain is a free provider, outcome is "review"; otherwise outcome is "approve." Rules give fraud analysts direct control over decision thresholds without retraining models.

**Outcomes** - The actions associated with rule matches. Typical outcomes are approve, review, and block. Your application receives the outcome and acts accordingly.

## Building a Fraud Detection Model

The workflow follows a structured sequence. First, define the event type with all relevant variables. Second, upload historical data to S3 in the required format (CSV with event variables, timestamps, and fraud labels). Third, create and train a model. Fraud Detector handles feature engineering, algorithm selection, and hyperparameter tuning automatically. Training typically takes 1-4 hours depending on data volume.

After training, Fraud Detector provides a model performance report including AUC-ROC, score distributions for fraud and legitimate events, and confusion matrix metrics at various thresholds. Review these carefully: a model with high AUC but poor calibration can still produce poor business outcomes.

## Data Requirements

The minimum training data is 10,000 events with at least 500 fraud labels. In practice, models improve significantly with more data. The fraud rate in your training data does not need to match the production fraud rate; Fraud Detector handles class imbalance internally.

Data quality is paramount. Common pitfalls include labeling delays (fraud discovered weeks after the event, leading to mislabeled training data), survivorship bias (training only on transactions that passed existing rules), and feature leakage (including variables that are only available after the fraud decision).

## Real-Time Evaluation

The GetEventPrediction API evaluates an event in real time, typically returning a result in under 100ms. The response includes the model score, matched rules, and resulting outcome. Integrate this into your transaction flow at the decision point: after the user submits a payment but before the charge is authorized.

For high-volume applications, the API supports up to 2,000 TPS per detector by default, with higher limits available through a service quota increase request.

## Rules vs Model Scores

The combination of ML scores and deterministic rules is what makes Fraud Detector practical for production use. Models catch nuanced patterns that rules miss. Rules handle known fraud patterns immediately without waiting for model retraining. Fraud analysts can adjust rule thresholds in real time as fraud patterns shift, while model retraining happens on a scheduled basis (monthly or quarterly).

## Pricing

Fraud Detector charges per event evaluated and per model training hour. The per-event cost decreases at higher volumes. For planning purposes, the evaluation cost is the dominant factor: estimate your monthly transaction volume and multiply by the per-event rate. Training costs are periodic and typically small relative to evaluation costs at production scale.
