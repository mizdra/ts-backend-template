import { serve } from '@hono/node-server';
import { writeSchemaFile } from './graphql/schema.js';
import { app } from './lib/app.js';

// npm run dev で起動したら、都度最新のスキーマを書き出す
if (process.env['NODE_ENV'] === 'development') {
  await writeSchemaFile();
}

const server = serve({ fetch: app.fetch, port: 3000 });
// eslint-disable-next-line no-console
console.log('Server is running on http://localhost:3000');

// Graceful shutdown
server.on('close', () => {
  // TODO: disconnect from database
});
process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
