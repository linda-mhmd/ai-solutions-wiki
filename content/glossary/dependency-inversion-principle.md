---
title: "Dependency Inversion Principle (DIP)"
description: "A SOLID design principle stating that high-level modules should not depend on low-level modules, and both should depend on abstractions."
date: 2026-03-28
categories: [Glossary]
tags: [SOLID, DIP, design-principles, object-oriented-design, dependency-injection, abstractions]
related:
  - glossary/solid-principles
  - glossary/open-closed-principle
  - glossary/interface-segregation-principle
  - glossary/hexagonal-architecture
  - glossary/clean-architecture
last_updated: 2026-05-30
---

The Dependency Inversion Principle (DIP) states two things: high-level modules should not depend on low-level modules, and both should depend on abstractions. Additionally, abstractions should not depend on details; details should depend on abstractions.

## Origins and History

The Dependency Inversion Principle was formulated by Robert C. Martin and first published in his paper "The Dependency Inversion Principle" in *The C++ Report* (1996). He expanded on it in *Agile Software Development, Principles, Patterns, and Practices* (2002). The principle inverts the traditional dependency direction in procedural systems, where high-level policy modules depended directly on low-level implementation modules. Martin argued that this creates fragile architectures where changes to low-level details ripple up through the system. DIP became foundational to modern architectural patterns including Hexagonal Architecture (Alistair Cockburn, 2005) and Clean Architecture (Martin, 2017).

## How It Works

In a traditional layered architecture, the business logic layer directly calls the database layer. With DIP, the business logic layer defines an abstract interface (e.g., `OrderRepository`) describing what it needs. The database layer provides a concrete implementation of that interface. The dependency arrow now points from the low-level database module toward the high-level business module's abstraction, inverting the traditional direction.

Dependency injection (DI) is the most common mechanism for implementing DIP. A DI container or manual wiring at the application's composition root creates concrete implementations and passes them to classes that depend on abstractions. This keeps the high-level module ignorant of the specific low-level module in use.

## When to Apply It

Apply DIP when high-level business rules should be insulated from infrastructure changes (database swaps, third-party API changes), when you want to test business logic in isolation by substituting mock implementations, when multiple implementations of the same capability need to coexist (e.g., in-memory cache vs. Redis), or when you are designing a plugin architecture where the core system defines interfaces and plugins provide implementations.

## Common Pitfalls

DIP does not mean that every class needs an interface. Extracting interfaces for classes with only one implementation adds ceremony without benefit. Apply DIP at architectural boundaries where the cost of coupling is high, not at every class level. Overuse of dependency injection can make code difficult to follow, as the construction graph becomes opaque and navigation from usage to implementation requires tracing through configuration.

## Sources

1. Martin, R.C. (1996). "The Dependency Inversion Principle." *The C++ Report*.
2. Martin, R.C. (2002). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
3. Martin, R.C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
