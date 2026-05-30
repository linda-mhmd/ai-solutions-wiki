---
title: "Composition Over Inheritance"
description: "A design principle that favors object composition over class inheritance for code reuse, resulting in more flexible and maintainable systems."
date: 2026-03-28
categories: [Glossary]
tags: [design-principles, composition, inheritance, GoF, object-oriented-design, flexibility]
related:
  - glossary/inheritance-and-polymorphism
  - glossary/strategy-pattern
  - glossary/decorator-pattern
  - glossary/bridge-pattern
  - glossary/solid-principles
last_updated: 2026-05-30
---

Composition over inheritance is a design principle that advises favoring object composition (has-a relationships) over class inheritance (is-a relationships) as the primary mechanism for code reuse and behavioral variation. It leads to more flexible, loosely coupled designs.

## Origins and History

The principle was prominently stated by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). In the book's introduction, they wrote: "Favor object composition over class inheritance." This was one of two fundamental design principles the GoF identified (the other being "program to an interface, not an implementation"). The advice was rooted in the authors' experience that inheritance hierarchies in real systems became rigid and fragile, while composition-based designs remained adaptable. Joshua Bloch reinforced this in *Effective Java* (2001, 2008) with Item 16: "Favor composition over inheritance."

## How It Works

With inheritance, a subclass automatically gets the behavior of its parent class and can override or extend it. With composition, an object holds references to other objects that provide the desired behavior, delegating work to them through their interfaces.

For example, instead of creating `FlyingDuck extends Duck` and `SwimmingDuck extends Duck` (leading to a `FlyingSwimmingDuck` problem), a `Duck` class holds a `FlyBehavior` and `SwimBehavior` field. Different behavior implementations can be mixed and matched at runtime without modifying the Duck class hierarchy.

## When to Apply It

Prefer composition when behavior needs to change at runtime, when you need to combine behaviors from multiple sources (which multiple inheritance handles poorly), when subclasses would inherit methods that do not make sense for them (violating LSP), when the parent class is not under your control and may change in incompatible ways, or when a deep inheritance hierarchy makes the system rigid and hard to understand.

## Common Pitfalls

Composition requires more explicit code (delegation methods) compared to inheritance, where behavior is inherited automatically. For genuine is-a relationships with stable contracts, inheritance remains appropriate and simpler. Over-applying composition can result in excessive indirection and a proliferation of small objects that are hard to trace. The choice between inheritance and composition should be based on the specific relationship between concepts, not applied as a blanket rule.

## Relationship to Other Patterns

Strategy, Decorator, and Bridge are patterns that implement composition over inheritance. Strategy replaces inherited behavior with composed behavior objects. Decorator wraps objects instead of subclassing them. Bridge separates abstraction from implementation through composition.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Bloch, J. (2008). *Effective Java*, 2nd Edition, Item 16. Addison-Wesley.
3. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
