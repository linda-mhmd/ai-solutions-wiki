---
title: "Recursion and Backtracking"
description: "Self-referential functions and systematic trial-and-error with pruning for exploring solution spaces."
date: 2026-03-28
categories: [Glossary]
tags: [recursion, backtracking, algorithms, constraint-satisfaction, problem-solving]
last_updated: 2026-05-30
---

Recursion is a technique where a function calls itself to solve smaller instances of the same problem. Backtracking extends recursion by systematically exploring candidate solutions and abandoning (pruning) paths that cannot lead to a valid solution, making it an efficient strategy for constraint satisfaction and combinatorial search problems.

## Origins and History

Recursion as a mathematical concept predates computing, with recursive definitions appearing in the work of Giuseppe Peano (1889) and the foundational work on recursive functions by Kurt Godel (1931), Alonzo Church (lambda calculus, 1936), and Alan Turing (1936). In programming, recursion became practical with the introduction of stack-based function calls in languages like LISP (John McCarthy, 1958) and ALGOL 60, which was the first major language to support recursive procedures. Backtracking was formalized as a general algorithm by Derrick Henry Lehmer in 1950 and further developed by Solomon Golomb and Leonard Baumert in their 1965 paper on backtrack programming. The term and technique gained wide recognition through its application to problems like the eight queens puzzle and constraint satisfaction.

## How It Works

**Recursion** requires a base case (the simplest instance that can be solved directly) and a recursive case (where the function reduces the problem and calls itself). The call stack tracks each invocation's state. **Backtracking** explores a solution space as a tree: at each node, it makes a choice, recurses to explore that path, and if the path fails to produce a valid solution (violates constraints), it undoes the choice (backtracks) and tries the next alternative. Pruning -- detecting invalid partial solutions early -- is what makes backtracking dramatically faster than exhaustive brute-force enumeration.

## Classic Examples

The **N-queens problem** places N queens on an N x N chessboard such that no two threaten each other, using backtracking to prune invalid placements. **Sudoku solvers** fill cells recursively, backtracking when a constraint violation is detected. **Graph coloring** assigns colors to vertices backtracking when adjacent vertices share a color. **Permutation generation** uses recursion to produce all orderings of a set.

## Practical Applications

Recursion is fundamental to tree and graph traversals, divide-and-conquer algorithms, and functional programming. Backtracking is used in puzzle solvers, compiler parsers (recursive descent parsing), regular expression engines, automated theorem provers, and combinatorial optimization when combined with branch-and-bound techniques.

## Sources

1. Golomb, S.W. and Baumert, L.D. (1965). "Backtrack Programming." *Journal of the ACM*, 12(4), 516-524.
2. McCarthy, J. (1960). "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I." *Communications of the ACM*, 3(4), 184-195.
3. Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. (2009). *Introduction to Algorithms*, 3rd ed. MIT Press.
