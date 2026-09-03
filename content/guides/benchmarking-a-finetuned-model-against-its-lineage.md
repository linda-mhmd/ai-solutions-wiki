---
title: "Benchmarking a Fine-Tuned Model Against Its Lineage"
description: "A methodology for testing every model in a fine-tuning or distillation lineage — base, teacher, and final — against one fixed test set, so gains, regressions, and unchanged behavior are all visible instead of assumed."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Guides]
tags: ["model-evaluation", "fine-tuning", "regression-testing", "benchmarking", "llm-as-a-judge", "model-lineage", "mlops"]
related:
  - guides/fine-tuning-llms-guide
  - guides/llm-evaluation-methods
  - guides/agent-evaluation-guide
  - guides/embedding-model-comparison
  - glossary/model-lineage-glossary
  - glossary/knowledge-distillation
  - glossary/llm-as-a-judge
  - glossary/agent-as-a-judge
---

A team fine-tunes a model, runs it against a handful of hand-picked prompts, sees reasonable-looking answers, and ships it. What that check cannot tell them is whether the fine-tune made the model *worse* at things it could already do, or how much of its new niche competence actually came from the fine-tuning step versus a teacher model it was distilled from. Both questions have a specific, mechanical answer, but only if you test more than the final artifact.

This is not a novel technique — it is regression testing, applied to model weights instead of application code, and it follows the same discipline eval engineers already use for any A/B comparison: hold the test cases fixed, vary only the thing under test, and record every run so the delta is a fact rather than an impression. Applied here, "the thing under test" is not one model but a **lineage**: the base (pretrained) model, any teacher model(s) involved if distillation was used, and the final fine-tuned or distilled model. Run the same fixed test set against all of them. This guide is the verification companion to the [fine-tuning guide](/guides/fine-tuning-llms-guide/) and the [LoRA and QLoRA](/glossary/lora/) glossary entry, which cover how fine-tuning technically changes a model's weights; this page covers how to determine whether that change was actually an improvement.

## Why testing only the final model hides the answer you need

A model's [lineage](/glossary/model-lineage-glossary/) is the chain of parent-child relationships that produced it — which base checkpoint it started from, which teacher (if any) supplied distillation targets, and what fine-tuning was applied on top. Testing only the last link in that chain throws away the two comparisons that actually explain the result:

**A regression introduced by fine-tuning is invisible if you never established what the base model could already do.** If the fine-tuned model gets a general-knowledge question wrong, you have no way to know whether it always got that question wrong (not a regression, a pre-existing gap) or used to get it right and fine-tuning broke it (a regression, and specifically the failure mode usually called catastrophic forgetting — see [catastrophic forgetting](/glossary/catastrophic-forgetting/) and [knowledge distillation](/glossary/knowledge-distillation/) for the mechanics of why narrow training on new data can overwrite unrelated capability). Without a base-model baseline recorded on the *same* questions, "did it get worse" is not answerable after the fact — you cannot go back and test the pre-fine-tune weights once they're gone from your workflow, and re-deriving what the base model "used to do" from memory or vibes is not evidence.

**A distilled model's gap from its teacher is invisible if you never tested the teacher on the same set.** Distillation trades capability for size and speed. That trade is only legible if you have the teacher's score on the exact same cases as the student's — otherwise "the small model does pretty well" is a statement with no denominator.

Mitigations exist for the regression side specifically: InstructLab's LAB (Large-scale Alignment for chatBots) method runs training in phases with **replay buffers** — batches of data from earlier training phases re-introduced during later phases — specifically to prevent new knowledge-tuning from overwriting previously learned skills (Sudalairaj et al., 2024). That is a training-time mitigation. It reduces the odds of a regression; it does not tell you whether one happened in your specific run. Only testing does that, which is what the rest of this guide covers. For the mechanics of LAB's taxonomy-driven data generation and phased training, see Sudalairaj et al. (2024) in Sources below.

<figure>
<svg viewBox="0 0 780 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lineage-diagram-title" style="width:100%;height:auto;max-width:720px;display:block;margin:1.5rem auto;color:inherit">
<title id="lineage-diagram-title">Same fixed test set run against every model in the lineage</title>
<defs>
<marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
</marker>
</defs>

