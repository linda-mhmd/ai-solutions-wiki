---
title: "AI Data Cleaning and Normalization"
description: "AI detects and fixes data quality issues - inconsistent formats, duplicates, missing values, and outliers - across datasets of any size."
date: 2026-03-28
categories: [Ideas]
tags: [data-quality, data-cleaning, normalization, data-engineering, daily-ai-spark]
last_updated: 2026-05-30
---

Data cleaning consumes up to 80% of a data team's time. Address formats in five different formats. Phone numbers with and without country codes. Company names spelled three different ways. Null values that should be zeros. Outliers that are either errors or genuine edge cases.

## The AI Approach

An LLM analyzes data samples to detect inconsistencies, infer the intended format, and generate cleaning rules. It understands that "123 Main St", "123 Main Street", and "123 Main St." are the same address in a way that fuzzy matching alone cannot.

## Three-Step Build

1. **Profile** - Sample rows from each column. Send samples to an LLM and ask it to identify format inconsistencies, likely duplicates, suspicious values, and missing data patterns.
2. **Generate rules** - For each identified issue, the LLM produces a cleaning rule: a regex transformation, a deduplication key, a default value strategy, or an outlier threshold.
3. **Apply and validate** - Apply the rules to the full dataset. Sample the results and present before/after comparisons to a human for validation before committing the changes.

## Where It Breaks

The AI may normalize data that was intentionally different. Two entries that look like duplicates may represent genuinely different entities. Aggressive cleaning without human validation can destroy valid data.

## The Production Path

Build a data quality pipeline that runs on ingest. Flag issues for review rather than auto-correcting by default. Maintain a library of validated cleaning rules that grows over time. Track data quality metrics (completeness, consistency, accuracy) and alert when they degrade.
