---
title: "Running Distilled Models"
description: "What actually changes when you serve a distilled model instead of its teacher: the footprint, the reasoning-token plumbing, the capability gaps you have to test for, and the licensing you can't assume inherits cleanly."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Guides]
tags: ["knowledge-distillation", "model-serving", "deepseek-r1", "llm-inference", "quantization", "licensing", "reasoning-models"]
related:
  - guides/self-hosting-llms-hardware-and-economics
  - glossary/knowledge-distillation
  - guides/benchmarking-a-finetuned-model-against-its-lineage
  - guides/fine-tuning-llms-guide
  - glossary/lora
  - tools/vllm
---

"Distilled" gets used loosely enough in model names and marketing that it's worth being precise before you deploy one: a distilled model is a smaller student trained to reproduce a larger teacher's output behavior, not a smaller model that happens to perform similarly because someone trained it from scratch on less compute. That distinction matters operationally. A distilled model inherits specific behavioral patterns from a specific teacher on a specific training run — its strengths, its blind spots, and sometimes its licensing constraints all trace back to that lineage. Running one well means knowing what you actually got, not assuming "smaller version of the big model" and moving on.

This guide covers what changes once you have the distilled artifact and want to run it: which real model families you'll encounter, what serving infrastructure needs to know about them specifically, where the capability gaps actually show up, and what to check before you assume a license carries over cleanly. For the underlying technique — teacher/student training, soft targets, temperature scaling — see [Knowledge distillation](/glossary/knowledge-distillation/). For the VRAM and cost math that applies to any self-hosted model, distilled or not, see [Self-hosting LLMs: hardware and economics](/guides/self-hosting-llms-hardware-and-economics/).

## What distillation actually produces

A pretrained weight matrix isn't shrunk or pruned in the way quantization or structured pruning shrink it. Instead, a new (usually smaller) model architecture is trained — from scratch or from a small base checkpoint — using the teacher's outputs as the training signal, instead of relying solely on the original ground-truth dataset. Two variants show up in production models today:

- **Logit distillation**, the original 2015 Hinton et al. formulation: the student trains against the teacher's softened output probabilities, which encode relative similarity between classes/tokens that hard labels discard. See the glossary entry for the mechanics.
- **Chain-of-thought / output distillation**, the dominant approach for today's reasoning LLMs: the student is fine-tuned (standard SFT) on a large corpus of the teacher's full generated outputs — including its reasoning traces — rather than on the teacher's raw logit distribution. This is cheaper to run at scale (you only need the teacher's text outputs, not access to its internals) and is how DeepSeek, and most reasoning-model distillations since, actually work.

The DeepSeek-R1 paper (Jan 2025) makes the case for why this beats training a small model directly with reinforcement learning. The team ran both experiments on the same base checkpoint and compared:

