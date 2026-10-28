---
title: "Open-weight models, October 2026: Reflection Beam, Nemotron 3.5 Super VL, MiniMax M3.1 Flash"
description: "October 2026 open weights: Reflection's 501B Beam under Apache 2.0, NVIDIA's Nemotron 3.5 Super VL and Bolt, MiniMax M3.1 Flash, a DeepSeek Flash update and Meta's Muse Spark Open. Four bespoke licences now carry a US$20 million trigger, each measured differently. Mistral Large 4 weights are still not out."
date: 2026-10-16
lastmod: 2026-10-28
last_updated: 2026-10-28
last_verified: 2026-10-25
categories: [News]
tags: [open-weight-models, licensing, model-release, reflection, beam, mistral, nemotron, minimax, deepseek, stepfun, liquid-ai, granite, meta, mixture-of-experts]
related:
  - news/open-weight-models-september-2026
  - news/open-weight-models-august-2026
  - news/meta-muse-wonder-and-spark-open
  - tools/mistral-ai
  - tools/nvidia-ai
  - tools/deepseek
  - tools/meta-llama
  - comparisons/llm-landscape-2026
  - guides/software-licensing-and-vendor-lock-in
---

The [September roundup](/news/open-weight-models-september-2026/) found the big releases mostly under MIT or Apache 2.0. October split in two. Two of the month's headline weights, Reflection's 501B **Beam** and DeepSeek's **V4.1-Flash-1017** update, are Apache 2.0 and MIT, with nothing to negotiate. But four other licences published this month, from Meta, MiniMax, StepFun and Mistral, each contain a **US$20 million revenue trigger**, and each one measures that US$20 million differently. Meanwhile Mistral's largest model, **Mistral Large 4**, is on the API as a preview, but its weights are still not on Hugging Face.

This entry covers releases from 6 to 25 October 2026. Every benchmark below is the vendor's own figure and none has been reproduced independently.

## The licence table

Read this before the model sections. It decides what you can ship.

| Model | Lab | Weights public | Licence (as the file names it) | Commercial use without a deal? |
| --- | --- | --- | --- | --- |
| Beam 1.0 (501B / 23B active) | Reflection | 16 Oct | Apache 2.0 | Yes |
| DeepSeek-V4.1-Flash-1017 | DeepSeek | 17 Oct | MIT | Yes |
| Ling-3.1-flash (560B / 25B) | inclusionAI | 13 Oct | MIT | Yes |
| Atria Dawn | Shanghai AI Lab | 23 Oct | MIT (stated in the README; see the note below) | Yes, check upstream GLM-5.2 terms |
| Hy-Memory-30B-A3B | Tencent Hunyuan | 15 Oct | Apache 2.0 | Yes |
| MiniCPM-V 4.7 (35B-A3B, 1B) | OpenBMB | 6 to 7 Oct | Apache 2.0 | Yes |
| Granite Switch 4.1 | IBM | 14 Oct | Apache 2.0 | Yes |
| Nemotron 3.5 Super VL, Bolt | NVIDIA | 15 Oct (Bolt E4B 23 Oct) | OpenMDW-1.1 | Yes; NVIDIA's cards say "ready for commercial or non-commercial use" |
| Muse Spark Open (about 816B / 42B) | Meta | 15 Oct, gated | Muse Model License | Yes, except Model-as-a-Service above US$20M |
| MiniMax M3.1 Flash (about 428B / 23B) | MiniMax | 17 Oct | MiniMax Community License | Base grant is non-commercial; conditions below |
| Step 5 Preview (600B / 27B) | StepFun | first seen 20 Sep; licence file added 13 Oct | StepFun Model License 1.0 | Yes, except MaaS above US$20M and device makers |
| Timestral (5M to 209M) | Mistral | 14 to 15 Oct | "Modified MIT" | Only if your company is under US$20M monthly revenue |
| LFM2.5-24B-A2B | Liquid AI | 13 Oct | LFM Open License v1.0 | Only below US$10M annual revenue |
| Qwen-Image-2.1-Turbo | Alibaba Qwen | 9 Oct | Qwen Research License | No |
| Mistral Large 4 | Mistral | Not published | Labelled only "Open", no licence named | Not yet answerable |
| Kimi K3.1 Pro | Moonshot AI | Not published; promised "by Nov 4" | Not published | Not yet answerable |

**The US$20 million trigger, four ways.** These are the exact tests in each licence file:

