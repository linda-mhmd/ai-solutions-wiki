---
title: "Module 9: It all comes together, and where to go next"
description: "Module 9 of the AI Film Crew course: It all comes together, and where to go next. About 7 minutes, with the full video and its content to read through."
date: 2026-06-15
last_updated: 2026-06-15
weight: 9
chapter: 9
layer: "Synthesis"
duration_min: 7.0
video_file: "m09.mp4"
summary: "One upload through all five layers; cheap, fast, and correct; how it is built; and your next step."
tags: ["course","aws","beginner"]
concepts:
  - infrastructure-as-code
  - ci-cd
  - observability
  - rag
  - multi-agent-systems
services:
  - aws-mediaconvert
  - aws-step-functions
  - terraform
---

One upload. Five layers. Real time. This is the whole stack working together: a single file in, three finished cuts out, with a gate at every boundary.

{{< five-layers >}}

{{< still src="m09-a.jpg" caption="One upload through all five layers; cheap, fast, and correct; how it is built; and your next step." >}}

## One upload, all five layers

The interface drops the file in a bucket. Orchestration wakes. A sanitizer checks codec, container, duration, and whether this exact file was already processed. Never pay twice. Compute fans out: proxy, audio, frames. Then three senses in parallel: labels, transcript, meaning. Under ninety seconds.

The brief is drafted and validated, the crew of eight deliberates, and a VariantSpec comes back. The compiler renders all three formats in a single MediaConvert job, and state receives the finished cuts. Under three minutes, end to end. Three videos: YouTube, Shorts, LinkedIn.

And six validation gates stood guard the whole way. Any one of them can stop the line:

- **Input.** The file is checked before anything runs.
- **Clip.** Every selected clip is verified.
- **Timestamp.** The timing is checked against the transcript.
- **Facts.** Every claim is compared against the analysis.
- **Quality.** The final plan can be rejected and sent back.
- **Schema.** The output is validated as strict JSON.

Confidently wrong output never reaches a viewer. A failed check halts the pipeline loudly. It never invents synthetic content to keep going.


{{< still src="m09-b.jpg" >}}
## Cheap, fast, and correct

And the receipt for all of that? Thirty-four cents. Per finished video. Three formats included. At ten thousand videos a month, the entire pipeline bills about 3,400 euros. Less than one human editor. Not by replacing the editor's craft, but by handling the eighty percent of footage no editor would ever reach.

The speed never came from faster services. It came from the shape: parallel branches, zero-compute waits, warm starts where cold starts hurt. And the safety came from layers that distrust each other: validation at every boundary, workflows that fail loudly, agents that check agents.

> Cheap, fast, and correct are not features you add at the end. They fall out of the architecture.

Which leaves one question. How does a system like this actually get built, and could you build one?

## How it is built

Here is the part that sounded like science fiction five years ago. The whole platform is written as code, and a free guide walks you through building one. Everything you have seen, 38 functions, 9 workflows, the buckets, the roles, is written down as code. Terraform reads it and builds the cloud to match.

The software process is a loop, not a line. Describe, generate, review, deploy, observe, and around again.

{{< chain >}}
GitHub Actions | a push triggers the run | github-actions
OIDC role | assumed on the fly, no long-lived keys
Terraform | plans the change, then applies it | terraform
Observe | watch the metrics, then loop again
{{< /chain >}}

On every push, GitHub Actions assumes a role with OIDC, so there are no long-lived keys. It plans the change, then applies it. Tests run against real AWS services, not mocks, for five cents a run. The mocks passed while production failed. Real tests are the only ones that count here.

And changes? You describe them in plain English: add a square version for Instagram, title in the corner. The AI writes the diff. You read it. You ship it. That is vibecoding. The five layers are not just how the system runs. They are how it is built, tested, and changed, by one person, with a laptop.

## The five layers, recapped

Five layers, under every AI system. Each one has a single lesson:

- **Interface:** keep it thin.
- **Orchestration:** make every step visible.
- **Compute:** rent it by the second.
- **AI runtime:** let specialists check each other.
- **State:** choose memory by access pattern, and respect its gravity.

Swap the services, and the same shape fits podcasts, photo libraries, documents, logs. The shape stays. The providers change. Footage that would never be published now gets published. That is the value. The architecture just makes it cheap, fast, and correct enough to trust.

## Where to go next

Built by Linda Mohamed, AWS Hero, Vienna. The full beginner course and build guide are free at ai-solutions.wiki. The blog, and the workshops, are at lindamohamed.com.

One more thing before your own build meets real users. Run the [pre-launch safety check](/guides/vibe-coding-in-public-safety-check/): five plain-English checks on your keys, your database, and your logins. And when money, personal data, or other people's trust enter the picture, read [when you actually need a professional](/guides/when-do-you-need-a-professional/), or [get help directly](/get-help/). Every serious product brings in help at the right moment. Yours deserves the same.
