---
title: "AI Safety"
description: "What AI safety is, the categories of harm it addresses, and the technical and organizational approaches to preventing AI systems from causing unintended damage."
date: 2026-03-28
categories: [Glossary]
tags: [ai-safety, alignment, guardrails, red-teaming, responsible-ai, governance]
related:
  - glossary/responsible-ai
  - glossary/red-teaming
  - glossary/hallucination
  - patterns/guardrails-pattern
  - patterns/prompt-injection-defense
last_updated: 2026-05-30
---

AI safety is the field concerned with preventing AI systems from causing harm, whether through misuse, misalignment with intended objectives, unexpected behavior, or failure modes that were not anticipated during development. It spans technical research on alignment and robustness, engineering practices for building reliable systems, and governance frameworks for managing AI risk.

## Categories of Harm

**Direct harm from outputs** - AI systems generating dangerous instructions, toxic content, private information, or misleading advice. A medical AI providing incorrect treatment recommendations or a coding assistant generating vulnerable code are examples of direct output harm.

**Misalignment** - The AI system optimizes for a proxy objective that diverges from the intended goal. A recommendation system optimizing for engagement that promotes increasingly extreme content is misaligned, even though it is technically performing well on its optimization target.

**Robustness failures** - The system behaves correctly under normal conditions but fails unpredictably under adversarial inputs, distribution shift, or edge cases. Prompt injection attacks that cause a system to ignore its safety instructions are a robustness failure.

**Systemic risk** - Harm that emerges from widespread deployment rather than individual system failures. Concentration of decision-making in AI systems, automation of surveillance, or AI-accelerated disinformation campaigns represent systemic risks.

## Technical Approaches

**Alignment techniques** - Methods to ensure AI systems pursue intended objectives. Reinforcement learning from human feedback (RLHF), constitutional AI, and preference optimization train models to produce outputs consistent with human values and instructions.

**Guardrails and filters** - Input and output filtering that blocks harmful requests and responses. Content classifiers, topic restrictions, and structured output validation prevent the system from producing prohibited content.

**Red teaming** - Systematic adversarial testing to discover failure modes before deployment. Red teams attempt to elicit harmful behavior through creative prompting, edge cases, and attack techniques. Findings drive safety improvements.

**Monitoring and circuit breakers** - Runtime monitoring that detects anomalous behavior and triggers automated responses: rate limiting, human escalation, or system shutdown when safety thresholds are violated.

## Organizational Practices

AI safety requires organizational commitment beyond technical measures. Safety review processes before deployment, incident response procedures for safety failures, clear accountability for safety decisions, and a culture that prioritizes safety over speed-to-market are all necessary components. Regulatory frameworks like the EU AI Act are formalizing these requirements into law.

## Sources

- Russell, S. (2019). *Human Compatible: Artificial Intelligence and the Problem of Control.* Viking. (Accessible treatment of alignment and value misalignment risks.)
- Amodei, D., et al. (2016). Concrete problems in AI safety. *arXiv:1606.06565*. (Foundational taxonomy of AI safety problems: reward hacking, side effects, safe exploration, distributional shift.)
- Ouyang, L., et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS 2022*. (InstructGPT/RLHF; alignment via human preference.)
- Bai, Y., et al. (2022). Constitutional AI: Harmlessness from AI feedback. *arXiv:2212.08073*. (Anthropic's Constitutional AI method.)
- National Institute of Standards and Technology. (2023). *AI Risk Management Framework (AI RMF 1.0)*. NIST. (US government framework for AI safety and risk management.)

## Further reading

- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): how red teaming, benchmarks, and safety testing combine into a model evaluation lifecycle.
- [AI benchmark](/glossary/ai-benchmark/): standardized tests used to measure model capability and track safety-relevant behavior over time.
