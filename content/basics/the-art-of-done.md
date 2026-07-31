---
title: "The Art of Done"
description: "Good enough vs perfect. When to ship, when to polish, and when to stop. Finishing things is a skill—and perfectionism is often procrastination."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, productivity, shipping, decisions, perfectionism]
faqs:
  - question: "How do I know when something is 'done enough'?"
    answer: "Ask: Can users accomplish the core task? Is it better than what they have now? Will I learn more by shipping than by continuing to build? If yes to all three, ship it. You can always improve later."
  - question: "Won't shipping unpolished work hurt my reputation?"
    answer: "Shipping something broken hurts reputation. Shipping something simple but functional usually doesn't. Users care about solving their problem more than pixel-perfect design. And 'polished' features that never ship help no one."
  - question: "How do I stop perfectionism from blocking me?"
    answer: "Set deadlines and honor them. Define 'done' criteria upfront. Ask 'what's the worst that happens if I ship this?' Usually the answer is: very little. The fear is bigger than the risk."
last_updated: 2026-07-30
---

{{< quickanswer >}}
"Done" is a decision, not a state. Perfect doesn't exist—there's always another improvement. The skill is knowing when additional polish stops delivering value. Ship when it's good enough to be useful, learn from real usage, and iterate. Unshipped features help no one. Perfect is the enemy of done.
{{< /quickanswer >}}

## The completion problem

Why finishing is hard:
- You can always see ways to improve
- Shipping feels final (what if it's wrong?)
- Working on something is safer than being judged on it
- There's always "one more thing"
- Perfect feels possible, even though it isn't

The result: half-finished projects, never-shipped features, and improvement treadmills that never end.

## Good enough is a feature

"Good enough" doesn't mean bad. It means:
- Solves the core problem
- Works reliably
- Is better than nothing
- Can be improved later

### The 80/20 of polish

The first 80% of quality takes 20% of the effort.
The last 20% of quality takes 80% of the effort.

```
Quality
  ▲
  │                    ╭──────── Perfect (impossible)
  │                 ╭──┤
  │              ╭──┤  │ ← Diminishing returns
  │           ╭──┤  │
  │        ╭──┤  │
  │     ╭──┤  │
  │  ╭──┤  │
  ├──┤  │
  └──┴──┴──┴──┴──┴──┴──┴──►
     Effort invested
```

Know where you are on this curve. Early on, small effort yields big quality gains. Later, massive effort yields minimal improvement.

**Ship when you're past the knee of the curve**, not at the asymptote.

## Defining done

Before starting, define what "done" means:

### Functional done
- Core feature works
- Main use cases handled
- No critical bugs

### Quality done
- Code is reasonably clean
- UI is usable (not necessarily beautiful)
- Edge cases documented (not necessarily handled)

### Shippable done
- Deployed to production
- Users can access it
- Basic monitoring in place

**Define which level you need** before starting. Most things need "shippable done," not "perfect."

## The MVP mindset

Minimum Viable Product isn't about building crap. It's about:
- **Minimum**: Smallest version that tests your hypothesis
- **Viable**: Actually works, actually useful
- **Product**: Delivers value, not just a prototype

### MVP done criteria

Ask:
1. Does it solve the core problem?
2. Can a user accomplish the main task?
3. Is it stable enough that users can rely on it?
4. Will I learn something by shipping it?

If yes to all four, ship it.

### What's not in the MVP

- Every edge case handled
- Beautiful design
- Performance optimization
- Complete feature set
- Comprehensive documentation

These come later, informed by real usage.

## When to stop polishing

### The diminishing returns test

"If I spend 4 more hours on this, will users notice?"

If the answer is "maybe" or "not really," stop.

### The opportunity cost test

"What else could I do with the time I'd spend polishing this?"

If the alternative is more valuable, stop.

### The learning test

"Will I learn more by shipping or by building?"

If shipping teaches you more, stop building.

### The "it's done" test

"If someone asked me to show them my product, would I be embarrassed?"

If no, it's done enough. Ship it.

## Stopping points

Set explicit stopping points before you start:

### Time-boxed

"I will spend 2 days on this feature, then ship whatever I have."

### Criteria-based

"I will ship when: users can create, view, and delete items. Edit comes later."

### Scope-defined

"This version does X. Future versions do Y and Z."

Honor these stopping points. Resist the urge to extend.

## Perfectionism as procrastination

Perfectionism feels productive. It isn't.

**Signs you're over-polishing:**
- Redoing work that was already acceptable
- Adding features nobody asked for
- Delaying launch for "one more thing"
- Feeling like it's never quite ready
- Comparing to products with 10x your resources

**The fear underneath:**
- Fear of judgment
- Fear of failure
- Fear of commitment
- Fear of the unknown

Shipping feels vulnerable. Polishing feels safe. But safety is an illusion—unshipped work helps no one.

## "We'll fix it later" (and actually do)

"Ship now, fix later" has a bad reputation because people don't fix later.

**Make it real:**
- Write down what you're deferring
- Create tickets/issues for it
- Schedule time to address it
- Track deferred items and actually revisit

"Fix later" is valid when you actually fix later.

## Done, not perfect: examples

### Authentication

**Perfect version:**
- Email/password, social login, magic links
- 2FA, backup codes
- Passwordless options
- Custom session durations
- Audit logs

**Done version:**
- Email/password login
- Password reset
- Secure session handling

Ship the done version. Add the rest based on demand.

### Dashboard

**Perfect version:**
- Real-time updates
- Customizable widgets
- Multiple visualizations
- Export to PDF
- Mobile app

**Done version:**
- Key metrics displayed
- Refreshes on page load
- Works on mobile browser

Ship the done version. Users will tell you what they actually need.

### Documentation

**Perfect version:**
- Complete API reference
- Video tutorials
- Interactive examples
- Translations

**Done version:**
- README with setup instructions
- Common use cases documented
- Error messages that point to solutions

Ship the done version. Improve based on user questions.

## Techniques for finishing

### Work in public

Tell someone your ship date. Public commitment creates accountability.

### Ship incrementally

Small, frequent releases beat big, infrequent ones. Each release is practice in finishing.

### Define "one more thing" limits

Allow yourself one "one more thing" per feature. Then stop.

### Celebrate shipping

Finished something? Acknowledge it. Train yourself to associate shipping with reward.

### Review your graveyard

Look at unfinished projects. What would it have taken to finish them? Less than you think, usually. Don't add to the graveyard.

## The iteration cycle

Shipping isn't the end. It's the beginning of learning.

```
Build minimum → Ship → Learn → Improve → Ship → Learn → Improve...
```

You can't improve what doesn't exist. Ship to enter the learning loop.

## Quick "is it done?" checklist

- [ ] Core feature works
- [ ] User can accomplish the main task
- [ ] No critical bugs or crashes
- [ ] It's deployed/accessible
- [ ] I'd be okay showing this to someone

All checked? Ship it.

## Further reading

- [How to slice work effectively](/basics/how-to-slice-work-effectively/): Define smaller "done" targets
- [Agile for solo builders](/basics/agile-for-solo-builders/): Regular shipping cadence
- [When to say no](/basics/when-to-say-no/): Scope control
- [Prioritization frameworks](/basics/prioritization-frameworks/): Decide what's worth polishing
