---
title: "Class Diagram"
description: "The most widely used UML diagram type, showing classes with their attributes and methods along with the relationships between them."
date: 2026-03-28
categories: [Glossary]
tags: [uml, class-diagram, object-oriented, software-modeling, relationships]
last_updated: 2026-05-30
---

A class diagram is a UML structural diagram that shows the classes in a system, their attributes and methods, and the relationships between them. It is the most frequently used UML diagram type and serves as the primary tool for modeling the static structure of object-oriented systems.

## Class Notation

Each class is drawn as a rectangle divided into three compartments.

**Name compartment** (top) contains the class name. Abstract classes are shown in italics or with the `<<abstract>>` stereotype. Interfaces use the `<<interface>>` stereotype.

**Attributes compartment** (middle) lists the class's data fields with their visibility, name, and type. Visibility markers indicate access: `+` public, `-` private, `#` protected, `~` package. For example, `- email: String` is a private attribute of type String.

**Methods compartment** (bottom) lists the class's operations with visibility, name, parameters, and return type. For example, `+ calculateTotal(taxRate: double): double` is a public method.

## Relationships

**Association** represents a structural connection between classes, drawn as a solid line. A Customer is associated with an Order. Multiplicity annotations (1, 0..1, 1..*, 0..*) specify how many instances of one class relate to instances of the other.

**Aggregation** is a "has-a" relationship where the part can exist independently of the whole, drawn as a line with an open diamond at the whole end. A Department has Employees, but Employees exist independently of the Department.

**Composition** is a stronger "owns-a" relationship where the part cannot exist without the whole, drawn with a filled diamond. A House is composed of Rooms; destroying the House destroys the Rooms.

**Inheritance (Generalization)** represents an "is-a" relationship, drawn as a solid line with a closed triangle arrowhead pointing to the parent class. SavingsAccount inherits from Account.

**Realization (Implementation)** shows that a class implements an interface, drawn as a dashed line with a closed triangle arrowhead pointing to the interface.

**Dependency** indicates that one class uses another temporarily (e.g., as a method parameter), drawn as a dashed arrow.

## Practical Use

Class diagrams are used during design to plan the structure of an application, during code reviews to communicate architecture, and in documentation to provide an overview of a codebase. They can be generated automatically from source code using reverse-engineering tools or created manually in tools like PlantUML, Lucidchart, or draw.io.

Keeping class diagrams at the right level of detail is important. Including every attribute and method of every class produces a diagram that is too complex to be useful. Focus on the classes and relationships that communicate the design intent.

## Origins and History

Class diagrams evolved from the notation used in Grady Booch's object-oriented design method and James Rumbaugh's Object Modeling Technique (OMT) in the early 1990s [1]. When Booch, Rumbaugh, and Ivar Jacobson unified their methods into UML, the class diagram became its central structural diagram. UML 1.0 was adopted by the OMG in 1997, and the class diagram notation has remained largely stable since [2].

## Sources

1. Rumbaugh, J., Blaha, M., Premerlani, W., Eddy, F., & Lorensen, W. (1991). *Object-Oriented Modeling and Design*. Prentice Hall.
2. Object Management Group (2017). "Unified Modeling Language Specification Version 2.5.1." [https://www.omg.org/spec/UML/2.5.1](https://www.omg.org/spec/UML/2.5.1)
