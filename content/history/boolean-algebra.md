---
title: "Boolean Algebra"
description: "A system of algebra where variables are true or false and combine with AND, OR and NOT, the logical foundation of every digital computer."
date: 2026-06-23
categories: [History]
tags: [logic, mathematics, boolean, digital-circuits, foundations, computer-science]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/shannon-info
  - history/turing-machine
  - history/transistor
faqs:
  - question: "What is Boolean algebra in plain terms?"
    answer: "It is a branch of mathematics where every value is either true or false, written as 1 or 0. You combine values with three operations: AND, OR and NOT. The result is always another true or false value, which makes it perfect for describing logical decisions."
  - question: "Who invented Boolean algebra and when?"
    answer: "The English mathematician George Boole introduced it in The Mathematical Analysis of Logic in 1847. He developed the full system in An Investigation of the Laws of Thought in 1854. His goal was to express human reasoning using algebra."
  - question: "Why does Boolean algebra still matter for computers?"
    answer: "Every digital circuit reduces to combinations of AND, OR and NOT gates. Search filters, database queries, conditional code and chip design all rest on Boolean logic. It is one of the few 19th-century ideas still in daily use across all of computing."
---

Boolean algebra is a system of mathematics in which variables hold only two values, true and false, written as 1 and 0. George Boole created it to treat logic as a branch of algebra, not philosophy. Almost a century later, it became the language every digital computer speaks at its lowest level.

<figure class="bz-figure">
  <img src="/img/timeline/boolean-algebra.png" alt="Portrait of George Boole" loading="lazy">
  <figcaption>Portrait of George Boole. Public domain · Unknown author · <a href="https://commons.wikimedia.org/wiki/File:Portrait_of_George_Boole.png" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

Boolean algebra takes the rules of ordinary algebra and applies them to logic. Instead of numbers that can be anything, a Boolean variable holds one of two values: true or false, 1 or 0. You combine these values with three operations. AND is true only when both inputs are true. OR is true when at least one input is true. NOT flips a value to its opposite.

Think of a light controlled by two switches in a hallway. With an AND rule, the light turns on only when both switches are up. With an OR rule, either switch alone turns it on. NOT is a switch that inverts whatever it receives. Boole showed that statements like "all birds are warm-blooded" follow the same algebraic laws as these switches. Logic became something you could calculate, not argue.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Input</span><span class="bz-flow-step-name">Two values</span><span class="bz-flow-step-desc">Each variable is 1 (true) or 0 (false).</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Operate</span><span class="bz-flow-step-name">AND, OR, NOT</span><span class="bz-flow-step-desc">Combine the values using the three logic operations.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Output</span><span class="bz-flow-step-name">One value</span><span class="bz-flow-step-desc">The result is again 1 or 0, never anything between.</span></div>
</div>

## Why it mattered

In Boole's own time, the work was a milestone in mathematics and philosophy. It united logic and algebra, two fields that had stayed apart for centuries. Boole proved that reasoning had structure you could write down and manipulate with symbols. This idea influenced later logicians and helped shape the formal study of mathematics itself.

For decades the algebra stayed mostly theoretical. It lived in textbooks and university lectures, prized but not yet practical. Boole died in 1864, long before any machine could use his system. The full power of his work waited for the right technology to arrive. That technology was the electrical switch, and the connection it unlocked changed the world.

## How it connects to AI today

The bridge from logic to machines came in 1937 and 1938. Claude Shannon, then a young student, showed in his master's thesis that Boolean algebra describes the behaviour of electrical relay circuits. A switch that is on equals 1, and off equals 0. With that insight, engineers could design and simplify complex switching circuits using algebra instead of trial and error. You can follow that thread through our page on [Shannon information theory](/history/shannon-info/).

Every digital computer still rests on this foundation. Inside a processor, tiny electronic components called logic gates perform AND, OR and NOT on streams of 1s and 0s. Billions of these gates, etched onto silicon, run all of computing. The [transistor](/history/transistor/) made each gate small, fast and cheap, but the logic it performs is pure Boole.

The connection reaches modern AI directly. Neural networks run on the same Boolean hardware, since every multiplication and addition in a model reduces to gate-level logic. Builders meet Boolean algebra every day. A database query with `WHERE active = true AND region = 'EU'` is Boolean. A search filter combining tags with AND and OR is Boolean. An `if` statement in any programming language evaluates a Boolean condition. When you write a prompt rule or a tool's input check, you lean on the same true-or-false logic Boole wrote down in 1854.

## Still in use today

Boolean algebra is legacy-accepted. It is not legacy in the sense of being old and discarded. It is legacy in the sense of being so foundational that nothing has replaced it, and nothing needs to. The system is stable, complete and used at the heart of every digital device on Earth.

You find it active in three layers at once. At the bottom, chip designers use Boolean logic to lay out and optimise circuits. In the middle, programming languages give every developer Boolean operators and conditions. At the top, end users meet it through search filters, spreadsheet formulas and query builders without ever knowing the name. Nothing replaced Boolean algebra because it captured something exact and final about two-valued logic. Newer ideas, such as fuzzy logic with values between 0 and 1, extend it for special cases but build on the same base. After more than 170 years, Boole's two values remain the bedrock of the digital age.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where Boolean algebra sits among the milestones that built modern computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how foundational logic connects to machine learning and AI topics.
- [Shannon information theory](/history/shannon-info/): how Claude Shannon linked Boole's logic to electrical circuits and information.
- [The transistor](/history/transistor/): the device that turned Boolean logic gates into fast, tiny, mass-produced hardware.
- [George Boole on Wikipedia](https://en.wikipedia.org/wiki/George_Boole): biography of the mathematician who created the algebra of logic.
- [The Laws of Thought (1854), full text](https://www.gutenberg.org/ebooks/15114): Boole's own book introducing the complete system, free to read.
