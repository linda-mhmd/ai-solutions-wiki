---
title: "AI Solutions Wiki"
description: "Engineering reference for production AI systems — architecture patterns, evaluation methods, operational practices, governance, and tooling. Maintained by AWS Community Hero Linda Mohamed."
---

**AI Solutions Wiki** is an open engineering reference for teams building, operating, and governing production AI systems. Content is organised around the layers of a real AI stack — data, models, retrieval, orchestration, evaluation, deployment, observability, governance — with cross-links between concepts, patterns, tools, and reference architectures.

The wiki is maintained by [Linda Mohamed](https://lindamohamed.com), AWS Community Hero and AI Architect, and draws on enterprise implementations across media, financial services, insurance, and geospatial domains. Each entry is sourced from documented practice, primary vendor documentation, peer-reviewed literature, and production lessons — not generated boilerplate.

## Scope

The wiki covers the engineering surface of applied AI:

- **Foundations** — software, data, and ML fundamentals underlying AI systems
- **Architecture** — reference architectures, patterns, and trade-off analysis
- **Build** — implementation guides for retrieval, agents, evaluation, and deployment
- **Solutions** — domain-specific applications (media, finance, insurance, geospatial)
- **Frameworks** — governance, regulatory, methodological frameworks (EU AI Act, NIST AI RMF, ISO 42001)
- **Tools & Comparisons** — vendor-neutral analysis of AWS, Azure, GCP, and open-source AI services
- **Glossary** — definitional reference covering AI, ML, MLOps, data, software architecture, and governance

## How to use this wiki

- **Researchers and engineers** — start with [Foundations](/foundations/) or the [Glossary](/glossary/) for definitional anchors
- **Architects** — see [Architecture](/architecture/) and [Patterns](/patterns/) for reference designs
- **Practitioners shipping AI** — see [Build](/build/) and [Guides](/guides/) for implementation playbooks
- **Decision makers** — see [Comparisons](/comparisons/) and [Frameworks](/frameworks/) for tool and policy choices

## Editorial standard

Entries follow a consistent structure: definition, mechanism, when to use, trade-offs, and references. Where applicable, content links to primary sources (AWS / Azure / GCP documentation, ISO / NIST / EU standards, original research). The site is built with Hugo, served as static HTML, and indexed by [Pagefind](/glossary/pagefind/) for offline-first full-text search.

Citation: see `CITATION.cff` in the [source repository](https://github.com/linda-mhmd/ai-solutions-wiki) (CFF 1.2.0, CC-BY-4.0).
