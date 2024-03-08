import { Response, Request } from 'express';

const jwt = require('jsonwebtoken');

module.exports = (req: Request, res: Response, next: () => void) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      //   const email = decodedToken.email;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: `Wrong Token or user not found` });
  }
};
