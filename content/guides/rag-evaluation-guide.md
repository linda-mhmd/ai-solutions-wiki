---
title: "Evaluating RAG System Quality"
description: "How to measure and improve both retrieval quality and generation quality in RAG systems, with practical metrics and evaluation frameworks."
date: 2026-03-28
categories: [Guides]
tags: [RAG, evaluation, retrieval, generation, metrics]
related:
  - guides/building-rag-systems
  - glossary/rag
  - guides/model-evaluation-guide
  - guides/multimodal-rag-guide
  - glossary/hallucination
last_updated: 2026-05-30
---

RAG system quality depends on two things working well together: retrieving the right documents and generating accurate answers from them. A brilliant generator cannot compensate for bad retrieval, and perfect retrieval is wasted if the generator ignores or misinterprets the context. Evaluating RAG requires measuring both components independently and together.

## Retrieval Evaluation

Retrieval quality determines the upper bound of system performance. If the correct information is not retrieved, the generator cannot produce a correct answer.

**Recall at K.** Of the relevant documents for a query, what fraction appear in the top K retrieved results? High recall means the system finds most of the relevant information. This is the most important retrieval metric for RAG because missing relevant documents directly causes wrong answers.

**Precision at K.** Of the top K retrieved documents, what fraction are relevant? Low precision means the generator receives noisy context that may confuse it or waste context window space.

**Mean Reciprocal Rank (MRR).** How high does the first relevant document appear in the results? Important when the generator relies most heavily on the top-ranked results.

**Normalized Discounted Cumulative Gain (NDCG).** Measures overall ranking quality, giving more credit for relevant documents appearing higher in the results.

Building a retrieval evaluation dataset requires query-document relevance judgments. Start with 100-200 representative queries annotated with their relevant documents. This investment pays for itself many times over by enabling rapid iteration on retrieval configuration.

## Generation Evaluation

Given good retrieval, the generator must produce accurate, relevant, and well-formed answers.

**Faithfulness.** Does the answer accurately reflect the retrieved documents? Faithfulness is the most critical generation metric for RAG because unfaithful answers are hallucinations dressed up with citations. Evaluate by checking whether each claim in the answer is supported by the provided context.

**Answer relevance.** Does the answer address the user's question? A faithful answer that does not actually answer the question is useless.

**Completeness.** Does the answer cover all relevant information from the retrieved documents? An answer that addresses only part of the question when more information was available is incomplete.

**Groundedness.** Can each statement in the answer be traced to a specific passage in the retrieved documents? This is related to faithfulness but focuses on attribution.

## End-to-End Evaluation

**Answer correctness.** Compare the generated answer against a ground truth answer. This captures the combined effect of retrieval and generation quality. Use both exact match (for factual questions) and semantic similarity (for open-ended questions).

**LLM-as-judge.** Use a separate, capable LLM to evaluate response quality across multiple dimensions. Frameworks like RAGAS, DeepEval, and custom evaluation prompts automate this. LLM judges are imperfect but scalable and correlate well with human judgment on most dimensions.

**Human evaluation.** The gold standard but expensive and slow. Use human evaluation to calibrate automated metrics, evaluate a production sample, and assess dimensions that automated metrics handle poorly (tone, helpfulness, nuance).

## Evaluation Framework Setup

1. **Build a question bank.** Collect 200+ questions that represent your actual user queries. Include easy questions, hard questions, questions requiring multi-document reasoning, and questions where the answer is not in your knowledge base.

2. **Annotate ground truth.** For each question, identify the relevant source documents and write a reference answer. This is labor-intensive but essential.

3. **Automate evaluation.** Run the question bank through your system regularly (after every configuration change, weekly for monitoring). Score each response on retrieval metrics and generation metrics automatically.

4. **Track trends.** Monitor evaluation scores over time to catch regressions from data updates, model changes, or configuration drift.

## Common Failure Modes

- Retrieval misses relevant documents because chunking splits key information across chunks
- Retrieval returns semantically similar but factually irrelevant documents
- Generator ignores retrieved context and answers from parametric knowledge
- Generator synthesizes information across documents in misleading ways
- Generator hallucinates details not present in any retrieved document

Diagnosing which failure mode is occurring requires the component-level evaluation described above, not just end-to-end metrics.
