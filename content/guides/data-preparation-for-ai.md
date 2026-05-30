---
title: "Data Preparation for AI Projects - A Practical Guide"
description: "How to prepare data for AI projects: assessing what you have, cleaning and normalizing it, building evaluation datasets, and setting up ongoing data governance."
date: 2026-03-24
categories: [Guides]
tags: ["data-engineering", "intermediate", "data-preparation", "etl", "data-quality", "training-data", "feature-engineering"]
last_updated: 2026-05-30
---

"We have lots of data" is one of the most common statements at the start of an AI project and one of the most misleading. Having data and having data that is ready to power a production AI system are very different things. Data preparation is consistently the most time-consuming phase of AI projects - understanding what it involves upfront prevents the most common source of project delays.

## Step 1 - Assess What You Actually Have

Before any cleaning or processing work, audit the data:

**Identify all relevant data sources.** Document where the data lives (systems, databases, files), who owns it, and what access controls exist. For AI projects using documents, identify all document types, formats, and storage locations.

**Characterize completeness.** What percentage of records have all required fields? Are there systematic gaps (e.g., a required field that was added two years ago, so older records lack it)?

**Identify format and quality issues.** Sample 50-100 records manually. What do you find? Inconsistent formats (dates stored as "01/02/2024", "Jan 2, 2024", and "20240102" in the same field)? Free text that should be structured? Encoding issues? This audit is usually sobering.

**Check for bias and representativeness.** Is the data representative of the range of inputs the AI system will encounter in production? Historical data may underrepresent recent patterns, rare categories, or non-standard inputs that will be common in real use.

## Step 2 - Clean and Normalize

**Standardize formats** - Dates to ISO 8601, currency amounts to a standard numeric format, text encoding to UTF-8. These are mechanical but essential.

**Resolve duplicates** - Identify and resolve duplicate records. For documents, check for near-duplicates (different filenames but same content) that inflate apparent dataset size without adding diversity.

**Handle missing data** - For ML training data, decide per field: impute missing values (use median for numeric fields, "unknown" for categoricals), exclude records with missing required fields, or treat missing as a valid category in itself.

**Normalize text** - For LLM applications, text quality matters: fix encoding issues, remove or flag documents with high OCR error rates, normalize whitespace and special characters.

## Step 3 - Build an Evaluation Dataset

This step is skipped most often and causes the most pain. Before building the AI system, create a labeled evaluation dataset: a set of examples with known correct outputs that you will use to measure AI quality.

**How many examples?** A minimum of 100 examples for basic evaluation; 300-500 for reliable quality measurement; 1,000+ for detecting performance differences between model versions. For classification tasks, aim for at least 50 examples per class.

**Who labels them?** Domain experts, not engineers. The people who currently do the manual version of the task should create the reference labels. Engineer-labeled evaluation datasets frequently contain errors in domain-specific judgment.

**Make it representative.** Include the hard cases, the edge cases, and the rare categories - not just the easy typical examples. An evaluation dataset of only easy cases produces overestimates of real-world performance.

## Step 4 - Split for Training, Validation, and Test

If you are fine-tuning a model or training a custom classifier, split your labeled data:
- **Training set** - Used to train the model (typically 70-80% of labeled data)
- **Validation set** - Used during training to tune hyperparameters and detect overfitting (10-15%)
- **Test set** - Used for final evaluation after training is complete; never used during training (10-15%)

The test set must be held out strictly. Evaluating on examples that influenced training (even indirectly through hyperparameter tuning) produces optimistic estimates of production performance.

## Step 5 - Establish Ongoing Data Governance

AI systems degrade when their input data changes and the model does not. Set up:

**Schema monitoring** - Alert when upstream data schema changes unexpectedly.

**Data quality checks** - Automated checks that flag when data quality metrics (completeness, format compliance, value distributions) deviate from baseline.

**Knowledge base maintenance** - For RAG systems, assign ownership of each content area with a review cadence. Set up alerts when source documents are updated so the knowledge base stays current.

**Feedback loop** - Capture corrections made to AI outputs and route them back as potential training data for future model improvements. Even a simple mechanism for flagging incorrect AI outputs is valuable.

## Common Pitfalls

**Cleaning for general quality rather than AI quality** - Some data quality issues (typos in free text, inconsistent capitalization) are noise for traditional databases but minor for LLMs. Focus cleaning effort on issues that actually affect AI performance, not theoretical data hygiene.

**Not versioning datasets** - Training datasets should be versioned just like code. You need to know exactly which data produced which model, for debugging and reproducibility.

**Assuming production data will look like development data** - Production inputs are messier, more varied, and include edge cases you did not anticipate. Build your evaluation dataset from real production examples whenever possible, not synthetic or idealized inputs.
