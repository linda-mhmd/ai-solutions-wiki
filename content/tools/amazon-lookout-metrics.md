---
title: "Amazon Lookout for Metrics - Anomaly Detection"
description: "A comprehensive reference for Amazon Lookout for Metrics: automated anomaly detection in business and operational metrics, alerting, and root cause analysis."
date: 2026-03-28
categories: [Tools]
status: discontinued
status_detail: "Amazon Lookout for Metrics closed to new customers on 9 October 2024 and reached end of support on 10 October 2025. It is no longer available. For anomaly detection AWS now recommends Amazon CloudWatch, Amazon OpenSearch, Amazon Redshift ML, Amazon QuickSight, AWS Glue Data Quality, or Amazon SageMaker Canvas."
status_source: "https://aws.amazon.com/blogs/machine-learning/transitioning-off-amazon-lookout-for-metrics/"
tags: [AWS, anomaly-detection, discontinued, "aws-service"]
related:
  - tools/amazon-cloudwatch
  - tools/amazon-opensearch
  - tools/amazon-quicksight
layer: data
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Lookout for Metrics has been discontinued. AWS closed it to new customers on 9 October 2024 and ended support on 10 October 2025, after which models and resources are deleted, the service no longer appears in the AWS Management Console, and applications that call the Lookout for Metrics API stop working. This page is kept for reference and to point you to the current alternatives.

For anomaly detection today, AWS recommends these live services (chosen from the official transition guidance):

- {{< relref "tools/amazon-cloudwatch" >}} anomaly detection - applies statistical and machine learning algorithms to a metric, builds a band of expected values that accounts for seasonality (hourly, daily, weekly) and trend, and can alarm when the value goes above, below, or outside that band. Best for operational and infrastructure metrics.
- {{< relref "tools/amazon-opensearch" >}} - an integrated anomaly detection engine for real time and historical data, suited to logs and search-indexed time series.
- Amazon Redshift ML - anomaly detection on warehouse data using SQL, with the built-in XGBoost model type or models hosted in Amazon SageMaker.
- {{< relref "tools/amazon-quicksight" >}} - built-in ML insights and anomaly detection across millions of metrics inside dashboards.
- AWS Glue Data Quality - rule-based and ML-recommended checks, including anomaly detection, inside data pipelines.
- Amazon SageMaker Canvas - no-code anomaly detection for analysts who want to build models without writing code.

If you have a general business or operational metric and want managed alerting with the least setup, CloudWatch anomaly detection is the closest direct replacement for most Lookout for Metrics use cases.

**Foundations for beginners**: Anomaly detection means automatically flagging data points that do not fit the normal pattern, instead of waiting for a fixed threshold to be crossed. See {{< relref "glossary/anomaly-detection" >}} for the underlying methods and {{< relref "glossary/observability" >}} for how detection fits into monitoring a running system. Lookout for Metrics worked on time series (values recorded over time, like hourly revenue); the classic statistical baseline for that is {{< relref "glossary/arima" >}}.

Historically, Amazon Lookout for Metrics was a managed service that detected anomalies in business and operational metrics using machine learning. You connected it to your metric data sources, defined the measures and dimensions to monitor, and the service learned normal patterns and alerted you when something deviated unexpectedly. Unlike threshold-based alerting, it adapted to seasonal patterns, trends, and day-of-week variations without manual threshold tuning.

Note: the former product page, pricing page, and developer documentation for Lookout for Metrics now redirect away, since the service has been retired. The authoritative reference is the AWS transition guidance: https://aws.amazon.com/blogs/machine-learning/transitioning-off-amazon-lookout-for-metrics/

## Core Concepts

**Anomaly Detector** - The primary resource. A detector is configured with a data source, a set of measures (the numeric values to monitor), and dimensions (categorical attributes that segment the data). For example, a revenue detector might have "revenue" as the measure and "product_category" and "region" as dimensions.

