import type { Response } from 'express';

import User from '../models/user';
import type { AuthenticatedRequest } from '../types/types';

type Success<T> = {
  _tag: 'Success';
  data: T;
};

type Failure<E> = {
  _tag: 'Failure';
  error: E;
};

type Either<T, E> = Success<T> | Failure<E>;

const success = <T>(data: T): Either<T, never> => ({ _tag: 'Success', data });
const failure = <E>(error: E): Either<never, E> => ({ _tag: 'Failure', error });

export const createUser = async (email: string, token: string) => {
  try {
    const existingUser = await User.getUserFromEmail(email);
    if (existingUser) {
      return failure('User already exists' as const);
    }
    const newUser = await User.createUser(email, token);
    console.log(`Success creatings User [${newUser.email}] at ${Date()}\n`);
    return success(newUser);
  } catch (error) {
    return failure(
      'Internal server - An error occurred while creating user' as const,
    );
  }
};

export const updateUserWordsCount = async (
  req: AuthenticatedRequest,
  res: Response,
  nbrWordsToAdd: number,
  nbrActualWords: number,
) => {
  try {
    await User.updateWordsCount(req.auth, nbrActualWords + nbrWordsToAdd);
    console.log(
      `Updating words (+${nbrWordsToAdd}) from user [${req.auth}]: ` +
        (nbrActualWords + nbrWordsToAdd) +
        `/80,000 at ${Date()}`,
    );
  } catch (error) {
    res.status(500).json({
      error:
        'Internal server - An error occurred while fetching wordsCount in db',
    });
  }
};
