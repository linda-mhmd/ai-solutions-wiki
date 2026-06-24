---
title: "How Sorting Algorithms Work"
description: "A plain-English guide to how sorting algorithms put data in order, from simple swaps to merge sort, quicksort, and the Timsort that ships in Python and Java."
date: 2026-06-23
level: 2
categories: [Basics]
tags: ["beginner","sorting-algorithms","quicksort","merge-sort","timsort","big-o","algorithms"]
docs: "https://algs4.cs.princeton.edu/cheatsheet/"
docs_label: "Princeton Algorithms Cheatsheet"
faqs:
  - question: "Which sorting algorithm is the fastest?"
    answer: "No single sort wins every case. For general-purpose use, the O(n log n) sorts (merge sort, quicksort, heapsort, and Timsort) are the practical fastest. Quicksort is often quickest in practice on random data, but its worst case is O(n^2). Timsort is the default in Python and Java because it is fast on real-world data that is partly sorted already."
  - question: "What does it mean for a sort to be stable?"
    answer: "Stable means equal items keep their original relative order. If two records both have the value 'Berlin' and one came before the other in the input, a stable sort keeps that same order in the output. This matters when you sort by one field, then by another, and want the first ordering preserved inside ties."
  - question: "Why can't a comparison sort be faster than O(n log n)?"
    answer: "Any sort that only compares pairs of items needs at least Omega(n log n) comparisons in the worst case. CLRS proves this in Section 8.1 using a decision-tree argument. There are not enough yes/no comparison outcomes to distinguish all possible orderings faster than that. Sorts that beat this bound, such as counting sort, do not compare items at all."
  - question: "Do I need to write my own sorting algorithm?"
    answer: "Almost never. Every mainstream language ships a well-tested, fast sort in its standard library. You call sorted() in Python or Arrays.sort() in Java. Understanding how these algorithms work still helps you reason about speed, memory, and stability when you choose a sort key or debug a slow program."
---

{{< quickanswer >}}
A sorting algorithm puts a list of items into order, such as smallest to largest or A to Z. Simple methods compare and swap neighbours until everything lines up, which is slow on big lists. Smarter methods split the list, sort the pieces, and combine them, which scales far better. The sort built into Python and Java, called Timsort, blends two of these ideas so it runs fast on the messy, partly-ordered data you meet in real life.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/pipeline-components-sequence-notext.png" alt="Industrial components arranged in a clean ordered sequence on dark slate. No em-dashes." loading="lazy">
  <figcaption>Sorting is the act of taking scattered components and arranging them into one clean, predictable sequence.</figcaption>
</figure>

Sorting looks trivial when you do it by hand with five cards. It becomes one of the most studied problems in computer science once the list holds a million records. This article explains how the main sorting algorithms work, why some are far faster than others, and which one runs inside your favourite language today.

## How merge sort divides and conquers

Merge sort uses a strategy called divide and conquer. You split the list into halves, keep splitting until each piece holds one item, then merge the pieces back together in order. A single item is already sorted, so merging is the only real work.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Split</span>
    <span class="bz-flow-step-desc">Cut the list into two halves of roughly equal size.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Split again</span>
    <span class="bz-flow-step-desc">Keep halving each piece until every piece holds one item.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Merge</span>
    <span class="bz-flow-step-desc">Combine pairs of pieces, always taking the smaller front item first.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Merge up</span>
    <span class="bz-flow-step-desc">Repeat the merge until one fully sorted list remains.</span>
  </div>
</div>

## A real-world analogy

Picture sorting a hand of playing cards. You pick up cards one at a time and slide each new card into its correct spot among the cards you already hold. That is insertion sort. It is the natural way most people sort a small hand.

Now picture sorting a whole deck with a friend. You split the deck into two piles, each of you sorts your pile, then you merge the two sorted piles by repeatedly taking the smaller top card. That is merge sort. The split-and-merge approach scales far better when the deck is large.

## Why sorting matters

Sorting is not an end in itself. It unlocks faster work later. The clearest example is binary search. Once a list is sorted, you can find any item by repeatedly halving the search range, which takes about log(n) steps instead of checking every item.

Sorted data also makes it cheap to find duplicates, compute medians, group related records, and merge two datasets. A surprising amount of fast software depends on data being in order first. That is why sorting earns its own chapter in every algorithms course.

## The simple O(n^2) sorts

Three classic sorts are easy to understand and easy to write. They all run in O(n^2) time, which means the work grows with the square of the list length. Double the list and you roughly quadruple the work. Here, big O notation describes how the running time grows as the input grows.

- **Bubble sort**: walk through the list, swap any two neighbours that are out of order, and repeat until no swaps happen. It is stable.
- **Selection sort**: find the smallest remaining item, move it to the front, then repeat with the rest. It is not stable.
- **Insertion sort**: take each item in turn and slide it back into its correct place among the items already sorted. It is stable.

These sorts are fine for tiny lists or for teaching. They become painfully slow once the list grows into the thousands.

Here is what insertion sort looks like as a tiny code-shaped example:

```python
def insertion_sort(items):
    for i in range(1, len(items)):
        current = items[i]
        j = i - 1
        # slide bigger items one place to the right
        while j >= 0 and items[j] > current:
            items[j + 1] = items[j]
            j = j - 1
        items[j + 1] = current
    return items
```

