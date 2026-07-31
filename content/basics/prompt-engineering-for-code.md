---
title: "Prompt Engineering for Code"
description: "AI generates what you describe—describe poorly, get poor code. Learn prompting patterns that produce better, more correct code from AI assistants."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, ai, prompting, vibe-coding, development, productivity]
faqs:
  - question: "Why does AI keep generating wrong code?"
    answer: "Usually because the prompt is ambiguous. AI fills gaps with assumptions—often wrong ones. Better prompts have: clear context, specific requirements, examples of input/output, and constraints on the solution."
  - question: "Should I write detailed prompts for everything?"
    answer: "No. Simple tasks need simple prompts. Match prompt detail to task complexity. 'Add a button that submits the form' doesn't need three paragraphs."
  - question: "What if AI still generates wrong code?"
    answer: "Don't regenerate—refine. Tell it specifically what's wrong. 'That doesn't handle the error case—add try/catch around the fetch call.' Iterative refinement beats repeated regeneration."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Good prompts have: context (what you're building, existing code patterns), clear requirements (what exactly should happen), constraints (technologies, style), and examples (input/output pairs). Work in small increments, verify each piece, and iterate with specific feedback rather than regenerating from scratch.
{{< /quickanswer >}}

## The anatomy of a good prompt

### Bad prompt

```
make a login form
```

**Problems**: No context, no requirements, no constraints. AI guesses everything.

### Better prompt

```
Create a login form component in React with TypeScript.

Requirements:
- Email and password fields
- Client-side validation (email format, password min 8 chars)
- Show validation errors below each field
- Submit button disabled until form is valid
- On submit, call the onLogin(email, password) prop
- Show loading state while submitting

Style: Use Tailwind CSS, match existing form components
```

**Why it works**: Clear context, specific requirements, explicit constraints.

---

## The CRISPE framework

### Context

What's the situation? What exists already?

```
I'm building a Next.js 14 app with App Router.
The project uses TypeScript, Tailwind CSS, and Prisma for the database.
The user is already authenticated (session available via useSession hook).
```

### Requirements

What exactly should happen?

```
Build a user profile page that:
- Displays user name, email, and avatar
- Allows editing name (inline editing)
- Shows "last active" relative time
- Has a "delete account" button with confirmation
```

### Input/Output

What goes in? What comes out?

```
Input: User object from session
{
  id: string
  name: string
  email: string
  avatar: string | null
  lastActive: Date
}

Output: React component that renders the profile
```

### Style/Constraints

How should it be built?

```
Style guidelines:
- Follow existing component patterns in /components
- Use the Button component from /components/ui/Button
- Use react-hook-form for form handling
- Error messages should use the ErrorMessage component
```

### Examples

Show what you mean:

```
Example of inline editing behavior:
1. User clicks on name → Input field appears
2. User types new name
3. User clicks away or presses Enter → Save
4. Show loading spinner during save
5. Revert if save fails
```

---

## Prompting patterns

### Pattern 1: The step-by-step

Break complex tasks into steps:

```
Build a file upload feature. Let's do this step by step:

Step 1: Create a FileUpload component that:
- Accepts drag-and-drop
- Shows file preview for images
- Limits to 5MB max size

(wait for response, verify)

Step 2: Add the upload handler that:
- Uploads to S3 via presigned URL
- Shows progress bar
- Handles errors gracefully

(wait for response, verify)

Step 3: Integrate with the post creation form
```

**Why it works**: Smaller pieces are easier to get right. You verify each step.

### Pattern 2: The example-first

Show what you want:

```
I need a function that formats currency.

Examples:
formatCurrency(1234.5, 'USD') → '$1,234.50'
formatCurrency(1234.5, 'EUR') → '€1,234.50'
formatCurrency(1000000, 'USD') → '$1,000,000.00'
formatCurrency(0.99, 'USD') → '$0.99'

Handle edge cases:
- Negative numbers: -$1,234.50
- null/undefined: Return empty string
- Unknown currency: Use currency code as symbol
```

**Why it works**: Examples are unambiguous. AI sees exactly what you mean.

### Pattern 3: The diff request

When modifying existing code:

```
Here's my current component:

[paste component]

Modify it to:
- Add pagination (10 items per page)
- Keep existing filtering
- Add "load more" button instead of page numbers
- Preserve the loading and error states
```

**Why it works**: AI has context. Changes are targeted, not wholesale rewrites.

### Pattern 4: The constraint-heavy

When requirements are strict:

```
Create an API route for user registration.

Hard constraints (must follow exactly):
- POST /api/auth/register
- Validate email format and password strength
- Hash password with bcrypt (12 rounds)
- Store in Prisma users table
- Return 201 with user object (no password)
- Return 400 for validation errors
- Return 409 if email already exists

Do NOT:
- Send any emails (handled elsewhere)
- Create sessions (separate endpoint)
- Log passwords or sensitive data
```

**Why it works**: Explicit constraints prevent AI from making unwanted additions.

### Pattern 5: The test-first

Specify behavior through tests:

```
Build a function that satisfies these tests:

describe('calculateDiscount', () => {
  it('returns 0 for orders under $50', () => {
    expect(calculateDiscount(49.99)).toBe(0);
  });
  
  it('returns 10% for orders $50-99', () => {
    expect(calculateDiscount(50)).toBe(5);
    expect(calculateDiscount(99)).toBe(9.9);
  });
  
  it('returns 20% for orders $100+', () => {
    expect(calculateDiscount(100)).toBe(20);
  });
  
  it('handles edge cases', () => {
    expect(calculateDiscount(0)).toBe(0);
    expect(calculateDiscount(-10)).toBe(0);
  });
});
```

**Why it works**: Tests are precise specifications. No ambiguity about expected behavior.

---

## Iteration patterns

### Don't regenerate—refine

**Bad approach**:
```
AI generates code → Wrong → Regenerate from scratch
AI generates code → Still wrong → Regenerate again
AI generates code → Different wrong → Give up
```

**Good approach**:
```
AI generates code → Wrong
"The error handling is missing. Add try/catch around the fetch call and show an error message in the UI if it fails."

AI fixes → Partially right
"Good, but the error message should disappear after 5 seconds."

AI fixes → Correct
```

### Be specific about what's wrong

**Bad**: "This doesn't work"
**Good**: "The form submits even when validation fails—the submit handler should check isValid first"

**Bad**: "Fix the errors"
**Good**: "Line 23 has a type error—user.name could be undefined, add a null check"

### One thing at a time

**Bad**: "Fix the validation, add loading state, and also make the button blue"

**Good**: 
1. "Fix the validation—currently accepts empty email"
2. (verify) "Now add loading state while submitting"
3. (verify) "Change button to primary color (blue-600)"

---

## Context management

### The context window problem

AI has limited memory. Long conversations lose early context.

**Signs of context loss**:
- AI forgets earlier decisions
- Suggestions contradict earlier code
- Style becomes inconsistent

### Strategies

**1. Include relevant code in each prompt**

```
Here's the current state of the component:

[paste current code]

Now add the sorting feature we discussed.
```

**2. Summarize context periodically**

```
Quick recap of what we've built:
- UserList component with pagination
- Uses React Query for data fetching
- Filters by status and date range

Now let's add the export to CSV feature.
```

**3. Start fresh for new features**

Don't extend conversations forever. Start new conversations for new features, providing fresh context.

**4. Reference files by name**

```
Update the UserCard component in /components/UserCard.tsx
to match the styling in /components/ProjectCard.tsx
```

---

## Common prompting mistakes

### 1. Too vague

**Bad**: "Make it better"
**Good**: "Improve performance by memoizing the expensive calculation and adding loading state"

### 2. Too much at once

**Bad**: 500-word prompt requesting 10 features
**Good**: One feature at a time, verified before moving on

### 3. No examples

**Bad**: "Format dates nicely"
**Good**: "Format dates like 'Mar 15, 2024' or 'Today at 3:30 PM' for dates within 24 hours"

### 4. Conflicting requirements

**Bad**: "Make it simple but also handle all edge cases"
**Good**: "Handle these specific edge cases: [list]. Keep the happy path simple."

### 5. Assuming AI remembers

**Bad**: "Use the same pattern as before"
**Good**: "Use the same error handling pattern: [paste example or describe]"

### 6. Not verifying

**Bad**: Accept generated code without reading it
**Good**: Read the code, test it, then iterate if needed

---

## Prompting for debugging

### Describe the problem completely

```
Bug: Form validation message doesn't disappear

Expected: Error message shows on invalid input, disappears when input becomes valid
Actual: Error message appears but never disappears

Relevant code:
[paste the validation logic]

I've tried: Adding onChange handler to clear errors—didn't work
```

### Ask for explanations

```
Why might this useEffect be running twice?

useEffect(() => {
  fetchData();
}, [userId]);

Environment: React 18, StrictMode enabled
```

### Request step-by-step debugging

```
Help me debug this step by step:

The user clicks "Save" but nothing happens.

1. What should I check first?
2. How can I verify each step?
3. What are common causes of this pattern?
```

---

## The honest take

**Prompting is a skill.** It improves with practice. Your first prompts won't be great—that's fine.

**Match effort to complexity.** Simple tasks need simple prompts. Don't over-engineer every request.

**Iterate, don't regenerate.** Refinement is faster and produces better results than starting over.

**Verify everything.** AI generates plausible-looking code that might be wrong. Read it. Test it. Understand it.

**You're still responsible.** The code ships under your name. AI is a tool, not a replacement for judgment.

## Further reading

- [How to delegate to AI effectively](/basics/how-to-delegate-to-ai-effectively/): Broader AI collaboration strategies
- [How to slice work effectively](/basics/how-to-slice-work-effectively/): Break work into promptable pieces
- [How to debug your code](/basics/how-to-debug-your-code/): When AI-generated code breaks
- [What is vibe coding?](/basics/what-is-vibe-coding/): The method and its limits
