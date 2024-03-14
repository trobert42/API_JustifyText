import type { Request, Response } from 'express';
import * as jose from 'jose';

import { updateUserWordsCount } from './userController';
import { createUser, getWordsCount } from '../db/user';
import { getJustifiedTextString, countWords } from '../logic/justifyText';
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
  const nbrActualWords = await getWordsCount(req.auth);
  if (nbrWordsToAdd + nbrActualWords > wordsLimitPerDay) {
    return res.status(402).json({
      error:
        `Payment required - Exceeded rate limit for today, number left of words authorized: ` +
        (80000 - nbrActualWords),
    });
  }
  await updateUserWordsCount(req, res, nbrWordsToAdd, nbrActualWords);
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

  const secret = new TextEncoder().encode(getEnvs().jwtSecret);

  const token = await new jose.SignJWT({ email })
    .setExpirationTime('8h')
    .setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT',
    })
    .sign(secret);

  try {
    const createdUserResult = await createUser(email, token);
    return res.status(201).json({ token: createdUserResult.token });
  } catch (error) {
    return res.status(409).json({ error: `Conflict - User already exists` });
  }
};
