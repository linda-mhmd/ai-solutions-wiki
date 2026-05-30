---
title: "Precision and Recall"
description: "What precision and recall measure, how to choose between them, and why the tradeoff matters for business-critical AI systems."
date: 2026-03-28
categories: [Glossary]
tags: [precision, recall, classification, model-evaluation, confusion-matrix]
related:
  - glossary/confusion-matrix
  - glossary/f1-score
  - glossary/roc-curve
  - glossary/supervised-learning
last_updated: 2026-05-30
---

Precision and recall are complementary metrics for evaluating classification models. Precision measures accuracy among positive predictions: of everything the model flagged, how much was correct? Recall measures completeness among actual positives: of everything that should have been flagged, how much did the model find?

## Definitions

**Precision** = True Positives / (True Positives + False Positives). High precision means few false alarms. When the model says "yes," it is usually right.

**Recall** = True Positives / (True Positives + False Negatives). High recall means few missed cases. The model finds most of the actual positives.

## The Tradeoff

Precision and recall are inversely related at any given decision threshold. Lowering the classification threshold (flagging more items as positive) increases recall (you catch more true positives) but decreases precision (you also flag more false positives). Raising the threshold increases precision but decreases recall.

This is not a technical detail - it is a business decision. The right balance depends on the relative cost of false positives versus false negatives in your specific application.

## When to Prioritize Precision

Prioritize precision when false positives are expensive or disruptive: spam filtering (users losing important emails is worse than receiving some spam), content recommendation (irrelevant recommendations erode trust), automated actions (blocking a legitimate customer's account is costly).

## When to Prioritize Recall

Prioritize recall when false negatives are dangerous or costly: fraud detection (missing fraud costs more than investigating false alarms), medical screening (missing a disease is worse than a follow-up test), security threat detection (missing an intrusion has severe consequences).

## Practical Guidance

Never evaluate a classifier on precision or recall alone - always report both. Use the precision-recall curve to visualize the tradeoff across all thresholds. Choose the operating point (threshold) based on the business cost of each error type.

For imbalanced datasets (rare positive class), precision-recall is more informative than accuracy or ROC curves. A model with 95% accuracy can have terrible recall on the minority class, but precision-recall analysis makes this visible immediately.

## Sources

- Davis, J., & Goadrich, M. (2006). The relationship between precision-recall and ROC curves. *ICML 2006*. (Proved that PR curves dominate ROC curves for class imbalance evaluation; fundamental reference for choosing between the two.)
- Manning, C. D., Raghavan, P., & Schütze, H. (2008). *Introduction to Information Retrieval*. Cambridge University Press. Chapter 8. (Standard IR reference defining precision, recall, and the precision-recall tradeoff in the context of ranked retrieval.)
- Saito, T., & Rehmsmeier, M. (2015). The precision-recall plot is more informative than the ROC plot when evaluating binary classifiers on imbalanced datasets. *PLOS ONE, 10*(3). (Empirical analysis confirming PR curves are superior for imbalanced classification; widely cited in applied ML.)
