import { expect, it } from 'vitest';
import { schemaAsString } from './graphql/schema/index.js';

it('最新のスキーマが書き出されている', async () => {
  await expect(schemaAsString).toMatchFileSnapshot('../schema.graphql');
});