<!-- fixed test set -->
<rect x="270" y="8" width="240" height="46" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="390" y="28" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Fixed test set</text>
<text x="390" y="44" text-anchor="middle" font-size="11" fill="currentColor">same N question/task pairs, every run</text>

<!-- fan-out dashed lines to each model -->
<line x1="330" y1="54" x2="100" y2="96" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arrowhead)"/>
<line x1="390" y1="54" x2="390" y2="96" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arrowhead)"/>
<line x1="450" y1="54" x2="680" y2="96" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arrowhead)"/>

<!-- model boxes -->
<rect x="15" y="100" width="170" height="52" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="100" y="122" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Base model</text>
<text x="100" y="138" text-anchor="middle" font-size="11" fill="currentColor">pretrained checkpoint</text>

<rect x="305" y="100" width="170" height="52" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
<text x="390" y="122" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Teacher model(s)</text>
<text x="390" y="138" text-anchor="middle" font-size="11" fill="currentColor">if distillation was used</text>

<rect x="595" y="100" width="170" height="52" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="680" y="122" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Fine-tuned / distilled</text>
<text x="680" y="138" text-anchor="middle" font-size="11" fill="currentColor">the final artifact</text>

<!-- lineage arrows -->
<line x1="185" y1="126" x2="303" y2="126" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrowhead)"/>
<line x1="475" y1="126" x2="593" y2="126" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrowhead)"/>

<!-- down arrows to results -->
<line x1="100" y1="152" x2="100" y2="196" stroke="currentColor" stroke-width="1.2" marker-end="url(#arrowhead)"/>
<line x1="390" y1="152" x2="390" y2="196" stroke="currentColor" stroke-width="1.2" marker-end="url(#arrowhead)"/>
<line x1="680" y1="152" x2="680" y2="196" stroke="currentColor" stroke-width="1.2" marker-end="url(#arrowhead)"/>

<!-- result boxes -->
<rect x="20" y="198" width="160" height="42" rx="5" fill="none" stroke="currentColor" stroke-width="1.2"/>
<text x="100" y="223" text-anchor="middle" font-size="12" fill="currentColor">Base results</text>

<rect x="310" y="198" width="160" height="42" rx="5" fill="none" stroke="currentColor" stroke-width="1.2"/>
<text x="390" y="223" text-anchor="middle" font-size="12" fill="currentColor">Teacher results</text>

<rect x="600" y="198" width="160" height="42" rx="5" fill="none" stroke="currentColor" stroke-width="1.2"/>
<text x="680" y="223" text-anchor="middle" font-size="12" fill="currentColor">Fine-tuned results</text>

<!-- converge lines -->
<line x1="100" y1="240" x2="360" y2="292" stroke="currentColor" stroke-width="1.2" marker-end="url(#arrowhead)"/>
<line x1="390" y1="240" x2="390" y2="292" stroke="currentColor" stroke-width="1.2" marker-end="url(#arrowhead)"/>
<line x1="680" y1="240" x2="420" y2="292" stroke="currentColor" stroke-width="1.2" marker-end="url(#arrowhead)"/>

<!-- compare box -->
<rect x="150" y="294" width="480" height="66" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
<text x="390" y="318" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Compare across all three runs</text>
<text x="390" y="337" text-anchor="middle" font-size="11" fill="currentColor">gained · lost · unchanged, per test case</text>
</svg>
<figcaption>Every model in the lineage is scored against the identical fixed test set, not just the final artifact — the teacher box is dashed because it only exists when distillation was part of the pipeline.</figcaption>
</figure>

## Building the fixed test-case set

The set is a list of `(question or task, expected answer)` pairs, versioned and held fixed across runs — this is the same discipline the wiki's [golden dataset](/glossary/golden-dataset/) entry describes for evaluation generally, applied specifically to lineage comparison. "Fixed" matters more than "large": if the set changes between runs, a score change might reflect a different test rather than a different model. Two categories belong in it, and skipping either one blinds you to one of the two failure modes this whole methodology exists to catch:

**General-knowledge / baseline capability cases.** Things the base model could already do — basic factual questions, general instruction-following, tasks unrelated to the fine-tuning domain. These exist purely to catch regressions. If the fine-tuned model fails a case the base model passed, that is catastrophic forgetting made concrete and attributable to a specific test case, not a vague impression that "it feels different now."

