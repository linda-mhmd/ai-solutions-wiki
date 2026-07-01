---
title: "How AI Models Are Evaluated: The Hidden Lifecycle"
description: "The invisible pipeline behind every chat box: training, alignment, red teaming, benchmarks, and monitoring that decide whether a model ships."
date: 2026-07-01
categories: [Guides]
tags: ["evaluation", "red-teaming", "benchmarks", "ai-safety", "adversarial"]
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/cycle-five-nodes-notext.png" alt="A circular five-node cycle in dark grey and red, representing the repeating lifecycle of building, testing, and releasing an AI model." loading="lazy">
  <figcaption>Model evaluation is a loop, not a finish line. Each release feeds the next round of testing.</figcaption>
</figure>

You type a question, you get an answer. That chat box is the last centimetre of a very long pipeline. Behind it sits a lifecycle of training, tuning, attacking, scoring, and watching that decides whether a model is fit to ship at all. Most of this work never reaches the public, yet it shapes every response you read.

This guide walks through that lifecycle stage by stage. It explains what a [benchmark](/glossary/ai-benchmark/) actually is, why [red teaming](/glossary/red-teaming/) borrows its playbook from the military, and why the current habit of each company grading its own homework is a problem worth naming.

## The lifecycle at a glance

A model does not go from raw data to your screen in one step. It moves through a repeating loop. When a new test exposes a weakness, the loop starts again with a fresh version.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 1</span>
    <span class="bz-flow-step-name">Training</span>
    <span class="bz-flow-step-desc">The model learns patterns from a large corpus of text, code, and other data.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 2</span>
    <span class="bz-flow-step-name">Alignment</span>
    <span class="bz-flow-step-desc">Tuning steers the model toward helpful, honest, harmless behaviour.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 3</span>
    <span class="bz-flow-step-name">Internal QA</span>
    <span class="bz-flow-step-desc">Engineers check quality, regressions, and basic behaviour before wider testing.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 4</span>
    <span class="bz-flow-step-name">Red teaming</span>
    <span class="bz-flow-step-desc">Testers try to break the model on purpose to find failures first.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 5</span>
    <span class="bz-flow-step-name">Safety benchmarks</span>
    <span class="bz-flow-step-desc">Structured test sets measure harm, bias, and refusal behaviour.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 6</span>
    <span class="bz-flow-step-name">External evaluation</span>
    <span class="bz-flow-step-desc">Outside researchers or auditors test the model, sometimes under contract.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 7</span>
    <span class="bz-flow-step-name">Release</span>
    <span class="bz-flow-step-desc">The model ships to users, often behind a gradual rollout.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 8</span>
    <span class="bz-flow-step-name">Continuous monitoring</span>
    <span class="bz-flow-step-desc">Live traffic reveals new failure modes that testing missed.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 9</span>
    <span class="bz-flow-step-name">New benchmark failures</span>
    <span class="bz-flow-step-desc">Fresh tests and real incidents expose gaps the old model cannot fix.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 10</span>
    <span class="bz-flow-step-name">Next model version</span>
    <span class="bz-flow-step-desc">Findings feed the next training run, and the loop repeats.</span>
  </div>
</div>

## Stage by stage

### Training

Training is where the model learns. It reads a large body of text, code, and other data, and it adjusts billions of internal weights to predict what comes next. At the end of training you have a raw model that knows a lot but has no manners. It will answer a dangerous question as readily as a harmless one.

### Alignment

Alignment shapes behaviour. Techniques such as instruction tuning and reinforcement learning from human feedback push the model toward being helpful, honest, and harmless. This is where the model learns to refuse clearly harmful requests and to follow instructions rather than ramble.

### Internal QA

Before anyone tries to break the model, engineers check that it works. They look for regressions against the previous version, obvious quality drops, and broken behaviour on everyday tasks. QA answers a friendly question: does the model do what we intended?

### Red teaming

Red teaming asks the opposite question: how would someone break this? The term comes from the military and from cybersecurity, where a red team plays the attacker so the defenders learn their weak points before a real adversary finds them. You can read more in the [red teaming glossary entry](/glossary/red-teaming/) and on the role of an [AI red team](/glossary/ai-red-team/).

An [AI red team](/glossary/ai-red-team/) tries to make a model misbehave on purpose. Common goals include:

