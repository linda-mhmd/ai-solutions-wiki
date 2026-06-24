---
title: "C: the systems language behind Unix"
description: "A compiled, statically typed language built at Bell Labs to rewrite Unix, giving low-level memory control while staying portable across hardware."
date: 2026-06-23
categories: [History]
tags: [c, programming-languages, unix, bell-labs, systems-programming, compilers]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/compiler
  - history/fortran
  - history/cobol
faqs:
  - question: "Who created C and when?"
    answer: "Dennis Ritchie created C at Bell Labs. He evolved it from the earlier language B between 1969 and 1973, with the most creative work happening around 1972. The goal was to rewrite the Unix operating system in a portable language."
  - question: "Why is C still used today?"
    answer: "C gives direct control over memory and hardware while compiling to fast machine code. Operating systems, embedded devices, databases, and the runtimes under Python and other languages still rely on it. Few languages match its mix of speed, portability, and low-level access."
  - question: "What is the difference between C and C++?"
    answer: "C is a procedural language focused on functions and direct memory access. C++ added object-oriented features, templates, and a large standard library on top of C. Most C code compiles under a C++ compiler, but the two languages have diverged over decades."
---

C is a compiled, statically typed systems programming language that Dennis Ritchie created at Bell Labs in the early 1970s. It gives a programmer direct access to memory and hardware while staying portable across different machines. That rare combination let the Unix operating system move off one specific computer and spread everywhere, and it still shapes how computers run today.

<figure class="bz-figure"><img src="/img/obsidian-lab/server-cables-copper-notext.png" alt="A dark server rack threaded with copper braided cables, representing the low-level wiring between software and hardware that the C language exposes." loading="lazy"><figcaption>C is the layer that connects software to the metal, much like the copper cables that wire a server rack together.</figcaption></figure>

## What it was

C is a language for writing programs that talk closely to the machine. You declare variables with fixed types, group logic into functions, and a compiler turns your text into native machine code. C also lets you handle memory addresses directly through pointers, so you control exactly where data lives and how it moves.

Think of higher-level languages as a chauffeured car. You state a destination and the system handles the engine, the route, and the brakes. C is closer to driving a manual car yourself. You shift the gears and watch the fuel, which is more work, but you feel and control every part of the machine. That control is the point.

Ritchie built C while rewriting Unix. The Unix team needed a language low-level enough to write an operating system kernel, yet portable enough to move that kernel to new hardware without starting over. C grew out of an earlier Bell Labs language called B, gaining data types and structures along the way.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Write source</span><span class="bz-flow-step-desc">A programmer writes human-readable C in .c files.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Preprocess</span><span class="bz-flow-step-desc">The preprocessor expands includes and macros into one text stream.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Compile</span><span class="bz-flow-step-desc">The compiler checks types and emits machine instructions per file.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Link and run</span><span class="bz-flow-step-desc">The linker joins object files into one executable the CPU runs.</span></div>
</div>

## Why it mattered

Before C, most operating systems were written in assembly language tied to one specific processor. Moving software to a new computer meant rewriting it almost from scratch. C broke that lock. In 1973, the Unix team rewrote most of the Unix kernel in C, proving a real operating system could be written in a portable high-level language.

That portability changed the industry. Unix, and the C it was written in, spread across universities and companies on many kinds of hardware. The language stayed small and close to the machine, so it ran fast and fit on modest computers of the era.

In 1978, Brian Kernighan and Dennis Ritchie published "The C Programming Language", a short book that taught a generation how to program. The language was later standardised, first by ANSI in 1989 and then by ISO, which kept C stable and consistent across compilers and decades.

## How it connects to AI today

C sits underneath almost every system a modern AI builder touches, even when it stays out of sight. The Linux kernel that runs most cloud servers and AI training clusters is written in C. When you launch GPUs in a data centre to train a model, the operating system scheduling that work traces straight back to Ritchie's language.

The tools of AI are built on C and its direct descendant C++. NVIDIA's CUDA, the platform that runs deep learning on GPUs, exposes a C and C++ programming interface. PyTorch and TensorFlow are Python on the surface, but their fast numerical cores are compiled C and C++ for speed. CPython, the standard Python interpreter that most AI code runs on, is itself a C program. So is the underlying math library that NumPy calls.

A builder meets C most directly in three places. First, in performance-critical extensions, where a Python library wraps a C function to run hot loops at native speed. Second, in inference at the edge, where frameworks like llama.cpp run language models on laptops and phones using portable C and C++ with no heavy runtime. Third, in embedded and robotics work, where microcontrollers running C handle sensors and motors that feed data to AI models. C is also the common low-level language that newer systems languages like Rust and Go define their interfaces against.

## Still in use today

C is active and heavily maintained. The ISO standard committee continues to update it, with revisions named by year such as C11, C17, and C23. Modern compilers like GCC and Clang track these standards and run on nearly every platform in use.

Newer languages did not replace C so much as build on it or beside it. C++ extended it for large applications. Rust offers memory safety for systems work and is now used in parts of the Linux kernel alongside C. Yet C persists because nothing else matches its combination of small size, raw speed, portability, and a vast base of existing code. Operating systems, databases, network stacks, embedded firmware, and language runtimes still depend on it. For work that must touch the hardware directly and run fast, C remains a default choice more than fifty years on.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where C sits in the wider story of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how systems concepts connect to modern AI.
- [The first compiler](/history/compiler/): how source code became machine code, the idea C relies on.
- [Fortran](/history/fortran/): the earlier high-level language that showed compiled code could be practical.
- [The C Programming Language (Wikipedia)](https://en.wikipedia.org/wiki/C_(programming_language)): history, design, and standards in depth.
- [ISO/IEC 9899, the C standard](https://www.iso.org/standard/82075.html): the official specification that defines the language.
- [Dennis Ritchie, "The Development of the C Language"](https://www.bell-labs.com/usr/dmr/www/chist.html): Ritchie's own account of how C came to be.
