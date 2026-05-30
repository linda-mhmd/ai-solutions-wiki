---
title: "Data Modeling"
description: "The process of creating visual representations of data structures at conceptual, logical, and physical levels to define how data is stored, organized, and accessed."
date: 2026-03-28
categories: [Glossary]
tags: [databases, data-modeling, schema-design, data-architecture, relational-databases]
last_updated: 2026-05-30
---

Data modeling is the process of defining the structure, relationships, and constraints of data within a system. It translates business requirements into a formal representation that database designers and developers use to build and maintain data stores. The process typically progresses through three levels of abstraction: conceptual, logical, and physical.

## Conceptual Data Model

The conceptual model captures the high-level business entities and the relationships between them without concern for implementation details. It answers "what data does the business care about?" An e-commerce system might identify entities like Customer, Product, Order, and Payment, along with relationships like "a Customer places an Order" and "an Order contains Products."

Conceptual models are typically represented as Entity-Relationship (ER) diagrams and serve as a communication tool between business stakeholders and technical teams. They deliberately omit data types, keys, and storage details.

## Logical Data Model

The logical model adds precision to the conceptual model by defining attributes, primary keys, foreign keys, and data types at an abstract level. It specifies the cardinality and optionality of relationships (one-to-many, many-to-many, optional vs. required). Normalization rules are applied at this stage to eliminate redundancy.

A logical model is independent of any specific database management system. It describes what the data looks like without specifying how it is physically stored.

## Physical Data Model

The physical model translates the logical model into the specific constructs of a target database system. It defines table names, column data types with precision and scale, indexes, partitioning strategies, tablespaces, storage parameters, and platform-specific features. A physical model for PostgreSQL looks different from one for DynamoDB because the target system's capabilities and constraints shape the design.

## Modeling Approaches

**Top-down modeling** starts with business requirements and progressively refines from conceptual to physical. This is the traditional approach for enterprise data warehouses and systems of record.

**Bottom-up modeling** starts with existing data sources and reverse-engineers a model from them. This is common when integrating legacy systems or building data lakes.

**Agile data modeling** treats the data model as an evolving artifact, updated incrementally as requirements emerge. Schema migrations managed through version-controlled scripts support this approach.

## Origins and History

Data modeling as a discipline emerged alongside the relational model. Peter Chen's Entity-Relationship model (1976) [1] provided the first widely adopted notation for conceptual modeling. The ANSI/SPARC three-schema architecture (1975) [2] formalized the separation between conceptual, logical, and physical layers. These foundations remain central to data modeling practice.

## Sources

1. Chen, P.P. (1976). "The Entity-Relationship Model - Toward a Unified View of Data." *ACM Transactions on Database Systems*, 1(1), 9-36.
2. Tsichritzis, D. & Klug, A. (1978). "The ANSI/X3/SPARC DBMS Framework Report of the Study Group on Database Management Systems." *Information Systems*, 3(3), 173-191.
