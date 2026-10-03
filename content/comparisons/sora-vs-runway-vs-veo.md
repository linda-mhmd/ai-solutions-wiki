---
title: "Sora vs Runway vs Veo"
description: "OpenAI shut down the Sora app in April 2026 and the Sora API on 24 September 2026, so Sora is no longer available anywhere. Here's what Runway and Google Veo actually cost, what each is genuinely best at, and which one to pick."
date: 2026-09-04
categories: [Comparisons]
tags: ["ai-video", "sora", "runway", "veo", "video-generation", "generative-ai", "comparison", "text-to-video", "google-deepmind", "openai"]
tools: []
related:
  - tools/higgsfield
  - comparisons/ai-subscription-pricing-2026
  - tools/google-gemini
  - glossary/programmatic-video
  - basics/what-is-generative-ai
last_verified: 2026-09-25
last_updated: 2026-09-25
lastmod: 2026-09-25
---

<figure class="bz-figure">
  <img src="/img/juggling/three-balls-rgb-convergence-notext.png" alt="Three glowing spheres, red, blue, and green, converging in light on a black background, representing three competing AI video products." loading="lazy">
  <figcaption>Three names people search together. Since 24 September 2026, only two of them still exist as products.</figcaption>
</figure>

If you searched "Sora vs Runway vs Veo," you're probably picking a tool to turn text or an image into a short AI video. Before any feature comparison matters, there's a fact that changes the answer: **OpenAI has shut Sora down completely.** The consumer app closed in April 2026, and the developer API - the last way to reach Sora 2 - **stopped on 24 September 2026, with no replacement model** [22]. That's not a knock on Sora's output quality; it simply means Sora is no longer something you can choose. This page covers what happened to Sora, then does the real comparison people searching this phrase actually need: Runway against Veo, on cost, limits, and what each is genuinely good at.

## Sora has been discontinued, app and API

OpenAI announced on 24 March 2026 that it was discontinuing Sora, posting "We're saying goodbye to the Sora app. To everyone who created with Sora, shared it, and built community around it: thank you" from the official Sora account [1]. The shutdown ran in two stages: the consumer app and web experience closed on **26 April 2026**, and the developer API was shut down on **24 September 2026** [2][3]. OpenAI's deprecations page lists the Videos API itself, `sora-2`, `sora-2-pro`, and all their dated snapshots as removed on that date, with no recommended replacement - OpenAI no longer offers a video generation model through its API at all [22]. ChatGPT's own pricing page no longer lists Sora as a Plus or Pro benefit either [4]. OpenAI's stated reasoning was a redirection of compute and research focus toward world-simulation research for robotics and toward its coding and enterprise products, not a quality problem with the model itself [3]; reporting also ties the decision to weak engagement (downloads fell from a peak near 3.3 million to about 1.1 million by February 2026) and a $1 billion Disney content partnership that was dropped alongside it [2][5].

**If you had code calling Sora**, it now fails: requests to `v1/videos` with `sora-2` or `sora-2-pro` no longer work, and because OpenAI names no successor, migrating means moving to another vendor's video API rather than swapping a model ID [22]. For reference, those models generated 16-20 second clips extendable to 120 seconds, at $0.10/second (Sora 2, 720p) and $0.30-$0.70/second (Sora 2 Pro, depending on resolution up to 1080p), half that on the batch API, up to their shutdown [6]. That per-second range is the useful benchmark when comparing the replacements below. The app's signature feature, **cameos** - a one-time identity and voice verification that let you (or, with consent, someone else) appear in generated clips, with the option to revoke access or delete any video featuring your likeness at any time - was a genuinely distinctive piece of product design [7], and it is gone along with everything else. Wrapper platforms like [Higgsfield](/tools/higgsfield/), which route prompts to Veo and other backend models behind one interface, have lost the Sora option too. Sora is history, not a choice; the rest of this page is Runway vs. Veo.

## What Runway and Veo actually are right now

**Runway's** current flagship is **Gen-4.5**, announced 1 December 2025 and generally available via the API from 10 February 2026, which topped the Artificial Analysis text-to-video leaderboard at launch [8][9]. Runway isn't only a model, though - the same subscription also gives you access to Veo 3.1, Seedance 2.5, Wan, and several other third-party video and image models inside one workspace, which makes it as much a multi-model creative suite as a single product [10]. Gen-3 Alpha Turbo and the original Gen-4 Aleph were sunset on 30 July 2026, with Runway pointing existing users toward Gen-4.5 or Gen-4 Turbo (still active) and toward Aleph 2.0, respectively [11] - so if you see pricing for "Gen-3 Alpha Turbo" anywhere, it's stale, not "Gen-4 Turbo."

