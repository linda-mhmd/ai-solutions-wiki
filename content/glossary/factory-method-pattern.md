---
title: "Factory Method Pattern"
description: "A creational design pattern that defines an interface for creating objects but lets subclasses decide which class to instantiate."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, creational-patterns, GoF, factory-method, object-oriented-design]
related:
  - glossary/abstract-factory-pattern
  - glossary/singleton-pattern
  - glossary/builder-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Factory Method pattern is a creational design pattern that defines an interface for creating an object but defers the decision of which concrete class to instantiate to subclasses. It lets a class delegate instantiation to its subclasses, promoting loose coupling between the creator and the product.

## Origins and History

The Factory Method pattern was formally defined by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The concept of deferring object creation to subclasses was already common practice in Smalltalk frameworks, but the GoF formalized the structure, participants, and consequences as a reusable pattern. It is one of the most widely used patterns in object-oriented frameworks and libraries.

## How It Works

The pattern has four participants. The **Product** defines the interface of objects the factory method creates. The **ConcreteProduct** implements the Product interface. The **Creator** declares the factory method, which returns a Product object, and may provide a default implementation. The **ConcreteCreator** overrides the factory method to return a specific ConcreteProduct instance.

Client code works with the Creator and Product interfaces, never needing to know which concrete class was instantiated. When a new product type is needed, a new ConcreteCreator subclass is added without modifying existing code.

## When to Use It

Factory Method is appropriate when a class cannot anticipate the type of objects it needs to create, when a class wants its subclasses to specify the objects it creates, or when you want to localize the knowledge of which helper class is the delegate. It appears frequently in frameworks where library code needs to create objects that application code defines.

## Common Pitfalls

The pattern can lead to a proliferation of subclasses, since each new product type requires a corresponding creator subclass. This class hierarchy overhead may be excessive for simple scenarios. If the number of product types grows significantly, the Abstract Factory or a registry-based approach may be more appropriate. Additionally, developers sometimes confuse Factory Method (which uses inheritance and subclass overriding) with the simpler Static Factory or Simple Factory idiom (which uses a conditional in a single method).

## Relationship to Other Patterns

Factory Method is often used alongside Template Method, where the template method calls a factory method as one of its steps. It can evolve into Abstract Factory when families of related products are needed. Prototype can serve as an alternative when creating objects by cloning rather than by subclassing.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Bloch, J. (2008). *Effective Java*, 2nd Edition. Addison-Wesley.
3. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
