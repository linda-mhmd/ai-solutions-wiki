---
title: "Bayesian Optimization"
description: "Gaussian process-based sequential optimization method for efficient hyperparameter tuning of expensive-to-evaluate functions."
date: 2026-03-28
categories: [Glossary]
tags: [bayesian-optimization, hyperparameter-tuning, gaussian-process, model-selection, machine-learning]
related:
  - glossary/hyperparameter-tuning
  - glossary/cross-validation
  - glossary/gradient-boosting
  - glossary/random-forest
  - glossary/ensemble-methods
last_updated: 2026-05-30
---

Bayesian optimization is a sequential model-based approach for optimizing expensive black-box functions. In machine learning, it is primarily used for hyperparameter tuning - finding the best combination of learning rate, regularization strength, tree depth, and other parameters without exhaustively searching the entire space. It is significantly more sample-efficient than grid search or random search.

## How It Works

The algorithm maintains a probabilistic surrogate model (typically a Gaussian process) that approximates the objective function (for example, validation accuracy as a function of hyperparameters). At each step, it uses this surrogate to decide which hyperparameter configuration to evaluate next, balancing exploration (trying uncertain regions) and exploitation (trying regions predicted to perform well).

**Surrogate model** - A Gaussian process provides both a predicted value and an uncertainty estimate for any point in the hyperparameter space. After each evaluation, the surrogate is updated with the new observation, becoming more accurate in the evaluated regions.

**Acquisition function** determines the next point to evaluate. Common choices include Expected Improvement (EI), which favors points with high expected gain over the current best, and Upper Confidence Bound (UCB), which explicitly balances the predicted mean and uncertainty. The acquisition function is cheap to optimize, so it can be maximized exhaustively to find the most promising next evaluation.

## Comparison with Other Methods

**Grid search** evaluates every combination on a predefined grid. It scales exponentially with the number of hyperparameters and wastes evaluations in unimportant regions of the space.

**Random search** samples configurations randomly. It is more efficient than grid search (proven to find good solutions faster when some hyperparameters matter more than others) but does not use information from previous evaluations.

**Bayesian optimization** uses all previous evaluations to inform the next choice, concentrating evaluations in promising regions. It typically finds better configurations in 10-20 evaluations than random search finds in 100+. This matters when each evaluation takes minutes to hours (training a deep learning model, for example).

## Popular Tools

**Optuna** is the most popular Python framework for Bayesian optimization. It supports pruning (early stopping of unpromising trials), multiple sampling algorithms, and parallel distributed optimization. **Hyperopt** uses Tree-structured Parzen Estimators (TPE) instead of Gaussian processes, scaling better to high-dimensional spaces. **Scikit-optimize** integrates directly with scikit-learn pipelines. **Weights & Biases Sweeps** provides managed Bayesian optimization with experiment tracking.

## Limitations

Gaussian process-based Bayesian optimization scales poorly beyond roughly 20-50 hyperparameters due to the cubic cost of GP inference. TPE-based methods handle higher dimensions better. The method assumes a smooth relationship between hyperparameters and performance, which is not always the case. For very cheap evaluations, random search with many trials may be equally effective with less overhead.

## When to Use It

Use Bayesian optimization when training a single model configuration takes more than a few minutes, when you have a moderate number of continuous or ordinal hyperparameters (up to 20), and when you want to find good configurations with a limited evaluation budget. It is the standard approach for tuning deep learning architectures and complex ensemble models.

## Sources

- Mockus, J. (1975). On Bayesian methods for seeking the extremum. *Optimization Techniques, IFIP Technical Conference*. (Earliest formulation of Bayesian optimization with acquisition functions.)
- Jones, D.R., Schonlau, M., & Welch, W.J. (1998). Efficient global optimization of expensive black-box functions. *Journal of Global Optimization, 13*(4), 455–492. (EGO algorithm; Expected Improvement acquisition function.)
- Snoek, J., Larochelle, H., & Adams, R.P. (2012). Practical Bayesian optimization of machine learning algorithms. *NeurIPS 2012*. (First major application to ML hyperparameter tuning.)
- Bergstra, J., & Bengio, Y. (2012). Random search for hyper-parameter optimization. *JMLR, 13*, 281–305. (Establishes random search as a stronger baseline than grid search; motivation for Bayesian methods.)
