---
title: "Amazon Fraud Detector - ML-Based Fraud Prevention"
description: "Amazon Fraud Detector: ML fraud scoring with rules. Closed to new customers November 2025, end of support October 2026. Plan a migration."
date: 2026-03-28
categories: [Tools]
tags: [AWS, fraud-detection, ML, security, "aws-service"]
related:
  - tools/amazon-sagemaker
  - tools/aws-waf
  - tools/aws-lambda
  - tools/amazon-eventbridge
layer: data
provider: aws
pricing_model: payg
maturity: production
status: deprecated
status_detail: "Closed to new customers as of November 7, 2025. AWS lists it in Services in Sunset with an announcement date of October 7, 2025 and an end of support date of October 7, 2026, after which AWS will end operations and support. Existing customers can continue using it until then."
status_source: "https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html"
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Fraud Detector is a managed service that uses machine learning to identify potentially fraudulent activity in real time. It combines your historical fraud data with Amazon's fraud detection expertise (patterns learned from AWS and Amazon.com) to train models that score transactions, account registrations, or any event for fraud risk. The service is designed so that fraud analysts and application developers can build and deploy detection models without deep ML knowledge.

> Status notice (verify before you build): Amazon Fraud Detector is closed to new customers as of November 7, 2025, and AWS lists it under Services in Sunset with an end of support date of October 7, 2026. After that date AWS will end operations and support for the service. Existing customers can keep using it until then, but you should not start a new project on it. AWS recommends [AutoGluon](https://auto.gluon.ai/) (an open-source AutoML library, often deployed on {{< relref "tools/amazon-sagemaker" >}}) for fraud model building, and [AWS WAF](https://aws.amazon.com/waf/) Fraud Control for account creation and login abuse. See the official [availability change notice](https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html). The rest of this page documents how the service works and remains useful for current users planning a migration.

## Beginner foundations

Before the specifics, the underlying ideas:

- **Fraud detection** - deciding, automatically and fast, whether a given action (a payment, a sign-up, a withdrawal) is genuine or an attack. It is a real-time risk decision made on incomplete information, not a forensic investigation after the fact.
- **Supervised machine learning** - training a model on past examples that are already labelled (here, events tagged "fraud" or "legitimate") so it can score new, unseen events. See {{< relref "glossary/supervised-learning" >}}.
- **Class imbalance** - in fraud data, the vast majority of events are legitimate and only a tiny fraction are fraud, which makes naive models lazy (predicting "legitimate" for everything looks accurate but catches nothing). See {{< relref "glossary/imbalanced-data" >}}.
- **Inference** - using a trained model to score a live event, as opposed to training it. See {{< relref "glossary/inference" >}}.

Where this sits in the AI stack: Fraud Detector is a data and modelling service. You feed it labelled historical event data, it trains a model, and your application calls it for a real-time decision.

Official documentation: https://docs.aws.amazon.com/frauddetector/
Pricing: https://aws.amazon.com/fraud-detector/pricing/

## Core Concepts

**Event Type** - Defines the schema of the activity you want to evaluate. For an online payment event, the schema might include IP address, email, transaction amount, card BIN, and device fingerprint. Each event type has associated entity types (the actor, such as a customer or merchant) and labels (legitimate or fraudulent).

**Model** - A trained ML model. Fraud Detector supports three model types: Online Fraud Insights (OFI), which uses your data plus Amazon's internal fraud patterns and works with little historical data, Transaction Fraud Insights (TFI), which adds payment-specific features like card velocity and aggregates for transactional events, and Account Takeover Insights (ATI), which detects suspicious logins and account takeover. You provide labeled historical data (events marked as fraud or legitimate), and the service trains a model automatically.

**Detector** - The evaluation engine. A detector combines one or more models with rules to produce outcomes. When you send an event to a detector, it scores the event using the model, evaluates rules against the score and event attributes, and returns an outcome.

**Rules** - Business logic that maps model scores and event attributes to outcomes. For example: if model score > 900, outcome is "block"; if model score > 700 and email domain is a free provider, outcome is "review"; otherwise outcome is "approve." Rules give fraud analysts direct control over decision thresholds without retraining models.

**Outcomes** - The actions associated with rule matches. Typical outcomes are approve, review, and block. Your application receives the outcome and acts accordingly.

## Building a Fraud Detection Model

The workflow follows a structured sequence. First, define the event type with all relevant variables. Second, store labeled historical data either internally in Fraud Detector or externally in Amazon S3 in the required format (a UTF-8 CSV with event variables, timestamps, and fraud labels). Third, create and train a model. Fraud Detector handles feature engineering, algorithm selection, and hyperparameter tuning automatically (see {{< relref "glossary/hyperparameter-tuning" >}}). Training time depends on the size and quality of your dataset.

After training, Fraud Detector provides a model performance report including AUC (area under the ROC curve, see {{< relref "glossary/roc-curve" >}}), score distributions for fraud and legitimate events, and confusion matrix metrics at various thresholds. Review these carefully: a model with high AUC but poor calibration can still produce poor business outcomes. Watch for {{< relref "glossary/overfitting" >}}, where the model memorises the training set instead of learning patterns that generalise.

## Data Requirements

Per the current documentation, the required minimum is at least 100 events with at least 50 of them classified as fraudulent. For good model performance, AWS recommends at least 10,000 total events with at least 400 fraud and 400 legitimate events, drawn from a minimum of three weeks (ideally up to six months) of history. In practice, models improve significantly with more data. The fraud rate in your training data does not need to match the production fraud rate. Fraud Detector handles class imbalance internally (see {{< relref "glossary/imbalanced-data" >}}).

Data quality is paramount. Common pitfalls include labeling delays (fraud discovered weeks after the event, leading to mislabeled training data), survivorship bias (training only on transactions that passed existing rules), and feature leakage (including variables that are only available after the fraud decision).

## Real-Time Evaluation

The GetEventPrediction API evaluates a single event in real time and returns the model score, matched rules, and resulting outcome. Integrate this into your transaction flow at the decision point: after the user submits a payment but before the charge is authorized. This live scoring step is the model's inference path (see {{< relref "glossary/inference" >}}).

The default quota for the rate of GetPrediction requests is 200 per second per Region, and it is adjustable through a service quota increase request. Other defaults worth knowing: maximum 256 KB payload per prediction call, up to 5 GB of training data per model, and 100 detectors per account. For offline scoring of many events at once, use a batch prediction job rather than the real-time API.

## Rules vs Model Scores

The combination of ML scores and deterministic rules is what makes Fraud Detector practical for production use. Models catch nuanced patterns that rules miss. Rules handle known fraud patterns immediately without waiting for model retraining. Fraud analysts can adjust rule thresholds in real time as fraud patterns shift, while you retrain the model on a cadence you choose (for example monthly or quarterly) as fresh labelled data matures.

## Pricing

Pricing is pay as you go with no minimum fees or upfront commitments. Per the official pricing page, you are billed on the compute hours used to train and host your models, the amount of storage you use, and the number of fraud predictions you make. For planning purposes the prediction cost is usually the dominant factor at production scale, so estimate your monthly event volume and check the current rate on the [pricing page](https://aws.amazon.com/fraud-detector/pricing/). Training and hosting costs are typically smaller in comparison. Because the service is in sunset, treat any new spend here as transitional.

## Migrating off Amazon Fraud Detector

Since the service is closed to new customers and reaches end of support on October 7, 2026, existing users should plan a migration before that date. AWS recommends two paths depending on the use case:

- For transaction and payment fraud modelling, build a custom model with [AutoGluon](https://auto.gluon.ai/), the open-source AutoML library, and deploy it on {{< relref "tools/amazon-sagemaker" >}}. AutoGluon handles the automated training that Fraud Detector used to do for you.
- For account creation and login abuse (credential stuffing, fake accounts), use {{< relref "tools/aws-waf" >}} Fraud Control, which protects sign-up and sign-in pages with managed rules.

To preserve your data, export event data stored in Fraud Detector before end of support, following the official migration guidance linked below.

Best practices: for designing the replacement fraud workload, follow the [AWS Well-Architected Machine Learning Lens](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html), which covers the full ML lifecycle (data quality, training, evaluation, monitoring, and retraining) and explicitly calls out fraud detection and risk scoring as a target use case.

## Sources

- Amazon Fraud Detector availability change (official end of support notice): https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html
- AWS Services in Sunset (announcement October 7, 2025, end of support October 7, 2026): https://docs.aws.amazon.com/general/latest/gr/sunset_services.html
- How Amazon Fraud Detector works: https://docs.aws.amazon.com/frauddetector/latest/ug/how-frauddetector-works.html
- Event dataset requirements (minimum and recommended data): https://docs.aws.amazon.com/frauddetector/latest/ug/create-event-dataset.html
- Amazon Fraud Detector endpoints and quotas (GetPrediction rate and other limits): https://docs.aws.amazon.com/general/latest/gr/fraud-detector.html
- Amazon Fraud Detector pricing: https://aws.amazon.com/fraud-detector/pricing/
- AutoGluon (recommended open-source AutoML alternative): https://auto.gluon.ai/
- AWS samples repository for Fraud Detector (data profiler and notebooks): https://github.com/aws-samples/aws-fraud-detector-samples
- AWS Well-Architected Machine Learning Lens: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html
