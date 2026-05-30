---
title: "RAG with Images, Tables, and Mixed Document Types"
description: "How to build RAG systems that handle documents containing images, tables, charts, and mixed content alongside text."
date: 2026-03-28
categories: [Guides]
tags: [RAG, multimodal, document-processing, tables, images]
related:
  - guides/building-rag-systems
  - guides/rag-evaluation-guide
  - glossary/rag
  - guides/knowledge-graph-guide
last_updated: 2026-05-30
---

Most RAG tutorials assume clean text documents. Real enterprise documents contain tables, charts, diagrams, images with embedded text, multi-column layouts, and mixed content types. A RAG system that ignores these elements misses critical information. Multimodal RAG extends standard text-based RAG to handle the full richness of real documents.

## The Challenge

Traditional RAG pipelines extract text, embed it, and retrieve it. This breaks down when:

- A financial report's key data is in tables, not prose
- A technical manual's most important information is in diagrams
- A research paper's results are in charts and figures
- A contract's structure (headers, sections, clauses) carries legal meaning
- A slide deck combines text, images, and layout to convey meaning

Simply extracting visible text from these documents loses information that may be essential for answering user queries.

## Document Processing Strategies

**Table extraction.** Tables require specialized extraction because their meaning depends on row/column structure, not just text content. Approaches include:

- Rule-based extraction using document structure (HTML tables, PDF table detection)
- Vision models that detect and parse table structure from document images
- Services like Amazon Textract that provide structured table extraction

Once extracted, represent tables as structured data (markdown tables, JSON, or CSV) rather than flattening to plain text. Include table captions and surrounding context.

**Image and figure handling.** For images that contain meaningful content (charts, diagrams, screenshots):

- Generate text descriptions using vision-language models. These descriptions become searchable text chunks alongside the original image.
- Store the original image as metadata so it can be included in the generation context if using a multimodal LLM.
- Extract text from images using OCR for images containing embedded text.

**Chart and graph interpretation.** Charts encode data visually. Extract both the underlying data (if available) and a natural language summary of what the chart shows. Vision-language models can describe chart trends and key data points.

**Layout-aware parsing.** Multi-column layouts, sidebars, callout boxes, and footnotes need layout-aware parsing to maintain correct reading order and association. PDF parsing libraries that understand document layout (like those built on document AI models) produce significantly better extraction than simple text extraction.

## Embedding Strategies for Multimodal Content

**Text embeddings for descriptions.** Generate textual descriptions of non-text elements and embed those descriptions alongside regular text chunks. This allows standard text embedding models and retrieval infrastructure to handle multimodal content.

**Multimodal embeddings.** Models like CLIP embed both text and images into the same vector space. This enables direct similarity search between text queries and image content without requiring text descriptions. The trade-off is that current multimodal embeddings are less precise than text-only embeddings for text retrieval.

**Hybrid approach.** Use text embeddings for text content and text descriptions of non-text elements, while also storing original images and structured data for inclusion in generation context. This is the most practical approach for most systems today.

## Chunking Multimodal Documents

Standard chunking strategies need adaptation for mixed content:

- Keep tables as atomic chunks rather than splitting them mid-row
- Associate figures with their captions and surrounding paragraphs
- Maintain section hierarchy so chunks can be linked to their parent sections
- Include metadata indicating the content type (text, table, figure) and source location

## Generation with Multimodal Context

If using a multimodal LLM (models that accept both text and images), include relevant images directly in the generation prompt alongside text context. This allows the model to reason about visual content natively rather than relying solely on text descriptions.

If using a text-only LLM, provide text descriptions of visual elements, structured representations of tables, and clear labeling of content types so the model can reference them appropriately.

## Evaluation Considerations

Multimodal RAG evaluation must cover scenarios where the answer is in a table, a figure, or a combination of text and visual elements. Extend your evaluation dataset to include these query types and verify that both retrieval and generation handle non-text content correctly. Pay special attention to table queries (can the system retrieve and reason about specific cells?) and figure queries (can the system describe chart trends accurately?).
