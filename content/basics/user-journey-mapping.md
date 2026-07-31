---
title: "User Journey Mapping"
description: "Understand how users move through your product before building it. Journey maps reveal pain points, opportunities, and the full experience beyond individual screens."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, ux, product, planning, discovery, user-research]
faqs:
  - question: "Is this just for big companies with UX teams?"
    answer: "No. A journey map can be a 5-minute sketch on paper. Solo builders benefit most—you're making all the decisions, so understanding the full journey prevents blind spots."
  - question: "How do I know what users actually experience?"
    answer: "Talk to them. Even 3-5 conversations reveal patterns. If you can't access users yet, walk through the journey yourself, or ask someone unfamiliar with your product to try it while you watch."
  - question: "When should I create a journey map?"
    answer: "Before building a new feature or flow. When something feels broken but you can't pinpoint why. When user feedback is confusing. Anytime you need to see the forest, not just the trees."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A user journey map shows the steps someone takes to accomplish a goal with your product—from first awareness through completion and beyond. It includes what they do, think, and feel at each stage. This reveals pain points and opportunities that screen-by-screen thinking misses. Even a quick sketch helps you build something that fits how users actually behave.
{{< /quickanswer >}}

## Why map journeys

**Screens are fragments. Journeys are experiences.**

When you design screen by screen, you optimize locally. The sign-up form is great, the dashboard is clear, the settings are organized. But users experience the whole flow:

- How did they find you?
- What did they expect?
- Where did they get confused?
- What happened after they finished?

Journey mapping forces you to see what users see: a continuous experience, not a collection of features.

---

## Anatomy of a journey map

### Basic structure

```
┌──────────────────────────────────────────────────────────────────┐
│ GOAL: [What the user is trying to accomplish]                    │
├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┤
│ STAGE 1  │ STAGE 2  │ STAGE 3  │ STAGE 4  │ STAGE 5  │ STAGE 6  │
│ Awareness│ Consider │ Sign Up  │ First Use│ Regular  │ Advocacy │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ ACTIONS  │          │          │          │          │          │
│ What they│          │          │          │          │          │
│ do       │          │          │          │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ THOUGHTS │          │          │          │          │          │
│ What they│          │          │          │          │          │
│ think    │          │          │          │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ FEELINGS │          │          │          │          │          │
│ Emotions │   😐     │    😊    │    😤    │    😊    │    🎉    │
│          │          │          │          │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ PAIN     │          │          │          │          │          │
│ POINTS   │          │          │          │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ OPPORT-  │          │          │          │          │          │
│ UNITIES  │          │          │          │          │          │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```

### The five layers

1. **Stages**: Major phases of the journey
2. **Actions**: What users physically do
3. **Thoughts**: What they're thinking
4. **Feelings**: Emotional state (frustrated, delighted, confused)
5. **Opportunities**: Where you can improve

---

## Creating a journey map

### Step 1: Define the scope

**Who** is the user? (Be specific—not "users" but "new freelancer looking for invoicing software")

**What goal** are they trying to accomplish? (Not "use the app" but "send their first invoice")

**Where** does the journey start and end? (From "realizes they need invoicing" to "client pays the invoice")

### Step 2: List the stages

Break the journey into major phases:

```
Example: Invoicing app

1. Problem recognition - "I need to invoice clients properly"
2. Research - Looking at options
3. Sign up - Creating account
4. Setup - Adding business details
5. First invoice - Creating and sending
6. Getting paid - Tracking payment
7. Ongoing use - Regular invoicing
```

### Step 3: Fill in each stage

For each stage, document:

**Actions** - What do they do?
```
Stage: First invoice
- Click "New Invoice"
- Add client details
- Add line items
- Preview invoice
- Click "Send"
```

**Thoughts** - What are they thinking?
```
"Will this look professional?"
"Did I include everything?"
"What if I made a mistake?"
```

**Feelings** - What's their emotional state?
```
Nervous (first time)
Focused (filling details)
Relieved (after sending)
```

### Step 4: Identify pain points

Where do users struggle?

```
Pain points for "First invoice":
- Unclear where to find "New Invoice" button
- Had to re-enter client details they already added
- No preview before sending
- Anxious about mistakes with no "undo"
```

### Step 5: Find opportunities

What could make each stage better?

```
Opportunities:
- Prominent "Create Invoice" on dashboard
- Auto-fill from saved clients
- Live preview while editing
- Draft state with easy editing
- "Send test to myself" option
```

---

## Quick journey map (5-minute version)

