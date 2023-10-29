import { prisma } from '../../prisma/client.js';
import { builder } from '../builder.js';

builder.queryFields((t) => ({
  user: t.prismaField({
    type: 'User',
    description: '指定した id のユーザを返す。ユーザが見つからなければ null。',
    nullable: true,
    args: {
      id: t.arg.id({ required: true, description: 'ID' }),
    },
    resolve: async (query, parent, args) =>
      prisma.user.findUnique({
        ...query,
        where: { id: args.id },
      }),
  }),
}));

builder.prismaObject('User', {
  description: 'ユーザ',
  fields: (t) => ({
    id: t.exposeID('id', { description: 'ID' }),
    email: t.exposeString('email', { description: 'ユーザのメールアドレス' }),
    name: t.exposeString('name', { description: 'ユーザの名前' }),
  }),
});
