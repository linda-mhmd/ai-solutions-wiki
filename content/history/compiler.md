---
title: "First compiler (Grace Hopper's A-0)"
description: "The A-0 system Grace Hopper wrote for UNIVAC I in 1951 to 1952, an early translator that turned symbolic code into machine code and seeded the whole idea of automatic programming."
date: 2026-06-23
categories: [History]
tags: [computing-history, compiler, grace-hopper, univac, automatic-programming, milestone]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/univac
  - history/fortran
  - history/cobol
faqs:
  - question: "Was the A-0 a compiler in the modern sense?"
    answer: "Not quite. The A-0 system translated short symbolic call numbers into machine code by pulling pre-written routines from tape and stitching them together. That work is closer to a loader and linker than to a modern compiler, which parses a full programming language. Hopper used the word compiler because the program compiled, meaning it gathered and assembled, existing routines into one runnable whole."
  - question: "Who was Grace Hopper?"
    answer: "Grace Hopper was an American mathematician and US Navy officer who became a pioneer of software. She worked on the Harvard Mark I during the war, then joined the team behind UNIVAC. She wrote the A-0 system, argued for human-readable programming languages, and helped shape COBOL. She rose to rear admiral and is one of the most influential figures in early computing."
  - question: "Why does the A-0 matter if it was not a full compiler?"
    answer: "It proved a radical idea: a computer could write part of its own machine code. Before the A-0, people hand-coded every instruction. Hopper showed the machine could assemble routines automatically from symbolic shorthand. That principle led straight to FORTRAN, COBOL and every compiler and interpreter in use today."
---

The A-0 system, written by Grace Hopper for the UNIVAC I in 1951 to 1952, was one of the first programs that translated symbolic code into machine code a computer could run. It worked more like a loader and linker than a modern compiler, pulling pre-written routines from tape and joining them. The A-0 launched the idea of automatic programming, where the machine helps write its own instructions.

<figure class="bz-figure">
  <img src="/img/timeline/compiler.jpg" alt="Photograph of Grace Hopper" loading="lazy">
  <figcaption>Photograph of Grace Hopper. Public domain · James S. Davis · <a href="https://commons.wikimedia.org/wiki/File:Commodore_Grace_M._Hopper,_USN_(covered)_head_and_shoulders_crop.jpg" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

Grace Hopper worked on the team building the UNIVAC I, the first commercial computer in the US. Programmers of that era hand-coded every instruction in raw machine code. They also copied common routines, such as square root or printing, by hand into each new program. The work was slow and full of small copying errors.

Hopper noticed she kept reusing the same subroutines. Her idea was to store them on tape, give each one a short call number, and let a program fetch and assemble them on demand.

The A-0 system did exactly that. A programmer wrote a sequence of call numbers and arguments. The A-0 read this list, found each routine on the tape, adjusted its memory addresses, and wrote out one complete machine-code program ready to run.

A useful analogy is a recipe that references a cookbook. Instead of writing out how to make pastry every time, you write "see pastry, page 12". The A-0 acts as the kitchen assistant who fetches each referenced recipe, copies it in the right order, and hands you one finished method to cook from.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Write call numbers</span><span class="bz-flow-step-desc">The programmer lists short symbolic codes and arguments, not raw machine code.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Fetch routines</span><span class="bz-flow-step-desc">A-0 reads each code and pulls the matching subroutine from a tape library.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Adjust and link</span><span class="bz-flow-step-desc">A-0 fixes memory addresses so the routines fit together correctly.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Output a program</span><span class="bz-flow-step-desc">It writes one complete machine-code program that UNIVAC can run directly.</span></div>
</div>

Hopper called this program a compiler because it compiled, in the older sense of gathering and assembling. Today we would call that work linking and loading. A modern compiler parses a full programming language and generates fresh machine code. The A-0 mostly stitched together routines that already existed. Later versions, A-1 and A-2, refined the system, and A-2 reached real users.

## Why it mattered

Before the A-0, many people believed programming had to be done by hand in machine code. The prevailing view held that only a human could decide the exact instructions. Hopper challenged that directly.

She described the approach in her 1952 ACM paper, often known by the phrase "The Education of a Computer". The paper argued that a computer could take over much of the routine, error-prone work of producing its own code. This was the birth of automatic programming as a named field.

The practical gain was real. Programmers stopped recopying routines by hand. They reused tested code with a short reference, which cut both effort and bugs. The machine handled the tedious bookkeeping of addresses.

The bigger gain was conceptual. The A-0 proved a computer could process a higher-level description and turn it into runnable code. That single proof opened the door to programming languages. Within a few years it led to [FORTRAN](/history/fortran/) for science and [COBOL](/history/cobol/) for business, both of which Hopper influenced.

## How it connects to AI today

Every programming language you use rests on the idea the A-0 demonstrated: a program can translate human-friendly instructions into machine code. Python, JavaScript, Rust and Go all ship with a compiler or interpreter that does a far more advanced version of Hopper's job. The chain of translation runs unbroken from the A-0 to the tools open on your screen.

A builder meets this lineage every day. When you run `npm run build`, a compiler turns your source into runnable output. When you import a library, you reuse tested code through a short reference, the exact pattern Hopper invented with her tape routines and call numbers. Package managers, linkers and build systems are direct descendants of the A-0 system.

For AI, the connection runs deeper than tooling. Modern AI coding assistants take a high-level description, often plain English, and produce working code. That is automatic programming taken to a new layer. Hopper translated symbolic shorthand into machine code; a large language model translates intent into source code. The ambition is the same, raise the level of abstraction so humans describe what they want and the machine handles the detail.

The compiler itself stays central to AI. Frameworks like PyTorch and TensorFlow include compilers that turn model code into optimised instructions for a GPU or specialised chip. Tools such as XLA and torch.compile rewrite a neural network into fast low-level operations. Hopper's principle of automatic translation now powers the hardware AI runs on.

## Still in use today

The A-0 system itself is a historical milestone, not a running product. UNIVAC I hardware is long retired, and no one runs the original A-0 for real work. Its lifecycle is legacy-accepted: the specific program is gone, but its core idea is foundational and universally adopted.

What replaced it is the entire modern toolchain. Compilers grew far beyond the A-0, gaining real language parsing, type checking and aggressive optimisation. The terms Hopper helped popularise, compiler and automatic programming, are now everyday vocabulary in software. The separate steps her system blended, compiling, linking and loading, became distinct, well-studied stages.

The idea persists because it solved a problem that never went away. Humans think in high-level concepts; machines run low-level instructions. Something must bridge that gap. The A-0 was the first program to bridge it automatically, and that need is permanent. Every build pipeline, every interpreter and every AI code generator is a continuation of the work Grace Hopper started in 1951.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where the first compiler sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how early computing connects to modern AI concepts.
- [UNIVAC](/history/univac/): the commercial computer the A-0 system was written for.
- [FORTRAN](/history/fortran/): the influential high-level language and compiler that followed the A-0.
- [Grace Hopper on Wikipedia](https://en.wikipedia.org/wiki/Grace_Hopper): the life and work of the computer scientist who built the A-0 system.
- [History of compiler construction on Wikipedia](https://en.wikipedia.org/wiki/History_of_compiler_construction): the wider development of compilers from the A-0 onward.
