#!/usr/bin/env -S node --env-file .env.development --import tsx/esm
// Usage: `npx prisma db seed`

import { prisma } from '../src/prisma/client.js';

try {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      id: '0',
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  });
  console.log({ alice });
} finally {
  await prisma.$disconnect();
}
