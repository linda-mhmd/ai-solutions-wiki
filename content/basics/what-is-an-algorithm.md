---
title: "What is an Algorithm?"
description: "A plain-English explanation of algorithms: the step-by-step recipes that tell computers and AI exactly how to solve a problem."
date: 2026-06-23
level: 1
categories: [Basics]
tags: ["beginner", "algorithm", "computer-science", "problem-solving", "logic"]
docs: "https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/"
docs_label: "MacTutor: Al-Khwarizmi"
faqs:
  - question: "What is an algorithm in plain English?"
    answer: "An algorithm is a clear, ordered set of steps that takes some input and produces a result. A cake recipe is an algorithm: you start with ingredients, follow the steps in order, and finish with a cake. Computers run algorithms billions of times a second to sort lists, find files, and answer searches."
  - question: "Is an algorithm the same as a computer program?"
    answer: "No, but they are close. An algorithm is the idea: the logical steps to solve a problem. A program is that idea written in a specific programming language so a computer can run it. One algorithm can be turned into programs in Python, Java, or any other language. Think of the algorithm as the recipe and the program as the recipe written in one particular cookbook."
  - question: "Why do some algorithms run faster than others?"
    answer: "Different algorithms can solve the same problem with very different amounts of work. Searching a sorted phone book page by page is slow. Opening to the middle and halving the search each time is fast. The faster approach does far fewer steps as the data grows. Computer scientists measure this difference with Big O notation."
  - question: "Where does the word algorithm come from?"
    answer: "It comes from the Latinized name of Muhammad ibn Musa al-Khwarizmi, a Persian mathematician who lived around 780 to 850. European scholars translated his work on Hindu-Arabic numerals, and his name became algorithm. The same scholar also gave us the word algebra."
---

{{< quickanswer >}}
An algorithm is a finite, well-defined sequence of steps that takes an input and produces an output. It is a recipe for solving a problem. Computers follow algorithms to sort lists, search for files, recommend videos, and power AI. The steps must be clear enough that following them mechanically, without guessing, always reaches a result.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/cycle-five-nodes-notext.png" alt="Five dark discs connected in a circular cycle by red links. No em-dashes." loading="lazy">
  <figcaption>An algorithm runs as an ordered cycle of steps, where each instruction hands off cleanly to the next.</figcaption>
</figure>

## What an algorithm is

An algorithm is a set of instructions for getting something done. You give it an input, it follows its steps in order, and it returns an output. That is the whole idea.

You use algorithms every day without naming them. Making coffee, tying your shoes, and following directions home are all step-by-step procedures. Each one takes a starting point and produces a finished result.

Computers need this kind of precision. A computer cannot improvise or read between the lines. It does exactly what the steps say, in the exact order given. So an algorithm written for a computer has to spell out every step with no gaps.

The word "input" means the information the algorithm starts with. The word "output" means the result it produces. A search algorithm takes your query as input and returns a list of pages as output.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Input</span>
    <span class="bz-flow-step-name">Starting data</span>
    <span class="bz-flow-step-desc">A list, a number, a search query, or any information to work on.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step</span>
    <span class="bz-flow-step-name">First instruction</span>
    <span class="bz-flow-step-desc">A clear action, such as compare two items or pick the middle one.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step</span>
    <span class="bz-flow-step-name">Next instruction</span>
    <span class="bz-flow-step-desc">Repeat, decide, or move on based on the previous result.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Output</span>
    <span class="bz-flow-step-name">Finished result</span>
    <span class="bz-flow-step-desc">The answer: a sorted list, a found item, or a yes or no.</span>
  </div>
</div>

## A recipe and a set of directions

The clearest analogy for an algorithm is a recipe. A recipe lists ingredients (the input) and a numbered set of steps. Follow the steps in order and you get a dish (the output). Anyone who follows the same recipe carefully reaches the same result.

Directions to a destination work the same way. "Turn left at the bakery, walk two blocks, the office is on your right." Each instruction is clear. The steps come in order. Follow them and you arrive. That ordered, unambiguous quality is exactly what makes something an algorithm.

A recipe that says "add some flour and bake until done" is a weak algorithm. "Some" and "until done" leave too much to guess. A computer cannot guess. A good algorithm replaces vague words with exact ones: "add 200 grams of flour and bake for 25 minutes".

## The four properties of an algorithm

Standard computer science references describe an algorithm with a small set of properties. Four of them matter most for a beginner.

| | Property | What it means |
|---|---|---|
| **1** | Finite | It ends. The steps stop after a limited number of actions. |
| **2** | Well-defined | Each step is clear and has one meaning. No guessing. |
| **3** | Takes input | It starts with some given information, even if that is nothing. |
| **4** | Produces output | It returns a result that solves the problem. |

"Finite" means the algorithm does not run forever. A set of steps with no stopping point is not a useful algorithm. A computer that never finishes never gives you an answer.

"Well-defined" means every step has one clear meaning. Two people following the steps do the same thing. A computer reading the steps does the one thing intended, every time.

