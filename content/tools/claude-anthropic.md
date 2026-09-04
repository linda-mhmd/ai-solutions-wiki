---
title: "Claude by Anthropic - Enterprise AI Assistant"
description: "Claude's current model lineup (Fable 5.1, Mythos 5.1, Opus 5, Sonnet 5, Haiku 4.5), what each tier is for, current per-token pricing, and access options including Amazon Bedrock, Google Cloud, and Microsoft Foundry."
date: 2026-03-24
categories: [Tools]
tags: ["ai-ml", "beginner", "claude", "llm", "foundation-models", "bedrock", "enterprise"]
related:
  - tools/claude-code
  - tools/claude-design
  - tools/claude-cowork
  - tools/amazon-bedrock
  - tools/google-vertex-ai
  - comparisons/claude-vs-chatgpt
  - comparisons/openai-vs-anthropic
  - news/claude-fable-5-1-mythos-5-1-ga
last_updated: 2026-09-03
---

Claude is Anthropic's family of large language models, designed with a focus on safety, reliability, and extended context handling. For enterprise AI applications, Claude is one of the most widely deployed models via Amazon Bedrock, where it is available across multiple capability tiers — and, as of September 2026, also via Google Cloud, Microsoft Foundry, and Anthropic's own Claude Platform on AWS.

## Model Tiers

As of early September 2026, Anthropic's current lineup spans five named models across four tiers, all sharing the same API and the same general capability profile (tool use, long context, strong instruction following) at different price/performance points:

**Haiku** (`claude-haiku-4-5`) - The fastest and most cost-efficient tier, with a 200K-token context window. Best for high-volume, lower-complexity tasks: classification, short-form extraction, simple summarization, intent detection. At roughly a fifth of Sonnet's per-token price, Haiku is the right default for any pipeline where tasks are well-defined and the model's reasoning power is not the bottleneck.

**Sonnet** (`claude-sonnet-5`) - The middle tier, balancing capability and cost. Anthropic released Claude Sonnet 5 on 30 June 2026 for agentic and automation workloads, at performance close to the prior-generation flagship, Opus 4.8. Its introductory pricing was scheduled to rise 50% on 1 September 2026; Anthropic cancelled that increase on 10 August 2026 and made the introductory rate the permanent standard price instead — see [Anthropic cancels the Sonnet 5 price rise](/news/claude-sonnet-5-pricing-permanent/). For most enterprise knowledge-worker tasks (document review, draft generation, data analysis, high-volume agentic automation), Sonnet 5 provides the best practical value.

**Opus** (`claude-opus-5`) - The current flagship, for complex reasoning tasks. Claude Opus 5 reached general availability on 24 July 2026, succeeding Opus 4.8 as Anthropic's default recommendation and the default model on Claude Max. Use it where accuracy on difficult, nuanced tasks justifies the cost premium: complex legal analysis, advanced code review, multi-document synthesis, and research tasks with ambiguous source material.

**Fable** (`claude-fable-5-1`) - Anthropic's most capable widely-released model, positioned above Opus for the most demanding programming and long-horizon knowledge work. Claude Fable 5.1 reached general availability on 1 September 2026, at the same headline per-token price as its predecessor, Fable 5, but with prompt-cache-read pricing cut 75% (from $1 to $0.25 per million tokens) — a change that disproportionately benefits agentic, tool-heavy workloads that repeatedly re-read cached context. See [Claude Fable 5.1 reaches general availability, Mythos 5.1 stays gated](/news/claude-fable-5-1-mythos-5-1-ga/).

**Mythos** (`claude-mythos-5-1`) - The same underlying model as Fable 5.1, run with a lighter safeguard stack for cybersecurity defenders and life-sciences researchers who need capabilities the general-availability safeguards would otherwise block. Unlike every other tier above, Mythos 5.1 is **not** self-serve: access is restricted to organizations vetted through Anthropic's Cyber Verification Program (CVP) or Life Sciences Verification Program (LSVP), coordinated with the US government and, as of launch, limited to a set of US organizations. Pricing is identical to Fable 5.1 ($10/$50 per MTok, $0.25/MTok cache reads) for the organizations that qualify.

Anthropic also continues to serve several prior-generation models (Opus 4.8, 4.7, 4.6, 4.5; Sonnet 4.6, 4.5) for existing integrations, but Sonnet 5, Opus 5, and Fable 5.1/Mythos 5.1 are the current recommended defaults for new work at their respective tiers.

## Key Strengths

**Long context window** - Sonnet 5, Opus 5, Fable 5.1, and Mythos 5.1 all support context windows up to 1 million tokens — roughly 555,000 words on the current tokenizer (introduced with Opus 4.7, which produces about 30% more tokens per unit of text than the previous one) — billed at standard per-token rates across the full window; Haiku 4.5, which still uses the previous tokenizer, supports 200K tokens (roughly 150,000 words). This means entire books, large codebases, or extensive document sets can be processed in a single call without chunking. For RAG pipelines where traditional chunking limits retrieval quality, Claude's long context can process entire source documents directly.

