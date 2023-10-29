// Usage: npx prisma db seed

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