The inner `while` loop moves each item back to its correct slot, exactly like sliding a playing card into a sorted hand.

## The efficient O(n log n) sorts

Three sorts run in O(n log n) time on typical data. That growth rate is dramatically gentler than O(n^2). For a million items, O(n log n) needs roughly twenty million operations, while O(n^2) needs a trillion.

**Merge sort** splits, sorts the halves, and merges them, as described above. It runs in O(n log n) in the best, average, and worst case, and it is stable. The algorithm is attributed to John von Neumann in 1945, which makes it one of the oldest sorts still in heavy use.

**Quicksort** picks one item as a pivot, partitions the rest into items smaller than the pivot and items larger, then sorts each part the same way. Its average and best case are O(n log n), but a bad sequence of pivots gives a worst case of O(n^2). It sorts in place, meaning it needs little extra memory, and it is typically not stable. Tony Hoare (C. A. R. Hoare) conceived quicksort in 1959. He published "Algorithm 64: Quicksort" in Communications of the ACM, Vol. 4, No. 7, July 1961, and a fuller paper titled "Quicksort" in The Computer Journal, Vol. 5, 1962.

**Heapsort** organises the data into a heap, a tree-shaped structure where the largest item sits at the top, then repeatedly removes the top item to build the sorted output. It runs in O(n log n) and is not stable.

## What "stable" means and why it matters

A sort is stable when equal items keep their original relative order. Suppose you have a list of orders already sorted by date. You now sort that list by city. A stable sort keeps the orders for each city in their original date order. An unstable sort might scramble that date order inside each city.

Stability lets you build complex orderings in layers. Sort by the least important key first, then by the more important key, and a stable sort preserves the earlier ordering inside every tie. This is why stability is a real feature, not a technicality, when you sort records with multiple fields.

## Timsort and what real languages use today

Most languages do not use a textbook sort. They use Timsort, a hybrid of merge sort and insertion sort. Timsort finds runs of data that are already ordered, sorts short pieces with insertion sort, and merges everything with merge sort. Its best case is O(n) on data that is already mostly sorted, while its average and worst case stay at O(n log n). It is stable.

Tim Peters created Timsort in 2002 for Python. It was Python's standard sort until version 3.11, which replaced it with Powersort. Java SE 7 also adopted Timsort. So when you call `sorted()` in older Python or `Arrays.sort()` on objects in Java, you are running this algorithm.

## The lower bound for comparison sorts

You might wonder whether a cleverer sort could beat O(n log n). For any sort that works only by comparing pairs of items, the answer is no. Such a sort needs at least Omega(n log n) comparisons in the worst case. CLRS proves this in Section 8.1. Here, Omega is the big O notation for a lower bound, meaning "at least this much."

The proof uses a decision tree of yes/no comparison outcomes. There are not enough leaves on that tree to tell apart every possible ordering faster than n log n. Sorts that beat this bound, such as counting sort, win by not comparing items at all. They use the item values directly as array positions.

## Comparing the sorts

| | Average time | Worst time | Stable? |
|---|---|---|---|
| **Bubble sort** | O(n^2) | O(n^2) | Yes |
| **Selection sort** | O(n^2) | O(n^2) | No |
| **Insertion sort** | O(n^2) | O(n^2) | Yes |
| **Merge sort** | O(n log n) | O(n log n) | Yes |
| **Quicksort** | O(n log n) | O(n^2) | No |
| **Heapsort** | O(n log n) | O(n log n) | No |
| **Timsort** | O(n log n) | O(n log n) | Yes |

For everyday work, reach for the library sort, which is Timsort or a tuned quicksort. Use the table to reason about speed, memory, and stability when you choose a sort key or debug something slow.

## What's next

- [How Search Algorithms Work](/basics/search-algorithms/): see why sorting first makes binary search possible.
- [What is a Data Structure?](/basics/what-is-a-data-structure/): learn the structures, such as heaps and arrays, that these sorts run on.

## Further reading

- [Princeton Algorithms Cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/): a one-page table of running times for every major sort and search algorithm.
- [Hoare Quicksort 1961 publication record](https://www.cs.ox.ac.uk/publications/publication8194-abstract.html): the Oxford record for "Algorithm 64: Quicksort" in Communications of the ACM.
- [Hoare "Quicksort", The Computer Journal 1962](https://academic.oup.com/comjnl/article/5/1/10/395338): the fuller paper where Hoare lays out the algorithm in detail.
- [CPython Timsort source, listsort.txt](https://raw.githubusercontent.com/python/cpython/main/Objects/listsort.txt): Tim Peters' own notes explaining how and why Timsort works.
- [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/): the standard reference, including the Omega(n log n) lower bound proof in Section 8.1.
- [What is an Algorithm?](/basics/what-is-an-algorithm/): the building-block idea behind every sort on this page.
- [What is Big O Notation?](/basics/what-is-big-o-notation/): how to read O(n^2), O(n log n), and the other growth rates used here.
- [How Search Algorithms Work](/basics/search-algorithms/): the natural next step once your data is sorted.
