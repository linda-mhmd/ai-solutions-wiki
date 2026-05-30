---
title: "Prompt Engineering"
description: "What prompt engineering is, why it matters in enterprise AI applications, and the most effective techniques for getting reliable outputs from LLMs."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "beginner", "prompt-engineering", "llm", "instructions", "few-shot", "chain-of-thought"]
related:
  - patterns/prompt-engineering-patterns
  - glossary/llm
  - glossary/fine-tuning
  - tools/claude-anthropic
  - tools/amazon-bedrock
last_updated: 2026-05-30
---

Prompt engineering is the discipline of designing and refining the text inputs sent to a language model to produce useful, accurate, and consistent outputs. As AI systems move from demos to production, prompt quality becomes a primary determinant of system quality - more than model choice for most applications.

<figure class="bz-figure">
  <img src="/img/craft/sheet-music-piano-instructions-text.png" alt="Sheet music on a piano with handwritten annotations: precise instructions that guide performance, just as prompts guide model behavior." loading="lazy">
  <figcaption>A prompt is like sheet music. The notes define what to play, the tempo markings define how to play it, and the annotations add nuance. A well-written prompt gives the model everything it needs to perform correctly.</figcaption>
</figure>

## Why Prompts Matter

An LLM is a very capable system with no default behavior beyond predicting likely text. A poorly specified prompt produces outputs that are plausible but not useful. A well-specified prompt produces outputs that are consistently structured, accurately scoped, and appropriate for the application.

The same model, given a well-engineered prompt versus a vague one, can appear to be a completely different tool. Most published benchmark comparisons between models are prompt-dependent - a model that performs poorly on a task often performs comparably with better prompting.

## Core Techniques

**Be explicit about the task** - Do not assume the model understands the context. Describe the task completely: what you are providing as input, what you want as output, what constraints apply.

**Specify output format** - If you need JSON, ask for JSON and provide the schema. If you need a list, ask for a numbered list. Format specification is one of the highest-leverage improvements for application integration.

**Use examples** - Include 2-4 representative input/output examples (few-shot prompting). Examples are more reliable than descriptions for establishing expected output format and tone, especially for nuanced classification or extraction tasks.

**Separate instructions from content** - Use XML tags or clear delimiters to separate the system instructions from the input content: `<document>{{content}}</document>`. This prevents instruction injection from user-provided inputs.

**Chain of thought for reasoning** - For multi-step reasoning tasks, ask the model to work through its reasoning before giving a final answer: "Think through this step by step before giving your conclusion." This improves accuracy on complex tasks.

**State constraints explicitly** - Tell the model what not to do: "Answer only from the information provided. If the answer is not in the provided text, say so explicitly."

## System vs User Prompts

In API usage, prompts are divided into:
- **System prompt** - Instructions, persona, and constraints that apply to all interactions. Defines the model's behavior and the task context.
- **User message** - The specific input for this particular request.

Keep system prompts focused. Long, complex system prompts with contradictory instructions degrade performance. A clear, concise system prompt covering role, task, output format, and key constraints (typically 200-400 tokens) outperforms longer alternatives.

## Iterative Refinement

Prompt engineering is iterative. The process is:
1. Write an initial prompt based on your understanding of the task
2. Test on 10-20 representative examples
3. Identify failure modes (wrong format, missed information, incorrect reasoning)
4. Refine the prompt to address the specific failure
5. Retest and verify that the fix does not introduce regressions

Keep a test set of examples with expected outputs. Treat prompt changes as code changes - test before deploying to production.

## Prompt Injection Risks

For applications that include user-provided text in prompts, prompt injection is a security concern. A malicious user could include text in their input that overrides the system instructions. Mitigate by: using delimiters to separate instructions from user content, validating inputs before including them in prompts, and using platform-level guardrails to filter outputs.

## Sources

- Brown, T., et al. (2020). Language models are few-shot learners. *NeurIPS 2020*. (GPT-3; demonstrated few-shot prompting as a primary method for adapting LLMs without fine-tuning.)
- Wei, J., et al. (2022). Chain-of-thought prompting elicits reasoning in large language models. *NeurIPS 2022*. (CoT prompting; showed that step-by-step reasoning in prompts substantially improves accuracy on multi-step tasks.)
- Kojima, T., et al. (2022). Large language models are zero-shot reasoners. *NeurIPS 2022*. (Zero-shot CoT; demonstrated "Let's think step by step" as a universal reasoning trigger.)
- White, J., et al. (2023). A prompt pattern catalog to enhance prompt engineering with ChatGPT. *arXiv:2302.11382*. (Systematic catalog of prompt engineering patterns for recurring interaction challenges.)
