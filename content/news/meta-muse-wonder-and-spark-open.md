---
title: "Meta Ships Muse Wonder via Its API and Publishes Muse Spark Open Weights Under a New Licence"
description: "On 12 October 2026 Meta released Muse Wonder at $4/$20 per million tokens, with Muse Wonder Full only inside Muse Code. On 15 October it published Muse Spark Open, an 816B open-weight model under a bespoke licence that requires a separate agreement for large Model-as-a-Service providers."
date: 2026-10-12
lastmod: 2026-10-25
last_updated: 2026-10-25
last_verified: 2026-10-25
categories: [News]
tags: [meta, muse, muse-wonder, muse-spark-open, open-weights, model-release, licensing, benchmarks, pricing, ai-safety]
related:
  - tools/meta-muse
  - tools/meta-llama
  - news/meta-muse-first-month
  - news/meta-muse-spark-model-api
  - news/claude-opus-5-5
  - comparisons/llm-landscape-2026
  - news/open-weight-models-september-2026
---

Meta Superintelligence Labs (MSL) made two releases in four days. On **12 October 2026** it released **Muse Wonder** and **Muse Wonder Full**, which Meta calls "our most capable models to date". Muse Wonder is a paid API model. Muse Wonder Full is available only inside the Muse Code subscription. On **15 October 2026** Meta published the weights of **Muse Spark Open**, an 816 billion parameter mixture-of-experts model, under a licence written for it. One release is a closed frontier model and the other is open weights, so this entry covers them in two separate sections.

Meta's newsroom post opens with the company's own framing: "Fourteen months ago, we began an overhaul of our AI efforts, and in that time we've gone from rebuilding our foundations to pushing the frontier." The research blog adds that both Wonder models were "Trained at our gigawatt-scale Prometheus data center". Every benchmark below is Meta's own table unless we say otherwise. Several rows are results Meta attributes to third parties (Artificial Analysis, Vals AI, Surge, Datacurve, Abundant AI, Scale AI). Of those, we checked only the Artificial Analysis Intelligence Index: Artificial Analysis's own model pages, fetched on 25 October, show the same scores Meta quotes (56 for Wonder Full, 52 for Wonder, 58 for Claude Opus 5.5, 39 for Spark Open, 45 for GLM 5.3 and 44 for Kimi K3). We found no independent reproduction of Meta's internal runs.

## What happened

| Date (2026) | Event |
| --- | --- |
| 12 October | Muse Wonder (`muse-wonder-1.0`) on the Meta Model API, Muse Code and OpenRouter. Muse Wonder Full (`muse-wonder-full-1.0`) in Muse Code on the Power Usage and Maximum Usage plans only |
| 13 October | Meta updates the newsroom post (the page shows both dates) |
| 15 October | Muse Spark Open weights on Hugging Face, with hosted partners and cloud catalogs the same day |
| 16 October | Unsloth publishes an NVFP4 copy with the licence text mirrored word for word. Reflection releases the weights of Beam, one of the models in Meta's Spark Open comparison, under Apache 2.0 |
| 23 October | Meta corrects the Muse Wonder model card's ExploitGym cyber result after a harness fix |

## Muse Wonder: what is actually different

### Price and access

