---
title: "LLM-as-a-Judge"
description: "Using a language model as an automated evaluator of another model's outputs: methodology, calibration with human judgement, known biases, and engineering practice for reliable evaluation pipelines."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "advanced", "evaluation", "llm", "rag-evaluation", "mlops"]
related:
  - glossary/rag-evaluation
  - glossary/golden-dataset
  - glossary/llmops
  - glossary/chain-of-thought
  - glossary/llm
  - guides/llm-evaluation-methods
  - guides/agent-evaluation-guide
  - guides/rag-evaluation-guide
---

LLM-as-a-judge is the practice of using a language model to score, compare, or critique the outputs of another language model (or its own outputs). It is the dominant evaluation methodology for open-ended generation tasks where automated string-overlap metrics (BLEU, ROUGE, exact match) are inadequate. The technique was systematised by Zheng et al. (2023) in the MT-Bench / Chatbot Arena work, which demonstrated that strong judge models reach approximately 80% agreement with human preference, comparable to human-human agreement on the same tasks.

## Mechanism

A judge prompt typically takes one of three forms:

- **Pointwise scoring** — the judge receives a single response and rates it on a scale (e.g. 1–5) along one or more axes (helpfulness, faithfulness, factuality).
- **Pairwise comparison** — the judge receives two candidate responses (A and B) and selects the better one, optionally with a "tie" option. This is the format used in Chatbot Arena and most preference-learning datasets.
- **Reference-based grading** — the judge receives a candidate response and a reference (gold) answer and scores the candidate against the reference.

Judges are typically prompted to produce a chain-of-thought rationale before the final score, which improves calibration (Zheng et al., 2023; see [Chain-of-Thought](/glossary/chain-of-thought/)). Production systems usually constrain the final score with structured-output decoding (see [Function Calling](/glossary/function-calling/)) to make scores parseable.

## When to Use LLM-as-a-Judge

It is the right tool when:

- The output space is open-ended (long-form text, code, summaries, agent traces) and reference-based metrics are inadequate
- Human evaluation is too slow or expensive for the iteration cadence needed
- The evaluation criterion can be expressed precisely in a rubric
- Calibration against human judgement on a sample has been measured and is acceptable

It is *not* the right tool when:

- The task has a clear ground truth and exact-match or programmatic checks suffice (use those — they are deterministic, free, and unbiased)
- Stakes are high and a single judge's error tolerance is unacceptable (consider ensembles, human review, or formal verification)
- The judge model has not been calibrated against human labels for this specific task

## Known Biases

Empirical studies (Zheng et al., 2023; Wang et al., 2023; Panickssery et al., 2024) have documented systematic biases that engineering pipelines must control for:

- **Position bias.** In pairwise comparisons, judges prefer the first (or sometimes the second) candidate independent of quality. *Mitigation:* present each pair in both orders and average; or present in random order across many comparisons.
- **Verbosity bias.** Judges prefer longer responses, even when length adds no value. *Mitigation:* explicit rubric constraints; length-controlled comparisons (Dubois et al., 2024).
- **Self-enhancement bias** (Panickssery et al., 2024). Models judge their own outputs more favourably than other models' outputs of equal quality. *Mitigation:* never use the same family as judge and candidate; or use ensembles.
- **Style-over-substance bias.** Judges prefer well-formatted, confident-sounding responses even when they are factually wrong (Hosking et al., 2024).
- **Anchoring on the rubric.** Tightly-specified rubrics improve agreement but can miss failure modes the rubric did not anticipate. Combine rubric scoring with an open-ended "anything else?" axis.

## Calibration

A judge is only useful if its scores correlate with the metric you actually care about. The minimum-viable calibration protocol:

1. Sample 100–500 representative inputs.
2. Have humans (ideally domain experts) score each output along the same rubric.
3. Compute agreement (Cohen's κ for categorical, Spearman's ρ for ordinal, accuracy for pairwise).
4. Iterate the judge prompt until agreement is acceptable for the use case (typical thresholds: κ > 0.6, ρ > 0.7).
5. Re-calibrate when the judge model, candidate model, or task distribution changes.

Liu et al. (2023) — G-Eval — provides a reference framework for chain-of-thought-based reference-free evaluation with explicit calibration steps. Fu et al. (2024) — GPTScore — uses log-probabilities of the judge for fine-grained continuous scores.

## Production Patterns

