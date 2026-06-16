---
title: "Module 2: How software actually gets built"
description: "Module 2 of the AI Film Crew course: How software actually gets built. About 1.6 minutes, with the full video and its content to read through."
date: 2026-06-15
last_updated: 2026-06-15
weight: 2
chapter: 2
layer: "Build"
duration_min: 1.6
video_file: "m02.mp4"
summary: "The shape every system shares, the build loop, and what the cloud is, told as a garden."
tags: ["course","aws","beginner"]
concepts:
  - infrastructure-as-code
  - ci-cd
  - serverless
services:
  - terraform
---

Building software is not magic, and it is not one giant leap. It is a small shape repeated, started tiny and grown, with the cloud as the ground you plant it in.

{{< still src="m02-a.jpg" caption="The shape every system shares, the build loop, and what the cloud is, told as a garden." >}}

## The shape every system shares

**Five steps, one shape.** Almost every pipeline does this:

- Take something in
- Look closely
- Decide
- Make the result
- Share it

Learn the shape once and you see it everywhere.


{{< still src="m02-b.jpg" >}}
## Start tiny, ship, learn, repeat

**Start tiny. Ship. Learn. Repeat.** You do not build it all at once. A seed, a seedling, a first taste, then a better seed. The smallest version that works is the goal, not the finished platform.

## Start small, and safe

Open an account, set a tiny budget alarm, and you can explore the real cloud safely for a few cents.

1. **Create a free account.** aws.amazon.com, the free tier covers this.
2. **Turn on a budget alarm.** Set a small alarm so you can never get a surprise bill.
3. **Make a non-root user.** Never build as the root account, create an admin user.
4. **Pick one home region.** For example eu-central-1, and stay there.

## A few free tools, once

Install these once, and your own laptop can deploy a whole cloud system.

- **Git and GitHub.** Copy the project to your computer.
- **Terraform.** One command builds all the cloud pieces.
- **Docker.** Packages the AI crew to run anywhere.
- **Python.** The language the small functions speak.

## The cloud, in a garden

**Where you plant decides what survives.** The same workload behaves differently depending on the ground you give it.

An onion thrives in the open field. Public cloud: standard conditions, fast to plant, elastic to grow.

A delicate plant needs a greenhouse. Private or on prem: more control, more protection, more work.

## Deploy the whole garden with one command

Following a build guide like the one on ai-solutions.wiki, one command has Terraform build the whole system in your own account while you watch. Each box is one step in the pipeline that runs your system. Deploy means to put your work where real users can reach it, like moving a plant from your balcony into the ground.
