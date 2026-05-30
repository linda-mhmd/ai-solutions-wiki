---
title: "Case Pattern: AI Video Processing Pipeline for a National Broadcaster"
description: "Architecture and lessons from building a production AI pipeline that processes, indexes, and makes searchable a large library of broadcast video content."
date: 2026-03-24
categories: [Case Patterns]
tags: ["media-processing", "advanced", "video-processing", "pipeline", "aws", "transcoding", "architecture"]
image: /img/enterprise-dark/corridor-red-columns-notext.png
image_alt: "A dark industrial corridor with tall red light columns, representing a video processing pipeline where frames pass through sequential stages."
image_caption: "Frame by frame. Stage by stage. The pipeline ingests raw footage and emits classified, indexed output."
---

A national broadcaster needed to make decades of archived news footage searchable - not just by file metadata, but by spoken content, on-screen text, and visual subject matter. The archive contained over 400,000 hours of content across formats ranging from modern digital files to digitized VHS. Manual indexing was not viable at this scale.

## The Architecture

The pipeline processes video through four parallel stages before writing to a search index.

**Transcription layer** - Amazon Transcribe processes the audio track with speaker diarization enabled. For archive content with poor audio quality, a pre-processing step applies noise reduction before transcription. Output is a timestamped transcript with speaker labels and confidence scores per word. Low-confidence segments are flagged for optional human review.

**Visual analysis layer** - Amazon Rekognition processes keyframes (extracted at one per second) for facial recognition, object and scene detection, and text detection (for lower-thirds, chyrons, and on-screen graphics). The keyframe rate is configurable - news footage with high visual change uses two frames per second; documentary-style content with slow visual change uses one per five seconds to reduce cost.

**Metadata extraction layer** - An LLM call post-processes the transcript and Rekognition output together to generate: a structured summary, topic tags, named entity extraction (people, locations, organizations), and a content classification (news category, sentiment, broadcast context).

**Ingestion layer** - Enriched metadata is written to Amazon OpenSearch, with the original file reference stored in S3. The search index supports full-text search across transcripts, entity search, and visual tag filtering.

## Orchestration

AWS Step Functions coordinates the pipeline stages. Video files are queued via SQS as they arrive from the ingest system. Step Functions handles retries, parallel execution of independent stages, and routing of failed jobs to a dead-letter queue for investigation.

Processing cost per hour of video runs approximately $4-8 depending on Rekognition analysis depth. At this scale, cost-tiering the archive by age and relevance - processing recent content at full depth and older archive content at reduced depth - reduced total processing cost by 60%.

## Key Lessons

**Timestamp alignment is harder than expected.** Transcription timestamps and Rekognition keyframe timestamps need to be aligned to the same reference clock. Off-by-one-second errors in frame extraction caused transcript segments to be associated with the wrong visual frames. Explicit timestamp normalization during the enrichment stage solved this.

**Confidence score thresholds need tuning per content type.** Transcription confidence thresholds appropriate for clear studio recordings were too aggressive for field reporting with background noise, filtering out valid transcriptions. Content-type-specific thresholds improved recall without sacrificing quality.

**Search quality depends on chunking strategy.** Indexing full transcripts as single documents produced poor search results - a query about a specific event would surface long clips where the event was mentioned briefly. Indexing 30-second segments with 10-second overlap produced much better retrieval precision.