- Make it hallucinate: state confident falsehoods as fact.
- Make it leak secrets: reveal training data, system prompts, or private information.
- Make it give dangerous advice: produce content that could cause real harm.
- Make it discriminate: treat people differently based on protected characteristics.
- Make it fall for [prompt injection](/glossary/prompt-injection/): follow hidden instructions smuggled into input.

The point is to find these failures before real users do. Red teaming sits inside the broader field of [adversarial machine learning](/glossary/adversarial-machine-learning/) and directly serves [AI safety](/glossary/ai-safety/).

### Safety benchmarks

A benchmark is not a vibe check. It is a designed experiment. A good safety benchmark contains many test cases, and each case carries structured metadata:

- A category, such as self-harm or misinformation.
- A persona and sometimes an age, so the test reflects a real user.
- A language, so the model is tested beyond English.
- An expected behaviour, describing the correct response.
- A scoring rubric, describing how to grade the actual response.

Automated scorers handle some of this work, but humans still score many outputs by hand. Judging whether a refusal was appropriate, or whether an answer was subtly biased, often needs a person. That human labour is a large, hidden cost of evaluation.

### External evaluation

Internal teams have blind spots. External evaluation brings in outside researchers, auditors, or specialist firms to test the model independently. Sometimes this happens under contract before release. Sometimes it happens through public challenges where many researchers probe a system at once.

### Release

Release is rarely a single switch. Models often ship through a gradual rollout, exposed to a small slice of traffic first so problems surface at low blast radius. Guides such as [from zero to production](/guides/from-zero-to-production/) cover the same staged mindset for shipping software.

### Continuous monitoring

Live users do things no test anticipated. Monitoring watches real traffic for new failure modes, abuse patterns, and drift in behaviour. This is where the [build-measure-learn](/guides/build-measure-learn/) loop applies to models: you ship, you measure, and you feed what you learn back into the next version.

### New benchmark failures and the next version

Over time, new benchmarks and real incidents expose gaps the current model cannot close through patching alone. Those findings define the goals for the next training run. The loop closes, and a new version begins the lifecycle again.

## What red teaming looks like in practice

Recent research has moved red teaming from ad hoc probing toward reproducible, dynamic benchmarks. Four examples are worth knowing because they test different surfaces.

- **RIFT-Bench** evaluates the security of agentic AI systems using a broad set of dynamically adaptable adversarial probes across diverse attack vectors. It works in two automated phases, discovery then scanning, and the authors report testing it across 45 different agentic systems (arXiv 2606.23927).
- **REALM** is a unified red-teaming benchmark for vision language models in physical-world contexts. It probes how models handle adversarial images and instructions tied to real-world and robotics tasks, across multiple attack categories (arXiv 2606.23892).
- **AIRTBench** measures whether language models can perform autonomous red teaming: independently finding and exploiting vulnerabilities without a human driving each step. The code is open source (arXiv 2506.14682).
- **The Agent Red Teaming benchmark** comes from a large-scale public competition run by Gray Swan AI with the UK AI Safety Institute. Researchers competed to break deployed [AI agents](/glossary/ai-agents/), surfacing novel attack patterns and showing that current defences often fall short when agents have tool access (arXiv 2507.20526).

These benchmarks matter because agents raise the stakes. A model that only chats can give a bad answer. A model that can call tools and act can be turned against the systems around it.

## Model, system, and agent evaluation

A benchmark score on a model in isolation is no longer the whole story. Modern AI ships as a system: a model wired to retrieval, tools, browsers, APIs, and other agents. Failures increasingly happen outside the model itself.

- **Model evaluation** tests the model alone, its capabilities and its refusals on fixed inputs.
- **System evaluation** tests the model plus its retrieval, prompts, and guardrails as one product. A strong model with a weak retrieval layer is still a weak system.
- **Agent evaluation** tests a model that can plan and call tools, where a single wrong tool call can cause real-world harm.
- **Workflow evaluation** tests a chain of steps and hand-offs end to end, where small errors compound across stages.

The practical rule is to evaluate the thing you actually ship. If you ship a [RAG](/glossary/rag/) system or an [agent](/glossary/ai-agents/), a model-only benchmark will miss most of your real failure modes. This gap between model quality and system quality is one of the biggest themes in current AI engineering.

## The crash test problem

Cars are tested by independent bodies under identical, public conditions. You can compare two cars because the crash test was the same for both. AI has no equivalent for safety.

