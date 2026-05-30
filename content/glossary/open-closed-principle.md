---
title: "Open-Closed Principle (OCP)"
description: "A SOLID design principle stating that software entities should be open for extension but closed for modification."
date: 2026-03-28
categories: [Glossary]
tags: [SOLID, OCP, design-principles, object-oriented-design, extensibility]
related:
  - glossary/solid-principles
  - glossary/single-responsibility-principle
  - glossary/strategy-pattern
  - glossary/decorator-pattern
last_updated: 2026-05-30
---

The Open-Closed Principle (OCP) states that software entities (classes, modules, functions) should be open for extension but closed for modification. You should be able to add new behavior to a system without altering existing, tested code.

## Origins and History

The Open-Closed Principle was originally formulated by Bertrand Meyer in *Object-Oriented Software Construction* (1988). Meyer's version relied on implementation inheritance: a class is "closed" once completed and tested, but "open" because it can be extended through subclassing. Robert C. Martin later reinterpreted the principle in his paper "The Open-Closed Principle" (1996) and in *Agile Software Development, Principles, Patterns, and Practices* (2002), emphasizing the use of abstraction and polymorphism rather than implementation inheritance. Martin's version advocates depending on abstract interfaces so that new behavior is introduced by providing new implementations of those interfaces, not by changing existing code.

## How It Works

OCP is achieved through abstraction. A module defines its behavior in terms of abstract interfaces or base classes. When new functionality is needed, a new class implementing the interface is created, and the existing module accepts it through dependency injection, configuration, or registration. The existing module's source code is never modified.

For example, a payment processing system defines a `PaymentProcessor` interface. Adding a new payment method (cryptocurrency) means creating a new `CryptoPaymentProcessor` class that implements the interface. The core processing logic does not change.

## When to Apply It

Apply OCP when you anticipate that a particular dimension of behavior will vary or expand over time, when modification of existing code carries high risk due to dependencies or lack of tests, or when you want to protect stable, tested modules from regression. Design patterns like Strategy, Decorator, Template Method, and Observer are common mechanisms for achieving OCP.

## Common Pitfalls

It is impossible and undesirable to anticipate every possible extension point. Premature abstraction adds complexity without benefit. OCP should be applied strategically at points where change is likely based on domain knowledge and experience, not universally. If a class has never needed extension and is unlikely to need it, adding abstraction layers for OCP compliance is over-engineering.

## Relationship to Other Principles

OCP is supported by Dependency Inversion (depending on abstractions enables extension) and Liskov Substitution (new implementations must be substitutable for the abstraction). Strategy and Decorator patterns are direct implementations of OCP.

## Sources

1. Meyer, B. (1988). *Object-Oriented Software Construction*. Prentice Hall.
2. Martin, R.C. (1996). "The Open-Closed Principle." *The C++ Report*.
3. Martin, R.C. (2002). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
