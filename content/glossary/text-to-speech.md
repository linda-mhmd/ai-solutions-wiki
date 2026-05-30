---
title: "Text-to-Speech (TTS)"
description: "What text-to-speech technology is, how AWS Polly, Azure Speech, and GCP Text-to-Speech compare, and key features like neural voices and SSML."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "beginner", "text-to-speech", "tts", "audio", "speech-synthesis", "nlp"]
last_updated: 2026-05-30
---

Text-to-speech (TTS) converts written text into spoken audio. Modern neural TTS systems produce speech that is nearly indistinguishable from human recording for short to medium-length passages. Applications include accessibility features for visually impaired users, voice assistants, IVR systems, audio content generation, and programmatic narration for video.

## How It Works

Traditional TTS systems used concatenative synthesis - recording a human speaker saying thousands of phoneme combinations and stitching them together at runtime. Results were robotic because the stitching boundaries were audible.

Neural TTS (the current standard) uses end-to-end deep learning. A sequence-to-sequence model takes character or phoneme sequences as input and produces mel spectrograms, which a vocoder network (like WaveNet or HiFi-GAN) converts to audio waveforms. The neural approach learns prosody (rhythm, stress, intonation) from training data, producing natural-sounding speech without explicit prosody rules.

## AWS: Amazon Polly

Amazon Polly offers 60+ voices across 30+ languages in two tiers:

**Standard voices** use concatenative synthesis. Suitable for short strings and notifications. Lower cost.

**Neural voices** use deep learning. Noticeably more natural prosody, especially on longer passages. Approximately 4x the cost of standard voices but worth it for user-facing audio.

Polly also supports **speech marks** - JSON output alongside audio with word-level timestamps and viseme data (mouth positions). This enables precise caption synchronization and avatar lip-sync.

Official documentation: https://aws.amazon.com/polly/

## Azure: Speech Service (TTS)

Azure Cognitive Services Speech includes neural TTS with 400+ voices in 140+ languages - the broadest voice selection of the three major providers. Azure's neural voices are among the highest quality available, particularly for expressive styles (newscast, customer service, narration).

Azure supports **custom neural voice** - a personalized voice model trained from studio recordings of a specific speaker. Used by companies that want a branded voice identity.

## GCP: Cloud Text-to-Speech

Google Cloud TTS offers Standard, WaveNet, and Neural2 voice tiers. WaveNet was Google's breakthrough neural voice model. Neural2 is trained with the same techniques as Google Assistant voices, offering natural prosody with good multi-language support. Chirp HD is Google's latest high-fidelity voice model.

## SSML: Speech Synthesis Markup Language

SSML is an XML-based markup standard for controlling TTS output. All three cloud providers support it. Key elements:

- `<break time="500ms"/>` - insert a pause
- `<prosody rate="slow" pitch="+2st">` - adjust speaking rate and pitch
- `<emphasis level="strong">` - emphasize a word
- `<say-as interpret-as="spell-out">API</say-as>` - spell out an acronym
- `<phoneme alphabet="ipa" ph="pɪˈkɑːn">pecan</phoneme>` - specify exact pronunciation

SSML is essential for professional audio where default pronunciation is wrong for product names, technical terms, or numbers that should be read as ordinals rather than cardinals.

## Selecting a Voice

Voice selection criteria:
- **Gender and age** - match the intended speaker persona
- **Language and accent** - regional variants matter (US vs UK English, Brazilian vs European Portuguese)
- **Style** - conversational, newscast, customer service styles affect appropriateness for context
- **Neural vs standard** - always use neural for public-facing applications

## Related Articles

- [Amazon Polly]({{< relref "/tools/amazon-polly.md" >}}) - detailed service guide
- [Speech-to-Text (STT)]({{< relref "speech-to-text.md" >}}) - the reverse operation
- [Remotion]({{< relref "/tools/remotion.md" >}}) - combining TTS audio with programmatic video

## Sources

- van den Oord, A., et al. (2016). WaveNet: A generative model for raw audio. *arXiv:1609.03499*. (WaveNet; breakthrough neural vocoder from DeepMind that enabled natural-sounding TTS; basis for current cloud TTS architectures.)
- Shen, J., et al. (2018). Natural TTS synthesis by conditioning WaveNet on mel spectrogram predictions. *ICASSP 2018*. (Tacotron 2; end-to-end neural TTS model combining sequence-to-sequence mel spectrogram prediction with WaveNet.)
- Kim, J., et al. (2021). Conditional variational autoencoder with adversarial learning for end-to-end text-to-speech. *ICML 2021*. (VITS; current state-of-the-art end-to-end TTS achieving single-model speech synthesis.)
