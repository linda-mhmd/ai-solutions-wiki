---
title: "Azure AI Document Intelligence - Intelligent Document Processing"
description: "Azure AI Document Intelligence (formerly Form Recognizer) extracts text, key-value pairs, tables, and structured data from documents using pre-built and custom AI models."
date: 2026-03-28
categories: [Tools]
tags: [azure, document-processing, ocr, extraction, ai-services]
related:
  - tools/amazon-textract
  - tools/azure-cognitive-services
last_updated: 2026-05-30
---

Azure AI Document Intelligence, formerly known as Azure Form Recognizer, is a cloud-based AI service that extracts text, key-value pairs, tables, and structured data from documents using machine learning models. It processes PDFs, images, Office documents, and HTML files, returning structured JSON output that downstream applications can consume directly. For AI pipelines that ingest unstructured documents -- invoices, receipts, contracts, medical records, insurance forms, or identification documents -- Document Intelligence automates the data extraction step that traditionally required manual data entry or brittle rule-based parsing.

The service offers three categories of models. Pre-built models handle common document types out of the box: invoices, receipts, identity documents, tax forms (W-2, 1098, 1099), health insurance cards, and bank statements. These models extract specific fields (vendor name, total amount, line items, dates) without any training. The general document model extracts key-value pairs and entities from any document type. The layout model extracts text, tables, selection marks, and document structure (headings, paragraphs, sections) while preserving reading order. Custom models can be trained on domain-specific document types using a small set of labeled examples (as few as five documents), enabling extraction of fields unique to an organization's forms and documents.

Document Intelligence v4.0, the latest major release, added support for generative AI extraction using large language models, enabling the service to extract fields from documents with highly variable layouts where traditional extraction models struggle. The service integrates directly with Azure Blob Storage for input documents, Azure AI Search for indexing extracted content, and Azure Logic Apps or Functions for building end-to-end document processing pipelines. Batch processing support enables high-throughput document ingestion for enterprise digitization projects.

Official documentation: https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/

## Key Capabilities

- **Pre-Built Models** - Production-ready extraction for invoices, receipts, IDs, tax forms, health insurance cards, and bank statements with no training required
- **Custom Models** - Train document extraction models on domain-specific forms with as few as five labeled examples using the Document Intelligence Studio
- **Layout Analysis** - Extracts text, tables, selection marks, barcodes, and document structure with reading order from complex multi-page documents
- **Add-On Features** - Query fields, high-resolution extraction, font styling, barcode extraction, and formula recognition extend the base models

## AWS Equivalent

Azure AI Document Intelligence is Azure's counterpart to Amazon Textract. Both extract text and structured data from documents, but Document Intelligence offers a broader set of pre-built models for specific document types (tax forms, health insurance cards, bank statements), while Textract focuses on general-purpose text, table, and form extraction with a simpler API surface. Document Intelligence's custom model training requires significantly fewer labeled samples than Textract's custom queries.

## Origins and History

The service launched as Azure Form Recognizer in general availability in July 2020. The v2.1 release in May 2021 added pre-built ID document and invoice models. A major update to v3.0 in August 2022 introduced the general document model, read model, and a unified API structure. The service was rebranded to Azure AI Document Intelligence in August 2023 as part of the broader Azure AI Services naming consolidation. Version 4.0, introducing generative AI-powered extraction and expanded pre-built model coverage, was released in late 2024.

## Sources

1. Microsoft Learn. "What is Azure AI Document Intelligence?" https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview
2. Microsoft Azure Blog. "Azure Form Recognizer is now generally available." July 2020. https://azure.microsoft.com/en-us/blog/azure-form-recognizer-is-now-generally-available/
