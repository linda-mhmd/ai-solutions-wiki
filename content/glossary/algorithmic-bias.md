---
title: "Algorithmic Bias"
description: "Algorithmic bias is a systematic difference in how an AI system treats or represents groups of people that cannot be justified by the task. Where it comes from, how it is measured, and why a published bias figure rarely transfers to your own system."
date: 2026-10-28
categories: [Glossary]
tags: [algorithmic-bias, fairness, responsible-ai, discrimination, evaluation, ai-governance]
related:
  - /news/ai-bias-statistics-2026
  - /glossary/responsible-ai
  - /glossary/automated-decision-making
  - /glossary/bias-variance-tradeoff
  - /guides/responsible-ai-guide
  - /guides/how-ai-models-are-evaluated
last_updated: 2026-10-28
last_verified: 2026-10-28
---

Algorithmic bias is a systematic difference in how an AI system treats or represents groups of people, such as by gender, ethnicity, age, disability or dialect, that the task does not justify. It is a property of a whole system in use, not just of a model: the same model can be fair in one application and discriminatory in another.

It is a different thing from the statistical "bias" in the [bias-variance tradeoff](/glossary/bias-variance-tradeoff/), which describes a model's systematic error on the data in general rather than unequal treatment of groups.

## Where it comes from

- **Training data.** A model learns the patterns in its data, including historical discrimination and under-representation. If most images labelled "CEO" show white men, an image generator will too.
- **Labels and targets.** Choosing what to predict can encode bias: predicting "who was hired before" reproduces past hiring decisions.
- **Design choices.** Prompt templates, ranking order, thresholds and post-processing all shape outcomes. One 2025 study of 22 LLMs found the first-listed candidate was chosen 63.5% of the time, a bias created by input order alone.
- **Vendor changes.** Hosted models are updated, and some providers rewrite prompts before generation. Results can change without any change on your side.
- **Use in context.** A model used outside the population or purpose it was tested for can behave differently.

## How it is measured

There is no single fairness number. Common approaches:

- **Representation audits**: generate or retrieve many outputs for neutral prompts and count who appears, compared with a real-world baseline such as labour statistics.
- **Paired or matched tests**: submit inputs that differ only in a group signal, such as a name or dialect, and compare outcomes. This is the method used in hiring audits.
- **Outcome metrics**: compare rates of positive decisions, error rates or calibration across groups. Several of these definitions cannot all be satisfied at once, so choosing one is a decision about values, not only engineering.

Results depend heavily on the model generation, prompt wording and measure chosen. Studies of LLM resume screening have found pro-White and pro-male preferences in some systems and the reverse in newer ones. See [AI bias in numbers, 2026](/news/ai-bias-statistics-2026/) for current figures with their sources.

## What to do about it

- Define which groups and harms matter for your use case before choosing a metric.
- Test by group before launch and after every model, prompt or vendor change.
- Keep a human accountable for consequential decisions about people, and document the reasoning; this is also what [automated decision-making](/glossary/automated-decision-making/) rules under GDPR expect.
- In the EU, AI used in hiring, worker management, credit and other Annex III areas is high-risk under the AI Act, with obligations applying from 2 December 2027.

## Sources

- David Rozado, "Gender and Positional Biases in LLM-Based Hiring Decisions: Evidence from Comparative CV/Résumé Evaluations", arXiv 2505.17049 (16 May 2025, revised 27 May 2025): https://arxiv.org/abs/2505.17049
- Gao, Jiang, Yan, "Can LLMs Hire Fairly? Racial Bias in Resume Screening", arXiv 2606.28978 (27 June 2026, preprint): https://arxiv.org/abs/2606.28978
- Regulation (EU) 2026/1744 (Digital Omnibus on AI), EUR-Lex: https://eur-lex.europa.eu/eli/reg/2026/1744/oj

## Further reading

- [AI bias in numbers, 2026](/news/ai-bias-statistics-2026/): image generators, hiring models and who builds AI
- [Responsible AI](/glossary/responsible-ai/) and the [responsible AI guide](/guides/responsible-ai-guide/)
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/)
