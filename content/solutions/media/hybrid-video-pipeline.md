---
title: "Hybrid Cloud AI Video Pipeline with Amazon FSx for NetApp ONTAP"
description: "How to build an AI video processing pipeline that spans on-premises storage and AWS cloud using FSx for NetApp ONTAP as a hybrid bridge, with Rekognition, Transcribe, and Bedrock for AI analysis."
date: 2026-03-26
categories: [Solutions]
tags: ["media-processing", "advanced", "hybrid-video-pipeline", "media", "architecture", "aws", "streaming"]
industries: [media]
tools: [amazon-rekognition, amazon-bedrock, aws-step-functions, amazon-transcribe, amazon-fsx, aws-mediaconvert, amazon-cloudfront]
related:
  - solutions/media/video-pipeline-architecture
  - glossary/hybrid-cloud
  - patterns/cost-optimization
last_updated: 2026-05-30
---

Media companies face a persistent tension: their valuable video archives live on-premises on enterprise NAS systems, but the most powerful AI analysis tools live in the cloud. Migrating hundreds of terabytes of content to S3 is expensive, disruptive to existing workflows, and often blocked by compliance requirements. Amazon FSx for NetApp ONTAP (FSxN) resolves this tension by acting as a hybrid bridge - native NFS and SMB access for on-premises editing tools on one side, tight AWS integration and automatic S3 tiering on the other.

This architecture was developed by Linda Mohamed as part of her AI video pipeline work with broadcasters, in collaboration with the NetApp Partner Academy.

## The Problem with Full Cloud Migration

On-premises video infrastructure works. Editors use NFS mounts through established workflows. The storage team understands capacity and performance. Legal and compliance teams have approved the data residency. Forcing a full S3 migration to unlock AI capabilities creates unnecessary friction and risk.

The better path is to bring the cloud to the data rather than moving all the data to the cloud.

## Architecture Overview

The pipeline has six stages:

1. **On-premises storage** - Existing NetApp ONTAP systems hold the video archive with NFS/SMB access for editing tools
2. **FSxN hybrid bridge** - FSx for NetApp ONTAP replicates content from on-prem ONTAP via SnapMirror, with automatic tiering to S3 Intelligent-Tiering for inactive files
3. **S3 tiering layer** - Cold and warm content automatically moves to S3, where Lambda event triggers can watch for new or promoted objects
4. **Step Functions orchestration** - A state machine coordinates the AI analysis workflow, handling parallel analysis tasks and error recovery
5. **AI analysis** - Amazon Rekognition for scene detection, object labels, face analysis, and emotion detection; Amazon Transcribe for speech-to-text; Amazon Bedrock (Claude) for content scoring, editorial decisions, and metadata generation
6. **Output and delivery** - AWS Elemental MediaConvert for format transcoding, with output delivered via CloudFront

```
On-prem ONTAP
     |
  SnapMirror
     |
Amazon FSx for NetApp ONTAP
     |
  Auto-tiering
     |
Amazon S3  -->  Lambda trigger  -->  Step Functions
                                          |
                              +---------------------+
                              |           |          |
                         Rekognition  Transcribe  Bedrock
                              |           |          |
                              +---------------------+
                                          |
                                    MediaConvert
                                          |
                                     CloudFront
```

## FSxN as the Hybrid Bridge

FSx for NetApp ONTAP is a managed service that runs NetApp ONTAP in AWS. Key properties that make it suitable as a hybrid bridge:

**SnapMirror replication** - On-premises ONTAP systems can replicate volumes to FSxN using the same SnapMirror technology already in use. There is no new tooling or retraining required for storage teams. Replication can be synchronous (for active production content) or asynchronous (for archival content being promoted for AI processing).

**NFS and SMB access** - Editing tools and on-premises applications connect to FSxN using standard protocols. The transition from on-prem ONTAP to FSxN is transparent to application layers.

**Storage efficiency** - NetApp deduplication and compression carry over to FSxN, reducing the volume of data that needs to move to AWS.

**Automatic tiering to S3** - FSxN FabricPool tiering moves cold data to S3 automatically based on access patterns. This is the handoff point into the cloud AI pipeline: once a video file has been tiered to S3, an S3 event notification triggers Lambda.

## Step Functions Workflow

The orchestration layer uses a Step Functions Express Workflow for throughput and cost efficiency. The state machine structure:

1. **Probe** - Verify the S3 object is accessible and extract metadata (codec, resolution, duration)
2. **Normalize** - Submit a MediaConvert job to produce a 1080p normalized file and a 360p proxy
3. **Wait** - Use the `waitForTaskToken` pattern to pause until MediaConvert completes
4. **Parallel analysis** - Simultaneously start Rekognition label detection, Rekognition face analysis, and Transcribe jobs against the proxy
5. **Score** - Pass all analysis results to Bedrock (Claude) with a structured prompt asking for content score, editorial tags, and recommended cuts
6. **Store** - Write all metadata to DynamoDB; write editorial recommendations to S3 as JSON sidecar files
7. **Transcode** - Submit final MediaConvert job for delivery formats

## Rekognition Configuration

For broadcast content, the most valuable Rekognition features are:

- **Label detection** with confidence threshold at 70% or above to avoid noise
- **Content moderation** with human review integration via Augmented AI (A2I) for borderline results
- **Face detection** with emotion analysis for audience engagement scoring
- **Technical cue detection** for identifying scene changes and shot boundaries

Run all Rekognition jobs against the 360p proxy. Results are frame-accurate and the cost difference between analyzing proxy vs. full resolution is substantial at scale.

## Bedrock Content Scoring

The Bedrock integration receives a structured JSON payload containing Rekognition labels by timestamp, the Transcribe transcript, detected faces and emotions, and content moderation flags. A system prompt instructs Claude to act as an editorial assistant for the broadcaster, returning a structured JSON response with content score, recommended segments for highlight reels, compliance flags, and suggested metadata tags.

Prompt versioning is managed through AWS Bedrock Prompt Management, allowing A/B testing of scoring criteria without code changes.

## Cost Profile

The dominant cost variables are MediaConvert transcoding minutes, Rekognition analysis duration, and Bedrock tokens. At 100 hours of content processed per day, the pipeline typically costs significantly less than equivalent on-premises AI infrastructure - and the on-premises storage investment is preserved rather than written off.

FSxN tiering ensures that only active content carries SSD storage costs. The majority of a video archive is cold and lives in S3 at a fraction of the cost.

## Sources

- Amazon FSx for NetApp ONTAP: https://aws.amazon.com/fsx/netapp-ontap/
- Amazon Rekognition Video documentation: https://docs.aws.amazon.com/rekognition/latest/dg/video.html
- NetApp ONTAP data management: https://www.netapp.com/data-management/ontap-data-management-software/
