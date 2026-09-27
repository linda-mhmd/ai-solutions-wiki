---
title: "Infrastructure as Code for AI Projects"
description: "Why IaC matters for AI reproducibility, multi-environment consistency, and cost tracking. Terraform and CDK patterns for Bedrock AgentCore agents and knowledge bases, Lambda, Step Functions, and Amplify AI apps."
date: 2026-03-25
categories: [Guides]
tags: ["devops", "intermediate", "infrastructure-as-code", "terraform", "aws-cdk", "automation", "provisioning"]
related:
  - guides/ci-cd-ai-detailed
  - guides/deployment-models-ai
  - patterns/blue-green-deployment
  - tools/github-actions
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Infrastructure as Code (IaC) is the practice of defining cloud resources in version-controlled configuration files rather than through the console or ad-hoc API calls. For AI projects, IaC is not optional overhead - it is the mechanism that makes your environments reproducible, your costs auditable, and your deployments consistent across dev, staging, and production.

## Why IaC Matters Specifically for AI

**Reproducibility.** A working AI system depends on a precise combination of: Lambda function code, Bedrock knowledge base configuration, OpenSearch index settings, IAM permissions, S3 bucket policies, and prompt template versions. If any of these differ between environments, your staging test tells you nothing about production behaviour. IaC encodes all of these in a single source of truth.

**Multi-environment consistency.** AI systems built through the console are notorious for "works in dev, fails in prod" failures caused by missing IAM permissions or different memory limits. IaC parameterises the differences between environments (account ID, memory size, replica count) while keeping the structure identical.

**Cost tracking.** Bedrock knowledge bases, OpenSearch Serverless collections, and SageMaker endpoints accumulate costs independently. When infrastructure is defined as code, cost attribution is clear: each module corresponds to a named resource, and AWS Cost Explorer tags map back to IaC resource names.

**Change auditability.** Every infrastructure change goes through a pull request with a `terraform plan` output showing exactly what will be created, modified, or destroyed. This prevents accidental changes and provides a complete audit log.

## Terraform for AWS AI Services

Terraform is the most widely used IaC tool for AWS. It uses a declarative language (HCL) and maintains state to track the difference between desired and actual infrastructure.

### Bedrock AgentCore Agent with Knowledge Base

New agent builds on AWS should target Amazon Bedrock AgentCore. The original Bedrock Agents feature (`aws_bedrockagent_agent`), now called Bedrock Agents Classic, closed to new customers on 30 July 2026 and is in maintenance mode; existing agents keep working, and Bedrock Knowledge Bases are unaffected. With AgentCore Runtime you package the agent (built with any framework) as a container image, and Terraform deploys it:

```hcl
# modules/bedrock-agent/main.tf

resource "aws_bedrockagentcore_agent_runtime" "main" {
  agent_runtime_name = "${var.project_name}_agent_${var.environment}"
  role_arn           = aws_iam_role.agentcore_runtime.arn

  agent_runtime_artifact {
    container_configuration {
      container_uri = "${aws_ecr_repository.agent.repository_url}:${var.agent_image_tag}"
    }
  }

  network_configuration {
    network_mode = "PUBLIC"
  }

  environment_variables = {
    MODEL_ID          = var.model_id
    KNOWLEDGE_BASE_ID = aws_bedrockagent_knowledge_base.main.id
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_bedrockagent_knowledge_base" "main" {
  name     = "${var.project_name}-kb-${var.environment}"
  role_arn = aws_iam_role.knowledge_base.arn

  knowledge_base_configuration {
    type = "VECTOR"
    vector_knowledge_base_configuration {
      embedding_model_arn = "arn:aws:bedrock:eu-west-1::foundation-model/amazon.titan-embed-text-v2:0"
    }
  }

  storage_configuration {
    type = "OPENSEARCH_SERVERLESS"
    opensearch_serverless_configuration {
      collection_arn    = aws_opensearchserverless_collection.main.arn
      vector_index_name = "bedrock-knowledge-base"
      field_mapping {
        vector_field   = "embedding"
        text_field     = "text"
        metadata_field = "metadata"
      }
    }
  }
}
```

### Lambda Function for AI Handler

```hcl
resource "aws_lambda_function" "ai_handler" {
  function_name = "${var.project_name}-handler-${var.environment}"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "handler.lambda_handler"
  runtime       = "python3.12"

  s3_bucket = var.deployment_bucket
  s3_key    = var.lambda_s3_key

  memory_size = var.environment == "production" ? 1024 : 512
  timeout     = 30

  environment {
    variables = {
      AGENT_RUNTIME_ARN   = aws_bedrockagentcore_agent_runtime.main.agent_runtime_arn
      ENVIRONMENT         = var.environment
      LOG_LEVEL           = var.environment == "production" ? "INFO" : "DEBUG"
    }
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
```

