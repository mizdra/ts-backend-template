import { Hono } from 'hono';
import { yoga } from '../graphql/server.js';

export const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.use('/graphql', async (context) => {
  return yoga.handle(context.req.raw, context);
});
