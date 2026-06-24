---
title: "Programming Paradigms: Procedural, Object-Oriented, Functional, and More"
description: "A plain-English tour of the main ways to organize code, from procedural and object-oriented to functional, declarative, and logic styles."
date: 2026-06-23
level: 2
categories: [Basics]
tags: ["beginner","programming-paradigms","oop","functional-programming","procedural","declarative","sql","haskell"]
docs: "https://cs.lmu.edu/~ray/notes/paradigms/"
docs_label: "LMU: Programming Paradigms"
faqs:
  - question: "What is a programming paradigm in plain English?"
    answer: "A programming paradigm is a style of organizing code. It is a way of thinking about what your program is made of, such as steps, objects, functions, or descriptions of a result. It shapes how you structure a solution, not what the program ultimately does."
  - question: "Which paradigm should a beginner learn first?"
    answer: "Most beginners start with procedural and object-oriented styles because popular teaching languages like Python support both. You write step-by-step code first, then group related data and functions into objects. Functional and declarative ideas make more sense once you are comfortable with those basics."
  - question: "Is a paradigm a property of the language or the programmer?"
    answer: "Both, depending on the language. Some languages push you toward one style. Many modern languages, including Python and JavaScript, are multi-paradigm, so they support procedural, object-oriented, and functional styles. In those languages the paradigm is a choice you make as you write."
  - question: "What is the difference between imperative and declarative code?"
    answer: "Imperative code tells the computer the exact steps to follow to reach a result. Declarative code describes the result you want and lets the system work out the steps. SQL is a classic declarative example because you state which rows you want, not how to scan the table."
---

{{< quickanswer >}}
A programming paradigm is a style of organizing code, a way of deciding what your program is built from. Procedural code is a list of step-by-step commands. Object-oriented code groups data with the functions that act on it. Functional code combines small, predictable functions. Declarative code describes the result you want and lets the system find the steps. Logic code states facts and rules, then asks whether something is true. Many modern languages support several of these styles at once, so a paradigm is often a way of writing rather than a fixed property of the language.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/bolt-mold-joint-triptych-notext.png" alt="A triptych of a copper bolt, a precision mold, and interlocking blocks on dark slate. No em-dashes." loading="lazy">
  <figcaption>Three ways to shape the same metal: each method suits a different goal, the way each paradigm suits a different way of organizing code.</figcaption>
</figure>

A paradigm answers one question before you write a single line: what is my program made of? One programmer sees a sequence of steps. Another sees a set of objects. A third sees a chain of functions. A fourth sees a description of a result. All four can solve the same problem. They organize the work differently. This article walks through the main paradigms, gives a tiny example of each, and shows when to reach for each one.

## A map of the paradigms

The paradigms split into two broad families. Imperative styles tell the computer the steps to follow. Declarative styles describe the result and leave the steps to the system. The diagram below groups the main paradigms inside those two families.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Imperative family</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Procedural</span>
      <span class="bz-arch-chip">Object-oriented</span>
      <span class="bz-arch-chip-note">You spell out the steps that change the program state</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Declarative family</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Functional</span>
      <span class="bz-arch-chip">SQL declarative</span>
      <span class="bz-arch-chip">Logic</span>
      <span class="bz-arch-chip-note">You describe the result and let the system find the steps</span>
    </div>
  </div>
</div>

The split is not a wall. Functional code is often called declarative-leaning because it describes results through combined functions. Logic programming is a subtype of declarative. Keep the families as a rough map, not a strict border.

## The dinner analogy

Picture four cooks preparing the same dinner.

The first cook follows a recipe step by step: chop the onions, heat the pan, add the stock. That is **procedural**. The plan is a list of ordered commands.

The second cook runs a kitchen with stations: one person owns the grill, another owns the sauce. Each station holds its own tools and knows its own job. That is **object-oriented**. Work is split among objects that bundle their data with their actions.

The third cook builds the meal from reusable techniques: a way to reduce a sauce, a way to sear, applied the same way every time with the same result. That is **functional**. The meal is a composition of predictable techniques.

The fourth cook tells a head chef "I want a medium-rare steak with peppercorn sauce" and walks away. That is **declarative**. You name the result and trust the chef to work out the steps.

## What a paradigm is

A paradigm is a style or way of organizing code. It is the mental model you use to break a problem into parts. Procedural thinking breaks a problem into steps. Object-oriented thinking breaks it into objects. Functional thinking breaks it into functions. Declarative thinking breaks it into a description of the answer. The paradigm shapes the structure of your code, not the final behaviour of the program.

## Procedural programming

Procedural code is imperative. It is a set of explicit, step-by-step commands organized into procedures. A procedure is a named block of steps that you can call by name. Procedures read and update **state**, meaning the values your program holds in memory as it runs. C is a classic procedural language. Pascal and Algol are others.

Here is a tiny procedural shape. Read it as a sequence of commands that change a running total.

```
set total to 0
for each price in cart:
    add price to total
print total
```

The program walks the list, updates `total` at each step, and prints the result. You control every step. This style is direct and easy to follow for small tasks.

## Object-oriented programming

Object-oriented programming, often shortened to OOP, organizes code into **objects**. An object bundles **data**, also called its state, with the functions that act on that data. Smalltalk, Java, C++, C#, Python, and Ruby all support OOP.

Three ideas are the conventional summary of OOP. Treat them as the standard framing.

