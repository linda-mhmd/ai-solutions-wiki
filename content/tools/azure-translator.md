---
title: "Azure Translator - Neural Machine Translation"
description: "Azure Translator is a cloud-based neural machine translation service that translates text and documents across more than 100 languages in real time."
date: 2026-03-28
categories: [Tools]
tags: [azure, translation, nlp, language, ai-services]
related:
  - tools/amazon-translate
  - tools/azure-cognitive-services
last_updated: 2026-05-30
---

Azure Translator is a neural machine translation service within Azure AI Services that provides real-time text translation, document translation, and custom model training across more than 100 languages and dialects. The service uses deep neural network models trained on Microsoft's extensive multilingual datasets, delivering translation quality that approaches human fluency for many language pairs. In AI solution architectures, Translator enables multilingual content processing pipelines, cross-language search and retrieval, real-time communication translation, and localization workflows that make AI-powered applications accessible to global audiences.

The Text Translation API translates plain text and HTML content with automatic source language detection. It supports transliteration (converting text between scripts, such as Japanese Romaji to Kanji), dictionary lookup for alternative translations, and sentence length detection for formatting purposes. The Document Translation API processes entire documents (PDF, DOCX, PPTX, XLSX, HTML, and other formats) while preserving the original formatting, layout, and structure -- critical for enterprise document workflows where translated outputs must match the source document appearance. Batch document translation can process thousands of documents asynchronously against Azure Blob Storage.

Custom Translator enables training of domain-specific translation models using parallel corpora (aligned source and target language sentence pairs). By training on terminology and phrasing specific to an industry or organization, custom models significantly improve translation accuracy for specialized content such as legal contracts, medical literature, technical documentation, or product descriptions. The training process requires as few as 10,000 parallel sentences and produces a custom model that is deployed to a dedicated category ID within the standard Translator API, requiring no infrastructure management. The service also supports a dynamic dictionary feature for enforcing specific term translations at inference time without model retraining.

Official documentation: https://learn.microsoft.com/en-us/azure/ai-services/translator/

## Key Capabilities

- **100+ Languages** - Neural machine translation across more than 100 languages with automatic language detection and transliteration support
- **Document Translation** - Preserves original formatting and layout while translating entire PDF, DOCX, PPTX, and other document formats in batch
- **Custom Translator** - Train domain-specific translation models on parallel corpora to improve accuracy for specialized terminology and industry jargon
- **Dynamic Dictionary** - Override translations for specific terms at inference time using markup, ensuring critical terminology is translated consistently

## AWS Equivalent

Azure Translator is Azure's counterpart to Amazon Translate. Both provide neural machine translation with custom terminology support and batch translation capabilities. Azure Translator's document translation with format preservation and its Custom Translator training capability for full model customization differentiate it, while Amazon Translate offers Active Custom Translation for on-the-fly adaptation and tighter integration with other AWS language services.

## Origins and History

Microsoft's machine translation efforts date to Microsoft Research work beginning in the early 2000s. The Microsoft Translator API was first offered as a cloud service in 2011, initially using statistical machine translation. Neural machine translation models replaced statistical models in November 2016, dramatically improving translation quality. The service was incorporated into Azure Cognitive Services and later Azure AI Services. Custom Translator reached general availability in 2019. Document Translation with format preservation launched in GA in May 2021. The language count has progressively expanded from 60 languages at the neural MT launch to over 100 languages by 2024.

## Sources

1. Microsoft Learn. "What is Azure AI Translator?" https://learn.microsoft.com/en-us/azure/ai-services/translator/translator-overview
2. Microsoft Research Blog. "Microsoft Translator launching Neural Network based translations." November 2016. https://www.microsoft.com/en-us/research/blog/microsoft-translator-launching-neural-network-based-translations/
