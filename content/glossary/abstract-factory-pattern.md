---
title: "Abstract Factory Pattern"
description: "A creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, creational-patterns, GoF, abstract-factory, object-oriented-design]
related:
  - glossary/factory-method-pattern
  - glossary/builder-pattern
  - glossary/singleton-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Abstract Factory pattern is a creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes. It is sometimes referred to as a "factory of factories."

## Origins and History

The Abstract Factory pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern drew from earlier work in GUI toolkit design, where applications needed to support multiple look-and-feel standards (Motif, Presentation Manager, Macintosh) without coupling application code to any specific widget set. The ET++ framework, which Gamma worked on in the late 1980s, was one of the systems that influenced this pattern's formalization.

## How It Works

The pattern defines an **AbstractFactory** interface with creation methods for each product type in the family. Each **ConcreteFactory** implements this interface and produces products that belong together. **AbstractProduct** interfaces define the types of objects the factory creates, and **ConcreteProduct** classes implement those interfaces. Client code uses only the abstract interfaces, never instantiating concrete classes directly.

For example, a UI toolkit might define an abstract factory with methods like `createButton()` and `createTextBox()`. A `WindowsFactory` produces Windows-styled widgets while a `MacFactory` produces macOS-styled widgets. Swapping the factory instance switches the entire product family.

## When to Use It

Use Abstract Factory when a system must be independent of how its products are created and composed, when a system should work with multiple families of products, when related products are designed to be used together and you need to enforce that constraint, or when you want to provide a library of products and expose only their interfaces.

## Common Pitfalls

Adding a new product type to the family requires changing the AbstractFactory interface and every ConcreteFactory, violating the Open-Closed Principle. This makes the pattern rigid when the set of product types changes frequently. For cases where product types change often but families are stable, Factory Method or Prototype may be better alternatives.

## Relationship to Other Patterns

Abstract Factory classes are often implemented with Factory Methods internally, though they can also use Prototype. A concrete factory is frequently a Singleton since only one instance per product family is typically needed.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Grand, M. (1998). *Patterns in Java, Volume 1*. Wiley.
