---
title: "Sandbox Testing Pattern for AI Agents"
description: "Sandboxed execution environments for testing AI agents with real tool access without production side effects: isolation strategies, resource limits, and verification."
date: 2026-03-28
categories: [Patterns]
tags: [testing, ai-agents, sandboxing, isolation, ai-engineering]
related:
  - guides/testing-agent-tool-calls
  - guides/agent-evaluation-guide
  - glossary/mocking
  - patterns/test-pyramid-ai
last_updated: 2026-05-30
---

AI agents that use tools (databases, APIs, file systems, code execution) can cause real-world side effects during testing. A test that lets an agent call a production API, delete a database record, or execute arbitrary code is dangerous. The sandbox testing pattern provides isolated environments where agents can exercise their full tool-use capabilities without affecting production systems.

## The Problem

Mocking every tool interaction is safe but incomplete. Mocked tools do not test whether the agent correctly handles real tool responses, real latency, real error formats, or real side effects. Some agent behaviors only emerge when tools actually execute: retry logic after real timeouts, response parsing for real API formats, and multi-step workflows where each step depends on the actual output of the previous step.

Testing with real tools in production is unacceptable. An agent that deletes records, sends emails, or modifies files cannot be tested against production systems.

## The Pattern

Create an isolated environment that mirrors production but contains no real data and has no connection to production systems. The agent interacts with real tool implementations that operate in this sandbox.

```python
class SandboxEnvironment:
    def __init__(self):
        self.filesystem = tempfile.mkdtemp()
        self.database = InMemorySQLiteDB()
        self.api_server = LocalMockAPIServer()
        self.network_restricted = True
        self.actions_log = []

    def get_tools(self):
        return [
            FileSystemTool(root=self.filesystem, readonly_paths=[]),
            DatabaseTool(connection=self.database),
            APITool(base_url=self.api_server.url),
        ]

    def verify_no_escape(self):
        """Verify the agent did not access anything outside the sandbox."""
        for action in self.actions_log:
            assert action.path.startswith(self.filesystem), (
                f"Agent accessed path outside sandbox: {action.path}"
            )
```

## Isolation Strategies

**File system isolation.** Use temporary directories as the agent's root. The agent can read and write files within this directory but cannot access the real file system. After the test, the directory is deleted.

**Database isolation.** Use an in-memory SQLite database or a test-specific PostgreSQL schema. Seed it with test data before the agent runs. Verify the database state after the agent completes.

**API isolation.** Run local mock API servers that implement the same endpoints as production APIs but return test data and have no real side effects. Tools like WireMock or custom Flask/FastAPI servers work well.

**Network isolation.** Restrict the agent's network access to only the sandbox services. Block all external HTTP requests. This prevents the agent from reaching production APIs even if it constructs the URL correctly.

**Resource limits.** Set CPU time limits, memory limits, and maximum execution duration. An agent stuck in a loop should be terminated, not allowed to consume resources indefinitely.

```python
import resource
import signal

class ResourceLimitedSandbox:
    def __init__(self, max_seconds=60, max_memory_mb=512):
        self.max_seconds = max_seconds
        self.max_memory_mb = max_memory_mb

    def execute(self, func, *args):
        signal.alarm(self.max_seconds)
        resource.setrlimit(resource.RLIMIT_AS,
            (self.max_memory_mb * 1024 * 1024, self.max_memory_mb * 1024 * 1024))
        try:
            return func(*args)
        finally:
            signal.alarm(0)
```

## Verification

After the agent completes, verify both the result and the side effects.

```python
def test_agent_organizes_files(sandbox):
    # Seed the sandbox with test files
    create_file(sandbox.filesystem, "report.pdf", content=b"...")
    create_file(sandbox.filesystem, "notes.txt", content=b"...")

    agent = Agent(model=model, tools=sandbox.get_tools())
    result = agent.run("Organize the files into folders by type")

    # Verify the outcome
    assert os.path.exists(os.path.join(sandbox.filesystem, "documents/report.pdf"))
    assert os.path.exists(os.path.join(sandbox.filesystem, "text/notes.txt"))

    # Verify no unauthorized actions
    sandbox.verify_no_escape()
    assert all(a.type in ["read", "write", "mkdir"] for a in sandbox.actions_log)
```

## Container-Based Sandboxes

For stronger isolation, run the agent inside a Docker container with restricted capabilities.

```python
import docker

def run_agent_in_container(agent_code: str, test_data: dict) -> dict:
    client = docker.from_env()
    container = client.containers.run(
        "agent-sandbox:latest",
        command=f"python run_agent.py",
        environment={"TEST_DATA": json.dumps(test_data)},
        network_mode="none",          # No network access
        mem_limit="512m",             # Memory limit
        cpu_period=100000,
        cpu_quota=50000,              # 50% CPU
        read_only=True,               # Read-only root filesystem
        tmpfs={"/tmp": "size=100m"},   # Writable temp directory
        detach=True,
        auto_remove=True
    )
    container.wait(timeout=120)
    return json.loads(container.logs())
```

## When to Use

Use sandbox testing when mocking is insufficient: when you need to test the agent's interaction with real tool implementations, when tool responses affect subsequent agent decisions, or when you need to verify that the agent's side effects are correct. Sandbox tests are slower than mocked tests but provide higher confidence that the agent behaves correctly in a realistic environment. Place them in the integration test layer, running on every PR.
