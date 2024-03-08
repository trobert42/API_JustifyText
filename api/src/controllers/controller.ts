import { Request, Response } from 'express';
import {
  AuthenticatedRequest,
  createUser,
  updateUserWordsCount,
} from './userController';

import { getJustifiedTextString, countWords } from './justifyTextController';

const User = require('../models/user');
const jwt = require('jsonwebtoken');

export const defaultHandler = (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ error: `API not found at ${req.url} for ${req.method}` });
};

export const postTextJustifyHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.is('text/plain')) {
    return res.status(400).json({ error: `Content-Type format not allowed` });
  }
  if (!req.body) {
    return res.status(400).json({ error: `Empty body` });
  }
  const justifiedText = getJustifiedTextString(req.body);
  const nbrWordsToAdd: number = countWords(justifiedText);
  const nbrActualWords: number = await User.getWordsCount(req.auth);

  if (nbrWordsToAdd + nbrActualWords > 80000) {
    return res.status(402).json({
      error:
        `Exceeds rate limit, number left of words authorized: ` +
        (80000 - nbrActualWords),
    });
  }
  await updateUserWordsCount(req, res, nbrWordsToAdd, nbrActualWords);
  console.log('Successfully justified text from post request!');
  res
    .status(200)
    .setHeader('Content-Type', 'text/plain')
    .send(justifiedText.toString());
};

export const postTokenHandler = (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: `Bad request, missing body or email` });
  }

  const email = req.body['email'];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: `Bad request, missing email or bad email` });
  }
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
  if (!token) {
    return res.status(500).json({ error: `Unable to retrieve token` });
  }
  createUser(req, res, token);
};
