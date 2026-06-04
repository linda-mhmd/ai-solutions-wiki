---
title: "What is a Computer?"
description: "A computer is a machine that follows instructions. Understanding this one idea explains everything that comes after."
date: 2026-05-24
level: 0
categories: [Basics]
tags: [beginner, computer, hardware]
youtube_id: "O5nskjZ_GoI"
youtube_title: "Early Computing: Crash Course Computer Science #1"
youtube_channel: "Crash Course"
docs: "https://cs50.harvard.edu/x/"
docs_label: "CS50, Harvard's free intro to computer science"
faqs:
  - question: "Is a smartphone a computer?"
    answer: "Yes. A smartphone contains a CPU, RAM, storage, and an operating system, the same components as a laptop, just smaller and more power-efficient. Everything in this article applies equally to your phone."
  - question: "What is the difference between RAM and storage?"
    answer: "RAM is short-term working memory, it holds whatever is currently open and running. It is fast but clears when you restart. Storage (SSD or hard drive) is long-term memory, it holds your files and apps permanently. Think of RAM as your desk and storage as your filing cabinet."
  - question: "What is an operating system?"
    answer: "An operating system (Windows, macOS, Linux, iOS, Android) is the software layer between you and the hardware. It manages the CPU, memory, files, and devices, and lets other software run on top of it. Without an OS, every app would need to control the hardware directly, which would be chaos."
last_updated: 2026-05-30
---

{{< quickanswer >}}
A computer is a machine that takes in information, follows a set of instructions to process it, and produces a result. Everything from your phone to a server running Netflix is doing exactly this, just at different speeds and scales.
{{< /quickanswer >}}

## The one idea that explains everything

Forget the hardware for a moment. The single most important thing to understand about a computer is: **it does exactly what it is told, nothing more and nothing less**.

This sounds obvious, but it has a huge implication. Computers are not smart. They are extraordinarily fast at following instructions. When something goes wrong, when an app crashes or a website goes down, it is never because the computer decided to do something unexpected. It is because the instructions it received had a problem, or the situation was one the instructions did not cover.

This is why programming exists. Programming is the act of writing those instructions precisely.

## What is inside a computer?

You do not need to memorise the hardware, but knowing the parts exist helps you understand everything else.

