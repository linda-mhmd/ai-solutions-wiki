---
title: "AWS AgentCore vs Bedrock Agents - When to Use Which AWS Agent Runtime"
description: "Architectural and operational differences between Amazon Bedrock AgentCore and Amazon Bedrock Agents, covering runtime model, framework neutrality, identity, memory, and observability."
date: 2026-05-08
lastmod: 2026-05-08
last_verified: 2026-05-30
categories: [Comparisons]
tags: [comparisons, agents, AWS, bedrock, agentcore, multi-agent, AI architecture]
last_updated: 2026-05-30
---

Both Amazon Bedrock AgentCore and Amazon Bedrock Agents let teams operate AI agents on AWS, but they sit at different layers of the stack and target different operating models. Bedrock Agents is a managed, opinionated agent service tightly bound to the Bedrock control plane. AgentCore is a runtime and a set of services for operating agents you build with any framework. The choice depends on whether you want a turnkey agent definition or a runtime substrate for agents you already own.

## Core Architectural Difference

**Amazon Bedrock Agents** is a managed agent service. You declare an agent in the Bedrock console or via API: a foundation model, instructions, action groups (Lambda-backed APIs), knowledge bases, and optional guardrails. AWS handles orchestration, tool invocation, knowledge retrieval, and trace generation. The agent definition lives inside Bedrock; the framework is implicit.

**Amazon Bedrock AgentCore** is a runtime layer. It does not define how the agent reasons. Instead, it provides services your agent code consumes: AgentCore Runtime (sandboxed serverless execution with long-running session affinity), AgentCore Identity (token vending and OAuth flows for agents acting on behalf of users), AgentCore Memory (short- and long-term memory stores), AgentCore Gateway (tool registration and discovery), AgentCore Browser, AgentCore Code Interpreter, and AgentCore Observability. You bring the agent: written in Strands, LangGraph, CrewAI, AutoGen, LlamaIndex, or your own framework: and AgentCore runs and operates it.

Put differently: Bedrock Agents is an opinionated abstraction; AgentCore is unopinionated infrastructure.

## Framework Neutrality

Bedrock Agents has one model, the Bedrock agent definition. You configure, you do not write the orchestration loop. This is fast for simple agents and limits surface area for misconfiguration, but escape hatches are limited if your reasoning loop diverges from the supported pattern.

AgentCore is framework-agnostic. Strands is the AWS-native default, but a LangGraph or CrewAI agent runs on AgentCore Runtime with the same operational guarantees. This matters when:

- Existing agent code already uses an OSS framework
- The reasoning loop needs custom planning, branching, or critique steps
- The team wants to evolve frameworks without re-platforming

If you do not already have an agent codebase, this neutrality is less valuable.

## Runtime and Session Model

Bedrock Agents executes inside the managed service. You do not provision compute; pricing follows the underlying model and Lambda invocations.

AgentCore Runtime is a serverless execution environment with first-class support for long-running sessions, large payloads, and durable state. Each session can run for up to eight hours, accommodating workflows that pause for human review or external events. The runtime is single-tenant per session, with isolated execution. This makes AgentCore better-suited to multi-step, long-horizon agent workflows than Lambda-backed Bedrock Agents action groups.

## Identity and Tool Authorization

Bedrock Agents performs tool calls through Lambda-backed action groups. Authorization is at the Lambda execution role level, the agent does not act under a user identity by default.

AgentCore Identity gives agents an OAuth-aware identity broker. The agent can request tokens scoped to the calling user (Cognito, Okta, Microsoft Entra, GitHub, Google), so downstream API calls happen under the user's identity, not a shared service role. This is the right primitive for agents acting on behalf of authenticated end-users in enterprise environments.

## Memory

Bedrock Agents has session memory tied to the agent invocation lifecycle, plus knowledge bases for retrieval over indexed documents.

AgentCore Memory provides explicit short-term (session) and long-term (cross-session) memory stores with strategy-driven extraction (user preferences, semantic facts, summaries). This is closer to what production agent applications actually need: persistent user models that survive across sessions, with documented retention semantics.

## Observability

Bedrock Agents emits invocation traces visible in the Bedrock console.