- **Meta, Muse Model License.** If you offer models to third parties "via API or a similar interface" and your group's "aggregate gross revenue" exceeds twenty million US dollars "during any consecutive twelve (12) month period", you must notify Meta and sign a separate agreement before offering Muse Spark Open in that Model-as-a-Service business. Internal use and using it to power features of your own product are explicitly excluded. Everyone must display "Built with Muse Spark Open".
- **StepFun Model License 1.0.** A MaaS operator needs a commercial licence if combined group revenue "from all sources" exceeds US$20,000,000 "over any consecutive twelve-month period". Separately, any hardware maker shipping the model as a device feature needs a commercial licence regardless of revenue, and a product with more than 100 million active users or more than US$20 million revenue in a calendar month must display "Powered by StepFun AI".
- **MiniMax Community License.** Commercial use requires "Built with MiniMax M3.1-Flash" on a website, interface or documentation, and "prior written authorization" if "such products and services generate more than 20 million US dollars" in yearly revenue; below that, a one-time notice email. Military use is prohibited outright.
- **Mistral's "Modified MIT" (Timestral).** You may not exercise "any rights under this license" if the global consolidated **monthly** revenue of your company, or your employer, exceeds US$20 million for the preceding month. This is a cap on the whole licence, not a MaaS clause.

The figures match, the tests do not: trailing twelve months against a single month, group revenue against product revenue, MaaS only against any use. The US$20 million number is not new either. The [August roundup](/news/open-weight-models-august-2026/) recorded the Qwen3.8-Max licence using US$20 million monthly revenue as its attribution trigger. What October adds is that four more labs settled on the same figure, which makes it easy to assume the clauses mean the same thing. They do not.

## What happened

### Reflection Beam 1.0: Apache 2.0 at 501B, with a messy timeline

Reflection, the US lab whose co-founder and CEO is Misha Laskin, announced **Beam** on **5 October 2026** as its first open-weight model and opened an early-access waitlist. That post said: "We will release the weights, technical report, model card, and developer artifacts later this month." The Hugging Face repository `reflection/Beam-1.0-501B-A23B` was created on **7 October** (19:52 UTC, from the Hub API); whether it was public at that moment is not recorded. On **8 October** Reflection updated the benchmark table in the announcement. On **16 October** Reflection's follow-up post said: "Today, we have released Beam's model weights on Hugging Face under an Apache 2.0 license." Hugging Face published its own welcome post the same day. So 16 October is the public release date that Reflection itself states. The technical report is still marked "coming" on the model card; Reflection says a separate safety technical report is out.

**Architecture, from the model card and `config.json`:**

- 501.3B total parameters, 23.4B active per token
- 52 layers: 3 dense, then 49 mixture-of-experts layers, with 256 experts and 8 routed per token. Hugging Face's post adds that the router follows DeepSeek-V3's group-limited scheme (8 groups, the best 4 kept) and that "Beam uses the same group sizes as DeepSeek-V3 but no shared expert"
- "Gated GQA + Sliding Window Attention": 48 query heads and 8 key-value heads. The config marks 43 of the 52 layers as sliding-window attention with a 512-token window and 9 as full attention. Only those 9 layers keep a cache that grows with the whole context, which is how a 1M-token window stays affordable.
- 1M-token context, a vocabulary of 152k tokens (151,936 in the config), knowledge cutoff 30 June 2026
- Text in, text out; BF16, FP8 and NVFP4 checkpoints plus a speculative-decoding drafter

The model card also says Reflection "does not prohibit distillation, use of outputs to train other models, fine-tuning, parameter-efficient adaptation, quantization, merging". Apache 2.0 already allows that, but some closed vendors forbid training on their outputs, so the explicit statement is useful.

**Training, as Reflection describes it.** Pretraining on 23.8 trillion tokens took "under four weeks on a cluster of 6,144 NVIDIA GB300 NVL72 GPUs". The reinforcement learning run used "10.5K NVIDIA GB300 GPUs for four weeks generating more than 100 million rollouts with a maximum context length of 256K tokens", and "Training and grading used approximately 1.3 billion sandboxes." None of this can be checked from outside until the technical report appears.

**Reflection's own framing is more modest than most launch posts.** It writes: "Where frontier open models like Kimi K3 remain ahead on raw capability, Beam's advantage is efficiency at inference time." It says Beam "achieves scores comparable to GLM-5.2" on advanced reasoning benchmarks while using three to four times less inference compute. Read the method before quoting that ratio. Reflection estimates compute as about 2 x active parameters x mean generated tokens. That excludes prefill, attention and serving overhead, and Reflection itself calls it "an approximate compute comparison rather than measured inference cost". The model card makes a different claim again: "approximately 3x fewer inference-time reasoning tokens".

