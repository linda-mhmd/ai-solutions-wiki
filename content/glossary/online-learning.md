---
title: "Online Learning"
description: "Incremental machine learning approach that updates models continuously with streaming data rather than retraining from scratch."
date: 2026-03-28
categories: [Glossary]
tags: [online-learning, streaming, incremental-learning, real-time, machine-learning]
related:
  - glossary/concept-drift
  - glossary/data-drift
  - glossary/continuous-training
  - glossary/gradient-descent
  - glossary/reinforcement-learning
last_updated: 2026-05-30
---

Online learning (also called incremental learning) updates machine learning models one example or mini-batch at a time as new data arrives, rather than retraining on the entire dataset. This approach is essential for streaming data, systems that must adapt to changing patterns in real time, and datasets too large to fit in memory.

## How It Works

In batch learning, the model trains on a fixed dataset and remains static until explicitly retrained. In online learning, the model processes each new observation, updates its parameters, and discards (or archives) the observation. The update typically involves a single step of stochastic gradient descent or an equivalent incremental update rule.

The learning process is: receive new data point, make a prediction, observe the true outcome, update the model based on the error. This cycle repeats continuously.

## Key Algorithms

**Stochastic Gradient Descent (SGD)** is the foundation. Any model trained with gradient descent (linear regression, logistic regression, neural networks) can be adapted for online learning by processing one example at a time. The learning rate schedule becomes critical - too high and the model oscillates, too low and it adapts too slowly.

**Perceptron and Passive-Aggressive algorithms** are online classification algorithms that update weights only when a mistake is made or when the margin is insufficient.

**Online Bayesian methods** update posterior distributions incrementally. Each new data point refines the prior into a new posterior, which becomes the prior for the next observation. This provides natural uncertainty quantification.

**Hoeffding Trees (Very Fast Decision Trees)** are decision trees designed for streaming data. They grow incrementally, splitting nodes when enough data has arrived to make a statistically confident decision. They are the basis for online random forests and gradient boosting adaptations.

**River** (formerly Creme and scikit-multiflow) is the main Python library for online learning, providing streaming implementations of most standard algorithms.

## Concept Drift

A key challenge in online learning is concept drift - the relationship between inputs and outputs changes over time. Customer preferences shift, fraud patterns evolve, and market conditions fluctuate. Online learning naturally handles gradual drift through continuous updates, but sudden drift requires drift detection mechanisms that trigger faster adaptation or model resets.

**Windowed approaches** give more weight to recent data by training on a sliding window or using exponential decay of older observations. **Drift detectors** (ADWIN, DDM, Page-Hinkley) monitor prediction error rates and signal when the distribution has shifted significantly.

## Trade-offs

Online learning trades off statistical efficiency for computational efficiency and adaptability. Batch learning with access to the full dataset typically achieves better accuracy at any given point, but online learning adapts faster to changes and handles unlimited data volumes with constant memory.

The catastrophic forgetting problem affects neural networks in online settings - learning new patterns can overwrite previously learned knowledge. Techniques like elastic weight consolidation and experience replay mitigate this.

## When to Use It

Use online learning for recommendation systems, ad click prediction, financial market models, IoT sensor monitoring, and any system where data arrives continuously and the underlying patterns change over time. It is also practical for very large datasets that cannot be loaded into memory for batch training.

## Sources

- Rosenblatt, F. (1958). The perceptron: A probabilistic model for information storage and organization in the brain. *Psychological Review, 65*(6), 386–408. (Perceptron; first online learning algorithm.)
- Shalev-Shwartz, S. (2012). Online learning and online convex optimization. *Foundations and Trends in Machine Learning, 4*(2), 107–194. (Comprehensive survey of online learning theory and algorithms.)
- Bifet, A., & Gavalda, R. (2007). Learning from time-changing data with adaptive windowing. *SIAM International Conference on Data Mining*. (ADWIN; adaptive windowing for concept drift in online settings.)
- Domingos, P., & Hulten, G. (2000). Mining high-speed data streams. *KDD 2000*. (Hoeffding Trees / VFDT; streaming decision trees.)
