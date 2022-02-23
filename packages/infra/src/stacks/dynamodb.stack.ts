import { App, Stack, StackProps, aws_dynamodb as Dynamodb } from "aws-cdk-lib";

export class DynamodbStack extends Stack {
  public readonly table: Dynamodb.Table;

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const tableName = "products";
    this.table = new Dynamodb.Table(this, tableName, {
      tableName,
      partitionKey: { name: "pk", type: Dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: Dynamodb.AttributeType.STRING },
      billingMode: Dynamodb.BillingMode.PAY_PER_REQUEST,
    });
  }
}
