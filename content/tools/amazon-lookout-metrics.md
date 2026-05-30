---
title: "Amazon Lookout for Metrics - Anomaly Detection"
description: "A comprehensive reference for Amazon Lookout for Metrics: automated anomaly detection in business and operational metrics, alerting, and root cause analysis."
date: 2026-03-28
categories: [Tools]
tags: [amazon-lookout-metrics, AWS, anomaly-detection, monitoring, ML]
related:
  - tools/amazon-cloudwatch
  - tools/amazon-managed-grafana
  - tools/amazon-quicksight
last_updated: 2026-05-30
---

Amazon Lookout for Metrics is a managed service that detects anomalies in business and operational metrics using machine learning. You connect it to your metric data sources, define the measures and dimensions you want to monitor, and the service automatically learns normal patterns and alerts you when something deviates unexpectedly. Unlike threshold-based alerting, Lookout for Metrics adapts to seasonal patterns, trends, and day-of-week variations without manual threshold tuning.

Official documentation: https://docs.aws.amazon.com/lookoutmetrics/
Pricing: https://aws.amazon.com/lookout-for-metrics/pricing/
Service quotas: https://docs.aws.amazon.com/lookoutmetrics/latest/dev/quotas.html

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

Pricing is based on the number of metrics monitored (each unique measure-dimension combination counts as one metric). The per-metric cost decreases at higher volumes. For a detector monitoring revenue across 100 dimension combinations, estimate costs based on 100 metrics at the published per-metric rate.
