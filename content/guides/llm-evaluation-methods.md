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
  - guides/benchmarking-a-finetuned-model-against-its-lineage
  - glossary/hallucination
  - glossary/ai-benchmark
  - glossary/agent-as-a-judge
  - glossary/llm-as-a-judge
last_updated: 2026-09-03
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

## Agentic Evaluation Harnesses

Two more recent patterns extend the automated methods above by giving the evaluator, or the test itself, agentic capabilities: tool use, multi-step reasoning, and persistent state, instead of a single prompt-in, output-out call.

### Agent-as-a-judge: grading at scale

[LLM-as-a-judge](/glossary/llm-as-a-judge/) scores one output against one prompt. [Agent-as-a-judge](/glossary/agent-as-a-judge/) goes further: the judge itself runs as an agent with tools and evaluates a system's entire trajectory, not just its final answer, so intermediate reasoning steps, tool calls, and recoverable errors along the way all factor into the score. This matters most when the thing being graded is itself an agent, where two different tool-call sequences can reach the same correct final answer, or a fatal error on step three of eight is invisible if you only look at the final output. The originating paper (Zhuge et al., Meta AI and KAUST, October 2024) reported that this approach outperforms LLM-as-a-judge on DevAI, a benchmark of 55 realistic AI-development tasks, specifically because it can inspect intermediate steps that a single-shot judge never sees.

In practice, using an agent as the grader means the evaluation pipeline needs the same engineering rigor as the system under test: tool access, cost tracking, timeout and retry handling, and its own calibration against human judgment. The LLM-as-judge biases and limitations described above (verbosity preference, position bias, self-preference) still apply to an agentic judge and are compounded by the larger surface area that tool use adds.

### Agents as the test: end-to-end task execution

The methods above (reference-based metrics, LLM-as-judge, human evaluation) mostly probe isolated question-answer pairs. A complementary, higher-fidelity approach is to give the model under test an actual agentic harness — file access, a shell, code execution, a browser — and set it loose on realistic, multi-step tasks: "fix this failing test," "implement this feature and open a PR," "research X and produce a report." Success is then judged on the outcome (does the PR merge cleanly, does the report answer the question) and, where an agent-as-a-judge grader is in use, on the trajectory taken to get there.

This surfaces failure modes that isolated Q&A evaluation misses: a model that answers isolated questions about a codebase correctly can still fail to carry out a real multi-step change to it, and the reverse also happens. See the [agent evaluation guide](/guides/agent-evaluation-guide/) for the full methodology — non-deterministic paths, tool-use correctness, safety of irreversible actions, and cost-per-task; this section covers only where agentic execution fits alongside the other evaluation approaches on this page.

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

**MMLU** (Hendrycks et al., 2021). Massive Multitask Language Understanding. 14,000+ multiple-choice questions across 57 academic subjects ranging from elementary mathematics to professional law and medicine. The standard benchmark for broad knowledge coverage; GPT-3 scored 43.9% few-shot (near the 25% random-chance baseline), GPT-4 scored 86.4% per OpenAI's GPT-4 Technical Report. Subject-specific subsets are more informative than the aggregate score.

**HellaSwag** (Zellers et al., 2019). Tests commonsense NLI through sentence completion with adversarially filtered distractors. Models that achieve near-human performance on the original NLI datasets fail on HellaSwag; it was designed specifically to expose that gap.

**HumanEval** (Chen et al., 2021). 164 hand-crafted Python programming problems with unit test suites. Measures pass@k: the probability that at least one of k generated solutions passes all tests. The standard benchmark for code generation capability.

**GSM8K** (Cobbe et al., 2021). 8.5K grade-school math word problems requiring multi-step arithmetic reasoning. Widely used to test chain-of-thought reasoning, but frontier models now routinely score in the high 90s%, which limits its power to distinguish current top-tier models from each other; treat it as a floor check rather than a differentiator for state-of-the-art systems.

