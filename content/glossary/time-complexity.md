---
title: "Time Complexity and Big-O Notation"
description: "An introduction to Big-O notation and how it describes the asymptotic behavior of algorithms."
tags: ["cs-fundamentals", "beginner", "time-complexity", "big-o", "algorithms", "computer-science", "fundamentals"]
sources:
  - title: "Introduction to Algorithms, 4th Edition"
    authors: ["Thomas H. Cormen", "Charles E. Leiserson", "Ronald L. Rivest", "Clifford Stein"]
    year: 2022
    publisher: "MIT Press"
    abbreviation: "CLRS"
last_updated: 2026-05-30
---

# Time Complexity and Big-O Notation

Time complexity describes how the running time of an algorithm grows as the size of its input grows. Rather than measuring exact execution time (which depends on hardware, language, and implementation details), computer scientists use asymptotic notation to characterize algorithmic efficiency in a machine-independent way.

## What Is Big-O Notation?

Big-O notation expresses an upper bound on an algorithm's growth rate. For a function f(n), we write f(n) = O(g(n)) if there exist positive constants c and n0 such that 0 <= f(n) <= c * g(n) for all n >= n0. In plain terms, g(n) is an upper bound on f(n) beyond some threshold input size.

This definition, formalized in CLRS, captures the idea that we care about behavior at scale. Constant factors and lower-order terms are dropped because they become negligible as input size grows toward infinity.

## Common Complexity Classes

The following classes appear frequently in algorithm analysis, ordered from fastest to slowest growth:

- **O(1) - Constant:** Runtime does not depend on input size. Accessing an array element by index is a classic example.
- **O(log n) - Logarithmic:** Runtime grows slowly as input doubles. Binary search on a sorted array runs in O(log n).
- **O(n) - Linear:** Runtime grows proportionally to input size. A single pass through an array is O(n).
- **O(n log n) - Linearithmic:** Common in efficient sorting algorithms. Merge sort and heap sort both achieve O(n log n).
- **O(n^2) - Quadratic:** Runtime grows with the square of input size. Insertion sort in the worst case is O(n^2).
- **O(2^n) - Exponential:** Runtime doubles with each added input element. Naive recursive algorithms for the subset-sum problem exhibit this behavior.

## Big-O vs. Other Asymptotic Notations

CLRS distinguishes between three related notations. Big-O (O) gives an asymptotic upper bound. Big-Omega (Omega) gives an asymptotic lower bound: f(n) = Omega(g(n)) means g(n) grows no faster than f(n). Big-Theta (Theta) gives a tight bound: f(n) = Theta(g(n)) when f(n) is both O(g(n)) and Omega(g(n)).

In practice, engineers often use Big-O loosely to mean tight bound, but understanding the distinction matters when analyzing best-case, worst-case, and average-case behavior separately.

## Why It Matters

Choosing an algorithm with a better asymptotic complexity can be the difference between a program that finishes in seconds and one that runs for days. A O(n log n) sort on one million elements performs roughly 20 million operations, while an O(n^2) sort on the same input requires one trillion. Big-O notation gives engineers a shared vocabulary to compare algorithms and reason about scalability before writing a single line of code.

## Sources

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapter 3: Characterizing Running Times. (CLRS; the definitive reference for Big-O, Big-Ω, and Big-Θ notation; worst-case, best-case, and average-case complexity analysis.)
- Knuth, D. E. (1968). *The Art of Computer Programming*, Vol. 1: Fundamental Algorithms. Addison-Wesley. (Original formalization of algorithm analysis; introduced the O() notation as used in computer science.)
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. (Practical algorithm complexity analysis; tilde notation and the relationship between mathematical bounds and real performance.)
