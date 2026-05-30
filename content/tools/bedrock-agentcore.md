---
title: "Amazon Bedrock AgentCore - Serverless AI Agent Hosting"
description: "How Amazon Bedrock AgentCore provides managed infrastructure for running AI agents at scale without managing servers."
date: 2026-03-25
categories: [Tools]
tags: ["ai-agents", "advanced", "bedrock-agentcore", "aws", "agent-runtime", "tool-use", "memory"]
last_updated: 2026-05-30
---

AWS Bedrock AgentCore is the managed runtime layer for deploying AI agents in production. Rather than building your own agent execution infrastructure (managing compute, scaling, state persistence, and tool invocation), AgentCore provides these capabilities as a managed service. Agents run serverlessly - you pay per invocation, not for idle capacity.

Official documentation: https://aws.amazon.com/bedrock/agentcore/

## What AgentCore Provides

**Managed agent runtime** - AgentCore handles the agent execution loop: sending messages to the foundation model, routing tool calls to the appropriate handlers, capturing tool results, and continuing the loop until the agent reaches a final answer or a stop condition. You define the agent (system prompt, tools, model selection) in a configuration object; AgentCore runs it.

**Tool execution environment** - Each tool is defined as a code artifact that AgentCore invokes within a secure sandbox. Tools can call AWS services, external APIs, or custom logic. AgentCore handles parallelizing tool calls when the model requests multiple tools simultaneously.

**Session management** - AgentCore maintains conversation state across turns within a session. Multi-turn conversations work without your application managing conversation history manually. Sessions have configurable TTLs.

**Memory integration** - Long-term memory (facts about the user, previous interactions, established preferences) can be stored in a managed memory store and retrieved at the start of each session. This enables agents that improve over repeated interactions.

## Supported Frameworks

AgentCore has first-class support for several frameworks:

- **Strands Agents** - the AWS-native agent framework designed specifically for AgentCore deployment
- **LangGraph** - state machine-based agent framework; AgentCore can host LangGraph workflows
- **CrewAI** - multi-agent crew orchestration with adapter support
- **LlamaIndex** - RAG-focused framework with AgentCore deployment path
- **Pydantic AI** - type-safe agent framework with Bedrock backend support

Any agent that conforms to the AgentCore tool-use interface can run on the platform regardless of the underlying framework.

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

AgentCore connects natively to Bedrock Knowledge Bases (for retrieval during tool execution), Bedrock Guardrails (for output safety), and Amazon CloudWatch (for agent execution traces). The complete agent call - including model invocations, tool calls, and retrieved context - appears as a structured trace in CloudWatch.

## Related Articles

- [Amazon Bedrock]({{< relref "amazon-bedrock.md" >}}) - foundation models that agents use
- [Strands Agents]({{< relref "strands-agents.md" >}}) - AWS-native framework for AgentCore
- [MCP Protocol]({{< relref "mcp-protocol.md" >}}) - tool interface standard agents use
