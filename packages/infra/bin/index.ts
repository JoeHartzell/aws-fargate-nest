#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { FargateStack } from "../src/stacks/fargate.stack";
import { DynamodbStack } from "../src/stacks/dynamodb.stack";

const app = new App();

const ddbStack = new DynamodbStack(app, "InfraStack-ddb");
const fargateStack = new FargateStack(app, "InfraStack", {
  ddbTableArn: ddbStack.table.tableArn,
});

fargateStack.addDependency(ddbStack, "Fargate services require DDB");
