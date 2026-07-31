---
title: "UI/UX Design Principles for Developers"
description: "The core design principles that make interfaces usable. Visual hierarchy, consistency, feedback, and accessibility—without needing to become a designer."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, design, ui, ux, accessibility, product]
faqs:
  - question: "Do I need to be a designer to build good UI?"
    answer: "No, but you need to understand basic principles. Most usability problems come from violating simple rules—no feedback on actions, inconsistent patterns, poor contrast. Following these principles gets you 80% of the way to good design."
  - question: "Should I design first or code first?"
    answer: "Sketch first, even on paper. It's faster to iterate on wireframes than code. But don't over-design—a rough sketch is enough to start. You'll learn what works by building and testing."
  - question: "What's the difference between UI and UX?"
    answer: "UI (User Interface) is what users see and interact with—buttons, forms, layouts. UX (User Experience) is how the whole experience feels—is it frustrating or delightful? Good UI is part of good UX, but UX includes everything from page load speed to error messages to onboarding."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Good UI follows predictable principles: establish visual hierarchy so users know what's important, be consistent so they learn once and apply everywhere, give feedback on every action, and make it accessible to everyone. You don't need design talent—you need to follow the rules and test with real users.
{{< /quickanswer >}}

## The principles that matter most

### 1. Visual hierarchy

Users should immediately know what's important.

**How to create hierarchy:**
- **Size**: Bigger = more important
- **Weight**: Bold = more important
- **Color**: Brighter/contrasting = more important
- **Position**: Top/left = seen first (in LTR languages)
- **Whitespace**: More space around = more important

```
❌ Bad: Everything same size and weight
┌────────────────────────────────────┐
│ Welcome to Our App                 │
│ Sign up now for free               │
│ Already have an account? Log in    │
│ Learn more about features          │
└────────────────────────────────────┘

✓ Good: Clear hierarchy
┌────────────────────────────────────┐
│ Welcome to Our App           (big) │
│                                    │
│ Sign up now for free    [BUTTON]   │
│                         (prominent)│
│                                    │
│ Already have account? Log in       │
│                         (smaller)  │
└────────────────────────────────────┘
```

**The squint test**: Squint at your design. Can you still tell what's most important? If everything blurs together, your hierarchy is weak.

### 2. Consistency

Same action, same appearance, same location. Always.

