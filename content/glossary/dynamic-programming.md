---
title: "Dynamic Programming"
description: "An algorithmic technique that solves complex problems by breaking them into overlapping subproblems and storing their solutions."
date: 2026-03-28
categories: [Glossary]
tags: [dynamic-programming, algorithms, optimization, memoization, tabulation]
last_updated: 2026-05-30
---

Dynamic programming (DP) is an algorithmic technique for solving optimization and counting problems by decomposing them into simpler overlapping subproblems, solving each subproblem only once, and storing the results for reuse. It transforms exponential-time recursive solutions into polynomial-time algorithms.

## Origins and History

The term "dynamic programming" was coined by Richard Bellman in the 1950s while working at the RAND Corporation on mathematical optimization problems for the US Air Force. Bellman later noted that he chose the word "dynamic" partly to shield the mathematical research from political opposition to the term "research" in the Defense Department. He published the foundational text *Dynamic Programming* in 1957, establishing the principle of optimality: an optimal solution to a problem contains optimal solutions to its subproblems. The technique has since become a cornerstone of algorithm design, with applications expanded by researchers including Michael Held and Richard Karp (traveling salesman, 1962) and Saul Needleman and Christian Wunsch (sequence alignment, 1970).

## How It Works

DP applies when a problem exhibits two properties: **optimal substructure** (the optimal solution can be constructed from optimal solutions of subproblems) and **overlapping subproblems** (the same subproblems are solved repeatedly in a naive recursive approach). Two implementation strategies exist. **Top-down with memoization** starts from the original problem, recurses into subproblems, and caches results in a lookup table to avoid recomputation. **Bottom-up with tabulation** solves subproblems in order from smallest to largest, filling a table iteratively, eliminating recursion overhead entirely.

## Classic Examples

The Fibonacci sequence demonstrates DP simply: naive recursion is O(2^n), but DP reduces it to O(n). Other classic problems include the knapsack problem (optimal packing given weight constraints), longest common subsequence (comparing text or DNA sequences), shortest paths (Bellman-Ford algorithm), and matrix chain multiplication (optimal parenthesization).

## Practical Applications

Dynamic programming is used in bioinformatics (sequence alignment with Smith-Waterman and Needleman-Wunsch), natural language processing (Viterbi algorithm for hidden Markov models), resource allocation and scheduling, compiler optimization, and financial modeling for option pricing.

## Sources

1. Bellman, R. (1957). *Dynamic Programming*. Princeton University Press.
2. Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. (2009). *Introduction to Algorithms*, 3rd ed. MIT Press, Chapter 15.
3. Needleman, S.B. and Wunsch, C.D. (1970). "A General Method Applicable to the Search for Similarities in the Amino Acid Sequence of Two Proteins." *Journal of Molecular Biology*, 48(3), 443-453.
