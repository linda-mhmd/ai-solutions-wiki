---
title: "Linked Lists, Stacks, and Queues"
description: "Fundamental linear data structures for organizing and accessing data sequentially."
date: 2026-03-28
categories: [Glossary]
tags: [linked-lists, stacks, queues, data-structures, algorithms]
last_updated: 2026-05-30
---

Linked lists, stacks, and queues are fundamental linear data structures that organize elements sequentially. They form the building blocks upon which more complex data structures and algorithms are constructed.

## Origins and History

The linked list was invented in 1955-1956 by Allen Newell, Cliff Shaw, and Herbert A. Simon at RAND Corporation and Carnegie Mellon, as part of their Information Processing Language (IPL) used for early AI programs including the Logic Theorist. The concept of a stack (LIFO -- last in, first out) was proposed by Alan Turing in 1946 and independently by Friedrich Bauer and Klaus Samelson in 1957, who filed a patent for it. Bauer and Samelson also introduced the term "Keller" (cellar) for the stack concept. Queues (FIFO -- first in, first out) were formalized alongside early operating systems for managing job scheduling and buffer management. These structures were cataloged comprehensively in Donald Knuth's *The Art of Computer Programming, Volume 1: Fundamental Algorithms* (1968).

## Core Structures

A **linked list** stores elements in nodes, each containing data and a pointer to the next node. Singly linked lists allow forward traversal; doubly linked lists support both directions. Insertion and deletion at a known position are O(1), but random access is O(n). A **stack** supports push (add to top) and pop (remove from top) in O(1) time. It follows LIFO order. A **queue** supports enqueue (add to back) and dequeue (remove from front) in O(1) time. It follows FIFO order. A **deque** (double-ended queue) allows insertion and removal at both ends.

## Practical Applications

Stacks are used for function call management (the call stack), expression evaluation and parsing (postfix notation), undo mechanisms in editors, and DFS traversal. Queues are used for BFS traversal, task scheduling in operating systems, print spooling, and message queues in distributed systems. Linked lists underlie implementations of stacks, queues, hash table chaining, and memory allocation free lists. While arrays often replace linked lists in modern performance-sensitive code (due to cache locality), the conceptual models of stacks and queues remain ubiquitous.

## Sources

1. Newell, A. and Shaw, J.C. (1957). "Programming the Logic Theory Machine." *Proceedings of the Western Joint Computer Conference*, 230-240.
2. Knuth, D.E. (1997). *The Art of Computer Programming, Volume 1: Fundamental Algorithms*, 3rd ed. Addison-Wesley.
3. Bauer, F.L. and Samelson, K. (1957). "Verfahren zur automatischen Verarbeitung von kodierten Daten und Rechenmaschine zur Ausubung des Verfahrens." German Patent DE1094019.
