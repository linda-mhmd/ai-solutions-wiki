---
title: "Naive Bayes"
description: "Probabilistic classification algorithm based on Bayes' theorem with strong independence assumptions, widely used for text classification."
date: 2026-03-28
categories: [Glossary]
tags: [naive-bayes, classification, probabilistic, text-classification, machine-learning]
related:
  - glossary/logistic-regression
  - glossary/supervised-learning
  - glossary/precision-recall
  - glossary/f1-score
  - glossary/confusion-matrix
last_updated: 2026-05-30
---

Naive Bayes is a family of probabilistic classifiers based on Bayes' theorem that assume all features are conditionally independent given the class label. Despite this strong (and usually violated) assumption, Naive Bayes classifiers perform surprisingly well in practice, especially for text classification tasks.

## How It Works

Bayes' theorem computes the posterior probability of a class given observed features: `P(class|features) = P(features|class) * P(class) / P(features)`. The classifier predicts the class with the highest posterior probability. The naive assumption - that features are independent given the class - simplifies `P(features|class)` into a product of individual feature probabilities, making computation tractable even with thousands of features.

The denominator `P(features)` is constant across classes and can be ignored during classification, so the decision reduces to finding the class that maximizes `P(class) * product(P(feature_i|class))`.

## Variants

**Gaussian Naive Bayes** assumes continuous features follow a normal distribution within each class. It estimates the mean and variance of each feature per class from the training data. Suitable for continuous numerical data.

**Multinomial Naive Bayes** models features as counts or frequencies - for example, word counts in a document. This is the standard choice for text classification with bag-of-words or TF-IDF representations.

**Bernoulli Naive Bayes** models binary features (present or absent). It differs from Multinomial in that it explicitly penalizes the absence of features. Useful for short text classification and binary feature sets.

**Complement Naive Bayes** addresses the class imbalance problem by computing parameters from the complement of each class. It often outperforms Multinomial on imbalanced datasets.

## Text Classification

Naive Bayes is a standard baseline for text classification due to its natural fit with word frequency features. Spam detection, sentiment analysis, topic categorization, and language detection all benefit from its speed and effectiveness. With TF-IDF features, Multinomial Naive Bayes is competitive with more complex models on many text tasks.

**Laplace smoothing** (additive smoothing) prevents zero probabilities when a feature-class combination is not seen in training data. Without smoothing, a single unseen word would make the entire class probability zero.

## Strengths and Limitations

Naive Bayes trains extremely fast (a single pass through the data), requires little memory, handles high-dimensional data well, and works with small training sets. It provides calibrated probability estimates with proper smoothing.

The independence assumption means Naive Bayes cannot capture feature interactions or correlations. It is outperformed by logistic regression, SVMs, and ensemble methods on most tasks where features are correlated. The probability estimates, while useful for ranking, are often poorly calibrated in absolute terms.

## When to Use It

Use Naive Bayes as a fast baseline for text classification, when training data is limited, or when you need extremely fast training and prediction. If Naive Bayes performs well enough for your use case, its simplicity and speed make it an excellent production choice.

## Sources

- Bayes, T. (1763). An essay towards solving a problem in the doctrine of chances. *Philosophical Transactions of the Royal Society, 53*, 370–418. (Bayes' theorem; foundational.)
- Domingos, P., & Pazzani, M. (1997). On the optimality of the simple Bayesian classifier under zero-one loss. *Machine Learning, 29*(2-3), 103–130. (Theoretical analysis of when Naive Bayes is optimal despite violated independence assumption.)
- Manning, C.D., Raghavan, P., & Schütze, H. (2008). *Introduction to Information Retrieval.* Cambridge University Press. Chapter 13: Text Classification and Naive Bayes. Free online at nlp.stanford.edu/IR-book.
