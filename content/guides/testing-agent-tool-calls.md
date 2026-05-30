---
title: "Testing AI Agent Tool Calls"
description: "How to test AI agents that use tools: mocking tool responses, testing tool selection logic, error handling, multi-step workflows, sandboxed execution, and authorization scope."
date: 2026-03-28
categories: [Guides]
tags: [ai-agents, testing, tools, sandboxing, ai-engineering]
related:
  - guides/agent-evaluation-guide
  - guides/testing-ai-systems
  - patterns/sandbox-testing-agents
  - glossary/mocking
last_updated: 2026-05-30
---

AI agents that use tools introduce testing challenges beyond simple prompt-response systems. An agent might call a database, invoke an API, execute code, or modify files. Each tool call is a potential point of failure, and the agent's tool selection logic is non-deterministic. Testing must cover tool execution, tool selection, error handling, multi-step workflows, and authorization boundaries.

## Mocking Tool Responses

Tools should implement a common interface that makes them easy to mock. Define a tool protocol and create mock implementations.

```python
from dataclasses import dataclass
from typing import Protocol

class Tool(Protocol):
    name: str
    def execute(self, **kwargs) -> dict: ...

@dataclass
class MockTool:
    name: str
    responses: list[dict]
    call_log: list[dict] = None

    def __post_init__(self):
        self.call_log = []
        self._call_index = 0

    def execute(self, **kwargs) -> dict:
        self.call_log.append({"name": self.name, "args": kwargs})
        if self._call_index < len(self.responses):
            response = self.responses[self._call_index]
            self._call_index += 1
            return response
        return {"error": "No more mock responses configured"}
```

Use mock tools in tests to verify the agent calls tools with correct parameters.

```python
def test_agent_passes_correct_params_to_search():
    search_tool = MockTool(name="search", responses=[
        {"results": [{"title": "Q3 Report", "snippet": "Revenue grew 15%"}]}
    ])
    agent = Agent(model=mock_model, tools=[search_tool])
    agent.run("Find the Q3 revenue growth")

    assert len(search_tool.call_log) == 1
    assert "Q3" in search_tool.call_log[0]["args"]["query"]
```

## Testing Tool Selection Logic

With a deterministic mock model, verify that the agent selects the right tool for a given task.

```python
def test_agent_selects_calculator_for_math():
    mock_model = DeterministicModel(responses=[
        {"tool_call": {"name": "calculator", "args": {"expression": "15 * 1.12"}}},
        {"content": "The result is 16.8."}
    ])
    search = MockTool(name="search", responses=[])
    calculator = MockTool(name="calculator", responses=[{"result": 16.8}])

    agent = Agent(model=mock_model, tools=[search, calculator])
    result = agent.run("What is 15 times 1.12?")

    assert len(calculator.call_log) == 1
    assert len(search.call_log) == 0

def test_agent_selects_search_for_factual_question():
    mock_model = DeterministicModel(responses=[
        {"tool_call": {"name": "search", "args": {"query": "population of Tokyo"}}},
        {"content": "Tokyo has a population of approximately 14 million."}
    ])
    search = MockTool(name="search", responses=[{"results": [{"snippet": "14 million"}]}])
    calculator = MockTool(name="calculator", responses=[])

    agent = Agent(model=mock_model, tools=[search, calculator])
    result = agent.run("What is the population of Tokyo?")

    assert len(search.call_log) == 1
    assert len(calculator.call_log) == 0
```

## Testing Error Handling When Tools Fail

Tools fail in production. Test that the agent handles failures gracefully.

```python
def test_agent_retries_on_transient_tool_failure():
    search = MockTool(name="search", responses=[
        {"error": "Connection timeout"},  # First call fails
        {"results": [{"snippet": "Answer found"}]}  # Retry succeeds
    ])
    mock_model = DeterministicModel(responses=[
        {"tool_call": {"name": "search", "args": {"query": "test"}}},
        {"tool_call": {"name": "search", "args": {"query": "test"}}},  # Retry
        {"content": "Found the answer."}
    ])
    agent = Agent(model=mock_model, tools=[search])
    result = agent.run("Find the answer")

    assert len(search.call_log) == 2
    assert "Found the answer" in result.content

def test_agent_gives_up_after_max_retries():
    search = MockTool(name="search", responses=[
        {"error": "Service unavailable"},
        {"error": "Service unavailable"},
        {"error": "Service unavailable"},
    ])
    mock_model = DeterministicModel(responses=[
        {"tool_call": {"name": "search", "args": {"query": "test"}}},
        {"tool_call": {"name": "search", "args": {"query": "test"}}},
        {"tool_call": {"name": "search", "args": {"query": "test"}}},
        {"content": "I was unable to find the information due to service issues."}
    ])
    agent = Agent(model=mock_model, tools=[search], max_retries=3)
    result = agent.run("Find the answer")

    assert "unable" in result.content.lower()
```