**Be consistent in:**
- Button styles (primary, secondary, danger)
- Form patterns (labels, validation, errors)
- Navigation location
- Terminology (don't say "sign up" and "register" interchangeably)
- Spacing and alignment

```
❌ Inconsistent buttons
[Sign Up]  (Submit)  < Send >  CONTINUE

✓ Consistent buttons
[Sign Up]  [Submit]  [Send]  [Continue]
```

**Why it matters**: Users learn your interface. Inconsistency means they have to relearn constantly.

### 3. Feedback

Every action needs a visible response.

| Action | Required feedback |
|--------|-------------------|
| Click button | Visual state change (pressed state) |
| Submit form | Loading indicator, then success/error |
| Hover over interactive element | Cursor change, hover state |
| Complete process | Confirmation message |
| Error occurs | Clear error message with guidance |

```
❌ No feedback
User clicks "Save"... nothing visible happens
User clicks again... duplicate saves?

✓ Clear feedback
User clicks "Save"
→ Button shows "Saving..."
→ Button shows "✓ Saved" or returns to normal
→ Or shows error: "Failed to save. Try again."
```

**Loading states are not optional.** If something takes more than 100ms, show a loading indicator.

### 4. Error prevention and recovery

Don't let users make mistakes. When they do, help them fix it.

**Prevention:**
- Disable buttons when actions aren't possible
- Use appropriate input types (email, number, date)
- Confirm destructive actions
- Show constraints before users hit them

**Recovery:**
- Clear error messages that explain what's wrong
- Don't clear the form on error
- Highlight exactly which field has the problem
- Suggest how to fix it

```
❌ Bad error
"Error: Invalid input"

✓ Good error
"Email address must include @. Example: name@example.com"
```

### 5. Accessibility (a11y)

Design for everyone, including users with disabilities.

**Minimum requirements:**
- Color contrast ratio of 4.5:1 for text
- Don't rely on color alone (add icons, text)
- All interactive elements keyboard accessible
- Images have alt text
- Form fields have labels

**Quick wins:**
```html
<!-- Label your inputs -->
<label for="email">Email</label>
<input type="email" id="email" name="email">

<!-- Not just color for errors -->
<span style="color: red">⚠ Invalid email</span>

<!-- Alt text for images -->
<img src="logo.png" alt="Company logo">

<!-- Buttons describe their action -->
<button>Submit form</button>  <!-- Not just "Submit" -->
```

**Test**: Navigate your app using only keyboard (Tab, Enter, Escape). Can you do everything?

## Common UI patterns

### Forms

```
✓ Good form design
┌────────────────────────────────────┐
│ Email                              │
│ ┌────────────────────────────────┐ │
│ │ user@example.com               │ │
│ └────────────────────────────────┘ │
│                                    │
│ Password                           │
│ ┌────────────────────────────────┐ │
│ │ ••••••••••••                   │ │
│ └────────────────────────────────┘ │
│ Must be at least 8 characters      │
│                                    │
│           [Sign Up]                │
└────────────────────────────────────┘

- Labels above fields (not placeholder-only)
- Helper text for constraints
- Single primary action
- Logical tab order
```

### Navigation

```
Primary nav: Persistent, always accessible
Secondary nav: Contextual to current section
Breadcrumbs: Show where you are in hierarchy

┌─────────────────────────────────────────┐
│ Logo   Dashboard  Projects  Settings    │  ← Primary (always visible)
├─────────────────────────────────────────┤
│ Dashboard > Analytics > Traffic         │  ← Breadcrumbs (location)
├─────────────────────────────────────────┤
│ [Overview] [Traffic] [Revenue]          │  ← Secondary (context)
```

### Empty states

Don't show blank screens. Guide users on what to do.

```
❌ Empty state: nothing
┌────────────────────────────────────┐
│                                    │
│                                    │
│                                    │
└────────────────────────────────────┘

✓ Empty state: helpful
┌────────────────────────────────────┐
│        📊 No projects yet          │
│                                    │
│  Create your first project to      │
│  start tracking your work.         │
│                                    │
│      [Create Project]              │
└────────────────────────────────────┘
```

### Modals and dialogs

- Use sparingly—they interrupt flow
- Always have a clear way to close (X, click outside, Escape)
- Don't nest modals
- Keep content focused on one decision

## Mobile considerations

- **Touch targets**: Minimum 44x44 pixels
- **Thumb zones**: Important actions in easy reach
- **No hover states**: Can't hover on touch
- **Reduce typing**: Use pickers, autocomplete
- **Test on real devices**: Simulators miss touch feel

## The design process (simplified)

1. **Understand the problem**: What are users trying to do?
2. **Sketch solutions**: Paper, whiteboard, Figma—rough is fine
3. **Build minimal version**: Just enough to test the idea
4. **Test with real users**: Watch them use it (don't explain)
5. **Iterate**: Fix what confused them

You don't need elaborate mockups. A sketch and a conversation with users beats a polished design nobody tested.

## Tools for developers

**Design:**
- Figma (free tier) - industry standard
- Excalidraw - quick sketches
- Paper and pen - seriously, it works

**UI components:**
- Tailwind CSS - utility-first styling
- shadcn/ui - copy-paste components
- Radix UI - accessible primitives
- Chakra UI, MUI - full component libraries

**Testing:**
- Lighthouse (Chrome DevTools) - accessibility audit
- Wave - accessibility checker
- Contrast checker tools

## Common mistakes

### 1. Too many options
Don't overwhelm users. One primary action per screen.

### 2. Clever over clear
"Get Started" beats "Embark on Your Journey"

### 3. Hiding important actions
If users need it often, make it visible. Don't bury in menus.

### 4. No loading states
Users will think it's broken and click again.

### 5. Walls of text
Nobody reads paragraphs. Use bullets, headers, whitespace.

### 6. Ignoring mobile
Test on small screens. What looks fine at 1920px breaks at 375px.

## Quick checklist

Before shipping:

- [ ] Can users tell what to do first? (hierarchy)
- [ ] Are similar things styled the same? (consistency)
- [ ] Does every action have visible feedback?
- [ ] Are errors clear and helpful?
- [ ] Can you navigate with keyboard only?
- [ ] Is text readable? (contrast, size)
- [ ] Does it work on mobile?
- [ ] Are loading states visible?
- [ ] Are empty states helpful?
- [ ] Did you test with someone who didn't build it?

## Further reading

- [How to slice work effectively](/basics/how-to-slice-work-effectively/): Ship something usable first
- [How to write user stories](/basics/how-to-write-user-stories/): Define what you're building
- [Product discovery techniques](/basics/product-discovery-techniques/): Understand what users need
- [Accessibility guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) - official standards
