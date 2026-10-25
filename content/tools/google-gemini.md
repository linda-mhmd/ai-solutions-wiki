---
title: "Google Gemini"
description: "Google's family of frontier multimodal models: the current lineup as of October 2026 (4 Argon, 3.8 Flash, 3.1 Pro, Flash-Lite, Omni, Deep Think, 3.8 Live and TTS), what each tier costs, and how Gemma 4 fits alongside it."
date: 2026-09-03
tags: ["gemini", "google", "multimodal", "foundation-models", "llm", "gemma"]
tool_category: "AI"
related:
  - glossary/foundation-models
  - glossary/llm
  - tools/claude-anthropic
  - tools/azure-openai
  - tools/google-vertex-ai
  - comparisons/llm-landscape-2026
  - news/gemini-3-8-flash-cyber
  - news/gemini-4-argon
last_updated: 2026-10-25
lastmod: 2026-10-25
last_verified: 2026-10-25
---

<figure class="bz-figure">
  <img src="/img/juggling/neural-network-nodes-notext.png" alt="Interconnected glowing nodes forming a network, representing a frontier multimodal model family." loading="lazy">
  <figcaption>Gemini is a family of models, not one model. Each tier trades cost against capability while sharing the same multimodal core.</figcaption>
</figure>

Google Gemini is Google DeepMind's family of frontier multimodal models. The models process text, images, audio, video, PDFs, and code in a single request, and the current generation accepts roughly a million tokens of input. Gemini solves a common problem for builders: instead of stitching together separate models for vision, speech, and text, you send mixed inputs to one model and get one reasoned answer back.

Gemini is one of the three widely used frontier model families alongside OpenAI's GPT and Anthropic's [Claude](/tools/claude-anthropic/). For background on what a [foundation model](/glossary/foundation-models/) is and what a [large language model](/glossary/llm/) does, follow those links first.

## The family

Google ships Gemini as tiers, not a single model. The naming follows a generation number plus a tier label - but the generation numbers no longer line up across tiers, and that was the most important thing to understand about the lineup on 25 September 2026. Since 13 October 2026 the top of the family is Gemini 4 Argon, which is generally available on paid tiers.

**The Flash line has run ahead of the Pro line.** Google shipped three Flash releases in six weeks - Gemini 3.6 Flash on 21 July 2026, Gemini 3.7 Flash on 13 August, and Gemini 3.8 Flash on 2 September - while the Pro tier is still on Gemini 3.1 Pro from 19 February 2026. Gemini 3.5 Pro was trailed at Google I/O on 19 May 2026 for a June launch and has not shipped; DeepMind's Pro page carries only a "3.5 Pro coming soon" note, and press reporting (Bloomberg, Axios, Forbes, 9to5Google) attributes the repeated slips to coding-benchmark shortfalls. Until Argon reached general availability on 13 October 2026, **Gemini 3.8 Flash was Google's flagship shipping model**, and any guidance written since mid-2026 that assumes a 3.5 Pro exists is wrong. 3.8 Flash is still the cheaper production default and the newest Flash model.

**Gemini 4 Argon is generally available since 13 October 2026, on paid tiers only.** Google announced it on 30 September and released it first to vetted cyber defenders through the Fairwind Program, for whom it runs **without cyber guardrails**. On 13 October the Gemini API release notes listed `gemini-4-argon` as "generally available (GA)", and Google's launch post says it is available "via the API in AI Studio and Gemini platform, for Google AI Ultra subscribers in Google Antigravity, and Google AI Ultra and Pro subscribers in the Gemini app and AI Mode in Search." It is not on the Free tier. Its context is a single 1,048,576-token window shared by input, thinking and output; a synchronous call returns at most 65,536 output tokens by default, and "long decode" in background execution continues in hops of up to 64K tokens to as much as 1,048,576 minus the input. Explicit context caching (`cachedContents`) is not supported, only implicit caching for prompts of at least 4,096 tokens; `temperature`, `top_p` and `top_k` are ignored. The $2 / $10 per MTok price is introductory and ends on 30 November 2026; from 1 December it is $4 / $20. Google's migration guide asks for `max_output_tokens` of "at least 32,768" and client timeouts of "at least 15 minutes". See [Gemini 4 Argon](/news/gemini-4-argon/) for the full limits, tier prices and the vendor claims.

