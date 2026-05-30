---
title: "Anomaly Detection"
description: "Methods for identifying outliers and unusual patterns in data, including Isolation Forest, One-Class SVM, and autoencoder-based approaches."
date: 2026-03-28
categories: [Glossary]
tags: [anomaly-detection, outlier-detection, isolation-forest, one-class-SVM, autoencoder]
related:
  - glossary/autoencoder
  - glossary/dbscan
  - glossary/support-vector-machine
  - glossary/unsupervised-learning
  - glossary/deep-learning
last_updated: 2026-05-30
---

Anomaly detection identifies data points, patterns, or observations that deviate significantly from expected behavior. It is critical in fraud detection, network intrusion detection, manufacturing quality control, system health monitoring, and medical diagnosis. The core challenge is that anomalies are rare and diverse - you often cannot enumerate all the ways something can go wrong.

## Types of Anomalies

**Point anomalies** are individual data points that are far from the rest of the data. A single unusually large transaction in a bank account is a point anomaly.

**Contextual anomalies** are normal in one context but anomalous in another. A temperature of 35C is normal in summer but anomalous in winter. These require contextual features (time, location) to detect.

**Collective anomalies** are groups of data points that are individually normal but anomalous as a collection. A sequence of small transactions that together drain an account is a collective anomaly.

## Key Methods

**Isolation Forest** is the go-to algorithm for tabular data. It builds an ensemble of random trees that partition the data. Anomalies, being rare and different, require fewer random splits to isolate and end up in shorter tree paths. It scales well, handles high-dimensional data, and requires minimal tuning. The contamination parameter (expected proportion of anomalies) is the main setting.

**One-Class SVM** learns a boundary around the normal data in a high-dimensional feature space using the kernel trick. New points falling outside this boundary are flagged as anomalous. It works well with small-to-medium datasets and high-dimensional features but is sensitive to kernel and parameter choices.

**Autoencoders** train a neural network to compress and reconstruct normal data. Anomalies, which differ from the training distribution, produce high reconstruction error. This approach scales to complex data types (images, sequences, multivariate time series) and can capture non-linear patterns that simpler methods miss.

**Statistical methods** include Z-score thresholds for univariate data, Mahalanobis distance for multivariate data, and Gaussian Mixture Models for density estimation. These work well when the normal data distribution is well-understood.

**Local Outlier Factor (LOF)** compares the local density around a point to the local density around its neighbors. Points with significantly lower density than their neighbors are flagged. It handles datasets where different regions have different densities.

## Supervised vs. Unsupervised

Most anomaly detection is unsupervised or semi-supervised because labeled anomaly data is scarce. When labeled examples are available, the problem becomes imbalanced classification, and techniques like SMOTE, class weighting, or cost-sensitive learning apply. Semi-supervised approaches train only on normal data and flag deviations.

## Production Considerations

Threshold selection determines the trade-off between false positives and missed anomalies. In fraud detection, missing fraud is costly, so a lower threshold (more alerts) is preferred. In manufacturing, false alarms waste inspection time, so a higher threshold may be appropriate. Anomaly scores (rather than binary decisions) give operators flexibility to adjust this trade-off.

## When to Use It

Use Isolation Forest as the default for tabular anomaly detection. Use autoencoders for complex or sequential data. Use statistical methods when the data distribution is well-characterized. Always combine anomaly detection with domain expertise - the algorithm identifies unusual patterns, but humans determine whether those patterns matter.

## Sources

- Liu, F.T., Ting, K.M., & Zhou, Z.H. (2008). Isolation Forest. *IEEE International Conference on Data Mining (ICDM)*. (Original Isolation Forest paper.)
- Schölkopf, B., et al. (2001). Estimating the support of a high-dimensional distribution. *Neural Computation, 13*(7), 1443–1471. (One-Class SVM for novelty detection.)
- Breunig, M.M., et al. (2000). LOF: Identifying density-based local outliers. *ACM SIGMOD*, 29(2), 93–104. (Local Outlier Factor algorithm.)
- Hawkins, S., et al. (2002). Outlier detection using replicator neural networks. *Data Warehousing and Knowledge Discovery*, 170–180. (Autoencoder-based anomaly detection.)
- Chandola, V., Banerjee, A., & Kumar, V. (2009). Anomaly detection: A survey. *ACM Computing Surveys, 41*(3). (Comprehensive review covering all major methods.)
