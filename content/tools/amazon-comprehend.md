---
title: "Amazon Comprehend - NLP at Scale"
description: "Sentiment analysis, entity extraction, topic modeling, and language detection with Amazon Comprehend. When to use Comprehend vs Bedrock for NLP tasks."
date: 2026-03-24
categories: [Tools]
tags: ["ai-ml", "intermediate", "nlp", "sentiment-analysis", "entity-extraction", "aws", "aws-service"]
tools: [amazon-comprehend, amazon-bedrock]
related:
  - tools/azure-cognitive-services
  - tools/google-cloud-natural-language
  - tools/spacy
layer: models
service_kind: service
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Comprehend is a managed NLP service that provides trained models for common text analysis tasks without requiring ML expertise or model training. It handles the high-volume, structured NLP tasks that would otherwise require either custom model development or expensive LLM calls.

Official documentation: https://docs.aws.amazon.com/comprehend/latest/dg/  
Pricing: https://aws.amazon.com/comprehend/pricing/  
Service quotas: https://docs.aws.amazon.com/comprehend/latest/dg/guidelines-and-limits.html

## Foundations first

If you are new to this area, a few ideas make the rest of the page easier to follow.

- **Natural language processing (NLP)** - the field of teaching computers to read, interpret, and act on human language (text and speech). Comprehend is a managed NLP service: you send text, it returns structured findings.
- **Named entity recognition** - the task of finding and labelling the things a piece of text refers to (people, places, organisations, dates). See {{< relref "glossary/tokenization" >}} for how text is first broken into the units a model reads.
- **Sentiment** - whether a piece of text expresses a positive, negative, neutral, or mixed attitude.
- **Managed (fully managed) service** - AWS owns the underlying model, servers, and scaling. You call an API and pay per request, with no model to train or infrastructure to run, unless you opt into the custom models described below.

How it fits the AI stack: Comprehend sits in the models layer. It exposes pre-trained models behind a simple API. For tasks that need reasoning or free-form generation rather than fixed classification, you reach instead for a large language model (see {{< relref "glossary/llm" >}}) through {{< relref "tools/amazon-bedrock" >}}.

## What Comprehend Does

**Sentiment analysis** - Classifies text as positive, negative, neutral, or mixed, with a confidence score for each. Works at the document level and at the entity level (targeted sentiment). Useful for customer feedback analysis, social media monitoring, and product review processing.

**Entity recognition** - Identifies and classifies named entities: people, organizations, locations, dates, quantities, events. Returns the entity text, type, and position in the document. For domain-specific entities (medical terms, legal entities, product names), Comprehend custom entity recognition allows training on your own labeled examples.

**Key phrase extraction** - Identifies the main concepts and topics in text without requiring a predefined taxonomy. Useful for search indexing and quick summarization of large text volumes.

**Language detection** - Identifies the dominant language of text with a confidence score. The detect dominant language API recognises 100+ languages. Useful as a preprocessing step before language-specific processing pipelines. Note that the analysis features (sentiment, entities, key phrases, and so on) support a smaller, fixed set of 12 languages: German, English, Spanish, Italian, Portuguese, French, Japanese, Korean, Hindi, Arabic, and Chinese (simplified and traditional). Some features are narrower still: PII detection and targeted sentiment support fewer languages (PII covers English and Spanish, targeted sentiment is English only).

**PII detection and redaction** - Identifies personally identifiable information (names, addresses, credit card numbers, and similar) and can automatically redact it. Useful for compliance workflows where documents must be processed without exposing PII. PII detection currently supports English and Spanish.

**Toxicity detection** - Flags harmful content (hate speech, harassment, sexual or violent language, and similar) in text with a per-category confidence score. Useful for content moderation pipelines that gate user-generated text before it is published or before it is sent to a generative model.

**Topic modeling** - Identifies recurring themes across a document collection using Latent Dirichlet Allocation (LDA). Batch operation: you provide thousands of documents, Comprehend returns topic clusters and the terms that characterize each topic. Useful for understanding what a large customer feedback corpus is actually about. Note: as of April 30, 2026, AWS closed Topic modeling, Event detection, and Prompt safety classification to new customers. Accounts that used these features in the previous 12 months keep access, but new projects should plan around the supported features above or use a large language model for topic discovery. See the features page below for the official notice.

## Comprehend vs. Bedrock for NLP Tasks

Both services can perform NLP tasks, but they have different cost and performance profiles:

**Use Comprehend when:**
- Processing high volumes (10,000+ documents per day) - Comprehend is significantly cheaper than Bedrock per document for standard tasks
- You need consistent, structured output - Comprehend returns structured JSON responses with defined schemas
- Latency is critical - Comprehend is faster for synchronous calls
- Tasks are well-defined and standard - sentiment, entities, language, key phrases

