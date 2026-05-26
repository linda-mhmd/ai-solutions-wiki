---
title: "What is an API?"
description: "An API is a contract that defines how two pieces of software talk to each other. Almost every modern app is built by composing APIs."
date: 2026-05-24
level: 3
categories: [Basics]
tags: [beginner, api, rest, json, integration]
youtube_id: "s7wmiS2mSXY"
youtube_title: "What is an API? (Plain English)"
youtube_channel: "MuleSoft"
docs: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction"
docs_label: "Introduction to Web APIs, MDN"
faqs:
  - question: "What is a REST API?"
    answer: "REST (Representational State Transfer) is a set of conventions for designing web APIs using HTTP. A REST API uses standard HTTP methods (GET to read, POST to create, PUT/PATCH to update, DELETE to remove) and URLs that represent resources (/users, /orders/42). Responses are typically JSON. REST is not a strict standard, it is a style. If an API uses HTTP and returns JSON, most people will call it a REST API even if it does not follow every REST principle precisely."
  - question: "What is an API key and how do I keep it safe?"
    answer: "An API key is a secret string (like a password) that identifies your application to an external service. It lets the provider track your usage, apply rate limits, and charge you. Keep API keys in a .env file that is listed in .gitignore, never commit them to a repository. In production, store them in your hosting platform's environment variable settings (Vercel, Railway, AWS all have this). If you accidentally expose a key, rotate it immediately from the provider's dashboard."
  - question: "What is the difference between an API and a webhook?"
    answer: "With an API, your code asks for data when it needs it (your code initiates the request). With a webhook, the external service sends data to your code when something happens (the service initiates the request). You call an API to check if a payment succeeded. Stripe calls your webhook URL when a payment succeeds. Webhooks are 'push' (event-driven); APIs are 'pull' (request-driven). Most services offer both."
---

{{< quickanswer >}}
An API (Application Programming Interface) is a defined way for one piece of software to ask another piece of software to do something. When a weather app shows you today's forecast, it called a weather service's API. When you pay with Stripe, your app called Stripe's API. APIs are how modern software is composed from smaller, specialised parts.
{{< /quickanswer >}}

## The restaurant analogy

The clearest way to explain an API: imagine a restaurant.

- You are the **client** (your app)
- The kitchen is the **server** (the service with the data or capability)
- The **menu and waiter** are the API, the defined set of requests you can make and the format of what will come back

You do not need to know how the kitchen works. You just need to know the menu (what requests are possible) and what will arrive (the response format). You order in the required format, and the kitchen responds predictably.

An API defines: what you can ask for, how to ask for it, what you will get back, and what errors look like. [More: Introduction to web APIs, MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)

<figure class="bz-figure">
<img src="/img/basics/diagram-api-contract.png" alt="API as a contract between client and server: the client sends a structured request, the API defines the rules, the server processes and returns a structured response">
<figcaption>The API is the contract layer between client and server. It hides implementation complexity and defines a stable interface both sides agree on.</figcaption>
</figure>

## What an API request looks like

Most web APIs communicate using HTTP. A request has:

- A **method**: what kind of action (`GET` = read, `POST` = create, `PUT`/`PATCH` = update, `DELETE` = remove)
- A **URL**: what resource you are working with (`/users/42`, `/orders`, `/forecasts`)
- **Headers**: metadata including authentication (`Authorization: Bearer your-api-key`)
- A **body**: data you are sending (for POST and PUT requests)

<div class="bz-diagram">
<div class="bz-diagram-label">HTTP request → response cycle</div>
<div class="bz-diagram-body">
<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Your code</span>
    <span class="bz-flow-step-name">API call</span>
    <span class="bz-flow-step-desc">fetch(), axios, requests: your language's HTTP library</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">HTTP Request</span>
    <span class="bz-flow-step-name">GET /weather</span>
    <span class="bz-flow-step-desc">Method + URL + headers + optional body, sent over the internet</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">API server</span>
    <span class="bz-flow-step-name">Auth → logic → DB</span>
    <span class="bz-flow-step-desc">Validates key, queries database, formats response</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">HTTP Response</span>
    <span class="bz-flow-step-name">200 OK + JSON</span>
    <span class="bz-flow-step-desc">Status code + structured data your code can read</span>
  </div>
</div>
</div>
</div>

A request to a weather API:

```http
GET https://api.openweathermap.org/data/2.5/weather?q=Vienna&units=metric&appid=your-api-key
```

The response comes back as **JSON** (JavaScript Object Notation), a structured text format that almost every language can read:

```json
{
  "name": "Vienna",
  "main": {
    "temp": 22.4,
    "humidity": 58
  },
  "weather": [
    { "description": "scattered clouds" }
  ]
}
```

Your code reads this JSON and displays or processes the data however you need.

## HTTP status codes

