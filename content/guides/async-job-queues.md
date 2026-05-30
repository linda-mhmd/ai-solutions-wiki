---
title: "Async Job Queues - A Production Pattern for AI Applications"
description: "How to offload slow operations: AI inference, video processing, file handling: from HTTP request cycles using job queues. Covers BullMQ, Celery, pg-boss, SQS, retry logic, dead letter queues, and monitoring."
date: 2026-05-28
categories: [Guides]
tags: ["infrastructure", "advanced", "queues", "async", "workers", "redis", "bullmq", "celery", "production"]
tools: []
related:
  - tools/fastapi
  - tools/railway
  - guides/from-zero-to-production
  - glossary/message-queue
last_updated: 2026-05-30
---

Any AI application that does real work will quickly encounter the same problem: some operations take far too long to complete inside an HTTP request. AI image generation takes 10–60 seconds. Video processing can run for minutes. Large file analysis, batch embeddings, sending thousands of emails, none of these belong in a synchronous request handler. Async job queues are the production pattern that solves this class of problem.

## What Is an Async Job Queue?

The HTTP request model has an implicit contract: a client sends a request, the server processes it, and the server returns a response, all within a few hundred milliseconds. Web servers and proxies commonly impose hard timeouts around 30 seconds. Browsers will give up on requests that stall. Users will abandon pages that appear frozen.

An async job queue breaks that contract deliberately. Instead of processing work inside the request, the API handler creates a job record, places it on a queue, and immediately returns a job ID to the client. The actual work happens separately, in a worker process. The client uses the job ID to check progress until the job completes.

This decouples two concerns that do not belong together: accepting work (fast, must succeed reliably) and doing work (slow, may fail and need retrying).

<figure class="bz-figure">
  <img src="/img/wardrobe/wardrobe-ecosystem-cicd.png" alt="A walk-in wardrobe with four distinct zones visible through an arched golden doorway: each section handling its own category of work independently." loading="lazy">
  <figcaption>An organised pipeline. Like a wardrobe with distinct zones for each category, a job queue system separates acceptance, queuing, processing, and delivery into independent, inspectable stages.</figcaption>
</figure>

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Client</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">POST /jobs</span>
      <span class="bz-arch-chip">Receives job ID</span>
      <span class="bz-arch-chip">Polls GET /jobs/{id}</span>
      <span class="bz-arch-chip">Receives result</span>
      <span class="bz-arch-chip-note">Client never waits for slow work. only for the fast acknowledgement</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">API</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Validate request</span>
      <span class="bz-arch-chip">Enqueue job</span>
      <span class="bz-arch-chip">Return 202 + job ID</span>
      <span class="bz-arch-chip">Serve job status</span>
      <span class="bz-arch-chip-note">API Server handles only fast operations. queue writes and DB reads</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Queue</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Redis Queue</span>
      <span class="bz-arch-chip">Job pending</span>
      <span class="bz-arch-chip">Job active</span>
      <span class="bz-arch-chip">Job complete / failed</span>
      <span class="bz-arch-chip-note">The durable buffer between API and workers; survives API restarts</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Worker</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Worker Process</span>
      <span class="bz-arch-chip">Calls AI Service</span>
      <span class="bz-arch-chip">Writes to Storage</span>
      <span class="bz-arch-chip">Updates DB status</span>
      <span class="bz-arch-chip-note">Runs independently. can scale horizontally, fail, and restart without affecting the API</span>
    </div>
  </div>
</div>

## When You Need a Job Queue

Not every background task needs a full queue system. If you are using a cron job to run a single database cleanup at 2am, a simple scheduled function is fine. Job queues add operational complexity; the trade-off is only justified when the following apply:

**AI inference and generation**: Any call to an image generation model (Stable Diffusion, DALL-E, Flux), video generation, or large language model with long outputs. Latency is unpredictable and commonly exceeds HTTP timeout thresholds.

**Video and media processing**: Transcoding video, generating thumbnails, applying filters, extracting audio. FFmpeg-based jobs routinely run for 30 seconds to several minutes.

**Large file processing**: Parsing multi-thousand-row CSVs, processing uploaded PDFs for RAG ingestion, running OCR over document sets. File size determines runtime in ways you cannot predict at request time.

