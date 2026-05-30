---
title: "Twelve-Factor AI - Applying 12-Factor App Principles to AI Systems"
description: "How each of the 12 original 12-factor app principles applies to AI and LLM-based systems: model configuration, artifact management, vector store backing services, build-release-run for model versioning, and more."
date: 2026-03-25
categories: [Guides]
tags: ["architecture", "advanced", "twelve-factor", "ai-applications", "best-practices", "cloud-native", "design"]
related:
  - guides/ai-architecture-patterns
  - patterns/microservices-for-ai
  - guides/ci-cd-for-ai
  - tools/amazon-bedrock
last_updated: 2026-05-30
---

The 12-Factor App methodology, published by Adam Wiggins in 2011 (drawing from Heroku's experience with thousands of app deployments), defines twelve principles for building software-as-a-service applications that are portable, scalable, and maintainable. Each principle maps naturally onto AI system design. Teams building LLM-based applications face the same problems the 12 factors solve - configuration drift, environment inconsistency, tight coupling to infrastructure - compounded by the additional complexity of non-deterministic model outputs and large model artifacts.

This article applies each factor to AI systems specifically, with concrete implementation guidance.

## Factor I: Codebase - One codebase tracked in version control, many deploys

**Original principle:** A single codebase in version control (Git) that is deployed to multiple environments (staging, production). Multiple apps sharing code use shared libraries, not shared repositories.

**Applied to AI:** The codebase contains application logic and prompt templates. It does not contain model weights, embeddings, or training data - those are artifacts. Treat prompt templates as code: version-control them alongside the application, not as database entries or environment variables.

If you have multiple AI applications sharing a prompt library, extract it as an internal shared package rather than duplicating prompts across repositories.

**Common mistake:** Storing prompts in a database or configuration store outside version control. This makes it impossible to reproduce the exact state that produced a given output.

## Factor II: Dependencies - Explicitly declare and isolate dependencies

**Original principle:** Dependencies are explicitly declared in a manifest (package.json, requirements.txt) and isolated (virtualenv, node_modules) so the application never relies on system-wide packages.

**Applied to AI:** Declare the specific version of every SDK and library the application uses. This includes `anthropic`, `boto3`, `langchain`, `sentence-transformers`, and any other AI library. Pin versions explicitly.

Model dependencies are trickier. If your application calls Amazon Bedrock with `anthropic.claude-3-5-sonnet-20241022-v2:0`, that model ID is a dependency. Document it. If the model is deprecated, your application will fail. Design model selection to flow through configuration, not be hardcoded (see Factor III).

**For self-hosted models:** Include model download scripts and checksums in the repository so any developer can reproduce the model environment from a clean checkout.

## Factor III: Config - Store config in the environment

**Original principle:** Configuration that varies between deployments (database URLs, credentials, feature flags) lives in environment variables, not in code.

**Applied to AI:** The following should live in environment variables or a secrets manager, not in code:

- Model ID (which model to call: Claude Sonnet vs Haiku, model version)
- Temperature and other sampling parameters
- System prompts that vary by environment (more permissive in development, stricter in production)
- Vector store endpoint URLs
- API keys for model providers
- Retrieval parameters (top-K, similarity threshold, reranking toggle)

This allows you to point staging at a cheaper/faster model and production at the most capable model without a code change. It allows rollback of a model version by changing an environment variable rather than redeploying.

**AWS implementation:** AWS Systems Manager Parameter Store and AWS Secrets Manager for model configuration. Environment-specific values set via Lambda environment variables or ECS task definitions.

## Factor IV: Backing Services - Treat backing services as attached resources

**Original principle:** Databases, message queues, and external APIs are attached resources. The application connects to them via a URL in configuration. Swapping one PostgreSQL instance for another requires only a config change, not a code change.

**Applied to AI:** Vector stores, embedding services, and model APIs are backing services. A RAG application's relationship to its vector store (OpenSearch, Pinecone, pgvector) should be identical to a web application's relationship to its database.

Specific backing services for AI applications:

- **Vector store** - Connect via URL in configuration. Swapping from Amazon OpenSearch to pgvector should be a configuration change with an interface adapter, not a rewrite.
- **Embedding model endpoint** - Treat as an attached resource. The embedding model used at query time must match the one used at index time - enforce this via configuration, not by relying on developer memory.
- **Model API** - Bedrock, OpenAI API, Anthropic API. The URL and model ID are config, not code.
- **Reranking service** - If using a reranker, it is a backing service with its own URL and authentication.

## Factor V: Build, Release, Run - Strictly separate build and run stages

**Original principle:** Build (transform code into executable artifact), release (combine artifact with config), and run (execute the release) are strictly separated. A release is immutable; every change creates a new release.

**Applied to AI:** The build-release-run separation is more complex for AI systems because of model artifacts and indexes.

**Build stage:** Compile or package application code. Install dependencies. Build and validate prompt templates. Does not call models.

**Index build stage** (AI-specific): This is a pre-run stage that builds the vector index from source documents. It is expensive and slow, so it runs asynchronously from the main application build. The output (a versioned vector index) is a release artifact. When source documents change, a new index must be built and released.

**Release stage:** Combine application code with configuration (model ID, vector store endpoint, embedding model version) and the index artifact reference. Tag the release with a version identifier. The release is immutable: the same release runs in staging and production.

**Run stage:** Start the application processes and connect to backing services. Does not make configuration decisions; those were made at release time.

**Implication:** Model version changes and index rebuilds require new releases, not production configuration edits. This preserves reproducibility.

## Factor VI: Processes - Execute the app as one or more stateless processes

**Original principle:** Application processes are stateless. State lives in a backing service (database, cache). Any process can handle any request.

**Applied to AI:** LLM inference processes must be stateless. Conversation history, session context, and user preferences must not live in process memory. They live in a backing service (DynamoDB, Redis, Bedrock session store) keyed by session ID.

This is violated by applications that maintain an in-memory conversation history per process instance. When the process restarts or the load balancer routes the request to a different instance, the conversation is lost.

For agentic systems: agent state (what steps have been taken, what tools have been called, what results were returned) must be persisted externally, not held in the agent process. Amazon Bedrock AgentCore handles this for Bedrock agents.

## Factor VII: Port Binding - Export services via port binding

**Original principle:** Services are self-contained and expose their interface via a port. They do not depend on injection of a webserver at runtime.

**Applied to AI:** AI inference services should expose a consistent HTTP API (or gRPC interface) regardless of the underlying model or retrieval mechanism. The caller does not know or care whether the service is calling Bedrock, a self-hosted model, or a mock.

This is the foundation for testability: tests can point at a mock inference service that returns deterministic outputs without making real model calls.

## Factor VIII: Concurrency - Scale out via the process model

**Original principle:** Scale by adding more processes, not by making processes larger. Different workload types have different scaling characteristics: web processes scale differently from background workers.

**Applied to AI:** AI workload types have very different scaling profiles:

- **Synchronous inference** (user-facing Q&A) - Scale horizontally with low-latency instances. Optimize for response time.
- **Async ingestion** (document processing, embedding) - Scale based on queue depth. Can use larger batch sizes. Optimize for throughput.
- **Reranking** - Often CPU-bound. Scale independently of the main inference path.
- **Model serving** (self-hosted) - GPU-constrained. Scale differently from CPU-bound application logic.

Separate these into distinct process types with separate scaling policies. Do not scale document ingestion capacity by scaling the user-facing inference tier.

## Factor IX: Disposability - Maximize robustness with fast startup and graceful shutdown

**Original principle:** Processes start quickly and shut down gracefully. Robust against sudden death.

**Applied to AI:** Model loading latency is a specific challenge. Loading a large model into GPU memory can take seconds to minutes, making fast startup difficult for self-hosted models.

Strategies:
- Use managed model endpoints (Bedrock, SageMaker Endpoints) that handle model loading separately from application startup
- For self-hosted models, pre-warm instances and use connection pooling
- Design for sudden process death: any request that fails mid-execution should be safely retryable (operations are idempotent or resumable from state stored in a backing service)

For agentic systems: if an agent process dies mid-task, the task should be resumable from the last persisted state, not restarted from scratch.

## Factor X: Dev/Prod Parity - Keep development, staging, and production as similar as possible

**Original principle:** Minimize the gap between development and production environments. Use the same backing services. Deploy frequently.

**Applied to AI:** Dev/prod parity is especially important and especially violated in AI systems. Common gaps:

- **Model gap** - Developers use a cheap/fast model locally; production uses a larger model. Behaviors differ. Test with the production model in staging.
- **Data gap** - The vector index in development contains 100 documents; production contains 100,000. Retrieval behavior differs at scale. Use a representative sample in staging.
- **Prompt gap** - System prompts are tweaked in production without being reflected in development. Use Factor III (config) to ensure the same prompts are explicitly configured in all environments.
- **Evaluation gap** - Model outputs are evaluated manually in development but not automatically in CI. Add automated evaluation to the CI pipeline.

The cost of using production-equivalent models and data in staging is justified by the bugs it prevents.

## Factor XI: Logs - Treat logs as event streams

**Original principle:** Applications do not manage log files. They write to stdout. The environment collects and routes log streams.

**Applied to AI:** Every model call should emit a structured log event containing:

- Trace ID (shared across the full request, including all agent steps)
- Model ID and version
- Input token count
- Output token count
- Latency (ms)
- Cost (USD, if calculable)
- Retrieval results (which chunks were retrieved, similarity scores)
- Model response (or a hash of it for large responses)

These log events are the primary diagnostic tool for quality issues. They are also the input to cost dashboards and quality monitoring.

Do not log personally identifiable information in model inputs/outputs unless required and authorized. Implement a scrubbing step for PII before logging.

**AWS implementation:** CloudWatch Logs for log aggregation. Amazon Bedrock model invocation logging for automatic Bedrock call logging. AWS X-Ray for distributed tracing across multi-agent systems.

## Factor XII: Admin Processes - Run admin/management tasks as one-off processes

**Original principle:** Administrative tasks (database migrations, one-off scripts) run as one-off processes in the same environment as the application, using the same codebase and config.

**Applied to AI:** Common AI admin tasks that should run as one-off processes:

- **Index rebuild** - Trigger a full re-embedding and re-indexing when source documents change significantly
- **Prompt evaluation** - Run the evaluation suite against a new prompt version before deploying
- **Model benchmark** - Run a new candidate model through the evaluation suite before switching the production model ID
- **Cost audit** - Query Bedrock CloudWatch metrics to produce a cost breakdown by use case
- **Data quality check** - Scan the vector index for stale or duplicate documents

These run using the same codebase, the same environment configuration, and the same backing services as the production application. They are not separate scripts maintained in a different repository.

## Sources and Further Reading

- Wiggins, A. (2011). "The Twelve-Factor App." [https://12factor.net/](https://12factor.net/) - The original methodology this article extends to AI systems.
- AWS Documentation: AWS Well-Architected Machine Learning Lens. [https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html)
- AWS Documentation: Amazon Bedrock model invocation logging. [https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html)
- AWS Documentation: Amazon Bedrock AgentCore (stateful agent execution). [https://docs.aws.amazon.com/bedrock/latest/userguide/agentcore.html](https://docs.aws.amazon.com/bedrock/latest/userguide/agentcore.html)
- AWS Documentation: AWS Systems Manager Parameter Store. [https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
- Anthropic Documentation: Claude API. [https://docs.anthropic.com/](https://docs.anthropic.com/)
