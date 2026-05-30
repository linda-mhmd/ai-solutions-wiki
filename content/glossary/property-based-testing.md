---
title: "Property-Based Testing"
description: "What property-based testing is, why it is ideal for AI systems that cannot be tested with exact-output assertions, and the tools available in Python and JavaScript."
date: 2026-03-25
categories: [Glossary]
tags: ["software-engineering", "intermediate", "property-based-testing", "testing", "randomized", "invariants", "quality"]
related:
  - guides/testing-ai-systems
  - guides/ci-cd-for-ai
  - glossary/ci-cd
  - patterns/circuit-breaker-ai
last_updated: 2026-05-30
---

Property-based testing is a testing technique where you describe properties that should hold for all valid inputs, and the testing framework automatically generates hundreds or thousands of inputs to find counterexamples. If a generated input violates the property, the framework reports it as a test failure and often "shrinks" the input to the simplest case that still fails.

This contrasts with example-based testing, where you manually write specific input/output pairs: `assert add(2, 3) == 5`. Property-based testing instead says: `for all integers a and b, add(a, b) should equal add(b, a)` - and lets the framework try to find inputs where that fails.

## Why Property-Based Testing Suits AI Systems

AI systems are particularly well-suited to property-based testing because their outputs are non-deterministic. You cannot write `assert model.invoke("What is 2+2?") == "4"` and expect it to pass reliably. But you can write properties that should hold across all outputs:

- Structured output (JSON) always parses successfully when the model is instructed to return JSON
- Output length never exceeds the configured maximum tokens
- Confidence scores are always between 0 and 1
- Retrieved chunks always belong to the indexed document collection
- The response always contains at least one sentence
- Classification labels are always drawn from the allowed set

These properties test the shape and constraints of AI outputs without asserting specific content. They catch a wide class of bugs: malformed responses, out-of-bounds values, empty responses, and constraint violations.

## Testing Deterministic Pipeline Logic

Property-based testing is even more valuable for the deterministic components around AI calls. The chunking logic, prompt template rendering, output parsing, metadata extraction, and retrieval ranking are all deterministic and can be thoroughly tested with property-based approaches.

Properties for a document chunker:
- No chunk is empty
- No chunk exceeds the configured maximum size
- Every token in the original document appears in at least one chunk
- Chunks produced from a document are a deterministic function of the document and configuration

These properties, tested against thousands of generated inputs, catch edge cases that manual example selection would miss: documents with only whitespace, documents with no natural sentence boundaries, very long single words, Unicode edge cases.

## Hypothesis (Python)

Hypothesis is the standard property-based testing library for Python. It integrates with pytest and generates inputs based on strategies you define.

```python
from hypothesis import given, settings, strategies as st
from your_chunker import chunk_text

@given(
    text=st.text(min_size=1, max_size=50000),
    chunk_size=st.integers(min_value=100, max_value=2000),
    overlap=st.integers(min_value=0, max_value=200)
)
@settings(max_examples=500)
def test_chunker_properties(text, chunk_size, overlap):
    chunks = chunk_text(text, chunk_size=chunk_size, overlap=overlap)
    # Property 1: no empty chunks
    assert all(len(c) > 0 for c in chunks)
    # Property 2: chunks do not exceed configured size
    assert all(len(c) <= chunk_size + overlap for c in chunks)
```

Hypothesis has built-in strategies for text, integers, floats, lists, dictionaries, and more. It also remembers previously found failures and re-tests them on every run, preventing regressions.

## fast-check (JavaScript/TypeScript)

fast-check is the equivalent library for JavaScript and TypeScript.

```typescript
import fc from "fast-check";
import { parseModelResponse } from "./parser";

test("model response parser never throws", () => {
  fc.assert(
    fc.property(fc.string(), (rawResponse) => {
      const result = parseModelResponse(rawResponse);
      // Parser should return an error object, not throw
      expect(result).toBeDefined();
      expect(typeof result.error === "string" || result.data !== undefined).toBe(true);
    })
  );
});
```

## Integrating with CI

Property-based tests run as standard test suite items. In CI, set the `max_examples` parameter to a higher value than in local development to increase coverage at the cost of longer CI times. A typical configuration runs 100 examples locally and 1,000 examples in CI.

When Hypothesis or fast-check finds a failing case, it outputs the minimal shrunk example that triggers the failure. This is usually immediately actionable - the simplest input that breaks your property is often exactly what you need to understand the bug.

## Sources

- Claessen, K., & Hughes, J. (2000). QuickCheck: A lightweight tool for random testing of Haskell programs. *ICFP 2000*. (Original QuickCheck paper; defined property-based testing, shrinking, and the generator abstraction that Hypothesis and fast-check implement.)
- MacIver, D., et al. (2019). Hypothesis: A new approach to property-based testing. *Journal of Open Source Software, 4*(43). (Hypothesis; the primary Python property-based testing library; describes the Conjecture algorithm for finding and shrinking counterexamples.)
- Fink, G., & Bishop, M. (1997). Property-based testing: A new approach to testing for assurance. *ACM SIGSOFT Software Engineering Notes, 22*(4), 74–80. (Formal properties as test oracles; theoretical basis for testing non-deterministic systems like AI pipelines.)