| Model | AIME 2024 pass@1 | AIME 2024 cons@64 | MATH-500 | GPQA Diamond | LiveCodeBench |
|---|---|---|---|---|---|
| DeepSeek-R1-Zero-Qwen-32B (large-scale RL directly on Qwen2.5-32B-Base) | 47.0 | 60.0 | 91.6 | 55.0 | 40.2 |
| DeepSeek-R1-Distill-Qwen-32B (SFT on DeepSeek-R1's outputs) | 72.6 | 83.3 | 94.3 | 62.1 | 57.2 |

Same base model, same parameter count — distilling from a stronger teacher's outputs beat applying large-scale RL directly to the small model on every benchmark, at a fraction of the compute cost.¹ The distillation SFT set was about 800K samples curated from DeepSeek-R1: roughly 600K reasoning traces plus 200K non-reasoning samples (writing, factual QA, translation) to keep general capability from collapsing.¹ This is the operational takeaway: a distilled model's quality ceiling is set by its teacher's behavior on the distillation data, not by what RL or scratch-training could theoretically extract from that parameter count alone. It also means the student never independently re-derives skills the teacher's outputs didn't demonstrate on the distillation set — which is exactly why you test for gaps rather than assume broad transfer (see below).

## Distilled model families worth naming

<div style="overflow-x:auto">

| Family | Sizes | Teacher | Base/student architecture | License |
|---|---|---|---|---|
| DeepSeek-R1-Distill | 1.5B, 7B, 14B, 32B (Qwen); 8B, 70B (Llama) | DeepSeek-R1 | Qwen2.5-Math-1.5B/7B, Qwen2.5-14B/32B; Llama-3.1-8B, Llama-3.3-70B-Instruct | MIT (DeepSeek's contribution) + underlying Qwen/Llama license² |
| DeepSeek-R1-0528-Qwen3-8B | 8B | DeepSeek-R1-0528 (updated May 2025) | Qwen3-8B-Base | MIT per DeepSeek's model card, which — unlike the R1-Distill cards — doesn't itself flag that the Qwen3-8B base it's built on carries Apache 2.0³ |
| Llama 3.2 1B / 3B | 1B, 3B | Llama 3.1 8B and 70B (logits used as pretraining targets, plus structured pruning) | Llama architecture | Llama 3.2 Community License⁴ |
| Gemma 2 2B / 9B | 2B, 9B | Gemma 2 27B | Gemma architecture | Gemma license |

</div>

**DeepSeek-R1-Distill** is the most-cited example because DeepSeek published the direct comparison above. The 32B variant scores 72.6% pass@1 on AIME 2024 versus OpenAI o1-mini's 63.6%, and the 70B variant scores 70.0% versus o1-mini's 63.6%, both on the same benchmark set the R1 paper reports.¹ These are chain-of-thought distillations: the student was never touched by the teacher's internal weights, only trained on its generated reasoning traces.

**DeepSeek-R1-0528-Qwen3-8B** is a useful case study in what distillation does and doesn't uniformly improve. Distilling DeepSeek-R1-0528's reasoning into Qwen3-8B-Base pushed AIME 2024 from 76.0% (plain Qwen3-8B) to 86.0% — a +10 point jump that matches the 235B-parameter Qwen3-235B-A22B "thinking" model on that benchmark. But GPQA Diamond went the other direction: 62.0% for plain Qwen3-8B versus 61.1% for the distilled version.³ Distillation optimized hard for the reasoning benchmarks the teacher's chain-of-thought excelled at; it did not uniformly lift every capability, and on at least one benchmark it very slightly regressed. This is the pattern to expect, not the exception — see "Capability gaps" below.

**Llama 3.2's 1B and 3B models** are a different kind of distillation: not a post-hoc fine-tune of an existing checkpoint, but logit distillation baked into pretraining itself. Meta combined structured pruning of the Llama 3.1 8B checkpoint with knowledge distillation, using output logits from Llama 3.1 8B and 70B as token-level training targets during the 1B/3B models' pretraining, then recovered performance through pruning-aware distillation.⁴ Meta's own description: "Knowledge distillation uses a larger network to impart knowledge on a smaller network, with the idea that a smaller model can achieve better performance using a teacher than it could from scratch." This shows distillation is not only a post-training fine-tune technique — it can be woven into the pretraining objective from the start.

**Gemma 2's 2B and 9B models** were also distilled from the 27B model during training, using the teacher's output distribution and training on far more tokens than compute-optimal scaling would call for at that size — deliberately over-training a small model against a strong teacher signal rather than training it compute-optimally from scratch.⁵

## What serving a distilled model changes in practice

**Footprint and throughput.** The direct consequence is smaller weight memory per the standard formula (parameters × bytes-per-parameter, plus 15–40% for KV cache/activations/runtime overhead) — see the [hardware and economics guide](/guides/self-hosting-llms-hardware-and-economics/) for the full math and worked examples. A DeepSeek-R1-Distill-Qwen-7B at FP16 needs roughly 14 GB for weights alone versus DeepSeek-R1's 671B (37B active, MoE) footprint measured in hundreds of gigabytes; the distilled model fits on a single consumer or prosumer GPU where the teacher requires a multi-GPU or multi-node cluster. Fewer layers and parameters generally also means lower per-token latency and higher throughput per GPU, independent of any quantization you apply on top.

**Reasoning-model serving needs a parser wired up, or you get raw `<think>` tags in your output.** Chain-of-thought-distilled reasoning models (the DeepSeek-R1-Distill family, R1-0528-Qwen3-8B, and similar) emit their reasoning inside `<think>...</think>` tags before the final answer. If your serving layer doesn't separate that, your application receives the full chain-of-thought concatenated with the answer, which breaks anything expecting a clean response field:

- **vLLM**: pass `--reasoning-parser deepseek_r1` at server start (`vllm serve deepseek-ai/DeepSeek-R1-Distill-Qwen-7B --reasoning-parser deepseek_r1`); the OpenAI-compatible response then separates a `reasoning` field from `content`. This field was called `reasoning_content` in older vLLM releases — vLLM's own docs warn that client code still reading the old field name will silently see an empty value once you upgrade, so update both the server flag usage and any client parsing together.⁶
- **SGLang**: the equivalent flag is `--reasoning-parser deepseek-r1`, covering R1, R1-0528, and the R1-Distill family.⁷
- **Ollama**: handled differently — a top-level `think` field on the chat/generate API request (`true`/`false`, or an effort level on models that support it) tells Ollama whether to strip reasoning into a separate field or suppress it, rather than requiring a server-launch flag.⁸
- **TGI**: officially supports the DeepSeek-R1-Distill family as deployable models via Hugging Face Inference Endpoints and Docker containers; check current TGI release notes for native reasoning-content separation versus parsing `<think>` tags client-side.⁹

Get this wrong and the failure mode is silent: the model still answers correctly, but every response is 5-20x longer than expected and any downstream JSON parsing, guardrail, or moderation step is now running against reasoning text it was never designed to see.

**Don't assume the tag on a model name tells you which weights you're running.** `ollama run deepseek-r1` with no size tag defaults to a small distilled model (currently DeepSeek-R1-0528-Qwen3-8B on the `latest` tag), not the full 671B-parameter DeepSeek-R1.¹⁰ This is a genuinely common point of confusion — someone benchmarking "DeepSeek-R1" locally via the default Ollama pull is very likely benchmarking an 8B Qwen3 distillation, not the model behind the published frontier-model comparisons. Always pin the explicit tag (`deepseek-r1:671b` for the full model; `deepseek-r1:7b`, `:8b`, `:14b`, `:32b`, `:70b` for specific distilled sizes) and confirm which base architecture that tag actually resolves to before you report a result as "R1."

## Capability gaps: test for them, don't assume they're absent

The GPQA Diamond regression above (62.0% → 61.1%, plain Qwen3-8B versus its distilled sibling) is the clean illustration: a distilled model can improve dramatically on the benchmarks its teacher's chain-of-thought was strong on while quietly losing ground elsewhere.³ Extrapolating "the distilled model scores close to the teacher on math and coding benchmarks, so it's basically as good" is exactly the assumption that gap disproves.

Separately, and worth flagging with an explicit hedge because it's about compounding compression rather than distillation in isolation: a 2025 evaluation of compressed LLMs' agentic capabilities (ACBench, testing quantization and pruning methods including GPTQ/AWQ on models spanning small dense models to DeepSeek-R1-Distill checkpoints) found that 4-bit quantization degraded workflow generation and tool-use accuracy only modestly (roughly 1-3 percentage points) but degraded real-world application accuracy substantially more (roughly 10-15 percentage points).¹¹ This is quantization layered on top of an already-distilled model — the common real-world deployment (an INT4 GGUF of a 7B distill running on a single GPU) — not a finding about distillation's effect alone. But it's a direct warning that "small benchmark drop on the paper's reported metrics" and "small drop on your actual agentic/tool-use workload" are not the same claim, and the gap can be large precisely on the tasks that look most like production use.

The right response to both findings is the same: don't infer capability from the teacher's reported scores or from a general-purpose leaderboard. Test the specific distilled checkpoint, at the specific quantization level you intend to serve, on your own task. [Benchmarking a fine-tuned model against its lineage](/guides/benchmarking-a-finetuned-model-against-its-lineage/) covers exactly this methodology — running the distilled model and its teacher (and, where relevant, the undistilled base) against the same task-specific eval set so "good enough" is a measured accuracy delta, not an impression from a demo. [LLM evaluation methods](/guides/llm-evaluation-methods/) and the [golden dataset](/glossary/golden-dataset/) glossary entry cover building that eval set in the first place.

## When the distilled model is good enough, and when you need the teacher

There's no general threshold — it's task-specific, and the only reliable way to answer it is the benchmarking-against-lineage workflow above, run on your own data. What is generally true:

- **Tasks close to what the distillation data emphasized** (math and coding reasoning, for the R1-Distill family; general instruction-following and pretraining-scale text tasks, for Llama 3.2 1B/3B and Gemma 2 2B/9B) are where distilled models close the gap fastest.
- **Tasks the distillation set under-represented** are where the gap reappears, sometimes counterintuitively on tasks that look adjacent to the ones the model excels at — the GPQA Diamond case above is exactly this pattern.
- **Latency- and cost-sensitive, high-volume paths** (routing, classification, first-pass drafts, tool-call formatting) are the strongest fit for "distilled is good enough" once you've measured the accuracy delta and it's acceptable for that path — this is the same model-routing logic covered in [Reducing LLM inference costs in production](/guides/llm-cost-optimization/), just applied to self-hosted distilled models instead of API-tier routing.
- **High-stakes, low-volume, or genuinely novel reasoning** — where a wrong answer is expensive and the query doesn't resemble the distillation set's training distribution — is where falling back to the teacher (or a proprietary frontier model) remains the safer default until you've specifically validated the distilled model's accuracy on that class of query.

## Licensing: check it, don't assume it inherits cleanly

A distilled model's license is not automatically the teacher's license, the base/student architecture's license, or some obvious combination of the two — it depends on what the distilling org chose to publish it under, and what license terms the base checkpoint carried before distillation touched it.

**DeepSeek-R1-Distill is the clearest real example of why this needs checking rather than assuming.** DeepSeek releases its own contribution — the distillation training and resulting weight deltas — under MIT, explicitly supporting commercial use.² But the base/student checkpoint each variant was built from carries its own license forward: the Qwen2.5-based distills (1.5B, 7B, 14B, 32B) inherit Qwen2.5's Apache 2.0 terms, while the Llama-based distills (8B from Llama-3.1-8B, 70B from Llama-3.3-70B-Instruct) inherit the Llama 3.1 and Llama 3.3 Community License Agreements respectively — which carry Meta's acceptable-use restrictions and a 700-million-monthly-active-user threshold beyond which a separate license from Meta is required.²

**License text differs even within one vendor's own version history, which undercuts any assumption that "it's a Llama model, so it's the Llama license I already know."** Meta's Llama 2 and Llama 3 community licenses each included a clause (section 1.b.v) stating "You will not use the Llama Materials or any output or results of the Llama Materials to improve any other large language model," carving out only Llama itself and its derivatives — language that would have blocked using Llama's own outputs as a distillation teacher for a non-Llama model. Meta dropped that clause in the Llama 3.1 license, replacing it with an attribution requirement instead.¹² It didn't affect DeepSeek's Llama-based distills either way, since those use Llama checkpoints as the *student* architecture with DeepSeek-R1 as the teacher, not the reverse — but it's a concrete illustration that license terms for the "same" model family are not stable across versions, and a clause you remember from one release may already be gone (or newly added) in the next.

**Qwen's non-Apache license tiers add obligations on distillation specifically — and they're not all the same tier.** Most Qwen2.5 sizes ship under Apache 2.0, but two are exceptions with different, easy-to-conflate custom licenses: Qwen2.5-72B ships under the Qwen License, which permits commercial use (subject to a 100-million-monthly-active-user threshold requiring a separate license from Alibaba Cloud beyond that) but requires displaying "Built with Qwen" or "Improved using Qwen" in downstream product documentation if you use its outputs to train, fine-tune, or otherwise improve another AI model. Qwen2.5-3B ships under the stricter Qwen Research License, which permits use only "FOR NON-COMMERCIAL PURPOSES ONLY" — a materially different restriction, not just a smaller version of the 72B terms. On the attribution point specifically, Qwen's own maintainers have clarified that the obligation is the acknowledgment notice itself, not adopting the Qwen License for your resulting model — a model fine-tuned on Qwen2.5-72B's outputs still needs the "Built with Qwen" notice, but can otherwise keep whatever license (e.g., Apache 2.0) it would carry on its own.¹³ If you're distilling your own model from a Qwen teacher rather than just running one of the pre-published DeepSeek checkpoints, read the specific license file for the specific size you're using rather than assuming one Qwen license covers all of them.

**Practical checklist before you deploy:** read the license file in the specific model repo you're pulling (not the license of the paper or the announcement blog post), confirm whether it's the distilling org's own license (covering their training contribution) or the inherited base-model license (covering the underlying weights and architecture) or — as with DeepSeek-R1-Distill — both stacked, and check for MAU thresholds, attribution requirements, and output-use restrictions specifically, since those are the terms most likely to differ from a same-named non-distilled sibling.

**If you're running someone else's already-published distilled model, none of this makes you a regulatory "provider" under the EU AI Act** — evaluating or deploying a model, including benchmarking its behavior against your own test set, requires no visibility into how it was trained. That changes if you do your own distillation and publish or place the result on the market: per the European Commission's Guidelines on the scope of GPAI obligations, a downstream modifier is generally considered the provider of the resulting model once the compute used for the modification exceeds one-third of the original model's training compute — at which point Article 53 provider obligations (including the training-data summary) attach to your modification specifically, not the full upstream model.¹⁴ See [AI transparency obligations](/guides/ai-transparency-obligations/) for the full Article 53 mechanics.

## Serving tool notes specific to distilled/reasoning models

| Tool | Relevant to distilled models because | Doc reference |
|---|---|---|
| [Ollama](/tools/ollama/) | Simplest path for single-GPU/CPU serving of small distills; native `think` API field separates reasoning from answer without a launch flag; watch the default-tag trap above | docs.ollama.com/capabilities/thinking |
| [vLLM](/tools/vllm/) | Production-throughput serving; `--reasoning-parser deepseek_r1` required for clean reasoning/answer separation on R1-family distills | docs.vllm.ai/en/latest/features/reasoning_outputs/ |
| [TGI](/tools/tgi/) | Hugging Face's serving stack; DeepSeek-R1-Distill family officially supported via Docker/Inference Endpoints | huggingface.co (Inference Endpoints) |
| [SGLang](/tools/sglang/) | `--reasoning-parser deepseek-r1` covers R1, R1-0528, and the full R1-Distill family | docs.sglang.io/docs/advanced_features/separate_reasoning |

None of these tools change the model's underlying capability — pick based on your throughput, hardware, and operational requirements per the [hardware and economics guide](/guides/self-hosting-llms-hardware-and-economics/); the distinction that matters for distilled reasoning models specifically is whether the tool's reasoning-parser support matches the model you're actually serving.

## Sources

1. DeepSeek-AI, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning," original version, Jan 22 2025 (Table 5 and Table 6 figures cited in this guide match this version; a later revision of the same arXiv record renames one row and reorganizes these tables): [https://arxiv.org/abs/2501.12948v1](https://arxiv.org/abs/2501.12948v1)
2. DeepSeek-AI, "DeepSeek-R1-Distill-Llama-70B" and "DeepSeek-R1" model cards (license and base-model notes): [https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B), [https://huggingface.co/deepseek-ai/DeepSeek-R1](https://huggingface.co/deepseek-ai/DeepSeek-R1); Meta, "Llama 3.1 Community License Agreement": [https://www.llama.com/llama3_1/license/](https://www.llama.com/llama3_1/license/); Meta, "Llama 3.3 Community License Agreement": [https://www.llama.com/llama3_3/license/](https://www.llama.com/llama3_3/license/)
3. DeepSeek-AI, "DeepSeek-R1-0528-Qwen3-8B" model card (benchmark table, license): [https://huggingface.co/deepseek-ai/DeepSeek-R1-0528-Qwen3-8B](https://huggingface.co/deepseek-ai/DeepSeek-R1-0528-Qwen3-8B)
4. Meta AI, "Llama 3.2: Revolutionizing edge AI and vision with open, customizable models": [https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/); Meta, "Llama 3.2 Community License Agreement": [https://www.llama.com/llama3_2/license/](https://www.llama.com/llama3_2/license/)
5. Gemma Team, Google DeepMind, "Gemma 2: Improving Open Language Models at a Practical Size": [https://arxiv.org/html/2408.00118](https://arxiv.org/html/2408.00118)
6. vLLM documentation, "Reasoning Outputs": [https://docs.vllm.ai/en/latest/features/reasoning_outputs/](https://docs.vllm.ai/en/latest/features/reasoning_outputs/)
7. SGLang documentation, "Reasoning Parser": [https://docs.sglang.io/docs/advanced_features/separate_reasoning](https://docs.sglang.io/docs/advanced_features/separate_reasoning)
8. Ollama documentation, "Thinking": [https://docs.ollama.com/capabilities/thinking](https://docs.ollama.com/capabilities/thinking)
9. Hugging Face, "How to deploy and fine-tune DeepSeek models on AWS" (TGI v3 container used for Inference Endpoints/SageMaker deployment of the R1-Distill family): [https://huggingface.co/blog/deepseek-r1-aws](https://huggingface.co/blog/deepseek-r1-aws); AWS Machine Learning Blog, "Deploy DeepSeek-R1 distilled models on Amazon SageMaker using a large model inference container": [https://aws.amazon.com/blogs/machine-learning/deploy-deepseek-r1-distilled-models-on-amazon-sagemaker-using-a-large-model-inference-container/](https://aws.amazon.com/blogs/machine-learning/deploy-deepseek-r1-distilled-models-on-amazon-sagemaker-using-a-large-model-inference-container/)
10. Ollama model library, "deepseek-r1": [https://ollama.com/library/deepseek-r1](https://ollama.com/library/deepseek-r1)
11. "Can Compressed LLMs Truly Act? An Empirical Evaluation of Agentic Capabilities in LLM Compression" (ACBench): [https://arxiv.org/abs/2505.19433](https://arxiv.org/abs/2505.19433)
12. Meta, "Meta Llama 2 License": [https://www.llama.com/llama2/license/](https://www.llama.com/llama2/license/); Meta, "Meta Llama 3 License": [https://www.llama.com/llama3/license/](https://www.llama.com/llama3/license/); Kemitchell, "Llama 3 versus Llama 3.1 License Terms": [https://writing.kemitchell.com/2024/07/24/Llama-3-versus-Llama-3-1-License](https://writing.kemitchell.com/2024/07/24/Llama-3-versus-Llama-3-1-License)
13. Qwen, "Qwen2.5-72B-Instruct" LICENSE (the Qwen License, commercial use permitted below a 100M-MAU threshold): [https://huggingface.co/Qwen/Qwen2.5-72B-Instruct/blob/main/LICENSE](https://huggingface.co/Qwen/Qwen2.5-72B-Instruct/blob/main/LICENSE); Qwen, "Qwen2.5-3B" LICENSE (the separate, non-commercial-only Qwen Research License): [https://huggingface.co/Qwen/Qwen2.5-3B/blob/main/LICENSE](https://huggingface.co/Qwen/Qwen2.5-3B/blob/main/LICENSE); Hugging Face discussion, "Qwen2.5-72B-Instruct: Clarification on Qwen License": [https://huggingface.co/Qwen/Qwen2.5-72B-Instruct/discussions/18](https://huggingface.co/Qwen/Qwen2.5-72B-Instruct/discussions/18)
14. European Commission, Guidelines on the scope of the obligations for general-purpose AI models under Regulation (EU) 2024/1689 (one-third training-compute modification threshold), as summarized in: CMS Law, "General-purpose AI models: Obligations and roles for Providers and downstream modifiers under the EU AI Act": [https://cms.law/en/swe/legal-updates/general-purpose-ai-models-obligations-and-roles-for-providers-and-downstream-modifiers-under-the-eu-ai-act](https://cms.law/en/swe/legal-updates/general-purpose-ai-models-obligations-and-roles-for-providers-and-downstream-modifiers-under-the-eu-ai-act)

## Further reading

- [Self-hosting LLMs: hardware and economics](/guides/self-hosting-llms-hardware-and-economics/): the VRAM/cost formulas this guide assumes but doesn't repeat.
- [Knowledge distillation](/glossary/knowledge-distillation/): the underlying technique — teacher/student training, soft targets, temperature.
- [Benchmarking a fine-tuned model against its lineage](/guides/benchmarking-a-finetuned-model-against-its-lineage/): the methodology for measuring a distilled model's gap against its teacher on your own task.
- [LoRA, InstructLab, and measuring what changed](/guides/lora-instructlab-and-measuring-what-changed/): the equivalent "what actually changed" question for fine-tuned rather than distilled models.
- [AI transparency obligations](/guides/ai-transparency-obligations/): the full Article 53 training-data-summary mechanics referenced in the licensing section.
- [Managed vs. reserved vs. self-hosted inference](/comparisons/managed-vs-reserved-vs-self-hosted-inference/): whether self-hosting a distilled model is the right call versus a managed API tier in the first place.
