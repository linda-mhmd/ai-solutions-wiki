---
title: "Infrastructure as Code for AI Projects"
description: "Why IaC matters for AI reproducibility, multi-environment consistency, and cost tracking. Terraform and CDK patterns for Bedrock agents, Lambda, Step Functions, and Amplify AI apps."
date: 2026-03-25
categories: [Guides]
tags: ["devops", "intermediate", "infrastructure-as-code", "terraform", "aws-cdk", "automation", "provisioning"]
related:
  - guides/ci-cd-ai-detailed
  - guides/deployment-models-ai
  - patterns/blue-green-deployment
  - tools/github-actions
last_updated: 2026-05-30
---

Infrastructure as Code (IaC) is the practice of defining cloud resources in version-controlled configuration files rather than through the console or ad-hoc API calls. For AI projects, IaC is not optional overhead - it is the mechanism that makes your environments reproducible, your costs auditable, and your deployments consistent across dev, staging, and production.

## Why IaC Matters Specifically for AI

**Reproducibility.** A working AI system depends on a precise combination of: Lambda function code, Bedrock knowledge base configuration, OpenSearch index settings, IAM permissions, S3 bucket policies, and prompt template versions. If any of these differ between environments, your staging test tells you nothing about production behaviour. IaC encodes all of these in a single source of truth.

**Multi-environment consistency.** AI systems built through the console are notorious for "works in dev, fails in prod" failures caused by missing IAM permissions or different memory limits. IaC parameterises the differences between environments (account ID, memory size, replica count) while keeping the structure identical.

**Cost tracking.** Bedrock knowledge bases, OpenSearch Serverless collections, and SageMaker endpoints accumulate costs independently. When infrastructure is defined as code, cost attribution is clear: each module corresponds to a named resource, and AWS Cost Explorer tags map back to IaC resource names.

**Change auditability.** Every infrastructure change goes through a pull request with a `terraform plan` output showing exactly what will be created, modified, or destroyed. This prevents accidental changes and provides a complete audit log.

## Terraform for AWS AI Services

Terraform is the most widely used IaC tool for AWS. It uses a declarative language (HCL) and maintains state to track the difference between desired and actual infrastructure.

### Bedrock Agent with Knowledge Base

```hcl
# modules/bedrock-agent/main.tf

resource "aws_bedrockagent_agent" "main" {
  agent_name              = "${var.project_name}-agent-${var.environment}"
  agent_resource_role_arn = aws_iam_role.bedrock_agent.arn
  foundation_model        = var.model_id
  instruction             = file("${path.module}/instructions/${var.environment}.txt")

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
      embedding_model_arn = "arn:aws:bedrock:eu-west-1::foundation-model/amazon.titan-embed-text-v1"
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
      BEDROCK_AGENT_ID    = aws_bedrockagent_agent.main.agent_id
      BEDROCK_ALIAS_ID    = aws_bedrockagent_agent_alias.main.agent_alias_id
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
    bedrock_agent_id     = aws_bedrockagent_agent.main.agent_id
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
        MODEL_ID: 'anthropic.claude-sonnet-4-5',
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
    bedrock-agent/     # Agent + knowledge base + aliases
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

Terraform tracks deployed infrastructure in a state file. For team environments, store state in S3 with DynamoDB locking:

```hcl
terraform {
  backend "s3" {
    bucket         = "terraform-state-ai-solutions"
    key            = "ai-project/${var.environment}/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
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
- HashiCorp: Terraform best practices. [https://developer.hashicorp.com/terraform/language/style](https://developer.hashicorp.com/terraform/language/style)
- Mohamed, L. (2026). "Infrastructure as Code for AI Projects." AI Solutions Wiki. Linda Mohamed, AI & Cloud Consultant.
