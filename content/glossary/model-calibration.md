---
title: "Model Calibration"
description: "Techniques for producing reliable probability estimates from classifiers, including Platt scaling and isotonic regression."
date: 2026-03-28
categories: [Glossary]
tags: [model-calibration, Platt-scaling, isotonic-regression, probability, classification]
related:
  - glossary/logistic-regression
  - glossary/confusion-matrix
  - glossary/roc-curve
  - glossary/precision-recall
  - glossary/gradient-boosting
last_updated: 2026-05-30
---

Model calibration measures how well a classifier's predicted probabilities reflect actual outcomes. A well-calibrated model that predicts 80% probability for a class should be correct roughly 80% of the time across all such predictions. Many models produce accurate class rankings but poorly calibrated probabilities - they may be systematically overconfident or underconfident.

## Why Calibration Matters

Calibration is essential whenever predicted probabilities drive decisions rather than just the predicted class. In medical diagnosis, a 90% cancer probability should mean 90% of patients with that score actually have cancer. In fraud detection, probability scores determine which transactions to block, review, or approve. In insurance pricing, predicted probabilities directly translate to premiums. Poor calibration leads to wrong decisions even when the model's ranking is perfect.

## Measuring Calibration

**Reliability diagrams (calibration curves)** bin predictions by predicted probability and plot the actual positive rate in each bin. A perfectly calibrated model produces a diagonal line. Curves above the diagonal indicate underconfidence; curves below indicate overconfidence.

**Expected Calibration Error (ECE)** summarizes the calibration curve into a single number - the weighted average of the absolute difference between predicted and actual probability across bins. Lower ECE means better calibration.

**Brier score** combines calibration with discrimination (ranking ability). It is the mean squared difference between predicted probabilities and actual outcomes.

## Calibration Methods

**Platt scaling** fits a logistic regression model on the classifier's raw output scores using a held-out validation set. The logistic function maps scores to calibrated probabilities. It works well when the calibration curve is sigmoid-shaped, which is common for SVMs, boosting methods, and neural networks.

**Isotonic regression** fits a non-parametric, monotonically increasing function from raw scores to calibrated probabilities. It makes no assumptions about the shape of the calibration curve and is more flexible than Platt scaling, but requires more validation data to avoid overfitting.

**Temperature scaling** is the standard approach for neural networks. It divides the logits (pre-softmax outputs) by a single learned temperature parameter. Temperature > 1 softens probabilities (reducing overconfidence), and temperature < 1 sharpens them. It preserves the model's ranking while fixing calibration.

## Which Models Need Calibration

**Logistic regression** is generally well-calibrated out of the box due to its log-loss training objective. **Naive Bayes** tends to push probabilities toward 0 and 1 (overconfident). **Random forests** tend to produce probabilities clustered around 0.5 (underconfident). **Gradient boosting** (XGBoost, LightGBM) tends to be overconfident. **Deep neural networks** are typically overconfident, especially with modern architectures. SVMs do not natively produce probabilities at all.

## Practical Considerations

Always calibrate on a held-out set, never on training data. If data is scarce, use cross-validation to produce out-of-fold predictions for calibration. Check calibration separately for each class in multi-class problems and across important subgroups - a model may be well-calibrated overall but poorly calibrated for specific populations. Recalibrate periodically in production as data distributions shift.

## When to Use It

Apply calibration whenever probability scores inform decisions. Use Platt scaling as the default, isotonic regression when you have sufficient validation data and the calibration curve is non-sigmoid, and temperature scaling for deep learning models. Always evaluate calibration alongside discrimination metrics (AUC, F1) for a complete picture of model quality.

## Sources

- Platt, J. (1999). Probabilistic outputs for support vector machines and comparisons to regularized likelihood methods. *Advances in Large Margin Classifiers*. (Platt scaling; sigmoid calibration for SVM outputs.)
- Zadrozny, B., & Elkan, C. (2002). Transforming classifier scores into accurate multiclass probability estimates. *KDD 2002*. (Isotonic regression calibration; comprehensive comparison of calibration methods.)
- Guo, C., et al. (2017). On calibration of modern neural networks. *ICML 2017*. (Documents overconfidence in deep networks; introduces temperature scaling.)
