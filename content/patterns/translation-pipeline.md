---
title: "Translation Pipeline Patterns"
description: "Building production translation pipelines with AI. Terminology management, quality assurance, and multi-language orchestration patterns."
date: 2026-03-28
categories: [Patterns]
tags: [translation, localization, multilingual, pipeline, NLP]
last_updated: 2026-05-30
---

AI translation has reached the point where it produces usable first drafts for most language pairs and content types. But a production translation pipeline requires more than a single model call - it needs terminology consistency, format preservation, quality assurance, and efficient orchestration across multiple target languages.

## Pipeline Architecture

A production translation pipeline has four stages: pre-processing, translation, post-processing, and quality assurance.

**Pre-processing** - Extract translatable text from the source format while preserving structure markers. HTML tags, markdown formatting, code blocks, placeholders, and variables must be identified and protected from translation. Segment the text into translation units (typically sentences) for consistent handling.

**Translation** - Translate each segment with context. Provide the model with the glossary, style guide, and surrounding segments for contextual accuracy. For LLM-based translation, include 3-5 examples of correctly translated segments in the prompt to establish quality expectations.

**Post-processing** - Restore formatting, reinsert protected elements, and validate that the output structure matches the input structure. Check that variables and placeholders were preserved. Verify that the output language is correct (mixed-language output is a common failure mode).

**Quality assurance** - Automated checks for completeness (no missing segments), consistency (same term translated the same way throughout), and fluency (no grammatical errors or unnatural phrasing). Flag segments that fail any check for human review.

## Terminology Management

Consistent terminology is the difference between professional and amateur translation.

**Glossary implementation** - Maintain a bilingual glossary of domain-specific terms with approved translations. Inject the glossary into each translation prompt. For critical terms, validate that the glossary term appears in the output and flag any deviations.

**Do-not-translate lists** - Product names, brand terms, technical identifiers, and acronyms that should remain in the source language. Include these in the prompt as explicit exceptions.

**Term extraction** - When translating a new domain, use an LLM to extract domain-specific terms from the source material before translation begins. Review and approve term translations with subject matter experts before starting bulk translation.

## Multi-Language Orchestration

Translating into multiple languages simultaneously requires efficient orchestration.

**Parallel translation** - Translate into all target languages in parallel from the source language. This is faster than sequential translation and avoids compounding errors from pivot-language approaches.

**Pivot language avoidance** - Translating from Japanese to Finnish via English (Japanese -> English -> Finnish) compounds errors from both translation steps. Always translate directly from the source language when possible, even if the model performs better on English-to-target translation.

**Language-specific configuration** - Different target languages have different quality characteristics. CJK languages need different segmentation than European languages. Right-to-left languages need format validation. Maintain per-language configuration for pre-processing, model parameters, and quality thresholds.

## Quality Metrics

**BLEU/COMET scores** - Automated translation quality metrics that compare machine translation against reference translations. Useful for regression testing when updating models or prompts. Not useful for absolute quality measurement without human evaluation context.

**Post-edit distance** - The percentage of words changed by human reviewers. The most practical quality metric because it directly measures the amount of human effort required. Target under 15% post-edit rate for professional-quality output.

**Terminology consistency** - The percentage of glossary terms that are translated consistently throughout the document. Target 100% for key terms, with automated enforcement during post-processing.
