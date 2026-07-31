---
title: "What is the DOM?"
description: "The Document Object Model—the tree structure browsers build from HTML that JavaScript manipulates. Why 'document.getElementById' works."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, javascript, web, html, browser, dom]
faqs:
  - question: "Do I need to know DOM manipulation if I use React?"
    answer: "Not much. React handles DOM manipulation for you—that's the point. But understanding what React is doing under the hood helps when debugging, dealing with refs, or integrating non-React libraries."
  - question: "Why is direct DOM manipulation 'bad' in React?"
    answer: "React tracks what the DOM should look like. If you change the DOM directly, React doesn't know, and things can get out of sync. Use React's state and refs instead. Direct DOM manipulation is fine in vanilla JS or when absolutely necessary."
  - question: "What's the difference between the DOM and HTML?"
    answer: "HTML is the text file you write. The DOM is the live tree structure the browser builds from that HTML. The DOM can change (via JavaScript) while the original HTML stays the same."
last_updated: 2026-07-30
---

{{< quickanswer >}}
The DOM (Document Object Model) is how browsers represent your HTML as a tree of objects that JavaScript can manipulate. When you write `document.getElementById('button')`, you're accessing the DOM. When JavaScript changes text on a page, it's changing the DOM. React, Vue, and other frameworks are essentially tools for managing DOM updates efficiently.
{{< /quickanswer >}}

## What the DOM is

When a browser loads HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>World</p>
  </body>
</html>
```

It builds a tree structure in memory:

```
document
└── html
    ├── head
    │   └── title
    │       └── "My Page"
    └── body
        ├── h1
        │   └── "Hello"
        └── p
            └── "World"
```

This tree is the DOM. Each element is a "node" that JavaScript can access and modify.

## Why it matters

The DOM is the interface between your code and what users see.

**Without the DOM**, JavaScript couldn't:
- Change text on the page
- Show/hide elements
- Respond to clicks
- Create interactive experiences

**With the DOM**, JavaScript can do anything:
```javascript
// Change content
document.querySelector('h1').textContent = 'Goodbye';

// Change styles
document.querySelector('p').style.color = 'red';

// Add elements
document.body.appendChild(document.createElement('div'));

// Remove elements
document.querySelector('p').remove();
```

## Basic DOM operations

### Finding elements

```javascript
// By ID (fastest, returns single element)
const header = document.getElementById('main-header');

// By CSS selector (returns first match)
const button = document.querySelector('.submit-btn');

// By CSS selector (returns all matches)
const items = document.querySelectorAll('.list-item');

// By class name
const cards = document.getElementsByClassName('card');

// By tag name
const paragraphs = document.getElementsByTagName('p');
```

### Changing content

```javascript
// Change text
element.textContent = 'New text';

// Change HTML (be careful with user input—XSS risk)
element.innerHTML = '<strong>Bold text</strong>';

// Change attribute
element.setAttribute('href', 'https://example.com');
element.href = 'https://example.com';  // Shorthand for common attributes

// Change style
element.style.color = 'blue';
element.style.display = 'none';

// Change classes
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('visible');
```

### Creating and removing elements

```javascript
// Create
const newDiv = document.createElement('div');
newDiv.textContent = 'I am new';
newDiv.className = 'my-class';

// Add to page
document.body.appendChild(newDiv);
parentElement.insertBefore(newDiv, referenceElement);

// Remove
element.remove();
parentElement.removeChild(childElement);
```

### Handling events

```javascript
// Listen for clicks
button.addEventListener('click', () => {
  console.log('Button clicked!');
});

// Listen for input
input.addEventListener('input', (event) => {
  console.log('Value:', event.target.value);
});

// Listen for form submit
form.addEventListener('submit', (event) => {
  event.preventDefault();  // Stop page reload
  console.log('Form submitted');
});

