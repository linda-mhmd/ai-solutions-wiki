---
title: "Summarization Chain Patterns"
description: "Multi-step summarization strategies for long documents. Map-reduce, hierarchical, and iterative refinement approaches for reliable AI summarization."
date: 2026-03-28
categories: [Patterns]
tags: [summarization, chain, long-documents, NLP, content-processing]
last_updated: 2026-05-30
---

Summarizing a document that fits within a model's context window is straightforward. Summarizing a 200-page report, a day's worth of Slack messages, or a multi-hour meeting transcript requires a chain of summarization steps because the source material exceeds what a single model call can process.

## Map-Reduce Summarization

Split the document into chunks, summarize each chunk independently (map), then summarize the chunk summaries into a final summary (reduce).

**Map phase** - Split the document into chunks that fit within the model's context window. Summarize each chunk independently with consistent instructions (target length, focus areas, level of detail). Each chunk summary should be self-contained.

**Reduce phase** - Concatenate all chunk summaries and produce a final summary. If the combined chunk summaries still exceed the context window, apply the reduce step recursively until the output fits.

**Strengths** - Parallelizable (all map steps can run simultaneously), scales to any document length, and each step is independently debuggable.

**Weaknesses** - Chunk boundaries may split important context. Information that spans multiple chunks may be lost or inconsistently represented. The reduce step may lose nuance from individual chunk summaries.

## Hierarchical Summarization

Leverage document structure to create summaries at multiple levels of detail.

**Implementation** - Summarize each section independently. Then summarize groups of related sections. Then produce a document-level summary from the section group summaries. This preserves the document's organizational structure in the summary hierarchy.

**Multi-resolution output** - The hierarchical approach naturally produces summaries at different levels of detail: a one-paragraph executive summary, a one-page section summary, and detailed section-by-section summaries. Users can drill down from the overview to details as needed.

## Iterative Refinement

Start with a rough summary and progressively improve it by re-reading source material.

**Implementation** - Generate an initial summary from the first pass through the document. Then re-read the document in chunks, comparing each chunk against the current summary. Update the summary to incorporate important information that was missed or correct any inaccuracies. Repeat until the summary stabilizes.

**Strengths** - Produces higher quality summaries than single-pass approaches because it corrects its own omissions and errors. Handles cross-chunk information well because the refinement step considers the full summary context.

**Weaknesses** - Slower and more expensive than map-reduce because it requires multiple passes through the document. Not parallelizable.

## Quality Dimensions

**Faithfulness** - The summary should not contain information that is not in the source document. Hallucinated facts in summaries are the most dangerous failure mode. Validate by checking that every claim in the summary has a corresponding passage in the source.

**Coverage** - The summary should include all important information from the source. Missing critical points is a subtler failure than hallucination but equally problematic. Evaluate coverage by checking that a reader of the summary would not be surprised by anything in the full document.

**Conciseness** - The summary should not be longer than necessary. Redundant statements, filler phrases, and unnecessary qualifications dilute the summary's value. Set target length constraints and evaluate whether the output meets them without sacrificing coverage.

## Production Considerations

**Prompt consistency** - Use the same summarization prompt template across all steps to ensure consistent level of detail and focus. Varying instructions between steps produces inconsistent summaries.

**Source attribution** - For professional and legal use cases, include references to the source sections that each summary point is derived from. This enables verification without reading the full document.

**Incremental updates** - When the source document is updated, avoid re-summarizing the entire document. Identify changed sections, re-summarize those sections, and update the affected parts of the summary hierarchy.
