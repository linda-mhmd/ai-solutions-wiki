---
title: "AWS AI Services vs Azure AI"
description: "AWS and Azure's AI catalogs have converged enough that a feature table mostly restates itself. What actually decides between them is lock-in already accrued, whose committed-spend program you're under, and whose identity system your org already runs on — this comparison starts there, then maps the services that remain to compare."
date: 2026-03-24
last_verified: 2026-09-03
categories: [Comparisons]
tags: ["cloud-computing", "intermediate", "aws", "azure", "ai-services", "comparison", "cloud", "vendor-lock-in"]
last_updated: 2026-09-03
lastmod: 2026-09-03
related:
  - guides/constraint-driven-comparisons
  - guides/cloud-exit-costs-and-data-gravity
  - glossary/cloud-act
  - glossary/data-sovereignty
  - guides/shared-responsibility-model
  - guides/software-licensing-and-vendor-lock-in
  - guides/governance-thresholds-as-you-scale
---

AWS and Azure both sell broad, credible AI portfolios, and by 2026 their catalogs have converged enough that a row-by-row feature comparison mostly restates the same conclusion twice: managed foundation-model access, managed RAG, managed agents, managed vision and speech, a full ML platform. Both now host Anthropic's Claude and OpenAI's GPT models side by side — a distinction that would have been a real differentiator two years ago is now a wash [1][2]. A feature table between them is not wrong, exactly. It is just not where this decision actually gets made.

This page follows the house methodology at [constraint-driven comparisons](/guides/constraint-driven-comparisons/): name what actually eliminates or weights an option for a given reader before comparing features, and only compare features within the set that survives. For AWS vs. Azure specifically, that means starting from what an organization has already committed to — cloud, identity system, spend program — rather than from the service catalog.

## Which constraints are load-bearing here, and which aren't

Not every category in the house methodology applies with equal force to this particular pair. Two hyperscalers with converging catalogs is a different shape of decision than, say, on-premise vs. cloud, or a US hyperscaler vs. an EU sovereign provider — so say plainly up front what does and doesn't do the deciding work here:

- **Vendor lock-in and exit cost** — usually the dominant factor, and the reason most of this decision is effectively made before anyone opens either service catalog.
- **Cost structure and sunk investment** — a real tradeoff, driven less by per-token pricing (increasingly identical across both) than by which committed-spend program an organization is already inside.
- **Contractual and customer-driven requirements** — often functions like a gate in practice, even though it isn't a technical or legal one: an existing Microsoft or AWS enterprise relationship, or a customer's own procurement mandate, can settle the question regardless of what either AI catalog offers.
- **Internal capability and knowledge retention** — a genuine tradeoff about operational fluency, separate from lock-in.
- **Regulatory and jurisdictional exposure** — the one category that is *not* a strong differentiator between AWS and Azure themselves for most readers (both are standard commercial products of US-headquartered parents), but becomes a narrow, genuine gate for a specific subset of readers with a hard EU-operational-sovereignty requirement. Covered in detail below because getting this one wrong is expensive.

Resilience/business-continuity and trust/legal-control are folded into the sections above rather than treated separately — for this comparison they show up as facets of lock-in and jurisdiction, not as independent deciding factors.

## Gates vs. tradeoffs

For the large majority of organizations reading this, **none of the factors below function as a hard gate** the way a jurisdictional rule can in an on-premise-vs-cloud decision. Both platforms are viable, enterprise-credentialed options for nearly everything in the feature tables further down. What decides it is a tradeoff, usually one that's already mostly settled by facts that predate the AI decision. The one genuine gate-like exception — a hard requirement that data and operations never be subject to US compelled disclosure — is real but narrower than either vendor's marketing implies, and it's flagged explicitly as a gate in the jurisdiction section below rather than folded in with the tradeoffs.

### Vendor lock-in and exit cost

