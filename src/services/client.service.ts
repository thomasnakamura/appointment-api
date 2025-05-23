import prisma from '../config/prisma';

export const clientService = {
  create: async (userId: string, phone: string, cpf: string) => {
    const existing = await prisma.client.findUnique({ where: { userId } });
    if (existing) throw new Error('Cliente já cadastrado.');

    return await prisma.client.create({ data: { userId, phone, cpf } });
  },

  findById: async (id: string) => {
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) throw new Error('Cliente não encontrado.');
    return client;
  },

  findByUserId: async (userId: string) => {
    const client = await prisma.client.findUnique({ where: { userId } });
    if (!client) throw new Error('Cliente não encontrado.');
    return client;
  },

  update: async (id: string, data: { phone?: string; cpf?: string }) => {
    return await prisma.client.update({ where: { id }, data });
  },

  delete: async (id: string) => {
    await prisma.client.delete({ where: { id } });
  }
};