AgentCore Observability is built on OpenTelemetry, with structured traces for reasoning steps, tool calls, memory reads, and identity flows. Traces are exportable to CloudWatch, Datadog, Langfuse, or any OTLP-compatible backend. For teams already operating with a tracing standard, this is meaningfully better than service-specific traces.

## When Bedrock Agents Fits Better

- The use case is a single agent with a small action group and a knowledge base
- Time-to-first-agent matters more than long-term flexibility
- The team prefers configuration over code
- Workflows are short-lived and stateless beyond session memory
- The agent does not need to act under end-user identity

## When AgentCore Fits Better

- An existing agent codebase exists in LangGraph, CrewAI, Strands, or similar
- Sessions are long-running (minutes to hours) or include human-in-the-loop steps
- Agents act on behalf of authenticated users and need scoped credentials downstream
- Multi-agent or graph-based reasoning is required
- Observability needs to feed an existing OpenTelemetry pipeline
- The roadmap involves swapping or evolving the agent framework

## Migration Path

The two services are not mutually exclusive. A common pattern is to prototype with Bedrock Agents, validate the use case, then migrate the orchestration loop to a framework on AgentCore Runtime when the agent outgrows the managed model. Knowledge bases, guardrails, and Bedrock-hosted models all remain accessible from AgentCore-hosted agents.

## Summary

| Dimension | Bedrock Agents | AgentCore |
|---|---|---|
| Layer | Managed agent service | Runtime + operational services |
| Framework | Implicit (Bedrock-defined) | Any (Strands, LangGraph, CrewAI, etc.) |
| Session length | Short, stateless beyond session | Up to 8 hours, durable |
| Identity | Lambda role | OAuth identity broker per user |
| Memory | Session memory + knowledge bases | Short-term + long-term, strategy-driven |
| Observability | Bedrock traces | OpenTelemetry, exportable |
| Best for | Simple, configurable agents | Custom or long-running production agents |

Choose Bedrock Agents for configuration-driven simplicity. Choose AgentCore when the agent is a real application with its own framework, identity needs, and operational requirements.

## See Also

- [AWS AgentCore (glossary)](/glossary/aws-agentcore/)
- [AI Agent (glossary)](/glossary/ai-agent/)
- [Multi-Agent Orchestration (glossary)](/glossary/multi-agent-orchestration/)
- [Tool Use](/glossary/tool-use/), [Function Calling](/glossary/function-calling/), [Model Context Protocol](/glossary/model-context-protocol/)
- [CrewAI vs LangGraph](/comparisons/crewai-vs-langgraph/)
- [CrewAI vs Strands](/comparisons/crewai-vs-strands/)
- [Single-Agent vs Multi-Agent](/comparisons/single-agent-vs-multi-agent/)
- [SageMaker vs Bedrock](/comparisons/sagemaker-vs-bedrock/)

## Sources and Further Reading

- AWS (2025). *Amazon Bedrock AgentCore developer guide.* [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/)
- AWS (2025). *AgentCore Runtime: long-running, session-aware agent execution.* [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime.html)
- AWS (2025). *AgentCore Identity: OAuth-based identity for agents.* [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html)
- AWS (2025). *AgentCore Memory: short- and long-term memory stores.* [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html)
- AWS (2025). *AgentCore Gateway and MCP integration.* [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html)
- AWS. *Amazon Bedrock Agents user guide.* [https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html)
- AWS. *Strands Agents: open-source agent framework.* [https://strandsagents.com/](https://strandsagents.com/)
- Yao, S., Zhao, J., Yu, D., et al. (2023). *ReAct: Synergizing Reasoning and Acting in Language Models.* ICLR 2023. arXiv:2210.03629. [https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)
- Schick, T., Dwivedi-Yu, J., Dessì, R., et al. (2023). *Toolformer: Language Models Can Teach Themselves to Use Tools.* NeurIPS 2023. arXiv:2302.04761. [https://arxiv.org/abs/2302.04761](https://arxiv.org/abs/2302.04761)
- Anthropic (2024). *Introducing the Model Context Protocol.* [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
- OpenTelemetry specification (the trace format AgentCore Observability emits). [https://opentelemetry.io/docs/specs/otel/](https://opentelemetry.io/docs/specs/otel/)
- AWS Well-Architected Framework, Generative AI Lens. [https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html)
