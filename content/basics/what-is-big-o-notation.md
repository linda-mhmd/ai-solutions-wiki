---
title: "What is Big O Notation?"
description: "A plain-English guide to Big O notation, the language for describing how an algorithm's cost grows as the input gets larger."
date: 2026-06-23
level: 2
categories: [Basics]
tags: ["beginner","big-o","time-complexity","algorithms","performance","computer-science"]
docs: "https://algs4.cs.princeton.edu/cheatsheet/"
docs_label: "Princeton Algorithms Cheatsheet"
faqs:
  - question: "Does Big O tell me how many seconds my code takes?"
    answer: "No. Big O describes the growth rate, meaning how the cost scales as the input grows. It ignores the exact seconds, the hardware, and the programming language. An O(n) algorithm might run in 2 seconds on a slow laptop and 0.2 seconds on a fast server, but in both cases the time roughly doubles when the input doubles."
  - question: "What does the n in O(n) mean?"
    answer: "The letter n is the size of the input. For a list of numbers, n is how many numbers there are. For text, n is the number of characters. Big O describes how the work grows as n grows, so a bigger n means a bigger input and usually more work."
  - question: "Is a lower Big O class always the better choice?"
    answer: "Usually, but not always. Big O hides constant factors and small overheads. For small inputs, a simple O(n^2) algorithm can beat a complicated O(n log n) one. Big O matters most when the input gets large, because that is when the growth rate dominates everything else."
  - question: "What is the difference between Big O and Big Theta?"
    answer: "Big O describes an upper bound on growth, meaning the cost grows no faster than this. Big Theta describes a tight bound, meaning the cost grows exactly at this rate. In everyday engineering talk, people say Big O when they often mean the tight bound that Big Theta describes."
---

{{< quickanswer >}}
Big O notation is a shorthand for describing how an algorithm's running time or memory use grows as its input gets bigger. You write it as O followed by a formula, like O(n) or O(n^2), where n is the size of the input. It does not measure exact seconds. It measures the growth rate, so you can compare two approaches and predict which one stays fast when the data gets large.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/dark-cherry/vortex-complexity.png" alt="A dark spiralling vortex with a glowing red core. No em-dashes." loading="lazy">
  <figcaption>The spiral deepens fast as it turns inward: cost can grow the same way as the input size climbs.</figcaption>
</figure>

## How growth differs as the input gets bigger

The whole point of Big O is the growth rate. The table below shows how many steps each class takes as the input size n climbs from 10 to 1,000,000. Watch how O(1) and O(log n) barely move while O(n^2) explodes.

<div class="bz-diagram">
  <div class="bz-diagram-label">Steps needed as input size n grows (lower is faster)</div>
  <div class="bz-diagram-body">
    <div class="bz-flow">
      <div class="bz-flow-step">
        <span class="bz-flow-step-tag">O(1) constant</span>
        <span class="bz-flow-step-name">n = 10: 1 step</span>
        <span class="bz-flow-step-desc">n = 1,000: 1 step. n = 1,000,000: 1 step. Flat forever.</span>
      </div>
      <div class="bz-flow-arrow">→</div>
      <div class="bz-flow-step">
        <span class="bz-flow-step-tag">O(log n) logarithmic</span>
        <span class="bz-flow-step-name">n = 10: ~3 steps</span>
        <span class="bz-flow-step-desc">n = 1,000: ~10 steps. n = 1,000,000: ~20 steps. Grows slowly.</span>
      </div>
      <div class="bz-flow-arrow">→</div>
      <div class="bz-flow-step">
        <span class="bz-flow-step-tag">O(n) linear</span>
        <span class="bz-flow-step-name">n = 10: 10 steps</span>
        <span class="bz-flow-step-desc">n = 1,000: 1,000 steps. n = 1,000,000: 1,000,000 steps. Grows in step with n.</span>
      </div>
      <div class="bz-flow-arrow">→</div>
      <div class="bz-flow-step">
        <span class="bz-flow-step-tag">O(n^2) quadratic</span>
        <span class="bz-flow-step-name">n = 10: 100 steps</span>
        <span class="bz-flow-step-desc">n = 1,000: 1,000,000 steps. n = 1,000,000: 1,000,000,000,000 steps. Explodes.</span>
      </div>
    </div>
  </div>
