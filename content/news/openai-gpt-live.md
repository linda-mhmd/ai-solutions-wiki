---
title: "OpenAI Launches GPT-Live, Full-Duplex Voice Models"
description: "OpenAI introduced GPT-Live, a new generation of voice models built on a full-duplex architecture that listens while it speaks. It now powers ChatGPT Voice; a developer API is coming later."
date: 2026-07-17
lastmod: 2026-07-17
last_updated: 2026-07-17
categories: [News]
tags: [openai, gpt-live, voice, multimodal, model-release]
related:
  - news/openai-gpt-5-5-and-5-6
  - comparisons/llm-landscape-2026
  - news/google-generative-media-2026
---

Voice assistants have mostly worked like walkie-talkies: you talk, it waits, it replies, you wait. On 8 July 2026 OpenAI introduced GPT-Live, a new generation of voice models built to remove that turn-taking. GPT-Live uses a full-duplex architecture, meaning it can listen and speak at the same time. It now powers a new ChatGPT Voice experience, replacing the older Standard and Advanced Voice Mode behind the Voice button.

<figure class="bz-figure">
  <img src="/img/shaping-ai/operator-red-data-streams-notext.png" alt="A figure surrounded by red streaming data ribbons, suggesting continuous two-way flow of information." loading="lazy">
  <figcaption>Full-duplex voice means the model handles two live audio streams at once, rather than taking strict turns.</figcaption>
</figure>

## What happened

OpenAI announced **GPT-Live** as a new generation of voice models on a **full-duplex architecture** that, in OpenAI's words, "can listen and speak at the same time." Instead of processing one message at a time, the model continuously takes in audio while producing it, deciding many times a second whether to speak, keep listening, pause, or interrupt. In practice it can be talked over, acknowledge you with an "mhmm," and hold the rhythm of a real conversation rather than waiting for a clean end-of-turn signal.

There are two versions, **GPT-Live-1** and **GPT-Live-1 mini**. A second design choice matters for anyone thinking about voice systems: GPT-Live handles the live conversation and **delegates deeper work to a separate frontier model in the background** (GPT-5.5 at launch), folding the result back in when it is ready. That split keeps the voice layer fast while heavier reasoning or web search runs behind it.

Read the availability fine print, because it is the part that matters for builders. GPT-Live is rolling out **inside ChatGPT** now, globally, on iOS, Android, and the web, with GPT-Live-1 as the default for paid tiers and GPT-Live-1 mini for free users. OpenAI says a developer **API is coming "soon"** but is not available yet; for now, developers can only sign up to be notified.

## Why it matters for builders

The honest status for builders is: not yet. GPT-Live is a consumer ChatGPT feature today, and there is no API to build on until OpenAI ships one. So this is a heads-up, not a migration you can start. Watch for the API, and note the architecture in the meantime, because the pattern it uses, a fast full-duplex voice layer that delegates reasoning and search to a separate model, is a strong hint at where production voice is heading.

When it does arrive, treat voice as its own engineering problem, not text with audio bolted on. Latency budgets are tighter, barge-in and overlapping speech change the interaction model, and evaluation is harder than diffing strings: OpenAI built new human evaluations for conversational flow and turn-taking rather than reusing text benchmarks. Test against real audio conditions, noisy rooms, accents, cross-talk, not a clean demo, and see the [2026 LLM landscape](/comparisons/llm-landscape-2026/) for how the voice and multimodal offerings compare across providers.

## Sources

- OpenAI, "Introducing GPT-Live": https://openai.com/index/introducing-gpt-live/

## Further reading

- [OpenAI's GPT-5.5 and 5.6 models](/news/openai-gpt-5-5-and-5-6/): the text-model line alongside the new voice models.
- [Google's generative media in 2026](/news/google-generative-media-2026/): the parallel race in voice, image, and video generation.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how multimodal and voice capabilities compare across providers.
