---
title: "From Deterministic Code to LLM Systems: What Changes"
description: "Six mental-model shifts for senior engineers moving from deterministic software to LLM systems: outputs as distributions, evals instead of tests, models as moving dependencies, new failure modes, per-token economics, and prompts as code."
date: 2026-07-17
categories: [Guides]
tags: ["llm", "ai-engineering", "evals", "non-determinism", "mental-models"]
related:
  - guides/llm-evaluation-methods
  - guides/testing-non-deterministic-systems
  - guides/preparing-for-ai-provider-restrictions
  - guides/owasp-top-10-llm
  - guides/prompt-management-guide
  - glossary/hallucination
---

<figure class="bz-figure">
  <img src="/img/decoding-software/strands-branch-merge-notext.png" alt="Neon strands diverging from a single white light beam and rejoining further along, rendered on a near-black background. One input path fans out into several possible paths." loading="lazy">
  <figcaption>One input, several plausible paths. An LLM call returns a sample from a distribution, not the single output your deterministic instincts expect.</figcaption>
</figure>

You have spent years building software on one assumption: the same input produces the same output. Large language models break that assumption, and several others that depend on it. This guide walks through six mental-model shifts, each contrasted with the deterministic instinct it replaces, so you can carry your engineering discipline into LLM systems instead of abandoning it.

The shifts are not exotic. Each one maps to a practice you already know: testing, dependency management, threat modelling, capacity planning, and code review. What changes is the object those practices operate on.

## Where the model sits in your system

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Your product code</span>
      <span class="bz-arch-chip">Business logic</span>
      <span class="bz-arch-chip-note">Deterministic. Your tests still work here.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Prompt layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">System prompts</span>
      <span class="bz-arch-chip">Templates</span>
      <span class="bz-arch-chip">Retrieved context</span>
      <span class="bz-arch-chip-note">Versioned artifacts. Treat like code (shift 6).</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Eval layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Golden datasets</span>
      <span class="bz-arch-chip">Scoring functions</span>
      <span class="bz-arch-chip">Baselines</span>
      <span class="bz-arch-chip-note">Replaces exact-match tests (shift 2).</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model API</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Anthropic / OpenAI endpoint</span>
      <span class="bz-arch-chip">Model version</span>
      <span class="bz-arch-chip-note">A dependency that changes underneath you (shift 3).</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Provider infrastructure</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPU clusters</span>
      <span class="bz-arch-chip">Batching</span>
      <span class="bz-arch-chip">Sampling</span>
      <span class="bz-arch-chip-note">Source of non-determinism you do not control (shift 1).</span>
    </div>
  </div>
</div>

## Shift 1: Same input, different output

**Old instinct:** `f(x)` returns the same `y` every time. Debugging starts with reproducing the failure.

**New reality:** an LLM predicts a probability distribution over the next token (a token is a word fragment, roughly 3-4 characters of English text). The API samples from that distribution. Run the same prompt twice and you get two different, often equally valid, answers. Your call site returns a sample, not a value.

The sampling knob is called temperature. Higher values flatten the distribution and increase variety. Temperature 0 picks the most probable token at every step, which sounds like determinism. It is not. Anthropic's Messages API reference states directly that even with temperature 0.0 the results will not be fully deterministic. Floating-point arithmetic on parallel GPU hardware is non-associative, request batching varies, and provider infrastructure changes between runs. Temperature 0 narrows the distribution. It does not collapse it.

Do not build a system whose correctness depends on byte-identical outputs. Anthropic's newest models removed the `temperature` parameter entirely, per the official [model migration guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide): you steer behaviour through prompts, not sampling knobs. Design for a distribution from day one. For the mechanics of sampling, see [temperature and sampling](/glossary/temperature-and-sampling/) in the glossary, and make [your first LLM API call](/guides/your-first-llm-api-call/) to observe the variance yourself.

## The assumption table

