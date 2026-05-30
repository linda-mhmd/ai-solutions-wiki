---
title: "Software Quality Practices for ML Projects"
description: "How to apply software quality practices to ML projects: code coverage for non-model code, quality gates in CI/CD, static analysis, testing strategies, and quality metrics for AI systems."
date: 2026-03-28
categories: [Guides]
tags: [software-quality, testing, code-coverage, quality-gates, ci-cd, ai-engineering]
related:
  - guides/ci-cd-for-ai
  - guides/devsecops-ai
  - patterns/microservices-for-ai
last_updated: 2026-05-30
---

ML projects are software projects. The model is one component; the surrounding code handles data loading, feature engineering, API serving, monitoring, and orchestration. This surrounding code is often under-tested because teams focus on model accuracy metrics and neglect standard software quality practices. The result: production failures in data pipelines, API servers, and deployment scripts - not in the model itself.

## What to Test in ML Projects

### Deterministic Code (Standard Testing)

Most ML project code is deterministic and testable with standard approaches:

- **Data loaders** - Test that parsers handle edge cases: empty files, malformed records, encoding issues, missing columns
- **Feature engineering** - Test transformation functions with known inputs and expected outputs
- **API serialisation** - Test request parsing, response formatting, and error handling
- **Configuration** - Test that configuration loading handles missing values, type mismatches, and environment differences
- **Pipeline orchestration** - Test DAG construction, task dependencies, and retry logic

```python
def test_feature_engineering():
    raw = {"age": "25", "income": "50000", "category": "A"}
    features = compute_features(raw)
    assert features["age_normalized"] == pytest.approx(0.25, abs=0.01)
    assert features["income_log"] == pytest.approx(10.82, abs=0.01)
    assert features["category_encoded"] == [1, 0, 0]

def test_feature_engineering_missing_field():
    raw = {"age": "25", "category": "A"}  # Missing income
    with pytest.raises(MissingFeatureError):
        compute_features(raw)
```

### Model Code (Property-Based Testing)

Model inference code cannot be tested with exact expected outputs, but properties can be verified:

- **Output shape** - Model returns the expected number of predictions, correct tensor dimensions
- **Output range** - Probabilities are between 0 and 1, scores are within expected bounds
- **Determinism** - Same input with same seed produces same output
- **Graceful degradation** - Model handles empty input, extremely long input, and adversarial input without crashing

```python
def test_prediction_shape():
    result = model.predict(sample_input)
    assert result.shape == (1, num_classes)

def test_prediction_range():
    result = model.predict(sample_input)
    assert (result >= 0).all() and (result <= 1).all()

def test_prediction_determinism():
    r1 = model.predict(sample_input)
    r2 = model.predict(sample_input)
    assert np.allclose(r1, r2)
```

### Integration Tests

Test the assembled system with mocked external dependencies:

- **End-to-end inference** - Send a request through the API, verify the response structure and status code
- **Pipeline assembly** - Run the data pipeline with test data, verify output format
- **Feature store integration** - Write and read features, verify consistency

## Quality Gates in CI/CD

Configure CI/CD to enforce quality standards automatically:

```yaml
# GitHub Actions quality gate
- name: Run tests
  run: pytest tests/ --cov=src --cov-report=xml

- name: Check coverage
  run: |
    coverage report --fail-under=80
    # Coverage for non-model code only
    coverage report --include="src/api/*,src/data/*,src/pipeline/*" \
      --fail-under=85

- name: Static analysis
  run: |
    ruff check src/
    mypy src/ --ignore-missing-imports

- name: Complexity check
  run: |
    radon cc src/ -a -nc  # Flag functions with cyclomatic complexity > 10
```

### Recommended Quality Gates

| Gate | Threshold | Rationale |
|---|---|---|
| Unit test pass rate | 100% | No broken tests in main |
| Code coverage (non-model) | 80%+ | Data loaders, API, pipeline code |
| Code coverage (model code) | 60%+ | Lower bar for stochastic code |
| Static analysis | Zero errors | Ruff, flake8, or pylint |
| Type checking | Zero errors | mypy with strict mode for API code |
| Complexity | CC < 10 per function | Prevent unmaintainable functions |
| Security scan | No critical/high | Bandit, Semgrep |

## Code Coverage Strategy

Do not aim for 100% coverage across the entire ML project. Instead, set different targets by component:

- **API server**: 90%+ - This is standard web application code. High coverage prevents production errors.
- **Data pipeline**: 85%+ - Data loading, transformation, and validation code handles many edge cases that should be tested.
- **Feature engineering**: 85%+ - Feature computation is deterministic and testable.
- **Model wrapper**: 60-70% - Test input validation, output formatting, and error handling. Do not test model internals.
- **Notebooks**: 0% - Notebooks are for exploration, not production. Extract production code into tested modules.

## Static Analysis for ML Code

Standard linters catch bugs in ML code that tests might miss:

```toml
# pyproject.toml - ruff configuration
[tool.ruff]
target-version = "py311"
line-length = 100

[tool.ruff.lint]
select = [
    "E", "W",    # pycodestyle
    "F",          # pyflakes
    "I",          # isort
    "N",          # naming conventions
    "UP",         # pyupgrade
    "B",          # bugbear (common bugs)
    "SIM",        # simplify
    "TCH",        # type checking
]
```

**Type checking** is particularly valuable for ML projects where data shapes and types are critical. Use mypy or pyright for gradual type annotation:

```python
def predict(
    features: dict[str, float],
    model_id: str,
    config: InferenceConfig | None = None,
) -> PredictResult:
    ...
```

## Measuring Quality Over Time

Track quality metrics across releases:

- **Test count and coverage trend** - Are tests keeping pace with code changes?
- **Mean time to fix broken tests** - How quickly are test failures addressed?
- **Defect escape rate** - What percentage of production incidents could have been caught by tests?
- **Technical debt ratio** - Ratio of time spent on maintenance vs new features

Quality is not a launch milestone. It is a continuous investment that pays dividends in reduced incident frequency, faster onboarding, and confident deployments.
