---
title: "Case Pattern: AI-Assisted Legal Document Review for a Law Firm"
description: "Architecture and lessons from deploying AI to accelerate document review in litigation, reducing review time by 65% while maintaining quality standards."
date: 2026-03-28
categories: [Case Patterns]
tags: [legal, document-review, e-discovery, classification, litigation]
image: /img/shaping-ai/documents-cube-vs-neon-orbit-notext.png
image_alt: "A split image: a dark stack of documents on the left, a glowing red neon orbital ring on the right, representing the shift from static document review to dynamic AI-assisted analysis."
image_caption: "The documents do not change. The speed at which a lawyer can work through them does."
last_updated: 2026-05-30
---

A mid-size law firm handling commercial litigation faced a recurring challenge: document review. A typical case involved reviewing 50,000-500,000 documents to identify those relevant to the case, privileged documents that must be withheld, and key documents that materially affect the case. At $50-100 per hour for contract reviewers, a large case could cost $500,000 or more in review fees alone.

## The Architecture

The system combines predictive coding with LLM-powered analysis to prioritize and classify documents.

**Ingestion pipeline** - Documents arrive from e-discovery collection in various formats: emails, PDFs, Word documents, spreadsheets, and presentations. The pipeline extracts text, metadata (dates, authors, recipients), and attachments. OCR handles scanned documents. Each document receives a unique ID and enters the review database.

**Seed set review** - Senior attorneys review a stratified random sample of 500-1000 documents, coding each for relevance, privilege, and key document status. This seed set establishes the classification standard and trains the initial models.

**Predictive coding** - A classification model trained on the seed set scores all remaining documents for relevance probability. Documents are ranked by relevance score, and reviewers work from highest to lowest predicted relevance. As reviewers code more documents, the model is retrained and re-ranks the remaining pool.

**LLM analysis layer** - For documents flagged as potentially relevant, an LLM provides deeper analysis: summarization, issue tagging (which legal issues the document relates to), privilege assessment (does it contain attorney-client communications?), and key passage identification. This analysis pre-populates the review form, allowing reviewers to verify rather than create from scratch.

**Quality control** - A random 10% sample of reviewed documents is re-reviewed by senior attorneys. Agreement rate between initial review and QC review is tracked by reviewer and by document type. Reviewers with agreement rates below 90% receive additional training.

## Key Lessons

**Predictive coding's value was in prioritization, not elimination.** The firm's ethical obligations prevented them from simply not reviewing documents that the model scored as non-relevant. Instead, predictive coding allowed them to review likely-relevant documents first, finding key documents earlier in the review. The bottom 20% of the ranked pool (lowest relevance probability) was still reviewed but at a faster pace by junior reviewers.

**LLM privilege detection saved the most expensive rework.** Inadvertently producing a privileged document is one of the most costly errors in litigation. The LLM flagged potential privilege issues with 89% recall, catching documents that reviewers might miss during rapid review. Every privilege flag was verified by an attorney, but the automated flagging reduced privilege-related incidents by 70%.

**Issue tagging transformed case strategy.** With LLM-assigned issue tags across the full document set, attorneys could see the distribution of evidence across legal issues before completing review. This informed case strategy decisions (which claims to pursue, where evidence was strongest) months earlier than in traditional review.

**Model retraining cadence mattered.** Retraining the predictive coding model after every 1,000 reviewed documents (rather than after every 5,000) produced significantly better ranking, reducing the number of documents reviewers needed to examine before finding 95% of relevant documents.

## Results

Document review time decreased by 65% on average across cases. Key document identification shifted from the final weeks of review to the first weeks, improving case preparation timelines. Privilege incident rate dropped by 70%. Total review costs decreased by approximately 55%, making the firm more competitive on case budgets.