</div>

At n = 1,000,000 the linear approach takes a million steps. The quadratic approach takes a trillion. That gap is why Big O matters. The exact speed of your computer cannot rescue an algorithm whose growth rate is wrong for the size of the data.

## A real-world analogy: finding a word in a dictionary

Picture a printed dictionary and you need the word "orchestra".

One way is to start at page one and flip through every page until you find it. If the dictionary has n pages, you might check all n pages in the worst case. That is O(n), linear time. Double the dictionary and you roughly double the flipping.

A smarter way is to open to the middle. "Orchestra" starts with O, which sits past the middle, so you ignore the first half and open to the middle of the second half. Each look halves the pages left to search. That is O(log n), logarithmic time. Double the dictionary and you add only one extra look. This is exactly how binary search works.

That difference is the heart of Big O. Both methods find the word. One scales gracefully and one does not.

## What Big O measures

Big O measures how the cost of an algorithm grows as the input size n grows. "Cost" usually means one of two things:

- **Time complexity**: how the number of steps grows.
- **Space complexity**: how the extra memory grows.

An algorithm is a fixed set of steps for solving a problem. See [What is an Algorithm?](/basics/what-is-an-algorithm/) for the full definition. Big O describes how the work of those steps scales, not how long one run takes on your machine.

## Why we care about growth, not exact seconds

Exact timings depend on your processor, your language, your memory, and what else the machine is doing. None of that is portable. Big O strips all of it away and keeps only the shape of the growth.

That is why Big O ignores constant factors. An algorithm that takes 5n steps and one that takes 100n steps are both O(n), because both grow in a straight line with n. The 100 is a constant multiplier, and as n gets large the growth rate dominates the constant. Big O answers one question: when the data gets big, does this approach stay usable?

## The common complexity classes, with code-shaped examples

These examples use short Python-style snippets. You do not need to run them. Read them for the shape of the work.

### O(1) constant time

The cost stays the same no matter how big the input is. Looking up one item by its position is constant.

```python
def first_item(items):
    return items[0]   # one step, whatever the list size
```

A list of 10 or 10 million takes the same single step.

### O(log n) logarithmic time

The cost grows slowly because each step throws away a large fraction of the remaining work. Binary search on a sorted list is the classic case.

```python
def binary_search(sorted_items, target):
    low, high = 0, len(sorted_items) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_items[mid] == target:
            return mid
        if sorted_items[mid] < target:
            low = mid + 1      # discard the lower half
        else:
            high = mid - 1     # discard the upper half
    return -1
```

Every loop halves the search space, so a million items need only about 20 checks.

### O(n) linear time

The cost grows in step with the input. Looking at every item once is linear.

```python
def contains(items, target):
    for item in items:        # touches each item once
        if item == target:
            return True
    return False
```

Double the list and you double the work.

### O(n log n) linearithmic time

The cost grows a little faster than linear. This is the speed of good sorting algorithms, such as merge sort. They split the data (log n levels) and do linear work at each level.

```python
def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])    # split, log n levels deep
    right = merge_sort(items[mid:])
    return merge(left, right)         # linear merge at each level
```

For a million items, O(n log n) is around 20 million steps. O(n^2) would be a trillion. See [How Sorting Algorithms Work](/basics/sorting-algorithms/).

### O(n^2) quadratic time

The cost grows with the square of the input. A loop inside a loop over the same data is quadratic.

```python
def has_duplicate(items):
    for i in items:           # outer loop, n times
        for j in items:       # inner loop, n times each
            if i is not j and i == j:
                return True
    return False
```

Double the input and the work quadruples. This is fine for small lists and painful for large ones.

### O(2^n) exponential time

