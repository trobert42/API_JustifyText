import { Request, Response } from 'express';

const User = require('../models/user');

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
        .json({ error: `Credentials [${existingUser}] taken` });
    }
    const newUser = await User.createUser(email, token);
    console.log(`User [${email}] created !`);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while creating the user' });
  }
};

export const getWordsCountFromUser = async (req: Request, res: Response) => {
  try {
    const email = 'toto@tata.com'; // to change, double check ?
    if (!email) {
      return res.status(400).json({ error: `User ${email} not found` });
    }
    const words: number = await User.getWords(email);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching wordsCount in db' });
  }
};

export const updateUserWordsCount = async (
  req: Request,
  res: Response,
  nbrWordsToAdd: number,
  nbrActualWords: number,
) => {
  try {
    const email = 'toto@tata.com'; // to change, double check ?
    if (!email) {
      return res.status(400).json({ error: `User ${email} not found` });
    }
    await User.updateUserWordsCount(email, nbrActualWords + nbrWordsToAdd);
    console.log(
      'Updating count of words : ' + (nbrActualWords + nbrWordsToAdd),
    );
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching wordsCount in db' });
  }
};
