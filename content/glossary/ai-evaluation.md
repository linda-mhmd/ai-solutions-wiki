---
title: "AI Evaluation"
description: "The whole practice of judging whether an AI system is fit for use, spanning benchmarks, red-teaming, human review, LLM-as-a-judge, and live monitoring."
date: 2026-06-29
tags: ["evaluation", "benchmarks", "red-teaming", "ai-safety", "llm"]
related:
  - glossary/ai-benchmark
  - glossary/red-teaming
  - glossary/rag-evaluation
  - glossary/model-evaluation
  - glossary/system-evaluation
  - glossary/agent-evaluation
  - glossary/workflow-evaluation
  - guides/how-ai-models-are-evaluated
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/operator-circular-screens-notext.png" alt="An operator at a circular station surrounded by floating red data screens, representing the practice of measuring AI systems." loading="lazy">
  <figcaption>Evaluation is the control room around an AI system: many instruments, many views, one question - is this fit for use?</figcaption>
</figure>

AI evaluation is the whole practice of judging whether an AI system is fit for use. It is not one test or one tool. It is the umbrella over everything you do to answer three questions: Is the output correct? Is it safe? Does it hold up in the real conditions you plan to deploy it in? Evaluation combines standardized tests, adversarial probing, human review, automated scoring, and ongoing monitoring after launch. No single method covers all three questions, so a serious evaluation stacks several methods together.

## A concrete analogy

Think of certifying a new car before it goes on sale. A crash test is one instrument. A fuel-economy test is another. A test driver on real roads is a third. The regulator does not pick one and call the job done. They run the full battery, then keep watching for recalls once the car is on the road. AI evaluation works the same way. A [benchmark](/glossary/ai-benchmark/) is the crash test: a fixed, repeatable measurement. [Red-teaming](/glossary/red-teaming/) is the stress driver trying to break it on purpose. Human review is the expert judgement no automated score captures. Live monitoring is the recall watch after launch.

## Evaluation is the parent concept

Beginners often say "benchmark" when they mean "evaluation". They are not the same. Evaluation is the practice. A benchmark is one tool inside it. The hierarchy looks like this:

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">The practice</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">AI evaluation</span>
      <span class="bz-arch-chip-note">judging whether an AI system is fit for use</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Methods</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Benchmarks</span>
      <span class="bz-arch-chip">Red-teaming</span>
      <span class="bz-arch-chip">Human review</span>
      <span class="bz-arch-chip">LLM-as-a-judge</span>
      <span class="bz-arch-chip">Live monitoring</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Building blocks</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Test cases</span>
      <span class="bz-arch-chip">Rubrics and metrics</span>
      <span class="bz-arch-chip">Datasets</span>
      <span class="bz-arch-chip-note">the individual inputs and scoring rules each method runs on</span>
    </div>
  </div>
</div>

Each method answers a different slice of the question. A [benchmark](/glossary/ai-benchmark/) gives you a fair, repeatable score against a fixed rubric. [Red-teaming](/glossary/red-teaming/) probes for failures a benchmark never lists, from jailbreaks to unsafe advice. Human review catches the quality that no automated metric captures, like tone, nuance, and factual grounding. LLM-as-a-judge uses one model to score another model's output at scale. It is fast and cheap, but it can be fooled, so teams use it to supplement human judgement, not replace it, and have experts check a sample to confirm the automated scorer agrees with them. Live monitoring watches the system in production, where real users send inputs no test set anticipated.

## Four things you can evaluate

The single most useful distinction in this field is what you are actually measuring. The same word "evaluation" covers four different targets, and confusing them is a common, expensive mistake.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Level 1</span>
    <span class="bz-flow-step-name">Model</span>
    <span class="bz-flow-step-desc">The raw model on its own. Knowledge, reasoning, and language ability, measured with fixed benchmarks.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Level 2</span>
    <span class="bz-flow-step-name">System</span>
    <span class="bz-flow-step-desc">The model plus its prompts, retrieval, and guardrails, judged end to end as one product.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Level 3</span>
    <span class="bz-flow-step-name">Agent</span>
    <span class="bz-flow-step-desc">A system that plans, calls tools, and acts over many turns. You judge the trajectory, not one answer.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Level 4</span>
    <span class="bz-flow-step-name">Workflow</span>
    <span class="bz-flow-step-desc">Several agents or steps chained into a business process. You judge the whole pipeline and its outcome.</span>
  </div>
</div>

- [Model evaluation](/glossary/model-evaluation/): tests the raw model in isolation, usually with standardized benchmarks for knowledge and reasoning.
- [System evaluation](/glossary/system-evaluation/): tests the model together with its prompts, retrieval, and guardrails, the thing your users actually touch.
- [Agent evaluation](/glossary/agent-evaluation/): tests a system that acts over many steps, so you score the plan, the tool calls, and the path, not one reply.
- [Workflow evaluation](/glossary/workflow-evaluation/): tests a chain of steps or agents wired into a real process, judging the end result of the pipeline.

A model can score well on a benchmark and still fail as a system, because your prompt, your data, and your guardrails all change the outcome. This is why a strong model evaluation never guarantees a strong product. You have to evaluate at every level you deploy at.

## How it connects to related concepts

If your product retrieves documents before answering, you also need [RAG evaluation](/glossary/rag-evaluation/), which measures whether the retrieved context was relevant and whether the answer stayed grounded in it. For a step-by-step walkthrough of running these tests in practice, see the guide on [how AI models are evaluated](/guides/how-ai-models-are-evaluated/). Use this page as a hub: pick the level you are deploying at, then follow the link to the method that measures it.

## Further reading

- [AI benchmark](/glossary/ai-benchmark/): the standardized, scored test that sits inside evaluation.
- [Red-teaming](/glossary/red-teaming/): adversarial probing for failures a benchmark never lists.
- [Model evaluation](/glossary/model-evaluation/): judging the raw model on its own.
- [System evaluation](/glossary/system-evaluation/): judging the model plus prompts, retrieval, and guardrails.
- [Agent evaluation](/glossary/agent-evaluation/): judging a system that plans and acts over many turns.
- [Workflow evaluation](/glossary/workflow-evaluation/): judging a chain of steps or agents as one process.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): a practical walkthrough of running these tests.
- [NVIDIA: Mastering Agentic Techniques, AI Agent Evaluation](https://developer.nvidia.com/blog/mastering-agentic-techniques-ai-agent-evaluation/): end-to-end, trajectory, and component evaluation levels explained.
