---
title: "Hallucination"
description: "What AI hallucination is, why language models generate plausible but incorrect information, and strategies for detection and mitigation."
date: 2026-03-28
categories: [Glossary]
tags: [hallucination, accuracy, factuality, llm, grounding, rag, guardrails]
related:
  - /history/mata-v-avianca-ai-hallucinations-legal
  - /glossary/rag
  - /glossary/ground-truth
  - /glossary/ai-safety
  - /glossary/ai-slop
  - /glossary/slopsquatting
  - /glossary/model-collapse
  - /glossary/ai-washing
  - /patterns/guardrails-pattern
  - /patterns/rag-implementation
last_updated: 2026-07-30
---

Hallucination in AI refers to the phenomenon where a model generates output that is fluent, confident, and plausible-sounding but factually incorrect, fabricated, or unsupported by any source. The term is most commonly applied to large language models that produce false statements, invented citations, non-existent URLs, or fictional events with the same confident tone as accurate information.

## Why Models Hallucinate

Language models are trained to predict the most likely next token given the preceding context. They learn statistical patterns in language, not facts about the world. When the training data contains a pattern where a certain type of claim typically follows a certain type of question, the model reproduces that pattern regardless of whether the specific claim is true. The model has no internal fact database and no mechanism for verifying the truthfulness of its output.

Hallucination is more likely when the model is asked about topics with sparse training data coverage, when the question requires precise factual recall (specific dates, numbers, names), when the prompt encourages the model to speculate, or when the model is asked to produce citations or references.

## Types of Hallucination

**Factual fabrication** - The model states something that is entirely false: a person who does not exist, an event that never happened, or a statistic that was never published.

**Source fabrication** - The model generates plausible-looking citations, URLs, or references that do not exist. The author names, journal titles, and publication years may all be individually plausible but the specific combination is fabricated.

**Conflation** - The model combines accurate facts about different entities into a false statement. It may attribute one person's accomplishments to another or merge details from different events.

**Outdated information presented as current** - The model states something that was once true but is no longer accurate, without indicating the temporal limitation.

## Mitigation Strategies

**Retrieval Augmented Generation (RAG)** - Ground model responses in retrieved source documents so the model generates from evidence rather than from parametric memory alone. This significantly reduces hallucination for questions answerable from the knowledge base.

**Output verification** - Use a separate model or deterministic check to verify factual claims in the output against a trusted knowledge source. Flag or remove claims that cannot be verified.

**Confidence calibration** - Prompt or fine-tune models to express uncertainty when they lack sufficient information rather than generating a confident but potentially false answer.

**Constrained generation** - Limit the model's output to structured formats or predefined options where possible, reducing the opportunity for open-ended fabrication.

Hallucination cannot be fully eliminated from current language models. System design must assume hallucinations will occur and incorporate verification, source attribution, and user education as defense layers.

## Security implications

Hallucination creates attack vectors beyond misinformation. [Slopsquatting]({{< relref "glossary/slopsquatting" >}}) exploits code generation hallucinations: when an AI recommends a non-existent software package, attackers can register that hallucinated name and plant malware. Research found that 19.7% of LLM-recommended packages do not exist, with over 205,000 unique hallucinated package names observed across models.

## Real-world consequences

The most widely cited example of hallucination causing real harm is [Mata v. Avianca](/history/mata-v-avianca-ai-hallucinations-legal/), where lawyers were sanctioned $5,000 for filing AI-generated fake case citations. By 2026, over 1,000 documented court cases involved AI-hallucinated material, with sanctions exceeding $145,000 in Q1 2026 alone.

## Sources

- Ji, Z., et al. (2023). Survey of hallucination in natural language generation. *ACM Computing Surveys, 55*(12). (Comprehensive survey of hallucination types and mitigation approaches.)
- Maynez, J., et al. (2020). On faithfulness and factuality in abstractive summarization. *ACL 2020*. (Early systematic study of faithfulness failures in neural generation.)
- Lewis, P., et al. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *NeurIPS 2020*. (RAG; primary mitigation technique grounding generation in retrieved evidence.)
- Manakul, P., Liusie, A., & Gales, M.J.F. (2023). SelfCheckGPT: Zero-resource black-box hallucination detection for generative large language models. *EMNLP 2023*. (Sampling-based hallucination detection without ground truth.)


## Further reading

- [What is AI hallucination?](/basics/what-is-ai-hallucination/): A beginner-friendly introduction to why AI makes things up.
- [Model collapse](/glossary/model-collapse/): When AI trains on AI-generated content (including hallucinations), quality progressively degrades.
- [AI slop](/glossary/ai-slop/): Low-quality AI content mass-produced with minimal curation — often contains hallucinations.
- [Slopsquatting](/glossary/slopsquatting/): Attackers exploit hallucinated package names to distribute malware.
- [AI washing](/glossary/ai-washing/): Companies making false claims about AI capabilities — a corporate form of hallucination.
- [RAG](/glossary/rag/): Retrieval-Augmented Generation grounds responses in real documents to reduce hallucination.
