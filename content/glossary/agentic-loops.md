---
title: "Agentic Loops"
description: "An agentic loop is the core execution pattern of an AI agent: the model observes its environment, reasons about what to do, takes an action, observes the result, and repeats until the task is complete."
date: 2026-06-22
categories: [Glossary]
tags: ["agents", "agentic-ai", "agentic-loops", "react", "tool-use", "multi-agent", "ai-architecture"]
related:
  - glossary/agents
  - glossary/agentic-ai
  - glossary/tool-use
  - patterns/react
  - guides/multi-agent-systems-101
---

<figure class="bz-figure">
  <img src="/img/juggling/circuit-infinity-amber-notext.png" alt="An amber infinity loop overlaid with circuit board traces on a black background: the continuous observe-reason-act cycle at the core of every AI agent." loading="lazy">
  <figcaption>Every agent runs the same loop. The quality of the agent is in what it observes, how it reasons, and whether it knows when to stop.</figcaption>
</figure>

An **agentic loop** is the repeating execution pattern that turns a language model into an AI agent. Instead of receiving a question and returning a single answer, the model runs through a cycle: observe what is happening, decide what to do, act on that decision, observe the result of the action, and then repeat. The loop continues until the agent determines the task is complete.

The word "loop" is precise. Each iteration feeds the result of the previous action back into the model's input, giving the model new information to reason about. This feedback mechanism is what separates an agent from a standard LLM call. A single call is a one-shot question-and-answer exchange. A loop is a process that evolves based on what the model learns at each step.

This pattern appears across almost every agent framework in production today: ReAct (Reason + Act), OpenAI Assistants, LangGraph, AutoGen, Claude's tool-use API, and custom agentic systems. The implementation details vary, but the underlying loop is the same.

---

## The loop, step by step

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Observe</span>
    <span class="bz-flow-step-desc">Receive current state: task description, tool outputs from previous iterations, memory contents, and conversation history. This is the full context the model can see.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Reason</span>
    <span class="bz-flow-step-desc">The LLM processes the current state and decides what to do next: call a tool, ask a clarifying question, or produce a final answer. Chain-of-thought models make this reasoning visible.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Act</span>
    <span class="bz-flow-step-desc">Execute the chosen action: call a function, run code, search the web, write a file, query a database, or hand off to another agent. If the model signals it is done, the loop exits here.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Update</span>
    <span class="bz-flow-step-desc">The tool result is appended to the context as an observation. The updated state becomes the input for the next Observe step. The loop restarts from Step 1.</span>
  </div>
</div>

