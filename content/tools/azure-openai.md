---
title: "Azure OpenAI - Enterprise GPT on Microsoft Cloud"
description: "A comprehensive reference for Azure OpenAI in Microsoft Foundry: the GPT-6 Astra/Sol/Luna lineup, deployment types and pricing, content filtering, data residency, security advisories, and integration with the Microsoft ecosystem."
date: 2026-03-28
categories: [Tools]
tags: [azure-openai, Azure, GPT, enterprise, Microsoft, LLM, microsoft-foundry, gpt-6]
related:
  - tools/openai-api
  - tools/amazon-bedrock
  - tools/google-vertex-ai
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Azure OpenAI Service, now marketed as "Azure OpenAI in Foundry Models" inside **Microsoft Foundry** (formerly Azure AI Foundry), provides access to OpenAI's models through Microsoft Azure's enterprise cloud infrastructure. As of 25 September 2026 that means the **GPT-6 family (Astra, Sol and Luna, all generally available)**, the GPT-5.6 family (Sol/Terra/Luna tiers), and OpenAI's image, speech and embedding models. See [OpenAI API](/tools/openai-api/) for the full model-by-model reference. The models are identical to those available through the direct OpenAI API, but the hosting, compliance, networking, and support are managed by Microsoft. For enterprise teams, Azure OpenAI is often the preferred path to GPT models because it provides data residency guarantees, virtual network integration, and Microsoft enterprise support agreements.

Official documentation: https://learn.microsoft.com/en-us/azure/ai-services/openai/

## Current Models in Microsoft Foundry (September 2026)

**GPT-6 Astra, Sol and Luna are all generally available.** Astra reached Foundry first, as model version 2026-09-03. On **22 September 2026** Microsoft added GPT-6 Sol and GPT-6 Luna to the GA lineup on the same day OpenAI released them. Microsoft's own positioning: start with Astra for demanding reasoning, software engineering and computer use; use Sol for general-purpose production agents; use Luna for high-volume extraction, summarization, routing and routine customer interactions.

Deployment options as Microsoft lists them on 22 September 2026:

- **Standard** for Astra, Sol and Luna across **all 28 Global regions** and in both the **US and EU Data Zones**. This closes the gap that made Astra unusable for EU-residency workloads at launch, when it was offered only in Global and US Data Zone deployments.
- **Provisioned Throughput (PTU)** for Astra and Sol across Global regions and the US and EU Data Zones. Luna is not listed for PTU.
- **Priority Processing** for Sol only, across Global regions and the US Data Zone.

Standard pricing per 1M tokens, from Microsoft's announcement:

| Model | Deployment | Input | Cached input | Cache writes | Output | Long context (input / cached / writes / output) |
|---|---|---|---|---|---|---|
| GPT-6 Astra | Global Standard | $10.00 | $1.00 | $12.50 | $50.00 | $20.00 / $2.00 / $25.00 / $75.00 |
| GPT-6 Astra | Data Zone (US) | $11.00 | $1.10 | $13.75 | $55.00 | $22.00 / $2.20 / $27.50 / $82.50 |
| GPT-6 Astra | Data Zone (EU) | $12.00 | $1.20 | $15.00 | $60.00 | $24.00 / $2.40 / $30.00 / $90.00 |
| GPT-6 Sol | Global Standard | $2.00 | $0.20 | $2.50 | $10.00 | $4.00 / $0.40 / $5.00 / $15.00 |
| GPT-6 Sol | Data Zone (US) | $2.20 | $0.22 | $2.75 | $11.00 | $4.40 / $0.44 / $5.50 / $16.50 |
| GPT-6 Sol | Data Zone (EU) | $2.40 | $0.24 | $3.00 | $12.00 | $4.80 / $0.48 / $6.00 / $18.00 |
| GPT-6 Luna | Global Standard | $0.10 | $0.01 | $0.125 | $0.50 | $0.20 / $0.02 / $0.25 / $0.75 |
| GPT-6 Luna | Data Zone (US) | $0.11 | $0.011 | $0.1375 | $0.55 | $0.22 / $0.022 / $0.275 / $0.825 |
| GPT-6 Luna | Data Zone (EU) | $0.12 | $0.012 | $0.15 | $0.60 | $0.24 / $0.024 / $0.30 / $0.90 |

