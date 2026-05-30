---
title: "Tiered Analysis Pattern - Progressive Depth for AI Processing"
description: "Apply cheap analysis first, score results, then apply expensive analysis only to candidates that pass a threshold. Reduces AI API costs by 80-90% in practice."
date: 2026-03-26
categories: [Patterns]
tags: ["architecture", "intermediate", "tiered-analysis", "cost-efficiency", "routing", "llm", "pipeline"]
related:
  - guides/sorting-algorithms-for-ai
  - glossary/time-complexity
  - glossary/hardware-constraints
  - glossary/api
last_updated: 2026-05-30
---

The tiered analysis pattern addresses a fundamental cost problem in AI pipelines: expensive AI operations (large language model calls, detailed vision analysis) are orders of magnitude more costly than cheap operations (basic classification, label detection). Applying maximum-depth analysis to every input is almost never necessary - and often prohibitively expensive.

The pattern: apply cheap analysis first, score results, then apply expensive analysis only to candidates that pass a threshold.

## The Problem

Consider processing a three-hour video to find the best five-second clips. At 30 fps, this is 324,000 frames. Sending every frame to Bedrock for rich content analysis would cost hundreds of dollars per video and take hours. The overwhelming majority of frames would be filtered out anyway - because they are blank, low-motion, or contain no people.

The naive approach wastes compute on inputs that will never make the final cut.

## The Pattern Structure

**Tier 1 - Broad, cheap classification**: Apply low-cost analysis to everything. The goal is not precision but elimination. Anything clearly irrelevant is discarded here. The output is a reduced candidate set with preliminary scores.

**Threshold gate**: Apply a minimum score threshold. Only candidates that exceed the threshold proceed to the next tier. This is the critical step - it converts O(n) expensive processing into O(k) where k is much smaller than n.

**Tier 2 - Moderate depth on candidates**: Apply medium-cost analysis to the surviving set. This pass can afford more detail because the input set is much smaller.

**Tier 3 (optional) - Deep analysis on finalists**: Apply the most expensive, highest-quality analysis only to the top candidates. At this tier, the input set is small enough that cost is not a concern.

## Linda Mohamed's Video Pipeline

Linda Mohamed's AI video pipeline for compilation generation uses a three-tier structure:

**Tier 1 - Rekognition label detection**: Every scene segment receives Rekognition label detection. This identifies what is in the frame at a high level: people, objects, outdoor/indoor setting, activity type. This call is fast and cheap. Scenes without people or with very low activity scores are immediately excluded from further processing.

**Tier 2 - Emotion and face detection**: Scenes that pass the Tier 1 threshold receive face detection and emotion analysis from Rekognition. This is more expensive than label detection but provides the signals most predictive of clip quality: is there a recognizable face? What emotion is being expressed? Face detection confidence becomes a primary scoring signal.

**Tier 3 - Bedrock content scoring**: Only high-scoring clips from Tier 2 receive Bedrock analysis. The language model evaluates clip quality holistically: narrative context, pacing, whether the moment is a highlight or a transitional frame. Bedrock also makes chaptering decisions, determining which clips belong together thematically.

The result: Bedrock is called for perhaps 5-10% of all scenes, compared to 100% in a naive implementation. This reduces Bedrock API costs by 80-90% on a typical video.

## Why This Is a Search Optimization

The tiered analysis pattern is algorithmically equivalent to pruning a search tree. Rather than evaluating every node at full depth, you prune branches early when preliminary evidence suggests they will not be in the optimal solution set.

This connects directly to algorithm design: expensive computation should be deferred until there is evidence it is necessary. The pattern converts O(n) expensive calls to O(k) where k is determined by the quality of cheap pre-filtering.

A poor Tier 1 filter (one that passes too many candidates) wastes money on Tier 2 and 3. A too-strict Tier 1 filter (one that eliminates good candidates) reduces output quality. Calibrating the threshold is empirical: measure false negative rate (good clips rejected at Tier 1) and adjust.

## Beyond Video: Applications of the Pattern

**Document processing pipelines**: OCR every page (Tier 1), apply keyword and structure detection to potentially relevant pages (Tier 2), extract detailed structured data only from confirmed-relevant pages using an LLM (Tier 3). A legal discovery pipeline scanning thousands of documents applies maximum-depth extraction to a small fraction of the total.

**Customer support triage**: Classify incoming tickets with a fast model (Tier 1), apply sentiment and urgency analysis to non-routine tickets (Tier 2), route complex escalations to deep reasoning analysis (Tier 3). Simple tickets never reach expensive processing.

**Data quality pipelines**: Run statistical outlier detection on all records (Tier 1), apply rule-based validation to flagged records (Tier 2), use an LLM to evaluate ambiguous cases (Tier 3). The LLM sees only the genuinely ambiguous inputs.

**Medical image screening**: Run a fast binary classifier on all scans (Tier 1, is there anything suspicious?), apply detailed segmentation to positive screens (Tier 2), route uncertain cases to deeper analysis (Tier 3).

## Implementation Notes

The pattern requires:
1. A scoring signal at each tier that is predictive of final quality
2. A threshold calibration process (usually empirical, run on a labeled sample)
3. Logging at each tier to measure pass-through rates and false negative rates
4. Monitoring: if Tier 1 pass-through rates change significantly, upstream data may have changed

```python
def tiered_analysis(candidates):
    # Tier 1: cheap, applies to everything
    tier1_scores = [cheap_classify(c) for c in candidates]
    tier1_passed = [c for c, s in zip(candidates, tier1_scores)
                    if s >= TIER1_THRESHOLD]

    # Tier 2: medium cost, applies to tier1_passed only
    tier2_scores = [medium_analyze(c) for c in tier1_passed]
    tier2_passed = [c for c, s in zip(tier1_passed, tier2_scores)
                    if s >= TIER2_THRESHOLD]

    # Tier 3: expensive, applies to finalists only
    final_scores = [expensive_reason(c) for c in tier2_passed]
    return sorted(zip(tier2_passed, final_scores),
                  key=lambda x: x[1], reverse=True)[:TOP_K]
```

The pattern scales: if the candidate set grows from 10,000 to 100,000, the expensive Tier 3 calls grow by much less than 10x because the threshold gates maintain roughly constant pass-through rates.

## Sources

- Video pipeline tiered analysis methodology: Linda Mohamed's multi-signal video analysis pipeline for AI-generated content.
