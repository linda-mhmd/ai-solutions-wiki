---
title: "Amazon Connect - AI-Powered Contact Center"
description: "Reference for Amazon Connect (now Amazon Connect Customer): cloud contact center with Lex and Bedrock AI, Contact Lens analytics, and automation patterns."
date: 2026-03-28
categories: [Tools]
tags: [amazon-connect, AWS, contact-center, customer-service, AI, voice, "aws-service"]
related:
  - tools/amazon-lex
  - tools/amazon-bedrock
  - tools/amazon-transcribe
layer: applications
provider: aws
pricing_model: payg
maturity: production
status: renamed
status_detail: "Amazon Connect was renamed Amazon Connect Customer at the What's Next with AWS 2026 event (announced 23 April 2026), as the customer service member of a new family of agentic AI solutions (Connect Customer, Connect Decisions, Connect Talent, Connect Health). The service itself continues; existing instances, contracts, and APIs are unaffected. Separately, Amazon Connect Voice ID reached end of support on 20 May 2026."
status_source: "https://aws.amazon.com/blogs/aws/top-announcements-of-the-whats-next-with-aws-2026/"
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Connect is a cloud-based contact center service that provides voice, chat, email, and SMS capabilities with integrated AI. A contact center is the system a business uses to handle customer interactions across phone and digital channels: routing each contact to the right place, holding callers in a queue, and connecting them to a human agent or an automated assistant. Connect delivers that whole stack as a managed service: telephony, IVR (Interactive Voice Response, the automated "press 1 for billing" menus), queue management, agent routing, real-time and historical analytics, and workforce management. You pay per minute or per message used, with no servers to run. For AI projects, Connect is the deployment platform that puts conversational AI in front of real customers on voice and chat channels.

> Rename notice: In April 2026 AWS renamed Amazon Connect to **Amazon Connect Customer** and made it the customer-service member of a new family of agentic AI solutions: Connect Customer, Connect Decisions (supply chain), Connect Talent (hiring), and Connect Health. This is a rename and expansion, not a discontinuation. Existing instances, contracts, reserved capacity, and APIs continue to work. Most documentation, the console, and the AWS CLI still use the name "Amazon Connect," so this page keeps that name where it matches what you will see in practice.

**New to contact centers and AWS?** A few prerequisite ideas make this page easier:

- **Speech recognition and synthesis** - turning spoken audio into text and back. See {{< relref "glossary/speech-to-text" >}} and {{< relref "glossary/text-to-speech" >}}.
- **Conversational AI agent** - software that understands a request and acts on it. See {{< relref "glossary/ai-agent" >}} and {{< relref "glossary/agentic-ai" >}}.
- **Knowledge base** - the curated content an AI assistant searches to answer questions. See {{< relref "glossary/knowledge-base" >}}.
- **Authentication** - verifying who a caller is before sharing account data. See {{< relref "glossary/authentication-and-authorization" >}}.

Official documentation: https://docs.aws.amazon.com/connect/  
Pricing: https://aws.amazon.com/connect/pricing/  
Service quotas: https://docs.aws.amazon.com/connect/latest/adminguide/amazon-connect-service-limits.html

## Core Concepts

**Instance** - A Connect deployment with its own phone numbers, agent accounts, queues, and configuration. New instances start with modest default quotas (for example 10 concurrent active calls and 500 concurrent active chats per instance) that you raise through AWS Service Quotas as your volume grows. Real contact centers running thousands of simultaneous calls do so on increased quotas, not the defaults.

**Contact Flow** - A visual workflow that defines how a customer interaction is handled. Contact flows control everything from the initial greeting through IVR menus, data lookups, queue placement, and agent connection. Flows are built in a drag-and-drop editor with blocks for playing prompts, getting customer input, invoking Lambda functions, and transferring to queues or agents.

**Queue** - A holding area for contacts waiting for an agent. Queues have routing profiles that determine which agents can handle contacts from that queue, and priority settings that control the order in which contacts are answered.

**Agent** - A human handler. Agents log into the Connect Contact Control Panel (CCP) to receive calls and chats. The CCP can be embedded in CRM applications using the Connect Streams API.

## AI Integration Points

**Amazon Lex** - Embeds conversational bots directly into contact flows. When a customer calls, a Lex bot can handle the entire interaction for simple requests (checking order status, making payments, scheduling appointments) or collect information before routing to a human agent with context. This reduces average handle time and deflects calls from the agent queue.

**Amazon Bedrock** - Connect integrates with Bedrock for generative AI capabilities. During a live interaction, Bedrock can generate response suggestions for agents based on the conversation context and knowledge base content. Post-interaction, Bedrock summarizes the conversation automatically, eliminating manual after-call work.