- **Muse Wonder** costs **$4.00 input, $0.20 cached input and $20.00 output per million tokens**, per Meta's model page. The model card gives the context as "1M tokens at inference". **Meta does not publish a maximum output length.** OpenRouter's listing shows 943,718 output tokens. That is 90 percent of the 1,048,576 token context, rounded down, and OpenRouter shows the same number for every Muse Spark model, so we do not treat it as a published limit.
- **Muse Wonder Full** has **no API and no per-token price**. The price cells in Meta's table are dashes. It is available in Muse Code on the **Power Usage plan at $50 a month** ("20x more usage than the Everyday Usage plan") and on a new **Maximum Usage plan at $200 a month** ("80x more usage than the Everyday Usage plan"). Meta's developer blog says Muse Wonder "brings comparable performance to Muse Wonder Full".
- **Modalities.** The model card lists input as "text, image, video, audio" and output as text. The developer blog by Josh Walters (12 October) adds a caveat: "Audio-dependent use cases require confirmation of audio support on the release surface." In other words, Meta lists audio input in the card but does not promise it on any particular surface. OpenRouter lists audio input for `meta/muse-wonder`. We have not tested it.
- **Consumer rollout.** Meta says "Muse Wonder will soon power experiences in Muse, and will roll out first to subscribers." No date was given.
- **Price context.** $4/$20 with $0.20 cache reads is exactly the list price of [Claude Opus 5.5](/news/claude-opus-5-5/). Compared with Meta's own Muse Spark 1.3 at $1.25/$4.25 (as recorded on the [LLM landscape page](/comparisons/llm-landscape-2026/)), Wonder costs 3.2 times as much for input and about 4.7 times as much for output.

### Benchmarks, by Meta's own numbers

Meta's model card says every model was compared at max reasoning effort, except Wonder Full on SWE-Marathon, which "was reported with xhigh reasoning effort". Before using the table we checked the column mapping against the rendered table on dev.meta.ai. The page stacks each model's scores in its own column, and the scores Meta highlights as best in each row fall where this mapping puts them.

| Benchmark | Muse Wonder Full | Muse Wonder | Claude Fable 5.1 | GPT-6 Astra | Claude Opus 5.5 |
| --- | --- | --- | --- | --- | --- |
| Personal Superintelligence Index (Meta internal) | **59.1** | 54.3 | 49.9 | 54.5 | 55.2 |
| Harvey LAB-AA | **13.1** | 10.0 | 6.4 | 8.6 | 4.2 |
| Vals Finance Agent V2 | **59.1** | 56.6 | 58.9 | 53.5 | 58.6 |
| HealthBench Pro | 62.3 | 60.5 | 62.1 | 65.3 | **65.6** |
| AutomationBench-AA | **45.4** | 39.1 | 32.1 | 41.6 | 41.2 |
| GDP.pdf | 33.2 | 30.8 | 27.6 | **34.2** | 30.6 |
| JobBench | 75.3 | 70.5 | 73.1 | 66.1 | **75.4** |
| OSWorld V2.1 (partial) | 78.4 | 72.6 | 80.7 | 75.8 | **81.8** |
| MemoryBench (Meta internal) | 85.5 | **85.6** | 79.0 | 81.4 | 81.5 |
| Terminal-Bench 4.0-AA | 57.1 | 52.0 | 52.0 | 59.1 | **59.6** |
| DeepSWE 1.1 | **79.0** | 78.8 | 67.4 | 74.1 | 74.2 |
| SWE-Marathon | **57.5** (xhigh) | 53.1 | 45.6 | 42.5 | 46.3 |
| ProgramBench | 59.0 | 50.0 | 55.5 | 52.5 | **70.5** |
| Artificial Analysis Intelligence Index | 56 | 52 | 53 | 53 | **58** |

Bold marks the best score in each row, as Meta highlights it.

Read the table carefully and Meta's own numbers make a narrower case than "most capable". **Claude Opus 5.5 scores higher than Muse Wonder Full** on the Artificial Analysis Intelligence Index (58 vs 56), ProgramBench (70.5 vs 59.0), Terminal-Bench 4.0-AA (59.6 vs 57.1), OSWorld V2.1 (81.8 vs 78.4), HealthBench Pro (65.6 vs 62.3) and, by a tenth of a point, JobBench (75.4 vs 75.3). Wonder Full's clear leads are on Harvey LAB-AA, AutomationBench-AA, Meta's internal index, and the two coding rows that Meta's developer page leads with, DeepSWE 1.1 and SWE-Marathon. The API model, Muse Wonder, is 6 points behind Opus 5.5 on the Artificial Analysis index (52 vs 58) at the same price.

