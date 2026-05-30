---
title: "Test Data Management for AI Systems"
description: "Managing test data for AI: synthetic data generation, fixture design, golden datasets for regression, data versioning, anonymization, and seeding vector databases."
date: 2026-03-28
categories: [Guides]
tags: [test-data, testing, data-management, ai-engineering, fixtures]
related:
  - guides/testing-ai-systems
  - guides/testing-rag-systems
  - glossary/golden-dataset
  - glossary/test-fixture
last_updated: 2026-05-30
---

AI systems are data-intensive, and their tests need data that is representative, reproducible, and safely managed. Unlike traditional applications where a few rows of test data suffice, AI tests may need hundreds of labeled examples, populated vector databases, and realistic document corpora. Poor test data management leads to brittle tests, false confidence, and data leakage risks.

## Synthetic Test Data Generation

Generating synthetic test data avoids privacy concerns and lets you control data characteristics precisely.

**For text classification:**

```python
import json
from dataclasses import dataclass

@dataclass
class SyntheticTestCase:
    text: str
    expected_label: str
    difficulty: str  # easy, medium, hard

def generate_sentiment_test_data() -> list[SyntheticTestCase]:
    """Generate synthetic sentiment test cases with known labels."""
    return [
        SyntheticTestCase("This product is absolutely wonderful!", "positive", "easy"),
        SyntheticTestCase("Terrible experience, never buying again.", "negative", "easy"),
        SyntheticTestCase("The item arrived on time.", "neutral", "medium"),
        SyntheticTestCase("It works, I guess.", "neutral", "hard"),  # Ambiguous
        SyntheticTestCase("Not bad, not great.", "neutral", "hard"),
    ]
```

**Using LLMs to generate test data:**

```python
def generate_test_questions(documents: list[str], n_per_doc: int = 5) -> list[dict]:
    """Use an LLM to generate question-answer pairs from documents."""
    test_cases = []
    for doc in documents:
        prompt = f"""Given this document, generate {n_per_doc} question-answer pairs.
        Return JSON array: [{{"question": "...", "answer": "...", "source_quote": "..."}}]

        Document: {doc}"""
        response = llm.generate(prompt, response_format="json")
        pairs = json.loads(response)
        for pair in pairs:
            pair["source_document"] = doc
            test_cases.append(pair)
    return test_cases
```

Review LLM-generated test data manually before adding it to your test suite. Automated generation scales the quantity, but human review ensures quality.

## Test Fixture Design

Structure test fixtures for reusability and clarity.

```
tests/
  fixtures/
    documents/
      short_article.txt          # < 500 words
      long_report.pdf            # Multi-page document
      table_heavy.html           # Document with complex tables
      multilingual.txt           # Mixed-language content
    embeddings/
      sample_embeddings.json     # Pre-computed embeddings for fixture docs
    model_responses/
      classification_valid.json  # Well-formed classification response
      classification_error.json  # Malformed response
      rag_response.json          # RAG pipeline response
    golden/
      qa_golden_v3.json          # Versioned golden dataset
      classification_golden.csv  # Labeled classification examples
```

**Fixture loading utilities:**

```python
import json
from pathlib import Path

FIXTURE_DIR = Path(__file__).parent / "fixtures"

def load_fixture(relative_path: str) -> str:
    return (FIXTURE_DIR / relative_path).read_text()

def load_json_fixture(relative_path: str) -> dict:
    return json.loads(load_fixture(relative_path))

@pytest.fixture
def sample_document():
    return load_fixture("documents/short_article.txt")

@pytest.fixture
def golden_qa_dataset():
    return load_json_fixture("golden/qa_golden_v3.json")
```

## Golden Datasets for Regression Testing

A golden dataset is a curated, labeled set of test cases used to measure model quality over time. It serves as the ground truth for regression testing.

**Building a golden dataset:**

1. Collect representative inputs from production logs (anonymized)
2. Generate outputs from your current pipeline
3. Have domain experts review and correct the outputs
4. Label each case with the correct answer and quality criteria
5. Version the dataset (golden_v1, golden_v2) as it evolves

**Using golden datasets in CI:**

```python
def test_against_golden_dataset():
    golden = load_json_fixture("golden/qa_golden_v3.json")
    results = {"pass": 0, "fail": 0}

    for case in golden:
        response = pipeline.run(case["question"])
        score = evaluate(response, case["expected_answer"], case["criteria"])
        if score >= case.get("min_score", 0.7):
            results["pass"] += 1
        else:
            results["fail"] += 1

    pass_rate = results["pass"] / len(golden)
    assert pass_rate >= 0.85, f"Golden dataset pass rate {pass_rate:.2%} below 85% threshold"
```

Update golden datasets when the model intentionally changes behavior. Document why each update was made.

## Data Versioning for Test Reproducibility

Test data must be versioned alongside code. When a test fails on a specific commit, you need the exact test data that was used.

**Git LFS for large test data:**

```bash
# Track large fixture files with Git LFS
git lfs track "tests/fixtures/embeddings/*.json"
git lfs track "tests/fixtures/documents/*.pdf"
```

**DVC for very large datasets:**

```bash
# Track datasets with DVC (stored in S3, referenced in git)
dvc add tests/fixtures/golden/qa_golden_v3.json
git add tests/fixtures/golden/qa_golden_v3.json.dvc
```

**Version naming convention:** Include the version in the filename (`qa_golden_v3.json`) rather than relying on git history alone. This makes it obvious which version a test references.

## Anonymizing Production Data for Testing

Production data contains the most realistic test cases but often includes PII or sensitive information. Anonymize it systematically.

```python
import re
import hashlib

def anonymize_text(text: str) -> str:
    """Replace PII patterns with realistic but fake substitutes."""
    # Replace email addresses
    text = re.sub(r'\b[\w.+-]+@[\w-]+\.[\w.]+\b', 'user@example.com', text)
    # Replace phone numbers
    text = re.sub(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', '555-000-0000', text)
    # Replace SSN patterns
    text = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', '000-00-0000', text)
    return text

def create_test_data_from_production(prod_records: list[dict]) -> list[dict]:
    """Convert production records to anonymized test data."""
    test_data = []
    for record in prod_records:
        anonymized = {
            "query": anonymize_text(record["query"]),
            "expected_intent": record.get("labeled_intent"),
            "source": "production_anonymized",
            "original_id_hash": hashlib.sha256(record["id"].encode()).hexdigest()[:8]
        }
        test_data.append(anonymized)
    return test_data
```

## Seeding Vector Databases for Integration Tests

Integration tests for RAG systems need a populated vector database. Create deterministic seed data.

```python
@pytest.fixture
def seeded_vector_db():
    """Create a vector DB with known documents for testing retrieval."""
    db = InMemoryVectorStore(dimension=1536)

    seed_documents = [
        {"id": "doc_python", "text": "Python is a programming language created by Guido van Rossum.",
         "metadata": {"source": "wiki", "topic": "programming"}},
        {"id": "doc_java", "text": "Java was developed by James Gosling at Sun Microsystems.",
         "metadata": {"source": "wiki", "topic": "programming"}},
        {"id": "doc_ml", "text": "Machine learning is a subset of artificial intelligence.",
         "metadata": {"source": "textbook", "topic": "ai"}},
    ]

    for doc in seed_documents:
        embedding = deterministic_embedding(doc["text"])  # Hash-based fake embedding
        db.upsert(doc["id"], embedding, doc["metadata"], doc["text"])

    yield db
    db.clear()
```

Use deterministic fake embeddings (based on text hashing) for unit and integration tests. Use real embeddings only in evaluation tests where retrieval quality matters.
