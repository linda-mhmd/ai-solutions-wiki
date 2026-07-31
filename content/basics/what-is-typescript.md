---
title: "What is TypeScript?"
description: "JavaScript with types. Catch errors before running your code, get better autocomplete, and understand codebases faster."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, typescript, javascript, programming, types]
faqs:
  - question: "Do I need TypeScript?"
    answer: "For small personal projects, no. For anything you'll maintain over time, work on with others, or that handles important data, TypeScript catches bugs and makes code easier to understand. Most modern projects use it."
  - question: "Is TypeScript harder to learn?"
    answer: "There's a learning curve, but it's JavaScript plus type annotations. Start with basic types (string, number, boolean) and let the IDE guide you. You can gradually add more types as you learn."
  - question: "Can I use JavaScript libraries in TypeScript?"
    answer: "Yes. Most popular libraries include types or have community type definitions (@types/library-name). If there are no types, you can use the library anyway—TypeScript will treat it as 'any'."
last_updated: 2026-07-30
---

{{< quickanswer >}}
TypeScript is JavaScript with type checking. Instead of finding bugs when your code runs, TypeScript finds them while you write. You declare what types your variables and functions expect, and TypeScript warns you when something doesn't match. It compiles to regular JavaScript.
{{< /quickanswer >}}

## The problem TypeScript solves

JavaScript is flexible:

```javascript
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

greet("Alice");     // "Hello, ALICE" ✓
greet(42);          // Crash! 42.toUpperCase is not a function
greet(undefined);   // Crash! Cannot read properties of undefined
```

You don't find out until the code runs. In production. With real users.

TypeScript catches this while you're writing:

```typescript
function greet(name: string) {  // Must be a string
  return "Hello, " + name.toUpperCase();
}

greet("Alice");     // ✓
greet(42);          // Error: Argument of type 'number' is not assignable
greet(undefined);   // Error: Argument of type 'undefined' is not assignable
```

## Basic types

```typescript
// Primitives
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let names: string[] = ["Alice", "Bob"];
let ages: number[] = [25, 30, 35];

// Objects
let user: { name: string; age: number } = {
  name: "Alice",
  age: 30
};
```

## Type annotations

Add `: type` after variable names and parameters:

```typescript
// Variable
let count: number = 0;

// Function parameter
function greet(name: string) {
  return "Hello, " + name;
}

// Function return type
function add(a: number, b: number): number {
  return a + b;
}

// Optional parameter (can be undefined)
function greet(name?: string) {
  return name ? `Hello, ${name}` : "Hello";
}
```

## Interfaces and Types

Define shapes for objects:

```typescript
// Interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional
}

// Use it
function displayUser(user: User) {
  console.log(user.name);
}

// Type alias (similar to interface)
type Point = {
  x: number;
  y: number;
};
```

## Why bother?

### 1. Catch bugs early

```typescript
// Bug caught immediately, not in production
user.nmae  // Error: Property 'nmae' does not exist. Did you mean 'name'?
```

### 2. Better autocomplete

Your IDE knows what properties and methods are available:

```typescript
user.  // IDE shows: id, name, email, age
```

No more guessing or checking documentation.

### 3. Self-documenting code

```typescript
// What does this function expect? What does it return?
function processOrder(order: Order, options: ProcessOptions): Receipt {
  // ...
}
```

The types tell you what to pass and what you get back.

### 4. Refactoring confidence

Change a type, and TypeScript shows everywhere that needs updating:

```typescript
// Change User.email to User.emailAddress
// TypeScript shows every place using the old name
```

### 5. Better API understanding

```typescript
// What does fetch return?
const response: Response = await fetch(url);
// IDE shows all Response methods: json(), text(), ok, status, etc.
```

## TypeScript vs JavaScript

| JavaScript | TypeScript |
|------------|------------|
| `.js` files | `.ts` files |
| Runs directly | Compiles to JavaScript first |
| Errors at runtime | Errors at compile time |
| No type info | Full type checking |
| Flexible | Stricter |

TypeScript compiles to JavaScript:
```
TypeScript (.ts) → Compiler (tsc) → JavaScript (.js) → Runs in browser/Node
```

