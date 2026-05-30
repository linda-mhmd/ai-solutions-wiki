---
title: "Amazon Polly - Text-to-Speech for Applications"
description: "Using Amazon Polly to generate natural-sounding speech from text in AI applications, with SSML control and neural voice options."
date: 2026-03-25
categories: [Tools]
tags: ["ai-ml", "beginner", "amazon-polly", "text-to-speech", "audio", "aws", "speech"]
last_updated: 2026-05-30
---

Amazon Polly converts text to lifelike speech using deep learning. It offers 60+ voices across 30+ languages, with two tiers: standard voices (concatenative synthesis, faster, cheaper) and neural voices (deep learning, more natural prosody). For AI applications that generate audio output - narration, accessibility features, voice assistants - Polly removes the need for third-party TTS vendors.

Official documentation: https://aws.amazon.com/polly/

**Azure equivalent:** Azure Cognitive Services Speech (Text-to-Speech). **GCP equivalent:** Google Cloud Text-to-Speech.

## Voice Options

**Neural voices** use a neural TTS model that produces more natural-sounding speech with better prosody, emphasis, and breathing patterns. The quality difference is audible on long-form content. Neural voices cost approximately 4x standard voices per character.

**Standard voices** use concatenative synthesis: recordings of human speech concatenated and processed. Quality is acceptable for short strings (notifications, labels) but sounds robotic on long passages.

**Brand Voice** (custom voice) - Polly can build a custom voice from studio recordings of a specific person, for organizations that need a branded voice identity. This requires a significant volume of recorded speech and is an enterprise engagement with AWS.

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
