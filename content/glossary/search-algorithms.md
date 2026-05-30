---
title: "Search Algorithms"
description: "Algorithms for finding elements in data structures, including linear search, binary search, and interpolation search."
date: 2026-03-28
categories: [Glossary]
tags: [search-algorithms, binary-search, algorithms, data-structures]
last_updated: 2026-05-30
---

Search algorithms are procedures for locating a specific element or value within a data structure. The choice of search algorithm depends on the data structure, whether the data is sorted, and the acceptable time-space tradeoffs.

## Origins and History

Search is one of the oldest problems in computing. Binary search, despite its apparent simplicity, has a rich history of incorrect implementations. John Mauchly described binary search during the Moore School Lectures in 1946. However, as Jon Bentley noted in *Programming Pearls* (1986), the first binary search was published in 1946 but the first bug-free version was not published until 1962. The overflow bug in the midpoint calculation (computing (low + high) / 2 for large arrays) was not widely recognized until Joshua Bloch's 2006 blog post, nearly 60 years after the algorithm's introduction. Interpolation search was analyzed by Yao and Yao in 1976 and by Perl, Itai, and Avni in 1978, showing that for uniformly distributed data it achieves O(log log n) expected time.

## Core Algorithms

**Linear search** examines each element sequentially until the target is found or the collection is exhausted. It works on any data structure and runs in O(n) time. It is the only option for unsorted data without additional index structures. **Binary search** requires a sorted array and repeatedly halves the search space by comparing the target with the middle element, achieving O(log n) time. **Interpolation search** improves on binary search for uniformly distributed data by estimating the target's position proportionally, achieving O(log log n) expected time but O(n) worst case for non-uniform distributions. **Exponential search** first finds a range where the element may exist by doubling the index, then applies binary search within that range, useful for unbounded or infinite lists.

## Practical Applications

Binary search is ubiquitous in database indexing, sorted array lookups, and as a subroutine in countless algorithms. Interpolation search is used in database systems where key distribution is roughly uniform. Search algorithms underpin standard library functions such as Python's bisect module, Java's Arrays.binarySearch, and C++'s std::lower_bound. Beyond element lookup, binary search is applied as a general technique for optimization problems where the answer space is monotonic.

## Sources

1. Knuth, D.E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching*, 2nd ed. Addison-Wesley.
2. Bentley, J. (1986). *Programming Pearls*. Addison-Wesley.
3. Perl, Y., Itai, A., and Avni, H. (1978). "Interpolation Search - A Log Log N Search." *Communications of the ACM*, 21(7), 550-553.
