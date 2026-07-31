---
title: "How to Slice Work Effectively"
description: "Break big features into small, valuable pieces. Vertical slicing, MVP thinking, and why shipping small beats planning big—especially with AI development."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, agile, product, planning, mvp, ai-development]
faqs:
  - question: "Why slice small? Isn't it more efficient to build everything at once?"
    answer: "No. Small slices let you: learn from real usage faster, course-correct before wasting time, ship value sooner, and reduce risk. You'll throw away less work because you'll discover what's actually needed."
  - question: "How do I know if a slice is small enough?"
    answer: "Can you ship it today or tomorrow? Can users actually use it? If it takes a week and delivers no standalone value, it's probably too big or sliced wrong (horizontal instead of vertical)."
  - question: "What about AI development specifically?"
    answer: "Small slices are perfect for AI. Each slice becomes a focused prompt with clear acceptance criteria. AI handles small, well-defined tasks better than large, ambiguous ones. And you can verify each piece before moving on."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Slicing means breaking a big feature into small pieces that each deliver value. The key is vertical slicing—each slice works end-to-end (UI to database), not horizontal layers (build all the UI, then all the API, then database). With AI building your code, small well-defined slices get implemented correctly; big ambiguous features don't.
{{< /quickanswer >}}

## Vertical vs horizontal slicing

### Horizontal slicing (don't do this)

Break by technical layer:
```
Week 1: Build all database tables
Week 2: Build all API endpoints
Week 3: Build all UI components
Week 4: Connect everything
Week 5: Fix all the bugs from integration

Result: Nothing works until week 4.
        Users can't see anything.
        You don't know if it's right until it's "done."
```

### Vertical slicing (do this)

Break by functionality that works end-to-end:
```
Day 1: User can create a task (UI → API → DB)
       [Shippable, users can try it]

Day 2: User can mark task complete
       [Shippable, builds on day 1]

Day 3: User can see task list
       [Shippable, core feature working]

Day 4: User can delete tasks
       [Shippable, handles mistakes]

Result: Working software every day.
        Real user feedback immediately.
        Each piece is verified before moving on.
```

## The slicing mindset

Ask: **"What's the smallest thing I can ship that someone can actually use?"**

Not "use" as in "the code runs"—use as in "accomplishes something real."

### Example: Building a notes app

**Big feature**: Note-taking application

**Horizontal slices (bad)**:
1. Database schema for notes, folders, tags
2. API for CRUD operations
3. UI for list view, editor, search
4. User authentication
5. Connect everything

**Vertical slices (good)**:
1. Create and view one note (no folders, no formatting)
2. Edit existing note
3. Delete note
4. List all notes
5. Basic text formatting
6. Search notes
7. Organize into folders

Each slice ships. Users can take notes from slice 1. Each subsequent slice adds value to working software.

## Slicing techniques

### 1. Simplify operations

Instead of full CRUD immediately:
```
Slice 1: Create only (users can add)
Slice 2: Read/list (users can see)
Slice 3: Update (users can edit)
Slice 4: Delete (users can remove)
```

### 2. Reduce data scope

Instead of handling everything:
```
Full: Handle all payment methods, currencies, tax calculations
Slice 1: Credit card only, USD only, no tax
Slice 2: Add PayPal
Slice 3: Add EUR/GBP
Slice 4: Add tax calculation for US
```

### 3. Defer edge cases

```
Full: Handle all error cases, retries, notifications
Slice 1: Happy path only (assume everything works)
Slice 2: Basic error handling (show error message)
Slice 3: Retry logic
Slice 4: Email notifications on failure
```

### 4. Manual before automatic

```
Full: Automatic PDF generation, email delivery, scheduling
Slice 1: Generate PDF on button click (manual trigger)
Slice 2: Email a link to download (manual send)
Slice 3: Schedule generation (automatic)
Slice 4: Automatic email delivery
```

### 5. Single before multiple

```
Full: Multi-user teams with roles and permissions
Slice 1: Single user, no sharing
Slice 2: Invite one other user (equal access)
Slice 3: Add admin role
Slice 4: Add member role
Slice 5: Teams with multiple members
```

### 6. Simple UI before polished

