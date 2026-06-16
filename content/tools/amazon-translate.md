---
title: "Amazon Translate - Neural Machine Translation"
description: "Using Amazon Translate for real-time and batch document translation in multilingual AI applications."
date: 2026-03-25
categories: [Tools]
tags: ["ai-ml", "beginner", "amazon-translate", "translation", "nlp", "aws", "multilingual", "aws-service"]
last_updated: 2026-05-30
---

Amazon Translate is a neural machine translation service that converts text between languages. It supports 75+ languages and language pairs, handles real-time translation via API, and processes large document batches asynchronously. For AI applications serving international users or processing multilingual content, it removes the need to integrate third-party translation vendors.

Official documentation: https://aws.amazon.com/translate/

**Azure equivalent:** Azure Translator (Cognitive Services). **GCP equivalent:** Google Cloud Translation API.

## Translation Modes

**Real-time translation** is synchronous: send text up to 10,000 bytes per request and receive the translation immediately. Latency is typically under 300ms for short strings. Use this for user-facing translation (chat, UI strings, search queries).

**Asynchronous batch translation** handles documents at scale. Submit a job pointing at an S3 prefix containing HTML, TXT, DOCX, XLSX, PPTX, or XLIFF files, and Translate processes the entire batch, preserving document structure and formatting. Results write back to S3. Use this for document libraries, knowledge base localization, or bulk content migration.

## Custom Terminology

Custom terminology lets you control how specific terms are translated. Upload a CSV or TMX file with source and target term pairs (product names, brand terms, technical vocabulary), and Translate uses your overrides regardless of what the neural model would produce. This is essential for brand consistency in enterprise deployments.

For example, a company called "Horizon" needs to ensure that word is never translated to a generic noun in German. Custom terminology enforces the brand name across all translations.

## Active Custom Translation

For domain-specific content where the base model underperforms (legal, medical, technical), Amazon Translate supports parallel data: provide example source/target sentence pairs and Translate creates a customized model. This improves accuracy for specialized vocabulary without the cost and complexity of training a model from scratch.

## Integration Patterns

**Multilingual document processing:** Textract extracts text from scanned PDFs, Translate converts the extracted text to a target language, and the translated content feeds into downstream classification or summarization.

**Real-time chat translation:** Lambda calls Translate on incoming messages before storing them, storing both original and translated versions. Users see content in their preferred language.

**Knowledge base localization:** Batch translate a Bedrock Knowledge Base's source documents into multiple languages, maintain language-specific S3 prefixes, and route queries to the appropriate language index.

## Pricing

Translate charges per character translated. The first 2 million characters per month are free under the AWS Free Tier. Real-time and batch translation have the same per-character rate. Custom terminology does not add per-character cost.

## Cross-Cloud Comparison

Azure Translator and GCP Cloud Translation offer comparable language coverage and neural quality. Azure differentiates with deep Office 365 integration. GCP's Translation API has a more developer-friendly SDK for web applications. Amazon Translate's advantage is native integration with S3, Lambda, and Step Functions in existing AWS pipelines.

## Related Articles

- [Amazon Comprehend]({{< relref "amazon-comprehend.md" >}}) - language detection and entity extraction
- [Amazon Textract]({{< relref "amazon-textract.md" >}}) - text extraction from documents before translation
- [Amazon Polly]({{< relref "amazon-polly.md" >}}) - speech output from translated text
