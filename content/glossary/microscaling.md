---
title: "Microscaling (MX) Formats"
description: "A family of block-scaled low-precision numeric formats standardized by the Open Compute Project, where small blocks share one scale factor to push quantization below 4 bits."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "quantization", "llm"]
related:
  - glossary/quantization
  - glossary/ai-hardware
  - glossary/hardware-constraints
  - glossary/inference
---

Microscaling (MX) formats are a family of block-scaled low-precision numeric formats standardized by the Open Compute Project. Instead of attaching a scale to every value or to a whole tensor, MX groups values into small blocks, for example 32 elements, and lets each block share one scale factor. This block-level scaling preserves accuracy while pushing {{< relref "glossary/quantization" >}} below 4 bits, which is difficult to do with formats that lack a shared local scale.

## Block scaling
The core idea is granularity. A single scale for an entire tensor cannot follow local changes in magnitude, so very low bit widths lose accuracy. MX assigns one shared scale to a small block of elements, so each block adapts to its own range. With blocks of 32, the scale is amortized across many values, keeping storage overhead low while giving the format enough local dynamic range to represent values accurately at few bits per element.

## The MX format family
MX defines several formats at different precisions: MXFP8, MXFP6, MXFP4, and MXINT8. As an example, MXFP4 uses E2M1 elements, a 4-bit floating-point encoding, arranged in blocks of 32 that share one E8M0 scale factor. The FP8, FP6, and INT8 variants follow the same block-scaled structure at their respective bit widths. This spread lets teams trade accuracy against memory and bandwidth by choosing a format for a given layer or workload.

## Why it matters for hardware and inference
Lower bit widths cut memory footprint and bandwidth, which are central {{< relref "glossary/hardware-constraints" >}} for large models. Because MX is an open standard, {{< relref "glossary/ai-hardware" >}} vendors can support the same formats, which helps portability. In practice, MX formats target efficient {{< relref "glossary/inference" >}} and training by shrinking data movement without the accuracy loss that naive sub-4-bit quantization would cause.

## Origins and History
The MX specification was standardized by the Open Compute Project, with version 1.0 published in September 2023. It was developed by the MX Alliance, whose members include AMD, Arm, Intel, Meta, Microsoft, NVIDIA, and Qualcomm. A companion paper, "Microscaling Data Formats for Deep Learning," was posted to arXiv in October 2023 and describes the formats and their use in deep learning.

## Sources

1. Open Compute Project. "OCP Microscaling Formats (MX) Specification v1.0" (September 2023). [https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)
2. Rouhani, B., et al. "Microscaling Data Formats for Deep Learning" (arXiv 2310.10537, October 2023). [https://arxiv.org/abs/2310.10537](https://arxiv.org/abs/2310.10537)
