---
title: "Inheritance and Polymorphism"
description: "Core object-oriented programming mechanisms: inheritance creates class hierarchies for code reuse, while polymorphism enables objects of different types to be treated uniformly through a shared interface."
date: 2026-03-28
categories: [Glossary]
tags: [OOP, inheritance, polymorphism, object-oriented-design, method-overriding, runtime-dispatch]
related:
  - glossary/object-oriented-programming
  - glossary/encapsulation
  - glossary/abstraction
  - glossary/composition-over-inheritance
  - glossary/liskov-substitution-principle
last_updated: 2026-05-30
---

Inheritance and polymorphism are two fundamental mechanisms of object-oriented programming. Inheritance establishes a hierarchical relationship between classes where a subclass inherits structure and behavior from a parent class. Polymorphism allows objects of different types to respond to the same message or method call in type-specific ways.

## Origins and History

Inheritance was introduced in Simula 67 (1967) by Ole-Johan Dahl and Kristen Nygaard at the Norwegian Computing Center. Simula was the first language to support classes and subclasses as a mechanism for modeling real-world entities. Alan Kay's Smalltalk (1972, Xerox PARC) built on these ideas and introduced message passing as the core polymorphic mechanism: any object that understands a message can respond to it, regardless of its class. Bjarne Stroustrup brought inheritance and virtual functions (enabling runtime polymorphism) to C++ in the 1980s, and the mechanisms became standard across Java, C#, Python, and most modern object-oriented languages.

## How Inheritance Works

A subclass (derived class, child class) extends a superclass (base class, parent class), inheriting its fields and methods. The subclass can add new fields and methods, and can override inherited methods to provide specialized behavior. Inheritance models "is-a" relationships: a `Dog` is an `Animal`, so `Dog extends Animal`.

Single inheritance allows one parent class; multiple inheritance (supported in C++ and Python) allows multiple parent classes. Languages like Java and C# use single class inheritance combined with multiple interface implementation to avoid the complexity of multiple inheritance.

## How Polymorphism Works

**Subtype polymorphism** (runtime polymorphism) allows a variable of a base type to refer to an object of any subtype. When a method is called on that variable, the actual method executed depends on the runtime type of the object, not the declared type of the variable. This is implemented through virtual method dispatch (vtables in C++, invoking the overriding method in Java/C#).

**Ad hoc polymorphism** (method overloading) allows multiple methods with the same name but different parameter types. **Parametric polymorphism** (generics/templates) allows code to operate on types specified as parameters.

## When to Use Them

Use inheritance when there is a genuine "is-a" relationship with shared behavior and a stable contract. Use polymorphism whenever you want to write code that operates on abstract types without knowing concrete implementations, enabling the Open-Closed Principle and supporting plugin architectures, strategy patterns, and dependency injection.

## Common Pitfalls

Deep inheritance hierarchies create fragile base class problems, where changes to a parent class unexpectedly break subclasses. Inheriting for code reuse rather than modeling true type relationships leads to LSP violations. Prefer composition over inheritance for combining behaviors, and use inheritance primarily for establishing type hierarchies with polymorphic substitution.

## Sources

1. Dahl, O.-J., Nygaard, K. (1966). "SIMULA: An ALGOL-Based Simulation Language." *Communications of the ACM*, 9(9).
2. Stroustrup, B. (1994). *The Design and Evolution of C++*. Addison-Wesley.
3. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
4. Bloch, J. (2008). *Effective Java*, 2nd Edition. Addison-Wesley.
