---
title: "Graph Algorithms"
description: "Algorithms for traversing and finding paths in graphs, including BFS, DFS, Dijkstra's, and A*."
date: 2026-03-28
categories: [Glossary]
tags: [graph-algorithms, BFS, DFS, Dijkstra, A-star, algorithms, data-structures]
last_updated: 2026-05-30
---

Graph algorithms operate on graph data structures (vertices connected by edges) to solve problems involving connectivity, shortest paths, spanning trees, and network flow. They are among the most widely applicable algorithms in computer science.

## Origins and History

Graph theory originated with Leonhard Euler's solution to the Konigsberg bridge problem in 1736. In computing, graph algorithms became essential as networks and relational data grew. Edsger Dijkstra developed his shortest-path algorithm in 1956 (published 1959) while working at the Mathematical Centre in Amsterdam, originally to demonstrate the capabilities of the ARMAC computer. Breadth-first search (BFS) was formalized by Edward F. Moore in 1959 in the context of finding shortest paths through mazes. Depth-first search (DFS) was analyzed formally by Robert Tarjan in the early 1970s. The A* search algorithm was published by Peter Hart, Nils Nilsson, and Bertram Raphael at Stanford Research Institute in 1968 as an extension of Dijkstra's algorithm using heuristics for informed search.

## Core Algorithms

**Breadth-First Search (BFS)** explores all neighbors at the current depth before moving to the next level. It finds shortest paths in unweighted graphs and runs in O(V + E) time. **Depth-First Search (DFS)** explores as far as possible along each branch before backtracking. It is used for topological sorting, cycle detection, and connected component identification. **Dijkstra's Algorithm** finds shortest paths from a single source to all vertices in a graph with non-negative edge weights, using a priority queue for O((V + E) log V) time. **A* Search** extends Dijkstra's with an admissible heuristic function that estimates the remaining distance, reducing the search space significantly for pathfinding problems.

## Practical Applications

Graph algorithms power navigation systems (shortest route calculation), social network analysis (friend recommendations, community detection), network routing protocols (OSPF uses Dijkstra's), dependency resolution in build systems, and game AI pathfinding (A* is the standard for grid-based movement).

## Sources

1. Dijkstra, E.W. (1959). "A Note on Two Problems in Connexion with Graphs." *Numerische Mathematik*, 1, 269-271.
2. Hart, P.E., Nilsson, N.J., and Raphael, B. (1968). "A Formal Basis for the Heuristic Determination of Minimum Cost Paths." *IEEE Transactions on Systems Science and Cybernetics*, 4(2), 100-107.
3. Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. (2009). *Introduction to Algorithms*, 3rd ed. MIT Press.
