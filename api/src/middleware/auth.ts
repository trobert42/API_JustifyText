import { Response, Request } from 'express';

const jwt = require('jsonwebtoken');
const User = require('../models/user');
export interface AuthenticatedRequest extends Request {
  auth?: string;
}

module.exports = (
  req: AuthenticatedRequest,
  res: Response,
  next: () => void,
) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const email = decodedToken.email;
      const foundUser = User.getUserFromEmail(email);
      req.auth = email;
      if (!email || !foundUser) throw new Error();
      next();
    }
  } catch (error) {
    res.status(401).json({ error: `Wrong Token or user not found` });
  }
};
