---
title: "How to Write User Stories"
description: "Define what you're building before you build it. User stories, acceptance criteria, and writing requirements that AI (and humans) can implement correctly."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, agile, product, requirements, planning, ai-development]
faqs:
  - question: "Do I really need user stories for a small project?"
    answer: "Yes—especially for AI-assisted development. Without clear requirements, you'll waste time on misunderstood features. It doesn't have to be formal; a few sentences describing who, what, and why is enough to prevent major rework."
  - question: "Who writes user stories?"
    answer: "Anyone who understands what users need. Product managers, founders, developers—it doesn't matter. What matters is capturing the user's perspective and the business value, not just technical tasks."
  - question: "How detailed should acceptance criteria be?"
    answer: "Detailed enough that someone else (or AI) could implement it and you'd accept the result. If you'd look at the implementation and say 'that's not what I meant,' your criteria weren't clear enough."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A user story describes a feature from the user's perspective: "As a [user type], I want to [do something] so that [reason/benefit]." Acceptance criteria define exactly when the story is done. Together, they create clear requirements that anyone—including AI—can implement correctly without constant clarification.
{{< /quickanswer >}}

## Why user stories matter more now

With AI building what you describe, the quality of your description determines the quality of the output.

**Vague prompt → vague result:**
> "Add a login feature"

AI might build: Email/password? Social login? Magic links? Forgot password? Remember me? What happens after login? What errors to show?

**Clear user story → clear result:**
> "As a returning user, I want to log in with my email and password so that I can access my saved projects. Show error if credentials are wrong. Redirect to dashboard on success."

You get what you asked for because you knew what to ask for.

## The user story format

```
As a [type of user]
I want to [perform an action]
So that [I get this benefit]
```

### Examples

```
As a new visitor,
I want to see what the product does on the landing page,
So that I can decide if it's worth signing up.

As a logged-in user,
I want to export my data as CSV,
So that I can analyze it in Excel.

As an admin,
I want to suspend user accounts,
So that I can handle policy violations.
```

### Why this format works

- **Who**: Different users have different needs. An admin story differs from a customer story.
- **What**: The specific action, in user language (not technical implementation).
- **Why**: The benefit explains priority. If the benefit is weak, maybe you don't need it.

## Acceptance criteria

Acceptance criteria define "done." They're the checklist that proves the story is complete.

### Format: Given/When/Then

```
Given [starting condition]
When [action happens]
Then [expected result]
```

### Example: Login story with criteria

**User Story:**
> As a registered user, I want to log in with email and password so that I can access my account.

**Acceptance Criteria:**
```
Given I am on the login page
When I enter valid email and password and click "Log in"
Then I am redirected to the dashboard
And I see my username in the header

Given I am on the login page
When I enter an incorrect password
Then I see "Invalid email or password" error
And the form is not cleared
And I can try again

Given I am on the login page
When I enter an email that doesn't exist
Then I see "Invalid email or password" error
(Same message to prevent email enumeration)

Given I am logged in
When I close the browser and return within 7 days
Then I am still logged in (session persists)
```

### Why detailed criteria matter

Without criteria, you'll say "that's not what I meant" after implementation. With criteria, you catch misunderstandings before building.

**For AI development**: Acceptance criteria become test cases. You can ask AI to implement, then verify each criterion.

## INVEST: Good story characteristics

**I**ndependent: Can be built without other stories
**N**egotiable: Details can be discussed
**V**aluable: Delivers user value (not just technical tasks)
**E**stimable: Clear enough to estimate effort
**S**mall: Can complete in one sprint/iteration
**T**estable: Has clear acceptance criteria

### Stories that fail INVEST

```
❌ Not Independent:
"As a user, I want the database schema updated"
(Technical task, not user value)

❌ Not Valuable:
"As a developer, I want to refactor the auth module"
(No user benefit stated)

❌ Not Small:
"As a user, I want a complete e-commerce checkout"
(Too big—break it down)

❌ Not Testable:
"As a user, I want a beautiful dashboard"
("Beautiful" isn't testable)
```

### Better versions