- **Ensembles.** Multiple judge models reduce single-judge bias and increase agreement with humans. Verga et al. (2024) — *PoLL* — shows that an ensemble of small judges can match or beat a single large judge at lower cost.
- **Constrained rubrics.** Decompose evaluation into binary or low-cardinality axes (factual? grounded? complete? safe?) and combine. Easier to calibrate than holistic scores.
- **Reference-augmented judging.** When references exist, providing them substantially reduces variance.
- **Confidence thresholding.** When the judge is uncertain (low log-prob, ties, ensemble disagreement), escalate to human review.
- **Drift monitoring.** Calibration is a snapshot; drift in the judge model (provider updates) or candidate distribution requires re-calibration.

## Frameworks

- **Promptfoo, DeepEval, Ragas, OpenAI Evals, Anthropic Evaluator, AWS Bedrock Evaluation, Langfuse, Phoenix** — production-grade evaluation harnesses with built-in LLM-judge primitives. See [DeepEval vs Promptfoo](/comparisons/deepeval-vs-promptfoo/).
- **Chatbot Arena / LMSYS** — open community-maintained pairwise preference benchmark with crowdsourced human votes; the de facto reference for judge calibration on chat models.

## Related Concepts

- [RAG Evaluation](/glossary/rag-evaluation/) — judges are the dominant tool for RAG faithfulness and relevance scoring
- [Golden Dataset](/glossary/golden-dataset/) — the human-labelled set against which judges are calibrated
- [Chain-of-Thought](/glossary/chain-of-thought/) — judges typically reason before scoring
- [LLMOps](/glossary/llmops/) — judge pipelines are part of the evaluation stack
- [Hallucination](/glossary/hallucination/) — judges are the practical mechanism for measuring hallucination rates

## Sources and Further Reading

- Zheng, L., Chiang, W.-L., Sheng, Y., et al. (2023). *Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena.* NeurIPS 2023 Datasets & Benchmarks. arXiv:2306.05685. [https://arxiv.org/abs/2306.05685](https://arxiv.org/abs/2306.05685)
- Liu, Y., Iter, D., Xu, Y., et al. (2023). *G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment.* EMNLP 2023. arXiv:2303.16634. [https://arxiv.org/abs/2303.16634](https://arxiv.org/abs/2303.16634)
- Wang, P., Li, L., Chen, L., et al. (2023). *Large Language Models are not Fair Evaluators.* arXiv:2305.17926. [https://arxiv.org/abs/2305.17926](https://arxiv.org/abs/2305.17926)
- Panickssery, A., Bowman, S. R., Feng, S. (2024). *LLM Evaluators Recognize and Favor Their Own Generations.* arXiv:2404.13076. [https://arxiv.org/abs/2404.13076](https://arxiv.org/abs/2404.13076)
- Verga, P., Hofstätter, S., Althammer, S., et al. (2024). *Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models.* arXiv:2404.18796. [https://arxiv.org/abs/2404.18796](https://arxiv.org/abs/2404.18796)
- Dubois, Y., Galambosi, B., Liang, P., Hashimoto, T. B. (2024). *Length-Controlled AlpacaEval: A Simple Way to Debias Automatic Evaluators.* arXiv:2404.04475. [https://arxiv.org/abs/2404.04475](https://arxiv.org/abs/2404.04475)
- Hosking, T., Blunsom, P., Bartolo, M. (2024). *Human Feedback is not Gold Standard.* ICLR 2024. arXiv:2309.16349. [https://arxiv.org/abs/2309.16349](https://arxiv.org/abs/2309.16349)
- Fu, J., Ng, S.-K., Jiang, Z., Liu, P. (2024). *GPTScore: Evaluate as You Desire.* NAACL 2024. arXiv:2302.04166. [https://arxiv.org/abs/2302.04166](https://arxiv.org/abs/2302.04166)
- Saad-Falcon, J., Khattab, O., Potts, C., Zaharia, M. (2024). *ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems.* NAACL 2024. arXiv:2311.09476. [https://arxiv.org/abs/2311.09476](https://arxiv.org/abs/2311.09476)
- Es, S., James, J., Espinosa-Anke, L., Schockaert, S. (2024). *RAGAS: Automated Evaluation of Retrieval Augmented Generation.* EACL 2024. arXiv:2309.15217. [https://arxiv.org/abs/2309.15217](https://arxiv.org/abs/2309.15217)
- Chiang, W.-L., Zheng, L., Sheng, Y., et al. (2024). *Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference.* ICML 2024. arXiv:2403.04132. [https://arxiv.org/abs/2403.04132](https://arxiv.org/abs/2403.04132)
