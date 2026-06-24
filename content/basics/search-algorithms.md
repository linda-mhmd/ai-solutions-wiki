---
title: "How Search Algorithms Work"
description: "A plain-English guide to linear search, binary search, and hash table lookups, and why sorting and indexing make finding data fast."
date: 2026-06-23
level: 2
categories: [Basics]
tags: ["beginner","search-algorithms","binary-search","linear-search","hashing","algorithms"]
docs: "https://www.geeksforgeeks.org/dsa/linear-search-vs-binary-search/"
docs_label: "GeeksforGeeks: Linear vs Binary Search"
faqs:
  - question: "Is binary search always faster than linear search?"
    answer: "Binary search is faster once a list is large and already sorted. It runs in O(log n) time, so it checks far fewer items than linear search. But binary search needs the data sorted first, and sorting takes time. For a tiny list, or for data you search only once, linear search can win because it skips the sorting step."
  - question: "Why does binary search need sorted data?"
    answer: "Binary search works by checking the middle item and then deciding which half to keep. That decision only makes sense if the data is in order, because order tells you that everything to the left is smaller and everything to the right is larger. On unsorted data, the middle item gives you no information about where your target sits, so halving the range would be meaningless."
  - question: "What does O(1) mean for a hash table lookup?"
    answer: "O(1) means constant time. The number of steps to find an item stays the same no matter how many items the table holds. A hash table turns your key into a slot number and goes straight to that slot. With one million items or one hundred items, an average lookup takes about the same effort. The worst case is O(n) when many keys land in the same slot, but good hash tables make that rare."
  - question: "How do databases search millions of rows so fast?"
    answer: "Databases build an index, which is an extra sorted or hashed structure that points to where each value lives. Instead of scanning every row one by one, the database searches the index and jumps to the matching rows. This is the same idea as the index at the back of a book. The index costs storage and must be kept up to date, but it turns a slow full scan into a fast lookup."
---

{{< quickanswer >}}
Searching means finding one item inside a collection. Linear search checks items one at a time, which is steady but slow on big data. Binary search repeatedly halves a sorted range, so it finds items in very few steps. A hash table goes one step further: it turns your key into a slot number and jumps straight to the answer. Databases and search engines use indexes built on these ideas, so they never have to scan everything.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lens-cylinder-copper-notext.png" alt="A precise machined copper lens on dark slate, focusing toward a point. No em-dashes." loading="lazy">
  <figcaption>A good search algorithm acts like this lens: it focuses fast, narrowing many possibilities down to the one item you want.</figcaption>
</figure>

## What searching means

Searching is the task of finding a target value inside a collection of data. The collection might be a list of names, a row in a database, or a web page among billions. The question is always the same: is this item here, and where?

The naive answer is to look at everything. That works, but it gets slow as the data grows. The whole study of search algorithms is about doing less work to get the same answer. Two ideas make this possible: keeping data in order, and storing data so a key points straight to its location.

This guide covers three core methods: linear search, binary search, and hash table lookup. Each one trades effort in a different way. By the end you will know which to reach for and why.

## Linear search

Linear search is the most basic method. You start at the first item and check each one in turn until you find your target or reach the end. It is also called sequential search.

Linear search runs in **O(n)** time. Here, `n` is the number of items, and O(n) is Big O notation, a way to describe how the work grows with the data. O(n) means that if the list doubles in size, the search takes about twice as long in the worst case. To find the last item in a list of one million, you check all one million.

The big advantage is that linear search works on data in **any order**. It does not need the list sorted. It does not need an extra structure. You hand it a list and it scans.

Here is the idea in code-shaped form:

```python
def linear_search(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i      # found it, return the position
    return -1             # checked everything, not found
```

The loop walks every position from the start. The moment a value matches the target, it returns that position. If the loop finishes with no match, it returns `-1` to mean "not here". Notice there is no assumption about order. That is the strength and the cost of linear search.

## Binary search

Binary search is much faster, but it asks for something in return: the data must be **sorted** first. Sorted means the items sit in order, smallest to largest.

The method is a guessing game played well. You look at the middle item. If it equals your target, you are done. If your target is smaller, you throw away the entire right half and search the left. If your target is larger, you throw away the left half and search the right. Each check removes half of what remains.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Check the middle</span>
    <span class="bz-flow-step-desc">Look at the item in the middle of the current range.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Compare</span>
    <span class="bz-flow-step-desc">Is the target equal to, smaller than, or larger than the middle?</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Discard half</span>
    <span class="bz-flow-step-desc">Keep only the half that could still hold the target.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Repeat</span>
    <span class="bz-flow-step-desc">Search the remaining half the same way until one item is left.</span>
  </div>
</div>

Binary search runs in **O(log n)** time. The "log" means logarithm, and it captures the halving. Every step cuts the range in half, so the number of steps grows very slowly. A sorted list of one million items needs only about 20 checks. A list of one billion needs only about 30. That is the power of throwing away half each time.

Here is the idea in code-shaped form:

```python
def binary_search(sorted_items, target):
    low, high = 0, len(sorted_items) - 1
    while low <= high:
        mid = (low + high) // 2          # the middle position
        if sorted_items[mid] == target:
            return mid                   # found it
        elif sorted_items[mid] < target:
            low = mid + 1                # target is in the right half
        else:
            high = mid - 1               # target is in the left half
    return -1                            # not found
```

The two pointers `low` and `high` mark the current range. Each loop picks the middle, compares it, then moves one pointer to discard half the range. When `low` passes `high`, the range is empty and the target is not present.

### A small worked example

Search for the number 23 in this sorted list:

```
[ 4, 8, 15, 16, 23, 42 ]
   0  1   2   3   4   5     (positions)
```

1. Range is positions 0 to 5. Middle is position 2, value 15. The target 23 is larger, so discard the left half. Keep positions 3 to 5.
2. Range is positions 3 to 5. Middle is position 4, value 23. That equals the target. Found it at position 4.

Two checks instead of five. On six items the saving is small. On six million items it is the difference between a slow scan and an instant answer.

## Hashing and hash table lookup

A hash table takes a third approach. Instead of comparing items, it computes where an item should live and goes straight there.

The key idea is a hash function: a small piece of code that turns a key, such as a username, into a slot number. If `hash("alice")` gives slot 7, then "alice" is stored in slot 7. To look "alice" up later, you run the same hash function, get slot 7, and read that slot. You do not scan the other slots at all.

This makes a hash table lookup run in **O(1)** time on average. O(1) is constant time, meaning the work stays the same no matter how many items the table holds. One step finds the slot, one step reads it, done.

The catch is collisions. Sometimes two different keys hash to the same slot. A good hash table handles this by storing a small bucket of items at each slot. When many keys pile into one slot, a lookup has to scan that bucket, and the worst case degrades to **O(n)**. Well-designed hash functions spread keys evenly, so collisions stay rare and average performance stays at O(1).

You meet hash tables every day under other names. A Python dictionary, a JavaScript object, and a Java HashMap are all hash tables. When you write `users["alice"]`, you are doing an O(1) hash lookup.

## How databases and search engines avoid scanning everything

A database table with ten million rows could answer every query by scanning all ten million rows. That is linear search, and it is far too slow for a busy application.

Instead, databases build an **index**. An index is an extra data structure, often a sorted tree or a hash, that maps each value to the location of its rows. When you ask for the user with email `alice@example.com`, the database searches the small, fast index rather than the huge table. The index points it straight to the matching rows.

This is exactly the index at the back of a book. To find every mention of "binary search", you do not read every page. You flip to the index, find the term, and jump to the listed page numbers. Search engines work the same way with an inverted index, which maps each word to the list of pages that contain it. That is how a search engine returns results from billions of pages in a fraction of a second.

## The tradeoff: upfront cost versus repeated speed

Fast search is not free. Binary search needs the data sorted, and sorting takes time. A hash table needs a hash structure built and kept in memory. A database index needs storage and must update every time a row changes.

So why pay? Because you pay once and benefit many times. You sort or index the data up front, then run thousands or millions of fast searches against it. If you search a collection only once, plain linear search may be the cheaper choice, because it skips all that setup. If you search the same collection again and again, the upfront cost of sorting or indexing pays for itself quickly.

That tradeoff is the heart of practical search. Match the method to how often you search and whether the data is already ordered.

## Comparison: linear, binary, and hash lookup

| | Linear search | Binary search | Hash lookup |
|---|---|---|---|
| **Time complexity** | O(n) | O(log n) | O(1) average, O(n) worst |
| **Needs sorted data?** | No | Yes | No |
| **Needs extra structure?** | No | Sorted order | Hash table |
| **Best for** | Small or unsorted data | Large sorted lists | Key-based lookups |

## What's next

- [How Sorting Algorithms Work](/basics/sorting-algorithms/): learn how data gets into the sorted order that binary search relies on.
- [What is a Data Structure?](/basics/what-is-a-data-structure/): see how the way you store data shapes how fast you can search it.

## Further reading

- [GeeksforGeeks: Linear vs Binary Search](https://www.geeksforgeeks.org/dsa/linear-search-vs-binary-search/): side-by-side breakdown of the two methods with worked examples.
- [Princeton Algorithms cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/): concise complexity reference for search and other core algorithms.
- [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/): the standard university textbook covering search, sorting, and hashing in depth.
- [What is an Algorithm?](/basics/what-is-an-algorithm/): the foundation idea behind every search method on this page.
- [What is Big O Notation?](/basics/what-is-big-o-notation/): understand O(n), O(log n), and O(1) and why they matter.
- [How Sorting Algorithms Work](/basics/sorting-algorithms/): the prerequisite step that makes binary search possible.
- [What is a Data Structure?](/basics/what-is-a-data-structure/): hash tables, trees, and lists that searches run on.
- [What is a Database?](/basics/what-is-a-database/): how indexes let real systems search millions of rows fast.
