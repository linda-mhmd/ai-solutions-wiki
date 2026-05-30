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
last_updated: 2026-05-30
---

AI models are only as good as their training data and input features. A data quality issue that would be a minor inconvenience in a reporting dashboard can cause a model to learn incorrect patterns, make biased predictions, or fail silently in production. Data quality validation must be automated, continuous, and integrated into every data pipeline that feeds an AI system.

## Great Expectations

Great Expectations is the most widely adopted open-source data quality framework for Python-based pipelines. It works with pandas, Spark, and SQL databases.

### Core Concepts

- **Expectation** - A declarative assertion about data. Example: `expect_column_values_to_not_be_null("customer_id")`
- **Expectation Suite** - A collection of expectations for a dataset, stored as JSON
- **Validator** - Runs an expectation suite against a batch of data and produces results
- **Checkpoint** - An executable validation step that can be integrated into pipelines
- **Data Docs** - Auto-generated HTML documentation showing validation results

### Setting Up Expectations for ML Data

```python
import great_expectations as gx

context = gx.get_context()

# Connect to your data source
datasource = context.sources.add_pandas("training_data")
asset = datasource.add_csv_asset("features", filepath_or_buffer="features.csv")
batch_request = asset.build_batch_request()

# Create expectation suite
suite = context.add_expectation_suite("ml_feature_validation")
validator = context.get_validator(
    batch_request=batch_request,
    expectation_suite_name="ml_feature_validation"
)

# Define expectations
validator.expect_column_values_to_not_be_null("user_id")
validator.expect_column_values_to_be_between(
    "age", min_value=0, max_value=150
)
validator.expect_column_values_to_be_in_set(
    "category", ["A", "B", "C", "D"]
)
validator.expect_column_mean_to_be_between(
    "purchase_amount", min_value=10, max_value=500
)
validator.expect_column_proportion_of_unique_values_to_be_between(
    "user_id", min_value=0.9, max_value=1.0
)

validator.save_expectation_suite(discard_failed_expectations=False)
```

### Distribution-Aware Expectations

Standard validation catches structural issues. For ML, you also need to detect distribution shifts:

```python
# Detect feature drift by checking distributional properties
validator.expect_column_kl_divergence_to_be_less_than(
    "feature_1",
    partition_object=reference_distribution,
    threshold=0.1
)

validator.expect_column_mean_to_be_between(
    "feature_1",
    min_value=reference_mean * 0.8,
    max_value=reference_mean * 1.2
)

validator.expect_column_stdev_to_be_between(
    "feature_1",
    min_value=reference_std * 0.5,
    max_value=reference_std * 2.0
)
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
    checkpoint = ge_context.get_checkpoint("training_data_check")
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
