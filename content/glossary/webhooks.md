---
title: "Webhooks"
description: "Webhooks are user-defined HTTP callbacks that deliver real-time event notifications between web applications, a term coined by Jeff Lindsay in 2007."
date: 2026-03-28
categories: [Glossary]
tags: [webhooks, http, callbacks, event-driven, api, integration]
related:
  - glossary/event-driven-architecture
  - glossary/api
  - glossary/pub-sub
last_updated: 2026-05-30
---

A webhook is a user-defined HTTP callback. When a specific event occurs in a source application, it sends an HTTP POST request to a URL configured by the user, delivering event data to a receiving application in real time. Webhooks invert the typical API polling pattern: instead of the consumer repeatedly asking "has anything changed?", the producer pushes notifications when something changes. The term was coined by Jeff Lindsay in 2007.

## Origins and History

In 2007, Jeff Lindsay published a blog post titled "Web hooks to revolutionize the web," in which he introduced the concept and coined the term [1]. Lindsay defined webhooks as "essentially user defined callbacks made with HTTP POST," where a service allows users to specify a URL and a set of events, and the service posts event data to that URL when those events occur. Lindsay derived the name from the programming concept of a "hook," a point in a system where custom behavior can be injected.

Lindsay, described at the time as a platform engineer, was motivated by the desire to make web applications extensible without requiring the application developer to anticipate every possible integration. By exposing events as outbound HTTP requests, any application could subscribe to events from any other application, enabling a decentralized integration model that did not require a central message broker or shared infrastructure.

Lindsay also identified three primary use cases for webhooks beyond simple notification: integration between different web applications, modification of web application behavior through external processing, and chaining of services into workflows where the output of one webhook triggers actions in another system.

## How Webhooks Work

The webhook pattern involves three steps. First, the consumer registers a callback URL with the producer, typically through the producer's settings UI or API, specifying which events should trigger notifications. Second, when a matching event occurs, the producer constructs an HTTP POST request containing event data (usually as a JSON payload) and sends it to the registered URL. Third, the consumer's server receives the request, parses the payload, and takes appropriate action.

Authentication is handled through various mechanisms. HMAC signatures are the most common: the producer signs the payload with a shared secret, and the consumer verifies the signature before processing. Some implementations use bearer tokens in headers or include a verification challenge during registration.

Reliability concerns include delivery failures (the consumer's server is down), duplicate deliveries (the producer retries after a timeout but the consumer already processed the event), and ordering (events may arrive out of order). Robust webhook implementations include retry logic with exponential backoff on the producer side, and idempotent processing with event deduplication on the consumer side.

## Adoption and Impact

Webhooks became the dominant mechanism for real-time event delivery from web services. GitHub uses webhooks to notify CI/CD systems of code pushes. Stripe uses them to notify merchants of payment events. Slack uses them for incoming message integrations. Twilio, Shopify, SendGrid, and virtually every major SaaS platform provides webhook support.

The simplicity of the pattern, requiring only an HTTP endpoint on the consumer side, made webhooks far more accessible than alternative approaches like WebSockets (which require persistent connections) or message queues (which require shared infrastructure). A webhook consumer can be a simple serverless function, a minimal web server, or even a third-party automation tool like Zapier or IFTTT.

## Limitations

Webhooks are fire-and-forget from the producer's perspective. There is no built-in mechanism for the consumer to request missed events, apply backpressure, or negotiate delivery rates. For high-throughput event streams, message queues or event streaming platforms like Apache Kafka are more appropriate. Webhooks are best suited for moderate-frequency events where real-time notification is valuable but guaranteed exactly-once delivery is not strictly required.

## Sources

1. Lindsay, J. (2007). "Web hooks to revolutionize the web." Blog post. Referenced in Webhook - Wikipedia. [https://en.wikipedia.org/wiki/Webhook](https://en.wikipedia.org/wiki/Webhook)
2. GitHub Webhooks Documentation. [https://docs.github.com/en/webhooks](https://docs.github.com/en/webhooks)
3. Stripe Webhooks Documentation. [https://stripe.com/docs/webhooks](https://stripe.com/docs/webhooks)