**The Gemini agent, announced 8 October 2026, is a product rather than a model.** At Gemini at Work 2026 Google Cloud introduced a single agent for chat, tasks and code that spawns sub-agents, gives persistent "coworker" agents their own identity and `@agents.company.com` email address, and routes each job to a Gemini model or, notably, to Anthropic's Claude models. Google published no price, no general-availability date and no regions; launch coverage describes an enterprise private preview. See [Google's Gemini agent](/news/google-gemini-agent-gemini-at-work/).

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access surface</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Gemini app</span>
      <span class="bz-arch-chip">Google AI Studio</span>
      <span class="bz-arch-chip">Gemini API</span>
      <span class="bz-arch-chip">Gemini Enterprise Agent Platform</span>
      <span class="bz-arch-chip-note">consumer chat through to enterprise deployment</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Self-serve model tiers</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">4 Argon (paid tiers)</span>
      <span class="bz-arch-chip">3.8 Flash</span>
      <span class="bz-arch-chip">3.1 Pro (preview)</span>
      <span class="bz-arch-chip">3.5 Flash-Lite</span>
      <span class="bz-arch-chip">Omni 1.1 Flash</span>
      <span class="bz-arch-chip-note">pick a tier by cost against capability</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Gated and open</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Deep Think (AI Ultra)</span>
      <span class="bz-arch-chip">3.8 Flash Cyber (Fairwind)</span>
      <span class="bz-arch-chip">Gemma 4 (Apache 2.0)</span>
      <span class="bz-arch-chip-note">not ordinary API tiers - you apply, subscribe, or self-host</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Multimodal core</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Text</span>
      <span class="bz-arch-chip">Images</span>
      <span class="bz-arch-chip">Audio</span>
      <span class="bz-arch-chip">Video</span>
      <span class="bz-arch-chip">PDFs and code</span>
      <span class="bz-arch-chip-note">mixed inputs in one request; Omni also outputs video</span>
    </div>
  </div>
</div>

### Flash - the working default

**Gemini 3.8 Flash** (`gemini-3.8-flash`) reached general availability on 2 September 2026 with a 1,048,576-token input window and 65,536-token output limit. Google positions it for long-horizon software engineering, autonomous agents, and complex enterprise workflows, and ships it across the Gemini API, AI Studio, Android Studio, Gemini Enterprise, Google Antigravity, Search AI Mode, Google Sheets, and the Gemini app for AI Pro and AI Ultra subscribers. **Gemini 3.6 Flash** (21 July 2026) remains listed as stable and priced. **Gemini 3.7 Flash** (13 August 2026) and **Gemini 3.5 Flash** (19 May 2026) were deprecated on 8 October 2026. The release notes say `gemini-3.7-flash` "is no longer available to select in Google AI Studio, and API requests to `gemini-3.7-flash` are automatically routed to `gemini-3.8-flash`", and the same for `gemini-3.5-flash`, routed to `gemini-3.6-flash`. The deprecations page adds that "the endpoint is not shutting down", so there is no shutdown date; the old ID keeps answering, from a different model. Neither model is on the pricing page any more.

### Pro - capable, and still in preview

**Gemini 3.1 Pro** (`gemini-3.1-pro-preview`) launched on 19 February 2026 with a 1,048,576-token input window and 65,536-token output limit, and claimed 77.1% on ARC-AGI-2 at launch. More than seven months on - and still as of 25 September 2026 - it is **still a preview model**, and the deprecations page lists no shutdown date for it. Google said at launch that general availability would follow; no GA has been announced. There is therefore no GA Pro-tier Gemini 3.x model today, which matters if your change-management process forbids shipping on preview endpoints.

### Flash-Lite - the cost floor

