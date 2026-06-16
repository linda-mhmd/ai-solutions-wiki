---
title: "Amazon Pinpoint - AI-Driven Customer Engagement"
description: "Amazon Pinpoint: multi-channel messaging and engagement. Closed to new customers; support ends 30 October 2026. Migrate to Connect, SES, End User Messaging."
date: 2026-03-28
categories: [Tools]
tags: [amazon-pinpoint, AWS, marketing, messaging, segmentation, engagement, "aws-service"]
related:
  - tools/amazon-personalize
  - tools/amazon-connect
  - tools/aws-lambda
layer: applications
provider: aws
pricing_model: payg
maturity: production
status: deprecated
status_detail: "AWS is ending support for Amazon Pinpoint effective 30 October 2026. The service stopped accepting new customers on 20 May 2025; existing accounts can keep using it until end of support. Messaging channels (SMS, MMS, push, WhatsApp, text to voice) were renamed AWS End User Messaging in Q3 2024 and continue. AWS recommends migrating engagement features to Amazon Connect, email to Amazon SES, and event collection to Amazon Kinesis."
status_source: "https://docs.aws.amazon.com/pinpoint/latest/userguide/migrate.html"
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Pinpoint is a multi-channel customer engagement service that handles email, SMS, push notifications, voice messages, and in-app messaging. It combines messaging delivery with audience segmentation, campaign management, and analytics. For AI projects, Pinpoint is the delivery mechanism for personalized communications: sending the right message to the right user at the right time, informed by ML models that predict engagement and optimize send timing.

