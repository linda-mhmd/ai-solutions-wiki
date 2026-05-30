---
title: "EPC Diagram - Event-driven Process Chain"
description: "A flowchart-based modeling notation for business processes, originating from the ARIS framework."
date: 2026-03-28
categories: [Glossary]
tags: [EPC, BPM, process-modeling, ARIS, workflow]
last_updated: 2026-05-30
---

An Event-driven Process Chain (EPC) is a type of flowchart used for business process modeling that represents workflows as a chain of events and functions connected by logical operators. EPCs emphasize the control flow of a process, showing what triggers each step and what outcome each step produces.

## Origins and History

The EPC notation was developed by August-Wilhelm Scheer at the University of Saarland in Germany as part of the Architecture of Integrated Information Systems (ARIS) framework, first described in 1992. Scheer's goal was to create a modeling language that was intuitive enough for business users while being sufficiently formal for information system design. The notation gained wide industry adoption through SAP, which used EPCs extensively for documenting its R/3 reference models in the 1990s. The ARIS Toolset, commercialized by IDS Scheer (later acquired by Software AG), became the primary tool for creating and managing EPC diagrams at enterprise scale.

## Core Elements

An EPC diagram alternates between two primary element types. **Events** (hexagons) describe a state or condition, such as "Order received" or "Invoice approved." **Functions** (rounded rectangles) represent activities or tasks performed in response to events. Every function is triggered by at least one event and produces at least one event as output. **Logical connectors** (AND, OR, XOR) manage branching and merging of process paths. Organizational units, information objects, and IT systems can be attached to functions to show who performs the activity and what resources are used.

## Practical Applications

EPCs remain widely used in SAP implementation projects for documenting business processes, in enterprise architecture initiatives where ARIS is the modeling platform, and in industries with heavy regulatory requirements such as manufacturing and public administration. While BPMN has become the more prevalent standard internationally, EPCs continue to have a strong user base in German-speaking countries and in organizations with existing ARIS investments.

## Sources

1. Scheer, A.-W. (1992). *Architecture of Integrated Information Systems: Foundations of Enterprise Modelling*. Springer-Verlag.
2. Keller, G., Nuttgens, M., and Scheer, A.-W. (1992). "Semantische Prozessmodellierung auf der Grundlage Ereignisgesteuerter Prozessketten (EPK)." University of Saarland, Institute for Information Systems.
3. van der Aalst, W.M.P. (1999). "Formalization and Verification of Event-driven Process Chains." *Information and Software Technology*, 41(10), 639-650.