**Gemini 3.5 Flash-Lite** (`gemini-3.5-flash-lite`), GA on 21 July 2026, is the current cost-efficient tier for high-throughput execution. **Gemini 3.1 Flash-Lite** (preview 3 March 2026, GA 7 May 2026) is still listed and, counter-intuitively, is still the cheapest Gemini text model on the price sheet - $0.25 input against the newer tier's $0.30. It has a published shutdown date, though: **7 May 2027**, with `gemini-3.5-flash-lite` as the named replacement, so the saving has a fixed end.

### Gemini 2.5 - restricted to existing users

On **18 September 2026** Google limited access to the Gemini 2.5 models to users "who have actively used them in the past". The models are explicitly *not* deprecated and keep being served "until further notice", but a new project can no longer start on them; Google directs new work to 3.5 Flash-Lite or 3.8 Flash. If a deployment pipeline creates fresh Google Cloud projects or API keys and pins a 2.5 model ID, test it now. Separately, `gemini-2.5-flash-image` has a fixed shutdown of 2 October 2026 on the Gemini API - but on the Gemini Enterprise Agent Platform Google extended its retirement to 15 March 2027 (release note of 14 September 2026), so the deadline depends on which surface you call.

### Deep Think - a gated mode, not a tier you can call

Deep Think is easy to mistake for a fourth tier alongside Flash and Pro. It is not. **Gemini 3 Deep Think** is a parallel-reasoning mode - the model explores multiple hypotheses simultaneously - that is generally available *in the Gemini app to Google AI Ultra subscribers only*. Gemini API access exists solely through an early-access programme that researchers, engineers, and enterprises must apply to. You cannot pick it from the model list and start billing against it.

Its current published figures come from Google's 12 February 2026 upgrade post: 48.4% on Humanity's Last Exam without tools, 84.6% on ARC-AGI-2, a Codeforces Elo of 3455, and IMO 2025 gold-medal-level performance. Several secondary write-ups still quote 41.0% and 45.1% - those are the December 2025 launch numbers, not the current ones. No Deep Think refresh has shipped since February 2026.

### Omni - the family generates video, it does not just watch it

**Gemini Omni** was announced at I/O on 19 May 2026 and is a distinct tier, not a Flash variant: text, image, audio, or video in, and **video with native audio out**, with conversational multi-turn editing. **Gemini Omni 1.1 Flash** (`gemini-omni-1.1-flash`) shipped on 27 August 2026, adding first/last-frame interpolation, scene extension in 10-second increments to 40 seconds total, resolution control up to 4K, and a 360p draft mode roughly 60% faster at about a third of the cost - cheap iteration before an upscale. Google's 27 August release note calls it "the GA version", and as of 25 October 2026 the model list on ai.google.dev files it under Stable (on 25 September it was still filed under Preview). The older `gemini-omni-flash-preview` endpoint is marked shut down on the deprecations page with a date of 22 October 2026, not the 30 September this page gave earlier. Consumer access runs through Google Flow for AI Plus, Pro, and Ultra, scene extension in the Gemini app, and free Remix in YouTube Shorts.

### Flash Cyber - a frontier variant you cannot simply buy

Alongside 3.8 Flash on 2 September 2026, Google announced **Gemini 3.8 Flash Cyber**, a cybersecurity-specialised variant for autonomous vulnerability discovery, security research, and automated patching, paired with Google's CodeMender remediation agent. It is not publicly available. Access runs through the new **Fairwind Program**, which gives prioritised access to vetted government authorities, critical infrastructure operators, and maintainers of widely used software. Google DeepMind's programme page sets the terms: applicants must show "a proven track record of ethical operations and research"; participants may grant access only to internal cybersecurity, incident-response, or penetration-testing teams and must enforce phishing-resistant MFA; and partners "may not share, redistribute, or sell access" to the model. Google does not say whether Fairwind participants call it through the ordinary Gemini API, but it does state that zero data retention is available when the model is accessed through the Gemini Enterprise Agent Platform. See [Google ships Gemini 3.8 Flash and a gated cybersecurity variant](/news/gemini-3-8-flash-cyber/).

### Live and speech - the September 2026 voice stack

Google rebuilt its real-time voice line in September 2026, and every piece replaces a preview model that many voice agents still call.

