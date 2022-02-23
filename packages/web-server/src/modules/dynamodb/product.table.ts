import { Table } from '@typedorm/common';

export const productTable = new Table({
  name: 'products',
  partitionKey: 'pk',
  sortKey: 'sk',
});