The loop exits when the agent produces a final answer instead of a tool call, or when an external stopping condition triggers (see [Stopping Logic](#stopping-logic) below).

---

## The parts of a loop

### State

State is everything the agent knows right now. In practice, state is the contents of the context window at the start of each iteration: the original task, all previous tool calls, all observations returned by those calls, and any memory retrieved from external storage. An agent with a small or poorly managed state will make poor decisions. State management is one of the hardest engineering problems in agentic systems.

### Reasoning

Reasoning is the LLM's decision step. The model reads the current state and determines what action to take next. In chain-of-thought models (such as Claude or OpenAI's o-series), the reasoning step is a visible scratchpad before the tool call or final answer. In standard completions, the reasoning is internal. Either way, the quality of the reasoning step determines the quality of the loop.

### Action

An action is what the agent does in the external world. Actions fall into four broad categories:

- **Read actions**: web search, file read, database query, API GET request
- **Write actions**: file write, database insert, API POST request, sending a message
- **Compute actions**: running code in a sandbox, calling a calculation function
- **Delegation actions**: spawning a sub-agent, calling another model

### Observation

An observation is the result of an action, fed back into the agent's state. If the agent runs a web search, the observation is the search results. If the agent runs code, the observation is the stdout output or the error message. Observations are the mechanism by which the agent learns from its actions during the same session.

### Stopping condition {#stopping-logic}

The stopping condition determines when the loop exits. A stopping condition can be:

- **Explicit signal**: the model produces a structured "DONE" token or a final answer without a tool call
- **Max iterations**: the orchestrator enforces a hard ceiling on the number of loop cycles
- **Quality threshold**: an evaluator agent signals that the output meets the required standard
- **Human approval**: a human-in-the-loop checkpoint confirms the action before the loop continues or exits

Loops without a stopping condition run forever and exhaust your budget. Always define at least one.

---

## Loop variants

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Simple loop</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Single agent</span>
      <span class="bz-arch-chip">Single tool set</span>
      <span class="bz-arch-chip-note">Runs observe-reason-act until it signals it is done or hits max iterations. Most common pattern.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hierarchical loop</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Orchestrator agent</span>
      <span class="bz-arch-chip">Sub-agents (each with own inner loop)</span>
      <span class="bz-arch-chip-note">Orchestrator delegates sub-tasks. Each sub-agent runs its own loop. Orchestrator observes the sub-agent's final answer as its own tool result.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Parallel loop</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Supervisor agent</span>
      <span class="bz-arch-chip">Multiple concurrent worker agents</span>
      <span class="bz-arch-chip-note">Workers run their loops in parallel. Supervisor collects and merges results. Reduces wall-clock time for independent sub-tasks.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Critique loop</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Proposer agent</span>
      <span class="bz-arch-chip">Critic/evaluator agent</span>
      <span class="bz-arch-chip-note">Proposer drafts output. Critic scores it. If quality threshold is not met, the loop repeats with the critique as additional context for the proposer.</span>
    </div>
  </div>
</div>

---

## System architecture

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Context</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Task description</span>
      <span class="bz-arch-chip">Conversation history</span>
      <span class="bz-arch-chip">Tool results from prior iterations</span>
      <span class="bz-arch-chip-note">Everything visible to the model at the start of each loop iteration</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">LLM</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPT-4o</span>
      <span class="bz-arch-chip">Claude 4</span>
      <span class="bz-arch-chip">Llama 3</span>
      <span class="bz-arch-chip-note">Reasoning and tool selection happen here. The model outputs either a tool call or a final answer.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Tools</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web search</span>
      <span class="bz-arch-chip">Code execution</span>
      <span class="bz-arch-chip">File read / write</span>
      <span class="bz-arch-chip">API calls</span>
      <span class="bz-arch-chip">Database queries</span>
      <span class="bz-arch-chip-note">Executed outside the model. Results are returned as observations.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Memory</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Short-term: context window</span>
      <span class="bz-arch-chip">Long-term: vector store</span>
      <span class="bz-arch-chip">Long-term: key-value store</span>
      <span class="bz-arch-chip-note">Short-term memory resets each session. Long-term memory persists across sessions and must be explicitly retrieved.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Stopping logic</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Max iterations limit</span>
      <span class="bz-arch-chip">Explicit done signal</span>
      <span class="bz-arch-chip">Quality threshold check</span>
      <span class="bz-arch-chip">Human-in-the-loop approval</span>
      <span class="bz-arch-chip-note">At least one stopping condition is mandatory. Combine two or more for production reliability.</span>
    </div>
  </div>
</div>

---

## What makes loops fail

Agentic loops introduce failure modes that do not exist in single-call LLM usage.

**Infinite loops.** If the agent has no stopping condition and the task is ambiguous, the model will continue calling tools indefinitely. This exhausts your token budget and produces no output. Always set `max_iterations` as a hard ceiling.

**Context window exhaustion.** Each observation adds tokens to the context. A loop that runs 20 iterations on a task involving long web pages will fill a 128k context window and either truncate earlier observations or throw an error. Summarise observations before appending them to state when loops are expected to run long.

**Unhandled tool errors.** If a tool call returns an error and the agent has no instruction for how to handle failure, it will retry the same call repeatedly or hallucinate a successful result. Wrap every tool with explicit error handling and return structured error observations the model can reason about.

**Hallucinated tool arguments.** The model may invent arguments for a tool call that look plausible but are invalid, such as a non-existent file path or a malformed JSON body. Validate all tool inputs before execution and return the validation error as an observation, not a system crash.

**Reasoning drift.** In long loops, the model can lose track of the original task as observations accumulate. Restate the goal explicitly in the system prompt and consider injecting a task reminder at fixed intervals.

---

## Controlling loops in production

Four practices that keep agentic loops reliable at scale:

**Set `max_iterations` explicitly.** Every agent runner (LangGraph, AutoGen, custom) supports a hard cap on loop cycles. Set it before deploying. A reasonable default for general tasks is 10-15 iterations. Raise it only for known long-running workflows.

**Log every step.** Each observe-reason-act cycle should emit a structured log entry: the iteration number, the tool called, the arguments, and the observation returned. Without per-step logs, debugging a failed loop is almost impossible because you cannot see what the model was reasoning about at each point.

**Add a human-in-the-loop checkpoint for high-stakes actions.** Before the agent executes a write action (sending an email, modifying a database record, posting to an external API), pause the loop and request human confirmation. Resume the loop only after approval. This is especially important in financial, medical, and legal contexts.

**Monitor token spend per loop, not per call.** A single agentic loop can consume 10-50x the tokens of a single LLM call. Set spend limits at the loop level and alert when a single session exceeds your threshold. Cost control on agents is fundamentally different from cost control on chat applications.

---

## Real-world analogy

Think of a customer support agent following a decision tree to resolve an order issue.

The agent receives a customer message (observe). The agent reads the message, checks the rules, and decides to look up the order number (reason). The agent queries the order system (act). The order system returns the order status: "shipped, delayed" (observe). The agent reads the delay and decides to check the carrier tracking page (reason). The agent fetches the tracking page (act). The tracking page shows a customs hold (observe). The agent now has enough information to draft a response explaining the delay (reason). The agent sends the reply and signals it is done (act, stopping condition met).

Each step in that sequence is one iteration of an agentic loop. The agent did not know it would need the tracking page when it started. It discovered that through the loop.

---

## Further reading

- [What is an AI Agent?](/glossary/ai-agent/): definition of agents, how they differ from assistants and automations
- [What is Tool Use?](/glossary/tool-use/): how LLMs call external functions and what happens when they do
- [What is Agentic AI?](/glossary/agentic-ai/): the broader category and how agentic systems differ from single-model pipelines
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629): the original paper formalising the reason-then-act loop pattern
- [LangGraph documentation](https://langchain-ai.github.io/langgraph/): graph-based framework for building stateful, multi-actor agentic loops
- [OpenAI Assistants API](https://platform.openai.com/docs/assistants/overview): hosted implementation of agentic loops with built-in tool execution and thread management
- [Anthropic tool use documentation](https://docs.anthropic.com/en/docs/build-with-claude/tool-use): how Claude implements the action step of an agentic loop using structured tool calls
- [AutoGen documentation](https://microsoft.github.io/autogen/): Microsoft's framework for multi-agent loops, including critique and hierarchical patterns