- **Gemini 3.8 Live** (`gemini-3.8-live`) and **Gemini 3.8 Live Extended Thinking** (`gemini-3.8-live-extended-thinking`) reached **general availability on 15 September 2026**. Both are audio-to-audio models on the Live API: 3.8 Live is Google's default for low-latency voice agents, with interleaved reasoning and asynchronous function calling on by default; the Extended Thinking variant adds background reasoning during the conversation. Paid-tier pricing is **$0.75 per MTok text / $3.00 audio input and $4.50 text / $12.00 audio output**. Google names `gemini-3.8-live` as the replacement for `gemini-3.1-flash-live-preview` and the older 2.5 native-audio previews; no shutdown date has been set for those yet. On 24 September Google added **Live Avatar** - lip-synced, near-real-time video of a visual persona paired with 3.8 Live - available in Gemini Enterprise.
- **Gemini 3.8 Flash TTS** (`gemini-3.8-flash-tts`) and **Gemini 3.8 Flash-Lite TTS** (`gemini-3.8-flash-lite-tts`) reached **GA on 22 September 2026**, together with a new Voices endpoint (`/v1beta/voices`), voice design from text prompts, voice replication **with consent verification**, and a library of 150+ prebuilt and custom voices. They replace `gemini-3.1-flash-tts-preview` and the 2.5 TTS previews (no shutdown dates announced).
- **Gemini 3.5 Transcribe** (`gemini-3.5-transcribe`) and **Gemini 3.5 Transcribe Live** (`gemini-3.5-transcribe-live`) reached GA on 26 August 2026 as dedicated speech-to-text models: 85+ languages, speaker diarization, word-level timestamps, and custom vocabulary biasing up to 1,000 terms; the Live variant streams over WebSockets.

### Antigravity Agent - a managed agent with a breaking tool change

The Gemini API's managed coding agent moved to **`antigravity-preview-09-2026`** on 17 September 2026. The previous `antigravity-preview-05-2026` was shut down on 5 October 2026. Integrations that only read final output on a remote sandbox just change the agent string; anything that runs tools locally or parses `function_call` steps must be rewritten, because the built-in tools were renamed (`write_file` became `write_to_file` and `replace_file_content`, `read_file` became `view_file`), parameters switched to PascalCase, file edits now use line-range replacement, and dedicated `find_by_name` and `grep_search` tools were added.

### Deep Research agent - one version retired

The Deep Research agent `deep-research-pro-preview-12-2025` was deprecated on 8 October 2026 with a shutdown date of 23 October 2026. The replacements are `deep-research-preview-04-2026`, which Google describes as "designed for speed and efficiency", and `deep-research-max-preview-04-2026`, for "maximum comprehensiveness". On 25 October the deprecations page still listed the old agent without the grey shading it uses for models already shut down, so whether the endpoint has stopped answering was not confirmed; plan as if it has.

### Task-specific models on the same API

The tiers above are the general-purpose models, but the Gemini API catalogue is wider. Image generation runs on **Nano Banana Pro** (`gemini-3-pro-image`) and, since 6 October 2026, **Nano Banana 2.1** (`gemini-nano-banana-2.1`, GA), an update to Nano Banana 2 that adds wide and panoramic aspect ratios (1:4, 4:1, 1:8, 8:1) at 1K, 2K and 4K. Its paid-tier price is $1.50 per MTok input, $7.50 text output and $30.00 image output, which the pricing page converts to $0.0336 per 1K image, $0.0504 per 2K and $0.113 per 4K. **Nano Banana 2** (`gemini-3.1-flash-image`) was deprecated the same day with no shutdown date announced, and the deprecations page now names `gemini-nano-banana-2.1` as the replacement for it and for **Imagen 4**, which was shut down on 17 August 2026. The **Veo 3.1** preview IDs (`veo-3.1-generate-preview`, `veo-3.1-fast-generate-preview`, `veo-3.1-lite-generate-preview`) are marked shut down as of 22 October 2026, with `gemini-omni-1.1-flash` as the replacement, so Omni is now the Gemini API's video model. Alongside it sit **Lyria 3.5** (`lyria-3.5`, GA 3 September 2026, full-length songs as 44.1 kHz stereo from text and image input, with Lyria 3 Pro now labelled previous generation) and **Lyria RealTime** for music, **Gemini Embedding 2** for retrieval, and **Gemini Robotics ER 2** for embodied reasoning. Several of these carry preview labels; check the models page for the current status of any you intend to ship on.

