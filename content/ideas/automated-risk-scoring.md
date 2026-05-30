---
title: "AI Spark: Automated Risk Assessment Scoring"
description: "Use AI to evaluate and score risks from project documents, incident reports, and audit findings consistently."
date: 2026-03-28
categories: [Ideas]
tags: [risk-management, assessment, scoring, automation, compliance]
last_updated: 2026-05-30
---

Risk assessment is critical but subjective. Two analysts evaluating the same risk often assign different severity scores because their mental models differ. This inconsistency makes it hard to prioritize risks across teams or compare risk profiles over time.

## The Problem

Risk registers require each identified risk to be scored on likelihood and impact dimensions. Analysts must read supporting documentation, understand the context, and assign scores using a rubric that leaves room for interpretation. The process is slow, and scoring inconsistency undermines trust in the risk register.

## The AI Approach

An LLM can read risk descriptions and supporting documentation, then score each risk against a defined rubric with consistent application of criteria. The model provides reasoning for each score, making the assessment transparent and auditable.

## Three-Step Build

**Step 1 - Rubric definition.** Formalize your risk scoring rubric with clear, measurable criteria for each level of likelihood and impact. Include examples of risks that score at each level.

**Step 2 - Automated scoring.** For each risk, send the description and supporting context to an LLM along with the rubric and examples. The model returns likelihood score, impact score, overall risk rating, and a written rationale citing specific evidence.

**Step 3 - Review and calibrate.** Present AI-scored risks alongside their rationale for human review. Track agreement rates between AI scores and human-adjusted scores to identify rubric areas that need clearer definition.

## Where It Breaks

Risk scoring requires judgment about future probabilities that even experts disagree on. The model cannot assess risks involving information it does not have access to. Novel risks without historical precedent lack the context needed for reliable scoring.

## The Production Path

Use AI scoring for initial triage and consistency checking. Have senior risk analysts review all high-rated risks and a sample of medium-rated ones. Refine the rubric based on disagreement patterns between AI and human scores.
