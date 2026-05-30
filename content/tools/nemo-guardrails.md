---
title: "NeMo Guardrails - Conversational Safety Framework"
description: "A comprehensive reference for NVIDIA NeMo Guardrails: programmable safety rails for LLM conversations, Colang, topic control, and enterprise deployment patterns."
date: 2026-03-28
categories: [Tools]
tags: [nemo-guardrails, NVIDIA, safety, conversational-AI, guardrails, Colang]
related:
  - tools/guardrails-ai
  - tools/langchain
  - tools/amazon-bedrock
last_updated: 2026-05-30
---

NeMo Guardrails is an open-source toolkit from NVIDIA for adding programmable safety and control rails to LLM-powered conversational applications. While Guardrails AI focuses on output validation, NeMo Guardrails operates at the conversation level: it controls what topics the bot will discuss, screens user inputs for jailbreak attempts, enforces conversation flows, and ensures responses align with defined policies. For enterprise AI projects, NeMo Guardrails is the tool for building chatbots and assistants that stay within organizational boundaries.

Official documentation: https://docs.nvidia.com/nemo/guardrails/

## Core Concepts

**Rails** - Rules that govern the behavior of the conversational AI. Rails come in several types:

- **Input rails** - Screen user messages before they reach the LLM. Detect jailbreak attempts, off-topic queries, or harmful inputs. Block or redirect as configured.
- **Output rails** - Check LLM responses before they reach the user. Filter harmful content, enforce factual grounding, check for hallucination.
- **Dialog rails** - Define canonical conversation flows. Specify how the bot should handle specific topics, what clarifying questions to ask, and when to escalate to a human.
- **Retrieval rails** - Screen retrieved documents in RAG pipelines. Filter irrelevant or sensitive retrieved content before it reaches the LLM context.
- **Topic rails** - Define what topics the bot will and will not discuss. Block entire subject areas (politics, medical advice, competitor products) with a few lines of configuration.

**Colang** - A domain-specific language for defining conversation flows and rails. Colang uses a natural, indented syntax that reads like a conversation script:

```
define user ask about competitors
  "How does your product compare to CompetitorX?"
  "Is CompetitorX better?"
  "What about CompetitorX?"

define bot respond to competitor question
  "I can help you with questions about our products. For competitor comparisons, I'd recommend speaking with our sales team."

define flow handle competitor questions
  user ask about competitors
  bot respond to competitor question
```

**Configuration** - A YAML-based configuration that specifies which LLM to use, which rails to enable, and general settings like prompts and model parameters. Configuration files define the guardrails deployment without code changes.

## Jailbreak Detection

NeMo Guardrails includes built-in jailbreak detection that screens user inputs for common prompt injection patterns. The detection uses a combination of heuristic rules and LLM-based classification. When a jailbreak attempt is detected, the system can block the input, respond with a predefined message, or escalate to a human operator.

This is increasingly important for customer-facing chatbots where adversarial users may attempt to extract system prompts, bypass content policies, or manipulate the bot into unintended behavior.

## Fact-Checking and Grounding

The output rails include a fact-checking rail that verifies LLM responses against retrieved context or a knowledge base. If the model generates a claim not supported by the provided context, the rail blocks the response and substitutes a safer alternative (such as "I don't have enough information to answer that").

This grounding check is essential for RAG applications in regulated industries (healthcare, finance, legal) where hallucinated facts carry real risk.

## Integration Patterns

NeMo Guardrails integrates with existing LLM applications as a layer. It wraps LLM calls, adding input screening and output validation without changing the underlying model or application logic. It supports OpenAI, Azure OpenAI, Anthropic, and Hugging Face models.

For LangChain users, NeMo Guardrails provides a LangChain integration that adds rails to existing chains and agents. This means you can add conversational safety to a LangChain application without restructuring it.

## Comparison with Amazon Bedrock Guardrails

Amazon Bedrock Guardrails provides content filtering and PII detection as a managed service integrated with Bedrock. NeMo Guardrails provides more granular conversation-level control (dialog flows, topic boundaries, jailbreak detection) and runs anywhere (not tied to Bedrock). For Bedrock-based projects, both can be used together: Bedrock Guardrails for content filtering and NeMo Guardrails for conversation flow control.

## Pricing

NeMo Guardrails is open-source (Apache 2.0 license) and free. The computational overhead of running rails adds latency (typically 100-500ms per interaction for LLM-based rails). Heuristic rails add minimal latency. The LLM-based rails consume additional API calls, increasing cost proportionally.
