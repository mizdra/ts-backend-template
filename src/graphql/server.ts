import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema.js';

export const yoga = createYoga({
  schema,
  // Workaround for https://github.com/honojs/node-server/issues/77
  fetchAPI: { fetch, Request, ReadableStream, Response },
  graphiql: process.env['NODE_ENV'] === 'development',
  plugins: process.env['NODE_ENV'] === 'production' ? [useDisableIntrospection()] : [],
});
