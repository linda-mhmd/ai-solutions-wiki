---
title: "What are Regions?"
description: "A region is a place in the world where the cloud keeps its data centres. You pick one so your software runs close to your users."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, cloud, regions, infrastructure]
last_updated: 2026-06-15
---

{{< quickanswer >}}
A region is a physical location in the world where a cloud provider keeps a cluster of data centres. When you run software in the cloud, you choose which region it lives in. Picking a region near your users makes your app feel fast, and running a copy in a second region keeps it safe if one location has problems.
{{< /quickanswer >}}

## What a region actually is

The cloud sounds like it floats everywhere, but it does not. Every app, file, and database runs on real computers in real buildings. Those buildings are grouped into clusters called **data centres**, and a group of data centres in one part of the world is a **region**.

Cloud providers have regions all over the planet. Each has a short name. On AWS you will see names like `eu-central-1` (Frankfurt, Germany) and `us-east-1` (Northern Virginia, USA). The name tells you roughly where the machines are sitting.

When you create something in the cloud, one of the first choices is: which region? That single choice decides where your software physically lives.

## An everyday analogy

Think of your software as a garden. A region is simply which country your garden is actually planted in. The plants are real, the soil is real, and they sit in one specific place on the map.

If most of the people picking from your garden live nearby, you plant it close to them so the walk is short. And if you are careful, you keep a second garden in another country too, so that if a storm hits one, the other still feeds everyone. A region is that location decision, made for software instead of plants.

## How it works in practice

Here is the rule of thumb: closer is faster, and a copy is safer.

A region is a cluster of data centres in one place. Pick one near your users so responses come back quickly, and you can run a copy in a second region for safety. The further data has to travel, the longer every click takes, so distance is not a small detail.

Some region names you will meet early on:

- `eu-central-1` (Frankfurt) - a common choice for users in Europe
- `us-east-1` (Northern Virginia) - one of the oldest and busiest AWS regions
- Pick one near your users - the simplest guide when you are starting out

A real example from this project: the AI Film Crew course (VideoFlow) runs the main video pipeline in one region and the AI crew in another, on purpose. Splitting work across regions like that is a deliberate choice, not an accident, and it is exactly the kind of decision regions exist to give you.

## Why it matters

The region you choose affects three things you will care about:

- **Speed.** Data can only travel so fast. A user in Berlin talking to a server in Virginia waits longer than one talking to a server in Frankfurt, so closer regions feel snappier.
- **Safety.** Whole regions can occasionally go down. Keeping a copy in a second region means one outage does not take everything with it.
- **Rules.** Some data is legally required to stay inside a certain country. Choosing the right region is often how you meet those rules.

The takeaway: you do not manage the buildings or the machines, but you do choose where they are, and that choice shapes how fast and reliable your software feels.

## Where you will see this

- The first time you create anything in a cloud console, there is usually a region selector in the corner. If something you made seems to vanish, you are often just looking at the wrong region.
- Tutorials frequently default to `us-east-1`, so you may land there without choosing it.

Regions are how [the cloud]({{< relref "basics/what-is-the-cloud" >}}) turns into something real and located. They are where your [servers]({{< relref "basics/what-is-a-server" >}}) and [stored files]({{< relref "basics/what-is-storage-and-files" >}}) actually sit, and the choice is closely tied to [scaling]({{< relref "basics/what-is-scaling" >}}) your app to more users in more places.
