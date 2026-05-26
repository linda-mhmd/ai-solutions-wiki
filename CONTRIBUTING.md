# Contributing to AI Solutions Wiki

AI Solutions Wiki is a community knowledge base. Contributions of all kinds are welcome: new articles, corrections, deeper citations, and real-world solution examples.

## How to Contribute

### Add or improve a solution article

Solution articles live in `content/solutions/<industry>/`. Each article documents a specific AI use case with:
- The business problem
- The AI approach and architecture
- AWS / Azure / GCP implementation options
- Where the approach works well and where it breaks

To add a solution:
1. Fork the repository
2. Create a new `.md` file under the appropriate industry folder
3. Follow the frontmatter structure from an existing solution article
4. Submit a pull request

### Improve a tool or framework article

Tool articles live in `content/tools/`. You can:
- Add missing `alternatives:` frontmatter (open-source, AWS, Azure, GCP alternatives)
- Add `solutions:` frontmatter linking to solution articles that use this tool
- Expand the article content with additional use cases or configuration examples
- Add a `## Sources` section with primary citations

### Add a glossary definition

Glossary articles live in `content/glossary/`. Good additions:
- Foundational ML/AI/CS terms that lack proper citation to the original paper
- Practical guidance for technical decision-makers
- Cross-references (`related:` frontmatter) to related terms and guides

### Fix content errors

If you find an inaccuracy (a wrong date, misattributed paper, or factually incorrect technical claim), please open a pull request with a correction and a source citation.

## Frontmatter Reference

### Tool articles

```yaml
---
title: "Tool Name - Short Description"
description: "One sentence describing what this tool does."
date: YYYY-MM-DD
categories: [Tools]
tags: [tag1, tag2]
related:
  - tools/related-tool
  - guides/related-guide
alternatives:
  open_source:
    - tools/open-source-alternative
  aws: tools/aws-equivalent
  azure: tools/azure-equivalent
  gcp: tools/gcp-equivalent
solutions:
  - solutions/industry/solution-article
---
```

### Solution articles

```yaml
---
title: "What This Solution Does"
description: "Industry + problem + AI approach in one sentence."
date: YYYY-MM-DD
categories: [Solutions]
tags: [tag1, tag2]
industries: [finance]
tools: [amazon-bedrock, langchain]
related:
  - guides/building-rag-systems
  - tools/amazon-bedrock
---
```

## Style Guide

- Write for a technically literate audience (software engineers, architects, technical leads)
- Cite primary sources (original papers, official documentation, RFCs), not blog posts about papers
- Use Wikipedia-style encyclopedic tone: accurate, neutral, no marketing language
- Include a `## Sources and Further Reading` section with numbered citations
- Link to related wiki articles using relative paths in `related:` frontmatter
- Accuracy over comprehensiveness: a shorter correct article is better than a longer inaccurate one

## Getting Help

Open a GitHub issue with your question or suggestion. For significant structural changes, open an issue first before submitting a pull request.
