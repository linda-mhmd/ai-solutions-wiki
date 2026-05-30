---
title: "Liskov Substitution Principle (LSP)"
description: "A SOLID design principle stating that objects of a supertype should be replaceable with objects of a subtype without altering the correctness of the program."
date: 2026-03-28
categories: [Glossary]
tags: [SOLID, LSP, design-principles, object-oriented-design, type-safety, inheritance]
related:
  - glossary/solid-principles
  - glossary/open-closed-principle
  - glossary/inheritance-and-polymorphism
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Liskov Substitution Principle (LSP) states that if S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program. Subtypes must be behaviorally compatible with their base types.

## Origins and History

The principle was introduced by Barbara Liskov in her keynote address "Data Abstraction and Hierarchy" at the ACM SIGPLAN OOPSLA conference in 1987. Liskov and Jeannette Wing later formalized it rigorously in their 1994 paper "A Behavioral Notion of Subtyping," which defined substitutability in terms of preconditions, postconditions, and invariants. Robert C. Martin adopted LSP as the third SOLID principle in *Agile Software Development, Principles, Patterns, and Practices* (2002), emphasizing its practical consequences for inheritance design in object-oriented systems.

## How It Works

LSP requires that a subclass honor the behavioral contract of its parent class. Specifically: preconditions cannot be strengthened in a subtype (a subclass must accept at least everything the parent accepts), postconditions cannot be weakened (a subclass must guarantee at least everything the parent guarantees), invariants of the supertype must be preserved, and the subtype must not throw new exceptions that the supertype's clients do not expect.

The classic violation is the Rectangle-Square problem. If `Square` extends `Rectangle` and overrides `setWidth()` to also set height, code that relies on setting width and height independently breaks. The subtype (Square) violates the behavioral contract of the supertype (Rectangle).

## When to Apply It

Apply LSP whenever you use inheritance or implement interfaces. Before creating a subclass, verify that it can fulfill the parent's contract in all contexts where the parent is used. Use LSP as a test for whether inheritance is the right relationship: if a subclass cannot honor the base class contract, composition or a different abstraction is preferable.

## Common Pitfalls

LSP violations often appear when inheritance is used to share code rather than to model genuine "is-a" relationships. Type-checking with `instanceof` or downcasting in client code is a strong indicator of LSP violation, as it means the client cannot treat subtypes uniformly. Violating LSP breaks the Open-Closed Principle because client code must be modified to handle special subtype cases.

## Relationship to Other Principles

LSP underpins OCP: if subtypes are not substitutable, extending behavior through new implementations is unreliable. LSP works with DIP by ensuring that abstract types can be safely swapped with any concrete implementation.

## Sources

1. Liskov, B. (1987). "Data Abstraction and Hierarchy." *ACM SIGPLAN Notices*, 23(5).
2. Liskov, B., Wing, J. (1994). "A Behavioral Notion of Subtyping." *ACM Transactions on Programming Languages and Systems*, 16(6).
3. Martin, R.C. (2002). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
