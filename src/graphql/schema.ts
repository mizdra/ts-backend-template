import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { builder } from './builder.js';

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
  }),
});

export const schema = builder.toSchema({});

export async function writeSchemaFile() {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  await writeFile(join(fileURLToPath(import.meta.url), '../../../schema.graphql'), schemaAsString);
}
