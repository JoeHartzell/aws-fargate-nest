import {
  App,
  Stack,
  StackProps,
  aws_ecs_patterns as ECS,
  aws_ecr as ECR,
} from "aws-cdk-lib";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";

export interface FargateProps extends StackProps {
  ddbTableArn: string;
}

export class FargateStack extends Stack {
  constructor(scope: App, id: string, props: FargateProps) {
    super(scope, id, props);

    const repository = new ECR.Repository(this, "FargateRepository");

    const fargate = new ECS.ApplicationLoadBalancedFargateService(
      this,
      "ALBFargate",
      {
        publicLoadBalancer: true,
        taskImageOptions: {
          image: ContainerImage.fromEcrRepository(repository),
          containerPort: 3000,
        },
      }
    );
    fargate.taskDefinition.addToTaskRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.ddbTableArn],
        actions: ["dynamodb:GetItem", "dynamodb:PutItem"],
      })
    );
    fargate.targetGroup.configureHealthCheck({
      path: "/api/health",
    });
  }
}
