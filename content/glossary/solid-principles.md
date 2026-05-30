---
title: "SOLID Principles"
description: "Five foundational object-oriented design principles that promote maintainable, flexible, and understandable software: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion."
date: 2026-03-28
categories: [Glossary]
tags: [SOLID, design-principles, object-oriented-design, clean-code, software-architecture]
related:
  - glossary/single-responsibility-principle
  - glossary/open-closed-principle
  - glossary/liskov-substitution-principle
  - glossary/interface-segregation-principle
  - glossary/dependency-inversion-principle
  - glossary/clean-architecture
last_updated: 2026-05-30
---

SOLID is an acronym for five object-oriented design principles that guide developers toward software that is easier to maintain, extend, and understand. Together, they form a foundation for building robust systems that accommodate change without cascading breakage.

## Origins and History

The five principles were assembled and promoted by Robert C. Martin (Uncle Bob) beginning in the early 2000s. Martin first articulated them together in his paper "Design Principles and Design Patterns" (2000) and expanded on them in *Agile Software Development, Principles, Patterns, and Practices* (2002). The SOLID acronym itself was coined by Michael Feathers around 2004 as a mnemonic for Martin's five principles. While Martin popularized the collection, individual principles have distinct origins: the Open-Closed Principle from Bertrand Meyer (1988), the Liskov Substitution Principle from Barbara Liskov (1987), and the remaining three principally from Martin's own work.

## The Five Principles

**Single Responsibility Principle (SRP)** states that a class should have only one reason to change. Each class should encapsulate a single responsibility, making it easier to understand, test, and modify without unintended side effects.

**Open-Closed Principle (OCP)** states that software entities should be open for extension but closed for modification. New behavior should be added by extending existing code (through inheritance, composition, or abstraction) rather than changing it.

**Liskov Substitution Principle (LSP)** states that objects of a supertype should be replaceable with objects of a subtype without altering the correctness of the program. Subtypes must honor the contracts established by their base types.

**Interface Segregation Principle (ISP)** states that no client should be forced to depend on methods it does not use. Large, monolithic interfaces should be split into smaller, more specific ones so that clients only need to know about the methods relevant to them.

**Dependency Inversion Principle (DIP)** states that high-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

## Why SOLID Matters

Applying SOLID leads to systems with low coupling and high cohesion. Changes propagate through fewer modules, unit testing is straightforward because dependencies are injected through interfaces, and new features are added through extension rather than modification of existing code. These properties are essential in long-lived enterprise systems where requirements evolve continuously.

## Common Pitfalls

Over-applying SOLID can lead to excessive abstraction, premature generalization, and class explosions where simple logic is fragmented across many tiny classes and interfaces. The principles are guidelines, not absolute laws. Pragmatic application balances design purity with simplicity and readability.

## Sources

1. Martin, R.C. (2000). "Design Principles and Design Patterns." *objectmentor.com*.
2. Martin, R.C. (2002). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
3. Martin, R.C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
4. Meyer, B. (1988). *Object-Oriented Software Construction*. Prentice Hall.
5. Liskov, B. (1987). "Data Abstraction and Hierarchy." *ACM SIGPLAN Notices*, 23(5).
