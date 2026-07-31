---
title: "What is JSON?"
description: "JSON is the universal language for sending data between apps. When you call an AI API, the response comes back as JSON. Here's what it actually is and how to use it."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, json, api, data, javascript, parsing]
faqs:
  - question: "Why is JSON so popular?"
    answer: "It's human-readable (you can look at it and understand it), lightweight (not much extra formatting), and supported by every programming language. It hit the sweet spot between 'easy for humans' and 'easy for computers'."
  - question: "What's the difference between JSON and a JavaScript object?"
    answer: "JSON is a text format—a string. A JavaScript object is actual code in memory. JSON has stricter rules: keys must be quoted, no trailing commas, no comments. You parse JSON to get an object; you stringify an object to get JSON."
  - question: "Can JSON include functions or dates?"
    answer: "No. JSON only supports strings, numbers, booleans, null, arrays, and objects. Dates are typically sent as strings (like '2026-07-30') and parsed on the receiving end. Functions can't be represented in JSON at all."
last_updated: 2026-07-30
---

{{< quickanswer >}}
JSON (JavaScript Object Notation) is a text format for structured data. When you call an AI API, the response is JSON. When you save settings in a config file, it's often JSON. It's the universal way to send data between systems because it's readable by humans and parseable by every programming language.
{{< /quickanswer >}}

## What JSON looks like

```json
{
  "name": "Claude",
  "type": "AI assistant",
  "capabilities": ["text generation", "code writing", "analysis"],
  "context_window": 200000,
  "is_available": true,
  "pricing": {
    "input": 3.00,
    "output": 15.00
  }
}
```

That's it. Curly braces, keys in quotes, values after colons, commas between items. You can read it without any training.

## Why vibecoders need to understand JSON

Every API you'll ever use speaks JSON:

**AI APIs**: When you call OpenAI, Anthropic, or any LLM provider, you send JSON and receive JSON.

```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "messages": [
    {"role": "user", "content": "Explain webhooks"}
  ]
}
```

**Config files**: Your `package.json`, `tsconfig.json`, and many settings files are JSON.

**Database responses**: When your app queries a database through an API, results come back as JSON.

**Webhooks**: When Stripe tells you about a payment, the payload is JSON.

If you can't read JSON, you can't debug your app.

## The six data types in JSON

JSON is surprisingly simple. Everything is one of these six types:

| Type | Example | Notes |
|------|---------|-------|
| **String** | `"hello"` | Always double-quoted |
| **Number** | `42`, `3.14`, `-7` | No quotes, no units |
| **Boolean** | `true`, `false` | Lowercase, no quotes |
| **Null** | `null` | Represents "nothing" |
| **Array** | `[1, 2, 3]` | Ordered list in brackets |
| **Object** | `{"key": "value"}` | Key-value pairs in braces |

You can nest these infinitely. An object can contain arrays that contain objects that contain arrays.

## Reading JSON responses from AI APIs

When you call Claude's API, you get back something like:

```json
{
  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Hello! How can I help you today?"
    }
  ],
  "model": "claude-sonnet-4-20250514",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 12,
    "output_tokens": 15
  }
}
```

To get the actual response text, you'd access: `response.content[0].text`

Understanding this structure is how you extract the parts you need.

## Parsing JSON in code

JSON is text. To work with it, you parse it into your language's native data structure.

**JavaScript/TypeScript:**
```javascript
const jsonString = '{"name": "Claude", "tokens": 200000}';
const data = JSON.parse(jsonString);  // Parse text → object
console.log(data.name);  // "Claude"

const backToJson = JSON.stringify(data);  // Object → text
```

**Python:**
```python
import json

json_string = '{"name": "Claude", "tokens": 200000}'
data = json.loads(json_string)  # Parse text → dict
print(data["name"])  # "Claude"

back_to_json = json.dumps(data)  # Dict → text
```

## Common JSON mistakes

**Trailing commas**: Not allowed in JSON (but allowed in JavaScript)
```json
// ❌ Invalid JSON
{ "name": "Claude", "type": "assistant", }

// ✅ Valid JSON  
{ "name": "Claude", "type": "assistant" }
```

**Single quotes**: JSON requires double quotes
```json
// ❌ Invalid JSON
{ 'name': 'Claude' }

// ✅ Valid JSON
{ "name": "Claude" }
```

**Unquoted keys**: Keys must be strings in quotes
```json
// ❌ Invalid JSON
{ name: "Claude" }

// ✅ Valid JSON
{ "name": "Claude" }
```

**Comments**: JSON doesn't support comments
```json
// ❌ Invalid JSON
{
  "name": "Claude"  // This is the AI name
}

// ✅ Valid JSON (no comments possible)
{
  "name": "Claude"
}
```

When your API call fails with a parsing error, check these first.

## JSON vs. other formats

| Format | Use case | Looks like |
|--------|----------|------------|
| **JSON** | APIs, configs, data exchange | `{"key": "value"}` |
| **YAML** | Human-edited configs (K8s, GitHub Actions) | `key: value` (indentation-based) |
| **XML** | Legacy systems, some enterprise APIs | `<key>value</key>` |
| **CSV** | Spreadsheet data, simple tables | `name,age\nClaude,2` |

JSON won the API war because it's less verbose than XML and more strict than YAML (which can be ambiguous).

## Validating JSON

When your app breaks and you suspect JSON issues:

**Online validators**: Paste JSON into [jsonlint.com](https://jsonlint.com/) to find syntax errors.

**Pretty printing**: If JSON is all on one line, format it to read it:
```bash
echo '{"name":"Claude","type":"assistant"}' | python -m json.tool
```

**Schema validation**: For serious projects, JSON Schema lets you define what structure is valid:
```json
{
  "type": "object",
  "required": ["name", "type"],
  "properties": {
    "name": { "type": "string" },
    "type": { "type": "string" }
  }
}
```

## Real example: building an AI request

Here's how you'd structure a request to an AI API:

```javascript
const requestBody = {
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content: "What is JSON?"
    }
  ]
};

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY
  },
  body: JSON.stringify(requestBody)  // Convert object to JSON string
});

const data = await response.json();  // Parse JSON response
console.log(data.content[0].text);   // Extract the answer
```

The pattern: build an object → stringify to JSON → send → parse response → extract what you need.

## Further reading

- [What is an API?](/basics/what-is-an-api/): How JSON fits into API communication
- [What is an API key?](/basics/what-is-an-api-key/): The authentication piece of API calls
- [What is a webhook?](/basics/what-is-a-webhook/): When APIs push JSON to you
