---
title: "Android"
description: "The open-source, Linux-based mobile operating system led by Google that became the world's most widely used computing platform and the main place people meet AI."
date: 2026-06-23
categories: [History]
tags: [android, mobile, operating-system, google, linux, open-source, smartphone]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/iphone
  - history/java
  - history/intel-4004
faqs:
  - question: "When did Android launch?"
    answer: "Google and the Open Handset Alliance announced Android on 5 November 2007. The first Android phone, the HTC Dream (also sold as the T-Mobile G1), shipped in October 2008."
  - question: "What is the difference between Android and the iPhone's iOS?"
    answer: "Android is open-source and runs on phones from many makers, such as Samsung, Xiaomi and Google. iOS is closed and runs only on Apple devices. Android licenses its core code freely, so any manufacturer can build on it."
  - question: "Why does Android matter for AI builders today?"
    answer: "Android runs on billions of devices, so it is the largest single surface where people meet AI. It ships on-device model runtimes and assistant features, and it is a primary deployment target for any mobile AI product."
---

Android is an open-source mobile operating system built on the Linux kernel and led by Google. Google and the Open Handset Alliance announced it on 5 November 2007, and the first phone shipped in October 2008. It grew into the most widely used computing platform on Earth.

<figure class="bz-figure"><img src="/img/enterprise-dark/neon-corridor-walking-notext.png" alt="People walking through a dark corridor framed by glowing neon arches, suggesting a shared platform that millions of devices and users pass through." loading="lazy"><figcaption>Android became a corridor that billions of devices and users pass through, a common platform built on shared open code.</figcaption></figure>

## What it was

Android is the software that runs a phone. It sits between the hardware and the apps. At its base is the Linux kernel, the same family of code that runs most internet servers. On top of that sit system services, a runtime that executes app code, and a layer of user-facing apps.

Its defining trait is openness. Google releases the core, the Android Open Source Project, under a free license. Any manufacturer can take that code, adapt it, and ship it on a phone. Samsung, Xiaomi, Google and many others all build their own versions on the same foundation.

Think of Android like a public recipe for bread. Apple bakes one loaf in one kitchen and sells it sealed. Google publishes the recipe, so hundreds of bakeries make their own loaves, each with a different crust, all from the same base dough.

<div class="bz-arch">
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Apps</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Browser</span><span class="bz-arch-chip">Camera</span><span class="bz-arch-chip">Third-party apps</span><span class="bz-arch-chip-note">Installed from the Play Store or other stores</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Framework</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Activity manager</span><span class="bz-arch-chip">UI toolkit</span><span class="bz-arch-chip-note">APIs every app calls to draw screens and handle input</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Runtime and libraries</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">ART runtime</span><span class="bz-arch-chip">System libraries</span><span class="bz-arch-chip-note">Executes app code and shared native code</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Linux kernel</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Drivers</span><span class="bz-arch-chip">Memory</span><span class="bz-arch-chip">Power</span><span class="bz-arch-chip-note">Talks to the chips, camera, radio and battery</span></div></div>
</div>

## Why it mattered

Android made the smartphone affordable for the whole world. Because any maker could license the core for free, phones appeared at every price point. A cheap handset and a flagship could run the same apps. That breadth is why Android reached billions of users.

It also turned mobile into an open ecosystem. Developers wrote apps in [Java](/history/java/), and later Kotlin, then published to a single store that reached many brands at once. One app could run on phones from dozens of companies, which lowered the cost of reaching a global audience.

The competition with the [iPhone](/history/iphone/) shaped a generation of computing. Apple offered one tightly controlled device. Android offered choice and scale. Together they pushed the mobile-first era, where the phone, not the desktop, became most people's main computer.

## How it connects to AI today

Android is the largest single surface where humans meet artificial intelligence. More than three billion active devices run it, each packed with a camera, microphone, GPS and motion sensors. For most of the world, the Android phone is where they first use an AI feature.

Google built AI deep into the platform. Android ships ML Kit and a runtime called LiteRT, formerly TensorFlow Lite, so apps can run machine learning models directly on the device. On-device inference means a model can recognise speech, translate text or sort photos without sending data to a server, which improves speed and privacy.

Recent Android releases add system-level assistants and generative features. The platform exposes APIs that let apps tap on-device language and vision models. Newer phones include dedicated neural processing chips, so larger models run locally. This pushes the boundary between cloud AI and edge AI right into your pocket.

A builder meets Android constantly. If you ship a mobile AI product, Android is usually a required target alongside iOS. You decide what runs on the device versus a server, you handle a wide range of hardware, and you fit models into limited memory. Cross-platform tools such as React Native and Expo, both visible in the [AI Learning Galaxy](/explore/galaxy/), exist so one codebase can reach both Android and Apple. The open, varied Android fleet is also a vast testbed for deploying and measuring AI features at real scale.

## Still in use today

Android is active and intensely maintained. Google ships a major version most years, along with frequent security patches. The platform that began on the HTC Dream in 2008 now runs on phones, tablets, watches, televisions, cars and many embedded devices.

It persists because openness and scale reinforce each other. Free licensing keeps manufacturers building on it, and the huge installed base keeps developers writing for it. No single rival matches its reach across price points and device types. The early versions are long retired, but the architecture, a Linux base with an open app layer, still defines the platform.

Place Android beside the [iPhone](/history/iphone/), its great rival, which set the touchscreen template that both platforms share. Its app layer grew from the [Java](/history/java/) language and ecosystem. Its silicon roots trace back to the microprocessor revolution that started with the [Intel 4004](/history/intel-4004/).

## Further reading

- [IT History Timeline](/explore/it-timeline/): see how Android fits into the wider story of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how mobile platforms connect to modern AI topics.
- [Apple iPhone](/history/iphone/): the rival platform that set the touchscreen smartphone template.
- [Android (Wikipedia)](https://en.wikipedia.org/wiki/Android_(operating_system)): full history of the platform and its versions.
- [Android Developers documentation (Google)](https://developer.android.com/docs): the official platform docs for building Android apps and on-device AI today.
- [Android Open Source Project](https://source.android.com/): the official site for the open-source core that manufacturers build on.