### Step Functions Workflow

```hcl
resource "aws_sfn_state_machine" "ai_pipeline" {
  name     = "${var.project_name}-pipeline-${var.environment}"
  role_arn = aws_iam_role.step_functions.arn

  definition = templatefile("${path.module}/state-machine.json.tpl", {
    lambda_arn           = aws_lambda_function.ai_handler.arn
    agent_runtime_arn    = aws_bedrockagentcore_agent_runtime.main.agent_runtime_arn
    s3_output_bucket     = aws_s3_bucket.outputs.arn
  })
}
```

## CDK for Amplify AI Applications

AWS CDK (Cloud Development Kit) lets you define infrastructure in TypeScript or Python. It generates CloudFormation templates and is the natural choice for teams building Amplify-based AI applications.

```typescript
// lib/ai-solutions-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class AiSolutionsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const aiHandler = new lambda.Function(this, 'AiHandler', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('lambda'),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      environment: {
        MODEL_ID: 'us.anthropic.claude-sonnet-5',  // geo inference profile; required for on-demand Sonnet 5
      },
    });

    // Grant Bedrock invoke permissions
    aiHandler.addToRolePolicy(new iam.PolicyStatement({
      actions: ['bedrock:InvokeModel'],
      resources: [`arn:aws:bedrock:${this.region}::foundation-model/*`],
    }));
  }
}
```

## Modular Design

Structure Terraform as modules, not a flat file. Each module corresponds to a logical component:

```
infra/
  modules/
    bedrock-agent/     # AgentCore runtime + knowledge base + ECR repository
    lambda-handler/    # Lambda + API Gateway + IAM role
    step-functions/    # Workflow definition + IAM
    storage/           # S3 buckets + lifecycle rules
    monitoring/        # CloudWatch dashboards + alarms
  environments/
    dev/
      main.tf          # Calls modules with dev variables
      variables.tf
    staging/
      main.tf
    production/
      main.tf
```

Each environment directory calls the same modules with different variable values. This is environment promotion: the same infrastructure definition runs in all environments with environment-specific parameters.

## State Management

Terraform tracks deployed infrastructure in a state file. For team environments, store state in S3 with S3-native state locking (`use_lockfile`). The older DynamoDB-based locking (`dynamodb_table`) is deprecated in current Terraform releases. A backend block cannot reference variables, so give each environment directory its own literal `key` (or pass it with `-backend-config`):

```hcl
# infra/environments/staging/backend.tf
terraform {
  backend "s3" {
    bucket       = "terraform-state-ai-solutions"
    key          = "ai-project/staging/terraform.tfstate"
    region       = "eu-west-1"
    encrypt      = true
    use_lockfile = true
  }
}
```

Never store the state file locally when working in a team. Local state causes conflicts and cannot be shared.

## Environment Promotion

The promotion sequence is: dev -> staging -> production. Infrastructure changes flow in one direction. Never apply production configuration directly; always promote through the lower environments first.

In a GitHub Actions pipeline:

```yaml
- name: Plan staging
  run: terraform -chdir=infra/environments/staging plan -var-file=staging.tfvars

- name: Apply staging
  run: terraform -chdir=infra/environments/staging apply -auto-approve -var-file=staging.tfvars

# Manual approval gate before production
- name: Apply production
  if: github.ref == 'refs/tags/v*'
  run: terraform -chdir=infra/environments/production apply -var-file=production.tfvars
```

## Sources and Further Reading

- Terraform Documentation: Getting started with Terraform. [https://www.terraform.io/docs](https://www.terraform.io/docs)
- AWS Documentation: AWS CDK v2 Developer Guide. [https://docs.aws.amazon.com/cdk/v2/guide/home.html](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- AWS Documentation: Amazon Bedrock Terraform provider resources. [https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrockagent_agent](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrockagent_agent)
- Terraform AWS provider: `aws_bedrockagentcore_agent_runtime` resource. [https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrockagentcore_agent_runtime](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrockagentcore_agent_runtime)
- AWS Documentation: Amazon Bedrock Agents Classic maintenance mode. [https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html)
- AWS Documentation: Claude Sonnet 5 model card (on-demand calls use a geo or global inference profile such as `us.anthropic.claude-sonnet-5`). [https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-sonnet-5.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-sonnet-5.html)
- HashiCorp: Terraform S3 backend (S3-native locking with `use_lockfile`; DynamoDB locking deprecated). [https://developer.hashicorp.com/terraform/language/backend/s3](https://developer.hashicorp.com/terraform/language/backend/s3)
- HashiCorp: Terraform best practices. [https://developer.hashicorp.com/terraform/language/style](https://developer.hashicorp.com/terraform/language/style)
- Mohamed, L. (2026). "Infrastructure as Code for AI Projects." AI Solutions Wiki. Linda Mohamed, AI & Cloud Consultant.