**Email and notification at scale**: Sending 10,000 emails synchronously will timeout. A queue lets you enqueue all of them immediately and process them at a controlled rate that respects provider rate limits.

**Scheduled and deferred work**: Anything with a `run_at` semantics: send a reminder in 24 hours, retry a failed external API call in 5 minutes, generate a report at midnight.

## The Core Request Pattern

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">1</span>
    <span class="bz-flow-step-name">Client submits request</span>
    <span class="bz-flow-step-desc">POST /jobs with job parameters; API validates input, creates a DB record with status=pending</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">2</span>
    <span class="bz-flow-step-name">API returns immediately</span>
    <span class="bz-flow-step-desc">202 Accepted + {"jobId": "abc123", "status": "pending"}; total response time under 200ms</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">3</span>
    <span class="bz-flow-step-name">Worker picks up job</span>
    <span class="bz-flow-step-desc">Worker process subscribes to queue; dequeues the job and marks it active in DB</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">4</span>
    <span class="bz-flow-step-name">Worker processes</span>
    <span class="bz-flow-step-desc">Calls AI service, runs computation; may take 10–60 seconds; writes result to storage</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">5</span>
    <span class="bz-flow-step-name">Client polls for completion</span>
    <span class="bz-flow-step-desc">GET /jobs/abc123 every 3–5 seconds; API reads status from DB and returns it</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">6</span>
    <span class="bz-flow-step-name">Client receives result</span>
    <span class="bz-flow-step-desc">Status=completed; response includes result URL or payload; client renders output</span>
  </div>
</div>

The polling interval matters. Poll too frequently (every 500ms) and you add unnecessary server load. Poll too infrequently (every 30s) and the UX feels broken. Three to five seconds is the standard interval for AI workloads. For frontend applications, a WebSocket or Server-Sent Events channel can replace polling entirely, the server pushes a notification when the job completes.

## Job States

Every job in the queue moves through a defined state machine:

- **pending**: Job created, waiting to be picked up by a worker
- **active**: A worker has dequeued the job and is processing it
- **completed**: Work finished successfully; result is available
- **failed**: Work failed after all retry attempts; job is moved to the dead letter queue
- **delayed**: Job is scheduled to run at a future time (deferred execution)
- **stalled**: Worker started but crashed without completing; the queue system recovers stalled jobs automatically after a lock timeout

State transitions are the source of truth for job status. The DB record for each job tracks the current state, timestamps for each transition, any error messages from failed attempts, and the number of retry attempts consumed.

## Queue Implementations

### BullMQ (Node.js + Redis)

BullMQ is the standard queue library for Node.js applications. It uses Redis as the underlying data store, with atomic job operations implemented via Lua scripts. BullMQ supports priorities, delayed jobs, rate limiting, job concurrency, and sandboxed worker processes.

```javascript
import { Queue, Worker } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis({ host: 'localhost', port: 6379 });

// Producer, enqueue a job from the API handler
const imageQueue = new Queue('image-generation', { connection });

export async function createJob(params) {
  const job = await imageQueue.add(
    'generate',
    { prompt: params.prompt, userId: params.userId },
    {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: { age: 86400 }, // keep completed jobs for 24h
      removeOnFail: false,              // keep failed jobs for inspection
    }
  );
  return { jobId: job.id, status: 'pending' };
}

// Consumer, worker process (run separately from the API)
const worker = new Worker(
  'image-generation',
  async (job) => {
    const { prompt, userId } = job.data;

    // Update progress so the poller can show a progress bar
    await job.updateProgress(10);

    const result = await callAIService(prompt);
    await job.updateProgress(80);

    const url = await uploadToStorage(result, userId);
    await job.updateProgress(100);

    return { url };
  },
  {
    connection,
    concurrency: 4, // process up to 4 jobs simultaneously per worker instance
  }
);

worker.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed: ${result.url}`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed: ${err.message}`);
});
```

### Celery (Python + Redis or RabbitMQ)

Celery is the equivalent for Python applications. It is older, more feature-complete for complex workflow graphs, and the standard choice for Python AI and data pipelines.

