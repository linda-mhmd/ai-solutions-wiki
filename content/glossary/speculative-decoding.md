---
title: "Speculative Decoding"
description: "An inference speedup where a small draft model proposes several tokens and the large model verifies them at once, without changing the output."
date: 2026-06-29
tags: ["inference", "llm", "performance", "optimization", "latency"]
related:
  - glossary/inference
  - glossary/kv-cache
  - glossary/llm
  - glossary/continuous-batching
  - guides/how-ai-models-are-evaluated
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lens-cylinder-copper-notext.png" alt="A precision lens on dark slate, representing a technique that speeds up how a model produces tokens." loading="lazy">
  <figcaption>Speculative decoding sharpens the flow of tokens: a fast model roughs them out, the precise model confirms them in one pass.</figcaption>
</figure>

Speculative decoding is a way to make a large language model generate text faster without changing what it produces. A small, fast "draft" model guesses several of the next tokens. The large "target" model then checks all of those guesses in a single pass and keeps the ones it agrees with. Because checking many tokens at once is much cheaper than producing them one by one, the model finishes sooner while returning the exact same output it would have generated on its own.

The technique was introduced in 2023 by Leviathan and colleagues at Google, and independently by Chen and colleagues at DeepMind. Both papers show that the method preserves the model's output distribution, so the answer you get is statistically identical to normal decoding.

## The core idea in plain words

A normal language model writes text one token at a time. To produce token number 50, it must first produce tokens 1 through 49, each in its own step. Every step loads the model's huge weights from memory, which is slow. This step-by-step generation is why long answers take time. See [inference](/glossary/inference/) for how this generation loop works.

Speculative decoding breaks the one-at-a-time rule. A small draft model, which is cheap to run, sprints ahead and proposes a short run of tokens, for example the next five. The large target model then evaluates all five in one forward pass. It accepts every prefix token that matches what it would have chosen, stops at the first mismatch, and fills in the correct token there. On a good run, you get five tokens for roughly the cost of one large-model step.

## An analogy: the fast assistant and the expert

Think of a senior editor and a quick junior assistant. Instead of the editor writing each word alone, the assistant drafts the next sentence in seconds. The editor reads the whole draft in one glance, approves the part that is right, and corrects the first word that is wrong. Work that would have taken the editor five separate moments now takes one review. The assistant is not always right, but when it is, the editor moves through the text far faster. The final text is exactly what the editor would have written, because the editor approves every word.

## How it works

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Draft</span>
    <span class="bz-flow-step-desc">The small model proposes the next k tokens quickly, one after another.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Verify</span>
    <span class="bz-flow-step-desc">The large model scores all k proposed tokens in a single parallel forward pass.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Accept or reject</span>
    <span class="bz-flow-step-desc">A sampling rule accepts matching tokens and rejects at the first divergence.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Correct and repeat</span>
    <span class="bz-flow-step-desc">The large model supplies one correct token at the mismatch, then the loop restarts.</span>
  </div>
</div>

The speedup comes from a hardware fact. On modern accelerators, generating one token from a large model is limited by memory bandwidth, not by raw compute. The weights must be read from memory every step, and that read dominates the time. Checking five candidate tokens in one pass reads those weights only once, so the extra tokens are nearly free. This is why speculative decoding helps most when the model is memory-bandwidth-bound rather than compute-bound.

The acceptance rule is what keeps the output honest. Rather than blindly trusting the draft, the target model uses a rejection-sampling scheme that accepts a proposed token with a probability tied to how much the two models agree. When it rejects, it resamples from an adjusted distribution. The result, proven in the original papers, is that the final sequence follows the target model's own distribution exactly. You trade extra draft-model work for fewer expensive target-model steps, not for lower quality.

How much you gain depends on the acceptance rate. If the small model guesses well, most tokens are accepted and you approach the ideal of several tokens per large-model step. If it guesses poorly, few tokens survive and the overhead of running two models can eat the benefit. Leviathan and colleagues reported 2x to 3x faster generation on a T5-XXL model with identical outputs, though real numbers vary with the model pair and workload.

## Connections to related concepts

Speculative decoding sits inside the broader problem of serving [large language models](/glossary/llm/) at low latency. It pairs naturally with the [KV cache](/glossary/kv-cache/), the store of past attention states that both the draft and target models reuse so they do not recompute the whole prompt each step. It also complements [continuous batching](/glossary/continuous-batching/), which packs many requests together to raise throughput. Where continuous batching improves how many users a server handles at once, speculative decoding improves how quickly a single response streams back.

Because the output distribution is unchanged, speculative decoding does not affect accuracy or quality metrics. That matters when you compare serving setups: a faster deployment using this technique should score the same on the tests described in [how AI models are evaluated](/guides/how-ai-models-are-evaluated/). The gain is speed, not intelligence.

## Further reading

- [Inference](/glossary/inference/): the token-by-token generation loop that speculative decoding accelerates.
- [KV cache](/glossary/kv-cache/): the attention-state store that makes both draft and verify steps efficient.
- [Continuous batching](/glossary/continuous-batching/): a complementary serving technique that raises throughput across many requests.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): why a speed technique that preserves outputs does not change quality scores.
- [Fast Inference from Transformers via Speculative Decoding (Leviathan et al., 2023)](https://arxiv.org/abs/2211.17192): the primary paper introducing the method and its correctness proof.
- [Accelerating Large Language Model Decoding with Speculative Sampling (Chen et al., 2023)](https://arxiv.org/abs/2302.01318): the independent DeepMind formulation of the same idea.