// Remove listener
button.removeEventListener('click', handlerFunction);
```

## DOM vs HTML

HTML is static text:
```html
<p id="greeting">Hello</p>
```

The DOM is a live object that can change:
```javascript
document.getElementById('greeting').textContent = 'Goodbye';
// The HTML file didn't change, but the DOM did
// User sees "Goodbye"
```

**The original HTML never changes**. The DOM is a living representation that JavaScript modifies.

## DOM and frameworks (React, Vue)

Frameworks exist because manual DOM manipulation is:
- **Tedious**: Lots of code to write
- **Error-prone**: Easy to forget updates
- **Slow**: Naive updates can hurt performance

### Vanilla JavaScript approach

```javascript
// Update when data changes
let count = 0;
const button = document.getElementById('counter');
const display = document.getElementById('count');

button.addEventListener('click', () => {
  count++;
  display.textContent = count;  // Manual DOM update
});
```

### React approach

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <span>{count}</span>  {/* React handles DOM update */}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

React tracks state, calculates what changed, and updates only the necessary DOM nodes efficiently.

## The Virtual DOM

React (and Vue) use a "virtual DOM"—a JavaScript object representing what the DOM should look like.

```
1. State changes
2. React builds new virtual DOM
3. React compares with previous virtual DOM
4. React calculates minimal changes needed
5. React applies only those changes to real DOM
```

This is faster than naively updating everything.

## When you still need direct DOM access

Even with React, sometimes you need the real DOM:

### Focus management
```jsx
function SearchForm() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();  // Direct DOM access
  }, []);
  
  return <input ref={inputRef} />;
}
```

### Measuring elements
```jsx
function Tooltip() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    setHeight(ref.current.offsetHeight);  // Direct DOM measurement
  }, []);
  
  return <div ref={ref}>Content</div>;
}
```

### Third-party libraries
```jsx
function Chart() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Library needs DOM element
    new ChartLibrary(containerRef.current, data);
  }, []);
  
  return <div ref={containerRef} />;
}
```

## Common DOM gotchas

### Element doesn't exist yet

```javascript
// This runs before HTML is parsed
const button = document.getElementById('my-button');  // null!

// Fix: wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('my-button');  // Works
});

// Or put script at end of body
// Or use defer attribute: <script defer src="app.js">
```

### NodeList isn't an array

```javascript
const items = document.querySelectorAll('.item');
items.forEach(item => { /* works */ });
items.map(item => item.textContent);  // Error! Not an array

// Fix: convert to array
Array.from(items).map(item => item.textContent);
[...items].map(item => item.textContent);
```

### Changing innerHTML destroys event listeners

```javascript
container.innerHTML = '<button>Click</button>';
// Old event listeners on container's children are gone!
```

### Live vs static collections

```javascript
// getElementsByClassName returns LIVE collection
const items = document.getElementsByClassName('item');
// If you add/remove .item elements, collection updates automatically

// querySelectorAll returns STATIC collection
const items = document.querySelectorAll('.item');
// Collection won't change even if DOM changes
```

## Browser DevTools and the DOM

The Elements tab in DevTools shows the DOM (not the original HTML):

1. Right-click element → Inspect
2. See the live DOM tree
3. Edit elements directly
4. Watch changes from JavaScript

**Console access:**
```javascript
// In DevTools console
$0  // Currently selected element
$$('.class')  // Shorthand for querySelectorAll
```

## Quick reference

```javascript
// Find elements
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('.class')

// Content
element.textContent = 'text'
element.innerHTML = '<b>html</b>'

// Attributes
element.setAttribute('name', 'value')
element.getAttribute('name')
element.removeAttribute('name')

// Classes
element.classList.add('class')
element.classList.remove('class')
element.classList.toggle('class')
element.classList.contains('class')

// Styles
element.style.property = 'value'

// Create/remove
document.createElement('div')
parent.appendChild(child)
element.remove()

// Events
element.addEventListener('click', handler)
element.removeEventListener('click', handler)

// Navigation
element.parentElement
element.children
element.firstElementChild
element.nextElementSibling
```

## Further reading

- [What is JavaScript?](/glossary/javascript/): The language that manipulates the DOM
- [What is SSR vs CSR?](/basics/what-is-ssr-vs-csr/): How the DOM gets built
- [How to debug your code](/basics/how-to-debug-your-code/): Using DevTools with the DOM
- [Security basics for beginners](/basics/security-basics-for-beginners/): XSS and innerHTML dangers
