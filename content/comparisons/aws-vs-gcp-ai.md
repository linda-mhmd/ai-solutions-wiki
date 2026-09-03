---
title: "AWS AI Services vs Google Cloud AI - Service Map and Decision Guide"
description: "A constraint-first look at what actually decides AWS vs Google Cloud for AI — model-family exclusivity, lock-in and exit cost, existing procurement commitments — plus a full service-by-service map for teams who already know which platform they need."
date: 2026-03-24
last_verified: 2026-09-03
categories: [Comparisons]
tags: ["cloud-computing", "intermediate", "aws", "gcp", "ai-services", "comparison", "cloud", "vendor-lock-in", "decision-framework"]
tools: [amazon-bedrock, amazon-sagemaker, amazon-rekognition, amazon-textract, bedrock-agentcore, google-vertex-ai]
last_updated: 2026-09-03
lastmod: 2026-09-03
related:
  - guides/constraint-driven-comparisons
  - comparisons/bedrock-vs-vertex-ai
  - guides/cloud-exit-costs-and-data-gravity
  - guides/software-licensing-and-vendor-lock-in
  - glossary/cloud-act
  - guides/shared-responsibility-model
  - glossary/data-sovereignty
  - guides/governance-thresholds-as-you-scale
---

AWS and Google Cloud have the two most comprehensive AI service portfolios in the industry. Google's advantage is deep AI research lineage (the transformer paper, BERT, and AlphaFold all originated inside Google), while AWS leads on enterprise integration and service breadth. Most comparisons of the two stop there and turn into a feature grid — this one does not, because for two mature hyperscaler AI portfolios, the feature grid is rarely what actually decides the choice for a given organization. What decides it is usually already in place before anyone opens a comparison: which model family a specific workload requires, what data and workloads already live on one platform, and what procurement commitment is already signed. This page names those constraints first, then gives the full service-by-service map for whichever platform (or both) they leave you with. See [Constraint-Driven Comparisons](/guides/constraint-driven-comparisons/) for the reasoning behind that ordering.

A naming note for 2026: at Cloud Next 2026, Google rebranded Vertex AI as the Gemini Enterprise Agent Platform (Vertex AI is now the former name, and existing Vertex AI APIs, SDKs, and workloads continue to run unchanged). This page keeps the Vertex AI names because they remain the established and widely used identifiers, but expect to see the new Gemini Enterprise branding in Google's console and newer documentation.

## What actually decides this

Both platforms are mature, both are operated by large US-headquartered companies, and both cover the same broad AI service categories — so several constraint categories that decide *other* comparisons on this wiki (for example, on-premise vs cloud, or a hyperscaler vs a sovereign or self-hosted alternative) don't differentiate AWS from GCP at all. Naming that explicitly is as useful as naming what does differentiate them.

### Model-family exclusivity — the closest thing to a real gate

The one constraint category that can rule a platform out outright for a specific workload is **which model you are required to use**. Three points, verified this session because the previous version of this page implied a distinction that isn't accurate anymore:

- **Amazon Nova** is Amazon's own model family and is Bedrock-only [1]. **Gemini** is Google's own model family and is Vertex AI Model Garden-only. If a workload specifically requires one of these — a procurement mandate, a benchmark result tied to a specific model, a Google Search-grounding requirement that only Gemini's tooling exposes — that requirement is a genuine gate to one platform.
- **Anthropic Claude is not a Bedrock exclusive.** Claude Opus and Claude Sonnet (the 4-series and later) are generally available on Vertex AI Model Garden as a fully managed Model-as-a-Service offering — same status as on Bedrock, a third-party model on both platforms, not a Google-built one — with provisioned throughput, prompt caching, and Google Cloud Marketplace procurement, confirmed directly on Google Cloud's own announcement [2]. Claude, Llama, and Mistral are all available through both Bedrock and Vertex AI Model Garden. "We need Claude" is not, by itself, a reason to choose AWS over GCP; it was a defensible reading in 2024 and it no longer is.
- **TPU access is GCP-exclusive.** AWS has its own custom silicon (Trainium and Inferentia), but not TPUs specifically. If a workload's requirement is TPUs by name — some large-scale transformer training pipelines are tuned specifically for TPU pod topology — that is a real, narrow gate toward GCP. See [GPU vs TPU](/comparisons/gpu-vs-tpu/) for the underlying trade-offs; this page doesn't re-derive them.