This is where the decision is usually actually made, and it's mostly made before the AI question is even asked. An organization already built on Lambda, Step Functions, S3 event pipelines, and IAM has real, non-trivial switching cost to leave AWS for Azure's AI services, independent of whether Bedrock or Foundry scores higher on any given capability — and the reverse holds for an organization built on Entra ID, Logic Apps, and Azure Functions. Bedrock AgentCore and Foundry Agent Service both give you a managed agent runtime, but they are not interchangeable: AgentCore reached general availability in October 2025, and Foundry Agent Service is built on OpenAI's Responses API and wired into the Foundry ecosystem [3][4] — an agent built against one does not port cleanly to the other. See [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) for making exit cost concrete rather than rhetorical, and [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) for what the data side of that migration actually costs once a meaningful corpus or vector index has accumulated on one side.

**Service-lifecycle risk is part of this, and it's not hypothetical here.** Two services in the table below have already been retired out from under customers who built on them: Azure AI Metrics Advisor was retired on 18 May 2026 [5], and Azure Personalizer stopped accepting new resources in September 2023 and is scheduled to retire on 25 August 2026 [6], with Microsoft pointing customers to Azure Monitor, the open-source Anomaly Detector, Fabric, and the open-source `learning-loop` project respectively. This wiki does not have comparable rigorous data on AWS's own AI-service retirement rate to make a fair side-by-side claim, so the honest statement is narrower: whichever platform you build on, treat a managed AI service as a dependency with a lifecycle, not a permanent primitive — see [service lifecycle and deprecation](/guides/service-lifecycle-and-deprecation/).

### Cost structure and sunk investment

Per-token pricing is no longer a reliable differentiator: for shared models available on both platforms (the Claude family, GPT-5.x family) list prices are now largely identical, with only isolated exceptions where one platform prices a specific model marginally lower [7]. What differs structurally is the committed-spend program each platform ties the discount to. AWS's Enterprise Discount Program (marketed as part of AWS Private Pricing) discounts total AWS billing against a negotiated commitment scoped to AWS cloud spend [8]. Microsoft's Azure Consumption Commitment (MACC) is explicitly a component of a broader Microsoft Enterprise Agreement or Microsoft Customer Agreement billing relationship, and eligible spend against it includes most first-party Azure consumption, AI services included [9]. In practice this means an organization that already carries a Microsoft EA for Microsoft 365 or Dynamics 365 licensing sees Azure AI spend draw down against a commitment it may have made for entirely unrelated reasons — a marginal-cost picture a fresh AWS relationship can't replicate, and vice versa for an organization already deep into an AWS EDP. This is a tradeoff, not a gate: it changes the effective price, not which platform is technically available to you.

### Contractual and customer-driven requirements

This is the category the house methodology names explicitly as legitimate and distinct from regulation: sometimes the deciding factor is a specific counterparty, not a law or a cost model. An enterprise already standardized on Microsoft 365, Teams, and Microsoft Entra ID for workforce identity has a real, often non-negotiable pull toward Azure AI, because Foundry's access controls and data-handling agreements build on an identity and compliance relationship the organization already has [10]. The same holds in reverse for an organization whose landing zone, IAM structure, and account governance are already built in AWS Organizations and Control Tower. Neither is a technical constraint — both platforms will happily serve either kind of customer — but a customer's own security questionnaire, an existing master services agreement, or a partner's procurement process can settle this question before the AI service catalog is ever opened. See [AWS vs. Azure governance tools](/comparisons/aws-vs-azure-governance/) for the deeper comparison of the account, policy, and security-monitoring tooling this constraint actually depends on.

### Internal capability and knowledge retention

Separate from lock-in: which platform's operational model your team can actually run well, today, changes real outcomes — time to production, incident response quality, and how much of "the AI service is worse" is actually "the team is unfamiliar with this cloud's conventions." A team fluent in CloudFormation/CDK, SageMaker pipelines, and IAM policy authoring will ship faster and more safely on Bedrock and SageMaker AI than an equally capable team encountering AWS's conventions for the first time — and the same holds for a Bicep/ARM- and Azure ML-fluent team on Foundry. Per the house methodology, this cuts both ways: choosing the platform your team already knows is not automatically the safe choice if it was chosen for the wrong reasons, and choosing the "objectively stronger" platform your team cannot yet operate reliably trades vendor dependency for a different risk — a single point of failure in expertise.