The cost doubles every time you add one item to the input. Trying every possible combination, such as a naive recursive Fibonacci, is exponential.

```python
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)   # two calls per call, work doubles
```

At n = 50 this approach makes over a quadrillion calls. Exponential algorithms become unusable quickly, so engineers work hard to avoid them.

## Time complexity versus space complexity

Time complexity counts steps. Space complexity counts the extra memory an algorithm needs beyond its input.

The two can pull in opposite directions. You can sometimes make an algorithm faster by storing precomputed results, which spends more memory to save time. You can sometimes save memory by recomputing values, which spends more time. Big O describes both. An algorithm might be O(n) in time and O(1) in space, meaning it touches each item once but keeps only a fixed amount of extra memory.

## Best case, average case, and worst case

The same algorithm can have different costs depending on the input.

- **Best case**: the luckiest input. Linear search finds the target on the first item, so one step.
- **Worst case**: the unluckiest input. Linear search checks every item because the target sits last or is missing, so n steps.
- **Average case**: the typical input across many runs.

Engineers usually quote the worst case, because it sets a guarantee you can rely on. When someone says linear search is O(n), they mean the worst case. The best case is faster, but you cannot count on luck.

## A short history of the notation

The big O symbol is older than computers. Number theorist Paul Bachmann introduced it in 1894 to describe growth rates in mathematics. Edmund Landau extended the idea in 1909 and added the related little-o symbol. Because of this, the whole family is called Bachmann-Landau notation or Landau notation. (Source: MathWorld, Landau Symbols.)

Computer science borrowed the notation to compare algorithms. Donald Knuth standardised its use in the field. His 1976 note "Big Omicron and big Omega and big Theta" in SIGACT News defined Big Omega (a lower bound) and Big Theta (a tight bound) alongside Big O. That trio is the vocabulary engineers still use today.

## The complexity classes at a glance

| | Notation | Name | Plain meaning | Example operation |
|---|---|---|---|---|
| **Constant** | O(1) | constant | Cost never changes with input size | Read one list item by index |
| **Logarithmic** | O(log n) | logarithmic | Each step discards a large fraction | Binary search on sorted data |
| **Linear** | O(n) | linear | Cost grows in step with input | Scan every item once |
| **Linearithmic** | O(n log n) | linearithmic | A little faster than linear | Merge sort, good sorting |
| **Quadratic** | O(n^2) | quadratic | Cost grows with the square of n | Compare every pair in a list |
| **Exponential** | O(2^n) | exponential | Cost doubles per extra item | Try every combination naively |

The classes are listed fastest to slowest growth, the same order used in CLRS (Introduction to Algorithms) and the Princeton Algorithms cheatsheet.

## What's next

- [How Search Algorithms Work](/basics/search-algorithms/): see linear and binary search in action and why their Big O differs.
- [How Sorting Algorithms Work](/basics/sorting-algorithms/): why good sorts hit O(n log n) and slow ones stay at O(n^2).
- [What is a Data Structure?](/basics/what-is-a-data-structure/): how the way you store data sets the Big O of every operation on it.

## Further reading

- [Princeton Algorithms Cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/): a compact reference table of common algorithms and their Big O costs.
- [Big Omicron and big Omega and big Theta (Knuth, 1976)](https://dl.acm.org/doi/10.1145/1008328.1008329): the note that standardised asymptotic notation for computer science.
- [Landau Symbols (MathWorld)](https://mathworld.wolfram.com/LandauSymbols.html): the mathematical origin of big O and little o from Bachmann and Landau.
- [Introduction to Algorithms (CLRS, 4th ed)](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/): the standard textbook for analysing algorithm complexity in depth.
- [What is an Algorithm?](/basics/what-is-an-algorithm/): the building block that Big O measures.
- [How Sorting Algorithms Work](/basics/sorting-algorithms/): worked examples of different complexity classes.
- [How Search Algorithms Work](/basics/search-algorithms/): a concrete O(n) versus O(log n) comparison.
