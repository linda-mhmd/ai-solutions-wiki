---
title: "FastAPI - Modern Python API Framework"
description: "FastAPI is a high-performance, async Python web framework for building APIs, built on Starlette and Pydantic. It is the standard choice for Python developers building AI model serving endpoints."
date: 2026-05-28
categories: [Tools]
tags: [python, api, async, pydantic, openapi, ai-serving, web-framework, inference]
related:
  - tools/railway
  - guides/async-job-queues
  - guides/from-zero-to-production
  - tools/stripe-connect
solutions:
  - guides/from-zero-to-production
  - guides/async-job-queues
---

FastAPI is a modern, high-performance Python web framework for building APIs. Released in 2018 by Sebastian Ramirez, it is built on two libraries: [Starlette](https://www.starlette.io/) (the async web toolkit) and [Pydantic](https://docs.pydantic.dev/) (the data validation library). The combination gives you asynchronous request handling with automatic, runtime-enforced type validation, and both of those things matter significantly for AI workloads.

FastAPI generates OpenAPI (Swagger) documentation automatically from your code. There is no separate documentation step and no risk of docs drifting from the implementation. The framework has become the dominant choice for Python developers building model-serving APIs, RAG backends, and AI microservices.

## Why Python developers building AI services choose FastAPI

When you serve an AI model, whether a local LLM, an embedding model, or a classification pipeline, your server spends most of its time waiting: waiting for GPU inference to complete, waiting for vector database queries, waiting for external API calls. Traditional synchronous web frameworks (Flask, Django) block the thread during that wait. FastAPI is built on `asyncio`, so the server can handle other requests while a slow operation is in progress.

Beyond performance, FastAPI solves a common pain point in API development: the gap between your code and your documentation. With Flask, you define a route and then separately write documentation. With FastAPI, the type hints in your function signatures are the documentation. Pydantic models define both validation logic and the OpenAPI schema simultaneously.

For AI services specifically, FastAPI's dependency injection system makes it straightforward to load a model once at startup and inject it into every request handler, avoiding the significant latency of loading a model per request.

<figure class="bz-figure">
  <img src="/img/wardrobe/tailors-block-clean-code.png" alt="A tailor's hands using precision scissors to cut a clean line through dark suiting cloth: ruthless precision, single purpose, no waste." loading="lazy">
  <figcaption>FastAPI is the tailor's block of Python web frameworks: precise, single-purpose, and designed to cut directly to what matters: the endpoint, the validation, the response.</figcaption>
</figure>

## Automatic OpenAPI documentation

FastAPI reads your Python type hints and Pydantic models and generates a full OpenAPI 3.0 specification automatically. Two interactive documentation UIs are served by default:

- `/docs`, Swagger UI, lets you make live API calls from the browser
- `/redoc`, ReDoc, a cleaner read-only documentation view

This means the moment you define a route with typed parameters, it is already documented, interactive, and explorable. No YAML to maintain. No Swagger annotations to keep in sync.

## Pydantic models for request and response validation

Pydantic is FastAPI's validation layer. You define a model as a Python class with typed fields, and FastAPI uses it to validate incoming request bodies and serialize outgoing responses. Invalid data is rejected before it reaches your business logic, with a structured JSON error response that includes field-level detail.

```python
from pydantic import BaseModel, Field
from typing import Optional

class InferenceRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=4096)
    temperature: float = Field(0.7, ge=0.0, le=2.0)
    max_tokens: Optional[int] = Field(512, ge=1, le=4096)

class InferenceResponse(BaseModel):
    text: str
    tokens_used: int
    model_id: str
```

Pydantic v2 (used by FastAPI from version 0.100+) is written in Rust for validation performance, making it fast enough that validation overhead is negligible even at high request volumes.

## Async support: why this matters for AI workloads

Python has a global interpreter lock (GIL) that prevents true thread-level parallelism for CPU-bound work. For I/O-bound work, network calls, disk reads, waiting for an inference engine to return, `asyncio` cooperative multitasking provides genuine concurrency within a single process.

AI service endpoints typically look like this:

1. Receive request (fast)
2. Validate input (fast)
3. Call inference engine or external model API, **this takes 200ms to 30s depending on the model**
4. Post-process result (fast)
5. Return response

Steps 3 is pure waiting. With a synchronous framework like Flask, the worker thread blocks during step 3, unable to handle any other request. With FastAPI's `async def` route handlers, the event loop can process other requests during the wait.

```python
@app.post("/predict", response_model=InferenceResponse)
async def predict(request: InferenceRequest):
    # Non-blocking: event loop handles other requests during inference
    result = await model_client.generate(
        prompt=request.prompt,
        temperature=request.temperature,
        max_tokens=request.max_tokens
    )
    return InferenceResponse(
        text=result.text,
        tokens_used=result.usage.total_tokens,
        model_id=result.model
    )
```

For CPU-bound work (running a model locally in the same process), use `asyncio.run_in_executor` to offload to a thread pool so the event loop is not blocked.

{{< seealso >}}
- [Async Job Queues](/guides/async-job-queues/): when async endpoints are not enough. AI inference jobs that take 10-60 seconds need a job queue, not a request handler.
- [Railway](/tools/railway/): the fastest way to deploy a FastAPI service to production. Zero Dockerfile required.
- [From Zero to Production](/guides/from-zero-to-production/): where FastAPI fits in the full stack, between the mobile app and the AI inference layer.
{{< /seealso >}}

## Dependency injection system

FastAPI has a built-in dependency injection system using `Depends()`. This is how you share resources, database connections, model clients, authentication state, across route handlers without globals or manual passing.

```python
from fastapi import Depends

class ModelClient:
    def __init__(self, model_path: str):
        self.model = load_model(model_path)  # load once at startup

    async def generate(self, prompt: str, **kwargs) -> str:
        return await self.model.async_generate(prompt, **kwargs)

model_client = ModelClient(model_path="./models/mistral-7b")

def get_model_client() -> ModelClient:
    return model_client

@app.post("/predict")
async def predict(
    request: InferenceRequest,
    client: ModelClient = Depends(get_model_client)
):
    return await client.generate(request.prompt)
```

Dependencies can themselves depend on other dependencies, can be async, can yield resources (for setup/teardown), and are testable independently from route handlers.

## Background tasks

FastAPI's `BackgroundTasks` lets you kick off work after the response has been sent to the client. Useful for logging inference telemetry, sending notifications, or triggering downstream processing without making the client wait.

```python
from fastapi import BackgroundTasks

def log_inference(prompt: str, result: str, latency_ms: float):
    # Write to database, send to analytics, etc.
    db.insert_inference_log(prompt=prompt, result=result, latency_ms=latency_ms)

@app.post("/predict")
async def predict(request: InferenceRequest, background_tasks: BackgroundTasks):
    start = time.perf_counter()
    result = await model_client.generate(request.prompt)
    latency = (time.perf_counter() - start) * 1000
    background_tasks.add_task(log_inference, request.prompt, result, latency)
    return {"text": result}
```

## Request flow through a FastAPI AI service

<div class="bz-diagram">
<div class="bz-diagram-label">HTTP request → FastAPI → AI model → response</div>
<div class="bz-diagram-body">
<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Client</span>
    <span class="bz-flow-step-name">POST /predict</span>
    <span class="bz-flow-step-desc">JSON body with prompt, temperature, max_tokens</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">FastAPI Route</span>
    <span class="bz-flow-step-name">Route Handler</span>
    <span class="bz-flow-step-desc">Matches path, resolves dependencies (auth, model client)</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Pydantic</span>
    <span class="bz-flow-step-name">Validation</span>
    <span class="bz-flow-step-desc">Validates and coerces input; returns 422 if invalid</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Service Layer</span>
    <span class="bz-flow-step-name">Business Logic</span>
    <span class="bz-flow-step-desc">Prompt formatting, context retrieval, rate limiting</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">AI Model</span>
    <span class="bz-flow-step-name">Inference</span>
    <span class="bz-flow-step-desc">Local model runner (vLLM, Ollama) or remote API (OpenAI, Bedrock)</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Response</span>
    <span class="bz-flow-step-name">200 OK + JSON</span>
    <span class="bz-flow-step-desc">Pydantic serializes response model to JSON</span>
  </div>
</div>
</div>
</div>

## Project structure

A production FastAPI project for an AI service is typically organized as:

```
app/
├── main.py              # FastAPI app instance, startup/shutdown events
├── routers/
│   ├── inference.py     # POST /predict, POST /embed, POST /chat
│   ├── health.py        # GET /health, GET /ready
│   └── admin.py         # Model management endpoints
├── schemas/
│   ├── inference.py     # InferenceRequest, InferenceResponse Pydantic models
│   └── embeddings.py    # EmbeddingRequest, EmbeddingResponse
├── services/
│   ├── model_client.py  # Inference engine wrapper
│   ├── retrieval.py     # Vector search / RAG retrieval
│   └── auth.py          # API key validation
├── core/
│   ├── config.py        # Settings (Pydantic BaseSettings, reads .env)
│   └── logging.py       # Structured logging setup
└── tests/
    ├── test_inference.py
    └── test_health.py
```

`main.py` wires everything together:

```python
from fastapi import FastAPI
from app.routers import inference, health
from app.services.model_client import ModelClient
from app.core.config import Settings

settings = Settings()
app = FastAPI(title="AI Inference API", version="1.0.0")

@app.on_event("startup")
async def startup():
    app.state.model_client = ModelClient(settings.model_path)

app.include_router(inference.router, prefix="/v1")
app.include_router(health.router)
```

## Practical example: AI inference endpoint

A minimal but production-representative inference endpoint:

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import APIKeyHeader
from pydantic import BaseModel, Field
from typing import Optional
import httpx
import time

app = FastAPI(title="Inference API")

API_KEY_HEADER = APIKeyHeader(name="X-API-Key")
VALID_KEYS = {"sk-dev-key-123", "sk-prod-key-456"}

async def verify_api_key(api_key: str = Depends(API_KEY_HEADER)):
    if api_key not in VALID_KEYS:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API key")
    return api_key

class InferenceRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=8192, description="The input prompt")
    temperature: float = Field(0.7, ge=0.0, le=2.0)
    max_tokens: Optional[int] = Field(512, ge=1, le=4096)
    model: str = Field("mistral-7b-instruct", description="Model identifier")

