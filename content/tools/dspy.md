---
title: "DSPy - Programming with Foundation Models"
description: "A comprehensive reference for DSPy: declarative language model programming, automatic prompt optimization, and systematic LLM pipeline development."
date: 2026-03-28
categories: [Tools]
tags: [dspy, prompt-optimization, LLM, framework, python, ML]
related:
  - tools/langchain
  - tools/instructor
  - tools/amazon-bedrock
last_updated: 2026-05-30
---

DSPy (Declarative Self-improving Python) is a framework from Stanford NLP that replaces hand-written prompts with declarative modules that are compiled (optimized) automatically. Instead of crafting prompt text manually, you define the input-output behavior you want, provide a few examples, and DSPy's optimizers find the prompt instructions, few-shot examples, and even fine-tuning configurations that maximize a metric you define. For AI projects, DSPy addresses the fragility of prompt engineering by making LLM pipelines systematic, reproducible, and automatically optimizable.

Official documentation: https://dspy-docs.vercel.app/

## Core Concepts

**Signature** - A declarative specification of a module's input-output behavior. A signature like `"question -> answer"` declares that the module takes a question and produces an answer. Signatures can include field descriptions for more precise control: `"question: str, context: str -> answer: str, confidence: float"`.

**Module** - A composable building block. Built-in modules include Predict (basic LLM call), ChainOfThought (adds reasoning before answering), ReAct (reasoning with tool use), and ProgramOfThought (generates and executes code). You compose modules into pipelines by calling them within a Python class.

**Teleprompter (Optimizer)** - The component that compiles a program by finding optimal prompts or fine-tuning data. Optimizers include BootstrapFewShot (selects effective few-shot examples), BootstrapFewShotWithRandomSearch (searches example combinations), MIPRO (multi-prompt instruction proposal and optimization), and COPRO (collaborative prompt optimization). Each optimizer tries different configurations and keeps what maximizes your metric.

**Metric** - A function that scores the quality of a module's output. Metrics can be simple (exact match, F1 score) or complex (LLM-as-judge evaluation). The metric drives the optimization: the teleprompter tries different prompt configurations and keeps the ones that score highest on your development examples.

## How DSPy Differs from Prompt Engineering

Traditional prompt engineering is manual, iterative, and brittle. You write a prompt, test it, tweak it, and repeat. When you change the model, the data, or the task slightly, prompts often need rewriting.

DSPy treats LLM calls as parameterized functions. The parameters (prompt instructions, few-shot examples, fine-tuning weights) are optimized automatically against your metric and examples. When the model or data changes, you re-run the optimizer rather than manually adjusting prompts. This is analogous to how ML engineers train models on data rather than hand-tuning weights.

## Building a DSPy Pipeline

A typical pipeline:

```python
class RAGPipeline(dspy.Module):
    def __init__(self):
        self.retrieve = dspy.Retrieve(k=5)
        self.generate = dspy.ChainOfThought("context, question -> answer")

    def forward(self, question):
        context = self.retrieve(question).passages
        return self.generate(context=context, question=question)
```

To optimize this pipeline, provide training examples (question-answer pairs), define a metric, and run an optimizer:

```python
optimizer = BootstrapFewShot(metric=exact_match)
compiled_rag = optimizer.compile(RAGPipeline(), trainset=train_examples)
```

The optimizer finds few-shot examples and prompt configurations that maximize exact match accuracy on your training set.

## When to Use DSPy

DSPy is most valuable when you have a quality metric and development examples. Without these, the optimizer has nothing to optimize against, and you are better off with manual prompt engineering.

Strong use cases include: classification pipelines with labeled validation data, extraction tasks with known correct outputs, multi-step reasoning where intermediate steps can be evaluated, and any LLM task where you need to systematically improve quality beyond ad-hoc prompt tweaking.

DSPy is less suitable for open-ended creative tasks where quality is subjective, one-off tasks that do not justify the optimization overhead, or simple single-turn interactions where a basic prompt suffices.

## Integration with LLM Providers

DSPy supports multiple LLM backends: OpenAI, Anthropic, Bedrock, and local models. Switching providers is a configuration change. This model-agnosticism, combined with automatic prompt optimization, means a DSPy pipeline can be ported to a different model and re-optimized without rewriting prompts.

## Pricing

DSPy is open-source (MIT license) and free. The optimization process consumes LLM API calls (potentially hundreds to thousands during compilation), so factor API costs into the development budget. The trade-off is one-time optimization cost versus ongoing savings from higher-quality, more reliable outputs.
