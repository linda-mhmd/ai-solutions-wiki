---
title: "Law of Demeter"
description: "A design guideline for developing software, particularly object-oriented programs, that promotes loose coupling by restricting the set of objects a method should communicate with."
date: 2026-03-28
categories: [Glossary]
tags: [design-principles, law-of-demeter, coupling, encapsulation, object-oriented-design]
related:
  - glossary/encapsulation
  - glossary/solid-principles
  - glossary/facade-pattern
  - glossary/mediator-pattern
last_updated: 2026-05-30
---

The Law of Demeter (LoD), also known as the Principle of Least Knowledge, is a design guideline stating that a method should only talk to its immediate friends and not to strangers. It restricts the set of objects that a method can send messages to, reducing coupling between components.

## Origins and History

The Law of Demeter was formulated in 1987 by Karl Lieberherr and Ian Holland at Northeastern University in Boston. It was named after the Demeter project, a research project on adaptive programming and aspect-oriented software development. The name "Demeter" refers to the Greek goddess of agriculture, reflecting the project's focus on growing software. Lieberherr and Holland published the principle in "Assuring Good Style for Object-Oriented Programs" (1989) in *IEEE Software*. The principle was later popularized by Hunt and Thomas in *The Pragmatic Programmer* (1999) and by Robert C. Martin in *Clean Code* (2008).

## How It Works

The formal rule states that a method M of object O may only invoke methods on the following objects: O itself, M's parameters, any objects created or instantiated within M, O's direct component objects (fields), and global objects accessible in the scope of M.

In practical terms, this means avoiding "train wreck" chains like `customer.getAddress().getCity().getZipCode()`. Each dot in such a chain reaches through an object to access another object's internals, creating transitive dependencies. Instead, the caller should ask the immediate object for what it needs: `customer.getZipCode()`, with the Customer class internally navigating its own structure.

## When to Apply It

Apply the Law of Demeter when you observe long chains of method calls that traverse object graphs, when changes to an internal class break distant callers that should not know about that class, when unit testing a method requires mocking deeply nested dependencies, or when a change to one class ripples through many unrelated classes.

## Common Pitfalls

Strictly applying LoD can lead to a proliferation of wrapper and delegate methods on intermediate classes, making the codebase verbose. The law applies to behavioral methods that perform actions, not necessarily to data structures or DTOs whose purpose is to expose data. Fluent APIs and builder patterns intentionally chain method calls but return the same or related objects, which is a different pattern than reaching through an object graph. Context matters: applying LoD dogmatically to data transfer objects creates unnecessary boilerplate.

## Relationship to Other Patterns

Facade and Mediator implement LoD at the architectural level by providing simplified interfaces that hide internal object interactions. Encapsulation supports LoD by hiding internal structure behind public methods.

## Sources

1. Lieberherr, K., Holland, I. (1989). "Assuring Good Style for Object-Oriented Programs." *IEEE Software*, 6(5).
2. Hunt, A., Thomas, D. (1999). *The Pragmatic Programmer: From Journeyman to Master*. Addison-Wesley.
3. Martin, R.C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
