import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

const server = serve({ fetch: app.fetch, port: 3000 });
// eslint-disable-next-line no-console
console.log('Server is running on http://localhost:3000');

// Graceful shutdown
server.on('close', () => {
  // TODO: disconnect from database
});
process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
