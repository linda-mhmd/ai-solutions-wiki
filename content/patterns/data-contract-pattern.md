---
title: "Data Contract Pattern for AI Systems"
description: "Implementing schema contracts between data producers and AI consumers: contract specification, validation enforcement, versioning, and breaking change management."
date: 2026-03-28
categories: [Patterns]
tags: [data-contract, schema, data-engineering, data-quality, governance, ai-engineering]
related:
  - glossary/data-contract
  - glossary/data-quality
  - guides/data-quality-ai
  - patterns/microservices-for-ai
last_updated: 2026-05-30
---

In a microservices architecture, data flows between teams. The user activity team produces clickstream data. The ML team consumes it for recommendation model training. The analytics team uses it for reporting. When the user activity team renames a field, both downstream teams break. The data contract pattern makes these dependencies explicit and prevents breaking changes from reaching consumers.

## The Pattern

A data contract is a versioned, machine-readable specification that defines:
- What data is produced (schema)
- What quality is guaranteed (SLOs)
- Who is responsible (ownership)
- How changes are managed (versioning)

The contract sits between producer and consumer. Both sides validate against it. Changes to the contract require explicit agreement from affected consumers.

## Contract Specification

Use a structured format for data contracts. The Open Data Contract Standard (ODCS) provides a YAML-based specification:

```yaml
# contracts/user-activity-v2.yaml
apiVersion: v2.0.0
kind: DataContract
metadata:
  name: user-activity-events
  version: 2.1.0
  owner: user-platform-team
  contact: user-platform@company.com

schema:
  type: object
  properties:
    event_id:
      type: string
      format: uuid
      description: "Unique event identifier"
      required: true
    user_id:
      type: string
      description: "Authenticated user identifier"
      required: true
      pii: true
    event_type:
      type: string
      enum: ["page_view", "click", "search", "purchase", "add_to_cart"]
      required: true
    timestamp:
      type: string
      format: date-time
      description: "Event time in UTC ISO 8601"
      required: true
    properties:
      type: object
      description: "Event-specific properties"
      required: false

quality:
  completeness:
    - field: event_id
      threshold: 1.0
    - field: user_id
      threshold: 0.99
  freshness:
    max_delay_seconds: 300
  volume:
    min_daily_records: 1000000

sla:
  availability: 99.9%
  latency_p99_seconds: 5

consumers:
  - team: ml-recommendations
    usage: "Training data for recommendation model"
    fields_used: [user_id, event_type, timestamp, properties]
  - team: analytics
    usage: "User behaviour dashboards"
    fields_used: [event_type, timestamp]
```

## Validation Enforcement

### Producer-Side Validation

The data producer validates every record against the contract before publishing:

```python
from datacontract import DataContract

contract = DataContract.load("contracts/user-activity-v2.yaml")

def publish_event(event: dict):
    validation = contract.validate(event)
    if not validation.is_valid:
        logger.error(f"Contract violation: {validation.errors}")
        metrics.increment("contract_violations")
        # Route to dead letter queue, do not publish
        dead_letter_queue.send(event)
        return

    kafka_producer.send("user-activity", event)
```

### Consumer-Side Validation

Consumers validate incoming data against their understanding of the contract:

```python
def consume_events():
    for message in kafka_consumer:
        event = message.value
        if not contract.validate_subset(event, fields=REQUIRED_FIELDS):
            logger.warning(f"Unexpected data format: {event}")
            metrics.increment("consumer_validation_failures")
            continue
        process_event(event)
```

### CI/CD Contract Checks

Validate contract changes in the producer's CI pipeline:

```yaml
- name: Validate data contract
  run: |
    datacontract lint contracts/user-activity-v2.yaml
    datacontract breaking contracts/user-activity-v2.yaml \
      --against main:contracts/user-activity-v2.yaml
```

The `breaking` check compares the proposed contract against the current version and fails if breaking changes are detected (removed fields, type changes, narrowed enums).

## Versioning Strategy

### Semantic Versioning for Contracts

- **Major version** (2.0.0 -> 3.0.0) - Breaking changes: removed fields, type changes, narrowed constraints. Requires consumer migration.
- **Minor version** (2.1.0 -> 2.2.0) - Backward-compatible additions: new optional fields, expanded enums. Consumers continue working without changes.
- **Patch version** (2.1.0 -> 2.1.1) - Documentation updates, description clarifications. No schema changes.

### Breaking Change Process

When a breaking change is necessary:

1. Propose the change with a migration guide
2. Notify all registered consumers (from the contract's consumer list)
3. Publish both old and new versions simultaneously during a migration period
4. Track consumer migration progress
5. Retire the old version after all consumers have migrated

## Why This Matters for AI

AI models are especially sensitive to data contract violations:

- A renamed feature column causes a training pipeline to fail silently (reading null values instead of actual data)
- A new enum value in a categorical feature creates an out-of-vocabulary condition the model was not trained on
- A change in timestamp format shifts all time-based features
- A change in data freshness SLO means features computed from this data may be staler than the model expects

Data contracts make these dependencies explicit before they become production incidents.
