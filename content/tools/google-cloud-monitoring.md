---
title: "Cloud Monitoring - Infrastructure and Application Observability"
description: "Google Cloud Monitoring provides metrics collection, dashboards, alerting, and uptime checks for GCP resources, applications, and AI/ML workloads."
date: 2026-03-28
categories: [Tools]
tags: [gcp, google-cloud, monitoring, observability, alerting, operations]
related:
  - tools/amazon-cloudwatch
  - tools/amazon-managed-grafana
  - tools/google-cloud-run
  - tools/google-vertex-ai
last_updated: 2026-05-30
---

Google Cloud Monitoring (formerly Stackdriver Monitoring) is a fully managed observability service that collects metrics, creates dashboards, and triggers alerts for GCP resources, hybrid cloud environments, and custom applications. It is part of Google Cloud's Operations suite (formerly Stackdriver), alongside Cloud Logging, Cloud Trace, Cloud Profiler, and Error Reporting. Together, these services provide comprehensive observability for production workloads.

Cloud Monitoring automatically collects over 1,500 metrics from GCP services without any agent installation. Compute Engine VMs, Cloud Functions, Cloud Run, GKE, BigQuery, Vertex AI, and virtually every GCP service emit metrics that are available in Cloud Monitoring within seconds. For AI workloads, this means you can monitor Vertex AI prediction endpoint latency and error rates, Cloud Function execution duration and invocation counts, BigQuery slot utilization and query performance, and Pub/Sub message throughput and acknowledgment latency -- all from a single console. Custom metrics can be written via the Monitoring API or OpenTelemetry for application-specific measurements like model inference accuracy, token usage, or pipeline throughput.

Alerting policies define conditions that trigger notifications when metrics cross thresholds or exhibit anomalous behavior. Alerts can be sent to email, SMS, PagerDuty, Slack, webhooks, and Pub/Sub. Monitoring Query Language (MQL) provides a powerful query syntax for filtering, aggregating, and transforming metric data. For teams already using Grafana, Cloud Monitoring provides a Grafana data source plugin, and Google Cloud also offers a managed Grafana service. Dashboards can be shared across teams and embedded in internal portals, providing operational visibility for AI pipeline health.

## Key Capabilities

- **Automatic GCP Metrics Collection** - Over 1,500 pre-built metrics from GCP services collected automatically without agents or configuration.
- **Alerting Policies** - Threshold-based, absence-based, and anomaly detection alerts with configurable notification channels and incident management.
- **Monitoring Query Language (MQL)** - A powerful query language for filtering, aggregating, grouping, and aligning time-series metric data.
- **Uptime Checks** - Automated checks from global locations that verify endpoint availability and latency, with alerts on failures.

## AWS Equivalent

Cloud Monitoring is Google Cloud's counterpart to Amazon CloudWatch. Both services collect infrastructure metrics, support custom metrics, provide dashboards, and trigger alerts. CloudWatch offers tighter integration with AWS services and CloudWatch Logs Insights for log analytics, while Cloud Monitoring separates logging into Cloud Logging as a distinct service. CloudWatch Synthetics (canary testing) competes with Cloud Monitoring's uptime checks. Both support Grafana as an alternative visualization layer.

## Origins and History

Google acquired Stackdriver, an AWS-focused monitoring startup, in May 2014 and expanded the product to support GCP. Stackdriver Monitoring reached general availability on GCP in October 2016. In 2020, Google rebranded Stackdriver to "Google Cloud's Operations suite," renaming the product to Cloud Monitoring. The rebrand consolidated Monitoring, Logging, Trace, Debugger, and Profiler under a unified brand. MQL was introduced in 2020, providing an alternative to the visual metric explorer for complex queries. In 2023, Google added Prometheus-compatible metric ingestion, aligning with the open-source observability ecosystem.

## Sources

1. Google Cloud Documentation. "Cloud Monitoring overview." https://cloud.google.com/monitoring/docs/monitoring-overview
2. Google Cloud Blog. "Google completes Stackdriver acquisition." June 2014. https://cloud.google.com/blog/products/management-tools/google-completes-stackdriver-acquisition
