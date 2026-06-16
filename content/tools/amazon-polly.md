---
title: "Amazon Polly - Text-to-Speech for Applications"
description: "Amazon Polly turns text into lifelike speech with standard, neural, long-form, and generative voices, SSML control, and speech marks."
date: 2026-03-25
categories: [Tools]
tags: ["ai-ml", "beginner", "text-to-speech", "audio", "aws", "speech", "aws-service"]
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
layer: applications
provider: aws
pricing_model: payg
maturity: production
---

Amazon Polly is a cloud service that converts written text into spoken audio (text-to-speech, or TTS). You send it a string of text and it returns an audio file or a live audio stream of a voice reading that text aloud. Polly offers 100+ voices across 40+ languages and language variants, spanning four voice engines, and exposes them through a simple API so any application can speak. For AI applications that generate audio output (narration, accessibility features, voice assistants, conversational agents) Polly removes the need to record human voice actors or run a third-party TTS vendor.

Official documentation: https://aws.amazon.com/polly/

## Foundations first

If these ideas are new, read these before the specifics:

- **Text-to-speech (TTS)** - software that synthesizes human-sounding speech from text. See {{< relref "/glossary/text-to-speech.md" >}}.
- **API** - the request and response interface an application uses to call a service. See {{< relref "/glossary/api.md" >}}.
- **Deep learning** - the neural-network technique behind Polly's neural and generative voices. See {{< relref "/glossary/deep-learning.md" >}}.

Polly sits in the **applications** layer of the AI stack: it is a ready-made capability you call, not a model you train or host yourself.

**Azure equivalent:** Azure AI Speech (Text-to-Speech). **GCP equivalent:** Google Cloud Text-to-Speech.

## Voice Options

Polly groups its voices into four engines, set with the `engine` parameter when you call the API. They trade off quality against cost (see Pricing).

**Standard voices** use concatenative synthesis: recordings of human speech concatenated and processed. Quality is acceptable for short strings (notifications, labels) but sounds robotic on long passages.

**Neural voices (NTTS)** use a neural TTS model that produces more natural-sounding speech with better prosody, emphasis, and breathing patterns. The quality difference is audible on longer passages. Neural voices also support the Newscaster speaking style for a subset of voices (for example Matthew and Joanna in US English) for a news-presenter delivery.

**Long-Form voices** are tuned for extended, expressive content such as articles, training material, and podcasts, where consistency over minutes of audio matters. They are available for a limited set of voices (for example Danielle, Gregory, Ruth, Patrick, Alba, and Raúl).

**Generative voices** are Polly's most human-like, emotionally engaged option, built on what AWS describes as a billion-parameter transformer that converts text into speech codes and then into a streamable waveform. They suit conversational AI, virtual assistants, and ads. As of March 2026 the documentation lists 43 generative voices across 20+ locales. Note: generative voices do not currently support speech marks, and the Newscaster style is not available on this engine.

**Brand Voice** (custom voice) - Polly can build a custom Neural voice from studio recordings of a specific person, for organizations that need a branded voice identity (for example National Australia Bank). This requires a significant volume of recorded speech and is an enterprise engagement with AWS.

## SSML Control

SSML (Speech Synthesis Markup Language) lets you control pronunciation, rate, pitch, pauses, and emphasis within text. Key tags:

- `<break time="500ms"/>` - insert a pause of specified duration
- `<prosody rate="slow">` - adjust speaking rate
- `<emphasis level="strong">` - emphasize a word
- `<say-as interpret-as="spell-out">` - spell out an acronym
- `<phoneme alphabet="ipa" ph="...">` - specify exact pronunciation

SSML is essential for professional audio output where the default pronunciation is wrong (product names, abbreviations, numbers).

## Integration Patterns

**Audio narration for video:** AI generates a script via Bedrock, Polly synthesizes the audio, and the audio combines with generated visuals via FFmpeg or Remotion. The Polly response includes speech marks (word-level timestamps) that can drive lip-sync or caption timing.

**Accessibility:** Add audio versions of text content for visually impaired users. Lambda calls Polly on content creation, writes the MP3 to S3, and stores the S3 URL alongside the text.

**Multilingual voice output:** Combine Amazon Translate (text translation) with Polly (speech synthesis) for spoken output in 30+ languages from a single text input.

**IVR systems:** Polly integrates with Amazon Connect for dynamic voice responses in contact center applications.

## Speech Marks

Polly can return speech marks alongside audio: JSON records indicating the start time and duration of each word, sentence, or viseme (mouth position). This enables:
- Precise caption synchronization
- Animated mouth/face sync for avatars
- Karaoke-style word highlighting in video

## Pricing

Polly charges per character synthesized. Neural voices cost 4x standard per character. The first 5 million standard characters per month are free in the first year. For high-volume applications, calculate cost carefully - a 1,000-word article is approximately 6,000 characters.

## Related Articles

- [Amazon Translate]({{< relref "amazon-translate.md" >}}) - translate text before synthesis
- [Text-to-Speech (TTS)]({{< relref "/glossary/text-to-speech.md" >}}) - technology overview
- [Remotion]({{< relref "remotion.md" >}}) - combine Polly audio with programmatic video