### Gemma - Google's open-weight family

Gemma is a separate, smaller open-weight family, not a self-hostable Gemini, but it is the answer when Gemini's hosted-only model is the obstacle. **Gemma 4** arrived on 2 April 2026 in E2B, E4B, 26B A4B (mixture-of-experts), and 31B dense sizes, with a unified **Gemma 4 12B** added on 3 June 2026. Context runs to 128K on E2B and E4B and 256K on the 12B, 26B, and 31B. All sizes handle text and image; E2B, E4B, and 12B also handle audio. The 12B uses a unified, encoder-free architecture and runs locally on a laptop with 16GB of VRAM or unified memory.

The headline is the licence. **Gemma 4 is Apache 2.0**, replacing the bespoke Gemma Terms of Use that governed Gemma 3 - a real liberalisation, and the thing to check if you evaluated Gemma before April 2026 and ruled it out on licensing. Google also ships specialised variants including EmbeddingGemma, ShieldGemma 2, DiffusionGemma, FunctionGemma, PaliGemma, and RecurrentGemma.

## What it costs

Gemini API rates, per million tokens, paid tier, as published on the pricing page on 25 October 2026:

| Model | Model ID | Status | Input / output per MTok |
|---|---|---|---|
| Gemini 4 Argon | `gemini-4-argon` | GA, 13 Oct 2026 (paid tiers only) | $2.00 / $10.00 to 30 Nov 2026; $4.00 / $20.00 from 1 Dec 2026 |
| Gemini 3.8 Flash | `gemini-3.8-flash` | GA, 2 Sep 2026 | $0.75 / $3.75 introductory |
| Gemini 3.7 Flash | `gemini-3.7-flash` | Deprecated 8 Oct 2026; requests routed to `gemini-3.8-flash` | no longer listed |
| Gemini 3.6 Flash | `gemini-3.6-flash` | GA, 21 Jul 2026 | $0.75 / $3.75 introductory |
| Gemini 3.5 Flash | `gemini-3.5-flash` | Deprecated 8 Oct 2026; requests routed to `gemini-3.6-flash` | no longer listed (was $1.50 / $9.00) |
| Gemini 3.1 Pro | `gemini-3.1-pro-preview` | Preview, 19 Feb 2026 | $2.00 / $12.00 up to 200K tokens; $4.00 / $18.00 above |
| Gemini 3.5 Flash-Lite | `gemini-3.5-flash-lite` | GA, 21 Jul 2026 | $0.30 / $2.50 |
| Gemini 3.1 Flash-Lite | `gemini-3.1-flash-lite` | GA, 7 May 2026 | $0.25 text/image/video, $0.50 audio / $1.50 |
| Gemini Omni 1.1 Flash | `gemini-omni-1.1-flash` | GA, 27 Aug 2026 (listed as Stable since) | $1.50 / $9.00 text out, $17.50 video out |
| Gemini 3.8 Live | `gemini-3.8-live` | GA, 15 Sep 2026 | $0.75 text, $3.00 audio / $4.50 text, $12.00 audio |
| Gemma 4 | open weights | GA, Apache 2.0 | Free, including on the Gemini API |

Notes on the Argon row: cached input is $0.10 per MTok to 30 November and $0.20 from 1 December, through implicit caching only, because explicit caching is not supported. It is not offered on the Free tier. The context is 1,048,576 tokens shared by input and output. Batch and Flex are half the Standard rate; Priority is $3.60 / $18.00 introductory and $7.20 / $36.00 from 1 December.

**Routed is not the same as unchanged.** Arithmetic from this table: a caller still sending `gemini-3.5-flash` now lands on a model the table lists at $0.75 / $3.75 instead of the $1.50 / $9.00 it listed for 3.5 Flash, and on a model with different behaviour. Google's notes do not say which rate a routed request is billed at, so check the invoice rather than assume; and re-run your evaluations, because the model behind the ID has changed.