Methodology notes from the model card that matter for the coding claim:

- On SWE-Marathon, the card says Abundant AI's leaderboard results "for GPT-6 Astra and Claude Fable 5.1 use Codex and Claude Code, respectively, so this row is not a controlled common-harness comparison." Wonder Full was also run at a different effort setting from the others.
- On DeepSWE 1.1, Wonder, Wonder Full and Opus 5.5 come from the same third party, Datacurve. GPT-6 Astra's figure is OpenAI's own report and Fable 5.1's comes from Anthropic's system card. This means Wonder and Opus 5.5 are compared on DeepSWE using one source. On ProgramBench the card says "All compared models use mini-swe-agent", so that row is a common-harness comparison, and on it Opus 5.5 leads Wonder Full by 11.5 points.
- More generally, the card says: "Internally generated competitor runs use common settings where practical but remain best-effort: prompts, tools, and runtime may not be optimally tuned for proprietary models."

### Safety, and the corrected cyber result

The assessment runs under Meta's **Meta Superintelligence Scaling Framework** and was done on Wonder Full. The model card says: "Without mitigations, we do not rule out the model reaching this threshold in the Chemical & Biological domain." Meta rates the unmitigated model "moderate or lower" for Cybersecurity and Loss of Control. With mitigations, which Meta says include "safety post-training and system-level classifiers", it rates all domains at "moderate or lower".

- **Cyber capability:** CyberGym 88.4%, ExploitBench 58.9%, ExploitGym 20 intended flags. The ExploitGym figure was **corrected on 23 October**. The card as published on 12 October (Internet Archive copy) put **92** in the table, with a note that a verification pass found "21 of those used the intended vulnerability, while the other 71 were captured through unintended vulnerabilities", and that "ExploitGym's published ranking counts only intended-vulnerability exploitations". After "correcting our harness to include the intended vulnerability in the model's prompts, as recommended by the benchmark", Meta reran the test and now reports that Wonder Full "succeeded in capturing 20 intended flags (instead of the 92 total flags and 21 intended flags originally reported)". Meta says the updated evaluations "do not require us to adjust our "moderate or lower" risk threshold". So the number in the table fell from 92 to 20: most of that is the switch to counting intended flags only, as the public leaderboard does, and the rerun itself moved the intended count from 21 to 20.
- **Loss of control:** MASK honesty 87.3%. Agentic Misalignment harmful-action rate 0%.
- **Two different scoring rules.** The capability methodology says "Model refusals receive zero credit and remain in the denominator rather than being dropped." The CBRN proxy table handles two rows differently. ABC Bench Fragment Design and Screening Evasion show a dash instead of a score, marked "High rate of refusals due to safety training. Refusals dropped prior to scoring." So for the two most sensitive design tasks Meta publishes no number, and the rule it applies there is the reverse of the one its capability methodology states. The card does not say how those two tasks would score if refusals counted as zero, as they do elsewhere. That is not published.

Meta's newsroom says: "A full report with additional safety evaluations will be available soon." On 25 October, the Muse Wonder pages we checked linked only to the model card.

## Muse Spark Open: what is actually different

### The model and the pledge it answers

The research blog's title calls Muse Spark Open "The Most Capable US Open-Weight Model to Date". That is Meta's claim, and the benchmark section below checks it against Meta's own table. As recorded on the [Meta models page](/tools/meta-llama/), Mark Zuckerberg and Alexandr Wang pledged on 10 August 2026 that Muse Spark 1.2 would get an open-weight release "soon". The released model has no version number. Meta's developer blog calls it "the open weights version of Muse Spark". Meta's Muse Spark Open model page on dev.meta.ai is more specific: it says the model "is derived from the Muse Spark model we released in August, with additional safety post-training". The only Muse Spark release in August was Muse Spark 1.2 (5 August), so this matches the pledge, but Meta does not name the version anywhere we found.

