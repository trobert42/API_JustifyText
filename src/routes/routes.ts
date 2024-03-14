import type { Request, Response } from 'express';
import express from 'express';

import { textJustifyHandler } from './justify';
import { tokenHandler, tokenSchema } from './token';
import auth from '../middleware/auth';
import type { AuthenticatedRequest } from '../types/types';

export const router = express.Router();

const baseRoute = '/api';

const isRequestValid = (req: Request, res: Response) => {
  if (!req.is('text/plain')) {
    res
      .status(400)
      .json({ error: `Bad request - Content-Type format not allowed` });
    return false;
  }
  if (!req.body) {
    res.status(400).json({ error: `Bad request - Empty body` });
    return false;
  }
  return true;
};

router.post(`${baseRoute}/justify`, auth, async (req, res) => {
  if (isRequestValid(req, res)) {
    const email = (req as AuthenticatedRequest).email;
    const textToJustify = req.body;
    const justifiedTextResult = await textJustifyHandler(email, textToJustify);
    if (justifiedTextResult._tag === 'succeed') {
      res
        .status(200)
        .setHeader('Content-Type', 'text/plain')
        .send(justifiedTextResult.justifiedText);
    } else if (justifiedTextResult.error === 'max_limit_reached') {
      res.status(402).json({
        error:
          `Payment required - Exceeded rate limit for today, number left of words authorized: ` +
          justifiedTextResult.remaining,
      });
    } else {
      res.status(500).json({
        error:
          'Internal server - An error occurred while fetching wordsCount in db',
      });
    }
  }
});

router.post(`${baseRoute}/token`, async (req, res) => {
  if (isRequestValid(req, res)) {
    const decodedSchema = tokenSchema.safeParse(req.body);
    if (!decodedSchema.success) {
      return res.status(400).json({
        error: `Bad request, empty email, wrong email or wrong value for key1`,
      });
    }
    const createdUser = await tokenHandler(decodedSchema.data.email);
    if (createdUser) {
      res.status(201).json({ token: createdUser.token });
    } else {
      res.status(409).json({ error: `Conflict - User already exists` });
    }
  }
});

router.use((req, res) =>
  res.status(404).json({
    error: `Not Found - API not found at ${req.url} for ${req.method}`,
  }),
);
