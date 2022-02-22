# AWS Fargate Nest Example

This repository is an example monorepo on how to setup a [Nest.js](https://nestjs.com/) service in AWS Fargate. Nest.js and docker is nothing new however, utilizing the AWS [CDK](https://aws.amazon.com/cdk/) can sometimes be challenging. This will serve as a very basic example on how to configure that. 

## Prerequisites

We will require some software in order to fully utilize this example. 

- **Node.js**
- **Docker** - Docker will be used for creating the Fargate images, and used for deploying to AWS ECR.
- **AWS CDK CLI** - This will be used for running our commands against the infrastructure package. 
- **Yarn** - This repo was built using yarn.

## Packages 📦

This monorepo contains several packages. Below are their names and descriptions.
- **web-server** - This is a fairly basic Nest.js application. This is what will be deployed to our fargate stack
- **infrastructure** - This is a Node project utilizing the AWS CDK to setup and deploy our AWS CloudFormation Stacks.

