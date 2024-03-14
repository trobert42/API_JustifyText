import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { createUser, updateUserWordsCount } from './userController';
import { getJustifiedTextString, countWords } from '../logic/justifyText';
import User from '../models/user';
import type { AuthenticatedRequest } from '../types/types';
import { getEnvs } from '../utils/getEnvs';

const wordsLimitPerDay = 80000;

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
  const nbrActualWords = (await User.getWordsCount(req.auth)) ?? 0;
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

export const postTokenHandler = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: `Bad request - missing body` });
  }

  const email = req.body.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      error: `Bad request, empty email, wrong email or wrong value for key1`,
    });
  }
  const token = jwt.sign({ email: email }, getEnvs().jwtSecret);
  if (!token) {
    return res
      .status(500)
      .json({ error: `Internal server - Unable to retrieve token` });
  }
  const createdUserResult = await createUser(req.body, token);
  if (createdUserResult._tag === 'Success') {
    return res.status(201).json({ token: token });
  } 
    if (createdUserResult.error === 'User already exists') {
      return res.status(409).json({ error: `Conflict - User already exists` });
    } 
      return res
        .status(500)
        .json({ error: `Internal server - Unable to create user` });
    
  
};
