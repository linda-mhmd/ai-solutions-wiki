---
title: "Active Learning"
description: "Framework for intelligently selecting the most informative data points to label, reducing annotation costs while maximizing model performance."
date: 2026-03-28
categories: [Glossary]
tags: [active-learning, data-labeling, query-strategy, annotation, machine-learning]
related:
  - glossary/semi-supervised-learning
  - glossary/supervised-learning
  - glossary/transfer-learning
  - glossary/few-shot-learning
  - guides/data-labeling-guide
last_updated: 2026-05-30
---

Active learning is a machine learning framework where the model selects which data points should be labeled next, rather than labeling data randomly. By focusing annotation effort on the most informative examples, active learning achieves better model performance with fewer labels. This directly reduces the cost and time of data labeling - often the most expensive part of building ML systems.

## How It Works

The active learning loop has four steps: (1) train a model on the current labeled set, (2) use a query strategy to score all unlabeled examples, (3) select the highest-scoring examples and send them to human annotators, (4) add the newly labeled examples to the training set and repeat.

The key component is the **query strategy** that determines which examples are most worth labeling.

## Query Strategies

**Uncertainty sampling** selects examples where the model is least confident. For classification, this means examples near the decision boundary where the predicted probability is closest to 0.5 (binary) or where the top class probability is lowest (multi-class). Variants include least confidence, margin sampling (smallest gap between top two predictions), and entropy sampling (highest prediction entropy).

**Query-by-committee** trains multiple models (the committee) and selects examples where the models disagree most. High disagreement indicates regions of the feature space where more data is needed. The committee can be an ensemble, models with different initializations, or models trained on different data subsets.

**Expected model change** selects examples that would cause the largest update to model parameters if labeled. This directly targets examples that are most informative for learning but is computationally expensive.

**Diversity sampling** ensures selected examples are spread across the feature space rather than clustered in one uncertain region. It is often combined with uncertainty sampling - select a diverse batch from the most uncertain candidates.

**Bayesian approaches** use posterior uncertainty from Bayesian models (or Monte Carlo dropout as an approximation) to quantify model uncertainty. They naturally distinguish between epistemic uncertainty (reducible with more data) and aleatoric uncertainty (inherent noise), focusing labeling on reducible uncertainty.

## Batch Active Learning

In practice, labeling happens in batches rather than one example at a time. Batch selection must balance informativeness of individual examples with diversity of the batch to avoid redundant selections. Strategies include clustering uncertain examples and selecting cluster centroids, or using determinantal point processes to encourage diversity.

## Practical Considerations

Active learning requires a reliable uncertainty estimate, which not all models provide. Well-calibrated probabilistic models (logistic regression, Gaussian processes, Bayesian neural networks) work better than models with poorly calibrated confidence scores. Cold start is a challenge - the initial model trained on very few random labels may not produce useful uncertainty estimates.

Integration with annotation workflows is important. Annotators need a smooth interface, and the system should handle cases where annotators disagree or examples are ambiguous.

## When to Use It

Use active learning when labeling is expensive (medical imaging, legal document review, specialized domains) and you have a large pool of unlabeled data. It is most effective early in the labeling process when each new label provides maximum information gain. Combine with semi-supervised learning to leverage both labeled and unlabeled data.

## Sources

- Settles, B. (2010). Active learning literature survey. *University of Wisconsin–Madison Computer Sciences Technical Report 1648*. (Comprehensive survey; standard reference for query strategies.)
- Lewis, D.D., & Gale, W.A. (1994). A sequential algorithm for training text classifiers. *ACM SIGIR 1994*. (Uncertainty sampling; original formulation.)
- Seung, H.S., Opper, M., & Sompolinsky, H. (1992). Query by committee. *ACM Workshop on Computational Learning Theory*. (QBC original paper.)
- Ren, P., et al. (2021). A survey of deep active learning. *ACM Computing Surveys, 54*(9). (Extension of classical methods to deep learning settings.)
