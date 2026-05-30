---
title: "Data Versioning"
description: "Git-like versioning for datasets: tracking changes, enabling reproducibility, supporting rollback, and managing dataset evolution across ML experiments."
date: 2026-03-28
categories: [Patterns]
tags: [data-versioning, reproducibility, dvc, lakeFS, datasets, mlops, version-control]
related:
  - patterns/model-lineage
  - patterns/continuous-training-pattern
  - patterns/lakehouse-ai-pattern
  - patterns/data-product-pattern
last_updated: 2026-05-30
---

ML experiments are only reproducible when both code and data are versioned. Git tracks code changes, but datasets are too large for Git and change in ways that code versioning does not capture: rows are added, labels are corrected, features are recomputed, and filtering criteria change. Data versioning applies version control concepts to datasets so that any experiment can be reproduced by checking out the exact data version used.

## Why Data Versioning Matters

Without data versioning, teams cannot answer basic questions. What data was model v2.3 trained on? Did we already try training on the corrected labels? When did the feature distribution shift? These questions require the ability to reference and retrieve specific historical versions of datasets.

## Versioning Approaches

**Pointer-based versioning (DVC)** - Store dataset files in remote storage (S3, GCS) and track content-addressable hashes in Git. A `.dvc` file in the repository points to the specific version of each dataset file. Checking out a Git commit and running `dvc pull` retrieves the exact dataset used at that commit. This approach integrates tightly with existing Git workflows.

**Copy-on-write branching (lakeFS)** - Provide a Git-like branching model directly on object storage. Create branches for experiments, make changes in isolation, and merge successful experiments back to main. Branches share unchanged objects through copy-on-write, so creating a branch of a multi-terabyte dataset is instantaneous and costs no additional storage.

**Table format versioning** - Delta Lake, Iceberg, and Hudi provide built-in table versioning through transaction logs. Each write creates a new version. Time travel queries read any historical version by timestamp or version number. This approach works well when data lives in a lakehouse architecture.

**Snapshot-based versioning** - Periodically create immutable snapshots of the dataset and store them with version tags. Simpler than branching-based approaches but creates storage overhead and does not support fine-grained change tracking.

## What to Version

**Raw data** - The original data as received from sources, before any processing. This enables reprocessing from scratch when transformation logic changes.

**Processed data** - Feature-engineered datasets ready for training. Version these separately from raw data because the same raw data can produce different processed versions as feature engineering evolves.

**Labels** - Version labels independently when they change on a different cadence than features. Label corrections and relabeling campaigns should produce new label versions that can be combined with existing feature versions.

**Splits** - Version the train/validation/test split assignments so that model comparisons use identical evaluation sets.

## Integration with ML Pipelines

Wire data versioning into the training pipeline so that every training run records the exact data version used. The training metadata should include data version identifiers for all input datasets. This creates the data component of model lineage tracking.

Automate data validation on each new version: schema checks, distribution comparisons against the previous version, and completeness validation. Reject versions that fail validation before they are used for training.

## Operational Considerations

Set retention policies for data versions. Not every version needs to be kept forever. Retain versions associated with deployed models and significant experiments. Archive or delete intermediate versions based on age and usage. Monitor storage costs as version history accumulates.