> Status: deprecated. AWS is ending support for Amazon Pinpoint effective 30 October 2026, and the service has not accepted new customers since 20 May 2025. Existing accounts can keep using engagement features (segments, campaigns, journeys, analytics, email) until that date, after which the Pinpoint console and resources become inaccessible. The messaging channels (SMS, MMS, push, WhatsApp, text to voice) were renamed AWS End User Messaging in Q3 2024 and continue with no API changes. AWS recommends migrating engagement features to Amazon Connect (outbound campaigns and Customer Profiles), email to Amazon Simple Email Service (SES), and event collection to Amazon Kinesis. If you are starting a new project, build on those services rather than Pinpoint. See the official [Amazon Pinpoint end of support](https://docs.aws.amazon.com/pinpoint/latest/userguide/migrate.html) guide. This page is kept for reference and migration context.

Plain-language foundations: a "channel" is just a way a message reaches a person (an email inbox, a text message, an app push). A "segment" is a filtered list of recipients. A "campaign" or "journey" is an automated plan for which messages go out, to whom, and when. Underneath, this is event-driven messaging: your app records what users do, and rules or ML models decide what to send next. If these ideas are new, start with {{< relref "glossary/webhooks" >}}, {{< relref "glossary/kinesis" >}} (the event stream Pinpoint feeds), and {{< relref "glossary/etl" >}} for moving engagement data into analytics.

Official documentation: https://docs.aws.amazon.com/pinpoint/

## Core Concepts

**Project** - The top-level container (also called an Application). A project groups channels, segments, campaigns, and analytics. Typically, each application or product has its own Pinpoint project.

**Channel** - A messaging channel (email, SMS, push, voice, or in-app). Each channel is configured independently with sender identities (email addresses, phone numbers, push certificates). Channels can be enabled or disabled per project.

**Segment** - A group of users targeted for messaging. Segments can be static (imported from a CSV) or dynamic (defined by attribute filters that update automatically as user data changes). Dynamic segments use conditions like "users who have not logged in for 30 days" or "users in the premium tier who opened the app this week."

**Campaign** - A scheduled or triggered message sent to a segment. Campaigns define the message template, delivery schedule, and A/B testing configuration. Standard campaigns run on a schedule. Event-based campaigns trigger when a user performs a specific action (or fails to).

**Journey** - A multi-step, multi-channel workflow that responds to user behavior over time. A journey might send a welcome email on day 1, a push notification on day 3 if the user has not completed onboarding, and an SMS on day 7 with a special offer. Journeys branch based on user actions, creating personalized paths.

## ML-Powered Features

**Predictive engagement** - Pinpoint's built-in ML models predict which users are likely to open emails, click links, or convert. You can use these predictions to segment audiences: target only users with high predicted engagement to improve campaign metrics and reduce fatigue for unlikely-to-engage users.

**Send time optimization** - ML models determine the optimal send time for each individual user based on their historical engagement patterns. Instead of sending a campaign at 9 AM to everyone, Pinpoint sends to each user at the time they are most likely to engage.

**Integration with Amazon Personalize** - For recommendation-driven messaging, connect Personalize to generate per-user product recommendations and deliver them through Pinpoint. The pattern is: Personalize produces a list of recommended items for each user, a Lambda function formats the recommendations into message templates, and Pinpoint delivers the personalized messages. Because Pinpoint engagement is being retired, build this pattern on the successor services for new work: keep Personalize for the recommendations, and deliver via Amazon Connect outbound campaigns or AWS End User Messaging and Amazon SES.

## Event Streaming and Analytics

Pinpoint captures engagement events (message sent, delivered, opened, clicked, bounced, complained) and streams them to Kinesis Data Streams or Kinesis Data Firehose. This enables real-time analytics pipelines: stream events to S3 for batch analysis, to Redshift for BI dashboards, or to custom Lambda consumers for real-time reactions.

The built-in analytics dashboard shows campaign performance (delivery rate, open rate, click rate), transactional message metrics, and funnel analytics. For deeper analysis, export event data to Athena and run custom SQL queries.

## Transactional vs Campaign Messaging

**Campaign messaging** is audience-based: define a segment and send a message to all members. Use for marketing campaigns, product announcements, and re-engagement.

**Transactional messaging** is event-triggered: send a single message to a specific user in response to an action (order confirmation, password reset, appointment reminder). Transactional messages use the SendMessages API and are not subject to campaign frequency caps.

## Deliverability

Email deliverability is critical for engagement. Pinpoint provides deliverability dashboards that monitor inbox placement rates, bounce rates, and complaint rates across email providers. It supports DKIM, SPF, and DMARC authentication, dedicated IP addresses for volume senders, and automatic suppression list management for bounced and complained addresses.

## Migration and successor services

Because Amazon Pinpoint reaches end of support on 30 October 2026, plan a migration for any production use. AWS maps each capability to a continuing service:

- **Engagement (segments, campaigns, journeys, analytics)** moves to Amazon Connect: outbound campaigns for campaigns and journeys, and Customer Profiles for endpoints and segments. Endpoints can be modeled as Customer Profiles, and templates carry over because both use the Handlebars rendering engine (the attribute placeholders change form).
- **Email sending and the deliverability dashboard** move to Amazon Simple Email Service (SES). AWS states it will offer comparable deliverability functionality in SES by the end-of-support date.
- **Messaging channels (SMS, MMS, push, WhatsApp, text to voice, OTP, phone number validation)** are unaffected: they were renamed AWS End User Messaging in Q3 2024, and the related APIs, CLI, and IAM policies do not change.
- **Event collection and mobile analytics** move to Amazon Kinesis. Apps using the Amplify SDK can stream events directly to Kinesis, then feed Customer Profiles or trigger Connect campaigns.

A few engagement features have no direct equivalent yet in Amazon Connect, including in-app messaging and push notifications inside campaigns (push is available via journeys using a Lambda action). Confirm feature parity against the official migration guide before committing.

## Pricing

Amazon Pinpoint historically charged per message sent, with rates varying by channel, plus monthly charges for the targeting and analytics layer (monthly targeted audience and message-targeting fees); event streaming to Kinesis is billed at standard Kinesis rates. Because the service is being retired, do not plan new spend against Pinpoint pricing. Cost going forward is set by the successor services: AWS End User Messaging (per-message SMS, MMS, push, voice, WhatsApp), Amazon SES (per-email plus data), Amazon Connect (usage-based campaigns and Customer Profiles), and Amazon Kinesis (per-shard or per-throughput). Check each service's current pricing page for exact rates, which vary by AWS Region and destination.

## Best practices

For new architectures, design directly on the successor services and treat Pinpoint as legacy. General guidance from the AWS Well-Architected Framework applies: protect recipient data and sender identities under the [Security pillar](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html), and keep messaging pipelines fault tolerant under the [Reliability pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html). For deliverability, authenticate email with DKIM, SPF, and DMARC, honor suppression lists, and monitor bounce and complaint rates, the same disciplines now provided in Amazon SES. See the wiki's {{< relref "foundations/well-architected" >}} overview for the pillars in plain language.

## Sources

- [Amazon Pinpoint end of support (official migration guide)](https://docs.aws.amazon.com/pinpoint/latest/userguide/migrate.html)
- [Amazon Pinpoint FAQs](https://aws.amazon.com/pinpoint/faqs/)
- [Amazon Pinpoint User Guide](https://docs.aws.amazon.com/pinpoint/latest/userguide/welcome.html)
- [AWS End User Messaging (successor for messaging channels)](https://aws.amazon.com/end-user-messaging/)
- [Amazon Connect outbound campaigns (engagement migration target)](https://aws.amazon.com/connect/outbound/)
- [Amazon Simple Email Service (email migration target)](https://aws.amazon.com/ses/)