**Niche / domain-specific cases.** The actual thing you fine-tuned or distilled for — the specialized terminology, task format, or domain reasoning the base model was weak at. This is where you expect and want to see gains.

### Scoring: exact match, embedding similarity, and judged review

Not every expected answer can be checked the same way.

| Method | Good for | Weakness |
|---|---|---|
| Exact / normalized string match | Closed-form answers with one right form (a classification label, a number, a fixed phrase) | Too brittle for any open-ended or free-text answer |
| Embedding cosine similarity | Free-text answers where paraphrase is acceptable and exact match would flag correct answers as wrong | Semantically similar text is not always *correct* text — see caveat below |
| LLM-as-judge / human review | Free-text answers needing actual correctness or quality judgment, not just similarity | Judge biases (verbosity, position, self-preference); needs calibration against human judgment |

For free-text cases, compute an embedding of the expected answer and an embedding of the model's actual answer, then score by cosine similarity between the two vectors rather than requiring an exact match. The formula:

```
cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)
```

Worked example with toy 3-dimensional vectors (real embedding models return hundreds or thousands of dimensions; three is used here only so the arithmetic is checkable by hand):

```
expected_answer_embedding A = [0.80, 0.50, 0.10]
model_answer_embedding   B = [0.75, 0.55, 0.05]

A · B        = (0.80×0.75) + (0.50×0.55) + (0.10×0.05) = 0.6000 + 0.2750 + 0.0050 = 0.8800
||A||        = sqrt(0.80² + 0.50² + 0.10²) = sqrt(0.9000) ≈ 0.9487
||B||        = sqrt(0.75² + 0.55² + 0.05²) = sqrt(0.8675) ≈ 0.9314

cosine_similarity = 0.8800 / (0.9487 × 0.9314) ≈ 0.8800 / 0.8836 ≈ 0.9959
```

Two vectors this close (≈0.99) would clear almost any reasonable pass threshold; a working threshold has to be set empirically against your own data — there is no universal cutoff, and thresholds calibrated on one embedding model do not transfer to another. See [embeddings](/glossary/embeddings/) for how the vectors are produced and [Embedding Model Comparison and Selection Guide](/guides/embedding-model-comparison/) for choosing which model generates them, since retrieval quality and dimensionality both affect how meaningful a given similarity threshold actually is.

Be explicit with your own team about what this method is and is not: it is a genuine, useful, and imperfect proxy for correctness. Semantically similar is not the same claim as factually correct — a fluent, well-formed, on-topic answer that states the wrong number will often still score a high cosine similarity against the right answer, because most of the sentence around that number is what the embedding is responding to. Treat embedding similarity as one signal among three, not a replacement for the other two: keep exact-match checks on anything that has one unambiguous right answer, and route the rest through human review or [LLM-as-a-judge](/glossary/llm-as-a-judge/) — and for cases where the "judge" itself needs to take actions or consult tools to verify a claim rather than just read text, [agent-as-a-judge](/glossary/agent-as-a-judge/) grading, covered further below.

## The run procedure

Run the identical fixed test set against every model in the lineage: the base model, each teacher model if distillation was involved, and the final fine-tuned or distilled model. Nothing about the test set changes between runs — same prompts, same order, same scoring method per case. Record results in a format that keeps every model's answer to every case in one comparable row:

| test_id | category | base result | teacher result | final result | verdict |
|---|---|---|---|---|---|
| gen-014 | general knowledge | pass | pass | **fail** | LOST — regression |
| gen-031 | general knowledge | pass | pass | pass | unchanged |
| niche-002 | domain-specific | fail | pass | pass | GAINED |
| niche-017 | domain-specific | fail | fail | **fail** | unchanged (still a gap) |
| niche-009 | domain-specific | fail | n/a (no teacher) | pass | GAINED |

With results recorded this way, look specifically for three patterns rather than one aggregate score:

**Capability gained.** Niche cases that now pass and did not before. This is the expected, desired outcome of fine-tuning or distillation — confirm it happened, and confirm on how many of the niche cases, not just a couple of anecdotal successes.

