---
title: "Use Case Diagram"
description: "A UML behavioral diagram that captures system functionality from the user's perspective, showing actors, use cases, and system boundaries."
date: 2026-03-28
categories: [Glossary]
tags: [uml, use-case, requirements, actors, behavioral-diagrams]
last_updated: 2026-05-30
---

A use case diagram is a UML behavioral diagram that shows the functionality a system provides from the perspective of its users. It identifies the actors who interact with the system, the use cases (goals) they can accomplish, and the boundary of the system. Use case diagrams are primarily used during requirements analysis to capture what the system should do without specifying how it does it.

## Key Elements

**Actors** represent entities that interact with the system from outside its boundary. Actors are drawn as stick figures with a name label. They can be human users (Customer, Administrator), external systems (Payment Gateway, Email Service), or hardware devices (Barcode Scanner). Primary actors initiate interactions with the system; secondary actors are called upon by the system.

**Use cases** represent discrete units of functionality the system provides, drawn as labeled ovals inside the system boundary. Each use case describes a goal an actor can achieve: "Place Order," "Generate Report," "Reset Password." A use case delivers an observable result of value to an actor.

**System boundary** is a rectangle enclosing all use cases, representing the scope of the system being modeled. The system name appears at the top of the rectangle. Actors are placed outside the boundary.

**Associations** are lines connecting actors to the use cases they participate in. An association means the actor interacts with that use case.

## Relationships Between Use Cases

**Include** (dashed arrow with `<<include>>` label) indicates that one use case always incorporates the behavior of another. "Place Order" includes "Validate Payment" because payment validation is always required. Include extracts common behavior shared by multiple use cases.

**Extend** (dashed arrow with `<<extend>>` label) indicates that one use case optionally adds behavior to another at a specified extension point. "Place Order" may be extended by "Apply Discount Code" when a coupon is present. The base use case is complete without the extension.

**Generalization** (solid arrow with triangle arrowhead) shows that one use case or actor is a specialized version of another. "Pay by Credit Card" and "Pay by Bank Transfer" generalize to "Make Payment."

## Writing Use Case Descriptions

The diagram itself shows the big picture but lacks detail. Each use case is typically accompanied by a textual description specifying the primary actor, preconditions, main success scenario (step-by-step flow), alternative flows, and postconditions. The combination of diagram and descriptions forms a complete requirements specification.

## Practical Guidelines

Keep use case diagrams at a high level. A diagram with more than 15-20 use cases becomes difficult to read and should be split. Use case names should be verb phrases describing goals ("Manage Inventory," "Track Shipment"), not implementation details ("Click Submit Button"). Avoid modeling CRUD operations as separate use cases unless they have distinct business rules.

## Origins and History

Ivar Jacobson introduced the use case concept in his 1987 OOPSLA paper and expanded it in his 1992 book on object-oriented software engineering [1]. Use cases became a central element of Jacobson's OOSE methodology. When Jacobson joined Booch and Rumbaugh to create UML, use case diagrams were incorporated as a core diagram type in UML 1.0 (1997) [2]. Alistair Cockburn later refined use case writing practices in his influential 2001 book [3].

## Sources

1. Jacobson, I. (1992). *Object-Oriented Software Engineering: A Use Case Driven Approach*. Addison-Wesley.
2. Object Management Group (1997). "UML 1.0 Specification." [https://www.omg.org/spec/UML/](https://www.omg.org/spec/UML/)
3. Cockburn, A. (2001). *Writing Effective Use Cases*. Addison-Wesley.