| | Muse Spark Open, per the Hugging Face model card |
| --- | --- |
| Parameters | 816B total, 42B active |
| Architecture | Mixture-of-experts transformer with a Perception Encoder |
| Experts | 256, with 8 active per token (top-k routing) |
| Layers, hidden size | 62 layers, hidden dimension 8192 |
| Attention | 128 query heads and 16 key-value heads (grouped-query), head dimension 64 |
| Vision encoder | 1.8B parameters, 50 layers |
| Vocabulary | 202,048 |
| Context | "1M at inference" |
| Modalities | Input: text, image, video, audio. Output: text |
| Reasoning effort | low, medium, high, xhigh. "The default is xhigh." "Any other value returns an error." |
| Checkpoints from Meta | BF16 and NVFP4. Per Meta's developer blog, AMD (FP8, MXFP4), Intel (MXFP4, INT4) and Unsloth (GGUF) publish their own formats |

The weights are at `meta-models/Muse-Spark-Open-816B-A42B` on Hugging Face. The repository is **gated with manual approval**: on 25 October, Hugging Face's API reported `"gated": "manual"` for it, and the request form says your details are handled "in accordance with the Meta Privacy Policy". That matters for anyone describing it as open. Unsloth's NVFP4 copy (16 October) is not gated, but the licence still applies to copies.

### Running it: the footprint figures do not agree

Each of these figures comes from a different source and measures something different, so we quote each one with its source:

- **Model card:** "at least 700GB of VRAM for NVFP4 and 2TB for BF16". This is a serving requirement, not the size of the weights.
- **Meta developer blog:** BF16 weights are "about 1.6 TB". NVFP4 is "About a third the size of BF16 (about 530 GB). Only the experts are quantized. Serves on four Blackwell Ultra GPUs or eight H200s."
- **AWS:** says the NVFP4 variant needs "roughly a quarter of the memory". This conflicts with Meta's "about a third": 530 GB out of 1.6 TB is 33 percent.
- **Unsloth GGUF, as described in Meta's blog:** the 2-bit build "fits in about 300 GB of combined system RAM and VRAM". The same post's format table says it "Runs locally on a 256 GB setup with llama.cpp". These two figures in one post disagree, and we have not tested either.
- **Apple MLX:** two Mac Studios with M5 Ultra and 512GB each, or four with 256GB each, "for a total of 1TB of unified memory, enough to hold a NVFP4 quantized version".

Inference engines supported on launch day: SGLang, vLLM, TensorRT-LLM, Hugging Face Transformers, MLX, llama.cpp and Unsloth. Hosted partners: Baseten, Fireworks AI, Groq (in "Limited preview"), Modal, Nebius, OpenRouter and Together AI. Cloud catalogs: Amazon SageMaker JumpStart, Google Cloud Model Garden and Microsoft Foundry Models. **Meta publishes no API price of its own.** OpenRouter's listing on 25 October showed $1.25 input, $4.25 output and $0.15 cache read per million tokens across six providers. That is the same list price OpenRouter shows for the closed Muse Spark 1.3. We did not check each partner's own pricing page.

### The licence

This is the part of the release that changes what builders can do. The **MUSE MODEL LICENSE** ("version: Muse Spark Open", release date 15 October 2026) is new and specific to this model. We read it in two places: on the Hugging Face access page and in Unsloth's word-for-word mirror. Meta's own LICENSE file sits behind the gate. The numbered clauses matched in both copies.

