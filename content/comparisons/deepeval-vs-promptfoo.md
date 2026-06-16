---
title: "DeepEval vs Promptfoo for LLM Evaluation in CI"
description: "Comparing DeepEval and Promptfoo for automated LLM evaluation: metrics, CI integration, configuration, pricing, and when to choose each."
date: 2026-03-28
last_verified: 2026-06-14
categories: [Comparisons]
tags: [deepeval, promptfoo, evaluation, testing, llm, ai-engineering]
related:
  - guides/testing-llm-applications
  - guides/ci-cd-testing-ai
  - guides/testing-ai-systems
  - patterns/statistical-assertion
last_updated: 2026-06-14
lastmod: 2026-06-14
---

DeepEval and Promptfoo are the two most widely adopted open-source frameworks for evaluating LLM outputs in CI pipelines. Both enable automated quality checks on model outputs, but they take different approaches: DeepEval integrates as pytest test cases with built-in LLM-powered metrics, while Promptfoo uses YAML configuration with a CLI-first approach and supports multi-provider comparison. This comparison helps you choose the right tool for your evaluation workflow.

DeepEval is maintained by Confident AI under the Apache 2.0 license. Promptfoo is MIT licensed, and in March 2026 its company agreed to be acquired by OpenAI. The maintainers committed to keeping the open-source suite free and to continuing support for a diverse range of providers and models, so the cross-provider workflow described below remains intact, but teams evaluating long-term governance should factor the change of ownership into their decision.

## Architecture

**DeepEval** is a Python library that integrates with pytest. You write evaluation tests as Python functions, define test cases with inputs and expected outputs, and run metrics that score the outputs. Results appear as pytest pass/fail outcomes with detailed metric scores. You run the suite with the `deepeval test run` command rather than invoking pytest directly, which adds the framework's own collection and reporting on top of pytest. The library ships 50 or more research-backed metrics and supports composing custom ones through G-Eval (criteria-based chain-of-thought scoring) and DAG metrics (directed-acyclic-graph scoring for multi-step conditional logic).

```python
from deepeval import assert_test
from deepeval.metrics import AnswerRelevancyMetric, FaithfulnessMetric
from deepeval.test_case import LLMTestCase

def test_rag_quality():
    test_case = LLMTestCase(
        input="What is the company's revenue?",
        actual_output="The company reported $10M in revenue.",
        retrieval_context=["Revenue was $10M in Q3 2025."]
    )
    relevancy = AnswerRelevancyMetric(threshold=0.7)
    faithfulness = FaithfulnessMetric(threshold=0.8)
    assert_test(test_case, [relevancy, faithfulness])
```

**Promptfoo** is a CLI tool configured via YAML. You define prompts, providers (model APIs), and test cases in a configuration file, then run `promptfoo eval` to execute all combinations and produce a results table.

```yaml
prompts:
  - "Answer based on context: {{context}}\nQuestion: {{question}}"
providers:
  - openai:gpt-4o-mini
tests:
  - vars:
      question: "What is the revenue?"
      context: "Revenue was $10M in Q3 2025."
    assert:
      - type: llm-rubric
        value: "Answer mentions $10M revenue"
      - type: contains
        value: "$10M"
```

## Metrics

**DeepEval** provides built-in metrics powered by LLMs:
- Answer relevancy (does the answer address the question?)
- Faithfulness (does the answer stay within the provided context?)
- Hallucination detection
- Contextual precision and recall
- Bias and toxicity detection
- Custom metrics via Python functions

**Promptfoo** supports assertion-based evaluation:
- String matching (contains, equals, regex)
- LLM-as-judge rubric evaluation
- Similarity scoring (cosine, Levenshtein)
- JSON schema validation
- Custom JavaScript/Python assertion functions
- Model-graded evaluations

**Comparison:** DeepEval's built-in metrics are more sophisticated out of the box, especially for RAG evaluation (faithfulness and hallucination). Promptfoo is more flexible for custom assertions and supports a wider variety of simple checks without requiring LLM calls.

## CI Integration

**DeepEval** integrates naturally with CI because it builds on pytest. Any CI system that runs Python can run DeepEval tests. The framework recommends executing the suite with `deepeval test run` rather than calling pytest directly, which avoids unexpected errors and produces a consolidated report. DeepEval also offers Confident AI (the company behind the framework) as a cloud platform for tracking results over time.