**Watch the Flash price cliff.** The $0.75 / $3.75 rate on 3.6 and 3.8 Flash is introductory and expires on 31 December 2026. From 1 January 2027 it doubles to $1.50 / $7.50. Any cost model built on today's Flash price has a step change in it just under four months out. Gemini 3.5 Flash, which was *more* expensive than the newer Flash models, is now deprecated and routed to 3.6 Flash.

On the consumer side, Google restructured its subscriptions at I/O on 19 May 2026: it added a second AI Ultra level with 5x AI Pro's usage limits and 20 TB of storage, and cut the top AI Ultra plan's price. Google's I/O post gives those as round numbers - a new "$100" tier and the top plan "from $250 to $200" - while the list prices on Google's own subscriptions page are $99.99 and $199.99/month. Below those sit a free tier, Google AI Plus, and Google AI Pro; independent outlets report Plus at $4.99/month with 400 GB (cut from $7.99 and 200 GB on 8 June 2026) and Pro at $19.99/month with 5 TB, so treat those two numbers as secondary-verified.

What matters architecturally is the gating, and Google's subscriptions page states it directly: the free tier gets Gemini 3.6 Flash plus limited 3.1 Pro access, Plus is the same with roughly double the limits, Deep Think is Ultra-only, Gemini 3.8 Flash in the app is Pro and Ultra, and Omni video generation reaches down to Plus through Flow credits (200 on Plus, 1,000 on Pro, 10,000-25,000 on Ultra).

## How to access it and how it fits

You reach the same underlying models through several surfaces, chosen by who you are and what you are building.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Try</span>
    <span class="bz-flow-step-name">Gemini app</span>
    <span class="bz-flow-step-desc">Consumer chat interface. No code. Good for testing prompts and multimodal input by hand.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Prototype</span>
    <span class="bz-flow-step-name">Google AI Studio</span>
    <span class="bz-flow-step-desc">Browser development environment. Tune prompts, generate an API key, export starter code.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Build</span>
    <span class="bz-flow-step-name">Gemini API</span>
    <span class="bz-flow-step-desc">Direct HTTP and SDK access for developers. Fastest path from a key to a working call.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Deploy</span>
    <span class="bz-flow-step-name">Gemini Enterprise Agent Platform</span>
    <span class="bz-flow-step-desc">Google Cloud's production platform, renamed from Vertex AI in April 2026. Regional infrastructure, governance, and enterprise controls.</span>
  </div>
</div>

The Gemini API through Google AI Studio suits a solo developer who wants a key and a quick integration. The Gemini Enterprise Agent Platform - the April 2026 rename of Vertex AI, covered in full at [Google Vertex AI](/tools/google-vertex-ai/) - suits teams that need regional data controls, identity and access management, and production reliability. Google Cloud now serves its Gemini model documentation under `docs.cloud.google.com/gemini-enterprise-agent-platform/`, while the consumer app and the developer API keep the Gemini name. Both surfaces call the same model tiers. You choose the surface, not a different model.

Where it sits in a stack: Gemini is the reasoning and generation layer. Your application sends structured or mixed-media input, the model returns text, structured output, or video, and your code handles storage, retrieval, and orchestration around it. It plays the same architectural role that GPT or Claude does in a typical build. See the wider picture in the [LLM landscape for 2026](/comparisons/llm-landscape-2026/).

## Compared to the alternatives

All three families are frontier multimodal models with large context windows. The differences that matter in practice are the access surfaces, the cloud you are already on, and the tooling around each.

| | Google Gemini | Anthropic Claude | OpenAI GPT | Amazon Nova |
|---|---|---|---|---|
| **Vendor** | Google DeepMind | Anthropic | OpenAI | Amazon |
| **Native cloud** | Gemini Enterprise Agent Platform (ex-Vertex AI) | Amazon Bedrock, others | Azure, OpenAI API | AWS Bedrock |
| **Multimodal** | Text, image, audio, video in; video with audio out via Omni | Text, image | Text, image, audio | Text, image, video |
| **Open-weight sibling** | Gemma 4, Apache 2.0 | none | none | none |
| **Consumer app** | Gemini app | Claude app | ChatGPT | none direct |
| **Best fit** | Google Cloud teams, video and audio work, cheap high-volume Flash | Long-form reasoning, coding | Broad ecosystem, tooling | AWS-native builds |

