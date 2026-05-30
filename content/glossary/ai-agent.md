---
title: "AI Agent"
description: "What AI agents are, how they autonomously plan and execute tasks, and the architectural patterns that distinguish agents from simple chatbots."
date: 2026-03-28
categories: [Glossary]
tags: [ai-agent, autonomous-ai, agentic-ai, planning, tool-use, orchestration]
related:
  - glossary/agentic-ai
  - glossary/multi-agent-orchestration
  - patterns/agentic-workflows
  - patterns/tool-use-pattern
  - patterns/plan-and-execute
last_updated: 2026-05-30
---

An AI agent is a software system that uses a large language model as its reasoning engine to autonomously plan, execute, and adapt a sequence of actions in pursuit of a goal. Unlike a chatbot that responds to a single prompt, an agent receives an objective, breaks it into steps, selects and invokes tools, observes the results, and iterates until the objective is achieved or it determines it cannot proceed.

<figure class="bz-figure">
  <img src="/img/craft/workshop-tools-ai-assistants-text.png" alt="A workshop with various tools arranged for use: AI agents select and use tools autonomously to accomplish their goals." loading="lazy">
  <figcaption>An AI agent is like a craftsperson with a workshop full of tools. Given a goal, it selects the right tool, uses it, observes the result, and decides what to do next. The loop continues until the work is done.</figcaption>
</figure>

## How Agents Work

An agent operates in a loop. The model receives the goal, the current state, and the history of actions taken so far. It decides the next action: call a tool, retrieve information, write code, ask for clarification, or return a final answer. The result of that action is appended to the context, and the model decides the next step. This loop continues until a termination condition is met.

The core capabilities that distinguish an agent from a simple prompt-response system are planning (decomposing a goal into subtasks), tool use (invoking external APIs, databases, or code execution environments), memory (maintaining context across multiple steps), and self-correction (recognizing when an approach is failing and adjusting).

## Agent Architectures

**ReAct (Reason + Act)** - The model alternates between reasoning about what to do next and taking an action. Each step produces an explicit thought followed by an action and observation. This pattern is transparent and easy to debug because the reasoning is visible.

**Plan-and-execute** - The model generates a complete plan upfront, then executes each step sequentially. Better for tasks where the full scope is known in advance. The plan can be revised if intermediate results require it.

**Orchestrator-worker** - A central agent decomposes the task and delegates subtasks to specialized worker agents. Each worker has a focused prompt and limited tool set. The orchestrator assembles the final output from worker results.

## When to Use Agents

Agents are appropriate when the task requires multiple steps that cannot be predicted in advance, when tool selection depends on intermediate results, or when the system must adapt its approach based on what it discovers. Common use cases include code generation with testing, research tasks requiring multiple searches and synthesis, customer support workflows that span multiple systems, and data analysis requiring iterative exploration.

Agents are not appropriate for simple question-answering, single-step transformations, or tasks where latency and cost must be tightly controlled. Each agent step incurs a model invocation, making agents significantly more expensive and slower than single-call approaches.

## Risks and Limitations

Agents can enter infinite loops, take incorrect actions with real-world consequences, or accumulate errors across steps. Production agent systems require guardrails: maximum step limits, human-in-the-loop approval for high-impact actions, sandboxed execution environments, and comprehensive logging of every action taken.

## Sources

- Yao, S., et al. (2023). ReAct: Synergizing reasoning and acting in language models. *ICLR 2023*. (ReAct pattern; foundational agentic architecture combining reasoning and action.)
- Significant-Gravitas. (2023). AutoGPT: An autonomous GPT-4 experiment. *GitHub*. (Early widely-used autonomous agent demonstration.)
- Schick, T., et al. (2024). Toolformer: Language models can teach themselves to use tools. *NeurIPS 2024*. (Self-taught tool use in language models.)
- Wang, L., et al. (2024). A survey on large language model based autonomous agents. *Frontiers of Computer Science, 18*(6). (Comprehensive survey of agent architectures, memory, planning, and tool use.)
