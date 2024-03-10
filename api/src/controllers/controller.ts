import { Request, Response } from 'express';
import {
  AuthenticatedRequest,
  createUser,
  updateUserWordsCount,
} from './userController';

import { getJustifiedTextString, countWords } from './justifyTextController';

const wordsLimitPerDay = 80000;
const User = require('../models/user');
const jwt = require('jsonwebtoken');

export const defaultHandler = (req: Request, res: Response) => {
  return res.status(404).json({
    error: `Not Found - API not found at ${req.url} for ${req.method}`,
  });
};

export const postTextJustifyHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.is('text/plain')) {
    return res
      .status(400)
      .json({ error: `Bad request - Content-Type format not allowed` });
  }
  if (!req.body) {
    return res.status(400).json({ error: `Bad request - Empty body` });
  }
  const justifiedText = getJustifiedTextString(req.body);
  const nbrWordsToAdd: number = countWords(justifiedText);
  const nbrActualWords: number = await User.getWordsCount(req.auth);

  if (nbrWordsToAdd + nbrActualWords > wordsLimitPerDay) {
    return res.status(402).json({
      error:
        `Payment required - Exceeded rate limit for today, number left of words authorized: ` +
        (80000 - nbrActualWords),
    });
  }
  await updateUserWordsCount(req, res, nbrWordsToAdd, nbrActualWords);
  console.log('Successfully justified text from post request!\n');
  res
    .status(200)
    .setHeader('Content-Type', 'text/plain')
    .send(justifiedText.toString());
};

export const postTokenHandler = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: `Bad request - missing body` });
  }

  const email = req.body['email'];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      error: `Bad request, empty email, wrong email or wrong value for key1`,
    });
  }
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
  if (!token) {
    return res
      .status(500)
      .json({ error: `Internal server - Unable to retrieve token` });
  }
  createUser(req, res, token);
};