**Use Bedrock (Claude) when:**
- The task requires reasoning or judgment beyond classification - "What is the author's attitude toward the policy?" vs. "Positive/Negative?"
- You need nuanced extraction that benefits from context - extracting contract obligations requires understanding, not just pattern matching
- You need explanation with the output - "Why is this review negative?" requires generation
- Volume is low - LLM costs per call are higher but acceptable at modest volumes

For many production NLP pipelines, Comprehend and Bedrock are complementary: Comprehend handles volume preprocessing (language detection, basic entity extraction, sentiment flagging), and Bedrock handles the cases Comprehend flags for deeper analysis. See {{< relref "tools/amazon-bedrock" >}} for the generative side.

### Using Comprehend with Bedrock: how the combination actually works

There is no out of the box, single API that fuses the two. Comprehend and Bedrock are separate AWS services, and you combine them yourself at the application level by making two calls and joining the results in your own code. A typical pattern (for example with the AWS SDK, Boto3) is: send the user text to Comprehend `DetectSentiment` (and `DetectEntities` or `DetectPiiEntities` if you need them), then pass that text plus the Comprehend result into a Bedrock model prompt so the model can reason about, explain, or respond to it. Comprehend gives you a fast, cheap, structured label (POSITIVE, NEGATIVE, NEUTRAL, MIXED with confidence scores); Bedrock gives you the free-form generation around it.

Because it is two independent calls, you orchestrate them with whatever you already use: a single Lambda function for a simple request/response, or AWS Step Functions when you want retries, branching (only call Bedrock for the items Comprehend flags), and fan out across many documents. Note that some overlap now exists: Bedrock Guardrails can detect and redact PII and filter sensitive content on its own, so if PII handling is your only reason to add Comprehend, check whether a Guardrail covers it before adding a second service. See the worked Boto3 and Step Functions examples in the sources below.

## Custom Classification and Entity Recognition

Comprehend Custom allows training classification and entity recognition models on your own labeled data. Training a custom classifier requires 100+ labeled examples per class minimum, and performance improves substantially with 1,000+.

This is the right choice when you have domain-specific categories that general models do not know about: product category taxonomies, internal issue classification schemas, or specialized document types. Comprehend Custom is priced separately from the standard APIs and has no free tier: training is billed per hour, the trained model is billed a small monthly model-management fee while it exists, and inference is billed per unit (asynchronous) or per second per provisioned inference unit (synchronous real-time endpoints). See the pricing page for current rates.

## Pricing model

You do not provision servers for the standard APIs. The built-in NLP APIs (sentiment, entities, key phrases, language detection, PII, syntax, toxicity) are billed in units of 100 characters, with a 3-unit (300-character) minimum charge per request. A free tier covers 50,000 units (5 million characters) per API per month for the first 12 months from your first request. Comprehend Custom is billed separately as described above and is not covered by the free tier. Always confirm current numbers on the official pricing page, because rates differ by Region.

## Best practices

For production NLP workloads on AWS, follow the Machine Learning Lens of the AWS Well-Architected Framework, which lays out best practices across the ML lifecycle (data preparation, model building, deployment, and monitoring). For Comprehend specifically: batch large jobs with the asynchronous APIs rather than calling the synchronous APIs in a tight loop, delete custom real-time endpoints when idle since they bill continuously until deleted, and route only the cases that need reasoning to a large language model so the cheaper Comprehend APIs absorb the volume.

## Sources

- [Amazon Comprehend Developer Guide](https://docs.aws.amazon.com/comprehend/latest/dg/) - official documentation.
- [Amazon Comprehend features](https://aws.amazon.com/comprehend/features/) - current feature list and the April 30, 2026 notice closing Topic modeling, Event detection, and Prompt safety classification to new customers.
- [Languages supported in Amazon Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/supported-languages.html) - the 12 analysis languages and per-feature language support.
- [Amazon Comprehend pricing](https://aws.amazon.com/comprehend/pricing/) - units, minimum charge, free tier, and Comprehend Custom rates.
- [Machine Learning Lens, AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html) - best-practice guidance for ML workloads on AWS.
- [Sentiment analysis with AWS Comprehend and Amazon Bedrock using Boto3](https://medium.com/@bhuvaneswari.subramani/sentiment-analysis-with-aws-comprehend-amazon-bedrock-using-boto3-9f836030828f) - worked example calling both services from application code.
- [Elevate marketing intelligence with Amazon Bedrock and LLMs (AWS Machine Learning Blog)](https://aws.amazon.com/blogs/machine-learning/elevate-marketing-intelligence-with-amazon-bedrock-and-llms-for-content-creation-sentiment-analysis-and-campaign-performance-evaluation/) - combining Bedrock generation with sentiment analysis in a pipeline.