**Capability lost.** General cases that used to pass on the base (or teacher) model and no longer pass on the final model. This is the regression check most teams skip entirely, precisely because it requires having run the base model on the same set in the first place — which is the whole reason lineage-wide testing exists rather than final-model-only testing.

**Capability unchanged.** Cases that pass (or fail) identically across every model in the lineage. This sounds like a null result but is a useful sanity signal in its own right: it confirms the run pipeline itself is comparable across models (same prompt formatting, same scoring, no broken harness) and that the training didn't have some diffuse, unintended effect across everything rather than the targeted effect it was supposed to have.

A distilled or fine-tuned model with heavy gains and zero losses on this table is exactly what "successful" should look like. A model with gains but also unexplained losses on unrelated general cases is a model with catastrophic forgetting that a single-model spot check would never have surfaced.

## How this relates to standard published benchmarks

Public benchmarks and this custom lineage test set answer different questions, and neither substitutes for the other.

**MMLU, HellaSwag, HumanEval, and GSM8K** measure broad, general capability — academic-subject knowledge, commonsense reasoning, code generation, and grade-school math word problems respectively (GSM8K: Cobbe et al., 2021). **MT-Bench** scores multi-turn conversational quality using an LLM judge. These are covered in depth, including scoring methodology and citations, in [LLM Evaluation Methods](/guides/llm-evaluation-methods/) — this guide does not re-derive them.

**Aggregated leaderboards** compile scores like these (and others) across many models for at-a-glance comparison. Artificial Analysis publishes an "Intelligence Index" that combines results from multiple individual benchmarks — reasoning, coding, domain knowledge, and real-world task benchmarks — into one composite score per model, alongside separate cost and speed metrics.[^aa] Arena (arena.ai) runs a crowdsourced, blind pairwise-voting leaderboard scored by Elo rating; it is the platform long known as LMSYS Chatbot Arena and more recently as LMArena, which rebranded to Arena on 28 January 2026, per the platform's own announcement (the historical `lmarena.ai` domain now redirects to `arena.ai`).

The honest framing for where each fits: standard benchmarks and leaderboards are genuinely useful **before** you fine-tune anything, to compare candidate base or teacher models on general capability and pick a reasonable starting point. What they cannot do is tell you anything about your niche domain, because by construction they were built to be general — MMLU will never contain your internal ticketing taxonomy, and Arena's voters were never asked your company's actual support questions. If the entire point of the fine-tune is niche performance, a custom test set built from your own real questions, documents, or tickets is not optional — it is the only instrument that measures the thing you actually changed. Use public benchmarks to choose a starting lineage; use the lineage-wide custom test set from this guide to judge what you did to it.

## Using agents as part of the test harness

Two agent-based techniques extend this methodology past what a human reviewer can keep up with.

**Agent-as-judge grading for free-text answers at scale.** When the test set is large enough that a human cannot review every answer, and cosine similarity alone is too crude to certify correctness, an LLM- or agent-based judge can grade each answer against the expected answer and a rubric, at whatever volume the test set requires. [LLM-as-a-judge](/glossary/llm-as-a-judge/) covers the single-model version of this (a judge model scores an answer against criteria) and its known biases; [agent-as-a-judge](/glossary/agent-as-a-judge/) covers the higher-fidelity version, where the judge is itself a full agentic system that can take actions — run code, query a document, check a fact — rather than only reading text, which matters when "correct" cannot be verified by inspection alone.

**Agentic end-to-end testing as a higher-fidelity check than isolated Q&A.** Every technique above tests the model answering isolated questions. A model can pass every isolated test case and still fail in production if the failure only shows up across a multi-step task — an agent that uses the fine-tuned model as one tool among several, in a realistic workflow with actual tool calls, actual intermediate state, and actual error conditions. Running the fixed test set is necessary but not sufficient; where the model is deployed as part of an agent, also run it inside that agent doing the actual job, and evaluate the trajectory, not just the final text. [Testing and Evaluating AI Agent Performance](/guides/agent-evaluation-guide/) covers evaluation frameworks for that kind of multi-step, tool-using behavior, and [Testing AI Agent Tool Calls](/guides/testing-agent-tool-calls/) covers the mechanics — mocking tool responses, testing tool-selection logic, and sandboxed execution — for building that harness.

