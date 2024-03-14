import type { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import type { AuthenticatedRequest } from '../types/types';
import { getEnvs } from '../utils/getEnvs';



export default (req: Request, res: Response, next: () => void) => {
  try {
    if (req.headers && req.headers.authorization) {
      if (req.headers.authorization.split(' ')[0] !== 'Bearer')
        {throw new Error();}

      const token = req.headers.authorization.split(' ')[1];
      if (!token) {throw new Error();}

      const payload = jwt.verify(token, getEnvs().jwtSecret);

      if (typeof payload === 'string') {
        return res.status(401).json({
          error: `Unauthorized - Wrong token, no token or user not found`,
        });
      }

      const foundUser = User.getUserFromEmail(payload.email);
      if (!payload.email || !foundUser) {throw new Error();}

      (req as AuthenticatedRequest).auth = payload.email;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({
      error: `Unauthorized - Wrong token, no token or user not found`,
    });
  }
};