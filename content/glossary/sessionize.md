---
title: "Sessionize"
description: "What Sessionize is, how it manages conference call-for-papers, speaker profiles, and schedule generation, and how its API enables integration with event websites."
date: 2026-03-28
categories: [Glossary]
tags: [sessionize, conferences, events, CFP, speaker-management, API]
related:
  - glossary/api
last_updated: 2026-05-30
---

Sessionize is a software-as-a-service platform for managing the content lifecycle of conferences and events. It handles call-for-papers (CFP) submissions, speaker profile management, session review and selection, and schedule generation, providing both organizer tools and a public API for embedding session and speaker data into event websites.

## Origins and History

Sessionize was founded in 2017 and is headquartered in Zagreb, Croatia. The founding team built the platform from their own experience as conference organizers, creating Sessionize to streamline the process of managing session submissions and event schedules. Development began in 2016 (their social media presence dates to September 2016), with the public platform launching in 2017.

Since launch, Sessionize has grown to serve thousands of events across more than 120 countries and has processed over half a million session submissions. A notable adoption milestone came in 2023 when the Cloud Native Computing Foundation (CNCF) migrated from SMApply to Sessionize for their event CFP process, with KubeCon + CloudNativeCon North America 2023 being the first CNCF event on the platform.

## How It Works

**Call for Papers** -- Event organizers create a CFP with configurable fields: session title, description, level, track, tags, and custom questions. Speakers submit through a public submission form, and organizers review submissions in a dashboard with rating, tagging, and filtering tools. Multiple reviewers can score submissions independently, with aggregate scores guiding selection.

**Speaker profiles** -- Speakers maintain a single Sessionize profile across all events. The profile includes biography, photo, social links, and a history of speaking engagements. When a speaker submits to a new event, their profile data is pre-populated, reducing friction for repeat speakers.

**Schedule management** -- After sessions are selected, organizers build schedules using a drag-and-drop interface with room and time slot management. The platform handles conflict detection (a speaker scheduled in two rooms at the same time) and provides public-facing schedule views.

**API** -- Sessionize provides a read-only JSON API for each event that exposes sessions, speakers, rooms, and schedule data. This API enables event websites to pull session and speaker information directly into their own pages rather than linking out to Sessionize. The API supports multiple response formats: a flat list of all sessions, sessions grouped by time slot or room, and speaker data with linked sessions. Third-party tools and community-built integrations consume this API for custom schedule displays, mobile event apps, and digital signage.

## Business Model

Sessionize uses a per-event pricing model rather than subscriptions. First-time users can test the full platform without cost or feature limitations. Community-driven conferences -- events organized by volunteers and offered free of charge -- receive free Sessionize licenses, making the platform particularly popular in the developer community ecosystem.

## Integration Patterns

Event websites commonly use the Sessionize API in two ways. **Static site integration** fetches session and speaker data at build time, generating HTML pages from the API response. This is common for Hugo, Jekyll, and Eleventy-based conference sites. **Client-side integration** fetches data at page load using JavaScript, useful for single-page applications or when real-time schedule updates are needed.

The API's JSON structure maps naturally to common event website patterns: speaker cards with photo, name, and bio; session listings with title, abstract, and speaker attribution; and grid schedules organized by room and time slot.

## Sources

1. Sessionize. "Getting started with Sessionize." [https://sessionize.com/playbook/getting-started](https://sessionize.com/playbook/getting-started)
2. CNCF. "Introducing Sessionize: a new CFP platform for CNCF events." April 26, 2023. [https://www.cncf.io/blog/2023/04/26/introducing-sessionize-a-new-cfp-platform-for-cncf-events/](https://www.cncf.io/blog/2023/04/26/introducing-sessionize-a-new-cfp-platform-for-cncf-events/)
3. Sessionize. "Third-party tools built on Sessionize API." [https://sessionize.com/playbook/third-party-tools-built-on-sessionize-api](https://sessionize.com/playbook/third-party-tools-built-on-sessionize-api)
4. Sessionize Official Website. [https://sessionize.com](https://sessionize.com)