Treat this table as a starting point for a shortlist, not a verdict. Model rankings shift with each release - Google alone shipped three Flash models between July and September 2026 - so benchmark the current tiers on your own workload before committing. Compare [Claude](/tools/claude-anthropic/) and the Azure-hosted GPT option in [Azure OpenAI](/tools/azure-openai/) alongside Gemini.

## When not to use it

Gemini is not always the right call.

- **You are standardised on AWS with no Google Cloud footprint.** If your data, identity, and networking all live in AWS, a model served through [Amazon Bedrock](/tools/amazon-bedrock/) or [Amazon Nova](/tools/amazon-nova/) keeps traffic and governance in one place.
- **You need a fully self-hosted or open-weights model.** The hosted Gemini models are proprietary. Google's own answer is Gemma 4 - Apache 2.0 since 2 April 2026, five sizes from E2B to a 31B dense model, free to download and run - but it is a smaller, separate family, not a self-hosted Gemini. If you need frontier-tier capability on your own hardware, Gemini is not the family.
- **You are starting a new project on Gemini 2.5.** Since 18 September 2026 the 2.5 models are available only to prior users; start on 3.8 Flash or 3.5 Flash-Lite instead.
- **Your compliance process bars preview endpoints.** The Pro tier is only available as `gemini-3.1-pro-preview`. If preview status is a blocker, your Google options are the GA Flash line or nothing at that capability level.
- **You need Deep Think or Flash Cyber on ordinary commercial terms.** Deep Think is an AI Ultra subscription feature with API access by application only; Flash Cyber is restricted to Fairwind Program participants. Neither is something you can procure by adding a credit card.
- **Your task is narrow and small.** A frontier multimodal model is overkill for simple classification or extraction that a small specialised model - or a Gemma 4 E2B running locally - handles at a fraction of the cost.
- **You cannot send data to a third-party API.** If regulation forbids sending inputs off-premises, a hosted API of any vendor is a poor fit.

Match the tier to the task even when Gemini is the right family. Flash-Lite for high volume, Flash for most agentic and coding work, Pro for the hardest reasoning you can actually reach through the API. Paying Pro rates for a Flash-Lite job wastes money - and the Flash line is now capable enough that the case for reaching past it is narrower than it was six months ago.

## Further reading

