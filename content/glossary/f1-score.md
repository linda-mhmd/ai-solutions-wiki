---
title: "F1 Score"
description: "What the F1 score measures, when to use it as a model evaluation metric, and its limitations."
date: 2026-03-28
categories: [Glossary]
tags: [f1-score, precision, recall, classification, model-evaluation]
related:
  - glossary/precision-recall
  - glossary/confusion-matrix
  - glossary/roc-curve
last_updated: 2026-05-30
---

The F1 score is the harmonic mean of precision and recall, providing a single metric that balances both. It ranges from 0 (worst) to 1 (perfect). The harmonic mean penalizes extreme imbalances: an F1 score is high only when both precision and recall are high.

## How It Is Calculated

F1 = 2 * (Precision * Recall) / (Precision + Recall)

A model with 90% precision and 90% recall has F1 = 0.90. A model with 99% precision and 10% recall has F1 = 0.18 - the harmonic mean severely penalizes the low recall, even though precision is excellent.

## Variants for Multi-Class Problems

**Macro F1** computes F1 independently for each class and averages them equally. Each class contributes equally regardless of its frequency. Use this when all classes are equally important.

**Micro F1** aggregates true positives, false positives, and false negatives across all classes before computing F1. Equivalent to overall accuracy for multi-class problems. Dominated by the majority class.

**Weighted F1** computes F1 per class and averages weighted by the number of examples per class. A compromise between macro and micro that accounts for class imbalance without ignoring minority classes entirely.

## When to Use F1

F1 is most useful when you need a single number to compare models and you care roughly equally about precision and recall. It is the standard metric for information extraction, named entity recognition, and many NLP classification tasks.

## When Not to Use F1

F1 assumes equal importance of precision and recall. If false positives and false negatives have very different costs (which they usually do in business applications), F1 obscures this asymmetry. In such cases, use the precision-recall curve to select an operating point based on actual cost tradeoffs, or use the F-beta score (which lets you weight precision and recall differently).

## Practical Guidance

Report F1 alongside precision and recall, not instead of them. Use F1 for model comparison and hyperparameter selection when you need a single optimization target, but always examine precision and recall separately to understand where the model fails. For production systems, define acceptance criteria in terms of the specific metric that maps to business impact, not F1 by default.

## Sources

- van Rijsbergen, C. J. (1979). *Information Retrieval* (2nd ed.). Butterworths. (Original formulation of the F-measure as a weighted combination of precision and recall.)
- Manning, C. D., Raghavan, P., & Schütze, H. (2008). *Introduction to Information Retrieval*. Cambridge University Press. Chapter 8: Evaluation in information retrieval. (Standard IR reference; defines macro/micro F1 and their appropriate uses.)
- Sokolova, M., & Lapalme, G. (2009). A systematic analysis of performance measures for classification tasks. *Information Processing & Management, 45*(4), 427–437. (Comprehensive analysis of classification metrics including F1 variants for multi-class problems.)
