---
title: "Plan-and-Execute Pattern - Separating Planning from Execution in AI Agents"
description: "A two-phase agent pattern where a capable planner model creates a step-by-step plan, then delegates each step to cheaper, faster executor models."
date: 2026-03-28
categories: [Patterns]
tags: [agentic-AI, planning, orchestration, cost-optimization, multi-model]
related:
  - patterns/orchestrator-worker
  - patterns/model-tier-routing
  - patterns/react-pattern-ai
  - patterns/agentic-workflows
last_updated: 2026-05-30
---

The plan-and-execute pattern splits agent work into two distinct phases. A capable planner model analyzes the task, breaks it into concrete steps, and produces a structured plan. Then a cheaper executor model carries out each step independently. The planner may re-plan if execution results reveal the original plan was flawed. This separation reduces cost because the expensive model only runs once for planning, while the bulk of token-heavy execution work runs on a cheaper tier.

## Architecture

**Planner** - A high-capability model (Claude Sonnet, GPT-4 class) receives the user request and produces an ordered list of steps. Each step should be self-contained: it specifies what to do, what inputs are needed, and what the expected output looks like. The planner does not execute; it thinks.

**Executor** - A faster, cheaper model (Claude Haiku, GPT-4o-mini class) takes each step from the plan and carries it out. The executor might call tools, generate text, transform data, or perform any other atomic operation. It receives only the context it needs for its specific step, not the full conversation history.

**Replanner** (optional) - After each step completes, the planner reviews the result. If the output is unexpected or reveals new information, the planner adjusts the remaining steps. This adaptive replanning handles situations where the initial plan was based on incomplete information.

## When to Use Plan-and-Execute

**Complex multi-step tasks** - Research questions that require gathering information from multiple sources, synthesizing findings, and producing a report. The planning phase identifies what to research and in what order; execution handles each lookup.

**Cost-sensitive workloads** - When the total token count across all execution steps is high, the savings from using a cheaper executor model are significant. A task with 10 execution steps might use a $15/MTok planner once and a $0.25/MTok executor ten times, instead of running the expensive model eleven times.

**Tasks with predictable structure** - If the task type has a known decomposition pattern (e.g., code review always involves: read code, check style, check logic, check security, summarize), the planner can quickly produce the plan and execution is straightforward.

## When Not to Use It

**Simple single-step tasks** - If the task can be handled in one model call, the planning overhead adds latency and cost for no benefit.

**Highly interactive tasks** - When the user expects rapid back-and-forth conversation, the planning phase introduces unwanted delay. ReAct or direct tool-use patterns are better fits.

**Tasks requiring deep context throughout** - If every step needs full awareness of all previous steps and the original context, the executor model needs the same context window as the planner, and the cost advantage disappears.

## Implementation Details

**Plan format** - Structure plans as numbered JSON arrays with fields for step description, required tools, expected inputs, and success criteria. This makes it easy for the executor to parse and for the replanner to track progress.

**Context passing** - Each executor call receives only its step definition plus relevant outputs from prior steps. Do not dump the entire conversation history into every executor call. This keeps executor costs low and reduces the chance of the executor being distracted by irrelevant context.

**Parallel execution** - Steps without dependencies can run concurrently. The planner should annotate which steps depend on which, enabling the orchestration layer to parallelize independent work. This reduces total latency significantly for plans with branching structures.

**Failure handling** - When an executor step fails, route the failure back to the planner with context about what went wrong. The planner can then revise the remaining steps, substitute a different approach, or decide the task cannot be completed. Do not retry blindly; let the planner make an informed decision about how to proceed.

## Cost and Latency Trade-offs

The planning call adds a fixed latency overhead, typically one to three seconds. For tasks that would otherwise require many expensive model calls, this overhead is recouped many times over. Measure the total cost and latency of your most common task types with and without plan-and-execute to determine where the pattern provides a net benefit.

A common optimization is caching plans for recurring task types. If users frequently ask the same class of question, a cached plan template eliminates the planning call entirely, and execution runs immediately on the cheap model tier.