**The benchmarks changed between the blog and the card.** The blog table (as updated 8 October) and the model card's BF16 column do not match:

| Benchmark | Blog, updated 8 Oct | Model card, BF16 | Model card, NVFP4 |
| --- | --- | --- | --- |
| SWE-bench Verified | 80.9 | 81.6 | 80.7 |
| DeepSWE v1.1 | 44.4 | 43.3 | 42.7 |
| SWE-bench Pro v1 | 65.5 | 66.1 | 65.6 |
| Terminal Bench 2.1 | 80.1 | 80.1 | 78.4 |
| GPQA Diamond | 90.5 | 90.6 | 89.3 |
| Humanity's Last Exam, no tools | 36.2 | 36.0 | 34.8 |

Reflection's blog post says its model card "includes final benchmarks", so cite the card. The gaps are small, but they show that one more evaluation run moves a score by about a point. In Reflection's own comparison table, MIT-licensed DeepSeek V4.1 Flash scores higher than Beam on DeepSWE (74.2 against 44.4) and Terminal Bench 2.1 (90.6 against 80.1). Beam's case rests on being a US-built Apache 2.0 model and on efficiency, not on leading the open field.

**What it takes to run.** Hugging Face's post puts the BF16 checkpoint at about 1 TB and NVFP4 at about 280 GB, and suggests planning for four B200s (720 GB) for NVFP4, or the FP8 checkpoint on eight H200s with SGLang. On **21 October** AWS announced Beam in Amazon SageMaker JumpStart in US East (N. Virginia) and US East (Ohio), ported to Trainium3, with all three precisions. The AWS post lives under a `/2026/01/` path despite its October date; the link below is the URL exactly as published.

### Mistral Large 4: a preview API, weights promised, licence unnamed

Mistral announced **Mistral Large 4** on **6 October 2026**. The wiki had not covered it before this update, so it is included here. It is a public preview on the API as `mistral-large-4` (version label v26.10). The announcement says: "Weights drop end of this month." As of 25 October no Large 4 repository exists under `huggingface.co/mistralai`, and Mistral's changelog still says "Open weights are coming soon."

- **Size.** The docs card says "52B active parameters and 1.05T total parameters, and a 1.6B vision encoder". The blog rounds this to "1 trillion-parameter".
- **Context and price.** 1M tokens. The docs card lists $1.36 per million input tokens, $0.14 cached input and $4.18 output. The 6 October changelog entry says "Launch pricing: 50% off for 2 weeks." Neither page says whether $1.36 and $4.18 are the discounted or the list rates, and no other rate is shown as of 25 October. Treat the price as unconfirmed until Mistral clarifies it.
- **Licence.** The docs page marks the model "Open" and lists no licence. Mistral Large 3 shipped under Apache 2.0, but do not assume Large 4 will.
- **Training.** "Trained from scratch on 3,800 NVIDIA Grace Blackwell GPUs in Mistral's own datacenters in Europe". Mistral calls it "the first milestone on the roadmap funded by our €3 billion Series D".
- **Mistral-reported scores.** 61.7% on DeepSWE v1.1, 28.3% on Terminal-Bench 4, and 93% of the 40 Cybench challenges. In a blind coding evaluation Mistral says it ran with Surge AI, annotators scored outputs from 1 to 5: Large 4 Preview 3.74, Claude Opus 5 4.22, GLM-5.3 3.60, Kimi K3 3.59, GLM-5.2 3.40.

**One claim to read carefully.** On a test within the Artificial Analysis Cyber Index that asks a model to reproduce a real vulnerability and then patch it, Mistral says Large 4 scores 82%, and adds: "Several leading closed models, including Claude Opus 5.5 and GPT-6 Astra, score near zero on the same test because they refuse to perform the task." That compares refusal policies on one test, not capability. Two other details from the same post: preview red-team partners "will access the same model with reduced moderation and expanded cyber capabilities", and Mistral reports that Large 4's average refusal rate on cyber prompts from JailbreakBench, StrongREJECT and AgentHarm "is higher than all OSS models".

**Also from Mistral this month, briefly.** **Voxtral 3** (20 October, per the changelog) puts four speech models on the API as Public Preview: `voxtral-mini-tts-3-0`, `voxtral-mini-transcribe-3-0`, `voxtral-mini-transcribe-realtime-3-0` and `voxtral-small-transcribe-3-0`. Mini Transcribe is 4B parameters at $0.0035 per minute, and TTS is $13 per million characters. The post offers self-deployment ("To run the full stack on-premises or in a private cloud, talk to our team"), but no Voxtral 3 weights are on Hugging Face. **Timestral** (announced 15 October, repositories created 14 October) is a family of time-series forecasting models at 5M, 28M, 123M and 209M parameters. The licence label says "Modified MIT", and the file contains the monthly US$20 million cap quoted above.

