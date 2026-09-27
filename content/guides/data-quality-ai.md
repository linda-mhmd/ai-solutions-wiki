---
title: "Data Quality Validation for AI Systems"
description: "How to implement data quality validation for AI workloads using Great Expectations and Deequ: profiling, expectation suites, pipeline integration, and monitoring data drift."
date: 2026-03-28
categories: [Guides]
tags: [data-quality, great-expectations, deequ, validation, data-engineering, ai-engineering]
related:
  - glossary/data-quality
  - glossary/data-contract
  - guides/stream-processing-ai
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

AI models are only as good as their training data and input features. A data quality issue that would be a minor inconvenience in a reporting dashboard can cause a model to learn incorrect patterns, make biased predictions, or fail silently in production. Data quality validation must be automated, continuous, and integrated into every data pipeline that feeds an AI system.

## Great Expectations

Great Expectations is the most widely adopted open-source data quality framework for Python-based pipelines. It works with pandas, Spark, and SQL databases.

### Core Concepts

- **Expectation** - A declarative assertion about data. Example: `gx.expectations.ExpectColumnValuesToNotBeNull(column="customer_id")`
- **Expectation Suite** - A collection of expectations for a dataset, stored as JSON
- **Validation Definition** - Pairs an expectation suite with a batch definition so it can be run repeatedly and produce results
- **Checkpoint** - An executable validation step that can be integrated into pipelines
- **Data Docs** - Auto-generated HTML documentation showing validation results

### Setting Up Expectations for ML Data

```python
import great_expectations as gx
import pandas as pd

context = gx.get_context()

# Connect to your data source (GX Core 1.x API)
data_source = context.data_sources.add_pandas("training_data")
asset = data_source.add_dataframe_asset(name="features")
batch_definition = asset.add_batch_definition_whole_dataframe("full_batch")
batch = batch_definition.get_batch(
    batch_parameters={"dataframe": pd.read_csv("features.csv")}
)

# Create expectation suite
suite = context.suites.add(gx.ExpectationSuite(name="ml_feature_validation"))

# Define expectations
suite.add_expectation(gx.expectations.ExpectColumnValuesToNotBeNull(column="user_id"))
suite.add_expectation(gx.expectations.ExpectColumnValuesToBeBetween(
    column="age", min_value=0, max_value=150
))
suite.add_expectation(gx.expectations.ExpectColumnValuesToBeInSet(
    column="category", value_set=["A", "B", "C", "D"]
))
suite.add_expectation(gx.expectations.ExpectColumnMeanToBeBetween(
    column="purchase_amount", min_value=10, max_value=500
))
suite.add_expectation(gx.expectations.ExpectColumnProportionOfUniqueValuesToBeBetween(
    column="user_id", min_value=0.9, max_value=1.0
))

results = batch.validate(suite)
```

The snippets on this page use the GX Core 1.x API (1.23 at the time of writing, September 2026). Older 0.x-era tutorials use calls such as `context.sources` and `context.add_expectation_suite()`, which GX 1.0 replaced with `context.data_sources` and `context.suites`.

### Distribution-Aware Expectations

Standard validation catches structural issues. For ML, you also need to detect distribution shifts:

```python
# Detect feature drift by checking distributional properties
suite.add_expectation(gx.expectations.ExpectColumnKLDivergenceToBeLessThan(
    column="feature_1",
    partition_object=reference_distribution,
    threshold=0.1
))

suite.add_expectation(gx.expectations.ExpectColumnMeanToBeBetween(
    column="feature_1",
    min_value=reference_mean * 0.8,
    max_value=reference_mean * 1.2
))

suite.add_expectation(gx.expectations.ExpectColumnStdevToBeBetween(
    column="feature_1",
    min_value=reference_std * 0.5,
    max_value=reference_std * 2.0
))
```

## AWS Deequ

Deequ is a data quality library built on Apache Spark, open-sourced by Amazon. It is suited for large-scale data quality checks in Spark-based pipelines.

### Key Capabilities

```scala
import com.amazon.deequ.checks.{Check, CheckLevel}
import com.amazon.deequ.VerificationSuite

val verificationResult = VerificationSuite()
  .onData(trainingData)
  .addCheck(
    Check(CheckLevel.Error, "ML data quality")
      .isComplete("customer_id")
      .isNonNegative("purchase_amount")
      .isContainedIn("status", Array("active", "inactive"))
      .hasSize(_ > 10000)  // Minimum row count
      .hasApproxQuantile("score", 0.5, _ > 0.3)  // Median check
  )
  .run()
```

Deequ also provides automated constraint suggestion: it profiles the data and proposes validation rules based on observed patterns.

## Pipeline Integration

### Training Pipeline Gate

Run validation before model training starts. If validation fails, the pipeline stops and alerts the data team:

```python
# In Airflow DAG or Step Functions
def validate_training_data(**context):
    checkpoint = gx_context.checkpoints.get("training_data_check")
    result = checkpoint.run()

    if not result.success:
        failed = [r for r in result.run_results.values()
                  if not r.success]
        raise DataQualityError(
            f"Training data validation failed: {len(failed)} checks failed"
        )
```

### Feature Store Validation

Validate features before they are written to the feature store:

- Check for null values in required features
- Verify feature value ranges match training data distributions
- Detect sudden changes in feature cardinality
- Alert when feature freshness exceeds the SLO

### Inference Input Validation

Validate inputs at inference time to catch anomalous requests:

- Reject requests with missing required fields
- Flag inputs outside the training distribution for logging and review
- Track input distribution statistics for drift detection

## Monitoring Data Quality Over Time

Validation checks catch known issues. Monitoring catches emerging issues:

- **Metric tracking** - Log validation pass rates, null rates, and distribution statistics to a time-series database
- **Alerting** - Set alerts for validation failure rate exceeding a threshold
- **Dashboards** - Visualise data quality trends per feature, per source, and per pipeline
- **Automated retraining triggers** - When data drift exceeds a threshold, trigger model retraining with fresh data

Data quality is not a gate you pass once. It is a continuous signal that requires monitoring with the same rigour as infrastructure metrics.

## Sources

1. Great Expectations, "Create an Expectation" (GX Core 1.23 docs, fetched 25 September 2026): [https://docs.greatexpectations.io/docs/core/define_expectations/create_an_expectation](https://docs.greatexpectations.io/docs/core/define_expectations/create_an_expectation)
2. Great Expectations, "Connect to dataframe data" (GX Core 1.x docs): [https://docs.greatexpectations.io/docs/core/connect_to_data/dataframes/](https://docs.greatexpectations.io/docs/core/connect_to_data/dataframes/)
3. Great Expectations, "Organize Expectations into an Expectation Suite": [https://docs.greatexpectations.io/docs/core/define_expectations/organize_expectation_suites](https://docs.greatexpectations.io/docs/core/define_expectations/organize_expectation_suites)
4. PyPI, great-expectations (version 1.23.2): [https://pypi.org/project/great-expectations/](https://pypi.org/project/great-expectations/)
