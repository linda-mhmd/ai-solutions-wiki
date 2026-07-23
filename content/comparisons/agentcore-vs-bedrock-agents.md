---
title: "AWS AgentCore vs Bedrock Agents - When to Use Which AWS Agent Runtime"
description: "Architectural and operational differences between Amazon Bedrock AgentCore and Amazon Bedrock Agents, covering runtime model, framework neutrality, identity, memory, and observability."
date: 2026-05-08
lastmod: 2026-06-14
last_verified: 2026-06-14
categories: [Comparisons]
tags: [comparisons, agents, AWS, bedrock, agentcore, multi-agent, AI architecture]
last_updated: 2026-06-14
---

Both Amazon Bedrock AgentCore and Amazon Bedrock Agents let teams operate AI agents on AWS, but they sit at different layers of the stack and target different operating models. Bedrock Agents is a managed, opinionated agent service tightly bound to the Bedrock control plane. AgentCore is a runtime and a set of services for operating agents you build with any framework. The choice depends on whether you want a turnkey agent definition or a runtime substrate for agents you already own.

> **Lifecycle note (July 2026):** AWS renamed the original service to Amazon Bedrock Agents Classic and closed it to new customers from 30 July 2026, pointing new work to AgentCore. Its model catalog is frozen and no end-of-life date is set, so existing agents keep running, but for a new build the decision below now resolves to AgentCore. This comparison is kept for teams still operating Bedrock Agents Classic. See the [2026 AWS lifecycle wave](/news/aws-service-deprecations-2026/).

## Core Architectural Difference

**Amazon Bedrock Agents** is a managed agent service. You declare an agent in the Bedrock console or via API: a foundation model, instructions, action groups (Lambda-backed APIs), knowledge bases, and optional guardrails. AWS handles orchestration, tool invocation, knowledge retrieval, and trace generation. The agent definition lives inside Bedrock; the framework is implicit.

**Amazon Bedrock AgentCore** is a runtime layer. It does not define how the agent reasons. Instead, it provides modular services your agent code consumes: AgentCore Runtime (sandboxed serverless execution with long-running session affinity), AgentCore Identity (token vending and OAuth flows for agents acting on behalf of users), AgentCore Memory (short- and long-term memory stores), AgentCore Gateway (turns APIs, AWS Lambda functions, and existing services into Model Context Protocol tools, and connects to pre-existing MCP servers), AgentCore Browser, AgentCore Code Interpreter, and AgentCore Observability. AgentCore became generally available on October 13, 2025, and the service set has since grown to include AgentCore Policy (deterministic, Cedar- or natural-language-based controls over tool calls), AgentCore Evaluations (automated agent quality scoring), and AgentCore Payments (managed microtransactions so agents can pay for paid APIs and content). You bring the agent: written in Strands Agents, LangGraph, CrewAI, LlamaIndex, the OpenAI Agents SDK, Google ADK, or your own framework: and AgentCore runs and operates it.

Put differently: Bedrock Agents is an opinionated abstraction; AgentCore is unopinionated infrastructure.

## Framework Neutrality

Bedrock Agents has one model, the Bedrock agent definition. You configure, you do not write the orchestration loop. This is fast for simple agents and limits surface area for misconfiguration, but escape hatches are limited if your reasoning loop diverges from the supported pattern.

AgentCore is framework-agnostic. Strands Agents is the AWS-native default, but a LangGraph or CrewAI agent runs on AgentCore Runtime with the same operational guarantees. The runtime works with any foundation model, inside or outside Amazon Bedrock (Anthropic Claude, Amazon Nova, current frontier models from OpenAI and Google, Meta Llama, and Mistral among them), and supports the Model Context Protocol (MCP) and Agent-to-Agent (A2A) protocols. This matters when:

- Existing agent code already uses an OSS framework
- The reasoning loop needs custom planning, branching, or critique steps
- The team wants to evolve frameworks without re-platforming

If you do not already have an agent codebase, this neutrality is less valuable.

## Runtime and Session Model

Bedrock Agents executes inside the managed service. You do not provision compute; pricing follows the underlying model and Lambda invocations.