**Google's** current flagship is **Veo 3.1**, released 13 January 2026 and described on DeepMind's own model page as "our leading video generation model," with a cheaper **Veo 3.1 Lite** variant added for developers in April 2026 [12][13]. Google also unveiled **Gemini Omni** at I/O 2026 in May, an "any input, any output" model that generates video among other media and that this wiki's own coverage described as becoming Google's headline video-generation effort going forward [14] - worth flagging because Google now has two video-capable model lines under one roof. For developers, Gemini Omni is no longer just a direction: **Gemini Omni Flash reached general availability in the Gemini API on 27 August 2026** as `gemini-omni-1.1-flash`, a conversational video generation and editing model (extension, first/last-frame interpolation, 720p default with upscaled 1080p and 4K) billed at an effective ~$0.10 per second of 720p video; the `gemini-omni-flash-preview` endpoint is deprecated on 30 September 2026 [23][24]. Veo 3.1 remains the model DeepMind calls its leading video model and the one inside the Gemini app, Flow and YouTube, so the comparison below uses it; if you are building on the Gemini API, evaluate Omni Flash alongside it.

<div class="bz-table-wrap">

| | Runway (Gen-4.5) | Google Veo (3.1) |
|---|---|---|
| Access | runway.com app, API | Gemini app, Google Flow, Vertex AI, Gemini API |
| Free tier | Yes - 125 one-time credits | Yes - no Veo access |
| Entry paid tier | Standard: $12/mo (annual) - ~52s of Gen-4.5/mo | Google AI Plus: €4.99/mo - 200 Flow credits |
| Mid tier | Pro: $28/mo (annual) - ~187s/mo, custom voices | Google AI Pro: €21.99/mo - 1,000 Flow credits |
| Top tier | Max: $76/mo (annual) - ~791s/mo, ProRes/HDR export | Google AI Ultra: €99.99-€219.99/mo - 10,000-25,000 credits |
| API price | $0.12/sec (12 credits/sec, $0.01/credit) | $0.05-$0.60/sec, by tier and resolution |
| Native audio in the model | Not confirmed - Runway's own changelog shows audio via separate ElevenLabs/Seed Audio add-ons, not built into Gen-4.5 itself | Yes - dialogue, SFX, and ambience generated natively |
| Max resolution | 1080p standard; HDR/4K+ formats cost extra credits | 1080p and 4K |
| Clip length | 2-10 seconds per generation (API) | 8 seconds per generation, extendable in Flow |

</div>

