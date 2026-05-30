---
title: "Hyperparameter Tuning Guide"
description: "Practical guide to grid search, random search, and Bayesian optimization for finding optimal model configurations."
date: 2026-03-28
categories: [Guides]
tags: [hyperparameter-tuning, grid-search, random-search, bayesian-optimization, model-selection]
related:
  - glossary/bayesian-optimization
  - glossary/hyperparameter-tuning
  - glossary/cross-validation
  - glossary/gradient-boosting
  - glossary/overfitting
last_updated: 2026-05-30
---

Hyperparameter tuning finds the model configuration that produces the best performance on unseen data. Unlike model parameters (learned during training), hyperparameters are set before training begins - learning rate, regularization strength, tree depth, number of layers. Choosing them well can mean the difference between a mediocre model and a strong one. This guide covers practical strategies from simple to sophisticated.

## The Tuning Workflow

Every tuning approach follows the same pattern: define a search space, evaluate configurations using cross-validation, select the best one, and verify on a held-out test set.

**Define the search space** - For each hyperparameter, specify the range of values to explore. Use domain knowledge and documentation defaults to set reasonable bounds. A learning rate range of [0.001, 0.3] is standard for gradient boosting. Tree depth of [3, 12] covers most cases.

**Evaluation protocol** - Use k-fold cross-validation (typically k=5) to estimate performance for each configuration. Stratified folds for classification. The metric should match the business objective (F1 for imbalanced data, RMSE for regression, AUPRC for rare events).

**Final validation** - After selecting the best configuration, evaluate it on a completely held-out test set that was never used during tuning. This gives an unbiased estimate of real-world performance.

## Grid Search

Grid search evaluates every combination of hyperparameter values on a predefined grid.

```
param_grid = {
    'max_depth': [3, 5, 7, 9],
    'learning_rate': [0.01, 0.05, 0.1, 0.2],
    'n_estimators': [100, 300, 500]
}
```

This grid has 4 x 4 x 3 = 48 combinations, each evaluated with 5-fold cross-validation = 240 model trainings.

**Pros**: Exhaustive, easy to implement, reproducible. **Cons**: Scales exponentially with the number of hyperparameters. With 6 hyperparameters and 5 values each, you get 15,625 combinations. Most of the budget is spent evaluating unimportant regions of the space.

**When to use**: 1-3 hyperparameters with a small grid. Good for a final fine-grained search after narrowing the range with other methods.

## Random Search

Random search samples configurations randomly from specified distributions.

```
param_distributions = {
    'max_depth': randint(3, 12),
    'learning_rate': loguniform(0.001, 0.3),
    'n_estimators': randint(100, 1000),
    'subsample': uniform(0.5, 0.5),
    'colsample_bytree': uniform(0.5, 0.5)
}
```

**Why it works better than grid search** - Bergstra and Bengio (2012) proved that random search is more efficient when some hyperparameters matter more than others (which is almost always the case). Grid search wastes evaluations testing many values of unimportant parameters with each fixed value of important ones. Random search covers the important dimensions more thoroughly.

**Use log-uniform distributions** for parameters that span orders of magnitude (learning rate, regularization strength). Use uniform for bounded parameters (subsample ratio, dropout rate). Use integer distributions for discrete parameters (depth, number of estimators).

**Budget**: 50-100 random configurations is a reasonable starting budget. This finds a configuration within the top 5% of the search space with about 95% probability.

## Bayesian Optimization

Bayesian optimization uses a probabilistic surrogate model to intelligently select which configuration to evaluate next, concentrating evaluations in promising regions.

**Optuna** is the recommended tool:

```python
import optuna

def objective(trial):
    params = {
        'max_depth': trial.suggest_int('max_depth', 3, 12),
        'learning_rate': trial.suggest_float('learning_rate', 0.001, 0.3, log=True),
        'n_estimators': trial.suggest_int('n_estimators', 100, 1000),
        'subsample': trial.suggest_float('subsample', 0.5, 1.0),
    }
    model = LGBMClassifier(**params)
    score = cross_val_score(model, X, y, cv=5, scoring='f1').mean()
    return score

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)
```

**Pruning** - Optuna supports early stopping of unpromising trials. If the first two folds of cross-validation show poor performance, the trial is terminated without completing all folds. This dramatically reduces total computation.

**When to use**: When each evaluation is expensive (minutes to hours), when you have 3-20 hyperparameters, and when you want the best possible configuration within a limited budget.

## Early Stopping

For iterative algorithms (gradient boosting, neural networks), early stopping is the most effective way to tune the number of iterations.

Train with a large number of iterations and monitor performance on a validation set. Stop training when validation performance has not improved for a specified number of rounds (patience). This automatically finds the optimal number of iterations without wasting computation.

Combine early stopping with tuning of other hyperparameters - fix n_estimators to a large value and let early stopping determine the actual count for each configuration.

## Practical Recommendations

**Start with defaults** - Modern implementations (LightGBM, XGBoost, scikit-learn) have reasonable defaults. Establish a baseline with default parameters before tuning.

**Tune in stages** - First, do a coarse random search with 50-100 trials to identify the important regions. Then refine with Bayesian optimization or a focused grid search around the best-found region.

**Important hyperparameters by algorithm**:
- Gradient boosting: learning_rate, max_depth, n_estimators (via early stopping), subsample, colsample_bytree
- Random Forest: n_estimators, max_depth, min_samples_leaf, max_features
- SVM: C, gamma (for RBF kernel), kernel choice
- Neural networks: learning_rate, batch_size, architecture (layers, units), dropout, weight_decay

**Log your experiments** - Use MLflow, Weights & Biases, or Optuna's built-in visualization to track all configurations and results. This prevents re-evaluating known configurations and helps identify which hyperparameters matter most.

**Do not overfit the validation set** - Extensive tuning on cross-validation can lead to overfitting the validation procedure itself. Keep a final held-out test set and report performance on it. If the gap between cross-validation and test performance is large, you have overtuned.
