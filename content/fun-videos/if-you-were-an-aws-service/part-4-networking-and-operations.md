---
title: "Part 4: Networking and operations"
description: "Part 4 of If You Were an AWS Service, a fun intro to AWS: the answers that picked VPC Lattice, Route 53, CloudFormation, Step Functions, CodeBuild, Application Load Balancer, CloudWatch, the console and Wavelength."
date: 2026-11-12
last_updated: 2026-11-13
lastmod: 2026-11-13
weight: 4
part: 4
group: "Networking & operations"
summary: "How requests find your services, how infrastructure gets built from a template, how work runs step by step, and how you watch it all."
tags: ["aws", "beginner", "video", "networking", "infrastructure-as-code", "observability"]
services: ["aws-step-functions", "amazon-cloudwatch", "terraform"]
---

This part is about the services that connect, build, run and watch everything else. Where a reason is not written below, it is in the full video.

### Amazon VPC Lattice

> **The answers:** two people pick VPC Lattice.

VPC Lattice connects your services across VPCs and accounts, without peering or a transit gateway in between. You put services into a service network and Lattice does the routing. Who may call whom can be set with an IAM policy.

### Amazon Route 53

> **The answer:** one person picks Route 53.

Route 53 is AWS's DNS service: it registers domains, answers DNS lookups and checks the health of your endpoints. When you type a name, a resolver asks a root server first, then the server for dot com, and only then the name servers that hold the answer. The name comes from the port DNS answers on: 53.

### AWS CloudFormation, and "AWS Terraform"

> **The answers:** one person picks CloudFormation. Another names a service that does not exist: "AWS Terraform".

CloudFormation sets up your AWS resources from a template, a text file in YAML or JSON that describes everything you want. It creates it all as one stack, works out what depends on what, and builds everything in the right order. Many people now write it as code with the open-source AWS CDK. "AWS Terraform" is the joke: Terraform is not an AWS service but a separate infrastructure-as-code tool from HashiCorp, and the explainer tells where it comes from and how it meets CloudFormation.

### AWS Step Functions and AWS CodeBuild

> **The answers:** Step Functions, because it can orchestrate whatever workflow you like. And CodeBuild, the worker that runs the commands.

Step Functions lets you build workflows, called state machines, that run AWS services step by step, with tasks, choices, parallel branches, loops and waits. CodeBuild is a managed build service: it compiles your code, runs tests and produces artifacts. The two answers fit together: a workflow can start a CodeBuild job and wait until it is done.

### Application Load Balancer

> **The answer:** one person picks the Application Load Balancer.

An Application Load Balancer is one front door that spreads web requests across your servers and functions. It reads every request, checks which targets are healthy, and sends the request on to an EC2 instance, an IP address or a Lambda function. Listeners, rules and target groups decide where each request goes.

### Amazon CloudWatch

> **The answer:** CloudWatch, because it likes to collect all the insights and then act on them.

That is how CloudWatch works. It collects metrics, logs and traces from your AWS resources and your apps. An alarm watches a metric, and when its state changes, it acts: it sends a notification, scales out, or runs a Lambda function.

### AWS Management Console and AWS Wavelength

> **The answers:** one person picks the Management Console, another Wavelength.

The console is one web app that opens every AWS service console, with search and even a shell in your browser, CloudShell. It started in 2009, with just EC2. Wavelength puts AWS compute and storage at the edge of mobile networks, close to the people using them.

## Sources

1. Amazon VPC Lattice User Guide, "What is Amazon VPC Lattice?": https://docs.aws.amazon.com/vpc-lattice/latest/ug/what-is-vpc-lattice.html
2. Amazon Route 53 Developer Guide, "What is Amazon Route 53?": https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html
3. Amazon Route 53 features ("comes from the fact that DNS servers respond to queries on port 53"): https://aws.amazon.com/route53/features/
4. AWS CloudFormation User Guide, "What is CloudFormation?": https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html
5. AWS CDK v2 Developer Guide, "What is the AWS CDK?": https://docs.aws.amazon.com/cdk/v2/guide/home.html
6. HashiCorp, Terraform introduction: https://developer.hashicorp.com/terraform/intro
7. AWS Step Functions Developer Guide, "Manage AWS CodeBuild builds with Step Functions": https://docs.aws.amazon.com/step-functions/latest/dg/connect-codebuild.html
8. AWS CodeBuild User Guide, "What is AWS CodeBuild?": https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html
9. Elastic Load Balancing, "What is an Application Load Balancer?": https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html
10. Amazon CloudWatch User Guide, "Using Amazon CloudWatch alarms": https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html
11. AWS, "Announcing the AWS Management Console" (8 January 2009; initial release for Amazon EC2): https://aws.amazon.com/about-aws/whats-new/2009/01/08/announcing-the-aws-management-console/
12. AWS CloudShell User Guide, "What is AWS CloudShell?": https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html
13. AWS Wavelength Developer Guide, "What is AWS Wavelength?": https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html
