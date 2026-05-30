---
title: "Wardley Mapping for AI - Strategic Technology Positioning"
description: "Using Wardley Maps to visualize the AI value chain, assess component maturity, and make strategic build-vs-buy decisions for AI capabilities."
date: 2026-03-28
categories: [Frameworks]
tags: [wardley-mapping, strategy, value-chain, build-vs-buy, maturity, positioning]
related:
  - frameworks/capability-mapping
  - frameworks/maturity-model-ai
  - frameworks/value-stream-mapping-ai
last_updated: 2026-05-30
---

Wardley Mapping, created by Simon Wardley, visualizes the components needed to serve a user need, positioned by their maturity (from novel to commodity). The map reveals strategic opportunities: where to build custom solutions (novel components), where to use managed services (product-stage components), and where to use commodities (utility-stage components). For AI strategy, Wardley Maps answer the critical build-vs-buy questions that determine where an organization invests its AI engineering effort.


<figure class="bz-figure">
  <img src="/img/dark-cherry/architect-system.png" alt="A human silhouette in darkness facing a massive red-lit industrial structure: the strategist studying the system before deciding where to build." loading="lazy">
  <figcaption>Wardley Mapping puts you in this position: facing the full architecture of your value chain, understanding what is novel and what is commodity, deciding where your effort creates competitive advantage.</figcaption>
</figure>

## How a Wardley Map Works

A Wardley Map has two axes:

**Vertical axis (Value Chain)** - Components are arranged from top (visible to the user, high-level need) to bottom (invisible infrastructure). Each component depends on components below it.

**Horizontal axis (Evolution)** - Components move from left (Genesis: novel, uncertain, custom-built) to right (Commodity: standardized, utility, pay-per-use) as they mature over time.

The map shows where each component sits today and implies where it is heading. Components in Genesis require custom development. Components in Product stage can be purchased from vendors. Components in Commodity stage should be consumed as utilities.

## Mapping the AI Value Chain

An AI solution's value chain, from user need to infrastructure:

**User need** (top) - "Get accurate answers from company knowledge base"

**AI Application** - The user-facing interface (chatbot, search, API)

**Orchestration** - LLM orchestration framework (LangChain, custom code)

**Foundation Model** - The LLM powering generation (GPT-4, Claude, Llama)

**Retrieval** - Vector search, knowledge base integration

**Embedding Model** - Text-to-vector conversion

**Vector Database** - Storage for embeddings (Pinecone, pgvector, Weaviate)

**Data Pipeline** - Document ingestion, chunking, processing

**Document Storage** - Source documents (S3, SharePoint)

**Compute** - GPU/CPU infrastructure (EC2, Lambda)

**Identity/Auth** - Authentication and authorization (Cognito, IAM)

## Positioning AI Components on the Evolution Axis

**Genesis (Custom Build)** - Your domain-specific AI application logic, custom evaluation frameworks, proprietary training data curation. These are your competitive differentiators. Invest engineering time here.

**Custom-Built** - Fine-tuned models for your domain, custom orchestration logic, specialized data pipelines. These require significant engineering but may move toward products as the market matures.

**Product** - LLM orchestration frameworks (LangChain), vector databases (Pinecone, Weaviate), ML platforms (SageMaker). These are maturing rapidly. Use products rather than building from scratch.

**Commodity** - Cloud compute (EC2), object storage (S3), identity management (Cognito), foundation models accessed via API (Bedrock, OpenAI). Consume these as utilities. Building your own adds cost without differentiation.

## Strategic Implications

**Build where you differentiate** - Invest custom engineering in the Genesis and Custom-Built components that create unique value for your organization. Your proprietary data processing, domain-specific evaluation, and custom application logic are where competitive advantage lives.

**Buy where the market has matured** - Use managed services for Product and Commodity components. Building your own vector database when Pinecone, Weaviate, and pgvector exist is wasted effort. Using a managed LLM via API is almost always better than hosting your own.

**Watch for evolution** - Components move rightward over time. Today's custom RAG pipeline is tomorrow's managed service (Bedrock Knowledge Bases). Today's fine-tuning workflow is tomorrow's AutoML feature. Avoid over-investing in custom solutions for components that are rapidly commoditizing.

**Anticipate commoditization** - If you are building a custom capability that cloud providers are likely to offer as a managed service within 12-18 months, consider whether a temporary workaround (prompt engineering, manual process) is cheaper than building a solution that will be superseded.

## Running a Wardley Mapping Session

Gather the technical team and a strategist. Start with the user need at the top. Work downward, identifying each component needed to serve that need. For each component, debate its position on the evolution axis: Is this novel or commoditized? Are there vendors offering this as a product?

The debate itself is the most valuable part. Disagreements about component maturity surface different assumptions about the market and technology landscape.

## When to Use Wardley Mapping

Use Wardley Mapping when making build-vs-buy decisions for AI infrastructure, when setting AI platform strategy, and when evaluating vendor solutions against custom development. The map provides a visual argument for strategic investment decisions that is more compelling than a bullet-point list.

## Sources

1. Wardley, S. (2016). *Wardley Maps.* Available at [https://medium.com/wardleymaps](https://medium.com/wardleymaps) and as a free book., Primary source for the Wardley Mapping technique, describing the value chain, evolution axis, and strategic patterns. Wardley published his methodology as open content after developing it at Fotango and Canonical.
2. Wardley, S. (2014). "Bits or pieces? The strategic journey of Simon Wardley.", Canonical early blog series documenting the development of the mapping method.
3. Cherbakov, L. et al. (2005). "Impact of service orientation at the business level." *IBM Systems Journal* 44(4)., Early work on value chain analysis in technology strategy that influenced Wardley's thinking.
