---
title: "Wireframing and Prototyping"
description: "Sketch before you build. Wireframes and prototypes help you think through the interface before writing code—catching problems when they're cheap to fix."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, design, wireframes, prototypes, ui, ux, planning]
faqs:
  - question: "Do I really need wireframes if AI can generate UI quickly?"
    answer: "Yes, even more so. AI generates what you describe—describe poorly, get poor UI. A quick wireframe forces you to think through the flow before prompting. 5 minutes sketching saves hours of regenerating."
  - question: "What tools should I use?"
    answer: "Paper and pen for speed. Excalidraw or Figma for digital. The tool matters less than the habit. Start with whatever removes friction."
  - question: "When should I skip wireframing?"
    answer: "When the interface is obvious (standard CRUD forms, copying an existing pattern exactly) or when you're exploring through code (rapid prototypes you'll throw away). But even then, a 30-second sketch helps."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Wireframes are rough sketches of your interface—boxes, lines, labels. They help you think through layout and flow before writing code. Start with paper sketches (fastest), move to digital tools when you need to share or iterate. The goal isn't pretty pictures—it's catching problems early when they're cheap to fix.
{{< /quickanswer >}}

## Why sketch first

**Problems found in wireframes cost minutes to fix.**
Problems found in code cost hours.
Problems found after launch cost days and damage trust.

Wireframing forces you to answer questions before you build:
- What information does this screen show?
- What actions can users take?
- Where do they go next?
- What happens if something goes wrong?

These questions have to be answered eventually. Better to answer them with a pencil than with code.

---

## Fidelity levels

### Low-fidelity (lo-fi)

Quick sketches. Boxes, lines, labels. No colors, no real content.

```
┌─────────────────────────────────┐
│  Logo        [Search]    [Login]│
├─────────────────────────────────┤
│                                 │
│  ┌─────┐  ┌─────┐  ┌─────┐     │
│  │     │  │     │  │     │     │
│  │ Card│  │ Card│  │ Card│     │
│  │     │  │     │  │     │     │
│  └─────┘  └─────┘  └─────┘     │
│                                 │
│  [Load More]                    │
│                                 │
└─────────────────────────────────┘
```

**When to use**: Always start here. First ideas, exploring options, quick alignment.

**Time**: 2-10 minutes per screen.

**Tools**: Paper, whiteboard, Excalidraw, Balsamiq.

### Medium-fidelity (mid-fi)

More detail. Real labels, approximate sizing, basic layout.

**When to use**: Once you've chosen a direction. Sharing with others. Planning implementation.

**Time**: 15-30 minutes per screen.

**Tools**: Figma, Sketch, Adobe XD.

### High-fidelity (hi-fi)

Looks like the real thing. Real colors, typography, images.

**When to use**: Final design before development. User testing. Stakeholder approval.

**Time**: 1-4 hours per screen.

**Tools**: Figma, Sketch, Adobe XD.

---

## The wireframing process

### 1. List the screens

Before drawing anything, list what screens you need:

```
- Landing page
- Sign up
- Dashboard
- Settings
- Individual item view
- Error states
```

### 2. Sketch the flow

How do users move between screens?

```
Landing → Sign Up → Dashboard
              ↓
           Settings
              ↓
         Item View
```

### 3. Sketch each screen (lo-fi)

Boxes and labels. Don't worry about looks.

**Ask yourself:**
- What's the primary action on this screen?
- What information does the user need?
- What can go wrong?

### 4. Review and iterate

Look at your sketches and ask:
- Is the flow logical?
- Are there dead ends?
- Is any screen doing too much?
- What happens on mobile?

### 5. Add detail (if needed)

Only move to mid-fi or hi-fi if:
- You need to share with others
- The design is complex
- You're doing user testing

---

## Wireframes for AI development

When you use AI to build interfaces, wireframes become prompts:

### Without wireframe
```
"Build me a dashboard"
```
AI guesses layout, content, actions. Results vary wildly.