### Regulatory and jurisdictional exposure — usually not a gate between *these two*

If your actual constraint is "keep this data or workload out of US jurisdictional reach," neither AWS nor GCP's standard global AI service portfolio resolves that, because both are providers subject to US legal process. Under the CLOUD Act (18 U.S.C. § 2713), a provider subject to US jurisdiction must comply with lawful US orders to disclose data in its possession, custody, or control **regardless of where that data is physically stored** — the trigger is the provider's legal domicile, not the region a workload runs in [3]. That statute applies identically in kind to AWS and to Google Cloud; choosing GCP over AWS (or the reverse) inside their standard commercial regions does not change which government can compel disclosure. See [the US CLOUD Act](/glossary/cloud-act/) and [data sovereignty](/glossary/data-sovereignty/) for what actually does and doesn't address this, including why an EU region alone is not the same thing as jurisdictional independence. If this is your organization's real constraint, the comparison you need is not AWS-vs-GCP at all — it's mainline hyperscaler vs. a sovereign-cloud or on-premise alternative; see [on-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/).

Where regulatory exposure *does* apply to this decision is as a constant, not a differentiator: whatever EU AI Act risk tier or sector-specific obligation a use case triggers, it triggers on either platform identically, because the obligations attach to what the system does and who provides it to end users, not to which cloud runs it. See [governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/) for working out whether a given use case is actually in scope before treating this as a live constraint at all.

### Vendor lock-in, exit cost, and data gravity

This is the category this page's own structure has the most direct bearing on: everything below the fold is, functionally, a lock-in map — the harder a given AWS service is to find a clean equivalent for, the more expensive it is to leave. A few points worth being concrete about rather than gesturing at "lock-in risk" as a vague worry:

- **Egress got cheaper to leave, but only for the exit itself.** Google Cloud announced free network data transfer for customers migrating off the platform on 11 January 2024; AWS followed on 5 March 2024. Both are conditional (provider approval required; Google's requires completing the exit within 60 days) and neither reduces the cost of ordinary day-to-day egress — only the one-time move [4][5]. The EU Data Act adds a legal floor on top: switching charges are capped at direct switching costs through 12 January 2027, and prohibited outright after that date — but that governs *switching charges specifically*, not regular operational data transfer [6].
- **Proprietary orchestration is the part egress pricing doesn't touch.** Bedrock Agents/AgentCore and Vertex AI Agent Builder are not API-compatible with each other; Bedrock Knowledge Bases and Vertex AI Search/RAG Engine use different retrieval configurations; SageMaker Pipelines and Vertex AI Pipelines aren't portable to each other either, and not for the reason it might look like — Vertex AI Pipelines is built on the open Kubeflow Pipelines (KFP) SDK, but SageMaker Pipelines uses its own proprietary Python SDK and JSON pipeline-definition format, so there's no shared substrate underneath to make a migration cheaper. Object storage (S3 vs. Cloud Storage) is the most portable layer in this comparison; agent orchestration, managed-RAG configuration, and ML pipeline definitions are the least. See [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) for the general mechanics, and [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) for making lock-in a checkable cost rather than a feeling.
- **This is a tradeoff, not a gate.** Nothing here makes either platform unusable for a workload already committed to the other — it makes switching expensive and time-bound, which is a different thing. The service map below exists specifically to make that migration cost visible, service by service.

### Cost structure, existing commitment, and procurement

Two related but distinct constraints, both usually decided before any AI-specific comparison starts:

- **Sunk data-platform investment.** If your data warehouse is already Redshift or your data lake is already on S3 with a mature Glue/Athena pipeline, AWS's AI services (Bedrock Knowledge Bases, SageMaker) integrate against infrastructure you've already built and paid for. If BigQuery is already your warehouse, Vertex AI's tooling (BigQuery ML, Vertex AI Search) integrates the same way in the other direction. This is a sunk-cost argument, not a capability argument — either platform's AI services work fine against a greenfield deployment, but few AI deployments are actually greenfield.
- **Committed procurement.** Enterprise buyers on either platform commonly negotiate a private, multi-year pricing agreement — AWS's Private Pricing Agreement (the current name for what was the Enterprise Discount Program) [7], or a Google Cloud committed-use / committed-spend discount [8] — that routes new consumption, AI services included, through an existing contract rather than list pricing. An unexpired commitment on one platform is a real cost consideration for adopting the other (you'd be paying twice, or leaving a committed discount unused), but it's a tradeoff to weigh against the AI capability gap, not an absolute bar — this wiki cannot tell you the size of your organization's specific commitment or how much runway is left on it; that's in your contract, not in a public comparison.

