---
title: "Greedy Algorithms"
description: "Algorithms that make the locally optimal choice at each step, aiming for a globally optimal or near-optimal solution."
date: 2026-03-28
categories: [Glossary]
tags: [greedy-algorithms, algorithms, optimization, heuristics]
last_updated: 2026-05-30
---

A greedy algorithm builds a solution incrementally by making the locally optimal choice at each step, without reconsidering previous decisions. When a problem has the right structural properties, greedy algorithms produce globally optimal solutions efficiently. When it does not, they serve as fast heuristics.

## Origins and History

Greedy strategies have been used in mathematics long before formal computer science. Kruskal's algorithm for minimum spanning trees (1956) and Prim's algorithm (1957, building on earlier work by Vojtech Jarnik in 1930) are classic examples of greedy approaches that provably yield optimal solutions. Huffman coding (David Huffman, 1952) is another foundational greedy algorithm, developed as a term paper at MIT when Huffman found a more efficient approach than his professor Robert Fano's existing method. The formal analysis of when greedy algorithms produce optimal solutions was advanced through matroid theory, connecting combinatorial optimization with greedy strategies. Jack Edmonds' work on matroids in the 1960s and 1970s provided the theoretical foundation for proving greedy optimality.

## How It Works

A greedy algorithm follows a consistent pattern: identify the set of candidates, select the best candidate according to a local criterion, check if the candidate is feasible (satisfies constraints), and add it to the solution. The algorithm never backtracks or revises earlier choices. For a greedy algorithm to guarantee optimality, the problem must exhibit the **greedy choice property** (a locally optimal choice leads to a globally optimal solution) and **optimal substructure** (an optimal solution contains optimal solutions to subproblems).

## Classic Examples

**Huffman coding** builds an optimal prefix-free binary code by repeatedly merging the two lowest-frequency symbols. **Dijkstra's algorithm** greedily selects the unvisited vertex with the smallest known distance. **Activity selection** chooses the activity that finishes earliest to maximize the number of non-overlapping activities. **Fractional knapsack** greedily selects items by value-to-weight ratio, achieving the optimal solution (unlike the 0/1 knapsack, which requires dynamic programming).

## Practical Applications

Greedy algorithms are used in data compression (Huffman coding), network design (minimum spanning trees for cable routing), scheduling (job scheduling, interval scheduling), and as fast approximation algorithms for NP-hard problems such as set cover and vertex cover where exact solutions are computationally infeasible.

## Sources

1. Huffman, D.A. (1952). "A Method for the Construction of Minimum-Redundancy Codes." *Proceedings of the IRE*, 40(9), 1098-1101.
2. Kruskal, J.B. (1956). "On the Shortest Spanning Subtree of a Graph and the Traveling Salesman Problem." *Proceedings of the American Mathematical Society*, 7(1), 48-50.
3. Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. (2009). *Introduction to Algorithms*, 3rd ed. MIT Press, Chapter 16.
