import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
// graphql package には、graphql の異なるバージョンを複数 import すると実行時エラーを出す機能がある (例: v15 と v14 どちらも import するなど)。
// このエラーは同じバージョンであったとしても、ESM版とCJS版を同時に import した場合にも発動する。
// pothos や graphql-yoga では `graphql/index.js` (CJS版) が import されているようなので、実行時エラーを避けるべく、ここでも同様に CJS版 を import してる。
// ref: https://github.com/graphql/graphql-js/issues/594#issuecomment-926683870
import { printSchema, lexicographicSortSchema } from 'graphql/index.js';
import { prisma } from '../prisma/client.js';
import { builder } from './builder.js';

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
    user: t.prismaField({
      type: 'User',
      description: '指定した id のユーザを返す。ユーザが見つからなければ null。',
      nullable: true,
      args: {
        id: t.arg.id({ required: true, description: 'ID' }),
      },
      resolve: async (query, parent, args) =>
        prisma.user.findUnique({
          ...query,
          where: { id: args.id },
        }),
    }),
  }),
});

builder.prismaObject('User', {
  description: 'ユーザ',
  fields: (t) => ({
    id: t.exposeID('id', { description: 'ID' }),
    email: t.exposeString('email', { description: 'ユーザのメールアドレス' }),
    name: t.exposeString('name', { description: 'ユーザの名前' }),
  }),
});

export const schema = builder.toSchema({});
export const schemaAsString = printSchema(lexicographicSortSchema(schema));

export async function writeSchemaFile() {
  await writeFile(join(fileURLToPath(import.meta.url), '../../../schema.graphql'), schemaAsString);
}
