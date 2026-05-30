---
title: "AI Meeting Prep - Automated Attendee Research and Briefing Docs"
description: "Use AI to research meeting attendees and generate pre-meeting briefing documents with context, talking points, and relationship history."
date: 2026-03-28
categories: [Ideas]
tags: [meetings, productivity, research, automation, daily-ai-spark]
last_updated: 2026-05-30
---

You have a meeting in an hour with someone you have not spoken to in six months. You spend ten minutes scanning their LinkedIn, checking your CRM for recent interactions, and skimming the last email thread. Multiply this by five meetings a day and you lose nearly an hour to context-gathering.

## The AI Approach

An LLM with access to your calendar, CRM, email archive, and public data sources can generate a briefing doc for each upcoming meeting. The briefing includes attendee backgrounds, recent interactions, open action items from previous meetings, and relevant news about their company or industry.

## Three-Step Build

1. **Calendar trigger** - Pull tomorrow's meetings each evening. Extract attendee names and email addresses.
2. **Context gathering** - For each attendee, query your CRM for recent touchpoints, search your email for the last conversation thread, and optionally pull their public LinkedIn profile or recent company news.
3. **Briefing generation** - Feed the gathered context to an LLM with a prompt that produces a structured briefing: who they are, what you last discussed, what they might care about now, and suggested talking points.

## Where It Breaks

Access to email and CRM data requires careful permission scoping. The AI may surface outdated or irrelevant context if your CRM data is messy. For first-time meetings with no prior interaction history, the briefing is limited to public information, which may feel generic.

## The Production Path

Integrate with your calendar and CRM APIs. Add a feedback mechanism so users can flag unhelpful briefings. Over time, the system learns which types of context are most valued for different meeting types. Deliver briefings via Slack or email 30 minutes before the meeting.