**Instruction following** - Claude reliably follows complex, structured instructions, including multi-part JSON output schemas, tone and style constraints, and conditional logic instructions. This makes it well-suited for applications with strict output format requirements.

**Reduced hallucination on constrained tasks** - When instructed to answer only from provided context and to acknowledge when information is not present, Claude follows these constraints reliably. This is critical for enterprise knowledge base applications where accurate sourcing matters.

**Code tasks** - Claude performs well on code generation, debugging, and documentation tasks, including less common languages and frameworks. Fable 5.1 in particular is positioned by Anthropic specifically around programming and long-running agentic problem-solving, with reported benchmark gains over Fable 5 on coding- and tool-use-heavy evaluations.

## Access Options

Claude is available through:
- **Anthropic API** - Direct API access with usage-based pricing
- **Amazon Bedrock** - Access via Bedrock API with AWS IAM, VPC, and compliance controls; data stays within your AWS account; pricing is partner-operated and set independently by AWS
- **Claude Platform on AWS** - Anthropic's own AWS Marketplace listing, billed in Claude Consumption Units (CCU) at Anthropic's standard per-model rates, so usage shows as a single line item on your AWS bill
- **Google Cloud** - via the Gemini Enterprise Agent Platform (formerly Vertex AI); see [Google Vertex AI](/tools/google-vertex-ai/) for what changed in that rebrand
- **Microsoft Foundry** - billed through the Azure Marketplace, also using Claude Consumption Units at standard first-party rates
- **Claude.ai** - Web and API interface for direct use and team collaboration features

For enterprise deployments requiring data residency controls, compliance certifications (SOC 2, HIPAA BAA), and IAM integration, Bedrock or Claude Platform on AWS is typically the preferred access path; an organization whose cloud commitment is specifically with Google Cloud is, as of this writing, the one procurement path that reaches Claude but not OpenAI's frontier models, since OpenAI does not offer GPT-5.6 or newer through Vertex AI's Model Garden.

## Common Enterprise Use Cases

- **Document processing** - Contract review, policy analysis, report summarization
- **Customer service** - Intelligent response drafting, inquiry triage, escalation detection
- **Code assistance** - Review, generation, refactoring, documentation
- **Knowledge management** - Q&A over internal documentation, knowledge base search and synthesis
- **Data analysis** - Interpreting structured data outputs, generating narrative from metrics, analyzing reports

## Pricing

Current Claude API pricing, per million tokens (MTok), fetched directly from Anthropic's pricing documentation:

| Model | Input | Cache read | Output | Context |
|---|---|---|---|---|
| Claude Haiku 4.5 | $1.00 | $0.10 | $5.00 | 200K |
| Claude Sonnet 5 | $2.00 | $0.20 | $10.00 | 1M |
| Claude Opus 5 | $5.00 | $0.50 | $25.00 | 1M |
| Claude Fable 5.1 | $10.00 | $0.25 | $50.00 | 1M |
| Claude Mythos 5.1 *(verified orgs only)* | $10.00 | $0.25 | $50.00 | 1M |