```
✓ "As a customer, I want to save items to my cart so I can purchase them later"
(Small, testable, valuable)

✓ "As a customer, I want to enter my shipping address so my order can be delivered"
(Independent piece of checkout)

✓ "As a user, I want to see my key metrics on the dashboard so I can track progress"
(Testable: either metrics are visible or not)
```

## Breaking down epics

Big features (epics) need to be split into smaller stories.

**Epic:** User Authentication
```
Stories:
1. User can register with email and password
2. User can log in with credentials
3. User can log out
4. User can reset forgotten password
5. User can change password when logged in
6. User session expires after 30 days
7. User can enable two-factor authentication
```

Each story can be built and shipped independently.

**The slicing principle**: Each story should deliver usable value. "Create database tables" isn't a story because users can't use tables.

## Writing for AI implementation

When delegating to AI, your story + criteria become the prompt.

### Prompt structure that works

```
## Context
I'm building [type of app]. Users are [description].

## User Story
As a [user], I want to [action] so that [benefit].

## Acceptance Criteria
- Given X, when Y, then Z
- Given A, when B, then C

## Technical constraints
- Use [framework/library]
- Follow existing patterns in [file]
- Don't modify [protected areas]

## Out of scope
- NOT implementing [related feature]
- Error emails (separate story)
```

### Example for AI

```
## Context
I'm building a task management app. Users are individuals tracking personal projects.

## User Story
As a user, I want to mark tasks as complete so I can track my progress.

## Acceptance Criteria
- Given I have a task list, when I click the checkbox, then the task shows as complete (strikethrough, muted color)
- Given a task is complete, when I click the checkbox again, then it's marked incomplete
- Given I complete a task, when I refresh the page, then it's still complete (persisted)
- Complete tasks should appear at the bottom of the list

## Technical constraints
- React component, use existing Task type
- Persist to localStorage
- Match existing button styling

## Out of scope
- Delete tasks (separate story)
- Due dates (separate story)
```

This gives AI everything needed to implement correctly.

## Common mistakes

### 1. Technical tasks disguised as stories

```
❌ "As a developer, I want to add Redux"
   (No user value)

✓ "As a user, I want my filters to persist when I navigate away"
   (User value that might be solved with state management)
```

### 2. Solution in the story

```
❌ "As a user, I want a dropdown menu with 3 options"
   (Specifying UI solution)

✓ "As a user, I want to filter results by status (active/completed/all)"
   (Need, not solution—maybe tabs are better than dropdown)
```

### 3. Missing the "so that"

```
❌ "As a user, I want to export data"
   (Why? What format? For what purpose?)

✓ "As a user, I want to export my transactions as CSV so I can import them into my accounting software"
   (Clear purpose guides implementation)
```

### 4. Stories too big

```
❌ "As a user, I want to manage my profile"
   (What does 'manage' include? Could be 20 features)

✓ "As a user, I want to change my display name"
✓ "As a user, I want to upload a profile picture"
✓ "As a user, I want to update my email address"
   (Each is small, clear, shippable)
```

## Template

```markdown
## User Story
**As a** [type of user]
**I want to** [perform action]
**So that** [benefit/value]

## Acceptance Criteria
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]
- [ ] [Additional criteria]

## Notes
- [Edge cases to consider]
- [Design references if any]
- [Out of scope for this story]

## Technical notes (optional)
- [Constraints]
- [Dependencies]
```

## Quick reference

| Component | Purpose | Example |
|-----------|---------|---------|
| As a... | Who benefits | "As a premium subscriber" |
| I want to... | What action | "I want to download videos" |
| So that... | Why it matters | "So that I can watch offline" |
| Given/When/Then | Specific scenarios | "Given I'm offline, when I open the app, then I see my downloads" |

## Further reading

- [How to slice work effectively](/basics/how-to-slice-work-effectively/): Breaking stories into deliverables
- [How to delegate to AI effectively](/basics/how-to-delegate-to-ai-effectively/): Using stories as prompts
- [Product discovery techniques](/basics/product-discovery-techniques/): Finding what to build
- [Agile for solo builders](/basics/agile-for-solo-builders/): Managing your backlog
