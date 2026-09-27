---
title: "Model Versioning and Artifact Management"
description: "Why model versioning matters and how to implement it: S3 for artifacts, Git for configuration, SageMaker Model Registry, Bedrock model version pinning, and rollback procedures."
date: 2026-03-25
categories: [Patterns]
tags: ["ai-ml", "intermediate", "model-versioning", "mlops", "deployment", "rollback", "model-management"]
related:
  - glossary/drift-detection
  - patterns/blue-green-deployment
  - patterns/canary-deployment
  - guides/ci-cd-ai-detailed
  - tools/amazon-bedrock
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

A model version is a specific combination of: model weights, prompt template, configuration parameters, and evaluation metrics - captured at a point in time. Without versioning, you cannot reproduce a previous model's behaviour, cannot attribute a quality change to a specific deployment, and cannot roll back to a known-good state. For production AI systems, model versioning is the mechanism that makes deployments auditable and reversible.

## What Constitutes a "Model Version"

A model version in a production AI system is not just the model weights. It includes everything needed to reproduce the model's behaviour:

**For Bedrock-based systems (using managed foundation models):**
- Bedrock model ID or inference profile ID (e.g. `eu.anthropic.claude-opus-5-5`)
- Prompt template text (stored in S3 or Git, not hardcoded)
- System prompt text
- Inference parameters (temperature, max tokens, top-p)
- Knowledge base ID and data source version
- Agent version identifier (AgentCore Runtime version and endpoint, or the agent alias ID for existing Bedrock Agents Classic deployments)

**For SageMaker-based systems (custom or fine-tuned models):**
- Model artifact S3 URI (the model weights)
- Container image URI and digest
- Instance type and configuration
- Environment variables in the serving container
- Preprocessing and postprocessing script versions

## S3 for Model Artifacts

Model weights are binary files, often gigabytes in size. They do not belong in Git. S3 with versioning enabled is the standard storage layer.

**Bucket structure:**
```
s3://ai-model-artifacts/
  models/
    fine-tuned-llama-v1/
      model.tar.gz          <- SageMaker format
      config.json
      evaluation-results.json
    fine-tuned-llama-v2/
      model.tar.gz
      config.json
      evaluation-results.json
  configs/
    {git-sha}/
      bedrock-config.json   <- Prompt templates + parameters
      agent-config.json
```

Enable S3 Object Versioning on the bucket so that overwritten objects remain recoverable. Enable S3 server-side encryption with a customer-managed KMS key for model artifacts that contain proprietary training data influence.

**Uploading with metadata:**
```python
import boto3

s3 = boto3.client('s3')

s3.upload_file(
    'model.tar.gz',
    'ai-model-artifacts',
    f'models/{model_name}/model.tar.gz',
    ExtraArgs={
        'Metadata': {
            'git-sha': GIT_SHA,
            'training-date': '2026-03-25',
            'base-model': 'meta.llama3-8b-instruct-v1',
            'eval-accuracy': '0.87',
            'training-dataset-version': 'v3.2'
        }
    }
)
```

## Git for Model Configuration

Prompt templates, agent instructions, and inference parameters belong in Git alongside application code. They are text files that change over time, require review processes, and need rollback capability.

**Repository structure:**
```
prompts/
  system-prompt.txt          <- Base system prompt
  rag-prompt-template.txt    <- RAG query prompt
  evaluation-prompt.txt      <- Used in CI for quality checks
config/
  bedrock-config.json        <- Model ID, parameters
  agent-config.json          <- Agent instructions, tool definitions
```

**bedrock-config.json:**
```json
{
  "model_id": "eu.anthropic.claude-opus-5-5",
  "inference_config": {
    "temperature": 0.1,
    "max_tokens": 2048,
    "top_p": 0.9
  },
  "prompt_template_file": "prompts/rag-prompt-template.txt",
  "prompt_template_version": "git-sha-here"
}
```

Checking this file into Git ensures that every deployment has a traceable prompt template version in the commit history.

## SageMaker Model Registry

SageMaker Model Registry is a managed model catalogue that stores model metadata, evaluation metrics, and approval status. It provides the approval workflow between model training and deployment.