```yaml
# GitHub Actions with DeepEval
- run: deepeval test run tests/eval/
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

**Promptfoo** runs as a CLI command and outputs results in multiple formats (table, JSON, CSV, HTML). CI integration calls `promptfoo eval` and checks the exit code: the command returns 100 when at least one test case fails or the pass rate falls below `PROMPTFOO_PASS_RATE_THRESHOLD`, and the `--fail-on-error` flag makes the run fail on provider or assertion errors. There is also an official GitHub Action (`promptfoo/promptfoo-action`) that runs on pull requests and posts a summary comment linking to the results.

```yaml
# GitHub Actions with Promptfoo
- run: npx promptfoo@latest eval --no-cache --fail-on-error -o results.json
```

**Comparison:** DeepEval integrates more smoothly with Python CI workflows. Promptfoo works better in Node.js/TypeScript environments and for teams that prefer YAML configuration over Python code.

## Multi-Provider Comparison

**Promptfoo** excels at comparing outputs across multiple models. Define several providers and see results side by side.

```yaml
providers:
  - openai:gpt-4o
  - openai:gpt-4o-mini
  - anthropic:messages:<model-id>
```

Provider strings follow the `provider:model` form, so you can drop in the current frontier models from OpenAI, Anthropic, Google, and others (or your own self-hosted endpoints) without changing the test set. This is Promptfoo's standout feature: quickly comparing model quality, cost, and latency across providers for the same tests.

**DeepEval** evaluates one output at a time. Comparing models requires writing separate test functions or parameterizing tests, which is possible but less ergonomic.

**Winner: Promptfoo** for model comparison workflows.

## Safety and Red Teaming

Both tools cover safety, but at different depths.

**Promptfoo** ships a dedicated red teaming module that automatically generates adversarial inputs to probe an application before deployment. It organizes failure modes into plugins (prompt injection, jailbreaks, PII leakage, broken object-level and function-level authorization, harmful content, and more) and maps results to recognized frameworks including the OWASP LLM Top 10, the NIST AI Risk Management Framework, and the EU AI Act. This security and red teaming focus is the capability OpenAI cited when it agreed to acquire the company in 2026.

**DeepEval** provides safety-oriented metrics (bias, toxicity, and hallucination) and supports red teaming workflows, but its center of gravity is correctness and RAG quality evaluation rather than full adversarial penetration testing.

**Winner: Promptfoo** for adversarial red teaming and security testing.

## Prompt Development Workflow

**Promptfoo** includes a web UI for reviewing results visually, making it useful during prompt development iterations. You can see outputs from different prompts and models side by side, identify patterns, and refine prompts interactively.

**DeepEval** focuses on CI-time evaluation rather than interactive prompt development. It is better suited for automated quality gates than for exploratory prompt engineering.

**Winner: Promptfoo** for prompt development. **DeepEval** for automated quality gates.

## Cost

Both are open source and free for local use (DeepEval under Apache 2.0, Promptfoo under MIT). DeepEval's LLM-powered metrics require API calls to a judge model to evaluate, adding cost per evaluation. Promptfoo's string-based assertions are free; its LLM-rubric and model-graded assertions also require API calls.

Confident AI, the company that maintains DeepEval, sells a paid cloud platform for tracking evaluation results, tracing, and dataset and prompt management over time. Promptfoo offers a paid enterprise and cloud option for team collaboration, result storage, and managed red teaming. Following the 2026 OpenAI acquisition, the Promptfoo maintainers stated the open-source CLI stays free and continues to support multiple providers, but commercial roadmap decisions now sit with OpenAI.

## Recommendation

**Choose DeepEval** if your team works in Python, you need sophisticated RAG evaluation metrics (faithfulness, hallucination), and you want evaluation integrated into your pytest workflow as first-class test cases.

**Choose Promptfoo** if you need to compare multiple models or prompts, prefer YAML configuration over Python code, want a visual UI for reviewing results, or your team works primarily in JavaScript/TypeScript.

**Use both** if your workflow involves prompt development (Promptfoo for iteration and comparison) followed by CI quality gates (DeepEval for automated regression testing). The tools address different stages of the development lifecycle and complement each other well.

## Sources

- [DeepEval documentation](https://deepeval.com/) - the LLM evaluation framework by Confident AI, metrics, and pytest-native evals.
- [DeepEval: Unit Testing in CI/CD](https://deepeval.com/docs/evaluation-unit-testing-in-ci-cd) - using `deepeval test run` and `assert_test` in pipelines.
- [Promptfoo documentation](https://www.promptfoo.dev/docs/intro/) - open-source CLI and library for evaluating and red teaming LLM apps.
- [Promptfoo: CI/CD integration](https://www.promptfoo.dev/docs/integrations/github-action/) - the official `promptfoo/promptfoo-action` GitHub Action and exit-code behavior.
- [Promptfoo: LLM red teaming](https://www.promptfoo.dev/docs/red-team/) - adversarial plugins and framework coverage (OWASP LLM Top 10, NIST AI RMF).
- [Promptfoo is joining OpenAI](https://www.promptfoo.dev/blog/promptfoo-joining-openai/) - acquisition announcement and the open-source and multi-provider commitments (March 2026).
- [OpenAI to acquire Promptfoo](https://openai.com/index/openai-to-acquire-promptfoo/) - OpenAI's announcement of the acquisition.
