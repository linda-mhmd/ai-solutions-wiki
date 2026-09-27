---
title: "Testing RAG Systems"
description: "How to test Retrieval-Augmented Generation systems: unit testing chunking, integration testing retrieval quality, testing citation accuracy, hallucination rates, and RAGAS metrics in CI."
date: 2026-03-28
categories: [Guides]
tags: [rag, testing, retrieval, evaluation, ragas, ai-engineering]
related:
  - guides/testing-ai-systems
  - guides/test-data-management-ai
  - guides/integration-testing-ai-pipelines
  - glossary/golden-dataset
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

RAG systems have two distinct components that need separate testing strategies: the retrieval pipeline (deterministic, testable with standard methods) and the generation pipeline (non-deterministic, requiring evaluation-based testing). Testing them independently and then together provides the clearest signal about where quality issues originate.

## Unit Testing Chunking

Chunking is pure logic and should have thorough unit tests covering edge cases.

```python
from your_app.chunking import RecursiveChunker

class TestChunking:
    def test_respects_max_chunk_size(self):
        chunker = RecursiveChunker(max_tokens=200, overlap_tokens=20)
        text = "word " * 1000  # ~1000 tokens
        chunks = chunker.chunk(text)
        for chunk in chunks:
            assert chunker.count_tokens(chunk.text) <= 200

    def test_preserves_sentence_boundaries(self):
        chunker = RecursiveChunker(max_tokens=50, overlap_tokens=10)
        text = "First sentence. Second sentence. Third sentence. Fourth sentence."
        chunks = chunker.chunk(text)
        for chunk in chunks:
            # Chunks should not split mid-sentence
            assert chunk.text.endswith(".") or chunk.text.endswith(". ")

    def test_handles_empty_document(self):
        chunker = RecursiveChunker(max_tokens=200, overlap_tokens=20)
        chunks = chunker.chunk("")
        assert chunks == []

    def test_single_chunk_for_short_document(self):
        chunker = RecursiveChunker(max_tokens=200, overlap_tokens=20)
        chunks = chunker.chunk("Short document.")
        assert len(chunks) == 1

    def test_metadata_preserved(self):
        chunker = RecursiveChunker(max_tokens=200, overlap_tokens=20)
        chunks = chunker.chunk("Some text.", metadata={"source": "test.pdf", "page": 3})
        assert all(c.metadata["source"] == "test.pdf" for c in chunks)
```

## Unit Testing Embedding Preprocessing

Test text normalization that happens before embedding.

```python
def test_html_stripped_before_embedding():
    preprocessor = EmbeddingPreprocessor()
    result = preprocessor.clean("<h1>Title</h1><p>Content with <b>bold</b>.</p>")
    assert "<" not in result
    assert "Title" in result
    assert "Content with bold." in result

def test_tables_converted_to_text():
    preprocessor = EmbeddingPreprocessor()
    html_table = "<table><tr><td>Name</td><td>Age</td></tr><tr><td>Alice</td><td>30</td></tr></table>"
    result = preprocessor.clean(html_table)
    assert "Name" in result
    assert "Alice" in result
    assert "30" in result
```

## Integration Testing Retrieval Quality

Seed a vector database with known documents and verify retrieval returns the right results.

```python
@pytest.fixture
def retrieval_pipeline():
    store = InMemoryVectorStore(dimension=1536)
    documents = [
        {"id": "python", "text": "Python was created by Guido van Rossum in 1991."},
        {"id": "java", "text": "Java was created by James Gosling in 1995."},
        {"id": "rust", "text": "Rust was created by Graydon Hoare and first appeared in 2010."},
        {"id": "photosynthesis", "text": "Photosynthesis converts sunlight into chemical energy."},
    ]
    for doc in documents:
        embedding = compute_test_embedding(doc["text"])
        store.add(doc["id"], embedding, doc["text"])
    return RetrievalPipeline(store=store, top_k=3)

def test_retrieves_relevant_documents(retrieval_pipeline):
    results = retrieval_pipeline.query("Who created Python?")
    result_ids = [r.id for r in results]
    assert "python" in result_ids, "Expected Python document in results"
    # Python doc should rank higher than photosynthesis
    python_rank = result_ids.index("python")
    if "photosynthesis" in result_ids:
        photo_rank = result_ids.index("photosynthesis")
        assert python_rank < photo_rank

def test_retrieval_returns_scores(retrieval_pipeline):
    results = retrieval_pipeline.query("Who created Java?")
    assert all(0 <= r.score <= 1 for r in results)
    # Scores should be in descending order
    scores = [r.score for r in results]
    assert scores == sorted(scores, reverse=True)
```

## Testing Relevance Scoring

Measure retrieval quality with information retrieval metrics.

