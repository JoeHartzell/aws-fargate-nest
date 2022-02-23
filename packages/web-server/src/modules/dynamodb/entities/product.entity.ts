import {
  Attribute,
  AutoGenerateAttribute,
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Entity,
} from '@typedorm/common';
import { productTable } from 'src/modules/dynamodb/product.table';

@Entity({
  name: 'product',
  table: productTable,
  primaryKey: {
    partitionKey: 'PRODUCT#{{id}}',
    sortKey: 'PRODUCT',
  },
})
export class Product {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  description: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  timestamp: number;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true,
  })
  updatedAt: number;
}