- [Foundation models](/glossary/foundation-models/): what a general-purpose pretrained model is and why tiers exist.
- [What is an LLM](/glossary/llm/): the language model concepts behind every tier of Gemini.
- [Google Vertex AI](/tools/google-vertex-ai/): the enterprise surface and what the April 2026 rename to Gemini Enterprise Agent Platform changed.
- [Google ships Gemini 3.8 Flash and a gated cybersecurity variant](/news/gemini-3-8-flash-cyber/): the 2 September 2026 release and the Fairwind Program.
- [Google I/O 2026](/news/google-io-2026/): where Gemini Omni, agentic Search, and the subscription restructure were announced.
- [Claude by Anthropic](/tools/claude-anthropic/): the closest comparable frontier family, useful for a side-by-side trial.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): how Gemini, GPT, and Claude compare across the market.
- [Gemini API models](https://ai.google.dev/gemini-api/docs/models): the current, authoritative list of model versions and identifiers.

## Sources

- Gemini API models (fetched 25 October 2026): https://ai.google.dev/gemini-api/docs/models - current model list, model IDs, and stable versus preview status.
- Gemini API pricing (fetched 25 October 2026): https://ai.google.dev/gemini-api/docs/pricing - per-MTok rates, the Gemini 4 Argon introductory and 1 December 2026 rates by tier, Nano Banana 2.1 image pricing, 3.8 Live audio and text rates, and the introductory Flash window expiring 31 December 2026.
- Gemini API deprecations (fetched 25 October 2026): https://ai.google.dev/gemini-api/docs/deprecations - the 3.7 Flash and 3.5 Flash routing with no shutdown, `gemini-3.1-flash-image` deprecated with no shutdown date, `deep-research-pro-preview-12-2025` on 23 October 2026, the `gemini-omni-flash-preview` and Veo 3.1 preview shutdowns on 22 October 2026, `antigravity-preview-05-2026` on 5 October 2026, `gemini-2.5-flash-image` on 2 October 2026 and `gemini-3.1-flash-lite` on 7 May 2027, the Gemini 2.5 access note, and the Live and TTS replacement mappings.
- Gemini API release notes (fetched 25 October 2026): https://ai.google.dev/gemini-api/docs/changelog - dated entries for Gemini 4 Argon GA (13 October), the 3.7 Flash, 3.5 Flash and Deep Research deprecations (8 October), Nano Banana 2.1 (6 October), 3.8/3.7/3.6 Flash, 3.5 and 3.1 Flash-Lite, Omni 1.1 Flash, 3.5 Transcribe (26 August), Lyria 3.5 (3 September), 3.8 Live (15 September), Antigravity 09-2026 (17 September), the Gemini 2.5 access restriction (18 September), and 3.8 Flash TTS / Flash-Lite TTS (22 September).
- Google, "Introducing Gemini 3.8 Live with Live Avatar", 24 September 2026: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/
- Gemini 3.8 Flash and 3.8 Flash Cyber announcement, 2 September 2026: https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/
- The Fairwind Program: https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/ - the announcement and CodeMender pairing.
- Google DeepMind, Fairwind Program page: https://deepmind.google/fairwind-program/ - the eligibility groups, the "proven track record of ethical operations and research" vetting standard, and participant obligations.
- Gemini 3.1 Pro announcement, 19 February 2026: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/
- Gemini 3 Deep Think upgrade, 12 February 2026: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-deep-think/
- Google DeepMind, Gemini Flash: https://deepmind.google/models/gemini/flash/ - general availability and the 1M/64K context figures.
- Google DeepMind, Gemini Pro: https://deepmind.google/models/gemini/pro/ - 3.1 Pro as the current Pro tier and the "3.5 Pro coming soon" note.
- Google AI subscriptions at I/O 2026: https://blog.google/products-and-platforms/products/google-one/google-ai-subscriptions/ - the restructure and the rounded Ultra price points.
- Google AI plans and pricing: https://gemini.google/subscriptions/ - list prices, per-tier model access, and Flow credit allowances.
- Gemma 4 model card: https://ai.google.dev/gemma/docs/core/model_card_4 - sizes, parameter counts, context windows, modalities, and the Apache 2.0 licence.
- Gemma 4 12B developer guide, 3 June 2026: https://developers.googleblog.com/gemma-4-12b-the-developer-guide/
- Google Cloud model docs under the renamed platform: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro
- Google, "Gemini 4 Argon: our next era of frontier intelligence", 30 September 2026, fetched 3 October 2026: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/ - the one million token output limit, the $2/$10 introductory pricing, the 95% cached-input discount, the Fairwind-first rollout, the guardrail-free defender build, and the US government voluntary pre-release access process.
- Google Cloud, "Welcome to Gemini at Work 2026: Introducing the Gemini agent", Thomas Kurian, 8 October 2026, fetched 8 October 2026: https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026 - the Gemini agent, sub-agents, coworker agents, Claude routing and governance features.
- Google, "Gemini 4 Argon: Built to solve your hardest problems", Koray Kavukcuoglu, 13 October 2026: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/ - general availability, surfaces, and the introductory price footnote.
- Google AI for Developers, "What's new in Gemini 4 Argon" (last updated 16 October 2026, fetched 25 October 2026): https://ai.google.dev/gemini-api/docs/latest-model - long decode, thinking levels, caching and the migration checklist.
- Google, "The latest AI news we announced in September 2026", 2 October 2026: https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-september-2026/ - the Gemini 3.8 series line-up alongside Argon.