Today, each company largely tests its own models behind closed doors and publishes the numbers it chooses to publish. There is no universally trusted body that continuously tests all major systems under identical conditions. That gap creates a trust problem for everyone downstream: researchers cannot reproduce claims, regulators cannot compare systems, startups cannot prove parity with incumbents, and users cannot verify marketing.

Other industries solved coordination across competitors. The Linux Foundation hosts shared infrastructure that rival companies all depend on. The CVE program gives security flaws common identifiers so the whole industry tracks the same vulnerability by the same name. An independent, open, reproducible AI benchmark would play a similar role: a common yardstick that serves researchers, developers, regulators, startups, and users at once.

### Secret testing versus open testing

The Meta covert-benchmarking story shows why secret testing draws fire even when the method is familiar. Reports describe Meta running competitor models through internal benchmarks without disclosing it, and the controversy was less about the technique than the secrecy. Testing rivals is normal. Grading them privately and shaping the narrative around undisclosed results is what breaks trust. See our coverage in [Meta and competitor AI benchmarking](/news/meta-competitor-ai-benchmarking/).

<table>
  <thead>
    <tr><th></th><th>Secret in-house benchmarking</th><th>Open, reproducible benchmarking</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Who runs it</strong></td><td>The vendor, privately</td><td>Independent body or coalition</td></tr>
    <tr><td><strong>Test set visibility</strong></td><td>Hidden, chosen by vendor</td><td>Published and inspectable</td></tr>
    <tr><td><strong>Reproducible</strong></td><td>No, outsiders cannot rerun it</td><td>Yes, anyone can rerun it</td></tr>
    <tr><td><strong>Comparable across vendors</strong></td><td>Rarely, conditions differ</td><td>Yes, identical conditions</td></tr>
    <tr><td><strong>Trust model</strong></td><td>Take our word for it</td><td>Verify it yourself</td></tr>
    <tr><td><strong>Best for</strong></td><td>Fast internal iteration</td><td>Public accountability</td></tr>
  </tbody>
</table>

Both modes have a place. Internal benchmarks let a team iterate quickly and keep hard test cases out of training data. Open benchmarks let the outside world hold everyone to the same standard. The problem is not that private testing exists. The problem is that no strong public counterpart exists to check it.

## Who runs each stage

Evaluation is not one team. Different groups own different stages, and their incentives differ too.

<table>
  <thead>
    <tr><th>Stage</th><th>Who typically runs it</th><th>Main question</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Training</strong></td><td>Research and infrastructure teams</td><td>Did the model learn?</td></tr>
    <tr><td><strong>Alignment</strong></td><td>Alignment and safety teams</td><td>Is it helpful and harmless?</td></tr>
    <tr><td><strong>Internal QA</strong></td><td>Engineering</td><td>Does it work as intended?</td></tr>
    <tr><td><strong>Red teaming</strong></td><td>Internal and external red teams</td><td>How would someone break it?</td></tr>
    <tr><td><strong>Safety benchmarks</strong></td><td>Evaluation teams plus human raters</td><td>How bad are the failures?</td></tr>
    <tr><td><strong>External evaluation</strong></td><td>Independent researchers, auditors</td><td>Does it hold up to outsiders?</td></tr>
    <tr><td><strong>Monitoring</strong></td><td>Operations and trust teams</td><td>What breaks in the wild?</td></tr>
  </tbody>
</table>

## Further reading

- [What is an AI benchmark?](/glossary/ai-benchmark/): the structured test sets behind published model scores.
- [Red teaming](/glossary/red-teaming/) and the [AI red team](/glossary/ai-red-team/): how adversarial testing finds failures first.
- [Adversarial machine learning](/glossary/adversarial-machine-learning/) and [prompt injection](/glossary/prompt-injection/): the attack surface red teams probe.
- [Meta and competitor AI benchmarking](/news/meta-competitor-ai-benchmarking/): why secret testing of rivals draws controversy.
- [RIFT-Bench (arXiv 2606.23927)](https://arxiv.org/abs/2606.23927): dynamic adversarial probing of agentic AI systems.
- [REALM (arXiv 2606.23892)](https://arxiv.org/abs/2606.23892): a red-teaming benchmark for physical-world vision language models.
- [AIRTBench (arXiv 2506.14682)](https://arxiv.org/abs/2506.14682): measuring autonomous AI red-teaming capabilities in language models.
- [Agent Red Teaming benchmark (arXiv 2507.20526)](https://arxiv.org/abs/2507.20526): insights from a large-scale public competition on agent security.