**Contact Lens** - An AI-powered analytics feature built into Connect. Contact Lens provides real-time and post-call transcription, sentiment analysis, issue detection, theme detection, and automated quality scoring. Transcription accuracy is not a single published figure: it depends on domain vocabulary, audio quality, and accent. Supervisors can monitor live calls and receive real-time alerts when sentiment drops or specific keywords are detected. Post-call analytics include full searchable transcripts, sentiment trends, and talk-time ratios. Contact Lens also offers generative AI post-contact summaries (delivered within seconds of a contact ending) and generative AI agent performance evaluations that draft answers to evaluation form questions for a manager to review.

**Amazon Q in Connect** - The generative AI assistant built into Connect. For agents, it surfaces relevant knowledge base articles, recommended responses, and step-by-step guides in real time during customer interactions, using the conversation context to suggest answers so agents do not search documentation manually. It also powers generative AI self-service: an automated assistant that resolves customer questions directly using your connected knowledge sources before a human is involved. Knowledge sources can include connected systems such as Salesforce and ServiceNow alongside company wikis, FAQs, and files.

## Common Automation Patterns

**Self-service with escalation** - Lex handles tier-1 queries. When the bot cannot resolve the issue, it transfers to an agent queue with all collected information (intent, slot values, conversation history) attached to the contact. The agent sees the full context without asking the customer to repeat information.

**Intelligent routing** - Lambda functions in the contact flow look up customer data (CRM, order system) and route based on context: premium customers go to a specialized queue, technical issues go to technical support, and billing questions go to billing. This reduces transfers and improves first-contact resolution.

**Post-contact automation** - Contact Lens generates a transcript and summary. A Lambda function processes the summary to create tickets in the issue tracking system, update CRM records, and trigger follow-up workflows based on detected issues.

## Analytics and Reporting

Connect provides built-in real-time and historical analytics dashboards. Key metrics include service level (percentage of contacts answered within a target time), average handle time, abandonment rate, and agent occupancy. These metrics can be exported to S3 for custom analytics in Athena or QuickSight.

Contact Lens adds AI-driven analytics: theme detection (identifying trending issues across contacts), sentiment trends, and conversational analytics that go beyond traditional contact center metrics.

## Pricing

Connect uses a pay-per-use model: you are charged for usage by channel, plus separate per-minute charges for telephony (the phone carrier connection). Voice is billed per voice minute, chat and SMS or third-party messaging per message, and email per message, with Contact Lens adding per-minute charges for real-time and post-call analytics and Amazon Q in Connect features charged separately. Rates vary by AWS Region and communication type, so confirm current numbers on the [pricing page](https://aws.amazon.com/connect/pricing/) before estimating cost. There are no upfront costs, seat licenses, or minimum commitments, which is the main contrast with traditional contact center platforms that require multi-year per-seat contracts.

## Best practices

AWS publishes contact-center-specific guidance built on the {{< relref "foundations/well-architected" >}} principles. The [Amazon Connect Well-Architected Lenses](https://github.com/aws-samples/amazon-connect-well-architected-lenses) provide a structured way to review a Connect deployment against AWS best practices for operations, reliability, security, and cost. For analytics design, see the [Amazon Connect Data Lake Best Practices whitepaper](https://docs.aws.amazon.com/whitepapers/latest/amazon-connect-data-lake-best-practices/amazon-connect-data-lake-best-practices.html). Practical starting points: enable Contact Lens only on the contacts that need it (it is billed per minute), use {{< relref "tools/amazon-lex" >}} for tier-1 deflection before routing to an agent, and pass collected context on every escalation so customers never repeat themselves.

## Sources

- [Amazon Connect documentation](https://docs.aws.amazon.com/connect/) - official AWS administrator and developer guides.
- [Amazon Connect pricing](https://aws.amazon.com/connect/pricing/) - current per-channel and per-feature rates.
- [Amazon Connect service quotas](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-connect-service-limits.html) - default and adjustable limits, including the 10 concurrent active calls and 500 concurrent active chats per-instance defaults.
- [Top announcements of What's Next with AWS 2026](https://aws.amazon.com/blogs/aws/top-announcements-of-the-whats-next-with-aws-2026/) - the rename to Amazon Connect Customer and the new Connect Decisions, Talent, and Health solutions.
- [Amazon Connect Voice ID end of support](https://docs.aws.amazon.com/connect/latest/adminguide/amazonconnect-voiceid-end-of-support.html) - Voice ID ended support on 20 May 2026.
- [Amazon Connect Well-Architected Lenses](https://github.com/aws-samples/amazon-connect-well-architected-lenses) - AWS sample custom lenses for reviewing a Connect deployment.
