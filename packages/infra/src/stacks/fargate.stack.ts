import {
  App,
  Stack,
  StackProps,
  aws_ecs_patterns as ECS,
  aws_ecr as ECR,
} from 'aws-cdk-lib';
import { ContainerImage } from 'aws-cdk-lib/aws-ecs';

export class FargateStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new ECR.Repository(this, 'FargateRepository');

    const fargate = new ECS.ApplicationLoadBalancedFargateService(
      this,
      'ALBFargate',
      {
        publicLoadBalancer: true,
        taskImageOptions: {
          image: ContainerImage.fromEcrRepository(repository),
          containerPort: 3000,
        },
      },
    );

    fargate.targetGroup.configureHealthCheck({
      path: '/api/health',
    });
  }
}