### Internal capability and knowledge retention

The plainest constraint of all, and the one a feature table never captures: a team fluent in IAM policy, Lambda, and CloudFormation reaches AI-service proficiency on AWS faster than the same team would on Vertex AI's IAM and Cloud Functions equivalents, and vice versa for a GCP-native team. This cuts both ways and is not a reason to default to the status quo forever — but ignoring it and picking the platform with the marginally better feature checklist, while your team has to learn an entirely new operational model to use it, is a real and often underweighted cost.

## Gates vs. tradeoffs, summarized

| Constraint | Type | What it does |
|---|---|---|
| Workload requires Gemini specifically | Gate | Rules out AWS — Gemini is Vertex AI Model Garden-only |
| Workload requires Amazon Nova specifically | Gate | Rules out GCP — Nova is Bedrock-only |
| Workload requires Claude, Llama, or Mistral | Not a gate | Available on both; not a reason to pick either platform |
| Workload requires TPUs by name | Gate | Rules out AWS — TPUs are GCP-exclusive |
| Constraint is "avoid US jurisdictional reach" | Neither resolves it | Both are US CLOUD Act-subject providers in their standard regions; this isn't an AWS-vs-GCP question |
| Data/warehouse already committed to one platform | Tradeoff | Weigh migration and integration cost against the other platform's capability gap |
| Active committed-spend agreement with one provider | Tradeoff | Weigh unused commitment/duplicate spend against the other platform's fit |
| Team's existing operational expertise | Tradeoff | Weigh ramp-up cost against feature or cost advantages elsewhere |

## The service map

The tables below assume the gates above didn't already decide it for you, or that you're deliberately running services on both. If a model-family gate above settled the question, treat everything past this point as a migration and equivalence reference rather than a decision aid — it tells you what to expect switching *to*, not whether to switch.

### Foundation Models and LLM Access

