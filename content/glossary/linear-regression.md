---
title: "Linear Regression"
description: "Foundational supervised learning algorithm for continuous prediction, including Ridge, Lasso, and ElasticNet regularization variants."
date: 2026-03-28
categories: [Glossary]
tags: [linear-regression, supervised-learning, regression, regularization, machine-learning]
related:
  - glossary/logistic-regression
  - glossary/overfitting
  - glossary/bias-variance-tradeoff
  - glossary/cross-validation
  - glossary/loss-function
last_updated: 2026-05-30
---

Linear regression is a supervised learning algorithm that models the relationship between one or more input features and a continuous target variable by fitting a linear equation to the observed data. It remains one of the most widely used algorithms in machine learning and statistics due to its simplicity, interpretability, and effectiveness as a baseline model.

## How It Works

The model learns a set of weights (coefficients) that multiply each input feature, plus a bias (intercept) term. For a single feature, the equation is `y = wx + b`. For multiple features, it extends to `y = w1*x1 + w2*x2 + ... + wn*xn + b`. Training finds the weights that minimize the difference between predicted and actual values, typically using the mean squared error (MSE) as the loss function.

**Ordinary Least Squares (OLS)** solves for the optimal weights analytically using the normal equation. This works well for small-to-medium datasets but becomes computationally expensive with very large feature sets. Gradient descent is the alternative optimization approach for larger problems.

## Regularized Variants

Plain linear regression can overfit when there are many features, correlated features, or limited training data. Regularization adds a penalty term to the loss function that constrains the magnitude of the weights.

**Ridge Regression (L2)** adds the sum of squared weights as a penalty. This shrinks all coefficients toward zero but rarely sets any to exactly zero. Ridge handles multicollinearity well and is the default choice when you want to keep all features.

**Lasso Regression (L1)** adds the sum of absolute weights as a penalty. This can drive coefficients to exactly zero, effectively performing feature selection. Lasso is useful when you suspect many features are irrelevant.

**ElasticNet** combines both L1 and L2 penalties with a mixing parameter that controls the balance. It handles correlated feature groups better than Lasso alone and is often the most robust choice when you are unsure which regularization to apply.

## Assumptions and Limitations

Linear regression assumes a linear relationship between features and target, independence of observations, homoscedasticity (constant variance of errors), and normally distributed residuals. Violations of these assumptions reduce model reliability.

The algorithm cannot capture non-linear patterns without manual feature engineering (polynomial features, interaction terms). When the relationship is genuinely non-linear, tree-based models or neural networks will outperform linear regression.

## When to Use It

Linear regression is the right starting point when you need a fast, interpretable baseline for continuous prediction. It works well for price prediction, demand forecasting, and any problem where the relationship between inputs and output is approximately linear. Always start with linear regression before moving to more complex models - if it performs well enough, the interpretability and simplicity are significant advantages in production.

## Sources

- Gauss, C. F. (1809). *Theoria Motus Corporum Coelestium*. (Introduced least squares; the mathematical foundation of ordinary least squares linear regression.)
- Tibshirani, R. (1996). Regression shrinkage and selection via the lasso. *Journal of the Royal Statistical Society, Series B, 58*(1), 267–288. (Lasso regression; introduced L1 regularization for sparse feature selection.)
- Hoerl, A. E., & Kennard, R. W. (1970). Ridge regression: Biased estimation for nonorthogonal problems. *Technometrics, 12*(1), 55–67. (Ridge regression; introduced L2 regularization for multicollinear regression problems.)
