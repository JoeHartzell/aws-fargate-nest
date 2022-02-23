import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamodbModule } from 'src/modules/dynamodb/dynamodb.module';
import { Product } from 'src/modules/dynamodb/entities/product.entity';
import { productTable } from 'src/modules/dynamodb/product.table';

import { DynamoDB } from 'aws-sdk';

@Module({
  imports: [
    HealthModule,
    DynamodbModule.forRoot({
      entities: [Product],
      table: productTable,
      documentClient: new DynamoDB.DocumentClient({
        region: 'us-east-1',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
