---
title: "Amazon Transcribe - Speech-to-Text for Enterprise"
description: "Amazon Transcribe capabilities, accuracy characteristics, pricing, and the integration patterns that work well for enterprise transcription workloads."
date: 2026-03-24
categories: [Tools]
tags: ["ai-ml", "intermediate", "amazon-transcribe", "speech-to-text", "audio", "aws", "transcription", "aws-service"]
last_updated: 2026-05-30
---

Amazon Transcribe is AWS's managed speech-to-text service. It converts audio files or streams to text with timestamps, speaker labels, and confidence scores. For enterprise use cases - call center recordings, meeting transcription, media subtitling, voice-driven applications - Transcribe provides a managed alternative to building and hosting transcription models.

## Watch: Amazon Transcribe (documentation overview)
{{< video src="screencasts/Transcribe.mp4" title="Amazon Transcribe: AWS documentation overview" caption="A short walkthrough of Amazon Transcribe turning speech into text, with a timestamp on every word." >}}

The garden way to picture it: transcription is the garden's written record, every word noted with the exact time it was said.

{{< video src="garden/logging-stream.mp4" metaphor="true" title="The garden metaphor" caption="Turning what is heard into a labelled, time-stamped record. From the AI Film Crew course." >}}

## Core Features

**Batch transcription** - Submit audio files (MP3, MP4, WAV, FLAC, AMR, OGG) stored in S3 and retrieve the transcript when the job completes. Processing time is typically 20-30% of audio duration.

**Streaming transcription** - Real-time transcription of audio streams for live captioning, voice assistants, and real-time analysis. Latency from speech to transcribed text is 1-3 seconds.

**Speaker diarization** - Identifies and labels individual speakers throughout the transcript. Useful for multi-party conversations: meeting recordings, call center interactions, interview transcripts. Supports up to 10 speakers per recording.

**Custom vocabulary** - Improve transcription accuracy for domain-specific terms, brand names, product codes, and proper nouns not in the default vocabulary. Custom vocabularies are applied without retraining - they act as a weighted override on the language model's output.

**Toxicity detection** - Flags segments containing toxic language in call center and communication workloads, categorized by type (profanity, harassment, etc.).

**Call Analytics** - A specialized mode for call center recordings that provides sentiment analysis per speaker, call characteristics (talk time, non-talk time, interruptions), and category matching against custom criteria.

## Accuracy Characteristics

Transcribe accuracy is highest for:
- Clear studio-quality audio (SNR above 20dB)
- American or British English with standard accents
- Professional speech patterns (clear enunciation, moderate pace)

Accuracy degrades with:
- Background noise, overlapping speakers, or low audio quality
- Strong regional accents or non-native speakers
- Heavy domain-specific jargon without custom vocabulary

For production workloads with expected audio quality variation, test with representative samples before deploying. A word error rate (WER) below 10% is generally acceptable for downstream LLM processing; above 15% WER, transcript quality often degrades downstream AI output noticeably.

## Integration Patterns

**Meeting summarization pipeline** - Record meeting audio, upload to S3, trigger Transcribe via Lambda, pass transcript to Bedrock for summarization and action item extraction. Total latency from recording end to summary available: 5-10 minutes for a 60-minute meeting.

**Call center quality monitoring** - Ingest call recordings, transcribe with Call Analytics, extract compliance-relevant patterns (required disclosures, prohibited statements), flag non-compliant calls for review. This pattern runs as batch processing over daily call volumes.

**Media subtitling** - Transcribe with timestamps and confidence scores, post-process to generate SRT or VTT subtitle files, apply manual correction for low-confidence segments. Combined with a translation step, this extends to multilingual subtitling.

## Pricing

Transcribe is priced per second of audio transcribed. Standard and Call Analytics modes have different per-second rates. Custom language model usage and streaming have separate rate schedules.

At scale, Transcribe streaming costs more per second than batch transcription. For non-real-time workloads, always use batch transcription. For workloads with predictable high volume, contact AWS about negotiated pricing.

## Limitations

- Maximum audio file size: 2GB for batch jobs
- Maximum batch job duration: 4 hours
- Streaming sessions have a maximum duration of 4 hours
- Custom vocabularies do not improve accuracy for phrases; they only improve individual word recognition
