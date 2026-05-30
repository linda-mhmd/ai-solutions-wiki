---
title: "Sequence Diagram"
description: "A UML behavioral diagram that shows how objects interact through messages exchanged over time, with vertical lifelines and horizontal message arrows."
date: 2026-03-28
categories: [Glossary]
tags: [uml, sequence-diagram, interactions, software-modeling, behavioral-diagrams]
last_updated: 2026-05-30
---

A sequence diagram is a UML behavioral diagram that shows how objects or components interact by exchanging messages in a time-ordered sequence. The vertical axis represents time (flowing downward), and each participant has a vertical lifeline. Horizontal arrows between lifelines represent messages. Sequence diagrams are the most popular UML diagram for modeling dynamic behavior.

## Key Elements

**Lifelines** represent the participants in an interaction. Each lifeline is drawn as a rectangle (showing the object name and optionally its class) with a dashed vertical line extending downward. Lifelines can represent objects, actors, system components, or services.

**Messages** are drawn as horizontal arrows between lifelines. A solid arrow with a filled arrowhead represents a synchronous message (the sender waits for a response). A solid arrow with an open arrowhead represents an asynchronous message (the sender continues without waiting). A dashed arrow represents a return message carrying the response back to the caller.

**Activation bars** (execution specifications) are thin rectangles on a lifeline showing when the object is actively processing. The bar begins when a message is received and ends when the return message is sent.

**Self-messages** show an object calling its own method. The arrow loops from the lifeline back to itself.

## Combined Fragments

Combined fragments express control flow within a sequence diagram.

**alt** (alternative) models conditional branching, equivalent to if/else. The fragment is divided into operands separated by dashed lines, each with a guard condition.

**loop** repeats a sequence of messages while a condition holds. The guard specifies the loop condition and optional bounds (e.g., loop [1, 10]).

**opt** (optional) executes a fragment only if the guard condition is true, equivalent to an if without an else.

**par** (parallel) indicates that the fragments execute concurrently.

**ref** references another interaction diagram, enabling diagram decomposition and reuse.

## Reading a Sequence Diagram

Read from top to bottom, following the time axis. Each horizontal message shows a call from one object to another. The order of messages along each lifeline tells the story of the interaction. The creation of a new object is shown with a message arrow pointing to the object's lifeline rectangle. Object destruction is marked with an X at the end of the lifeline.

## Practical Use

Sequence diagrams are particularly useful for documenting API call flows, distributed system interactions, protocol handshakes, and complex business processes. They make the order of operations and the responsibility of each component visually explicit. Tools like PlantUML allow sequence diagrams to be written as text and rendered automatically, making them easy to maintain alongside code.

## Origins and History

Sequence diagrams trace their lineage to Message Sequence Charts (MSCs), standardized by the ITU-T in 1992 for modeling telecommunication protocols [1]. Jacobson's use case-driven interaction diagrams in OOSE (1992) influenced UML's adoption of sequence diagrams [2]. The notation was unified and formalized as part of UML 1.0 in 1997, with significant enhancements to combined fragments in UML 2.0 (2005) [3].

## Sources

1. ITU-T (1992). "Recommendation Z.120: Message Sequence Chart (MSC)." International Telecommunication Union.
2. Jacobson, I. (1992). *Object-Oriented Software Engineering: A Use Case Driven Approach*. Addison-Wesley.
3. Object Management Group (2017). "Unified Modeling Language Specification Version 2.5.1." [https://www.omg.org/spec/UML/2.5.1](https://www.omg.org/spec/UML/2.5.1)