## Testing Multi-Step Agent Workflows

Complex agents execute multiple tool calls in sequence. Test the full trajectory with deterministic assertions at each step.

```python
def test_research_agent_workflow():
    """Agent should: search -> read document -> summarize."""
    search = MockTool(name="search", responses=[
        {"results": [{"url": "https://example.com/report.pdf", "title": "Q3 Report"}]}
    ])
    reader = MockTool(name="read_document", responses=[
        {"content": "Revenue increased 15% to $10M in Q3 2025."}
    ])
    mock_model = DeterministicModel(responses=[
        {"tool_call": {"name": "search", "args": {"query": "Q3 2025 revenue"}}},
        {"tool_call": {"name": "read_document", "args": {"url": "https://example.com/report.pdf"}}},
        {"content": "Q3 2025 revenue was $10M, up 15%."}
    ])

    agent = Agent(model=mock_model, tools=[search, reader])
    result = agent.run("What was Q3 2025 revenue?")

    # Verify trajectory
    assert search.call_log[0]["args"]["query"] == "Q3 2025 revenue"
    assert reader.call_log[0]["args"]["url"] == "https://example.com/report.pdf"
    assert "$10M" in result.content
```

## Sandboxed Execution Environments

When testing agents that execute code or modify files, run them in isolated environments.

```python
import tempfile
import os

@pytest.fixture
def sandbox():
    with tempfile.TemporaryDirectory() as tmpdir:
        # Create a sandbox with limited file access
        sandbox_env = SandboxEnvironment(
            root_dir=tmpdir,
            allowed_commands=["python", "ls", "cat"],
            network_access=False,
            max_execution_time=30
        )
        yield sandbox_env

def test_code_execution_agent_in_sandbox(sandbox):
    code_tool = CodeExecutionTool(sandbox=sandbox)
    agent = Agent(model=mock_model, tools=[code_tool])
    result = agent.run("Calculate the factorial of 10")

    # Verify the agent produced the right result
    assert "3628800" in result.content
    # Verify no files were created outside sandbox
    assert not os.listdir("/tmp") or all(
        f.startswith(sandbox.root_dir) for f in sandbox.created_files
    )
```

## Testing Authorization Scope

Agents should only use tools they are authorized to use. Test that scope restrictions are enforced.

```python
def test_agent_cannot_use_unauthorized_tool():
    delete_tool = MockTool(name="delete_record", responses=[{"success": True}])
    search_tool = MockTool(name="search", responses=[{"results": []}])

    agent = Agent(
        model=mock_model,
        tools=[search_tool, delete_tool],
        allowed_tools=["search"]  # delete_record not authorized
    )

    mock_model.set_responses([
        {"tool_call": {"name": "delete_record", "args": {"id": "123"}}},
    ])

    result = agent.run("Delete record 123")
    assert len(delete_tool.call_log) == 0  # Tool should not have been called
    assert result.blocked or "not authorized" in result.content.lower()

def test_agent_respects_read_only_mode():
    db_tool = MockTool(name="database", responses=[])
    agent = Agent(model=mock_model, tools=[db_tool], mode="read_only")

    mock_model.set_responses([
        {"tool_call": {"name": "database", "args": {"action": "DELETE", "table": "users"}}},
    ])

    result = agent.run("Delete all users")
    assert len(db_tool.call_log) == 0
```

## Continuous Regression Testing

Maintain a suite of agent scenarios and run them after every change to agent prompts, tool implementations, or model versions. Agent behavior is sensitive to subtle changes in system prompts and tool descriptions. A word change in a tool description can alter which tool the agent selects. The regression suite catches these regressions before they reach production.