- **The grant is broad.** The opening wording comes from the MIT licence ("Permission is hereby granted, free of charge, to any person"). It covers the rights "to use, copy, modify (including fine-tune), create derivative works, distill, merge, publish, distribute, sublicense, and/or sell copies".
- **Attribution.** Licensees "shall prominently display "Built with Muse Spark Open"" in the product interface, documentation, website or settings. "Derivatives" includes any model "trained, modified (including fine-tuned), distilled, or otherwise improved using the Software or any outputs or results thereof". A model trained on Spark Open's outputs therefore carries the same obligation, and the model card advertises synthetic data generation as a use case.
- **The revenue gate.** The gate applies to anyone offering models to third parties "via API or a similar interface" ("Model as a Service") whose aggregate gross revenue, together with its affiliates, "exceeds twenty (20) million US dollars" in any twelve months. Such a licensee "must notify Meta and enter into a separate written agreement with Meta" before offering the model that way. The threshold counts the whole group's revenue, not revenue from the model. Internal use, research, non-MaaS commercial activity, and use "as a component to power features of the Licensee's own product or service" are exempt.
- **Outputs and liability.** "Meta claims no ownership of outputs generated by the Software." The software is provided as is. For licensees in the European region, "Meta" means Meta Platforms Ireland Limited.
- **Exhibit A, the usage policy.** It prohibits use related to "Military, warfare, nuclear industries or applications, espionage" and to ITAR-controlled materials. It also prohibits "Operation of critical infrastructure, transportation technologies, or heavy machinery", "Representing that the use of Muse Spark Open or outputs are human generated", and the unlicensed practice of professions such as law and medicine. It states that the model "is not intended for individuals under the age of 18".

Meta's own summary is that the licence has "limited commercial terms, which allow many developers to use the model for free." That holds for most teams. But this is not an open source licence in the OSI sense. Criterion 6 of the Open Source Definition says a licence "must not restrict anyone from making use of the program in a specific field of endeavor", and Exhibit A does exactly that. Meta's smaller open model, **Muse Glimmer**, is Apache 2.0 and ungated, so Meta now ships two open-weight licences that differ in kind.

### Benchmarks and the claim in the title

Meta compares Spark Open with seven open-weight models, with Spark Open at xhigh effort. The results are not all from one place: Meta's evaluation methodology sources each row separately, from Artificial Analysis, Scale AI and other official leaderboards, from Meta's internal runs, or from each provider's self-report (Beam and Mistral Large 4 are self-reported throughout, because their weights "were not broadly available" when Meta evaluated). Selected rows:

| Benchmark | Muse Spark Open | Inkling | Nemotron 3 Ultra | Beam | Qwen3.8-2.4T-A95B | GLM 5.3 | Kimi K3 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Artificial Analysis Intelligence Index | 39 | 26 | 23 | not reported | 40 | **45** | 44 |
| MCP-Atlas | **89.2** | 76.0 | 63.1 | 78.7 | 84.5 | 84.2 | 82.3 |
| OSWorld Verified | 80.4 | 40.1 | not reported | not reported | not reported | not reported | **84.8** |
| DeepSWE 1.1 (preferred harness) | 60 | not reported | not reported | 44 | 57 | 67 | **68** |
| Terminal-Bench 2.1 | 76.4 | 55.1 | 53.9 | 80.1 | 82.0 | 83.9 | **85.0** |
| GPQA Diamond | 89.0 | 87.2 | 86.7 | 90.5 | **93.5** | 91.7 | **93.5** |
| HLE, with tools | 61.0 | 46.0 | 37.4 | 51.2 | 56.2 | **62.5** | 56.0 |
| StrongREJECT v2 (attack success, lower is better) | **0.5** | 86.4 | 80.7 | not reported | 65.6 | 62.9 | 66.6 |

Bold marks the best score among the models shown. Mistral Large 4, the eighth model in Meta's table, scores 38 on the index and has only five other rows. Three of them are above Spark Open, all self-reported or from Artificial Analysis rather than Meta's runs: GDPval-AA v2 (1424 vs 1401), DeepSWE 1.1 (62 vs 60) and SWE-Atlas-QnA (59 vs 58).

What the table supports, and what it does not:

- **Against the Chinese models, Spark Open is not ahead overall.** GLM 5.3 (45), Kimi K3 (44) and Qwen3.8-2.4T-A95B (40) all score higher on the Artificial Analysis index. GLM 5.3 and Kimi K3 also lead on DeepSWE, Terminal-Bench 2.1 and GPQA Diamond. Spark Open's clear lead is MCP-Atlas (89.2 against 84.5 for the next best), which Meta's methodology describes as 1,000 tasks "across 36 real Model Context Protocol servers and 220 tools". It also leads on JobBench, narrowly (61.8 against 61.4 for GLM 5.3), and on two knowledge rows not shown here, HLE-Diamond without tools (26.1 against 22.2 for Kimi K3) and AA Omniscience (25 against 20). On the multimodal rows only Inkling and Kimi K3 are compared: Meta says Nemotron 3 Ultra, GLM 5.3, Qwen3.8 and Beam "do not natively support multimodal inputs", and Mistral Large 4 "was not available for internal testing". There Spark Open leads Kimi K3 on ZeroBench, SimpleVQA and IntPhys2 and trails it on BabyVision, WorldVQA and VideoMMEv2.
- **Against the US-built models in the table**, Thinking Machines' [Inkling](/news/thinking-machines-inkling/) and NVIDIA's Nemotron 3 Ultra, it leads on every capability row. **Against Beam** it does not lead everywhere. Beam is Reflection's 501B model, which Reflection says "advances the Western open-weight frontier". Beam scores higher on GPQA Diamond (90.5 vs 89.0) and Terminal-Bench 2.1 (80.1 vs 76.4). Those Beam figures are self-reported and match Reflection's own 5 October post (which Reflection updated on 8 October). Meta says Beam's weights were "not broadly available" when it ran its evaluation. Reflection released them on 16 October, the day after Spark Open, under Apache 2.0. The final Beam model card on Hugging Face reports slightly different BF16 numbers (GPQA Diamond 90.6, Terminal-Bench 2.1 80.1, MCP Atlas 80.8), which do not change whether Beam or Spark Open is ahead on any of those three rows. "Most capable US open-weight model" is therefore Meta's framing of a lead on most rows, not all of them.
- **Harnesses differ by model.** Meta's methodology shows DeepSWE results with Muse Code for Spark Open (sourced from Artificial Analysis), and self-reported results with Claude Code for Qwen, Kimi Code for Kimi and mini-swe-agent for GLM. On Terminal-Bench 2.1, Reflection's post lists GLM 5.3 at 88.2 and Kimi K3 at 88.3, against 83.9 and 85.0 in Meta's table. The benchmark is the same, the sources are different, and so are the numbers.

### Safety numbers to treat with care

The figure to flag is **StrongREJECT v2: 0.5 for Spark Open against 62.9 to 86.4 for every other model scored**. Meta's methodology calls it "an internal benchmark of 202 disallowed behaviors, adapted from StrongREJECT (Souly et al., 2024)". A behaviour counts as broken "if any attempt yields a response that passes the StrongREJECT autograder", and all scores come from Meta's internal runs. The reported figure is "the mean of two attack success rates over the 202 behaviors" (with and without adversarial developer prompts), so a conversion to counts is approximate. As arithmetic, 0.5 percent of 202 is about one behaviour, while the other models' scores correspond to roughly 127 to 175 behaviours. A gap that size, on Meta's own test, in Meta's own harness, after safety training added specifically to this release, should be reproduced independently before anyone relies on it. The same table shows the cost on the other side. On FORTRESS, which Meta sources from Scale's leaderboard, Spark Open has the lowest adversarial risk score in the table (5.8, against 21.6 to 28.2 for the others), but also the **highest over-refusal score of any model listed: 17.4, against 2.7 for Kimi K3 and 3.2 for GLM 5.3**. Meta's methodology defines over-refusal as "the percentage of benign prompts that a model refuses to answer", and lower is better on both measures.

