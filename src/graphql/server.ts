import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection';
import { createYoga } from 'graphql-yoga';

export const yoga = createYoga({
  // Workaround for https://github.com/honojs/node-server/issues/77
  fetchAPI: { fetch, Request, ReadableStream, Response },
  graphiql: process.env['NODE_ENV'] === 'development',
  plugins: process.env['NODE_ENV'] === 'production' ? [useDisableIntrospection()] : [],
});
