---
title: "Document Extraction"
description: "Definition of document extraction, the main techniques (OCR, NLP, template-based), AWS services used at each stage, and accuracy considerations."
date: 2026-03-24
categories: [Glossary]
tags: [glossary, OCR, NLP, automation]
tools: [amazon-textract, amazon-comprehend, amazon-bedrock]
last_updated: 2026-05-30
---

Document extraction is the process of identifying and pulling structured information from unstructured or semi-structured documents. The input is a document - a scanned form, a PDF, an image, or raw text. The output is structured data: field names with corresponding values, tables with row and column data, entities and relationships.

Document extraction is distinct from document storage (saving the file) and document retrieval (finding the file). It is specifically about converting document content into data that can be processed by downstream systems.

## Techniques

### OCR (Optical Character Recognition)

OCR converts images of text into machine-readable text. It is the first step for any paper or scanned document workflow. Modern OCR engines handle printed text, handwriting (with lower accuracy), tables, multi-column layouts, and rotated or skewed documents.

OCR is a necessary prerequisite for other extraction techniques on non-digital documents, but it is not extraction by itself. OCR gives you text characters. Extraction gives you structured data.

**Accuracy factors**: print quality, scan resolution, font type, language, page orientation. OCR accuracy on clean printed documents is typically 98-99%+. On handwritten forms, 80-90% is more realistic, and accuracy varies significantly by handwriting style.

### Template-Based Extraction

Template-based extraction uses a predefined map of a document - "field A is in this location, field B is in this location" - to extract values from known document types. High accuracy on documents that exactly match the template. Brittle when document layouts vary.

Amazon Textract's form extraction is a semi-template approach: it identifies key-value pairs based on visual proximity (label next to or above a value) rather than absolute coordinates, which makes it more robust than pure template extraction while still requiring recognizable form structure.

### NLP-Based Extraction

NLP extraction uses language understanding to identify entities and values from text. Rather than looking for a field in a specific location, it reads the text and identifies what it means: "The insured vehicle, a 2019 Honda Civic, sustained damage to the front bumper" - extraction identifies the vehicle year (2019), make (Honda), model (Civic), and damage location (front bumper).

NLP extraction handles variability that template approaches cannot. The same information expressed in different ways in different documents is still extracted correctly.

Amazon Comprehend provides named entity recognition for standard entity types. For domain-specific entities, Comprehend's custom NER or a Bedrock extraction prompt trained on domain examples will produce better results.

### LLM-Based Structured Extraction

Large language models, prompted with a target JSON schema and the document text, can extract complex structured data from freeform documents. This combines the flexibility of NLP extraction with the ability to handle multi-hop reasoning ("what is the net amount after the discount mentioned in paragraph 3?") and to follow complex schema requirements.

LLM-based extraction is most valuable for documents where the information structure is complex, context-dependent, or requires interpretation. It is less necessary for documents with clear form structure that Textract handles well.

## AWS Services at Each Stage

| Stage | Service | Best For |
|-------|---------|----------|
| OCR and text extraction | Amazon Textract | Scanned documents, forms, tables |
| Entity recognition | Amazon Comprehend | Standard entity types in clean text |
| Custom entity recognition | Comprehend Custom Entities | Domain-specific terms and entity types |
| Complex structured extraction | Amazon Bedrock | Freeform documents, complex schemas |
| Workflow orchestration | AWS Step Functions | Coordinating multi-stage pipelines |

## Accuracy Considerations

No extraction technique is 100% accurate. Designing for imperfect accuracy means:

- Returning confidence scores with extracted values, not just values
- Routing low-confidence extractions to human review rather than propagating errors downstream
- Validating extracted values against expected formats and ranges
- Monitoring extraction accuracy over time as document types evolve

The appropriate confidence threshold for routing to human review depends on the cost of an extraction error in your domain. For a financial figure on an insurance claim, a 95% confidence threshold with human review for anything below is appropriate. For a document classification that is easily correctable later, a lower threshold may be acceptable.

## Sources

- Smith, R. (2007). An overview of the Tesseract OCR engine. *ICDAR 2007*. (Tesseract; open-source OCR engine behind many document processing pipelines.)
- Xu, Y., et al. (2020). LayoutLM: Pre-training of text and layout for document image understanding. *KDD 2020*. (Layout-aware document understanding model; foundational for modern IDP systems.)
- Wei, H., et al. (2021). Robust layout-aware IE for visually rich documents with pre-trained language models. *ACL-IJCNLP 2021*. (Visual document understanding with pre-trained transformers.)
