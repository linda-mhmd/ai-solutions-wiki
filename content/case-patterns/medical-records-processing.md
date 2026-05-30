---
title: "Case Pattern: AI Medical Records Processing for a Healthcare Network"
description: "Architecture and lessons from building an AI system that extracts, normalizes, and routes clinical information from unstructured medical records."
date: 2026-03-28
categories: [Case Patterns]
tags: [medical-records, healthcare, extraction, HIPAA, document-processing]
image: /img/obsidian-lab/filing-cabinet-amber-notext.png
image_alt: "A long dark bank of filing cabinets with one drawer open, glowing amber, representing a selected record retrieved from a large archive."
image_caption: "Fifty thousand requests per month. Each one a record that must be found, read, and summarised."
last_updated: 2026-05-30
---

A healthcare network with 12 hospitals and 200 clinics processed 50,000 medical record requests per month for care coordination, insurance authorization, and legal compliance. Each request required a human reviewer to read records (often hundreds of pages), extract relevant clinical information, and prepare summaries. Average processing time was 45 minutes per request, with a team of 80 reviewers working full-time.

## The Architecture

The system processes medical records through extraction, normalization, and summarization stages with strict privacy controls.

**Security layer** - All data processing occurs within a HIPAA-compliant environment with encryption at rest and in transit, access logging, and role-based access controls. The AI model runs in a private VPC with no data leaving the controlled environment. Every access to patient data is logged with the requesting user, purpose, and timestamp.

**Document ingestion** - Medical records arrive as multi-page PDFs combining typed clinical notes, handwritten annotations, lab results, imaging reports, and scanned forms. The ingestion layer splits records into page types using a document classifier: clinical note, lab result, radiology report, operative note, medication list, and administrative form.

**Clinical extraction** - Each page type has a specialized extraction pipeline. Clinical notes are processed to extract diagnoses (mapped to ICD-10 codes), procedures (mapped to CPT codes), medications, allergies, and vital signs. Lab results are parsed into structured result tables with normal range comparison. The LLM handles the variability in clinical language - "the patient's sugar was through the roof" maps to hyperglycemia.

**Summarization** - Based on the request type (care coordination, insurance authorization, legal), the system generates a targeted summary. A care coordination summary emphasizes current conditions, medications, and treatment plan. An insurance authorization summary emphasizes medical necessity and supporting clinical evidence. Each summary includes references to the source page numbers.

## Key Lessons

**Medical terminology handling was the critical capability.** Clinical notes use abbreviations (SOB for shortness of breath, not the expletive), shorthand, and facility-specific jargon. Building a medical terminology layer that handled these variations was essential for accurate extraction. The team compiled a 5,000-term medical abbreviation dictionary as system context.

**Human review was non-negotiable for clinical decisions.** Despite achieving 93% extraction accuracy, every summary used for clinical decision-making required human review. Regulatory requirements and patient safety concerns meant full automation was never the goal - reducing the 45-minute review to a 10-minute verification was the realistic target.

**Handwritten content required special handling.** Physician handwriting is notoriously difficult to read, even for humans. The system routed handwritten pages to a dedicated OCR pipeline with medical vocabulary augmentation. Pages with low OCR confidence were flagged for human transcription rather than attempting extraction on unreliable text.

**Privacy incidents drove architecture decisions.** During testing, the team discovered that the LLM occasionally included patient information from one record in the summary of another record when processing was batched. This led to strict single-patient isolation: each patient's records are processed in an independent context with no shared state.

## Results

Average processing time per request decreased from 45 minutes to 12 minutes (including mandatory human review). The reviewer team was reduced from 80 to 35, with the remaining reviewers handling verification and complex cases. Accuracy of coded diagnoses and procedures improved from 88% (manual) to 94% (AI-assisted with human verification). Request backlog was eliminated within two months of deployment.
