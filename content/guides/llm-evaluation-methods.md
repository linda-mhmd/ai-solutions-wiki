---
title: "LLM Evaluation Methods - Measuring Language Model Quality"
description: "A comprehensive guide to evaluating large language models, covering automated metrics (BLEU, ROUGE, BERTScore), LLM-as-judge, human evaluation protocols, benchmark suites (MMLU, HumanEval, MT-Bench), and practical evaluation frameworks."
date: 2026-03-28
categories: [Guides]
tags: [LLM, evaluation, benchmarks, quality, testing]
related:
  - guides/testing-ai-systems
  - guides/testing-llm-applications
  - guides/agent-evaluation-guide
  - guides/fine-tuning-llms-guide
  - guides/ai-product-metrics
  - glossary/hallucination
  - glossary/benchmarks
last_updated: 2026-05-30
---

Evaluating LLMs is one of the hardest problems in AI. Traditional ML has clear metrics: accuracy, precision, recall. LLM outputs are open-ended text where "correct" is subjective, context-dependent, and multidimensional. A response can be factually accurate but poorly written, or fluent but hallucinated. Effective LLM evaluation requires combining multiple approaches, none of which is sufficient alone.

## Evaluation Dimensions

LLM quality is not a single metric. Evaluate across multiple dimensions:

**Factual accuracy.** Does the output contain correct information? Are claims verifiable? Does it hallucinate facts?

**Relevance.** Does the output address the user's actual question? Is it on-topic? Does it include unnecessary information?

**Completeness.** Does the output cover all aspects of the question? Are important details missing?

**Coherence.** Is the output logically structured? Do sentences and paragraphs flow naturally? Is it internally consistent?

**Harmlessness.** Does the output avoid generating harmful, biased, or inappropriate content?

**Instruction following.** Does the output follow the given instructions? If asked for a list, does it produce a list? If given formatting requirements, are they met?

**Tone and style.** Is the tone appropriate for the context? Is the writing style consistent with requirements?

## Automated Evaluation Methods

### Reference-Based Metrics

Compare model output against a known correct answer:

**Exact match.** The output exactly matches the reference. Useful for factual QA with short, unambiguous answers. Too strict for open-ended generation.

**BLEU and ROUGE.** Measure n-gram overlap between output and reference. BLEU (Papineni et al., 2002) was designed for machine translation; ROUGE (Lin, 2004) for summarization. Both are poorly correlated with human judgment for open-ended generation tasks, this limitation is well-documented in the literature. Not recommended as primary metrics for LLM evaluation.

**BERTScore.** Uses contextual BERT embeddings to compute semantic similarity between output and reference tokens (Zhang et al., 2020). Better than n-gram metrics for paraphrased but correct answers because it captures semantic equivalence, not surface-form overlap. Still requires reference answers.

### LLM-as-Judge

Use a strong LLM to evaluate outputs from the model being tested:

**Single-output scoring.** Present the LLM judge with a question and an answer, ask it to score on specific criteria (1-5 for accuracy, relevance, completeness).

**Pairwise comparison.** Present two answers to the same question and ask the judge which is better. More reliable than absolute scoring because relative comparison is easier.

**Implementation:** Use a structured prompt that defines the evaluation criteria clearly. Request scores and explanations. Use a strong model (GPT-4, Claude) as the judge.

**Limitations:** LLM judges have biases (preferring longer responses, preferring their own style, position bias in pairwise comparison). Mitigate by randomizing order in pairwise comparison and calibrating against human judgments.

### Task-Specific Automated Metrics

**Code execution.** For code generation tasks, run the generated code against test cases. Pass rate is an objective metric.

**Fact verification.** Extract factual claims from the output and verify against a knowledge base. Count the fraction of claims that are verifiable and correct.

**Format compliance.** Check whether the output follows required formatting (JSON schema validation, markdown structure, specific templates).

## Human Evaluation

Human evaluation remains the gold standard for open-ended LLM quality assessment:

### Evaluation Protocol

**Select evaluators.** Domain experts for domain-specific tasks, representative users for user-facing applications. Avoid using the development team as evaluators - they are biased.

**Define criteria.** Provide clear rubrics for each evaluation dimension. "Rate accuracy from 1-5" is too vague. "1 = contains factual errors, 3 = mostly accurate with minor issues, 5 = completely accurate and verifiable" is actionable.

**Sample size.** Evaluate at least 100 examples for reliable results. For comparative evaluation (model A vs. model B), 200+ examples reduce noise.

**Inter-annotator agreement.** Have multiple evaluators assess the same examples. Measure agreement (Cohen's kappa or Krippendorff's alpha). Low agreement indicates ambiguous criteria or a task where quality is genuinely subjective.

### Practical Human Evaluation

Full human evaluation is expensive. Use it strategically:

1. **Continuous sampling.** Randomly sample 50-100 production outputs weekly for human review. Track quality trends.
2. **Change validation.** When changing models, prompts, or systems, human-evaluate 100+ examples comparing old vs. new.
3. **Failure investigation.** When automated metrics flag a problem, human evaluation diagnoses the root cause.

## Benchmark Suites

