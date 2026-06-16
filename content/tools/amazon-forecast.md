---
title: "Amazon Forecast - Time Series Forecasting"
description: "Amazon Forecast: managed time series prediction, now closed to new customers. Migrate to Amazon SageMaker Canvas for forecasting."
date: 2026-03-28
categories: [Tools]
tags: [AWS, time-series, forecasting, ML, "aws-service"]
related:
  - tools/amazon-sagemaker
  - tools/aws-s3
  - tools/amazon-quicksight
layer: data
provider: aws
pricing_model: payg
maturity: production
status: deprecated
status_detail: "Closed to new customer access on 29 July 2024. AWS continues security and availability updates for existing customers but adds no new features. AWS recommends migrating to Amazon SageMaker Canvas for time series forecasting."
status_source: "https://aws.amazon.com/blogs/machine-learning/transition-your-amazon-forecast-usage-to-amazon-sagemaker-canvas/"
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Forecast is a managed service that uses machine learning to generate time series forecasts. You provide historical time series data (sales figures, server utilization, inventory levels), and Forecast automatically selects the best algorithm, trains a model, and produces predictions with confidence intervals. It combines traditional statistical methods (ARIMA, ETS) with deep learning approaches (DeepAR+, CNN-QR) and selects the best performer for your specific dataset.

