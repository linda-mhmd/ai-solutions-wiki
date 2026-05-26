---
title: "Prometheus"
description: "What Prometheus is, how it collects and stores metrics, and how it fits into cloud-native monitoring stacks."
date: 2026-03-28
categories: [Glossary]
tags: [prometheus, monitoring, metrics, observability, kubernetes]
related:
  - glossary/grafana
  - glossary/observability
  - glossary/kubernetes
---

Prometheus is an open-source monitoring system that collects, stores, and queries time-series metrics from applications and infrastructure. It uses a pull model (scraping metrics endpoints on a schedule) and stores metrics in a custom time-series database with a powerful query language (PromQL).

## How It Works

Applications expose metrics at an HTTP endpoint (typically `/metrics`) in Prometheus exposition format. Prometheus scrapes these endpoints at configured intervals (typically 15-30 seconds), stores the metrics, and evaluates alerting rules against them. Alerts are sent to Alertmanager, which handles routing, deduplication, and notification.

Metrics have four types: counters (monotonically increasing values like request count), gauges (values that go up and down like memory usage), histograms (distributions like request duration), and summaries (pre-calculated quantiles).

## Why It Matters

Prometheus is the de facto standard for monitoring Kubernetes workloads. It integrates natively with Kubernetes service discovery (automatically finds pods to scrape), has a rich ecosystem of exporters for third-party systems, and provides the metrics backend for Grafana dashboards.

For AI workloads, Prometheus tracks inference latency, request throughput, error rates, model prediction distributions, queue depths, and resource utilization. These metrics drive auto-scaling decisions, alert on degraded model performance, and provide the data for SLO tracking.

## AWS Integration

**Amazon Managed Prometheus** (AMP) provides a managed, scalable Prometheus backend without managing storage or high availability. It accepts metrics via remote write from self-managed Prometheus servers or from AWS Distro for OpenTelemetry (ADOT) collectors.

## Practical Guidance

Instrument your AI services with Prometheus client libraries (available for Python, Go, Java, Node.js). Define key metrics early: request latency percentiles (p50, p95, p99), error rate, throughput, and model-specific metrics (prediction confidence, token count, processing time). Use recording rules to pre-compute expensive queries. Set retention appropriate to your needs (15 days default; use Thanos or AMP for long-term storage). Avoid high-cardinality labels (like user IDs) that explode metric storage.

## Sources

- Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (Eds.). (2016). *Site Reliability Engineering*. O'Reilly Media. Chapter 6: Monitoring Distributed Systems. (The four golden signals: latency, traffic, errors, and saturation, the foundation for Prometheus metric design.)
- Prometheus Authors. (2016). *Prometheus: From open-source to commercial offering*. CNCF Blog. (Prometheus architecture; pull-based scraping, time-series storage, and PromQL query language.)
- Turnbull, J. (2018). *Monitoring with Prometheus*. Turnbull Press. (Prometheus instrumentation, alerting, federation, and integration with Grafana for production monitoring systems.)
