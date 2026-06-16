---
title: "Module 7: Layer 4: AI runtime"
description: "Module 7 of the AI Film Crew course: AI runtime. About 2.2 minutes, with the full video and its content to read through."
date: 2026-06-15
last_updated: 2026-06-15
weight: 7
chapter: 7
layer: "Layer 4"
duration_min: 2.2
video_file: "m07.mp4"
summary: "What makes the judgment calls. Perception in parallel, then a crew of eight agents."
tags: ["course","aws","beginner"]
concepts:
  - ai-agents
  - computer-vision
  - speech-to-text
  - foundation-models
  - multi-agent-systems
  - inference
  - agentic-ai
services:
  - amazon-rekognition
  - amazon-transcribe
  - amazon-bedrock
---

Layer four: the AI runtime. The layer with judgment. This is the layer that decides things. Everything below feeds it, everything above presents what it produces, but here is where the system stops moving data around and starts forming opinions about what the footage means and what to do with it.

{{< five-layers active="4" >}}

{{< still src="m07-a.jpg" caption="What makes the judgment calls. Perception in parallel, then a crew of eight agents." >}}

## Three senses, in parallel

Before anything can be decided, the system has to perceive. It watches the footage three ways at once: three senses, in parallel.

{{< chain >}}
Rekognition | labels what it sees in the frames | amazon-rekognition
Transcribe | every word, with timestamps | amazon-transcribe
Bedrock Data Automation | the whole video, for meaning | amazon-bedrock
{{< /chain >}}

Rekognition looks at the frames and labels what it sees, building a visual timeline. Transcribe listens, writing down every word with its timestamp: what was said, and exactly when. And Bedrock Data Automation watches the whole video for meaning, the narrative summary a human would give you.

The order these run in is the whole point.

> Run one after another, that is three minutes. In parallel, all three finish in under ninety seconds.

The three streams merge into one brief: title, summary, key moments. A foundation model drafts it, and the pipeline validates it as strict JSON. If the model returns garbage, the pipeline fails loudly. No fallback data. Ever. Invalid JSON does not get patched, guessed, or quietly replaced with a default. The workflow stops, on purpose, rather than pass confidently wrong structure downstream.


{{< still src="m07-b.jpg" >}}
## The film crew: eight agents

Then the brief goes to the strangest part of this machine: the film crew. Eight AI agents, each with one specialty, deliberate over your footage like a real production team.

- **Director** owns the narrative arc.
- **Editor** selects clips.
- **Cinematographer** judges framing and light.
- **Sound Designer** handles audio and sync.
- **Story Analyst** finds the beats.
- **Pacing Analyst** sets the rhythm of the cuts.
- **Fact Checker** compares every claim against the analysis and flags what does not match.
- **Quality Checker** is the final gate. It can reject the whole plan and send the crew back to work.

They argue in tokens instead of around a table, with shared working memory, and they hand back one artifact: a VariantSpec. Which clips. In what order. With which transitions. For three aspect ratios: widescreen, vertical, square.

Why eight agents instead of one big prompt? Because specialists check each other. A single model confidently makes things up. A crew with a fact checker gets caught.

One layer left: the one everything else stands on.
