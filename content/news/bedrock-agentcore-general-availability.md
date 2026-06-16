---
title: "Amazon Bedrock AgentCore Goes GA, Then Adds Policy, Evaluations, and Payments"
description: "Bedrock AgentCore reached general availability on October 13, 2025, with Runtime, Memory, Gateway, Identity, and Observability. Here is what arrived since."
date: 2025-10-13
lastmod: 2026-06-15
last_updated: 2026-06-15
categories: [News]
tags: ["aws", "bedrock", "ai-agents", "agentcore", "agentic-ai", "governance", "intermediate"]
related:
  - glossary/aws-agentcore
  - glossary/ai-agent
  - tools/strands-agents
  - tools/amazon-bedrock
---

Building an agent in a notebook is easy. Running it in production, securely, with memory that survives restarts, identity it does not control, and a record of what it did, is the hard part. Amazon Bedrock AgentCore is AWS's answer to that gap: a set of managed services for deploying and operating agents built with any framework, model, or protocol. It reached general availability on October 13, 2025, and over the following eight months AWS layered on the governance and transaction pieces that production teams actually ask for.

## What happened

AgentCore went GA on October 13, 2025 with five composable services: Runtime (managed, isolated execution for agents), Memory (short and long term context that persists across sessions), Gateway (turning APIs and Lambda functions into agent tools), Identity (secure access to AWS and third party resources), and Observability (tracing and metrics for agent behavior). At GA, all AgentCore services gained support for Amazon Virtual Private Cloud (VPC), AWS PrivateLink, AWS CloudFormation, and resource tagging, and Runtime added support for the Agent-to-Agent (A2A) protocol.

Two governance capabilities followed in preview on December 2, 2025, and both later reached general availability:

- Policy in AgentCore became generally available on March 3, 2026. It gives security and compliance teams centralized, fine grained control over what tools an agent can call and what inputs are allowed, enforced outside the agent's own code. Policies can be written in natural language that converts to Cedar, AWS's open source policy language, and are evaluated at the Gateway, which intercepts agent to tool traffic and permits or blocks each request.
- AgentCore Evaluations became generally available on March 31, 2026. It provides automated quality assessment with built in evaluators (13 at GA) covering response quality, safety, task completion, and tool usage. It supports both online evaluation of production traffic and programmatic testing for regression checks, and integrates with AgentCore Observability.

Most recently, AgentCore Payments launched in preview on May 7, 2026. Built with Coinbase and Stripe, it lets agents transact autonomously: authenticate a wallet, set session level spending limits, then pay for APIs, MCP servers, web content, or other agents during execution, with governance and observability over the full payment lifecycle.

## Why it matters for builders

The pattern across these releases is the separation of agent logic from the operational concerns around it. You can keep writing agents in Strands, LangGraph, CrewAI, or your own loop, and let AgentCore handle the parts that are tedious and risky to build yourself.

- Governance lives outside the code. Policy means a security team can constrain tool access without touching the agent, and Cedar gives those rules a machine readable, auditable form rather than scattered if statements.
- Quality becomes measurable. Evaluations turns "it seems to work" into scored runs against defined expectations, which is what you need before and after every change.
- Autonomy gets a budget. Payments adds a spending limit as a first class control, which is the safety mechanism that makes letting an agent pay for things defensible at all.

The trade off is the usual managed service one: faster to production and less plumbing, in exchange for AWS as the operating layer and per component pricing across Runtime, Memory, Gateway, Identity, Observability, Policy, and now Payments.

## What to do

- If you are prototyping agents, try AgentCore Runtime with your existing framework before building custom hosting. The framework agnostic design means low switching cost.
- If you are heading to production, treat Identity, Observability, Policy, and Evaluations as the baseline, not extras. Define evaluators and policies early so they shape the agent rather than patch it.
- If you are considering agent transactions, note that Payments is preview, not GA. Pilot it with conservative session limits and do not put it on a critical path until it reaches general availability.
- Model the cost before you commit. AgentCore bills per component, so map which services you actually need against your expected traffic.

## Sources

1. AWS. "Amazon Bedrock AgentCore is now generally available." (Oct 13, 2025) [https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available)
2. AWS News Blog. "Make agents a reality with Amazon Bedrock AgentCore: Now generally available." [https://aws.amazon.com/blogs/aws/introducing-amazon-bedrock-agentcore-securely-deploy-and-operate-ai-agents-at-any-scale](https://aws.amazon.com/blogs/aws/introducing-amazon-bedrock-agentcore-securely-deploy-and-operate-ai-agents-at-any-scale)
3. AWS. "Amazon Bedrock AgentCore now includes Policy (preview), Evaluations (preview) and more." (Dec 2, 2025) [https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-bedrock-agentcore-policy-evaluations-preview](https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-bedrock-agentcore-policy-evaluations-preview)
4. AWS. "Policy in Amazon Bedrock AgentCore is now generally available." (Mar 3, 2026) [https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/](https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/)
5. AWS. "Amazon Bedrock AgentCore Evaluations is now generally available." (Mar 31, 2026) [https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available](https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available)
6. AWS. "Agents that transact: Amazon Bedrock AgentCore now includes Payments (preview)." (May 7, 2026) [https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-bedrock-agentcore-payments-preview/](https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-bedrock-agentcore-payments-preview/)
7. AWS News Blog. "Amazon Bedrock AgentCore adds quality evaluations and policy controls for deploying trusted AI agents." [https://aws.amazon.com/blogs/aws/amazon-bedrock-agentcore-adds-quality-evaluations-and-policy-controls-for-deploying-trusted-ai-agents/](https://aws.amazon.com/blogs/aws/amazon-bedrock-agentcore-adds-quality-evaluations-and-policy-controls-for-deploying-trusted-ai-agents/)
