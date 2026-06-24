---
title: "What is a Data Structure?"
description: "A plain-English guide to data structures, the ways you organize data in memory so that search, insertion, and sorting run fast."
date: 2026-06-23
level: 2
categories: [Basics]
tags: ["beginner","data-structures","array","linked-list","hash-table","tree","computer-science"]
docs: "https://algs4.cs.princeton.edu/cheatsheet/"
docs_label: "Princeton Algorithms Cheatsheet"
faqs:
  - question: "What is the difference between a data structure and a database?"
    answer: "A data structure organizes data in memory while a program runs. A database stores data on disk so it survives after the program stops. A database uses data structures internally, for example a B-tree index that speeds up lookups, but it adds durability, querying, and shared access on top."
  - question: "Which data structure should I use for fast lookups?"
    answer: "Use a hash table. It finds, inserts, and deletes a value in constant time on average, written O(1). Most languages give you one built in, such as a dictionary in Python or a Map in JavaScript. Reach for a balanced binary search tree instead when you also need the keys kept in sorted order."
  - question: "What is the difference between a stack and a queue?"
    answer: "A stack is last in, first out, so the most recent item leaves first, like a pile of plates. A queue is first in, first out, so the oldest item leaves first, like a line at a shop. Both add and remove items in constant time, O(1)."
  - question: "Do I need to memorize Big O complexities for every structure?"
    answer: "No. You need a working sense of which operations each structure makes fast and which it makes slow. Indexed array access is O(1), searching a linked list is O(n), and a hash table lookup is O(1) on average. Knowing these trade-offs helps you pick the right tool. Keep a cheat sheet nearby for the rest."
---

{{< quickanswer >}}
A data structure is a way of organizing data in memory so that certain operations run fast. Each structure makes a trade-off: it speeds up some actions, like lookup or insertion, and slows down others. An array gives you instant access by position. A hash table gives you instant lookup by name. A tree keeps data sorted while staying quick to search. Choosing the right structure is one of the biggest levers you have on the speed of a program.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/mechanical-system-composite-notext.png" alt="A composite of interconnected mechanical structures: a loom, cabling, and a filing cabinet on dark slate. No em-dashes." loading="lazy">
  <figcaption>Each organized structure here, the loom, the cabling, the filing cabinet, stores and moves material a different way, the same way each data structure stores data for a different job.</figcaption>
</figure>

## What a data structure is, and why the choice matters

A data structure is a way of arranging data in your computer's memory. The arrangement decides which operations are fast and which are slow. Memory itself is one long strip of numbered cells. A data structure is a plan for laying your data across those cells so a particular task becomes cheap.

The same data can live in many shapes. A list of customer names can sit in an array, a linked list, a hash table, or a tree. Each shape answers a different question quickly. Picking the wrong shape can turn a fast program into a slow one, even when the code looks correct.

You measure these trade-offs with Big O notation. Big O describes how the time for an operation grows as the data grows. O(1) means the time stays constant no matter how much data you have. O(n) means the time grows in step with the number of items, n. O(log n) sits between them and grows very slowly. Read [What is Big O Notation?](/basics/what-is-big-o-notation/) for the full picture.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Linear structures</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Array</span>
      <span class="bz-arch-chip">Linked list</span>
      <span class="bz-arch-chip">Stack</span>
      <span class="bz-arch-chip">Queue</span>
      <span class="bz-arch-chip-note">Items sit in a sequence, one after another</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Associative structures</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Hash table</span>
      <span class="bz-arch-chip-note">Find a value by its key, not its position</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hierarchical and connected structures</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Tree</span>
      <span class="bz-arch-chip">Binary search tree</span>
      <span class="bz-arch-chip">Heap</span>
      <span class="bz-arch-chip">Graph</span>
      <span class="bz-arch-chip-note">Items link to other items, in a hierarchy or a network</span>
    </div>
  </div>
</div>

## A real-world analogy

Think of three ways to store coats.

An **array** is like a wall of numbered lockers. If you know locker 7 holds your coat, you walk straight to it. You do not check lockers 1 through 6 first. Access by number is instant.

A **linked list** is like a treasure hunt. You start at the first clue, and each clue points to the next. To reach the tenth item, you follow nine clues in order. There is no shortcut to the middle. You only know where the next item lives once you read the current one.

A **hash table** is like a coat check. You hand over your coat and get a tag. Later you hand back the tag, and the attendant fetches your coat at once. The tag, your key, leads straight to the right hook without searching every coat in the room.

## Arrays

An array stores items in a single block of memory, side by side. Each item has an index, a position number that starts at 0. Because the items are packed in order, the computer can jump to any index in one step. Indexed access is O(1), constant time.

Arrays shine when you know the position you want. They are weak when you need to insert or remove an item in the middle, because everything after that point has to shift across to make room or close a gap.

```python
prices = [10, 25, 40, 55]   # an array of four numbers
print(prices[2])            # 40, found instantly by index
```

## Linked lists

A linked list stores each item in a small package called a node. Every node holds a value and a pointer, the memory address of the next node. The nodes can sit anywhere in memory because each one knows where the next one lives.

To find an item, you walk the chain from the start until you reach it. Access or search is O(n), because in the worst case you visit every node. The pay-off comes at insertion and deletion. Once you are holding a node, you splice a new one in or unhook one by changing a couple of pointers. That step is O(1).

```python
# a node points to the next node
node = {"value": 25, "next": some_other_node}
```

Use a linked list when you insert and delete often and rarely need to jump to a position by number.

