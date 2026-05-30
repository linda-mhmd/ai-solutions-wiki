---
title: "Imbalanced Data"
description: "Strategies for handling skewed class distributions including SMOTE, undersampling, class weighting, and evaluation considerations."
date: 2026-03-28
categories: [Glossary]
tags: [imbalanced-data, SMOTE, class-weighting, sampling, classification]
related:
  - glossary/precision-recall
  - glossary/f1-score
  - glossary/confusion-matrix
  - glossary/roc-curve
  - guides/handling-imbalanced-data
last_updated: 2026-05-30
---

Imbalanced data occurs when one class significantly outnumbers others in a classification problem. Fraud detection (0.1% fraud), disease diagnosis (1-5% positive), manufacturing defect detection (< 1% defective), and churn prediction (5-10% churners) all exhibit class imbalance. Standard classifiers trained on imbalanced data tend to predict the majority class for everything, achieving high accuracy while completely failing on the minority class that matters most.

## Why Accuracy Fails

With 99% negative and 1% positive examples, a model that always predicts negative achieves 99% accuracy but catches zero positive cases. Accuracy is misleading for imbalanced data. Use precision, recall, F1-score, area under the precision-recall curve (AUPRC), and the confusion matrix instead.

## Data-Level Strategies

**Random oversampling** duplicates minority class examples to balance the dataset. It is simple but risks overfitting to specific minority examples.

**SMOTE (Synthetic Minority Over-sampling Technique)** generates synthetic minority examples by interpolating between existing minority examples and their nearest neighbors. Variants include Borderline-SMOTE (focuses on examples near the decision boundary) and SMOTE-ENN (combines oversampling with edited nearest neighbor cleaning).

**Random undersampling** removes majority class examples to balance the dataset. It is fast and can improve training speed but discards potentially useful data. Works well when the majority class is large enough to tolerate data loss.

**Tomek links and edited nearest neighbors** are informed undersampling methods that selectively remove majority class examples that are noisy or overlap with the minority class, cleaning the decision boundary.

## Algorithm-Level Strategies

**Class weighting** adjusts the loss function to penalize minority class errors more heavily. Most scikit-learn classifiers accept a `class_weight='balanced'` parameter that automatically weights classes inversely proportional to their frequency. This is often the simplest and most effective approach.

**Cost-sensitive learning** assigns different misclassification costs to different classes. Missing a fraudulent transaction may cost $10,000 while a false alarm costs $10. Encoding these costs into the objective function aligns the model with business impact.

**Threshold adjustment** changes the decision threshold from the default 0.5 to a value that optimizes the desired trade-off between precision and recall. Train the model normally, then tune the threshold on a validation set.

## Ensemble Approaches

**Balanced Random Forest** and **EasyEnsemble** combine ensemble methods with sampling. Each base learner trains on a balanced subset of the data, and the ensemble aggregates predictions. This preserves majority class information across the ensemble while giving each learner a balanced view.

## Practical Guidelines

Start with class weighting - it requires no data manipulation and works with any algorithm. If that is insufficient, try SMOTE combined with undersampling. Always evaluate with appropriate metrics (AUPRC, F1) using stratified cross-validation to maintain class ratios in each fold. Never apply SMOTE before cross-validation - synthetic examples from the test fold would leak information.

## When to Use It

Address class imbalance whenever the minority class is the class of interest and the imbalance ratio exceeds roughly 1:10. The severity of the problem depends on the degree of imbalance, the dataset size, and how well-separated the classes are. Mild imbalance (1:5) may not require special treatment if the dataset is large enough.

## Sources

- Chawla, N.V., Bowyer, K.W., Hall, L.O., & Kegelmeyer, W.P. (2002). SMOTE: Synthetic minority over-sampling technique. *JMLR, 3*, 321–357. (SMOTE original paper.)
- He, H., & Garcia, E.A. (2009). Learning from imbalanced data. *IEEE Transactions on Knowledge and Data Engineering, 21*(9), 1263–1284. (Survey of sampling, algorithm-level, and cost-sensitive approaches.)
- Davis, J., & Goadrich, M. (2006). The relationship between precision-recall and ROC curves. *ICML 2006*. (AUPRC as preferred metric over AUC-ROC for imbalanced datasets.)
