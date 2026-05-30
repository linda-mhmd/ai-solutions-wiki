---
title: "Rasa - Open-Source Conversational AI Framework"
description: "Rasa is an open-source framework for building contextual AI assistants and chatbots with natural language understanding and dialogue management."
date: 2026-03-28
categories: [Tools]
tags: [open-source, chatbot, conversational-ai, nlu, dialogue, virtual-assistant]
related:
  - tools/amazon-lex
  - tools/amazon-connect
  - tools/langchain
  - tools/langgraph
last_updated: 2026-05-30
---

Rasa is an open-source machine learning framework for building contextual AI assistants and chatbots that go beyond simple FAQ retrieval to handle complex, multi-turn conversations. The framework provides two core capabilities: natural language understanding (NLU) for intent classification and entity extraction, and dialogue management for determining the next action in a conversation based on context, history, and business logic. This combination allows developers to build assistants that maintain context across conversation turns and handle unexpected user inputs gracefully.

Rasa's architecture separates NLU (understanding what users say) from dialogue policies (deciding what to do next). The NLU pipeline is configurable, supporting transformer-based models (DIET classifier), traditional ML classifiers, and pre-trained language model embeddings. Dialogue management uses machine learning policies (TED - Transformer Embedding Dialogue) alongside rule-based policies for deterministic flows, giving developers a hybrid approach that combines the flexibility of ML with the predictability of business rules. Rasa also provides integration with external knowledge bases, custom actions for API calls and business logic, and channels for deploying to web chat, Slack, Facebook Messenger, Telegram, and other messaging platforms.

Rasa is used by enterprises in banking, healthcare, telecommunications, and insurance for customer service automation, internal helpdesks, and process automation. Organizations including Deutsche Telekom, Adobe, and various healthcare providers have deployed Rasa-powered assistants. Rasa Pro, the commercial offering, adds enterprise features including analytics, CALM (Conversational AI with Language Models) for LLM-powered dialogue, and deployment management.

## Key Capabilities

- **NLU Pipeline** - Configurable intent classification and entity extraction using transformer-based models (DIET) and customizable components
- **Dialogue Management** - ML-based (TED) and rule-based policies for managing multi-turn conversations with context tracking
- **Custom Actions** - Python-based action server for integrating business logic, API calls, database queries, and external services
- **Multi-Channel Deployment** - Connectors for web chat, Slack, Microsoft Teams, Facebook Messenger, Telegram, and custom channels

## Cloud Equivalents

Rasa is the open-source alternative to AWS Lex, Google Dialogflow, and Azure Bot Service. Cloud chatbot services offer faster setup and managed infrastructure with pay-per-request pricing, while Rasa provides full control over conversation data, custom ML models, on-premises deployment, and the ability to build highly specialized conversational experiences.

## Origins and History

Rasa was founded in 2016 by Alexander Weidauer and Alan Nichol in Berlin, Germany. The first open-source release of Rasa NLU was in 2017, followed by Rasa Core (dialogue management) later that year. The projects were unified as Rasa Open Source in 2019. Rasa is licensed under the Apache License 2.0. The company has raised over $70 million in venture funding. Rasa 3.0 (2022) introduced a new graph-based architecture for more flexible pipeline customization, and Rasa Pro subsequently integrated LLM capabilities for more natural conversational flows.

## Sources

1. https://rasa.com/
2. https://github.com/RasaHQ/rasa