Meta's other safety claims are as follows. The model "refused 99.2% of jailbreaks on our internal benchmark" and 94.8% across PolyGuard (cyber subset), RedCode and CyberBench 2024, against 75.5% and 70.2% for Kimi K3. It scores a 98.1% honesty rate on MASK and a 0% misbehaviour rate on Agentic Misalignment. The model card also warns: "Downstream modifications could degrade safety, and results for the released checkpoint should not be assumed to apply to modified models." The research blog says a full evaluation report will be "available soon".

## Why it matters for builders

**Muse Wonder is an API model at Opus 5.5's price, with less published about it.** It has no published maximum output and no guarantee of audio support, and its coding lead rests on two benchmarks, one of which Meta itself says is not a common-harness comparison. If you test it, set `max_tokens` explicitly, check audio on the exact surface you will use, and compare it with Opus 5.5 and GPT-6 Astra on your own tasks. Muse Wonder Full cannot be built into a product at all: it exists only inside Muse Code.

**Muse Spark Open is the largest set of weights Meta has published.** At 816B total parameters it is about twice the size of Llama 4 Maverick (400B total). The licence, not the hardware, is what to check first:

1. **Work out whether you are a Model-as-a-Service provider.** Internal deployments, research and features inside your own product are exempt. A hosting company, an inference reseller or an API wrapper whose group revenue is above $20 million a year needs a written agreement with Meta before it launches.
2. **Plan for the attribution.** "Built with Muse Spark Open" has to appear in your product, docs or settings. The obligation also covers models distilled or trained on its outputs, so a synthetic-data pipeline counts.
3. **Check Exhibit A against your sector.** Defence, critical infrastructure, transport and products for under-18s are where it bites.
4. **Request access early.** Approval on Meta's repository is manual. To evaluate first, the hosted partners need no download, and OpenRouter listed $1.25/$4.25 on 25 October.
5. **Size hardware from the model card, not the file size.** Meta's own serving figure is at least 700GB for NVFP4. Test 2-bit GGUF quality on your own tasks before you rely on it.
6. **Bring your own guardrails.** Meta's refusal numbers describe the released checkpoint only, and Meta says modifications "could degrade safety". If you fine-tune it, rerun your own safety evaluation.

## Sources

