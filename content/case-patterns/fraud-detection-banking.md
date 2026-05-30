---
title: "Case Pattern: AI Fraud Detection for a Regional Bank"
description: "Architecture and lessons from deploying a real-time AI fraud detection system processing 2 million transactions daily for a regional banking institution."
date: 2026-03-28
categories: [Case Patterns]
tags: [fraud-detection, banking, real-time, anomaly-detection, financial-services]
image: /img/enterprise-dark/gateway-chamber-split-notext.png
image_alt: "A dark half-lit industrial gateway with a red glowing core, representing the threshold between authorised and unauthorised access."
image_caption: "Every transaction passes through a gate. The model decides who crosses."
---

A regional bank processing 2 million card transactions daily was experiencing $4.2 million in annual fraud losses with a rule-based detection system that flagged 3% of transactions, of which only 8% were actually fraudulent. The high false positive rate frustrated customers with declined legitimate transactions and overwhelmed the fraud investigation team.

## The Architecture

The system evaluates every transaction in real-time against customer behavior models, network analysis, and merchant risk profiles.

**Real-time scoring pipeline** - Every transaction passes through the scoring pipeline before authorization. The pipeline has a strict 150ms latency budget. Transaction data (amount, merchant, location, time, card-present/card-not-present) is enriched with customer features and scored by the fraud model. Transactions scoring above the threshold are declined or held for review.

**Customer behavior model** - For each cardholder, the system maintains a behavioral profile: typical transaction amounts, usual merchants and merchant categories, geographic patterns, time-of-day patterns, and velocity metrics (transactions per hour, spending per day). Transactions that deviate significantly from the customer's profile receive higher anomaly scores.

**Network analysis** - Fraud often involves connected entities. The system maintains a graph of relationships: cards used at the same merchant, merchants with high fraud rates, devices associated with multiple accounts, and IP addresses used across accounts. Transactions involving high-risk network connections receive elevated scores.

**Investigation workflow** - Flagged transactions enter a prioritized investigation queue. Each flagged transaction includes the model's score, the top contributing features (why it was flagged), the customer's recent transaction history, and any related network alerts. Investigators confirm or clear each alert, and their decisions feed back into model retraining.

## Key Lessons

**The 150ms latency constraint shaped every architectural decision.** Feature computation that could not complete within the latency budget was pre-computed and cached. The model architecture was chosen for inference speed (gradient boosted trees) over theoretical accuracy (deep neural networks). Any new feature that added more than 10ms to scoring was rejected unless it provided substantial accuracy improvement.

**False positive reduction mattered more than fraud detection rate.** Declining a legitimate transaction costs the bank in customer satisfaction, interchange revenue, and potential account closure. Reducing false positives from 92% to 78% (by improving model precision) had more measurable business impact than catching an additional 2% of fraud. The team optimized for precision at a fixed recall level.

**Adversarial adaptation was constant.** Fraud patterns shifted monthly as criminals tested the system's boundaries and adapted their techniques. The model required monthly retraining on recent data to maintain performance. A decay monitoring system tracked model accuracy on a rolling basis and triggered alerts when performance degraded below the threshold.

**Explainability was a regulatory requirement, not a nice-to-have.** Regulators required the bank to explain why any transaction was declined. "The model scored it high" was insufficient. The system needed to produce human-readable explanations ("declined because the transaction amount was 5x the customer's average and originated from a country the customer has never transacted in"). SHAP values on the model features provided the basis for these explanations.

## Results

Fraud losses decreased by 40% ($1.7 million annually). False positive rate dropped from 92% to 78%, reducing customer friction significantly. The investigation team's efficiency improved by 60% through better alert prioritization and richer context per alert. The system processes 2 million transactions daily with P99 latency of 120ms.
