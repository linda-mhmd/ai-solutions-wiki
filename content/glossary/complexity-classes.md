---
title: "Complexity Classes"
description: "Classifications of computational problems by resource requirements, including P, NP, and NP-complete."
date: 2026-03-28
categories: [Glossary]
tags: [complexity-classes, P, NP, NP-complete, computational-complexity, algorithms]
last_updated: 2026-05-30
---

Complexity classes categorize computational problems based on the resources (time, space) required to solve them. The relationships between these classes, particularly whether P equals NP, constitute one of the most important open questions in computer science and mathematics.

## Origins and History

The formal study of computational complexity began in the 1960s. Juris Hartmanis and Richard Stearns laid the foundations in their 1965 paper "On the Computational Complexity of Algorithms," which introduced time complexity classes. Stephen Cook's 1971 paper "The Complexity of Theorem-Proving Procedures" proved that the Boolean satisfiability problem (SAT) is NP-complete, establishing the concept of NP-completeness. Independently, Leonid Levin in the Soviet Union proved similar results in 1973. Richard Karp's 1972 paper demonstrated that 21 classic combinatorial problems are NP-complete by polynomial reductions from SAT, showing that NP-completeness was not an isolated curiosity but a pervasive phenomenon. The P vs NP question was included as one of the seven Millennium Prize Problems by the Clay Mathematics Institute in 2000, carrying a one-million-dollar prize.

## Key Classes

**P (Polynomial time)** contains problems solvable by a deterministic Turing machine in polynomial time. These are considered "efficiently solvable" -- examples include sorting, shortest paths, and linear programming. **NP (Nondeterministic Polynomial time)** contains problems whose solutions can be verified in polynomial time. Every problem in P is also in NP. **NP-complete** problems are the hardest problems in NP: every NP problem can be reduced to an NP-complete problem in polynomial time. If any NP-complete problem were solvable in polynomial time, then P = NP. Examples include SAT, traveling salesman (decision version), graph coloring, and subset sum. **NP-hard** problems are at least as hard as NP-complete problems but need not be in NP (they may not even be decision problems).

## Practical Applications

Understanding complexity classes guides algorithm design and system architecture. When a problem is NP-complete, practitioners use approximation algorithms, heuristics, or constrain the problem to special cases that are in P. This applies to scheduling, routing, resource allocation, circuit design, and compiler optimization.

## Sources

1. Cook, S.A. (1971). "The Complexity of Theorem-Proving Procedures." *Proceedings of the 3rd Annual ACM Symposium on Theory of Computing*, 151-158.
2. Karp, R.M. (1972). "Reducibility Among Combinatorial Problems." In *Complexity of Computer Computations*, Plenum Press, 85-103.
3. Sipser, M. (2012). *Introduction to the Theory of Computation*, 3rd ed. Cengage Learning.