Sources: Runway pricing and API docs [9][15][16]; Google DeepMind and Gemini API pricing [12][13][17]. Google's consumer prices above are from its EU pricing page in euros, which is the currency the official page itself displays [18]; US-dollar figures reported elsewhere put AI Pro near $20/month and AI Ultra between $100 and $250/month depending on tier - check [Google's own subscriptions page](https://gemini.google/subscriptions/) for your region before buying, and see this wiki's [AI subscription pricing 2026](/comparisons/ai-subscription-pricing-2026/) for the fuller multi-vendor picture. All figures were verified against the sources above on 4 September 2026; both companies change pricing without much notice.

## What each is genuinely best at

**Runway is the editing-suite choice.** Its real differentiators aren't the base model, which trades the top benchmark spot with Veo release-over-release, but the tools built around it: **Motion Brush** lets you paint motion vectors onto specific regions of a frame to control exactly what moves and how; **Director Mode** gives parametric camera controls - dolly, orbit, crane, rack focus - without a physical rig; **Act-Two** drives a character's performance from a reference video; and **Aleph 2.0** does in-context video editing on existing footage - swap a product, change the lighting, remove an object - while trying to preserve everything you didn't ask it to touch, on clips up to 30 seconds at $0.28/second via the API [19][20]. This is why Runway shows up in agency and post-production workflows more than the other two: it behaves like a professional tool with a model attached, not a model with a chat box attached.

**Veo is the Google-ecosystem choice**, and that shows up in two concrete places a comparison table won't capture. First, native audio: Veo generates dialogue, sound effects, and ambient noise as part of the same generation, no separate audio pass required, which is a real workflow saving if you want a finished clip rather than a silent one to sound-design yourself [12]. Second, YouTube: Google has folded Veo into **Dream Screen**, the AI-background and AI-clip tool inside YouTube Shorts, so a creator already in Google's ecosystem can generate Veo video without leaving the app they publish to [21]. If your output's destination is YouTube specifically, that's a real, product-level advantage neither Runway nor Sora ever had.

## Real limitations - of both, honestly

**Runway's costs scale in a way that's easy to underestimate.** The credit system looks cheap at the entry tier, but professional formats add up fast: ProRes or PNG-sequence export adds 5 credits/second, 10-bit/HDR adds 20, and anything over roughly 4 megapixels (near-4K) adds 40 credits/second on top of the base rate [15] - a short HDR clip can burn through a Standard plan's entire monthly allowance in seconds. And as the table above notes, Runway's own documentation doesn't show native audio generation inside Gen-4.5 itself; multiple independent write-ups disagree on whether audio has since been folded into the model or still requires a separate ElevenLabs or Seed Audio pass, and this page could not resolve that conflict against Runway's own docs - check the current model card before assuming synced dialogue works out of the box.

**Veo's biggest weakness is one Google states about its own product:** its model page acknowledges that "creating videos with natural and consistent spoken audio, particularly for shorter speech segments, remains an area of active development" [12] - the native-audio advantage above is real but not fully reliable yet, especially for lip-synced dialogue. The 8-second base clip length is also short compared to Runway's up-to-10-second generations and Sora's old 20-second (extendable) clips, and Google's Flow-credit system, like Runway's, meters video generation against a shared pool that also covers images and other AI features, so it's easy to burn through a plan faster than the sticker price suggests.

## Which one to pick

<div class="bz-flow">
<div class="bz-flow-step"><span class="bz-flow-step-tag">Need</span><span class="bz-flow-step-name">Casual social clips, low budget</span><span class="bz-flow-step-desc">A few short videos a month, no editing workflow required.</span></div>
<div class="bz-flow-arrow">&rarr;</div>
<div class="bz-flow-step"><span class="bz-flow-step-tag">Use</span><span class="bz-flow-step-name">Whichever ecosystem you already pay for</span><span class="bz-flow-step-desc">Runway Standard ($12/mo) or Google AI Plus (~$5/mo) - both are cheap enough that fit matters more than price here.</span></div>
</div>
<div class="bz-flow">
<div class="bz-flow-step"><span class="bz-flow-step-tag">Need</span><span class="bz-flow-step-name">YouTube Shorts or a channel already on Google</span><span class="bz-flow-step-desc">You publish to YouTube and want AI backgrounds or clips without leaving the app.</span></div>
<div class="bz-flow-arrow">&rarr;</div>
<div class="bz-flow-step"><span class="bz-flow-step-tag">Use</span><span class="bz-flow-step-name">Veo, via Dream Screen or the Gemini app</span><span class="bz-flow-step-desc">Native audio and a direct YouTube integration neither competitor has.</span></div>
</div>
<div class="bz-flow">
<div class="bz-flow-step"><span class="bz-flow-step-tag">Need</span><span class="bz-flow-step-name">Precise camera control, character consistency, or editing existing footage</span><span class="bz-flow-step-desc">Agency, freelance, or professional post-production work.</span></div>
<div class="bz-flow-arrow">&rarr;</div>
<div class="bz-flow-step"><span class="bz-flow-step-tag">Use</span><span class="bz-flow-step-name">Runway Pro or Max</span><span class="bz-flow-step-desc">Director Mode, Motion Brush, Act-Two, and Aleph 2.0 for in-context edits - nothing here has an equivalent on Veo.</span></div>
</div>
<div class="bz-flow">
<div class="bz-flow-step"><span class="bz-flow-step-tag">Need</span><span class="bz-flow-step-name">One subscription, several models</span><span class="bz-flow-step-desc">You don't want to pick a single video model and live with it.</span></div>
<div class="bz-flow-arrow">&rarr;</div>
<div class="bz-flow-step"><span class="bz-flow-step-tag">Use</span><span class="bz-flow-step-name">Runway</span><span class="bz-flow-step-desc">Its own Gen-4.5 plus Veo 3.1, Seedance, and Wan are all callable from the same workspace.</span></div>
</div>
<div class="bz-flow">
<div class="bz-flow-step"><span class="bz-flow-step-tag">Need</span><span class="bz-flow-step-name">To call a video model from your own code, cheaply</span><span class="bz-flow-step-desc">Building a product feature, not making a video by hand.</span></div>
<div class="bz-flow-arrow">&rarr;</div>
<div class="bz-flow-step"><span class="bz-flow-step-tag">Use</span><span class="bz-flow-step-name">Veo 3.1 Lite ($0.05/sec at 720p)</span><span class="bz-flow-step-desc">The cheapest per-second rate of any current option; Runway's Gen-4.5 API runs $0.12/sec. The Sora API no longer exists - it shut down on 24 September 2026 - so these two are also the migration targets for any former Sora integration.</span></div>
</div>

If you only take one thing from this page: Sora is no longer available in any form, so older articles that still recommend it are out of date, and any product that called the Sora API needs a new backend. Between the two that remain, reach for Veo when audio and a Google/YouTube workflow matter more than editing control, and reach for Runway when the opposite is true. Neither is a wrong answer for a generic "AI video" need - they're built for different jobs, and the job is what should decide it, not which one is more famous.

## What this page can't fully resolve

Google's positioning of Veo against its newer Gemini Omni model is genuinely unsettled as of this writing - DeepMind's own site still calls Veo 3.1 its leading video model, while Gemini Omni Flash went GA in the Gemini API in August 2026 and this wiki's separate coverage of Google's 2026 generative-media releases treats Gemini Omni as the emerging headline product [14][23]. Which name Google leads with a year from now isn't something this page can predict. Whether Runway's Gen-4.5 has gained native audio since its initial release is also unresolved - sources disagree, and Runway's own API changelog does not settle it either way. Both companies also change consumer pricing and credit allotments without much notice, so treat every consumer-plan number above as a snapshot from 4 September 2026 (the API per-second rates for Veo 3.1 and Runway Gen-4.5 were re-checked unchanged on 25 September 2026 [15][17]), not a standing fact - check the linked official pages before you subscribe.

## Further reading

- [AI subscription pricing 2026](/comparisons/ai-subscription-pricing-2026/): the fuller comparison of consumer AI subscriptions across vendors, including Gemini's other tiers.
- [Higgsfield](/tools/higgsfield/): a creator-facing platform that wraps Veo and other frontier video models behind motion presets - relevant if you don't want to pick a model directly.
- [Google Gemini](/tools/google-gemini/): this wiki's tool page for the app Veo ships inside.
- [Programmatic video](/glossary/programmatic-video/): the code-driven alternative to generative video, for when you need exact, repeatable output rather than a generated clip.
- [What is generative AI?](/basics/what-is-generative-ai/): a plain-language primer if text-to-video is your first generative AI tool.
- [Remotion vs FFmpeg](/comparisons/remotion-vs-ffmpeg/): video *processing* approaches, for after you have footage rather than for generating it.

## Sources

1. Sora (official account), announcement of app discontinuation, 24 March 2026: [https://x.com/soraofficialapp/status/2036546752535470382](https://x.com/soraofficialapp/status/2036546752535470382)
2. TechCrunch, "OpenAI's Sora was the creepiest app on your phone - now it's shutting down" (24 March 2026), including download and revenue figures: [https://techcrunch.com/2026/03/24/openais-sora-was-the-creepiest-app-on-your-phone-now-its-shutting-down/](https://techcrunch.com/2026/03/24/openais-sora-was-the-creepiest-app-on-your-phone-now-its-shutting-down/)
3. The Decoder, "OpenAI sets two-stage Sora shutdown with app closing April 2026 and API following in September," on the 26 April 2026 and 24 September 2026 dates and OpenAI's stated compute-reallocation reasoning: [https://the-decoder.com/openai-sets-two-stage-sora-shutdown-with-app-closing-april-2026-and-api-following-in-september/](https://the-decoder.com/openai-sets-two-stage-sora-shutdown-with-app-closing-april-2026-and-api-following-in-september/)
4. OpenAI, ChatGPT pricing page, checked 4 September 2026 for the absence of Sora as a listed Plus/Pro benefit: [https://openai.com/chatgpt/pricing/](https://openai.com/chatgpt/pricing/)
5. Variety, "OpenAI Will Shut Down Sora Video App; Disney Drops Plans for $1 Billion Deal" (25 March 2026): [https://variety.com/2026/digital/news/openai-shutting-down-sora-video-disney-1236698277/](https://variety.com/2026/digital/news/openai-shutting-down-sora-video-disney-1236698277/)
6. OpenAI Developer Platform, video generation guide and pricing (sora-2, sora-2-pro: duration, resolution, and per-second rates), fetched 4 September 2026: [https://developers.openai.com/api/docs/guides/video-generation](https://developers.openai.com/api/docs/guides/video-generation), [https://developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing)
7. MacRumors, "OpenAI's Sora App Adds Character Cameos and Video Stitching Tools" (30 October 2025), on cameo consent and revocation controls: [https://www.macrumors.com/2025/10/30/openai-sora-app-character-cameos-video-stitching/](https://www.macrumors.com/2025/10/30/openai-sora-app-character-cameos-video-stitching/)
8. CNBC, "Runway rolls out Gen 4.5 AI video model that beats Google, OpenAI" (1 December 2025): [https://www.cnbc.com/2025/12/01/runway-gen-4-5-video-model-google-open-ai.html](https://www.cnbc.com/2025/12/01/runway-gen-4-5-video-model-google-open-ai.html)
9. Runway, "Introducing Gen-4.5," official research announcement: [https://runway.com/research/introducing-runway-gen-4.5](https://runway.com/research/introducing-runway-gen-4.5)
10. Runway Developer Docs, "Available AI Models" (Gen-4.5 alongside Veo 3.1, Seedance, Wan, and other third-party models on the same platform), fetched 4 September 2026: [https://docs.dev.runwayml.com/guides/models/](https://docs.dev.runwayml.com/guides/models/)
11. Runway Developer Docs, API changelog, on Gen-4 Turbo and Gen-3 Alpha Turbo retirement (30 July 2026): [https://docs.dev.runwayml.com/api-details/api_changelog/](https://docs.dev.runwayml.com/api-details/api_changelog/)
12. Google DeepMind, official Veo model page (Veo 3.1 description, native audio, resolution, access points, and the spoken-audio limitation quoted above), fetched 4 September 2026: [https://deepmind.google/models/veo/](https://deepmind.google/models/veo/)
13. Google, "Veo 3.1 Ingredients to Video" and Veo 3.1 Lite model card: [https://blog.google/innovation-and-ai/technology/ai/veo-3-1-ingredients-to-video/](https://blog.google/innovation-and-ai/technology/ai/veo-3-1-ingredients-to-video/), [https://deepmind.google/models/model-cards/veo-3-1-lite/](https://deepmind.google/models/model-cards/veo-3-1-lite/)
14. This wiki, [Google's Generative Media in 2026](/news/google-generative-media-2026/): Nano Banana 2, Veo 3.1 Lite, Lyria 3 Pro, and Gemini Omni's introduction at I/O 2026.
15. Runway Developer Docs, "API Pricing & Costs" (credit rates for gen4.5, professional/HDR format surcharges), fetched 4 September 2026: [https://docs.dev.runwayml.com/guides/pricing/](https://docs.dev.runwayml.com/guides/pricing/)
16. Runway, official pricing page (Free/Standard/Pro/Max/Enterprise plans and monthly credit allotments), fetched 4 September 2026: [https://runway.com/pricing](https://runway.com/pricing)
17. Google AI for Developers, Gemini API pricing (Veo 3.1 Standard, Fast, and Lite per-second rates by resolution), fetched 4 September 2026: [https://ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing)
18. Google, Gemini subscriptions page (Free, AI Plus, AI Pro, AI Ultra pricing and Flow-credit allotments), fetched 4 September 2026: [https://gemini.google/subscriptions/](https://gemini.google/subscriptions/)
19. Runway Research, "More Control, Fidelity, and Expressibility" (Motion Brush and Director Mode camera controls): [https://runway.com/research/more-control-fidelity-and-expressibility](https://runway.com/research/more-control-fidelity-and-expressibility)
20. Runway, "Introducing Aleph 2 and Edit Studio," and the Aleph 2.0 product page (in-context editing, input limits, API pricing): [https://runway.com/news/introducing-aleph-2-and-edit-studio](https://runway.com/news/introducing-aleph-2-and-edit-studio), [https://runway.com/product/aleph-2](https://runway.com/product/aleph-2)
21. Google, "Veo 2 is coming to Dream Screen on YouTube Shorts": [https://blog.google/feed/veo-2-dream-screen-youtube-shorts/](https://blog.google/feed/veo-2-dream-screen-youtube-shorts/)
22. OpenAI Developer Platform, *Deprecations* - "Sora 2 video generation models and Videos API" (notice 24 March 2026; Videos API, `sora-2`, `sora-2-pro`, and snapshots `sora-2-2025-10-06`, `sora-2-2025-12-08`, `sora-2-pro-2025-10-06` removed 24 September 2026, no replacement), fetched 25 September 2026: [https://developers.openai.com/api/docs/deprecations](https://developers.openai.com/api/docs/deprecations)
23. Google AI for Developers, Gemini API changelog - "Gemini Omni Flash generally available (GA)" (27 August 2026; `gemini-omni-flash-preview` deprecated 30 September 2026), fetched 25 September 2026: [https://ai.google.dev/gemini-api/docs/changelog](https://ai.google.dev/gemini-api/docs/changelog)
24. Google AI for Developers, Gemini API pricing - Gemini Omni Flash (`gemini-omni-1.1-flash`, $17.50 per 1M video output tokens, ~$0.10 per second of 720p video), fetched 25 September 2026: [https://ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing)