| AWS | GCP | Notes |
|---|---|---|
| [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) | [Vertex AI Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models) | Both provide access to multiple model families with overlap between them. Bedrock offers Anthropic Claude, Meta Llama, Mistral, Cohere, and Amazon's own Nova models (Nova replaced the earlier Amazon Titan family). Vertex AI Model Garden offers Google's own Gemini plus Anthropic Claude, Llama, and Mistral [2]. Nova is Bedrock-exclusive; Gemini is Vertex-exclusive; Claude, Llama, and Mistral run on both. |
| [Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html) / [Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/) | [Vertex AI Agent Builder](https://cloud.google.com/products/agent-builder) | Managed agent frameworks, not API-compatible with each other. AWS added Bedrock AgentCore (generally available October 2025) to deploy and operate agents built with any framework (LangGraph, CrewAI, LlamaIndex, Strands Agents). Vertex AI Agent Builder includes grounding with Google Search as a built-in capability unique to that platform. |
| [Bedrock Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) | [Vertex AI Search / RAG Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview) | Managed RAG pipelines, with different retrieval configuration on each side — this is one of the less portable layers in the whole map. |
| [Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) | [Vertex AI Safety Filters](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai) | Safety and content controls for model outputs. |

Google's current frontier Gemini models (the Gemini 3 family, including Gemini 3 Pro) are strong competitors to the Anthropic Claude models available on both platforms. Gemini 3 Pro ships with a 1 million token context window, which is large but in line with the long-context options now available across providers, so context length alone is no longer the differentiator it once was. With Claude, Llama, and Mistral now cross-available, the model-access question genuinely comes down to Gemini vs. Nova (a real gate, see above) rather than a general "AWS vs. GCP for models" question.

### Speech and Language

| AWS | GCP | Notes |
|---|---|---|
| [Amazon Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html) | [Google Speech-to-Text](https://cloud.google.com/speech-to-text/docs/basics) | GCP's Chirp model offers strong multilingual transcription. AWS Transcribe Medical is specialized for healthcare. |
| [Amazon Polly](https://docs.aws.amazon.com/polly/latest/dg/what-is.html) | [Google Text-to-Speech](https://cloud.google.com/text-to-speech/docs/basics) | GCP's Neural2 and Chirp HD voices are high quality. GCP supports more languages. |
| [Amazon Translate](https://docs.aws.amazon.com/translate/latest/dg/what-is.html) | [Cloud Translation API](https://cloud.google.com/translate/docs/overview) | Both support 70+ languages with neural MT. GCP's AutoML Translation allows domain customization. |
| [Amazon Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html) | [Google Natural Language API](https://cloud.google.com/natural-language/docs/basics) | Entity extraction, sentiment, syntax. Google's separate Healthcare Natural Language API — the clinical-text specialist previously listed here — was deprecated and shut down (May 2026); Google now directs clinical-text extraction use cases to Gemini on Vertex AI instead [9]. |

Beyond the classic split of separate speech-to-text and text-to-speech services, AWS now offers Amazon Nova Sonic on Bedrock, a single speech-to-speech model for real-time voice conversations (Nova 2 Sonic followed in December 2025). It collapses the traditional transcribe, reason, then synthesize pipeline (Amazon Transcribe to a text model to Amazon Polly) into one model, which is useful for voice agents and call automation — and it is Bedrock-exclusive by the same Nova-exclusivity logic as above.

### Vision

| AWS | GCP | Notes |
|---|---|---|
| [Amazon Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html) | [Cloud Vision AI](https://docs.cloud.google.com/vision/docs) | Both handle label detection, face analysis, OCR, explicit content detection. GCP Vision API has a strong history as Google's own image analysis infrastructure. |
| [Amazon Textract](https://docs.aws.amazon.com/textract/latest/dg/what-is.html) | [Document AI](https://cloud.google.com/document-ai/docs/overview) | GCP Document AI has strong pre-built processors (invoice, receipt, form, ID). Both handle complex table extraction. |
| [Rekognition Video](https://docs.aws.amazon.com/rekognition/latest/dg/video.html) | [Video Intelligence API](https://docs.cloud.google.com/video-intelligence/docs) | Video label detection, shot change, object tracking. GCP adds explicit content detection in video. |
| [Rekognition Custom Labels](https://docs.aws.amazon.com/rekognition/latest/customlabels-dg/what-is.html) | [Vision API Product Search / custom training via Vertex AI](https://docs.cloud.google.com/vision/docs) | Train custom image classifiers and object detectors. Note: legacy AutoML Vision was deprecated on 23 January 2023 and fully shut down on 31 July 2024; GCP's current path for custom vision models runs through the platform's broader training tooling (now under Gemini Enterprise Agent Platform, formerly Vertex AI) rather than a dedicated AutoML Vision product. |

### ML Platform

| AWS | GCP | Notes |
|---|---|---|
| [Amazon SageMaker AI](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html) | [Vertex AI](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform) | Full ML lifecycle platforms. The core ML platform is now branded Amazon SageMaker AI, and AWS introduced the next generation of SageMaker (announced at re:Invent 2024) with SageMaker Unified Studio, a single environment for data, analytics, and AI. Vertex AI Workbench (Jupyter notebooks) is polished. SageMaker has tighter integration with an AWS-native data stack specifically — see the sunk-investment point above. |
| [SageMaker Pipelines](https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html) | [Vertex AI Pipelines](https://cloud.google.com/vertex-ai/docs/pipelines/introduction) | ML workflow orchestration, but not on a shared substrate: Vertex AI Pipelines is built on the open Kubeflow Pipelines (KFP) SDK, while SageMaker Pipelines uses its own proprietary Python SDK and JSON pipeline-definition schema. Pipeline definitions are one of the *less* portable layers in this map, not one of the more portable ones. |
| [SageMaker Ground Truth](https://docs.aws.amazon.com/sagemaker/latest/dg/sms.html) | [Vertex AI Data Labeling](https://cloud.google.com/vertex-ai/docs/datasets/data-labeling-job) | Human-in-the-loop labeling at scale. |
| [Amazon Forecast](https://docs.aws.amazon.com/forecast/latest/dg/what-is-forecast.html) | [Vertex AI Forecast](https://cloud.google.com/vertex-ai/docs/tabular-data/forecasting/overview) | Time-series forecasting service. |
| [Amazon Personalize](https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html) | [Recommendations AI](https://cloud.google.com/recommendations-ai/docs/overview) | Personalization and recommendation APIs. |

### Infrastructure for AI

| AWS | GCP | Notes |
|---|---|---|
| [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) | [Cloud Functions / Cloud Run](https://cloud.google.com/run/docs/overview/what-is-cloud-run) | Serverless compute for AI event handlers. Cloud Run supports containers directly. |
| [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) | [Cloud Storage](https://cloud.google.com/storage/docs/introduction) | Object storage for AI data. Similar capabilities, and the most portable layer of this entire map (see the lock-in section above). |
| [Amazon OpenSearch](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html) | [Vertex AI Search](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction) | Vector search. GCP also integrates AlloyDB and Spanner for pgvector. |

## What this comparison cannot resolve

- **The exact terms and remaining runway of your organization's specific procurement agreement** — whether an AWS Private Pricing Agreement or a Google Cloud committed-use discount, the number and the time left on it live in your contract, not in a public comparison.
- **Whether a specific use case is actually in a heightened regulatory tier** — the EU AI Act risk designation, GDPR obligations, or a sector-specific rule depend on what the system does, not which cloud runs it. See [governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/) to work that out before treating it as a live constraint here.
- **Whether your specific security or compliance posture is satisfied by either platform's shared-responsibility boundary** — that boundary is real and worth understanding on its own terms rather than assumed; see [the shared responsibility model for AI on AWS](/guides/shared-responsibility-model/) for a worked example of how to reason about it (Google Cloud's boundary follows the same logic, in its own documentation).
- **Sovereign-cloud variants of either platform.** Both AWS and Google Cloud sell narrower, sovereignty-focused product lines (separate from the standard global regions this page covers) aimed specifically at the jurisdictional constraint described above. Evaluating those is a different, narrower comparison than the one this page makes.
- **Your team's actual current proficiency on either platform** — a real input to the capability-retention point above, and one only the team itself can assess honestly.

## Sources

1. Amazon Web Services. "Amazon Nova foundation models." [https://aws.amazon.com/nova/models/](https://aws.amazon.com/nova/models/)
2. Google Cloud. "Anthropic's Claude Opus 4 and Claude Sonnet 4 on Vertex AI" (May 23, 2025). [https://cloud.google.com/blog/products/ai-machine-learning/anthropics-claude-opus-4-and-claude-sonnet-4-on-vertex-ai](https://cloud.google.com/blog/products/ai-machine-learning/anthropics-claude-opus-4-and-claude-sonnet-4-on-vertex-ai)
3. 18 U.S.C. § 2713 — "Required preservation and disclosure of communications and records." Cornell Legal Information Institute. [https://www.law.cornell.edu/uscode/text/18/2713](https://www.law.cornell.edu/uscode/text/18/2713)
4. DataCenterDynamics. "Google Cloud removes exit fees" (January 2024). [https://www.datacenterdynamics.com/en/news/google-cloud-removes-exit-fees/](https://www.datacenterdynamics.com/en/news/google-cloud-removes-exit-fees/)
5. DataCenterDynamics. "AWS removes some data transfer fees for customers exiting its cloud" (March 2024). [https://www.datacenterdynamics.com/en/news/aws-removes-some-data-transfer-fees-for-customers-exiting-its-cloud/](https://www.datacenterdynamics.com/en/news/aws-removes-some-data-transfer-fees-for-customers-exiting-its-cloud/)
6. European Union. "Regulation (EU) 2023/2854 (Data Act)," Article 29 — Gradual withdrawal of switching charges. [https://eur-lex.europa.eu/eli/reg/2023/2854/oj](https://eur-lex.europa.eu/eli/reg/2023/2854/oj)
7. Amazon Web Services. "Private Pricing." [https://aws.amazon.com/pricing/](https://aws.amazon.com/pricing/) — for the Enterprise Discount Program → Private Pricing Agreement rename specifically (not stated on AWS's own site), see nOps, "The Ultimate Guide to AWS PPA": [https://www.nops.io/blog/the-ultimate-guide-to-aws-ppa/](https://www.nops.io/blog/the-ultimate-guide-to-aws-ppa/)
8. Google Cloud. "Committed use discounts overview." [https://docs.cloud.google.com/compute/docs/instances/committed-use-discounts-overview](https://docs.cloud.google.com/compute/docs/instances/committed-use-discounts-overview)
9. Google Cloud. "Cloud Healthcare API release notes" — Healthcare Natural Language API deprecation and May 27, 2026 shutdown date. [https://docs.cloud.google.com/healthcare-api/docs/release-notes](https://docs.cloud.google.com/healthcare-api/docs/release-notes)
10. Amazon Bedrock: [https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
11. Amazon SageMaker: [https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html)
12. Amazon Rekognition: [https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html)
13. Amazon Transcribe: [https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html](https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html)
14. Amazon Textract: [https://docs.aws.amazon.com/textract/latest/dg/what-is.html](https://docs.aws.amazon.com/textract/latest/dg/what-is.html)
15. Amazon Comprehend: [https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html)
16. Amazon Translate: [https://docs.aws.amazon.com/translate/latest/dg/what-is.html](https://docs.aws.amazon.com/translate/latest/dg/what-is.html)
17. Amazon Polly: [https://docs.aws.amazon.com/polly/latest/dg/what-is.html](https://docs.aws.amazon.com/polly/latest/dg/what-is.html)
18. Amazon Bedrock AgentCore (generally available): [https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available)
19. The next generation of Amazon SageMaker: [https://aws.amazon.com/about-aws/whats-new/2024/12/next-generation-amazon-sagemaker](https://aws.amazon.com/about-aws/whats-new/2024/12/next-generation-amazon-sagemaker)
20. Vertex AI: [https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform)
21. Vertex AI Model Garden: [https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models)
22. Cloud Vision AI: [https://docs.cloud.google.com/vision/docs](https://docs.cloud.google.com/vision/docs)
23. Document AI: [https://cloud.google.com/document-ai/docs/overview](https://cloud.google.com/document-ai/docs/overview)
24. Google Natural Language API: [https://cloud.google.com/natural-language/docs/basics](https://cloud.google.com/natural-language/docs/basics)
25. Google Speech-to-Text: [https://cloud.google.com/speech-to-text/docs/basics](https://cloud.google.com/speech-to-text/docs/basics)
26. Google Text-to-Speech: [https://cloud.google.com/text-to-speech/docs/basics](https://cloud.google.com/text-to-speech/docs/basics)
27. Cloud Translation API: [https://cloud.google.com/translate/docs/overview](https://cloud.google.com/translate/docs/overview)
28. Gemini Enterprise Agent Platform (formerly Vertex AI): [https://cloud.google.com/products/gemini-enterprise-agent-platform](https://cloud.google.com/products/gemini-enterprise-agent-platform)

## Related Articles

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/) - the methodology this page follows
- [Amazon Bedrock vs Google Vertex AI]({{< relref "bedrock-vs-vertex-ai.md" >}}) - a deeper, model-platform-only comparison (fine-tuning, RAG internals, agent frameworks) than this page's broader service map
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) - the lock-in and migration-burden mechanics behind the service map above
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) - making lock-in a checkable cost rather than a feeling
- [The US CLOUD Act](/glossary/cloud-act/) - why jurisdiction isn't actually an AWS-vs-GCP question
- [Data sovereignty](/glossary/data-sovereignty/) - separating residency from sovereignty as distinct constraints
- [The shared responsibility model for AI on AWS](/guides/shared-responsibility-model/) - a worked example of a decision boundary that is a gate, not a preference
- [Governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/) - working out whether a use case is actually in a heightened regulatory tier before treating that as a constraint here
- [AWS AI Services vs Azure AI]({{< relref "aws-vs-azure-ai.md" >}}) - AWS vs Azure comparison
- [Amazon Bedrock]({{< relref "/tools/amazon-bedrock.md" >}}) - AWS foundation model service
- [Bedrock vs Azure OpenAI]({{< relref "bedrock-vs-azure-openai.md" >}}) - detailed LLM platform comparison
- [Amazon SageMaker]({{< relref "/tools/amazon-sagemaker.md" >}}) - AWS managed ML platform
