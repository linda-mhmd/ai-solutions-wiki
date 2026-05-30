---
title: "Underfitting"
description: "What underfitting is, how to identify it, and strategies to improve model performance when the model is too simple."
date: 2026-03-28
categories: [Glossary]
tags: [underfitting, machine-learning, model-selection, training, bias-variance]
related:
  - glossary/overfitting
  - glossary/bias-variance-tradeoff
  - glossary/hyperparameter-tuning
last_updated: 2026-05-30
---

Underfitting occurs when a machine learning model is too simple to capture the underlying patterns in the data. An underfit model performs poorly on both training data and unseen data because it has not learned enough about the relationships between inputs and outputs.

## How to Detect Underfitting

The key signal is poor performance on training data itself. If the model cannot even fit the training examples well, it is underfitting. Both training and validation metrics are low and similar - the model is not complex enough to represent the patterns present in the data.

Compare your model's performance against simple baselines. If a more complex model significantly outperforms yours on training data, your model is likely underfitting.

## Why It Happens

**Model too simple** - a linear model cannot capture non-linear relationships. A shallow network cannot represent the complexity present in image or language data.

**Insufficient features** - the input features do not contain enough information to predict the target. No amount of model complexity will help if the relevant signals are not in the data.

**Excessive regularization** - too much dropout, weight decay, or other regularization constrains the model so heavily that it cannot learn the training data.

**Insufficient training** - the model has not been trained for enough epochs to converge. Training may have been stopped too early.

## How to Fix Underfitting

**Increase model complexity** - add more layers, increase layer width, or switch to a more expressive architecture. Move from linear models to tree-based models or neural networks.

**Add features** - engineer additional input features that capture relevant information. For deep learning, provide richer input representations.

**Reduce regularization** - lower dropout rates, reduce weight decay, or remove regularization constraints that are preventing the model from fitting the data.

**Train longer** - allow more epochs for the model to converge. Check that the learning rate is not so low that convergence is impractically slow.

**Use a pre-trained model** - transfer learning from a model pre-trained on a large dataset provides a strong starting point, particularly when your own dataset is limited.

## Practical Perspective

Underfitting is generally easier to diagnose and fix than overfitting. If a model underperforms on training data, you know the model needs more capacity or better features. The risk is spending time on data collection and labeling when the real problem is an insufficiently expressive model architecture.

## Sources

- Geman, S., Bienenstock, E., & Doursat, R. (1992). Neural networks and the bias/variance dilemma. *Neural Computation, 4*(1), 1–58. (Formalized the bias-variance tradeoff; underfitting corresponds to the high-bias regime.)
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer. (Chapter 7 covers model selection, bias-variance, and the theoretical framework for underfitting.)
- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press. Chapter 5: Machine Learning Basics. (Standard graduate reference; covers capacity, underfitting, and the relationship between hypothesis space and generalization.)
