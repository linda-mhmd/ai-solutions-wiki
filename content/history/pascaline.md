---
title: "Pascaline (Pascal's Calculator)"
description: "A 1642 mechanical adding machine that used geared wheels to add and subtract with automatic carry, an early ancestor of the calculating engine."
date: 2026-06-23
categories: [History]
tags: [mechanical-computing, calculator, pascal, history, hardware, automation]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/abacus
  - history/leibniz-reckoner
  - history/analytical-engine
faqs:
  - question: "Who built the Pascaline and why?"
    answer: "Blaise Pascal designed and built it in 1642 in Rouen, France. He wanted to ease the long tax calculations his father did as a regional administrator. Pascal was a teenager at the time."
  - question: "Could the Pascaline multiply and divide?"
    answer: "Not directly. The machine added and subtracted using geared wheels. You performed multiplication and division as repeated addition or subtraction, working through the steps by hand on the dials."
  - question: "How is the Pascaline different from an abacus?"
    answer: "An abacus stores numbers as bead positions, but the human carries digits between columns. The Pascaline mechanised the carry. When one wheel passed nine, it advanced the next wheel automatically through a linked mechanism."
---

The Pascaline is a mechanical adding machine that Blaise Pascal designed and built in 1642 in Rouen, France. It used geared ten-tooth wheels to add and subtract numbers, and it propagated carries between digits automatically. It stands as one of the first calculating machines that a person could operate by turning dials rather than counting by hand.

<figure class="bz-figure">
  <img src="/img/timeline/pascaline.jpg" alt="Portrait of Blaise Pascal" loading="lazy">
  <figcaption>Portrait of Blaise Pascal. Public domain · unknown; a copy of the painting of François II Quesnel, w... · <a href="https://commons.wikimedia.org/wiki/File:Blaise_Pascal_Versailles.JPG" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

The Pascaline is a box of linked metal wheels. Each wheel shows the digits 0 through 9 and represents one decimal place: units, tens, hundreds, and so on. To add a number, you turn the right wheels with a stylus, and the result appears in a row of windows above the dials.

The clever part is the carry. When a wheel turns past 9 back to 0, a small linked lever nudges the next wheel up by one. This means a person no longer tracks carries in their head. The machine does it.

A useful analogy is a car odometer. When the units digit rolls over from 9 to 0, the tens digit clicks up by one, and the chain continues. The Pascaline applies that same idea, but a human drives the wheels to perform sums.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Set the input</span><span class="bz-flow-step-desc">Turn each digit wheel with a stylus to enter a number into the dials.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Add the next value</span><span class="bz-flow-step-desc">Advance the wheels again by the amount you want to add.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Carry propagates</span><span class="bz-flow-step-desc">Any wheel passing 9 advances the next wheel up by one automatically.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Read the result</span><span class="bz-flow-step-desc">The total appears in the row of windows above the dials.</span></div>
</div>

Subtraction used a method called nines complement, which let the same adding mechanism run backwards in effect. Multiplication and division were not built in. You performed them as repeated addition or subtraction, stepping through the operation by hand.

## Why it mattered

The Pascaline showed that arithmetic could leave the human mind and live inside a machine. Before it, calculation depended on the abacus, counting boards, or careful pen work. Pascal proved that gears and levers could enforce the rules of carrying without a person tracking them.

The machine was expensive and hard to manufacture with the metalworking of the era. Pascal built about twenty units, and roughly nine survive today in museums. It never became a commercial product. Yet it set a precedent that calculation is a mechanical process, repeatable and reliable, not a uniquely human skill.

That idea inspired others. A few decades later, Gottfried Leibniz extended the concept with a machine that could multiply and divide directly. The line of mechanical calculators that followed runs straight back to Pascal's wheels.

## How it connects to AI today

The Pascaline marks the first concrete step toward the idea that powers every computer and AI system: an operation can be defined precisely, then handed to a machine that runs it the same way every time. Modern AI is built on this assumption at enormous scale.

Three threads connect directly to today.

First, the carry mechanism is the ancestor of the adder, the most basic building block in a processor. Every time a GPU trains a neural network, it performs trillions of additions and multiplications in silicon. Those circuits do exactly what Pascal's linked wheels did, but in nanoseconds and in binary rather than decimal. The principle of automatic carry between digit positions is still alive inside every arithmetic logic unit.

Second, the Pascaline made multiplication out of repeated addition. That is precisely how matrix multiplication works inside a transformer model, the architecture behind large language models. A model multiplies and sums vast grids of numbers. The hardware reduces this to massive batches of multiply-and-add steps. Pascal's machine performed the slow, manual version of the same reduction.

Third, the Pascaline embodies the move from human computation to mechanical computation. A builder meets this lineage every time they call a library function instead of solving math by hand. When you run `numpy`, train a model, or query a vector database, you trust a machine to apply fixed rules without error. That trust began with a box of gears in 1642.

## Still in use today

The Pascaline itself is a milestone, not an active tool. No one calculates with one now. The surviving machines sit in museums such as the Musee des Arts et Metiers in Paris, where they are preserved as historical artifacts.

Its descendants, however, never stopped evolving. Mechanical calculators built on Pascal's idea stayed in offices into the twentieth century. Electronic calculators then replaced them, and the digital adder absorbed the same logic into a chip. The concept persists because the problem it solved, fast and reliable arithmetic, never went away.

So the device is legacy, but the idea is permanent. Every spreadsheet cell, every training run, and every inference pass carries forward the lesson the Pascaline first proved: machines can compute, and they can be trusted to do it.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where the Pascaline sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how early hardware connects to modern AI tools.
- [The Abacus](/history/abacus/): the counting tool that the Pascaline began to mechanise.
- [Leibniz Reckoner](/history/leibniz-reckoner/): the machine that extended Pascal's design to multiply and divide.
- [Pascal's calculator on Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_calculator): detailed history, mechanism, and surviving units.
- [Musee des Arts et Metiers collection](https://www.arts-et-metiers.net/en): the Paris museum that holds original Pascaline machines.
