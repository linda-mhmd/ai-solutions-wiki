---
title: "Feature Engineering Guide"
description: "Systematic approaches to feature creation, selection, and transformation for building effective machine learning models."
date: 2026-03-28
categories: [Guides]
tags: [feature-engineering, feature-selection, data-transformation, machine-learning, preprocessing]
related:
  - glossary/linear-regression
  - glossary/gradient-boosting
  - glossary/dimensionality-reduction
  - glossary/pca
  - guides/data-preparation-for-ai
last_updated: 2026-05-30
---

Feature engineering is the process of creating, transforming, and selecting input variables that help machine learning models learn effectively. It is often the single most impactful step in the ML pipeline - good features can make a simple model outperform a complex one trained on raw data. This guide covers systematic approaches to feature creation, transformation, and selection.

## Feature Creation

The goal is to encode domain knowledge into numerical features that make patterns easier for the model to detect.

**Date and time features** - Extract year, month, day of week, hour, is_weekend, is_holiday, days_since_event, and cyclical encodings (sin/cos transforms for hour, day of week) from timestamps. Time-based features are critical for demand forecasting, user behavior modeling, and any problem with temporal patterns.

**Text features** - Beyond bag-of-words and TF-IDF, create features like text length, word count, average word length, punctuation count, sentiment scores, and named entity counts. For modern NLP, use pre-trained embeddings (sentence-transformers) as dense feature vectors.

**Aggregation features** - Compute statistics (mean, median, min, max, count, standard deviation) over groups. Customer-level features like average order value, purchase frequency, and recency are classic examples. Window-based aggregations (rolling means, cumulative sums) capture trends in sequential data.

**Interaction features** - Create products, ratios, and differences between existing features. Price-per-square-foot (price / area) and click-through-rate (clicks / impressions) are examples where the ratio is more predictive than either feature alone. Tree-based models discover interactions automatically, but linear models require them to be created explicitly.

**Indicator features** - Binary flags for specific conditions: is_missing, is_above_threshold, is_first_purchase. These capture non-linear effects that the model might otherwise miss.

## Feature Transformation

Transformations change feature distributions to better suit the learning algorithm.

**Scaling** - StandardScaler (zero mean, unit variance) or MinMaxScaler (0-1 range) is required for distance-based algorithms (KNN, SVM) and gradient-based optimization (neural networks, logistic regression). Tree-based models do not require scaling.

**Log and power transforms** - Log transformation reduces right skew in features like income, transaction amounts, and population. Box-Cox and Yeo-Johnson transforms automatically find the best power transformation to make distributions more Gaussian. This helps linear models and improves performance of algorithms that assume normality.

**Encoding categorical variables** - One-hot encoding works for low-cardinality categories (< 20 unique values). For high-cardinality features (zip codes, product IDs), use target encoding (mean of target per category, with proper regularization to avoid leakage), frequency encoding, or learned embeddings. Ordinal encoding preserves order for ranked categories (education level, satisfaction rating).

**Handling missing values** - Simple imputation (mean, median, mode) with an additional binary is_missing indicator is often sufficient. For tree-based models, some implementations (LightGBM, XGBoost) handle missing values natively. KNN imputation and iterative imputation (MICE) are more sophisticated but slower.

## Feature Selection

Removing irrelevant and redundant features reduces overfitting, speeds up training, and improves interpretability.

**Filter methods** evaluate features independently of the model. Correlation with the target (for regression), mutual information (for any relationship type), chi-squared tests (for categorical features), and variance thresholds (removing near-constant features) are common filters. These are fast but ignore feature interactions.

**Wrapper methods** evaluate subsets of features using model performance. Recursive Feature Elimination (RFE) trains the model, removes the least important feature, and repeats. Forward selection adds features one at a time, keeping each if it improves performance. These are more accurate but computationally expensive.

**Embedded methods** perform selection during model training. L1 regularization (Lasso) drives irrelevant feature weights to zero. Tree-based feature importance (from Random Forest or gradient boosting) ranks features by their contribution to splits. SHAP-based importance provides the most reliable ranking but is slower to compute.

**Multicollinearity removal** - Highly correlated features provide redundant information and inflate variance in linear models. Compute the correlation matrix and remove one feature from each pair with correlation above 0.9. Variance Inflation Factor (VIF) is a more rigorous approach for detecting multicollinearity.

## Practical Workflow

1. Start with exploratory data analysis to understand distributions, relationships, and missing patterns.
2. Create domain-specific features based on business understanding.
3. Apply appropriate transformations based on the chosen algorithm.
4. Use a combination of filter methods (fast, broad) and embedded methods (accurate) for selection.
5. Validate feature importance on a held-out set to ensure selected features generalize.
6. Automate the feature pipeline so the same transformations apply consistently in training and production.

## Common Pitfalls

**Target leakage** - Features that contain information about the target that would not be available at prediction time. Future data leaking into historical features is a common form. Always ask: would I have this information at the moment I need to make a prediction?

**Train-test contamination** - Fitting scalers, encoders, or imputers on the full dataset before splitting. Always fit transformations on training data only and apply them to test data.

**Over-engineering** - Creating hundreds of features without validation. More features increase overfitting risk and training time. Start simple, measure impact, and add complexity only when it demonstrably helps.