class InferenceResponse(BaseModel):
    text: str
    tokens_used: int
    latency_ms: float
    model: str

@app.post(
    "/v1/completions",
    response_model=InferenceResponse,
    summary="Generate a text completion",
    tags=["inference"]
)
async def create_completion(
    request: InferenceRequest,
    _: str = Depends(verify_api_key)
):
    start = time.perf_counter()
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "http://localhost:11434/api/generate",  # Ollama
            json={"model": request.model, "prompt": request.prompt, "stream": False}
        )
        resp.raise_for_status()
        data = resp.json()

    latency = (time.perf_counter() - start) * 1000
    return InferenceResponse(
        text=data["response"],
        tokens_used=data.get("eval_count", 0),
        latency_ms=round(latency, 2),
        model=request.model
    )

@app.get("/health")
async def health():
    return {"status": "ok"}
```

Run it with: `uvicorn app.main:app --reload`
Visit `http://localhost:8000/docs` to interact with the auto-generated Swagger UI.

## FastAPI vs Flask vs Django REST Framework

| Dimension | FastAPI | Flask | Django REST Framework |
|---|---|---|---|
| **Performance** | High, async, ASGI | Moderate, sync, WSGI | Moderate, sync, WSGI |
| **Async support** | Native (`async def`) | Limited (via extensions) | Limited (Django 4.1+ partial) |
| **Type validation** | Built-in (Pydantic) | Manual or extensions | Serializers (verbose) |
| **OpenAPI docs** | Auto-generated | Manual or extension | drf-spectacular required |
| **Learning curve** | Low-medium | Very low | Medium-high |
| **Batteries included** | Lightweight | Minimal | Full (ORM, admin, auth) |
| **Best for** | API microservices, AI serving | Prototypes, simple APIs | Full web apps with admin panel |
| **Ecosystem maturity** | Growing rapidly (2018) | Very mature (2010) | Very mature (2011) |
| **Production AI use** | Dominant choice | Legacy or simple cases | Uncommon for AI services |

