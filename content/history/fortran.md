---
title: "FORTRAN (1957)"
description: "The first widely used high-level programming language, built at IBM for scientific computing, and still the workhorse behind much of today's numerical and HPC code."
date: 2026-06-23
categories: [History]
tags: [computing-history, fortran, programming-language, compiler, ibm, scientific-computing, milestone]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/eniac
  - history/von-neumann
  - history/punched-cards
faqs:
  - question: "What does FORTRAN stand for?"
    answer: "FORTRAN is short for FORmula TRANslation. The name describes the goal of the project: let scientists write mathematical formulas in a readable form, then have the compiler translate them into efficient machine code for the IBM 704. The point was to write algebra, not raw machine instructions."
  - question: "Was FORTRAN the first programming language?"
    answer: "No. Earlier systems and assemblers existed, and Plankalkül and Autocode came before. FORTRAN was the first high-level language to win wide adoption, because its compiler produced code fast enough to compete with hand-written assembly. That practical success, not pure novelty, made it a milestone."
  - question: "Is FORTRAN still used in 2026?"
    answer: "Yes. Modern Fortran, with standards through Fortran 2018 and beyond, runs weather models, climate simulations, computational fluid dynamics, and physics codes. Many high-performance computing centres still maintain large Fortran codebases. Compilers from GCC, Intel, and NVIDIA keep it alive on current hardware."
---

FORTRAN, short for FORmula TRANslation, was the first high-level programming language to reach wide use. John Backus and his team at IBM built it for the IBM 704 so scientists could write algebra-like statements instead of raw machine code. The reference manual is dated 1956, and the system shipped to customers in April 1957.

<figure class="bz-figure"><img src="/img/obsidian-lab/filing-cabinet-amber-notext.png" alt="A long bank of dark filing cabinets with one drawer open and glowing amber, suggesting a stored record pulled from a large archive. The image evokes how a FORTRAN compiler turns a written formula into the right machine instructions held in memory." loading="lazy"><figcaption>FORTRAN let a scientist file a formula in plain notation and have the compiler retrieve the exact machine code to run it.</figcaption></figure>

## What it was

Before FORTRAN, programming the IBM 704 meant writing in assembly or machine code. A programmer chose registers, tracked memory addresses, and spelled out every step. The work was slow and error-prone. Scientists who wanted to solve equations had to first become machine experts.

FORTRAN changed the unit of work. You wrote a statement like `X = (A + B) * C`, close to the algebra on paper. The compiler read that line and produced the machine instructions to compute it. The compiler is a program that translates a high-level language into the low-level code a processor runs.

Think of an architect and a builder. The architect draws plans in a clear, shared notation. The builder turns those plans into walls and pipes. FORTRAN let the scientist stay the architect and write intent. The compiler played the builder and handled the concrete machine work below.

The early Backus team cared deeply about speed. They feared that managers would reject any language that ran slower than hand-written assembly. So they put huge effort into the optimiser, the part of the compiler that arranges instructions for efficiency. The result was code that matched skilled human assembly on many tasks.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Write</span><span class="bz-flow-step-desc">A scientist writes formulas as FORTRAN statements on punched cards.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Parse</span><span class="bz-flow-step-desc">The compiler reads the cards and works out the meaning of each statement.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Optimise</span><span class="bz-flow-step-desc">It rearranges the work to produce fast, efficient machine instructions.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Run</span><span class="bz-flow-step-desc">The IBM 704 executes the generated code and returns numerical results.</span></div>
</div>

## Why it mattered

FORTRAN proved a high-level language could be practical, not a toy. Once the code ran as fast as assembly, the objection collapsed. Programmers wrote in far fewer lines, made fewer mistakes, and moved much faster. Productivity on numerical work rose sharply.

The language spread quickly across science and engineering. Physicists, aircraft designers, and chemists adopted it to model the real world. IBM ported it beyond the 704, and other vendors built their own FORTRAN compilers. A program could move between machines with limited change, which was rare at the time.

FORTRAN also seeded the idea of a language standard. The American Standards Association published FORTRAN standards starting with FORTRAN 66 in 1966. Standardisation meant a program written to the standard ran on many compilers. This made code a durable asset rather than a one-machine artifact.

The compiler itself was a landmark. Building an optimising compiler in the mid-1950s was a research achievement. It showed that machines could analyse and improve programs, a thread that runs through every compiler since.

## How it connects to AI today

FORTRAN founded the line of high-level languages that every modern developer uses. Python, the dominant language for AI, sits at the far end of the path FORTRAN opened in 1957. The core bargain is the same: write readable intent, let a translator produce machine code. A builder lives inside that bargain every day.

The deeper link runs through numerical computing. AI is, at heart, dense linear algebra: matrices multiplied billions of times. The fast numerical libraries underneath modern AI trace straight back to FORTRAN. The BLAS and LAPACK libraries, which power matrix operations, were written in Fortran and are still maintained in it. NumPy, SciPy, and the math behind PyTorch and TensorFlow call into this lineage.

So a builder meets FORTRAN without seeing it. Call `numpy.dot` or train a model on a GPU, and somewhere beneath the Python a routine descended from decades of Fortran numerical work moves the floating-point numbers. The optimised kernels that make training feasible grew from the same obsession with speed that drove the 1957 compiler.

The compiler idea connects too. A modern AI framework compiles a model graph into optimised kernels for a specific GPU, much as the FORTRAN compiler optimised for the 704. Tools like XLA and TorchInductor are optimising compilers for tensor maths. They solve the 1957 problem on new hardware: turn high-level math into fast machine code.

## Still in use today

FORTRAN is legacy-accepted. It is old, proven, and still in active service, even as newer languages dominate general programming. Nothing fully replaced it for heavy numerical work. The language evolved instead, through Fortran 90, 95, 2003, 2008, and 2018, gaining modules, arrays, and parallel features while keeping its numerical strength.

It persists for clear reasons. Decades of trusted scientific code, validated against real experiments, are written in Fortran. Rewriting that code risks introducing errors into models that governments and industry rely on. Weather forecasting, climate modelling, and computational physics still run large Fortran systems on the world's fastest supercomputers.

Current compilers keep it alive on modern hardware. GFortran ships with the GNU Compiler Collection, and Intel and NVIDIA offer Fortran compilers tuned for new chips and GPUs. New code is rarely started in Fortran outside science. Existing code, though, is maintained, extended, and run at massive scale. That is the heart of legacy-accepted: too valuable to retire, too foundational to forget.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where FORTRAN sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how early computing connects to modern AI concepts.
- [The IBM 704 and ENIAC era](/history/eniac/): the early machines that set the stage for high-level languages.
- [Von Neumann Architecture](/history/von-neumann/): the stored-program model the FORTRAN compiler targeted.
- [Fortran on Wikipedia](https://en.wikipedia.org/wiki/Fortran): the language, its history, and its modern standards.
- [The history of FORTRAN I, II, and III (Backus, ACM)](https://dl.acm.org/doi/10.1145/800025.1198345): John Backus's own account of the project's origins and goals.
- [The Netlib LAPACK library](https://www.netlib.org/lapack/): the Fortran linear algebra library beneath much of modern numerical and AI computing.
