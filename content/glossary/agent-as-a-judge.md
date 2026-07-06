---
title: "Agent-as-a-Judge"
description: "An evaluation approach that uses a full agentic system to judge another agent's entire trajectory rather than only its final answer."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "evaluation", "agents"]
related:
  - glossary/llm-as-a-judge
  - glossary/agent-evaluation
  - glossary/agent-harness
  - glossary/multi-agent-systems
  - glossary/reasoning-models
---

Agent-as-a-Judge is an evaluation approach that uses a full agentic system, with tool use, multi-step reasoning, and state, to evaluate another agent. Instead of scoring only a final answer, the judging agent examines the whole trajectory the evaluated agent produced along the way.

## How it works

Agent-as-a-Judge extends {{< relref "glossary/llm-as-a-judge" >}} by giving the judge the same capabilities as the system under test. Where an LLM-as-a-judge reads a prompt and an output and returns a score, an Agent-as-a-Judge can call tools, read intermediate files and reasoning, hold state across steps, and reason over the entire path an agent took to reach its result. This makes it a natural fit for {{< relref "glossary/agent-evaluation" >}}, where the process matters as much as the outcome.

Because the judge inspects each step of the evaluated {{< relref "glossary/agent-harness" >}} rather than a single output, it gives useful intermediate feedback and suits complex, multi-step tasks such as software development. The technique was reported to outperform LLM-as-a-Judge for evaluating multi-step agents and connects closely to work on {{< relref "glossary/multi-agent-systems" >}} and {{< relref "glossary/reasoning-models" >}}.

## Origins and History

Agent-as-a-Judge was introduced by Zhuge, Zhao, Ashley, Tian, Schmidhuber, Chandra, and colleagues at Meta AI and KAUST in "Agent-as-a-Judge: Evaluate Agents with Agents" (arXiv 2410.10934), released on 14 October 2024. The paper presented the method together with DevAI, a benchmark of 55 realistic AI-development tasks used to demonstrate that the approach outperforms LLM-as-a-Judge when judging multi-step agents.

## Sources

1. Zhuge, Zhao, Ashley, Tian, Schmidhuber, Chandra, et al. (Meta AI and KAUST). "Agent-as-a-Judge: Evaluate Agents with Agents" (14 October 2024). [https://arxiv.org/abs/2410.10934](https://arxiv.org/abs/2410.10934)