### NVIDIA Nemotron 3.5 Super VL and Bolt: read the card, not the headline

On **15 October 2026** Kari Briski announced on NVIDIA's blog **Nemotron 3.5 Super VL** and two edge models. Of Super VL the blog says: "The model ships with open weights, open datasets and training recipes." All three Hugging Face model cards name the licence as OpenMDW-1.1.

- **Super VL** has 120B total and 12B active parameters. NVIDIA describes it as a hybrid Mamba-2 and Transformer mixture of experts with a C-RADIO vision encoder, with multi-token prediction for speculative decoding, up to 1M context, text, image and video in, and deployment on "4× H100 or 2× GB200". NVIDIA says it was trained on about 26 trillion tokens.
- **Bolt 74B-A9B** has 74B total and 9B active, with up to 256K context. NVIDIA says its 24GB version uses "a native 2-bit quantization to fit in 24GB of memory".
- **Bolt E4B 4GB** was "coming Oct. 23". The Hugging Face repository is public, its card gives 23 October as the release date, and it was last updated that day. The card lists its architecture as Gemma-4-E4B.

**The headline and the card disagree.** The blog's section heading is "Frontier Accuracy at One-Fifth the Size". The body text makes a narrower claim: accuracy "comparable with NVIDIA's largest reasoning model at roughly one-fifth the parameter count". The post does not name that model. Its family list says "Ultra handles the hardest reasoning tasks", and the wiki's [Nemotron 3 entry](/news/nvidia-nemotron-3/) gives Nemotron 3 Ultra as 550B total, so 120B is about a fifth of that. Against current mid-size open models, NVIDIA's own card puts Super VL behind:

