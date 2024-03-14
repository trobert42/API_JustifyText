import express from 'express';

import {
  postTextJustifyHandler,
  postTokenHandler,
} from '../controllers/justifyTextController';
import auth from '../middleware/auth';
import type { AuthenticatedRequest } from '../types/types';

export const router = express.Router();

router.post('/api/justify', auth, (req, res) =>
  postTextJustifyHandler(req as AuthenticatedRequest, res),
);
router.post('/api/token', postTokenHandler);

router.use((req, res) => res.status(404).json({
    error: `Not Found - API not found at ${req.url} for ${req.method}`,
  }));
