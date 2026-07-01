---
title: "Red Teaming"
description: "What red teaming is in AI, how adversarial testing discovers vulnerabilities and failure modes before deployment, and best practices for running red team exercises."
date: 2026-03-28
categories: [Glossary]
tags: [red-teaming, adversarial-testing, ai-safety, security, evaluation, guardrails]
related:
  - glossary/ai-safety
  - glossary/hallucination
  - patterns/prompt-injection-defense
  - patterns/guardrails-pattern
  - guides/red-teaming-ai
last_updated: 2026-05-30
---

Red teaming in AI is the practice of systematically probing an AI system to discover vulnerabilities, failure modes, harmful outputs, and policy violations before the system is deployed to users. A red team plays the role of an adversary, using creative and structured techniques to elicit behavior that the system's designers intended to prevent.

## Origins

The term comes from military and cybersecurity practice, where a red team simulates enemy attacks against an organization's defenses to identify weaknesses. In the AI context, red teaming was popularized by major model providers who used it to evaluate language models before public release. Microsoft, OpenAI, Anthropic, and Google have all published accounts of red teaming exercises used to discover and mitigate harmful model behaviors.

## What Red Teams Test For

**Harmful content generation** - Attempts to make the model produce dangerous, illegal, or toxic content. This includes instructions for weapons, exploitation, harassment, and other prohibited content categories.

**Prompt injection** - Techniques that attempt to influence or bypass the model's intended instructions. Injection does not literally overwrite the system prompt. It smuggles in competing instructions through jailbreaks, role-playing attacks, or instruction smuggling, so the model follows the attacker rather than its guardrails.

**System prompt extraction** - Attempts to reveal the hidden system prompt or developer instructions behind the model.

**Sensitive data leakage** - Attempts to extract training data, personal information, or proprietary information from the model's responses.

**Bias and discrimination** - Probing for differential treatment across demographic groups, stereotyping, or discriminatory outputs.

**Factual reliability** - Testing whether the model fabricates information, invents citations, or presents speculation as fact in domain-specific contexts.

## Automated and agentic red teaming

Red teaming is no longer only humans typing adversarial prompts. It is increasingly automated, continuous, and agentic. Language models now generate adversarial prompts at scale, and newer systems let one model autonomously probe another, finding and exploiting weaknesses without a person driving each step. This shift, AI systems red teaming other AI systems, is why evaluation is moving toward dynamic, always-on testing rather than a single pre-release review. Benchmarks such as AIRTBench measure exactly this autonomous red-teaming capability. See [how AI models are evaluated](/guides/how-ai-models-are-evaluated/) and the [AI benchmark](/glossary/ai-benchmark/) entry for how these pieces fit together.

## Running a Red Team Exercise

Assemble a diverse team including security specialists, domain experts, creative writers, and people with different cultural backgrounds. Define the scope: which attack categories to prioritize, which system configurations to test, and what constitutes a finding versus expected behavior.

Provide structured attack templates but also allow open-ended exploration. Some of the most impactful findings come from creative, unstructured probing. Document every finding with the exact input that triggered it, the model's response, and the severity classification. Track findings in a structured database to enable trend analysis across red teaming rounds.

## Integrating Red Teaming into Development

Red teaming should not be a one-time event. Run red team exercises before major releases, after significant model or prompt changes, and on a regular cadence for production systems. Automate repeatable test cases from previous red team findings to create regression test suites. Use red team findings to improve guardrails, refine system prompts, and update content filtering rules.

## Sources

- Perez, E., et al. (2022). Red teaming language models with language models. *arXiv:2202.03286*. (Automated red teaming using LLMs to generate adversarial prompts at scale; foundational methodology paper.)
- Ganguli, D., et al. (2022). Red teaming language models to reduce harms: Methods, scaling behaviors, and lessons learned. *arXiv:2209.07858*. (Anthropic's red teaming methodology; documents adversarial attack categories and mitigation findings.)
- Perez, F., & Ribeiro, I. (2022). Ignore previous prompt: Attack techniques for language models. *NeurIPS 2022 ML Safety Workshop*. (Prompt injection attacks; the primary red teaming threat vector for LLM-based AI systems.)

## Further reading

- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): where red teaming fits in the wider model evaluation lifecycle, alongside benchmarks and safety testing.
- [AI benchmark](/glossary/ai-benchmark/): standardized tests that complement red teaming by measuring capability rather than adversarial failure modes.
