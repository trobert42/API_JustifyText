import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

export const getDb = () => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
};
