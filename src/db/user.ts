import { getDb } from './getDb';

export const createUser = async (email: string, token: string) =>
  getDb().user.create({
    data: {
      email,
      token,
    },
  });

export const getUserFromEmail = async (email: string) =>
  getDb().user.findUnique({
    where: {
      email,
    },
  });

export const getWordsCount = async (email: string) =>
  getDb()
    .user.findUnique({
      select: {
        words_count: true,
      },
      where: {
        email,
      },
    })
    .then((_) => _?.words_count ?? 0);

export const updateWordsCount = async (email: string, newWordsCount: number) =>
  getDb().user.update({
    where: {
      email,
    },
    data: {
      words_count: newWordsCount,
    },
  });

export const updateAllUserWordsCount = async (newWordsCount: number) =>
  getDb().user.updateMany({
    data: {
      words_count: newWordsCount,
    },
  });

export const getAllUsers = async () =>
  getDb().user.findMany({
    select: {
      id: true,
      email: true,
      words_count: true,
    },
  });