**Measure** - A numeric metric to monitor for anomalies. Examples include revenue, page views, error count, conversion rate, or latency. Each detector can monitor up to five measures simultaneously.

**Dimension** - A categorical attribute that segments the measure. When you add dimensions, Lookout for Metrics monitors each combination independently. With two dimensions (region and product_category) and 10 regions and 50 categories, the service monitors up to 500 metric time series automatically.

**Alert** - A notification triggered when an anomaly is detected. Alerts can be sent to SNS topics, Lambda functions, or directly to Slack and PagerDuty through built-in integrations.

## Data Sources

Lookout for Metrics connects to several data sources natively: S3 (CSV or JSON files), CloudWatch, RDS, Redshift, and AppFlow (which enables connections to SaaS platforms like Salesforce and Marketo). The service pulls data at a configured interval (5 minutes, 10 minutes, 1 hour, or 1 day) depending on the granularity you need.

For S3 data sources, the service expects a consistent file structure with timestamps. A common pattern is to have an ETL job (Glue or Lambda) export metrics to S3 in the required format on a schedule that matches the detector's interval.

## How the ML Works

Lookout for Metrics uses an ensemble of ML algorithms to model each metric time series. It learns seasonal patterns (daily, weekly), trends (gradual increases or decreases), and expected variance. The learning period is approximately 250-300 data points. For hourly data, that means about two weeks before the detector reaches full accuracy. For daily data, plan for roughly a year of historical data for best results, though the service can begin detecting with less.

The service produces a severity score for each anomaly (0-100). Higher scores indicate larger deviations from expected behavior. You can set minimum severity thresholds on alerts to filter out minor fluctuations.

## Root Cause Analysis

When an anomaly is detected, Lookout for Metrics automatically analyzes the dimensional breakdown to identify which dimension values contributed most to the anomaly. If overall revenue drops, the service might identify that the anomaly is concentrated in the "electronics" category in the "EU-West" region. This dimensional root cause analysis significantly reduces the time from detection to investigation.

## Practical Use Cases

**Revenue monitoring** - Detect unexpected drops in daily or hourly revenue segmented by product line, region, or channel. Catches issues like broken checkout flows, pricing errors, or partner integration failures.

**Operational metrics** - Monitor error rates, latency, and throughput across microservices. The ML-based approach handles the natural variance in these metrics better than static thresholds.

**Marketing metrics** - Track conversion rates, click-through rates, and campaign spend anomalies. Particularly useful for detecting when a campaign is underperforming or overspending relative to historical patterns.

## Limitations

Lookout for Metrics works best with stable, repeating patterns. It is less effective for metrics that are inherently volatile or for detecting anomalies in newly launched products with no history. The service does not support sub-minute granularity, so it is not suitable for real-time infrastructure monitoring where second-level alerting is needed. For that, CloudWatch alarms remain the right tool.

## Pricing

Historically, pricing was based on the number of metrics monitored (each unique measure-dimension combination counted as one metric), with the per-metric cost tiered down at higher volumes. The pricing page is no longer published because the service has been retired, so plan instead against the pricing of the recommended alternative you adopt (for example CloudWatch anomaly detection is priced per anomaly-detection-enabled metric).

## Sources

- AWS Machine Learning Blog, Transitioning off Amazon Lookout for Metrics (closed to new customers 9 October 2024, end of support 10 October 2025, full list of recommended alternatives): https://aws.amazon.com/blogs/machine-learning/transitioning-off-amazon-lookout-for-metrics/
- Amazon CloudWatch documentation, Using CloudWatch anomaly detection (the closest live replacement for general metric anomaly detection): https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html
- Amazon CloudWatch API Reference, PutAnomalyDetector (the API that creates an anomaly detector): https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutAnomalyDetector.html
- Amazon QuickSight documentation, ML insights and anomaly detection: https://docs.aws.amazon.com/quicksight/latest/user/anomaly-detection.html
- Amazon OpenSearch Service documentation, Anomaly detection: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ad.html
