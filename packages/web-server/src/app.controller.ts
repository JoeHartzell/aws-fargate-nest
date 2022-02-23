import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { EntityManager, getScanManager } from '@typedorm/core';
import faker from '@faker-js/faker';
import { ENTITY_MANAGER_PROVIDER } from 'src/modules/dynamodb/dynamodb.module';
import { Product } from 'src/modules/dynamodb/entities/product.entity';

@Controller()
export class AppController {
  constructor(
    @Inject(ENTITY_MANAGER_PROVIDER) private readonly db: EntityManager,
  ) {}

  @Post()
  async create() {
    const product = new Product();
    product.name = faker.commerce.product();
    product.description = faker.commerce.productDescription();

    const result = await this.db.create(product);

    return result;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.db.findOne(Product, {
      id,
    });
  }
}