For AI model serving: FastAPI is the clear choice. For a full-stack web application with an admin panel and ORM-managed database: Django REST Framework. For a three-route prototype that will never scale: Flask.

## Deployment

**Development:** `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

**Production:** Run uvicorn workers behind gunicorn for process management:

```bash
gunicorn app.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000 \
  --timeout 120
```

**Docker:**

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "app.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

**Railway:** Connect your GitHub repository. Railway detects Python automatically, sets `NIXPACKS_BUILD_CMD` and runs your `Procfile` or auto-detected start command. Add a `railway.toml` for custom configuration. See [Railway](/tools/railway/).

**Modal:** For GPU-backed inference, Modal's Python SDK lets you define a FastAPI app that runs on GPU instances and scales to zero:

```python
import modal
app = modal.App("inference-api")

@app.function(gpu="A10G")
@modal.asgi_app()
def fastapi_app():
    from app.main import app as fastapi_app
    return fastapi_app
```

**AWS (ECS/Fargate):** Container-based deployment with an Application Load Balancer. See [AWS Fargate](/tools/aws-fargate/).

## Key configuration

FastAPI applications typically read configuration from environment variables using Pydantic's `BaseSettings`:

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    model_path: str = "./models/mistral-7b"
    api_keys: list[str] = []
    max_concurrent_requests: int = 10
    log_level: str = "INFO"

    class Config:
        env_file = ".env"

settings = Settings()
```

## Sources

1. https://fastapi.tiangolo.com/
2. https://github.com/tiangolo/fastapi
3. https://docs.pydantic.dev/
4. https://www.starlette.io/
