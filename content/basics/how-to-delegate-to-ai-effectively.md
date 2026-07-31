---
title: "How to Delegate to AI Effectively"
description: "Get better results from AI coding assistants. Prompting strategies, context management, and working iteratively—because AI builds exactly what you describe."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, ai, vibe-coding, productivity, prompting, development]
faqs:
  - question: "Why does AI keep generating wrong code?"
    answer: "Usually because the prompt is ambiguous or missing context. AI fills gaps with assumptions—often wrong ones. Better prompts with clear requirements, acceptance criteria, and context produce better results."
  - question: "Should I let AI write everything?"
    answer: "AI is a tool, not a replacement for understanding. Use it for implementation, but you need to understand enough to: describe what you want, verify the output, debug when it breaks, and make architectural decisions."
  - question: "How do I know if AI-generated code is good?"
    answer: "Test it. Run it. Check edge cases. Read it and make sure you understand what it does. AI can produce code that works but is insecure, inefficient, or unmaintainable. You're responsible for what ships."
last_updated: 2026-07-30
---

{{< quickanswer >}}
AI codes what you describe—describe poorly, get poor results. Effective AI delegation: provide context (what you're building, existing code patterns), clear requirements (user stories, acceptance criteria), and constraints (technologies, style). Work in small iterations, verify each piece, and build up incrementally rather than generating everything at once.
{{< /quickanswer >}}

## The delegation mindset

AI is like a very fast junior developer who:
- Knows a lot of patterns
- Works instantly
- Never gets tired
- But also: takes instructions literally, doesn't ask clarifying questions, and confidently produces wrong code

Your job shifts from writing code to directing code generation:
- Clear requirements
- Good context
- Verification
- Iteration

## Anatomy of a good prompt

### The structure

```markdown
## Context
What you're building, who it's for, relevant background

## Current State
What exists already, relevant code patterns, file structure

## Task
Specific thing to implement

## Requirements
Acceptance criteria, edge cases to handle

## Constraints
Technologies to use, patterns to follow, things to avoid

## Output Format
How you want the response structured
```

### Example: Bad vs Good

**Bad prompt:**
> "Add user authentication to my app"

AI doesn't know: What framework? Email/password or OAuth? Session or JWT? What UI? What existing patterns?

**Good prompt:**
```markdown
## Context
I'm building a Next.js 14 (App Router) task management app.
Currently no auth—all tasks are accessible to anyone.

## Current State
- Using Prisma with PostgreSQL
- Existing User model (id, email, name, createdAt)
- No auth library installed yet

## Task
Implement email/password authentication

## Requirements
- User can register with email + password
- User can log in with credentials
- User can log out
- Session persists across page refreshes
- Protected routes redirect to login
- After login, redirect to /dashboard

## Constraints
- Use NextAuth.js
- Hash passwords with bcrypt
- Follow existing Prisma schema patterns
- Keep existing UI styling (Tailwind)

## Out of Scope (separate tasks)
- Password reset
- OAuth providers
- Email verification
```

## Context matters

AI generates based on context. More relevant context = better output.

### Types of context

**Project context:**
- What you're building
- Who uses it
- What stage (prototype, production)

**Technical context:**
- Framework and versions
- Existing patterns in codebase
- Database schema
- API structure

**Code context:**
- Relevant existing files
- Types and interfaces
- Style conventions

### Providing code context

```markdown
## Existing code for reference

Task type (types/task.ts):
\`\`\`typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
\`\`\`

Existing component pattern (components/TaskItem.tsx):
\`\`\`tsx
export function TaskItem({ task }: { task: Task }) {
  return (
    <div className="p-4 border rounded">
      <span>{task.title}</span>
    </div>
  );
}
\`\`\`

Follow this pattern for the new component.
```

## Working iteratively

### Don't generate everything at once

**Bad approach:**
> "Build complete e-commerce checkout with cart, payment, shipping, email confirmation"

Result: 500 lines of code that sort of works but is hard to verify, debug, or modify.

**Better approach:**
```
Iteration 1: Add to cart button (verify it works)
Iteration 2: Cart page showing items (verify it works)
Iteration 3: Shipping address form (verify it works)
Iteration 4: Payment integration (verify it works)
Iteration 5: Confirmation page (verify it works)
```

Each iteration is small enough to verify and debug.

### The iteration cycle

```
1. Write focused prompt (one feature/slice)
2. AI generates code
3. Review the code (do you understand it?)
4. Test it (does it work?)
5. Verify edge cases (does it handle failures?)
6. Commit and move on
7. Next iteration builds on working code
```

## Prompting strategies

### Start with the interface

Ask for the type definitions first:
```
"What TypeScript interfaces would I need for a 
task management system with tasks, projects, and tags?"
```

Review, adjust, then use those types in subsequent prompts.

### Explain then implement

```
"First explain how you would approach implementing 
drag-and-drop reordering of tasks. Then implement it."
```

The explanation reveals the AI's understanding. Correct misconceptions before generating code.

### Constrain the solution

```
"Implement task filtering.
- Use URL query params for filter state
- Don't add any external libraries
- Keep the filter logic in a custom hook"
```

Without constraints, AI might use state, add a library, or scatter logic everywhere.

### Ask for options

```
"Give me 3 different approaches to implement 
real-time updates for the task list. 
Compare pros/cons of each."
```

Then choose the approach that fits your needs.

### Request explanations

```
"Implement the authentication flow and add 
comments explaining each step."
```

Code with explanations is easier to verify and modify later.

## Verification checklist

After AI generates code, check:

- [ ] **Does it compile/run?** (Basic sanity check)
- [ ] **Do you understand what it does?** (If not, ask for explanation)
- [ ] **Does it match your requirements?** (Check each acceptance criterion)
- [ ] **Does it handle errors?** (Try invalid inputs)
- [ ] **Is it secure?** (Check for SQL injection, XSS, leaked secrets)
- [ ] **Does it follow existing patterns?** (Consistent with codebase)
- [ ] **Is it maintainable?** (You'll need to modify it later)

## Common AI failure modes

### Hallucinated APIs

AI might use functions or libraries that don't exist, or use the wrong version's API.

**Fix**: Check docs. Verify imports work. Test the code.

### Ignoring context

Despite providing context, AI sometimes ignores it.

**Fix**: Be explicit about constraints. Reference existing code directly. Break into smaller tasks.

### Over-engineering

Asked for a simple solution, get an enterprise architecture.

**Fix**: "Keep it simple. No additional libraries. Minimal abstraction."

### Security issues

AI generates working but insecure code—SQL with string concatenation, unescaped output, hardcoded secrets.

**Fix**: Always review for security. See [Security basics for beginners](/basics/security-basics-for-beginners/).

### Copy-paste mistakes

AI copies from its training data, including mistakes, outdated patterns, or license-incompatible code.

**Fix**: Review all generated code. Test it. Understand it before shipping.

## Managing AI context (conversation)

### When to start fresh

Long conversations accumulate context that can confuse AI:
- When you pivot to a completely different feature
- When AI keeps repeating the same mistake
- When responses get incoherent

### Keep relevant context

When continuing work:
```
"Continuing from previous: we have the Task type 
and TaskItem component. Now implement the TaskList..."
```

Or explicitly provide the current state:
```
"Current implementation in TaskList.tsx:
[paste code]

Now add filtering by completed status."
```

### Clear previous mistakes

If AI made an error and you corrected it:
```
"Note: the previous version had a bug with X. 
The fix was Y. Keep this in mind for related work."
```

## Templates for common tasks

### New component
```markdown
Create a React component for [purpose].

Props:
- [prop]: [type] - [description]

Behavior:
- [describe interactions]

Styling:
- Use Tailwind
- Match existing components in [reference file]
```

### API endpoint
```markdown
Create an API endpoint: [METHOD] [path]

Request:
- Body/params: [describe]
- Auth required: [yes/no]

Response:
- Success (200): [describe shape]
- Errors: [list possible errors and codes]

Validation:
- [list validation rules]
```

### Database change
```markdown
Update the Prisma schema:

New model/field: [describe]

Relations: [describe]

After generating schema:
1. Create migration
2. Update relevant types
3. Update any queries affected
```

## The skill shift

Effective AI development requires:

| Old skill | New skill |
|-----------|-----------|
| Writing code | Describing requirements clearly |
| Debugging syntax | Verifying AI output |
| Memorizing APIs | Knowing what questions to ask |
| Typing fast | Thinking clearly about architecture |
| Solo implementation | Directing and reviewing |

You're still coding—just at a higher level of abstraction.

## Quick reference

```markdown
# Effective AI prompt template

## Context
[What you're building, current state]

## Task
[Specific, focused thing to implement]

## Requirements
- [Acceptance criterion 1]
- [Acceptance criterion 2]
- [Edge cases to handle]

## Constraints
- [Framework/library requirements]
- [Patterns to follow]
- [Things to avoid]

## Reference
[Relevant existing code]
```

## Further reading

- [How to slice work effectively](/basics/how-to-slice-work-effectively/): Break work into AI-sized tasks
- [How to write user stories](/basics/how-to-write-user-stories/): Define requirements clearly
- [Security basics for beginners](/basics/security-basics-for-beginners/): Review AI code for security
- [How to debug your code](/basics/how-to-debug-your-code/): When AI output doesn't work
