import { Response } from 'express';
import { AuthenticatedRequest } from '../controllers/userController';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (
  req: AuthenticatedRequest,
  res: Response,
  next: () => void,
) => {
  try {
    if (req.headers && req.headers.authorization) {
      if (req.headers.authorization.split(' ')[0] !== 'Bearer')
        throw new Error();

      const token = req.headers.authorization.split(' ')[1];
      if (!token) throw new Error();

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const foundUser = User.getUserFromEmail(payload.email);
      if (!payload.email || !foundUser) throw new Error();

      req.auth = payload.email;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({ error: `Wrong Token, no token or user not found` });
  }
};
