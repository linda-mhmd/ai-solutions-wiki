---
title: "Metrics That Matter"
description: "Not all metrics are created equal. Learn to distinguish vanity metrics from actionable ones, and measure what actually drives your product forward."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, product, analytics, metrics, data, decision-making]
faqs:
  - question: "What should I measure first?"
    answer: "Start with one metric tied to your product's core value. If you help people send invoices, measure 'invoices sent.' If you help people learn, measure 'lessons completed.' One clear metric beats ten fuzzy ones."
  - question: "How do I avoid analysis paralysis?"
    answer: "Pick 3-5 metrics maximum. Define them before you build. Review weekly, but only act on clear signals. Perfect data doesn't exist—make decisions with good-enough data."
  - question: "What tools should I use?"
    answer: "Start simple: Plausible or Fathom for privacy-friendly analytics, Mixpanel or Amplitude for product analytics, or even a spreadsheet for manual tracking. Tools matter less than the habit of measuring."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Vanity metrics make you feel good but don't drive decisions (page views, total signups). Actionable metrics tell you what to do (conversion rate, activation rate, churn). The best metrics are tied to your product's core value—if users get value, the metric goes up. Measure few things well rather than everything poorly.
{{< /quickanswer >}}

## Vanity metrics vs actionable metrics

### Vanity metrics

Numbers that look good but don't inform decisions:

| Metric | Why it's vanity |
|--------|-----------------|
| Total users | Grows forever, doesn't show health |
| Page views | More isn't always better |
| Social followers | Doesn't mean they use your product |
| Time on site | Could mean engaged or confused |
| Downloads | Doesn't mean activated or retained |

### Actionable metrics

Numbers that tell you what to do:

| Metric | Why it's actionable |
|--------|---------------------|
| Activation rate | Are new users getting value? |
| Retention rate | Are they coming back? |
| Conversion rate | Are they taking the action that matters? |
| NPS by cohort | Is satisfaction improving over time? |
| Revenue per user | Is the business sustainable? |

### The test

Ask: "If this metric changes, what would we do differently?"

- **Page views up 20%**: Shrug. So what?
- **Activation rate up 20%**: Celebrate. More users are getting value.
- **Activation rate down 20%**: Investigate. Something's broken.

---

## The metrics that actually matter

### 1. Activation rate

**Definition**: Percentage of new users who reach the "aha moment"

**Example**: For a note-taking app, activation might be "created first note"

```
Activation rate = Users who activated / Total signups × 100

Week 1: 340 signups, 170 created a note = 50% activation
Week 2: 380 signups, 228 created a note = 60% activation ✓
```

**Why it matters**: Users who don't activate never become customers. This is often your biggest leverage point.

### 2. Retention rate

**Definition**: Percentage of users who come back after a time period

**Common timeframes**:
- Day 1, Day 7, Day 30 retention
- Week over week retention
- Month over month retention

```
Day 7 retention = Users active on day 7 / Users who signed up 7 days ago × 100

Cohort A: 100 signups, 25 active day 7 = 25% retention
Cohort B: 100 signups, 35 active day 7 = 35% retention ✓
```

**Why it matters**: Acquiring users you don't retain is a leaky bucket. Fix retention before scaling acquisition.

### 3. Conversion rate

**Definition**: Percentage of users who take a desired action

**Examples**:
- Free to paid conversion
- Visitor to signup conversion
- Trial to customer conversion

```
Free → Paid conversion = Paid users / Free users who could convert × 100

Month 1: 1000 free users, 30 converted = 3%
Month 2: 1200 free users, 48 converted = 4% ✓
```

**Why it matters**: Small improvements in conversion have large revenue impact.

### 4. Churn rate

**Definition**: Percentage of users who stop using the product

```
Monthly churn = Users who left / Users at start of month × 100

Month 1: 500 users, 25 left = 5% churn
Month 2: 520 users, 20 left = 3.8% churn ✓
```

**Why it matters**: High churn means you're filling a leaky bucket. Reducing churn compounds over time.

### 5. Core action frequency

**Definition**: How often users do the thing your product is for

**Examples**:
- Messages sent per week (chat app)
- Invoices created per month (invoicing app)
- Workouts logged per week (fitness app)

**Why it matters**: This is the purest measure of whether your product delivers value.

---

## Leading vs lagging indicators

### Lagging indicators

Measure outcomes that already happened:
- Revenue
- Churn
- Monthly active users

**Problem**: By the time they move, it's too late to change what caused them.

### Leading indicators

Predict future outcomes:
- Activation rate (predicts retention)
- Feature adoption (predicts engagement)
- Support tickets (predicts churn)
- Onboarding completion (predicts activation)

**Advantage**: You can act before the outcome happens.

### The relationship