**TruthfulQA** (Lin et al., 2022). 817 questions designed to elicit false answers that humans commonly believe. Models trained to be helpful tend to generate confident but false responses to these questions; TruthfulQA measures how well a model avoids this.

**MT-Bench** (Zheng et al., 2023). 80 multi-turn conversation questions across 8 categories, scored by GPT-4 as judge. The LLM-as-judge methodology introduced in this benchmark is now widely replicated.

**Current leaderboards.** Static per-benchmark scores age quickly as new models release; for a live comparison, two independent trackers are widely cited as of 2026: [Artificial Analysis](https://artificialanalysis.ai/) combines multiple benchmarks into a composite Intelligence Index alongside cost and speed metrics for each model/provider endpoint, and [Arena](https://arena.ai/) — the platform formerly known as LMArena, and before that Chatbot Arena, renamed on January 28, 2026 — ranks models by aggregated pairwise human-preference votes rather than a fixed question set. Both should be read as a snapshot of a fast-moving landscape, not a permanent ranking.

**Limitations of benchmarks:** Models can be optimized for benchmarks without improving real-world performance. Benchmark contamination (training data including benchmark questions) inflates scores — this is well documented for GSM8K specifically: Zhang et al. (2024) built GSM1k, a fresh benchmark matched to GSM8K in difficulty but guaranteed absent from training data, and found accuracy drops of up to 8 percentage points for some model families on the new problems, evidence of memorization rather than pure reasoning, though the frontier models they tested showed little to no such drop. Public benchmark saturation is also why harder successors exist for some of the benchmarks above (for example MMLU-Pro, which raises MMLU's four answer choices to ten and adds more reasoning-heavy questions; Wang et al., 2024). Always supplement benchmarks with domain-specific evaluation.

**Evaluating a fine-tuned or distilled model.** Everything above compares models in isolation. When the model under test is a fine-tuned or distilled version of a base or teacher model, isolated benchmark scores can hide regressions or capability loss that only becomes visible when the result is compared against its own lineage rather than the general leaderboard. See [Benchmarking a Fine-Tuned Model Against Its Lineage](/guides/benchmarking-a-finetuned-model-against-its-lineage/) for that deeper, lineage-aware methodology.

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
- Cobbe, K. et al. "Training Verifiers to Solve Math Word Problems." (2021). https://arxiv.org/abs/2110.14168, Introduces the GSM8K benchmark.
- Wang, Y. et al. "MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark." *NeurIPS* (2024). https://arxiv.org/abs/2406.01574, Harder successor to MMLU with 10 answer choices and more reasoning-heavy questions.
- Zhuge, M. et al. (Meta AI and KAUST). "Agent-as-a-Judge: Evaluate Agents with Agents." (2024). https://arxiv.org/abs/2410.10934, Introduces agent-as-a-judge and the DevAI benchmark, reporting it outperforms LLM-as-a-judge for evaluating multi-step agents.
- Artificial Analysis. Independent AI model leaderboard and Intelligence Index. https://artificialanalysis.ai/
- Arena (formerly LMArena, formerly Chatbot Arena). Pairwise human-preference leaderboard. https://arena.ai/
- Papineni, K. et al. "BLEU: a Method for Automatic Evaluation of Machine Translation." *ACL* (2002). https://aclanthology.org/P02-1040/, Original BLEU paper.
- Lin, C.-Y. "ROUGE: A Package for Automatic Evaluation of Summaries." *ACL Workshop on Text Summarization* (2004). https://aclanthology.org/W04-1013/, Original ROUGE paper.
- Cohen, J. "A Coefficient of Agreement for Nominal Scales." *Educational and Psychological Measurement* 20, no. 1 (1960): 37–46. https://doi.org/10.1177/001316446002000104, Cohen's kappa, the inter-annotator agreement metric referenced in the human evaluation section.
- Zhang, H. et al. "A Careful Examination of Large Language Model Performance on Grade School Arithmetic." (2024). https://arxiv.org/abs/2405.00332, Introduces GSM1k, a decontaminated GSM8K-style benchmark used to measure contamination-driven accuracy drops.
