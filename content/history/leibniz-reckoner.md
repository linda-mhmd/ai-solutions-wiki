---
title: "Leibniz Step Reckoner"
description: "The first mechanical calculator able to add, subtract, multiply, and divide, built around Leibniz's stepped drum and a movable carriage."
date: 2026-06-23
categories: [History]
tags: [history, calculator, leibniz, mechanical-computing, arithmetic, milestone]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/pascaline
  - history/abacus
  - history/analytical-engine
faqs:
  - question: "What made the Step Reckoner different from the Pascaline?"
    answer: "Blaise Pascal's Pascaline could add and subtract. The Step Reckoner added multiplication and division through repeated, automated steps. It was the first machine to handle all four basic arithmetic operations in one design."
  - question: "Did the Step Reckoner actually work reliably?"
    answer: "The design was sound, but the carry mechanism was hard to build with the metalwork of the 1670s. Surviving machines jam during some carry operations. The stepped drum idea itself proved durable and reliable for centuries."
  - question: "Why does a 17th-century calculator matter for AI?"
    answer: "It established that arithmetic can be broken into repeatable mechanical steps. Modern processors and AI accelerators still execute breakdowns of complex math into many small, identical operations. The Step Reckoner is an early ancestor of that idea."
---

The Leibniz Step Reckoner was a mechanical calculator designed by Gottfried Wilhelm Leibniz from around 1672. It was the first machine able to add, subtract, multiply, and divide, using a clever component called the stepped drum and a movable carriage. The design influenced calculator engineering for over two hundred years.

<figure class="bz-figure">
  <img src="/img/timeline/leibniz-reckoner.jpg" alt="Portrait of Gottfried Wilhelm Leibniz" loading="lazy">
  <figcaption>Portrait of Gottfried Wilhelm Leibniz. Public domain · Christoph Bernhard Francke · <a href="https://commons.wikimedia.org/wiki/File:Christoph_Bernhard_Francke_-_Bildnis_des_Philosophen_Leibniz_(ca._1695).jpg" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

The Step Reckoner is a brass and steel box, roughly the size of a large book, with dials, a crank, and a sliding carriage. You set a number on the input dials, then turn the crank. Each turn feeds that number into a result register. To multiply, you crank repeatedly. To handle bigger place values, you shift the carriage left or right.

The heart of the machine is the stepped drum, also called the Leibniz wheel. It is a cylinder with nine teeth of increasing length along its surface. As a gear moves across the drum, it meshes with more or fewer teeth depending on the digit selected. This translates a digit from 0 to 9 into a precise amount of rotation.

Think of it like a music box with a pinned cylinder. The cylinder is fixed, but where you place the comb decides how many pins it catches. Leibniz used the same principle to encode numbers as mechanical motion.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Set the digits</span><span class="bz-flow-step-desc">Dial in the number on the input wheels.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Turn the crank</span><span class="bz-flow-step-desc">The stepped drum rotates the result gears by the chosen amount.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Shift the carriage</span><span class="bz-flow-step-desc">Move to the next place value for tens, hundreds, and beyond.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Read the register</span><span class="bz-flow-step-desc">The result accumulates across repeated cranks.</span></div>
</div>

Leibniz presented a wooden model to the Royal Society in London in 1673. He kept refining the metal versions and completed working brass machines by around 1694. He built only a small number, and they were costly experimental devices, not products for sale.

## Why it mattered

Before the Step Reckoner, machine calculation stopped at addition and subtraction. Blaise Pascal's Pascaline, built in the 1640s, could not multiply or divide on its own. Leibniz turned multiplication into a series of repeated additions driven by the crank, and division into repeated subtractions. One mechanism now covered all four operations.

This was a conceptual leap. Leibniz showed that complex arithmetic decomposes into many small, identical, repeatable actions a machine can perform. He famously argued that it was beneath the dignity of skilled people to lose hours on routine calculation that a machine could do.

The stepped drum proved to be the more lasting contribution. The carry mechanism in his machine was fragile, and the metalworking of the era could not make it fully reliable. But the drum itself was robust. Engineers reused it for nearly three centuries, most famously in the Thomas Arithmometer, the first commercially successful calculator, from the 1850s onward.

## How it connects to AI today

The Step Reckoner's core idea sits underneath every computer and AI system you use. Hard arithmetic gets broken into a stream of small, uniform operations that a machine repeats at speed. Leibniz did this with a crank and a drum. A modern processor does it with billions of transistors per second.

That decomposition is exactly how AI hardware works. Training and running a neural network reduces to enormous numbers of multiply-and-add operations, the same multiply-then-accumulate pattern the Step Reckoner performed by cranking and shifting. Graphics processors and AI accelerators are built around dedicated multiply-accumulate units that do nothing but repeat this step in parallel, by the trillion. When you call a model API and tokens stream back, you are paying for staggering volumes of that single operation Leibniz first mechanised.

Leibniz left a second, deeper legacy. He developed binary arithmetic, representing all numbers with only 0 and 1. He saw it as a way to make calculation as simple as possible for a machine. Centuries later, binary became the language of every digital computer and every AI model. The weights inside a large language model are stored and multiplied as binary numbers. So a builder today meets Leibniz twice over: in the multiply-accumulate hardware that runs models, and in the binary representation that stores them.

You can trace this line from the [stepped drum to digital logic to modern AI](/explore/it-timeline/) and see the wider map on the [AI Learning Galaxy](/explore/galaxy/).

## Still in use today

The Step Reckoner itself is a milestone, not a living product. Only a handful were ever made, and surviving examples sit in museums, including one held in Hanover, Germany. As a physical device, it is firmly historical.

Its ideas, by contrast, are very much alive. The stepped drum stayed in active commercial use in mechanical calculators well into the 20th century, until electronic calculators replaced them in the 1970s. The principle that endures is the one Leibniz proved: any arithmetic can be reduced to repeated simple steps. Binary representation, which he championed, became the foundation of all digital computing.

So the machine is retired, but its logic runs in every device around you. The Step Reckoner marks the moment mechanical computation grew from a single adding aid into a general arithmetic engine, the direct ancestor of the calculator, the computer, and the AI accelerator.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where the Step Reckoner sits between the abacus and the digital computer.
- [AI Learning Galaxy](/explore/galaxy/): explore how early calculation connects to modern AI tools.
- [The Pascaline](/history/pascaline/): the adding machine that the Step Reckoner extended to all four operations.
- [The Abacus](/history/abacus/): the manual calculating tool that mechanical calculators eventually surpassed.
- [Gottfried Wilhelm Leibniz, Step Reckoner (Wikipedia)](https://en.wikipedia.org/wiki/Step_reckoner): detailed history, mechanism, and surviving examples.
- [Leibniz, "Explanation of Binary Arithmetic" (1703)](https://www.leibniz-translations.com/binary.htm): Leibniz's own account of the binary system now used by every computer.
