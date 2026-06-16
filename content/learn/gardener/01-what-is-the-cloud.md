---
title: "What is the cloud?"
description: "The cloud in plain words, and why it changed who gets to build software. Lesson 1 of the Gardener Path."
date: 2026-06-14
lastmod: 2026-06-14
last_updated: 2026-06-14
type: lesson
categories: [Learn]
tags: ["learning", "beginner", "cloud", "gardener-path"]
chapter: "Chapter 1 - Prepare the soil"
weight: 1
video: "garden/cloud-rented-allotment.mp4"
video_type: "metaphor"
video_title: "The garden metaphor - a rented allotment"
summary:
  - "The cloud is other people's computers, rented by the second."
  - "You never buy or run the server yourself, and you pay only for what you use."
  - "That shift is why one person can now run what used to need a whole data centre."
quiz:
  - q: "What is the cloud, in one line?"
    options:
      - "Computers you buy and keep in your office"
      - "Other people's computers, rented by the second"
      - "A kind of weather data"
      - "A programming language"
    answer: 1
    explain: "The cloud is renting compute and storage on demand instead of owning and running the hardware yourself."
  - q: "What do you pay for in the cloud model?"
    options:
      - "A fixed yearly fee no matter what"
      - "Only the resources you actually use, by the second or hour"
      - "Nothing, it is always free"
      - "The full purchase price of the physical servers"
    answer: 1
    explain: "You pay for what you use. Turn a resource off and you stop paying for it."
  - q: "Why does the cloud matter for a solo builder?"
    options:
      - "It makes computers slower but cheaper"
      - "It lets one person run infrastructure that used to need a whole team and a data centre"
      - "It removes the need to write any code"
      - "It only works for very large companies"
    answer: 1
    explain: "Renting infrastructure on demand means a single person can stand up serious systems without owning a data centre."
---

Picture a community allotment. You do not buy the land, lay the water mains, or build the shed. You rent a plot, turn the tap on when you need water, and pay only for what you use. When the season ends, you hand the plot back. The cloud is that allotment for computing: you rent compute and storage by the second from a provider's data centres instead of buying and running your own servers.

## Why it changed who gets to build

Before the cloud, running a real application meant buying servers, hosting them somewhere, powering and cooling them, and paying for all of it whether or not anyone used your app. The cloud turned that fixed, up-front cost into a small, on-demand one. You start a server in seconds, pay for the minutes it runs, and turn it off when you are done. That is the reason a single person today can run systems that used to need a whole team and a data centre.

The widely used reference definition, from the US National Institute of Standards and Technology, lists five characteristics of cloud computing: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service. In plain words: you help yourself, from anywhere, to a shared pool that grows and shrinks with your need, and you are billed by what you measure.

## The trade you are making

Renting is not free of trade-offs. You give up some control and you depend on a provider, which is why where you rent (the region) and who you rent from (the provider) are real decisions, not afterthoughts. A system that can move between providers is far more resilient than one wired to a single vendor. Keep that in mind from the first day, not the day a provider changes the rules.

## Further reading

- [What is the cloud?]({{< relref "basics/what-is-the-cloud" >}}) the absolute-beginner explainer, with more detail.
- [Amazon S3]({{< relref "tools/aws-s3" >}}) rented storage, usually the first cloud service you touch.
- [How to prepare for sudden AI provider restrictions]({{< relref "guides/preparing-for-ai-provider-restrictions" >}}) why depending on a single provider is a risk worth designing around.

## Sources

1. National Institute of Standards and Technology. "The NIST Definition of Cloud Computing" (SP 800-145). https://csrc.nist.gov/publications/detail/sp/800-145/final
2. AWS. "What is cloud computing?" https://aws.amazon.com/what-is-cloud-computing/