The response always includes a **status code** that tells you what happened:

| Code | Meaning |
|---|---|
| `200 OK` | Success, the request worked |
| `201 Created` | Success, a new resource was created |
| `400 Bad Request` | Your request was malformed |
| `401 Unauthorized` | Missing or invalid API key |
| `403 Forbidden` | Authenticated but not allowed to do this |
| `404 Not Found` | The resource does not exist |
| `429 Too Many Requests` | You hit the rate limit, slow down |
| `500 Internal Server Error` | Something broke on the server side |

Learning to read status codes makes debugging much faster. A `401` means check your API key. A `429` means add a delay between requests. A `500` means the problem is on the API side, not yours.

## REST vs GraphQL

**REST** is the dominant API style. Different URLs represent different resources (`/users`, `/products/42`). The method (GET/POST/PUT/DELETE) tells the server what to do with that resource. Responses contain everything in that resource, you ask for a user and you get everything about them.

**GraphQL** (developed by Facebook, open-sourced 2015) takes a different approach. You send a single query describing exactly what fields you want:

```graphql
query {
  user(id: "42") {
    name
    email
    orders {
      id
      total
    }
  }
}
```

GraphQL gives you precisely what you ask for, nothing more. Useful when you have many different clients (mobile, web, desktop) that need different data shapes. More complex to implement than REST.

For beginners: assume REST. Most APIs you will use are REST. [More: REST, MDN](https://developer.mozilla.org/en-US/docs/Glossary/REST)

## API keys and authentication

Most commercial APIs require an **API key**, a secret string that identifies who is making the request. Without it, the API rejects your request (`401 Unauthorized`).

**Critical rule: never put API keys in code that is committed to a public repository.** Store them in:
- A `.env` file locally (listed in `.gitignore`)
- Your hosting platform's environment variable settings
- A secrets manager in production (AWS Secrets Manager, 1Password, etc.)

If you accidentally expose a key, go to the provider's dashboard and rotate (regenerate) it immediately.

Beyond API keys, some APIs use **OAuth**, a protocol that lets users grant your app access to their data without sharing their password (this is how "Log in with Google" works). [More: OAuth 2.0, oauth.net](https://oauth.net/2/)

## Rate limits

APIs almost always have **rate limits**, a maximum number of requests per minute or day. Exceeding them returns a `429` error. Rate limits exist to prevent abuse and manage infrastructure costs.

If you are building something that calls an API frequently (polling for updates, batch processing data), design with rate limits in mind: add delays, cache responses, and batch requests where possible.

## Webhooks: the reverse of an API call

Instead of your code polling an API ("has anything changed?"), a **webhook** is a URL on your server that an external service calls when something happens.

You want to know when a Stripe payment succeeds. Instead of calling Stripe's API every minute to check, you register a webhook URL: `POST https://your-app.com/webhooks/stripe`. When a payment completes, Stripe sends a POST request to that URL with the payment data.

Webhooks are event-driven and more efficient than polling for real-time data.

## APIs you already interact with

| Service | API capability |
|---|---|
| **Claude / OpenAI** | Generate text, answer questions, analyse images |
| **Stripe** | Process payments, manage subscriptions |
| **Twilio** | Send SMS, make phone calls |
| **SendGrid / Resend** | Send transactional email |
| **Google Maps** | Geocoding, routing, map rendering |
| **GitHub** | Manage repositories, issues, deployments |
| **Supabase** | Database, authentication, storage |
| **OpenWeatherMap** | Weather data (free tier available) |

Modern app development is largely: connect the right APIs, handle their responses, add your own logic in between.

## How to explore and test APIs

Before writing code, test an API manually:

- **[Postman](https://www.postman.com/)**, desktop app for making API requests, inspecting responses, saving collections
- **[Insomnia](https://insomnia.rest/)**, open-source alternative to Postman
- **[HTTPie](https://httpie.io/)**, command-line HTTP client
- **cURL**, built into every terminal: `curl -H "Authorization: Bearer key" https://api.example.com/data`

Many APIs publish interactive documentation (Swagger / OpenAPI) where you can make test requests directly in the browser. [Public APIs collection](https://github.com/public-apis/public-apis) lists hundreds of free APIs to experiment with.

## Further reading

- [Introduction to Web APIs, MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
- [HTTP methods, MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [HTTP status codes, MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Postman Learning Centre](https://learning.postman.com/docs/getting-started/overview/), from API basics to testing and automation
- [Public APIs, community-maintained list](https://github.com/public-apis/public-apis), hundreds of free APIs to try
- [REST API Tutorial](https://restfulapi.net/), deeper guide to REST conventions
- [OAuth 2.0 simplified](https://oauth.net/2/), how login-with-X authentication works

## What's next

Next: [What is a Database?](/basics/what-is-a-database/), where the data that APIs serve actually lives.