### Regulatory and jurisdictional exposure — a narrow, real gate

For most readers, this category does **not** distinguish AWS from Azure the way it would distinguish either from a non-US provider. Both are standard commercial products operated by US-headquartered parent companies, and under the US CLOUD Act (18 U.S.C. § 2713), jurisdiction attaches to the provider's possession, custody, or control of data — not to the region where the servers physically sit [11]. Picking an EU AWS region over a US Azure region, or vice versa, does not by itself satisfy a requirement that data never be subject to US compelled disclosure, for either platform's standard global commercial offering. See [the US CLOUD Act](/glossary/cloud-act/) for the statutory detail and the EDPB/EDPS position that a CLOUD Act request alone is not a valid basis for a GDPR data transfer.

For the narrower set of readers for whom that *is* a hard requirement, both vendors have built distinct — and structurally different — responses, and both are new enough that neither has a track record yet:

- **AWS European Sovereign Cloud** reached general availability on 15 January 2026: a new parent company and three subsidiaries incorporated in Germany, with day-to-day operations, data-centre access, and technical support restricted to EU-resident AWS employees, a Managing Director legally bound to act in the AWS European Sovereign Cloud's interest, and an advisory board including at least one member independent of Amazon [12][13]. The first region is in Brandenburg, Germany, with expansion to Belgium, the Netherlands, and Portugal via sovereign Local Zones [12]. What AWS's own announcement material does *not* address is CLOUD Act applicability directly — and a wholly-owned German subsidiary of a US parent is exactly the fact pattern the CLOUD Act's own "possession, custody, or control" test was written to reach, per the wiki's own analysis of the statute [11]. Whether this specific governance structure changes that analysis for a specific customer's data is an open legal question, not one this comparison — or AWS's marketing copy — resolves.
- **Azure's route to the same requirement** runs through Microsoft's National Partner Clouds, part of Microsoft Cloud for Sovereignty: locally-owned, independently *operated* entities that license the Azure and Microsoft 365 technology stack but are explicitly not run by Microsoft [14]. In Germany, that's Delos Cloud, an SAP subsidiary structured as a German GmbH under German jurisdiction, with a memorandum of understanding giving Delos the right to continue operating using licensed Microsoft technology if Microsoft services to it were ever restricted [15][16]; in France, it's Bleu, an Orange–Capgemini joint venture built to SecNumCloud requirements [14]. This is, on paper, a more separated ownership structure than a wholly-owned subsidiary — but it is currently scoped to specific national and public-sector programs (Delos Cloud targets German public administration, not Azure's general enterprise AI product) rather than being a drop-in replacement for standard Azure AI services. It also replaces an earlier, failed attempt: **Azure Deutschland**, Microsoft's 2015–2021 data-trustee model operated with T-Systems, which Microsoft discontinued in 2021 for low customer demand [17]. Readers who have seen "German government cloud" cited as an Azure differentiator — including in an earlier version of this page — should not treat that as Azure's current offering; the current mechanism is structurally different and much narrower in scope.

**What this comparison cannot resolve:** whether either structure actually defeats the CLOUD Act's possession-custody-or-control test for a specific organization's specific data is a live, unsettled legal question, not a technical one, and it depends on facts — the exact data flows, the exact entity relationships, the exact request in question — that no general comparison can settle. If this is a genuine requirement rather than a preference, get counsel review before relying on either vendor's sovereign structure as a compliance control. Separately, and not addressed by cloud region or entity structure at all: the EU AI Act's risk-tier and transparency obligations apply based on the use case, not the hosting cloud — see [governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/) for when those trigger regardless of which platform you choose.

## What survives to a feature comparison

For most readers, none of the above rules out either platform outright — it weights the choice rather than settling it, and the weighting is usually already fixed by facts (existing cloud, existing spend commitment, existing identity system) that predate the AI decision. What follows is the service-by-service map of each platform's **standard global commercial AI catalog** — useful once you know which side of that weighting you're on, or if you're genuinely starting from neutral — a new team, no committed spend, no existing identity system to build on, which is a real but comparatively rare position to be in. Readers who landed here because of the narrow sovereignty gate above should note these tables don't describe AWS European Sovereign Cloud or a National Partner Cloud like Delos Cloud specifically — both are newer, smaller service catalogs than the standard platforms mapped below, and neither vendor publishes a like-for-like feature comparison for its sovereign offering yet.

## Foundation Models and LLM Access

| AWS | Azure | Notes |
|---|---|---|
| [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) | [Microsoft Foundry (Azure OpenAI)](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry) | Bedrock offers 100+ models from multiple providers, including Amazon (Nova), Anthropic (Claude), DeepSeek, Moonshot AI, and MiniMax. OpenAI's open-weight gpt-oss models have been available since 2025 and expanded to additional regions that September [1]; OpenAI's proprietary GPT-5.x family and Codex followed later, moving from a limited preview in April 2026 to general availability on Bedrock in June 2026 [2]. Microsoft Foundry, the platform that absorbed Azure OpenAI Service, gives access to OpenAI's GPT-5 family plus models from Anthropic, Mistral, xAI, Meta, and others, alongside DALL-E and Whisper. |
| [Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html) | [Foundry Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) | Both provide managed agent runtimes with tool use. AgentCore reached general availability in October 2025. Foundry Agent Service (formerly Azure AI Agent Service) is built on the Responses API and integrates with the Microsoft Foundry ecosystem. |
| [Bedrock Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) | [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search) | Both provide managed RAG infrastructure with vector search. |
| [Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) | [Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview) | Content filtering and safety controls for LLM outputs. |

Both platforms now offer broad multi-model choice, and the "OpenAI models only run natively on Azure" claim that shaped earlier comparisons of this pair no longer holds: OpenAI's GPT-5.x family and Codex reached general availability on Bedrock in June 2026, after a limited preview that April [2][18]. Microsoft Foundry (the platform that replaced the standalone Azure OpenAI Service after the Ignite 2025 rebrand of Azure AI Foundry) still leads with the deepest first-party OpenAI product integration and enterprise data-privacy agreement structure, given Microsoft's position as OpenAI's original commercial partner — but that is now a difference in tooling and contractual depth around the same models, not a difference in raw model availability.

## Speech and Language

| AWS | Azure | Notes |
|---|---|---|
| [Amazon Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html) | [Azure Speech - STT](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text) | Both now cover 100+ languages; AWS's own language-coverage figure has grown to match Azure's since older comparisons of this pair were written. AWS Transcribe Medical has strong healthcare-specific accuracy. |
| [Amazon Polly](https://docs.aws.amazon.com/polly/latest/dg/what-is.html) | [Azure Speech - TTS](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech) | Azure's voice catalog is larger (Microsoft does not publish one current total, but it has grown substantially with recent HD-voice additions). Polly currently lists 100+ voices per AWS's own product page, up from the 60-voice figure that circulates in older comparisons. |
| [Amazon Translate](https://docs.aws.amazon.com/translate/latest/dg/what-is.html) | [Azure Translator](https://learn.microsoft.com/en-us/azure/ai-services/translator/overview) | Both support 70+ languages with neural translation quality. Azure Translator integrates with Office 365 workflows. |
| [Amazon Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html) | [Azure Language Service](https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview) | Sentiment, entity extraction, key phrase extraction. Azure adds opinion mining and healthcare NER via Language service. |
| [Amazon Lex](https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html) | [Azure Bot Service](https://learn.microsoft.com/en-us/azure/bot-service/bot-overview?view=azure-bot-service-4.0) | Conversational AI for chatbots. Azure Bot Service integrates with Teams. |

## Vision

| AWS | Azure | Notes |
|---|---|---|
| [Amazon Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html) | [Azure AI Vision](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview) | Label detection, face analysis, OCR, content moderation. Azure Vision adds spatial analysis for physical spaces. |
| [Amazon Textract](https://docs.aws.amazon.com/textract/latest/dg/what-is.html) | [Azure Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview) | Structured document extraction (forms, tables). Azure Document Intelligence has strong pre-built models for specific document types (invoices, receipts, IDs). |
| [Rekognition Custom Labels](https://docs.aws.amazon.com/rekognition/latest/customlabels-dg/what-is.html) | [Azure Custom Vision](https://learn.microsoft.com/en-us/azure/ai-services/custom-vision-service/overview) | Train vision models on your own labeled images. |

## ML Platform

| AWS | Azure | Notes |
|---|---|---|
| [Amazon SageMaker AI](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html) | [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/overview-what-is-azure-machine-learning) | Full ML lifecycle platforms. SageMaker has deeper AWS service integration. Azure ML has strong MLflow support. AWS renamed the core service to SageMaker AI (December 2024) and now nests it inside SageMaker Unified Studio (generally available March 2025), which also brings together analytics services such as Amazon EMR, AWS Glue, Amazon Athena, and Amazon Redshift. |
| [SageMaker Ground Truth](https://docs.aws.amazon.com/sagemaker/latest/dg/sms.html) | [Azure ML Data Labeling](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-create-image-labeling-projects) | Managed data labeling with human annotators. |
| [SageMaker Pipelines](https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html) | [Azure ML Pipelines](https://learn.microsoft.com/en-us/azure/machine-learning/concept-ml-pipelines) | ML workflow orchestration. |
| [Amazon Forecast](https://docs.aws.amazon.com/forecast/latest/dg/what-is-forecast.html) | [Azure AI Metrics Advisor](https://learn.microsoft.com/en-us/azure/ai-services/metrics-advisor/overview) (retired 18 May 2026) | Time-series anomaly detection and forecasting as a managed service. Microsoft points customers to Azure Monitor, the open-source Anomaly Detector, and anomaly detection in Microsoft Fabric [5]. |
| [Amazon Personalize](https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html) | [Azure Personalizer](https://learn.microsoft.com/en-us/azure/ai-services/personalizer/what-is-personalizer) (retiring 25 Aug 2026) | Recommendation and personalization APIs. Azure Personalizer stopped accepting new resources in September 2023; Microsoft recommends migrating to the open-source `learning-loop` project [6]. |

## If you're starting from neutral

A genuinely constraint-free starting position — no existing cloud, no committed spend, no identity system already in place — is rare, but real for a new team or a green-field project. In that position, the service catalogs above are close enough in capability that the switching cost of guessing wrong outweighs the capability gap between them. The actual choice is which operational model you'd rather build institutional depth in: AWS's primitives (IAM, Lambda, Step Functions, S3-driven event pipelines) or Microsoft's identity- and productivity-suite-centred model (Entra ID, Teams, the Microsoft 365 graph). Both are defensible. What matters, per the house methodology, is making that choice on purpose — against your own constraints — rather than defaulting to whichever platform someone in the room happened to use last.

## Sources

**AWS official documentation**
- Amazon Bedrock: [https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
- Amazon Bedrock AgentCore: [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- Amazon SageMaker AI: [https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html)
- Amazon Rekognition: [https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html)
- Amazon Transcribe: [https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html](https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html)
- Amazon Textract: [https://docs.aws.amazon.com/textract/latest/dg/what-is.html](https://docs.aws.amazon.com/textract/latest/dg/what-is.html)
- Amazon Comprehend: [https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html)
- Amazon Translate: [https://docs.aws.amazon.com/translate/latest/dg/what-is.html](https://docs.aws.amazon.com/translate/latest/dg/what-is.html)
- Amazon Polly: [https://docs.aws.amazon.com/polly/latest/dg/what-is.html](https://docs.aws.amazon.com/polly/latest/dg/what-is.html)

**Azure official documentation**
- Microsoft Foundry (formerly Azure AI Foundry, includes Azure OpenAI): [https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry)
- Foundry Agent Service: [https://learn.microsoft.com/en-us/azure/foundry/agents/overview](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)
- Azure OpenAI Service: [https://learn.microsoft.com/en-us/azure/ai-services/openai/overview](https://learn.microsoft.com/en-us/azure/ai-services/openai/overview)
- Azure Machine Learning: [https://learn.microsoft.com/en-us/azure/machine-learning/overview-what-is-azure-machine-learning](https://learn.microsoft.com/en-us/azure/machine-learning/overview-what-is-azure-machine-learning)
- Azure AI Vision: [https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview)
- Azure Document Intelligence: [https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview)
- Azure Language Service: [https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview](https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview)
- Azure Speech Service: [https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview)
- Azure AI Content Safety: [https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview)

**Constraint, jurisdiction, and cost-structure sources**
1. Amazon Web Services, "OpenAI open weight models expand to new regions on Amazon Bedrock" (18 September 2025) — region expansion of the open-weight gpt-oss models, distinct from the proprietary GPT-5.x family: [https://aws.amazon.com/about-aws/whats-new/2025/09/open-ai-open-weight-models-new-regions-amazon-bedrock/](https://aws.amazon.com/about-aws/whats-new/2025/09/open-ai-open-weight-models-new-regions-amazon-bedrock/)
2. Amazon Web Services, "OpenAI models and Codex on Amazon Bedrock are now generally available" (1 June 2026) — the GA announcement for GPT-5.5, GPT-5.4, and Codex: [https://aws.amazon.com/blogs/machine-learning/openai-models-and-codex-on-amazon-bedrock-are-now-generally-available/](https://aws.amazon.com/blogs/machine-learning/openai-models-and-codex-on-amazon-bedrock-are-now-generally-available/)
3. Amazon Bedrock AgentCore documentation (GA, October 2025): [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
4. Microsoft, Foundry Agent Service overview: [https://learn.microsoft.com/en-us/azure/foundry/agents/overview](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)
5. Microsoft, Metrics Advisor archive notice — "Azure AI Metrics Advisor has been retired as of 18 May 2026": [https://learn.microsoft.com/en-us/previous-versions/azure/ai-services/metrics-advisor/whats-new](https://learn.microsoft.com/en-us/previous-versions/azure/ai-services/metrics-advisor/whats-new)
6. Microsoft, "What is Personalizer?" retirement notice (retiring 25 August 2026): [https://learn.microsoft.com/en-us/azure/ai-services/personalizer/what-is-personalizer](https://learn.microsoft.com/en-us/azure/ai-services/personalizer/what-is-personalizer)
7. PricePerToken, Amazon Bedrock vs. Azure OpenAI/Foundry model pricing comparison (practitioner pricing tracker, not a primary vendor source; cited for the general shape of price convergence only): [https://pricepertoken.com/endpoints/compare/amazon-bedrock-vs-azure](https://pricepertoken.com/endpoints/compare/amazon-bedrock-vs-azure)
8. Amazon Web Services, AWS Marketplace — Private Pricing / Enterprise Discount Program (EDP) commitment structure: [https://aws.amazon.com/marketplace/pp/prodview-6id2azawudgv4](https://aws.amazon.com/marketplace/pp/prodview-6id2azawudgv4)
9. Microsoft, "Track your Microsoft Azure Consumption Commitment (MACC)" — MACC as a component of an Enterprise Agreement or Microsoft Customer Agreement: [https://learn.microsoft.com/en-us/azure/cost-management-billing/benefits/macc/track-consumption-commitment](https://learn.microsoft.com/en-us/azure/cost-management-billing/benefits/macc/track-consumption-commitment)
10. Microsoft, Microsoft Entra ID overview: [https://learn.microsoft.com/en-us/entra/fundamentals/whatis](https://learn.microsoft.com/en-us/entra/fundamentals/whatis)
11. This wiki, [The US CLOUD Act](/glossary/cloud-act/) — statutory text (18 U.S.C. § 2713) and EDPB/EDPS analysis of the GDPR conflict.
12. Amazon Web Services / About Amazon, "AWS Launches AWS European Sovereign Cloud and Announces Expansion Across Europe" (15 January 2026): [https://press.aboutamazon.com/aws/2026/1/aws-launches-aws-european-sovereign-cloud-and-announces-expansion-across-europe](https://press.aboutamazon.com/aws/2026/1/aws-launches-aws-european-sovereign-cloud-and-announces-expansion-across-europe)
13. About Amazon EU, "Built, operated, controlled, and secured in Europe: AWS unveils new sovereign controls and governance structure for the AWS European Sovereign Cloud": [https://www.aboutamazon.eu/news/aws/built-operated-controlled-and-secured-in-europe-aws-unveils-new-sovereign-controls-and-governance-structure-for-the-aws-european-sovereign-cloud](https://www.aboutamazon.eu/news/aws/built-operated-controlled-and-secured-in-europe-aws-unveils-new-sovereign-controls-and-governance-structure-for-the-aws-european-sovereign-cloud)
14. Microsoft, "National Partner Clouds" overview (Delos Cloud, Bleu): [https://learn.microsoft.com/en-us/industry/sovereign-cloud/national-partner-clouds/overview-national-partner-clouds](https://learn.microsoft.com/en-us/industry/sovereign-cloud/national-partner-clouds/overview-national-partner-clouds)
15. Bertelsmann / Arvato Systems, on Delos Cloud's structure as a German GmbH for public-sector sovereign cloud: [https://www.arvato-systems.com/industries/public-sector/delos-cloud](https://www.arvato-systems.com/industries/public-sector/delos-cloud)
16. Yahoo Finance / press reporting, "Microsoft and SAP sign deal to keep EU cloud running, even in 'times of crisis'" — the Delos–Microsoft memorandum of understanding: [https://finance.yahoo.com/news/microsoft-sap-sign-deal-keep-104109406.html](https://finance.yahoo.com/news/microsoft-sap-sign-deal-keep-104109406.html)
17. Reporting on the discontinuation of Microsoft's 2015–2021 "Azure Deutschland" data-trustee cloud (operated with T-Systems, wound down in 2021 for low customer demand): [https://hackernoon.com/microsoft-announces-the-end-of-the-germany-cloud-431bbe407b94](https://hackernoon.com/microsoft-announces-the-end-of-the-germany-cloud-431bbe407b94)
18. Amazon Web Services, "Amazon Bedrock now offers OpenAI models, Codex, and Managed Agents" (28 April 2026) — announces limited preview access, not general availability; see source 2 for the GA date: [https://aws.amazon.com/about-aws/whats-new/2026/04/bedrock-openai-models-codex-managed-agents/](https://aws.amazon.com/about-aws/whats-new/2026/04/bedrock-openai-models-codex-managed-agents/)

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology behind this page's structure.
- [AWS vs. Azure governance tools](/comparisons/aws-vs-azure-governance/): the deeper comparison of policy enforcement, cost governance, and security monitoring behind the contractual/customer-requirements section above.
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/): making the lock-in and migration-burden constraint concrete and calculable, for either direction.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): the contractual side of exit cost, applicable to either platform's proprietary APIs.
- [The shared responsibility model for AI on AWS](/guides/shared-responsibility-model/): where AWS's responsibility ends and yours begins for Bedrock and SageMaker specifically.
- [The US CLOUD Act](/glossary/cloud-act/): the statutory basis for the jurisdiction discussion above.
- [Data sovereignty](/glossary/data-sovereignty/): the vocabulary for separating residency from sovereignty.
- [Governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/): when EU AI Act and other regulatory obligations trigger, independent of which cloud you're on.
- [AWS AI Services vs Google Cloud AI](/comparisons/aws-vs-gcp-ai/): the same service-mapping exercise against the third major hyperscaler.
- [Amazon Bedrock](/tools/amazon-bedrock/): AWS's foundation model service in more depth.
