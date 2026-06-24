---
title: "The Turing Machine (On Computable Numbers)"
description: "Alan Turing's 1936 abstract machine that reads and writes symbols on an infinite tape and defines exactly which problems a computer can solve."
date: 2026-06-23
categories: [History]
tags: [computing-history, turing, computability, theory-of-computation, halting-problem, milestone]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/first-algorithm
  - history/analytical-engine
  - history/boolean-algebra
faqs:
  - question: "Was the Turing machine a real physical machine?"
    answer: "No. The Turing machine is a mathematical model, not hardware. Alan Turing described it on paper to reason about what computation means. He imagined an infinite tape and a simple rule table. The point was to define computability precisely, not to build a device."
  - question: "What was the Entscheidungsproblem that Turing set out to solve?"
    answer: "The Entscheidungsproblem, German for decision problem, asked for a general method to decide whether any logical statement is provable. Turing showed no such method exists. He proved some questions have no algorithm that always answers them, including the halting problem."
  - question: "What is the halting problem?"
    answer: "The halting problem asks whether a program will ever stop running on a given input. Turing proved that no single program can answer this for every possible program and input. It was the first concrete problem shown to be undecidable by any computer."
---

In 1936 Alan Turing described an abstract machine that reads and writes symbols on an infinite tape, following a finite table of rules. He used it to define exactly which problems a machine can solve. The paper laid the mathematical foundation for every computer that followed.

<figure class="bz-figure">
  <img src="/img/timeline/turing-machine.jpg" alt="Photograph of Alan Turing" loading="lazy">
  <figcaption>Photograph of Alan Turing. Public domain · Elliott & Fry · <a href="https://commons.wikimedia.org/wiki/File:Alan_turing_header.jpg" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

A Turing machine is a thought experiment, not a device. Turing imagined a strip of tape divided into cells, stretching on without limit. A read-write head sits over one cell. The machine holds an internal "state", like a mood that shapes its next move.

At each step the machine reads the symbol under the head. It checks a fixed table of rules. The matching rule tells it three things: which symbol to write, whether to move the head left or right, and which state to switch to. The machine repeats this loop until it reaches a halting state.

That short list of rules is enough to compute anything a modern computer can compute. The tape is the memory. The state table is the program. The head is the processor reading and writing data.

A useful analogy is a board game with one piece and a rulebook. The board is the tape. The rulebook says, "if you land here in this mood, write this, step that way, and change mood." Follow the book mechanically and complex behaviour emerges from tiny rules.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Read</span><span class="bz-flow-step-desc">The head reads the symbol in the current tape cell.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Look up rule</span><span class="bz-flow-step-desc">The current state plus the symbol pick one rule from the table.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Write</span><span class="bz-flow-step-desc">The rule writes a new symbol into the cell.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Move and change state</span><span class="bz-flow-step-desc">The head moves left or right, and the machine switches state, then loops or halts.</span></div>
</div>

Turing went further. He described a "universal" machine that reads a description of any other Turing machine from its tape and then imitates it. One machine could run any program. That is the core idea behind the stored-program computer.

## Why it mattered

Turing wrote the paper to answer a deep question in mathematics, the Entscheidungsproblem, German for decision problem. The German mathematician David Hilbert had asked for a mechanical method to decide whether any logical statement is provable. Turing needed a precise definition of "mechanical method" to attack the question.

His machine was that definition. With it, he proved that no general method exists. Some questions have no algorithm that always answers them. The most famous is the halting problem, which asks whether a given program will ever stop. Turing showed no program can decide this for all programs.

The same year, the American logician Alonzo Church reached a related result using a different system called the lambda calculus. The two approaches turned out to be equivalent. This equivalence is now called the Church-Turing thesis. It states that anything computable by an effective method is computable by a Turing machine.

The result drew a hard line around what computers can and cannot do. That line still holds. No faster chip and no larger model can cross it.

## How it connects to AI today

The Turing machine is the theoretical core of computer science. Every programming language, every CPU and every GPU is, in formal terms, a way to run computations that a Turing machine could also run. When engineers call a language "Turing-complete", they mean it can express any computation the machine can. Python, JavaScript and C all qualify.

The universal machine became the blueprint for the stored-program computer, where instructions live in the same memory as data. John von Neumann credited Turing's ideas when shaping that architecture in the 1940s. Your laptop and your phone are practical universal machines.

For AI, the link is direct and current. A neural network runs on hardware that is, at bottom, a universal computing machine. Training loops over data, branches on conditions and updates memory, exactly the operations Turing formalised. The reach of any model is bounded by computability. A large language model cannot solve a problem that no algorithm can solve, such as deciding the halting problem in general.

Builders meet this lineage every day. Complexity analysis, which estimates how long an algorithm runs, grows from the Turing model of step-by-step computation. When you ask whether a task is even decidable, or why a static analyser cannot catch every bug, you are using Turing's 1936 result. The undecidability of the halting problem is the reason no tool can perfectly predict whether arbitrary code will crash or loop forever.

Turing's later work also seeds modern AI culture. His 1950 paper proposed the imitation game, now called the Turing test, as a way to discuss machine intelligence. That question still frames debates about today's chatbots and assistants.

## Still in use today

The Turing machine is a living milestone. It is active and central, taught in the first weeks of any computer science degree. It is not legacy or discontinued, because it is a mathematical idea, not a product that ages.

Nobody builds Turing machines as practical hardware. They are slow and clumsy by design. Real computers use the von Neumann architecture and fast circuits instead. But as a measuring stick for what is computable, the model has no replacement and needs none.

The concepts run through working software too. Compilers, type systems and formal verification all rely on Turing's results to know their own limits. Regular expressions and parsers sit on a hierarchy of machine models that Turing's work anchors. The model persists because it captures the essence of computation in the simplest possible form, and that essence has not changed.

Alan Turing's influence reaches beyond theory. His wartime codebreaking at Bletchley Park and his 1950 thinking on machine intelligence make him a founding figure of both computing and AI. The 1936 paper is where it all begins.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where Turing's 1936 paper sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how the theory of computation connects to modern AI concepts.
- [The First Algorithm](/history/first-algorithm/): Ada Lovelace's program for Babbage's engine, a century before Turing.
- [Boolean Algebra](/history/boolean-algebra/): the logic of true and false that underpins digital computation.
- [On Computable Numbers (original 1936 paper)](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf): Turing's paper as published in the Proceedings of the London Mathematical Society.
- [Turing machine on Wikipedia](https://en.wikipedia.org/wiki/Turing_machine): the model, its variants and its role in computability theory.
- [Alan Turing at the Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/turing/): a detailed account of his life, the 1936 result and the Turing test.
