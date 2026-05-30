---
title: "FFmpeg - Video Processing Swiss Army Knife"
description: "Using FFmpeg in AWS Lambda layers and EC2 for video processing in AI pipelines, including common operations and integration with Rekognition and Bedrock."
date: 2026-03-24
categories: [Tools]
tags: ["media-processing", "beginner", "ffmpeg", "video-processing", "audio", "transcoding", "cli"]
last_updated: 2026-05-30
---

FFmpeg is a command-line tool and library collection for video, audio, and media processing. It handles format conversion, trimming, concatenation, frame extraction, thumbnail generation, codec transcoding, and hundreds of other operations. In AI pipelines it is the standard tool for video manipulation before and after AI analysis steps.

Official documentation: https://ffmpeg.org/

## FFmpeg on AWS Lambda

Lambda has a 250 MB deployment package limit (unzipped) and no system-level FFmpeg installation. The solution is a **Lambda layer** - a separate ZIP containing the FFmpeg binary compiled for the Lambda execution environment (Amazon Linux 2, ARM64 or x86_64).

A maintained public layer ARN works for most cases. For custom builds (specific codecs, HEVC support), compile FFmpeg from source in an Amazon Linux 2 container and package the binary. The layer attaches to Lambda functions via ARN reference in Terraform or CloudFormation.

Lambda limitations for FFmpeg:
- 15-minute execution timeout limits processing of long files
- 10 GB /tmp storage (enough for most video segments, not full feature films)
- 10 GB memory maximum affects processing speed for high-resolution video

For files over 30 minutes or 1080p, consider MediaConvert instead.

## Common Operations in AI Pipelines

**Frame extraction for Rekognition:**
```bash
ffmpeg -i input.mp4 -vf fps=1 frames/frame_%04d.jpg
```
Extract one frame per second as JPEG for batch image analysis. More efficient than video analysis API calls for sparse scene detection.

**Trim to segment:**
```bash
ffmpeg -i input.mp4 -ss 00:01:30 -t 00:00:30 -c copy segment.mp4
```
Cut a 30-second clip starting at 1:30. `-c copy` avoids re-encoding (fast). Used after AI analysis identifies interesting segments.

**Add audio to video:**
```bash
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac output.mp4
```
Combine Polly-generated voiceover with a video track.

**Concatenate clips:**
```bash
ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4
```
Stitch multiple segments into a final edit after AI-driven clip selection.

**Generate thumbnail:**
```bash
ffmpeg -i input.mp4 -ss 00:00:05 -vframes 1 thumbnail.jpg
```
Extract one frame for video preview display.

## Integration with Rekognition

For label detection at a specific frame, use FFmpeg to extract that frame rather than using the Rekognition video API (which processes the full video). This is faster and cheaper when you only need analysis at specific timestamps identified by a previous pass.

## Integration with Bedrock

After Bedrock processes a transcript or generates an edited script, FFmpeg assembles the output video. A Step Functions workflow: Transcribe generates transcript -> Bedrock identifies highlight timestamps -> FFmpeg trims and concatenates those segments.

## Remotion vs FFmpeg

Remotion creates video from scratch using React components and data. FFmpeg processes existing video. They are complementary, not competing tools. See the [Remotion vs FFmpeg comparison]({{< relref "remotion-vs-ffmpeg.md" >}}) for full context.

## Origins and History

FFmpeg was created by French programmer Fabrice Bellard, initially publishing under the pseudonym "Gerard Lantau," and first released on December 20, 2000. The name combines "FF" for "Fast Forward" (a reference to VCR controls) with "mpeg" for the Moving Picture Experts Group standard. The project was originally hosted on SourceForge, where it became one of the most popular projects on the platform. After FFmpeg migrated to its own infrastructure several years later, SourceForge reportedly experienced a significant drop in traffic.

Bellard's use of a pseudonym was likely a precaution against patent litigation, which was a serious risk for anyone working on multimedia codec implementations at the time. In 2003, Bellard departed the project, and Michael Niedermayer assumed the role of lead maintainer, a position he held until 2015. Bellard went on to create other foundational projects including QEMU and the Tiny C Compiler.

As of 2026, the FFmpeg repository has over 57,000 GitHub stars, 1.5 million lines of code, and contributions from over 2,400 developers across eight major versions.

## Sources

1. Kostya's Boring Codec World (2022). "FFhistory: Fabrice Bellard." [https://codecs.multimedia.cx/2022/12/ffhistory-fabrice-bellard/](https://codecs.multimedia.cx/2022/12/ffhistory-fabrice-bellard/)
2. FFmpeg - Wikipedia. [https://en.wikipedia.org/wiki/FFmpeg](https://en.wikipedia.org/wiki/FFmpeg)
3. Bellard, F. Home Page. [https://bellard.org/](https://bellard.org/)
4. FFmpeg Official Site. [https://ffmpeg.org/](https://ffmpeg.org/)

## Related Articles

- [AWS Elemental MediaConvert]({{< relref "aws-mediaconvert.md" >}}) - managed alternative for large files
- [Remotion]({{< relref "remotion.md" >}}) - programmatic video creation
- [Amazon Rekognition]({{< relref "amazon-rekognition.md" >}}) - AI analysis that follows FFmpeg frame extraction
