---
title: "Evaluator-Optimizer Pattern"
description: "Automated evaluation loops where one model generates output and another evaluates it, driving iterative improvement until quality thresholds are met."
date: 2026-03-28
categories: [Patterns]
tags: [evaluation, optimization, quality, iteration, ai-engineering, llm-ops]
related:
  - patterns/reflection-pattern
  - patterns/human-in-the-loop
  - patterns/guardrails-pattern
  - patterns/observability-ai
  - frameworks/compound-ai-systems
last_updated: 2026-05-30
---

LLM outputs vary in quality. A single generation may miss requirements, contain errors, or fail to match the desired format. The evaluator-optimizer pattern addresses this by introducing an automated quality loop: a generator produces output, an evaluator scores it against criteria, and if the score falls below a threshold, the generator tries again with feedback from the evaluator.

## The Loop

**Generate** - The generator model produces an initial output based on the user's request and any provided context.

**Evaluate** - The evaluator assesses the output against defined criteria. This can be another LLM call with an evaluation prompt, a deterministic check (does the output parse as valid JSON?), or a combination of both. The evaluator produces a score and specific feedback identifying what needs improvement.

**Optimize** - If the evaluation score is below the acceptance threshold, the original output and the evaluator's feedback are fed back to the generator for another attempt. The generator sees exactly what was wrong and can correct it.

**Terminate** - The loop exits when the output passes evaluation, when a maximum iteration count is reached, or when successive iterations stop improving. A hard iteration limit prevents infinite loops when the generator cannot satisfy the evaluator.

## Evaluation Strategies

**Rubric-based evaluation** - The evaluator scores output against a structured rubric with specific dimensions: accuracy, completeness, format compliance, tone. Each dimension gets a score, and the overall pass/fail decision is based on minimum thresholds per dimension.

**Reference comparison** - The evaluator compares output against known-good examples or ground truth data. This works well for tasks with objective correct answers.

**Constraint checking** - Deterministic checks verify structural requirements. Does the code compile? Does the JSON schema validate? Does the response stay within the word limit? These are cheaper and more reliable than LLM-based evaluation for verifiable properties.

**Composite evaluation** - Combine deterministic checks with LLM-based assessment. Run the cheap, reliable checks first. Only invoke the LLM evaluator if deterministic checks pass.

## Cost and Latency

Each iteration multiplies cost and latency. A three-iteration loop costs roughly three times as much as a single generation and takes three times as long. Mitigate this by making the first generation as good as possible through detailed prompts and examples. Use a cheaper, smaller model as the evaluator when the evaluation task is straightforward.

Set the maximum iteration count based on empirical observation. Most improvements happen in the first retry. If the generator has not produced acceptable output after three attempts, additional iterations rarely help - the problem is usually in the prompt or the task specification, not the generation process.

## When to Use

This pattern shines for tasks with clear, assessable quality criteria: code generation (does it pass tests?), structured data extraction (does it match the schema?), and content that must conform to style guides. It is less effective for subjective tasks where the evaluator's judgment is no more reliable than the generator's.
