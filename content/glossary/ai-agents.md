---
title: "AI Agents - Autonomous Task Execution"
description: "What AI agents are, how they differ from simple LLM calls, the key design patterns, and what makes agents fail in production."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-agents", "beginner", "ai-agents", "autonomous", "tool-use", "planning", "llm"]
related:
  - glossary/agentic-ai
  - glossary/multi-agent-systems
  - patterns/agentic-workflows
  - tools/strands-agents
  - tools/crewai
  - guides/multi-agent-systems-101
last_updated: 2026-05-30
---

An AI agent is a system where a language model reasons about a task, decides on actions to take, executes those actions using tools, observes the results, and continues reasoning until the task is complete. Unlike a single LLM call that produces one response, an agent loop runs repeatedly until a completion condition is met.

## How Agents Differ from Simple LLM Calls

A single LLM call is stateless: input goes in, output comes out, done. An agent is stateful and iterative: the model makes a decision, takes an action, observes the result, then decides what to do next based on that observation. This loop continues - potentially for many iterations - until the agent determines the task is complete or hits a failure condition.

This design enables agents to handle tasks that require information gathering, decision trees, error correction, and sequential dependencies: "Research this topic, find relevant sources, extract key information, cross-reference it, and write a summary" is a multi-step task that requires iteration and judgment at each step.

## Core Components

**LLM backbone** - The model doing the reasoning. It receives the current state (task description, action history, tool results) and decides what to do next.

**Tools** - Functions the model can call to interact with the world: web search, database queries, file operations, API calls, code execution, email sending. The model decides which tool to use and with what inputs.

**Memory** - The context the model has access to. Short-term memory is the conversation history in the context window. Long-term memory uses external storage (vector databases, traditional databases) that the agent retrieves from via a tool.

**Execution loop** - The orchestration layer that receives the model's action decisions, executes the tool calls, and feeds the results back to the model.

## Agent Design Patterns

**ReAct (Reason-Act)** - The model explicitly states its reasoning, then chooses an action. The action is executed, the result is appended to context, and the model reasons again. This is the most common and interpretable agent pattern.

**Plan-and-execute** - The model produces a complete plan first, then executes each step. Less adaptive than ReAct (the plan does not update mid-execution by default) but more predictable.

**Multi-agent** - Multiple specialized agents collaborate: a researcher, an analyst, and a writer each handle different parts of a complex task. A coordinator agent manages routing between them.

## What Makes Agents Fail

**Infinite loops** - The agent keeps calling tools and reasoning without reaching a conclusion. Always implement a maximum iteration count and a timeout.

**Tool errors without recovery** - If a tool returns an error and the agent does not have instructions for handling it, the loop typically degrades into confused behavior. Design tool error handling explicitly in the system prompt.

**Context overflow** - Long agent loops accumulate context quickly. After many iterations, the context window may overflow, causing the model to lose earlier task context. Use context summarization or sliding window approaches for long-running agents.

**Irreversible actions** - Agents that can send emails, make purchases, or delete data require human confirmation steps before executing irreversible actions. Do not deploy agents with real-world consequences without explicit human-in-the-loop checkpoints for high-stakes operations.

## When to Use Agents

Use agents for tasks that genuinely require iteration, information gathering, or multi-step decision making that cannot be modeled as a fixed pipeline. Avoid agents for tasks that can be accomplished with one or two sequential LLM calls - the added complexity of agent loops introduces failure modes that are harder to debug and monitor than linear pipelines.

## Sources

- Yao, S., et al. (2022). ReAct: Synergizing reasoning and acting in language models. *ICLR 2023*. (ReAct; defined the reason-act-observe loop that underpins most modern agent architectures.)
- Shinn, N., et al. (2023). Reflexion: Language agents with verbal reinforcement learning. *NeurIPS 2023*. (Reflexion; agents that improve through verbal self-reflection rather than gradient updates.)
- Wang, L., et al. (2024). A survey on large language model based autonomous agents. *Frontiers of Computer Science, 18*(6). (Comprehensive survey of agent architectures, tools, planning, and memory mechanisms.)
- Significant-Gravitas. (2023). AutoGPT: An autonomous GPT-4 experiment. *GitHub*. (AutoGPT; early influential autonomous agent demonstrating long-horizon task execution with LLMs.)
