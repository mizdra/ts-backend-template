import SchemaBuilder from '@pothos/core';
// eslint-disable-next-line import/no-named-as-default
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { prisma } from '../prisma/client.js';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    // pothos は GraphQL の仕様に準拠して ID をデフォルトで `string | number` として扱うが、
    // 扱いづらいので、ここでは `string` として扱うようにしている。型安全ではないので良くはないと思う...
    // ref: https://github.com/hayes/pothos/issues/95
    ID: {
      Input: string;
      Output: string;
    };
  };
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    filterConnectionTotalCount: true,
    onUnusedQuery: process.env['NODE_ENV'] === 'production' ? null : 'warn',
  },
});

builder.queryType();
// builder.mutationType(); // TODO: mutation 実装
