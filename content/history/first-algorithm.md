---
title: "Ada Lovelace's Algorithm (Note G)"
description: "The 1843 step-by-step table that computes Bernoulli numbers on Babbage's Analytical Engine, widely regarded as the first published algorithm written for a machine."
date: 2026-06-23
categories: [History]
tags: [ada-lovelace, algorithm, analytical-engine, bernoulli-numbers, programming-history, milestone]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/analytical-engine
  - history/jacquard-loom
  - history/punched-cards
faqs:
  - question: "Did Ada Lovelace write the first computer program?"
    answer: "Note G is the first published algorithm designed to be carried out by a machine. The Analytical Engine was never built, so the program never ran in her lifetime. Many historians still credit it as the earliest example of machine-targeted programming."
  - question: "What does Note G actually compute?"
    answer: "It computes Bernoulli numbers, a sequence used in number theory and calculus. Lovelace chose them because they need loops and repeated operations, which showed the engine could do more than fixed arithmetic."
  - question: "Did Ada Lovelace invent the algorithm or Charles Babbage?"
    answer: "Babbage designed the Analytical Engine and worked on its operations. Lovelace wrote and published the detailed Note G table with its loop structure, and added notes on the machine's wider potential. Authorship is debated, but the published work appears under her annotations."
---

In 1843 Ada Lovelace published Note G, a detailed table of operations that computes Bernoulli numbers on Charles Babbage's proposed Analytical Engine. The table uses variables, repeated steps, and a loop, the same building blocks every program uses today. It is widely regarded as the first published algorithm written to be executed by a machine.

<figure class="bz-figure">
  <img src="/img/timeline/first-algorithm.png" alt="Portrait of Ada Lovelace" loading="lazy">
  <figcaption>Portrait of Ada Lovelace. Public domain · Antoine Claudet · <a href="https://commons.wikimedia.org/wiki/File:Ada_Lovelace_daguerreotype_by_Antoine_Claudet_1843_-_cropped.png" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

Note G is the seventh and longest of the notes Lovelace added to her English translation of an 1842 French paper by Luigi Menabrea. Menabrea described Babbage's Analytical Engine, a mechanical general-purpose computer that read instructions from punched cards. Lovelace translated the paper, then added her own notes, lettered A to G, that ran longer than the original text.

The Analytical Engine never existed as a working machine. It lived as designs, drawings, and ideas. Yet Lovelace treated it as real and asked a practical question: how would you make it compute something hard?

Her answer was a table. Each row is one operation. The columns track which variables hold which values, which registers change, and what the running result is. The algorithm computes Bernoulli numbers, a sequence that appears across number theory and calculus.

The clever part is repetition. Rather than write out every step by hand, the table loops back over a set of operations to generate each number in turn. Think of a knitting pattern. You do not write "knit one, purl one" thousands of times. You write the short repeat and the instruction "repeat to the end of the row." Note G captures that same idea for arithmetic.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Load inputs</span><span class="bz-flow-step-desc">Place starting values into numbered variables in the engine's store.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Operate</span><span class="bz-flow-step-desc">Run a fixed block of multiply, divide, add, and subtract steps.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Loop</span><span class="bz-flow-step-desc">Return to the start of the block to compute the next term in the series.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Output</span><span class="bz-flow-step-desc">Read out the computed Bernoulli number once the loop completes.</span></div>
</div>

## Why it mattered

Most of Babbage's contemporaries saw a fancy calculator. They imagined a machine that crunched numbers and printed tables, useful but narrow. Lovelace saw further.

In her notes she argued the engine could act on any symbols, not numbers alone, as long as the relationships between those symbols followed clear rules. She wrote that it might one day compose music or manipulate other abstract content. This is the core idea of general-purpose computing, stated more than a century before electronic computers arrived.

Note G turned that vision into something concrete. It showed an exact procedure, written down in advance, that the machine could follow without further human thought. That separation of the method from the hardware is the essence of software.

She also reasoned about limits. In the same notes she observed that the engine has no power to originate anything, that it can do only what we know how to order it to perform. This caution against overstating machine intelligence still reads as sharp and modern.

## How it connects to AI today

Note G is the seed of everything a programmer does now. The structure it pioneered, a sequence of operations with variables and a loop, is the structure of every modern algorithm. When you write a `for` loop in Python to process a dataset, you write a direct descendant of Lovelace's table.

The deeper link is the idea of an algorithm as a precise, repeatable recipe a machine can execute. Modern AI rests entirely on this. A neural network trains by running a loop, gradient descent, over millions of examples, adjusting weights through repeated arithmetic. That training loop is conceptually the same kind of object Lovelace laid out: a fixed block of operations applied again and again over data.

A builder meets this idea every day. The Bernoulli numbers Lovelace computed still appear in numerical libraries and the Taylor series approximations behind many math functions. More broadly, every machine learning pipeline is an algorithm: load data, transform it, repeat, output a result. Frameworks like PyTorch and TensorFlow are vast collections of such procedures.

Her warning matters too. The debate over what large language models can and cannot originate echoes the question she raised in 1843. A model follows learned statistical procedures over its training data. Understanding that an AI system runs an algorithm, rather than thinks freely, helps you set realistic expectations and design honest products.

## Still in use today

Note G itself is a milestone, not a living tool. The Analytical Engine was never built, so the program never ran on its intended machine. The document survives as a historical artifact, studied in computer science and history of science courses.

The ideas inside it are very much active. The concept of a stored procedure with loops and variables underpins every programming language in use. Bernoulli numbers remain a standard topic in mathematics and live inside numerical software.

Nothing replaced Note G because the concept it introduced never went out of date. It was refined and formalised. Alan Turing gave algorithms a rigorous mathematical model in the 1930s. The first compilers and high-level languages of the 1950s made writing them practical. Today billions of algorithms run every second across the world's computers.

Lovelace is honoured each year on Ada Lovelace Day, and the Ada programming language carries her name. Both keep the milestone in public memory.

## Further reading

- [IT History Timeline](/explore/it-timeline/): where Note G sits in the wider story of computing milestones.
- [AI Learning Galaxy](/explore/galaxy/): explore how early computing ideas connect to modern AI topics.
- [The Analytical Engine](/history/analytical-engine/): the machine Lovelace wrote her algorithm for.
- [Jacquard Loom](/history/jacquard-loom/): the punched-card weaving machine that inspired the engine's instruction cards.
- [Ada Lovelace on Wikipedia](https://en.wikipedia.org/wiki/Ada_Lovelace): biography and detailed account of her work on the notes.
- [Note G and the Bernoulli numbers algorithm](https://en.wikipedia.org/wiki/Note_G): the specific note, its table, and its historical interpretation.
- [Menabrea's Sketch with Lovelace's notes (full text)](https://www.fourmilab.ch/babbage/sketch.html): the complete 1843 translation and annotations online.
