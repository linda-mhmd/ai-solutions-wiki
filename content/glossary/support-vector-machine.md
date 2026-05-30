---
title: "Support Vector Machine (SVM)"
description: "Margin-maximizing classifier that uses the kernel trick to handle high-dimensional and non-linear classification problems."
date: 2026-03-28
categories: [Glossary]
tags: [SVM, classification, kernel-trick, supervised-learning, machine-learning]
related:
  - glossary/logistic-regression
  - glossary/k-nearest-neighbors
  - glossary/dimensionality-reduction
  - glossary/overfitting
  - glossary/cross-validation
last_updated: 2026-05-30
---

A Support Vector Machine (SVM) is a supervised learning algorithm that finds the optimal hyperplane separating classes by maximizing the margin between the closest data points of each class. These closest points are the support vectors - the algorithm's predictions depend only on them, not on the entire dataset.

## How It Works

Given labeled training data, SVM finds the hyperplane that separates the two classes with the largest possible gap (margin). A wider margin generally means better generalization to new data. The optimization problem minimizes the weight vector magnitude subject to the constraint that all training points are correctly classified with at least a margin of 1.

**Hard margin SVM** requires perfect separation and fails when classes overlap. **Soft margin SVM** introduces slack variables that allow some points to be on the wrong side of the margin, controlled by the regularization parameter C. A small C allows more violations (wider margin, more generalization), while a large C penalizes violations heavily (tighter fit, risk of overfitting).

## The Kernel Trick

The real power of SVMs comes from kernel functions. When data is not linearly separable in its original feature space, kernel functions implicitly map it to a higher-dimensional space where a linear separator exists - without actually computing the transformation.

**Linear kernel** is used when data is linearly separable or has very high dimensionality (text classification, genomics). **RBF (Radial Basis Function) kernel** is the default choice for non-linear problems. It measures similarity based on distance and has a gamma parameter controlling the influence radius of each support vector. **Polynomial kernel** captures feature interactions up to a specified degree.

Kernel selection and parameter tuning (C and gamma for RBF) significantly affect performance. Grid search with cross-validation is the standard approach.

## Strengths and Limitations

SVMs excel in high-dimensional spaces, even when the number of features exceeds the number of samples. They are memory-efficient because the decision function uses only support vectors, and they are effective for text classification, image recognition, and bioinformatics applications.

The main limitations are scalability and interpretability. Training complexity is O(n^2) to O(n^3) in the number of samples, making SVMs impractical for datasets beyond roughly 100,000 points. They do not natively output probability estimates (Platt scaling adds this at additional cost). Unlike logistic regression, the learned model does not directly explain feature contributions.

## When to Use It

SVMs are strong choices for medium-sized datasets with high-dimensional features, particularly text classification and problems where the number of features is large relative to samples. For large-scale problems, linear SVMs (or logistic regression) are preferred. For tabular data at scale, gradient boosting typically outperforms SVMs with less tuning effort.

## Sources

- Cortes, C., & Vapnik, V. (1995). Support-vector networks. *Machine Learning, 20*(3), 273–297. (Original SVM paper with soft margin formulation.)
- Vapnik, V. (1998). *Statistical Learning Theory.* Wiley. (VC dimension and theoretical foundations of SVM generalization.)
- Boser, B., Guyon, I., & Vapnik, V. (1992). A training algorithm for optimal margin classifiers. *ACM COLT 1992*. (Kernel trick introduced for SVMs.)