- **Encapsulation** means an object keeps its internal state private and exposes a public interface. Other code talks to the object through that interface and does not touch the inner details. A `BankAccount` object hides its balance and offers `deposit` and `withdraw` methods.
- **Inheritance** means one object type can build on another. A `SavingsAccount` can inherit everything a `BankAccount` has and add interest on top, without copying the original code.
- **Polymorphism** means different object types can answer the same request in their own way. Call `area()` on a `Circle` and on a `Square`, and each computes its area with its own formula.

Here is a tiny object-oriented shape.

```
object Counter:
    private count = 0
    method increment():
        add 1 to count
    method value():
        return count
```

The `count` stays inside the object. Outside code calls `increment()` and `value()`. It never reaches in to change `count` directly. That is encapsulation in action.

## Functional programming

Functional programming builds programs from **pure functions**. A pure function takes inputs, returns an output, and does nothing else. Given the same inputs, it always returns the same output, and it never changes any state outside itself. Control flow comes from combining function calls rather than from step-by-step commands. Haskell, Lisp and Scheme, ML, OCaml, and Erlang are functional languages.

Two ideas matter here. **Immutability** means values do not change after you create them. Instead of editing a list, you produce a new list. **Composition** means you build complex behaviour by feeding one function's output into the next.

Haskell is a leading example. Its official site describes it as "a purely functional programming language that features referential transparency, immutability and lazy evaluation". It is also statically typed, which means every expression has a type the compiler determines before the program runs. Lazy evaluation means Haskell delays computing a value until that value is actually needed.

Here is a tiny functional shape. No step changes a running total. You combine functions instead.

```
total = sum(map(priceOf, cart))
```

`map` applies `priceOf` to every item, producing a new list of prices. `sum` folds that list into one number. Nothing is mutated. The same `cart` always yields the same `total`.

## Declarative programming and SQL

Declarative programming flips the question. You describe the **result** you want, not the step-by-step how. The system figures out the steps. SQL is the classic example. SQL is the language for asking questions of relational databases.

Here is a tiny SQL example.

```
SELECT name, email
FROM customers
WHERE country = 'France';
```

You state which columns and which rows you want. You do not write a loop to scan the table or an index lookup. The database engine decides how to find the rows efficiently. You declared the result; the engine handled the method.

## When SQL gains procedural features: PL/SQL

Sometimes pure declarative SQL is not enough, and you need variables, loops, and conditionals. PL/SQL fills that gap. Per Oracle, PL/SQL is "the Oracle procedural extension of SQL, a portable, high-performance transaction-processing language". It is commonly expanded as Procedural Language/SQL. It adds procedural features on top of declarative SQL, so you can write step-by-step logic around your queries. PL/SQL shows that a single tool can blend paradigms: declarative queries inside procedural control flow.

## Logic programming and Prolog

Logic programming is a subtype of declarative programming. You set up **facts** and **inference rules**, then ask whether something is true. Prolog is the best-known logic language. You might state the fact "Anna is a parent of Ben" and the rule "an ancestor is a parent, or a parent of an ancestor". Then you ask "is Anna an ancestor of Ben?" and the system searches the facts and rules to answer. You never write the search itself. You describe the relationships and pose the question.

## Most popular languages are multi-paradigm

Here is the practical truth: a paradigm is often a way of writing, not a fixed property of a language. Many modern languages are **multi-paradigm**. Python and JavaScript support procedural, object-oriented, and functional styles. In Python you can write a plain script of steps, define classes with objects, or chain pure functions over a list, all in the same file. So the paradigm you use is frequently a choice you make as you write, shaped by the problem in front of you.

## When to reach for each style

Reach for **procedural** when the task is a short, linear sequence of steps, like a script that processes a file once. Reach for **object-oriented** when you model real-world things with state and behaviour, like users, orders, and accounts in a large application. Reach for **functional** when you transform data and want predictable, testable pieces, like a data pipeline. Reach for **declarative** when a system already knows how to find the answer, like querying a database with SQL. Reach for **logic** when you express relationships and rules and want the system to reason over them.

## Comparison table

| | Core idea | Example language | Good for |
|---|---|---|---|
| **Procedural** | Ordered step-by-step commands | C | Short linear scripts |
| **Object-oriented** | Objects bundle data with behaviour | Java | Large modelled systems |
| **Functional** | Combine pure, predictable functions | Haskell | Data transformation pipelines |
| **Declarative** | Describe the result, not the steps | SQL | Querying databases |
| **Logic** | State facts and rules, then ask | Prolog | Reasoning over relationships |

## What's next

- [What is a Programming Language?](/basics/what-is-a-programming-language/): how languages let you express any of these paradigms.
- [What is a Data Structure?](/basics/what-is-a-data-structure/): the building blocks your code organizes, whichever paradigm you choose.

## Further reading

- [LMU: Programming Paradigms](https://cs.lmu.edu/~ray/notes/paradigms/): a concise academic overview of the main paradigms and their relationships.
- [Haskell](https://www.haskell.org/): the official site for the purely functional language, with downloads and learning resources.
- [Oracle PL/SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/19/lnpls/overview.html): the official reference for Oracle's procedural extension to SQL.
- [What is a Programming Language?](/basics/what-is-a-programming-language/): the foundation behind every paradigm in this article.
- [What is Coding?](/basics/what-is-coding/): a plain-English starting point for writing instructions a computer can run.
- [What is an Algorithm?](/basics/what-is-an-algorithm/): the step-by-step logic that paradigms organize in different ways.
- [What is a Data Structure?](/basics/what-is-a-data-structure/): how programs store and arrange the data each paradigm works on.
