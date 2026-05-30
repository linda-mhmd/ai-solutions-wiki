---
title: "Fan-Out/Fan-In Pattern for AI Workloads"
description: "Parallel processing pattern for AI tasks: split work across multiple model calls, process concurrently, and aggregate results for faster throughput and better quality."
date: 2026-03-28
categories: [Patterns]
tags: [parallelism, fan-out, fan-in, orchestration, throughput, ai-engineering]
related:
  - patterns/orchestrator-worker
  - patterns/batch-inference
  - patterns/model-ensemble
  - patterns/summarization-chain
  - patterns/cost-optimization
last_updated: 2026-05-30
---

Sequential LLM calls are slow. When a task can be decomposed into independent subtasks, running them in parallel dramatically reduces end-to-end latency. The fan-out/fan-in pattern splits a workload into parallel branches (fan-out), processes each branch concurrently, and combines the results (fan-in).

## How It Works

**Fan-out** - A coordinator decomposes the input into independent chunks and dispatches each chunk to a separate model call. The decomposition can be static (split a document into pages) or dynamic (an LLM decides how to partition the work).

**Parallel processing** - Each chunk is processed concurrently. This may involve the same model and prompt applied to different data, or different models and prompts applied to the same data for diverse perspectives.

**Fan-in** - Results from all branches are collected and aggregated. Aggregation ranges from simple concatenation to a dedicated synthesis step where another LLM call combines partial results into a coherent final output.

## Common Applications

**Long document analysis** - A 200-page contract cannot fit in a single context window. Split it into sections, analyze each in parallel, then synthesize findings. What takes 10 sequential calls at 5 seconds each completes in 5 seconds with parallel execution.

**Multi-perspective evaluation** - Send the same input to multiple models or multiple prompts. One prompt checks for factual accuracy, another for tone, a third for completeness. Fan-in combines these evaluations into a comprehensive assessment.

**Bulk classification** - Classify thousands of support tickets by fanning out across concurrent model calls rather than processing them one at a time.

**Map-reduce summarization** - Summarize each section of a long document independently (map), then summarize the summaries (reduce). This handles documents of arbitrary length.

## Implementation Considerations

**Concurrency limits** - API rate limits constrain how wide you can fan out. Implement a semaphore or token bucket to stay within provider limits. Hitting rate limits defeats the purpose of parallelization.

**Partial failure handling** - When one branch fails, decide whether to retry that branch, return partial results, or fail the entire operation. For most use cases, retrying the failed branch while preserving successful results is the right choice.

**Result ordering** - Parallel execution means results arrive in arbitrary order. If the final output depends on the original ordering of chunks, tag each chunk with its position and sort during fan-in.

**Cost awareness** - Fan-out multiplies the number of API calls. Ensure that the latency benefit justifies the cost increase. For batch workloads that are not latency-sensitive, sequential processing may be cheaper if it avoids hitting higher rate-limit tiers.

## When to Use

Use fan-out/fan-in when the input is naturally decomposable, the subtasks are independent, and latency matters. Avoid it when subtasks have dependencies on each other's outputs, as this forces sequential execution regardless of the pattern you choose.
