---
title: "Trajectory Evaluation"
description: "Scoring the full path an agent takes, including tool calls and intermediate reasoning, rather than only its final output."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "evaluation", "agents"]
related:
  - glossary/agent-as-a-judge
  - glossary/agent-evaluation
  - glossary/agent-harness
  - glossary/llm-as-a-judge
---

Trajectory evaluation is the practice of scoring the full path an agent takes to complete a task, including its tool calls, their arguments, the ordering of steps, intermediate reasoning, and retries, rather than only the final output. It asks not just whether the agent got the right answer, but whether it got there in a sound way.

## How it works

A trajectory evaluation looks at the sequence of actions an agent produced and measures qualities such as tool-selection correctness, step efficiency, and plan adherence. These metrics reveal problems that a final-answer check would miss, such as an agent that reaches a correct result through wasteful or unsafe steps. This makes trajectory evaluation a core part of {{< relref "glossary/agent-evaluation" >}} and a useful lens on any {{< relref "glossary/agent-harness" >}}.

Trajectory evaluation is a practitioner and umbrella technique. It is not attributable to any single lab or originating paper. The category is formalized in the survey literature on LLM-agent evaluation and operationalized in tooling, where it can pair with {{< relref "glossary/llm-as-a-judge" >}} or a fuller {{< relref "glossary/agent-as-a-judge" >}} to score each step.

## Origins and History

There is no single originating paper for trajectory evaluation, and it cannot be credited to one lab. The category is described and organized in Yehudai and colleagues' "Survey on Evaluation of LLM-based Agents" (arXiv 2503.16416, March 2025), which surveys how the field measures agent behaviour. It is put into practice in tooling such as LangSmith, whose documentation describes "trajectory evaluations" for scoring the exact sequence of steps an agent takes.

## Sources

1. Yehudai, et al. "Survey on Evaluation of LLM-based Agents" (March 2025). [https://arxiv.org/abs/2503.16416](https://arxiv.org/abs/2503.16416)
2. LangChain. "Trajectory evaluations," LangSmith documentation. [https://docs.langchain.com/langsmith/trajectory-evals](https://docs.langchain.com/langsmith/trajectory-evals)
