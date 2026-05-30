---
title: "Evidence Bundling Pattern - Collecting and Organizing Proof for AI Decisions"
description: "How to design AI systems that collect, organize, and present evidence for their recommendations. Critical for regulated industries and any context where decisions must be explainable."
date: 2026-03-24
categories: [Patterns]
tags: [patterns, compliance, audit, evidence]
last_updated: 2026-05-30
---

Any AI system that produces recommendations affecting people's access to services, money, or rights needs to be able to show its work. Evidence bundling is the design pattern that makes this possible: instead of producing a recommendation with an opaque score, the system collects, organizes, and presents the source material that supports the recommendation.

## Why Evidence Bundling Matters

AI recommendations without evidence have two problems. First, human reviewers cannot meaningfully evaluate them - rubber-stamping is the only available action when there is nothing to evaluate. Second, when a decision is challenged, there is no documentation to support why it was made.

Evidence bundling solves both problems by making the evidence a first-class output of the AI system, not an afterthought.

## The Bundle Structure

An evidence bundle contains four components:

**Claim or recommendation** - The system's output: the recommended payout amount, the eligibility determination, the fraud flag, the risk score. Stated explicitly with the confidence or certainty level if relevant.

**Evidence items** - Each piece of source material relevant to the recommendation, structured as:
- Source: which document or data source
- Extracted content: the specific text, figure, or data point extracted
- Relevance: why this item is included - what aspect of the recommendation it supports or contradicts
- Confidence: extraction confidence if applicable (especially relevant for OCR-extracted content)

**Reasoning chain** - An explicit account of how the evidence items relate to the recommendation. Not "the system scored this 72" but "the claim amount is 340% above the regional average for this damage type [source: estimates table, extracted value: 12,400, average: 3,650], the repair provider has appeared in 4 prior claims this month [source: vendor cross-reference], and the policy was issued 47 days before the loss date [source: policy document]."

**Contradicting evidence** - Items that do not support the recommendation. Including contradicting evidence is what distinguishes an honest evidence bundle from a post-hoc justification. If there is documentation that contradicts the recommendation, the reviewer needs to see it.

## Implementation Patterns

**Evidence collection as a pipeline stage** - Build evidence collection as an explicit step in the processing pipeline, not as a logging afterthought. The pipeline collects evidence as it processes, so the bundle is assembled naturally rather than reconstructed after the fact.

**Source linking** - Every evidence item should link directly to its source. In practice this means storing document references (file ID + page/section), not just extracted text. The human reviewer should be able to click through from any evidence item to the source document.

**Immutability** - Once a bundle is created and used to support a decision, it should not be modifiable. The audit value of an evidence bundle depends on it being a faithful record of what the AI saw when it made the recommendation.

**Confidence thresholds on extraction** - Low-confidence extracted items should be flagged in the bundle. An evidence item extracted from a poor-quality scan with 60% OCR confidence should be treated differently from one extracted from a clean digital document.

## What Belongs in a Bundle vs. What Does Not

Include: everything the system used or evaluated when forming its recommendation, even if it ultimately did not affect the outcome.

Do not include: raw document text that was not used in reasoning, intermediate computational results that do not correspond to any source material, system metadata like processing timestamps.

A bundle should be readable by a domain expert who did not build the system. If a claims adjuster cannot follow the reasoning chain from evidence to recommendation, the bundle is not serving its purpose.

## Storage and Retention

Evidence bundles must be retained for as long as the decisions they support may be challenged. In insurance, this is typically the lifetime of the policy plus 7-10 years. In government benefits, retention rules vary by program. Store bundles in immutable storage (S3 with object lock, or equivalent) with the decision record.
