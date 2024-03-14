import type { Response } from 'express';

import { updateWordsCount } from '../db/user';
import type { AuthenticatedRequest } from '../types/types';

export const updateUserWordsCount = async (
  req: AuthenticatedRequest,
  res: Response,
  nbrWordsToAdd: number,
  nbrActualWords: number,
) => {
  try {
    await updateWordsCount(req.auth, nbrActualWords + nbrWordsToAdd);
    console.info(
      `Updated words (+${nbrWordsToAdd}) from user [${req.auth}]: ` +
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