## Common patterns

### Union types (this OR that)

```typescript
// Can be string or number
let id: string | number;
id = "abc123";  // ✓
id = 123;       // ✓
id = true;      // Error

// Common with null
let user: User | null = null;
```

### Literal types (specific values)

```typescript
type Status = "pending" | "approved" | "rejected";

let orderStatus: Status = "pending";  // ✓
let orderStatus: Status = "cancelled"; // Error: not in the union
```

### Generics (reusable types)

```typescript
// Array of anything
function first<T>(items: T[]): T {
  return items[0];
}

first<string>(["a", "b"]);  // Returns string
first<number>([1, 2, 3]);   // Returns number
```

### Type assertions (you know better)

```typescript
// When you know more than TypeScript
const element = document.getElementById("app") as HTMLDivElement;

// Or
const element = <HTMLDivElement>document.getElementById("app");
```

## Working with existing JavaScript

### Using JavaScript libraries

Most libraries have types. Install them:

```bash
npm install axios                  # Library
npm install -D @types/axios        # Types (if separate)
```

Many modern libraries include types already.

### Gradual adoption

You can mix JavaScript and TypeScript:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,       // Allow .js files
    "checkJs": false       // Don't type-check .js
  }
}
```

Add TypeScript file by file. No need to convert everything at once.

## Setting up TypeScript

### In a new project

```bash
# Create React app with TypeScript
npx create-react-app my-app --template typescript

# Create Next.js app with TypeScript
npx create-next-app@latest my-app --typescript

# Manual setup
npm install -D typescript
npx tsc --init  # Creates tsconfig.json
```

### tsconfig.json basics

```json
{
  "compilerOptions": {
    "target": "ES2020",           // JavaScript version to output
    "module": "commonjs",         // Module system
    "strict": true,               // Enable all strict checks
    "esModuleInterop": true,      // Better import compatibility
    "outDir": "./dist"            // Where to put compiled JS
  },
  "include": ["src/**/*"]         // What files to compile
}
```

## Common errors and fixes

### "Type 'X' is not assignable to type 'Y'"

You're using the wrong type.

```typescript
const age: number = "30";  // Error
const age: number = 30;    // ✓
```

### "Property 'X' does not exist on type 'Y'"

You're accessing something that doesn't exist on that type.

```typescript
user.nmae  // Error: did you mean 'name'?
user.name  // ✓
```

### "Object is possibly 'null'"

TypeScript knows something might be null:

```typescript
const element = document.getElementById("app");  // HTMLElement | null
element.style.color = "red";  // Error: element might be null

// Fix: check first
if (element) {
  element.style.color = "red";  // ✓
}

// Or: assert it exists (if you're sure)
element!.style.color = "red";
```

### "'X' is declared but never used"

Remove unused variables, or prefix with underscore:

```typescript
function process(_unusedParam: string, data: Data) {
  return data;
}
```

## Quick reference

```typescript
// Basic types
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let arr: string[] = ["a", "b"];

// Object type
let obj: { name: string; age: number } = { name: "Alice", age: 30 };

// Interface
interface User {
  name: string;
  email: string;
  age?: number;  // optional
}

// Function
function add(a: number, b: number): number {
  return a + b;
}

// Union
let id: string | number;

// Type assertion
const el = document.getElementById("app") as HTMLDivElement;

// Generics
function first<T>(arr: T[]): T { return arr[0]; }
```

## Should you use TypeScript?

**Yes, if:**
- Project will be maintained over time
- Working with a team
- Building anything important
- You want better tooling/autocomplete
- Codebase is getting complex

**Maybe not, if:**
- Quick throwaway script
- Just learning JavaScript basics
- Very small personal project

Most modern projects use TypeScript. The initial learning curve pays off quickly in fewer bugs and better developer experience.

## Further reading

- [What is a programming language?](/basics/what-is-a-programming-language/): Where TypeScript fits
- [Why programming languages exist](/basics/why-programming-languages-exist/): Language tradeoffs
- [How to read documentation](/basics/how-to-read-documentation/): TypeScript docs can be dense
- [Common error messages explained](/basics/common-error-messages-explained/): TypeScript error patterns
