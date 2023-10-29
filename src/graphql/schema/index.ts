import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
// graphql package には、graphql の異なるバージョンを複数 import すると実行時エラーを出す機能がある (例: v15 と v14 どちらも import するなど)。
// このエラーは同じバージョンであったとしても、ESM版とCJS版を同時に import した場合にも発動する。
// pothos や graphql-yoga では `graphql/index.js` (CJS版) が import されているようなので、実行時エラーを避けるべく、ここでも同様に CJS版 を import してる。
// ref: https://github.com/graphql/graphql-js/issues/594#issuecomment-926683870
import { printSchema, lexicographicSortSchema } from 'graphql/index.js';
import { builder } from '../builder.js';

import './hello.js';
import './user.js';

export const schema = builder.toSchema({});
export const schemaAsString = printSchema(lexicographicSortSchema(schema));

export async function writeSchemaFile() {
  const path = join(fileURLToPath(import.meta.url), '../../../../schema.graphql');
  console.log(`Writing schema to ${path}...`);
  await writeFile(path, schemaAsString);
}
