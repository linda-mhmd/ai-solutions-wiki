---
title: "Amazon Pinpoint - AI-Driven Customer Engagement"
description: "A comprehensive reference for Amazon Pinpoint: multi-channel messaging, audience segmentation, campaign analytics, and ML-powered engagement optimization."
date: 2026-03-28
categories: [Tools]
tags: [amazon-pinpoint, AWS, marketing, messaging, segmentation, engagement]
related:
  - tools/amazon-personalize
  - tools/amazon-connect
  - tools/aws-lambda
last_updated: 2026-05-30
---

Amazon Pinpoint is a multi-channel customer engagement service that handles email, SMS, push notifications, voice messages, and in-app messaging. It combines messaging delivery with audience segmentation, campaign management, and analytics. For AI projects, Pinpoint is the delivery mechanism for personalized communications: sending the right message to the right user at the right time, informed by ML models that predict engagement and optimize send timing.

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

**Integration with Amazon Personalize** - For recommendation-driven messaging, connect Personalize to generate per-user product recommendations and deliver them through Pinpoint. The pattern is: Personalize produces a list of recommended items for each user, a Lambda function formats the recommendations into message templates, and Pinpoint delivers the personalized messages.

## Event Streaming and Analytics

Pinpoint captures engagement events (message sent, delivered, opened, clicked, bounced, complained) and streams them to Kinesis Data Streams or Kinesis Data Firehose. This enables real-time analytics pipelines: stream events to S3 for batch analysis, to Redshift for BI dashboards, or to custom Lambda consumers for real-time reactions.

The built-in analytics dashboard shows campaign performance (delivery rate, open rate, click rate), transactional message metrics, and funnel analytics. For deeper analysis, export event data to Athena and run custom SQL queries.

## Transactional vs Campaign Messaging

**Campaign messaging** is audience-based: define a segment and send a message to all members. Use for marketing campaigns, product announcements, and re-engagement.

**Transactional messaging** is event-triggered: send a single message to a specific user in response to an action (order confirmation, password reset, appointment reminder). Transactional messages use the SendMessages API and are not subject to campaign frequency caps.

## Deliverability

Email deliverability is critical for engagement. Pinpoint provides deliverability dashboards that monitor inbox placement rates, bounce rates, and complaint rates across email providers. It supports DKIM, SPF, and DMARC authentication, dedicated IP addresses for volume senders, and automatic suppression list management for bounced and complained addresses.

## Pricing

Pinpoint charges per message sent, with rates varying by channel. Email is the cheapest per-message, followed by push notifications, SMS, and voice. There is a base monthly cost per project for targeting and analytics. For high-volume senders, negotiate committed use discounts. The event streaming to Kinesis is charged at standard Kinesis rates.
