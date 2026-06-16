---
title: "Amazon Textract - Document Data Extraction"
description: "A reference guide to Amazon Textract: OCR capabilities, table and form extraction, query-based extraction, and integration patterns for document processing pipelines."
date: 2026-03-24
categories: [Tools]
tags: ["ai-ml", "intermediate", "amazon-textract", "document-extraction", "ocr", "aws", "structured-data", "aws-service"]
tools: [amazon-textract]
related:
  - tools/azure-form-recognizer
  - tools/google-document-ai
  - tools/tesseract-ocr
alternatives:
  open_source:
    - tools/tesseract-ocr
  azure: tools/azure-form-recognizer
  gcp: tools/google-document-ai
solutions:
  - solutions/finance/document-processing
  - solutions/finance/customer-onboarding
  - solutions/finance/regulatory-reporting
last_updated: 2026-05-30
---

Amazon Textract is AWS's managed OCR and document analysis service. Unlike basic OCR tools that return raw text, Textract understands document structure: it identifies tables, forms, key-value pairs, and reading order. This structural understanding is what makes it useful for downstream processing, where you need extracted text that makes sense, not just a stream of characters.

## Core Capabilities

**Text detection** - Identifies and returns all text in a document, organized by page, block, line, and word. For digital PDFs, accuracy is effectively 100% (Textract is reading the text layer, not interpreting pixels). For scanned documents, accuracy depends on scan quality - 300 DPI produces reliable results; lower resolution degrades accuracy.

**Table extraction** - Identifies tabular data and returns it with row and column structure preserved. This is the capability most impactful for financial documents: invoice line items, balance sheets, and data tables arrive as structured JSON rather than undifferentiated text. Merged cells are handled, though complex multi-level headers sometimes require post-processing.

**Form extraction** - Identifies form fields (key-value pairs) in structured forms. A field labeled "Invoice Date:" followed by "15 March 2026" is returned as a key-value pair. This works well for standard business forms, government documents, and any document that follows a consistent layout with labeled fields.

**Query-based extraction** - The most flexible extraction mode. You provide questions in natural language ("What is the total amount due?", "What is the supplier's VAT number?") and Textract returns the answer extracted from the document along with a confidence score and location. This is useful for documents where the field label may vary across document versions or vendors.

**Signature detection** - Identifies the presence of handwritten signatures, useful for document validation workflows.

## Sync vs Async API

Textract offers two API modes:

**Synchronous** (`DetectDocumentText`, `AnalyzeDocument`) - Returns results immediately. Supports single-page documents and images only. Suitable for real-time processing requirements like web form document uploads.

**Asynchronous** (`StartDocumentTextDetection`, `StartDocumentAnalysis`) - Processes multi-page documents. You start a job, Textract sends a completion notification to SNS, and you retrieve results from the API. Suitable for pipeline batch processing. Required for PDFs with more than one page.

For production pipelines processing mixed document types, the asynchronous API is almost always the right choice, even for single-page documents, because it handles edge cases (unusually large files, complex layouts) without timeout issues.

## Integration Patterns

**Lambda trigger from S3** - Documents land in S3, an S3 event triggers a Lambda function that starts the Textract job. A second Lambda processes the completion SNS notification and retrieves results. This is the standard pattern for document ingestion pipelines.

**Step Functions orchestration** - For multi-stage document processing (Textract, then Bedrock for LLM-based extraction, then validation, then database write), Step Functions manages the workflow state. The `.waitForTaskToken` pattern pauses the workflow until the async Textract job completes.

**Combined with Bedrock** - Textract handles structured extraction from known document formats; Bedrock (Claude) handles freeform or complex documents where the structure is not predictable. Run Textract first (cheaper, faster) and only invoke Bedrock for documents where Textract output quality is insufficient.

## Accuracy and Limitations

Textract performs well on documents with clear structure and good scan quality. Limitations to plan for:

- Handwritten text is extracted with lower accuracy than printed text
- Complex multi-column layouts sometimes produce out-of-reading-order text blocks
- Very small text (under 8pt in the original document) reduces accuracy
- Documents with heavy watermarks or dark backgrounds degrade performance

For any production pipeline, validate Textract output against a sample of real documents before committing to an architecture. The query-based extraction API in particular should be tested with representative examples, as question phrasing affects result quality.
