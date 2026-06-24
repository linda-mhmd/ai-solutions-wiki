---
title: "Transistor"
description: "A solid-state semiconductor device that amplifies or switches electrical signals, demonstrated in 1947 and still the basic building block of every chip today."
date: 2026-06-23
categories: [History]
tags: [transistor, semiconductors, bell-labs, hardware, computing-history, electronics, chips]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/integrated-circuit
  - history/intel-4004
  - history/moores-law
faqs:
  - question: "Who invented the transistor and when?"
    answer: "John Bardeen and Walter Brattain demonstrated the first working point-contact transistor on 16 December 1947 at Bell Labs. They worked in a group led by William Shockley, who soon developed the more robust junction transistor. The three shared the 1956 Nobel Prize in Physics for the work."
  - question: "Why did the transistor replace the vacuum tube?"
    answer: "Vacuum tubes were large, hot, fragile, and power-hungry, and they burned out often. A transistor does the same amplifying and switching job in a solid piece of semiconductor. It is smaller, cooler, more reliable, and uses far less power. That made compact, dependable electronics possible."
  - question: "Are transistors still used today?"
    answer: "Yes, more than ever. The individual packaged transistor is now legacy, used in specific power and analog roles. But the transistor as a switch is the core of every microchip. A modern processor or AI accelerator contains tens of billions of microscopic transistors etched onto silicon."
---

The transistor is a small solid-state device that amplifies or switches electrical signals using a semiconductor such as silicon or germanium. John Bardeen and Walter Brattain demonstrated the first working version on 16 December 1947 at Bell Labs. It replaced the bulky, hot, fragile vacuum tube and became the fundamental building block of all modern electronics and computing.

<figure class="bz-figure"><img src="/img/obsidian-lab/bolt-mold-joint-triptych-notext.png" alt="A copper bolt, a precision mold, and interlocking blocks photographed on dark slate, showing small engineered parts that fit together exactly, like the tiny semiconductor parts inside a transistor." loading="lazy"><figcaption>The transistor is a precisely engineered component, small and exact, like these machined parts that fit together to do one job well.</figcaption></figure>

## What it was

A transistor controls a flow of current. A small signal applied to one terminal governs a much larger current between two others. That single trick does two essential jobs. It amplifies, turning a weak signal into a strong one. It switches, turning a current fully on or fully off.

Think of a tap controlling water in a pipe. A light touch on the handle decides whether a strong flow runs or stops. The transistor does this with electricity and no moving parts. A faint input current opens or closes a much larger one.

Before the transistor, the vacuum tube did this job. A tube was a glass bulb the size of a small light bulb. It glowed, ran hot, drew heavy power, and failed often. A room-sized computer needed thousands of them. The first transistor was a tiny block of germanium with two gold contacts pressed against it. It did the same work in a fraction of the space.

<div class="bz-arch">
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Input</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Base / gate signal</span><span class="bz-arch-chip-note">A small control current or voltage</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Semiconductor</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Doped silicon or germanium</span><span class="bz-arch-chip-note">Material whose conductivity can be tuned</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Action</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Amplify</span><span class="bz-arch-chip">Switch</span><span class="bz-arch-chip-note">Small input controls a large output</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Output</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Collector / drain current</span><span class="bz-arch-chip-note">A stronger signal or a clean on/off state</span></div></div>
</div>

## Why it mattered

The transistor made electronics small, cheap, cool, and reliable. The first commercial hit was the transistor radio in the 1950s, a device you could hold in one hand. That was impossible with hot, fragile tubes.

For computing the change was even larger. Early electronic computers used vacuum tubes and filled entire rooms. They consumed enormous power and broke down constantly as tubes burned out. Transistors cut the size, heat, and failure rate by orders of magnitude. Machines became more dependable and far more affordable to run.

The transistor also gave engineers a clean, fast electronic switch. A computer is, at heart, a vast collection of switches representing ones and zeros. A reliable solid-state switch with no moving parts and no glowing filament was exactly what digital logic needed. The transistor turned the theory of binary computing into practical, durable hardware.

Bardeen, Brattain, and Shockley shared the 1956 Nobel Prize in Physics for the invention. The work began a shift from electromechanical and tube-based machines to solid-state electronics that still defines the industry.

## How it connects to AI today

This is the most direct line in all of computing history. Every chip that runs artificial intelligence is built from transistors. Nothing has replaced them.

The key step came when engineers learned to make many transistors on one piece of silicon. That produced the [integrated circuit](/history/integrated-circuit/), then the first microprocessor, the [Intel 4004](/history/intel-4004/), which packed thousands of transistors onto a single chip in 1971. From there, transistor counts grew relentlessly, a trend captured by [Moore's law](/history/moores-law/), which observed that the number of transistors per chip roughly doubles every two years.

That scaling is why modern AI exists. A current high-end GPU or AI accelerator contains tens of billions of transistors. Each one is a tiny switch a few nanometres wide. Together they perform the trillions of multiply-and-add operations that train and run a neural network. The math behind a large language model is real because the transistors that execute it are small enough and numerous enough.

A builder meets the transistor at every layer, even without seeing it. When you rent a GPU instance to train a model, you are renting billions of transistors switching billions of times per second. When latency, cost, or energy use limits your AI project, you are bumping against the physical limits of how small and fast a transistor can be. The whole stack of frameworks, models, and prompts rests on this single 1947 invention.

## Still in use today

The transistor is legacy-accepted, but in a specific sense. The discrete, individually packaged transistor that you can hold is now a legacy part. Hobbyists, power supplies, audio gear, and radio equipment still use single transistors for amplification and switching. Engineers still reach for them in analog and high-power circuits where one strong device is the right tool.

The original point-contact transistor that Bardeen and Brattain built is obsolete. It was fragile and hard to manufacture. Shockley's junction transistor replaced it quickly, and the field-effect transistor, especially the MOSFET, later became the dominant type for digital chips.

The transistor as a concept is not legacy at all. It is the most manufactured object in human history. Trillions are produced every year, almost all of them etched microscopically into silicon chips rather than packaged alone. The component you can hold has faded, but the switch it embodies sits at the heart of every phone, server, and AI system on Earth. It persists because nothing better has arrived to do the same job.

## Further reading

- [IT History Timeline](/explore/it-timeline/): where the transistor sits in the wider story of computing hardware.
- [AI Learning Galaxy](/explore/galaxy/): explore how hardware progress connects to modern AI concepts.
- [The integrated circuit](/history/integrated-circuit/): how engineers packed many transistors onto one chip.
- [Moore's law](/history/moores-law/): the trend in transistor scaling that powered decades of computing growth.
- [Transistor (Wikipedia)](https://en.wikipedia.org/wiki/Transistor): detailed history, types, and physics of the device.
- [Nokia Bell Labs: the transistor](https://www.nokia.com/bell-labs/about/history/): primary history of the 1947 invention from the lab where it happened.
- [Computer History Museum: the transistor](https://www.computerhistory.org/siliconengine/the-invention-of-the-transistor/): the invention's place in semiconductor history.
