---
title: "ElevenLabs"
description: "AI voice synthesis API with natural-sounding text-to-speech, voice cloning, and real-time audio generation across 32 languages."
date: 2026-06-22
tags: ["voice-ai", "text-to-speech", "voice-cloning", "audio", "api", "speech"]
tool_category: "AI"
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/drum-electric-arc-notext.png" alt="Industrial drum with red electric arc crackling across it: voice AI converts text into electrical signal, transmitted as speech." loading="lazy">
  <figcaption>ElevenLabs turns text into speech the same way an arc converts electricity into visible energy: a transformation that looks simple but requires precise tuning at every frequency.</figcaption>
</figure>

ElevenLabs is a voice AI company founded in 2022 that provides an API for text-to-speech, voice cloning, speech-to-speech conversion, and audio dubbing. Its models produce speech that is consistently ranked as the most natural-sounding available commercially. The API covers 32 languages with accent-aware output and supports real-time streaming for latency-sensitive applications like conversational AI, interactive assistants, and podcast narration.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Products</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Text to Speech</span>
      <span class="bz-arch-chip">Speech to Speech</span>
      <span class="bz-arch-chip">Voice Cloning</span>
      <span class="bz-arch-chip">Dubbing</span>
      <span class="bz-arch-chip">Conversational AI</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Eleven Multilingual v2</span>
      <span class="bz-arch-chip">Eleven Flash v2.5</span>
      <span class="bz-arch-chip">Eleven Turbo v2.5</span>
      <span class="bz-arch-chip-note">Flash: ~75ms latency for real-time streaming; Multilingual v2: highest quality</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">REST API</span>
      <span class="bz-arch-chip">Python SDK</span>
      <span class="bz-arch-chip">Node.js SDK</span>
      <span class="bz-arch-chip">WebSocket streaming</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Voice library</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">3000+ premade voices</span>
      <span class="bz-arch-chip">Professional Voice Clone</span>
      <span class="bz-arch-chip">Instant Voice Clone</span>
      <span class="bz-arch-chip-note">Instant clone from 1 minute of audio; Professional clone from 30+ minutes</span>
    </div>
  </div>
</div>

## Installation

```bash
pip install elevenlabs
```

## Basic text-to-speech

```python
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key="YOUR_ELEVENLABS_API_KEY")

audio = client.text_to_speech.convert(
    voice_id="JBFqnCBsd6RMkjVDRZzb",  # premade voice: "George"
    model_id="eleven_multilingual_v2",
    text="Willkommen bei ai-solutions.wiki. Hier lernen Sie, wie Sie KI-Systeme in die Praxis umsetzen.",
    output_format="mp3_44100_128",
)

with open("output.mp3", "wb") as f:
    for chunk in audio:
        f.write(chunk)
```

## Streaming for real-time applications

Use the WebSocket streaming API when integrating with a conversational agent and need audio to start playing before the full response is generated.

```python
from elevenlabs.client import ElevenLabs
from elevenlabs import stream

client = ElevenLabs(api_key="YOUR_ELEVENLABS_API_KEY")

audio_stream = client.text_to_speech.convert_as_stream(
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    model_id="eleven_flash_v2_5",  # optimised for low latency
    text="Your order has been confirmed. Delivery is scheduled for Thursday.",
    output_format="pcm_16000",
)

stream(audio_stream)
```

## Voice cloning from a sample

Instant voice cloning accepts audio files of 30 seconds to 5 minutes. The clone is available immediately via the API.

```python
from pathlib import Path
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key="YOUR_ELEVENLABS_API_KEY")

with open("speaker_sample.mp3", "rb") as f:
    cloned_voice = client.clone(
        name="Customer Service Rep - AT",
        description="Austrian German accent, professional tone",
        files=[f],
    )

audio = client.generate(
    text="Guten Tag, wie kann ich Ihnen helfen?",
    voice=cloned_voice,
    model="eleven_multilingual_v2",
)
```

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Choose a voice</span>
    <span class="bz-flow-step-desc">Browse the Voice Library for premade voices. Filter by language, gender, age, and accent. Or clone from your own speaker samples.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Select model</span>
    <span class="bz-flow-step-desc">Flash for real-time latency under 100ms. Turbo for balanced quality and speed. Multilingual v2 for highest naturalness, all languages.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Tune voice settings</span>
    <span class="bz-flow-step-desc">Adjust stability (0-1) and similarity boost (0-1). Lower stability gives more expressiveness. Higher similarity locks to the original voice character.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Stream or serve</span>
    <span class="bz-flow-step-desc">Serve as MP3 for pre-rendered content. Use PCM WebSocket streaming for conversational AI with sub-100ms first-chunk latency.</span>
  </div>
</div>

## Pricing (as of June 2026)

| Plan | Monthly | Characters included | Overage |
|---|---|---|---|
| **Free** | €0 | 10,000 | Not available |
| **Starter** | €5 | 30,000 | €0.30/1k chars |
| **Creator** | €22 | 100,000 | €0.30/1k chars |
| **Pro** | €99 | 500,000 | €0.24/1k chars |
| **Scale** | €330 | 2,000,000 | €0.20/1k chars |

A typical spoken minute of audio is roughly 750-900 characters. 100,000 characters equals approximately 110-130 minutes of audio.

## Comparison with alternatives

| | ElevenLabs | OpenAI TTS | Google Cloud TTS | Amazon Polly |
|---|---|---|---|---|
| **Voice quality** | Best-in-class | High | Good | Moderate |
| **Languages** | 32 | 57 | 40+ | 30+ |
| **Voice cloning** | Yes (instant + pro) | No | No | No |
| **Latency (streaming)** | ~75ms (Flash) | ~300ms | ~200ms | ~150ms |
| **Price per 1M chars** | €3,300 (Creator) | ~€15 | ~€16 | ~€4 |
| **Best for** | Natural voice, cloning | GPT integration | Google Workspace | AWS integration |

## When not to use ElevenLabs

**Very high volume, cost is primary concern**: At scale (hundreds of millions of characters per month), Google Cloud TTS or Amazon Polly costs roughly 5-10x less. The quality gap matters less for automated notifications or IVR systems.

**Real-time phone telephony**: ElevenLabs does not provide a SIP/PSTN integration. For direct voice calls, Twilio's Voice Intelligence or Vonage AI Studio connect more directly to telephony infrastructure.

**Purely German or Austrian government output**: EU procurement rules may require GDPR-compliant EU-resident processing. Confirm ElevenLabs' current DPA terms before using voice data from EU citizens.

**Accessibility-first static content**: For screen readers and ARIA-described content, browser-native Web Speech API or Google TTS with SSML gives you precise phoneme control and no per-character cost.

## Further reading

- [ElevenLabs API documentation](https://elevenlabs.io/docs/api-reference/getting-started): REST and WebSocket reference, model IDs, voice IDs
- [ElevenLabs Python SDK](https://github.com/elevenlabs/elevenlabs-python): Full source, examples, changelog
- [Voice Library](https://elevenlabs.io/voice-library): Premade voices browsable by accent, age, language, use case
- [Conversational AI API](https://elevenlabs.io/docs/conversational-ai/overview): Real-time agent integration with turn detection and interruption handling
- [What is an API?](/basics/what-is-an-api/): Foundational explanation of APIs and how to call them
- [Multi-Agent Systems](/guides/multi-agent-systems-101/): Integrating voice output with agentic workflows
