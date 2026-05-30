---
title: "Speech-to-Text (STT)"
description: "What speech-to-text technology is, how AWS Transcribe, Azure Speech, and GCP Speech-to-Text compare, and key features like speaker diarization and custom vocabulary."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "beginner", "speech-to-text", "asr", "transcription", "audio", "nlp"]
last_updated: 2026-05-30
---

Speech-to-text (STT) converts spoken audio into written text. Modern STT systems use end-to-end deep learning models trained on thousands of hours of labeled audio to achieve accuracy near human transcription levels for clear speech. Applications include meeting transcription, voice search, closed captioning, call center analytics, and voice interface backends.

## How It Works

Contemporary STT systems use sequence-to-sequence neural networks. The audio waveform is first converted to a mel spectrogram (a frequency representation over time), then an encoder processes this visual representation into feature vectors, and a decoder generates text tokens. Attention mechanisms allow the decoder to focus on relevant audio segments when producing each word.

Large models like Whisper (OpenAI) use transformer architectures and train on 680,000 hours of multilingual audio, achieving strong multilingual transcription without language-specific training.

## AWS: Amazon Transcribe

Amazon Transcribe is AWS's managed STT service, supporting both real-time streaming and batch file transcription.

Key features:
- **Automatic language identification** - detects the language without specifying it
- **Speaker diarization** - identifies and labels different speakers ("Speaker 1:", "Speaker 2:"). Essential for meeting transcription and call analytics.
- **Custom vocabulary** - add domain-specific terms (product names, medical terminology, proper nouns) that the general model misses
- **Custom language models** - fine-tune on domain-specific text corpora for specialized vocabulary
- **Transcribe Medical** - a separate endpoint optimized for clinical audio, including medical terminology and HIPAA eligibility
- **Call Analytics** - extracts call sentiment, talk-time ratios, and interruptions from contact center audio
- **Toxicity detection** - flags harmful content in audio without full transcription

Transcribe integrates natively with S3 (input and output), Lambda (trigger processing on upload), and Step Functions (pipeline orchestration).

## Azure: Speech Service

Azure Cognitive Services Speech offers STT as the Speech-to-Text API. Distinguishing features include custom neural voice (CNTK-based model customization), real-time transcription with interim results, and deep integration with Teams and Office 365 for meeting scenarios. Azure's Conversation Transcription feature handles multi-speaker meeting scenarios well.

## GCP: Speech-to-Text

Google Cloud Speech-to-Text offers 125+ languages and variants, strong multilingual performance, and automatic punctuation. The Chirp model (Google's large speech model) competes with Whisper on multilingual transcription. GCP's Medical Speech Adaption is comparable to Transcribe Medical for clinical audio.

## Speaker Diarization

Speaker diarization is the process of partitioning an audio stream into segments by speaker identity. The output is a transcript with speaker labels rather than a continuous text block.

All three major cloud STT services offer diarization. Quality varies by use case:
- Conference room audio (multiple speakers, background noise) is harder
- Telephone audio (two speakers, known channel characteristics) is easier
- Overlapping speech (interruptions, crosstalk) is challenging for all services

## Custom Vocabulary

Domain-specific terms - rare proper nouns, technical acronyms, product names, medical terminology - are frequently misrecognized by general models. Custom vocabulary tables provide phonetic hints and preferred spellings. For example, adding `"ARIS" -> pronounced "AY-ris"` prevents the model from transcribing it as "areas."

## Related Articles

- [Amazon Transcribe]({{< relref "/tools/amazon-transcribe.md" >}}) - detailed service guide
- [Text-to-Speech (TTS)]({{< relref "text-to-speech.md" >}}) - the reverse operation
- [Computer Vision]({{< relref "computer-vision.md" >}}) - complementary multimodal input

## Sources

- Radford, A., et al. (2023). Robust speech recognition via large-scale weak supervision. *ICML 2023*. (Whisper; demonstrated that training on 680,000 hours of weakly supervised audio achieves near-human multilingual ASR.)
- Baevski, A., et al. (2020). wav2vec 2.0: A framework for self-supervised learning of speech representations. *NeurIPS 2020*. (wav2vec 2.0; self-supervised pre-training that reduced labeled data requirements by orders of magnitude.)
- Chan, W., Jaitly, N., Le, Q., & Vinyals, O. (2016). Listen, attend and spell: A neural network for large vocabulary conversational speech recognition. *ICASSP 2016*. (LAS; foundational attention-based end-to-end ASR model eliminating alignment assumptions.)
- Graves, A. (2006). Connectionist temporal classification: Labelling unsegmented sequence data with recurrent neural networks. *ICML 2006*. (CTC loss; enabled end-to-end training of RNN ASR models without pre-segmented phoneme labels.)