```
Full: Beautiful dashboard with charts, filters, exports
Slice 1: Plain list of data
Slice 2: Add one chart
Slice 3: Add filter by date
Slice 4: Add export to CSV
Slice 5: Polish visual design
```

## The MVI approach (Minimum Viable Increment)

Every slice should be:
- **Minimum**: Smallest possible
- **Viable**: Actually usable (not broken)
- **Increment**: Adds to what exists

**Test**: If you shipped only this slice and nothing else, would it be useful to someone?

## Slicing for AI development

AI handles small, well-defined tasks well. It struggles with large, ambiguous ones.

### Good AI task (well-sliced)

```
Implement task completion:
- Add 'completed' boolean to Task type
- Add checkbox to TaskItem component
- Toggle completion on checkbox click
- Persist to localStorage
- Style completed tasks with strikethrough

Acceptance criteria:
- Clicking checkbox toggles completed state
- Completed tasks show strikethrough text
- State persists on page refresh
```

### Bad AI task (not sliced)

```
Build a complete task management system with:
- Task CRUD
- Projects and folders
- Tags and filtering
- Due dates and reminders
- Collaboration
- Mobile app
```

AI will produce something, but it won't be what you want. Too many decisions are unspecified.

### The prompt-per-slice pattern

```
Slice 1: Create task → AI prompt → Verify → Merge
Slice 2: List tasks → AI prompt → Verify → Merge
Slice 3: Complete task → AI prompt → Verify → Merge
Slice 4: Delete task → AI prompt → Verify → Merge
```

Each cycle: clear requirements → focused implementation → verification → integration.

## When to stop slicing

A slice is small enough when:
- You can describe it in one or two sentences
- It can be implemented in hours, not days
- You can list specific acceptance criteria
- Someone else (or AI) could implement it without asking many questions
- It delivers value on its own

A slice is too small when:
- It can't work without other slices
- The overhead of splitting exceeds the benefit
- It's a technical task with no user value

## Prioritizing slices

Not all slices are equal. Prioritize by:

### 1. Core value first
What's the main thing users need? Build that before nice-to-haves.

### 2. Risky assumptions first
Uncertain if users want it? Build a slice to test before building everything.

### 3. Dependencies last
If slice A depends on slice B, build B first.

### 4. Learning value
Which slice will teach you the most about what users need?

## Real example: E-commerce checkout

**Big feature**: Complete checkout flow

**Sliced approach**:

```
Week 1: Buy one product
├── Slice: Add to cart button (one product)
├── Slice: View cart (simple list)
├── Slice: Enter shipping address
└── Slice: Pay with test Stripe card

Week 2: Multiple products
├── Slice: Add quantity selector
├── Slice: Cart shows multiple items
└── Slice: Cart total calculation

Week 3: User experience
├── Slice: Order confirmation page
├── Slice: Order confirmation email
└── Slice: Order history page

Week 4: Edge cases
├── Slice: Handle payment failures
├── Slice: Inventory check before payment
└── Slice: Support multiple addresses
```

By end of week 1, you have working checkout. Everything after improves it.

## Anti-patterns

### "Foundation first"

```
❌ "Let me build the complete data model, API architecture, 
    and component library first"

✓ "Let me build one feature that works end-to-end, 
    then expand the foundation as needed"
```

### "It all needs to work together"

```
❌ "Users won't understand if only part works"

✓ "Users will understand a simple thing that works 
    better than a complex thing that doesn't"
```

### "Let me just finish this part"

```
❌ Spending 3 days on a feature because "it's almost done"

✓ Asking: "What's the smallest useful thing I can ship right now?"
```

## Slicing exercise

Take your next feature. Ask:

1. What's the simplest version that delivers value?
2. What can I remove that's not essential?
3. What can be added later as enhancements?
4. Can this be used without everything else?

Keep asking until you have something you can build in a day.

## Further reading

- [How to write user stories](/basics/how-to-write-user-stories/): Define each slice clearly
- [How to delegate to AI effectively](/basics/how-to-delegate-to-ai-effectively/): Use slices as prompts
- [Agile for solo builders](/basics/agile-for-solo-builders/): Manage your sliced backlog
- [Product discovery techniques](/basics/product-discovery-techniques/): Decide what to slice first
