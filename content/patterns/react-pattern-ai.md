---
title: "ReAct Pattern - Reasoning and Acting in AI Agents"
description: "The ReAct pattern interleaves chain-of-thought reasoning with tool actions, enabling AI agents to think before they act and adjust based on observations."
date: 2026-03-28
categories: [Patterns]
tags: [agentic-AI, reasoning, tool-use, ReAct, prompt-engineering]
related:
  - patterns/chain-of-thought
  - patterns/tool-use-pattern
  - patterns/plan-and-execute
  - patterns/agentic-workflows
last_updated: 2026-05-30
---

ReAct (Reasoning + Acting) is a prompting and agent architecture pattern where the model alternates between generating a reasoning trace and taking an action. Instead of producing a final answer in one shot, the agent thinks step by step, calls a tool, observes the result, reasons about the observation, and decides the next action. This loop continues until the agent has enough information to produce a final answer.

## The Core Loop

A ReAct cycle has three phases that repeat:

**Thought** - The model reasons about the current state. What do I know so far? What do I still need? Which tool should I call next? This reasoning is explicit and traceable, making the agent's decision process transparent.

**Action** - Based on the thought, the model invokes a tool or API. This could be a web search, database query, code execution, or any function the agent has access to.

**Observation** - The tool returns a result. The model incorporates this new information and begins the next thought phase.

## Why ReAct Works Better Than Pure Reasoning or Pure Acting

Pure chain-of-thought reasoning fails when the model needs external information it does not have in its training data. It hallucinates facts. Pure tool use without reasoning leads to unfocused tool calls - the agent queries tools without a plan, often retrieving irrelevant information.

ReAct combines the strengths of both approaches. The reasoning phase keeps the agent focused on the goal. The action phase grounds the reasoning in real data. Research shows ReAct reduces hallucination rates significantly compared to chain-of-thought alone because the model verifies its assumptions through tool calls rather than fabricating answers.

## Implementation Approaches

**Prompt-based ReAct** - Structure the system prompt to instruct the model to output Thought/Action/Observation blocks. Parse the action blocks to invoke tools, inject the results as observations, and feed the updated context back to the model. This works with any model that supports function calling but gives you explicit control over the loop.

**Framework-based ReAct** - Tools like LangGraph, Strands Agents, and similar agent frameworks implement the ReAct loop as a core abstraction. You define available tools and the framework manages the thought-action-observation cycle, including retry logic and conversation history management.

**Structured output ReAct** - Combine ReAct with structured output schemas to constrain the model's action selections. Instead of free-text action descriptions, the model outputs a JSON object specifying the tool name and parameters. This eliminates parsing errors and makes the loop more reliable.

## When to Use ReAct

ReAct is the right pattern when: the task requires multiple information lookups before an answer can be synthesized, the agent needs to verify intermediate conclusions, or the problem is too complex to solve with a single model call.

ReAct is overkill when: the task is a simple transformation (summarize this text, translate this sentence), the answer does not require external data, or latency is critical and you cannot afford multiple round trips.

## Practical Considerations

**Token cost** - Each iteration of the loop adds to the context window. A complex ReAct chain might involve 5-10 iterations, each adding thought text plus tool results. Set a maximum iteration limit to prevent runaway costs. Three to seven iterations handles most practical tasks.

**Observation truncation** - Tool results can be large. A database query might return thousands of rows. Truncate or summarize observations before injecting them back into the context. The model does not need the raw data; it needs the relevant signal.

**Error handling** - Tools fail. APIs time out. The model might call a tool with malformed parameters. Build retry logic into the action phase, and include instructions in the system prompt for how the agent should handle tool failures - typically by acknowledging the error in a thought step and trying an alternative approach.

**Tracing and debugging** - The explicit thought steps are one of ReAct's biggest advantages. Log every thought, action, and observation. When the agent produces a wrong answer, the trace shows exactly where the reasoning went off track. This is far easier to debug than a black-box single-call approach.

## Common Failure Modes

**Reasoning loops** - The agent repeats the same thought-action cycle without making progress. Mitigate this by tracking previously called tools and their parameters, and instructing the model to avoid redundant calls.

**Premature conclusion** - The agent stops after one tool call when the answer requires synthesizing multiple sources. Counter this by including "verify your answer" instructions in the system prompt.

**Over-reasoning** - The agent generates long thought blocks without taking action, burning tokens on speculation instead of looking up the answer. Keep system prompt instructions directive: "If you need information, call a tool rather than guessing."