| Benchmark (NVIDIA's card) | Super VL | Qwen3.8-Flash-Next | GLM-5.3-Flash | Nemotron 3 Ultra |
| --- | --- | --- | --- | --- |
| HLE, text-only | 31.79 | 39.6 | 36.47 | 29.2 |
| SWE-bench Verified | 71.10 | 78.7 | 79.10 | 73.9 |
| Terminal-Bench 2.1 | 60.67 | 85.80 | 82.70 | 54.80 |

So the accurate reading is "about as good as NVIDIA's own Ultra, at a fifth of the size, and faster". It is not frontier accuracy. NVIDIA's other claim, "5x faster than the next best", is a vendor throughput claim tied to the Artificial Analysis leaderboard. NVIDIA has not published the configuration behind it in the post.

### MiniMax M3.1 Flash: efficient, multimodal, and a licence that needs a lawyer

MiniMax published **MiniMax-M3.1-Flash** weights on **17 October 2026**, and its release notes list the model on **19 October**.

- About 428B total parameters, 23B active, and text, image and video in. MiniMax says it "retains M3's core mixture-of-experts architecture".
- Three changes: MiniMax Sparse Attention (arXiv 2606.13392, cited by the card) now runs in every layer, because "the first three full-attention layers are replaced with sparse attention". Experts and attention paths are quantization-aware trained. A DSpark draft head replaces the earlier multi-token-prediction approach.
- Up to 1M context.
- Self-reported scores: 73.7 on DeepSWE v1.1 and 82.2 on CyberGym. MiniMax ran several of its evaluations inside Claude Code, according to its evaluation notes.

**Price.** MiniMax's pricing page lists M3.1 Flash at $0.15 per million input tokens, $0.60 output and $0.015 for cache reads. The page's Standard and Priority tabs, where Priority costs 1.5x Standard, sit with the MiniMax-M3 tables. The page does not label the M3.1 Flash row as Standard or Priority, and its FAQ describes the Priority tier only for MiniMax-M3, so the tier behind $0.15 and $0.60 is not published.

**Licence.** The MINIMAX COMMUNITY LICENSE grants rights "for non-commercial purposes". It then sets conditions for "Commercial Use": attribution, plus either a one-time notice or, above US$20 million yearly revenue, prior written authorisation. A grant limited to non-commercial use, followed by rules for commercial use, is ambiguous. Get a legal read before you ship it.

### DeepSeek-V4.1-Flash-1017: a point release, served in place

On **17 October 2026** DeepSeek updated its Flash model in place. Its changelog says the API calling method and pricing "remain unchanged", and that you "simply use deepseek-flash" to reach the new model. The weights are MIT, with a 1M context. DeepSeek's pricing page adds a detail that matters if you pinned an old model: "The legacy names deepseek-v4-flash and deepseek-v4-flash-vision-exp are still accepted, but the corresponding models have been retired". Requests to them are now served by the 1017 model.

DeepSeek's own scores against the previous V4.1-Flash: Terminal-Bench 4.0 42.3 against 31.2, DeepSWE v1.1 77.0 against 74.2, and HLE without tools 42.6 against 36.8. An 11-point Terminal-Bench gain is large for something DeepSeek calls "a minor update". DeepSeek says Terminal-Bench 4.0 "was tested with the Claude Code framework" and that "We specifically optimized for DeepSeek Harness, Tencent CodeBuddy, WorkBuddy, and other platforms", so some of the gain may come from harness tuning rather than the model alone. The comparison columns are GPT-5.6 Sol and Opus 5, not the current flagships. DeepSeek also opened a **Search & Fetch API** on its in-house engine, which it says "indexes hundreds of billions of web pages". We found no price for it on the pages we read.

One cross-check: MiniMax's card also shows columns for Kimi K3, GLM-5.3, GPT-5.6 Sol and Opus 5. On Terminal-Bench 4.0, DeepSWE and Automation-Bench, those columns are identical to DeepSeek's to the decimal (on HLE they differ, for example Opus 5 at 55.6 in MiniMax's table and 56.3 in DeepSeek's). On those three rows the two tables share one set of competitor numbers, so they are not two independent measurements. Neither card says where the shared figures come from.

### Muse Spark Open

Meta released **Muse Spark Open** on 15 October 2026 as a gated download. It is a mixture-of-experts model of about 816B total and 42B active parameters, with text, image, audio and video in and a 1M-token context, according to Hugging Face's welcome post. The licence is covered above. The full story, including the closed Muse Wonder release three days earlier, is in [Meta ships Muse Wonder and publishes Muse Spark Open](/news/meta-muse-wonder-and-spark-open/).

### Smaller releases

- **Liquid AI LFM2.5-24B-A2B** (13 October). 24.0B total and 2.45B active parameters, 64 experts per MoE block with top-4 routing, a 36-trillion-token training budget, and 131,072 tokens of context. It is reasoning-only. Liquid reports that during training the model tried to find answers in git history and on GitHub, PyPI and Hugging Face, and once worked out it was in a sandbox. Liquid tightened its sandboxes and says its reported results come from sealed environments. The LFM Open License v1.0 defines its threshold as "annual revenue of 10 million United States dollars ($10,000,000) or more"; above that, commercial use "is not licensed".
- **IBM Granite Switch 4.1** (14 October, Apache 2.0). One endpoint built on `granite-4.1-30b` (128K context) that switches between chat, two activated-LoRA adapters (`decision` and `guardian-core`) and speech-to-text through a 470M English Granite Speech encoder. This is a cascade, not a speech-native model: the transcript is spliced into the chat, and the card says "The speech encoder and the LLM are not yet jointly trained".
- **inclusionAI Ling-3.1-flash** (13 October, MIT). 560B total and 25B active, with 512 routed experts plus 1 shared and 8 active. It is a hybrid-linear design with 63 KDA layers and 9 gated MLA layers, and a 1M context.
- **OpenBMB MiniCPM-V 4.7** (repositories created 6 and 7 October, Apache 2.0). A 35B-A3B MoE, the series' first, and a 1B model. OpenBMB claims 13+ tokens per second "with just 3 GB of memory on iPhone 17 Pro Max". That is implausible as a statement about holding the whole model in memory: 35B parameters at 4 bits is about 17.5 GB. OpenBMB credits the figure to its Lookahead Expert Scheduling, which "uses cross-layer routing prediction to preload experts", but the card does not say how the 3 GB was measured. Measure it on your own device.
- **Tencent Hy-Memory-30B-A3B** (15 October, Apache 2.0). A memory writer that replaces the general-purpose LLM inside Mem0, MemOS and Tencent's Hy-Memory. Tencent's comparison runs on a fixed 20% subsample of each benchmark and puts it narrowly ahead of Claude Opus 5 as a writer: 55.49 against 54.62 on average.
- **Shanghai AI Lab Atria Dawn** (23 October). The full release of the agentic model whose preview the September roundup covered. It is built on GLM-5.2 (744B MoE) with a 512K context. The README states MIT, but the LICENSE file it links to was not in the repository on 25 October. Check GLM-5.2's terms as well.
- **StepFun Step 5 Preview.** 600B total and 27B active parameters and up to 1M context. The card's text says it accepts "text, images, and video"; its specification table lists only text and image input. The repository was created on 20 September and the NVFP4 build on 14 October. We could not establish a public release date, so treat 20 September as "first seen". The licence changed in October: the repository's commit history shows the README tagged `apache-2.0` in every September commit, then `LICENSE.txt` (StepFun Model License 1.0) and a Chinese version added on 13 October, with the tag changed to `other` the same day. Anyone who downloaded it in September under the Apache tag should read the new terms. They are covered above.
- **Qwen-Image-2.1-Turbo** (9 October). What the card calls "an accelerated checkpoint" of Qwen-Image-2.1, using 8 denoising steps and "the same 7B visual generation architecture". The card does not say how it was accelerated. Like its parent, it is under the Qwen Research License: "FOR NON-COMMERCIAL PURPOSES ONLY".
- **Ornith-1.5-122B** (16 October, MIT on the card). A 122B MoE from Ornith. The card says Ornith-1.5 extends Ornith-1.0, "which was developed on top of Qwen3.5 and Gemma4". It claims 76.9 on a row labelled "SWE-bench Pro (no-hack)", ahead of every other model in its own table, including the only 500B-class entry, Beam, at 57.0, and Qwen3.8-Flash-Next at 43.9. Treat this with caution. No one has reproduced it, it would be an extraordinary result for the size, and some of Ornith's numbers for other models do not match their vendors' own: Reflection reports 65.5 (blog) and 66.1 (card) for Beam on "SWE Bench Pro v1", though Ornith's "no-hack" label may mean a different protocol, and NVIDIA reports 60.67 for Super VL on Terminal-Bench 2.1 where Ornith lists 66.7. Other cells do match the vendors, for example Beam's 80.1 on Terminal-Bench 2.1.

- **Moonshot Kimi K3.1 Pro** (announced 23 October, weights not yet published). *Correction, 28 October: an earlier version of this entry said nothing new had come from Moonshot. We had checked only Moonshot's Hugging Face organisation, where there is still no K3.1 repository.* Moonshot calls K3.1 Pro "our most capable 3T-class open-weight model to date" and "a post-trained version of Kimi K3", with a 1-million-token context, and says "The full model weights will be released by Nov 4." No licence has been published, and Moonshot gives no exact parameter count beyond "3T-class". On the API it costs US$2.00 input, US$0.20 cached input and US$10.00 output per million tokens, below Kimi K3's US$3.00, US$0.30 and US$15.00. A Highspeed variant, which Moonshot says delivers "2-3× the speed", costs double for input and output. See [Gemini 4 Carbon, GPT-6.1 Terra and Kimi K3.1 Pro](/news/frontier-models-late-october-2026/).

**Nothing new found** from Alibaba's Qwen LLM line, and no new Z.ai weights. We checked their Hugging Face organisations on 25 October for repositories created since 1 October. (A Qwen3.6-27B listing dated 21 October on one tracker is the April 2026 model, not a new release.)

## Why it matters for builders

**Hosting a paid API: who needs a deal.** If you want to sell inference on an open model without negotiating, the clean options this month are the Apache 2.0 and MIT releases: Beam, DeepSeek-V4.1-Flash-1017, Ling-3.1-flash, Hy-Memory, MiniCPM-V 4.7 and Granite Switch, plus Atria Dawn once its licence file is sorted out. NVIDIA's OpenMDW-1.1 models are also commercial-ready. Muse Spark Open and Step 5 Preview are fine for most companies but are written to catch MaaS businesses above US$20 million. MiniMax M3.1 Flash needs at least a notice email for any commercial use. Timestral and LFM2.5 cut off by company size, not by use.

**Put the trigger in your intake form.** "Is there a revenue clause, measured on what, over what period, for which entity?" are four separate questions. Take a company with US$60 million a year, about US$5 million a month, that sells API access. Every month it stays under Timestral's monthly cap and under StepFun's attribution trigger. But it is over Meta's and StepFun's twelve-month MaaS tests, so it needs a signed agreement with each. A company that has one US$21 million month loses its Timestral rights for the following month, whatever its annual total. Read the LICENSE file every time; the Hugging Face badge says "other" for most of these. See [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/).

**Do not build on Mistral Large 4 weights yet.** The weights, the licence and the price are all unconfirmed as of 25 October. The API preview is fine to test, but a self-hosting plan that assumes Apache 2.0 rests on nothing Mistral has published.

**Check for silent model swaps.** DeepSeek now serves `deepseek-v4-flash` requests with a different model. If you run evaluations or regression tests against a pinned name, rerun them.

**Size is still the gate.** Beam needs about 280 GB in NVFP4 and Muse Spark Open about 1.5 TB in BF16. The practical self-hosted tier is still Super VL on four H100s, Bolt in 24 GB, LFM2.5-24B-A2B and MiniCPM-V 4.7. [Quantization](/glossary/quantization/) and [speculative decoding](/glossary/speculative-decoding/) are now standard parts of a release: Beam, MiniMax, Nemotron and MiniCPM all ship drafters or MTP heads.

**Vendor benchmark tables are not independent.** In this month's tables, the same competitor gets different scores from different vendors: Kimi K3 is listed at 46.9 on HLE without tools by Reflection and 43.5 by DeepSeek. MiniMax's and DeepSeek's competitor columns are identical on three benchmarks. And one release changed its own numbers within a week. Run your own [evaluations](/guides/llm-evaluation-methods/) on your own tasks.

## Sources

1. Reflection, "Introducing Beam: Reflection's 501B open-weight model" (5 October 2026, benchmark table updated 8 October 2026): [https://reflection.ai/blog/introducing-beam](https://reflection.ai/blog/introducing-beam)
2. Reflection, "Beam is now available" (16 October 2026): [https://reflection.ai/blog/beam-is-available](https://reflection.ai/blog/beam-is-available)
3. Reflection, "Beam-1.0-501B-A23B" model card and config.json (repository created 7 October 2026, fetched 25 October 2026): [https://huggingface.co/reflection/Beam-1.0-501B-A23B](https://huggingface.co/reflection/Beam-1.0-501B-A23B)
4. Hugging Face, "Welcome Beam: a 501B open model you can own, customize, and scale" (16 October 2026): [https://huggingface.co/blog/reflection-beam](https://huggingface.co/blog/reflection-beam)
5. AWS, "Beam model by Reflection is now available on Amazon SageMaker JumpStart and AWS Trainium" (posted 21 October 2026): [https://aws.amazon.com/about-aws/whats-new/2026/01/reflection-beam-on-sagemaker-jumpstart-and-aws-trainium/](https://aws.amazon.com/about-aws/whats-new/2026/01/reflection-beam-on-sagemaker-jumpstart-and-aws-trainium/)
6. Mistral AI, "Introducing Mistral Large 4" (6 October 2026): [https://mistral.ai/news/mistral-large-4/](https://mistral.ai/news/mistral-large-4/)
7. Mistral AI, "Mistral Large 4" docs model card (dated 6 October 2026, fetched 25 October 2026): [https://docs.mistral.ai/models/mistral-large-4-0](https://docs.mistral.ai/models/mistral-large-4-0)
8. Mistral AI, Changelog (entries 6 to 22 October 2026, fetched 25 October 2026): [https://docs.mistral.ai/resources/changelogs](https://docs.mistral.ai/resources/changelogs)
9. Mistral AI, "Voxtral 3: Voice Agent SDK & Speech Models in 50+ Languages" (page metadata dates it 22 October 2026; the changelog lists the release under 20 October): [https://mistral.ai/news/voxtral-3/](https://mistral.ai/news/voxtral-3/)
10. Mistral AI, "Timestral: Mistral's time-series foundation models" (15 October 2026): [https://mistral.ai/news/timestral/](https://mistral.ai/news/timestral/)
11. Mistral AI, "Timestral-209M" model card and LICENSE (repository created 14 October 2026, fetched 25 October 2026): [https://huggingface.co/mistralai/Timestral-209M](https://huggingface.co/mistralai/Timestral-209M)
12. NVIDIA, Kari Briski, "Open From Data Center to Desktop: NVIDIA Expands Nemotron Family With Highest Efficiency Super VL and Bolt Models" (15 October 2026): [https://blogs.nvidia.com/blog/nemotron-3-5-super-vl/](https://blogs.nvidia.com/blog/nemotron-3-5-super-vl/)
13. NVIDIA, "NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16" model card (repository created 12 October 2026, release date 15 October 2026 per the card): [https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16)
14. NVIDIA, "NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16" model card (repository created 9 October 2026): [https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16)
15. NVIDIA, "NVIDIA-Nemotron-3.5-Bolt-E4B-4GB" (last updated 23 October 2026): [https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)
16. Meta, "Muse-Spark-Open-816B-A42B", gated repository and Muse Model License text (licence release date 15 October 2026, fetched 25 October 2026): [https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B)
17. Hugging Face, "Welcome Muse Spark Open: open-weight frontier multimodal mixture-of-experts model from Meta" (15 October 2026): [https://huggingface.co/blog/meta-muse-spark-open](https://huggingface.co/blog/meta-muse-spark-open)
18. MiniMax, "MiniMax-M3.1-Flash" model card and LICENSE (17 October 2026): [https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash)
19. MiniMax, "Release Notes: Models" (entry dated 19 October 2026): [https://platform.minimax.io/docs/release-notes/models](https://platform.minimax.io/docs/release-notes/models)
20. MiniMax, "Pricing Overview" (fetched 25 October 2026): [https://platform.minimax.io/docs/guides/pricing-paygo](https://platform.minimax.io/docs/guides/pricing-paygo)
21. DeepSeek, API Docs change log (entry dated 17 October 2026): [https://api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates)
22. DeepSeek, "DeepSeek-V4.1-Flash-1017" model card (17 October 2026): [https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)
23. DeepSeek, Models and pricing page (fetched 25 October 2026), for the retired legacy model names: [https://api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing)
24. Liquid AI, "LFM2.5-24B-A2B: Built for Fast On-Device Agents" (13 October 2026): [https://www.liquid.ai/blog/lfm2-5-24b-a2b](https://www.liquid.ai/blog/lfm2-5-24b-a2b)
25. Liquid AI, "LFM2.5-24B-A2B" model card and LFM Open License v1.0 (fetched 25 October 2026): [https://huggingface.co/LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B)
26. IBM Granite, "granite-switch-4.1-30b" model card (release date 14 October 2026): [https://huggingface.co/ibm-granite/granite-switch-4.1-30b](https://huggingface.co/ibm-granite/granite-switch-4.1-30b)
27. inclusionAI, "Ling-3.1-flash" model card (13 October 2026): [https://huggingface.co/inclusionAI/Ling-3.1-flash](https://huggingface.co/inclusionAI/Ling-3.1-flash)
28. OpenBMB, "MiniCPM-V-4.7-35B-A3B" model card (repository created 7 October 2026): [https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B)
29. Tencent Hunyuan, "Hy-Memory-30B-A3B" model card (15 October 2026): [https://huggingface.co/tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B)
30. Shanghai AI Lab, "Atria-Dawn" model card (23 October 2026): [https://huggingface.co/internlm/Atria-Dawn](https://huggingface.co/internlm/Atria-Dawn)
31. StepFun, "Step-5-Preview" model card, LICENSE.txt and commit history (repository created 20 September 2026, licence file added 13 October 2026, fetched 25 October 2026): [https://huggingface.co/stepfun-ai/Step-5-Preview](https://huggingface.co/stepfun-ai/Step-5-Preview)
32. Qwen, "Qwen-Image-2.1-Turbo" model card and LICENSE (9 October 2026): [https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo)
33. Ornith, "Ornith-1.5-122B" model card (16 October 2026): [https://huggingface.co/ornith-ai/Ornith-1.5-122B](https://huggingface.co/ornith-ai/Ornith-1.5-122B)

## Further reading

- [September 2026: big open weights, and more non-commercial licences](/news/open-weight-models-september-2026/): the previous roundup, including the Atria Dawn preview.
- [August 2026: the month open weights came with conditions](/news/open-weight-models-august-2026/): GLM-5.3's licence and the Qwen3.8-Max revenue triggers.
- [Meta ships Muse Wonder and publishes Muse Spark Open](/news/meta-muse-wonder-and-spark-open/): the Muse Model License clause by clause.
- [DeepSeek-V4.1-Flash](/news/deepseek-v4-1-flash/): the architecture the 1017 update builds on.
- [NVIDIA ships the Nemotron 3 family](/news/nvidia-nemotron-3/): the Super and Ultra models Super VL is measured against.
- [Mistral AI](/tools/mistral-ai/), [NVIDIA AI](/tools/nvidia-ai/), [DeepSeek](/tools/deepseek/), [IBM watsonx and Granite](/tools/ibm-watsonx/), [Alibaba Qwen](/tools/alibaba-qwen/) and [Meta's models](/tools/meta-llama/): the vendor pages.
- [Reflection Beam](/tools/reflection-beam/) and [MiniMax](/tools/minimax/): the new model pages for two of this month's releases.
- [Amazon SageMaker](/tools/amazon-sagemaker/): where Beam is now a JumpStart model.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/) and [small vs large language models](/comparisons/small-vs-large-language-models/): where these sizes fit.
- [Mixture of experts](/glossary/mixture-of-experts/): why 501B total and 23B active is not a contradiction.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): how to read a model licence.
