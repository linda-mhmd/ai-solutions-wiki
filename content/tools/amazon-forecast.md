---
title: "Amazon Forecast - Time Series Forecasting"
description: "A comprehensive reference for Amazon Forecast: managed time series prediction, predictor training, and integration patterns for demand planning and capacity forecasting."
date: 2026-03-28
categories: [Tools]
tags: [amazon-forecast, AWS, time-series, forecasting, ML]
related:
  - tools/amazon-sagemaker
  - tools/aws-s3
  - tools/amazon-quicksight
last_updated: 2026-05-30
---

Amazon Forecast is a managed service that uses machine learning to generate time series forecasts. You provide historical time series data (sales figures, server utilization, inventory levels), and Forecast automatically selects the best algorithm, trains a model, and produces predictions with confidence intervals. It combines traditional statistical methods (ARIMA, ETS) with deep learning approaches (DeepAR+, CNN-QR) and selects the best performer for your specific dataset.

Official documentation: https://docs.aws.amazon.com/forecast/
Pricing: https://aws.amazon.com/forecast/pricing/
Service quotas: https://docs.aws.amazon.com/forecast/latest/dg/limits.html

## Core Concepts

**Dataset Group** - The container for related datasets. A dataset group holds up to three dataset types: Target Time Series (required, the values you want to predict), Related Time Series (optional, correlated variables like price or promotions), and Item Metadata (optional, static attributes like product category or store location).

**Predictor** - A trained forecasting model. When you create a predictor, Forecast runs AutoML to test multiple algorithms against your data and selects the best performer based on backtesting metrics. Alternatively, you can specify a single algorithm if you have a preference.

**Forecast** - The output predictions. A forecast includes point predictions and probabilistic predictions at configurable quantiles (P10, P50, P90). The quantile forecasts are critical for business planning: P10 gives a conservative estimate, P50 the median expectation, and P90 an optimistic upper bound.

## Algorithm Selection

Forecast supports several algorithms, and AutoML will test them for you, but understanding the options helps interpret results.

**CNN-QR (Convolutional Neural Network - Quantile Regression)** - Best for large datasets with many related time series. It learns patterns across items, making it strong when individual item histories are short but you have many similar items.

**DeepAR+** - A recurrent neural network that learns from all time series simultaneously. Particularly effective when items share seasonal patterns or when you have covariates (related time series) that influence the target.

**Prophet** - Facebook's forecasting model, effective for data with strong seasonal patterns and holiday effects. Good interpretability.

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

Forecast charges for training (per compute hour), storage (per GB of imported data), and forecast generation (per 1,000 forecasts). Training costs vary significantly based on data volume and the number of algorithms tested during AutoML. Start with a representative sample of your data to estimate costs before running full-scale training.
