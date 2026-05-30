---
title: "Zachman Framework"
description: "A two-dimensional classification schema for organizing the descriptive representations of an enterprise, considered foundational to enterprise architecture."
date: 2026-03-28
categories: [Glossary]
tags: [Zachman, enterprise-architecture, framework, ontology, EA]
last_updated: 2026-05-30
---

The Zachman Framework is a two-dimensional classification schema that organizes the descriptive representations (models, diagrams, specifications) relevant to an enterprise. It is not a methodology but an ontology -- a structured way of categorizing what needs to be documented to fully describe a complex system.

## Origins and History

John Zachman introduced the framework in his 1987 article "A Framework for Information Systems Architecture" published in the IBM Systems Journal. Zachman, then a marketing specialist at IBM, drew an analogy between building architecture and information systems architecture, arguing that the same enterprise could be described from multiple perspectives (owner, designer, builder) across multiple interrogatives (what, how, where, who, when, why). The original 1987 version focused on information systems. Zachman extended it in 1992 with John Sowa to cover the full enterprise. The framework has remained conceptually stable since then, with minor refinements to terminology and presentation. It is now maintained by Zachman International.

## Structure

The framework is organized as a six-by-six matrix. The **rows** represent stakeholder perspectives: Planner (contextual scope), Owner (business concepts), Designer (system logic), Implementer (technology physics), Sub-Constructor (component assemblies), and the Functioning Enterprise (operational instances). The **columns** represent interrogatives: What (data/inventory), How (function/process), Where (network/location), Who (people/organization), When (time/schedule), and Why (motivation/strategy). Each cell in the matrix contains a distinct model or artifact type. For example, the intersection of Owner and What produces a semantic business model, while Designer and How produces a system design specification.

## Practical Applications

The Zachman Framework is used as an organizing taxonomy for architecture repositories, as a completeness checklist to ensure all perspectives are addressed during enterprise architecture planning, and as a communication tool for explaining why different stakeholders need different architectural views of the same enterprise.

## Sources

1. Zachman, J.A. (1987). "A Framework for Information Systems Architecture." *IBM Systems Journal*, 26(3), 276-292.
2. Sowa, J.F. and Zachman, J.A. (1992). "Extending and Formalizing the Framework for Information Systems Architecture." *IBM Systems Journal*, 31(3), 590-616.
3. Zachman International. "The Zachman Framework." [https://www.zachman.com](https://www.zachman.com)
