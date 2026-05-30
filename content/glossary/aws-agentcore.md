---
title: "Amazon Bedrock AgentCore"
description: "Amazon Bedrock AgentCore is a managed runtime and governance layer for deploying, operating, and securing AI agents at enterprise scale on AWS."
date: 2026-03-28
categories: [Glossary]
tags: [aws, bedrock, agentcore, ai-agents, agentic-ai, managed-runtime]
related:
  - glossary/ai-agents
  - glossary/agentic-ai
  - glossary/multi-agent-systems
  - glossary/multi-agent-orchestration
last_updated: 2026-05-30
---

Amazon Bedrock AgentCore is an AWS service that provides enterprise-grade infrastructure for deploying, operating, and governing AI agents at scale. Rather than requiring teams to build their own agent hosting, observability, and policy enforcement systems, AgentCore provides a managed runtime, gateway, memory, identity, and evaluation layer that works with any agent framework and any model. AgentCore represents a strategic shift in AWS's AI offering from model APIs to agent infrastructure.

## Origins and History

Amazon Bedrock AgentCore was first announced as a preview in 2025 and became generally available on October 13, 2025 [1]. AWS significantly expanded the service at re:Invent 2025, held November 30 through December 4 in Las Vegas, where AgentCore was a centerpiece of the conference's AI announcements [2]. The re:Invent keynotes positioned AgentCore as the governance and trust layer that makes autonomous AI acceptable to enterprises, reflecting a broader industry shift from building individual AI models to building the infrastructure needed to run AI agents reliably in production.

The launch addressed a fundamental gap in the AI tooling landscape. By late 2025, numerous frameworks existed for building agents (LangGraph, CrewAI, AutoGen, custom implementations), but the operational concerns of running those agents in production, including identity management, policy enforcement, observability, and scaling, were left to each team to solve independently. AgentCore provides a framework-agnostic platform layer for these operational concerns.

## Core Components

**AgentCore Runtime** provides managed compute for hosting agents built with any framework. It handles scaling, deployment, and lifecycle management. The runtime supports bidirectional streaming for voice agent use cases, where agents simultaneously listen and respond while handling interruptions and context changes mid-conversation. The runtime also supports the Agent-to-Agent (A2A) protocol for inter-agent communication.

**AgentCore Gateway** acts as an intermediary for all tool calls made by agents. Every API call, database query, or external service invocation passes through the gateway, enabling centralized logging, rate limiting, and policy enforcement.

**AgentCore Policy** (preview) enables organizations to define boundaries for agent actions using natural language rules that are automatically converted to Cedar, the AWS open-source policy language [3]. For example, a policy might permit an agent to issue refunds up to one hundred dollars autonomously but require human approval for larger amounts. Policy integrates with the gateway to intercept and evaluate every tool call in real time.

**AgentCore Memory** provides agents with persistent memory across sessions. Episodic memory, announced at re:Invent 2025, enables agents to accumulate knowledge about users over time, such as travel preferences or communication style, and apply that knowledge in future interactions.

**AgentCore Evaluations** (preview) provides both on-demand evaluation for CI/CD pipelines and continuous online evaluation for production monitoring. Thirteen built-in evaluators cover dimensions including helpfulness, tool selection accuracy, and response quality. Custom model-based scoring systems can be defined for domain-specific quality criteria. Metrics are surfaced through a unified Amazon CloudWatch dashboard.

## Strategic Significance

AgentCore signals that AI infrastructure is moving beyond model hosting. The service positions AWS to capture value at the agent operations layer regardless of which models or frameworks customers choose. Enterprise features including VPC support, AWS PrivateLink, CloudFormation integration, and resource tagging reflect the production-readiness requirements of large organizations.

## Sources

1. AWS News Blog (2025). "Introducing Amazon Bedrock AgentCore: Securely deploy and operate AI agents at any scale." [https://aws.amazon.com/blogs/aws/introducing-amazon-bedrock-agentcore-securely-deploy-and-operate-ai-agents-at-any-scale/](https://aws.amazon.com/blogs/aws/introducing-amazon-bedrock-agentcore-securely-deploy-and-operate-ai-agents-at-any-scale/)
2. AWS (2025). "Top announcements of AWS re:Invent 2025." [https://aws.amazon.com/blogs/aws/top-announcements-of-aws-reinvent-2025/](https://aws.amazon.com/blogs/aws/top-announcements-of-aws-reinvent-2025/)
3. AWS (2025). "Amazon Bedrock AgentCore now includes Policy (preview), Evaluations (preview) and more." [https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-bedrock-agentcore-policy-evaluations-preview/](https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-bedrock-agentcore-policy-evaluations-preview/)
4. About Amazon (2025). "New Amazon Bedrock AgentCore capabilities." [https://www.aboutamazon.com/news/aws/aws-amazon-bedrock-agent-core-ai-agents](https://www.aboutamazon.com/news/aws/aws-amazon-bedrock-agent-core-ai-agents)
