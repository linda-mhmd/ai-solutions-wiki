---
title: "Playwright Testing Guide for AI Applications"
description: "Comprehensive Playwright guide: setup, page objects, selectors, assertions, network interception for mocking AI APIs, visual comparison, parallel execution, and CI integration."
date: 2026-03-28
categories: [Guides]
tags: [playwright, testing, browser-automation, e2e, ai-engineering]
related:
  - guides/e2e-testing-ai-products
  - comparisons/playwright-vs-cypress
  - glossary/playwright
  - glossary/end-to-end-testing
last_updated: 2026-05-30
---

Playwright is a browser automation framework from Microsoft that supports Chromium, Firefox, and WebKit. For AI applications, Playwright's network interception, streaming response handling, and async-first design make it the strongest choice for end-to-end testing. This guide covers setup through CI integration with patterns specific to AI-powered UIs.

## Setup

Install Playwright with its test runner and browsers.

```bash
# Python
pip install playwright pytest-playwright
playwright install --with-deps chromium

# Node.js
npm init playwright@latest
```

Basic test structure (Python):

```python
# tests/e2e/test_chat.py
from playwright.sync_api import Page, expect

def test_homepage_loads(page: Page):
    page.goto("http://localhost:3000")
    expect(page).to_have_title("AI Assistant")
```

## Page Objects

Encapsulate page interactions in page object classes to keep tests readable and maintainable.

```python
class ChatPage:
    def __init__(self, page: Page):
        self.page = page
        self.input = page.get_by_placeholder("Type your message")
        self.send_button = page.get_by_role("button", name="Send")
        self.messages = page.locator(".message-bubble")
        self.streaming_indicator = page.locator("[data-testid='streaming']")

    def goto(self):
        self.page.goto("http://localhost:3000/chat")
        return self

    def send_message(self, text: str):
        self.input.fill(text)
        self.send_button.click()
        return self

    def wait_for_response(self, timeout: int = 30000):
        self.streaming_indicator.wait_for(state="visible", timeout=5000)
        self.streaming_indicator.wait_for(state="hidden", timeout=timeout)
        return self

    def get_last_response(self) -> str:
        return self.messages.last.inner_text()

# Usage in tests
def test_chat_conversation(page: Page):
    chat = ChatPage(page).goto()
    chat.send_message("What is machine learning?")
    chat.wait_for_response()
    response = chat.get_last_response()
    assert len(response) > 20
```

## Selectors

Prefer accessible selectors that are resilient to UI changes.

```python
# Preferred: role-based and test-id selectors
page.get_by_role("button", name="Send")
page.get_by_placeholder("Ask a question")
page.get_by_text("Analysis complete")
page.get_by_test_id("chat-response")

# Acceptable: data attributes
page.locator("[data-testid='message-input']")

# Avoid: CSS class selectors (fragile)
page.locator(".btn-primary-lg.mt-4")  # Breaks when styles change
```

## Assertions

Playwright provides auto-retrying assertions via the `expect` API.

```python
from playwright.sync_api import expect

# Element visibility
expect(page.get_by_text("Response")).to_be_visible(timeout=30000)

# Text content (with auto-retry)
expect(page.locator(".response")).to_contain_text("machine learning")

# Element count
expect(page.locator(".message-bubble")).to_have_count(3)

# Input value
expect(page.get_by_placeholder("Ask")).to_have_value("")

# URL
expect(page).to_have_url("http://localhost:3000/chat")
```

## Network Interception for Mocking AI APIs

This is the most important Playwright feature for AI application testing. Intercept API calls to return deterministic responses.

```python
def test_chat_with_mocked_api(page: Page):
    # Mock the streaming chat endpoint
    def handle_chat(route):
        route.fulfill(
            status=200,
            content_type="text/event-stream",
            body="data: {\"token\": \"Machine \"}\n\ndata: {\"token\": \"learning \"}\n\ndata: {\"token\": \"is great.\"}\n\ndata: [DONE]\n\n"
        )

    page.route("**/api/chat", handle_chat)

    chat = ChatPage(page).goto()
    chat.send_message("What is ML?")
    chat.wait_for_response()
    assert "Machine learning is great." in chat.get_last_response()

def test_api_error_handling(page: Page):
    page.route("**/api/chat", lambda route: route.fulfill(
        status=500,
        content_type="application/json",
        body='{"error": "Internal server error"}'
    ))

    chat = ChatPage(page).goto()
    chat.send_message("Test")
    expect(page.get_by_text("Something went wrong")).to_be_visible(timeout=10000)
```

**Selective mocking:** Mock the AI API but let other requests (CSS, JS, images) pass through.

```python
def test_with_selective_mocking(page: Page):
    def route_handler(route):
        if "/api/chat" in route.request.url:
            route.fulfill(status=200, body='{"response": "Mocked answer"}')
        else:
            route.continue_()

    page.route("**/*", route_handler)
```

## Testing Streaming Chat UIs

Streaming responses require special handling because content appears incrementally.

```python
def test_streaming_tokens_appear_incrementally(page: Page):
    tokens = ["Hello", " world", ", how", " are", " you?"]
    token_index = {"current": 0}

    def slow_stream(route):
        """Simulate slow streaming to test incremental rendering."""
        body = ""
        for token in tokens:
            body += f"data: {{\"token\": \"{token}\"}}\n\n"
        body += "data: [DONE]\n\n"
        route.fulfill(status=200, content_type="text/event-stream", body=body)

    page.route("**/api/chat", slow_stream)
    chat = ChatPage(page).goto()
    chat.send_message("Hi")
    chat.wait_for_response()

    final_text = chat.get_last_response()
    assert "Hello world, how are you?" in final_text
```

## Visual Comparison

Catch layout regressions caused by unexpected AI output lengths or formats.

```python
def test_chat_layout_snapshot(page: Page):
    page.route("**/api/chat", lambda route: route.fulfill(
        status=200,
        body='{"response": "A concise test response for visual comparison."}'
    ))

    chat = ChatPage(page).goto()
    chat.send_message("Test")
    chat.wait_for_response()

    # Compare against stored screenshot
    expect(page).to_have_screenshot("chat-response.png", max_diff_pixel_ratio=0.01)
```

Update screenshots with `pytest --update-snapshots` when intentional UI changes occur.

## Parallel Execution

Run tests in parallel to reduce suite execution time.

```bash
# Python: run across 4 workers
pytest tests/e2e/ -n 4

# Node.js: Playwright's built-in parallelism
npx playwright test --workers=4

# CI sharding
npx playwright test --shard=1/4
```

Each worker gets its own browser context, so tests are isolated by default.

## CI Integration

```yaml
# GitHub Actions
name: E2E Tests
on: [pull_request]
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build && npm start &
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

Upload the Playwright HTML report as a CI artifact on failure. It includes screenshots, traces, and video recordings that make debugging failures straightforward without reproducing them locally.

## Configuration

```python
# playwright.config.py (or conftest.py for pytest-playwright)
@pytest.fixture(scope="session")
def browser_type_launch_args():
    return {"headless": True}

@pytest.fixture(scope="session")
def browser_context_args():
    return {
        "viewport": {"width": 1280, "height": 720},
        "record_video_dir": "test-results/videos/" if os.getenv("CI") else None,
    }
```

Enable video recording only in CI to capture failure context without slowing down local development.
