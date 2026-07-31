---
title: "What is a Webhook?"
description: "A webhook is how services tell your app that something happened. Instead of constantly asking 'did anyone pay yet?', Stripe tells you the moment a payment succeeds."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, webhook, api, events, stripe, integration]
faqs:
  - question: "How is a webhook different from an API?"
    answer: "With a normal API, your app asks the service for information (pull). With a webhook, the service tells your app when something happens (push). You call APIs; webhooks call you."
  - question: "How do I test webhooks locally?"
    answer: "Use a tool like ngrok, localtunnel, or Stripe CLI. These create a public URL that tunnels to your localhost. The service sends the webhook to that URL, and it reaches your local server."
  - question: "What happens if my webhook endpoint is down?"
    answer: "Most services retry failed webhook deliveries—typically with exponential backoff over hours or days. Stripe, for example, retries up to 3 days. But you should build your system to handle missed webhooks gracefully."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A webhook is an HTTP request that a service sends to your server when something happens. Instead of your app constantly asking Stripe "did the payment go through yet?", Stripe sends a POST request to your server the moment the payment succeeds. Your server receives the event and acts on it.
{{< /quickanswer >}}

## The problem webhooks solve

Without webhooks, you have two bad options:

**Option 1: Polling**
Your app asks "any updates?" every few seconds:
```
Your app: "Any payments?"
Stripe: "Nope."
Your app: "How about now?"
Stripe: "Nope."
Your app: "Now?"
Stripe: "Yes, one payment!"
```

This is wasteful. You make thousands of requests for every one that matters.

**Option 2: Waiting**
User clicks "Pay" → Your app calls Stripe → Waits → Times out → User confused.

Some things take minutes or days (bank transfers, subscriptions, disputes). You can't keep a request open that long.

**Webhooks flip the model**: Stripe calls you when something happens. You don't ask; you listen.

## How webhooks work

1. You set up an endpoint on your server (like `POST /api/webhooks/stripe`)
2. You register that URL with the service (in Stripe's dashboard, for example)
3. When an event happens, the service sends an HTTP POST to your URL
4. Your server receives it, processes it, and returns 200 OK

```
Stripe                          Your Server
  │                                 │
  │  Payment succeeds               │
  │                                 │
  │ ──POST /api/webhooks/stripe──→ │
  │    { event: "payment.success",  │
  │      data: { amount: 4999 } }   │
  │                                 │
  │ ←─────── 200 OK ──────────────  │
  │                                 │
```

## A basic webhook endpoint

```javascript
// Express.js example
app.post('/api/webhooks/stripe', async (req, res) => {
  const event = req.body;
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      const payment = event.data.object;
      await grantAccessToUser(payment.customer);
      break;
    
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      await revokeAccess(subscription.customer);
      break;
  }
  
  // Always respond quickly
  res.status(200).send('OK');
});
```

## Verifying webhooks (important!)

Anyone can send POST requests to your endpoint. How do you know it's really from Stripe?

**Signature verification**: The service includes a signature in the headers, computed using a secret key. You verify it before trusting the payload.

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/webhooks/stripe', 
  express.raw({type: 'application/json'}), // Raw body for verification
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Event is verified, process it...
});
```

**Never skip verification.** Without it, anyone can pretend to be Stripe and grant themselves free access.

## Common webhook patterns

**Payment processing** (Stripe, Paddle, LemonSqueezy):
- `payment_intent.succeeded` → Grant access
- `invoice.payment_failed` → Send reminder email
- `customer.subscription.deleted` → Revoke access

**Authentication** (Clerk, Auth0):
- `user.created` → Set up user profile in your database
- `user.deleted` → Clean up user data

**CI/CD** (GitHub):
- `push` → Trigger deployment
- `pull_request.opened` → Run tests

**Communication** (Twilio, SendGrid):
- `message.delivered` → Update message status
- `email.opened` → Track engagement

## Testing webhooks locally

Your localhost isn't accessible from the internet. Services can't reach it. Solutions:

**ngrok**: Creates a public URL that tunnels to your local server
```bash
ngrok http 3000
# Gives you https://abc123.ngrok.io → localhost:3000
```

**Stripe CLI**: For Stripe specifically
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**localtunnel**: Open-source alternative to ngrok
```bash
lt --port 3000
```

## Making webhooks reliable

**Respond quickly**: Return 200 within a few seconds. Do heavy processing in the background.

```javascript
app.post('/api/webhooks/stripe', async (req, res) => {
  // Verify and acknowledge immediately
  res.status(200).send('OK');
  
  // Then process (or better: queue for background processing)
  await processEventInBackground(req.body);
});
```

**Handle duplicates**: Services may retry webhooks if they don't get a response. Your code should be idempotent—processing the same event twice shouldn't cause problems.

```javascript
// Track processed events
if (await alreadyProcessed(event.id)) {
  return; // Skip duplicate
}
await markAsProcessed(event.id);
await handleEvent(event);
```

**Log everything**: When a webhook fails, you need to debug it. Log the incoming payload and any errors.

**Set up a dead letter queue**: For events that fail processing, store them somewhere for manual review or retry.

## When webhooks fail

Most services retry with exponential backoff:
- First retry: 1 minute
- Second retry: 5 minutes
- Third retry: 30 minutes
- ...continuing for hours or days

If your endpoint is down for a long time, you might miss events. Solutions:
- Monitor your webhook endpoint uptime
- Build reconciliation: periodically fetch recent events to catch any missed webhooks
- Most services have dashboards showing failed deliveries

## Further reading

- [What is an API?](/basics/what-is-an-api/): The broader context of how services communicate
- [What is localhost?](/basics/what-is-localhost/): Why webhook testing needs tunneling
- [What is a server?](/basics/what-is-a-server/): Where webhooks arrive