## The regulatory boundary: what this testing does and doesn't require

Everything in this guide is black-box behavioral testing: you send inputs to a model, observe outputs, and score them against expected answers. None of it requires, or benefits from, visibility into any model's training data. That is exactly the right and sufficient level of diligence for the question "is this model good enough for my use case" — including for a proprietary third-party model whose training data you will never see and have no right to see.

Training-data visibility is a different question that arises for different reasons entirely, not from wanting to evaluate a model's behavior:

- It becomes **your own obligation** if fine-tuning or distillation makes you a provider of a new or modified general-purpose AI model in scope of the EU AI Act — Article 53(1)(d) requires GPAI providers to publish a "sufficiently detailed summary" of training content, using a template the European Commission published on 24 July 2025, with no exemption for open-source releases.[^gpai-template]
- It becomes relevant under **Annex III data-governance duties** if the model is deployed as part of a high-risk AI system, which imposes its own Article 10 data-governance requirements independent of Article 53.

Neither of those is triggered by testing a model against your own fixed test set. Do not conflate "I want to know if this model is good enough" with "I need to see inside its training data" — they are different questions, and the methodology in this guide fully answers the first one without touching the second. See [AI Transparency Obligations Across EU Regulations](/guides/ai-transparency-obligations/) for the regulatory depth on when the second question does apply.

## Sources

1. Sudalairaj, S. et al., "LAB: Large-Scale Alignment for ChatBots": [https://arxiv.org/abs/2403.01081](https://arxiv.org/abs/2403.01081)
2. Cobbe, K. et al., "Training Verifiers to Solve Math Word Problems" (introduces the GSM8K benchmark): [https://arxiv.org/abs/2110.14168](https://arxiv.org/abs/2110.14168)
3. Zheng, L. et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena": [https://arxiv.org/abs/2306.05685](https://arxiv.org/abs/2306.05685)
4. Artificial Analysis, "Intelligence Index methodology": [https://artificialanalysis.ai/](https://artificialanalysis.ai/)
5. Arena, official leaderboard site (formerly LMArena / LMSYS Chatbot Arena): [https://arena.ai/](https://arena.ai/)
6. European Commission, "Explanatory Notice and Template for the Public Summary of Training Content for General-Purpose AI Models": [https://digital-strategy.ec.europa.eu/en/library/explanatory-notice-and-template-public-summary-training-content-general-purpose-ai-models](https://digital-strategy.ec.europa.eu/en/library/explanatory-notice-and-template-public-summary-training-content-general-purpose-ai-models)
7. Arena, "LMArena is now Arena" (28 January 2026): [https://arena.ai/blog/lmarena-is-now-arena](https://arena.ai/blog/lmarena-is-now-arena)

[^aa]: Artificial Analysis's specific composite benchmarks and model rankings change frequently; this guide describes the methodology's shape (a composite index built from multiple underlying benchmarks) rather than citing current scores, which would be stale within days.
[^gpai-template]: GPAI models placed on the market before 2 August 2025 have until 2 August 2027 to publish a compliant summary; providers must explicitly flag in the summary where information is unavailable or unreasonably burdensome to retrieve.

## Further reading

- [Fine-Tuning LLMs — A Practical Guide](/guides/fine-tuning-llms-guide/) and [LoRA and QLoRA](/glossary/lora/): companion material on what training technically touched — read alongside this guide to cover both "what changed" and "does it work."
- [LLM Evaluation Methods](/guides/llm-evaluation-methods/): full treatment of automated metrics, LLM-as-judge, human evaluation protocols, and standard benchmark suites referenced here.
- [Testing and Evaluating AI Agent Performance](/guides/agent-evaluation-guide/): evaluation frameworks for multi-step, tool-using agent behavior, for the end-to-end testing pattern above.
- [Embedding Model Comparison and Selection Guide](/guides/embedding-model-comparison/): choosing the embedding model that computes the similarity scores described here.
- [Model Lineage](/glossary/model-lineage-glossary/): the underlying concept of a model's provenance chain that this methodology tests across.
- [Golden Dataset](/glossary/golden-dataset/): the general pattern of a curated, fixed evaluation set that the test-case set in this guide is one application of.
