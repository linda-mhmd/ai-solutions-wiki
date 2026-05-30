---
title: "Entity-Relationship Model"
description: "A conceptual data modeling technique that represents data as entities, attributes, and relationships, typically visualized through ER diagrams."
date: 2026-03-28
categories: [Glossary]
tags: [databases, data-modeling, er-diagram, schema-design, relational-databases]
last_updated: 2026-05-30
---

The Entity-Relationship (ER) model is a conceptual framework for describing the structure of data in a database. It represents the real-world objects (entities) relevant to a system, their properties (attributes), and the associations between them (relationships). ER diagrams are the visual notation used to communicate these models.

## Core Concepts

**Entities** are the objects or concepts about which data is stored. Each entity type becomes a table in a relational database. Examples include Customer, Order, and Product. An entity instance is a specific row in that table.

**Attributes** describe the properties of an entity. A Customer entity might have attributes for name, email, and phone number. Attributes can be simple (single value), composite (subdivided into parts like first name and last name), multi-valued (multiple phone numbers), or derived (age computed from birth date).

**Relationships** capture how entities are associated. A Customer places an Order. Relationships have cardinality constraints that specify how many instances of one entity can be associated with instances of another: one-to-one (1:1), one-to-many (1:N), or many-to-many (M:N).

## ER Diagram Notation

In the original Chen notation, rectangles represent entities, ellipses represent attributes, and diamonds represent relationships. Lines connect them and are annotated with cardinality. Alternative notations include Crow's Foot (also called Martin notation), which uses forked lines to indicate "many" and single lines for "one," and is widely used in database design tools.

## Extended ER Model

The Extended ER (EER) model adds concepts from object-oriented modeling: specialization and generalization (inheritance hierarchies), categories (union types), and aggregation. These constructs handle more complex domains where a basic ER model becomes unwieldy.

## From Diagram to Schema

Translating an ER diagram to a relational schema follows systematic rules. Each entity becomes a table. One-to-many relationships are implemented with foreign keys on the "many" side. Many-to-many relationships require a junction table containing the primary keys of both related entities.

## Origins and History

Peter Pin-Shan Chen introduced the Entity-Relationship model in his 1976 paper, proposing it as a unifying view of data that bridged the network, relational, and entity set models prevalent at the time [1]. The model rapidly became the standard approach to conceptual database design and remains foundational in database courses and professional practice.

## Sources

1. Chen, P.P. (1976). "The Entity-Relationship Model - Toward a Unified View of Data." *ACM Transactions on Database Systems*, 1(1), 9-36.
2. Elmasri, R. & Navathe, S.B. (2015). *Fundamentals of Database Systems*. 7th Edition. Pearson.
