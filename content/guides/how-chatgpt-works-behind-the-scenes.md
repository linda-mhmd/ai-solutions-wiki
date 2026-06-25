---
title: "How ChatGPT Actually Works Behind the Scenes"
description: "A plain-words walk through the request lifecycle of ChatGPT: tokenization, prefill and decode, the GPU inference fleet, custom chips, and streaming."
date: 2026-06-25
categories: [Guides]
tags: ["chatgpt", "inference", "llm", "infrastructure", "gpu"]
---

<figure class="bz-figure"><img src="/img/enterprise-dark/server-cpu-split-notext.png" alt="Split image of a dark server room on the left and a red-lit processor chip on the right, representing the data center hardware that runs a chatbot." loading="lazy"><figcaption>Behind a chat window sits a fleet of servers and accelerator chips that turn your words into a stream of predicted tokens.</figcaption></figure>

When you type a message into ChatGPT and press enter, the reply that streams back is the visible end of a long chain of steps. Your text is broken into tokens, routed across the internet to a data center, processed by a large language model running on specialised chips, and sent back one piece at a time. This guide explains that chain in plain words, including the infrastructure layer that most explainers skip. If you want the product overview instead, the basics page on [what ChatGPT is](/glossary/llm/) covers the user-facing side.

## The request lifecycle at a glance

A single message passes through several distinct stages before any text appears on your screen. The front end never talks to the model directly. Instead, layers of routing, safety, and scheduling sit in between.

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Edge and gateway</span><span class="bz-flow-step-desc">Your request hits a nearby network edge, then an API gateway that authenticates you and checks rate limits.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Orchestration</span><span class="bz-flow-step-desc">A service assembles the full prompt from the system message, prior conversation, and your input, then runs moderation checks.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Tokenize</span><span class="bz-flow-step-desc">The assembled text is split into tokens, the numeric units the model reads.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Inference</span><span class="bz-flow-step-desc">A scheduler places the request on a GPU cluster, which predicts output tokens one at a time.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 5</span><span class="bz-flow-step-name">Stream back</span><span class="bz-flow-step-desc">Each token is turned back into text and pushed to your screen as it is produced.</span></div></div>

The rest of this guide unpacks the stages that matter most: tokenization, the two phases of inference, and the hardware fleet underneath.

## Step 1: your text becomes tokens

A language model does not read words. It reads tokens, which are short chunks of text mapped to numbers. A token can be a whole short word, part of a longer word, or a piece of punctuation. The sentence "Write a short poem" might split into chunks like "Write", " a", " short", " poem".

Tokenization is the first translation step. The model only ever sees these numeric tokens, and it only ever produces tokens, which are converted back into readable text at the end. The number of tokens in your conversation matters for two reasons. It sets how much the request costs, because pricing is per token. It also counts against the [context window](/glossary/context-window/), the fixed limit on how much text the model can consider at once. For a deeper look at how splitting works, see the glossary entry on [tokenization](/glossary/tokenization/).

## Step 2: the model assembles the full prompt

The model does not just see your latest message. An orchestration service builds a single combined prompt before anything reaches the hardware. That prompt usually contains three parts.

| | What it is | Where it comes from |
|---|---|---|
| **System message** | Hidden instructions that set tone and rules | Set by OpenAI for the product |
| **Conversation history** | Earlier turns in the same chat | Stored from your session |
| **Your input** | The message you just sent | Typed by you |

In some modes the orchestration step adds more. With web search or file upload enabled, a retrieval step fetches outside text and inserts it into the prompt. This pattern is called retrieval-augmented generation, covered in the glossary entry on [RAG](/glossary/rag/). Moderation checks also run here, before and after the model, to screen for unsafe content.

## Step 3: inference has two phases

Inference is the act of running a trained model to produce an output. For a definition in isolation, see the glossary entry on [inference](/glossary/inference/). Inside the GPU, the work splits into two phases that behave very differently.

The **prefill** phase reads the entire prompt at once. Because every token of the prompt can be processed in parallel, this phase keeps the chip busy and is compute-heavy. During prefill the model builds an internal table called the KV cache (key-value cache), which stores intermediate attention values for every token it has seen.

The **decode** phase produces the answer one token at a time. The model predicts the next token, appends it, and repeats. Each new token reuses the KV cache rather than recomputing everything, which is why the cache matters so much. Decode is memory-heavy rather than compute-heavy, because each step has to read the model weights and the growing cache from memory to produce a single token.

<div class="bz-arch"><div class="bz-arch-layer"><span class="bz-arch-layer-label">Prefill</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Reads full prompt</span><span class="bz-arch-chip">Parallel</span><span class="bz-arch-chip">Compute-heavy</span><span class="bz-arch-chip-note">Builds the KV cache for every prompt token</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Decode</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">One token at a time</span><span class="bz-arch-chip">Sequential</span><span class="bz-arch-chip">Memory-heavy</span><span class="bz-arch-chip-note">Reuses the cache so it never recomputes past tokens</span></div></div></div>