```python
from celery import Celery
import requests

app = Celery('tasks', broker='redis://localhost:6379/0',
             backend='redis://localhost:6379/1')

app.conf.update(
    task_serializer='json',
    result_expires=86400,
    task_acks_late=True,         # only ack after completion, not on pickup
    task_reject_on_worker_lost=True,
)

@app.task(bind=True, max_retries=3, default_retry_delay=30)
def generate_image(self, prompt: str, user_id: str):
    try:
        result = call_ai_service(prompt)
        url = upload_to_storage(result, user_id)
        return {'url': url, 'status': 'completed'}
    except TemporaryError as exc:
        # Retry with exponential backoff
        raise self.retry(exc=exc, countdown=2 ** self.request.retries * 10)
```

Start a worker: `celery -A tasks worker --loglevel=info --concurrency=4`

### pg-boss (Postgres-backed queue)

pg-boss stores jobs in a PostgreSQL table rather than Redis. For teams already running Postgres who want to avoid adding Redis as an infrastructure dependency, this is a pragmatic choice. It loses some of the performance headroom of Redis at high throughput, but for most AI application workloads, hundreds to low thousands of jobs per hour, it is more than sufficient.

```javascript
import PgBoss from 'pg-boss';

const boss = new PgBoss('postgres://user:password@localhost/mydb');
await boss.start();

// Enqueue
await boss.send('image-generation', { prompt, userId });

// Worker
await boss.work('image-generation', { teamSize: 4 }, async (job) => {
  const result = await callAIService(job.data.prompt);
  const url = await uploadToStorage(result, job.data.userId);
  return { url };
});
```

### Cloud-Managed Options

**AWS SQS**: Amazon's managed queue service. No infrastructure to run; scales automatically; very cheap. Does not have built-in job state tracking: you manage job state in DynamoDB or RDS yourself. Pairs well with AWS Lambda workers for serverless architectures.

**Google Cloud Tasks**: Similar managed queue with HTTP-based task dispatch. Workers are any HTTP endpoint; Tasks POSTs to your endpoint when a job is ready. Good for GCP-native stacks.

**Inngest**: A higher-level abstraction that provides step functions, retries, fan-out, and event-driven workflows. Useful when your jobs are multi-step workflows rather than single operations. Has a generous free tier.

## Queue Technology Comparison

| | BullMQ | Celery | pg-boss | AWS SQS |
|---|---|---|---|---|
| Language | Node.js | Python | Node.js | Any |
| Backing store | Redis | Redis / RabbitMQ | PostgreSQL | Managed |
| Job state tracking | Built-in | Built-in | Built-in | DIY |
| Scheduling / cron | Yes | Yes (Celery Beat) | Yes | Via EventBridge |
| Dashboard | Bull Board | Flower | Built-in | CloudWatch |
| Best for | Node + Redis stacks | Python AI/data | Simple, Postgres-only | Serverless / AWS |
| Operational overhead | Low (if Redis exists) | Moderate | Very low | None |

## Retry Logic and Exponential Backoff

Jobs fail. External AI APIs are unavailable. Storage writes time out. The database rejects a connection. A worker process is killed mid-job. The queue system must handle all of these scenarios automatically.

**Exponential backoff** is the standard retry strategy: wait longer between each retry attempt. After a first failure, retry after 10 seconds. After a second failure, retry after 40 seconds. After a third failure, retry after 160 seconds. This prevents a temporary outage from creating a thundering herd of retries that overwhelms a recovering service.

Retry configuration in BullMQ:

```javascript
{
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 10000, // 10s initial delay
  },
}
```

Not all failures should be retried. A job that fails because the user submitted invalid input (a prompt that violates content policy, a file that is corrupted) will fail again on every retry. These are permanent failures, mark them failed immediately and do not consume retry budget. Use error type detection in your worker to distinguish transient failures (network errors, rate limits) from permanent failures.

## Dead Letter Queues

A dead letter queue (DLQ) is where jobs go after exhausting all retry attempts. Without a DLQ, permanently failed jobs are silently dropped or lost. With a DLQ, you have a durable record of everything that failed, which serves three purposes:

1. **Debugging**: Failed jobs in the DLQ contain their input data and the full error stack trace. You can inspect exactly what went wrong.
2. **Replay**: Once the underlying problem is fixed (the AI service is back up, the storage configuration is corrected), you can replay DLQ jobs without asking users to resubmit.
3. **Alerting**: Monitoring the DLQ depth is a meaningful signal. A growing DLQ means something systemic is broken.

