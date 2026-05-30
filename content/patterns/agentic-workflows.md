---
title: "Agentic Workflow Patterns - From Simple Chains to Complex Orchestration"
description: "Chain, router, parallel, hierarchical, and loop patterns for AI agents. When to use each, error handling, and fallback strategies."
date: 2026-03-24
categories: [Patterns]
tags: ["ai-agents", "advanced", "agentic-workflows", "tool-use", "planning", "multi-step", "orchestration"]
tools: [amazon-bedrock, amazon-step-functions, langgraph]
related:
  - glossary/ai-agents
  - glossary/agentic-ai
  - tools/strands-agents
  - tools/langgraph
  - tools/crewai
  - tools/amazon-step-functions
last_updated: 2026-05-30
---

Agentic AI workflows go beyond single model calls. An agent can use tools, take actions, and decide what to do next based on results. But "agentic" covers a wide range of architectural patterns with very different complexity profiles. Choosing the right pattern for the problem avoids over-engineering simple workflows and under-engineering complex ones.

## Chain Pattern

The simplest agentic pattern. Step A produces output that becomes input to Step B, which feeds Step C. Linear, predictable, easy to debug.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Input</span>
    <span class="bz-flow-step-name">Raw document</span>
    <span class="bz-flow-step-desc">PDF, email, webhook payload, or structured event</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step A</span>
    <span class="bz-flow-step-name">Extract</span>
    <span class="bz-flow-step-desc">Parse and structure content; output becomes Step B's input</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step B</span>
    <span class="bz-flow-step-name">Classify</span>
    <span class="bz-flow-step-desc">Categorise or enrich; output becomes Step C's input</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step C</span>
    <span class="bz-flow-step-name">Generate</span>
    <span class="bz-flow-step-desc">Produce the final response, document, or downstream event</span>
  </div>
</div>

**When to use it** - When the task naturally decomposes into sequential steps with clear inputs and outputs. Document processing pipelines (extract, classify, route, generate response) are chains. Translation workflows (transcribe, translate, format) are chains.

**Implementation** - Lambda functions invoking each other, or Step Functions with a linear state machine. Each step is independently testable.

**Error handling** - Retry the failed step. Dead letter queues for persistent failures. Alert if the chain stalls at a specific step consistently (indicates a systematic problem, not transient failure).

## Router Pattern

The agent evaluates the input and routes it to one of several specialized handlers. A customer service agent that routes billing questions to a billing tool, technical questions to a documentation tool, and escalations to a human handoff tool is using the router pattern.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Input</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Incoming message</span>
      <span class="bz-arch-chip-note">Any request or event requiring classification before handling</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Classifier</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Lightweight LLM</span>
      <span class="bz-arch-chip">Category detection</span>
      <span class="bz-arch-chip-note">Fast and cheap (Haiku-class model). Only needs to identify category, not generate complex output</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Handlers</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Billing tool</span>
      <span class="bz-arch-chip">Docs tool</span>
      <span class="bz-arch-chip">Human handoff</span>
      <span class="bz-arch-chip-note">Each handler is specialized. Only one route is taken per request</span>
    </div>
  </div>
</div>

**When to use it** - When different input types require meaningfully different handling. Avoid routing prematurely - if 80% of inputs go to one route, the router adds complexity without much benefit.

**Implementation** - A classification step followed by conditional routing. The classification can be a lightweight model (Haiku for cost efficiency) since it just needs to identify category, not generate complex output.

## Parallel Pattern

Multiple tools or agents run simultaneously, and their results are combined. Research tasks often follow this pattern: retrieve from knowledge base, search documentation, check recent updates - all in parallel, merge into a unified answer.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Query</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Single user request</span>
      <span class="bz-arch-chip-note">Fan-out to multiple independent sources simultaneously</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Parallel</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Knowledge base</span>
      <span class="bz-arch-chip">Documentation search</span>
      <span class="bz-arch-chip">Recent updates</span>
      <span class="bz-arch-chip-note">All three execute concurrently. Step Functions Map state or Lambda fan-out</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Merge</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Result aggregation</span>
      <span class="bz-arch-chip">Partial failure handling</span>
      <span class="bz-arch-chip-note">Combine results from all sources; degrade gracefully if one source fails</span>
    </div>
  </div>
</div>

**When to use it** - When sub-tasks are independent (not sequentially dependent) and latency reduction justifies complexity.

**Implementation** - Step Functions Map state or Lambda fan-out. Merge step needs to handle partial failures gracefully - if one source returns an error, the system should still produce output from the successful sources.

## Hierarchical Pattern

An orchestrator agent breaks down a complex task into sub-tasks and delegates to specialized agents. The orchestrator does not perform the work directly - it plans, delegates, and synthesizes.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Orchestrator</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Task decomposition</span>
      <span class="bz-arch-chip">Delegation</span>
      <span class="bz-arch-chip">Synthesis</span>
      <span class="bz-arch-chip-note">Plans the work; does not perform it directly. Errors here propagate to all sub-agents</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Sub-agents</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Research agent</span>
      <span class="bz-arch-chip">Code agent</span>
      <span class="bz-arch-chip">Review agent</span>
      <span class="bz-arch-chip-note">Specialized by domain. Receive sub-tasks from orchestrator; return results for synthesis</span>
    </div>
  </div>
</div>

**When to use it** - For complex, open-ended tasks where the decomposition itself requires judgment. Research and analysis tasks, code generation with review, multi-step planning.

**Caution** - Hierarchical agents multiply error surfaces and cost. Errors in the orchestrator's decomposition propagate to all sub-agents. Test the orchestrator's planning quality extensively before adding sub-agent complexity.

## Loop Pattern

The agent takes an action, observes the result, and decides whether to continue or stop. Web search loops (search, evaluate results, search again with refined query if needed) are a common example.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Trigger</span>
    <span class="bz-flow-step-name">Initial query</span>
    <span class="bz-flow-step-desc">Agent receives task with unknown number of required steps</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Action</span>
    <span class="bz-flow-step-name">Take step</span>
    <span class="bz-flow-step-desc">Search, tool call, or computation based on current state</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Observe</span>
    <span class="bz-flow-step-name">Evaluate result</span>
    <span class="bz-flow-step-desc">Did the action produce useful output? Is the goal reached?</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Decision</span>
    <span class="bz-flow-step-name">Continue or stop</span>
    <span class="bz-flow-step-desc">Loop back to Action if incomplete; stop when done or max iterations reached</span>
  </div>
</div>

**When to use it** - When the required number of steps is not known in advance and depends on intermediate results.

**Safeguards** - Always set a maximum iteration count. An agent that can loop indefinitely will eventually do so. Log each iteration for debugging. Monitor token consumption per workflow execution.

## Error Handling and Fallback

Agentic systems fail differently from deterministic code. The model might produce an invalid tool call, a tool might return unexpected results, or the agent might get into a reasoning loop. Standard patterns:

- **Structured output validation** - Always validate model outputs against expected schemas before passing them to tools
- **Graceful degradation** - If a tool fails, the agent should tell the user rather than proceeding with incomplete information
- **Human escalation** - Define conditions under which the agent stops and hands off to a human: too many retries, low confidence score, specific error types
- **Dead-end detection** - If the agent has taken N steps without progress toward the goal, stop and report rather than continuing

Keep agentic workflows as simple as possible. Complex orchestration is expensive, hard to debug, and slow. A well-designed chain often outperforms a poorly designed hierarchical agent on both quality and cost.
