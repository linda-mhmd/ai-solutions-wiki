---
title: "Von Neumann Architecture (EDVAC Report)"
description: "The 1945 design that holds program instructions and data in the same memory, the stored-program idea behind almost every computer built since."
date: 2026-06-23
categories: [History]
tags: [computing-history, von-neumann, stored-program, edvac, cpu, memory, milestone]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/eniac
  - history/turing-machine
  - history/transistor
faqs:
  - question: "Did von Neumann invent the stored-program concept alone?"
    answer: "No. The First Draft of a Report on the EDVAC carried only von Neumann's name, but it grew out of work at the Moore School with J. Presper Eckert and John Mauchly, the engineers behind ENIAC. Eckert and Mauchly had already proposed storing programs in memory. Von Neumann wrote up the logical design clearly, and his name stuck to it."
  - question: "What is the von Neumann bottleneck?"
    answer: "The processor and the memory share a single connection. Instructions and data both travel down that one path, so the processor often waits for memory. This limit on throughput is called the von Neumann bottleneck. Caches, wider buses, and parallel cores are all attempts to reduce it."
  - question: "How does this differ from the Harvard architecture?"
    answer: "The Harvard architecture uses separate memories and paths for instructions and data. The von Neumann design puts both in one memory. Most general-purpose computers are von Neumann at the top level, but they borrow Harvard ideas inside the chip, such as separate instruction and data caches."
---

In June 1945, John von Neumann circulated a report that set the pattern for nearly every computer since. The design stores program instructions and data together in one read-write memory. A single control unit fetches and runs those instructions step by step. This is the stored-program concept, and it still shapes the laptop and the data centre.

<figure class="bz-figure">
  <img src="/img/timeline/von-neumann.gif" alt="Photograph of John von Neumann" loading="lazy">
  <figcaption>Photograph of John von Neumann. Attribution · LANL · <a href="https://commons.wikimedia.org/wiki/File:JohnvonNeumann-LosAlamos.gif" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

Before 1945, many machines stored their program in physical wiring or plugboards. To run a new program, an operator rewired the machine by hand, which took hours or days. ENIAC worked this way. The von Neumann design removed that barrier. It put the program inside the same memory that held the data, as numbers the machine could read and change.

The report named five logical parts. A central arithmetic unit does the maths. A central control unit reads instructions and directs the other parts. A memory holds both instructions and data. Input and output move information in and out. Each part has a clear job, and together they form a complete computer.

Think of a kitchen with one recipe card box. The box holds both recipes and the notes you scribble while cooking. A single chef reads one card, acts on it, then picks up the next. To cook a different dish, you swap cards, not rebuild the kitchen. The von Neumann machine swaps programs the same way, by changing the numbers in memory.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Fetch</span><span class="bz-flow-step-desc">The control unit reads the next instruction from memory.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Decode</span><span class="bz-flow-step-desc">It works out what the instruction means and which parts to use.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Execute</span><span class="bz-flow-step-desc">The arithmetic unit performs the operation on data from memory.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Store</span><span class="bz-flow-step-desc">The result goes back to memory, then the cycle repeats.</span></div>
</div>

This fetch-decode-execute loop is the heartbeat of the design. The control unit keeps a counter that points to the next instruction. After each step, it advances, or it jumps to a new address when the program branches.

## Why it mattered

The report set a common reference for a new field. Engineers across Britain and the United States read it and built machines around its logic. The Manchester Baby ran the first stored program in 1948. The Cambridge EDSAC followed in 1949. EDVAC itself, the machine the report described, ran in the early 1950s.

The stored-program idea made computers flexible in a way no earlier machine matched. The same hardware ran a payroll one minute and a physics simulation the next, with no rewiring. Software became a thing you write and load, not metal you bolt in place. This split between hardware and software created the entire software industry.

The report also showed the value of a clean logical model. Von Neumann described the machine in terms of its parts and their roles, not in terms of vacuum tubes. That abstraction let the same design survive as the underlying parts changed from tubes to transistors to chips.

## How it connects to AI today

The chip in your phone, your laptop, and the servers that train large language models all descend from this 1945 design. They fetch instructions, decode them, and execute them in a loop. The arithmetic unit and control unit became the modern central processing unit, the CPU. The shared memory became RAM. The stored program became every app and model you run.

A modern AI model is, at heart, numbers in memory acted on by instructions in memory. The model weights, the input tokens, and the program that multiplies them all sit in the same address space, exactly as von Neumann described. When you load a model into RAM and run inference, you are running a stored program on a stored-program machine.

The design also explains a problem builders fight today. The von Neumann bottleneck means the processor often waits for data to arrive from memory. AI workloads move enormous amounts of data, so this matters a lot. GPUs attack the problem with thousands of cores and very wide, fast memory. They are still von Neumann at the core, but tuned to feed many arithmetic units at once.

This is also why new hardware sometimes breaks the mould. Tensor cores, AI accelerators, and in-memory computing all try to shorten the path between memory and arithmetic. Each is a response to limits the 1945 report baked in. A builder meets this lineage when profiling a slow model and finding the GPU starved for data, not short of compute. That is the von Neumann bottleneck, eighty years on.

## Still in use today

The von Neumann architecture is legacy-accepted, which means it is old, proven, and still everywhere. Nothing replaced it as the default model for general-purpose computing. Almost every CPU you can buy follows it. The fetch-decode-execute cycle runs billions of times a second inside the device you are reading this on.

The design persists because it is general and well understood. One memory, one instruction stream, and clear parts make machines easy to program and reason about. Decades of compilers, operating systems, and tools assume this model. Changing it would mean rebuilding the entire software stack, so the world keeps the von Neumann foundation and optimises around its limits.

Specialised hardware does carve out exceptions. Digital signal processors and some microcontrollers use the Harvard split for speed. AI accelerators and in-memory architectures chip away at the bottleneck for narrow tasks. These coexist with von Neumann rather than retire it. For general computing, the 1945 blueprint remains the accepted standard.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where the EDVAC report sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how early computing connects to modern AI concepts.
- [ENIAC](/history/eniac/): the wired-program machine whose team developed the stored-program idea.
- [The Turing Machine](/history/turing-machine/): the theoretical model of computation behind the stored-program concept.
- [First Draft of a Report on the EDVAC on Wikipedia](https://en.wikipedia.org/wiki/First_Draft_of_a_Report_on_the_EDVAC): the 1945 document and its history.
- [Von Neumann architecture on Wikipedia](https://en.wikipedia.org/wiki/Von_Neumann_architecture): the design, its parts, and the bottleneck.
- [EDVAC on Wikipedia](https://en.wikipedia.org/wiki/EDVAC): the machine the report described and how it was built.