**Registering a model:**
```python
import boto3

sm = boto3.client('sagemaker')

model_package = sm.create_model_package(
    ModelPackageGroupName='ai-solutions-models',
    ModelPackageDescription=f'Fine-tuned Llama, git sha {GIT_SHA}',
    InferenceSpecification={
        'Containers': [{
            'Image': INFERENCE_IMAGE_URI,
            'ModelDataUrl': f's3://ai-model-artifacts/models/{model_name}/model.tar.gz'
        }],
        'SupportedRealtimeInferenceInstanceTypes': ['ml.g5.2xlarge'],
        'SupportedContentTypes': ['application/json'],
        'SupportedResponseMIMETypes': ['application/json']
    },
    ModelApprovalStatus='PendingManualApproval',
    CustomerMetadataProperties={
        'eval-accuracy': '0.87',
        'eval-f1': '0.84',
        'git-sha': GIT_SHA,
        'training-date': '2026-03-25'
    }
)
```

**Approval workflow:** Model registry supports `PendingManualApproval`, `Approved`, and `Rejected` states. A CI pipeline can block production deployment until a human approves the model version in the registry.

## Bedrock Model Version Pinning

Foundation models in Bedrock are versioned: each model ID refers to one fixed model version. Never resolve the model at runtime from a floating "latest" alias (in your own config layer, an AI gateway, or a provider alias that can be repointed) - the model behind it can change without a deployment, changing your system's behaviour.

**Always pin to a specific model ID in version-controlled config:**
```python
# Bad: behaviour changes when someone repoints the alias
model_id = MODEL_ALIASES["claude-latest"]

# Good: locked to this exact model (EU geo inference profile)
model_id = "eu.anthropic.claude-opus-5-5"
```

Older Anthropic models on Bedrock carried a date stamp in the ID (for example `anthropic.claude-haiku-4-5-20251001-v1:0`); newer ones such as `anthropic.claude-opus-5-5` do not, but the ID still identifies a single model version. Some models can only be called on demand through a geo or global inference profile ID (the `us.`, `eu.` or `global.` prefix), so record the exact ID you call, including the prefix. When a new model version is released, treat the model ID change as a deployment requiring evaluation, not an automatic upgrade.

Pinning does not stop retirement. Each Bedrock model card shows an "EOL no sooner than" date, and once a model enters its Legacy period new customers cannot adopt it; track these dates for every pinned ID and schedule the migration and re-evaluation before EOL.

## Rollback Procedures

**Bedrock/Lambda systems:**
1. Identify the last known-good model configuration: `git log -- config/bedrock-config.json`
2. Retrieve the configuration from that commit
3. Deploy the previous configuration (triggers CI pipeline with previous version)
4. Update Lambda alias to point to previous function version

**SageMaker endpoints:**
1. Identify the previous model package version in SageMaker Model Registry
2. Create a new endpoint configuration pointing to the previous approved model
3. Update the endpoint to use the previous configuration
4. SageMaker handles the instance swap without downtime when using blue-green or canary endpoint update strategies

## Reproducibility Requirements

Documenting what was deployed is not sufficient for reproducibility. You must be able to recreate the exact system state from stored artefacts. This requires:

- Model artifact pinned to a specific S3 URI (not a path that gets overwritten)
- Prompt templates pinned to a specific Git commit SHA
- Exact Bedrock model or inference profile ID
- Infrastructure configuration stored in Git (IaC)
- Training data version documented (even if the data itself is not stored alongside the model)

## Sources and Further Reading

- AWS Documentation: Amazon SageMaker Model Registry. [https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html](https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html)
- AWS Documentation: Amazon Bedrock model IDs. [https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html)
- AWS Documentation: Claude Opus 5.5 model card (model and inference profile IDs, EOL no sooner than 22 September 2027), accessed 25 September 2026. [https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-opus-5-5.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-opus-5-5.html)
- AWS Documentation: Amazon Bedrock model lifecycle (Active, Legacy, EOL), accessed 25 September 2026. [https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html)
- AWS Documentation: Bedrock Agents Classic maintenance mode, accessed 25 September 2026. [https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html)
- AWS Documentation: S3 object versioning. [https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)
- Sculley, D. et al. (2015). "Hidden Technical Debt in Machine Learning Systems." Advances in Neural Information Processing Systems 28. - The original paper identifying reproducibility as a core ML operations challenge.
