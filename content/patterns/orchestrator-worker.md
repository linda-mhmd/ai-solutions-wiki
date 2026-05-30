---
title: "Orchestrator-Worker Pattern"
description: "An orchestrator LLM decomposes complex tasks and delegates subtasks to specialized worker models or agents, coordinating results into a final output."
date: 2026-03-28
categories: [Patterns]
tags: [orchestration, agents, delegation, multi-model, architecture, ai-engineering]
related:
  - patterns/plan-and-execute
  - patterns/fan-out-fan-in-ai
  - patterns/agentic-workflows
  - patterns/model-tier-routing
  - patterns/tool-use-pattern
last_updated: 2026-05-30
---

Complex AI tasks rarely map cleanly to a single model call. The orchestrator-worker pattern uses one LLM as a coordinator that breaks down a complex request, delegates subtasks to specialized workers, and assembles their outputs into a coherent result.

## Architecture

The orchestrator receives the original user request and produces a task plan: a list of subtasks with their dependencies. Each subtask is dispatched to a worker. Workers can be different models optimized for specific capabilities, the same model with different system prompts, or non-LLM tools like code interpreters and search engines.

The orchestrator tracks task state, handles dependencies between subtasks, and performs a final synthesis step that combines worker outputs into the response.

## Why Specialize Workers

A single large model can attempt any task, but specialized workers are often better. A coding worker uses a model fine-tuned for code generation. A research worker has access to search tools. A data analysis worker runs code in a sandbox. Each worker operates within a narrower scope, which improves reliability and makes failures easier to diagnose.

Specialization also enables cost optimization. The orchestrator can be a capable but expensive model that runs once per request. Workers can be smaller, cheaper models that handle well-scoped subtasks. The orchestrator's job is judgment and planning; the workers' job is execution.

## Task Planning

The quality of the orchestrator's task plan determines the quality of the final result. Effective task plans have three properties:

**Decomposability** - Each subtask is self-contained enough that a worker can complete it without access to the full conversation context.

**Clear interfaces** - The orchestrator specifies what each worker receives as input and what it should produce as output. Ambiguous handoffs lead to misaligned results.

**Dependency awareness** - Some subtasks depend on others. The orchestrator must identify these dependencies and sequence execution accordingly, parallelizing independent subtasks where possible.

## Error Handling

Workers fail. A robust orchestrator handles this by retrying failed subtasks, substituting alternative workers, or revising the task plan when a subtask turns out to be infeasible. The orchestrator should also validate worker outputs before incorporating them into the final result - a worker that returns confidently wrong information is worse than one that fails explicitly.

## Practical Patterns

**Research and report** - Orchestrator plans a report outline, dispatches research workers to gather information for each section, then synthesizes findings into a coherent document.

**Code generation** - Orchestrator breaks a feature request into components, dispatches coding workers for each, dispatches a review worker to check the code, then assembles the final implementation.

**Customer service** - Orchestrator classifies the customer issue, dispatches a lookup worker to retrieve account information, a policy worker to determine applicable rules, and a response worker to draft the reply.

## When to Use

Use this pattern when tasks require multiple distinct capabilities, when you want to optimize cost by using cheaper models for routine subtasks, or when you need auditability of how a complex request was handled. For simple, single-step tasks, the overhead of orchestration is not justified.
