---
title: "Entity Extraction Patterns"
description: "Extracting structured entities from unstructured text using AI. Named entity recognition, relationship extraction, and schema-driven extraction patterns."
date: 2026-03-28
categories: [Patterns]
tags: [entity-extraction, NER, information-extraction, NLP, structured-data]
last_updated: 2026-05-30
---

Entity extraction pulls structured information from unstructured text: names, dates, amounts, organizations, locations, and domain-specific entities. It is the bridge between document AI and downstream business systems that need structured data.

## Schema-Driven Extraction

Define the expected output schema explicitly and instruct the model to populate it.

**Implementation** - Provide the model with a target schema (JSON schema, data class definition, or structured description of expected fields) and the source text. The model extracts values for each field. This approach is reliable because the model has a clear target structure and the output is immediately parseable.

**Schema design** - Include field names, data types, descriptions, and examples of valid values. Specify whether each field is required or optional. For fields with constrained values (status codes, category enumerations), include the valid options. The more precise the schema, the more accurate the extraction.

**Nested extraction** - Complex entities contain sub-entities. An invoice has line items, each with their own fields. A contract has parties, each with addresses. Handle nested structures by defining the schema hierarchically and instructing the model to populate the full tree.

## Named Entity Recognition (NER)

Identifying and classifying entities mentioned in text: people, organizations, locations, dates, monetary amounts, and custom entity types.

**Standard entities** - Most LLMs handle standard entity types (person, organization, location, date, money) well out of the box. For these, a simple prompt asking the model to identify all entities of each type in the text produces reliable results.

**Custom entities** - Domain-specific entities (drug names, legal citations, product codes, internal project names) require explicit definition and examples. Provide the model with entity type definitions, 5-10 examples of each, and boundary cases that clarify what is and is not an entity of that type.

**Entity linking** - The same entity may be referenced multiple ways in a document (John Smith, Mr. Smith, he, the CEO). Entity linking connects these co-references to a single entity. LLMs handle this well when prompted to resolve co-references, but accuracy depends on the document's ambiguity.

## Relationship Extraction

Beyond identifying individual entities, extract the relationships between them.

**Binary relationships** - Extract pairs of entities and the relationship between them. "Acme Corp acquired Widget Inc in 2024" yields: (Acme Corp, acquired, Widget Inc, 2024). Define the relationship types you care about and provide examples.

**Event extraction** - Some relationships are better modeled as events with multiple participants and attributes. A financial transaction has a sender, receiver, amount, date, and purpose. Define event schemas and extract all attributes for each detected event.

## Validation and Post-Processing

Extracted entities need validation before they enter downstream systems.

**Type validation** - Verify that extracted values match their expected types. Dates should parse as valid dates. Monetary amounts should be numeric. Email addresses should match a pattern. Reject or flag extractions that fail type validation.

**Cross-field validation** - Check consistency across extracted fields. Does the total match the sum of line items? Is the end date after the start date? Are referenced entities consistent (the same company name is used consistently throughout)?

**Normalization** - Standardize extracted values: date formats, currency codes, name capitalization, address formatting. This ensures extracted data integrates cleanly with downstream systems that expect specific formats.

**Confidence scoring** - Assign confidence scores to each extracted field based on the model's certainty and the validation results. Route low-confidence extractions to human review while auto-processing high-confidence ones.