```python
def test_recall_at_k():
    """Ground truth documents should appear in top-K results."""
    test_cases = [
        {"query": "Python creator", "relevant_ids": ["python"]},
        {"query": "Programming languages from the 1990s", "relevant_ids": ["python", "java"]},
    ]
    recalls = []
    for case in test_cases:
        results = pipeline.query(case["query"])
        result_ids = {r.id for r in results}
        relevant_found = len(set(case["relevant_ids"]) & result_ids)
        recall = relevant_found / len(case["relevant_ids"])
        recalls.append(recall)

    avg_recall = sum(recalls) / len(recalls)
    assert avg_recall >= 0.80, f"Average recall@{pipeline.top_k}: {avg_recall:.2%}"

def test_mean_reciprocal_rank():
    """Relevant documents should appear near the top of results."""
    test_cases = [
        {"query": "Python creator", "relevant_id": "python"},
        {"query": "Java creator", "relevant_id": "java"},
    ]
    reciprocal_ranks = []
    for case in test_cases:
        results = pipeline.query(case["query"])
        for i, r in enumerate(results):
            if r.id == case["relevant_id"]:
                reciprocal_ranks.append(1.0 / (i + 1))
                break
        else:
            reciprocal_ranks.append(0.0)

    mrr = sum(reciprocal_ranks) / len(reciprocal_ranks)
    assert mrr >= 0.70, f"MRR: {mrr:.3f}"
```

## Testing Citation Accuracy

RAG systems should cite their sources. Test that citations point to real retrieved chunks.

```python
def test_citations_reference_retrieved_chunks():
    result = rag_pipeline.run("What year was Python created?")
    for citation in result.citations:
        # Every citation must reference a chunk that was actually retrieved
        assert citation.source_id in [c.id for c in result.retrieved_chunks], (
            f"Citation references {citation.source_id} which was not retrieved"
        )
        # The cited text should appear in the source chunk
        source_chunk = next(c for c in result.retrieved_chunks if c.id == citation.source_id)
        assert citation.quoted_text in source_chunk.text, (
            f"Citation quotes text not found in source chunk"
        )
```

## Testing Hallucination Rates

Hallucination occurs when the model generates information not present in the retrieved context. Test this with cases where you control the context.

```python
def test_no_hallucination_beyond_context():
    """Model should not add facts not present in the provided context."""
    context = "The company had revenue of $10M in Q3."
    question = "What was the Q3 revenue and profit?"

    result = rag_pipeline.run(question, forced_context=[context])

    # The model should state it does not know the profit, since it is not in context
    response_lower = result.answer.lower()
    assert "$10m" in response_lower or "10 million" in response_lower
    # Check for hallucinated profit figures
    assert not any(
        phrase in response_lower
        for phrase in ["profit was", "profit of", "net income"]
    ), "Model appears to hallucinate profit information not in context"
```

## RAGAS Metrics in CI

RAGAS provides automated metrics for RAG quality. Integrate them into your CI pipeline.

```python
from statistics import mean

from openai import AsyncOpenAI
from ragas.embeddings.base import embedding_factory
from ragas.llms.base import llm_factory
from ragas.metrics.collections import AnswerRelevancy, ContextRecall, Faithfulness

client = AsyncOpenAI()
judge = llm_factory("gpt-6-luna", client=client)
embeddings = embedding_factory("openai", model="text-embedding-3-small", client=client)

faithfulness = Faithfulness(llm=judge)
answer_relevancy = AnswerRelevancy(llm=judge, embeddings=embeddings)
context_recall = ContextRecall(llm=judge)

CASES = [
    ("What is Python?", "Python is a programming language created by Guido van Rossum."),
    ("Who created Java?", "Java was created by James Gosling."),
]

def test_ragas_metrics():
    f_scores, r_scores, c_scores = [], [], []
    for question, reference in CASES:
        answer = rag_pipeline.run(question).answer
        contexts = [c.text for c in rag_pipeline.retrieve(question)]
        f_scores.append(faithfulness.score(
            user_input=question, response=answer, retrieved_contexts=contexts).value)
        r_scores.append(answer_relevancy.score(
            user_input=question, response=answer).value)
        c_scores.append(context_recall.score(
            user_input=question, retrieved_contexts=contexts, reference=reference).value)

    assert mean(f_scores) >= 0.80
    assert mean(r_scores) >= 0.75
    assert mean(c_scores) >= 0.70
```

This uses the metric classes in `ragas.metrics.collections` (Ragas 0.4). The older pattern of `from ragas.metrics import faithfulness` plus `evaluate(Dataset.from_dict(...))` still runs in 0.4 but emits deprecation warnings (Ragas says the old metric imports will be removed in v1.0), and in current Ragas `result["faithfulness"]` returns a list of per-sample scores rather than a mean, so asserting it against a float threshold fails. Ragas now points new code to its `@experiment` workflow for full evaluation runs ([docs.ragas.io](https://docs.ragas.io/en/latest/concepts/experiment/)).

## Regression Testing When Knowledge Base Changes

When documents are added, updated, or removed from the knowledge base, retrieval behavior changes. Maintain a regression suite that catches unexpected quality drops.

```python
def test_knowledge_base_update_regression():
    """After updating the knowledge base, verify existing queries still work."""
    regression_cases = load_json_fixture("golden/rag_regression_v2.json")
    failures = []

    for case in regression_cases:
        results = pipeline.query(case["query"])
        result_ids = [r.id for r in results]
        if case["expected_top_result"] not in result_ids[:3]:
            failures.append({
                "query": case["query"],
                "expected": case["expected_top_result"],
                "got": result_ids[:3]
            })

    failure_rate = len(failures) / len(regression_cases)
    assert failure_rate <= 0.10, (
        f"{len(failures)}/{len(regression_cases)} regression cases failed: {failures[:5]}"
    )
```

Run this suite before and after every knowledge base update. If the failure rate exceeds the threshold, investigate before deploying the updated index.
