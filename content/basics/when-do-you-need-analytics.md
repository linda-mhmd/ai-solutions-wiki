---
title: "When Do You Need Analytics?"
description: "Logs, metrics, analytics, observability—when does each become necessary, what do they cost, and how do you know you're ready for proper tooling?"
date: 2026-07-30
level: 3
categories: [Basics]
tags: [analytics, logs, metrics, observability, saas, founder, data]
faqs:
  - question: "What's the difference between logs, metrics, and analytics?"
    answer: "Logs are detailed records of events ('user 123 logged in at 10:42'). Metrics are aggregated numbers over time ('100 logins in the last hour'). Analytics answer business questions ('which features do users engage with most?'). You need all three eventually, but at different stages."
  - question: "Can I just use console.log forever?"
    answer: "Until your first real debugging session in production with actual users, yes. After that, no. Console logs disappear when containers restart, aren't searchable, and don't correlate across services. You'll realize you need proper logging the first time something breaks and you can't figure out why."
  - question: "How much should I budget for observability?"
    answer: "Early stage: $0-50/month (free tiers). Growth stage: $100-300/month. Scale: $500-2000/month. It's typically 5-15% of your infrastructure budget. The cost of NOT having it—hours of debugging, missed issues—usually exceeds the tooling cost."
last_updated: 2026-07-30
---

{{< quickanswer >}}
You need basic logging when you have users. You need error tracking when bugs affect real people. You need product analytics when you're making decisions about what to build. You need full observability when your system is complex enough that problems aren't obvious. Each layer adds cost and complexity, but also saves time and prevents disasters.
{{< /quickanswer >}}

## The observability journey

| Stage | What you need | Why | Monthly cost |
|-------|--------------|-----|--------------|
| Building | Console.log, platform logs | Good enough for local dev | $0 |
| First users | Error tracking (Sentry) | Know when things break | $0-30 |
| Growing | Log aggregation + basic metrics | Debug production issues | $30-100 |
| Scaling | Full observability stack | Complex systems need visibility | $200-500 |
| Enterprise | Custom analytics + compliance | Business intelligence + audit | $500+ |

## Level 0: Console.log and platform logs

**When**: You're building, testing, or have no real users yet.

**What you have**:
- `console.log()` in your code
- Platform-provided logs (Vercel, Railway show request logs)
- Browser dev tools

**What you can do**:
- See what your code is doing locally
- Check if deployments succeeded
- Debug simple issues