This two-phase split explains a behaviour you can observe. There is a short pause after you press enter while prefill runs, then text streams out steadily as decode produces tokens. The first-token delay and the steady stream are two separate stages of the same process. The split is described in detail in the survey work on [LLM inference serving](https://arxiv.org/pdf/2407.12391).

## Step 4: many users share the same chips

A single user does not get a dedicated chip. That would waste most of the hardware, because decode reads memory for one token at a time and leaves compute capacity idle. Serving systems solve this with continuous batching, where many users' requests are processed together on the same GPU and the batch changes shape every step.

When one user's answer finishes, that slot is freed and a new request is admitted. New prompts run their prefill phase while other requests are still decoding. Interleaving the two phases keeps expensive accelerators near full utilisation. This is the main reason a service can answer millions of people at once without a chip per person. The technique is explained in the practical guide to [serving LLMs with vLLM](https://nebius.com/blog/posts/serving-llms-with-vllm-practical-guide).

## Step 5: the infrastructure layer underneath

The model runs on a layered stack of infrastructure. Each layer has a narrow job.

<div class="bz-arch"><div class="bz-arch-layer"><span class="bz-arch-layer-label">Edge and routing</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">CDN edge</span><span class="bz-arch-chip">API gateway</span><span class="bz-arch-chip">Load balancer</span><span class="bz-arch-chip-note">Authenticates, rate-limits, routes to the nearest region</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Orchestration</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Prompt assembly</span><span class="bz-arch-chip">Moderation</span><span class="bz-arch-chip">Retrieval and tools</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Scheduling</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Request queue</span><span class="bz-arch-chip">Continuous batching</span><span class="bz-arch-chip-note">Packs many users onto each accelerator</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Inference fleet</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">GPU clusters</span><span class="bz-arch-chip">KV cache memory</span><span class="bz-arch-chip">Custom chips</span></div></div></div>

The bottom layer is where the cost lives. Most large model serving today runs on NVIDIA GPUs such as the H200, which carries 141 GB of high-bandwidth memory and lets a single chip serve models that previously needed two. Operators report cloud rental rates in a broad range of roughly 2 to 6 US dollars per hour for that class of chip, per the analysis from [Introl](https://introl.com/blog/cost-per-token-llm-inference-optimization). The cost per answer is driven down by batching, by reusing the KV cache, and increasingly by purpose-built silicon.

## Custom chips enter the fleet

The dominant chips today are general-purpose GPUs, but the picture is shifting toward hardware built only for inference. On 24 June 2026, OpenAI and Broadcom unveiled Jalapeño, a custom inference chip designed for running models rather than training them. The companies say it offers better performance-per-watt than current alternatives and aim to begin deployment in late 2026.

Two points are worth keeping straight. First, Jalapeño targets inference only. More demanding pre-training work is expected to stay on NVIDIA hardware, and OpenAI's large NVIDIA commitments remain in place. Second, custom silicon does not replace the GPU fleet overnight. Reporting from [VentureBeat](https://venturebeat.com/infrastructure/openai-unveils-first-custom-ai-inference-chip-jalapeno-with-broadcom-and-its-development-was-sped-up-with-openais-own-models) and [TechCrunch](https://techcrunch.com/2026/06/24/openai-unveils-its-first-custom-chip-built-by-broadcom/) frames it as a way to cut dependence on a single supplier and lower the cost of serving each token. The wiki covers this in more depth in the [glossary entry on AI hardware](/glossary/ai-hardware/).

## Putting it together

The short version is that a chat reply is a pipeline, not a single black box. Your words are tokenized, wrapped in a larger prompt, screened, and scheduled onto shared accelerators. The model runs a fast parallel prefill, then a slower one-token-at-a-time decode, streaming each token back as it goes. Underneath sits a fleet of routing, scheduling, and hardware layers whose entire purpose is to make a large model answer many people at once, cheaply enough to keep the service running.

## Further reading

- [Inference](/glossary/inference/): what it means to run a trained model to produce output.
- [Tokenization](/glossary/tokenization/): how text is split into the numeric units a model reads.
- [Context window](/glossary/context-window/): the fixed limit on how much text a model can consider at once.
- [AI hardware](/glossary/ai-hardware/): the chips and accelerators that run inference at scale.
- [LLM Inference Serving: Survey of Recent Advances](https://arxiv.org/pdf/2407.12391): a technical survey of prefill, decode, and batching.
- [Serving LLMs with vLLM](https://nebius.com/blog/posts/serving-llms-with-vllm-practical-guide): a practical guide to continuous batching and KV cache management.

## Sources

- [LLM Inference Serving: Survey of Recent Advances and Opportunities (arXiv)](https://arxiv.org/pdf/2407.12391)
- [Serving LLMs with vLLM: a practical inference guide (Nebius)](https://nebius.com/blog/posts/serving-llms-with-vllm-practical-guide)
- [Cost Per Token Analysis: Optimizing GPU Infrastructure (Introl)](https://introl.com/blog/cost-per-token-llm-inference-optimization)
- [OpenAI unveils first custom AI inference chip, Jalapeño, with Broadcom (VentureBeat)](https://venturebeat.com/infrastructure/openai-unveils-first-custom-ai-inference-chip-jalapeno-with-broadcom-and-its-development-was-sped-up-with-openais-own-models)
- [OpenAI unveils its first custom chip, built by Broadcom (TechCrunch)](https://techcrunch.com/2026/06/24/openai-unveils-its-first-custom-chip-built-by-broadcom/)
