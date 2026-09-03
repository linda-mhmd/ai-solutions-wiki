---
title: "Durable Execution for Agent Workflows"
description: "An AI agent's own process is not durable storage: a crash, an OOM kill, or a context-window limit loses everything mid-task. Durable execution platforms like Temporal fix this by persisting every step outside the agent's process, and now integrate directly with the OpenAI Agents SDK."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Guides]
tags: ["durable-execution", "temporal", "ai-agents", "workflow-engine", "reliability", "openai-agents-sdk", "distributed-systems"]
related:
  - tools/temporal
  - glossary/workflow-engine
  - guides/proving-a-deployment-landed
  - guides/backstage-as-an-agent-interface
  - guides/agent-identity-and-authorization
  - glossary/model-context-protocol
---

An agent that is three tool calls into a twenty-step task holds all of its progress in one place: the memory of the process running it. There is no log anyone else can read, no checkpoint another process can pick up, no record of which tool calls already succeeded. If that process is killed — the host is rescheduled, the container hits its memory limit, the agent runs out of context window and gets restarted, the machine loses power — the work does not pause. It disappears. Whatever the agent had verified, decided, or partially completed is gone, and whatever resumes has no way to know it existed.

This is not a hypothetical edge case. Long-running agent tasks routinely span minutes to days: waiting on a rate-limited API, polling a slow deployment, waiting for a human approval, retrying a flaky external service with backoff. Every one of those is an ordinary point for a process to die for reasons that have nothing to do with the agent's own logic — an autoscaler killing an idle pod, a deploy rolling the host out from under it, an orchestrator enforcing a memory cap. A workflow designed to run for an hour has to survive dozens of infrastructure events that have nothing to do with whether the agent's reasoning was correct.

Durable execution is the class of platform built to make this a non-issue: the agent's logical progress is recorded outside its process as it happens, so a crash loses at most the in-flight step, and a replacement worker can resume mid-task without repeating or losing anything already done.

## The mechanism, precisely: Event History and replay

Temporal is a widely used durable execution platform with one of the most thoroughly documented integrations for agent workloads (it is not the only one — see "Beyond Temporal" below), so it is worth being exact about how it actually works rather than treating "durable execution" as a black box.

Temporal separates code into two roles. **Workflow** code is the orchestration logic — the sequence of steps, the branching, the decisions about what to do next. It must be deterministic: given the same inputs, it produces the same sequence of commands every time. **Activity** code is where the actual side effects happen — an HTTP call, a database write, a call to a model API — and is allowed to be non-deterministic and to fail, because Temporal wraps it in configurable retries.

