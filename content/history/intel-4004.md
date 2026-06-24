---
title: "Intel 4004 Microprocessor"
description: "The first commercial general-purpose programmable microprocessor, a complete 4-bit CPU on one chip, announced by Intel in 1971 and the ancestor of every processor used today."
date: 2026-06-23
categories: [History]
tags: [intel-4004, microprocessor, cpu, hardware, computing-history, semiconductors, chips]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/integrated-circuit
  - history/transistor
  - history/moores-law
faqs:
  - question: "What was the Intel 4004 and why was it important?"
    answer: "The Intel 4004 was the first commercial general-purpose programmable microprocessor. Intel announced it on 15 November 1971. It packed a complete 4-bit central processing unit onto a single chip. Earlier computers needed many separate components for the same job. By putting the whole processor on one piece of silicon, Intel made computing power cheap, small, and reprogrammable. That idea grew into every CPU we use today."
  - question: "Who designed the Intel 4004?"
    answer: "The 4004 came from a project between Intel and the Japanese calculator company Busicom. Federico Faggin led the chip design and made the single-chip layout work. Marcian Hoff proposed the general-purpose architecture, and Stanley Mazor helped define it. Masatoshi Shima of Busicom contributed the original calculator logic and worked closely on the design. The team turned a calculator order into a programmable processor."
  - question: "How powerful was the Intel 4004 compared with a modern chip?"
    answer: "The 4004 held about 2,300 transistors and processed 4 bits at a time. It ran at a clock speed measured in hundreds of kilohertz. A modern processor or AI accelerator holds tens of billions of transistors and runs at billions of cycles per second. The 4004 looks tiny now, but it proved the single-chip processor was possible. Every later chip followed that path."
---

The Intel 4004 was the first commercial general-purpose programmable microprocessor. Intel announced it on 15 November 1971 after a project with the Japanese calculator firm Busicom. It packed a whole 4-bit central processing unit onto a single chip. It was built for a calculator, yet designed to be reprogrammed for other tasks. That choice made it the ancestor of every processor in use today.

<figure class="bz-figure">
  <img src="/img/timeline/intel-4004.jpg" alt="The Intel 4004 microprocessor" loading="lazy">
  <figcaption>The Intel 4004 microprocessor. CC BY-SA 4.0 · Thomas Nguyen · <a href="https://commons.wikimedia.org/wiki/File:Intel_C4004.jpg" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

A microprocessor is a complete central processing unit on one chip. The central processing unit, or CPU, is the part of a computer that fetches instructions, does arithmetic, and decides what happens next. Before 1971, that work spread across many separate chips and circuit boards. The 4004 put it all in one small package.

The 4004 worked with 4 bits at a time. A bit is a single 1 or 0. Four bits hold a number from 0 to 15, enough for one decimal digit. The chip read program instructions from memory, ran them in order, and did simple sums and logic. It held roughly 2,300 transistors and ran at a clock speed of several hundred kilohertz.

Think of an orchestra. Before the 4004, you needed a separate musician for every part, each on its own stand, wired together by hand. The 4004 shrank the whole ensemble into one tiny conductor that read a written score. Change the score, and the same chip played a different tune. That reprogrammable score is what made it general-purpose.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Fetch</span><span class="bz-flow-step-desc">The chip reads the next instruction from program memory.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Decode</span><span class="bz-flow-step-desc">Internal logic works out which operation the instruction means.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Execute</span><span class="bz-flow-step-desc">The arithmetic unit adds, compares, or moves 4-bit values.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Repeat</span><span class="bz-flow-step-desc">The chip moves to the next instruction and runs the loop again.</span></div>
</div>

This fetch-decode-execute loop is the heartbeat of the 4004. Every processor since, from a phone to a data-center accelerator, runs the same basic cycle.

## Why it mattered

The 4004 proved a radical idea. You could build a useful computer around one cheap chip instead of a cabinet of wired components. That cut cost, size, and power, and it opened computing to products no one had imagined.

It also separated hardware from software. The same chip could run a calculator, a cash register, or a traffic controller. You changed the program, not the wiring. This split between a fixed processor and flexible code is the foundation of the whole software industry.

Intel built on the 4004 fast. The 8-bit 8008 followed, then the 8080, which powered early personal computers. That line led to the 8086 and the x86 architecture that still runs most desktops and servers. A small calculator contract grew into a trillion-euro industry.

## How it connects to AI today

Every modern AI system rests on the idea the 4004 proved. A processor on a chip runs a program by fetching and executing instructions in a loop. Today that chip holds tens of billions of transistors, not 2,300, yet the core model is the same one Federico Faggin laid out in silicon in 1971.

The direct descendants are everywhere. The x86 line that started with the 4004 powers the servers that train and serve large language models. When you call an AI model over an API, your request lands on a fleet of CPUs descended from that family. They handle the orchestration, the networking, and the glue around the math.

The heavy AI math runs on a different but related kind of chip. Graphics processing units, or GPUs, and dedicated AI accelerators pack thousands of small processors onto one die. They are microprocessors specialised for the matrix multiplication inside a neural network. They share the 4004 lineage: cram a whole processing unit onto integrated silicon, then scale the transistor count. [Moore's Law](/history/moores-law/) named that scaling trend, and the 4004 was one of its first products.

A builder meets this heritage daily. Choose an instance type in the cloud, and you pick a count of CPU cores and a number of GPUs. Both are microprocessors. The tiny microcontrollers inside a smart sensor or an edge AI device are also direct heirs of the 4004, often still running small reprogrammable cores. The reprogrammable single chip is the unit of compute that all of modern AI is built from.

## Still in use today

The 4004 itself is a milestone, not a working product. Intel ended its production in the 1980s. Collectors and museums keep original chips, and the design is documented and celebrated, but no current system uses a literal 4004.

What replaced it never went away. The single-chip microprocessor it pioneered is the most produced kind of device in history. Billions ship every year as CPUs, microcontrollers, GPUs, and AI accelerators. The 4-bit part is obsolete, yet the concept it introduced is more central to computing now than at any point since.

So the 4004 holds a permanent place. It is the first link in an unbroken chain of processors. You will not find one in a server rack today, but everything in that rack traces its design straight back to the chip Intel shipped in 1971.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where the 4004 sits in the wider story of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how chips connect to machine learning and AI infrastructure.
- [Integrated Circuit](/history/integrated-circuit/): the technology that made it possible to put a whole CPU on one chip.
- [Moore's Law](/history/moores-law/): the scaling trend that turned 2,300 transistors into tens of billions.
- [Intel 4004 on Wikipedia](https://en.wikipedia.org/wiki/Intel_4004): detailed history, specifications, and the people behind the design.
- [Intel's official 4004 anniversary page](https://www.intel.com/content/www/us/en/history/museum-story-of-intel-4004.html): Intel's own account of the chip and its origin.
- [Computer History Museum on the microprocessor](https://www.computerhistory.org/revolution/digital-logic/12/279): primary-source context on early microprocessors.