**CPU (Central Processing Unit)**, the brain. It reads and executes instructions, one after another, billions of times per second. Every decision a computer makes, show this image, sort this list, send this data, is ultimately a sequence of CPU instructions. [More: How CPUs work, Wikipedia](https://en.wikipedia.org/wiki/Central_processing_unit)

**RAM (Random Access Memory)**, short-term working memory. When you open an app, it loads into RAM so the CPU can access it quickly. RAM is fast but volatile: everything in it disappears when you restart. A phone with 8GB of RAM can hold more open apps than one with 4GB before it starts slowing down.

**Storage (SSD or hard drive)**, long-term memory. Your files, operating system, and installed apps live here and survive restarts. SSDs (Solid State Drives) are far faster than older hard drives and are now standard in most devices.

**GPU (Graphics Processing Unit)**, originally designed to render images quickly by doing many calculations simultaneously. GPUs are now also the hardware used to train and run AI models, because machine learning involves massive amounts of parallel arithmetic, exactly what GPUs are built for. [More: GPU computing, Wikipedia](https://en.wikipedia.org/wiki/Graphics_processing_unit)

**Operating System (Windows, macOS, Linux, iOS, Android)**, the software layer that manages hardware and lets apps run on top. Without it, every app would need to control the CPU and memory directly. The OS handles all of that so apps don't have to. [More: What is an OS, Wikipedia](https://en.wikipedia.org/wiki/Operating_system)

<div class="bz-diagram">
<div class="bz-diagram-label">Computer architecture: layered view</div>
<div class="bz-diagram-body">
<div class="bz-arch">
<div class="bz-arch-layer">
  <span class="bz-arch-layer-label">Your apps</span>
  <div class="bz-arch-layer-content">
    <span class="bz-arch-chip">Browser</span>
    <span class="bz-arch-chip">Slack</span>
    <span class="bz-arch-chip">VS Code</span>
    <span class="bz-arch-chip-note">→ the software you actually interact with</span>
  </div>
</div>
<div class="bz-arch-layer">
  <span class="bz-arch-layer-label">OS</span>
  <div class="bz-arch-layer-content">
    <span class="bz-arch-chip">Windows</span>
    <span class="bz-arch-chip">macOS</span>
    <span class="bz-arch-chip">Linux</span>
    <span class="bz-arch-chip-note">→ manages hardware, schedules CPU time, handles files and network</span>
  </div>
</div>
<div class="bz-arch-layer">
  <span class="bz-arch-layer-label">Compute</span>
  <div class="bz-arch-layer-content">
    <span class="bz-arch-chip">CPU</span>
    <span class="bz-arch-chip">GPU</span>
    <span class="bz-arch-chip-note">→ executes instructions; GPU runs parallel workloads (graphics, AI)</span>
  </div>
</div>
<div class="bz-arch-layer">
  <span class="bz-arch-layer-label">Memory</span>
  <div class="bz-arch-layer-content">
    <span class="bz-arch-chip">RAM (fast, volatile)</span>
    <span class="bz-arch-chip">SSD / HDD (slow, persistent)</span>
    <span class="bz-arch-chip-note">→ RAM holds what's running; storage holds everything else</span>
  </div>
</div>
</div>
</div>
</div>

<figure class="bz-figure">
<img src="/img/dark-cherry/gears-mechanism.png" alt="Dark industrial gears interlocked under red light: four components working in coordinated sequence to produce output." loading="lazy">
<figcaption>CPU, RAM, storage, and operating system. Four interlocking components. Remove any one and the machine stops. Each transforms input from the previous and passes it forward.</figcaption>
</figure>

## How a computer understands anything: bits and bytes

At the lowest level, a computer understands only two states: on and off, represented as 1 and 0. Every piece of data, a number, a letter, an image, a song, is stored and processed as a sequence of these binary digits, called **bits**.

Eight bits make a **byte**. A byte can represent 256 different values (2⁸). Files are measured in kilobytes (thousands of bytes), megabytes (millions), gigabytes (billions), and terabytes (trillions). A high-resolution photo is a few megabytes. A feature-length film is several gigabytes.

How does a letter become bits? The ASCII and Unicode standards define a mapping. The letter `A` is the number 65 in decimal, which is `01000001` in 8-bit binary. Every character you type is a number. Every number is a pattern of bits. This is why text files have sizes: more characters, more bytes.

<div class="bz-diagram">
<div class="bz-diagram-label">From letter to bits: encoding the character "A"</div>
<div class="bz-diagram-body">
<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Human text</span>
    <span class="bz-flow-step-name">"A"</span>
    <span class="bz-flow-step-desc">What you type</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Unicode/ASCII</span>
    <span class="bz-flow-step-name">65</span>
    <span class="bz-flow-step-desc">U+0041 decimal</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Binary (8 bits)</span>
    <span class="bz-flow-step-name">01000001</span>
    <span class="bz-flow-step-desc">What the CPU stores</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Electrical</span>
    <span class="bz-flow-step-name">off·on·off·off·off·off·off·on</span>
    <span class="bz-flow-step-desc">Transistor states in silicon</span>
  </div>
</div>
</div>
</div>

You never work with bits directly, programming languages and operating systems handle all of that. But understanding that everything is ultimately binary helps explain why computers are precise (there is no "sort of" in binary) and why they can fail in unexpected ways (edge cases that no one anticipated).

## Software vs hardware

**Hardware** is the physical machine: the chip, the screen, the battery.

**Software** is the instructions: the operating system, the apps, the code you write.

The same hardware can run completely different software. The chip in a MacBook is not inherently "creative" or "good for design", it runs exactly what software tells it to run. This is why software updates can make a device faster or more capable without physically changing anything.

## Why GPUs matter for AI right now

AI models, including large language models like Claude and GPT, require enormous amounts of matrix multiplication during training (building the model) and inference (running it). GPUs excel at this. A modern AI training run might use thousands of GPUs running in parallel for weeks. This is why companies like NVIDIA became central to the AI boom: they make the hardware that runs the computation.

## Computers are everywhere

When people say "computer" they usually picture a laptop. But the same concept applies to:

- Your phone (a powerful computer that also makes calls)
- A cloud server (a computer in a data centre you rent by the hour)
- A smart TV, a car's engine management system, a bank's transaction processor
- IoT sensors, manufacturing robots, medical devices

They all take input, process it according to instructions, and produce output. Scale and purpose differ. The principle is identical.

## Why this matters for building things

If you want to build software, even a simple prototype using AI tools, you are creating instructions for a computer to follow. The more clearly you can think about what you want to happen step by step, the more precisely you can describe it to an AI coding assistant, a developer, or a no-code platform.

When something breaks, thinking "which instruction failed?" is more useful than thinking "the computer stopped working."

## Further reading

- [CS50, Harvard's free introduction to computer science](https://cs50.harvard.edu/x/), covers computers, code, data structures, and web from the ground up
- [How computers work, Khan Academy](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:computers), short interactive lessons
- [How computers work, BBC Bitesize](https://www.bbc.co.uk/bitesize/guides/z26rcdm/revision/1)
- [Computerphile on YouTube](https://www.youtube.com/@Computerphile), deep dives on computer science topics by University of Nottingham academics
- [Crash Course Computer Science full playlist](https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo), 40 episodes covering everything from binary to machine learning

## What's next

Next: [What is the Internet?](/basics/what-is-the-internet/), how computers talk to each other across the world.
