---
title: "Remotion - Programmatic Video Creation with React"
description: "Using Remotion to generate videos programmatically from React components, with Lambda rendering for scalable AI-driven video production."
date: 2026-03-24
categories: [Tools]
tags: ["media-processing", "intermediate", "remotion", "video-generation", "react", "programmatic-video", "javascript"]
last_updated: 2026-05-30
---

Remotion lets you create videos using React components. Instead of editing in a timeline, you write TypeScript/JavaScript that describes what appears on screen at each frame. This approach makes video creation programmable: AI-generated content, dynamic data, and template-driven production all become straightforward.

Official documentation: https://www.remotion.dev/

## How It Works

A Remotion composition is a React component that receives a `frame` prop (current frame number) and a `durationInFrames` prop. You use Remotion's built-in animation hooks to produce motion:

```tsx
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

export const TitleCard = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </AbsoluteFill>
  );
};
```

Remotion renders this component at each frame (1/30th second by default) using headless Chrome, producing a frame sequence that FFmpeg then encodes to MP4.

## Template System for AI Video

Remotion is particularly powerful when combined with AI-generated content. A template composition accepts props (title, body text, background image URL, voiceover audio URL), and AI fills in the props:

1. Bedrock generates the script and content structure
2. Amazon Polly synthesizes the voiceover audio
3. Image generation or stock assets provide visuals
4. Remotion composition assembles everything with props passed at render time

The same template renders thousands of personalized videos with different content - product explainers, news summaries, educational content - by varying the props.

## Lambda Rendering

Remotion Lambda renders compositions on AWS Lambda in parallel. Long videos are split into chunks (e.g., a 10-minute video splits into 120 chunks of 5 seconds each), rendered concurrently across Lambda invocations, and stitched together. A 10-minute render completes in under 2 minutes with sufficient Lambda concurrency.

Setup requires deploying a Remotion Lambda function (provided as a pre-built ARM64 binary) and a Remotion site (the composition bundle) to S3. The render API accepts composition ID, input props, and codec settings, returning a presigned S3 URL for the output.

## Remotion vs FFmpeg

Remotion and FFmpeg address different needs:

- **Remotion**: building video from scratch with dynamic content, templates, animations, data-driven layouts
- **FFmpeg**: processing, transforming, and editing existing video files (trim, concatenate, transcode, overlay)

In practice many AI video pipelines use both: Remotion creates template-driven segments, FFmpeg splices them together with raw footage.

See the [Remotion vs FFmpeg comparison]({{< relref "remotion-vs-ffmpeg.md" >}}) for a detailed breakdown.

## When to Use Remotion

Use Remotion when:
- Videos follow a template with variable content
- You need programmatic control over layout, typography, and animation
- You want to generate many videos in parallel from the same codebase
- Your team knows React

Use FFmpeg when you are processing existing video rather than generating new video.

## Related Articles

- [FFmpeg]({{< relref "ffmpeg.md" >}}) - video processing for existing footage
- [Amazon Polly]({{< relref "amazon-polly.md" >}}) - voiceover audio for Remotion compositions
- [AWS Lambda]({{< relref "amazon-lambda.md" >}}) - serverless rendering infrastructure
