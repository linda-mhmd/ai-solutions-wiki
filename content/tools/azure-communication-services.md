---
title: "Azure Communication Services - Cloud Communication APIs"
description: "Azure Communication Services provides APIs and SDKs for adding voice calling, video calling, SMS, email, and chat capabilities to applications."
date: 2026-03-28
categories: [Tools]
tags: [azure, communication, voice, video, sms, chat]
related:
  - tools/amazon-pinpoint
  - tools/amazon-connect
last_updated: 2026-05-30
---

Azure Communication Services (ACS) is a fully managed cloud communication platform that provides APIs and SDKs for embedding voice calling, video calling, SMS messaging, email, and real-time chat into custom applications. It uses the same reliable and secure infrastructure that powers Microsoft Teams, enabling developers to build communication experiences at enterprise scale. In AI solution architectures, ACS provides the communication channels through which AI-powered interactions reach end users -- delivering AI-generated notifications via SMS or email, enabling voice-based AI assistants through calling APIs, and supporting real-time chat interfaces for conversational AI applications.

The platform provides several communication primitives. Voice and video calling APIs enable PSTN (public telephone network) calling, VoIP calling between application users, and group calls with up to hundreds of participants. The calling SDK supports browser-based (WebRTC), native mobile (iOS, Android), and desktop applications. SMS APIs provide one-to-one and broadcast messaging with delivery reporting and opt-out management. Email APIs deliver transactional and bulk email with custom domain support, DKIM authentication, and engagement tracking. Chat APIs provide persistent, threaded messaging with typing indicators, read receipts, and participant management for in-app communication scenarios.

A key differentiator is Teams interoperability. ACS applications can join Microsoft Teams meetings and calls, enabling custom applications to participate in the Teams communication ecosystem. This allows scenarios such as a customer-facing web application that connects users directly to a Teams-based contact center, or an AI bot that joins Teams meetings to provide real-time transcription and summarization. ACS integrates with Azure AI Services for real-time call transcription, translation, and sentiment analysis, and with Azure Event Grid for event-driven communication workflows such as sending automated messages based on system events.

Official documentation: https://learn.microsoft.com/en-us/azure/communication-services/

## Key Capabilities

- **Voice and Video Calling** - PSTN, VoIP, and group calling APIs with WebRTC browser support, native mobile SDKs, and call recording
- **Teams Interoperability** - Custom applications can join and participate in Microsoft Teams meetings and calls, bridging external users into the Teams ecosystem
- **Multi-Channel Messaging** - SMS with delivery reporting, email with custom domains, and persistent chat with threading, typing indicators, and read receipts
- **Call Automation** - Server-side APIs for building IVR systems, call routing, and AI-powered voice bots with real-time transcription and DTMF recognition

## AWS Equivalent

Azure Communication Services combines capabilities found in Amazon Pinpoint (SMS, email messaging) and Amazon Connect (voice calling, contact center). ACS provides a unified communication platform with calling, messaging, and chat in a single service, while AWS separates these into Pinpoint for messaging campaigns and Connect for contact center voice. ACS's Teams interoperability is a unique differentiator with no AWS equivalent.

## Origins and History

Azure Communication Services was announced at Ignite 2020 in September 2020 and reached general availability on March 29, 2021. The initial release included chat, calling (VoIP), and SMS capabilities. Teams interoperability for joining Teams meetings was added in GA in 2021. Email capabilities launched in GA in March 2023. Call Automation APIs for server-side call control and AI integration reached GA in June 2023. Advanced call recording, real-time transcription integration, and rooms (managed calling spaces) were progressively added throughout 2023-2024.

## Sources

1. Microsoft Learn. "What is Azure Communication Services?" https://learn.microsoft.com/en-us/azure/communication-services/overview
2. Microsoft Azure Blog. "Azure Communication Services is now generally available." March 2021. https://azure.microsoft.com/en-us/blog/azure-communication-services-is-now-generally-available/
