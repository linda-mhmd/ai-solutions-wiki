---
title: "Case Pattern: AI Document Processing for a Financial Services Firm"
description: "Architecture and lessons from building a production document processing pipeline that extracts, validates, and routes financial documents across multiple formats and regulatory requirements."
date: 2026-03-28
categories: [Case Patterns]
tags: [document-processing, financial-services, extraction, compliance, pipeline]
image: /img/obsidian-lab/loom-red-thread-notext.png
image_alt: "A dark industrial loom with a red wire threading precisely through its constraints, representing structured data extraction from complex documents."
image_caption: "Every invoice, contract, and statement is a thread to pull. The loom processes them at scale."
last_updated: 2026-05-30
---

A mid-size financial services firm processed 15,000 documents per month across loan applications, account opening forms, compliance filings, and customer correspondence. Each document type had different extraction requirements, validation rules, and routing destinations. Manual processing took an average of 12 minutes per document and produced a 4% error rate that triggered regulatory findings.

## The Architecture

The pipeline processes documents through five stages: intake, classification, extraction, validation, and routing.

**Intake layer** - Documents arrive via email attachment, web upload, fax-to-digital conversion, and internal system exports. A normalization step converts all formats to searchable PDF using Amazon Textract for scanned documents. Each document receives a unique tracking ID and enters the processing queue.

**Classification layer** - A fine-tuned classification model identifies the document type from 23 categories (loan application, W-2, bank statement, proof of insurance, correspondence, etc.). Classification accuracy reached 96.5% after training on 12,000 labeled documents. Documents classified with confidence below 0.85 route to a human classifier. This captures approximately 8% of volume.

**Extraction layer** - Each document type has a dedicated extraction prompt tailored to its specific fields. A loan application extracts borrower information, income, property details, and loan terms. A bank statement extracts account holder, balances, and transaction summaries. Amazon Textract handles OCR and table extraction; an LLM normalizes the extracted data into the canonical schema.

**Validation layer** - Extracted data passes through three validation tiers: format validation (dates are valid dates, amounts are numeric), cross-field validation (income matches W-2 data, address matches utility bill), and business rule validation (loan-to-value ratio within policy limits, required documents present).

**Routing layer** - Validated documents route to their destination system: loan origination system, compliance filing system, or customer correspondence tracker. Failed validations route to exception queues organized by error type.

## Key Lessons

**Classification accuracy is the multiplier.** A misclassified document triggers the wrong extraction prompt, which produces garbage output, which fails validation, which creates manual work. Investing in classification accuracy had 5x the ROI of investing in extraction accuracy.

**Handwritten content remains the hardest problem.** Signatures, handwritten notes in margins, and hand-filled forms consistently produced the lowest extraction accuracy. The team implemented a separate processing path for handwritten content with lower confidence thresholds and mandatory human review.

**Validation caught what extraction missed.** The cross-field validation layer caught approximately 30% of extraction errors that passed individual field validation. A name extracted correctly from one document but inconsistently from a related document flagged a likely error.

**Regulatory requirements drove the human review design.** Financial regulators required human attestation for certain document types regardless of AI confidence. The system had to support configurable "always review" rules per document type and regulatory jurisdiction. Building this as a configuration rather than code allowed rapid adaptation to new regulatory guidance.

## Results

Processing time dropped from 12 minutes to 2.5 minutes per document (including human review time for flagged items). Error rate decreased from 4% to 0.8%. The team redeployed six FTEs from manual processing to exception handling and quality oversight, improving both throughput and job satisfaction.
