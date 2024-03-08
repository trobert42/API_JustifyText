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
      const token = req.headers.authorization.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const foundUser = User.getUserFromEmail(payload.email);
      if (!payload.email || !foundUser) throw new Error();
      req.auth = payload.email;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: `Wrong Token or user not found` });
  }
};