1. Meta Newsroom, "Introducing Muse Wonder and Muse Wonder Full: Frontier Models for Agents" (12 October 2026, updated 13 October 2026; fetched 25 October 2026): https://about.fb.com/news/2026/10/introducing-muse-wonder-models/
2. Meta AI Research, "Muse Wonder: A Frontier Model For Personal & Professional AI Agents" (12 October 2026), for the Prometheus training statement: https://research.meta.ai/blog/muse-wonder
3. Meta, "Muse Wonder Model Card" (PDF; release date 12 October 2026, ExploitGym results updated 23 October 2026; fetched 25 October 2026), for modalities, context, methodology, the Scaling Framework assessment and all safety figures: https://research.meta.ai/static/muse-wonder-model-card
4. Meta for Developers, "Muse Wonder" model page (fetched 25 October 2026; the developer.meta.ai address redirects here), for prices, Muse Code plans and the benchmark table: https://dev.meta.ai/models/muse-wonder/
5. Meta for Developers blog, Josh Walters, "Put your ideas to work with Muse Wonder and Muse Wonder Full" (12 October 2026), for the audio caveat and the Maximum Usage plan: https://dev.meta.ai/resources/blog/build-with-muse-wonder
6. Meta AI Research, "Introducing Muse Spark Open, The Most Capable US Open-Weight Model to Date" (15 October 2026): https://research.meta.ai/blog/muse-spark-open
7. Meta for Developers blog, Adam Loving and nine co-authors, "Build with Muse Spark Open" (15 October 2026), for runtimes, checkpoint sizes, hosting partners and catalogs: https://dev.meta.ai/resources/blog/build-with-muse-spark-open
8. Hugging Face, `meta-models/Muse-Spark-Open-816B-A42B` model card and licence access page (released 15 October 2026; fetched 25 October 2026), for architecture, footprint, benchmarks, safety claims and licence text: https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B
9. Hugging Face model API for the same repository (fetched 25 October 2026), for the manual gating status: https://huggingface.co/api/models/meta-models/Muse-Spark-Open-816B-A42B
10. Meta, "Muse Spark Open Evaluation Methodology" (PDF, October 2026; fetched 25 October 2026), for harnesses, sources per benchmark and the StrongREJECT v2 definition: https://research.meta.ai/static/muse-spark-open-evaluation-methodology
11. Unsloth, word-for-word mirror of the Muse Model License (uploaded 16 October 2026): https://huggingface.co/unsloth/Muse-Spark-Open-816B-A42B-NVFP4/blob/main/LICENSE.md
12. AWS What's New, "Muse Spark Open model now available on Amazon SageMaker JumpStart" (posted 15 October 2026): https://aws.amazon.com/about-aws/whats-new/2026/01/muse-spark-open-on-sagemaker-jumpstart/
13. OpenRouter, models and endpoints API (fetched 25 October 2026), for Muse Wonder and Muse Spark Open listings and prices: https://openrouter.ai/api/v1/models/meta/muse-spark-open/endpoints and https://openrouter.ai/api/v1/models/meta/muse-wonder/endpoints
14. Reflection, "Introducing Beam: Reflection's 501B open-weight model" (5 October 2026, results updated 8 October 2026), for Beam's self-reported scores and licence plan: https://reflection.ai/blog/introducing-beam
15. Open Source Initiative, "The Open Source Definition" (fetched 25 October 2026), criterion 6: https://opensource.org/osd
16. Internet Archive, capture of the Muse Wonder model card as first published (12 October 2026, 17:03 UTC), for the original ExploitGym figure and note: https://web.archive.org/web/20261012170358/https://research.meta.ai/static/muse-wonder-model-card
17. Meta for Developers, "Muse Spark Open" model page (fetched 25 October 2026), for "derived from the Muse Spark model we released in August": https://dev.meta.ai/models/muse-spark-open
18. Reflection, "Beam is now available" (16 October 2026), for the Apache 2.0 weight release: https://reflection.ai/blog/beam-is-available
19. Hugging Face, `reflection/Beam-1.0-501B-A23B` model card (fetched 25 October 2026), for Beam's final benchmark figures: https://huggingface.co/reflection/Beam-1.0-501B-A23B
20. Artificial Analysis, model pages for Muse Wonder, Muse Wonder Full, Muse Spark Open, Claude Opus 5.5, GLM-5.3 and Kimi K3 (fetched 25 October 2026), as corroboration of the Intelligence Index scores: https://artificialanalysis.ai/models/muse-wonder-full and https://artificialanalysis.ai/models/muse-spark-open

## Further reading

- [Meta models: Muse Spark, Muse Glimmer and Llama](/tools/meta-llama/): the full Meta line-up, including the 10 August open-weight pledge.
- [Meta Muse, explained in full](/tools/meta-muse/): the consumer agent that Muse Wonder will power.
- [Muse's first month](/news/meta-muse-first-month/): the agent's launch month and its controversies.
- [Muse Spark 1.1 and the Meta Model API](/news/meta-muse-spark-model-api/): how Meta's API began.
- [Claude Opus 5.5](/news/claude-opus-5-5/): the model Muse Wonder matches on price and trails on several of Meta's own rows.
- [Open-weight models, September 2026](/news/open-weight-models-september-2026/): the field Muse Spark Open joins.
- [Open-weight models, October 2026](/news/open-weight-models-october-2026/): Beam's release and the other bespoke licences with a US$20 million trigger.
- [Kimi K3](/news/kimi-k3/): the open-weight model that leads several rows in Meta's comparison.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): every major model family side by side.
- [Self-hosting LLMs: hardware and economics](/guides/self-hosting-llms-hardware-and-economics/): how to size hardware for a model this large.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): how to read bespoke model licences.
- [Mixture of experts](/glossary/mixture-of-experts/): why 816B total parameters means 42B per token.