### With wireframe context
```
"Build a dashboard with this layout:
- Top: Logo left, user dropdown right
- Left sidebar: Navigation (Home, Projects, Settings)
- Main area: Grid of project cards (title, status, last updated)
- Each card is clickable → goes to /projects/[id]
- Empty state: 'No projects yet' with 'Create Project' button"
```
AI has clear direction. Results match intent.

### The wireframe-to-prompt workflow

1. **Sketch** the screen (2 minutes)
2. **Describe** it in your prompt (1 minute)
3. **Generate** the code
4. **Compare** output to sketch
5. **Iterate** with specific feedback

---

## Prototypes vs wireframes

| Aspect | Wireframe | Prototype |
|--------|-----------|-----------|
| Purpose | Think through layout | Test interactions |
| Fidelity | Low to medium | Medium to high |
| Interactivity | None (static) | Clickable, animated |
| Time | Minutes | Hours to days |
| When | Early exploration | Validation, testing |

### When to prototype

- Testing a novel interaction
- Convincing stakeholders
- User testing before building
- Complex flows that need to feel right

### When wireframes are enough

- Standard UI patterns
- Solo building (you are the stakeholder)
- Time pressure
- Simple flows

---

## Tools comparison

### Paper and pen
- **Cost**: Free
- **Speed**: Fastest
- **Best for**: First ideas, brainstorming
- **Limitation**: Hard to share digitally

### Excalidraw
- **Cost**: Free
- **Speed**: Fast
- **Best for**: Lo-fi digital wireframes, collaboration
- **Limitation**: No interactivity

### Figma
- **Cost**: Free tier available
- **Speed**: Medium
- **Best for**: All fidelity levels, team collaboration, prototyping
- **Limitation**: Learning curve

### Balsamiq
- **Cost**: Paid ($9/mo)
- **Speed**: Fast
- **Best for**: Lo-fi wireframes that look intentionally rough
- **Limitation**: Limited for hi-fi

### Whimsical
- **Cost**: Free tier available
- **Speed**: Fast
- **Best for**: Flowcharts + wireframes together
- **Limitation**: Less flexible than Figma

---

## Common wireframing mistakes

### 1. Starting too detailed
Don't design buttons and colors first. Start with boxes.

**Fix**: Force yourself to use only rectangles for the first pass.

### 2. Skipping error states
The happy path isn't enough. What happens when:
- The list is empty?
- The request fails?
- The user lacks permission?

**Fix**: For each screen, ask "what could go wrong?"

### 3. Forgetting mobile
Desktop-first wireframes often don't translate.

**Fix**: Sketch mobile alongside desktop, or mobile first.

### 4. Over-engineering
You're not building Figma files for a design system. You're thinking through the interface.

**Fix**: Set a time limit. 5 minutes per screen maximum for first pass.

### 5. Not iterating
First idea is rarely best idea.

**Fix**: Sketch 2-3 versions before committing.

---

## Wireframe checklist

For each screen, verify:

- [ ] **Primary action is clear** - What should users do here?
- [ ] **Information hierarchy** - Most important content is prominent
- [ ] **Navigation is obvious** - Users know where they are and can get elsewhere
- [ ] **Empty states** - What shows when there's no data?
- [ ] **Error states** - What shows when something fails?
- [ ] **Loading states** - What shows while waiting?
- [ ] **Mobile considered** - Will this work on small screens?

---

## The honest take

**Most vibecoders skip wireframing** and pay for it in rework. AI makes this worse—bad prompts produce bad UI, then you iterate in code instead of on paper.

**5 minutes of sketching saves hours of coding.** Not every screen needs wireframes, but complex flows and novel interfaces do.

**Start with paper.** The tool that removes friction wins. Fancy tools come later.

**Wireframes are thinking tools, not deliverables.** They don't need to be pretty. They need to help you think.

## Further reading

- [UI/UX design principles](/basics/ui-ux-design-principles/): Visual hierarchy, consistency, feedback
- [User journey mapping](/basics/user-journey-mapping/): Understanding flows before screens
- [How to delegate to AI effectively](/basics/how-to-delegate-to-ai-effectively/): Better prompts, better results
- [How to slice work effectively](/basics/how-to-slice-work-effectively/): Build in vertical slices
