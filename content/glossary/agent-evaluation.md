---
title: "Agent Evaluation"
description: "Agent evaluation tests an AI system that plans and calls tools across many steps, where one wrong action can cause real-world harm."
date: 2026-06-29
tags: ["evaluation", "ai-agents", "testing", "safety"]
related:
  - glossary/ai-evaluation
  - glossary/ai-agents
  - glossary/agentic-loops
  - glossary/red-teaming
  - glossary/workflow-evaluation
---

<figure class="bz-figure">
  <img src="/img/juggling/neural-network-nodes-notext.png" alt="Interconnected glowing nodes forming a network, representing evaluating an AI agent that plans and calls tools." loading="lazy">
  <figcaption>An agent moves through a network of decisions and tool calls, and evaluation has to judge the whole path, not one answer.</figcaption>
</figure>

Agent evaluation is the practice of testing an AI system that can plan, decide, and call tools to act in the world. It goes beyond checking whether a single model reply is correct. It checks whether the agent chose the right actions, in the right order, with the right inputs, and reached the goal without causing harm along the way. Because an agent can book a flight, send an email, or run a command, one wrong tool call can produce a real consequence, not a wrong sentence.

## A real-world analogy

Testing a plain language model is like grading a driving exam on paper. You ask questions and score the answers. Testing an agent is like putting a new driver on real roads in traffic. You watch the whole route: every lane change, every signal, every stop. A driver can still arrive at the destination while running a red light. An agent can still return the right final answer while deleting a file, calling the wrong endpoint, or spending money it should not have. The route matters as much as the arrival.

## What makes agents harder to evaluate

Agents raise problems that do not appear when you score a single response. See [AI evaluation](/glossary/ai-evaluation/) for the broader parent discipline.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Factor 1</span>
    <span class="bz-flow-step-name">Multi-step</span>
    <span class="bz-flow-step-desc">The agent takes many actions. You have to score the whole trajectory, not one output.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Factor 2</span>
    <span class="bz-flow-step-name">Tool access</span>
    <span class="bz-flow-step-desc">Actions touch the real world. A wrong call can send, delete, or spend, not just misspeak.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Factor 3</span>
    <span class="bz-flow-step-name">Non-determinism</span>
    <span class="bz-flow-step-desc">The same task can run differently each time, so one pass does not prove reliability.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Factor 4</span>
    <span class="bz-flow-step-name">Cascading errors</span>
    <span class="bz-flow-step-desc">An early mistake feeds later steps, so small slips compound into large failures.</span>
  </div>
</div>

- **Multi-step trajectories.** An agent runs a loop of reason, act, observe. You need to judge the path it took: which tools it called, the arguments it passed, the intermediate reasoning, and how it recovered from a failed step. This path is the [agentic loop](/glossary/agentic-loops/).
- **Tool access with real effects.** A model that writes a wrong sentence is annoying. An agent that calls the wrong tool can move money or change data. Evaluation must catch unsafe actions, not just wrong words.
- **Non-determinism.** Agents behave probabilistically. Running a task once and passing it does not mean it will pass again. Reliability testing repeats the same task many times and asks how often the agent succeeds across all attempts, not on a lucky run.
- **Cascading errors.** A single early misstep can propagate. A wrong tool output feeds the next decision, and the agent drifts further from the goal at each step. Good evaluation traces where the failure started.

## How it works

Agent evaluation usually combines several views of the same run.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Outcome</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Task completion</span>
      <span class="bz-arch-chip">Goal reached</span>
      <span class="bz-arch-chip-note">Did the agent finish the job correctly</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Trajectory</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Tool correctness</span>
      <span class="bz-arch-chip">Argument accuracy</span>
      <span class="bz-arch-chip">Step efficiency</span>
      <span class="bz-arch-chip-note">Was the path itself sound and efficient</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Reliability</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Repeated runs</span>
      <span class="bz-arch-chip">Consistency across attempts</span>
      <span class="bz-arch-chip-note">Does it succeed every time, not once</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Safety</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Harmful actions</span>
      <span class="bz-arch-chip">Adversarial pressure</span>
      <span class="bz-arch-chip-note">Can it be pushed into an unsafe call</span>
    </div>
  </div>
</div>

Teams run these checks against benchmarks built for agents. Public suites include tau-bench, which measures whether an agent completes multi-step retail and airline tasks and repeats them reliably, AgentBench, which spans environments such as web browsing and databases, WebArena for web navigation, and the Berkeley Function-Calling Leaderboard, which standardises how well a model calls functions. A recent survey frames the shift well: agent evaluation assesses the whole car under many driving conditions, not just the engine.

## Adversarial and red-team angles

Because agents act, they are a target. An attacker can hide instructions in a web page, a document, or a tool response to hijack the agent's plan. This is a prompt-injection risk unique to systems that read untrusted content and then take action. [Red teaming](/glossary/red-teaming/) an agent means probing for these paths on purpose: can a malicious input make the agent exfiltrate data, call a destructive tool, or ignore its guardrails. Reliability testing asks how often the agent fails. Red teaming asks how it can be made to fail.

## How it connects to related concepts

Agent evaluation is a branch of [AI evaluation](/glossary/ai-evaluation/), the parent discipline that also covers model and system testing. It focuses on [AI agents](/glossary/ai-agents/), the systems that plan and act, and on the [agentic loop](/glossary/agentic-loops/) they run through. When an agent follows a fixed, scripted sequence rather than free-form planning, the narrower discipline of [workflow evaluation](/glossary/workflow-evaluation/) applies. And because agents take real actions, [red teaming](/glossary/red-teaming/) is a core part of evaluating them safely.

## Further reading

- [AI evaluation](/glossary/ai-evaluation/): the parent discipline that covers model, system, and agent testing
- [AI agents](/glossary/ai-agents/): what an AI agent is and how it plans and acts
- [Agentic loops](/glossary/agentic-loops/): the reason, act, observe cycle an agent runs
- [Workflow evaluation](/glossary/workflow-evaluation/): testing agents that follow a fixed, scripted sequence
- [Red teaming](/glossary/red-teaming/): probing an AI system for unsafe or exploitable behaviour
- [A Survey on Evaluation of LLM-based Agents](https://arxiv.org/abs/2503.16416): academic overview of agent evaluation dimensions and methods
- [Evaluation and Benchmarking of LLM Agents: A Survey](https://arxiv.org/html/2507.21504v1): survey covering benchmarks such as tau-bench, AgentBench, and WebArena
- [Berkeley Function-Calling Leaderboard](https://gorilla.cs.berkeley.edu/leaderboard.html): standard benchmark for measuring how well models call tools