In BullMQ, failed jobs are retained in a `failed` state by default. In AWS SQS, you configure a separate SQS queue as the DLQ and set a `maxReceiveCount` threshold. In Celery, failed tasks are visible in the Flower dashboard and can be retried from there.

## Monitoring

Queue health requires three categories of metrics:

**Queue depth**: How many jobs are in `pending` state right now? A growing pending count means workers cannot keep up with the arrival rate. This is the leading indicator of a capacity problem. Alert if pending depth exceeds your acceptable latency threshold (e.g., if each job takes 30 seconds and you have 100 pending jobs and 5 workers, jobs will wait 10 minutes).

**Job duration**: The p50 and p95 processing time per job type. Sudden increases indicate the AI service is degraded or a new code path is running slower than expected.

**Failure rate**: The percentage of jobs that fail on a given time window. Spikes indicate external dependency outages. A sustained non-zero failure rate on a queue that was previously clean requires investigation.

**DLQ depth**: Any growth in dead-letter queue depth requires immediate attention. Set an alert at any value above zero for production systems.

For BullMQ, the Bull Board dashboard provides real-time queue metrics. For Celery, Flower is the standard dashboard. For production systems, export metrics to your observability platform (Prometheus + Grafana, Datadog) so that queue health is visible alongside your API metrics.

## Real Example: Virtual Try-On Job Flow

An AI application where users upload a photo and try on clothing virtually. The AI inference takes 15–45 seconds per image pair, far too slow for a synchronous endpoint.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Upload</span>
    <span class="bz-flow-step-name">User uploads photos</span>
    <span class="bz-flow-step-desc">POST /try-on with person_photo and garment_photo; files stored to S3 immediately</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Queue</span>
    <span class="bz-flow-step-name">Job enqueued</span>
    <span class="bz-flow-step-desc">API creates job record in DB, enqueues to Redis; returns {"jobId": "xyz", "status": "pending"} in 120ms</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Worker</span>
    <span class="bz-flow-step-name">Try-on worker processes</span>
    <span class="bz-flow-step-desc">Worker dequeues; downloads S3 photos; sends to VITON AI service; waits for result (15-45s)</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Store</span>
    <span class="bz-flow-step-name">Result stored</span>
    <span class="bz-flow-step-desc">Output image uploaded to S3; DB updated with result_url and status=completed</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Poll</span>
    <span class="bz-flow-step-name">Client polls and receives</span>
    <span class="bz-flow-step-desc">GET /jobs/xyz returns status=completed + result_url; frontend renders the try-on image</span>
  </div>
</div>

The user sees a loading state with progress updates while the job processes. If the AI service is temporarily unavailable, the job retries automatically with exponential backoff. If the worker process crashes mid-job, the queue recovers the stalled job and reassigns it to another worker. None of these failure modes require user intervention or API restarts.

{{< seealso >}}
- [FastAPI](/tools/fastapi/): the Python web framework that receives the initial request and enqueues the job. The API side of this pattern.
- [Railway](/tools/railway/): deploy both the API server and the worker process as separate Railway services from one GitHub repo.
- [From Zero to Production](/guides/from-zero-to-production/): where async queues fit in the full architecture, introduced at the MVP stage for AI inference.
- [Building RAG Systems](/guides/building-rag-systems/): document ingestion pipelines use exactly this pattern. Accept the upload, queue the chunking job, return results async.
{{< /seealso >}}

## Related Articles

- [Message Queue glossary entry](/glossary/message-queue): foundational concepts: producers, consumers, durability, at-least-once delivery
- [Building RAG Systems guide](/guides/building-rag-systems): another pattern where background processing is essential for document ingestion pipelines
- [Agentic Workflows patterns](/patterns/agentic-workflows): multi-step agent execution commonly uses job queues to handle long-running orchestration

## Sources

- BullMQ documentation: https://docs.bullmq.io
- Celery documentation: https://docs.celeryq.dev
- pg-boss documentation: https://github.com/timgit/pg-boss
- AWS SQS documentation: https://docs.aws.amazon.com/sqs/
- Atlassian Engineering: "An Introduction to Message Queues" https://www.atlassian.com/microservices/microservices-architecture/message-queues
