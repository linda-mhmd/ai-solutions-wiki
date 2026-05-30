---
title: "Case Pattern: Building a Geospatial AI Platform from Public Data"
description: "How a team built a geospatial intelligence platform combining satellite imagery, public datasets, and AI analysis to generate location-based insights at scale."
date: 2026-03-24
categories: [Case Patterns]
tags: ["ai-ml", "advanced", "geospatial", "satellite-data", "intelligence-platform", "computer-vision", "aws"]
image: /img/enterprise-dark/gears-neural-wires-notext.png
image_alt: "Dark interlocking gears laced with red neural wires, representing the interconnected data layers that a geospatial intelligence platform must integrate and analyse."
image_caption: "Public datasets. Satellite feeds. Sensor networks. The platform joins them into a single queryable model."
---

A geospatial analytics team built a platform to generate infrastructure change detection reports from publicly available satellite imagery and open government datasets. The platform detects construction activity, land use change, and infrastructure development across thousands of locations - work that previously required manual analyst review of imagery.

## The Data Foundation

The platform ingests imagery from two public sources: Sentinel-2 (ESA, 10m resolution, 5-day revisit cycle) and Landsat-9 (USGS, 30m resolution, 16-day revisit). Both are freely available through the AWS Open Data program, meaning imagery is already stored in S3 and accessible without egress costs.

Ground truth data comes from OpenStreetMap, national cadastral datasets, and government infrastructure registries. These provide the baseline against which change is detected.

## The AI Pipeline

**Change detection** - A computer vision model trained on paired before/after imagery classifies each 100x100m cell as: no change, construction activity, demolition, vegetation change, or water extent change. The model is a ResNet-based classifier fine-tuned on labelled examples from three geographic regions. Confidence scores below 0.7 are flagged for human review.

**Contextual enrichment** - For cells where change is detected, an LLM call provides context: what is the known land use at this location, what permitted development exists in public records nearby, what does the change pattern suggest about the likely development type. This enrichment step significantly reduces analyst time on each alert.

**Reporting layer** - Detected changes are aggregated by area and change type, then summarized into a weekly intelligence brief using a generation prompt. The brief covers significant changes, trend patterns, and locations requiring further investigation.

## Infrastructure Choices

Processing runs on AWS Batch with GPU instances (g4dn.xlarge) for inference. The spot instance fleet reduces compute cost by 70% compared to on-demand, with a checkpoint mechanism ensuring jobs survive spot interruptions.

Amazon SageMaker hosts the change detection model endpoint for production inference. Model updates use SageMaker Pipelines for reproducible training runs with automatic evaluation against a held-out test set.

Processed results and original imagery chips are stored in S3 with an intelligent tiering policy: recent results in standard storage, older archive in Glacier Instant Retrieval.

## Key Lessons

**Cloud cover is the main operational challenge.** Optical imagery is useless under cloud cover. The pipeline includes a cloud coverage check before processing each image pair - if either image exceeds 20% cloud cover for the area of interest, the comparison is deferred to the next available clear image. Multi-temporal compositing (blending multiple partially-cloudy images) works for slow-changing contexts but introduces artifacts for construction detection.

**Regional model performance varies.** The change detection model performs well in the temperate regions it was trained on and degrades in arid and tropical environments where vegetation patterns differ significantly. Building region-specific fine-tuned variants improved precision by 18 percentage points in initially low-performing regions.

**False positive management determines adoption.** The platform's value depends on analysts trusting the alerts. Early versions had too many false positives, leading to alert fatigue. Adding a second-stage verification model that reviews flagged cells using a different method reduced false positives by 45% with minimal impact on recall.
