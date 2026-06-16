---
title: "Module 3: The hidden structure: OSI and the five layers"
description: "Module 3 of the AI Film Crew course: OSI and the five layers. About 2.5 minutes, with the full video and its content to read through."
date: 2026-06-15
last_updated: 2026-06-15
weight: 3
chapter: 3
layer: "The idea"
duration_min: 2.5
video_file: "m03.mp4"
summary: "Why 1984's OSI model still runs how engineers think, and the five layers under every AI system. Grab a hard hat, we are going down."
tags: ["course","aws","beginner"]
concepts:
  - osi-model
  - api
  - event-driven-architecture
  - multi-agent-systems
---

This is not really a story about video. Somewhere on a server sit 493 clips from one conference, and under the machine that could finally edit them sits the same hidden structure that sits under every AI system you have ever used: five layers.

{{< five-layers >}}

{{< still src="m03-a.jpg" caption="Why 1984's OSI model still runs how engineers think, and the five layers under every AI system. Grab a hard hat, we are going down." >}}

## The expensive problem

Somewhere on a server sit 493 clips from one conference. Nobody will ever watch them. Not because they are bad. Editing one hour of interview footage takes 40 to 60 hours of human work. Only one in five corporate videos ships on time. And video is 82% of all internet traffic. The content already exists. The bottleneck is the edit: the human hours between filming and publishing.

- **493 clips** from one conference, zero views.
- **40 to 60 hours** of editing for one hour of interview footage.
- **1 in 5** corporate videos ship on time.
- **82%** of internet traffic is video.

This is the story of a machine that removes that bottleneck. An AI film crew, built from rented parts, that turns one upload into three finished cuts for **34 cents**. One upload goes in, the crew is rented by the second with no humans in the loop, and three formats come out: YouTube (16:9), Shorts (9:16), and LinkedIn (1:1), in under three minutes.

But this is not really a story about video. Under this system, and under every AI system you have ever used, sits the same hidden structure. Five layers. Learn to see them, and you can read any AI system like a map. So grab a hard hat. We are going down.


{{< still src="m03-b.jpg" >}}
## A 40-year-old trick: the OSI model

First, a quick history lesson. In 1984 the internet was becoming too complex for any one person to hold in their head. The fix was to cut it into seven layers. Each layer does one job and talks only to its neighbors. Engineers called it the OSI model.

That trick is called layering, and it is why you can use Wi-Fi without ever thinking about copper wires. Forty years later, it still organizes how engineers think.

## Five layers instead of seven

Modern AI systems have quietly grown the same kind of anatomy. Five layers instead of seven:

- **01 Interface** is what you click.
- **02 Orchestration** is what gives the orders.
- **03 Compute** is what does the work.
- **04 AI runtime** is what makes the judgment calls.
- **05 State** is where everything rests.

## Why it matters

Why should you care? Because once you can name the layers, AI systems stop being magic. Every diagram, every tutorial, every job ad suddenly has a place to hang.

To prove it, we drill through all five using one real production system: VideoFlow, a pipeline on AWS that edits raw footage into finished videos. No humans in the loop. Built by Linda Mohamed, an AWS Hero from Vienna. Every box you are about to see is a real service, in a real account, with a real bill. The full beginner course is free at ai-solutions.wiki.

Five layers. One upload. Time to go down. Layer one is next.
