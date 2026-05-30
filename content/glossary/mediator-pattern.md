---
title: "Mediator Pattern"
description: "A behavioral design pattern that defines an object that encapsulates how a set of objects interact, promoting loose coupling by preventing objects from referring to each other explicitly."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, mediator, decoupling, object-oriented-design]
related:
  - glossary/observer-pattern
  - glossary/facade-pattern
  - glossary/command-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Mediator pattern is a behavioral design pattern that defines an object that encapsulates how a set of objects interact. It promotes loose coupling by keeping objects from referring to each other explicitly and lets you vary their interaction independently.

## Origins and History

The Mediator pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern was motivated by GUI dialog boxes where multiple widgets (text fields, checkboxes, buttons) have complex interdependencies. For instance, enabling a button might depend on the state of multiple text fields and a checkbox. Rather than coupling every widget to every other widget, a dialog mediator centralizes the coordination logic. The SmallTalk VisualWorks framework used this approach extensively.

## How It Works

The **Mediator** interface defines methods for communication between colleague objects. The **ConcreteMediator** implements the coordination logic and maintains references to colleague objects. **Colleague** classes know their mediator and communicate with other colleagues exclusively through it. When a Colleague changes state, it notifies the Mediator, which then coordinates the appropriate response by contacting other relevant Colleagues.

The communication flow replaces a many-to-many mesh of connections with a star topology centered on the mediator. Each colleague knows only about the mediator, not about other colleagues.

## When to Use It

Use Mediator when a set of objects communicate in well-defined but complex ways, when reusing an object is difficult because it refers to and communicates with many other objects, or when behavior distributed between several classes should be customizable without extensive subclassing. Common applications include GUI dialog management, chat room systems, air traffic control coordination, and workflow orchestration engines.

## Common Pitfalls

The mediator itself can become a "god object" that accumulates too much logic, becoming a maintenance bottleneck. As the number of colleagues and interaction rules grows, the mediator class can become more complex than the distributed coupling it replaced. This can be mitigated by decomposing the mediator into sub-mediators or by combining it with Observer or Command patterns to distribute the coordination logic.

## Relationship to Other Patterns

Mediator centralizes communication; Observer distributes it. Facade provides a simplified interface to a subsystem but does not add new behavior, while Mediator adds coordination behavior. Colleagues can communicate with the Mediator using the Observer pattern (publish-subscribe).

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Shalloway, A., Trott, J. (2004). *Design Patterns Explained*, 2nd Edition. Addison-Wesley.
