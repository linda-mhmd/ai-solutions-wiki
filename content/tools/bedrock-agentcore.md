---
title: "Amazon Bedrock AgentCore - Serverless AI Agent Hosting"
description: "How Amazon Bedrock AgentCore provides managed infrastructure for building and running AI agents at scale without managing servers, and why it replaces Bedrock Agents Classic for new builds."
date: 2026-03-25
categories: [Tools]
tags: ["ai-agents", "advanced", "bedrock-agentcore", "aws", "agent-runtime", "tool-use", "memory", "aws-service"]
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Amazon Bedrock AgentCore is AWS's platform for building, deploying, and operating AI agents in production with any framework and any foundation model. Rather than building your own agent execution infrastructure (managing compute, scaling, state persistence, and tool invocation), AgentCore provides these capabilities as modular managed services. Agents run serverlessly in isolated microVMs with consumption-based pricing: billing is per second for the CPU and memory a session actually uses, and CPU is not charged while the agent waits on model responses or tool calls.

AgentCore is also AWS's recommended migration path for Amazon Bedrock Agents, which was renamed Bedrock Agents Classic and closed to new customers on 30 July 2026.

Official documentation: https://aws.amazon.com/bedrock/agentcore/

## Watch: Bedrock AgentCore (documentation overview)
{{< video src="screencasts/AgentCore.mp4" title="Amazon Bedrock AgentCore: AWS documentation overview" caption="A short walkthrough of AgentCore, the managed runtime where AI agents plan, use tools, and run." >}}

The garden way to picture it: an agent crew is a specialist garden team. Each member does one job, checks the others, and hands the work on.

{{< video src="garden/agents-robot-crew.mp4" metaphor="true" title="The garden metaphor" caption="A crew of specialist agents, each with one job. From the AI Film Crew course." >}}

## What AgentCore Provides

**Managed agent harness** - For config-first agents, the AgentCore harness runs the agent loop for you: sending messages to the foundation model, routing tool calls, capturing results, and continuing until the agent reaches a final answer or a stop condition. You declare the model, system prompt, and tools; each session runs in an isolated microVM.

**Runtime for code-defined agents** - AgentCore Runtime hosts your own agent code (any framework) in serverless microVMs with session isolation, built-in identity, and support for long-running asynchronous work. The next-generation Runtime, generally available since 18 September 2026 (opt in with `platformVersion` `V2`), reclaims unused memory during a session so you pay for actual rather than peak memory, and restores new instances from a snapshot for consistent cold starts. At launch it was available in us-east-1, us-east-2, us-west-2, eu-west-1, and ap-northeast-1.

**Tools: Gateway, Code Interpreter, Browser** - AgentCore Gateway turns APIs, Lambda functions, and existing services into Model Context Protocol (MCP) tools and connects to existing MCP servers. Code Interpreter provides an isolated sandbox for executing code, and Browser provides a managed cloud browser for web interaction.

**Session management** - AgentCore maintains conversation state across turns within a session. Multi-turn conversations work without your application managing conversation history manually. Sessions have configurable TTLs.

**Memory integration** - AgentCore Memory provides short-term memory for multi-turn conversations and long-term memory (facts about the user, previous interactions, established preferences) that persists across sessions and can be shared across agents.

**Governance and operations** - Identity (agent authentication against existing IdPs such as Cognito, Okta, or Entra ID), Policy (deterministic rules on what agents may do), Observability, Evaluations, Optimization, Registry (a catalog of agents, MCP servers, and tools), and Payments round out the platform.

## Supported Frameworks

AgentCore has first-class support for several frameworks:

- **Strands Agents** - the AWS-native agent framework designed specifically for AgentCore deployment
- **LangGraph** - state machine-based agent framework; AgentCore can host LangGraph workflows
- **CrewAI** - multi-agent crew orchestration with adapter support
- **LlamaIndex** - RAG-focused framework with AgentCore deployment path
- **Pydantic AI** - type-safe agent framework with Bedrock backend support

AgentCore Runtime is framework- and model-agnostic, so agents built with other frameworks (or none) can run on it as well.

## When to Use AgentCore vs Self-Hosted

AgentCore makes sense when:
- You want AWS to manage scaling and availability
- Your agents run on unpredictable schedules with variable load
- You want built-in session management without a database

Self-hosted (Lambda + DynamoDB, ECS task) makes sense when:
- You need custom execution environments or specific dependencies
- You want full control over the execution loop for complex orchestration
- Cost predictability at very high volumes matters more than operational simplicity

## Integration with Bedrock Services

AgentCore connects to Bedrock Knowledge Bases (for retrieval, including through Gateway), Bedrock Guardrails (for output safety, enforceable through Gateway), and Amazon CloudWatch (for agent execution traces via AgentCore Observability). The complete agent call - including model invocations, tool calls, and retrieved context - appears as a structured trace in CloudWatch.

## Sources

1. AWS. "What is Amazon Bedrock AgentCore?" AgentCore Developer Guide, accessed 25 September 2026. https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html
2. AWS What's New. "The new AgentCore Runtime is now available in Amazon Bedrock AgentCore." 18 September 2026. https://aws.amazon.com/about-aws/whats-new/2026/09/new-agentcore-runtime-generally-available/
3. AWS. "Amazon Bedrock AgentCore pricing." Accessed 25 September 2026. https://aws.amazon.com/bedrock/agentcore/pricing/
4. AWS. "Amazon Bedrock Agents Classic maintenance mode." Accessed 25 September 2026. https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html

## Related Articles

- [Amazon Bedrock]({{< relref "amazon-bedrock.md" >}}) - foundation models that agents use
- [Strands Agents]({{< relref "strands-agents.md" >}}) - AWS-native framework for AgentCore
- [MCP Protocol]({{< relref "mcp-protocol.md" >}}) - tool interface standard agents use
