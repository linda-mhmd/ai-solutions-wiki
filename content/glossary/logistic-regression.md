---
title: "Logistic Regression"
description: "Binary and multinomial classification algorithm using the sigmoid function and log-loss optimization."
date: 2026-03-28
categories: [Glossary]
tags: [logistic-regression, classification, supervised-learning, sigmoid, machine-learning]
related:
  - glossary/linear-regression
  - glossary/support-vector-machine
  - glossary/precision-recall
  - glossary/roc-curve
  - glossary/confusion-matrix
last_updated: 2026-05-30
---

Logistic regression is a supervised learning algorithm for classification tasks. Despite its name, it is not a regression algorithm - it predicts the probability that an input belongs to a particular class. It is one of the most commonly used classifiers in production systems due to its speed, interpretability, and reliable probability estimates.

## How It Works

Logistic regression applies a sigmoid (logistic) function to a linear combination of input features. The linear part is identical to linear regression: `z = w1*x1 + w2*x2 + ... + wn*xn + b`. The sigmoid function `sigma(z) = 1 / (1 + e^(-z))` then squashes this value into the range (0, 1), producing a probability estimate.

For binary classification, the output represents the probability of belonging to the positive class. A decision threshold (typically 0.5) converts this probability into a class prediction. Adjusting the threshold trades off between precision and recall.

**Log-loss (binary cross-entropy)** is the loss function used during training. It penalizes confident wrong predictions heavily - predicting 0.99 for a negative example incurs far more loss than predicting 0.6. This encourages well-calibrated probability estimates.

## Multinomial Classification

For problems with more than two classes, logistic regression extends in two ways:

**One-vs-Rest (OvR)** trains a separate binary classifier for each class against all other classes. The class with the highest predicted probability wins. This is simple and works well with many classes.

**Softmax (Multinomial)** generalizes the sigmoid to multiple classes simultaneously. The softmax function converts a vector of raw scores into a probability distribution that sums to 1. This is the standard approach in modern implementations and is the same output layer used in neural network classifiers.

## Regularization

Like linear regression, logistic regression benefits from L1 (Lasso), L2 (Ridge), and ElasticNet regularization to prevent overfitting. L1 regularization is particularly useful for feature selection, as it drives irrelevant feature weights to zero. The regularization strength parameter C (inverse of regularization) is the primary hyperparameter to tune.

## Strengths and Limitations

Logistic regression produces calibrated probability scores out of the box, which is valuable when you need to rank predictions by confidence or set business-specific thresholds. It trains quickly, scales well to large datasets, and the learned coefficients directly indicate feature importance and direction of effect.

The main limitation is the linear decision boundary. Logistic regression cannot capture complex non-linear relationships without manual feature engineering. When classes are not linearly separable, models like random forests, gradient boosting, or neural networks will outperform it.

## When to Use It

Use logistic regression as your first classifier for any binary or multi-class problem. It excels in fraud detection, spam filtering, medical diagnosis screening, and churn prediction - any domain where interpretable probability scores matter. If logistic regression achieves acceptable performance, its simplicity and interpretability make it preferable to more complex alternatives.

## Sources

- Cox, D. R. (1958). The regression analysis of binary sequences. *Journal of the Royal Statistical Society, Series B, 20*(2), 215–242. (Introduced logistic regression for binary outcome modeling; foundational paper for the algorithm.)
- McCullagh, P., & Nelder, J. A. (1989). *Generalized Linear Models* (2nd ed.). Chapman & Hall. (Definitive statistical treatment of generalized linear models; logistic regression is a special case of the Bernoulli GLM.)
- Hosmer, D. W., Lemeshow, S., & Sturdivant, R. X. (2013). *Applied Logistic Regression* (3rd ed.). Wiley. (Standard applied reference; model assessment, multicollinearity, and interpretation of coefficients.)