Global Standard matches OpenAI's direct list price. The **US Data Zone costs 10% more and the EU Data Zone 20% more**, which is the actual price of residency and should go into any business case that justifies Azure on residency grounds. Microsoft says Provisioned Throughput and Priority Processing pricing "varies by deployment type" and does not publish it in the announcement, so get those figures from the Azure OpenAI pricing page or your account team.

Three caveats carried over from Astra's launch documentation. First, Astra quota was tier-gated: Tier 5 and Tier 6 subscriptions had quota by default and others had to request it. Second, Azure did not support changing reasoning effort mid-conversation or mid-turn steering, both of which the direct API offers. Third, Microsoft notes Astra may apply enhanced safety controls at inference time, including classifier threshold changes and system-injected safety instructions. Microsoft has not said whether these still apply to Astra or whether they extend to Sol and Luna, so test against your own subscription.

**Not only OpenAI models.** Foundry is a multi-vendor catalog. On 22 September 2026 **Claude Opus 5.5** (Foundry ID `claude-opus-5-5`) became available there alongside the Claude API, Amazon Bedrock and Google Cloud. Anthropic's documentation says Foundry deployments follow the Claude API lifecycle schedule. Microsoft's own **MAI** models sit in the same catalog: MAI-Thinking-1 (public preview since 12 August 2026), MAI-Image-2.6 and MAI-Image-2.6-Flash (public preview since 4 September 2026), and MAI-Transcribe-2 (3 September 2026). The Phi small models are there too. See [Microsoft Phi](/tools/microsoft-phi/) for the MAI and Phi details.

## Security Advisory: CVE-2026-85889 (CVSS 10.0)

On **17 September 2026** Microsoft published **CVE-2026-85889**, an elevation-of-privilege vulnerability in Azure AI Foundry rated **CVSS 3.1 base score 10.0, severity Critical**. The advisory describes it as "missing authentication for critical function in Azure AI Foundry" that "allows an unauthorized attacker to elevate privileges over a network" (CWE-306). The MSRC record marks it as **not publicly disclosed and not exploited** at release. The Hacker News reported on 18 September that Microsoft credited researcher Rémy Marot and that no customer action is required, because the flaw was fully mitigated on Microsoft's side, as is usual for cloud-service CVEs.

There is nothing to patch, but two actions are still worth taking. Review Foundry activity and role assignments in your audit logs for the period before 17 September, because a missing-authentication flaw is exactly the class that would not leave obvious traces in your own application logs. And record the CVE in your vendor-risk file, since a maximum-severity flaw in the control plane of your model platform belongs in any AI-platform risk assessment.

## Why Azure OpenAI Over the Direct OpenAI API

The core models are the same. The differences are in the enterprise wrapper:

**Data residency** - Deploy models in specific Azure regions. Data stays within that region and within the Azure compliance boundary. This addresses regulatory requirements that prohibit data leaving specific geographies.

**Network isolation** - Azure OpenAI endpoints can be placed behind private endpoints in your virtual network. Traffic between your application and the model never traverses the public internet.

**Content filtering** - Built-in content filtering that screens both inputs and outputs for harmful content categories (hate, violence, sexual content, self-harm). Filters are enabled by default and can be configured per deployment. This is a compliance requirement for many enterprise applications.

**Enterprise support** - Covered under your existing Microsoft Enterprise Agreement. Issues are handled through Azure support channels with SLA-backed response times.

**Azure AD integration** - Authentication uses Azure Active Directory (Entra ID) tokens rather than API keys. This integrates with existing identity management, enables role-based access control, and produces audit logs through Azure Monitor.

## Deployment Model

In Azure OpenAI, you create a **resource** (the service instance) in a specific Azure region, then create **deployments** within that resource. Each deployment is an instance of a specific model version with its own endpoint and rate limits. This separation allows you to run multiple model versions simultaneously, allocate capacity to different applications, and manage rate limits independently.

**Standard deployments** share capacity across Azure customers. Capacity is not guaranteed and may be throttled during peak demand.

**Provisioned throughput** reserves dedicated capacity measured in PTUs (Provisioned Throughput Units). This guarantees a specific throughput level regardless of other customer demand. Required for production workloads with latency and throughput SLAs.

## Integration with the Microsoft Ecosystem

Azure OpenAI integrates naturally with the Microsoft stack:

**Azure AI Search** - The RAG backbone. AI Search indexes your documents, and Azure OpenAI generates answers grounded in search results. The older "On Your Data" feature that connected these with minimal code is deprecated and retires on 14 October 2026; Microsoft recommends Foundry Agent Service with a Foundry IQ knowledge base instead.

**Microsoft 365 Copilot** - Enterprise Copilot experiences that use your Azure OpenAI deployments to power AI features in Teams, Outlook, Word, and other Microsoft 365 applications.

**Power Platform** - AI Builder in Power Apps and Power Automate can call Azure OpenAI models, enabling citizen developers to build AI-powered workflows without code.

**Azure Functions** - Serverless compute for building API layers, processing pipelines, and event-driven architectures around Azure OpenAI.

## API Compatibility

The Azure OpenAI API is wire-compatible with the OpenAI API. Most OpenAI client libraries work with Azure OpenAI by changing the base URL, API version, and authentication mechanism. This means applications built against the OpenAI API can migrate to Azure OpenAI with minimal code changes, and frameworks like LangChain support both backends.

## Responsible AI Features

Beyond content filtering, Azure OpenAI provides abuse monitoring (detecting patterns of misuse), rate limiting per user or application, and a jailbreak detection system that identifies prompt injection attempts. These features are configurable through the Azure portal and provide audit logs for compliance reporting.

## Pricing

Azure OpenAI charges per token (input and output). For the GPT-6 family, Global Standard is priced identically to OpenAI's direct list price, and Data Zone deployments carry a residency premium: +10% for the US, +20% for the EU (see the table above). Provisioned throughput charges per PTU per hour. For organizations already committed to Azure spending, Azure OpenAI consumption counts toward existing Microsoft enterprise commitments and volume discounts.

## Sources

1. Microsoft Azure blog, 22 September 2026, "GPT-6 Astra, Sol, and Luna: For production agents in Microsoft Foundry" (GA of Sol and Luna; 28 Global regions; US and EU Data Zones; PTU for Astra and Sol; Priority Processing for Sol; pricing table): [https://azure.microsoft.com/en-us/blog/gpt-6-astra-sol-and-luna-for-production-agents-in-microsoft-foundry/](https://azure.microsoft.com/en-us/blog/gpt-6-astra-sol-and-luna-for-production-agents-in-microsoft-foundry/)
2. Microsoft Learn, "Foundry Models sold directly by Azure" (Astra version 2026-09-03, Tier 5/6 quota, enhanced safety controls, unsupported mid-conversation features): [https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure)
3. Microsoft Security Response Center, CVE-2026-85889, "Azure AI Foundry Elevation of Privilege Vulnerability" (released 17 September 2026; CVSS 10.0; CWE-306; not publicly disclosed; not exploited): [https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-85889](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-85889)
4. The Hacker News, 18 September 2026, "Microsoft Patches CVSS 10.0 Azure AI Foundry Flaw Enabling Unauthorized Privilege Escalation" (researcher credit; no customer action required): [https://thehackernews.com/2026/09/microsoft-patches-cvss-100-azure-ai.html](https://thehackernews.com/2026/09/microsoft-patches-cvss-100-azure-ai.html)
5. Anthropic, Models overview (Claude Opus 5.5 Microsoft Foundry ID; Foundry follows the Claude API lifecycle): [https://platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview)
6. Microsoft AI, 12 August 2026, "Introducing MAI-Thinking-1" (public preview in Microsoft Foundry): [https://microsoft.ai/news/introducing-mai-thinking-1/](https://microsoft.ai/news/introducing-mai-thinking-1/)
7. Microsoft AI, 4 September 2026, "Pushing the quality-cost frontier with MAI-Image-2.6" (MAI-Image-2.6 and -Flash in Foundry): [https://microsoft.ai/news/pushing-the-quality-cost-frontier-with-mai-image-2-6/](https://microsoft.ai/news/pushing-the-quality-cost-frontier-with-mai-image-2-6/)
8. Microsoft Learn, Azure OpenAI documentation: [https://learn.microsoft.com/en-us/azure/ai-services/openai/](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
9. Microsoft Learn, "Azure OpenAI On Your Data" (deprecation notice; retirement 14 October 2026; migrate to Foundry Agent Service with Foundry IQ): [https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/use-your-data](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/use-your-data)