These properties come from foundational references such as Introduction to Algorithms (often called CLRS after its authors) and Donald Knuth's The Art of Computer Programming. They are the shared rules that working software depends on.

## A worked example: finding a name

Imagine a paper phone book with thousands of names in alphabetical order. You want to find "Okonkwo". How do you do it?

One algorithm is to start at page one and read every name until you hit a match. This is called linear search. It works, but it is slow. If the name sits near the end, you read almost the whole book.

A smarter algorithm uses the fact that the names are sorted. Open the book to the middle. Is "Okonkwo" before or after the name you see? Throw away the half it cannot be in. Open to the middle of the remaining half. Repeat.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Start</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Open to the middle page</span>
      <span class="bz-arch-chip-note">Compare the target name to the name you see</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Decide</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Target is earlier</span>
      <span class="bz-arch-chip">Target is later</span>
      <span class="bz-arch-chip-note">Keep only the half that can hold the name</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Repeat</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Halve again</span>
      <span class="bz-arch-chip-note">Each step cuts the remaining pages in half</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Finish</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Name found</span>
      <span class="bz-arch-chip-note">One page left, or the name is not present</span>
    </div>
  </div>
</div>

This second approach is called binary search. Each step throws away half of what is left. A phone book with one million names needs only about 20 steps, not one million. The same problem, a far faster algorithm. You can read more in [How Search Algorithms Work](/basics/search-algorithms/).

## Why the same problem has many algorithms

The phone book example shows a key idea. One problem can have many algorithms, and they are not equally good. Linear search and binary search both find the name. Binary search does far less work as the data grows.

This difference is the heart of computer science. When data is small, the slow method feels fine. When data grows to millions or billions of items, the choice of algorithm decides whether a program answers in a blink or grinds for hours.

Computer scientists measure this with Big O notation. Big O describes how the number of steps grows as the input grows. Linear search grows in step with the data. Binary search grows far more slowly. [Big O Notation](/basics/what-is-big-o-notation/) explains this language in plain terms.

Speed is not the only thing to compare. Some algorithms use less memory. Some are easier to write correctly. Some handle messy real-world data better. Choosing an algorithm means weighing these trade-offs for your situation.

## Algorithms in everyday software and AI

You meet algorithms every time you touch a screen. When a streaming service suggests a film, a recommendation algorithm ranks options for you. When a map app routes you around traffic, a pathfinding algorithm searches for the shortest route. When your photos sort by date, a sorting algorithm orders them.

Search engines run algorithms to rank pages. Banks run algorithms to flag unusual transactions. Online shops run algorithms to decide what to show you next. Each one is a set of steps with an input and an output.

Modern AI is built on algorithms too, with one twist. A traditional algorithm has steps a person wrote by hand. A machine learning algorithm instead learns its own steps from examples in data. The training process that produces the model is itself an algorithm, and the rules it learns guide the answers it gives.

So algorithms range from a five-line recipe to a system trained on huge datasets. The core idea never changes. Take an input, follow clear and finite steps, produce a useful output.

## Where the word comes from

The word "algorithm" has a long history. It comes from the Latinized name of Muhammad ibn Musa al-Khwarizmi, a Persian mathematician who lived around 780 to 850. He worked at the House of Wisdom in Baghdad.

Al-Khwarizmi wrote a book explaining the Hindu-Arabic numeral system, the digits 0 to 9 that you use today. European scholars translated it into Latin centuries later. The Latin title carried his name, and "al-Khwarizmi" gradually became "algorithm", the word for a step-by-step procedure.

The same mathematician gave us another word you know. His work on solving equations was titled with the Arabic word "al-jabr", which became "algebra". Two of the most important words in mathematics trace back to one scholar.

## What's next

- [Big O Notation](/basics/what-is-big-o-notation/): the language for measuring how fast an algorithm runs as data grows.
- [How Search Algorithms Work](/basics/search-algorithms/): a closer look at linear search, binary search, and finding things fast.
- [How Sorting Algorithms Work](/basics/sorting-algorithms/): how computers put lists in order, and why some methods beat others.

## Further reading

- [MacTutor: Al-Khwarizmi](https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/): the University of St Andrews biography of the mathematician who gave us the words algorithm and algebra.
- [Introduction to Algorithms, MIT Press](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/): the standard university reference (CLRS, 4th edition, 2022) on how algorithms work and how to measure them.
- [What is Coding?](/basics/what-is-coding/): how you turn an algorithm into instructions a computer can run.
- [Big O Notation](/basics/what-is-big-o-notation/): the plain-English guide to comparing algorithm speed.
- [How Search Algorithms Work](/basics/search-algorithms/): the methods computers use to find an item in a collection.
- [How Sorting Algorithms Work](/basics/sorting-algorithms/): the methods computers use to put data in order.
- [What is a Data Structure?](/basics/what-is-a-data-structure/): how data is organised, which shapes the algorithms you can use on it.
