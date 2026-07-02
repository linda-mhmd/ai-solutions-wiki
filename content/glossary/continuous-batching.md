---
title: "Continuous Batching"
description: "An inference-serving technique that packs many users' requests onto one GPU and swaps requests in and out every step to keep the hardware near full utilization."
date: 2026-06-29
tags: ["inference", "serving", "gpu", "throughput", "llm"]
related: [glossary/inference, glossary/kv-cache, glossary/llm, tools/tgi, tools/ray-serve]
---

<figure class="bz-figure">
  <img src="/img/juggling/four-balls-overlap-rgb-notext.png" alt="Four glowing overlapping spheres, representing many requests served together and swapped in and out continuously." loading="lazy">
  <figcaption>Many requests share one GPU at once, joining and leaving the group without waiting for the rest to finish.</figcaption>
</figure>

Continuous batching is a way of running a language model on a GPU so that many users' requests are processed together at the same time. Instead of waiting for a fixed group of requests to all finish before starting the next group, the server adds new requests and removes completed ones after every single generation step. It is also called in-flight batching or iteration-level scheduling. This keeps an expensive GPU busy and lets one running model answer many people at once.

## A concrete analogy

Think of a shared minibus instead of a chartered coach.

A chartered coach waits at the depot until every seat is full, drives the whole route, and only returns for the next group once everyone has been dropped off. If one passenger has a long journey, everyone else waits for them before the bus can be reused. That is static batching.

A minibus on a continuous route behaves differently. It picks up a passenger the moment a seat opens and drops each one at their stop without waiting for the others. The vehicle never sits empty at the depot. Continuous batching runs the GPU like that minibus: as soon as one request finishes generating its answer and frees a seat, a waiting request takes its place on the very next step.

## How it works

A language model generates text one token at a time. Each token requires one forward pass, called an iteration or a step, through the model on the GPU. Older serving systems scheduled work at the level of a whole request: the server picked a batch of requests, ran them until the slowest one finished, and only then admitted new work.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step N</span>
    <span class="bz-flow-step-name">Run one iteration</span>
    <span class="bz-flow-step-desc">Every active request generates one token together in a single GPU pass.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Evict</span>
    <span class="bz-flow-step-name">Remove finished requests</span>
    <span class="bz-flow-step-desc">Any request that hit its stop token or length limit leaves the batch and frees its slot.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Admit</span>
    <span class="bz-flow-step-name">Add waiting requests</span>
    <span class="bz-flow-step-desc">Requests from the queue fill the freed slots before the next iteration.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step N+1</span>
    <span class="bz-flow-step-name">Repeat</span>
    <span class="bz-flow-step-desc">The new mixed batch runs the next token step. The GPU never idles between groups.</span>
  </div>
</div>

Continuous batching schedules at the level of a single iteration rather than a whole request. This idea was introduced as iteration-level scheduling in the Orca paper (Yu et al., OSDI 2022), which reported large throughput gains over prior serving systems. Modern engines build on it: vLLM combines this style of batching with PagedAttention, and reports up to 24x higher throughput than a naive Hugging Face Transformers baseline. TensorRT-LLM calls the same idea in-flight batching, and Text Generation Inference and SGLang implement their own versions.

The reason it matters is economics. A serving GPU is one of the most expensive resources in an AI system, and a single request rarely uses all of its parallel compute. Packing many requests together and refilling seats every step keeps utilization high, which raises the number of tokens per second the hardware delivers and lowers the cost per request.

## Connections to other concepts

Continuous batching is a core part of [inference](/glossary/inference/), the stage where a trained model produces output for real users. It works hand in hand with the [KV cache](/glossary/kv-cache/): each in-flight request carries its own growing cache of past tokens, and the scheduler must find GPU memory for a new request's cache before it can admit that request. Memory management and batching are therefore tightly linked, which is why vLLM pairs continuous batching with PagedAttention to pack more sequences into the same memory.

You do not implement continuous batching yourself. It ships inside serving frameworks. [Text Generation Inference](/tools/tgi/) and [Ray Serve](/tools/ray-serve/) both expose it as a built-in feature, so choosing a serving stack is usually how teams decide which batching strategy they get.

## Further reading

- [Inference](/glossary/inference/): the serving stage where continuous batching runs.
- [KV cache](/glossary/kv-cache/): the per-request memory that batching must schedule around.
- [Text Generation Inference](/tools/tgi/): a serving framework with continuous batching built in.
- [Ray Serve](/tools/ray-serve/): scalable model serving that supports request batching.
- [Orca: A Distributed Serving System for Transformer-Based Generative Models (Yu et al., OSDI 2022)](https://www.usenix.org/system/files/osdi22-yu.pdf): the paper that introduced iteration-level scheduling.
- [vLLM: Easy, Fast, and Cheap LLM Serving with PagedAttention](https://vllm.ai/blog/2023-06-20-vllm): official write-up on batching more sequences to raise GPU utilization and throughput.
- [vLLM documentation](https://docs.vllm.ai/): reference for a production engine that uses continuous batching.
