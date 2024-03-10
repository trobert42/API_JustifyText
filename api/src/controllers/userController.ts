import { Request, Response } from 'express';

const User = require('../models/user');
export interface AuthenticatedRequest extends Request {
  auth?: string;
}

export const createUser = async (
  req: Request,
  res: Response,
  token: string,
) => {
  const { email } = req.body;
  try {
    const existingUser = await User.getUserFromEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ error: `Conflict - Credentials taken for [${existingUser}]` });
    }
    const newUser = await User.createUser(email, token);
    console.log(`Success creating User [${newUser.email}] at ${Date()}\n`);
    return res.status(200).json({ token: `${token}` });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server - An error occurred while creating the user',
    });
  }
};

export const getWordsCountFromUser = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const words: number = await User.getWords(req.auth);
  } catch (error) {
    res.status(500).json({
      error:
        'Internal server - An error occurred while fetching wordsCount in db',
    });
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
