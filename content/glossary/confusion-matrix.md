---
title: "Confusion Matrix"
description: "What a confusion matrix is, how to read it, and how it connects to precision, recall, and other classification metrics."
date: 2026-03-28
categories: [Glossary]
tags: [confusion-matrix, classification, model-evaluation, precision, recall]
related:
  - glossary/precision-recall
  - glossary/f1-score
  - glossary/roc-curve
  - glossary/supervised-learning
last_updated: 2026-05-30
---

A confusion matrix is a table that summarizes the performance of a classification model by comparing predicted labels to actual labels. For a binary classifier, it is a 2x2 matrix showing four outcomes: true positives, false positives, true negatives, and false negatives. It provides a complete picture of where the model succeeds and where it fails.

## How to Read It

**True positives (TP)** - the model correctly predicted the positive class (correctly identified fraud, correctly detected a defect).

**False positives (FP)** - the model incorrectly predicted positive when the actual class was negative (flagged a legitimate transaction as fraud). Also called Type I error or false alarm.

**True negatives (TN)** - the model correctly predicted the negative class (correctly passed a legitimate transaction).

**False negatives (FN)** - the model incorrectly predicted negative when the actual class was positive (missed a fraudulent transaction). Also called Type II error or miss.

## Derived Metrics

All standard classification metrics derive from the confusion matrix:

- **Accuracy** = (TP + TN) / (TP + FP + TN + FN) - overall correctness
- **Precision** = TP / (TP + FP) - of predicted positives, how many were correct
- **Recall** = TP / (TP + FN) - of actual positives, how many were found
- **F1 Score** = harmonic mean of precision and recall

## Why It Matters

Accuracy alone is misleading for imbalanced datasets. A fraud detector that labels everything as "not fraud" achieves 99.9% accuracy if fraud is 0.1% of transactions - but catches zero fraud. The confusion matrix reveals this immediately: TP = 0, FN = all fraud cases.

For technical leaders, the confusion matrix drives the business conversation about acceptable error tradeoffs. What is the cost of a false positive (unnecessary investigation) versus a false negative (missed fraud)? The answer determines whether to optimize for precision (fewer false alarms) or recall (fewer missed cases), and the confusion matrix is the tool that quantifies these tradeoffs.

## Practical Guidance

Always examine the confusion matrix, not just summary metrics. For multi-class problems, the confusion matrix extends to NxN dimensions, revealing which classes the model confuses with each other. These confusion patterns often suggest specific improvements: better training data for confused classes, additional features that distinguish them, or hierarchical classification approaches.

## Sources

- Powers, D.M.W. (2011). Evaluation: From precision, recall and F-measure to ROC, informedness, markedness and correlation. *Journal of Machine Learning Technologies, 2*(1), 37–63. (Systematic treatment of confusion matrix-derived metrics including F1, MCC.)
- Fawcett, T. (2006). An introduction to ROC analysis. *Pattern Recognition Letters, 27*(8), 861–874. (Connects confusion matrix thresholding to ROC curves.)