**What you can't do**:
- Search historical logs
- Correlate events across requests
- Know when errors happen (unless you're watching)
- Understand patterns over time

**Cost**: $0

**This is fine until**: Real users are affected by bugs you can't reproduce locally.

## Level 1: Error tracking

**When**: You have users and bugs affect them.

**What to add**: Sentry, Bugsnag, or Rollbar

**What you get**:
- Automatic error capture with stack traces
- Alerts when new errors occur
- Error grouping (same bug = one issue)
- User context (who was affected)
- Release tracking (which deploy caused it)

**Real example**: User reports "the app is broken." With Sentry, you see: "TypeError in checkout.js line 42, user_id 789, Chrome on Windows, started after yesterday's deploy." Without it: "idk, works for me."

**Cost**: $0-30/month (Sentry free tier is generous)

**You need this when**:
- Real users encounter bugs
- You can't reproduce issues locally
- You need to prioritize which bugs to fix

```javascript
// Sentry setup (one time)
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "your-dsn",
  tracesSampleRate: 0.1,
});

// Errors are automatically captured
// You can also capture manually:
Sentry.captureMessage("Something unexpected happened");
```

## Level 2: Log aggregation

**When**: Console.log isn't cutting it and you need to search logs.

**What to add**: Logtail (Axiom), Papertrail, Datadog Logs, or Loki

**What you get**:
- Centralized logs from all services
- Search and filter ("show me all errors from the payment service")
- Retention (logs don't disappear when containers restart)
- Structured logging (JSON logs with queryable fields)

**Real example**: User reports slow checkout. You search logs for their user_id, see the request took 8 seconds because the payment API timed out, trace it to a specific third-party endpoint.

**Cost**: $20-100/month depending on volume

**You need this when**:
- You have multiple services or containers
- Logs disappear before you can read them
- You need to trace requests across systems
- Debugging takes hours because you can't find relevant logs

```javascript
// Structured logging example
logger.info({
  event: 'checkout_started',
  user_id: user.id,
  cart_total: cart.total,
  item_count: cart.items.length,
  timestamp: new Date().toISOString()
});

// Now searchable: "show all checkout_started where cart_total > 100"
```

## Level 3: Metrics and dashboards

**When**: You need to understand patterns, not just individual events.

**What to add**: Prometheus + Grafana, Datadog, or CloudWatch

**What you get**:
- Time-series data (requests per second over time)
- Dashboards showing system health
- Alerting on thresholds ("notify me if error rate > 5%")
- Capacity planning data

**Metrics to track**:
- **Request rate**: How many requests/second
- **Error rate**: What percentage fail
- **Latency**: p50, p95, p99 response times
- **Saturation**: CPU, memory, disk usage

**Real example**: Dashboard shows request latency spiking every day at 3pm. You investigate, find a cron job running heavy queries. Move it to 3am.

**Cost**: $50-200/month

**You need this when**:
- You need to know if the system is healthy without checking manually
- Performance matters and you need to track it
- You're scaling and need to know when to add capacity
- On-call engineers need quick system overview

## Level 4: Product analytics

**When**: You're making decisions about what to build based on user behavior.

**What to add**: Mixpanel, Amplitude, PostHog, or Plausible

**What you get**:
- User behavior tracking (which features are used)
- Funnels (where do users drop off)
- Retention analysis (do users come back)
- A/B testing infrastructure

**This is different from logs**:
- Logs: "User 123 clicked button at 10:42"
- Analytics: "30% of users who start onboarding complete it, and users who complete onboarding have 3x retention"

**Real example**: You think Feature X is popular. Analytics show 3% of users have ever used it. You think onboarding is fine. Funnel shows 60% drop-off at step 3. Now you know where to focus.

**Cost**: $0-100/month (PostHog free tier, Mixpanel free tier)

**You need this when**:
- You're making product decisions and want data, not intuition
- You need to prove value to investors
- You're optimizing conversion funnels
- You're running A/B tests

```javascript
// PostHog example
posthog.capture('checkout_completed', {
  total: order.total,
  items: order.items.length,
  payment_method: order.paymentMethod
});

// Later: "what's the average order value by payment method?"
```

## Level 5: Full observability

**When**: Your system is complex enough that you need to trace requests across services.

**What to add**: Distributed tracing (Jaeger, Datadog APM, Honeycomb)

**What you get**:
- End-to-end request tracing
- Service dependency maps
- Performance bottleneck identification
- Cross-service correlation

**Real example**: Checkout is slow. Trace shows: frontend → API (50ms) → auth service (20ms) → inventory service (3000ms!) → payment service. Found the bottleneck instantly.

**Cost**: $200-1000/month

**You need this when**:
- You have multiple services/microservices
- Debugging requires correlating events across systems
- "It's slow" and you don't know where
- You're responsible for SLAs

## The cost of NOT having observability

It's easy to see observability as a cost. Consider the alternative costs:

| Situation | Without observability | With observability |
|-----------|----------------------|-------------------|
| Bug in production | Hours of debugging, angry users | Alert + fix in minutes |
| Performance regression | Users complain, you don't know why | Dashboard shows immediately |
| Capacity planning | Guess, over-provision or under-provision | Data shows actual usage |
| Security incident | Might not even know it happened | Audit logs, alerts |
| Investor questions | "We think users like feature X" | "Data shows X has 40% DAU engagement" |

**Real cost calculation**: Engineer costs $100/hour. Spending 10 hours debugging something that proper logging would solve in 30 minutes = $1000 opportunity cost. Monthly observability tools cost $100. The math is clear.

## When logs become analytics

Early stage, your "analytics" might just be log queries:

```sql
-- "How many users signed up this week?"
SELECT COUNT(*) FROM logs 
WHERE event = 'user_created' 
AND timestamp > NOW() - INTERVAL '7 days';
```

This works until:
- Query volume slows down your database
- You need real-time dashboards
- You need cohort analysis, funnels, retention
- Non-engineers need to access insights

That's when you graduate to proper analytics tools.

## The build vs buy decision

### Build in-house when:
- You have very specific requirements
- You have engineering capacity
- Data volumes are massive (>1TB/day of logs)
- Compliance requires data to stay in your infrastructure

### Buy (SaaS tools) when:
- You're optimizing for speed
- You want best-in-class UI/UX
- You don't want to maintain the infrastructure
- Cost is reasonable relative to engineering time

**Most startups should buy.** The DIY observability stack (Prometheus + Grafana + Loki + Jaeger + storage) is a full-time job to maintain.

## Recommended stack by stage

### Just starting ($0-50/month)
- **Errors**: Sentry free tier
- **Logs**: Platform logs (Vercel/Railway built-in)
- **Analytics**: PostHog free tier or Plausible
- **Uptime**: Betterstack or UptimeRobot free tier

### Growing ($100-300/month)
- **Errors**: Sentry Team
- **Logs**: Logtail/Axiom
- **Metrics**: Simple dashboards in Grafana Cloud free tier
- **Analytics**: PostHog or Mixpanel
- **Uptime**: Betterstack

### Scaling ($500-1500/month)
- **All-in-one**: Datadog or Grafana Cloud (logs + metrics + traces)
- **Analytics**: Mixpanel or Amplitude
- **Error tracking**: Sentry Business
- **Custom dashboards**: Connected to your analytics

## Data retention: the hidden cost

Every observability tool charges based on data volume and retention. Costs explode when you:
- Log everything at DEBUG level
- Keep logs for a year "just in case"
- Track every click instead of meaningful events
- Don't sample high-volume events

**Sensible defaults**:
- Application logs: 30 days
- Error tracking: 90 days
- Metrics: 15 months (to compare year-over-year)
- Analytics events: Depends on your analysis needs
- Audit logs: Per compliance requirements (often 7 years)

## Further reading

- [Storage costs as you scale](/basics/storage-costs-as-you-scale/): The bigger cost picture
- [Types of storage explained](/basics/types-of-storage-explained/): Where all this data lives
- [What are backups?](/basics/what-are-backups/): Protecting your analytics data
- [When do I need multiple servers?](/basics/when-do-i-need-multiple-servers/): When infrastructure complexity demands observability
