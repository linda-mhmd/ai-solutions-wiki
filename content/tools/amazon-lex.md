---
title: "Amazon Lex - Conversational AI Interfaces"
description: "A comprehensive reference for Amazon Lex: building chatbots and voice interfaces, intent recognition, slot filling, and integration with Amazon Connect and Lambda."
date: 2026-03-28
categories: [Tools]
tags: [AWS, chatbot, conversational-AI, NLU, voice, "aws-service"]
related:
  - tools/amazon-connect
  - tools/amazon-bedrock
  - tools/aws-lambda
  - tools/azure-bot-service
  - tools/google-dialogflow
  - tools/rasa
layer: applications
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Lex is the AWS service for building conversational interfaces using voice and text. It uses deep learning for automatic speech recognition (ASR) and natural language understanding (NLU) to recognize intent and extract slot values from user input. For enterprise AI projects, Lex serves as the front-end interaction layer for chatbots, IVR systems, and automated customer service workflows.

This page covers Amazon Lex V2, the current generation of the service. Amazon Lex V1 has reached end of support: AWS stopped allowing creation of new V1 resources on 31 March 2025, and the V1 console and resources became inaccessible on 15 September 2025. Build all new work on V2.

## Plain-language foundations

If you are new to this area, a few underlying ideas make the rest of the page easier to follow:

- **Conversational interface** - software you interact with by talking or typing in ordinary language, rather than clicking buttons or filling forms. A chatbot in a website widget and an automated phone menu are both conversational interfaces.
- **Automatic speech recognition (ASR)** - turning spoken audio into text. See {{< relref "glossary/speech-to-text" >}}. The reverse, turning a text reply back into spoken audio, is text-to-speech ({{< relref "glossary/text-to-speech" >}}), which Lex uses for voice replies.
- **Natural language understanding (NLU)** - working out what a sentence means: what the user wants to do (the intent) and the key details (the values). This is the part of NLU that maps free text onto a structured action.
- **Deep learning** - the machine learning approach behind modern ASR and NLU. See {{< relref "glossary/deep-learning" >}}.

With those in place, Lex is the managed AWS service that wires ASR, NLU, and dialog management together so you can build a working bot without training your own speech or language models.

Official documentation: https://docs.aws.amazon.com/lexv2/latest/dg/  
Pricing: https://aws.amazon.com/lex/pricing/  
Service quotas: https://docs.aws.amazon.com/general/latest/gr/lex.html

## Core Concepts

**Bot** - The top-level resource. A bot contains one or more locales (language configurations), each with its own set of intents and slot types. Bots can be versioned and aliased, allowing you to develop new versions while production traffic uses a stable alias.

**Intent** - A goal the user wants to accomplish, such as "BookFlight" or "CheckOrderStatus." Each intent has sample utterances (example phrases that trigger it), slots (parameters to collect), and a fulfillment action (typically a Lambda function).

**Slot** - A parameter within an intent. For a BookFlight intent, slots might include departure city, destination city, and travel date. Lex prompts the user for missing slots automatically. Each slot has a type (built-in types like AMAZON.Date or custom types you define).

**Fulfillment** - The action taken once all required slots are filled. Lambda fulfillment is the most common pattern: Lex invokes a Lambda function with the collected slot values, and the function executes business logic and returns a response.

## Lex V2 vs V1

Lex V2 (current) introduced significant improvements over V1: multi-language support within a single bot, streaming conversation APIs, improved intent classification, and a redesigned console. Lex V1 is now end of support. AWS blocked creation of new V1 resources on 31 March 2025, and on 15 September 2025 the V1 console and resources stopped being accessible, with requests to V1 endpoints failing after that date. Any remaining V1 bots had to be migrated to V2 before then. The built-in migration tool copies custom intents and slot types and maps built-in types across, but it does not migrate aliases, Lambda functions, Amazon Kendra indexes, conversation log settings, messaging channels, or tags, so those must be reconfigured in V2.

## Integration with Amazon Connect

The most common enterprise deployment pattern pairs Lex with Amazon Connect for contact center automation. Connect handles telephony (receiving calls, managing queues, routing to agents), while Lex handles the conversational logic. A typical flow: the customer calls, Connect plays a greeting, Lex identifies the intent ("I want to check my order status"), collects the order number, calls a Lambda function to look up the order, and returns the status. If Lex cannot resolve the issue, it hands off to a human agent with full conversation context.

This pattern reduces average handle time by resolving simple queries without agent involvement. The amount deflected from human agents depends heavily on scope, and well-defined, repetitive use cases (order status, account balance, appointment scheduling) deflect the most. Lex V2 now includes a dedicated built-in intent (the Q in Connect intent) that connects a bot directly to Amazon Connect for contact center experiences, alongside Amazon Connect's own native Lex integration in contact flows.

## Adding Generative AI with Bedrock

Lex V2 integrates with Amazon Bedrock (the AWS managed service for foundation models, see {{< relref "glossary/foundation-models" >}}) to handle queries that fall outside defined intents. Instead of returning a fallback "I didn't understand that" message, Lex can route unmatched utterances to a Bedrock foundation model that generates responses from a knowledge store. This hybrid approach provides deterministic handling for structured workflows (intent-based) and flexible handling for open-ended questions (generative).