> **Status: closed to new customers.** AWS closed new customer access to Amazon Forecast effective 29 July 2024. Existing customers can continue to use the service, and AWS keeps maintaining its security, availability, and performance, but no new features are being added. For new projects, AWS recommends building time series forecasts in Amazon SageMaker Canvas instead. See [Transition your Amazon Forecast usage to Amazon SageMaker Canvas](https://aws.amazon.com/blogs/machine-learning/transition-your-amazon-forecast-usage-to-amazon-sagemaker-canvas/). This page is kept as a reference for teams who still run Forecast and for understanding the concepts that carry over to its successor.

Official documentation: https://docs.aws.amazon.com/forecast/
Pricing: https://aws.amazon.com/forecast/pricing/
Service quotas: https://docs.aws.amazon.com/forecast/latest/dg/limits.html

## Foundations first

If you are new to forecasting, a few plain-language ideas make the rest of this page easier to follow.

- **Time series** - data points recorded in time order at a fixed spacing, for example daily sales or hourly server load. The goal of forecasting is to predict the next values in that sequence from the history.
- **Time series forecasting** - using past patterns (trend, seasonality, the effect of related events) to estimate future values. It is a form of {{< relref "glossary/supervised-learning" >}} where the "label" is simply a future value in the same series.
- **Confidence interval (quantile)** - instead of a single guessed number, a forecast usually gives a range. A P90 value means the model expects the real number to fall below it about 90% of the time. Ranges matter for planning: you stock differently for a likely case than for a worst case.
- **Seasonality** - repeating patterns tied to the calendar (weekly, monthly, yearly) or to events like holidays and promotions.

Useful background concepts: {{< relref "glossary/arima" >}}, {{< relref "glossary/deep-learning" >}}, {{< relref "glossary/recurrent-neural-network" >}}, {{< relref "glossary/convolutional-neural-network" >}}, and {{< relref "glossary/inference" >}}. For anomaly spotting on the same kind of data, see {{< relref "glossary/anomaly-detection" >}}.

In the context of AI systems, time series forecasting sits in the data and models layers: it turns operational history (demand, traffic, usage) into forward-looking signals that downstream applications and human planners act on.

## Core Concepts

**Dataset Group** - The container for related datasets. A dataset group holds up to three dataset types: Target Time Series (required, the values you want to predict), Related Time Series (optional, correlated variables like price or promotions), and Item Metadata (optional, static attributes like product category or store location).

**Predictor** - A trained forecasting model. When you create a predictor, Forecast runs AutoML to test multiple algorithms against your data and selects the best performer based on backtesting metrics. Alternatively, you can specify a single algorithm if you have a preference.

**Forecast** - The output predictions. A forecast includes point predictions and probabilistic predictions at configurable quantiles (P10, P50, P90). The quantile forecasts are critical for business planning: P10 gives a conservative estimate, P50 the median expectation, and P90 an optimistic upper bound.

## Algorithm Selection

Forecast supports several algorithms, and AutoML will test them for you, but understanding the options helps interpret results.

**CNN-QR (Convolutional Neural Network - Quantile Regression)** - Best for large datasets with many related time series. It learns patterns across items, making it strong when individual item histories are short but you have many similar items.

**DeepAR+** - A recurrent neural network that learns from all time series simultaneously. Particularly effective when items share seasonal patterns or when you have covariates (related time series) that influence the target.

**Prophet** - an open source forecasting model created by Meta (Facebook), effective for data with strong seasonal patterns and holiday effects. Good interpretability.

**ARIMA/ETS** - Traditional statistical methods. Forecast includes these as baselines and sometimes they outperform deep learning on simple, single-item forecasting tasks.

## Data Preparation

The target time series must have a consistent frequency (hourly, daily, weekly, monthly) with timestamps aligned to that frequency. Missing values should be handled before import: Forecast can fill gaps with zeros, interpolation, or backfill, but explicitly choosing the right strategy improves accuracy.

Related time series are powerful but often underutilized. If you are forecasting product sales, including price, promotion flags, and weather data as related time series can significantly improve accuracy. Related time series must cover both the historical period and the forecast horizon (you need to know future prices and planned promotions).

## Forecast Horizon and Granularity

The forecast horizon defines how far into the future to predict. The maximum horizon depends on the data frequency: up to 500 time steps. For daily data, that is about 16 months. For hourly data, about 20 days.

Choose the shortest horizon that meets your business need. Accuracy degrades as the horizon extends. If you need both short-term (next week) and long-term (next quarter) forecasts, consider creating separate predictors optimized for each horizon.

## Integration Patterns

The typical pattern is: store historical data in S3, create a dataset import job to load it into Forecast, train a predictor, generate a forecast, and export results back to S3. From there, results can flow into QuickSight dashboards, downstream Lambda functions, or planning systems.

For recurring forecasts, automate the pipeline with Step Functions: trigger a new dataset import as fresh data arrives, retrain the predictor periodically (weekly or monthly), and generate updated forecasts automatically.

## Pricing

Forecast charges for training (per compute hour), storage (per GB of imported data), and forecast generation (per 1,000 forecasts). Training costs vary significantly based on data volume and the number of algorithms tested during AutoML. Start with a representative sample of your data to estimate costs before running full-scale training. Check the official pricing page for current rates, since the service is in maintenance mode.

## Migrating to Amazon SageMaker Canvas

Because Amazon Forecast is closed to new customers, AWS points teams to Amazon SageMaker Canvas, a low code visual tool inside Amazon SageMaker, for new time series work. The mental model carries over closely.

- **Dataset shape.** Canvas expects a tabular dataset with a timestamp column, a target column (the value to predict), and an item ID column that identifies each series, for example a SKU. This is the same Target Time Series idea, just in one table.
- **Related variables.** Columns that contain known future values (planned price, promotion flags, weather) are detected and used to sharpen predictions, the equivalent of Forecast's Related Time Series. You can run what-if analyses on them directly in Canvas.
- **Forecast intervals.** Canvas forecasts at intervals from 1 minute up to 1 year, and supports single item and all item forecasts.
- **Missing values.** Canvas imputes gaps with configurable logic (zero, mean, median, min, max, or NaN for the target column), similar to Forecast's filling strategies.

AWS reports that for time series models, SageMaker Canvas delivers up to 50% faster model building and up to 45% quicker predictions on average than Amazon Forecast, with prediction cost tied only to the SageMaker compute used. See the AWS guidance below for the migration steps and the Canvas documentation for current limits.

## Best practices

For production forecasting on AWS, the AWS Well-Architected Framework Machine Learning Lens covers the full lifecycle (data preparation, model building, deployment, and monitoring) across the operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability pillars. For a deeper treatment of the problem itself, AWS also publishes a Demand Forecasting whitepaper. A few practical points specific to time series:

- Validate with backtesting and report quantile accuracy (for example weighted quantile loss), not just a single point error, so plans reflect uncertainty.
- Pick the shortest forecast horizon that meets the business need, since accuracy degrades the further out you predict.
- Watch for data drift and concept drift, and retrain on a schedule as fresh history arrives. See {{< relref "glossary/mlops" >}} for automating that loop.
- Treat related variables honestly: only include columns whose future values you can actually know at forecast time.

## Sources

- [Transition your Amazon Forecast usage to Amazon SageMaker Canvas](https://aws.amazon.com/blogs/machine-learning/transition-your-amazon-forecast-usage-to-amazon-sagemaker-canvas/) - official AWS announcement of the closure to new customers and the recommended migration path, with the performance comparison figures.
- [Amazon Forecast Developer Guide](https://docs.aws.amazon.com/forecast/latest/dg/what-is-forecast.html) - the service documentation, including the algorithm recipes (ARIMA, CNN-QR, DeepAR+, ETS, NPTS, Prophet) and accuracy metrics (RMSE, wQL, MAPE, MASE, WAPE).
- [Time series forecasts in Amazon SageMaker Canvas](https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-time-series.html) - documentation for the recommended successor, covering dataset shape, future values, intervals, and missing value handling.
- [Amazon Forecast pricing](https://aws.amazon.com/forecast/pricing/) - current pricing for training, storage, and forecast generation.
- [AWS Well-Architected Framework: Machine Learning Lens](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html) - best practice guidance for ML workloads across the six pillars (updated November 2025).
- [Demand Forecasting on AWS whitepaper](https://docs.aws.amazon.com/whitepapers/latest/demand-forecasting/addressing-the-challenges-with-demand-forecasting-solutions-on-aws.html) - architecture and lifecycle guidance for forecasting on AWS (kept by AWS for historical reference).
