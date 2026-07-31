---
title: "What is an API Key?"
description: "An API key is a password for your code to access services like Claude, Stripe, or OpenAI. If you leak it, someone else can run up your bill or access your data."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, api, security, secrets, authentication]
faqs:
  - question: "I accidentally pushed my API key to GitHub. What do I do?"
    answer: "Revoke it immediately. Go to your provider's dashboard (OpenAI, Anthropic, Stripe, whatever) and delete that key. Generate a new one. The old key is compromised the moment it hits a public repo—bots scan GitHub constantly for leaked keys."
  - question: "Can I use the same API key for my local development and production app?"
    answer: "You can, but you shouldn't. Use separate keys for development and production. That way if your dev key leaks, your production app keeps running. Most providers let you create multiple keys for free."
  - question: "Why doesn't my API key work?"
    answer: "Common causes: you copied it with extra whitespace, you're using the wrong key for the wrong service, the key was revoked or expired, you've hit your usage limit, or you didn't enable the API in your provider's dashboard."
last_updated: 2026-07-30
---

{{< quickanswer >}}
An API key is a secret string that identifies your application to a service. It's like a password, but for code. When your app calls the OpenAI API, it sends the API key to prove it's allowed to use the service. If someone steals your key, they can use the service as you and you pay the bill.
{{< /quickanswer >}}

## Why API keys exist

When you sign up for OpenAI, Anthropic, Stripe, or any API service, you get an API key. It looks something like this:

```
sk-proj-abc123xyz789...
```

This key does two things:
1. **Authentication**: Proves your app is allowed to use the service
2. **Billing**: Ties usage to your account so you get charged

Every time your code makes a request, it includes this key. The service checks the key, confirms it's valid, and processes your request.

## The cardinal rule: never put API keys in your code

This is the single most common security mistake beginners make:

```javascript
// WRONG - never do this
const openai = new OpenAI({
  apiKey: "sk-proj-abc123xyz789..."
});
```

Why is this bad? Because code gets shared. You push to GitHub, you show a friend, you paste into a Stack Overflow question. The moment that key is visible anywhere, it's compromised.

Bots scan GitHub constantly for leaked API keys. People have woken up to $10,000 AWS bills because they committed a key to a public repo and crypto miners found it overnight.

## Where to put API keys instead

Use **environment variables**. These are values stored outside your code that your code can read at runtime.

```javascript
// CORRECT - key comes from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
```

The actual key lives in a `.env` file that you never commit:

```
# .env file - add this file to .gitignore
OPENAI_API_KEY=sk-proj-abc123xyz789...
```

Your `.gitignore` file should include:
```
.env
.env.local
.env*.local
```

Now the key exists on your computer but not in your code repository. When you deploy, you set the environment variable in your hosting platform's dashboard (Vercel, Railway, AWS, etc.).

See [What is an environment variable?](/basics/what-is-an-environment-variable/) for the full explanation.

## What happens if your key leaks

**Scenario 1: AI API key (OpenAI, Anthropic)**
Someone uses your key to make API calls. You get billed. They might run up thousands of dollars in usage before you notice. Most providers now have spending limits you can set—do this immediately.

**Scenario 2: Payment API key (Stripe)**
This is worse. Depending on which key leaked (publishable vs secret), they might be able to view your customer data, issue refunds, or access sensitive financial information.

**Scenario 3: Cloud provider key (AWS, GCP)**
This is catastrophic. They can spin up servers, access your databases, delete your infrastructure, and run up massive bills. AWS horror stories of $50,000+ bills from leaked keys are real.

## What to do if you leak a key

1. **Revoke immediately**: Go to the provider's dashboard and delete/revoke the key
2. **Generate a new key**: Create a fresh one
3. **Update your app**: Replace the old key with the new one everywhere it's used
4. **Check for damage**: Review your usage logs for unauthorized activity
5. **Set up alerts**: Most providers can notify you of unusual usage patterns

## API key hygiene

**Set spending limits**: Most AI providers let you cap your monthly spend. Set it to something you can afford to lose.

**Use separate keys for dev and prod**: If your dev key leaks, production keeps running.

**Rotate keys periodically**: Some teams rotate keys monthly as standard practice.

**Never share keys over Slack/email**: Use a password manager or secrets manager.

**Check before you commit**: Use tools like `git-secrets` or `gitleaks` to scan for accidentally committed secrets.

## Further reading

- [What is an environment variable?](/basics/what-is-an-environment-variable/): Where to put your keys safely
- [What is an API?](/basics/what-is-an-api/): What you're authenticating to
- [Security and Auth basics](/basics/what-is-security-and-auth/): The broader picture of keeping things safe