AgentCore Runtime is a serverless execution environment with first-class support for long-running sessions, large payloads, and durable state. Each session can run for up to eight hours, accommodating workflows that pause for human review or external events. The runtime is single-tenant per session, with isolated execution. This makes AgentCore better-suited to multi-step, long-horizon agent workflows than Lambda-backed Bedrock Agents action groups.

AgentCore uses consumption-based pricing with no upfront commitments or minimum fees. Runtime, Browser, and Code Interpreter bill on active CPU (vCPU-hour) and memory (GB-hour) consumption, so idle wait time while a session pauses for I/O is not charged; Gateway, Memory, Identity, and Policy bill per usage unit such as invocations and records. Foundation model inference is billed separately on top. Always check the AgentCore pricing page for current rates.

## Identity and Tool Authorization

Bedrock Agents performs tool calls through Lambda-backed action groups. Authorization is at the Lambda execution role level, the agent does not act under a user identity by default.

AgentCore Identity gives agents an OAuth-aware identity broker that is compatible with existing identity providers (Amazon Cognito, Okta, Microsoft Entra ID, Auth0, and others). The agent can request tokens scoped to the calling user, so downstream API calls happen under the user's identity, not a shared service role, with refresh tokens held in a secure vault. This is the right primitive for agents acting on behalf of authenticated end-users in enterprise environments.

## Memory

Bedrock Agents has session memory tied to the agent invocation lifecycle, plus knowledge bases for retrieval over indexed documents.

AgentCore Memory provides explicit short-term (session) and long-term (cross-session) memory stores with strategy-driven extraction (user preferences, semantic facts, summaries). This is closer to what production agent applications actually need: persistent user models that survive across sessions, with documented retention semantics.

## Observability

Bedrock Agents emits invocation traces visible in the Bedrock console.

AgentCore Observability is built on OpenTelemetry, with structured traces for reasoning steps, tool calls, memory reads, and identity flows. Traces are exportable to Amazon CloudWatch, Datadog, Langfuse, or any OTLP-compatible backend. For teams already operating with a tracing standard, this is meaningfully better than service-specific traces.

## Governance and Quality

Bedrock Agents covers safety primarily through Amazon Bedrock Guardrails applied to the underlying model.

AgentCore adds two services aimed at production governance. AgentCore Policy (generally available March 3, 2026) intercepts Gateway tool calls before they run and enforces fine-grained rules authored in natural language or in Cedar, AWS's open-source policy language, independent of how the agent was built. AgentCore Evaluations (generally available March 31, 2026) scores agent quality with built-in and custom evaluators (correctness, helpfulness, tool-selection accuracy) over real sessions, traces, and spans, feeding results back into Observability. For agents that need auditable controls and continuous quality measurement in production, these are first-class building blocks rather than bolt-ons.

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
| Framework | Implicit (Bedrock-defined) | Any (Strands Agents, LangGraph, CrewAI, LlamaIndex, etc.) |
| Session length | Short, stateless beyond session | Up to 8 hours, durable |
| Identity | Lambda role | OAuth identity broker per user |
| Memory | Session memory + knowledge bases | Short-term + long-term, strategy-driven |
| Observability | Bedrock traces | OpenTelemetry, exportable |
| Governance | Bedrock Guardrails | Policy (Cedar/natural language) + Evaluations |
| Pricing | Model + Lambda usage | Consumption-based per service |
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
- AWS (2025). *Amazon Bedrock AgentCore overview (core services and supported frameworks).* [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- AWS (2025). *Amazon Bedrock AgentCore is now generally available (October 13, 2025; adds A2A, MCP server connectivity, VPC, PrivateLink, CloudFormation).* [https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available)
- AWS. *Amazon Bedrock AgentCore pricing.* [https://aws.amazon.com/bedrock/agentcore/pricing/](https://aws.amazon.com/bedrock/agentcore/pricing/)
- AWS (2026). *Amazon Bedrock AgentCore adds quality evaluations and policy controls for trusted AI agents.* [https://aws.amazon.com/blogs/aws/amazon-bedrock-agentcore-adds-quality-evaluations-and-policy-controls-for-deploying-trusted-ai-agents/](https://aws.amazon.com/blogs/aws/amazon-bedrock-agentcore-adds-quality-evaluations-and-policy-controls-for-deploying-trusted-ai-agents/)
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
