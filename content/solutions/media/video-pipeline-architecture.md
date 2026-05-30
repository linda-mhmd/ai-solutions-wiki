---
title: "Building an AI Video Pipeline on AWS"
description: "Architecture guide for an end-to-end AI video pipeline: S3 ingest, Lambda trigger, Rekognition analysis, Bedrock processing, FFmpeg editing, and Step Functions orchestration."
date: 2026-03-24
categories: [Solutions]
tags: ["media-processing", "advanced", "video-pipeline", "media", "architecture", "transcoding", "aws"]
industries: [media]
tools: [amazon-rekognition, amazon-bedrock, aws-step-functions, aws-s3, amazon-lambda, amazon-transcribe]
last_updated: 2026-05-30
---

An AI video pipeline automates the process of ingesting raw video, extracting intelligence from it, and producing edited or enriched output. This article describes a production-ready architecture built on AWS that handles media ingest through final output delivery.

## Pipeline Overview

The pipeline has five conceptual stages:

1. **Ingest** - video arrives in S3 and triggers the pipeline
2. **Normalize** - MediaConvert converts raw formats to a consistent baseline
3. **Analyze** - Rekognition extracts labels, scenes, faces, and text; Transcribe produces a transcript
4. **Process** - Bedrock summarizes content, identifies highlights, generates metadata
5. **Edit and output** - FFmpeg assembles selected segments; output lands in S3

Step Functions orchestrates the entire workflow, with EventBridge triggering execution on S3 upload.

## Stage 1: Ingest

Raw video arrives in an S3 bucket at the `raw/` prefix. Videos can come from direct upload (content producers using presigned URLs), API submission, or automated feed ingestion from broadcast systems.

An EventBridge rule matches `ObjectCreated` events at the `raw/` prefix and starts a Step Functions execution, passing the S3 bucket and key as input. The trigger is near-instantaneous - processing begins within seconds of upload completion.

## Stage 2: Normalize

A Lambda function submits a MediaConvert job that converts the raw file to H.264 MP4 at 1080p with AAC audio. The output lands at the `normalized/` prefix. MediaConvert publishes a completion event to EventBridge, which the Step Functions waitForTaskToken pattern uses to resume the workflow.

For cost optimization, the pipeline also creates a 360p proxy simultaneously. Downstream analysis runs against the proxy; final output uses the 1080p normalized file.

## Stage 3: Analyze

Analysis runs in parallel (Step Functions parallel state) to minimize total pipeline time:

**Rekognition video analysis** - a Lambda function starts an async Rekognition `StartLabelDetection` job against the normalized video. The job identifies objects, activities, and scenes throughout the video with timestamps and confidence scores. Completion triggers via SNS topic configured in the Rekognition request.

**Amazon Transcribe** - a Lambda function submits a transcription job. The output is a JSON transcript with word-level timestamps and speaker labels (diarization enabled). On completion, a Lambda function formats the transcript as plain text and stores it alongside the video.

**Frame extraction** - Lambda runs FFmpeg to extract one frame per 5 seconds as JPEG thumbnails, stored in S3. These feed into Rekognition image analysis for any frame-level capabilities not covered by the video job (celebrity recognition, faces).

## Stage 4: Bedrock Processing

A Lambda function aggregates the analysis results and calls Bedrock (Claude) with a structured prompt:

- Rekognition labels and their timestamps provide the scene timeline
- The transcript provides the audio content
- The request: identify the 3-5 most significant segments, generate a summary, extract metadata tags

Bedrock returns a structured JSON response (via tool use or structured output) listing segment timestamps, a 150-word summary, and category tags. A Lambda function parses this and stores it as a metadata document alongside the video.

## Stage 5: Edit and Output

Lambda runs FFmpeg to trim and concatenate the highlight segments identified by Bedrock. For each segment: `ffmpeg -i normalized.mp4 -ss [start] -t [duration] -c copy segment_N.mp4`. After all segments are cut, FFmpeg concatenates them: `ffmpeg -f concat -safe 0 -i filelist.txt -c copy highlights.mp4`.

The output (full normalized video, highlight reel, transcript, metadata JSON, thumbnails) lands at the `output/` prefix. A final Step Functions state sends an SNS notification with the output location and a summary of extracted metadata.

## Error Handling

Each Step Functions state has a configured `Catch` block routing failures to an error handler Lambda that logs structured error details to CloudWatch and publishes to an alert SNS topic. The Step Functions execution history provides a visual timeline of where failures occurred.

For transient errors (Rekognition throttle, temporary S3 unavailability), states use `Retry` with exponential backoff before failing.

## Cost Profile

For a typical 10-minute news segment: MediaConvert ($0.015), Rekognition video ($0.10), Transcribe ($0.024), Bedrock Claude call ($0.03), Lambda executions ($0.001), S3 storage (negligible). Total approximately $0.17 per 10-minute video.

## Related Articles

- [Amazon S3]({{< relref "/tools/aws-s3.md" >}}) - storage layer
- [Amazon EventBridge]({{< relref "/tools/amazon-eventbridge.md" >}}) - pipeline trigger
- [AWS Elemental MediaConvert]({{< relref "/tools/aws-mediaconvert.md" >}}) - normalization
- [FFmpeg]({{< relref "/tools/ffmpeg.md" >}}) - editing and assembly
- [Amazon Rekognition]({{< relref "/tools/amazon-rekognition.md" >}}) - video analysis