Public benchmarks provide standardized comparison across models:

**MMLU** (Hendrycks et al., 2021). Massive Multitask Language Understanding. 14,000+ multiple-choice questions across 57 academic subjects ranging from elementary mathematics to professional law and medicine. The standard benchmark for broad knowledge coverage; GPT-3 scored 43.9% (near random), GPT-4 scored ~87%. Subject-specific subsets are more informative than the aggregate score.

**HellaSwag** (Zellers et al., 2019). Tests commonsense NLI through sentence completion with adversarially filtered distractors. Models that achieve near-human performance on the original NLI datasets fail on HellaSwag; it was designed specifically to expose that gap.

**HumanEval** (Chen et al., 2021). 164 hand-crafted Python programming problems with unit test suites. Measures pass@k: the probability that at least one of k generated solutions passes all tests. The standard benchmark for code generation capability.

**TruthfulQA** (Lin et al., 2022). 817 questions designed to elicit false answers that humans commonly believe. Models trained to be helpful tend to generate confident but false responses to these questions; TruthfulQA measures how well a model avoids this.

**MT-Bench** (Zheng et al., 2023). 80 multi-turn conversation questions across 8 categories, scored by GPT-4 as judge. The LLM-as-judge methodology introduced in this benchmark is now widely replicated.

**Limitations of benchmarks:** Models can be optimized for benchmarks without improving real-world performance. Benchmark contamination (training data including benchmark questions) inflates scores. Always supplement benchmarks with domain-specific evaluation.

## Building an Evaluation Framework

### Step 1: Define Your Evaluation Dataset

Create a dataset that represents your actual use case:
- 200-500 examples covering the range of expected inputs
- Include easy cases, hard cases, and edge cases
- Include examples that test each evaluation dimension
- Have domain experts create reference answers where applicable

### Step 2: Implement Automated Evaluation

Build an automated evaluation pipeline that runs on every model or prompt change:
- Task-specific metrics (format compliance, fact verification)
- LLM-as-judge scoring on key dimensions
- Regression detection (flag significant drops from baseline)

### Step 3: Establish Human Evaluation Cadence

Schedule regular human evaluation:
- Weekly sampling of production outputs
- Full evaluation before any major model or prompt change
- Quarterly evaluation of the complete evaluation dataset

### Step 4: Track Metrics Over Time

Build a dashboard showing evaluation metrics over time:
- Automated metrics (daily)
- LLM-judge scores (weekly)
- Human evaluation scores (weekly/monthly)
- Production feedback metrics (user satisfaction, override rates)

## Common Mistakes

**Relying on a single metric.** No single metric captures LLM quality. Use a combination of automated and human evaluation across multiple dimensions.

**Evaluating on the training distribution only.** Test on edge cases, adversarial inputs, and out-of-distribution examples. Models often fail spectacularly on inputs slightly different from training data.

**Ignoring evaluation data quality.** Garbage in, garbage out. Invest in high-quality evaluation datasets with verified reference answers and clear evaluation criteria.

**Evaluating too infrequently.** LLM quality can change when prompts change, when the underlying model is updated, or when the input distribution shifts. Evaluate continuously, not just at launch.

LLM evaluation is an ongoing practice, not a one-time task. Build the infrastructure early, invest in quality evaluation data, and make evaluation results visible to the entire team.

## Sources

- Hendrycks, D. et al. "Measuring Massive Multitask Language Understanding." *ICLR* (2021). https://arxiv.org/abs/2009.03300, The MMLU benchmark.
- Zellers, R. et al. "HellaSwag: Can a Machine Really Finish Your Sentence?" *ACL* (2019). https://arxiv.org/abs/1905.07830, HellaSwag benchmark and the adversarial filtering methodology.
- Chen, M. et al. "Evaluating Large Language Models Trained on Code." (2021). https://arxiv.org/abs/2107.03374, Introduces HumanEval and the pass@k metric.
- Lin, S. et al. "TruthfulQA: Measuring How Models Mimic Human Falsehoods." *ACL* (2022). https://arxiv.org/abs/2109.07958, TruthfulQA benchmark design and analysis.
- Zheng, L. et al. "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena." *NeurIPS* (2023). https://arxiv.org/abs/2306.05685, MT-Bench and the LLM-as-judge methodology, including analysis of positional and verbosity biases.
- Zhang, T. et al. "BERTScore: Evaluating Text Generation with BERT." *ICLR* (2020). https://arxiv.org/abs/1904.09675, BERTScore metric.
- Papineni, K. et al. "BLEU: a Method for Automatic Evaluation of Machine Translation." *ACL* (2002). https://dl.acm.org/doi/10.3115/1073083.1073135, Original BLEU paper.
- Lin, C.-Y. "ROUGE: A Package for Automatic Evaluation of Summaries." *ACL Workshop on Text Summarization* (2004). https://aclanthology.org/W04-1013/, Original ROUGE paper.
- Cohen, J. "A Coefficient of Agreement for Nominal Scales." *Educational and Psychological Measurement* 20, no. 1 (1960): 37–46., Cohen's kappa, the inter-annotator agreement metric referenced in the human evaluation section.
