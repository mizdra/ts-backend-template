import { serve } from '@hono/node-server';
import { app } from './app.js';
import { writeSchemaFile } from './graphql/schema.js';
import { prisma } from './prisma/client.js';

// npm run dev で起動したら、都度最新のスキーマを書き出す
if (process.env['NODE_ENV'] === 'development') {
  await writeSchemaFile();
}

const server = serve({ fetch: app.fetch, port: 3000 });
console.log('Server is running on http://localhost:3000');

// Graceful shutdown
server.on('close', () => {
  void prisma.$disconnect().catch((e) => {
    throw new Error('Failed to disconnect from Prisma Client', { cause: e });
  });
});
process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
