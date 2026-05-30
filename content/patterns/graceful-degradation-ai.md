---
title: "Graceful Degradation Patterns for AI Systems"
description: "Maintaining service quality when AI components fail or degrade. Fallback strategies, feature flags, cached responses, and partial functionality patterns."
date: 2026-03-28
categories: [Patterns]
tags: [graceful-degradation, reliability, fallback, resilience, architecture]
last_updated: 2026-05-30
---

AI components fail. Model APIs go down, rate limits are exceeded, latency spikes occur, and output quality degrades. A well-designed system maintains useful functionality even when its AI components are impaired. Graceful degradation is not optional for production AI systems.

## Fallback Hierarchy

Define multiple levels of functionality, from full AI-powered experience to basic non-AI operation.

**Level 1: Full AI** - The system operates normally with the primary model providing full functionality. All features enabled, highest quality output.

**Level 2: Alternative model** - The primary model is unavailable or too slow. Switch to a backup model (smaller, different provider) that provides acceptable quality at possibly lower capability. A Haiku-class model replacing a Sonnet-class model is a common Level 2 fallback.

**Level 3: Cached responses** - No model is available. Serve cached responses for previously seen or similar queries. For RAG systems, return retrieved documents without AI-generated synthesis. For classification systems, use the most recent cached classification for known input types.

**Level 4: Rule-based fallback** - No model and no relevant cache. Fall back to rule-based logic that provides basic functionality: keyword matching for search, template responses for customer service, default categorization for document processing.

**Level 5: Manual routing** - All automated processing is unavailable. Route inputs to human operators with clear context about why automated processing failed. This is the last resort but ensures no input is lost.

## Feature Flags for AI

Use feature flags to control which AI features are active, enabling rapid response to quality or availability issues.

**Per-feature flags** - Each AI-powered feature should have an independent feature flag. If the summarization feature degrades but classification is fine, disable summarization without affecting classification.

**Percentage rollout** - Feature flags should support percentage-based activation (serve AI responses to 50% of users, fall back for the rest). This enables gradual recovery when re-enabling a feature after an outage.

**Automatic triggers** - Connect feature flags to monitoring thresholds. If error rate exceeds 5%, automatically reduce AI traffic to 50%. If error rate exceeds 20%, disable the AI feature entirely. If the error rate recovers, gradually re-enable.

## Cached Response Strategies

Cached responses provide immediate, zero-latency answers when the model is unavailable.

**Pre-computed responses** - For known common queries, pre-generate and cache responses during normal operation. These serve as a fallback library during outages. Refresh cached responses periodically to keep them current.

**Stale-while-revalidate** - Serve cached responses immediately while attempting to generate a fresh response in the background. If the background request succeeds, update the cache. If it fails, the user still got a response (even if slightly stale).

**Transparency** - When serving cached or degraded responses, inform the user. "This response was generated from cached data and may not reflect the latest information" is better than silently serving stale content.

## Partial Functionality

When some AI components work and others do not, provide partial results rather than failing entirely.

**Independent components** - Design AI features as independent components that can fail independently. A document processing pipeline with extraction, classification, and summarization steps should return partial results if summarization fails rather than failing the entire pipeline.

**Progressive enhancement** - Build the core functionality without AI, then layer AI capabilities on top. If AI search ranking fails, fall back to basic text search. If AI-generated descriptions fail, show the raw data. Users get a degraded but functional experience.

**Timeout management** - Set aggressive timeouts on AI calls. A 30-second timeout that falls back to a cached response provides a better user experience than waiting 2 minutes for a potentially failing request. Tune timeouts based on P99 latency during normal operation.
