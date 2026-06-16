---
title: "Amazon Lex vs Amazon Connect for Conversational AI"
description: "Comparing Amazon Lex and Amazon Connect for building conversational AI experiences, covering use cases, NLU capabilities, and integration patterns."
date: 2026-03-28
lastmod: 2026-06-14
last_verified: 2026-06-14
categories: [Comparisons]
tags: [Amazon-Lex, Amazon-Connect, conversational-AI, chatbot, AWS, comparison]
last_updated: 2026-06-14
---

Amazon Lex and Amazon Connect are complementary services that often confuse teams evaluating conversational AI on AWS. Lex is a conversational AI engine for building chatbots and voice bots. Connect is a cloud contact center platform that can use Lex as its NLU layer. Understanding where each service fits is essential for the right architecture.

A naming note: at the What's Next with AWS event on April 28, 2026, AWS expanded Amazon Connect from a single product into a set of agentic AI solutions, and renamed the original contact center product to Amazon Connect Customer. The other members of the family (Amazon Connect Decisions for supply chain planning, Amazon Connect Talent for hiring, and Amazon Connect Health for healthcare) are separate offerings outside the scope of this comparison. Throughout this page, Connect refers to the contact center platform now branded Amazon Connect Customer, and the integration patterns with Lex are unchanged.

## Overview

| Aspect | Amazon Lex | Amazon Connect |
|---|---|---|
| Primary Purpose | Conversational AI / NLU engine | Cloud contact center platform |
| Interaction Channels | Any (via API) | Voice and chat |
| NLU | Built-in intent/slot recognition | Uses Lex for NLU |
| Voice Handling | Via integration | Native telephony |
| Agent Routing | Not included | Built-in ACD |
| Analytics | Conversation logs | Contact center analytics |
| Pricing | Per-request | Per-minute |

## What Each Service Does

Lex is a natural language understanding (NLU) engine. It recognizes user intents, extracts slot values (entities), manages conversation context, and integrates with Lambda functions for fulfillment. You define intents (what the user wants), utterances (how they say it), and slots (the data you need to extract). Lex handles both text and voice input.

Connect is a complete contact center platform. It provides phone number provisioning, IVR flows, agent routing, queue management, real-time and historical analytics, and workforce management. Connect can use Lex bots within its contact flows to handle automated interactions before routing to human agents.

## When They Work Together

The most common architecture combines both services. Connect handles the telephony and contact center infrastructure. Lex provides the conversational AI within Connect contact flows. A customer calls a Connect phone number, interacts with a Lex bot for initial intent recognition and self-service, and gets routed to a human agent if needed.

This combination is powerful for customer service automation. Lex handles common requests (order status, account balance, appointment scheduling) while Connect manages the escalation to live agents with full context transfer.

## When to Use Lex Alone

Use Lex without Connect when building chatbots for websites, mobile apps, Slack, or other messaging platforms. Lex's API-first design lets you embed conversational AI anywhere. Common standalone Lex use cases include IT helpdesk bots, internal FAQ bots, and application-embedded assistants.

Lex V2 supports multiple languages, streaming conversations, and integration with Amazon Bedrock for generative AI responses. The AMAZON.QnAIntent allows Lex to answer questions directly from a knowledge store using a Bedrock foundation model, adding generative capabilities without custom Lambda code. The supported knowledge stores are an Amazon Bedrock knowledge base, an Amazon Kendra index, or an Amazon OpenSearch Service database (see {{< relref "comparisons/kendra-vs-opensearch-rag" >}} for how those two retrieval backends differ). The QnA intent also recognizes follow-up questions from conversation history, and it can apply Bedrock Guardrails for safer responses.

Recent Lex V2 generative AI additions go beyond QnA. Assisted NLU uses large language models to improve intent classification and slot resolution while staying within the intents and slots you have defined, rather than answering freely. The AMAZON.BedrockAgentIntent built-in intent connects a Lex bot directly to Amazon Bedrock Agents and knowledge bases. A descriptive bot builder can scaffold a full bot from a natural language prompt, and assisted slot resolution and utterance generation speed up authoring.

## When to Use Connect Alone

Connect without Lex is appropriate when you need a contact center platform with traditional IVR (press 1 for sales, press 2 for support) rather than conversational AI. Small contact centers that primarily route calls to agents may not need Lex's NLU capabilities. Connect's contact flows can use DTMF input and simple branching without Lex.

## Conversational AI Capabilities

Lex provides intent classification, slot filling, context management, and dialog management. With Bedrock integration, Lex can generate natural language responses rather than returning templated text. This hybrid approach uses Lex for structured intent recognition and Bedrock for flexible response generation.

Connect adds Amazon Q in Connect, which provides agent assist functionality: real-time recommendations to human agents during calls, automated call summarization, and knowledge base search. It now also powers generative AI self-service for end customers across IVR and digital channels, so the assistant can resolve common requests before an agent is involved. Q in Connect is positioned as one of the configurable AI agents within Connect, and administrators can select the underlying large language model (for example Amazon Nova models or Anthropic Claude models) directly in the Connect web UI to tune for latency or reasoning. Amazon Connect also offers generative AI overviews and suggested responses for email conversations. These capabilities augment agents and self-service rather than replacing the contact center.

## When to Choose What

Choose Lex alone for chatbots embedded in applications, websites, or messaging platforms where you do not need contact center infrastructure. Choose Connect alone for traditional contact centers with phone routing and agent management. Choose both together for AI-powered contact centers that combine automated self-service with human agent support.

## Practical Recommendation

Most organizations evaluating conversational AI on AWS should start with Lex for the NLU component and add Connect only if they need contact center capabilities (telephony, agent routing, workforce management). For pure chatbot use cases, Lex with Lambda and Bedrock integration delivers a complete solution without Connect's overhead.

## Sources and Further Reading

- AWS. *Amazon Lex features.* [https://aws.amazon.com/lex/features/](https://aws.amazon.com/lex/features/)
- AWS. *Latest features for Amazon Lex V2 (Assisted NLU, AMAZON.BedrockAgentIntent, QnA with Bedrock Knowledge Base and Guardrails).* [https://docs.aws.amazon.com/lexv2/latest/dg/latest-features.html](https://docs.aws.amazon.com/lexv2/latest/dg/latest-features.html)
- AWS. *AMAZON.QnAIntent (Conversational FAQ) supported knowledge stores.* [https://docs.aws.amazon.com/lexv2/latest/dg/generative-qna.html](https://docs.aws.amazon.com/lexv2/latest/dg/generative-qna.html)
- AWS. *Amazon Lex pricing (per request for speech and text).* [https://aws.amazon.com/lex/pricing/](https://aws.amazon.com/lex/pricing/)
- Amazon (2026). *Amazon Connect expands into four agentic AI solutions and the contact center product becomes Amazon Connect Customer (announced April 28, 2026).* [https://www.aboutamazon.com/news/aws/amazon-connect-ai-business-set](https://www.aboutamazon.com/news/aws/amazon-connect-ai-business-set)
- AWS (2025). *Amazon Q in Connect now supports selecting LLMs directly in the Connect web UI.* [https://aws.amazon.com/about-aws/whats-new/2025/09/amazon-q-connect-selecting-llms-connect-web-ui/](https://aws.amazon.com/about-aws/whats-new/2025/09/amazon-q-connect-selecting-llms-connect-web-ui/)