The main option is the `AMAZON.QnAIntent` built-in intent. It activates when an utterance is not classified into any other intent, then uses a Bedrock model to search a configured knowledge store and answer the question. This is a managed form of retrieval augmented generation (see {{< relref "glossary/rag" >}}): the model answers from your documents rather than from its training data alone, and responses include source attribution. The knowledge store can be an Amazon Bedrock Knowledge Base (see {{< relref "glossary/knowledge-base" >}}), an Amazon OpenSearch Service domain, or an Amazon Kendra index. Note that you cannot use `AMAZON.QnAIntent` and `AMAZON.KendraSearchIntent` in the same bot locale. You can apply Amazon Bedrock Guardrails to the intent for content filtering, and tune the model with temperature, topP, and maxTokens settings.

Beyond simple FAQ answering, two newer capabilities extend the generative integration:

- **AMAZON.BedrockAgentIntent** - connects a Lex bot to an Amazon Bedrock Agent and its Knowledge Bases, so the bot can hand a turn to an agent that performs multi-step reasoning and tool calls.
- **Assisted NLU** - uses large language models to improve intent classification and slot resolution while staying within the intents and slots you have defined, rather than answering freely. It raises recognition accuracy without giving up the deterministic, in-scope behaviour that contact centers need.

Additional builder-side generative features include a descriptive bot builder (generate a bot from a plain-language description), utterance generation (auto-create sample utterances), and assisted slot resolution.

## Conversation Design Best Practices

Start with a narrow scope. A bot that handles three intents well is more valuable than one that handles twenty poorly. Map the most common customer queries from support tickets or call logs, and build intents for those first.

Design for failure. Users will say unexpected things. Configure the `AMAZON.FallbackIntent` with a helpful response that either clarifies what the bot can do or offers to connect to a human agent. Never let the user hit a dead end.

Use confirmation prompts for high-stakes actions. If the bot is going to cancel an order or transfer funds, require explicit confirmation before fulfillment.

Test with real utterance data. Export utterances from production traffic and use them to identify missed intents and improve slot recognition accuracy. The built-in Test workbench lets you create and run test sets to measure recognition metrics, and the Analytics dashboard reports intent and slot performance over time.

Best practices: because Lex is a managed machine learning service, the AWS Well-Architected [Machine Learning Lens](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html) is the authoritative reference for architecting it well across reliability, security, performance, cost, and operations. For the generative pieces (QnA intent, Bedrock Agent intent), pair it with the AWS Well-Architected [Generative AI Lens](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html). See also the wiki overview of the {{< relref "foundations/well-architected" >}}.

## Recent developments

Recent additions to Lex V2 (2024 to 2026) worth knowing:

- **Generative AI integration with Bedrock** matured: the `AMAZON.QnAIntent` now supports Amazon Bedrock Knowledge Bases and Bedrock Guardrails, and the new `AMAZON.BedrockAgentIntent` connects bots to Bedrock Agents.
- **Assisted NLU** uses LLMs to raise intent and slot accuracy while staying in scope.
- **Global resiliency** replicates a bot to a second AWS Region for higher availability and disaster recovery.
- **Custom vocabulary** expanded to 17 additional languages, and the `AMAZON.Currency` and `AMAZON.Confirmation` built-in slot types now work in all locales.
- **Lex V1 reached end of support** (new resources blocked 31 March 2025, console and endpoints retired 15 September 2025).

For the authoritative running list, see the official latest features page linked below.

## Pricing

Lex is pay as you go with no upfront cost or minimum fee: you are charged per request, and speech (voice) requests cost more than text requests. Streaming conversations are billed in fixed time intervals rather than per single request. New AWS accounts get a Free Tier allowance toward Lex (AWS changed its Free Tier model on 15 July 2025 to a credit-and-time-based plan for new accounts, so the exact allowance depends on when the account was created). Because costs scale with request volume, model the expected number of requests carefully for high-volume contact center deployments, and remember that the generative features add separate Amazon Bedrock charges for model inference. Check the live [Amazon Lex pricing page](https://aws.amazon.com/lex/pricing/) for current per-request rates, since they change by Region and over time.

## Sources

- Amazon Lex V2 Developer Guide (official documentation): https://docs.aws.amazon.com/lexv2/latest/dg/
- Amazon Lex V2 latest features: https://docs.aws.amazon.com/lexv2/latest/dg/latest-features.html
- AMAZON.QnAIntent built-in intent reference: https://docs.aws.amazon.com/lexv2/latest/dg/built-in-intent-qna.html
- Amazon Lex pricing: https://aws.amazon.com/lex/pricing/
- Amazon Lex endpoints and quotas: https://docs.aws.amazon.com/general/latest/gr/lex.html
- Migrating a bot from Lex V1 to V2: https://docs.aws.amazon.com/lex/latest/dg/migrate.html
- AWS Well-Architected Machine Learning Lens: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html