| | Deterministic software | LLM systems |
|---|---|---|
| **Same input** | Same output, always | A sample from a distribution |
| **A failing case** | Reproduce, fix, assert | Measure rate, improve rate |
| **Tests** | Assert equality | Score outputs, track pass rates |
| **Dependencies** | Pinned, change when you upgrade | Model changes on provider schedule |
| **Failure modes** | Crashes, exceptions, timeouts | Confident wrong answers, injected instructions |
| **Cost per request** | Roughly constant | Scales with input and output tokens |
| **Latency** | Mostly processing time | Scales with output length |
| **Source of behaviour** | Code you wrote | Code plus prompts plus model weights |

## Shift 2: Tests become evals

**Old instinct:** write `assert result == expected`. Green means correct. One failure means a bug.

**New reality:** exact-match assertions on sampled text are meaningless. A single failing run tells you almost nothing, and a single passing run tells you less. You replace assertions with evals: run the model against a dataset of representative cases, score each output, and track the aggregate. You assert on the distribution, not on any individual sample.

The scoring function depends on the task. Classification tasks score with exact label match. Extraction tasks score with field-level comparison. Open-ended generation scores with rubrics, often applied by a second model acting as a judge. Anthropic's [define success criteria](https://docs.claude.com/en/docs/test-and-evaluate/define-success) guide and OpenAI's [evals guide](https://platform.openai.com/docs/guides/evals) both describe this workflow as the core development practice, not an optional extra.

A minimal eval looks like this:

```python
CASES = load_dataset("support_ticket_triage.jsonl")  # 200+ labelled cases
THRESHOLD = 0.90
RUNS_PER_CASE = 3  # sample the distribution, not one draw

def run_eval(prompt_version: str) -> float:
    scores = []
    for case in CASES:
        for _ in range(RUNS_PER_CASE):
            output = call_model(prompt_version, case.input)
            scores.append(score(output, case.expected))  # 0.0 to 1.0
    return sum(scores) / len(scores)

new_score = run_eval("triage-v14")
baseline = run_eval("triage-v13")
assert new_score >= THRESHOLD, f"below quality bar: {new_score:.2f}"
assert new_score >= baseline - 0.02, "regression vs baseline"
```

Note what the assertions check: a threshold and a delta against baseline, never equality on a single output. The eval dataset becomes your most valuable asset, and it grows every time production surfaces a new failure. The development loop looks like this:

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Change</span>
    <span class="bz-flow-step-desc">Edit a prompt, swap a model, or change retrieval logic.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Run evals</span>
    <span class="bz-flow-step-desc">Execute the full eval suite, multiple runs per case.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Score</span>
    <span class="bz-flow-step-desc">Grade each output: exact match, rubric, or LLM judge.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Compare</span>
    <span class="bz-flow-step-desc">Check aggregate score against threshold and previous baseline.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Ship or iterate</span>
    <span class="bz-flow-step-desc">Ship on improvement. On regression, return to step 1.</span>
  </div>
</div>

For scoring methods in depth, read [LLM evaluation methods](/guides/llm-evaluation-methods/). For statistical assertion patterns, confidence intervals, and flaky-test management, read [testing non-deterministic systems](/guides/testing-non-deterministic-systems/).

## Shift 3: The model is a dependency that changes underneath you

**Old instinct:** dependencies change when you bump the version in the lockfile. Until then, behaviour is frozen.

**New reality:** the model is a remote dependency on the provider's release schedule, not yours. Providers ship new versions, deprecate old ones, and retire them on published timelines. Anthropic documents this lifecycle on its [model deprecations](https://docs.claude.com/en/docs/about-claude/model-deprecations) page, and OpenAI maintains an equivalent [deprecations](https://platform.openai.com/docs/deprecations) page. A retired model returns an error, which means a model retirement is a breaking change you must plan for like any end-of-life dependency.

Three practices transfer directly from dependency management:

1. **Pin versions in production.** Providers expose aliases that track the latest release and pinned identifiers that do not. Aliases are convenient in development and dangerous in production, because an alias upgrade changes behaviour without any deploy on your side.
2. **Treat a model upgrade as a change.** Run the full eval suite from shift 2 against the new version before switching. A newer model scores better on average and can still regress your specific task.
3. **Track deprecation notices as work items.** Subscribe to provider changelogs. A deprecation notice starts a migration clock, exactly like a deprecated library API.

Provider dependence goes beyond versions: pricing, rate limits, regional availability, and access policies also change on the provider's schedule. [Preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/) covers the architectural side, and [API versioning for AI services](/guides/api-versioning-ai/) covers versioning your own AI-backed APIs.

## Shift 4: The failure modes are new

**Old instinct:** failures are crashes, exceptions, timeouts, and wrong values that a stack trace can explain.

**New reality:** LLM systems fail in ways that produce a syntactically perfect, confident response. Three failure classes matter most:

<figure class="bz-figure">
  <img src="/img/decoding-software/glass-bridge-stress-cracks-notext.png" alt="A glass bridge truss on a dark background with red stress cracks glowing through the structure. The bridge still stands while the cracks spread." loading="lazy">
  <figcaption>LLM failures rarely look like a collapse. The output stands, looks structural, and carries cracks you only find by testing the load.</figcaption>
</figure>

**Hallucination.** The model generates fluent, plausible, false content: invented citations, non-existent API parameters, wrong numbers stated with full confidence. There is no exception to catch, because from the model's perspective nothing failed. Anthropic publishes concrete mitigations in its [reduce hallucinations](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) guide: ground answers in provided documents, allow the model to say "I don't know", and require citations you can verify. See [hallucination](/glossary/hallucination/) in the glossary.

**Prompt injection.** Any text the model reads can carry instructions: a user message, a retrieved document, a scraped web page, an email an agent processes. The model has no hard boundary between code and data, so a hostile document can redirect it. SQL injection taught you to parameterise queries; no equivalent complete fix exists here, only layered defences. Read [prompt injection](/glossary/prompt-injection/) for the mechanics and the [OWASP Top 10 for LLM applications](/guides/owasp-top-10-llm/) for the full threat catalogue, where prompt injection ranks first.

**Context overflow.** Every model has a [context window](/glossary/context-window/), a hard limit on how many tokens a request can carry. Long conversations and large retrieved documents hit that limit, and truncation silently drops information the model needed. Quality also degrades before the hard limit as relevant facts drown in noise, a pattern known as [context rot](/glossary/context-rot/). Budget your context like memory, not like an infinite log.

The common thread: these failures do not throw. You detect them with evals, output validation, and monitoring, not with try/catch.

## Shift 5: Latency and cost are per token

**Old instinct:** a request costs roughly the same as the last one, and latency is dominated by processing plus network.

**New reality:** you pay per token, input and output priced separately, and output tokens are far more expensive. On Anthropic's current [pricing](https://docs.claude.com/en/docs/about-claude/pricing) list, output tokens cost five times as much as input tokens across the main models. A verbose answer is a direct cost multiplier, and a bloated prompt is a recurring tax on every call. [Tokenization](/glossary/tokenization/) explains how text maps to tokens.

Latency follows the same shape. The model generates output token by token, so response time scales with answer length. A one-word classification returns fast. A 2,000-token analysis takes tens of seconds on any provider. This changes UX math: the metric that matters for perceived speed is time to first token, not total completion time.

Streaming is the standard answer. Anthropic's [streaming](https://docs.claude.com/en/docs/build-with-claude/streaming) API delivers the response as server-sent events while generation runs. The user sees the first words in about a second and reads while the rest arrives. Total latency is unchanged; perceived latency collapses. Two more levers matter early: [prompt caching](/glossary/prompt-caching/) makes repeated prompt prefixes dramatically cheaper on providers that support it, and hard billing limits protect you from cost surprises. Configure them before launch, as covered in [set spending limits before you ship](/guides/set-spending-limits-before-you-ship/) and [LLM cost optimization](/guides/llm-cost-optimization/).

## Shift 6: Prompts are code

**Old instinct:** behaviour lives in code. Code lives in version control, passes review, and rolls back cleanly.

**New reality:** a large share of your system's behaviour now lives in prompts, and a one-line prompt edit can change behaviour as much as a code change. Yet many teams edit prompts in a dashboard, ship them untracked, and discover regressions in production. Apply the same discipline you apply to code:

- **Version control.** Prompts live in the repository, next to the code that uses them. Every change is a commit with an author and a diff.
- **Review.** Prompt changes go through pull requests. A reviewer checks intent, wording, and the eval results attached to the change.
- **Eval-gated deploys.** CI runs the eval suite from shift 2 on every prompt change. A regression blocks the merge, exactly like a failing test.
- **Rollback.** Because prompts are versioned artifacts, reverting a bad prompt is a revert commit, not an archaeology exercise.
- **Record the pair.** Log which prompt version and model version served each request. Without that pair, production incidents are undebuggable.

[Prompt management](/guides/prompt-management-guide/) covers tooling and workflows in depth, and [context engineering](/guides/context-engineering/) covers designing what goes into the prompt in the first place.

## What carries over

The discipline transfers even though the mechanics change. Version control, code review, CI gates, threat modelling, capacity planning, and dependency hygiene all survive the shift. What changes is the unit of verification: from a single output to a distribution of outputs, measured continuously. Engineers who internalise that one change tend to find the rest follows.

If you hit strange behaviour while building, [how to read an error message](/guides/how-to-read-an-error-message/) and [getting unstuck when the AI loops](/guides/getting-unstuck-when-the-ai-loops/) cover the practical debugging side. For the broader map of engineering-focused content on this wiki, start at the [engineers hub](/for/engineers/).

## Sources

- [Anthropic: Messages API reference](https://docs.claude.com/en/api/messages): documents the temperature parameter, including the note that temperature 0.0 is not fully deterministic
- [Anthropic: Model migration guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide): documents sampling-parameter removal and breaking changes between model versions
- [Anthropic: Model deprecations](https://docs.claude.com/en/docs/about-claude/model-deprecations): the official model lifecycle, deprecation, and retirement policy
- [Anthropic: Define your success criteria](https://docs.claude.com/en/docs/test-and-evaluate/define-success): eval-driven development as the recommended workflow
- [Anthropic: Reduce hallucinations](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations): official mitigation techniques for hallucination
- [Anthropic: Streaming](https://docs.claude.com/en/docs/build-with-claude/streaming): server-sent event streaming for the Messages API
- [Anthropic: Pricing](https://docs.claude.com/en/docs/about-claude/pricing): per-token input and output pricing
- [OpenAI: Deprecations](https://platform.openai.com/docs/deprecations): OpenAI's model deprecation and shutdown timeline
- [OpenAI: Evals guide](https://platform.openai.com/docs/guides/evals): OpenAI's documentation on building and running evals

## Further reading

- [LLM evaluation methods](/guides/llm-evaluation-methods/): automated metrics, LLM-as-judge, benchmarks, and human evaluation protocols
- [Testing non-deterministic systems](/guides/testing-non-deterministic-systems/): statistical assertions, distribution testing, and flaky-test management
- [OWASP Top 10 for LLM applications](/guides/owasp-top-10-llm/): the standard threat catalogue for LLM systems
- [Preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/): architecting for provider and policy change
- [Prompt management](/guides/prompt-management-guide/): versioning, reviewing, and deploying prompts as artifacts
- [Your first LLM API call](/guides/your-first-llm-api-call/): the hands-on companion to this guide
- [OWASP GenAI: LLM Top 10](https://genai.owasp.org/llm-top-10/): the primary source behind the OWASP guide above
- [Anthropic: Choosing a model](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model): official guidance on model selection trade-offs