## Stacks and queues

A stack and a queue are linear structures with a strict rule about which item leaves next.

A **stack** is last in, first out, written LIFO. The last item you add is the first you remove, like a pile of plates. The two operations are push (add to the top) and pop (remove from the top). Both are O(1). Stacks track the "undo" history in an editor and the chain of function calls in a running program.

A **queue** is first in, first out, written FIFO. The first item you add is the first you remove, like a line at a shop. The operations are enqueue (add to the back) and dequeue (remove from the front). Both are O(1). Queues hold jobs waiting to run and tasks waiting for a worker.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stack</span>
    <span class="bz-flow-step-name">Push, then pop</span>
    <span class="bz-flow-step-desc">Add A, add B, add C. Pop returns C first. Last in, first out.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Queue</span>
    <span class="bz-flow-step-name">Enqueue, then dequeue</span>
    <span class="bz-flow-step-desc">Add A, add B, add C. Dequeue returns A first. First in, first out.</span>
  </div>
</div>

## Hash tables

A hash table is the structure behind fast lookup. It stores key and value pairs and finds any value by its key, not by a position. You meet it constantly: a dictionary in Python, a Map in JavaScript, and a HashMap in Java are all hash tables.

It works with a hash function, a small piece of code that turns a key into a number. That number points to a slot where the value lives. Because the function jumps straight to the slot, search, insert, and delete are O(1) on average. The "on average" matters. Sometimes two keys land in the same slot, a collision, and the table handles it. With many collisions the cost can degrade to O(n) in the worst case, but a good hash function keeps that rare.

Compare looking up a user by name in an array versus a hash table.

```python
# Array: you scan every entry until you find the name. O(n).
users = [("ana", 30), ("ben", 41), ("cleo", 27)]
for name, age in users:
    if name == "cleo":
        print(age)          # 27, found after checking three entries

# Hash table: you jump straight to the key. O(1) on average.
users = {"ana": 30, "ben": 41, "cleo": 27}
print(users["cleo"])        # 27, found in one step
```

Reach for a hash table whenever you look things up by a name, an id, or any unique key.

## Trees and binary search trees

A tree is a hierarchical structure. It starts at a single root node and branches downward, where each node has child nodes below it. Folders on your computer form a tree: one folder holds files and other folders, which hold more files, and so on.

A **binary search tree**, or BST, is a tree where each node has at most two children and keeps an ordering rule. Smaller values go left, larger values go right. That rule lets you search by halving the data at each step, like flipping to the middle of a sorted phone book and then a quarter, and so on.

When a BST stays balanced, meaning the branches are roughly even in depth, search, insert, and delete all run in O(log n). A red-black tree is one common kind of self-balancing BST. The warning sign is balance. If you insert already-sorted data into a plain BST, it can grow into a long thin chain, no better than a linked list, and degrade to O(n). Self-balancing trees exist to prevent exactly that.

## A brief note on heaps and graphs

Two more structures show up often.

A **heap** is a tree that always keeps the smallest (or largest) value at the top. That makes it perfect for a priority queue, where you keep pulling out the most urgent item. Heaps power task schedulers and the core of several pathfinding algorithms.

A **graph** is a set of nodes connected by edges, with no required hierarchy. It models networks: friends on a social platform, roads between cities, links between web pages. Graphs are how you represent and search relationships rather than a strict sequence or tree.

## How the right structure makes search and sorting fast

The structure you choose sets the ceiling on speed. Searching an unsorted array means checking each item, which is O(n). Put the same data in a hash table and a lookup drops to O(1) on average. Keep it in a balanced BST and a lookup is O(log n), while the data also stays sorted for free.

Sorting depends on structure too. A heap gives you heapsort, a clean O(n log n) method. Many fast algorithms work by first arranging data into a helpful structure, then reading it back. The lesson holds across the board: pick the structure that makes your most frequent operation cheap, and the rest of the program follows.

| Structure | Operation | Average-case complexity |
|---|---|---|
| **Array** | Access by index | O(1) |
| **Array** | Search by value | O(n) |
| **Linked list** | Access or search | O(n) |
| **Linked list** | Insert or delete at a known node | O(1) |
| **Stack** | Push or pop | O(1) |
| **Queue** | Enqueue or dequeue | O(1) |
| **Hash table** | Search, insert, delete | O(1) average, O(n) worst |
| **Binary search tree (balanced)** | Search, insert, delete | O(log n) |
| **Binary search tree (unbalanced)** | Search, insert, delete | O(n) worst |

## What's next

- [How Search Algorithms Work](/basics/search-algorithms/): see how linear and binary search use these structures to find data.
- [How Sorting Algorithms Work](/basics/sorting-algorithms/): learn how ordering data unlocks faster search.
- [What is a Database?](/basics/what-is-a-database/): see how these structures persist data beyond a single program run.

## Further reading

- [Princeton Algorithms Cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/): a concise reference table of structures and their operation costs.
- [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/): the standard textbook covering every structure here in depth.
- [What is an Algorithm?](/basics/what-is-an-algorithm/): the step-by-step recipes that run on top of these structures.
- [What is Big O Notation?](/basics/what-is-big-o-notation/): how to read O(1), O(n), and O(log n) and compare speeds.
- [How Search Algorithms Work](/basics/search-algorithms/): the methods that find a value inside these structures.
- [How Sorting Algorithms Work](/basics/sorting-algorithms/): how to order data and why ordering speeds up search.
- [What is a Database?](/basics/what-is-a-database/): how structures like B-trees power durable, queryable storage.