Notes:
- Sonnet 5's $2/$10 rate was introductory pricing through 31 August 2026, scheduled to rise 50% to $3/$15; Anthropic cancelled that increase on 10 August 2026 and made $2/$10 the permanent standard rate.
- Cache reads on every model except Fable 5.1 and Mythos 5.1 cost 10% of the base input rate; Fable 5.1 and Mythos 5.1 use a sharper 2.5% multiplier instead, which is what makes their $0.25/MTok cache-read price roughly a quarter of every other current tier's cache-read cost relative to its own input price.
- The Batch API discounts input and output tokens 50% on every model above (asynchronous, non-latency-sensitive workloads only).
- **Amazon Bedrock and Google Cloud are partner-operated**: pricing is set independently by AWS and Google and can differ from the first-party rates above — check [Bedrock pricing](https://aws.amazon.com/bedrock/pricing/) or [Google Cloud pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing#claude-models) directly.
- **Claude Platform on AWS and Claude in Microsoft Foundry** are Anthropic-operated and bill at the same rates as the table above, converted to Claude Consumption Units ($0.01/CCU) for marketplace invoicing.
- Pricing changes over time - always check the [current Anthropic pricing page](https://platform.claude.com/docs/en/about-claude/pricing) before building cost models for production workloads.

## Recent Developments

- **28 May 2026** - Anthropic raised a $65 billion Series H at a $965 billion post-money valuation (Amazon contributing $5 billion), alongside the Opus 4.8 launch. See [Anthropic raises $65 billion at a $965 billion valuation](/news/anthropic-series-h/).
- **12 June - 1 July 2026** - A US national-security order briefly required Anthropic to disable Fable 5 and Mythos 5 worldwide; the restriction was reversed about three weeks later. See [Why the US restricted Anthropic's Fable 5 and Mythos 5](/news/anthropic-fable-mythos-us-restriction/) and [US lifts export controls on Fable 5 and Mythos 5](/news/fable-5-export-controls-lifted/).
- **30 June 2026** - Claude Sonnet 5 released for agentic and automation workloads. See [Anthropic releases Claude Sonnet 5](/news/claude-sonnet-5/).
- **24 July 2026** - Claude Opus 5 reached general availability, succeeding Opus 4.8 as the flagship and default on Claude Max.
- **10 August 2026** - Sonnet 5's introductory $2/$10 pricing was made permanent, cancelling a scheduled 50% increase. See [Anthropic cancels the Sonnet 5 price rise](/news/claude-sonnet-5-pricing-permanent/).
- **1 September 2026** - Claude Fable 5.1 and Claude Mythos 5.1 reached general availability, with Mythos 5.1 restricted to verified organizations. See [Claude Fable 5.1 reaches general availability, Mythos 5.1 stays gated](/news/claude-fable-5-1-mythos-5-1-ga/).

For how this lineup compares to OpenAI's models on cost, capability, and access constraints, see [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/) and [OpenAI vs Anthropic](/comparisons/openai-vs-anthropic/).

## The Claude Product Family

Beyond the models and the chat apps, Anthropic ships several products built on the same Claude models. They differ mainly in where they run and what they produce.

| | Where it lives | What it is for | Plan needed |
|---|---|---|---|
| **[Claude Code](/tools/claude-code/)** | Terminal and IDEs | Editing, running, and shipping code | Pro, Max, Team Premium, or API |
| **[Claude Design](/tools/claude-design/)** | claude.ai (Anthropic Labs) | Designing UI and documents as HTML | Pro, Max, Team, Enterprise |
| **[Claude Cowork](/tools/claude-cowork/)** | Claude Desktop app | Autonomous multi-step knowledge work | Any paid plan |
| **[Claude apps and API](/tools/claude-anthropic/)** | Web, mobile, desktop, API | Chat, analysis, building on the model | Free and up |

For teams, Anthropic also offers [Claude Tag](/news/anthropic-claude-agents-in-slack/), a shared agent that lives inside Slack channels.

## Sources

1. Anthropic, "Pricing" (fetched 3 September 2026 - Claude Fable 5.1/Mythos 5.1, Opus 5, Sonnet 5, Haiku 4.5 rates and cache-pricing multipliers): [https://platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing)
2. Anthropic, "Claude Opus 5" model page (release date, pricing, comparison table), fetched 3 September 2026: [https://platform.claude.com/docs/en/models/opus-5/overview](https://platform.claude.com/docs/en/models/opus-5/overview)
3. Anthropic, "Claude Sonnet 5" (30 June 2026): [https://www.anthropic.com/news/claude-sonnet-5](https://www.anthropic.com/news/claude-sonnet-5)
4. Anthropic, statement that Sonnet 5's $2/$10 introductory pricing is now permanent (10 August 2026): [https://x.com/claudeai/status/2086891169217122586](https://x.com/claudeai/status/2086891169217122586)
5. Anthropic, "Introducing Claude Fable 5.1 and Claude Mythos 5.1" (1 September 2026): [https://www.anthropic.com/claude-fable-and-mythos-5-1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
6. Anthropic, "Project Glasswing" (Mythos access program): [https://anthropic.com/glasswing](https://anthropic.com/glasswing)
7. Anthropic, "Anthropic raises Series H at a $965B post-money valuation" (28 May 2026): [https://www.anthropic.com/news/series-h](https://www.anthropic.com/news/series-h)
8. This wiki, [Claude vs ChatGPT: Constraints Before Features](/comparisons/claude-vs-chatgpt/) and [OpenAI vs Anthropic](/comparisons/openai-vs-anthropic/), both fetched and cross-verified against Anthropic's pricing and model pages on 3 September 2026.

## Further reading

- [Claude Code](/tools/claude-code/): the agentic coding tool for your terminal and IDE
- [Claude Design](/tools/claude-design/): conversation to editable HTML and document layouts
- [Claude Cowork](/tools/claude-cowork/): an agent for multi-step knowledge work on your desktop
- [Amazon Bedrock](/tools/amazon-bedrock/): Claude's most widely deployed enterprise access path
- [Google Vertex AI](/tools/google-vertex-ai/): Claude on Google Cloud's Gemini Enterprise Agent Platform
- [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/): how the Claude and OpenAI apps and models compare
- [Claude Tag in Slack](/news/anthropic-claude-agents-in-slack/): the shared team agent for channels