```
Leading indicator → Lagging indicator

Activation rate → Retention → Revenue
Onboarding completion → Activation → Retention
Feature adoption → Engagement → Retention
Support tickets ↑ → Churn ↑
```

Focus on leading indicators—they're your steering wheel.

---

## Choosing your metrics

### The One Metric That Matters (OMTM)

At any given time, focus on one primary metric:

| Stage | OMTM candidate |
|-------|----------------|
| Pre-launch | Waitlist signups |
| Launch | Activation rate |
| Early growth | Retention rate |
| Growth | Conversion rate |
| Scale | Revenue or LTV |

Other metrics still matter, but one guides decisions.

### The metric stack

Build a hierarchy:

```
Level 1: North Star (the one that matters most)
         └── Revenue or Active Users

Level 2: Health Metrics (3-5 max)
         ├── Activation rate
         ├── Retention rate
         ├── Conversion rate
         └── Core action frequency

Level 3: Diagnostic Metrics (as needed)
         ├── Funnel steps
         ├── Feature usage
         └── Error rates
```

### Defining metrics clearly

Bad: "Measure engagement"
Good: "Weekly Active Users = users who completed at least one core action in the past 7 days"

For each metric, document:
- **Name**: What you call it
- **Definition**: Exactly how it's calculated
- **Data source**: Where the numbers come from
- **Owner**: Who's responsible for it
- **Cadence**: How often you review it

---

## Metric anti-patterns

### The vanity trap

Celebrating metrics that don't matter:
- "We hit 10,000 signups!" (but only 500 are active)
- "Page views are up 50%!" (but conversions are down)

**Fix**: Ask "so what?" until you reach a metric that drives decisions.

### The measurement overload

Tracking 50 metrics and reviewing none:
- Dashboards no one looks at
- Alerts no one responds to

**Fix**: Fewer metrics, reviewed more often. Weekly review of 5 beats monthly review of 50.

### The local maximum

Optimizing a metric at the expense of the whole:
- Click-through rate up, but conversions down
- Signups up, but quality down

**Fix**: Watch related metrics together. Don't optimize one in isolation.

### The wrong comparison

Comparing to competitors instead of yourself:
- "Industry average is 5%, we're at 4%"
- Ignores that your situation is different

**Fix**: Measure your own improvement over time. Yesterday is your competitor.

### The survivorship bias

Only measuring users who stayed:
- "Active users love feature X"
- Ignores users who left because of feature X

**Fix**: Study churned users and failed conversions, not just successes.

---

## Metrics for vibecoders

### Start simple

You don't need Mixpanel on day one. Start with:

| What | How |
|------|-----|
| Basic analytics | Plausible, Fathom, or Vercel Analytics |
| Core actions | Simple event tracking or database queries |
| User feedback | Direct conversations, support inbox |
| Error tracking | Sentry or LogRocket |

### The minimum viable dashboard

Track these from day one:

1. **New users this week**: Are you growing?
2. **Activated users this week**: Are they getting value?
3. **Active users this week**: Are they returning?
4. **Errors this week**: Is anything broken?

Four numbers. Review weekly. That's enough to start.

### When to add more

Add metrics when you have questions:
- "Why are users dropping off?" → Add funnel metrics
- "Which features matter?" → Add feature usage
- "Who are our best users?" → Add cohort analysis

Don't add metrics "just in case."

---

## Setting targets

### Base on your data

Don't guess or use "industry benchmarks."

1. Measure your current state
2. Set a modest improvement target
3. Work toward it
4. Set the next target

**Example**:
- Current activation: 35%
- Target: 45% in 8 weeks
- Achieved: 42%
- New target: 50% in 8 weeks

### The 10% rule

If you don't know what's achievable, aim for 10% improvement:
- 30% → 33%
- $1000 MRR → $1100 MRR

Small, consistent improvements compound.

### When targets don't matter

Early on, you're learning what's possible:
- Don't stress about hitting arbitrary numbers
- Focus on understanding what moves the metric
- Targets matter more when you're optimizing

---

## The honest take

**Most vibecoders don't measure enough.** You're flying blind without basic metrics. Set up simple tracking before you launch.

**Some vibecoders measure too much.** Dashboards feel productive but aren't. Five metrics reviewed weekly beats fifty ignored.

**Metrics don't replace judgment.** Data informs decisions, it doesn't make them. Sometimes the right call contradicts the numbers.

**The best metric is one you'll actually check.** A weekly glance at a simple dashboard beats a monthly deep-dive you never do.

## Further reading

- [Feedback loops and iteration](/basics/feedback-loops-and-iteration/): Using metrics to learn
- [When do you need analytics?](/basics/when-do-you-need-analytics/): Logs vs metrics vs analytics
- [Prioritization frameworks](/basics/prioritization-frameworks/): Using data to decide what to build
- [Technical decision making](/basics/technical-decision-making/): Data-informed architecture choices