Workflow code never performs actions directly. It issues Commands (schedule this Activity, start this timer) to the Temporal Service, and those Commands are converted into Events that are durably persisted as the **Event History** — "a complete and durable log of everything that has happened in the lifecycle of a Workflow Execution," in Temporal's own description, according to [Temporal's Event History documentation](https://docs.temporal.io/encyclopedia/event-history). Every scheduled Activity, every completed Activity result, every timer and signal is an Event in that log, in order.

The recovery mechanism follows directly from that log. If a **Worker** — the process actually running Workflow and Activity code — crashes, the Temporal Service detects that it stopped reporting progress and reschedules the Workflow. A replacement Worker (a different process, possibly a different machine) does not receive a description of what state to resume from; it receives the Event History and **replays the Workflow code against it from the start**, so that as it executes, its calls line up against the recorded Events instead of issuing new work. According to Temporal's own documentation, "the Worker uses the Event History to replay the code and recreate the state of the Workflow Execution to what it was immediately before the crash" and then "resumes progress from the point of failure as if the failure never occurred" (per [Temporal's "Understanding Temporal" guide](https://docs.temporal.io/evaluate/understanding-temporal)). Because each Activity's result was already recorded as an Event, replay does not re-run Activities that already completed — it reconstructs the Workflow's internal state up to that point and only genuinely re-executes work that was in flight or never started.

This is the concrete answer to "where does the state live if not in the agent's process": it lives in the Event History on the Temporal Service, written incrementally as the Workflow runs, independent of which Worker process happens to be alive at any given moment.

## The OpenAI Agents SDK integration

Temporal shipped an official integration with the [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/), announced in Public Preview on **30 July 2025** as a Python SDK feature, per [Temporal's own changelog entry](https://temporal.io/change-log/open-ai-agents-sdk-integration-pp). It reached **General Availability on 23 March 2026** for the Python SDK — the date given in an update note at the top of [Temporal's announcement post](https://temporal.io/blog/announcing-openai-agents-sdk-integration): "As of March 23rd, 2026, the integration between the OpenAI Agents SDK and Temporal's Python SDK is now Generally Available." A companion sandbox integration, extending the pattern to sandboxed tool/code execution, entered its own Public Preview on **16 April 2026**, per [Temporal's changelog](https://temporal.io/changelog/openai-agents-sdk-sandbox-integration-public-preview). As of this writing, the equivalent TypeScript SDK integration is still marked pre-release in [Temporal's TypeScript integration docs](https://docs.temporal.io/develop/typescript/integrations/openai-agents) — the GA milestone applies to the Python SDK specifically.

The integration maps directly onto the Workflow/Activity split above, and Temporal's own TypeScript integration docs state the division exactly: "Agent orchestration — the agent loop, tool selection, and handoffs — runs inside the Workflow," while "model calls run as Activities," which means they "retry durably and are not repeated during Workflow replay." Concretely:

| Runs as | Includes |
|---|---|
| Workflow code | The agent loop, which tool to call next, handoff logic between agents |
| Activity code | Each individual call to the model, executed through a dedicated model Activity (the Python SDK's `ModelActivity`) |

Because every model call is an Activity, it gets Temporal's standard Activity guarantees for free: automatic retries on transient failure, configurable timeouts, and — the detail that matters most for cost and correctness — its result is recorded in Event History once it completes. On replay after a Worker restart, the Workflow does not re-invoke the model for a step whose result is already in the Event History; it reuses the recorded result and only calls the model again for a step that was genuinely still in flight when the crash happened. For a multi-step agent task, that is the difference between a restart costing one re-run step and a restart re-billing and re-running every LLM call the agent had already made.

This is a stronger guarantee than "wrap the agent loop in a retry decorator." A retry that re-runs the whole function from the top has no memory of which of the twelve tool calls inside it already succeeded — it either re-does all of them (wasting time, money, and risking non-idempotent side effects like double-sending an email) or the developer hand-writes their own checkpointing to avoid that, which is exactly the bookkeeping durable execution exists to remove.

## When you need this, and when you don't

Durable execution solves one specific problem: a multi-step task whose state must survive the death of the process running it, over a timescale from minutes to days. Not every agent task has that problem.

**You need it when:**

- The task spans a real-world wait — a rate-limited API, a slow deployment, a human approval step — long enough that the process plausibly gets recycled, rescheduled, or redeployed before the task finishes.
- The task has multiple side-effecting steps where re-running an already-completed step is wrong (charging a customer twice, provisioning a resource twice, sending a notification twice) rather than merely wasteful.
- The task's cost of re-doing already-completed LLM calls from scratch — in tokens, in wall-clock time, in flakiness from re-querying a model — is high enough to matter.
- The system needs to answer "what did the agent already do, and in what order" after the fact, for debugging or for an audit trail, rather than trusting whatever partial state happened to survive.

**You don't need it when the task is short, stateless, and idempotent enough to just re-run.** A single scaffolder template execution invoked through the pattern described in [Backstage as an agent interface](/guides/backstage-as-an-agent-interface/) — one call, one scoped token, one deterministic outcome checked against the resulting entity — does not need a durable execution engine sitting underneath it. Neither does a script that reads some input, calls a model once, and writes an output: if it dies, running it again from the top costs one model call and produces the same result. Introducing a Workflow engine for that adds an operational dependency (a Temporal Service, Workers to run, an Event History to reason about) without buying anything, because there is no meaningful "state" for a crash to lose beyond the single request already in flight.

The general principle underneath both cases is the same one that applies to any pipeline: a process exiting successfully, or a step appearing to complete, is not proof that the underlying work is durably recorded anywhere durable execution engines can be checked against. [Proving a deployment landed](/guides/proving-a-deployment-landed/) makes this argument for CI/CD pipelines specifically — a green pipeline proves a job exited zero, not that an artefact reached production. Durable execution for agents is the same distinction one layer down: an agent loop returning without error is not proof that every step it took is recorded anywhere that survives the process exiting.

## Beyond Temporal

Temporal is not the only durable execution platform, and it is not the only one with an official OpenAI Agents SDK integration. The pattern — persist progress outside the executing process, replay from a log on restart — is a general one that predates agent workloads; it is the same problem long-running business processes and Sagas have always had, which is what a [workflow engine](/glossary/workflow-engine/) exists to solve.

OpenAI's own Agents SDK documentation lists four durable-execution integrations side by side, under "Durable execution integrations and human-in-the-loop": Dapr, Temporal, Restate, and DBOS. Each wraps the same agent loop in its own primitives instead of leaving a team to build that mapping by hand — Dapr wraps agents with a `DaprWorkflowAgentRunner` where each tool call becomes a durable workflow activity, Restate uses a `DurableRunner` plus a journal that replays on crash, and DBOS provides `DBOSRunner.run`/`run_sync` alongside `@DBOS.workflow` and `@DBOS.step` decorators. Microsoft also ships a comparable integration for Azure Durable Functions, still in Preview as of this writing (per [its documentation in the `azure-functions-durable-python` repository](https://github.com/Azure/azure-functions-durable-python/tree/dev/docs/openai_agents)). Temporal's integration stands out within this group for having an explicit, dated GA announcement (March 23, 2026, for the Python SDK — the others don't publish an equivalent maturity label as of this writing) and for how thoroughly its Workflow/Activity split is documented — not for being the only platform offering the pattern. AWS Step Functions and Google Cloud Workflows are further cloud-native examples of the same durable-log-plus-replay idea, though as of this writing neither ships an equivalent first-party OpenAI Agents SDK integration.

## Sources

1. Temporal, "Event History": [https://docs.temporal.io/encyclopedia/event-history](https://docs.temporal.io/encyclopedia/event-history)
2. Temporal, "Understanding Temporal": [https://docs.temporal.io/evaluate/understanding-temporal](https://docs.temporal.io/evaluate/understanding-temporal)
3. Temporal, "Production-ready agents with the OpenAI Agents SDK + Temporal" (blog, GA update note dated March 23, 2026): [https://temporal.io/blog/announcing-openai-agents-sdk-integration](https://temporal.io/blog/announcing-openai-agents-sdk-integration)
4. Temporal, "OpenAI Agents SDK Integration is now in Public Preview" (changelog, July 30, 2025): [https://temporal.io/change-log/open-ai-agents-sdk-integration-pp](https://temporal.io/change-log/open-ai-agents-sdk-integration-pp)
5. Temporal, "OpenAI Agents SDK sandbox integration is in Public Preview" (changelog, April 16, 2026): [https://temporal.io/changelog/openai-agents-sdk-sandbox-integration-public-preview](https://temporal.io/changelog/openai-agents-sdk-sandbox-integration-public-preview)
6. Temporal, "OpenAI Agents SDK integration" (TypeScript SDK docs, Workflow/Activity split): [https://docs.temporal.io/develop/typescript/integrations/openai-agents](https://docs.temporal.io/develop/typescript/integrations/openai-agents)
7. Temporal, `OpenAIAgentsPlugin` API reference (Python SDK): [https://python.temporal.io/temporalio.contrib.openai_agents.OpenAIAgentsPlugin.html](https://python.temporal.io/temporalio.contrib.openai_agents.OpenAIAgentsPlugin.html)
8. OpenAI, "Running agents" (Agents SDK docs — lists the Dapr, Temporal, Restate, and DBOS durable-execution integrations): [https://openai.github.io/openai-agents-python/running_agents/](https://openai.github.io/openai-agents-python/running_agents/)
9. Microsoft, "OpenAI Agent SDK Integration with Azure Durable Functions (Preview)": [https://github.com/Azure/azure-functions-durable-python/tree/dev/docs/openai_agents](https://github.com/Azure/azure-functions-durable-python/tree/dev/docs/openai_agents)

## Further reading

- [Temporal](/tools/temporal/): the durable execution platform this guide uses as its worked example.
- [Workflow engine](/glossary/workflow-engine/): the broader concept Temporal is one implementation of.
- [Proving a deployment landed](/guides/proving-a-deployment-landed/): the same "process success isn't proof of durable work" argument, applied to CI/CD.
- [Backstage as an agent interface](/guides/backstage-as-an-agent-interface/): the simpler pattern to use when a task doesn't need durable execution at all.
- [Agent identity and authorization](/guides/agent-identity-and-authorization/): a durable Workflow still needs its own scoped credentials for the Activities it calls.
- [Model Context Protocol](/glossary/model-context-protocol/): the tool-calling protocol most agent loops sit on top of, orthogonal to whether the loop itself is durable.