When you don't have time for a full map:

```
Goal: User wants to ____________

Steps:
1. ____________ → Feeling: ___
2. ____________ → Feeling: ___
3. ____________ → Feeling: ___
4. ____________ → Feeling: ___
5. ____________ → Feeling: ___

Biggest pain point: ____________
Biggest opportunity: ____________
```

**Example:**

```
Goal: User wants to share a file with a teammate

Steps:
1. Find the file → Fine
2. Click share → Confused (where is it?)
3. Enter email → Frustrated (have to type full email)
4. Set permissions → Overwhelmed (too many options)
5. Send → Anxious (did it work?)

Biggest pain point: Permission options are confusing
Biggest opportunity: Default to sensible permissions, simplify UI
```

---

## Journey maps for AI development

Journey maps improve AI prompts by providing context:

### Without journey context
```
"Build a share dialog"
```

### With journey context
```
"Build a share dialog for users who:
- Just finished creating a document
- Want to quickly share with one teammate
- Are often confused by permission options
- Need confirmation that sharing worked

Requirements:
- Prominent share button on document view
- Autocomplete for team member names
- Simple permissions: 'Can edit' or 'Can view' (default: edit)
- Clear success message with 'Copy link' option"
```

The journey context produces better results because AI understands:
- Who the user is
- What they just did
- What they're trying to accomplish
- What problems to avoid

---

## Common journey stages

### For SaaS products

1. **Awareness** - Learns product exists
2. **Consideration** - Evaluates options
3. **Sign-up** - Creates account
4. **Onboarding** - First-time setup
5. **First value** - Accomplishes initial goal
6. **Habit** - Regular use
7. **Expansion** - Uses more features
8. **Advocacy** - Recommends to others

### For e-commerce

1. **Browse** - Looking around
2. **Search** - Finding specific item
3. **Evaluate** - Reading details, reviews
4. **Add to cart** - Committing to consider
5. **Checkout** - Purchasing
6. **Delivery** - Waiting, tracking
7. **Use** - Using the product
8. **Review/Return** - Post-purchase

### For content/media

1. **Discover** - Finds content
2. **Sample** - Previews/reads beginning
3. **Consume** - Full engagement
4. **React** - Likes, shares, comments
5. **Return** - Comes back for more
6. **Subscribe** - Commits to ongoing relationship

---

## What to do with your map

### Prioritize improvements

Not all pain points are equal. Prioritize by:

- **Impact**: How much does this hurt the experience?
- **Frequency**: How many users hit this?
- **Effort**: How hard is it to fix?

### Share with AI

When building features, share relevant journey context:

```
"The user is in the [STAGE] of their journey.
They just [PREVIOUS ACTION].
They're feeling [EMOTION].
They want to [GOAL].
Common pain points here: [LIST]."
```

### Test your assumptions

Journey maps are hypotheses. Validate by:
- Watching users (screen sharing, session recordings)
- Talking to users (what was confusing? what was easy?)
- Metrics (where do users drop off?)

---

## Journey mapping mistakes

### 1. Mapping what you want, not what is
Your ideal flow isn't the user's actual experience.

**Fix**: Base maps on research (conversations, observations, data), not assumptions.

### 2. Too much detail
A journey map with 47 steps isn't useful.

**Fix**: Keep to 5-8 major stages. Detail only the areas you're focusing on.

### 3. Ignoring emotions
Actions alone miss the experience.

**Fix**: Always include how users feel. Frustrated stages need the most attention.

### 4. One and done
Journey maps should evolve as you learn more.

**Fix**: Revisit after user research, feature launches, and metric reviews.

### 5. Mapping happy path only
Real journeys include errors, confusion, and giving up.

**Fix**: Map what happens when things go wrong.

---

## The honest take

**Journey maps are thinking tools.** The goal isn't a pretty artifact—it's understanding.

**5 minutes beats nothing.** A quick sketch on paper reveals blind spots. Don't skip it because you don't have time for a "proper" map.

**Talk to users.** The best journey maps come from watching and listening, not imagining.

**Use it to prompt AI.** Journey context makes AI-generated features fit the actual user experience, not an imagined one.

## Further reading

- [Wireframing and prototyping](/basics/wireframing-and-prototyping/): From journey to screens
- [Product discovery techniques](/basics/product-discovery-techniques/): Other ways to understand users
- [UI/UX design principles](/basics/ui-ux-design-principles/): Making each stage feel right
- [How to delegate to AI effectively](/basics/how-to-delegate-to-ai-effectively/): Using context in prompts
